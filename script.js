// OFFICIAL MANAGER — LAMBANG DJAYA 2026/2027
// Data anggota dapat kamu ubah di bagian members.
// Foto anggota: assets/members/
// Foto galeri: assets/gallery/

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
        name: "Nizar Thamami",
        nickname: "Nizar",
        role: "Administrative Affairs",
        photo: "nizar.jpeg",
        bio: "Mengelola administrasi kelembagaan, termasuk pengurusan tanda tangan dispensasi, gaji, dan dokumen terkait turnamen kepada pihak kampus."
    },
    {
        id: "03",
        name: "Naufal Fahrezi",
        nickname: "Nopal",
        role: "Vice Head of Division",
        photo: "nopal.jpeg",
        bio: "Mendampingi kepala divisi dalam mengoordinasikan anggota, mengelola kebutuhan perlengkapan, serta membantu berbagai aspek operasional tim."
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
        photo: "",
        bio: "Bersama tim turnamen, mengurus administrasi pemain, mencari informasi kompetisi, serta menjembatani komunikasi antara UKM dan pihak penyelenggara."
    },
    {
        id: "09",
        name: "Agung Setiawan",
        nickname: "Agung",
        role: "Support Crew",
        photo: "",
        bio: "Mendukung kebutuhan operasional dan membantu kelancaran berbagai kegiatan divisi sesuai kebutuhan tim."
    }
];

// Elemen halaman
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

// Mengambil inisial nama.
function getInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part[0] || "")
        .join("")
        .toUpperCase();
}

// Membuat kartu anggota lineup.
function makeMemberCard(member) {
    const card = document.createElement("article");

    card.className = "member-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Lihat profil ${member.name}`);
    card.setAttribute("aria-pressed", "false");

    // Foto hanya ditampilkan jika path foto diisi.
    const photoMarkup = member.photo
        ? `
      <img
        class="member-photo"
        src="${member.photo}"
        alt="Foto ${member.name}"
        loading="lazy"
      >
    `
        : "";

    card.innerHTML = `
    <div class="member-card-inner">

      <div class="member-face member-front">
        <div class="member-photo-wrap">

          <span class="member-number">${member.id}</span>

          <span
            class="member-initials"
            ${member.photo ? "hidden" : ""}
            aria-hidden="true"
          >${getInitials(member.name)}</span>

          ${photoMarkup}

          <span class="member-front-name">
            ${member.name}
          </span>

        </div>

        <div class="member-role">${member.role}</div>
      </div>

      <div class="member-face member-back">
        <span class="back-number">PLAYER / ${member.id}</span>

        <div>
          <h3>${member.nickname || member.name}</h3>
          <p>${member.bio}</p>
        </div>

        <span class="tap-hint">CLICK TO FLIP BACK ↻</span>
      </div>

    </div>
  `;

    // Tangani foto yang gagal dimuat.
    // Kartu tetap berada di lineup dan menampilkan inisial.
    const image = card.querySelector(".member-photo");
    const initials = card.querySelector(".member-initials");

    if (image) {
        image.addEventListener("error", () => {
            image.hidden = true;

            if (initials) {
                initials.hidden = false;
            }
        }, { once: true });

        image.addEventListener("load", () => {
            if (initials) {
                initials.hidden = true;
            }
        }, { once: true });
    }

    // Fungsi membalik kartu.
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

    // Klik mouse atau layar sentuh.
    card.addEventListener("click", flipCard);

    // Dukungan keyboard.
    card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            flipCard();
        }
    });

    return card;
}

// Membuat kartu bench.
function makeBenchCard(member) {
    const item = document.createElement("article");
    item.className = "bench-card";

    const avatar = document.createElement("div");
    avatar.className = "bench-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = getInitials(member.name);

    const details = document.createElement("div");

    const name = document.createElement("h4");
    name.textContent = member.name;

    const role = document.createElement("p");
    role.textContent = member.role;

    details.append(name, role);
    item.append(avatar, details);

    return item;
}

