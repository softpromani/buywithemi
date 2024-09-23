@if ($categories->count() > 0 )
    <section class="shopbycategory-slider">
        <div class="container-fluid">
            <div>
                <div class="categoryslider-items">
                    <div class="manageslider-items">
                        <div class="d-flex justify-content-between">
                            <div class="categories-title">
                                <span class="font-semibold">{{ translate('categories')}}</span>
                            </div>
                            <div>
                                <a class="text-capitalize view-all-text "
                                   href="{{route('categories')}}">{{ translate('view_all')}}
                                </a>
                            </div>
                        </div>
                        <div class="d-none d-md-block">
                            <div class="row griditemfeature">
                                @foreach($categories as $key => $category)
                                    @if ($key<10)
                                        <div class="text-center __m-5px __cate-item">
                                            <a href="{{route('products',['id'=> $category['id'],'data_from'=>'category','page'=>1])}}">
                                                <div class="__img">
                                                    <img alt="{{ $category->name }}"
                                                         src="{{ getStorageImages(path:$category->icon_full_url, type: 'category') }}">
                                                </div>
                                                <p class="text-center fs-12 mt-2 home-category-title">{{Str::limit($category->name)}}</p>
                                            </a>
                                        </div>
                                    @endif
                                @endforeach
                            </div>
                        </div>
                        <div class="d-md-none">
                            <div class="owl-theme owl-carousel categories--slider mt-3">
                                @foreach ($categories->chunk(2) as $chunk)
                                    @if ($loop->index < 5)
                                        <div class="text-center m-0 __cate-item"> 
                                            @foreach ($chunk as $category)
                                                <div class="d-inline-block"> 
                                                    <a href="{{ route('products', ['id'=> $category['id'], 'data_from' => 'category', 'page' => 1]) }}">
                                                        <div class="__img mw-100 h-auto">
                                                            <img alt="{{ $category->name }}" src="{{ getStorageImages(path: $category->icon_full_url, type: 'category') }}">
                                                        </div>
                                                        <p class="text-center small mt-2">{{ Str::limit($category->name, 100) }}</p>
                                                    </a>
                                                </div>
                                            @endforeach
                                        </div>
                                    @endif
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endif



  <div class="container-fluid">
    <div class="categorybyshop">
		<h2 class="categorytext">shop by category</h2>
    </div>
    <div class="rowmasonery">
        @if ($home_category_banner)
            @foreach($home_category_banner->sortBy('sequence')->chunk(2) as $chunk)
            <div class="column">
                @foreach($chunk as $banner)
                    <div class="masonary-griditem">
                        <a href="#">
                            <div class="categoryimage-item">
                                <img src="{{ getStorageImages(path: $banner->photo_full_url, type: 'banner') }}" class="categoryoffer-images" alt="{{ $banner->alt_text }}" loading='lazy'/>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>
            @endforeach
        @else
            <div class="column">
                <div class="masonary-griditem">
                    <a href="#">
                        <div class="categoryimage-item">
                            <img src="{{asset('myfigma/phone and tablets.png')}}" class="categoryoffer-images" alt="Phone and Tablets"/>
                        </div>
                        <div class="categoryitemnames">
                            <p class="categoryname-text">phone and tablets</p>
                        </div>
                    </a>
                </div>
                <div class="masonary-griditem">
                    <a href="#">
                        <div class="categoryimage-item">
                            <img src="{{asset('myfigma/appliances.png')}}" class="categoryoffer-images" alt="Appliances"/>
                        </div>
                        <div class="categoryitemnames">
                            <p class="categoryname-text">appliences</p>
                        </div>
                    </a>
                </div>
            </div>
            <div class="column">
                    <div class="masonary-griditem">
                        <a href="#">
                            <div class="categoryimage-item">
                                <img src="{{asset('myfigma/smart_watches.png')}}" class="categoryoffer-images" alt="Smart_Watches"/>
                            </div>
                            <div class="categoryitemnames">
                                <p class="categoryname-text">smart watches</p>
                            </div>
                        </a>
                    </div>
                    <div class="masonary-griditem">
                        <a href="#">
                            <div class="categoryimage-item">
                                <img src="{{asset('myfigma/gadgets.png')}}" class="categoryoffer-images" alt="Gadgets"/>
                            </div>
                            <div class="categoryitemnames">
                                <p class="categoryname-text">gadgets</p>
                            </div>
                        </a>
                    </div>
            </div>
            <div class="column">
                    <div class="masonary-griditem">
                        <a href="#">
                            <div class="categoryimage-item">
                                <img src="{{asset('myfigma/electronics.png')}}" class="categoryoffer-images" alt="Electronics"/>
                            </div>
                            <div class="categoryitemnames">
                                <p class="categoryname-text">electronics</p>
                            </div>
                        </a>
                    </div>
                    <div class="masonary-griditem">
                        <a href="#">
                            <div class="categoryimage-item">
                                <img src="{{asset('myfigma/accessories.png')}}" class="categoryoffer-images" alt="Accessories"/>
                            </div>
                            <div class="categoryitemnames">
                                <p class="categoryname-text">accessories</p>
                            </div>
                        </a>
                    </div>
            </div>
        @endif

    </div>
  </div>
