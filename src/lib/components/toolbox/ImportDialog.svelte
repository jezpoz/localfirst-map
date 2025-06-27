<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";

  let { open, onClose }: { open: boolean; onClose?: () => void } = $props();

  function handleOpenChange(isOpen: boolean) {
    if (onClose && !isOpen && open) {
      onClose();
    }
    open = isOpen;
  }
</script>

<Dialog.Root {open} onOpenChange={handleOpenChange}>
  <Dialog.Content>
    <Dialog.Header>Import GeoJSON</Dialog.Header>
    <Dialog.Description>
      Import your GeoJSON. Upload file or paste a URL where they are hosted.
    </Dialog.Description>
  </Dialog.Content>
</Dialog.Root>
