const loginScreen = document.getElementById("loginScreen");
const portalScreen = document.getElementById("portalScreen");
const periodOverlay = document.getElementById("periodOverlay");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");
const loadingOverlay = document.getElementById("loadingOverlay");
const agendaOverlay = document.getElementById("agendaOverlay");

function openPeriodModal() {
  const ra = document.getElementById("ra").value.trim();
  const nome = document.getElementById("nome").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!ra || !nome || !senha) {
    alert("Preencha RA, nome e senha.");
    return;
  }

  document.getElementById("userName").textContent = nome;

  // Depois do login, mostra primeiro a seleção de período.
  loginScreen.classList.add("hidden");
  portalScreen.classList.remove("hidden");
  periodOverlay.classList.remove("hidden");
}

function selectPeriod(select) {
  if (!select.value) return;

  periodOverlay.classList.add("hidden");
  document.getElementById("currentPeriod").textContent = select.value;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}

function toggleMenu() {
  const isOpen = sideMenu.classList.toggle("open");
  overlay.classList.toggle("hidden", !isOpen);
}

function togglePassword() {
  const input = document.getElementById("senha");
  input.type = input.type === "password" ? "text" : "password";
}

function showLoader() {
  loadingOverlay.classList.remove("hidden");
  setTimeout(() => loadingOverlay.classList.add("hidden"), 1300);
}

function openAgenda() {
  sideMenu.classList.remove("open");
  overlay.classList.add("hidden");
  agendaOverlay.classList.remove("hidden");
}

function closeAgenda() {
  agendaOverlay.classList.add("hidden");
}

const dates = [
  "SEGUNDA-FEIRA • 10/08/2026",
  "TERÇA-FEIRA • 11/08/2026",
  "QUARTA-FEIRA • 12/08/2026",
  "QUINTA-FEIRA • 13/08/2026",
  "SEXTA-FEIRA • 14/08/2026"
];

function changeWeek(index) {
  document.getElementById("agendaDate").textContent = dates[index];

  document.querySelectorAll(".agenda-tab").forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
  });
}

document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const action = link.dataset.action;

    if (action === "agenda") {
      openAgenda();
      return;
    }

    // Todos os demais itens exibem somente a rodinha, mantendo o design.
    showLoader();
  });
});
