export interface ReservationResult {
  tickets: string[];
  status: 'OK' | 'DENIED';
}

export interface CarrierPassenger {
  name: string;
  passportNumber: string;
}

export default interface Carrier {
  bookFlight(
    flightNumber: string,
    passengers: CarrierPassenger[]
  ): Promise<ReservationResult>;
}
