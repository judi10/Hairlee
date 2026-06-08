// script.js — Hairlee | SEG3525 Devoir 2

const avis = [
  { etoiles: 4.5, texte: "Résultat vraiment bien pour mon balayage. Sophie a su exactement ce que je voulais !", auteur: "Léa M.", coiffeur: "Sophie M." },
  { etoiles: 4.2, texte: "Ma coiffure de mariée était magnifique. Camille a tout géré avec calme et talent.", auteur: "Camille R.", coiffeur: "Camille R." },
  { etoiles: 4.8, texte: "Lucas connaît toutes les tendances ! Mon wolf cut est exactement ce que je cherchais.", auteur: "Sofia B.", coiffeur: "Lucas B." },
  { etoiles: 4.0, texte: "Très belle expérience. Noah est à l'écoute et très professionnel.", auteur: "Inès D.", coiffeur: "Noah T." },
  { etoiles: 4.5, texte: "J'avais peur de changer de look mais Lucas m'a rassurée. Le résultat est parfait !", auteur: "Emma T.", coiffeur: "Lucas B." },
  { etoiles: 4.2, texte: "Sophie est une artiste. Mon ombré rose est encore plus beau que sur les photos !", auteur: "Yasmine K.", coiffeur: "Sophie M." },
  { etoiles: 3.8, texte: "Salon propre et accueillant. Je recommande Camille pour les coiffures de cérémonie.", auteur: "Fatima O.", coiffeur: "Camille R." },
  { etoiles: 4.5, texte: "Première fois ici, j'ai trouvé le salon facilement grâce à la carte sur le site. Je reviendrai !", auteur: "Olween B.", coiffeur: "Noah T." }
];

const catalogue = [
  { categorie: "courte", coiffeur: "Lucas B.",   badge: "Viral",     image: "images/coupe-courte-2.png" },
  { categorie: "courte", coiffeur: "Sophie M.",  badge: "Tendance",  image: "images/coupe-courte-.jpg" },
  { categorie: "courte", coiffeur: "Noah T.",    badge: null,        image: "images/coupe-courte-1.jpg" },
  { categorie: "courte", coiffeur: "Lucas B.",   badge: "Tendance",  image: "images/coupe-courte-3.jpg" },
  { categorie: "longue", coiffeur: "Camille R.", badge: "Tendance",  image: "images/coupe-longue-7.png" },
  { categorie: "longue", coiffeur: "Sophie M.",  badge: "Cérémonie", image: "images/coupe-longue-2.jpg" },
  { categorie: "longue", coiffeur: "Camille R.", badge: "Cérémonie", image: "images/coupe-longue-3.jpg" },
  { categorie: "longue", coiffeur: "Noah T.",    badge: null,        image: "images/coupe-longue-5.png" }
];

const nav = document.querySelector("#main-nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

function genererEtoiles(note) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(note)) {
      html += `<span class="star-full">★</span>`;
    } else if (i === Math.ceil(note) && note % 1 !== 0) {
      html += `<span class="star-part">★</span>`;
    } else {
      html += `<span class="star-empty">★</span>`;
    }
  }
  return html;
}

function chargerAvis() {
  const grid = document.querySelector("#avis-grid");
  if (!grid) return;

  avis.forEach((a, index) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-3 fade-in";

    const card = document.createElement("div");
    card.className = "avis-card";

    const stars = document.createElement("div");
    stars.className = "avis-stars";
    stars.innerHTML = genererEtoiles(a.etoiles);

    const texte = document.createElement("p");
    texte.className = "avis-text";
    texte.textContent = `"${a.texte}"`;

    const auteur = document.createElement("p");
    auteur.className = "avis-author";
    auteur.innerHTML = `${a.auteur} · <strong>${a.coiffeur}</strong>`;

    card.appendChild(stars);
    card.appendChild(texte);
    card.appendChild(auteur);
    col.appendChild(card);
    grid.appendChild(col);

    setTimeout(() => col.classList.add("visible"), index * 80);
  });
}

function chargerCatalogue(filtre = "toutes") {
  const grid = document.querySelector("#catalogue-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const items = filtre === "toutes"
    ? catalogue
    : catalogue.filter(item => item.categorie === filtre);

  items.forEach((item, index) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-3 fade-in";

    const card = document.createElement("div");
    card.className = "catalogue-card";

    const imgWrap = document.createElement("div");
    imgWrap.className = "catalogue-img";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.categorie === "courte" ? "Coupe courte" : "Coupe longue";
    img.className = "catalogue-photo";
    img.onerror = function() {
      this.style.display = "none";
      imgWrap.classList.add("catalogue-img-fallback");
      imgWrap.innerHTML += `<span class="catalogue-img-icon">✂</span>`;
    };

    imgWrap.appendChild(img);

    if (item.badge) {
      const badge = document.createElement("span");
      badge.classList.add("catalogue-badge");
      if (item.badge === "Viral") badge.classList.add("viral");
      badge.textContent = item.badge;
      imgWrap.appendChild(badge);
    }

    const body = document.createElement("div");
    body.className = "catalogue-body";

    const categorie = document.createElement("strong");
    categorie.className = "catalogue-categorie";
    categorie.textContent = item.categorie === "courte" ? "Coupe courte" : "Coupe longue";

    const coiffeurNom = document.createElement("span");
    coiffeurNom.className = "catalogue-coiffeur";
    coiffeurNom.textContent = item.coiffeur;

    const btnRdv = document.createElement("a");
    btnRdv.href = "rdv.html";
    btnRdv.className = "btn-catalogue-rdv";
    btnRdv.textContent = "Réserver →";

    body.appendChild(categorie);
    body.appendChild(coiffeurNom);
    body.appendChild(btnRdv);
    card.appendChild(imgWrap);
    card.appendChild(body);
    col.appendChild(card);
    grid.appendChild(col);

    setTimeout(() => col.classList.add("visible"), index * 60);
  });
}

