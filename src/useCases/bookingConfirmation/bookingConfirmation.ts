import UseCaseAsync from '../../infrastructure/base/useCase/useCaseAsync';
import UseCaseInput from '../../infrastructure/base/useCase/useCaseInput';

export interface BookingConfirmationInput extends UseCaseInput {
  // BookingConfirmation info
}

export default class BookingConfirmation implements UseCaseAsync {
  async execute(input: BookingConfirmationInput): Promise<void> {
    // 1 - Carrega o Booking do Banco
    // 2 - Confirma com parceiro externo a reserva (outro sistema)
    // 3 - Chama o método de negócio confirmBooking()
    // 4 - Salva o objeto no banco
    // 5 - Solta (publica) o evento de BookingConfirmed
  }
}
