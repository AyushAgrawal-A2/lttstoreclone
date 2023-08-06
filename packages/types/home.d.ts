interface Home {
  homeBanner: HomeBanner[];
  featured: ProductCard[];
  bestseller: ProductCard[];
  blogs: BlogCard[];
}

interface HomeBanner {
  link: string;
  imgURL: string;
  position: number;
}
