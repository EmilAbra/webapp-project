import { render } from '@testing-library/react-native';
import StationsList from '../components/StationsList';

const delayes = [{
    "ActivityId": "1500adde-125d-5f4a-08da-bf8f974c6e42",
    "ActivityType": "Avgang",
    "AdvertisedTimeAtLocation": "2022-11-21T00:34:00.000+01:00",
    "AdvertisedTrainIdent": "3003",
    "Canceled": false,
    "EstimatedTimeAtLocation": "2022-11-21T00:44:00.000+01:00",
    "FromLocation": [
        {
            "LocationName": "G",
            "Priority": 1,
            "Order": 0
        }
    ],
    "ToLocation": [
        {
            "LocationName": "Kb",
            "Priority": 1,
            "Order": 0
        }
    ]
}];

const stationNoDelay = [{
    "AdvertisedLocationName": "Bålsta",
    "Geometry": {
        "WGS84": "POINT (17.531884549633357 59.56943227548269)"
    },
    "LocationSignature": "Bål",
    "PlatformLine": [
        "1",
        "2",
        "3"
    ]
}];

const stationWithDelay = [{
    "AdvertisedLocationName": "Göteborg C",
    "Geometry": {
        "WGS84": "POINT (11.973894352578421 57.70890077552247)"
    },
    "LocationSignature": "G",
    "PlatformLine": [
        "1",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
    ]
}];

test('If no stations has delayes, text "Inga förseningar att visa" should show', async () => {
    const { getByText } = render(<StationsList allStations={stationNoDelay} currentDelays={delayes} />);

    const message = await getByText('Inga förseningar att visa', { exact: false });

    expect(message).toBeDefined();
});

test('If delay exists, a button should show with the station name as title', async () => {
    const { getByText } = render(<StationsList allStations={stationWithDelay} currentDelays={delayes} />);
    const buttonTitle = await getByText('Göteborg C', { exact: false });

    expect(buttonTitle).toBeDefined();
});