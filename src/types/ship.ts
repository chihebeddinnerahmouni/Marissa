interface Owner {
  id: number;
  name: string;
  surname: string;
  email: string;
  image: string;
  createdAt: string;
}

interface Image {
  id: number;
  listing_id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface ListingFeature {
  createdAt: string;
  updatedAt: string;
  feature_id: number;
  listing_id: number;
}

interface Feature {
  id: number;
  name: string;
  arabic_name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  ListingFeatures: ListingFeature;
}

export interface IListing {
  id: number;
  title: string;
  description: string;
  rating: number;
  latitude: number;
  longitude: number;
  validated: boolean;
  blocked: boolean;
  block_reason: string | null;
  user_id: number;
  isFavourite: boolean | null;
  owner: Owner;
  createdAt: string;
  updatedAt: string;
  Images: Image[];
  region: string;
  Features: Feature[];
}
