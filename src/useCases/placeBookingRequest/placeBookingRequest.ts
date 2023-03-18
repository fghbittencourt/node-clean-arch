import UseCaseInput from '../../infrastructure/base/useCase/useCaseInput';
import UseCaseOutput from '../../infrastructure/base/useCase/useCaseOutput';
import UseCaseSync from '../../infrastructure/base/useCase/useCaseSync';

export interface PlaceBookingRequestInput extends UseCaseInput {
  bookingId: string;
}

export default class PlaceBookingRequest implements UseCaseSync {
  constructor() {} // public readonly repository: BookingRepository // @inject('BookingRepository')

  async execute(input: PlaceBookingRequestInput): Promise<UseCaseOutput> {
    // 1 - Gera uma nova BookingRequest
    // 2 - Persiste a BookingRequest no banco
    // 3 - Envia um COMMAND (ordem) para processar a BookingRequest
    // 4 - Retorna o BookingRequest ID para o usuário
    return {};
  }
}
