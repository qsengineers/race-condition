
export default class BasketItem {
  readonly id: number;
  readonly name: string;
  readonly quantity: number;
  readonly itemPrice: number;


  constructor(id: number, name: string, itemPrice: number) {
    this.id = id;
    this.name = name;
    this.quantity = 1;
    this.itemPrice = itemPrice;
  }
}