"use server";

import { fetchPageDataById } from "@/lib/wagtail";
import { BlogArticleData } from "@/types/wagtail/pages";

export default async function fetchArticles(pageIds: number[]): Promise<BlogArticleData[]> {
    const promises = pageIds.map<Promise<BlogArticleData>>((pageId) => {
        return fetchPageDataById(pageId) as Promise<BlogArticleData>;
    });
    return Promise.all(promises);
};
