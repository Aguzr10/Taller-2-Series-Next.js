import { Serie } from "@/types/series";

// 6 series por defecto para precargar si localstorage esta vacio
export const initialSeries: Serie[] = [
  {
    id: 1,
    title: "The Flash",
    genre: "Ciencia Ficción / Acción",
    seasons: 9,
    platform: "The CW / Netflix",
    rating: 7.6,
    image: "https://static.tvmaze.com/uploads/images/original_untouched/448/1121792.jpg",
    description:
      "Tras la explosión del acelerador de partículas de S.T.A.R. Labs, Barry Allen (Grant Gustin) despierta de un coma de nueve meses con una velocidad sobrehumana y asume la identidad de Flash para proteger Central City de los metahumanos criminales.",
  },
  {
    id: 2,
    title: "Haikyuu!!",
    genre: "Anime / Deportes",
    seasons: 4,
    platform: "Crunchyroll / Netflix",
    rating: 8.7,
    image: "https://static.tvmaze.com/uploads/images/original_untouched/65/164065.jpg",
    description:
      "Shoyo Hinata, a pesar de su baja estatura, se apasiona por el voleibol inspirado por el 'Pequeño Gigante'. Al ingresar a la preparatoria Karasuno, se ve obligado a hacer equipo con su antiguo rival, el prodigioso colocador Tobio Kageyama, para llevar a su equipo al torneo nacional.",
  },
  {
    id: 3,
    title: "BoJack Horseman",
    genre: "Animación / Comedia dramática",
    seasons: 6,
    platform: "Netflix",
    rating: 8.8,
    image: "https://static.tvmaze.com/uploads/images/original_untouched/405/1012627.jpg",
    description:
      "Un caballo antropomorfo y estrella olvidada de una comedia noventera lidia con el alcoholismo, la depresión y la decadencia de Hollywood mientras intenta regresar al estrellato mediante una autobiografía escrita junto a su escritora fantasma Diane Nguyen.",
  },
  {
    id: 4,
    title: "House M.D.",
    genre: "Drama médico / Misterio",
    seasons: 8,
    platform: "Prime Video / Max",
    rating: 8.7,
    image: "https://static.tvmaze.com/uploads/images/original_untouched/357/894990.jpg",
    description:
      "El Dr. Gregory House es un genio médico inconformista, cínico y adicto a los analgésicos que lidera un equipo de diagnóstico en el hospital Princeton-Plainsboro, resolviendo los casos clínicos más extraños donde todos los demás doctores fallan.",
  },
  {
    id: 5,
    title: "The Mentalist",
    genre: "Policial / Misterio",
    seasons: 7,
    platform: "Max / Prime Video",
    rating: 8.2,
    image: "https://static.tvmaze.com/uploads/images/original_untouched/0/1239.jpg",
    description:
      "Patrick Jane es un exmédium fraudulento con excepcionales dotes de observación y deducción psicológica. Trabaja como consultor de la brigada criminal de California (CBI) para resolver crímenes y dar caza al escurridizo asesino en serie Red John, responsable de la muerte de su esposa e hija.",
  },
  {
    id: 6,
    title: "Jujutsu Kaisen",
    genre: "Anime / Acción / Sobrenatural",
    seasons: 2,
    platform: "Crunchyroll / Netflix",
    rating: 8.6,
    image: "https://static.tvmaze.com/uploads/images/original_untouched/608/1521905.jpg",
    description:
      "Yuji Itadori es un estudiante de secundaria con destrezas físicas extraordinarias que, para salvar a sus amigos de una maldición, consume un dedo putrefacto del legendario Rey de las Maldiciones, Ryomen Sukuna, ingresando al mundo de los hechiceros jujutsu.",
  },
];
