/* =========================================
   OFFICIAL MANAGER — LAMBANG DJAYA 2026/2027
   Responsive interactions & team profiles
========================================= */

"use strict";

// =========================================
// DATA ANGGOTA
// Ubah informasi anggota di bagian ini.
// =========================================

const members = [
  {
    id: "01",
    name: "Kyanka Wisnu Wardhana",
    nickname: "Kyanka",
    role: "Head of Division",
    photo: "kyanka.jpeg",
    bio: "Mengawasi koordinasi divisi, menjalin komunikasi dengan pelatih, serta memastikan seluruh kebutuhan dan operasional tim berjalan dengan baik."
  },
  {
    id: "02",
    name: "Naufal Fahrezi",
    nickname: "Nopal",
    role: "Vice Head of Division",
    photo: "nopal.jpeg",
    bio: "Mendampingi kepala divisi dalam mengoordinasikan anggota, mengelola kebutuhan perlengkapan, serta membantu berbagai aspek operasional tim."
  },
  {
    id: "03",
    name: "Nizar Thamami",
    nickname: "Nizar",
    role: "Administrative Affairs",
    photo: "nizar.jpeg",
    bio: "Mengelola administrasi kelembagaan, termasuk pengurusan tanda tangan dispensasi, gaji, dan dokumen terkait turnamen kepada pihak kampus."
  },
  {
    id: "04",
    name: "Resma Julianti",
    nickname: "Resma",
    role: "Tournament Affairs",
    photo: "resma.jpeg",
    bio: "Mengurus administrasi pemain untuk keikutsertaan turnamen, mencari peluang kompetisi, serta menjadi penghubung antara UKM dan penyelenggara turnamen."
  },
  {
    id: "05",
    name: "Fathurasya",
    nickname: "Atuy",
    role: "Administration & Training Coordination",
    photo: "fathur.jpeg",
    bio: "Mengurus administrasi kampus bersama tim, mengoordinasikan sparing dengan kampus lain, serta membantu mencari tempat latihan."
  },
  {
    id: "06",
    name: "Gery Agustian",
    nickname: "Gery",
    role: "Sparring & Training Coordination",
    photo: "gery.jpeg",
    bio: "Mengoordinasikan pertandingan sparing dengan kampus lain, membantu mencari tempat latihan."
  },
  {
    id: "07",
    name: "Dino Alzhakki",
    nickname: "Dino",
    role: "Sparring & Training Coordination",
    photo: "dino.jpeg",
    bio: "Membantu menjalin komunikasi dengan kampus lain untuk kebutuhan sparing serta mencari dan mengoordinasikan tempat latihan tim."
  },
  {
    id: "08",
    name: "Nabila Putri Nurdisyla",
    nickname: "Naput",
    role: "Tournament Affairs",
    photo: "naput.jpeg",
    bio: "Bersama tim turnamen, mengurus administrasi pemain, mencari informasi kompetisi, serta menjembatani komunikasi antara UKM dan pihak penyelenggara."
  },
  {
    id: "09",
    name: "Agung Setiawan",
    nickname: "Agung",
    role: "Support Crew",
    photo: "agung.jpeg",
    bio: "Mendukung kebutuhan operasional dan membantu kelancaran berbagai kegiatan divisi sesuai kebutuhan tim."
  }
];

// =========================================
// AMBIL ELEMEN HTML
// =========================================

const lineupGrid = document.querySelector("#lineupGrid");
const benchGrid = document.querySelector("#benchGrid");

const nav = document.querySelector("#mainNav");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = [...document.querySelectorAll(".nav-link")];

const sections = [...document.querySelectorAll("main .slide")];

const sectionCounter = document.querySelector("#sectionCounter");
const progressBar = document.querySelector("#progressBar");

const prevButton = document.querySelector("#prevSection");
const nextButton = document.querySelector("#nextSection");

// Breakpoint menu mobile harus sama dengan CSS.
const MOBILE_BREAKPOINT = 850;

// =========================================
// HELPER
// =========================================

// Mengambil inisial dari maksimal dua kata pertama.
function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0))
    .join("")
    .toUpperCase();
}

