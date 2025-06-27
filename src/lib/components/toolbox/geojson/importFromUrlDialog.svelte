<script lang="ts">
  import Dialog from "$lib/components/dialog/Dialog.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { db, type GeoJsonCollection } from "$lib/db";
  import { v4 as uuidv4 } from "uuid";

  let { open, onClose } : { open: boolean; onClose?: () => void } = $props();
  let url: string = $state('');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    try {
      const response = await fetch(url);
      const textResponse = await response.text();
      const json = JSON.parse(textResponse) as Pick<GeoJsonCollection, "features" | "type">;
      db.collections.add({
        id: uuidv4() as string,
        ...json,
      });
      onClose?.();
    } catch (err) {
      console.error("Error fetching json");
    }
  }

</script>

<Dialog
  title="Import GeoJSON from URL"
  open={open}
  onClose={onClose}
>
  <form class="flex flex-col" onsubmit={handleSubmit}>
    <label class="flex flex-col">
      Input the URL
      <input bind:value={url} type="url" />
    </label>
    <Button type="submit">Import</Button>
  </form>
</Dialog>