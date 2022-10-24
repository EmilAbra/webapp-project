import config from "../config/config.json";

const stations = {
    getAllStations: async function getAllStations() {
        const response = await fetch(`${config.base_url}/stations`);
        
        const result = await response.json();

        return result.data;
    },
    getAllDelays: async function getAllDelays() {
        const response = await fetch(`${config.base_url}/delayed`);
        
        const result = await response.json();

        return result.data;
    },
    getAllMessages: async function getAllMessages() {
        const response = await fetch(`${config.base_url}/messages`);
        
        const result = await response.json();

        return result.data;
    },
    getAllReasonCodes: async function getAllReasonCodes() {
        const response = await fetch(`${config.base_url}/codes`);
        
        const result = await response.json();

        return result.data;
    }
};

export default stations;
