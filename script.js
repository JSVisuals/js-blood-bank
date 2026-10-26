// JS Blood Bank demo interactions. Replace the configuration below before publishing.
const SITE_CONFIG = {
  // Use international format without +, spaces or punctuation for WhatsApp, e.g. 919876543210.
  whatsappNumber: "",
  // Use a phone number formatted for tel:, e.g. +919876543210.
  phoneNumber: "",
  // Replace with the real, verified address.
  address: "",
  // Replace with an exact Google Maps URL for the facility.
  mapUrl: ""
};

document.getElementById("year").textContent = new Date().getFullYear();
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const tabs = [...document.querySelectorAll(".blood-tab")];
const cards = [...document.querySelectorAll(".blood-card")];
const search = document.getElementById("blood-search");
const empty = document.getElementById("empty-state");
let activeGroup = "all";
function filterBlood() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const group = card.dataset.blood;
    const matchesGroup = activeGroup === "all" || activeGroup === group;
    const matchesSearch = !query || group.toLowerCase().includes(query) || card.textContent.toLowerCase().includes(query);
    const show = matchesGroup && matchesSearch;
    card.hidden = !show;
    if (show) visible++;
  });
  empty.hidden = visible > 0;
}
tabs.forEach(tab => tab.addEventListener("click", () => {
  activeGroup = tab.dataset.group;
  tabs.forEach(item => {
    const selected = item === tab;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  filterBlood();
}));
search.addEventListener("input", filterBlood);

function selectBloodGroup(group) {
  document.getElementById("form-blood-group").value = group;
  document.getElementById("appointment").scrollIntoView({behavior: "smooth"});
  document.querySelector('[name="purpose"]').value = "Enquire about blood availability";
}
document.querySelectorAll(".request-group").forEach(button => button.addEventListener("click", () => selectBloodGroup(button.dataset.group)));

const phoneLinks = document.querySelectorAll("[data-phone-link]");
const waLinks = document.querySelectorAll("[data-wa-link]");
const mapLinks = document.querySelectorAll("[data-map-link]");
function configureLink(el, url, label) {
  if (url) { el.href = url; el.target = url.startsWith("http") ? "_blank" : ""; if (url.startsWith("http")) el.rel = "noopener noreferrer"; }
  else { el.href = "#contact"; el.addEventListener("click", event => { event.preventDefault(); alert("Demo website: add the verified " + label + " in script.js before publishing."); }); }
}
phoneLinks.forEach(el => {
  if (SITE_CONFIG.phoneNumber) { el.href = "tel:" + SITE_CONFIG.phoneNumber; }
  else { el.href = "#contact"; el.addEventListener("click", e => {e.preventDefault(); alert("Demo website: add the verified phone number in script.js before publishing.");}); }
});
waLinks.forEach(el => configureLink(el, SITE_CONFIG.whatsappNumber ? "https://wa.me/" + SITE_CONFIG.whatsappNumber : "", "WhatsApp number"));
mapLinks.forEach(el => configureLink(el, SITE_CONFIG.mapUrl || (SITE_CONFIG.address ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(SITE_CONFIG.address) : ""), "map URL/address"));
document.querySelectorAll(".config-phone").forEach(el => { if (SITE_CONFIG.phoneNumber) el.textContent = SITE_CONFIG.phoneNumber; });
document.querySelectorAll(".config-address").forEach(el => { if (SITE_CONFIG.address) el.textContent = SITE_CONFIG.address; });

const dateInput = document.getElementById("preferred-date");
const today = new Date();
dateInput.min = [today.getFullYear(), String(today.getMonth()+1).padStart(2,"0"), String(today.getDate()).padStart(2,"0")].join("-");
document.getElementById("appointment-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    "JS Blood Bank — Appointment / Enquiry",
    "Name: " + data.get("name"),
    "Phone: " + data.get("phone"),
    "Purpose: " + data.get("purpose"),
    "Blood group: " + (data.get("bloodGroup") || "Not specified"),
    "Preferred date: " + (data.get("date") || "Not specified"),
    "Details: " + (data.get("message") || "None")
  ].join("\n");
  const status = document.getElementById("form-status");
  if (!SITE_CONFIG.whatsappNumber) {
    status.textContent = "Demo mode: your form is valid, but WhatsApp is not configured. Add the verified WhatsApp number in script.js to enable message handoff.";
    return;
  }
  const url = "https://wa.me/" + SITE_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener,noreferrer");
  status.textContent = "WhatsApp opened with your details. Review the message and send it to complete your enquiry.";
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), {threshold: 0.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}
