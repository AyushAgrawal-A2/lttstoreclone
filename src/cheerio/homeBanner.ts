import cheerio from "cheerio";

async function scrapeHomeBanner() {
  const homeBanner: HomeBanner[] = [];
  try {
    const url = new URL("https://www.lttstore.com");
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    $(
      "main#MainContent div.swiper div.swiper-wrapper div.ultimate-slideshow-slide",
    ).each((i, el) => {
      const link = $(el).find("a").prop("href") ?? "";
      const imgURL =
        "https://www.lttstore.com/cdn/shop/" +
          $(el).find("img:first").prop("src") ?? "";
      homeBanner.push({
        link,
        imgURL,
        position: i,
      });
    });
  } catch (error) {
    console.error(error);
  }
  return homeBanner;
}

export default scrapeHomeBanner;
