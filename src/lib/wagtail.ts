"use server";

import { WagtailPageData } from "@/types/wagtail/pages";
import { QueryPagesResponse } from "@/types/wagtail/response";
import { redirect } from "next/navigation"

export async function fetchPageByPath(path: string): Promise<WagtailPageData> {
  // ask the CMS for the given slug
  return new Promise((resolve, reject) => {
    const pageUrl = `${process.env.NEXT_PUBLIC_WAGTAIL_API}/pages/find/?html_path=/${path}`;
    console.log("fetching page by path: ", pageUrl);
    fetch(pageUrl, {
      cache: "no-cache",
      redirect: "follow",
      //next: { revalidate: 3600 }
    }).then((findRes) => {
      console.log("findRes: ", findRes);
      if (!findRes.ok) {
        if (findRes.status == 404) {
          reject("not-found");
          return;
        }
        reject("internal-error");
        return;
      }
      resolve(findRes.json());
    }).catch(error => {
      console.log("find failed: ", error);
      reject("internal-error");
    });

    // if (!findRes.ok) {
    //   console.log("find failed:", findRes);
    //   if (findRes.status == 404) {
    //     throw notFound();
    //   }
    // }

    // const location = findRes.headers.get("Location")
    // if (location === null) {
    //   throw notFound();
    // }
    // console.log("using page details location: ", location);

    // const res = await fetch(location, {
    //   cache: "no-cache",
    //   // next: { revalidate: 3600 },
    // });
    // if (!res.ok) {
    //   // This will activate the closest `error.js` Error Boundary
    //   redirect(`/server-error?status_code=${res.status}&msg=${encodeURIComponent(res.statusText)}`);
    // }
    // //console.log(body)

  });
};

export async function fetchPageData(cmsType: string, slug: string) {
  // ask the CMS for the given slug
  const pageUrl = `${process.env.NEXT_PUBLIC_WAGTAIL_API}/pages/?type=${cmsType}&slug=${slug}`;
  console.log(`fetching pageUrl: ${pageUrl}`);
  const cacheTag = `${slug}`;
  const filterRes = await fetch(pageUrl, {
    cache: "no-cache",
    next: { tags: [cacheTag] }
  });

  if (!filterRes.ok) {
    console.log("filtering failed:", filterRes);
    if (filterRes.status == 404) {
      throw new Error("CMS filtering endpoint not found");
    }
    // This will activate the closest `error.js` Error Boundary
    redirect(`/server-error?status_code=${filterRes.status}&msg=${encodeURIComponent(filterRes.statusText)}`);
  }
  const filterData = await filterRes.json();
  //console.log(filterData)

  // do we have a matching page?
  if (filterData.meta.total_count == 0) {
    throw 404;
  }

  //filterData.items.forEach((item: any) => console.log(item.meta))

  // find our correct page
  // const pageItem = filterData.items.filter((item) => item.)

  // get page ID
  const pageId = filterData.items[0].id;
  //console.log("fetching page by ID: ", pageId);
  return fetchPageDataById(pageId);
};

export async function fetchPageDataById(pageId: number) {
  const url = `${process.env.NEXT_PUBLIC_WAGTAIL_API}/pages/${pageId}/?format=json`
  console.log("fetching page details from: ", url);
  const res = await fetch(url, {
    cache: "no-cache",
    next: { tags: [`${pageId}`] },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    redirect(`/server-error?status_code=${res.status}&msg=${encodeURIComponent(res.statusText)}`);
  }
  //console.log(body)

  return res.json();
};

// export async function fetchChildren(parentPageId: number, limit: number, offset: number): Promise<FlexPageData[]> {
//   const url = `${process.env.NEXT_PUBLIC_WAGTAIL_API}/pages/?format=json&child_of=${parentPageId}&limit=${limit}&offset=${offset}`
//   console.log("fetching children: ", url);
//   const res = await fetch(url, {
//     cache: "no-cache",
//   });

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     redirect(`/server-error?status_code=${res.status}&msg=${encodeURIComponent(res.statusText)}`);
//   }
//   //console.log(body)
//   const data = await res.json() as QueryPagesResponse

//   const pageIDs = data.items.reduce(function (acc, page): number[] { acc.push(page.id); return acc }, [] as number[])
//   const promises = pageIDs.map<Promise<FlexPageData>>((pageId) => {
//     return fetchPageDataById(pageId) as Promise<FlexPageData>;
//   });
//   return await Promise.all(promises);
// };

export async function fetchBlogPosts(limit: number, offset: number): Promise<QueryPagesResponse> {
  const pageType = "home.BlogPostPage";
  const url = `${process.env.NEXT_PUBLIC_WAGTAIL_API}/pages/?format=json&type=${pageType}&fields=body,link_image,abstract&limit=${limit}&offset=${offset}`
  console.log("fetching pages: ", url);
  const res = await fetch(url, {
    next: { revalidate: 3600 },
    //cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    redirect(`/server-error?status_code=${res.status}&msg=${encodeURIComponent(res.statusText)}`);
  }
  return res.json();
};

export async function fetchDocuments() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WAGTAIL_API}/documents?format=json`, {
    // cache: "force-cache",
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("failed to fetch documents data from CMS");
  }

  return res.json();
};