// Membuat elemen HTML dengan class tertentu.
function createElement(tag, className, text = "") {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

// =========================================
// KARTU PROFIL ANGGOTA
// =========================================

function makeMemberCard(member) {
  const card = createElement("article", "member-card");

  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-pressed", "false");
  card.setAttribute("aria-label", `Lihat profil ${member.name}`);

  // Wrapper kartu.
  const inner = createElement("div", "member-card-inner");

  // Sisi depan.
  const front = createElement("div", "member-face member-front");

  const photoWrap = createElement("div", "member-photo-wrap");

  const number = createElement("span", "member-number", member.id);

  const initials = createElement(
    "span",
    "member-initials",
    getInitials(member.name)
  );

  initials.setAttribute("aria-hidden", "true");

  // Jika foto tersedia, inisial disembunyikan terlebih dahulu.
  if (member.photo) {
    initials.hidden = true;

    const image = document.createElement("img");

    image.className = "member-photo";
    image.src = member.photo;
    image.alt = `Foto ${member.name}`;
    image.loading = "lazy";
    image.decoding = "async";

    // Jika foto gagal dimuat, tampilkan inisial.
    image.addEventListener("error", () => {
      image.hidden = true;
      initials.hidden = false;
    }, { once: true });

    // Jika foto berhasil dimuat, sembunyikan inisial.
    image.addEventListener("load", () => {
      initials.hidden = true;
    }, { once: true });

    photoWrap.append(number, initials, image);
  } else {
    photoWrap.append(number, initials);
  }

  const frontName = createElement(
    "span",
    "member-front-name",
    member.name
  );

  photoWrap.appendChild(frontName);

  const role = createElement("div", "member-role", member.role);

  front.append(photoWrap, role);

  // Sisi belakang.
  const back = createElement("div", "member-face member-back");

  const backNumber = createElement(
    "span",
    "back-number",
    `PLAYER / ${member.id}`
  );

  const backContent = document.createElement("div");

  const nickname = createElement(
    "h3",
    "",
    member.nickname || member.name
  );

  const bio = createElement("p", "", member.bio);

  backContent.append(nickname, bio);

  const tapHint = createElement(
    "span",
    "tap-hint",
    "CLICK TO FLIP BACK ↻"
  );

  back.append(backNumber, backContent, tapHint);

  inner.append(front, back);
  card.appendChild(inner);

  // Membalik kartu.
  function flipCard() {
    const isFlipped = card.classList.toggle("is-flipped");

    card.setAttribute("aria-pressed", String(isFlipped));

    card.setAttribute(
      "aria-label",
      isFlipped
        ? `Tutup profil ${member.name}`
        : `Lihat profil ${member.name}`
    );
  }

  // Klik atau sentuh kartu.
  card.addEventListener("click", flipCard);

  // Enter dan Space untuk pengguna keyboard.
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      flipCard();
    }
  });

  return card;
}

// =========================================
// KARTU BENCH
// =========================================

function makeBenchCard(member) {
  const item = createElement("article", "bench-card");

  const avatar = createElement(
    "div",
    "bench-avatar",
    getInitials(member.name)
  );

  avatar.setAttribute("aria-hidden", "true");

  const details = document.createElement("div");

  const name = createElement("h4", "", member.name);
  const role = createElement("p", "", member.role);

  details.append(name, role);
  item.append(avatar, details);

  return item;
}

// =========================================
// RENDER ANGGOTA
// =========================================

function renderMembers() {
  if (!lineupGrid || !benchGrid) {
    console.warn("Elemen lineupGrid atau benchGrid tidak ditemukan.");
    return;
  }

  lineupGrid.replaceChildren();
  benchGrid.replaceChildren();

  // Tujuh anggota pertama tampil di lapangan.
  const lineupMembers = members.slice(0, 9);

  // Anggota berikutnya tampil di bagian bench.
  const benchMembers = members.slice(7);

  const lineupFragment = document.createDocumentFragment();
  const benchFragment = document.createDocumentFragment();

  lineupMembers.forEach(member => {
    lineupFragment.appendChild(makeMemberCard(member));
  });

  benchMembers.forEach(member => {
    benchFragment.appendChild(makeBenchCard(member));
  });

  lineupGrid.appendChild(lineupFragment);
  benchGrid.appendChild(benchFragment);

  // Sembunyikan bench jika tidak ada anggota.
  const benchHeading = document.querySelector(".bench-heading");

  if (benchHeading) {
    benchHeading.hidden = benchMembers.length === 0;
  }

  benchGrid.hidden = benchMembers.length === 0;
}

// =========================================
// MENU MOBILE
// =========================================

function isMobileLayout() {
  return window.matchMedia(
    `(max-width: ${MOBILE_BREAKPOINT}px)`
  ).matches;
}

function closeMenu() {
  if (!nav || !menuToggle) return;

  nav.classList.remove("is-open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka navigasi");

  document.body.classList.remove("menu-open");
}

