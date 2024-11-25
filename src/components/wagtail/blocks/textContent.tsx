import { TextContentValues, WagtailComponentParams } from "@/types/wagtail/blocks";

export default function TextContent(params: WagtailComponentParams<TextContentValues>) {
  const values = params.values;
  //const formattedDate = format(params.pageData.meta.first_published_at, "MM/yy")

  return (
      <div className="font-sans-serif mt-4 text-darkgray" dangerouslySetInnerHTML={{ __html: values.content }} />
  );
}
