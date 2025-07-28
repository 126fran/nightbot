const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Lista de campeones (podés agregar más)
const campeones = [
  "Ahri", "Akali", "Ashe", "Brand", "Caitlyn", "Darius", "Ezreal",
  "Fiora", "Garen", "Irelia", "Jinx", "Katarina", "Leona", "Lux",
  "Morgana", "Nasus", "Riven", "Teemo", "Thresh", "Vayne", "Zed", "Akshan"
];

// Eventos por campeón (podés agregar más)
const eventos = {
  "Morgana": [
    "acertó su Q, inmovilizando al enemigo.",
    "usó su W para quemar lentamente.",
    "usó su R para iniciar el combo.",
    "con su escudo negro, bloqueó un hechizo."
  ],
  "Ahri": [
    "lanzó un charm exitoso.",
    "usó su Q y logró el doble daño.",
    "esquivó con su R y se reposicionó.",
    "se curó un poco con su pasiva."
  ],
  "Akali": [
    "se ocultó su Sombra para atacar.",
    "lanzó su Q, ralentizando al enemigo.",
    "usó su R para desplazarse tras el enemigo.",
    "Acertó la E a máximo rango"
  ],
  "Ashe": [
    "usó la W para desgastar al enemigo.",
    "usó Q para dar una ráfaga de básicos.",
    "disparó su R desde lejos, sorprendiendo.",
    "Usó su E en los bushes para encontrar al enemigo."
  ],
  "Brand": [
    "Usó su E en minions alcanzando al enemigo.",
    "lanzó su Q, forzando al enemigo a moverse.",
    "usó su R para aumentar el daño de área.",
    "logró el combo E Q W."
  ],
  "Caitlyn": [
    "colocó una trampa, atrapando al enemigo.",
    "disparó su R desde lejos.",
    "usó su E para reposicionarse y sorprender.",
    "disparó ataques críticos a distancia."
  ],
  "Darius": [
    "acertó varios básicos y aplicó sangrado.",
    "usó su R y lo dejó muy tocado.",
    "lanzó su Q y logró curarse.",
    "forzó al enemigo a resistir su presión."
  ],
  "Ezreal": [
    "disparó su W Q a larga distancia.",
    "usó su R para daño devastador desde lejos.",
    "activó su E para esquivar un ataque.",
    "usó Q para debilitar al enemigo a distancia."
  ],
  "Fiora": [
    "golpeó puntos débiles del enemigo mientras esquivaba.",
    "usó su R para atacar mortalmente.",
    "bloqueó un golpe con su W.",
    "usó su Q para detonar una marca."
  ],
  "Garen": [
    "usó su Q para silenciar al enemigo.",
    "recuperó salud con su pasiva.",
    "usó su R y casi mata.",
    "usó su E para barrer y ganar control."
  ],
  "Irelia": [
    "lanzó cuchillas, acelerando su ataque.",
    "redujo daño con su W.",
    "usó su R para entrar y golpear al enemigo.",
    "maximizó su daño con su pasiva."
  ],
  "Jinx": [
    "usó su R, causando daño a distancia.",
    "lanzó su cohete explosivo, dañando masivamente.",
    "activó su minigun para disparos rápidos.",
    "usó su trampa para atrapar al enemigo."
  ],
  "Katarina": [
    "saltó de sombra en sombra, atacando al enemigo.",
    "usó su R para daño masivo en el área.",
    "lanzó su Q para desgastar.",
    "desapareció con E, dejando al enemigo vulnerable."
  ],
  "Leona": [
    "atrapó al enemigo con su R.",
    "usó su W para resistir y desgastar al enemigo.",
    "metió una cadena de cc.",
    "lanzó su E, cegando al enemigo."
  ],
  "Lux": [
    "disparó su láser con R, sorprendiendo al enemigo.",
    "ralentizó al enemigo con su E.",
    "usó su Q para iniciar un combo.",
    "se dio escudo con su W."
  ],
  "Nasus": [
    "farmeó su Q dos horas.",
    "usó su R para aumentar su fuerza.",
    "desgastó con su E.",
    "se curó bastante con su pasiva."
  ],
  "Riven": [
    "metió una ráfaga de Q.",
    "activó su R para obtener poder.",
    "usó su E para esquivar un ataque.",
    "bloqueó un golpe con su W y contraatacó."
  ],
  "Teemo": [
    "lleno de hongos el mapa.",
    "usó su camuflaje para sorprender.",
    "lanzó su Q, cegando al enemigo.",
    "infligió mucho daño con sus básicos."
  ],
  "Thresh": [
    "usó su linterna para escudarse.",
    "lanzó su Q, atrapando al enemigo.",
    "usó su R para aislar al enemigo.",
    "movió al enemigo estratégicamente con su E."
  ],
  "Vayne": [
    "se desplazó con su Q y disparó.",
    "usó su R para entrar en modo sigiloso.",
    "metió 3 básicos explotando su W.",
    "tiró joyitas de gosu."
  ],
  "Zed": [
    "lanzó su sombra y acertó con 2 Q.",
    "usó su R para aparecer detrás del enemigo.",
    "esquivó con su W y contraatacó.",
    "Tiró maestria."
  ],
  "Akshan": [
    "asecha invisible con su W.",
    "usó su R para romper culos.",
    "disparó desde lejos con su Q.",
    "usó su E para escapar y contraatacar."
  ],
  "default": [
    "se mantuvo en posición, esperando el momento para atacar.",
    "comenzó a farmear bajo torre.",
    "lanzó ataques rápidos pero no rompió la defensa.",
    "realizó un movimiento evasivo y contraatacó.",
    "se acercó cautelosamente, calculando cada paso.",
    "resistió los ataques, pero no cedió.",
    "esquivó un hechizo y reposicionó para un mejor ángulo."
  ]


};

