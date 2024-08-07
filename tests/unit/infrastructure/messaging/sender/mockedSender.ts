import Sender from '../../../../../src/infrastructure/messaging/sender/sender'

export default (): Sender => ({
  send: jest.fn(),
  sendRaw: jest.fn(),
})
