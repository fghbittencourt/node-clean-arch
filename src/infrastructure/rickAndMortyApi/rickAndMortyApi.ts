export interface Character {
  id: number;
  image: string
  name: string;
  species: string;
  status: string;
}

export interface Episodes {
  air_date: string;
  episode: string;
  id: number;
  name: string;
}

export default interface RickAndMortyApi {
  getCharacterById: (id: number) => Promise<Character[]>;
  getCharacters: () => Promise<Character[]>;
  getEpisodes: () => Promise<Episodes[]>;
}
