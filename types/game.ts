type Image = {
  urlVertical: string;
  urlHorizontal: string;
  previewUrl: string;
  alt: string;
};

export type Game = {
  id: string;
  title: string;
  releaseDate: Date;
  price: number;
  discountPercentage: number;
  images: Image[];
};
