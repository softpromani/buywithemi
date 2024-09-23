@extends('layouts.front-end.app')

@section('title',translate($data['data_from']).' '.translate('products'))

@push('css_or_js')
    <meta property="og:image" content="{{$web_config['web_logo']['path']}}"/>
    <meta property="og:title" content="Products of {{$web_config['name']}} "/>
    <meta property="og:url" content="{{env('APP_URL')}}">
    <meta property="og:description"
          content="{{ substr(strip_tags(str_replace('&nbsp;', ' ', $web_config['about']->value)),0,160) }}">

    <meta property="twitter:card" content="{{$web_config['web_logo']['path']}}"/>
    <meta property="twitter:title" content="Products of {{$web_config['name']}}"/>
    <meta property="twitter:url" content="{{env('APP_URL')}}">
    <meta property="twitter:description"
          content="{{ substr(strip_tags(str_replace('&nbsp;', ' ', $web_config['about']->value)),0,160) }}">

    <style>
        .for-count-value {
        {{Session::get('direction') === "rtl" ? 'left' : 'right'}}: 0.6875 rem;;
        }

        .for-count-value {

        {{Session::get('direction') === "rtl" ? 'left' : 'right'}}: 0.6875 rem;
        }

        .for-brand-hover:hover {
            color: var(--web-primary);
        }

        .for-hover-label:hover {
            color: var(--web-primary)!important;
        }

        .page-item.active .page-link {
            background-color: var(--web-primary) !important;
        }

        .for-sorting {
            padding- {{Session::get('direction') === "rtl" ? 'left' : 'right'}}: 9px;
        }

        .sidepanel {
        {{Session::get('direction') === "rtl" ? 'right' : 'left'}}: 0;
        }

        .sidepanel .closebtn {
        {{Session::get('direction') === "rtl" ? 'left' : 'right'}}: 25 px;
        }

        @media (max-width: 360px) {
            .for-sorting-mobile {
                margin- {{Session::get('direction') === "rtl" ? 'left' : 'right'}}: 0% !important;
            }

            .for-mobile {

                margin- {{Session::get('direction') === "rtl" ? 'right' : 'left'}}: 10% !important;
            }

        }

        @media (max-width: 500px) {
            .for-mobile {

                margin- {{Session::get('direction') === "rtl" ? 'right' : 'left'}}: 27%;
            }
        }

    </style>
@endpush

