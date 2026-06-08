// ============================================================
// script.js — Hairlee | SEG3525 Devoir 2
// Vanilla JS · HTML · CSS · Bootstrap (pas de React)
// ============================================================

// ==== DONNÉES ================================================

const avis = [
  { etoiles: 5, texte: "Résultat absolument parfait pour mon balayage. Sophie a su exactement ce que je voulais !", auteur: "Léa M.", coiffeur: "Sophie M." },
  { etoiles: 5, texte: "Ma coiffure de mariée était magnifique. Camille a tout géré avec calme et talent.", auteur: "Camille R.", coiffeur: "Camille R." },
  { etoiles: 5, texte: "Lucas connaît toutes les tendances ! Mon wolf cut est exactement ce que je cherchais.", auteur: "Sofia B.", coiffeur: "Lucas B." },
  { etoiles: 4, texte: "Très belle expérience. Noah est à l'écoute et très professionnel.", auteur: "Inès D.", coiffeur: "Noah T." },
  { etoiles: 5, texte: "J'avais peur de changer de look mais Lucas m'a rassurée. Le résultat est parfait !", auteur: "Emma T.", coiffeur: "Lucas B." },
  { etoiles: 5, texte: "Sophie est une artiste. Mon ombré rose est encore plus beau que sur les photos !", auteur: "Yasmine K.", coiffeur: "Sophie M." },
  { etoiles: 4, texte: "Salon très propre et accueillant. Je recommande Camille pour les coiffures de cérémonie.", auteur: "Fatima O.", coiffeur: "Camille R." },
  { etoiles: 5, texte: "Première fois ici, j'ai trouvé le salon facilement grâce à la carte sur le site. Je reviendrai !", auteur: "Olween B.", coiffeur: "Noah T." }
];

const catalogue = [
  { nom: "Wolf cut",         categorie: "courte", coiffeur: "Lucas B.",   badge: "Viral",     image: "images/wolf-cut.jpg" },
  { nom: "Bob carré",        categorie: "courte", coiffeur: "Sophie M.",  badge: "Tendance",  image: "images/bob-carre.jpg" },
  { nom: "Pixie cut",        categorie: "courte", coiffeur: "Noah T.",    badge: null,        image: "images/pixie-cut.jpg" },
  { nom: "Lob effilé",       categorie: "courte", coiffeur: "Lucas B.",   badge: "Tendance",  image: "images/lob-effile.jpg" },
  { nom: "Chignon mariée",   categorie: "longue", coiffeur: "Camille R.", badge: "Cérémonie", image: "images/chignon-mariee.jpg" },
  { nom: "Balayage soleil",  categorie: "longue", coiffeur: "Sophie M.",  badge: "Tendance",  image: "images/balayage-soleil.jpg" },
  { nom: "Tresses couronne", categorie: "longue", coiffeur: "Camille R.", badge: "Cérémonie", image: "images/tresses-couronne.jpg" },
  { nom: "Ondulations soft", categorie: "longue", coiffeur: "Noah T.",    badge: null,        image: "images/ondulations-soft.jpg" }
];

// ==== NAVBAR — effet scroll (Demo 03) ========================

