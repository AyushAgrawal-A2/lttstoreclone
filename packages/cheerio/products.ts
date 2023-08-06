import cheerio from 'cheerio';

async function scrapeProducts() {
  const products: Product[] = [];
  try {
    const url = new URL('https://www.lttstore.com/collections/all-products-1');
    let page = 1;
    while (true) {
      url.searchParams.set('page', page.toString());
      const html = await fetch(url).then((res) => res.text());
      const $ = cheerio.load(html);
      const productLiEl = $('ul#product-grid li.grid__item');

      productLiEl.each((i, el) => {
        const productLinkEl = $(el).find('a:first');
        const path = productLinkEl.prop('href') ?? 'Path not found';
        const title =
          productLinkEl.prop('innerText')?.replace(/\s{2}/g, '').trim() ?? '';
        const inStock =
          $(el).find('div.card__content div.card__badge.bottom.left span')
            .length === 0;
        products.push({
          path,
          title,
          inStock,
          price: 0,
          lttProductId: '',
          images: [],
          details: [],
          sizeOptions: [],
          featureImages: [],
          collections: [],
          ranks: { date: 0, bestseller: 0, featured: 0 },
          rating: { stars: 0, reviews: 0 },
          reviewStats: {
            star_1: 0,
            star_2: 0,
            star_3: 0,
            star_4: 0,
            star_5: 0,
          },
          colorSwatch: [],
          relatedProducts: [],
          type: '',
          gender: '',
        });
      });
      if (productLiEl.length < 12) break;
      page++;
    }
    await Promise.all(products.map((product) => scrapeProduct(product)));
    await Promise.all([
      scrapeProductRanks(products),
      scrapeCollections(products),
      scrapeFilters(products),
    ]);
  } catch (error) {
    console.error(error);
  }
  return products;
}

async function scrapeProduct(product: Product) {
  try {
    const url = new URL('https://www.lttstore.com' + product.path);
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    product.lttProductId = $(
      'div.product div.product__info-wrapper div.jdgm-widget'
    ).prop('data-id');
    scrapeProductImages(product, html);
    scrapeProductRatings(product, html);
    scrapeProductPrice(product, html);
    scrapeProductColorSwatch(product, html);
    scrapeProductSizeOptions(product, html);
    scrapeProductDetails(product, html);
    scrapeProductFeatureImages(product, html);
    scrapeProductReviewStats(product, html);
  } catch (error) {
    console.error(error);
  }
}

function scrapeProductImages(product: Product, html: any) {
  const $ = cheerio.load(html);
  $(
    'div.product div.product__media-wrapper ul.product__media-list li.product__media-item'
  ).each((i, el) => {
    let src = $(el).find('img').prop('src');
    let overlay = $(el).find('div.product__media--overlay').text();
    if (src) {
      src = 'https:' + src.slice(0, src.indexOf('?'));
      product.images.push({ src, overlay });
    }
  });
}

function scrapeProductRatings(product: Product, html: any) {
  const $ = cheerio.load(html);
  const rataingEl = $('div.jdgm-widget.jdgm-preview-badge div.jdgm-prev-badge');
  const reviewsText = $(rataingEl)
    .find('span.jdgm-prev-badge__text')
    .text()
    .trim();
  if (reviewsText === 'No reviews') return;
  product.rating.stars = parseFloat(
    $(rataingEl).find('span.jdgm-prev-badge__stars').prop('data-score')
  );
  product.rating.reviews = parseInt(reviewsText.split(' ')[0]);
}

function scrapeProductPrice(product: Product, html: any) {
  const $ = cheerio.load(html);
  const priceText =
    $('div.product div.product__info-wrapper div.price span.money').prop(
      'textContent'
    ) || '';
  product.price = parseFloat(priceText.slice(1, priceText.indexOf(' ')));
}

