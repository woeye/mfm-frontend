import { fetchChildren } from "@/lib/wagtail";
import { ChildrenListValues, WagtailComponentParams } from "@/types/wagtail/blocks";
import WagtailBlocksRenderer from "../wagtailBlocksRenderer";
import { FlexPageData } from "@/types/wagtail/pages";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function ChildrenList(params: WagtailComponentParams<ChildrenListValues>) {
  let pages: FlexPageData[];
  try {
    pages = await fetchChildren(params.values.folder, params.values.limit, 0);
  } catch (error) {
    console.log(error);
    return <div>loading error</div>;
  }
  console.log("found pages: ", pages);

  return (
      <div>
        {pages.map((page) => {
        const formattedDate = formatDistanceToNow(page.meta.first_published_at);
        const url = new URL(page.meta.html_url);

        return (
            <div key={page.id}>
              <h2 className="font-rubik text-xl"><Link href={`${url.pathname}`}>{page.title}</Link></h2>
              <div className="flex items-center center-items content-stretch">
                <Clock className="text-mediumgray mr-1" size={16} />
                <p className="font-nunito text text-mediumgray">{formattedDate} ago</p>
              </div>
              <WagtailBlocksRenderer pageData={page} blocks={page.body}/>
            </div>
          );
        })}
      </div>
  );
};
