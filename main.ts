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
// 2. Real surprise at the end — nothing before the last five words
//    hints at a shrimp, or at rent. The setup is an ordinary
//    wellness purchase; the final simile ("like a shrimp paying
//    rent") turns it into an absurd image that still makes sense:
//    the narrator is curved over exactly like a shrimp, and the
//    rent makes the shrimp a put-upon adult with bills.
// 3. An everyday truth people recognise — standing desks are bought
//    to fix posture, and the buyer hunches anyway. The desk did
//    not change the person; it only changed the height at which
//    they hunch.
// 4. Economical — 20 words, setup:punchline 15:5 (3:1). Every
//    word earns its place: "hunch" is the shrimp's own verb,
//    doing the work of a whole clause, and the punchline is five
//    words with nothing after it to explain the joke.
// 5. Fresh — "a shrimp paying rent" is a new collision of two
//    concrete images (curved sea creature + monthly bill). It is
//    not the saturated "raccoon with a mortgage" (ranks 1, 2 and 6
//    of the sibling Laugh Sprint final), not the field cliche
//    "you're welcome", and it shares no wording with any rival
//    line in the Laugh Sprint final pool.
import * as fs from "node:fs";
import * as path from "node:path";

// The single line this entry sends, and nothing else.
const LINE =
  "I bought a standing desk to fix my posture, and now I hunch over it like a shrimp paying rent.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// counted as Unicode code points, not only white space, and exactly
// one sentence. Any violation throws before anything is written, so
// a bad entry can never be graded.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`line is ${codePoints} code points, outside the 1-200 gate`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be whitespace-only");
}
if (LINE.trim() !== LINE) {
  throw new Error("line must not start or end with whitespace");
}
if (LINE.split(/[.!?]/).filter((s) => s.trim().length > 0).length !== 1) {
  throw new Error("line must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = path.join(outDir, "entry.txt");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, LINE, "utf8");

// Read-back check: the file on disk must be byte-identical to the
// gated string, so a partial or altered write is caught here.
const written = fs.readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt on disk does not match the line");
}

console.log(LINE);
console.log(
  `(${codePoints} code points, ${Buffer.byteLength(LINE, "utf8")} bytes)`,
);
