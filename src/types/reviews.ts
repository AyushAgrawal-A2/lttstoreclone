interface ReviewResponse {
  reviews: Review[];
  total_count: number;
}

interface Review {
  author: string;
  verified: boolean;
  time: string;
  stars: number;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
}
