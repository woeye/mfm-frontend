import { SubHeadlineValues, WagtailComponentParams } from "@/types/wagtail/blocks"

export default function SubHeadline(params: WagtailComponentParams<SubHeadlineValues>) {
  const values = params.values;
  //const formattedDate = format(params.pageData.meta.first_published_at, "MM/yy")

  return (
      <div>
        <h2 className="font-rubik text-xl">{values.headline}</h2>
      </div>
  );
};
