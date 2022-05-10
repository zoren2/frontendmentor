import { Client } from './client.model';
import { Deserializable } from './deserializable.model';
import { Sender } from './sender.model';

export class Invoice implements Deserializable {
    Id!: number;
    Status!: string;
    PaymentTerms!: string;
    DateDue!: Date;
    TotalDue!: number;
    Client!: Client;
    Sender!: Sender;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    setClient(client: Client) {
        this.Client = client;
    }

    setSender(sender: Sender) {
        this.Sender = sender;
    }
}
