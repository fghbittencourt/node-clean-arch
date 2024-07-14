import PassengerRepository from '../../../../src/domain/passenger/passengerRepository'

export default (): PassengerRepository => ({
  findByFullName: jest.fn(),
  save: jest.fn(),
})
