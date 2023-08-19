interface Product {
  path: string;
  title: string;
  inStock: boolean;
  price: number;
  lttProductId: string;
  type: string;
  gender: string;
  featureImages: string[];
  collections: string[];
  images: Image[];
  details: Detail[];
  sizeOptions: SizeOption[];
  ranks: Ranks;
  rating: Rating;
  reviewStats: ReviewStats;
  colorSwatch: ColorSwatch[];
  relatedProducts: RelatedProduct[];
}

interface ProductCard {
  path: string;
  title: string;
  inStock: boolean;
  price: number;
  images: Image[];
  colorSwatch: ColorSwatch[];
}

interface Image {
  src: string;
  overlay: string;
}

type Detail = { title: string } & (
  | {
      type: 'text';
      data: string;
    }
  | {
      type: 'table';
      data: string[][];
    }
);

interface SizeOption {
  symbol: string;
  name: string;
}

interface Ranks {
  date: number;
  bestseller: number;
  featured: number;
}

interface Rating {
  stars: number;
  reviews: number;
}

interface ReviewStats {
  star_1: number;
  star_2: number;
  star_3: number;
  star_4: number;
  star_5: number;
}

interface ColorSwatch {
  imgPosition: number;
  color: Color;
}

interface RelatedProduct {
  path: string;
}

interface Color {
  name: string;
  backgroundColor: string;
  backgroundImage: string;
}
