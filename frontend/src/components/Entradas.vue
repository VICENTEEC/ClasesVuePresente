<script>
import DatePicker from 'primevue/datepicker';
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import TreeSelect from "primevue/treeselect";
import { NodeService } from "@/assets/NodeService";

export default {
  components: { DatePicker, Button, ConfirmDialog, Toast, TreeSelect },
  data() {
    return {
      date: null,
      nodes: null,
      selectedValue: null,
    };
  },

  methods: {
    confirm1() {
      this.$confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        rejectClass: "p-button-secondary p-button-outlined",
        rejectLabel: "Cancel",
        acceptLabel: "Save",
        accept: () => {
          this.$toast.add({ severity: "info", summary: "Confirmed", detail: "You have accepted", life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: "error", summary: "Rejected", detail: "You have rejected", life: 3000 });
        },
      });
    },
    confirm2() {
      this.$confirm.require({
        message: "Do you want to delete this record?",
        header: "Danger Zone",
        icon: "pi pi-info-circle",
        rejectLabel: "Cancel",
        acceptLabel: "Delete",
        rejectClass: "p-button-secondary p-button-outlined",
        acceptClass: "p-button-danger",
        accept: () => {
          this.$toast.add({ severity: "info", summary: "Confirmed", detail: "Record deleted", life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: "error", summary: "Rejected", detail: "You have rejected", life: 3000 });
        },
      });
    },
  },
  mounted() {
    NodeService.getTreeNodes().then((data) => (this.nodes = data));
  },
};
</script>

<template>
  <div class="mt-3">
    <DatePicker v-model="date" />
  </div>
  <div>
    <Button label="Primary" />
    <Button label="Secondary" severity="secondary" />
    <Button label="Success" severity="success" />
    <Button label="Info" severity="info" />
    <Button label="Warning" severity="warning" />
    <Button label="Help" severity="help" />
    <Button label="Danger" severity="danger" />
    <Button label="Contrast" severity="contrast" />
  </div>
  <div>
    <Button type="button" label="Emails" badge="2" />
    <Button type="button" label="Messages" icon="pi pi-users" badge="2" badgeSeverity="contrast" outlined />
  </div>

  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div>
    <Button @click="confirm1()" label="Save" outlined></Button>
    <Button @click="confirm2()" label="Delete" severity="danger" outlined></Button>
  </div>

  <div class="card flex justify-content-center">
    <TreeSelect v-model="selectedValue" :options="nodes" placeholder="Select Item" class="md:w-20rem w-full" />
  </div>
</template>
