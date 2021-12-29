import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import mdPlugin from "./dist/index.js";

// Setup a markdown renderer for the vite-plugin-gray-matter
import { Remarkable } from 'remarkable'
import hljs from 'highlight.js/lib/core'
import js from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('js', js)
import ts from 'highlight.js/lib/languages/typescript'
hljs.registerLanguage('ts', ts)

const md = new Remarkable({
  typographer:true,
  highlight: (str,lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch(e) {}
    }
    try {
      return hljs.highlightAuto(str).value
    } catch(e) {}
  }
})

// Create a render function for vite-plugin-gray-matter
const render = (markdown = '') => {
  return md.render(markdown)
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [preprocess({})],
  kit: {
    adapter: adapter(),
    vite: {
      plugins: [
        mdPlugin({
          render,
        }),
      ],
    },

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },
};

export default config;
