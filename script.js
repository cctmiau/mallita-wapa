const malla = `SEMESTRE 1
Matemática | id: mate
Química General | id: quim-gen
Biología Celular e Histología | id: biocel
Fundamentos de las Ciencias Farmacéuticas | id: fund-farma
Introducción a la Farmacia | id: intro-farma

SEMESTRE 2
Cálculo | id: calculo | prereq: mate
Química Inorgánica | id: quim-inorg | prereq: quim-gen
Bioquímica | id: bioq | prereq: biocel
Evolución de los Medicamentos | id: evolucion | prereq: fund-farma
Farmacia Privada | id: farma-priv | prereq: intro-farma

SEMESTRE 3
Física Aplicada | id: fisica | prereq: calculo
Química Orgánica | id: quim-org | prereq: quim-inorg
Fisiología Humana | id: fisio | prereq: bioq
Análisis Químico e Instrumental | id: analisis-q | prereq: quim-gen
Electivo de Comunicación | id: elec-com1

SEMESTRE 4
Farmacognosia y Fitoterapia | id: farmafit | prereq: quim-org
Farmacología | id: farma1 | prereq: fisio
Microbiología y Parasitología | id: microbio | prereq: bioq
Electivo de Comunicación | id: elec-com2

SEMESTRE 5
Farmacología de Sistemas | id: farma2 | prereq: farma1
Farmacoquímica I | id: farmaco1 | prereq: quim-org
Epidemiología | id: epidemio | prereq: microbio
Electivo de Desarrollo del Pensamiento | id: elec-pens

SEMESTRE 6
Farmacoquímica II | id: farmaco2 | prereq: farmaco1
Físicoquímica Farmacéutica | id: fisicoq | prereq: quim-org
Salud Pública | id: salud-pub | prereq: epidemio
Electivo de Desarrollo Personal | id: elec-pers

SEMESTRE 7
Tecnología Farmacéutica I | id: tecfarma1 | prereq: fisicoq
Bioquímica Clínica | id: bioq-clin | prereq: bioq
Metodología de Investigación Farmacéutica | id: met-invest | prereq: farmaco2
Electivo de Responsabilidad Social | id: elec-rs

SEMESTRE 8
Tecnología Farmacéutica II | id: tecfarma2 | prereq: tecfarma1
Diseño de Proyectos en Investigación Farmacéutica | id: diseno-proy | prereq: met-invest
Toxicología | id: toxico | prereq: bioq-clin
Seminario de Grado | id: semigrado | prereq: diseno-proy
Electivo de Ética | id: elec-etica

SEMESTRE 9
Farmacia Clínica | id: farma-clin | prereq: bioq-clin
Farmacia Asistencial (A+S) | id: farma-asist | prereq: salud-pub
Taller Integrado de Farmacología (Ev. Ciclo) | id: taller-farma | prereq: farma2
Práctica I en Oficina de Farmacia | id: pract1 | prereq: farma-priv

SEMESTRE 10
Economía y Marketing Farmacéutico | id: econ-mark | prereq: farma-asist
Farmacovigilancia | id: farmacovig | prereq: farma-clin
Tecnología Cosmética | id: tec-cosme | prereq: tecfarma2
Práctica II: Farmacia Asistencial | id: pract2 | prereq: farma-asist
Práctica III: Farmacia Clínica (Ev. Ciclo) | id: pract3 | prereq: farma-clin`;

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-malla");
  const semestres = malla.trim().split(/\n(?=SEMESTRE)/);

  for (let bloque of semestres) {
    const lineas = bloque.trim().split("\n");
    const titulo = lineas[0];
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>${titulo}</h2>`;

    for (let i = 1; i < lineas.length; i++) {
      const partes = lineas[i].split("|").map(p => p.trim());
      const nombre = partes[0];
      const id = partes[1].split(":")[1].trim();
      const prereq = partes[2] ? partes[2].split(":")[1].trim() : null;

      const ramo = document.createElement("div");
      ramo.className = "ramo";
      ramo.dataset.id = id;
      if (prereq) {
        ramo.dataset.prereq = prereq;
        ramo.classList.add("prereq");
      }
      ramo.innerText = nombre;
      ramo.onclick = () => toggleAprobado(ramo);

      div.appendChild(ramo);
    }

    contenedor.appendChild(div);
  }

  actualizarBloqueos();
});

function toggleAprobado(el) {
  if (el.classList.contains("bloqueado")) return;
  el.classList.toggle("aprobado");
  actualizarBloqueos();
}

function actualizarBloqueos() {
  const ramos = document.querySelectorAll(".ramo");
  const aprobados = new Set(
    [...ramos].filter(r => r.classList.contains("aprobado")).map(r => r.dataset.id)
  );

  ramos.forEach(ramo => {
    if (ramo.dataset.prereq) {
      const req = ramo.dataset.prereq;
      if (!aprobados.has(req)) {
        ramo.classList.add("bloqueado");
        ramo.classList.remove("aprobado");
      } else {
        ramo.classList.remove("bloqueado");
      }
    }
  });
}
