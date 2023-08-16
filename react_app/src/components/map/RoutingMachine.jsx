import L from "leaflet";
import {createControlComponent} from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
    const {
        waypoints,
        func: {
            setTotalDistance,
            setTotalTime,
        }
    } = props;

    const routeControl = L.Routing.control({
        waypoints: waypoints.map((value) => L.latLng(value[1], value[0])),
        lineOptions: {
            styles: [{color: "#6FA1EC", weight: 5}]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createMarker: function () {
            return null;
        },
    });

    routeControl.on('routesfound', function (e) {
        const {totalDistance, totalTime} = e.routes[0].summary;

        setTotalDistance(Math.round(totalDistance / 1000));
        setTotalTime(Math.round(totalTime / 3600));
    });

    return routeControl;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
