import { useState, useEffect } from 'react';
import { loadModules } from '@esri/react-arcgis';


const BermudaTriangle = (props) => {

    const [graphic, setGraphic] = useState(null);
    useEffect(() => {
        const options = {
            url: 'https://js.arcgis.com/4.12/'
        };
        loadModules(['esri/Map', 'esri/views/MapView',
            "esri/views/SceneView",
            "esri/WebMap",
            "esri/WebScene"],options).then(([Map, MapView,SceneView,WebMap,WebScene]) => {
            var appConfig = {
                mapView: null,
                sceneView: null,
                activeView: null,
                container: 'root'// use same container for views
            };

            var initialViewParams = {
                zoom: 12,
                center: [-122.43759993450347, 37.772798684981126],
                map:null,
                container: appConfig.container
            };
            var webmap = new WebMap({
                portalItem: {
                    // autocasts as new PortalItem()
                    id: "7ee3c8a93f254753a83ac0195757f137"
                }
            });
            var scene = new WebScene({
                portalItem: {
                    // autocasts as new PortalItem()
                    id: "c8cf26d7acab4e45afcd5e20080983c1"
                }
            });
            appConfig.mapView = createView(initialViewParams, "2d");
            appConfig.mapView.map = webmap;
            appConfig.activeView = appConfig.mapView;

            // create 3D view, won't initialize until container is set
            initialViewParams.container = null;
            initialViewParams.map = scene;
            appConfig.sceneView = createView(initialViewParams, "3d");

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
                    // if the input view is a SceneView, set the viewpoint on the
                    // mapView instance. Set the container on the mapView and flag
                    // it as the active view
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

        return function cleanup() {
            props.view.graphics.remove(graphic);
        };
    }, [ graphic, props ]);

    return null;

}

export default BermudaTriangle;