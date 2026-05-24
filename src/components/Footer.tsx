import type { BlockComponentProps } from "cms-renderer/lib/types";
import type { Footer as FooterBlock } from "../../generated/cms-schemas";

// Single line of static text on the obsidian surface. The CMS renderer passes
// the block's fields under `content`, typed as the generated `Footer` schema;
// `text` is still validated against the schema.
export default function Footer({ content }: BlockComponentProps<FooterBlock>) {
  const { text } = content;
  return (
    <footer className="w-full bg-obsidian px-22 py-31">
      <p className="font-helveticanowdisplay text-body-sm font-normal text-canvas-white">
        {text}
      </p>
    </footer>
  );
}
