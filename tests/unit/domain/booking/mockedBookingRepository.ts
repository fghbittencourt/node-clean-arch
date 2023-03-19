import BookingRepository from '../../../../src/domain/booking/bookingRepository';

export default (): BookingRepository => ({
  save: jest.fn()
});
