// Datos del Álbum Panini FIFA World Cup 2026™
// Estructura: 20 láminas por selección — 1 escudo (nº1), 18 jugadores (nº2-12 y nº14-20), 1 foto grupal (nº13)
// Fuente: checklist oficial Panini / grupos confirmados tras repechaje (abril 2026)

const crearLaminas = (codigo, jugadores) => {
  const laminas = [
    { id: `${codigo}-1`, numero: 1, tipo: "escudo", nombre: "Escudo oficial" },
  ]
  // Jugadores 2–12 (primeros 11)
  jugadores.slice(0, 11).forEach((nombre, i) => {
    laminas.push({ id: `${codigo}-${i + 2}`, numero: i + 2, tipo: "jugador", nombre })
  })
  // Foto de equipo en la posición 13
  laminas.push({ id: `${codigo}-13`, numero: 13, tipo: "especial", nombre: "Foto de equipo" })
  // Jugadores 14–20 (siguientes 7)
  jugadores.slice(11).forEach((nombre, i) => {
    laminas.push({ id: `${codigo}-${i + 14}`, numero: i + 14, tipo: "jugador", nombre })
  })
  return laminas
}

// ─── Sección FWC (láminas del torneo) ────────────────────────────────────────
export const seccionFWC = {
  id: "FWC",
  nombre: "FIFA World Cup 2026",
  grupo: null,
  continente: "FWC",
  laminas: [
    { id: "FWC-00",  numero: "00",     tipo: "especial", nombre: "Portada del álbum" },
    { id: "FWC-01",  numero: "FWC 01", tipo: "especial", nombre: "Emblema oficial" },
    { id: "FWC-02",  numero: "FWC 02", tipo: "especial", nombre: "Emblema oficial" },
    { id: "FWC-03",  numero: "FWC 03", tipo: "especial", nombre: "Official Mascots" },
    { id: "FWC-04",  numero: "FWC 04", tipo: "especial", nombre: "Official Slogan" },
    { id: "FWC-05",  numero: "FWC 05", tipo: "especial", nombre: "Official Ball" },
    { id: "FWC-06",  numero: "FWC 06", tipo: "especial", nombre: "Host Country Emblem Canada" },
    { id: "FWC-07",  numero: "FWC 07", tipo: "especial", nombre: "Host Country Emblem Mexico" },
    { id: "FWC-08",  numero: "FWC 08", tipo: "especial", nombre: "Host Country Emblem USA" },
    { id: "FWC-09",  numero: "FWC 09", tipo: "especial", nombre: "FIFA World Cup Italy 1934" },
    { id: "FWC-10",  numero: "FWC 10", tipo: "especial", nombre: "FIFA World Cup Brazil 1950" },
    { id: "FWC-11",  numero: "FWC 11", tipo: "especial", nombre: "FIFA World Cup Switzerland 1954" },
    { id: "FWC-12",  numero: "FWC 12", tipo: "especial", nombre: "FIFA World Cup Chile 1962" },
    { id: "FWC-13",  numero: "FWC 13", tipo: "especial", nombre: "FIFA World Cup Germany 1974" },
    { id: "FWC-14",  numero: "FWC 14", tipo: "especial", nombre: "FIFA World Cup Mexico 1986" },
    { id: "FWC-15",  numero: "FWC 15", tipo: "especial", nombre: "FIFA World Cup USA 1994" },
    { id: "FWC-16",  numero: "FWC 16", tipo: "especial", nombre: "FIFA World Cup Korea/Japan 2002" },
    { id: "FWC-17",  numero: "FWC 17", tipo: "especial", nombre: "FIFA World Cup Germany 2006" },
    { id: "FWC-18",  numero: "FWC 18", tipo: "especial", nombre: "FIFA World Cup Brazil 2014" },
    { id: "FWC-19",  numero: "FWC 19", tipo: "especial", nombre: "FIFA World Cup Qatar 2022" },
  ],
}

