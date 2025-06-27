<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
    import type { Snippet } from "svelte";

  interface DialogProps {
    title: string;
    open: boolean;
    onClose?: () => void;
    children?: Snippet;
  }

  let { title, open, onClose, children }: DialogProps = $props();

  function handleOpenChange(isOpen: boolean) {
    if (onClose && !isOpen && open) {
      onClose();
    }
    open = isOpen;
  }
</script>

<Dialog.Root {open} onOpenChange={handleOpenChange}>
  <Dialog.Content>
    <Dialog.Header>{title}</Dialog.Header>
    <Dialog.Description>
      {@render children?.()}
    </Dialog.Description>
  </Dialog.Content>
</Dialog.Root>
