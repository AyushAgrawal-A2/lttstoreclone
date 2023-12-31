import axios from "axios";
import cheerio from "cheerio";

async function scrapeBlogs(): Promise<{
  blogCards: BlogCard[];
  blogContents: BlogContent[][];
}> {
  const blogCards: BlogCard[] = [];
  try {
    const url = new URL(
      "https://www.lttstore.com/blogs/the-newsletter-archive"
    );
    const path = url.toString();
    const { data: html } = await axios.get(path);
    const $ = cheerio.load(html);
    $(
      "main#MainContent div.main-blog div.blog-articles div.blog-articles__article.article"
    ).each((_i, el) => {
      const blogCardEl = $(el).find("div.card > div.card__inner");
      const path =
        $(blogCardEl)
          .find("div.card__content div.card__information h3.card__heading.h2 a")
          .prop("href") ?? "";
      const heading = $(blogCardEl)
        .find("div.card__content div.card__information h3.card__heading.h2 a")
        .text()
        .trim();
      const cardText = $(blogCardEl)
        .find("div.card__content div.card__information p.article-card__excerpt")
        .text()
        .trim();
      const date = new Date(
        $(blogCardEl)
          .find(
            "div.card__content div.card__information div.article-card__info time"
          )
          .prop("datetime")
      );
      const imgSrc = $(blogCardEl)
        .find("div.article-card__image-wrapper img")
        .prop("src");
      const imgURL = imgSrc
        ? "https:" + imgSrc.slice(0, imgSrc.indexOf("?"))
        : "";
      blogCards.push({
        path,
        heading,
        cardText,
        date,
        imgURL,
      });
    });
    const blogContents = await Promise.all(
      blogCards.map((blogCard) => scrapeBlog(blogCard))
    );
    return { blogCards, blogContents };
  } catch (error) {
    console.error(error);
    return { blogCards: [], blogContents: [] };
  }
}

async function scrapeBlog(blogCard: BlogCard): Promise<BlogContent[]> {
  const blogContent: BlogContent[] = [];
  try {
    const url = new URL("https://www.lttstore.com" + blogCard.path);
    const path = url.toString();
    const { data: html } = await axios.get(path);
    const $ = cheerio.load(html);
    $("main#MainContent article.article-template div.article-template__content")
      .children()
      .each((_i, el) => {
        const text =
          $(el)
            .prop("innerHTML")
            ?.replace(/<span[^>]*>/g, "")
            .replace(/<[^\/][^>]*>/g, "\n")
            .replace(/(<\/[^>]*>)/g, "")
            .replace(/&nbsp;/g, " ")
            .replace(/&amp;/g, "&")
            .replace(/\s{2,}/g, "\n")
            .trim() ?? "";
        let imageSrc = $(el).find("img").prop("src");
        if (imageSrc?.includes("?")) {
          imageSrc = imageSrc.slice(0, imageSrc.indexOf("?"));
        }
        if (imageSrc?.includes("googleusercontent.com")) {
          imageSrc = imageSrc.slice(imageSrc.indexOf("#http") + 1);
        }
        if (imageSrc) {
          blogContent.push({
            isImage: true,
            data: imageSrc,
          });
        } else if (text) {
          blogContent.push({
            isImage: false,
            data: text,
          });
        }
      });
  } catch (error) {
    console.error(error);
  }
  return blogContent;
}

export default scrapeBlogs;
