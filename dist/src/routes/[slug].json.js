const allContent = Object.fromEntries(Object.entries(import.meta.glob('/*.md')).map(([k, item]) => [k.toLowerCase(), item]));
import { Remarkable } from 'remarkable';
import hljs from 'highlight.js/lib/core';
import js from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('js', js);
import ts from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('ts', ts);
const md = new Remarkable({
    typographer: true,
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            }
            catch (e) { }
        }
        try {
            return hljs.highlightAuto(str).value;
        }
        catch (e) { }
    }
});
export async function get({ params }) {
    const slug = params?.slug ? params.slug.toLowerCase() : 'readme';
    const item = await allContent[`/${slug}.md`]();
    if (!item)
        return { status: 404 };
    return {
        body: {
            ...item,
            html: md.render(item?.content)
        }
    };
}
//# sourceMappingURL=%5Bslug%5D.json.js.map