function toggleMenu() {
  if (!nav || !menuToggle) return;

  const isOpen = nav.classList.contains("is-open");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

menuToggle?.addEventListener("click", toggleMenu);

// Tutup menu setelah salah satu tautan navigasi dipilih.
navLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Tutup menu ketika pengguna menekan Escape.
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Tutup menu saat layar berubah ke layout desktop.
window.addEventListener("resize", () => {
  if (!isMobileLayout()) {
    closeMenu();
  }
});

// =========================================
// NAVIGASI PRESENTASI
// =========================================

function currentSectionIndex() {
  if (sections.length === 0) return 0;

  const marker = window.innerHeight * 0.35;
  let currentIndex = 0;

  sections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= marker) {
      currentIndex = index;
    }
  });

  return currentIndex;
}

function goToSection(index) {
  if (sections.length === 0) return;

  const boundedIndex = Math.max(
    0,
    Math.min(sections.length - 1, index)
  );

  const targetSection = sections[boundedIndex];

  if (!targetSection) return;

  targetSection.scrollIntoView({
    behavior: window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
      ? "auto"
      : "smooth",
    block: "start"
  });
}

// Tombol bagian sebelumnya.
prevButton?.addEventListener("click", () => {
  goToSection(currentSectionIndex() - 1);
});

// Tombol bagian berikutnya.
nextButton?.addEventListener("click", () => {
  goToSection(currentSectionIndex() + 1);
});

// =========================================
// SHORTCUT KEYBOARD
// =========================================

document.addEventListener("keydown", event => {
  // Abaikan jika sedang mengetik atau menggunakan kontrol form.
  const activeTag = document.activeElement?.tagName;

  if (
    ["INPUT", "TEXTAREA", "SELECT"].includes(activeTag) ||
    document.activeElement?.isContentEditable
  ) {
    return;
  }

  // Jangan mengganggu navigasi keyboard di kartu anggota.
  if (event.target.closest?.(".member-card")) {
    return;
  }

  // Jangan jalankan shortcut presentasi ketika menu terbuka.
  if (nav?.classList.contains("is-open")) {
    return;
  }

  switch (event.key) {
    case "ArrowDown":
    case "PageDown":
      event.preventDefault();
      goToSection(currentSectionIndex() + 1);
      break;

    case "ArrowUp":
    case "PageUp":
      event.preventDefault();
      goToSection(currentSectionIndex() - 1);
      break;

    case "Home":
      event.preventDefault();
      goToSection(0);
      break;

    case "End":
      event.preventDefault();
      goToSection(sections.length - 1);
      break;
  }
});

// =========================================
// STATUS PRESENTASI
// =========================================

function updatePresentationState() {
  if (sections.length === 0) return;

  const currentIndex = currentSectionIndex();
  const currentSection = sections[currentIndex];

  // Perbarui navigasi aktif.
  navLinks.forEach(link => {
    const target = link.getAttribute("href");

    const isActive = currentSection
      ? target === `#${currentSection.id}`
      : false;

    link.classList.toggle("is-active", isActive);
  });

  // Perbarui indikator bagian.
  if (sectionCounter) {
    sectionCounter.textContent =
      `${String(currentIndex + 1).padStart(2, "0")} / ` +
      `${String(sections.length).padStart(2, "0")}`;
  }

  // Perbarui progress bar.
  if (progressBar) {
    const progress =
      ((currentIndex + 1) / sections.length) * 100;

    progressBar.style.width = `${progress}%`;
  }

  // Nonaktifkan tombol di bagian pertama dan terakhir.
  if (prevButton) {
    prevButton.disabled = currentIndex === 0;
  }

  if (nextButton) {
    nextButton.disabled = currentIndex === sections.length - 1;
  }
}

// Batasi pemanggilan update saat scroll agar lebih ringan.
let scrollTicking = false;

window.addEventListener("scroll", () => {
  if (scrollTicking) return;

  scrollTicking = true;

  window.requestAnimationFrame(() => {
    updatePresentationState();
    scrollTicking = false;
  });
}, { passive: true });

// Perbarui status ketika ukuran layar berubah.
window.addEventListener("resize", updatePresentationState);

// Perbarui setelah halaman selesai dimuat.
window.addEventListener("load", updatePresentationState);

// =========================================
// INISIALISASI
// =========================================

function initializeWebsite() {
  renderMembers();
  closeMenu();
  updatePresentationState();
}

initializeWebsite();
