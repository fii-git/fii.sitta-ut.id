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
