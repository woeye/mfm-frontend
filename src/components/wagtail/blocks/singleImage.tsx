import Image from "next/image";
import { SingleImageValues, WagtailComponentParams } from "@/types/wagtail/blocks";


export default function SingleImage(params: WagtailComponentParams<SingleImageValues>) {
  const values = params.values;
  //const formattedDate = format(params.pageData.meta.first_published_at, "MM/yy")

  return (
      <div className="shadow-lg my-8">
        <Image
          src={values.image.file}
          alt={values.image.title}
          width={values.image.width}
          height={values.image.height}
        />
      </div>
  );
}
