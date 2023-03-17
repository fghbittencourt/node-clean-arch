
export interface ProcessBookingRequestInput extends UseCaseInput {
  // ProcessBookingRequest info
}

export default class ProcessBookingRequest implements UseCaseAsync {

  async execute(input: ProcessBookingRequestInput): Promise<void> {
    //V1 
    // 1 - Processa a Booking Request tornando ela uma Booking
    // 2 - Salva a Booking no Banco
    // 3 - Solta o evento de BookingCreated
    // 4 - Faz a confirmação da Booking (com parceiro externo)
    // 5 - Marca a Booking como confirmada com o confirmBooking()
    // 6 - Solva a Booking no banco
    // 7 - Solta evento de booking confirmed
  }
}
