import Command from '../../infrastructure/messaging/command';

export default class ProcessBookingRequestCommand extends Command {
  queueName = 'bookingRequestQueue';
}
