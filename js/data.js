/* data.js - dummy data untuk tugas praktik 1 */

// data stok bahan ajar
const dataBahanAjar = [
  {
    kode: "BA001",
    judul: "Pengantar Teknologi Informasi",
    kategori: "TI",
    upbjj: "Jakarta",
    lokasiRak: "Rak A1",
    qty: 12,
    safety: 5,
    catatanHTML: "<i>Tersedia</i>"
  },
  {
    kode: "BA002",
    judul: "Matematika Dasar",
    kategori: "MIPA",
    upbjj: "Bandung",
    lokasiRak: "Rak B3",
    qty: 4,
    safety: 5,
    catatanHTML: "<b>Reorder disarankan</b>"
  },
  {
    kode: "BA003",
    judul: "Bahasa Indonesia",
    kategori: "Umum",
    upbjj: "Surabaya",
    lokasiRak: "Rak C2",
    qty: 0,
    safety: 3,
    catatanHTML: "<span style='color:red'>Kosong</span>"
  },
  {
    kode: "BA004",
    judul: "Algoritma dan Pemograman",
    kategori: "SI",
    upbjj: "Jakarta",
    lokasiRak: "Rak B3",
    qty: 9,
    safety: 10,
    catatanHTML: "<b>Reorder disarankan</b>"
  },
  {
    kode: "BA005",
    judul: "Proses Bisnis",
    kategori: "SI",
    upbjj: "Jakarta",
    lokasiRak: "Rak A2",
    qty: 120,
    safety: 5,
    catatanHTML: "<i>Tersedia</i>"
  },
  {
    kode: "BA006",
    judul: "Basis Data",
    kategori: "SI",
    upbjj: "Surabaya",
    lokasiRak: "Rak A3",
    qty: 50,
    safety: 5,
    catatanHTML: "<i>Tersedia</i>"
  },
  {
    kode: "BA007",
    judul: "Pancasila",
    kategori: "UMUM",
    upbjj: "Medan",
    lokasiRak: "Rak D1",
    qty: 38,
    safety: 5,
    catatanHTML: "<i>Tersedia</i>"
  }
];

// data delivery order untuk tracking
window. dataDO = [
  {
    no: "DO-20251101-002",
    nim: "1234567890",
    nama: "Budi Santoso",
    paket: "PKT01",
    upbjj: "Jakarta",
    ekspedisi: "JNE Reguler",
    total: 150000,
    tanggal: "2025-11-01",
    status: "Dibuat",
    tracking: [
      { tanggal: "2025-11-01", lokasi: "Jakarta", status: "Paket sedang disiapkan" },
      { tanggal: "2025-11-01", lokasi: "Jakarta", status: "Pengiriman sedang diproses" }
    ]
  },
  {
    no: "DO-20251101-001",
    nim: "9876543210",
    nama: "Siti Aminah",
    paket: "PKT02",
    upbjj: "Bandung",
    ekspedisi: "TIKI",
    total: 180000,
    tanggal: "2025-11-01",
    status: "Dikirim",
    tracking: [
      { tanggal: "2025-11-01", lokasi: "Jakarta", status: "Paket sedang disiapkan" },
      { tanggal: "2025-11-01", lokasi: "Jakarta", status: "Pengiriman sedang diproses" },
      { tanggal: "2025-11-01", lokasi: "Jakarta", status: "Telah dikirim dari gudang terkait" },
      { tanggal: "2025-11-02", lokasi: "Bandung", status: "Paket telah sampai ditransit gudang" },
      { tanggal: "2025-11-02", lokasi: "Bandung", status: "Paket sedang disortir" }
    ]
  },
  {
    no: "DO-20251103-001",
    nim: "2468101214",
    nama: "Ahmad Rizki",
    paket: "PKT02",
    upbjj: "Surabaya",
    ekspedisi: "J&T",
    total: 180000,
    tanggal: "2025-11-03",
    status: "Diterima",
    tracking: [
      { tanggal: "2025-11-03", lokasi: "Jakarta", status: "Paket sedang disiapkan" },
      { tanggal: "2025-11-03", lokasi: "Jakarta", status: "Pengiriman sedang diproses" },
      { tanggal: "2025-11-03", lokasi: "Jakarta", status: "Telah dikirim dari gudang terkait" },
      { tanggal: "2025-11-04", lokasi: "Bandung", status: "Paket telah sampai ditransit gudang" },
      { tanggal: "2025-11-04", lokasi: "Bandung", status: "Paket sedang disortir" },
      { tanggal: "2025-11-04", lokasi: "Bandung", status: "Paket sedang dikirim ke gudang surabaya" },
      { tanggal: "2025-11-05", lokasi: "Surabaya", status: "Paket telah sampai digudang terkait" },
      { tanggal: "2025-11-05", lokasi: "Surabaya", status: "Paket menuju alamat penerima" },
      { tanggal: "2025-11-05", lokasi: "Surabaya", status: "Paket telah diterima" }
    ]
  }
];



// credentials (dummy) untuk simulasi login
const credentials = [
  { email: 'admin@ut.ac.id', password: 'admin123', name: 'Admin SITTA' },
  { email: 'user@ut.ac.id', password: 'user12345', name: 'Pengguna SITTA' }
];