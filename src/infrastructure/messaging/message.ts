import MessageAttribute from './messageAttribute';

export default abstract class Message {
  attributes: Record<string, MessageAttribute> = {};

  addStringMessageAttribute(name: string, value: string): void {
    this.attributes[name] = {
      DataType: 'String',
      StringValue: value
    };
  }
}
