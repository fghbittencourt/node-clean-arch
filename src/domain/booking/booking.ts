export default class Booking {
  constructor(bookingId: string) {
    this.bookingId = bookingId;
    this.createdAt = new Date();
    this.confirmed = false;
  }

  confirmed: boolean;

  createdAt: Date;

  bookingId: string;

  async confirmBooking(): Promise<void> {
    if (!this.confirmed)
      this.confirmed = true;
  }
}