// Render lineup dan bench berdasarkan urutan data.
function renderMembers() {
    if (!lineupGrid || !benchGrid) return;

    lineupGrid.innerHTML = "";
    benchGrid.innerHTML = "";

    // Tujuh anggota pertama menjadi lineup.
    const lineupMembers = members.slice(0, 7);

    // Anggota sisanya menjadi bench.
    const benchMembers = members.slice(7);

    lineupMembers.forEach(member => {
        lineupGrid.appendChild(makeMemberCard(member));
    });

    benchMembers.forEach(member => {
        benchGrid.appendChild(makeBenchCard(member));
    });

    // Sembunyikan judul bench jika tidak ada anggota.
    const benchHeading = document.querySelector(".bench-heading");

    if (benchHeading) {
        benchHeading.hidden = benchMembers.length === 0;
    }

    // Pastikan bagian bench tidak muncul tanpa kartu.
    benchGrid.hidden = benchMembers.length === 0;
}

// ==============================
// MENU MOBILE
// ==============================

function closeMenu() {
    if (!nav || !menuToggle) return;

    nav.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka navigasi");

    document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup navigasi" : "Buka navigasi"
    );

    document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

// ==============================
// NAVIGASI PRESENTASI
// ==============================

function currentSectionIndex() {
    const marker = window.innerHeight * 0.35;
    let current = 0;

    sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= marker) {
            current = index;
        }
    });

    return current;
}

function goToSection(index) {
    const boundedIndex = Math.max(
        0,
        Math.min(sections.length - 1, index)
    );

    sections[boundedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

prevButton?.addEventListener("click", () => {
    goToSection(currentSectionIndex() - 1);
});

nextButton?.addEventListener("click", () => {
    goToSection(currentSectionIndex() + 1);
});

// Shortcut keyboard untuk presentasi.
document.addEventListener("keydown", event => {
    const tag = document.activeElement?.tagName;

    // Jangan ganggu input atau kontrol form.
    if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) {
        return;
    }

    // Jangan mengubah bagian presentasi ketika
    // pengguna sedang berinteraksi dengan kartu.
    if (event.target.closest?.(".member-card")) {
        if (
            ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"]
                .includes(event.key)
        ) {
            return;
        }
    }

    if (
        event.key === "ArrowDown" ||
        event.key === "PageDown"
    ) {
        event.preventDefault();
        goToSection(currentSectionIndex() + 1);
    } else if (
        event.key === "ArrowUp" ||
        event.key === "PageUp"
    ) {
        event.preventDefault();
        goToSection(currentSectionIndex() - 1);
    } else if (event.key === "Home") {
        goToSection(0);
    } else if (event.key === "End") {
        goToSection(sections.length - 1);
    } else if (event.key === "Escape") {
        closeMenu();
    }
});

// ==============================
// STATUS PRESENTASI
// ==============================

function updatePresentationState() {
    const currentIndex = currentSectionIndex();

    navLinks.forEach(link => {
        const target = link.getAttribute("href");

        const matchingSection = sections.find(section => {
            return `#${section.id}` === target;
        });

        link.classList.toggle(
            "is-active",
            Boolean(
                matchingSection &&
                sections[currentIndex] === matchingSection
            )
        );
    });

    if (sectionCounter) {
        sectionCounter.textContent =
            `${String(currentIndex + 1).padStart(2, "0")} / ` +
            `${String(sections.length).padStart(2, "0")}`;
    }

    if (progressBar) {
        const progress = sections.length
            ? ((currentIndex + 1) / sections.length) * 100
            : 0;

        progressBar.style.width = `${progress}%`;
    }
}

let scrollTicking = false;

window.addEventListener("scroll", () => {
    if (scrollTicking) return;

    scrollTicking = true;

    window.requestAnimationFrame(() => {
        updatePresentationState();
        scrollTicking = false;
    });
}, { passive: true });

window.addEventListener("resize", updatePresentationState);

// ==============================
// INISIALISASI
// ==============================

renderMembers();
updatePresentationState();