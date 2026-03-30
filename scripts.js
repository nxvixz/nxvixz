const projects = {
    LibertyJS: {
        github: "https://github.com/Liberty-Tools/LibertyJS",
        npm: "https://www.npmjs.com/package/@libertytools/libertyjs",
        website: "https://libertytools.dev/"
    }
}

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  const projectId = card.id;
  const project = projects[projectId];

  if (!project) return;

  const spans = card.querySelectorAll('span');

  spans.forEach(span => {
    span.addEventListener('click', () => {
      if (span.classList.contains('github') && project.github) {
        window.open(project.github, '_blank');
      } else if (span.classList.contains('npm') && project.npm) {
        window.open(project.npm, '_blank');
      } else if (span.classList.contains('website') && project.website) {
        window.open(project.website, '_blank');
      }
    });
  });
});

const texts = [
    "a web developer",
    "an robotics enthusiast",
    "a CAD designer"
];

let textIndex = 0;
let charIndex = 0;
let typingForward = true;
const container = document.querySelector(".js-text");
const speed = 50; // typing speed in ms
const pauseAfterDelete = 200; // pause after deleting before next phrase

function type() {
    const currentText = texts[textIndex];

    if (typingForward) {
        container.textContent += currentText[charIndex];
        charIndex++;
        if (charIndex === currentText.length) {
            typingForward = false;
            setTimeout(type, 3000); // pause after fully typed
            return;
        }
    } else {
        container.textContent = currentText.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            typingForward = true;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, pauseAfterDelete);
            return;
        }
    }

    setTimeout(type, speed);
}

type();