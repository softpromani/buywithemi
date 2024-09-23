@php($overallRating = getOverallRating($product->reviews))

<div class="product-single-hover style--card">
    <div class="overflow-hidden position-relative d-flex flex-wrap">
        <!-- Image Section (Left) -->
        <div class="align-middle product-image-section d-flex justify-content-center align-items-center">
            <a href="{{route('product',$product->slug)}}" class="w-100 text-center">
                <img alt="" src="{{ getStorageImages(path: $product->thumbnail_full_url, type: 'product') }}" class="img-fluid">
            </a>
        </div>

        <!-- Product Details Section (Right) -->
        <div class="single-product-details flex-grow-1 ml-4">
            <!-- Rating Section -->
            @if($overallRating[0] != 0 )
            <div class="rating-show justify-content-between text-center">
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

            <!-- Product Name -->
            <div class="text">
                <a href="{{route('product',$product->slug)}}" style="-webkit-line-clamp: 3; font-size:14px;">
                    {{ Str::limit($product['name'], 55) }}
                </a>
            </div>
    
            <!-- Price Section -->
            <div class="justify-content-between text-left mt-3 mb-1 product-price-section">
                <div class="product-price text-left justify-content-left align-items-left gap-8">
                    @if($product->discount > 0)
                        <del class="category-single-product-price">
                            {{ webCurrencyConverter(amount: $product->unit_price) }}
                        </del>
                    @endif
                    <span class="text-dark category-single-product-price-main">
                        {{ webCurrencyConverter(amount:
                            $product->unit_price-(getProductDiscount(product: $product, price: $product->unit_price))
                        ) }}
                    </span>
                </div>
            </div>

            <!-- Add to Cart Button -->
            <div class="shopnowbtn text-center">
                <a href="{{route('product',$product->slug)}}" class="btnshop text-center" style="padding: 8px 18px">Buy On EMI</a>
            </div>
        </div>
    </div>
</div>