@section('content')

    @php
        $decimal_point_settings = getWebConfig(name: 'decimal_point_settings');
    @endphp

    <div class="category-title" dir="{{Session::get('direction')}}">
        <div class="search-page-header">
            <div>
                @if($data['data_from'] == 'featured')
                <h3 class="align-middle text-center mb-0"> {{ translate('featured_products') }}</h3>
                @else
                <h3 class="align-middle text-center mb-0"> {{ isset($data['brand_name']) ? ''.$data['brand_name'].'' : ''}}</h3>
                @endif
                <!-- <div><span>{{$products->total()}}</span> {{translate('items_found')}}</div> -->
            </div>
            <div class="d-flex align-items-center gap-2">
                <form id="brand-filter-form rounded-10" action="{{ route('products') }}" method="GET">
                    <input type="hidden" name="id" value="{{$data['id']}}">
                    <input type="hidden" name="data_from" value="{{$data['data_from']}}">
                    <div class="sorting-item">
                        <label class="for-sorting" for="brand-filter" style="width: 100%;">
                            <span style="color: #9B9B9B" class="d-block mr-1" >{{translate('filter_by')}}</span>
                        </label>
                        <select name="brand" id="brand-filter" class="form-control" onchange="this.form.submit()">
                            <option value="">{{translate('Brands')}}</option>
                            @php
                                $productBrands = $products->pluck('brand')->unique()->filter()->values();
                            @endphp
                            @if(isset($productBrands) && !$productBrands->isEmpty())
                                @foreach($productBrands as $brand)
                                    @if($brand)
                                        <option style="font-size: 0.875rem" value="{{ $brand['id'] }}" {{ request('brand') == $brand['id'] ? 'selected' : '' }}>
                                            {{ $brand['name'] }}
                                        </option>
                                    @endif
                                @endforeach
                            @endif
                        </select>
                    </div>
                </form>
                <form id="search-form" class="d-none d-lg-block rounded-10" action="{{ route('products') }}" method="GET">
                    <input hidden name="data_from" value="{{$data['data_from']}}">
                    <div class="sorting-item">

                        <label class="for-sorting" for="sorting">
                            <span style="color: #9B9B9B" >{{translate('sort_by')}}</span>
                        </label>
                        <select class="product-list-filter-on-viewpage">
                            <option value="latest" {{ request('sort_by') == 'latest' ? 'selected':'' }}>{{translate('latest')}}</option>
                            <option
                                value="low-high" {{ request('sort_by') == 'low-high' ? 'selected':'' }}>{{translate('low_to_High_Price')}} </option>
                            <option
                                value="high-low" {{ request('sort_by') == 'high-low' ? 'selected':'' }}>{{translate('High_to_Low_Price')}}</option>
                            <option
                                value="a-z" {{ request('sort_by') == 'a-z' ? 'selected':'' }}>{{translate('A_to_Z_Order')}}</option>
                            <option
                                value="z-a" {{ request('sort_by') == 'z-a' ? 'selected':'' }}>{{translate('Z_to_A_Order')}}</option>
                        </select>
                    </div>
                </form>
            </div>
            {{--<div class="d-lg-none">
                <div class="filter-show-btn btn btn--primary py-1 px-2 m-0">
                    <i class="tio-filter"></i>
                </div>
            </div>--}}
        </div>

    </div>

    <div class="mb-md-4 rtl __inline-35 category-product-container" dir="{{Session::get('direction')}}">
        <div class="row">
            <aside
                class="col-lg-3 hidden-xs col-md-3 col-sm-4 SearchParameters __search-sidebar {{Session::get('direction') === "rtl" ? 'pl-2' : 'pr-2'}}"
                id="SearchParameters">
                <div class="cz-sidebar __inline-35" id="shop-sidebar">
                    <div class="cz-sidebar-header bg-light">
                        <button class="close ms-auto"
                                type="button" data-dismiss="sidebar" aria-label="Close">
                            <i class="tio-clear"></i>
                        </button>
                    </div>
                    <div class="pb-0">
                        <div class="text-center">
                            <div class="__cate-side-title border-bottom">
                                <span class="widget-title font-semibold">{{translate('filter')}} </span>
                            </div>
                            <div class="__p-25-10 w-100 pt-4">
                                <label class="w-100 opacity-75 text-nowrap for-sorting d-block mb-0 ps-0" for="sorting">
                                    <select class="form-control custom-select" id="searchByFilterValue">
                                        <option selected disabled>{{translate('choose')}}</option>
                                        <option
                                            value="{{route('products',['id'=> $data['id'],'data_from'=>'best-selling','page'=>1])}}" {{isset($data['data_from'])!=null?$data['data_from']=='best-selling'?'selected':'':''}}>{{translate('best_selling_product')}}</option>
                                        <option
                                            value="{{route('products',['id'=> $data['id'],'data_from'=>'top-rated','page'=>1])}}" {{isset($data['data_from'])!=null?$data['data_from']=='top-rated'?'selected':'':''}}>{{translate('top_rated')}}</option>
                                        <option
                                            value="{{route('products',['id'=> $data['id'],'data_from'=>'most-favorite','page'=>1])}}" {{isset($data['data_from'])!=null?$data['data_from']=='most-favorite'?'selected':'':''}}>{{translate('most_favorite')}}</option>
                                        <option
                                            value="{{route('products',['id'=> $data['id'],'data_from'=>'featured_deal','page'=>1])}}" {{isset($data['data_from'])!=null?$data['data_from']=='featured_deal'?'selected':'':''}}>{{translate('featured_deal')}}</option>
                                    </select>
                                </label>
                            </div>

                            <div class="__p-25-10 w-100 pt-0 d-lg-none">
                                <form id="search-form" action="{{ route('products') }}" method="GET">
                                    <input hidden name="data_from" value="{{$data['data_from']}}">
                                    <select class="form-control product-list-filter-on-viewpage">
                                        <option value="latest">{{translate('latest')}}</option>
                                        <option
                                            value="low-high">{{translate('low_to_High_Price')}} </option>
                                        <option
                                            value="high-low">{{translate('High_to_Low_Price')}}</option>
                                        <option
                                            value="a-z">{{translate('A_to_Z_Order')}}</option>
                                        <option
                                            value="z-a">{{translate('Z_to_A_Order')}}</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="text-center">
                            <div class="__cate-side-title pt-0">
                                <span class="widget-title font-semibold">{{translate('price')}} </span>
                            </div>

                            <div class="d-flex justify-content-between align-items-center __cate-side-price">
                                <div class="__w-35p">
                                    <input
                                        class="bg-white cz-filter-search form-control form-control-sm appended-form-control"
                                        type="number" value="0" min="0" max="1000000" id="min_price"
                                        placeholder="{{ translate('min')}}">

                                </div>
                                <div class="__w-10p">
                                    <p class="m-0">{{translate('to')}}</p>
                                </div>
                                <div class="__w-35p">
                                    <input value="100" min="100" max="1000000"
                                           class="bg-white cz-filter-search form-control form-control-sm appended-form-control"
                                           type="number" id="max_price" placeholder="{{ translate('max')}}">

                                </div>

                                <div class="d-flex justify-content-center align-items-center __number-filter-btn">

                                    <a class="action-search-products-by-price">
                                        <i class="__inline-37 czi-arrow-{{Session::get('direction') === "rtl" ? 'left' : 'right'}}"></i>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>

                    @if($web_config['brand_setting'])
                        <div>
                            <div class="text-center">
                                <div class="__cate-side-title">
                                    <span class="widget-title font-semibold">{{translate('brands')}}</span>
                                </div>
                                <div class="__cate-side-price pb-3">
                                    <div class="input-group-overlay input-group-sm">
                                        <input placeholder="{{ translate('search_by_brands') }}"
                                            class="__inline-38 cz-filter-search form-control form-control-sm appended-form-control"
                                            type="text" id="search-brand">
                                        <div class="input-group-append-overlay">
                                        <span class="input-group-text">
                                            <i class="czi-search"></i>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <ul id="lista1" class="__brands-cate-wrap" data-simplebar
                                    data-simplebar-auto-hide="false">
                                    @foreach($activeBrands as $brand)
                                        <div
                                            class="brand mt-2 for-brand-hover {{Session::get('direction') === "rtl" ? 'mr-2' : ''}}"
                                            id="brand">
                                            <li class="flex-between __inline-39 get-view-by-onclick"
                                                data-link="{{ route('products',['id'=> $brand['id'],'data_from'=>'brand','page'=>1]) }}">
                                                <div class="text-start">
                                                    {{ $brand['name'] }}
                                                </div>
                                                <div class="__brands-cate-badge">
                                                    <span>
                                                        {{ $brand['brand_products_count'] }}
                                                    </span>
                                                </div>
                                            </li>
                                        </div>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    @endif

                    <div class="mt-3 __cate-side-arrordion">
                        <div>
                            <div class="text-center __cate-side-title">
                                <span class="widget-title font-semibold">
                                    {{ translate('categories') }}
                                </span>
                            </div>

                            <div class="accordion mt-n1 __cate-side-price" id="shop-categories">
                                @foreach($categories as $category)
                                    <div class="menu--caret-accordion">
                                        <div class="card-header flex-between">
                                            <div>
                                                <label class="for-hover-label cursor-pointer get-view-by-onclick"
                                                       data-link="{{ route('products',['id'=> $category['id'],'data_from'=>'category','page'=>1]) }}">
                                                    {{$category['name']}}
                                                </label>
                                            </div>
                                            <div class="px-2 cursor-pointer menu--caret">
                                                <strong class="pull-right for-brand-hover">
                                                    @if($category->childes->count()>0)
                                                        <i class="tio-next-ui fs-13"></i>
                                                    @endif
                                                </strong>
                                            </div>
                                        </div>
                                        <div
                                            class="card-body p-0 ms-2 d--none"
                                            id="collapse-{{$category['id']}}">
                                            @foreach($category->childes as $child)
                                                <div class="menu--caret-accordion">
                                                    <div class="for-hover-label card-header flex-between">
                                                        <div>
                                                            <label class="cursor-pointer get-view-by-onclick"
                                                                   data-link="{{ route('products',['id'=> $child['id'],'data_from'=>'category','page'=>1]) }}">
                                                                {{$child['name']}}
                                                            </label>
                                                        </div>
                                                        <div class="px-2 cursor-pointer menu--caret">
                                                            <strong class="pull-right">
                                                                @if($child->childes->count()>0)
                                                                    <i class="tio-next-ui fs-13"></i>
                                                                @endif
                                                            </strong>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="card-body p-0 ms-2 d--none"
                                                        id="collapse-{{$child['id']}}">
                                                        @foreach($child->childes as $ch)
                                                            <div class="card-header">
                                                                <label
                                                                    class="for-hover-label d-block cursor-pointer text-left get-view-by-onclick"
                                                                    data-link="{{ route('products',['id'=> $ch['id'],'data_from'=>'category','page'=>1]) }}">
                                                                    {{$ch['name']}}
                                                                </label>
                                                            </div>
                                                        @endforeach
                                                    </div>
                                                </div>
                                            @endforeach
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sidebar-overlay"></div>
            </aside>

            <section class="col-lg-9">
                <div class="row" id="ajax-products">
                    @include('web-views.products._ajax-products',['products'=>$products,'decimal_point_settings'=>$decimal_point_settings])
                </div>
            </section>
        </div>
    </div>

    <span id="products-search-data-backup"
        data-url="{{ url('/products') }}"
        data-id="{{ $data['id'] }}"
        data-name="{{ $data['name'] }}"
        data-from="{{ $data['data_from'] }}"
        data-sort="{{ $data['sort_by'] }}"
        data-min-price="{{ $data['min_price'] }}"
        data-max-price="{{ $data['max_price'] }}"
        data-message="{{ translate('items_found') }}"
    ></span>

@endsection

@push('script')
<script src="{{ theme_asset(path: 'public/assets/front-end/js/product-view.js') }}"></script>
@endpush
