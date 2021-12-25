import matter from 'gray-matter';
const GMdefaults = {
    exts: ['.md'],
    excerpt: false,
    excerpt_separator: '---',
    delimiters: '---',
};
function gm(options) {
    const opts = Object.assign({}, GMdefaults, options);
    const exts = opts.exts.join('|').replace(/^\./g, '');
    const fileRegex = new RegExp(`\\.(?:${exts})$`, 'i');
    return {
        name: 'gray-matter',
        transform(src, id) {
            if (fileRegex.test(id)) {
                const obj = matter(src, opts);
                return {
                    code: [
                        `const data = ${JSON.stringify(obj.data)}`,
                        `const content = ${JSON.stringify(obj.content)}`,
                        `const excerpt = ${JSON.stringify(obj?.excerpt)}`,
                        `export { data, content, excerpt }`
                    ].join('\n')
                };
            }
        }
    };
}
export default gm;
//# sourceMappingURL=index.js.map