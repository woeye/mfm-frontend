import { WagtailPageData } from "./pages";

export interface QueryPagesResponse {
  meta: {
    total_count: number;
  };
  items: WagtailPageData[];
}
