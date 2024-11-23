import { FlexPageData } from "@/types/wagtail/pages";
import WagtailBlocksRenderer from "@/components/wagtail/wagtailBlocksRenderer";
import Link from "next/link";
// import { formatDistanceToNow } from "date-fns";

/**
 * MagazinePage is the page type for magazine pages.
 */
export default function FlexPage(page: FlexPageData) {
  // const formattedDate = formatDistanceToNow(page.meta.first_published_at);
  const url = new URL(page.meta.html_url);

  return (
    <div className={`flex-page flex-page-id-${page.id}`}>
      <h1 className="font-rubik text-3xl"><Link href={`${url.pathname}`}>{page.title}</Link></h1>
      <WagtailBlocksRenderer pageData={page} blocks={page.body}/>
    </div>
  );
};
