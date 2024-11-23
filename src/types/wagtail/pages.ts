//import { BackgroundImageValues, BackgroundVideoValues, WagtailBlock, WagtailImage } from "./blocks"

import { WagtailBlock, WagtailImage } from "./blocks";

export interface WagtailPageData {
    id: number;
    meta: {
        type: string;
        detail_url: string;
        html_url: string;
        slug: string;
        show_in_menus: boolean;
        seo_title: string;
        search_description: string;
        first_published_at: string;
        locale: string;
    };
    title: string;
}

export interface BlogPostData extends WagtailPageData {
  abstract: string;
  link_image: WagtailImage;
  body: WagtailBlock<never>[];
}

export interface FlexPageData extends WagtailPageData {
  body: WagtailBlock<never>[];
  //hide_title: boolean;
}
