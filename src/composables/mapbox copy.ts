import 'mapbox-gl/dist/mapbox-gl.css';
import { onMounted, Ref, ref } from "vue";
import MapboxLanguage from "@mapbox/mapbox-gl-language"; // 语言包
import mapboxgl, { Map, Marker } from "mapbox-gl";

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'; // 地理编码器控件
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export function initDragMap(arr: [number, number]) {
    const mapDivElement: Ref<HTMLDivElement | null> = ref(null) // 绑定的组件
    const map: Ref<Map> = ref({}) as Ref<Map> // mapboxgl.Map
    const marker: Ref<Marker> = ref({}) as Ref<Marker> // mapboxgl.Marker
    const geocoder: Ref<MapboxGeocoder> = ref({}) as Ref<MapboxGeocoder>  // MapboxGeocoder

    onMounted(() => { return initMap(arr); })

    return {
        map,
        mapDivElement,
        marker,
        geocoder,
    }

    /**
     * 初始化mapbox
     */
    function initMap(arr: [number, number]): void {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaW1ldGFsayIsImEiOiJja3pmYmU5Njgxb3VoMm9rdTRnMDhsMDVxIn0.3eeOxtTcgcfOCBgwB-R9Lg' //这里请换成自己的token
        // let arr = [lng, lat];//写入希望初始化的经纬度
        mapNew(map, mapDivElement, marker, arr, geocoder);
        map.value.on("move", moveing);//地图移动则变化移动中
    }

    function moveing() {
        var lngLat = map.value.getCenter();
        marker.value.setLngLat(lngLat);
    }
}

/**
 * 新建地图
 * @param map
 * @param mapDivElement
 * @param marker
 * @param arr
 */
function mapNew(map: Ref<Map>, mapDivElement: Ref<HTMLDivElement | null>, marker: Ref<Marker>, arr: [number, number], geocoder: Ref<MapboxGeocoder>) {
    if (mapDivElement.value !== null) {
        map.value = new mapboxgl.Map({
            container: mapDivElement.value, // container id 绑定的组件的id
            center: arr,//[1, 1], // 初始坐标系 //[number, number] | LngLat | { lng: number; lat: number } | { lon: number; lat: number }
            scrollZoom: true,
            minZoom: 1.7, // 设置最小拉伸比例
            zoom: 0, // starting zoom 地图初始的拉伸比例
            style: "mapbox://styles/mapbox/light-v10", // 类型 streets-v11
            // pitch: 60, //地图的角度，不写默认是0，取值是0-60度，一般在3D中使用
            bearing: 0, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北,-17.6
            antialias: false, //抗锯齿，通过false关闭提升性能
            // maxBounds: [[, ], // 西南方坐标
            // [, ]] //东北方坐标,用于控制缩放范围

            attributionControl: false, // 取消将一个 AttributionControl 添加到地图中

        });


        mapThreeDim(map, 'street-map');
        skyLoad(map);

        // 中文
        map.value.addControl(
            new MapboxLanguage({
                defaultLanguage: "zh-Hans",
            })
        );

        const scale = new mapboxgl.ScaleControl({
            maxWidth: 100,
            unit: 'metric'
        });

        map.value.addControl(scale, "bottom-left");// 比例尺
        scale.setUnit('metric');

        // 这里就是图层部分，可以在官网找到自己希望图层样式
        marker.value = new mapboxgl.Marker({
            draggable: true, // 
            color: '$font-color-fix'
        })
            .setLngLat(arr)
            .addTo(map.value);

        // function onDragEnd() {
        //     var lngLat = marker.getLngLat();
        //     coordinates.style.display = 'block';
        //     coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
        // }

        // marker.on('dragend', onDragEnd);
        geocoder.value = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: map.value,
            marker: marker.value,
            zoom:1.7
        });

        // Add the control to the map.
        map.value.addControl(geocoder.value)

        // geocoder.value.query('hk')

    } else {
        throw Error('map new init error')
    }
}

// 2
// export function mapThreeDim(map: Ref<Map>, style: MapType)
export function mapThreeDim(map: Ref<Map>, style: string) {
    map.value.on("load", () => {
        const layers = map.value.getStyle().layers;
        if (layers !== undefined) {
            const labelLayerId = layers.find(
                (layer) => {
                    if ("layout" in layer && layer.layout !== undefined) {
                        return layer.type === "symbol" && layer.layout["text-field"]
                    } else {
                        return false
                    }
                }
            )?.id;
            map.value.addLayer(
                {
                    id: "3d",
                    source: "composite",
                    "source-layer": "building",
                    filter: ["==", "extrude", "true"],
                    type: "fill-extrusion",
                    minzoom: 15,
                    paint: {
                        "fill-extrusion-color": "#aaa",

                        // 当用户放大时，使用“插值”表达式为建筑物添加平滑过渡效果
                        "fill-extrusion-height": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            15,
                            0,
                            15.05,
                            ["get", "height"],
                        ],
                        "fill-extrusion-base": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            15,
                            0,
                            15.05,
                            ["get", "min_height"],
                        ],
                        "fill-extrusion-opacity": 0.6,
                    },
                },
                labelLayerId
            );
        }
    });
}

//3
export function skyLoad(map: Ref<Map>) {
    map.value.on("load", () => {
        map.value.addLayer({
            id: "sky",
            type: "sky",
            paint: {
                "sky-type": "atmosphere",
                "sky-atmosphere-sun": [0.0, 0.0],
                "sky-atmosphere-sun-intensity": 15,
            },
        });
    });
}

// 使用
// <div class="chart" id="mapContainer" ref="mapDivElement" />
// const {
//     map,
//     mapDivElement,
//     marker
// } = initDragMap();