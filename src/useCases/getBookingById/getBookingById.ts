
export interface GetBookingByIdInput extends UseCaseInput {
  bookingId: string;
}

export default class GetBookingById implements SyncUseCase {
  constructor(
    @inject('BookingRepository')
    public readonly repository: BookingRepository
  ) {}

  async execute(
    input: GetBookingByIdInput
  ): Promise<UseCaseOutput> {

    // Aqui é a operação de negócio ;)
    const booking =
      await this.repository.findByBookingId(input.bookingId);

    return booking;
  }
}
