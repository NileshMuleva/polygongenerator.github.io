const sideCountEl = document.querySelector("#js-side-count");
const radiusEl = document.querySelector("#js-radius");
const cxEl = document.querySelector("#js-cx");
const cyEl = document.querySelector("#js-cy");
const generateEl = document.querySelector("#js-generate");
const polygonEl = document.querySelector("#js-polygon");
const resultEl = document.querySelector("#js-result");
const svgEl = document.querySelector("#js-svg");

function pts(sideCount, radius) {
  const angle = 360 / sideCount;
  const vertexIndices = range(sideCount);
  const offsetDeg = 90 - ((180 - angle) / 2);
  const offset = degreesToRadians(offsetDeg);

  return vertexIndices.map((index) => {
    return {
      theta: offset + degreesToRadians(angle * index),
      r: radius,
    };
  });
}

function range(count) {
  return Array.from(Array(count).keys());
}

function degreesToRadians(angleInDegrees) {
  return (Math.PI * angleInDegrees) / 180;
}
 

function polygon([cx, cy], sideCount, radius) {
  return pts(sideCount, radius)
    .map(({ r, theta }) => [
      cx + r * Math.cos(theta), 
      cy + r * Math.sin(theta),
    ])
  //.join(' '); 
}

function generatePolygon() {
  const sideCount = +sideCountEl.value;
  const radius = +radiusEl.value;
  const cx = +cxEl.value;
  const cy = +cyEl.value;
  const s = 2 * radius + 200;

  const res = polygon([cx, cy], sideCount, radius);
  const viz = polygon([s / 2, s / 2], sideCount, radius);
  
  svgEl.setAttribute('viewBox', `0 0 ${s} ${s}`);
  polygonEl.setAttribute('points', viz);
  resultEl.innerText = `<polygon points="${res}" />`;
}

generateEl.onclick = generatePolygon;
window.onload = generatePolygon;