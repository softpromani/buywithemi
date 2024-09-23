
                <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
                    <channel>
                      <title>Fast EMI</title>
                      <link>{{ url('/') }}</link>
                      <description>Product feed for your shop</description>
                      @foreach ($products as $product)
                      <item>
                        <g:id>{{ $product->id }}</g:id>
                        <g:title>{{ $product['name'] }}</g:title>
                        <g:description>{{ $product['slug'] }}</g:description>
                        <g:link>{{ url('/product/' . $product['slug']) }}</g:link>
                        <g:image_link>{{ getStorageImages(path: $product->thumbnail_full_url) }}</g:image_link>
                        <g:price>{{setCurrencySymbol(amount: usdToDefaultCurrency(amount: $product['unit_price']), currencyCode: getCurrencyCode()) }}</g:price>
                        <g:availability>{{ $product->current_stock>0 ? 'in stock' : 'out of stock' }}</g:availability>
                      </item>
                      @endforeach
                    </channel>
                  </rss>
