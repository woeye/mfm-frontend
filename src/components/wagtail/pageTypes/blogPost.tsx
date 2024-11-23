import WagtailBlocksRenderer from "@/components/wagtail/wagtailBlocksRenderer";
import { BlogPostData } from "@/types/wagtail/pages";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

/**
 * MagazinePage is the page type for magazine pages.
 */
export default function BlogPost(data: BlogPostData) {
  const formattedDate = formatDistanceToNow(data.meta.first_published_at);

  return (
    <div>
        <h2 className="font-rubik text-3xl">{data.title}</h2>
        <div className="flex flex-row items-center content-stretch">
          <Clock className="text-mediumgray mr-1" size={16} />
          <p className="font-nunito text text-mediumgray">{formattedDate} ago</p>
        </div>
        <WagtailBlocksRenderer pageData={data} blocks={data.body}/>
    </div>
  );
};
