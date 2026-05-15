import { renderMarkdown } from "@/lib/markdown/render";

export async function GET() {
  const markdown = `
# Hello

This is **markdown**
`.trim();

  const html = await renderMarkdown(markdown);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
