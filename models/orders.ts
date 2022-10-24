import config from "../config/config.json";
import products from "./products.ts";

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order) {
        await Promise.all(order.order_items.map(async (order_item) => {
            let changedProduct = {
                id: order_item.product_id,
                name: order_item.name,
                api_key: config.api_key,
                stock: order_item.stock - order_item.amount,
            };

            await products.updateProduct(changedProduct);
        }));

        let changedOrder = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key,
        };

        await orders.updateOrder(changedOrder);
    },
    updateOrder: async function updateOrder(order) {
        try {
            order.api_key = config.api_key;
            await fetch(`${config.base_url}/orders`, {
                body: JSON.stringify(order),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });
        } catch (error) {
            console.log(error);
        }
    },
    getOrder: async function getOrder(order_id) {
        const response = await fetch(`${config.base_url}/orders/${order_id}?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    }
};

export default orders;
