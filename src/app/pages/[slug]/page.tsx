import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPageData } from "@/lib/wagtail";
import WagtailBlocksRenderer from "@/components/wagtail/wagtailBlocksRenderer";
import Heading from "@/components/ui/heading";

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
      return (
        <div>
          <Heading size="h1">{data.title}</Heading>
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
