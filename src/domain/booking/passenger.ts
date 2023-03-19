export default class Passenger {
  constructor(name: string, passportNumber: string) {
    this.name = name;
    this.passportNumber = passportNumber;
  }

  name: string;

  passportNumber: string;
}
