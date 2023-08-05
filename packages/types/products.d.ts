interface Product {
  path: string;
  title: string;
  inStock: boolean;
  price: number;
  productId: string;
  images: Image[];
  details: Detail[];
  sizeOptions: SizeOption[];
  featureImages: string[];
  collections: string[];
  ranks: {
    date: number;
    bestseller: number;
    featured: number;
  };
  rating: Rating;
  reviewStats: ReviewStats;
  colorSwatch: ColorSwatch[];
  relatedProducts: RelatedProduct[];
  type: string;
  gender: string;
}

interface ProductCard {
  title: string;
  path: string;
  inStock: boolean;
  price: string;
  images: Image[];
  colorSwatch: ColorSwatch[];
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

interface Image {
  src: string;
  overlay: string;
}

type Detail =
  | {
      type: 'text';
      title: string;
      data: string;
    }
  | {
      type: 'table';
      title: string;
      data: string[][];
    };

interface SizeOption {
  symbol: string;
  name: string;
}

interface ColorSwatch {
  color: string;
  imgPosition: number;
  backgroundColor: string;
  backgroundImage: string;
}

interface RelatedProduct {
  path: string;
}