function scrapeProductColorSwatch(product: Product, html: any) {
  const $ = cheerio.load(html);
  const swatchListEl = $(
    'div.product div.product__info-wrapper ul.ColorSwatchList'
  );
  if (swatchListEl.length === 0) return;

  const script = $('div.product div.product__info-wrapper ul.ColorSwatchList')
    .parent()
    .parent()
    .find('script');
  interface ColorJSON {
    featured_image: {
      position: string;
    };
    title: string;
  }
  const json: ColorJSON[] = Array.from(JSON.parse(script.text()));
  json.forEach(({ title, featured_image }) => {
    const name =
      title.indexOf('/') >= 0
        ? title.slice(0, title.indexOf('/')).trim()
        : title;
    if (
      product.colorSwatch.find(
        (colorSwatchItem) => colorSwatchItem.color.name === name
      )
    )
      return;
    const imgPosition = parseInt(featured_image.position) - 1;
    product.colorSwatch.push({
      imgPosition,
      color: {
        name,
        backgroundColor: '',
        backgroundImage: '',
      },
    });
  });

  $(swatchListEl)
    .find('li label')
    .each((i, el) => {
      const name = $(el).prop('title');
      const style = $(el).prop('style');
      if (style) {
        if (style['background-color']) {
          const colorSwatchItem = product.colorSwatch.find(
            (colorSwatchItem) => colorSwatchItem.color.name === name
          );
          if (colorSwatchItem)
            colorSwatchItem.color.backgroundColor = style[
              'background-color'
            ] as string;
        }
        if (style['background-image']) {
          const colorSwatchItem = product.colorSwatch.find(
            (colorSwatchItem) => colorSwatchItem.color.name === name
          );
          if (colorSwatchItem) {
            let src = style['background-image'] as string;
            src = 'https:' + src.slice(src.indexOf('/'), src.indexOf('?'));
            colorSwatchItem.color.backgroundImage = src;
          }
        }
      }
    });
}

function scrapeProductSizeOptions(product: Product, html: any) {
  const $ = cheerio.load(html);
  $('div.product div.product__info-wrapper input.product-variant-size').each(
    (i, el) => {
      const name = $(el).prop('value');
      const symbol = $(el)
        .next()
        .text()
        .replace(/\s{2,}/g, '');
      product.sizeOptions.push({ name, symbol });
    }
  );
}

function scrapeProductDetails(product: Product, html: any) {
  const $ = cheerio.load(html);
  $('div.product div.product__info-wrapper details.product__details').each(
    (i, el) => {
      const title =
        $(el)
          .find('summary.product__detail-header')
          .prop('textContent')
          ?.replace(/\s{2,}/gm, '') ?? '';
      let detail: Detail;
      if ($(el).find('div.content table').length > 0) {
        const table: string[][] = [];
        $(el)
          .find('div.content table tr')
          .each((i, el) => {
            const row: string[] = [];
            $(el)
              .find('td')
              .each((i, el) => {
                row.push(
                  $(el)
                    .text()
                    .replace(/[\r\n]+/g, '')
                    .trim()
                );
              });
            table.push(row);
          });
        detail = {
          type: 'table',
          title,
          data: table,
        };
      } else if ($(el).find('div.content.related-product-content').length > 0) {
        $(el)
          .find('div.content.related-product-content div.card-wrapper')
          .each((i, el) => {
            const href = $(el).find('a:first').prop('href');
            if (href) product.relatedProducts.push({ path: href });
          });
        return;
      } else {
        const detailHTML = $(el).find('div.content').prop('innerHTML');
        const text =
          detailHTML
            ?.replace(/<span[^>]*>/g, '')
            .replace(/<[^\/][^>]*>/g, '\n')
            .replace(/(<\/[^>]*>)/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/\s{2,}/g, '\n')
            .trim() ?? '';
        detail = {
          type: 'text',
          title,
          data: text,
        };
      }
      product.details.push(detail);
    }
  );
}

function scrapeProductFeatureImages(product: Product, html: any) {
  const $ = cheerio.load(html);
  $('main#MainContent section:nth-child(2) > div > img').each((i, el) => {
    const src = $(el).prop('src');
    if (src) {
      product.featureImages.push(src.slice(0, src.indexOf('?')));
    }
  });
}

function scrapeProductReviewStats(product: Product, html: any) {
  const $ = cheerio.load(html);
  $(
    'main#MainContent div#judgeme_product_reviews div.jdgm-histogram div.jdgm-histogram__row'
  ).each((i, el) => {
    const rating = ('star_' +
      $(el).prop('data-rating')) as keyof typeof product.reviewStats;
    const count = $(el).prop('data-frequency');
    if (product.reviewStats[rating])
      product.reviewStats[rating] = parseInt(count);
  });
}

