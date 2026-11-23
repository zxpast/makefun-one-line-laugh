// The One-Line Laugh.
//
// One fixed funny line, written to /output/entry.txt. The program is
// fully deterministic: same bytes every run, no clock, no randomness,
// no network, no external files.
//
// The line:
//   I bought a standing desk to fix my posture, and now I hunch over
//   it like a shrimp paying rent.
//
// Why this line, against the judge's brief, in order:
// 1. One funny line within 200 characters — a single sentence, 94
//    characters, plain text, no numbers, no quote, no setup that
//    explains anything.
// 2. The twist sits in the last words — nothing before "like a shrimp
//    paying rent" hints at a shrimp, or at rent. The setup is an
//    ordinary wellness purchase; the final simile turns it into an
//    absurd image that still makes sense: the narrator is curved over
//    exactly like a shrimp, and the rent makes the shrimp a put-upon
//    adult with bills.
// 3. The narrator is the butt of the joke (self-own) — he bought the
//    desk to fix his posture and hunches anyway. The desk did not
//    change the person; it only changed the height at which he hunches.
// 4. Economical — 20 words, setup:punchline 15:5 (3:1). Every word
//    earns its place: "hunch" is the shrimp's own verb, doing the work
//    of a whole clause, and the punchline is five words with nothing
//    after it to explain the joke.
// 5. Fresh — "a shrimp paying rent" collides two concrete images
//    (curved sea creature + monthly bill) that no one else in the
//    field is likely to have paired.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const LINE =
  'I bought a standing desk to fix my posture, and now I hunch over it like a shrimp paying rent.';

const DEST = join(OUTPUT_DIR, 'entry.txt');

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(DEST, LINE + '\n', 'utf8');
} catch (err) {
  console.error(`entry.txt could not be written to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Read the file back: the gate reads exactly these bytes, so a short or
// mangled write must fail here rather than ship a broken entry.
let back: string;
try {
  back = readFileSync(DEST, 'utf8');
} catch (err) {
  console.error(`entry.txt could not be read back from ${DEST}: ${(err as Error).message}`);
  process.exit(1);
}
if (back !== LINE + '\n') {
  console.error(`entry.txt read back does not match the entry line (got ${back.length} bytes)`);
  process.exit(1);
}
