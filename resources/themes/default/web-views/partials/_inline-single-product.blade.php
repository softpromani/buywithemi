@php($overallRating = getOverallRating($product->reviews))

<div class="product-single-hover style--card single-productitem rounded-4 bg-white`">
    <div class="overflow-hidden position-relative">
        <div class=" inline_product clickable d-flex justify-content-center w-100 bg-white" style="width: 100% !important">
            <!-- @if($product->discount > 0)
                <div class="d-flex">
                    <span class="for-discount-value p-1 pl-2 pr-2 font-bold fs-13">
                        <span class="direction-ltr d-block">
                            @if ($product->discount_type == 'percent')
                                -{{ round($product->discount,(!empty($decimalPointSettings) ? $decimalPointSettings: 0))}}%
                            @elseif($product->discount_type =='flat')
                                -{{ webCurrencyConverter(amount: $product->discount) }}
                            @endif
                        </span>
                    </span>
                </div>
            @else
                <div class="d-flex justify-content-end">
                    <span class="for-discount-value-null"></span>
                </div>
            @endif -->
            <div class="pb-0">
                <a href="{{route('product',$product->slug)}}" class="w-100">
                    <img alt=""
                         src="{{ getStorageImages(path: $product->thumbnail_full_url, type: 'product') }}" loading='lazy'>
                </a>
            </div>

            <!-- <div class="quick-view">
                <a class="btn-circle stopPropagation action-product-quick-view" href="javascript:" data-product-id="{{ $product->id }}">
                    <i class="czi-eye align-middle"></i>
                </a>
            </div> -->
            @if($product->product_type == 'physical' && $product->current_stock <= 0)
                <span class="out_fo_stock">{{translate('out_of_stock')}}</span>
            @endif
        </div>
        <div class="single-product-details">
            @if($overallRating[0] != 0 )
                <div class="rating-show justify-content-between text-left">
                    <span class="d-inline-block font-size-sm text-body">
                        @for($inc=1;$inc<=5;$inc++)
                            @if ($inc <= (int)$overallRating[0])
                                <i class="tio-star text-warning"></i>
                            @elseif ($overallRating[0] != 0 && $inc <= (int)$overallRating[0] + 1.1 && $overallRating[0] > ((int)$overallRating[0]))
                                <i class="tio-star-half text-warning"></i>
                            @else
                                <i class="tio-star-outlined text-warning"></i>
                            @endif
                        @endfor
                        <label class="badge-style">( {{ count($product->reviews) }} )</label>
                    </span>
                </div>
            @endif
            <!-- <div class="text-left"> -->
                <a class="product-name" href="{{route('product',$product->slug)}}" style="-webkit-line-clamp: 2">
                    {{ Str::limit($product['name'], 55) }}
                </a>
            <!-- </div> -->
			{{-- <div class="text-left short-specification"><p>(12GB RAM, 256GB, Titanium Gray)</p></div> --}}
            <div class="justify-content-between text-left">
                <div class="product-price text-center d-flex flex-wrap align-items-left gap-8">
                    @if($product->discount > 0)
                        <del class="category-single-product-price">
                            {{ webCurrencyConverter(amount: $product->unit_price) }}
                        </del>
                    @endif
                    <span class="text-accent text-dark singleitemprice">
                        {{ webCurrencyConverter(amount:
                            $product->unit_price-(getProductDiscount(product: $product, price: $product->unit_price))
                        ) }}
                    </span>
                </div>
            </div>


			<div class="shopnowbtn">
					<a href="{{route('product',$product->slug)}}" class="btnshop">Buy On EMI</a>
			</div>
        </div>
    </div>
</div>


