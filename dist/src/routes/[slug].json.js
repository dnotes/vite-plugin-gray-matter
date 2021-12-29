const allContent = Object.fromEntries(Object.entries(import.meta.glob('/*.md')).map(([k, item]) => [k.toLowerCase(), item]));
export async function get({ params }) {
    const slug = params?.slug ? params.slug.toLowerCase() : 'readme';
    const item = await allContent[`/${slug}.md`]();
    if (!item)
        return { status: 404 };
    return {
        body: {
            ...item,
        }
    };
}
//# sourceMappingURL=%5Bslug%5D.json.js.map