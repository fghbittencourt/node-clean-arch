

export default class ProcessBookingController extends PubSubConsumerController {
  getQueueUrl = (): string => {
    return process.env.PROCESS_BOOKING_REQUEST_URL!;
  };

  handle = async (message: IncomingMessage): Promise<void> => {
    try {
      await this.parseMessage(message);
    } catch (err) {
      Logger.error('Error parsing message', { error: err.message });
      throw err;
    }

    const { bookingRequestInfo } = this.getParsedBody;

    Logger.debug(`Booking to be processed: ${ bookingRequestInfo.id}`);

    const payload = new ProcessBookingPayload(bookingRequestInfo.id);
    await payload.validate();

    // Async Use Case ;)
    await this.useCase.execute({ bookingRequestInfo });
  };
}
