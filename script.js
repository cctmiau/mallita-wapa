const malla = `SEMESTRE 1
Matemática | id: mate
Química General | id: quim-gen
Biología Celular e Histología | id: biocel
Fundamentos de las Ciencias Farmacéuticas | id: fund-farma
Introducción a la Farmacia | id: intro-farma
Electivo de comunicación | id: elec

SEMESTRE 2
Cálculo | id: calculo | prereq: mate
Química Inorgánica | id: quim-inorg | prereq: quim-gen
Bioquímica | id: bioq | prereq: biocel,quim-gen
Evolución de los Medicamentos | id: evolucion | prereq: fund-farma
Farmacia Privada | id: farma-priv | prereq: intro-farma
Electivo de comunicación | id: elec2

SEMESTRE 3
Física Aplicada | id: fisica | prereq: calculo
Química analítica | id: quim-ana | prereq: quim-inorg
Fisiología Humana | id: fisio-hum | prereq: bioq
Bioestadística | id: bioes | prereq: mate
Legislación farmacéutica | id: legi-far 
Electivo de desarrollo del pensamiento | id: elec-des

SEMESTRE 4
Química orgánica | id: quim-org | prereq: quim-gen
Fisiopatología | id: fisio | prereq: fisio-hum
Farmacognosia y Fitoterapia | id: farmafit | prereq: quim-ana
Análisis Químico e Instrumental | id: analisis-q | prereq: quim-ana
Microbiología y Parasitología | id: microbio | prereq: bioq
Taller integrado de biociencias | id: taller-bio | prereq: quim-ino,evoluvion,fisio-hum

SEMESTRE 5
Farmacología | id: farma1 | prereq: fisio-hum
Farmacoquímica I | id: farmaco1 | prereq: quim-org
Físicoquímica Farmacéutica | id: fisicoq | prereq: quim-org,fisica
Epidemiología | id: epidemio | prereq: microbio
Introducción a la investigacion en ciencias f. | id: intro-inve | prereq: bioes
Electivo de Desarrollo Personal | id: elec-pers

SEMESTRE 6
Farmacología de Sistemas | id: farma2 | prereq: farma1
Farmacoquímica II | id: farmaco2 | prereq: farmaco1
Tecnología Farmacéutica I | id: tecfarma1 | prereq: fisicoq,analisis-q
Salud Pública | id: salud-pub | prereq: epidemio
Metodología de Investigación Farmacéutica | id: met-invest | prereq: farmaco2
Electivo de Responsabilidad Social | id: elec-rs

SEMESTRE 7
Tecnología Farmacéutica II | id: tecfarma2 | prereq: tecfarma1
Bioquímica Clínica | id: bioq-clin | prereq: bioq
Diseño de Proyectos en Investigación Farmacéutica | id: diseno-proy | prereq: met-invest
Farmacia Asistencial (A+S) | id: farma-asist | prereq: salud-pub
Práctica I en Oficina de Farmacia | id: pract1 | prereq: farma-priv
Electivo de Ética | id: elec-etica

SEMESTRE 8
Toxicología | id: toxico | prereq: bioq-clin
Seminario de Grado | id: semigrado | prereq: diseno-proy
Tecnología Cosmética | id: tec-cosme | prereq: tecfarma2
Farmacia Clínica | id: farma-clin | prereq: bioq-clin
Taller Integrado de Farmacología (Ev. Ciclo) | id: taller-farma | prereq: farma2

SEMESTRE 9
Economía y Marketing Farmacéutico | id: econ-mark | prereq: farma-asist
Práctica II: Farmacia Asistencial | id: pract2 | prereq: farma-asist

SEMESTRE 10
Farmacovigilancia | id: farmacovig | prereq: farma-clin
Práctica III: Farmacia Clínica (Ev. Ciclo) | id: pract3 | prereq: farma-clin`;

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-malla");
  const semestres = malla.trim().split(/\r?\n(?=SEMESTRE)/);

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
