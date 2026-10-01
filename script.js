const projects = {
  "design-system": {
    kicker: "Case study 03 · Design system",
    title: "A shared UI language, from Figma to Storybook",
    summary: "At SENSYN ROBOTICS, I worked across design and implementation to help product teams create and reuse more consistent interface patterns.",
    meta: [["Role", "Design Engineer"], ["Team", "Designers + engineers"], ["Tools", "Figma, Storybook, Vue, Vuetify, TypeScript, SCSS"]],
    images: [["assets/design-system.png", "Figma component variants showing visual rules, types, sizes, and states"], ["assets/rosetta.png", "Storybook documentation showing a component example and API controls"]],
    story: [
      ["Challenge", "Turn existing B2B product UI into repeatable patterns while working within Vuetify and supporting different product needs."],
      ["My contribution", "Researched comparable systems, helped define visual rules, built and reviewed Figma components, then implemented and customized patterns in Storybook. I also handled bug fixes and feature requests with designers and engineers."],
      ["Value", "A clearer design-to-development foundation: component decisions were visible in Figma, documented in Storybook, and easier for teams to discuss, test, and reuse."]
    ],
    links: [["SENSYN Design system", "https://sensyn-robotics.github.io/sensyn-design-system-vue-3/?path=/docs/vuetify-alert--docs"]]
  },
  datastore: {
    kicker: "Case study 01 · Datastore",
    title: "From drone inspection media to maintenance action",
    summary: "At SENSYN ROBOTICS, I designed flows for a product that stores drone inspection photos and videos, helping teams review sites and record what needs repair or maintenance.",
    meta: [["Role", "Product UI / UX design"], ["Context", "Drone-based infrastructure and facility inspection"], ["Tools", "Figma, scenarios, user flows"]],
    images: [
      ["assets/datastore-data-list.png", "Datastore data list with an equipment tree, uploaded files, filters, and inspection status", "Datastore data list · product interface"],
      ["assets/datastore-workflow.png", "Figma design board for workflow selection, copy, and error states in Datastore", "Workflow settings · Figma design states"]
    ],
    imageLayout: "stack",
    story: [
      ["Challenge", "Connect a large set of inspection photos and videos with the decisions people need to make about locations requiring attention."],
      ["My contribution", "Worked through requirements and usage scenarios, mapped user flows, designed the interface in Figma, and reviewed the work with the design team. I discussed scope and deadlines with stakeholders and engineers, then checked the UI and UX in staging."],
      ["What the design supports", "Users can review inspection media, mark photos with notes about repair or maintenance needs, and add inspection workflows. The case shows my involvement from defining the flow through release review."]
    ]
  },
  "robot-platform": {
    kicker: "Case study 02 · Robot Platform",
    title: "A focused control view for hotel robot operations",
    summary: "For a hotel operations platform at SENSYN ROBOTICS, I helped make robot location, status, and cleaning commands understandable to staff.",
    meta: [["Role", "Product UI / UX design"], ["Context", "Hotel cleaning and navigation robots"], ["Constraint", "Short timeline and limited budget"]],
    images: [["assets/robot-platform-prototype.png", "Figma prototype sequence showing robot floor locations, status, and command selection", "Robot Platform · Figma prototype flow"]],
    story: [
      ["Challenge", "Give staff a clear view of which floor each robot is on and whether it is running, on standby, in error, or low on battery, while keeping command tasks easy to use."],
      ["My contribution", "Simplified the design around the essential information and actions. I coordinated priorities, sprints, and releases with engineers so the team could deliver within the available time and budget."],
      ["Response", "Staff could direct a robot to a floor and cleaning area from the platform. The client said the delivered result exceeded expectations."]
    ]
  },
  "web-experience": {
    kicker: "Case study 04 · Web design and delivery",
    title: "From page design to responsive launch",
    summary: "I owned website work across design, coding, publishing, and ongoing operations for SENSYN ROBOTICS’ corporate and product experiences.",
    meta: [["Role", "Web designer + front-end developer"], ["Scope", "Corporate site, product pages, landing pages"], ["Tools", "Figma, HTML/CSS, JavaScript, HubSpot"]],
    images: [["assets/homepage.png", "SENSYN ROBOTICS homepage with a responsive corporate design and product-focused message"]],
    story: [
      ["Challenge", "Create and maintain a consistent web experience while supporting product launches, corporate renewal work, and frequent content updates."],
      ["My contribution", "Designed new page layouts in Figma, coded responsive front-end experiences, managed updates and new pages, tested the work, and carried it through HubSpot publishing."],
      ["Value", "End-to-end delivery across design and implementation, with product pages and corporate content supported through an ongoing site workflow."]
    ],
    links: [["SENSYN Academy", "https://academy.sensyn-robotics.com/"], ["Rakuraku Drone", "https://www.sensyn-robotics.com/service/rakurakudrone/"], ["GEMBA Connect", "https://gembaconnect.sensyn-robotics.com/"], ["Document RPA", "https://shoruira.sensyn-robotics.com/preregistration/"]]
  }
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

const dialog = document.querySelector("#case-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeButton = document.querySelector(".dialog-close");
let lastTrigger = null;

function renderProject(project) {
  const renderImage = ([src, alt, caption]) => `<figure class="case-image"><img src="${src}" alt="${alt}">${caption ? `<figcaption><span>${caption}</span><a href="${src}" target="_blank" rel="noopener noreferrer">View full size ↗</a></figcaption>` : ""}</figure>`;
  const imageMarkup = project.images.length > 1 && project.imageLayout !== "stack"
    ? `<div class="case-image-grid">${project.images.map(renderImage).join("")}</div>`
    : project.images.map(renderImage).join("");
  const linksMarkup = project.links
    ? `<div class="case-links" aria-label="Live project links">${project.links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`).join("")}</div>`
    : "";

  dialogContent.innerHTML = `
    <header class="case-hero">
      <p class="project-kicker">${project.kicker}</p>
      <h2 id="dialog-title">${project.title}</h2>
      <p class="case-summary">${project.summary}</p>
      <div class="case-meta">${project.meta.map(([label, value]) => `<p><strong>${label}</strong>${value}</p>`).join("")}</div>
    </header>
    ${imageMarkup}
    <div class="case-narrative">${project.story.map(([heading, copy]) => `<section><h3>${heading}</h3><div><p>${copy}</p>${heading === "Value" ? linksMarkup : ""}</div></section>`).join("")}</div>`;
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    lastTrigger = button;
    renderProject(projects[button.dataset.project]);
    dialog.showModal();
    document.body.classList.add("dialog-open");
    closeButton.focus();
  });
});

function closeDialog() {
  dialog.close();
  document.body.classList.remove("dialog-open");
  lastTrigger?.focus();
}

closeButton.addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => { if (event.target === dialog) closeDialog(); });
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

const revealItems = [...document.querySelectorAll(".reveal")];
if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  document.querySelectorAll(".stagger-group").forEach((group) => {
    [...group.children].forEach((child, index) => child.style.setProperty("--delay", `${index * 75}ms`));
  });
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .1, rootMargin: "0px 0px -6%" });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const progress = document.querySelector("[data-progress]");
const header = document.querySelector("[data-header]");
const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
let scrollTicking = false;

function updateScrollEffects() {
  const documentRoot = document.documentElement;
  const maxScroll = Math.max(documentRoot.scrollHeight - window.innerHeight, 1);
  progress.style.transform = `scaleX(${Math.min(window.scrollY / maxScroll, 1)})`;

  header.classList.toggle("scrolled", window.scrollY > 12);

  if (!reducedMotion) {
    parallaxItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const speed = Number(item.dataset.parallax || .05);
      const centerDelta = (window.innerHeight / 2) - (rect.top + rect.height / 2);
      item.querySelector("img")?.style.setProperty("--parallax-y", `${Math.max(-35, Math.min(35, centerDelta * speed))}px`);
    });
  }
  scrollTicking = false;
}

window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(updateScrollEffects);
}, { passive: true });
updateScrollEffects();

const hero = document.querySelector("[data-hero]");
const characterScene = document.querySelector(".character-scene");
const plane = document.querySelector("[data-plane]");
const trailLayer = document.querySelector("[data-plane-trail]");
let ideaTimer;

function lightIdea(duration = 1450) {
  if (!hero) return;
  hero.classList.add("idea-on");
  window.clearTimeout(ideaTimer);
  ideaTimer = window.setTimeout(() => hero.classList.remove("idea-on"), duration);
}

if (hero && !reducedMotion) {
  window.setTimeout(() => lightIdea(1800), 1400);
  window.setInterval(() => lightIdea(1500), 7200);

  if (finePointer) {
    let lastIdeaAt = 0;
    let previousX = 0;
    let previousY = 0;
    let lastTrailAt = 0;
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;

      hero.style.setProperty("--cursor-x", `${localX}px`);
      hero.style.setProperty("--cursor-y", `${localY}px`);
      characterScene.style.setProperty("--figure-x", `${x * 18}px`);
      characterScene.style.setProperty("--figure-y", `${y * 11}px`);
      characterScene.style.setProperty("--figure-r", `${x * 2.4}deg`);
      characterScene.style.setProperty("--bulb-x", `${x * -11}px`);
      characterScene.style.setProperty("--bulb-y", `${y * -8}px`);

      const deltaX = localX - previousX;
      const deltaY = localY - previousY;
      const distance = Math.hypot(deltaX, deltaY);
      const angle = distance > 1 ? Math.atan2(deltaY, deltaX) * 180 / Math.PI : 0;
      plane.style.transform = `translate3d(${localX - 16}px, ${localY - 16}px, 0) rotate(${angle + 45}deg)`;

      if (distance > 9 && performance.now() - lastTrailAt > 26) {
        const dash = document.createElement("span");
        dash.className = "plane-trail";
        dash.style.left = `${localX - Math.cos(angle * Math.PI / 180) * 21}px`;
        dash.style.top = `${localY - Math.sin(angle * Math.PI / 180) * 21}px`;
        dash.style.setProperty("--trail-angle", `${angle}deg`);
        trailLayer.appendChild(dash);
        dash.addEventListener("animationend", () => dash.remove(), { once: true });
        lastTrailAt = performance.now();
      }
      previousX = localX;
      previousY = localY;

      const nearBulb = x > .22 && y < -.18;
      if (nearBulb && Date.now() - lastIdeaAt > 2500) {
        lightIdea();
        lastIdeaAt = Date.now();
      }
    });
    hero.addEventListener("pointerleave", () => {
      characterScene.style.setProperty("--figure-x", "0px");
      characterScene.style.setProperty("--figure-y", "0px");
      characterScene.style.setProperty("--figure-r", "0deg");
      characterScene.style.setProperty("--bulb-x", "0px");
      characterScene.style.setProperty("--bulb-y", "0px");
      previousX = 0;
      previousY = 0;
    });
  }
}

if (!reducedMotion && finePointer) {
  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .12;
      const y = (event.clientY - rect.top - rect.height / 2) * .12;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
    element.addEventListener("pointerleave", () => { element.style.transform = ""; });
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
