import { Deserializable } from "./deserializable.model";

export class Item implements Deserializable {
    Name!: string;
    Quantity!: number;
    Price!: number;
    TotalPrice!: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
