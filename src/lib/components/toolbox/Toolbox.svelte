<script lang="ts">
  import * as Dropdown from "$lib/components/ui/dropdown-menu";
  import Button from "../ui/button/button.svelte";
  import ImportDialog from "./ImportDialog.svelte";

  let importDialogOpen = $state(false);
</script>

<div class="absolute z-10 right-2 top-2">
  <Dropdown.Root>
    <Dropdown.Trigger>
      <Button>Open</Button>
    </Dropdown.Trigger>
    <Dropdown.Content>
      <Dropdown.Group>
        <Dropdown.Label>
          Features
        </Dropdown.Label>
        <Dropdown.Separator />
        <Dropdown.Item onclick={() => {importDialogOpen = true}} value="">
          Import GeoJSON
        </Dropdown.Item>
      </Dropdown.Group>
    </Dropdown.Content>
  </Dropdown.Root>
  <ImportDialog open={importDialogOpen} />
</div>

