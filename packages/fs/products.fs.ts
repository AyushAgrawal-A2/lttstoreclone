import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, './products.ts');

let products: Product[] = [];

readProducts();

function readProducts() {
  fs.readFile(filePath, (err, data) => {
    if (err) console.log(err);
    products = JSON.parse(data.toString());
  });
}

export function saveProducts(products: Product[]) {
  fs.writeFile(filePath, JSON.stringify(products), (err) => {
    if (err) console.log(err);
    else readProducts();
  });
}

export function getProduct(path: string) {
  return products.find((product) => product.path === path);
}

export function getProductCard({
  title,
  path,
  inStock,
  price,
  images,
  colorSwatch,
}: Product): ProductCard {
  if (!colorSwatch) images = images.slice(0, 1);
  return { title, path, inStock, price, images, colorSwatch };
}

export function getProductCards(
  collection = 'all',
  page = 1,
  perPage = 12,
  sortBy = '',
  filter = [],
  searchText = ''
) {
  let filteredProducts =
    collection === 'all'
      ? products
      : products.filter((product) => product.collections.includes(collection));
  if (searchText) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  if (sortBy) {
    const desc: boolean = sortBy.includes(',')
      ? sortBy.split(',')[1] === 'desc'
      : false;
    sortBy = sortBy.split(',')[0];
    if (sortBy === 'price') {
      filteredProducts.sort((a, b) => getPrice(a.price) - getPrice(b.price));
    } else if (sortBy === 'alphabetically') {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      filteredProducts = filteredProducts.filter(
        (product) => product.ranks[sortBy]
      );
      filteredProducts.sort((a, b) => a.ranks[sortBy] - b.ranks[sortBy]);
    }
    if (desc) filteredProducts.reverse();
  }
  const totalCards = filteredProducts.length;
  const productCards = filteredProducts
    .slice((page - 1) * perPage, page * perPage)
    .map((product) => getProductCard(product));
  return { productCards, totalCards };
}

function getPrice(price: string) {
  return parseFloat(price.slice(1, price.indexOf(' USD')));
}
