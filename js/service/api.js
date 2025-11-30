export default {

  async getBahanAjar() {
    const res = await fetch("data/dataBahanAjar.json");
    if (!res.ok) throw new Error("Gagal memuat data bahan ajar");
    const data = await res.json();
    return data.bahanAjar;  // ⬅ hanya kirim array bahanAjar
  }

};
