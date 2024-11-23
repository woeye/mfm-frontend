import { Metadata } from "next";
import { fetchPageData } from "@/lib/wagtail";
import React from "react";
import { notFound } from "next/navigation";
import WagtailPageRenderer from "@/components/wagtail/wagtailPageRenderer";

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
      console.log("got json", data)
      return (
          <WagtailPageRenderer pageData={data} />
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


// export default function BlogArticle() {
//   return (
//     <div>blog article</div>
//   );
// };
