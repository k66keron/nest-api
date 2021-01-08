export class CreateInvoiceDto {
    invoiceNo: string;
    customerId: string;
    status: string;
    zone: string;
    date: Date;
    subTotal: number;
    shipping: number;
    total: number;
}