import { Client } from './client.model';
import { Deserializable } from './deserializable.model';
import { Sender } from './sender.model';

export class Invoice implements Deserializable {
    id!: string;
    status!: string;
    paymentTerms!: string;
    dateDue!: Date;
    totalDue!: number;
    client!: Client;
    sender!: Sender;

    constructor(id?: string, status?: string, paymentTerms?: string, dateDue?: Date, totalDue?: number, client?: Client, sender?: Sender) {
        this.id = id ?? "";
        this.status = status ?? "";
        this.paymentTerms = paymentTerms ?? "";
        this.dateDue = dateDue ?? new Date();
        this.totalDue = totalDue ?? 0.00;
        this.client = client ?? new Client();
        this.sender = sender ?? new Sender();
    }
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    getId(): string {
        return this.id;
    }

    setId(id: string): void {
        this.id = id;
    }

    getStatus(): string {
        return this.status;
    }

    setStatus(status: string): void {
        this.status = status;
    }

    getPaymentTerms(): string {
        return this.paymentTerms;
    }

    setPaymentTerms(paymentTerms: string): void {
        this.paymentTerms = paymentTerms;
    }

    getDateDue(): Date {
        return this.dateDue;
    }

    setDateDue(dateDue: Date) {
        this.dateDue = dateDue;
    }

    getTotalDue(): number {
        return this.totalDue;
    }

    setTotalDue(totalDue: number): void {
        this.totalDue = totalDue;
    }

    getClient(): Client {
        return this.client;
    }

    setClient(client: Client): void {
        
        
        this.client = client;
    }

    getSender(): Sender {
        return this.sender;
    }

    setSender(sender: Sender): void {
        this.sender = sender;
    }
}
