import config from "../config/config.json";
import storage from "./storage";


const user = {
    getToken: async function getToken() {
        
        return await storage.readToken();
    },
    getUserData: async function getUserData() {
        const tokenObject: any = await storage.readToken();
        
        const response = await fetch(`${config.auth_url}/data?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': tokenObject.token
              }
        });
        const result = await response.json();
        
        return result.data;
    },
    setUserData: async function setUserData(station: object) {
        const stationName = station.AdvertisedLocationName;
        const stationCoords = station.Geometry.WGS84;
        const rawCoordinates = stationCoords.split(" ");
        const latitude = rawCoordinates[1].slice(1);
        const longitude = rawCoordinates[2].slice(0, -1);
        const tokenObject: any = await storage.readToken();
        const artefact = {
            "latitude": latitude,
            "longitude": longitude,
            "place": stationName
        };
        const data = {
            artefact: JSON.stringify(artefact),
            api_key: config.api_key,
        };

        try {
            await fetch(`${config.auth_url}/data`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': tokenObject.token
                },
            
            });
        } catch (error) {
            console.log(error);
        }
    },
    deleteUserData: async function updateUserData(id: number) {
        const tokenObject: any = await storage.readToken();
        const data = {
            id: id,
            api_key: config.api_key,
        };

        try {
            await fetch(`${config.auth_url}/data`, {
                method: "DELETE",
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': tokenObject.token
                },
            });
        } catch (error) {
            console.log(error);
        }
    },
};

export default user;
