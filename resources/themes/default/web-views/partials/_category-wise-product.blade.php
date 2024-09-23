@if (count($category['products']) > 0)
<section class="product-category-container rtl px-max-sm-0">
    <div class="">
        <div class="overflow-hidden">
            <div class="product-category-title-container d-flex __gap-6px flex-between align-items-center">
                <div class="category-product-view-title align-items-center" style="margin-left: 0px; !important">
                <span class="latestproductgridtext">
                        {{$category['name']}}
                </span>
                </div>
                <div class="category-product-view-all">
                    <a class="text-capitalize view-all-text text-nowrap"
                       href="{{route('products',['id'=> $category['id'],'data_from'=>'category','page'=>1])}}">
                        {{ translate('view_all')}}
                    </a>
                </div>
            </div>

            <div class="mt-2 category-product-card">
                {{-- <div class="carousel-wrap-2 d-none d-sm-block">
                    <div class="owl-carousel owl-theme category-wise-product-slider">
                        @foreach($category['products'] as $key => $product)
                            @include('web-views.partials._category-single-product',['product'=>$product,'decimal_point_settings'=>$decimal_point_settings])
                        @endforeach
                    </div>
                </div> --}}
                <div class="row mt-0 g-15 product-list-wrapper">
                    @foreach($category['products'] as $product)
                        <div class="wrapper-product-list">
                                @include('web-views.partials._inline-single-product',['product'=>$product,'decimal_point_settings'=>$decimal_point_settings])
                        </div>
                    @endforeach
                </div>
                <!-- <div class="d-sm-none">
                    <div class="row g-2">
                        @foreach($category['products'] as $key=>$product)
                            @if($key < 4)
                                <div class="col-6">
                                    @include('web-views.partials._category-single-product',['product'=>$product,'decimal_point_settings'=>$decimal_point_settings])
                                </div>
                            @endif
                        @endforeach
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</section>
@endif
