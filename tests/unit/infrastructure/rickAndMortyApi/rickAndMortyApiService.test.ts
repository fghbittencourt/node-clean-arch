import fetchMock from 'jest-fetch-mock'

import RickAndMortyApiService from '../../../../src/infrastructure/rickAndMortyApi/rickAndMortyApiService'

describe('RickAndMortyApiService Testing', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('Should call getCharacterById method', async () => {
    const service = new RickAndMortyApiService()
    const id = '1'
    const jsonExample = { id }

    fetchMock.mockResponseOnce(JSON.stringify(jsonExample))
    const res = await service.getCharacterById(id)

    expect(fetchMock).toHaveBeenCalledWith(`${service.baseUrl}/character/${id}`)
    expect(res).toEqual(jsonExample)
  })

  it('Should call getCharacters method', async () => {
    const service = new RickAndMortyApiService()
    const jsonExample = { }

    fetchMock.mockResponseOnce(JSON.stringify(jsonExample))
    const res = await service.getCharacters()

    expect(fetchMock).toHaveBeenCalledWith(`${service.baseUrl}/character`)
    expect(res).toEqual(jsonExample)
  })

  it('Should call getEpisodes method', async () => {
    const service = new RickAndMortyApiService()
    const jsonExample = { }

    fetchMock.mockResponseOnce(JSON.stringify(jsonExample))
    const res = await service.getEpisodes()

    expect(fetchMock).toHaveBeenCalledWith(`${service.baseUrl}/episode`)
    expect(res).toEqual(jsonExample)
  })
})
