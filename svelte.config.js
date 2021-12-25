import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import mdPlugin from "./dist/index.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [preprocess({})],
  kit: {
    adapter: adapter(),
    vite: {
      plugins: [
        mdPlugin({
          exts: [".md"],
          excerpt: false,
          excerpt_separator: "---",
          delimiters: "---",
        }),
      ],
    },

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },
};

export default config;
