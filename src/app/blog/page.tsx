import Link from "next/link";
import { fetchBlogPosts} from "@/lib/wagtail";
import { formatDistanceToNow } from "date-fns";
import { Clock } from "lucide-react";
import WagtailBlocksRenderer from "@/components/wagtail/wagtailBlocksRenderer";
import { BlogPostData } from "@/types/wagtail/pages";
import Heading from "@/components/ui/heading";


export default async function Blog() {
  const data = await fetchBlogPosts(20, 0);
  console.log("got json", data);

  // const pageIDs = data.items.reduce(function (acc, page): number[] { acc.push(page.id); return acc }, [] as number[])
  // console.log(pageIDs);

  const articles = data.items as BlogPostData[];

  return (
    <div>
      {articles.map((blogPost) => {
        const formattedDate = formatDistanceToNow(blogPost.meta.first_published_at);
        //const url = new URL(blogPost.meta.html_url);

        return (
          <div key={blogPost.id} className="mb-32">
            <Heading size="h2">
              <Link className="hover:text-black" href={`/blog/${blogPost.meta.slug}`}>{blogPost.title}</Link>
            </Heading>
            <div className="flex items-center center-items content-stretch">
              <Clock className="text-mediumgray mr-1" size={16} />
              <p className="font-nunito text text-mediumgray">{formattedDate} ago</p>
            </div>
            <WagtailBlocksRenderer pageData={blogPost} blocks={blogPost.body}/>
          </div>
        );
      })}
    </div>
  );
}
