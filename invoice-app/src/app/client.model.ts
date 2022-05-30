import { Deserializable } from "./deserializable.model";
import { Item } from "./item.model";

export class Client implements Deserializable {
    id!: number;
    invoiceId!: string;
    name!: string;
    email!: string;
    street!: string;
    city!: string;
    postCode!: string;
    country!: string;
    item!: Item[];


    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    constructor(id?: number) {
        this.id = id ?? 0;
        this.item = new Array();
    }
    setId(id: number) {
        this.id = id;
    }

    setItem(item: Item) {
        this.item.push(item);
    }
}
