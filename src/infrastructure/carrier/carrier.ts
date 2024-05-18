export interface EmitTicketsResult {
  tickets: string[];
  status: 'OK' | 'DENIED';
}

export interface EmitTicketPassenger {
  name: string;
  passportNumber: string;
}

export default interface Carrier {
  emitTickets(
    flightNumber: string,
    passengers: EmitTicketPassenger[]
  ): Promise<EmitTicketsResult>;
}
