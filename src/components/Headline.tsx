import type { BlockComponentProps } from "cms-renderer/lib/types";
import type { Headline as HeadlineBlock } from "../../generated/cms-schemas";

// Airport name with a code / city / country subtitle. The CMS renderer passes
// the block's fields under `content`, typed as the generated `Headline` schema;
// `title` and `subtitle` are still validated against the schema.
export default function Headline({ content }: BlockComponentProps<HeadlineBlock>) {
  const { title, subtitle } = content;
  return (
    <section className="bg-canvas-white px-22 py-68">
      <div className="flex flex-col gap-23">
        <span className="h-[3px] w-60 rounded-full bg-desert-sienna" aria-hidden="true" />
        <h1 className="font-helveticanowdisplay text-heading font-bold text-obsidian">
          {title}
        </h1>
        <p className="font-helveticanowdisplay text-subheading font-normal text-slate-mist">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
