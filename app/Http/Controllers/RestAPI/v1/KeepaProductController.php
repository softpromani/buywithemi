<?php

namespace App\Http\Controllers\RestAPI\v1;

use App\Http\Controllers\Controller;
use App\Models\BusinessSetting;
use App\Models\Color;
use App\Models\DealOfTheDay;
use App\Models\FlashDealProduct;
use App\Models\Product;
use App\Models\Translation;
use App\Utils\Convert;
use App\Utils\Helpers;
use App\Utils\ImageManager;
use Barryvdh\DomPDF\PDF;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Utils\ProductManager;


class KeepaProductController extends Controller
{
    public function list(Request $request): JsonResponse
    {
        if (auth('api')->user()->id == '52') {
            //
        } else {
            return response()->json([
                'auth-001' => translate('Your existing session token does not authorize you any more')
            ], 401);
        }

        $products = ProductManager::get_latest_products($request, $request['limit'], $request['offset']);
        $products['products'] = Helpers::product_data_formatting($products['products'], true);
        return response()->json($products, 200);
    }

    public function upload_images(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required',
            'type' => 'required|in:product,thumbnail,meta',
        ]);

        if ($validator->errors()->count() > 0) {
            return response()->json(['errors' => Helpers::error_processor($validator)]);
        }

        $path = $request['type'] == 'product' ? '' : $request['type'] . '/';
        $image = ImageManager::upload('product/' . $path, 'webp', $request->file('image'));

        return response()->json(['image_name' => $image, 'type' => $request['type']], 200);
    }

    // Digital product file upload
    public function upload_digital_product(Request $request)
    {
        $data = Helpers::get_seller_by_token($request);

        if ($data['success'] == 1) {
            $seller = $data['data'];
        } else {
            return response()->json([
                'auth-001' => translate('Your existing session token does not authorize you any more')
            ], 401);
        }

        try {
            $validator = Validator::make($request->all(), [
                'digital_file_ready' => 'required|mimes:jpg,jpeg,png,gif,zip,pdf',
            ]);

            if ($validator->errors()->count() > 0) {
                return response()->json(['errors' => Helpers::error_processor($validator)]);
            }

            $file = ImageManager::file_upload('product/digital-product/', $request->digital_file_ready->getClientOriginalExtension(), $request->file('digital_file_ready'));

            return response()->json(['digital_file_ready_name' => $file], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => $e], 403);
        }
    }

    public function add_new(Request $request)
    {
        $data = Helpers::get_seller_by_token($request);
        if ($data['success'] == 1) {
            $seller = $data['data'];
        } else {
            return response()->json([
                'auth-001' => translate('Your existing session token does not authorize you any more')
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'name'                  => 'required',
            'category_id'           => 'required',
            'product_type'          => 'required',
            'digital_product_type'  => 'required_if:product_type,==,digital',
            'digital_file_ready'    => 'required_if:digital_product_type,==,ready_product',
            'unit'                  => 'required_if:product_type,==,physical',
            'images'                => 'required',
            'thumbnail'             => 'required',
            'discount_type'         => 'required|in:percent,flat',
            'tax'                   => 'required|min:0',
            'lang'                  => 'required',
            'unit_price'            => 'required|min:1',
            'purchase_price'        => 'required|min:1',
            'discount'              => 'required|gt:-1',
            'shipping_cost'         => 'required_if:product_type,==,physical|gt:-1',
            'code'                  => 'required|unique:products',
            'minimum_order_qty'     => 'required|numeric|min:1',
        ], [
            'name.required'                     => translate('Product name is required!'),
            'unit.required_if'                  => translate('Unit is required!'),
            'category_id.required'              => translate('category is required!'),
            'digital_file_ready.required_if'    => translate('Ready product upload is required!'),
            'digital_product_type.required_if'  => translate('Digital product type is required!'),
            'shipping_cost.required_if'         => translate('Shipping Cost is required!'),
            'images.required'                   => translate('Product images is required!'),
            'image.required'                    => translate('Product thumbnail is required!'),
            'code.required'                     => translate('Code is required!'),
            'minimum_order_qty.required'        => translate('The minimum order quantity is required!'),
            'minimum_order_qty.min'             => translate('The minimum order quantity must be positive!'),
        ]);

        $brand_setting = BusinessSetting::where('type', 'product_brand')->first()->value;
        if ($brand_setting && empty($request->brand_id)) {
            $validator->after(function ($validator) {
                $validator->errors()->add(
                    'brand_id', 'Brand is required!'
                );
            });
        }

        if ($request['discount_type'] == 'percent') {
            $dis = ($request['unit_price'] / 100) * $request['discount'];
        } else {
            $dis = $request['discount'];
        }

        if ($request['unit_price'] <= $dis) {
            $validator->after(function ($validator) {
                $validator->errors()->add(
                    'unit_price',
                    translate('Discount can not be more or equal to the price!')
                );
            });
        }

        $product = new Product();
        $product->user_id = $seller->id;
        $product->added_by = "seller";

        $product->name = $request->name[array_search(Helpers::default_lang(), $request->lang)];
        $product->slug = Str::slug($request->name[array_search(Helpers::default_lang(), $request->lang)], '-') . '-' . Str::random(6);

        $category = [];

        if ($request->category_id != null) {
            array_push($category, [
                'id' => $request->category_id,
                'position' => 1,
            ]);
        }
        if ($request->sub_category_id != null) {
            array_push($category, [
                'id' => $request->sub_category_id,
                'position' => 2,
            ]);
        }
        if ($request->sub_sub_category_id != null) {
            array_push($category, [
                'id' => $request->sub_sub_category_id,
                'position' => 3,
            ]);
        }

        $product->category_ids          = json_encode($category);
        $product->brand_id              = isset($request->brand_id) ? $request->brand_id : null;
        $product->unit                  = $request->product_type == 'physical' ? $request->unit : null;
        $product->product_type          = $request->product_type;
        $product->digital_product_type  = $request->product_type == 'digital' ? $request->digital_product_type : null;
        $product->code                  = $request->code;
        $product->minimum_order_qty     = $request->minimum_order_qty;
        $product->details               = $request->description[array_search(Helpers::default_lang(), $request->lang)];

        $product->images                = json_encode($request->images);
        $product->thumbnail             = $request->thumbnail;
        $product->digital_file_ready    = $request->digital_file_ready;

        if ($request->has('colors_active') && $request->has('colors') && count($request->colors) > 0) {
            $product->colors = $request->product_type == 'physical' ? json_encode($request->colors) : json_encode([]);
        } else {
            $colors = [];
            $product->colors = $request->product_type == 'physical' ? json_encode($colors) : json_encode([]);
        }

        $choice_options = [];
        if ($request->has('choice')) {
            foreach ($request->choice_no as $key => $no) {
                $str = 'choice_options_' . $no;
                $item['name'] = 'choice_' . $no;
                $item['title'] = $request->choice[$key];
                $item['options'] = $request[$str];
                array_push($choice_options, $item);
            }
        }
        $product->choice_options = $request->product_type == 'physical' ? json_encode($choice_options) : json_encode([]);

        //combinations start
        $options = [];
        if ($request->has('colors_active') && $request->has('colors') && count($request->colors) > 0) {
            $colors_active = 1;
            array_push($options, $request->colors);
        }
        if ($request->has('choice_no')) {
            foreach ($request->choice_no as $key => $no) {
                $name = 'choice_options_' . $no;
                array_push($options, $request[$name]);
            }
        }
        //Generates the combinations of customer choice options
        $combinations = Helpers::combinations($options);
        $variations = [];
        $stock_count = 0;
        if (count($combinations[0]) > 0) {

            foreach ($combinations as $combination) {
                $str = '';
                foreach ($combination as $k => $item) {
                    if ($k > 0) {
                        $str .= '-' . str_replace(' ', '', $item);
                    } else {
                        if ($request->has('colors_active') && $request->has('colors') && count($request->colors) > 0) {
                            $color_name = Color::where('code', $item)->first()->name ?? '';
                            $str .= $color_name;
                        } else {
                            $str .= str_replace(' ', '', $item);
                        }
                    }
                }
                $item = [];
                $item['type'] = $str;
                $item['price'] = Convert::usd(abs($request['price_' . str_replace('.', '_', $str)]));
                $item['sku'] = $request['sku_' . str_replace('.', '_', $str)];
                $item['qty'] = $request['qty_' . str_replace('.', '_', $str)];

                array_push($variations, $item);
                $stock_count += $item['qty'];
            }
        } else {
            $stock_count = (int)$request['current_stock'];
        }

        if ($validator->errors()->count() > 0) {
            return response()->json(['errors' => Helpers::error_processor($validator)]);
        }

        //combinations end
        $product->variation      = $request->product_type == 'physical' ? json_encode($variations) : json_encode([]);
        $product->unit_price = Convert::usd($request->unit_price);
        $product->purchase_price = Convert::usd($request->purchase_price);
        $product->tax = $request->tax;
        $product->tax_type = $request->tax_type;
        $product->discount = $request->discount_type == 'flat' ? Convert::usd($request->discount) : $request->discount;
        $product->discount_type = $request->discount_type;
        $product->attributes     = $request->product_type == 'physical' ? json_encode($request->choice_attributes) : json_encode([]);
        $product->current_stock  = $request->product_type == 'physical' ? abs($stock_count) : 0;

        $product->meta_title = $request->meta_title;
        $product->meta_description = $request->meta_description;
        $product->meta_image = $request->meta_image;

        $product->video_provider = 'youtube';
        $product->video_url = $request->video_link;
        $product->request_status = Helpers::get_business_settings('new_product_approval') == 1 ? 0 : 1;
        $product->status = 0;
        $product->shipping_cost  = $request->product_type == 'physical' ? Convert::usd($request->shipping_cost) : 0;
        $product->multiply_qty = ($request->product_type == 'physical') ? ($request->multiplyQTY == 1 ? 1 : 0) : 0;
        $product->save();
        $data = [];
        foreach ($request->lang as $index => $key) {
            if ($request->name[$index] && $key != Helpers::default_lang()) {
                array_push($data, array(
                    'translationable_type' => 'App\Models\Product',
                    'translationable_id' => $product->id,
                    'locale' => $key,
                    'key' => 'name',
                    'value' => $request->name[$index],
                ));
            }
            if ($request->description[$index] && $key != Helpers::default_lang()) {
                array_push($data, array(
                    'translationable_type' => 'App\Models\Product',
                    'translationable_id' => $product->id,
                    'locale' => $key,
                    'key' => 'description',
                    'value' => $request->description[$index],
                ));
            }
        }
        Translation::insert($data);

        return response()->json(['message' => translate('successfully product added!')], 200);
    }

    public function edit(Request $request, $id)
    {
        if (auth('api')->user()->id == '52') {
            //
        } else {
            return response()->json([
                'auth-001' => translate('Your existing session token does not authorize you any more')
            ], 401);
        }
        $product = Product::withoutGlobalScopes()->with('translations')->find($id);
        $product = Helpers::product_data_formatting($product);

        return response()->json($product, 200);
    }

    public function update(Request $request, $id)
    {
        if (auth('api')->user()->id == '52') {
            //
        } else {
            return response()->json([
                'auth-001' => translate('Your existing session token does not authorize you any more')
            ], 401);
        }
        $product = Product::find($id);

        $validator = Validator::make($request->all(), [
            'name'                  => 'required',
            'current_stock'                  => 'required',
            'unit_price'            => 'required|min:1',
        ], [
            'name.required'                     => 'Product name is required!',
        ]);

        if($product){
            $product->user_id = auth('api')->user()->id;
            $product->added_by = "api-admin";

            $product->name = $request->name;
            $product->slug = Str::slug($request->name, '-') . '-' . Str::random(6);
            $product->current_stock = $request->current_stock;
            $product->unit_price        = currencyConverter(amount: $request->unit_price);

            $product->save();

            return response()->json(['message' => translate('successfully product updated!')], 200);
        }
        else{
            return response()->json(['message' => translate('product_not_available')], 200);
        }

    }
    public function status_update(Request $request)
    {
        $data = Helpers::get_seller_by_token($request);
        if ($data['success'] == 1) {
            $seller = $data['data'];
        } else {
            return response()->json([
                'auth-001' => translate('Your existing session token does not authorize you any more')
            ], 401);
        }

        $product = Product::find($request->id);
        $product->status = $request->status;
        $product->save();

        return response()->json([
            'success' => translate('updated successfully'),
        ], 200);
    }

    public function delete(Request $request, $id)
    {
        $data = Helpers::get_seller_by_token($request);
        if ($data['success'] == 1) {
            $seller = $data['data'];
        } else {
            return response()->json([
                'auth-001' => translate('Your existing session token does not authorize you any more')
            ], 401);
        }

        $product = Product::find($id);
        foreach (json_decode($product['images'], true) as $image) {
            ImageManager::delete('/product/' . $image);
        }
        ImageManager::delete('/product/thumbnail/' . $product['thumbnail']);
        $product->delete();
        FlashDealProduct::where(['product_id' => $id])->delete();
        DealOfTheDay::where(['product_id' => $id])->delete();
        return response()->json(['message' => translate('successfully product deleted!')], 200);
    }

}
