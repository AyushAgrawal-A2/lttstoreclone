import cheerio from 'cheerio';

async function scrapeBlogs() {
  const blogs: Blog[] = [];
  try {
    const url = new URL(
      'https://www.lttstore.com/blogs/the-newsletter-archive'
    );
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    $(
      'main#MainContent div.main-blog div.blog-articles div.blog-articles__article.article'
    ).each((i, el) => {
      const blogCardEl = $(el).find('div.card > div.card__inner');
      const path =
        $(blogCardEl)
          .find('div.card__content div.card__information h3.card__heading.h2 a')
          .prop('href') ?? '';
      const heading = $(blogCardEl)
        .find('div.card__content div.card__information h3.card__heading.h2 a')
        .text()
        .trim();
      const cardText = $(blogCardEl)
        .find('div.card__content div.card__information p.article-card__excerpt')
        .text()
        .trim();
      const date = $(blogCardEl)
        .find(
          'div.card__content div.card__information div.article-card__info time'
        )
        .text();
      const imgSrc = $(blogCardEl)
        .find('div.article-card__image-wrapper img')
        .prop('src');
      const imgURL = imgSrc
        ? 'https:' + imgSrc.slice(0, imgSrc.indexOf('?'))
        : '';
      blogs.push({
        path,
        heading,
        cardText,
        date,
        imgURL,
        contents: [],
      });
    });
    await Promise.all(blogs.map((blog) => scrapeBlog(blog)));
    return blogs;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function scrapeBlog(blog: Blog) {
  try {
    const url = new URL('https://www.lttstore.com' + blog.path);
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    $('main#MainContent article.article-template div.article-template__content')
      .children()
      .each((i, el) => {
        const text =
          $(el)
            .prop('innerHTML')
            ?.replace(/<span[^>]*>/g, '')
            .replace(/<[^\/][^>]*>/g, '\n')
            .replace(/(<\/[^>]*>)/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/\s{2,}/g, '\n')
            .trim() ?? '';
        let imageSrc = $(el).find('img').prop('src');
        if (imageSrc?.includes('?')) {
          imageSrc = imageSrc.slice(0, imageSrc.indexOf('?'));
        }
        if (imageSrc) {
          blog.contents.push({
            type: 'image',
            data: imageSrc,
          });
        } else if (text) {
          blog.contents.push({
            type: 'text',
            data: text,
          });
        }
      });
  } catch (error) {
    console.error(error);
  }
}

export default scrapeBlogs;
