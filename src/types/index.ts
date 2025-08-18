
type BaseGame = {
  id?: string | number;
  img: string | null;
  name: string;
  rating: number;
  created?: boolean;
};

export type ApiGame = BaseGame & { id: number; genres: Genre[]; };

export type DbGame = BaseGame & {
  id?: string;
  description: string;
  platforms: string[];
  release: string;
  genres: string[];
  created: true;
};

export type Genre = {
  name: string;
  games_count?: number;
  id?: number;
  image_background?: string;
  slug?: string;
}

export type FormErrors = {
  name: string;
  description: string;
  genres: string;
  platforms: string;
  img: string;
  rating: string;
  release: string;
}

export type GameType = ApiGame | DbGame;