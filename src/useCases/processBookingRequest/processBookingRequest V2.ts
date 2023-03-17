
export interface ProcessBookingRequestInput extends UseCaseInput {
  // ProcessBookingRequest info
}

export default class ProcessBookingRequest implements UseCaseAsync {

  async execute(input: ProcessBookingRequestInput): Promise<void> {
    //V2
    // 1 - Processa a Booking Request tornando ela uma Booking
    // 2 - Salva a Booking no Banco
    // 3 - Solta o evento de BookingCreated
    // 4 - Envia COMMAND (ordem) para confirmar a Booking
  }
}
