<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import GeoJsonFromURLDialog from "$lib/components/toolbox/geojson/importFromUrlDialog.svelte";
  import GeoJsonFromFileDialog from "$lib/components/toolbox/geojson/ImportFromFileDialog.svelte";
  import DeleteCollectionDialog from "../toolbox/collections/DeleteCollectionDialog.svelte";

  let open: boolean = $state(false);
  let geoJsonFromURLOpen: boolean = $state(false);
  let geoJsonFromFileOpen: boolean = $state(false);
  let deleteCollectionOpen: boolean = $state(false);

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      open = !open;
    }
  }
</script>

<svelte:document onkeydown={handleKeydown} />

<Command.Dialog {open} onOpenChange={() => open != open}>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found</Command.Empty>
    <Command.Group heading="GeoJSON">
      <Command.Item onclick={() => (geoJsonFromURLOpen = !geoJsonFromURLOpen)}>
        Import from URL
      </Command.Item>
      <Command.Item
        onclick={() => (geoJsonFromFileOpen = !geoJsonFromFileOpen)}
      >
        Import from file
      </Command.Item>
    </Command.Group>
    <Command.Group heading="Collections">
      <Command.Item
        onclick={() => (deleteCollectionOpen = !deleteCollectionOpen)}
      >
        Delete collection
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command.Dialog>

<GeoJsonFromURLDialog
  open={geoJsonFromURLOpen}
  onClose={() => {
    geoJsonFromURLOpen = false;
  }}
/>

<GeoJsonFromFileDialog
  open={geoJsonFromFileOpen}
  onClose={() => {
    geoJsonFromFileOpen = false;
  }}
/>

<DeleteCollectionDialog
  open={deleteCollectionOpen}
  onClose={() => {
    deleteCollectionOpen = false;
  }}
/>
