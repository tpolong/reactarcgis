import {loadModules} from 'esri-loader';
import React from 'react';
import EsriLoaderReact from 'esri-loader-react';
import Toggle from './Toggle'

class App extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    options = {
        url: 'https://js.arcgis.com/4.12/'
    };
    action = null
    change = () => {
        if (this.action) {
            this.action()
        }
    }

    mapload = () => loadModules(['esri/Map', 'esri/views/MapView', "esri/views/SceneView"], this.options).then(
        ([Map, MapView, SceneView]) => {
            let appConfig = {
                mapView: null,
                sceneView: null,
                activeView: null,
                container: this.props.node// use same container for views
            };
            let initialViewParams = {
                zoom: 12,
                center: [-122.43759993450347, 37.772798684981126],
                map: null,
                container: appConfig.container
            };
            let webmap = new Map({
                basemap: "satellite"
            });
            let canvas = document.createElement("canvas");
            // Get WebGLRenderingContext from canvas element
            let gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            let webglDetect = (gl && gl instanceof WebGLRenderingContext)
            appConfig.mapView = createView(initialViewParams, "2d");
            appConfig.mapView.map = webmap;
            appConfig.activeView = appConfig.mapView;
            if (!webglDetect) {
                alert('WebGL is not supported on your platform/browser')
            } else {
                // create 3D view, won't initialize until container is set
                initialViewParams.container = null;
                initialViewParams.map = webmap;
                appConfig.sceneView = createView(initialViewParams, "3d");
                // if (!this.props.value) {
                //     this.action()
                // }
            }


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

            this.action = function switchView() {
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

    render() {
        return (
            <EsriLoaderReact
                onReady={this.mapload}
            >
                <Toggle mapchange={this.change} is2D={true}/>
            </EsriLoaderReact>
        )
    }

}

export default App;
