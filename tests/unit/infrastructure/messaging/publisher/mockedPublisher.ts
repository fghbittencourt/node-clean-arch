import Publisher from '../../../../../src/infrastructure/messaging/publisher/publisher'

export default (): Publisher => ({
  publish: jest.fn(),
})
