/* main.js - interaksi untuk login & modals */

// Only for login.html page actions
document.addEventListener('DOMContentLoaded', () => {
  // modal helpers
  const modals = document.querySelectorAll('.modal');
  function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.setAttribute('aria-hidden', 'false');
  }
  function closeModal(el) {
    el.setAttribute('aria-hidden', 'true');
  }
  document.body.addEventListener('click', (e) => {
    // open
    if (e.target.id === 'forgotBtn') openModal('modalForgot');
    if (e.target.id === 'registerBtn') openModal('modalRegister');

    // modal close buttons
    if (e.target.matches('[data-close]')) {
      const m = e.target.closest('.modal');
      if (m) closeModal(m);
    }

    // click outside modal-content closes it
    if (e.target.classList.contains('modal')) closeModal(e.target);
  });

  // register (simulasi)
  const doRegister = document.getElementById('doRegister');
  if (doRegister) {
    doRegister.addEventListener('click', () => {
      alert('Pendaftaran berhasil (simulasi). Silakan login.');
      document.getElementById('modalRegister').setAttribute('aria-hidden','true');
    });
  }

  // forgot password simulation
  const sendReset = document.getElementById('sendReset');
  if (sendReset) {
    sendReset.addEventListener('click', () => {
      const email = document.getElementById('forgotEmail').value;
      if (!email) { alert('Masukkan email.'); return; }
      alert('Instruksi reset password telah dikirim ke ' + email + ' (simulasi).');
      document.getElementById('modalForgot').setAttribute('aria-hidden','true');
    });
  }

  // login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const found = (Array.isArray(credentials) && credentials.find(c => c.email.toLowerCase() === email.toLowerCase() && c.password === password));
      if (!found) {
        alert('Email/password yang anda masukkan salah');
        return;
      }
      // on success redirect to dashboard (simulate session)
      localStorage.setItem('sitta_user', JSON.stringify({ email: found.email, name: found.name }));
      window.location.href = 'dashboard.html';
    });
  }
});

// Script untuk toggle submenu
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".menu-toggle");

  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const submenu = btn.nextElementSibling;
      submenu.classList.toggle("show");
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // cari sidebar (prioritas id then class)
  const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
  // cari content (coba beberapa selector)
  const content = document.querySelector('.content') 
                || document.querySelector('.main') 
                || document.getElementById('main-content')
                || document.querySelector('.main-content');
  // cari tombol jika sudah ada
  let toggleBtn = document.getElementById('sidebarToggle') || document.querySelector('.toggle-btn');

  // fallback: jika tidak ada sidebar, stop
  if (!sidebar) {
    console.warn('ToggleSidebar: sidebar element not found.');
    return;
  }

  // jika toggle btn tidak ada, buat otomatis dan tambahkan ke body
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.id = 'sidebarToggle';
    toggleBtn.className = 'toggle-btn';
    toggleBtn.innerHTML = '☰';
    document.body.appendChild(toggleBtn);
  }

  // Helper: toggle behavior (handles both desktop hide and mobile show)
  function doToggle() {
    // For mobile we may prefer .show to slide in
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (vw <= 768) {
      // mobile: toggle .show to slide sidebar in/out
      sidebar.classList.toggle('show');
      // keep content margin consistent on mobile (usually 0)
      if (content) content.classList.toggle('full');
      toggleBtn.classList.toggle('move-left');
    } else {
      // desktop: move sidebar out of view with .hidden
      sidebar.classList.toggle('hidden');
      if (content) content.classList.toggle('full');
      toggleBtn.classList.toggle('move-left');
    }
  }

  // attach click
  toggleBtn.addEventListener('click', doToggle);

  // close sidebar on clicking outside (mobile only)
  document.addEventListener('click', (e) => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (vw <= 768 && sidebar.classList.contains('show')) {
      // if click outside sidebar and not on toggle button
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('show');
        if (content) content.classList.remove('full');
        toggleBtn.classList.remove('move-left');
      }
    }
  });

  // optional: close with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      sidebar.classList.remove('show');
      sidebar.classList.remove('hidden');
      if (content) content.classList.remove('full');
      toggleBtn.classList.remove('move-left');
    }
  });

});

document.addEventListener('DOMContentLoaded', () => {
  const stokSummaryEl = document.getElementById('stokSummary');

  if (typeof dataBahanAjar === 'undefined' || !Array.isArray(dataBahanAjar)) {
    stokSummaryEl.textContent = 'Data stok belum tersedia.';
    return;
  }

  // Hitung data stok otomatis
  const totalItems = dataBahanAjar.length;
  const totalQty = dataBahanAjar.reduce((sum, item) => sum + (item.qty || 0), 0);
  const lowStock = dataBahanAjar.filter(item => item.qty <= item.safety && item.qty > 0).length;
  const outOfStock = dataBahanAjar.filter(item => item.qty === 0).length;
  const safeItems = totalItems - lowStock - outOfStock;

  // Hitung persentase
  const safePercent = Math.round((safeItems / totalItems) * 100);
  const lowPercent = Math.round((lowStock / totalItems) * 100);
  const outPercent = Math.round((outOfStock / totalItems) * 100);

  // Isi HTML-nya
  stokSummaryEl.innerHTML = `
    <p>
      <b>${totalItems}</b> jenis bahan ajar<br>
      Total stok: <b>${totalQty}</b> eksemplar
    </p>

    <div class="progress-container">
      <div class="progress-bar progress-safe" style="width:0%" title="Aman (${safePercent}%)"></div>
      <div class="progress-bar progress-low" style="width:0%" title="Menipis (${lowPercent}%)"></div>
      <div class="progress-bar progress-out" style="width:0%" title="Kosong (${outPercent}%)"></div>
    </div>

    <p style="font-size:14px; margin-top:5px;">
      <span style="color:#4CAF50">${safeItems}</span> aman &nbsp;
      <span style="color:#FFC107">${lowStock}</span> mendekati habis &nbsp;
      <span style="color:#F44336">${outOfStock}</span> kosong
    </p>
  `;

  // Animasi progress bar
  setTimeout(() => {
    stokSummaryEl.querySelector('.progress-safe').style.width = `${safePercent}%`;
    stokSummaryEl.querySelector('.progress-low').style.width = `${lowPercent}%`;
    stokSummaryEl.querySelector('.progress-out').style.width = `${outPercent}%`;
  }, 300);
});
