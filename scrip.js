const LS_KEY = 'mahasiswaData';
let data = [];

const form = document.getElementById('formData');
const indexEdit = document.getElementById('indexEdit');
const tableBody = document.getElementById('tableBody');
const toast = document.getElementById('toast');
const search = document.getElementById('search');

// Load & Save
function loadData() {
  const raw = localStorage.getItem(LS_KEY);
  data = raw ? JSON.parse(raw) : [];
  renderTable();
}
function saveData() {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

// Render
function renderTable() {
  const q = search.value.toLowerCase();
  tableBody.innerHTML = data
    .filter(item => [item.nim, item.nama, item.prodi, item.email].join(' ').toLowerCase().includes(q))
    .map((item, idx) => `
      <tr>
        <td>${item.nim}</td>
        <td>${item.nama}</td>
        <td>${item.prodi}</td>
        <td>${item.email}</td>
        <td>
          <button onclick="editData(${idx})">Edit</button>
          <button class="delete" onclick="deleteData(${idx})">Hapus</button>
        </td>
      </tr>
    `).join('');
}

// Form
form.addEventListener('submit', e => {
  e.preventDefault();
  const item = {
    nim: document.getElementById('nim').value,
    nama: document.getElementById('nama').value,
    prodi: document.getElementById('prodi').value,
    email: document.getElementById('email').value
  };
  const idx = parseInt(indexEdit.value);
  if (idx >= 0) {
    data[idx] = item;
    showToast('Data diperbarui');
  } else {
    data.push(item);
    showToast('Data ditambahkan');
  }
  saveData();
  renderTable();
  form.reset();
  indexEdit.value = -1;
});

function editData(idx) {
  const item = data[idx];
  document.getElementById('nim').value = item.nim;
  document.getElementById('nama').value = item.nama;
  document.getElementById('prodi').value = item.prodi;
  document.getElementById('email').value = item.email;
  indexEdit.value = idx;
}
function deleteData(idx) {
  if (confirm('Hapus data ini?')) {
    data.splice(idx, 1);
    saveData();
    renderTable();
    showToast('Data dihapus');
  }
}