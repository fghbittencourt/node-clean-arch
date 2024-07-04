import RickAndMortyApi, { Character, Episodes } from './rickAndMortyApi'

export default class RickAndMortyApiDummy implements RickAndMortyApi {
  getCharacterById = async (id: number) : Promise<Character[]> => Promise.resolve([{
    id,
    image: 'http://rickandmortyapi.com/api/character/avatar/1.jpeg',
    name: 'Rick Sanchez',
    species: 'Human',
    status: 'Alive',
  }])

  getCharacters = async () : Promise<Character[]> => Promise.resolve([
    {
      id: 1,
      image: 'http://rickandmortyapi.com/api/character/avatar/1.jpeg',
      name: 'Rick Sanchez',
      species: 'Human',
      status: 'Alive',
    },
  ])

  getEpisodes = async () : Promise<Episodes[]> => Promise.resolve([
    {
      air_date: '2000-01-01',
      episode: 'S01E01',
      id: 1,
      name: 'Pilot',
    }])
}
