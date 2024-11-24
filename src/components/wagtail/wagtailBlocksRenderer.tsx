import React, { Fragment } from "react";
import { WagtailBlock } from "@/types/wagtail/blocks";
import { WagtailPageData } from "@/types/wagtail/pages";
import SubHeadline from "./blocks/subHeadline";
import TextContent from "./blocks/textContent";
import SingleImage from "./blocks/singleImage";


type WagtailBlocksRendererParams = {
  pageData: WagtailPageData;
  blocks: WagtailBlock<never>[];
}
export default function WagtailBlocksRenderer(params: WagtailBlocksRendererParams) {
  console.log("wagtailBlocksRenderer blocks: ", params.blocks);
  return (
    <>
      {params.blocks.map((block) => {
        console.log("rendering block: ", block);
        let component: React.JSX.Element;
        switch (block.type) {
          case "sub_headline":
            component = <SubHeadline pageData={params.pageData} values={block.value} />;
            break;
          case "text_content":
            component = <TextContent pageData={params.pageData} values={block.value} />;
            break;
          case "single_image":
            component = <SingleImage pageData={params.pageData} values={block.value} />;
            break;
          default:
            component = <div className="bg-danger p-4">unknown component: <code>{block.type}</code></div>;
        }
        return (
          <Fragment key={block.id}>{component}</Fragment>
        );
      })}
    </>
  );
}
