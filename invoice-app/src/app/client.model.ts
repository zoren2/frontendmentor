import { Deserializable } from "./deserializable.model";
import { Item } from "./item.model";

export class Client implements Deserializable {
    Name!: string;
    Email!: string;
    Street!: string;
    City!: string;
    PostCode!: string;
    Country!: string;
    Items!: Item[];

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
