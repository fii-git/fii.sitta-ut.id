import StatusBadge from "./status-badge.js";

const template = await fetch("../../template/stock-table.html").then(r => r.text());

export default {
  template,
  props: ["items"],

  components: {
    "status-badge": StatusBadge   // ⬅ WAJIB ADA!!
  },

  data() {
    return {
      filterUpbjj: "",
      filterKategori: "",
      filterKritis: false,
      sortBy: "judul"
    };
  },

  computed: {
    uniqueUpbjj() {
      return [...new Set(this.items.map(i => i.upbjj))];
    },
    uniqueKategori() {
      return [...new Set(this.items.map(i => i.kategori))];
    },

    filteredData() {
      let d = [...this.items];

      if (this.filterUpbjj)
        d = d.filter(i => i.upbjj === this.filterUpbjj);

      if (this.filterKategori)
        d = d.filter(i => i.kategori === this.filterKategori);

      if (this.filterKritis)
        d = d.filter(i => i.qty < i.safety);

      if (this.sortBy === "judul")
        d.sort((a, b) => a.judul.localeCompare(b.judul));
      else if (this.sortBy === "qty")
        d.sort((a, b) => a.qty - b.qty);
      else if (this.sortBy === "harga")
        d.sort((a, b) => a.harga - b.harga);

      return d;
    }
  },

  methods: {
    formatHarga(h) {
      return "Rp " + h.toLocaleString("id-ID");
    },

    getStatus(item) {
      if (item.qty === 0) return "Kosong";
      if (item.qty < item.safety) return "Menipis";
      return "Aman";
    },

    getCatatan(item) {
      if (item.qty === 0) return "Segera restock";
      if (item.qty < item.safety) return "Disarankan restock";
      return "Stock aman";
    },

    editItem(b) {
      this.$emit("edit-item", b);
    },

    hapusItem(kode) {
      const idx = this.items.findIndex(i => i.kode === kode);
      if (idx !== -1) this.items.splice(idx, 1);
    },

    resetFilter() {
      this.filterUpbjj = "";
      this.filterKategori = "";
      this.filterKritis = false;
      this.sortBy = "judul";
    }
  }
};
