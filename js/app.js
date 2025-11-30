import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

import Api from "./service/api.js";

import StockTable from "./components/stock-table.js";
import OrderForm from "./components/order-form.js";
import StatusBadge from "./components/status-badge.js";
import AppModal from "./components/app-modal.js";

createApp({
  components: {
    "stock-table": StockTable,
    "order-form": OrderForm,
    "status-badge": StatusBadge,
    "app-modal": AppModal
  },

  data() {
    return {
      bahanAjar: [],
      selectedItem: null
    };
  },

  async created() {
    this.bahanAjar = await Api.getBahanAjar();
  },

  methods: {
    // Buka modal edit
    openEditModal(item) {
      this.selectedItem = item;
      this.$refs.modal.open(item);
    },

    // Simpan perubahan dari modal
    saveEdit(updated) {
    const index = this.bahanAjar.findIndex(x => x.kode === updated.kode);
     if (index !== -1) {
      this.bahanAjar[index] = { ...updated };

    // update agar reactive
      this.bahanAjar = [...this.bahanAjar];

    alert("Data berhasil disimpan!");
    }
   }
  }
}).mount("#app");
