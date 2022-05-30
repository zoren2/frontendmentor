export class Sender {
    id!: number;
    invoiceId!: string;
    name!: string;
    city!: string;
    postCode!: string;
    street!: string;
    country!: string;

    constructor() {}
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
