import Carrier from '../../../../src/infrastructure/carrier/carrier';

export default (): Carrier => ({
  emitTickets: jest.fn()
});
