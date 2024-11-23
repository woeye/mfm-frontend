//import { Metadata } from "next";
import { fetchPageByPath } from "@/lib/wagtail";
import React from "react";
import { notFound } from "next/navigation";
import WagtailPageRenderer from "@/components/wagtail/wagtailPageRenderer";

type Params = Promise<{ slug: string[] }>;
export default async function BlogArticle({ params }: { params: Params }) {
  const { slug } = await params;
  console.log(slug);

  if (slug.length == 0) {
    throw new Error("slug is missing");
  }

  try {
    const path = slug.join("/")
    console.log(path);
    const data = await fetchPageByPath(path);
    return (
      <WagtailPageRenderer pageData={data} />
    );
  } catch (error) {
    console.log("failed to fetch page JSON from CMS", error);
    if (error == "not-found") {
      notFound();
    } else {
      throw Error(error as string);
    }
  }
}
