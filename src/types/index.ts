
type BaseGame = {
  id: string | number;
  img: string;
  name: string;
  rating: number;
  genres: Genre[];
  created?: boolean;
};

export type ApiGame = BaseGame & { id: number };

export type DbGame = BaseGame & {
  id: string;
  description: string;
  platforms: string[];
  release: string;
  created: true;
};

export type Genre = {
  name: string;
  games_count?: number;
  id?: number;
  image_background?: string;
  slug?: string;
}

export type GameType = ApiGame | DbGame;