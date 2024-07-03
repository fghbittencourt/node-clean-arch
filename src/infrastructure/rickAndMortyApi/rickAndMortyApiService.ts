import RickAndMortyApi, { Character, Episodes } from './rickAndMortyApi'

export default class RickAndMortyApiService implements RickAndMortyApi {
  private readonly baseUrl: string

  constructor() {
    this.baseUrl = 'https://rickandmortyapi.com/api' // This should not be here ;)
  }

  async getCharacterById(id: string): Promise<Character[]> {
    const response = await fetch(`${this.baseUrl}/character/${id}`)
    return response.json()
  }

  async getCharacters(): Promise<Character[]> {
    const response = await fetch(`${this.baseUrl}/character`)
    return response.json()
  }

  async getEpisodes(): Promise<Episodes[]> {
    const response = await fetch(`${this.baseUrl}/episode`)
    return response.json()
  }
}
