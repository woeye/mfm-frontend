import {
    BlogPostData,
    FlexPageData,
    WagtailPageData,
} from "@/types/wagtail/pages";

import BlogPost from "./pageTypes/blogPost";
import FlexPage from "./pageTypes/flexPage";

export default function WagtailPageRenderer({pageData}: { pageData: WagtailPageData }) {
    // figure out which page component type to use
    switch (pageData.meta.type) {
      case "home.FlexPage":
        return <FlexPage {...pageData as FlexPageData} />;
      case "home.BlogPostPage":
        return <BlogPost {...pageData as BlogPostData} />;
      default:
        throw new Error(`unknown page type: ${pageData.meta.type}`);
    }
};