export const selecciones = [
  // ─── GRUPO A ─────────────────────────────────────────────────
  {
    id: "MEX",
    nombre: "México",
    grupo: "A",
    continente: "CONCACAF",
    laminas: crearLaminas("MEX", [
      "Luis Malagón", "Johan Vásquez", "Jorge Sánchez", "César Montes",
      "Jesús Gallardo", "Israel Reyes", "Diego Lainez", "Carlos Rodríguez",
      "Edson Álvarez", "Orbelín Pineda", "Marcel Ruiz", "Erick Sánchez",
      "Hirving Lozano", "Santiago Giménez", "Raúl Jiménez", "Alexis Vega",
      "Roberto Alvarado", "César Huerta",
    ]),
  },
  {
    id: "ZAF",
    nombre: "Sudáfrica",
    grupo: "A",
    continente: "CAF",
    laminas: crearLaminas("ZAF", [
      "Ronwen Williams", "Sipho Chaine", "Aubrey Modiba", "Samukele Kabini",
      "Mbekezeli Mbokazi", "Khulumani Ndamane", "Siyabonga Ngezana", "Khuliso Mudau",
      "Nkosinathi Sibisi", "Teboho Mokoena", "Thalente Mbatha", "Bathusi Aubaas",
      "Yaya Sithole", "Sipho Mbule", "Lyle Foster", "Iqraam Rayners",
      "Mohau Nkota", "Oswin Appollis",
    ]),
  },
  {
    id: "KOR",
    nombre: "Corea del Sur",
    grupo: "A",
    continente: "AFC",
    laminas: crearLaminas("KOR", [
      "Hyeon-woo Jo", "Seung-Gyu Kim", "Min-jae Kim", "Yu-min Cho",
      "Young-woo Seol", "Han-beom Lee", "Tae-seok Lee", "Myung-jae Lee",
      "In-beom Hwang", "Jae-sung Lee", "Kang-in Lee", "Seung-ho Paik",
      "Woo-yeong Jeong", "Hee-chan Hwang", "Hyeon-gyu Oh", "Sang-ho Na",
      "Jin-gyu Kim", "Heung-min Son",
    ]),
  },
  {
    id: "CZE",
    nombre: "Chequia",
    grupo: "A",
    continente: "UEFA",
    laminas: crearLaminas("CZE", [
      "Matěj Kovář", "Jindřich Staněk", "Tomáš Holeš", "David Zima",
      "Robin Hranáč", "Václav Jemelka", "Vladimír Coufal", "Tomáš Souček",
      "Lukáš Červ", "Pavel Šulc", "Václav Černý", "Alex Král",
      "Adam Hložek", "Patrik Schick", "Jan Kliment", "Tomáš Chorý",
      "Lukáš Provod", "Pavel Kadeřábek",
    ]),
  },

  // ─── GRUPO B ─────────────────────────────────────────────────
  {
    id: "CAN",
    nombre: "Canadá",
    grupo: "B",
    continente: "CONCACAF",
    laminas: crearLaminas("CAN", [
      "Dayne St. Clair", "Maxime Crépeau", "Alphonso Davies", "Derek Cornelius",
      "Moïse Bombito", "Alistair Johnston", "Richie Laryea", "Ismaël Koné",
      "Stephen Eustáquio", "Jonathan Osorio", "Mathieu Choinière", "Tajon Buchanan",
      "Ali Ahmed", "Jonathan David", "Cyle Larin", "Tani Oluwaseyi",
      "Promise David", "Nathan Saliba",
    ]),
  },
  {
    id: "BIH",
    nombre: "Bosnia y Herzegovina",
    grupo: "B",
    continente: "UEFA",
    laminas: crearLaminas("BIH", [
      "Nikola Vasilj", "Amar Dedić", "Sead Kolašinac", "Tarik Muharemović",
      "Nihad Mujakić", "Nikola Katić", "Amir Hadžiahmetović", "Benjamin Tahirović",
      "Armin Gigović", "Ivan Šunjić", "Ivan Bašić", "Dženis Burnić",
      "Esmir Bajraktarevic", "Amar Memić", "Ermedin Demirović", "Edin Džeko",
      "Samed Baždar", "Haris Tabaković",
    ]),
  },
  {
    id: "QAT",
    nombre: "Qatar",
    grupo: "B",
    continente: "AFC",
    laminas: crearLaminas("QAT", [
      "Meshaal Barsham", "Saad Al-Sheeb", "Bassam Al-Rawi", "Abdelkarim Hassan",
      "Tarek Salman", "Homam Ahmed", "Karim Boudiaf", "Abdulaziz Hatem",
      "Akram Afif", "Almoez Ali", "Hassan Al-Haydos", "Ismaeel Mohammad",
      "Yusuf Abdurisag", "Salem Al-Hajri", "Ahmad Moein", "Pedro Miguel",
      "Assim Madibo", "Boualem Khoukhi",
    ]),
  },
  {
    id: "SUI",
    nombre: "Suiza",
    grupo: "B",
    continente: "UEFA",
    laminas: crearLaminas("SUI", [
      "Gregor Kobel", "Yvon Mvogo", "Manuel Akanji", "Ricardo Rodríguez",
      "Nico Elvedi", "Aurèle Amenda", "Silvan Widmer", "Granit Xhaka",
      "Denis Zakaria", "Remo Freuler", "Fabian Rieder", "Ardon Jashari",
      "Johan Manzambi", "Michel Aebischer", "Breel Embolo", "Ruben Vargas",
      "Dan Ndoye", "Zeki Amdouni",
    ]),
  },

  // ─── GRUPO C ─────────────────────────────────────────────────
  {
    id: "BRA",
    nombre: "Brasil",
    grupo: "C",
    continente: "CONMEBOL",
    laminas: crearLaminas("BRA", [
      "Alisson", "Bento", "Marquinhos", "Éder Militão",
      "Gabriel Magalhães", "Danilo", "Wesley", "Lucas Paquetá",
      "Casemiro", "Bruno Guimarães", "Luiz Henrique", "Vinícius Júnior",
      "Rodrygo", "João Pedro", "Matheus Cunha", "Gabriel Martinelli",
      "Raphinha", "Estevão",
    ]),
  },
  {
    id: "MAR",
    nombre: "Marruecos",
    grupo: "C",
    continente: "CAF",
    laminas: crearLaminas("MAR", [
      "Yassine Bounou", "Noussair El Kaabi", "Achraf Hakimi", "Noussair Mazraoui",
      "Nayef Aguerd", "Romain Saïss", "Jawad El Yamiq", "Adam Masina",
      "Sofyan Amrabat", "Azzedine Ounahi", "Eliesse Ben Seghir", "Bilal El Khannouss",
      "Ismael Saibari", "Youssef En-Nesyri", "Abde Ezzalzouli", "Soufiane Rahimi",
      "Brahim Díaz", "Ayoub El Kaabi",
    ]),
  },
  {
    id: "HAI",
    nombre: "Haití",
    grupo: "C",
    continente: "CONCACAF",
    laminas: crearLaminas("HAI", [
      "Johny Placide", "Carlens Arcus", "Martin Expérience", "Jean-Kévin Duverne",
      "Ricardo Adé", "Duke Lacroix", "Garven Metusala", "Hannes Delcroix",
      "Leverton Pierre", "Danley Jean-Jacques", "Jean-Pierre Bellegrade", "Christopher Attys",
      "Derrick Etienne Jr.", "Josué Casimir", "Ruben Providence", "Duckens Nazon",
      "Louicius Deedson", "Frantzdy Pierrot",
    ]),
  },
  {
    id: "SCO",
    nombre: "Escocia",
    grupo: "C",
    continente: "UEFA",
    laminas: crearLaminas("SCO", [
      "Angus Gunn", "Jack Hendry", "Kieran Tierney", "Aaron Hickey",
      "Andrew Robertson", "Scott McKenna", "John Souttar", "Anthony Ralston",
      "Grant Hanley", "Scott McTominay", "Billy Gilmour", "Lewis Ferguson",
      "Ryan Christie", "Kenny McLean", "John McGinn", "Lyndon Dykes",
      "Che Adams", "Ben Doak",
    ]),
  },

  // ─── GRUPO D ─────────────────────────────────────────────────
  {
    id: "USA",
    nombre: "Estados Unidos",
    grupo: "D",
    continente: "CONCACAF",
    laminas: crearLaminas("USA", [
      "Matt Freese", "Chris Richards", "Tim Ream", "Mark McKenzie",
      "Alex Freeman", "Antonee Robinson", "Tyler Adams", "Tanner Tessmann",
      "Weston McKennie", "Destan Craigton", "Timothy Weah", "Caden Clark",
      "Malik Tillman", "Christian Pulisic", "Brenden Aaronson", "Ricardo Pepi",
      "Haji Wright", "Folarin Balogun",
    ]),
  },
  {
    id: "PAR",
    nombre: "Paraguay",
    grupo: "D",
    continente: "CONMEBOL",
    laminas: crearLaminas("PAR", [
      "Roberto Fernández", "Orlando Gill", "Gustavo Gómez", "Fabián Balbuena",
      "Juan José Cáceres", "Omar Alderete", "Junior Alonso", "Mathías Villasanti",
      "Diego Gómez", "Damián Bobadilla", "Andrés Cubas", "Matías Galarza Fonda",
      "Julio Enciso", "Alejandro Romero Gamarra", "Miguel Almirón", "Ramón Sosa",
      "Ángel Romero", "Antonio Sanabria",
    ]),
  },
  {
    id: "AUS",
    nombre: "Australia",
    grupo: "D",
    continente: "AFC",
    laminas: crearLaminas("AUS", [
      "Mathew Ryan", "Joe Gauci", "Harry Souttar", "Alessandro Circati",
      "Jordan Bos", "Aziz Behich", "Cameron Burgess", "Lewis Miller",
      "Milos Degenek", "Jackson Irvine", "Riley McGree", "Aiden O'Neill",
      "Connor Metcalfe", "Patrick Yazbek", "Craig Goodwin", "Kusini Yengi",
      "Nestory Irankunda", "Mohamed Toure",
    ]),
  },
  {
    id: "TUR",
    nombre: "Turquía",
    grupo: "D",
    continente: "UEFA",
    laminas: crearLaminas("TUR", [
      "Uğurcan Çakır", "Mert Müldür", "Zeki Çelik", "Abdülkerim Bardakcı",
      "Çağlar Söyüncü", "Merih Demiral", "Ferdi Kadıoğlu", "Kaan Ayhan",
      "İsmail Yüksek", "Hakan Çalhanoğlu", "Orkun Kökçü", "Arda Güler",
      "İrfan Can Kahveci", "Yunus Akgün", "Can Uzun", "Barış Alper Yılmaz",
      "Kerem Aktürkoğlu", "Bertuğ Yıldırım",
    ]),
  },

  // ─── GRUPO E ─────────────────────────────────────────────────
  {
    id: "GER",
    nombre: "Alemania",
    grupo: "E",
    continente: "UEFA",
    laminas: crearLaminas("GER", [
      "Marc-André ter Stegen", "Jonathan Tah", "David Raum", "Nico Schlotterbeck",
      "Antonio Rüdiger", "Waldemar Anton", "Ridle Baku", "Maximilian Mittelstädt",
      "Joshua Kimmich", "Florian Wirtz", "Felix Nmecha", "Leon Goretzka",
      "Jamal Musiala", "Serge Gnabry", "Kai Havertz", "Leroy Sané",
      "Karim Adeyemi", "Nick Woltemade",
    ]),
  },
  {
    id: "CUW",
    nombre: "Curazao",
    grupo: "E",
    continente: "CONCACAF",
    laminas: crearLaminas("CUW", [
      "Eloy Room", "Armando Obispo", "Sherel Floranus", "Jurien Gaari",
      "Joshua Brenet", "Roshon van Eijma", "Shurendy Sambo", "Livano Comenencia",
      "Godfried Roemeratoe", "Juninho Bacuna", "Leandro Bacuna", "Taith Chong",
      "Kenji Gorré", "Jearl Margaritha", "Jeremy Antonisse", "Jeremy Antonisse",
      "Gervane Kastaneer", "Jürgen Locadia",
    ]),
  },
  {
    id: "CIV",
    nombre: "Costa de Marfil",
    grupo: "E",
    continente: "CAF",
    laminas: crearLaminas("CIV", [
      "Yahia Fofana", "Christian Kouamé", "Wilfried Singo", "Odilon Kossounou",
      "Evan Ndicka", "Willy Boly", "Emmanuel Agbadou", "Ousmane Diomandé",
      "Franck Kessié", "Seko Fofana", "Ibrahim Sangaré", "Jean-Philippe Gbamin",
      "Amad Diallo", "Sébastien Haller", "Simon Adingra", "Vakoun Bayo",
      "Evann Guessand", "Oumar Diakité",
    ]),
  },
  {
    id: "ECU",
    nombre: "Ecuador",
    grupo: "E",
    continente: "CONMEBOL",
    laminas: crearLaminas("ECU", [
      "Hernán Galíndez", "Gonzalo Valle", "Piero Hincapié", "Pervis Estupiñán",
      "Willian Pacho", "Angelo Preciado", "Joel Ordóñez", "Moisés Caicedo",
      "Alan Franco", "Kendry Páez", "Pedro Vite", "John Yeboah",
      "Leonardo Campana", "Gonzalo Plata", "Keny Arroyo", "Alan Minda",
      "Kevin Rodríguez", "Enner Valencia",
    ]),
  },

  // ─── GRUPO F ─────────────────────────────────────────────────
  {
    id: "NED",
    nombre: "Países Bajos",
    grupo: "F",
    continente: "UEFA",
    laminas: crearLaminas("NED", [
      "Bart Verbruggen", "Virgil van Dijk", "Micky van de Ven", "Jurriën Timber",
      "Denzel Dumfries", "Marten de Roon", "Jeremie Frimpong", "Jorrel Hato",
      "Tijjani Reijnders", "Ryan Gravenberch", "Teun Koopmeiners", "Frenkie de Jong",
      "Xavi Simons", "Justin Kluivert", "Memphis Depay", "Donyell Malen",
      "Wout Weghorst", "Cody Gakpo",
    ]),
  },
  {
    id: "JPN",
    nombre: "Japón",
    grupo: "F",
    continente: "AFC",
    laminas: crearLaminas("JPN", [
      "Zion Suzuki", "Hiroki Machida", "Ayumu Seko", "Junnosuke Suzuki",
      "Shogo Taniguchi", "Tsuyoshi Watanabe", "Kaishu Sano", "Yuki Soma",
      "Ao Tanaka", "Daichi Kamada", "Takefusa Kubo", "Ritsu Dōan",
      "Keito Nakamura", "Takumi Minamino", "Shuto Machino", "Junya Ito",
      "Koki Ogawa", "Ayase Ueda",
    ]),
  },
  {
    id: "SWE",
    nombre: "Suecia",
    grupo: "F",
    continente: "UEFA",
    laminas: crearLaminas("SWE", [
      "Viktor Johansson", "Isak Hien", "Gabriel Gudmundsson", "Emil Holm",
      "Victor Nilsson Lindelöf", "Gustaf Lagerbielke", "Lucas Bergvall", "Hugo Larsson",
      "Jesper Karlström", "Yasin Ayari", "Mattias Svanberg", "Daniel Svensson",
      "Ken Sema", "Roony Bardghji", "Dejan Kulusevski", "Anthony Elanga",
      "Alexander Isak", "Viktor Gyökeres",
    ]),
  },
  {
    id: "TUN",
    nombre: "Túnez",
    grupo: "F",
    continente: "CAF",
    laminas: crearLaminas("TUN", [
      "Bechir Ben Saïd", "Aymen Dahmen", "Yan Valery", "Montassar Talbi",
      "Yassine Meriah", "Ali Abdi", "Dylan Bronn", "Ellyes Skhiri",
      "Ali Abdi Laïdouni", "Ferjani Sassi", "Mohamed Ali Ben Romdhane", "Hannibal Mejbri",
      "Elias Achouri", "Elias Saad", "Hazem Mastouri", "Ismaël Gharbi",
      "Saifallah Ltaief", "Hazem Mastouri Sassi",
    ]),
  },

  // ─── GRUPO G ─────────────────────────────────────────────────
  {
    id: "BEL",
    nombre: "Bélgica",
    grupo: "G",
    continente: "UEFA",
    laminas: crearLaminas("BEL", [
      "Thibaut Courtois", "Koen Casteels", "Wout Faes", "Arthur Theate",
      "Timothy Castagne", "Leandro Trossard", "Kevin De Bruyne", "Youri Tielemans",
      "Amadou Onana", "Alexis Saelemaekers", "Dodi Lukebakio", "Romelu Lukaku",
      "Loïs Openda", "Jeremy Doku", "Charles De Ketelaere", "Thomas Meunier",
      "Johan Bakayoko", "Orel Mangala",
    ]),
  },
  {
    id: "EGY",
    nombre: "Egipto",
    grupo: "G",
    continente: "CAF",
    laminas: crearLaminas("EGY", [
      "Mohamed El-Shenawy", "Ahmed El-Shenawy", "Ahmed Hegazi", "Omar Kamal Galal",
      "Ayman Ashraf", "Ahmed Fatouh", "Hamdi Fathi", "Tarek Hamed",
      "Emam Ashour", "Amr El-Sulaya", "Mohamed Salah", "Omar Marmoush",
      "Marwan Hamdy", "Mustafa Mohamed", "Mahmoud Trezeguet", "Ahmed El-Sheikh",
      "Zizo", "Karim El-Eraky",
    ]),
  },
  {
    id: "IRN",
    nombre: "Irán",
    grupo: "G",
    continente: "AFC",
    laminas: crearLaminas("IRN", [
      "Alireza Beiranvand", "Payam Niazmand", "Shoja Khalilzadeh", "Majid Hosseini",
      "Morteza Pouraliganji", "Ehsan Hajsafi", "Ali Gholizadeh", "Saeid Ezatolahi",
      "Mehdi Torabi", "Ahmad Nourollahi", "Alireza Jahanbakhsh", "Sardar Azmoun",
      "Mehdi Taremi", "Saman Ghoddos", "Milad Mohammadi", "Allahyar Sayyad",
      "Ramin Rezaeian", "Karim Ansarifard",
    ]),
  },
  {
    id: "NZL",
    nombre: "Nueva Zelanda",
    grupo: "G",
    continente: "OFC",
    laminas: crearLaminas("NZL", [
      "Stefan Marinovic", "Michael Woud", "Tommy Smith", "Winston Reid",
      "Michael Boxall", "Tim Payne", "Liberato Cacace", "Ryan Thomas",
      "Joe Bell", "Logan Rogerson", "Marko Stamenic", "Chris Wood",
      "Sarpreet Singh", "Elijah Just", "Matthew Garbett", "Clayton Lewis",
      "Alex Greive", "Dane Ingham",
    ]),
  },

  // ─── GRUPO H ─────────────────────────────────────────────────
  {
    id: "ESP",
    nombre: "España",
    grupo: "H",
    continente: "UEFA",
    laminas: crearLaminas("ESP", [
      "Unai Simón", "David Raya", "Dani Carvajal", "Pau Cubarsí",
      "Aymeric Laporte", "Alejandro Grimaldo", "Marc Cucurella", "Rodri",
      "Pedri", "Fabián Ruiz", "Dani Olmo", "Lamine Yamal",
      "Nico Williams", "Álvaro Morata", "Mikel Oyarzabal", "Ferran Torres",
      "Gavi", "Ansu Fati",
    ]),
  },
  {
    id: "CPV",
    nombre: "Cabo Verde",
    grupo: "H",
    continente: "CAF",
    laminas: crearLaminas("CPV", [
      "Vozinha", "Logan Costa", "Pico", "Diney",
      "Steven Moreira", "Wagner Pina", "João Paulo", "Yannick Semedo",
      "Kevin Pina", "Patrick Andrade", "Jamiro Monteiro", "Deroy Duarte",
      "Garry Rodrigues", "Jovane Cabral", "Ryan Mendes", "Dailon Livramento",
      "Willy Semedo", "Bebe",
    ]),
  },
  {
    id: "KSA",
    nombre: "Arabia Saudita",
    grupo: "H",
    continente: "AFC",
    laminas: crearLaminas("KSA", [
      "Nawaf Alaqidi", "Abdulrahman Alsafi", "Saud Abdulhamid", "Nawaf Boushal",
      "Jihad Thakri", "Moteb Alharbi", "Hassan Altambakti", "Musab Aljuwavr",
      "Ziyad Aljohani", "Abdullah Alkhaibari", "Nasser Aldawsari", "Saleh Abu Alshamat",
      "Marwan Alsahafi", "Salem Aldawsari", "Abdulrahman Alobud", "Feras Albrikan",
      "Saleh Alshehri", "Abdullah Alhamdan",
    ]),
  },
  {
    id: "URU",
    nombre: "Uruguay",
    grupo: "H",
    continente: "CONMEBOL",
    laminas: crearLaminas("URU", [
      "Sergio Rochet", "Santiago Mélé", "Ronald Araújo", "José María Giménez",
      "Sebastián Cáceres", "Mathías Olivera", "Guillermo Varela", "Nahitan Nández",
      "Federico Valverde", "Giorgian De Arrascaeta", "Rodrigo Bentancur", "Manuel Ugarte",
      "Nicolás De La Cruz", "Maximiliano Araújo", "Darwin Núñez", "Federico Viñas",
      "Rodrigo Aguirre", "Facundo Pellistri",
    ]),
  },

  // ─── GRUPO I ─────────────────────────────────────────────────
  {
    id: "FRA",
    nombre: "Francia",
    grupo: "I",
    continente: "UEFA",
    laminas: crearLaminas("FRA", [
      "Mike Maignan", "Theo Hernández", "William Saliba", "Jules Koundé",
      "Ibrahima Konaté", "Dayot Upamecano", "Lucas Digne", "Aurélien Tchouaméni",
      "Eduardo Camavinga", "Manu Koné", "Adrien Rabiot", "Michael Olise",
      "Ousmane Dembélé", "Bradley Barcola", "Désiré Doué", "Kingsley Coman",
      "Hugo Ekitiké", "Kylian Mbappé",
    ]),
  },
  {
    id: "NOR",
    nombre: "Noruega",
    grupo: "I",
    continente: "UEFA",
    laminas: crearLaminas("NOR", [
      "Ørjan Nyland", "Julian Ryerson", "Leo Østigård", "Kristoffer Ajer",
      "Marcus Holmgren Pedersen", "David Møller Wolfe", "Torbjørn Heggem", "Morten Thorsby",
      "Martin Ødegaard", "Sander Berge", "Andreas Schjelderup", "Patrick Berg",
      "Erling Haaland", "Alexander Sørloth", "Aron Dønnum", "Jørgen Strand Larsen",
      "Antonio Nusa", "Oscar Bobb",
    ]),
  },
  {
    id: "SEN",
    nombre: "Senegal",
    grupo: "I",
    continente: "CAF",
    laminas: crearLaminas("SEN", [
      "Boubacar Mendy", "Formose Mendy", "Moussa Niakhaté", "Abdoulaye Seck",
      "Ismail Jakobs", "El Hadji Malick Diouf", "Khalidou Koulibaly", "Idrissa Gana Gueye",
      "Pape Matar Sarr", "Pape Gueye", "Habib Diarra", "Lamine Camara",
      "Sadio Mané", "Ismaïla Sarr", "Boulaye Dia", "Nicolas Ndiaye",
      "Nicolas Jackson", "Iliman Ndiaye",
    ]),
  },
  {
    id: "IRQ",
    nombre: "Irak",
    grupo: "I",
    continente: "AFC",
    laminas: crearLaminas("IRQ", [
      "Jalal Hassan", "Rebin Sulaka", "Hussein Ali", "Akam Hashem",
      "Merchas Doski", "Zaid Tahseen", "Manaf Younis", "Zidane Iqbal",
      "Amir Al-Ammari", "Ibrahim Bayesh", "Ali Jasim", "Youssef Amyn",
      "Amar Shakir", "Mohanad Ali", "Aymen Hussein", "Ali Al-Hamadi",
      "Hassan Hussein", "Mahdi Al-Mawhoub",
    ]),
  },

  // ─── GRUPO J ─────────────────────────────────────────────────
  {
    id: "ARG",
    nombre: "Argentina",
    grupo: "J",
    continente: "CONMEBOL",
    laminas: crearLaminas("ARG", [
      "Emiliano Martínez", "Nahuel Molina", "Cristian Romero", "Nicolás Otamendi",
      "Nicolás Tagliafico", "Leonardo Balerdi", "Enzo Fernández", "Alexis Mac Allister",
      "Rodrigo De Paul", "Exequiel Palacios", "Leandro Paredes", "Nico Paz",
      "Franco Mastantuono", "Nico González", "Lionel Messi", "Lautaro Martínez",
      "Julián Álvarez", "Giuliano Simeone",
    ]),
  },
  {
    id: "ALG",
    nombre: "Argelia",
    grupo: "J",
    continente: "CAF",
    laminas: crearLaminas("ALG", [
      "Alexandre Oukidja", "Ramy Bensebaini", "Youcef Atal", "Rayan Aït-Nouri",
      "Mohamed Amine Tougai", "Aïssa Mandi", "Ismaël Bennacer", "Houssem Aouar",
      "Hicham Boudaoui", "Ramiz Zerrouki", "Nabil Bentaleb", "Farès Chaïbi",
      "Riyad Mahrez", "Saïd Benrahma", "Anis Hadj Moussa", "Amine Gouiri",
      "Baghdad Bounedjah", "Mohamed Amoura",
    ]),
  },
  {
    id: "AUT",
    nombre: "Austria",
    grupo: "J",
    continente: "UEFA",
    laminas: crearLaminas("AUT", [
      "Alexander Schlager", "Patrick Pentz", "David Alaba", "Kevin Danso",
      "Phillipp Lienhart", "Stefan Posch", "Phillipp Mwene", "Alexander Prass",
      "Xaver Schlager", "Marcel Sabitzer", "Konrad Laimer", "Florian Grillitsch",
      "Nicolas Seiwald", "Romano Schmid", "Patrick Wimmer", "Christoph Baumgartner",
      "Michael Gregoritsch", "Marko Arnautović",
    ]),
  },
  {
    id: "JOR",
    nombre: "Jordania",
    grupo: "J",
    continente: "AFC",
    laminas: crearLaminas("JOR", [
      "Yazeed Abulaila", "Ihsan Haddad", "Mohammad Abu Hashish", "Yazan Al-Arab",
      "Abdallah Nasib", "Salem Obaid", "Mohammad Abu Nadi", "Ibrahim Sadeh",
      "Yazeed Al-Rashdi", "Noor Al-Rawabdeh", "Mohammad Abu Taha", "Amer Jamous",
      "Mousa Al-Taamari", "Yazan Al-Naimat", "Mahmoud Al-Mardi", "Ali Olwan",
      "Mohammad Abu Zrayq", "Baha Faisal",
    ]),
  },

  // ─── GRUPO K ─────────────────────────────────────────────────
  {
    id: "POR",
    nombre: "Portugal",
    grupo: "K",
    continente: "UEFA",
    laminas: crearLaminas("POR", [
      "Diogo Costa", "José Sá", "Rúben Dias", "João Cancelo",
      "Diogo Dalot", "Nuno Mendes", "Gonçalo Inácio", "Bernardo Silva",
      "Bruno Fernandes", "Rúben Neves", "Vitinha", "João Neves",
      "Cristiano Ronaldo", "Francisco Trincão", "João Félix", "Gonçalo Ramos",
      "Pedro Neto", "Rafael Leão",
    ]),
  },
  {
    id: "COD",
    nombre: "RD Congo",
    grupo: "K",
    continente: "CAF",
    laminas: crearLaminas("COD", [
      "Lionel Mpasi", "Aaron Wan-Bissaka", "Axel Tuanzebe", "Arthur Masuaku",
      "Chancel Mbemba", "Joris Kayembe", "Charles Pickel", "Ngal'Ayel Mukau",
      "Edo Kayembe", "Samuel Moutoussamy", "Noah Sadiki", "Théo Bongonda",
      "Meschack Elia", "Yoane Wissa", "Bryan Bayeye", "Fiston Mayele",
      "Cédric Bakambu", "Nathanaël Mbuku",
    ]),
  },
  {
    id: "UZB",
    nombre: "Uzbekistán",
    grupo: "K",
    continente: "AFC",
    laminas: crearLaminas("UZB", [
      "Utkir Yusupov", "Farrukh Sayfiev", "Sherzod Nasrullaev", "Umar Eshmurodov",
      "Husniddin Aliqulov", "Rustam Ashurmatov", "Khojiakbar Alijonov", "Abdukodir Khusanov",
      "Odiljon Hamrobekov", "Otabek Shukurov", "Jaloliddin Iskanderov", "Azizbek Turgunboev",
      "Khojimat Erkinov", "Eldor Shomurodov", "Oston Urunov", "Jaloliddin Masharipov",
      "Igor Sergeev", "Abbosbek Fayzullaev",
    ]),
  },
  {
    id: "COL",
    nombre: "Colombia",
    grupo: "K",
    continente: "CONMEBOL",
    laminas: crearLaminas("COL", [
      "Camilo Vargas", "David Ospina", "Davinson Sánchez", "Yerry Mina",
      "Daniel Muñoz", "Jhon Mojica", "Jhon Lucumí", "Santiago Arias",
      "Jefferson Lerma", "Kevin Castaño", "Richard Ríos", "James Rodríguez",
      "Juan Fernando Quintero", "Jorge Carrascal", "Jhon Arias", "Jhon Córdoba",
      "Luis Suárez", "Luis Díaz",
    ]),
  },

  // ─── GRUPO L ─────────────────────────────────────────────────
  {
    id: "ENG",
    nombre: "Inglaterra",
    grupo: "L",
    continente: "UEFA",
    laminas: crearLaminas("ENG", [
      "Jordan Pickford", "John Stones", "Marc Guéhi", "Ezri Konsa",
      "Trent Alexander-Arnold", "Reece James", "Dan Burn", "Jordan Henderson",
      "Declan Rice", "Jude Bellingham", "Cole Palmer", "Morgan Rogers",
      "Anthony Gordon", "Phil Foden", "Bukayo Saka", "Harry Kane",
      "Marcus Rashford", "Ollie Watkins",
    ]),
  },
  {
    id: "CRO",
    nombre: "Croacia",
    grupo: "L",
    continente: "UEFA",
    laminas: crearLaminas("CRO", [
      "Dominik Livaković", "Duje Ćaleta-Car", "Joško Gvardiol", "Josip Stanišić",
      "Luka Vušković", "Josip Šutalo", "Kristijan Jakić", "Luka Modrić",
      "Mateo Kovačić", "Martin Baturina", "Lovro Majer", "Mario Pašalić",
      "Petar Sučić", "Ivan Perišić", "Marco Pašalić", "Ante Budimir",
      "Andrej Kramarić", "Franjo Ivanović",
    ]),
  },
  {
    id: "GHA",
    nombre: "Ghana",
    grupo: "L",
    continente: "CAF",
    laminas: crearLaminas("GHA", [
      "Lawrence Ati-Zigi", "Tariq Lamptey", "Mohammed Salisu", "Alidu Seidu",
      "Alexander Djiku", "Gideon Mensah", "Caleb Yirenkyi", "Abdul Issahaku Fatawu",
      "Thomas Partey", "Salis Abdul Samed", "Kamaldeen Sulemana", "Mohammed Kudus",
      "Iñaki Williams", "Jordan Ayew", "André Ayew", "Joseph Paintsil",
      "Osman Bukari", "Antoine Semenyo",
    ]),
  },
  {
    id: "PAN",
    nombre: "Panamá",
    grupo: "L",
    continente: "CONCACAF",
    laminas: crearLaminas("PAN", [
      "Orlando Mosquera", "Luis Mejía", "Fidel Escobar", "Andrés Andrade",
      "Michael Amir Murillo", "Eric Davis", "José Córdoba", "César Blackman",
      "Cristian Martínez", "Aníbal Godoy", "Adalberto Carrasquilla", "Edgar Bárcenas",
      "Carlos Harvey", "Ismael Díaz", "José Fajardo", "Cecilio Waterman",
      "José Luis Rodríguez", "Alberto Quintero",
    ]),
  },
]

// Helpers de consulta
export const getSeleccionById = (id) =>
  id === 'FWC' ? seccionFWC : selecciones.find((s) => s.id === id)

export const getSeleccionesByGrupo = (grupo) =>
  selecciones.filter((s) => s.grupo === grupo)

export const getSeleccionesByContinente = (continente) =>
  selecciones.filter((s) => s.continente === continente)

export const GRUPOS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]

export const CONTINENTES = ["CONMEBOL", "UEFA", "CONCACAF", "CAF", "AFC", "OFC"]
