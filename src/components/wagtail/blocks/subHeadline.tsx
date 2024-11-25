import Heading from "@/components/ui/heading";
import { SubHeadlineValues, WagtailComponentParams } from "@/types/wagtail/blocks";

export default function SubHeadline(params: WagtailComponentParams<SubHeadlineValues>) {
  const values = params.values;
  //const formattedDate = format(params.pageData.meta.first_published_at, "MM/yy")

  return (
      <div>
        <Heading size="h2">{values.headline}</Heading>
      </div>
  );
}
