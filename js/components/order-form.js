const template = await fetch("../template/order-form.html").then(r => r.text());

export default {
  template,

  data() {
    return {
      form: {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        qty: 0,
        safety: 0,
        harga: 0,
        catatanHTML: "<i>Tersedia</i>"
      }
    };
  },

  methods: {
    submitForm() {
      // ===== VALIDASI WAJIB =====
      if (
        !this.form.kode ||
        !this.form.judul ||
        !this.form.kategori ||
        !this.form.upbjj ||
        !this.form.lokasiRak ||
        this.form.qty === null ||
        this.form.safety === null
      ) {
        alert("⚠ Harap lengkapi semua form sebelum menambahkan bahan ajar.");
        return;
      }

      // ===== DATA SUDAH VALID =====
      const newItem = {
        kode: this.form.kode,
        judul: this.form.judul,
        kategori: this.form.kategori,
        upbjj: this.form.upbjj,
        lokasiRak: this.form.lokasiRak,
        qty: Number(this.form.qty),
        safety: Number(this.form.safety),
        harga: Number(this.form.harga ?? 0),
        catatanHTML: this.form.catatanHTML
      };

      // Kirim data ke parent (app)
      this.$emit("add-item", newItem);

      // Alert sukses
      alert("✅ Bahan ajar berhasil ditambahkan!");

      // Reset form
      this.form = {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        qty: 0,
        safety: 0,
        harga: 0,
        catatanHTML: "<i>Tersedia</i>"
      };
    }
  }
};
