# [Vite Plugin Gray Matter]
## a Vite / Rollup plugin for [gray-matter]

This is a [Vite] plugin for parsing Markdown files with Front Matter using the [gray-matter] npm module.
Feel free to check out the [vite-plugin-gray-matter repository] on GitHub.

## Import Markdown

This plugin imports Markdown and any associated Front Matter into Vite.
In your page templates or endpoints, this plugin will allow you to
`import content from '/README.md'` and obtain the following structure:

``` ts
{
  data:[key:string]:any // The parsed Yaml Front Matter from README.md
  content:string        // The Markdown-formatted text from README.md
  excerpt?:string       // The "excerpt" Markdown from README.md (requires configuration)
}
```

The "excerpt" is a convention allowing the inclusion of a separate Markdown
section, before the main content of the file, which will be provided on its own
in the returned object. AFAIK [gray-matter] is the only file reader which supports
this convention.

**IMPORTANT NOTE:** This plugin **does not render** the Markdown content as HTML,
it only obtains the data for use in [Vite].
You can then use any Markdown parser to obtain the necessary HTML.

## Installation

Install as usual using your favorite npm package manager.

## Usage

I've only worked with [SvelteKit], not [Vite] on its own, hence the example below.
However, this plugin should work for any [Vite] or even [rollup.js] project.
I'm happy to add usage instructions for those if anyone wants to PR some.

### SvelteKit

1. **Import the module in `svelte.config.js`**

    ``` js
    import mdPlugin from 'vite-plugin-gray-matter'
    ```

2. **Add the Vite configuration in `svelte.config.js`**

    ``` ts
    const config = {
      preprocess: preprocess(),
      kit: {
        adapter: adapter(),
        vite: {
          plugins: [
            mdPlugin({ // Options are listed here, with their defaults:

              // the extensions of files to be handled as Markdown by this plugin
              exts: ['.md'],

              // whether or not to return an excerpt
              excerpt: false,

              // the text string which, when on a line by itself, separates the excerpt from the main content
              excerpt_separator: '---',

              // the text string which, when on a line by itself, represents the beginning and end of the front matter
              delimiters: '---',

            })
          ]
        }
    ```

3. **Go wild**

    ``` ts
    const posts = import.meta.glob('/content/*.md')
    ```

    (For working code examples, see
    \[slug\].json
    and
    Header.svelte
    in the [vite-plugin-gray-matter repository].)

## Troubleshooting

The following problems are addressed in the FAQ:

* Vite cannot import a file outside of the project directory


[Vite Plugin Gray Matter]: //vite-plugin-gray-matter.dnotes.net
[vite-plugin-gray-matter repository]: //github.com/dnotes/vite-plugin-gray-matter
[gray-matter]: //npmjs.com/package/gray-matter
[Vite]: //vitejs.dev
[rollup.js]: //rollupjs.org