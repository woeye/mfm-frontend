import { WagtailPageData } from "./pages";

export type WagtailBlock<ValuesType> = {
    type: string;
    id: string;
    value: ValuesType;
};

export type WagtailComponentParams<ValuesType> = {
  pageData: WagtailPageData;
  values: ValuesType;
};

export type WagtailImage = {
    title: string;
    file: string;
    width: number;
    height: number;
    focal_point_height: number | null;
    focal_point_width: number | null;
    focal_point_x: number | null;
    focal_point_y: number | null;
};

export type BackgroundImageValues = {
    image: WagtailImage;
};

export type BackgroundVideoValues = {
    video_url: string;
};

export type SubHeadlineValues = {
  headline: string;
};

export type TextContentValues = {
  content: string;
};

export type SingleImageValues = {
  image: WagtailImage;
  description: string;
};

export type ChildrenListValues = {
  folder: number;
  limit: number;
}
