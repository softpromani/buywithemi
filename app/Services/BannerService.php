<?php

namespace App\Services;

use App\Traits\FileManagerTrait;
use Illuminate\Support\Facades\DB;

class BannerService
{
    use FileManagerTrait;

    public function getProcessedData(object $request, string $image = null): array
    {
        if ($image) {
            $imageName = $request->file('image') ? $this->update(dir:'banner/', oldImage:$image, format: 'webp', image: $request->file('image')) : $image;
        }else {
            $imageName = $this->upload(dir:'banner/', format: 'webp', image: $request->file('image'));
        }

        if ($request['banner_type'] == 'Home Category Banner') {
            // Initialize sequence
            $sequence = $request->has('sequence') && !empty($request['sequence']) ? $request['sequence'] : null;

            if (is_null($sequence)) {
                // Get the highest sequence number
                $highestSequence = DB::table('banners')
                    ->where('banner_type', 'Home Category Banner')
                    ->max('sequence');

                // Start with the next number
                if(isset($sequence)){
                    $sequence = $highestSequence + 1;
                }
                else{
                    $sequence = 1;
                }
            } else {
                // Ensure the sequence is unique
                $existingSequence = DB::table('banners')
                    ->where('banner_type', 'Home Category Banner')
                    ->where('sequence', $sequence)
                    ->exists();

                if(isset($existingSequence)){
                    while ($existingSequence) {
                        // If it exists, increment by 1 and check again
                        $sequence++;
                        $existingSequence = DB::table('banners')
                            ->where('banner_type', 'Home Category Banner')
                            ->where('sequence', $sequence)
                            ->exists();
                    }
                }
                else{
                    $sequence = 1;
                }

            }
        }

        return [
            'banner_type' => $request['banner_type'],
            'resource_type' => $request['resource_type'],
            'resource_id' => $request[$request->resource_type . '_id'],
            'theme' => theme_root_path(),
            'title' => $request['title'],
            'sub_title' => $request['sub_title'],
            'button_text' => $request['button_text'],
            'background_color' => $request['background_color'],
            'url' => $request['url'],
            'photo' => $imageName,
            'sequence' => $sequence ?? Null,
        ];
    }

    public function getBannerTypes(): array
    {
        $bannerTypes = [];
        if (theme_root_path() == 'default') {
            $bannerTypes = [
                "Main Banner" => translate('main_Banner'),
                "Main Banner Right" => translate('main_Banner_Right'),
                "Home Category Banner" => translate('home_Category_Banner'),
                "Popup Banner" => translate('popup_Banner'),
                "Footer Banner" => translate('footer_Banner'),
                "Main Section Banner" => translate('main_Section_Banner')
            ];

        }elseif (theme_root_path() == 'theme_aster') {
            $bannerTypes = [
                "Main Banner" => translate('main_Banner'),
                "Main Banner Right" => translate('main_Banner_Right'),
                "Home Category Banner" => translate('home_Category_Banner'),
                "Popup Banner" => translate('popup_Banner'),
                "Footer Banner" => translate('footer_Banner'),
                "Main Section Banner" => translate('main_Section_Banner'),
                "Header Banner" => translate('header_Banner'),
                "Sidebar Banner" => translate('sidebar_Banner'),
                "Top Side Banner" => translate('top_Side_Banner'),
            ];
        }elseif (theme_root_path() == 'theme_fashion') {
            $bannerTypes = [
                "Main Banner" => translate('main_Banner'),
                "Main Banner Right" => translate('main_Banner_Right'),
                "Home Category Banner" => translate('home_Category_Banner'),
                "Popup Banner" => translate('popup_Banner'),
                "Promo Banner Left" => translate('promo_banner_left'),
                "Promo Banner Middle Top" => translate('promo_banner_middle_top'),
                "Promo Banner Middle Bottom" => translate('promo_banner_middle_bottom'),
                "Promo Banner Right" => translate('promo_banner_right'),
                "Promo Banner Bottom" => translate('promo_banner_bottom'),
            ];
        }

        return $bannerTypes;
    }

}
