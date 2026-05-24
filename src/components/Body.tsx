import type { BlockComponentProps } from "cms-renderer/lib/types";
import type { Body as BodyBlock } from "../../generated/cms-schemas";

// Details panel for a single airport: code / city / country rows plus a
// coordinates line. The CMS renderer passes the block's fields under `content`,
// typed as the generated `Body` schema, so every destructured field name is
// still checked against the CMS.
export default function Body({ content }: BlockComponentProps<BodyBlock>) {
  const { code, city, country, latitude, longitude } = content;
  const coordinates =
    latitude != null && longitude != null
      ? `${Math.abs(latitude).toFixed(4)}° ${latitude >= 0 ? "N" : "S"}, ` +
        `${Math.abs(longitude).toFixed(4)}° ${longitude >= 0 ? "E" : "W"}`
      : undefined;

  return (
    <section className="bg-canvas-white px-22 py-68">
      <dl className="mx-auto flex max-w-xl flex-col gap-23 rounded-other border border-slate-mist/40 p-card-padding">
        <DetailRow label="IATA Code" value={code} />
        <DetailRow label="City" value={city} />
        <DetailRow label="Country" value={country} />

        <div className="flex items-center gap-11 pt-16">
          <span className="size-11 rounded-full bg-desert-sienna" aria-hidden="true" />
          <span className="font-helveticanowdisplay text-body-sm font-normal text-slate-mist">
            {coordinates}
          </span>
        </div>
      </dl>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-23 border-b border-slate-mist/30 pb-16 last:border-b-0 last:pb-0">
      <dt className="font-helveticanowdisplay text-body-sm font-normal uppercase text-slate-mist">
        {label}
      </dt>
      <dd className="font-helveticanowdisplay text-subheading font-bold text-obsidian">
        {value}
      </dd>
    </div>
  );
}
