import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPageData } from "@/lib/wagtail";
import WagtailBlocksRenderer from "@/components/wagtail/wagtailBlocksRenderer";
import { Clock } from "lucide-react";
import Link from "next/link";
import Heading from "@/components/ui/heading";

// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type Params = Promise<{ slug: string }>;
export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
//export async function generateMetadata(props: { params: Params, searchParams: SearchParams }): Promise<Metadata> {
  const { slug } = await props.params;

  try {
      const pageData = await fetchPageData("home.BlogPostPage", slug);
      return {
          title: pageData.title,
          description: pageData.meta.search_description,
      };
  } catch {
      return {
          title: "404",
          description: "page not found",
      };
  }
}

export default async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params;

  if (slug === null) {
     throw new Error("slug is missing");
  }

  try {
      const data = await fetchPageData("home.BlogPostPage", slug);
      const formattedDate = formatDistanceToNow(data.meta.first_published_at);

      console.log("got json", data);
      return (
        <div>
          <div className="text-mediumgray text-sm mb-8">
            <Link className="hover:text-black" href="/blog">Blog</Link> / <span>{data.title}</span>
          </div>
          <Heading size="h1">{data.title}</Heading>
          <div className="flex flex-row items-center content-stretch">
            <Clock className="text-mediumgray mr-1" size={16} />
            <p className="font-nunito text text-mediumgray">{formattedDate} ago</p>
          </div>
          <WagtailBlocksRenderer pageData={data} blocks={data.body}/>
        </div>
      );
  } catch (error) {
      console.log("failed to fetch page JSON from CMS", error);
      if (error == 404) {
          notFound();
      } else {
          throw Error(error as string);
      }
  }
}
