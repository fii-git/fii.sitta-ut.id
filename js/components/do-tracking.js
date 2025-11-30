export default {
  name: "DoTracking",
  template: `
  <div>
    <!-- FORM BUAT DO -->
    <div class="card">
      <h2>Buat Delivery Order Baru</h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:12px; margin-top:15px;">
        <div><label>NIM</label><input v-model="form.nim" placeholder="Masukkan NIM"></div>
        <div><label>Nama</label><input v-model="form.nama" placeholder="Masukkan Nama Mahasiswa"></div>
        <div>
          <label>Paket</label>
          <select v-model="form.paket">
            <option value="">Pilih Paket</option>
            <option v-for="p in paketList" :key="p.kode" :value="p.kode">{{p.kode}} — {{p.nama}}</option>
          </select>
        </div>
        <div v-if="paketDipilih">
          <label>Isi Paket</label>
          <ul style="margin-top:6px; list-style-type:circle; padding-left:18px;">
            <li v-for="item in paketDipilih.isi" :key="item">{{item}}</li>
          </ul>
        </div>
        <div>
          <label>UPBJJ</label>
          <select v-model="form.upbjj">
            <option value="">Pilih UPBJJ</option>
            <option v-for="u in upbjjList" :key="u">{{u}}</option>
          </select>
        </div>
        <div>
          <label>Ekspedisi</label>
          <select v-model="form.ekspedisi">
            <option value="">Pilih Ekspedisi</option>
            <option>JNE Reguler</option>
            <option>JNE Express</option>
            <option>TIKI</option>
            <option>J&T</option>
          </select>
        </div>
        <div>
          <label>Tanggal Kirim</label>
          <input type="date" v-model="form.tanggal">
        </div>
      </div>
      <div style="margin-top:15px; display:flex; justify-content:space-between; align-items:center;">
        <p><b>Total:</b> Rp {{ formatHarga(totalHarga) }}</p>
        <button @click="buatDO">📤 Simpan DO</button>
      </div>
    </div>

    <!-- TABEL DAFTAR DO -->
    <div class="card">
      <h2>Daftar Delivery Order</h2>
      <input v-model="cari" placeholder="🔍 Cari nomor DO..." style="width:100%; margin-bottom:10px;">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>No. DO</th><th>NIM</th><th>Nama</th><th>Paket</th><th>UPBJJ</th>
              <th>Ekspedisi</th><th>Total</th><th>Tanggal</th><th>Status</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in hasilCari" :key="d.no">
              <td>{{d.no}}</td>
              <td>{{d.nim}}</td>
              <td>{{d.nama}}</td>
              <td>{{ambilNamaPaket(d.paket)}}</td>
              <td>{{d.upbjj}}</td>
              <td>{{d.ekspedisi}}</td>
              <td>Rp {{formatHarga(d.total)}}</td>
              <td>{{d.tanggal}}</td>
              <td>
                <span :class="{
                  'status-dibuat': d.status==='Dibuat',
                  'status-dikirim': d.status==='Dikirim',
                  'status-diterima': d.status==='Diterima'
                }">{{d.status}}</span>
              </td>
             <td>
              <div class="table-actions">
                <button @click="lihatDetail(d)">Detail</button>
                <button @click="openStatusModal(d)" class="btn-warning">Status</button>
              </div>
             </td>
            </tr>
            <tr v-if="hasilCari.length===0">
              <td colspan="10" style="text-align:center; color:#888;">Tidak ada data DO.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL DETAIL -->
    <teleport to="body">
      <div v-if="showDetail" class="modal-overlay" @click.self="tutupDetail">
        <div class="modal-box">
          <h3>Detail Pengiriman: {{detailDO.no}}</h3>
          <p><strong>Nama:</strong> {{detailDO.nama}}</p>
          <p><strong>Ekspedisi:</strong> {{detailDO.ekspedisi}}</p>
          <p><strong>Tanggal Kirim:</strong> {{detailDO.tanggal}}</p>

          <h4>Riwayat Perjalanan:</h4>
          <ul>
            <li v-for="(item, index) in detailDO.tracking" :key="index">
              <strong>{{ item.tanggal || item.waktu }}</strong>
             -
              {{ item.lokasi || '' }}
              ({{ item.status || item.keterangan }})
            </li>
          </ul>
        
          <button class="btn-tutup" @click="tutupDetail">Tutup</button>
        </div>
      </div>
    </teleport>

    <div v-if="showStatusModal" class="modal-overlay" style="z-index:9999;">
     <div class="modal-box">
       <h3>Ubah Status DO</h3>
    
        <select v-model="newStatus">
         <option>Dibuat</option>
         <option>Dikirim</option>
         <option>Diterima</option>
        </select>
     
      <div class="form-group">
       <label>Lokasi Terakhir:</label>
       <input type="text" v-model="statusLocation" placeholder="Masukkan lokasi..." class="input-control"/>
      </div>

     <div class="modal-actions">
      <button class="btn-secondary" @click="showStatusModal=false">Batal</button>
      <button class="btn-primary" @click="saveNewStatus()">Simpan</button>
     </div>
    </div>
   </div>
  </div>
  `,
  
  props: ["dataJsonPath"],
  
  data() {
    return {
      bahanAjar: [],
      paketList: [],
      upbjjList: [],
      doList: [],
      form: { nim:"", nama:"", paket:"", upbjj:"", ekspedisi:"", tanggal:"" },
      cari: "",
      detailDO: null,
      showDetail: false,
      
      // untuk modal status DO
      showStatusModal: false,
      selectedDO: null,
      newStatus: "",
      statusLocation: "",
    };
  },

  computed: {
    paketDipilih() { return this.paketList.find(p=>p.kode===this.form.paket) || null; },
    totalHarga() { return this.paketDipilih ? this.paketDipilih.harga : 0; },
    hasilCari() { return this.doList.filter(d => d.no.toLowerCase().includes(this.cari.toLowerCase())); }
  },

  methods: {
    formatHarga(x){ return x.toLocaleString("id-ID"); },
    ambilNamaPaket(kode){ return this.paketList.find(p=>p.kode===kode)?.nama || kode; },

    lihatDetail(d){ 
      this.detailDO = d;
      this.showDetail = true;
    },
    tutupDetail(){ this.showDetail=false; },

    buatDO() {
      if(!this.form.nim || !this.form.nama || !this.form.paket) {
        alert("Lengkapi form!");
      return;
    }

      const tgl = this.form.tanggal || new Date().toISOString().slice(0,10);
      const tglString = tgl.replace(/-/g,"");
      const urutan = this.doList.filter(d => d.tanggal === tgl).length + 1;
      const sequence = String(urutan).padStart(3,'0');
      const no = `DO-${tglString}-${sequence}`;

    this.doList.push({
    no,
    nim: this.form.nim,
    nama: this.form.nama,
    paket: this.form.paket,
    upbjj: this.form.upbjj,
    ekspedisi: this.form.ekspedisi,
    tanggal: tgl,
    total: this.totalHarga,
    status: "Dibuat",
    tracking: []
   });

     this.form = { nim:"", nama:"", paket:"", upbjj:"", ekspedisi:"", tanggal:"" };

     // Tambahkan notifikasi
     alert(`Delivery Order ${no} berhasil dibuat!`);
   },

    async loadData() {
      const res = await fetch(this.dataJsonPath);
      const json = await res.json();
      this.bahanAjar = json.bahanAjar;
      this.paketList = json.paketList;
      this.upbjjList = json.upbjjList;
      this.doList = json.doList;
    },

      // ==========================
      // MODAL STATUS DO
      // ==========================

      openStatusModal(doItem) {
       this.selectedDO = doItem;
       this.newStatus = doItem.status;
       this.statusLocation = "";
       this.showStatusModal = true;
    },

      saveNewStatus() {
       if (!this.statusLocation) {
       alert("Lokasi terakhir harus diisi!");
       return;
    }

      const today = new Date();
      const tgl = today.toISOString().split("T")[0];

      // update status DO
      this.selectedDO.status = this.newStatus;

      // tambahkan log tracking baru
      this.selectedDO.tracking.push({
      tanggal: tgl,
      lokasi: this.statusLocation,
      status: this.newStatus
    });

      this.showStatusModal = false;

      alert("Status DO berhasil diperbarui!");
    }
  },

  mounted() {
    this.loadData();
  }
};
