const stokApp = Vue.createApp({
  data() {
    return {
      list: [...dataBahanAjar],
      upbjjList: ["Jakarta", "Bandung", "Surabaya", "Medan", "Makassar"],

      // filter
      filterUpbjj: "",
      filterKategori: "",
      filterKritis: false,

      sortBy: "judul"
    };
  },

  computed: {
    kategoriList() {
      return [...new Set(this.list.map(x => x.kategori))];
    },

    hasilAkhir() {
      let d = this.list;

      // filter upbjj
      if (this.filterUpbjj)
        d = d.filter(x => x.upbjj === this.filterUpbjj);

      // filter kategori
      if (this.filterKategori)
        d = d.filter(x => x.kategori === this.filterKategori);

      // filter stok kritis
      if (this.filterKritis)
        d = d.filter(x => x.qty <= x.safety);

      // sorting
      if (this.sortBy === "judul") {
        d = [...d].sort((a, b) => a.judul.localeCompare(b.judul));
      } else if (this.sortBy === "qty") {
        d = [...d].sort((a, b) => a.qty - b.qty);
      }

      return d;
    }
  },

  watch: {
    filterUpbjj() {
      this.filterKategori = "";
    },

    filterKritis(val) {
      console.log("Filter stok kritis:", val);
    }
  },

  methods: {
    resetFilter() {
      this.filterUpbjj = "";
      this.filterKategori = "";
      this.filterKritis = false;
      this.sortBy = "judul";
    }
  }
});

stokApp.mount("#stokApp");