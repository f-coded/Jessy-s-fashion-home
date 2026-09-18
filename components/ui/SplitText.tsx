import { Fragment } from "react";

/**
 * Server-side text splitter matching the template's markup:
 *   <span class="split-word"><span class="split-char">W</span>…</span><span class="split-char"> </span>…
 * The `.reveal-text` ScrollTrigger animates every `.split-char`.
 */
export default function SplitText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="split-word" style={{ whiteSpace: "nowrap", display: "inline-block" }}>
            {[...word].map((ch, ci) => (
              <span key={ci} className="split-char" style={{ display: "inline-block" }}>
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && (
            <span className="split-char" style={{ display: "inline-block" }}>
              {" "}
            </span>
          )}
        </Fragment>
      ))}
    </>
  );
}
