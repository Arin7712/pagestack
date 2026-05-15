// This is the core markdown engine

import { unified } from "unified";

import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";

import remarkRehype from "remark-rehype";

import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export async function renderMarkdown(
  markdown: string
) {
  const processedFile = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);

  return processedFile.toString();
}