async function scrapeProductRanks(products: Product[]) {
  try {
    const sortCriterias = {
      date: 'created-descending',
      bestseller: 'best-selling',
      featured: 'manual',
    };
    for (const key in sortCriterias) {
      const url = new URL(
        'https://www.lttstore.com/collections/all-products-1'
      );
      const sortCriteria = key as keyof typeof sortCriterias;
      url.searchParams.set('sort_by', sortCriterias[sortCriteria]);
      let page = 1;
      let rank = 1;
      while (true) {
        url.searchParams.set('page', page.toString());
        const html = await fetch(url).then((res) => res.text());
        const $ = cheerio.load(html);
        const productLiEls = $('ul#product-grid li.grid__item');
        productLiEls.each((i, el) => {
          const productLinkEl = $(el).find('a:first');
          const path = productLinkEl.prop('href') ?? 'Path not found';
          const product = products.find((product) => product.path === path);
          if (product) {
            product.ranks[sortCriteria] = rank++;
          }
        });
        if (productLiEls.length < 12) break;
        page++;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function scrapeCollections(products: Product[]) {
  try {
    interface Collection {
      [key: string]: string;
    }
    const collections: Collection = {};
    const url = new URL('https://www.lttstore.com/collections/');
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    $('main#MainContent ul.collection-list li.collection-list__item').each(
      (i, el) => {
        const collectionURL =
          'https://www.lttstore.com' + $(el).find('a:first').prop('href') ?? '';
        const collection = collectionURL.replace(
          'https://www.lttstore.com/collections/',
          ''
        );
        collections[collection] = collectionURL;
      }
    );
    await Promise.all(
      Object.keys(collections).map(async (collection) => {
        const url = new URL(collections[collection]);
        let page = 1;
        while (true) {
          url.searchParams.set('page', page.toString());
          const html = await fetch(url).then((res) => res.text());
          const $ = cheerio.load(html);
          const productLiEls = $('ul#product-grid li.grid__item');
          productLiEls.each((i, el) => {
            const productLinkEl = $(el).find('a:first');
            const path = productLinkEl.prop('href') ?? 'Path not found';
            const product = products.find((product) => product.path === path);
            if (product) {
              product.collections.push(collection);
            }
          });
          if (productLiEls.length < 12) break;
          page++;
        }
      })
    );
  } catch (error) {
    console.error(error);
  }
}

async function scrapeFilters(products: Product[]) {
  try {
    const filters: {
      [filter: string]: {
        filterKey: string;
        filterValues: string[];
      };
    } = {};
    const url = new URL('https://www.lttstore.com/collections/all-products-1');
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    $('div.facets-container form#FacetFiltersForm details').each((i, el) => {
      let filter = $(el).find('summary.facets__summary div > span').text();
      if (!filter.includes('Type') && !filter.includes('Gender')) return;
      if (filter.includes('('))
        filter = filter.slice(0, filter.indexOf('(')).trim();
      filters[filter] = {
        filterKey: '',
        filterValues: [],
      };
      $(el)
        .find('fieldset.facets-wrap ul.no-js-list.list-unstyled.no-js')
        .prev()
        .find('input')
        .each((i, el) => {
          filters[filter].filterKey = $(el).attr('name') ?? '';
          filters[filter].filterValues.push($(el).prop('value'));
        });
    });

    for (const filter in filters) {
      const url = new URL(
        'https://www.lttstore.com/collections/all-products-1'
      );
      const { filterKey, filterValues } = filters[filter];
      for (const filterValue of filterValues) {
        url.searchParams.set(filterKey, filterValue);
        let page = 1;
        while (true) {
          url.searchParams.set('page', page.toString());
          const html = await fetch(url).then((res) => res.text());
          const $ = cheerio.load(html);
          const productLiEls = $('ul#product-grid li.grid__item');
          productLiEls.each((i, el) => {
            const productLinkEl = $(el).find('a:first');
            const href = productLinkEl.prop('href') ?? 'Path not found';
            const path = href.slice(0, href.indexOf('?'));
            const product = products.find((product) => product.path === path);
            if (product) {
              if (filter.includes('Type')) product.type = filterValue;
              else product.gender = filterValue;
            }
          });
          if (productLiEls.length < 12) break;
          page++;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export default scrapeProducts;
