import config from "../config/config.json";
import orderModel from "../models/orders.ts";
import storage from "../models/storage.ts";
import Invoice from "../interfaces/invoice.ts"
import moment from 'moment';

const invoices = {
    getInvoices: async function getInvoices(): Promise<Invoice> {
        const tokenObject: any = await storage.readToken();
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': tokenObject.token
            }
        });
        const result = await response.json();

        return result.data;
    },
    createInvoice: async function createInvoice(invoiceObject: Partial<Invoice>) {
        let order = await orderModel.getOrder(invoiceObject.order_id);

        order.status_id = 600;
        order.status = "Fakturerad";
        await orderModel.updateOrder(order);

        let totalPrice = order.order_items.reduce((price, item) => {
            return price + item.amount * item.price;
        }, 0);

        let dueDate = new Date(invoiceObject.creation_date);
        dueDate.setDate(dueDate.getDate() + 30);
        console.log(dueDate);


        invoiceObject.due_date = moment(dueDate).format("YYYY-MM-DD");
        invoiceObject.total_price = totalPrice;
        invoiceObject.api_key = config.api_key;

        const tokenObject: any = await storage.readToken();

        try {
            const response = await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(invoiceObject),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': tokenObject.token
                },
                method: 'POST'
            });

        } catch (error) {
            console.log(error);
        }
    },
};

export default invoices;