function eventoPorCampeon(campeon) {
  return eventos[campeon] || eventos["default"];
}

function elegirRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generarCampeon(lista) {
  const indice = Math.floor(Math.random() * lista.length);
  return lista[indice];
}

function asignarCampeones() {
  let campeonInvocador = generarCampeon(campeones); // Generar el campeón para el invocador
  let campeonesDisponibles = campeones.filter(campeon => campeon !== campeonInvocador); // Filtrar el campeón del invocador

  let campeonObjetivo = generarCampeon(campeonesDisponibles); // Generar el campeón para el objetivo
  return { campeonInvocador, campeonObjetivo };
}

function generarHistoria(j1, c1, j2, c2) {
  const ev1 = elegirRandom(eventoPorCampeon(c1));
  const ev2 = elegirRandom(eventoPorCampeon(c2));
  const ev3 = elegirRandom(eventoPorCampeon(c1));
  const ev4 = elegirRandom(eventoPorCampeon(c2));

  // Elegir al ganador 50/50
  const ganador = Math.random() < 0.5 ? j1 : j2;

  // Elegir cómo gana
  const condiciones = [
    `${ganador} destruye la primera torre`,
    `${ganador} consigue la primera sangre`,
    `${ganador} llega a 100 minions antes`
  ];
  const fin = elegirRandom(condiciones);

  return `🆚 ${j1} (${c1}) vs ${j2} (${c2}) | ${c1} ${ev1}. ${c2} ${ev2}. ${c1} ${ev3}. ${c2} ${ev4}. 🏁 ${fin}. 🏆 ${ganador} gana! KEKW`;
}

// Endpoint: /pvp?invocador=Fran&objetivo=Jengi
app.get('/pvp', (req, res) => {
  const invocador = req.query.invocador || "Invocador1";
  const objetivo = req.query.objetivo || "Invocador2";



  let { campeonInvocador, campeonObjetivo } = asignarCampeones();

  const historia = generarHistoria(invocador, campeonInvocador, objetivo, campeonObjetivo);
  res.send(historia);
});

app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