const nav = document.querySelector("#main-nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

// ==== AVIS — injection dynamique (Demo 03 createElement) =====

// Étoiles partielles — pas de 5/5 parfait (peu crédible pour l'utilisateur)
function genererEtoiles(note) {
  // note est sur 5, ex: 4.2
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(note)) {
      html += `<span class="star-full">★</span>`;
    } else if (i === Math.ceil(note) && note % 1 !== 0) {
      // Étoile partielle via opacité
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
    const col  = document.createElement("div");
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

// ==== CATALOGUE — images + filtrage (Demo 02 + Demo 04) ======

function chargerCatalogue(filtre = "toutes") {
  const grid = document.querySelector("#catalogue-grid");
  if (!grid) return;

  grid.innerHTML = "";

  // filter() — Demo 02
  const items = filtre === "toutes"
    ? catalogue
    : catalogue.filter(item => item.categorie === filtre);


  items.forEach((item, index) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-3 fade-in";

    const card = document.createElement("div");
    card.className = "catalogue-card";

    // Zone image
    const imgWrap = document.createElement("div");
    imgWrap.className = "catalogue-img";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.nom;
    img.className = "catalogue-photo";
    // Fallback si l'image n'existe pas encore
    img.onerror = function() {
      this.style.display = "none";
      imgWrap.classList.add("catalogue-img-fallback");
      imgWrap.innerHTML += `<span class="catalogue-img-icon">✂</span>`;
    };

    imgWrap.appendChild(img);

    // Badge
    if (item.badge) {
      const badge = document.createElement("span");
      badge.classList.add("catalogue-badge");
      if (item.badge === "Viral") badge.classList.add("viral");
      badge.textContent = item.badge;
      imgWrap.appendChild(badge);
    }

    // Corps
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

// ==== FORMULAIRE RDV — validation + scroll + confirmation ====

// Regex — inspiré Demo 04 + Demo 05
const REGEX = {
  nom:       /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ '-]{1,}$/,        // min 2 chars, lettres/espaces/tirets
  telephone: /^\d{3}-\d{3}-\d{4}$/,                      // 000-000-0000
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

  // Validation en temps réel — addEventListener (Demo 04)
  champs.forEach(id => {
    const el  = document.getElementById(id);
    if (!el) return;
    const evt = (el.tagName === "SELECT" || el.type === "date") ? "change" : "input";
    el.addEventListener(evt, () => validerChamp(id));
  });

  // Formatage automatique du téléphone : 6135550182 → 613-555-0182
  const telInput = document.getElementById("rdv-telephone");
  if (telInput) {
    telInput.addEventListener("input", () => {
      let val = telInput.value.replace(/\D/g, ""); // garder que les chiffres
      if (val.length >= 7) {
        val = `${val.slice(0,3)}-${val.slice(3,6)}-${val.slice(6,10)}`;
      } else if (val.length >= 4) {
        val = `${val.slice(0,3)}-${val.slice(3)}`;
      }
      telInput.value = val;
    });
  }

  // Soumission — preventDefault (Demo 04)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const toutValide = champs.every(id => validerChamp(id));

    if (!toutValide) {
      // Scroll vers le premier champ invalide
      const premierInvalide = champs.find(id => {
        const el = document.getElementById(id);
        return el && el.classList.contains("invalide");
      });

      // Si aucun n'a la classe invalide, c'est qu'il est vide — trouver le premier vide
      const cibleId = premierInvalide || champs.find(id => {
        const el = document.getElementById(id);
        return el && el.value === "";
      });

      if (cibleId) {
        const cible = document.getElementById(cibleId);
        cible.scrollIntoView({ behavior: "smooth", block: "center" });
        cible.focus();
        // Marquer comme invalide même si vide
        validerChamp(cibleId);
      }
      return;
    }

    // Destructuration — Demo 05
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

    // Template literal — Demo 05
    document.getElementById("confirm-msg").textContent =
      `Merci ${rdv.nom} ! Votre rendez-vous pour une ${rdv.service.toLowerCase()} avec ${rdv.coiffeuse} le ${dateFormatee} à ${rdv.heure} a bien été enregistré.`;

    // Cacher le formulaire, afficher la confirmation
    form.style.display = "none";
    const confirmBox = document.getElementById("confirm-box");
    confirmBox.style.display = "block";
    confirmBox.scrollIntoView({ behavior: "smooth", block: "center" });

    console.log("RDV confirmé :", JSON.stringify(rdv));
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

// ==== ANIMATIONS AU SCROLL ====================================

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

// ==== INIT ====================================================

document.addEventListener("DOMContentLoaded", () => {
  chargerAvis();
  chargerCatalogue();
  initFiltres();
  initFormulaire();
  initAnimations();
});