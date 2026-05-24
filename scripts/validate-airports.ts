import { readFileSync } from 'node:fs';
import { z } from 'zod';
import { airportSchema } from '../generated/cms-schemas';

// Validate every record in data/airports.json against the CMS airport schema.
const airports = JSON.parse(
  readFileSync(new URL('../data/airports.json', import.meta.url), 'utf8')
);

const listSchema = z.array(airportSchema);
const result = listSchema.safeParse(airports);

if (!result.success) {
  console.error('[validate-airports] FAILED:');
  console.error(JSON.stringify(result.error.issues, null, 2));
  process.exit(1);
}

// Extra sanity checks beyond the (all-optional) schema.
const seen = new Set<string>();
const problems: string[] = [];
for (const a of result.data) {
  if (!a.code) problems.push(`missing code: ${a.name}`);
  else if (seen.has(a.code)) problems.push(`duplicate code: ${a.code}`);
  else seen.add(a.code);
  if (a.latitude == null || a.latitude < -90 || a.latitude > 90)
    problems.push(`bad latitude for ${a.code}: ${a.latitude}`);
  if (a.longitude == null || a.longitude < -180 || a.longitude > 180)
    problems.push(`bad longitude for ${a.code}: ${a.longitude}`);
}

if (problems.length) {
  console.error('[validate-airports] sanity checks FAILED:');
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}

console.log(`[validate-airports] OK — ${result.data.length} airports valid, all codes unique.`);
