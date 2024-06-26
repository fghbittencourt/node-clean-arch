export interface EmitTicketsResult {
  status: 'DENIED' | 'OK';
  tickets: string[];
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
