const cheerio = module.parent.require('cheerio');
const { ComponentParser } = require('../../parsers/ComponentParser');

module.exports = {
  postRender: (content) => {
    const $ = cheerio.load(content);
    let popoversHtml = '';
    $('li.footnote-item').each((index, li) => {
      const id = `pop:footnote${index + 1}`;
      popoversHtml += `
        <popover id="${id}">
          <div slot="content">
            ${$(li).html()}
          </div>
        </popover>
      `;
    });
    $('#content-wrapper')
      .append($('hr.footnotes-sep'))
      .append($('section.footnotes').append(popoversHtml));
    $('section.footnotes popover').each((index, popover) => {
      ComponentParser.parseComponents(popover);
    });
    return $.html();
  },
};
