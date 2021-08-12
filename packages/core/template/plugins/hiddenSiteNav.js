// hiddenSiteNav.js
const cheerio = module.parent.require('cheerio');

module.exports = {
    processNode: (pluginContext, node) => {
        if (node.attribs.slot === 'brand') {
            cheerio(node)
                .children('.navbar-brand')
                .removeAttr('slot')
                .wrap('<div slot="brand"></div>')
                .before(
                    '<button '
                    + 'href="#" '
                    + 'id="site-nav-show-button"'
                    + `class="fa fa-bars btn btn-${node.attribs.type}"`
                    + '></button>'
                )
                .before(
                    '<button '
                    + 'href="#" '
                    + 'id="site-nav-hide-button"'
                    + `class="fa fa-chevron-left btn btn-${node.attribs.type}" `
                    + 'hidden'
                    + '></button>'
                )
        }

        if (node.attribs.id === 'site-nav') {
            cheerio(node).attr('hidden', 'hidden');
        }
    },
    postRender: (pluginContext, frontMatter, content) => {
        const $ = cheerio.load(content, { xmlMode: false });
        $('#site-nav-show-button').click(() => {
            $('#site-nav').removeAttr('hidden');
            $('#site-nav-hide-button').removeAttr('hidden');
            $('#site-nav-show-button').attr('hidden', 'hidden');
        });

        $('#site-nav-hide-button').click(() => {
            $('#site-nav').attr('hidden', 'hidden');
            $('#site-nav-hide-button').attr('hidden', 'hidden');
            $('#site-nav-show-button').removeAttr('hidden');
        });

        return $.html();
    }
}