const container = document.getElementById("container");
const svg = document.getElementById("space");
const width = svg.clientWidth;
const height = svg.clientHeight;
const centerX = width / 2;
const centerY = height / 2;
const tooltip = document.getElementById("tooltip");

const planets = [
  { name: 'Mercury', radius: 60, speed: 0.03, image: 'images/mercury.png', info: 'Smallest planet, closest to the Sun.' },
  { name: 'Venus', radius: 90, speed: 0.022, image: 'images/venus.png', info: 'Venus has a thick, toxic atmosphere.' },
  { name: 'Earth', radius: 120, speed: 0.017, image: 'images/earth.png', info: 'Our home planet, supports life.' },
  { name: 'Mars', radius: 150, speed: 0.015, image: 'images/mars.png', info: 'Known as the Red Planet.' },
  { name: 'Jupiter', radius: 200, speed: 0.011, image: 'images/jupiter.png', info: 'Largest planet in the solar system.' },
  { name: 'Saturn', radius: 250, speed: 0.009, image: 'images/saturn.png', info: 'Famous for its ring system.' },
  { name: 'Uranus', radius: 300, speed: 0.007, image: 'images/uranus.png', info: 'An ice giant with a blue-green color.' },
  { name: 'Neptune', radius: 350, speed: 0.005, image: 'images/neptune.png', info: 'Farthest planet from the Sun.' }
];

// Create SVG paths for planet orbits and image elements for planets
planets.forEach(planet => {
  // Create orbit path
  const orbitPath = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  orbitPath.setAttribute('cx', centerX);
  orbitPath.setAttribute('cy', centerY);
  orbitPath.setAttribute('r', planet.radius);
  orbitPath.classList.add('orbit-path');
  svg.appendChild(orbitPath);
  
  // Create planet image
  const img = document.createElement("img");
  img.src = planet.image;
  img.alt = planet.name;
  img.classList.add("planet");
  img.setAttribute("data-name", planet.name);
  img.setAttribute("data-info", planet.info);
  container.appendChild(img);
  planet.element = img;
  planet.angle = Math.random() * Math.PI * 2;

  // Show orbit path after a delay
  setTimeout(() => {
    orbitPath.classList.add('orbit-show');
  }, 2000);  // Show after 2 seconds
});

// Tooltip logic
function showTooltip(e) {
  const name = e.target.dataset.name;
  const info = e.target.dataset.info;
  tooltip.innerHTML = `<strong>${name}</strong><br>${info}`;
  tooltip.style.left = `${e.pageX + 10}px`;
  tooltip.style.top = `${e.pageY + 10}px`;
  tooltip.style.display = 'block';
}

function hideTooltip() {
  tooltip.style.display = 'none';
}

container.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('planet')) {
    showTooltip(e);
  }
});

container.addEventListener('mousemove', (e) => {
  if (tooltip.style.display === 'block') {
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
  }
});

container.addEventListener('mouseout', (e) => {
  if (e.target.classList.contains('planet')) {
    hideTooltip();
  }
});

// Animate planets along their orbits
function animate() {
  planets.forEach(planet => {
    planet.angle += planet.speed;
    const x = centerX + planet.radius * Math.cos(planet.angle);
    const y = centerY + planet.radius * Math.sin(planet.angle);
    planet.element.style.left = `${x - 15}px`; // center image (30px width)
    planet.element.style.top = `${y - 15}px`;
  });
  requestAnimationFrame(animate);
}

animate();
