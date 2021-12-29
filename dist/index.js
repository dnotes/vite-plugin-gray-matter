import matter from 'gray-matter';
const GMdefaults = {
    exts: ['.md'],
    excerpt: false,
    excerpt_separator: '---',
    delimiters: '---',
    render: () => { }
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
                let res = [
                    `const data = ${JSON.stringify(obj.data)}`,
                    `const content = ${JSON.stringify(obj.content)}`,
                    `const html = ${JSON.stringify(opts.render(obj.content))}`,
                ];
                if (opts.excerpt) {
                    res.push(`const excerpt = ${JSON.stringify(obj?.excerpt)}`);
                    res.push(`const excerptHtml = ${JSON.stringify(opts.render(obj?.excerpt))}`);
                }
                res.push(`export { data, content, html ${opts.excerpt ? ', excerpt, excerptHtml' : ''} }`);
                return {
                    code: res.join('\n')
                };
            }
        }
    };
}
export default gm;
//# sourceMappingURL=index.js.map