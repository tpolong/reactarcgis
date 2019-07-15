import {loadModules} from 'esri-loader';
import emitter from './events';
const MapControl = (props) => {
    const options = {
        url: 'https://js.arcgis.com/4.12/'
    };
    let view = props.view
    console.log(view)

    loadModules(['esri/Map', 'esri/views/MapView',
        "esri/views/SceneView"
        ], options).then(([Map, MapView, SceneView]) => {
        let appConfig = {
            mapView: null,
            sceneView: null,
            activeView: null,
            container: 'root'// use same container for views
        };
        let initialViewParams = {
            zoom: 12,
            center: [-122.43759993450347, 37.772798684981126],
            map: null,
            container: appConfig.container
        };
        let webmap =  new Map({
            basemap: "topo-vector"
        });

        appConfig.mapView = createView(initialViewParams, "2d");
        appConfig.mapView.map = webmap;
        appConfig.activeView = appConfig.mapView;
        // create 3D view, won't initialize until container is set
        initialViewParams.container = null;
        initialViewParams.map = webmap;
        appConfig.sceneView = createView(initialViewParams, "3d");
        if (!view.value) {
            switchView()
        }
        emitter.on('ViewChange', () => {
            switchView()
        })

        function createView(params, type) {
            var view;
            var is2D = type === "2d";
            if (is2D) {
                view = new MapView(params);
                return view;
            } else {
                view = new SceneView(params);
            }
            return view;
        }

        function switchView() {
            var is3D = appConfig.activeView.type === "3d";
            var activeViewpoint = appConfig.activeView.viewpoint.clone();
            // remove the reference to the container for the previous view
            appConfig.activeView.container = null;
            if (is3D) {
                appConfig.mapView.viewpoint = activeViewpoint;
                appConfig.mapView.container = appConfig.container;
                appConfig.activeView = appConfig.mapView;
            } else {
                appConfig.sceneView.viewpoint = activeViewpoint;
                appConfig.sceneView.container = appConfig.container;
                appConfig.activeView = appConfig.sceneView;
            }
        }
    }).catch((err) => console.error(err));

    return null;
}
export default MapControl;
