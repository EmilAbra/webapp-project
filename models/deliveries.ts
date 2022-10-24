import config from "../config/config.json";
import Delivery from '../interfaces/delivery';

const deliveries = {
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {

        function callbackFunction() {
            console.log("loaded successfully");
        }
        try {
            var deliveryItem = {
                api_key: config.api_key,
                product_id: delivery.product_id,
                amount: delivery.amount,
                delivery_date: delivery.delivery_date,
                comment: delivery.comment
            };

            var json = JSON.stringify(deliveryItem);
            var request = new XMLHttpRequest();
            request.addEventListener("load", callbackFunction);
            request.open("POST", "https://lager.emilfolino.se/v2/deliveries");
            request.setRequestHeader('Content-type','application/json; charset=utf-8');
            request.send(json);
            return;
        } catch (error) {
            console.log('Could not add delivery.');
        }
    },
    getDeliveries: async function getDeliveries(): Promise<Delivery[]> {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
};
export default deliveries;
