<script lang="ts">
  import "ol/ol.css";
  import { onMount } from "svelte";
  import Map from "ol/Map.js";
  import OSM from "ol/source/OSM.js";
  import TileLayer from "ol/layer/Tile.js";
  import View from "ol/View.js";
  import GeoJSON from "ol/format/GeoJSON";
  import VectorLayer from "ol/layer/Vector.js";

  import { liveQuery } from "dexie";
  import { db, type GeoJsonCollection } from "$lib/db";
  import VectorSource from "ol/source/Vector";

  onMount(() => {
    vectorSource = new VectorSource();
    vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    view = new View({
      center: [0, 0],
      zoom: 2,
    });
    map = new Map({
      target: mapElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    collections.subscribe({
      next: handleCollectionSubscription,
    });
  });

  const collections = liveQuery(() => db.collections.toArray());

  function handleCollectionSubscription(result: GeoJsonCollection[]) {
    if (vectorSource) {
      for (const featureCollection of result) {
        const features = geoJson.readFeatures(featureCollection, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        });
        vectorSource.addFeatures(features);
      }
    }
  }

  let geoJson: GeoJSON = new GeoJSON();
  let map: Map | undefined = $state();
  let view: View | undefined = $state();
  let vectorSource: VectorSource | undefined = $state();
  let vectorLayer: VectorLayer | undefined = $state();
  let mapElement: HTMLDivElement;
</script>

<div bind:this={mapElement} class="absolute z-0 h-full w-full"></div>
