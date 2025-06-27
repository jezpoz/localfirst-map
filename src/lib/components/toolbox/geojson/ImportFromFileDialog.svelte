<script lang="ts">
  import Dialog from "$lib/components/dialog/Dialog.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { db, type GeoJsonCollection } from "$lib/db";
  import { v4 as uuidv4 } from "uuid";

  let { open, onClose } : { open: boolean; onClose?: () => void } = $props();

  let files: FileList | undefined = $state();

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (files) {
      for (const file of files) {
        const fileContent = await file.text();
        try {
          const json = JSON.parse(fileContent) as Pick<GeoJsonCollection, "features">;
          db.collections.add({
            id: uuidv4() as string,
            type: "FeatureCollection",
            ...json,
          });
          onClose?.();
        } catch (err) {
          console.error("Error parsing json", error);
        }
      }
    }
  }
</script>

<Dialog
  title="Import GeoJSON from file"
  open={open}
  onClose={onClose}
>
  <form class="flex flex-col" onsubmit={handleSubmit}>
    <label class="flex flex-col">
      Select your GeoJSON file
      <input bind:files type="file" multiple accept={".geojson"}/>
    </label>
    <Button type="submit">Import</Button>
  </form>
  
</Dialog>