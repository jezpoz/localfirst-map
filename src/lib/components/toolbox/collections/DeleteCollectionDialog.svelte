<script lang="ts">
  import Dialog from "$lib/components/dialog/Dialog.svelte";
  import * as Dropdown from "$lib/components/ui/dropdown-menu";
  import Button from "$lib/components/ui/button/button.svelte";
  import { db, type GeoJsonCollection } from "$lib/db";
  import { liveQuery } from "dexie";

  let { open, onClose }: { open: boolean; onClose?: () => void } = $props();
  const collections = liveQuery(() => db.collections.toArray());
  let selectedCollection: GeoJsonCollection | undefined = $state();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (selectedCollection) {
      db.collections.delete(selectedCollection.id);
    }
    onClose?.();
  }
</script>

<Dialog title="Delete collection" {open} {onClose}>
  <form class="flex flex-col" onsubmit={handleSubmit}>
    <p>Select the collection you want to delete</p>
    <Dropdown.Root>
      <Dropdown.Trigger>
        {#if selectedCollection}
          {selectedCollection.id}
        {/if}
        {#if !selectedCollection}
          Select collection
        {/if}
      </Dropdown.Trigger>
      <Dropdown.Content>
        {#if $collections}
          {#each $collections as collection}
            <Dropdown.Item onclick={() => (selectedCollection = collection)}>
              {collection.id}
            </Dropdown.Item>
          {/each}
        {/if}
      </Dropdown.Content>
    </Dropdown.Root>
    <Button type="submit">Delete</Button>
    <Button>Cancel</Button>
  </form>
</Dialog>
