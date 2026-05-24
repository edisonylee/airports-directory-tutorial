import type { BlockComponentProps } from "cms-renderer/lib/types";
import type { Nav as NavBlock } from "../../generated/cms-schemas";

// Brand-only top bar. The CMS renderer passes the block's fields under `content`,
// typed here as the generated `Nav` schema — so destructuring `brand` is still
// checked against the CMS, and a field rename breaks the build.
export default function Nav({ content }: BlockComponentProps<NavBlock>) {
  const { brand } = content;
  return (
    <header className="w-full border-b border-slate-mist/40 bg-canvas-white">
      <div className="flex items-center px-22 py-23">
        <span className="flex items-center gap-11 font-helveticanowdisplay text-subheading font-bold text-obsidian">
          <span className="size-11 rounded-full bg-desert-sienna" aria-hidden="true" />
          {brand}
        </span>
      </div>
    </header>
  );
}
