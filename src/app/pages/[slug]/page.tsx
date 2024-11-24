import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { fetchPageData } from "@/lib/wagtail";
import WagtailBlocksRenderer from "@/components/wagtail/wagtailBlocksRenderer";

// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type Params = Promise<{ slug: string }>;
export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
//export async function generateMetadata(props: { params: Params, searchParams: SearchParams }): Promise<Metadata> {
  const { slug } = await props.params;

  try {
      const pageData = await fetchPageData("home.FlexPage", slug);
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

export default async function FlexPage({ params }: { params: Params }) {
  const { slug } = await params;

  if (slug === null) {
     throw new Error("slug is missing");
  }

  try {
      const data = await fetchPageData("home.FlexPage", slug);
      console.log("got json", data);
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
  } catch (error) {
      console.log("failed to fetch page JSON from CMS", error);
      if (error == 404) {
          notFound();
      } else {
          throw Error(error as string);
      }
  }
}
