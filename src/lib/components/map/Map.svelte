<script lang="ts">
  import 'ol/ol.css';
  import { onMount } from "svelte";
  import Map from 'ol/Map.js';
  import OSM from 'ol/source/OSM.js';
  import TileLayer from 'ol/layer/Tile.js';
  import View from 'ol/View.js';

  onMount(() => {
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
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  });

  let map: Map | undefined = $state();
  let view: View | undefined = $state();
  let mapElement: HTMLDivElement;
</script>

<div bind:this={mapElement} class="absolute z-0 h-full w-full"></div>