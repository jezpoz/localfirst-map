<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import ImportDialog from "../toolbox/ImportDialog.svelte";

  let open: boolean = $state(false);
  let importDialogOpen: boolean = $state(false);

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      console.log("Hello?", open);
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
      <Command.Item onclick={() => (importDialogOpen = !importDialogOpen)}>
        Import GeoJSON from URL...
      </Command.Item>
      <Command.Item onclick={() => (importDialogOpen = !importDialogOpen)}>
        Import GeoJSON from file...
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command.Dialog>

<ImportDialog
  open={importDialogOpen}
  onClose={() => {
    open = false;
    importDialogOpen = false;
  }}
/>