function initFiltres() {
  const boutons = document.querySelectorAll(".filter-btn");
  if (!boutons.length) return;

  boutons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      boutons.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      chargerCatalogue(e.target.getAttribute("data-filter"));
    });
  });
}

const REGEX = {
  nom:       /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ '-]{1,}$/,
  telephone: /^\d{3}-\d{3}-\d{4}$/,
  email:     /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

function validerChamp(id) {
  const champ  = document.getElementById(id);
  if (!champ) return true;
  const errDiv = document.getElementById(`err-${id.replace("rdv-", "")}`);
  let valide   = false;

  switch (id) {
    case "rdv-nom":
      valide = REGEX.nom.test(champ.value.trim());
      break;
    case "rdv-telephone":
      valide = REGEX.telephone.test(champ.value.trim());
      break;
    case "rdv-email":
      valide = REGEX.email.test(champ.value.trim());
      break;
    case "rdv-coiffeuse":
    case "rdv-service":
      valide = champ.value !== "";
      break;
    case "rdv-date":
      const dateChoisie = new Date(champ.value);
      const aujourd     = new Date();
      aujourd.setHours(0, 0, 0, 0);
      valide = dateChoisie > aujourd;
      break;
    case "rdv-heure":
      valide = champ.value !== "";
      break;
  }

  champ.classList.toggle("valide",   valide);
  champ.classList.toggle("invalide", !valide && champ.value !== "");
  if (errDiv) errDiv.classList.toggle("visible", !valide && champ.value !== "");

  return valide;
}

function initFormulaire() {
  const form = document.getElementById("form-rdv");
  if (!form) return;

  const champs = ["rdv-nom", "rdv-telephone", "rdv-email", "rdv-coiffeuse", "rdv-service", "rdv-date", "rdv-heure"];

  champs.forEach(id => {
    const el  = document.getElementById(id);
    if (!el) return;
    const evt = (el.tagName === "SELECT" || el.type === "date") ? "change" : "input";
    el.addEventListener(evt, () => validerChamp(id));
  });

  const telInput = document.getElementById("rdv-telephone");
  if (telInput) {
    telInput.addEventListener("input", () => {
      let val = telInput.value.replace(/\D/g, "");
      if (val.length >= 7) {
        val = `${val.slice(0,3)}-${val.slice(3,6)}-${val.slice(6,10)}`;
      } else if (val.length >= 4) {
        val = `${val.slice(0,3)}-${val.slice(3)}`;
      }
      telInput.value = val;
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const toutValide = champs.every(id => validerChamp(id));

    if (!toutValide) {
      const premierInvalide = champs.find(id => {
        const el = document.getElementById(id);
        return el && el.classList.contains("invalide");
      });

      const cibleId = premierInvalide || champs.find(id => {
        const el = document.getElementById(id);
        return el && el.value === "";
      });

      if (cibleId) {
        const cible = document.getElementById(cibleId);
        cible.scrollIntoView({ behavior: "smooth", block: "center" });
        cible.focus();
        validerChamp(cibleId);
      }
      return;
    }

    const { value: nom }       = document.getElementById("rdv-nom");
    const { value: telephone } = document.getElementById("rdv-telephone");
    const { value: email }     = document.getElementById("rdv-email");
    const { value: coiffeuse } = document.getElementById("rdv-coiffeuse");
    const { value: service }   = document.getElementById("rdv-service");
    const { value: date }      = document.getElementById("rdv-date");
    const { value: heure }     = document.getElementById("rdv-heure");

    const rdv = { nom, telephone, email, coiffeuse, service, date, heure };

    const dateFormatee = new Date(rdv.date).toLocaleDateString("fr-CA", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    document.getElementById("confirm-msg").textContent =
      `Merci ${rdv.nom} ! Votre rendez-vous pour une ${rdv.service.toLowerCase()} avec ${rdv.coiffeuse} le ${dateFormatee} à ${rdv.heure} a bien été enregistré.`;

    form.style.display = "none";
    const confirmBox = document.getElementById("confirm-box");
    confirmBox.style.display = "block";
    confirmBox.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function resetForm() {
  const form = document.getElementById("form-rdv");
  if (!form) return;
  form.reset();
  form.style.display = "block";
  document.getElementById("confirm-box").style.display = "none";
  document.querySelectorAll(".valide, .invalide").forEach(el => {
    el.classList.remove("valide", "invalide");
  });
  document.querySelectorAll(".invalid-msg.visible").forEach(el => {
    el.classList.remove("visible");
  });
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  chargerAvis();
  chargerCatalogue();
  initFiltres();
  initFormulaire();
  initAnimations();
});