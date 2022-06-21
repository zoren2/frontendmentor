import { Deserializable } from "./deserializable.model";

export class Item implements Deserializable {
    id!: number;
    clientId!: number;
    name!: string;
    quantity!: number;
    price!: number;
    totalPrice!: number;

    constructor() {
        this.id = 0;
        this.name = "";
        this.quantity = 0;
        this.price = 0;
    }

     deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getClientId(): number {
        return this.clientId;
    }

    setClientId(clientId: number): void {
        this.clientId = clientId;
    }

    getTotalPrice(): number {
        return this.totalPrice;
    }
    setTotalPrice(totalPrice: number) {
        this.totalPrice = totalPrice;
    }
}
