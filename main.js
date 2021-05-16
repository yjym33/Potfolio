"use strict";

// navbar animation

const navbar = document.querySelector("#navbar");
const navbarLogo = document.querySelector(".navbar__logo__name");
const navbarBtn = document.querySelector(".navbar__toggle-btn");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
    navbarLogo.classList.add("navbar--dark");
    navbarBtn.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
    navbarLogo.classList.remove("navbar--dark");
    navbarBtn.classList.remove("navbar--dark");
  }
});

// navbar tap scroll , navbar click css

const navbarMenu = document.querySelector(".navbar__menu");

navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

//contact btn scroll

const contactBtn = document.querySelector(".home__contact");
contactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// scroll 투명도

const home = document.querySelector(".home__container");
const about = document.querySelector(".about__container");
const skill = document.querySelector(".skill__container");
const project = document.querySelector(".project__container");

adjustOpacity(home);

function adjustOpacity(element) {
  document.addEventListener("scroll", () => {
    const offsetBottom = element.offsetTop + element.offsetHeight;
    if (window.scrollY < offsetBottom && window.scrollY > element.offsetTop) {
      element.style.opacity = element.offsetTop / window.scrollY;
    } else {
      element.style.opacity = 1;
    }
  });
}

// backbtn scroll event & navbar toggle envent remove
const backBtn = document.querySelector(".backBtn");
backBtn.addEventListener("click", () => {
  scrollIntoView("#home");
});
document.addEventListener("scroll", () => {
  const homeHeight = home.getBoundingClientRect().height;
  if (window.scrollY > homeHeight / 2) {
    backBtn.classList.add("active");
  } else {
    backBtn.classList.remove("active");
  }

  navbarMenu.classList.remove("open");
});

// skill animation
function gageNone(element) {
  element.style.opacity = 0;
}
function gageStyle(element) {
  element.style.opacity = 1;
}

document.addEventListener("scroll", () => {
  const skillHeight = skill.getBoundingClientRect().height;

  const skillGageHtml = document.querySelector(".skill__bar__gauge.html");
  const skillGageCss = document.querySelector(".skill__bar__gauge.css");
  const skillGageJs = document.querySelector(".skill__bar__gauge.javascript");
  const skillGageReact = document.querySelector(".skill__bar__gauge.react");
  const skillGageNode = document.querySelector(".skill__bar__gauge.node");
  const skillGageBoot = document.querySelector(".skill__bar__gauge.boot");
  if (window.scrollY > skillHeight) {
    gageStyle(skillGageReact);
    gageStyle(skillGageHtml);
    gageStyle(skillGageCss);
    gageStyle(skillGageJs);
    gageStyle(skillGageNode);
    gageStyle(skillGageBoot);
  } else {
    gageNone(skillGageReact);
    gageNone(skillGageHtml);
    gageNone(skillGageCss);
    gageNone(skillGageJs);
    gageNone(skillGageNode);
    gageNone(skillGageBoot);
  }
});

// max-width 768px toggle button

const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

//nav button scroll  활성화

const sectionIds = ["#home", "#about", "#skill", "#project", "#contact"];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

window.addEventListener("load", () => {
  selectNavItem(navItems[selectedNavIndex]);
});

function selectNavItem(selected) {
  selectedNavItem.classList.remove("select");
  selectedNavItem = selected;
  selectedNavItem.classList.add("select");
}
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const obserCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(obserCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.scrollHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

function scrollIntoView(selector) {
  const scroll = document.querySelector(selector);
  scroll.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
