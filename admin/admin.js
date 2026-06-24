var IMG_W = 2400,
  IMG_H = 1248;
var currentScale = 1;
var activeFilter = "all";
var isPanning = false,
  panSX,
  panSY,
  panSL,
  panST;
var importedHeaders = [],
  importedRows = [];

// Data — loaded from index.html's baked-in data, can be overridden by CSV import
var FINAL_MAP = {
  1: {
    entries: [
      { name: "Anshika Bagla", project: "M-Ocean-Less", space_raw: "1 + 2" },
    ],
    zone: "Amphitheater",
    label: "1",
  },
  2: {
    entries: [
      { name: "Anshika Bagla", project: "M-Ocean-Less", space_raw: "1 + 2" },
    ],
    zone: "Amphitheater",
    label: "2",
  },
  3: {
    entries: [
      {
        name: "Ash Ryan Arnwine",
        project: "Rock With You; Collxn Pulse",
        space_raw: "3 + 4",
      },
    ],
    zone: "Amphitheater",
    label: "3",
  },
  4: {
    entries: [
      {
        name: "Ash Ryan Arnwine",
        project: "Rock With You; Collxn Pulse",
        space_raw: "3 + 4",
      },
    ],
    zone: "Amphitheater",
    label: "4",
  },
  5: {
    entries: [
      {
        name: "Logan Williams",
        project: "More Hats About Buildings and Food",
        space_raw: "5 + 6",
      },
    ],
    zone: "Amphitheater",
    label: "5",
  },
  6: {
    entries: [
      {
        name: "Logan Williams",
        project: "More Hats About Buildings and Food",
        space_raw: "5 + 6",
      },
    ],
    zone: "Amphitheater",
    label: "6",
  },
  7: {
    entries: [
      {
        name: "Steven Keyes",
        project: "Pericon, Patience / Impatience",
        space_raw: "7 + 8",
      },
    ],
    zone: "Amphitheater",
    label: "7",
  },
  8: {
    entries: [
      {
        name: "Steven Keyes",
        project: "Pericon, Patience / Impatience",
        space_raw: "7 + 8",
      },
    ],
    zone: "Amphitheater",
    label: "8",
  },
  9: {
    entries: [{ name: "Julia Chun", project: "Woodwork!", space_raw: "9" }],
    zone: "Amphitheater",
    label: "9",
  },
  10: {
    entries: [{ name: "Erica Du", project: "birdfeeder", space_raw: "10" }],
    zone: "Amphitheater",
    label: "10",
  },
  11: {
    entries: [
      {
        name: "GRACE CAMPIDILLI",
        project: "ORGANIC, CURVED AND POINTY",
        space_raw: "11",
      },
    ],
    zone: "Amphitheater",
    label: "11",
  },
  12: {
    entries: [{ name: "Hillary Leung", project: "shades", space_raw: "12" }],
    zone: "Amphitheater",
    label: "12",
  },
  13: {
    entries: [
      { name: "Taylor Tyson", project: "deconstructed furby", space_raw: "13" },
    ],
    zone: "Amphitheater",
    label: "13",
  },
  14: {
    entries: [
      { name: "Yonatan Rozin", project: "P5 OSC Bridge", space_raw: "14" },
    ],
    zone: "Amphitheater",
    label: "14",
  },
  15: {
    entries: [
      { name: "Kiane Efondo", project: "Cybrholic", space_raw: "15 + 16" },
    ],
    zone: "Amphitheater",
    label: "15",
  },
  16: {
    entries: [
      { name: "Kiane Efondo", project: "Cybrholic", space_raw: "15 + 16" },
    ],
    zone: "Amphitheater",
    label: "16",
  },
  17: {
    entries: [
      {
        name: "Cameron Alexander",
        project: "Various Projects",
        space_raw: "17 + 18",
      },
    ],
    zone: "Amphitheater",
    label: "17",
  },
  18: {
    entries: [
      {
        name: "Cameron Alexander",
        project: "Various Projects",
        space_raw: "17 + 18",
      },
    ],
    zone: "Amphitheater",
    label: "18",
  },
  19: {
    entries: [
      {
        name: "Noah Eisenbruch",
        project: "1) Artifacts 2) How to Unfold an Envelope",
        space_raw: "19 + 20",
      },
    ],
    zone: "Amphitheater",
    label: "19",
  },
  20: {
    entries: [
      {
        name: "Noah Eisenbruch",
        project: "1) Artifacts 2) How to Unfold an Envelope",
        space_raw: "19 + 20",
      },
    ],
    zone: "Amphitheater",
    label: "20",
  },
  21: {
    entries: [
      {
        name: "Hakan Alpay",
        project: "Two players one keyboard",
        space_raw: "21 - 22",
      },
    ],
    zone: "Amphitheater",
    label: "21",
  },
  22: {
    entries: [
      {
        name: "Hakan Alpay",
        project: "Two players one keyboard",
        space_raw: "21 - 22",
      },
    ],
    zone: "Amphitheater",
    label: "22",
  },
  23: {
    entries: [{ name: "Szeyin Lee", project: "A Shy Flower", space_raw: "23" }],
    zone: "Amphitheater",
    label: "23",
  },
  24: {
    entries: [
      {
        name: "Jade Majed BuGhanem",
        project: "Naqsha, Velomind",
        space_raw: "24",
      },
    ],
    zone: "Amphitheater",
    label: "24",
  },
  25: {
    entries: [
      {
        name: "Vas Kottas",
        project: "Checker Checker (analog game/digital assistant)",
        space_raw: "25 & 26",
      },
    ],
    zone: "Amphitheater",
    label: "25",
  },
  26: {
    entries: [
      {
        name: "Vas Kottas",
        project: "Checker Checker (analog game/digital assistant)",
        space_raw: "25 & 26",
      },
    ],
    zone: "Amphitheater",
    label: "26",
  },
  27: {
    entries: [
      { name: "Shy Ruparel", project: "Crane machine", space_raw: "27" },
    ],
    zone: "Amphitheater",
    label: "27",
  },
  28: {
    entries: [{ name: "Cyrene Zhang", project: "stickers!", space_raw: "28" }],
    zone: "Amphitheater",
    label: "28",
  },
  29: {
    entries: [
      { name: "Lauria", project: "Painting Brooklyn", space_raw: "29" },
    ],
    zone: "Amphitheater",
    label: "29",
  },
  30: {
    entries: [
      { name: "Undarmaa Tserenkhuu", project: "Minibuilding", space_raw: "30" },
    ],
    zone: "Amphitheater",
    label: "30",
  },
  31: {
    entries: [
      {
        name: "Eve Shi",
        project: "The Unfixed Face \u2014 a collage oracle system",
        space_raw: "31 + 32",
      },
    ],
    zone: "Craft Corner",
    label: "31",
  },
  32: {
    entries: [
      {
        name: "Eve Shi",
        project: "The Unfixed Face \u2014 a collage oracle system",
        space_raw: "31 + 32",
      },
    ],
    zone: "Craft Corner",
    label: "32",
  },
  53: {
    entries: [
      { name: "Avi Bagla", project: "Type to Pay", space_raw: "53 & 54" },
    ],
    zone: "Craft Corner",
    label: "53",
  },
  54: {
    entries: [
      { name: "Avi Bagla", project: "Type to Pay", space_raw: "53 & 54" },
    ],
    zone: "Craft Corner",
    label: "54",
  },
  55: {
    entries: [
      {
        name: "Nicole Dubin",
        project: "An Exploration of Punchcard Machine Knitting",
        space_raw: "55 & 56",
      },
    ],
    zone: "Craft Corner",
    label: "55",
  },
  56: {
    entries: [
      {
        name: "Nicole Dubin",
        project: "An Exploration of Punchcard Machine Knitting",
        space_raw: "55 & 56",
      },
    ],
    zone: "Craft Corner",
    label: "56",
  },
  61: {
    entries: [
      {
        name: "Jeanette Andrews",
        project: "beep boop blue orbs",
        space_raw: "61",
      },
    ],
    zone: "North Lodge",
    label: "61",
  },
  62: {
    entries: [
      {
        name: "Anah Lewi",
        project: "Affirmations and A Flower Doesn't Bloom Overnight",
        space_raw: "62",
      },
    ],
    zone: "North Lodge",
    label: "62",
  },
  64: {
    entries: [
      {
        name: "Ciri Stowell",
        project: "A Century Within These Walls",
        space_raw: "64",
      },
    ],
    zone: "North Lodge",
    label: "64",
  },
  65: {
    entries: [{ name: "Munro Wyman", project: "Libryinth", space_raw: "65" }],
    zone: "North Lodge",
    label: "65",
  },
  123: {
    entries: [
      { name: "Tala Schlossberg", project: "Remix", space_raw: "123 CABIN 1" },
    ],
    zone: "Cabin 1",
    label: "123",
  },
  68: {
    entries: [
      {
        name: "Mike Lucero",
        project: "Citibike Commute Challenge",
        space_raw: "68",
      },
    ],
    zone: "Amphitheater",
    label: "68",
  },
  66: {
    entries: [
      {
        name: "Neel Dhanesha",
        project: "Ticker Tape Tee-off",
        space_raw: "66",
      },
      {
        name: "Saba Ghazi (point person), Andri Kumar, Akbar Mirza, Isra Ameen",
        project: "Puppet Theater (title tbd)",
        space_raw: "66",
      },
    ],
    zone: "North Lodge",
    label: "66",
    sub_labels: ["66.1", "66.2"],
  },
  71: {
    entries: [
      {
        name: "Issac Alfaro",
        project: "Interactive Gallery with ML5js and P5-Phone",
        space_raw: "71",
      },
    ],
    zone: "Soft Lab",
    label: "71",
  },
  72: {
    entries: [{ name: "Zachary Roney", project: "Origo", space_raw: "72" }],
    zone: "Soft Lab",
    label: "72",
  },
  73: {
    entries: [
      {
        name: "G Malin",
        project: "New Soft Skills (and tiny zines)",
        space_raw: "73",
      },
    ],
    zone: "Soft Lab",
    label: "73",
  },
  74: {
    entries: [
      {
        name: "Lily Crandall",
        project: "Objects Against Screen Time",
        space_raw: "74",
      },
    ],
    zone: "Soft Lab",
    label: "74",
  },
  75: {
    entries: [
      {
        name: "Brandon Liu",
        project: "Ambient Map Gadget + soft stuff",
        space_raw: "75",
      },
    ],
    zone: "Soft Lab",
    label: "75",
  },
  76: {
    entries: [
      {
        name: "Rob Faludi",
        project: "Indoor Rust Garden, Earthquake Lamp",
        space_raw: "76",
      },
    ],
    zone: "Soft Lab",
    label: "76",
  },
  77: {
    entries: [{ name: "judy", project: "You Be The Judge", space_raw: "77" }],
    zone: "Soft Lab",
    label: "77",
  },
  78: {
    entries: [{ name: "Shiva", project: "Everydays", space_raw: "78" }],
    zone: "Soft Lab",
    label: "78",
  },
  79: {
    entries: [
      {
        name: "Willem Yarbrough",
        project: '"Ambient 101" and "Piezochimes v2"',
        space_raw: "79",
      },
    ],
    zone: "Soft Lab",
    label: "79",
  },
  124: {
    entries: [
      {
        name: "Jill Cohen",
        project: "Dance, Dance, Dance",
        space_raw: "124 CABIN 2",
      },
    ],
    zone: "Cabin 2",
    label: "124",
  },
  63: {
    entries: [
      {
        name: "Saba Ghazi (point person) isra ameen and 30 attendees from our Sculpting the Sanctuary Session - we\u2019ll display their names",
        project: "Sanctuary",
        space_raw: "63? Phone Booth in North Lodge",
      },
      {
        name: "Isra (point person) and Saba",
        project: "Sari Project (no title yet)",
        space_raw: "63 North Lodge",
      },
      {
        name: "Point Person: Shubha Jagannatha, Neel Dhanesha",
        project: "Tiny Tunes",
        space_raw: "63",
      },
    ],
    zone: "North Lodge",
    label: "63",
    sub_labels: ["63.1", "63.2", "63.3"],
  },
  85: {
    entries: [
      {
        name: "Hank Duhaime",
        project: "REGNB\u00c5GE, Bugs! Bugs! Bugs!",
        space_raw: "85",
      },
    ],
    zone: "South Lodge",
    label: "85",
  },
  86: {
    entries: [
      { name: "jiadai he", project: "sounds you see", space_raw: "86" },
    ],
    zone: "South Lodge",
    label: "86",
  },
  87: {
    entries: [
      { name: "Zea Zhao", project: "Manhattan is an island", space_raw: "87" },
    ],
    zone: "South Lodge",
    label: "87",
  },
  88: {
    entries: [
      { name: "Voyo Woo", project: "An Eulogy to Earth", space_raw: "88" },
    ],
    zone: "South Lodge",
    label: "88",
  },
  89: {
    entries: [{ name: "Jacky Dang", project: "Frame Jockey", space_raw: "89" }],
    zone: "South Lodge",
    label: "89",
  },
  90: {
    entries: [{ name: "Silka", project: "Rocks", space_raw: "90" }],
    zone: "South Lodge",
    label: "90",
  },
  91: {
    entries: [{ name: "Isra", project: "Parallels", space_raw: "91" }],
    zone: "South Lodge",
    label: "91",
  },
  96: {
    entries: [
      {
        name: "Sam Keene",
        project: "Generative Drum Circle",
        space_raw: "96 & 97",
      },
    ],
    zone: "South Lodge",
    label: "96",
  },
  97: {
    entries: [
      {
        name: "Sam Keene",
        project: "Generative Drum Circle",
        space_raw: "96 & 97",
      },
    ],
    zone: "South Lodge",
    label: "97",
  },
  117: {
    entries: [
      {
        name: "Pranika",
        project: "One Thing One Day Exhibit",
        space_raw: "117",
      },
    ],
    zone: "South Lodge",
    label: "117",
  },
  118: {
    entries: [
      {
        name: "Ada Zhang",
        project: "1/Jialing 2/Blood and flesh GPT",
        space_raw: "118",
      },
    ],
    zone: "South Lodge",
    label: "118",
  },
  119: {
    entries: [
      { name: "Connie Liu", project: "word and image", space_raw: "119" },
    ],
    zone: "South Lodge",
    label: "119",
  },
  81: {
    entries: [
      {
        name: "Luna(Yuxin) Chen",
        project: "Echoes of the Gallop",
        space_raw: "81",
      },
    ],
    zone: "Phone Booth",
    label: "81",
  },
  82: {
    entries: [{ name: "Lila Yedidia", project: "Water", space_raw: "82" }],
    zone: "Phone Booth",
    label: "82",
  },
  83: {
    entries: [
      {
        name: "Meguna",
        project: "Tbd, i\u2019m going to name it by monday.",
        space_raw: "83",
      },
    ],
    zone: "Phone Booth",
    label: "83",
  },
  58: {
    entries: [
      {
        name: "(N/A)",
        project: "Tracing Stories and Emotions in a Digital Gallery",
        space_raw: "58",
      },
    ],
    zone: "Craft Corner",
    label: "58",
  },
  40: {
    entries: [
      {
        name: "Alejandro Mora",
        project: "LeKiwi: Low Cost Mobile Manipulator",
        space_raw: "40",
      },
    ],
    zone: "Craft Corner",
    label: "40",
  },
  37: {
    entries: [
      {
        name: "Andrea Fehrman",
        project: "Through the window",
        space_raw: "37",
      },
    ],
    zone: "Craft Corner",
    label: "37",
  },
  109: {
    entries: [
      {
        name: "Andrew Lott",
        project: "Cookie of Infinite Fortune",
        space_raw: "109",
      },
    ],
    zone: "South Lodge",
    label: "109",
  },
  33: {
    entries: [
      { name: "Ben Anderman", project: "Spork-8 CPU", space_raw: "33 + 34" },
    ],
    zone: "Craft Corner",
    label: "33",
  },
  34: {
    entries: [
      { name: "Ben Anderman", project: "Spork-8 CPU", space_raw: "33 + 34" },
    ],
    zone: "Craft Corner",
    label: "34",
  },
  43: {
    entries: [
      { name: "Danny Sulit", project: "Clock It!", space_raw: "43 + 44" },
    ],
    zone: "Craft Corner",
    label: "43",
  },
  44: {
    entries: [
      { name: "Danny Sulit", project: "Clock It!", space_raw: "43 + 44" },
    ],
    zone: "Craft Corner",
    label: "44",
  },
  102: {
    entries: [
      {
        name: "David Stein",
        project: "Soundscape of Salvaged Parts",
        space_raw: "102",
      },
    ],
    zone: "South Lodge",
    label: "102",
  },
  103: {
    entries: [
      {
        name: "David Wallin",
        project: "Seahorse Puppet, Spring Factory, Fairy Home Terrarium",
        space_raw: "103",
      },
    ],
    zone: "South Lodge",
    label: "103",
  },
  108: {
    entries: [
      { name: "Deron Gopie", project: "The Social Hour", space_raw: "108" },
    ],
    zone: "South Lodge",
    label: "108",
  },
  70: {
    entries: [
      { name: "Frank Cheng", project: "You are a whale", space_raw: "70" },
    ],
    zone: "Amphitheater",
    label: "70",
  },
  111: {
    entries: [
      { name: "Jaclyn McKay", project: "Super Bloom", space_raw: "111" },
    ],
    zone: "South Lodge",
    label: "111",
  },
  94: {
    entries: [
      {
        name: "Kevin Stirnweis",
        project: "1) Notice Me 2) Waves 3) Ceramic TV",
        space_raw: "94 + 95",
      },
    ],
    zone: "South Lodge",
    label: "94",
  },
  95: {
    entries: [
      {
        name: "Kevin Stirnweis",
        project: "1) Notice Me 2) Waves 3) Ceramic TV",
        space_raw: "94 + 95",
      },
    ],
    zone: "South Lodge",
    label: "95",
  },
  104: {
    entries: [
      {
        name: "Logan Gittelson (with support from Basia and Cyrene)",
        project: "Knight Fishing",
        space_raw: "104",
      },
    ],
    zone: "South Lodge",
    label: "104",
  },
  92: {
    entries: [
      {
        name: "Matthew Yacavone (point person), Sasha Solovyeva",
        project: "Choir of Angels (Rat)",
        space_raw: "92",
      },
    ],
    zone: "South Lodge",
    label: "92",
  },
  105: {
    entries: [
      {
        name: "Meghna Dholakia",
        project: "Moving Mechanisms",
        space_raw: "105",
      },
    ],
    zone: "South Lodge",
    label: "105",
  },
  106: {
    entries: [
      { name: "Meredith Clarke", project: "Lag: The Game", space_raw: "106" },
    ],
    zone: "South Lodge",
    label: "106",
  },
  113: {
    entries: [
      { name: "Molly Boerner", project: "Music Man", space_raw: "113" },
    ],
    zone: "South Lodge",
    label: "113",
  },
  107: {
    entries: [
      {
        name: "Molly Boerner, Matt Yacavone",
        project: "Record Player Music Box",
        space_raw: "107",
      },
    ],
    zone: "South Lodge",
    label: "107",
  },
  80: {
    entries: [
      { name: "Daoxin Chen", project: "Ripple touch", space_raw: "80" },
    ],
    zone: "Phone Booth",
    label: "80",
  },
  112: {
    entries: [
      { name: "One person", project: "Collision Box", space_raw: "112" },
    ],
    zone: "South Lodge",
    label: "112",
  },
  120: {
    entries: [
      {
        name: "Rebecca Odes",
        project: "investigation of luminous e/motion",
        space_raw: "120 CABIN 1",
      },
    ],
    zone: "Cabin 1",
    label: "120",
  },
  38: {
    entries: [
      {
        name: "Richie Mendelsohn",
        project: "Hello these are my projects",
        space_raw: "38",
      },
    ],
    zone: "Craft Corner",
    label: "38",
  },
  93: {
    entries: [
      {
        name: "Richie Mendelsohn (Point person), Molly Boerner, Matt Yacavone",
        project: "\u2615\ufe0f Do you like it around here?\ud83e\udd5b",
        space_raw: "93",
      },
    ],
    zone: "South Lodge",
    label: "93",
  },
  100: {
    entries: [
      { name: "Rina Chen, 1", project: "textile things", space_raw: "100" },
    ],
    zone: "South Lodge",
    label: "100",
  },
  110: {
    entries: [
      {
        name: "sarah gray",
        project: "5x5 Cube + Altar of My   Disappointments + Camp Sketchbook",
        space_raw: "110",
      },
    ],
    zone: "South Lodge",
    label: "110",
  },
  35: {
    entries: [
      {
        name: "Sea Won Kim (Point person)\nChristine Chang",
        project: "d",
        space_raw: "35 + 36",
      },
    ],
    zone: "Craft Corner",
    label: "35",
  },
  36: {
    entries: [
      {
        name: "Sea Won Kim (Point person)\nChristine Chang",
        project: "d",
        space_raw: "35 + 36",
      },
    ],
    zone: "Craft Corner",
    label: "36",
  },
  84: {
    entries: [
      { name: "Sophia Diggs-Galligan", project: "Intercom", space_raw: "84" },
    ],
    zone: "South Lodge",
    label: "84",
  },
  116: {
    entries: [
      {
        name: "Zach Gawlik",
        project: "OPTIMIZED FOR ENGAGEMENT",
        space_raw: "116",
      },
    ],
    zone: "South Lodge",
    label: "116",
  },
  41: {
    entries: [
      { name: "Zachary Roney", project: "Origo", space_raw: "41 + 42" },
    ],
    zone: "Craft Corner",
    label: "41",
  },
  42: {
    entries: [
      { name: "Zachary Roney", project: "Origo", space_raw: "41 + 42" },
    ],
    zone: "Craft Corner",
    label: "42",
  },
  121: {
    entries: [
      {
        name: "Andri Kumar",
        project: "Nayika (The One Who Longs)",
        space_raw: "Cabin 1 - 121",
      },
    ],
    zone: "Cabin 1",
    label: "121",
  },
  122: {
    entries: [
      {
        name: "Valentine Ye",
        project: "AI Cyberdeck",
        space_raw: "Cabin 1 - 122",
      },
    ],
    zone: "Cabin 1",
    label: "122",
  },
};
var SPOTS = [
  { id: 1, x: 277, y: 58 },
  { id: 2, x: 312, y: 58 },
  { id: 7, x: 382, y: 58 },
  { id: 8, x: 417, y: 58 },
  { id: 13, x: 487, y: 58 },
  { id: 14, x: 522, y: 58 },
  { id: 19, x: 592, y: 58 },
  { id: 20, x: 627, y: 58 },
  { id: 25, x: 697, y: 58 },
  { id: 26, x: 732, y: 58 },
  { id: 3, x: 277, y: 94 },
  { id: 4, x: 312, y: 94 },
  { id: 9, x: 382, y: 94 },
  { id: 10, x: 417, y: 94 },
  { id: 15, x: 487, y: 94 },
  { id: 16, x: 522, y: 94 },
  { id: 21, x: 592, y: 94 },
  { id: 22, x: 627, y: 94 },
  { id: 27, x: 697, y: 94 },
  { id: 28, x: 732, y: 94 },
  { id: 5, x: 277, y: 130 },
  { id: 6, x: 312, y: 130 },
  { id: 11, x: 382, y: 130 },
  { id: 12, x: 417, y: 130 },
  { id: 17, x: 487, y: 130 },
  { id: 18, x: 522, y: 130 },
  { id: 23, x: 592, y: 130 },
  { id: 24, x: 627, y: 130 },
  { id: 29, x: 697, y: 130 },
  { id: 30, x: 732, y: 130 },
  { id: 67, x: 984, y: 62 },
  { id: 68, x: 984, y: 130 },
  { id: 69, x: 1102, y: 55 },
  { id: 70, x: 1102, y: 138 },
  { id: 66, x: 255, y: 224 },
  { id: 65, x: 255, y: 260 },
  { id: 64, x: 255, y: 296 },
  { id: 62, x: 590, y: 224 },
  { id: 61, x: 640, y: 224 },
  { id: 63, x: 730, y: 296 },
  { id: 71, x: 1168, y: 58 },
  { id: 72, x: 1168, y: 94 },
  { id: 73, x: 1168, y: 130 },
  { id: 74, x: 1168, y: 166 },
  { id: 75, x: 1194, y: 58 },
  { id: 76, x: 1194, y: 94 },
  { id: 77, x: 1218, y: 58 },
  { id: 78, x: 1218, y: 94 },
  { id: 79, x: 1218, y: 130 },
  { id: 96, x: 1374, y: 52 },
  { id: 97, x: 1410, y: 52 },
  { id: 98, x: 1374, y: 88 },
  { id: 99, x: 1410, y: 88 },
  { id: 100, x: 1374, y: 124 },
  { id: 101, x: 1410, y: 124 },
  { id: 114, x: 1450, y: 52 },
  { id: 115, x: 1450, y: 88 },
  { id: 116, x: 1450, y: 124 },
  { id: 102, x: 1502, y: 52 },
  { id: 103, x: 1538, y: 52 },
  { id: 104, x: 1574, y: 52 },
  { id: 105, x: 1502, y: 88 },
  { id: 106, x: 1538, y: 88 },
  { id: 107, x: 1574, y: 88 },
  { id: 108, x: 1624, y: 52 },
  { id: 109, x: 1660, y: 52 },
  { id: 110, x: 1696, y: 52 },
  { id: 111, x: 1624, y: 88 },
  { id: 112, x: 1660, y: 88 },
  { id: 113, x: 1696, y: 88 },
  { id: 90, x: 1800, y: 20 },
  { id: 89, x: 1800, y: 52 },
  { id: 88, x: 1814, y: 86 },
  { id: 87, x: 1764, y: 52 },
  { id: 91, x: 1764, y: 102 },
  { id: 117, x: 1450, y: 160 },
  { id: 118, x: 1488, y: 160 },
  { id: 119, x: 1524, y: 160 },
  { id: 85, x: 1584, y: 196 },
  { id: 86, x: 1620, y: 196 },
  { id: 92, x: 1658, y: 196 },
  { id: 93, x: 1694, y: 196 },
  { id: 94, x: 1730, y: 196 },
  { id: 95, x: 1766, y: 196 },
  { id: 84, x: 1856, y: 300 },
  { id: 31, x: 1358, y: 248 },
  { id: 32, x: 1394, y: 248 },
  { id: 37, x: 1434, y: 248 },
  { id: 38, x: 1470, y: 248 },
  { id: 43, x: 1510, y: 248 },
  { id: 44, x: 1546, y: 248 },
  { id: 49, x: 1580, y: 248 },
  { id: 50, x: 1616, y: 248 },
  { id: 55, x: 1650, y: 248 },
  { id: 56, x: 1686, y: 248 },
  { id: 33, x: 1358, y: 284 },
  { id: 34, x: 1394, y: 284 },
  { id: 39, x: 1434, y: 284 },
  { id: 40, x: 1470, y: 284 },
  { id: 45, x: 1510, y: 284 },
  { id: 46, x: 1546, y: 284 },
  { id: 51, x: 1580, y: 284 },
  { id: 52, x: 1616, y: 284 },
  { id: 57, x: 1650, y: 284 },
  { id: 58, x: 1686, y: 284 },
  { id: 35, x: 1358, y: 320 },
  { id: 36, x: 1394, y: 320 },
  { id: 41, x: 1434, y: 320 },
  { id: 42, x: 1470, y: 320 },
  { id: 47, x: 1510, y: 320 },
  { id: 48, x: 1546, y: 320 },
  { id: 53, x: 1580, y: 320 },
  { id: 54, x: 1616, y: 320 },
  { id: 59, x: 1650, y: 320 },
  { id: 60, x: 1686, y: 320 },
  { id: 80, x: 935, y: 340 },
  { id: 81, x: 1340, y: 340 },
  { id: 82, x: 1480, y: 340 },
  { id: 83, x: 1840, y: 350 },
  { id: 120, x: 54, y: 500 },
  { id: 121, x: 106, y: 500 },
  { id: 122, x: 54, y: 540 },
  { id: 123, x: 106, y: 540 },
  { id: 124, x: 54, y: 598 },
  { id: 125, x: 106, y: 598 },
  { id: 126, x: 54, y: 638 },
  { id: 127, x: 106, y: 638 },
  { id: 128, x: 54, y: 696 },
  { id: 129, x: 106, y: 696 },
  { id: 130, x: 54, y: 736 },
  { id: 131, x: 106, y: 736 },
];

var ZONE_MAP = {
  1: "Amphitheater",
  2: "Amphitheater",
  3: "Amphitheater",
  4: "Amphitheater",
  5: "Amphitheater",
  6: "Amphitheater",
  7: "Amphitheater",
  8: "Amphitheater",
  9: "Amphitheater",
  10: "Amphitheater",
  11: "Amphitheater",
  12: "Amphitheater",
  13: "Amphitheater",
  14: "Amphitheater",
  15: "Amphitheater",
  16: "Amphitheater",
  17: "Amphitheater",
  18: "Amphitheater",
  19: "Amphitheater",
  20: "Amphitheater",
  21: "Amphitheater",
  22: "Amphitheater",
  23: "Amphitheater",
  24: "Amphitheater",
  25: "Amphitheater",
  26: "Amphitheater",
  27: "Amphitheater",
  28: "Amphitheater",
  29: "Amphitheater",
  30: "Amphitheater",
  67: "Amphitheater",
  68: "Amphitheater",
  69: "Amphitheater",
  70: "Amphitheater",
  61: "North Lodge",
  62: "North Lodge",
  63: "North Lodge",
  64: "North Lodge",
  65: "North Lodge",
  66: "North Lodge",
  71: "Soft Lab",
  72: "Soft Lab",
  73: "Soft Lab",
  74: "Soft Lab",
  75: "Soft Lab",
  76: "Soft Lab",
  77: "Soft Lab",
  78: "Soft Lab",
  79: "Soft Lab",
  84: "South Lodge",
  85: "South Lodge",
  86: "South Lodge",
  87: "South Lodge",
  88: "South Lodge",
  89: "South Lodge",
  90: "South Lodge",
  91: "South Lodge",
  92: "South Lodge",
  93: "South Lodge",
  94: "South Lodge",
  95: "South Lodge",
  96: "South Lodge",
  97: "South Lodge",
  98: "South Lodge",
  99: "South Lodge",
  100: "South Lodge",
  101: "South Lodge",
  102: "South Lodge",
  103: "South Lodge",
  104: "South Lodge",
  105: "South Lodge",
  106: "South Lodge",
  107: "South Lodge",
  108: "South Lodge",
  109: "South Lodge",
  110: "South Lodge",
  111: "South Lodge",
  112: "South Lodge",
  113: "South Lodge",
  114: "South Lodge",
  115: "South Lodge",
  116: "South Lodge",
  117: "South Lodge",
  118: "South Lodge",
  119: "South Lodge",
  31: "Craft Corner",
  32: "Craft Corner",
  33: "Craft Corner",
  34: "Craft Corner",
  35: "Craft Corner",
  36: "Craft Corner",
  37: "Craft Corner",
  38: "Craft Corner",
  39: "Craft Corner",
  40: "Craft Corner",
  41: "Craft Corner",
  42: "Craft Corner",
  43: "Craft Corner",
  44: "Craft Corner",
  45: "Craft Corner",
  46: "Craft Corner",
  47: "Craft Corner",
  48: "Craft Corner",
  49: "Craft Corner",
  50: "Craft Corner",
  51: "Craft Corner",
  52: "Craft Corner",
  53: "Craft Corner",
  54: "Craft Corner",
  55: "Craft Corner",
  56: "Craft Corner",
  57: "Craft Corner",
  58: "Craft Corner",
  59: "Craft Corner",
  60: "Craft Corner",
  120: "Cabin 1",
  121: "Cabin 1",
  122: "Cabin 1",
  123: "Cabin 1",
  124: "Cabin 2",
  125: "Cabin 2",
  126: "Cabin 2",
  127: "Cabin 2",
  128: "Cabin 3",
  129: "Cabin 3",
  130: "Cabin 3",
  131: "Cabin 3",
  80: "Phone Booth",
  81: "Phone Booth",
  82: "Phone Booth",
  83: "Phone Booth",
};

// ── Persist to localStorage ──────────────────────────────────────────────────
function saveMapToStorage() {
  saveMapToStorage();
}

// ── Spot status helpers ───────────────────────────────────────────────────────
function getSpotStatus(id) {
  var data = FINAL_MAP[String(id)];
  if (!data) return "available";
  if (data.entries.length > 1) {
    // Check if truly different people
    var names = data.entries.map(function (e) {
      return e.name;
    });
    var unique = names.filter(function (n, i) {
      return names.indexOf(n) === i;
    });
    if (unique.length > 1) return "conflict";
  }
  return "assigned";
}

// ── Build map spots ───────────────────────────────────────────────────────────
function imgDims() {
  var i = document.getElementById("mapImg");
  return { w: i.offsetWidth, h: i.offsetHeight };
}

function buildSpots() {
  var layer = document.getElementById("spots-layer");
  layer.innerHTML = "";
  var d = imgDims(),
    sx = d.w / IMG_W,
    sy = d.h / IMG_H;

  SPOTS.forEach(function (s) {
    var status = getSpotStatus(s.id);
    var el = document.createElement("div");
    el.className = "spot " + status;
    el.id = "spot-" + s.id;
    el.style.left = Math.round(s.x * sx) + "px";
    el.style.top = Math.round(s.y * sy) + "px";
    el.textContent = s.id;
    el.addEventListener("mouseenter", function (e) {
      showTooltip(e, s.id);
    });
    el.addEventListener("mouseleave", hideTooltip);
    el.addEventListener("mousemove", function (e) {
      moveTooltip(e);
    });
    layer.appendChild(el);
  });

  updateStats();
  renderSidebar();
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
function updateStats() {
  var available = 0,
    assigned = 0,
    conflict = 0;
  SPOTS.forEach(function (s) {
    var st = getSpotStatus(s.id);
    if (st === "available") available++;
    else if (st === "assigned") assigned++;
    else conflict++;
  });
  var bar = document.getElementById("statsBar");
  bar.innerHTML = [
    { label: "Total spots", num: SPOTS.length, color: "rgba(255,255,255,0.6)" },
    { label: "Available", num: available, color: "var(--green)" },
    { label: "Assigned", num: assigned, color: "var(--cyan)" },
    { label: "Conflicts", num: conflict, color: "var(--red)" },
  ]
    .map(function (s) {
      return (
        '<div class="stat-pill"><div class="stat-dot" style="background:' +
        s.color +
        '"></div><span class="stat-label">' +
        s.label +
        '</span><span class="stat-num" style="color:' +
        s.color +
        '">' +
        s.num +
        "</span></div>"
      );
    })
    .join("");
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
var tip = document.getElementById("tooltip");
function showTooltip(e, id) {
  var data = FINAL_MAP[String(id)];
  var zone = ZONE_MAP[id] || "Other";
  tip.innerHTML = "";

  var idEl = document.createElement("div");
  idEl.className = "tt-id";
  idEl.textContent = "#" + id;
  tip.appendChild(idEl);
  var zoneEl = document.createElement("div");
  zoneEl.className = "tt-zone";
  zoneEl.textContent = zone;
  tip.appendChild(zoneEl);

  if (!data) {
    var av = document.createElement("div");
    av.className = "tt-available";
    av.textContent = "Available";
    tip.appendChild(av);
  } else {
    data.entries.forEach(function (en) {
      var entry = document.createElement("div");
      entry.className = "tt-entry";
      var nm = document.createElement("div");
      nm.className = "tt-name";
      nm.textContent = en.name;
      entry.appendChild(nm);
      if (en.project) {
        var pr = document.createElement("div");
        pr.className = "tt-project";
        pr.textContent = en.project;
        entry.appendChild(pr);
      }
      tip.appendChild(entry);
    });
  }

  tip.style.display = "block";
  moveTooltip(e);
}
function moveTooltip(e) {
  tip.style.left = e.clientX + 14 + "px";
  tip.style.top = e.clientY - 10 + "px";
}
function hideTooltip() {
  tip.style.display = "none";
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function deleteEntry(spotId, entryIndex) {
  var key = String(spotId);
  if (!FINAL_MAP[key]) return;
  FINAL_MAP[key].entries.splice(entryIndex, 1);
  if (FINAL_MAP[key].entries.length === 0) delete FINAL_MAP[key];
  saveMapToStorage();
  buildSpots();
}

function setFilter(f, btn) {
  activeFilter = f;
  document.querySelectorAll(".filter-btn").forEach(function (b) {
    b.classList.remove("active-f");
  });
  btn.classList.add("active-f");
  renderSidebar();
}

function renderSidebar() {
  var list = document.getElementById("sidebarList");
  list.innerHTML = "";
  var q = (document.getElementById("sidebarSearch").value || "")
    .toLowerCase()
    .trim();

  var items = [];
  SPOTS.forEach(function (s) {
    var status = getSpotStatus(s.id);
    if (activeFilter !== "all" && status !== activeFilter) return;
    var data = FINAL_MAP[String(s.id)];
    var zone = ZONE_MAP[s.id] || "Other";
    var nameText = data
      ? data.entries
          .map(function (e) {
            return e.name;
          })
          .join(", ")
      : "";
    var projText = data
      ? data.entries
          .map(function (e) {
            return e.project;
          })
          .join(", ")
      : "";
    if (
      q &&
      !String(s.id).includes(q) &&
      !nameText.toLowerCase().includes(q) &&
      !projText.toLowerCase().includes(q) &&
      !zone.toLowerCase().includes(q)
    )
      return;
    items.push({
      id: s.id,
      status: status,
      zone: zone,
      data: data,
      nameText: nameText,
      projText: projText,
    });
  });

  items.sort(function (a, b) {
    return a.id - b.id;
  });

  items.forEach(function (item) {
    var row = document.createElement("div");
    row.className = "sidebar-item";
    var badge = document.createElement("div");
    badge.className = "si-badge " + item.status;
    badge.textContent = item.id;
    var info = document.createElement("div");
    info.className = "si-info";
    var zone = document.createElement("div");
    zone.className = "si-zone";
    zone.textContent = item.zone;
    var name = document.createElement("div");
    name.className = "si-name";

    if (!item.data) {
      name.className = "si-available-label";
      name.textContent = "Available";
      info.appendChild(zone);
      info.appendChild(name);
    } else {
      name.textContent = item.nameText;
      var proj = document.createElement("div");
      proj.className = "si-project";
      proj.textContent = item.projText;
      info.appendChild(zone);
      info.appendChild(name);
      info.appendChild(proj);
      if (item.status === "conflict") {
        var cb = document.createElement("span");
        cb.className = "conflict-badge";
        cb.textContent = "CONFLICT";
        info.appendChild(cb);
      }
    }

    row.appendChild(badge);
    row.appendChild(info);

    // Swap button for assigned spots
    if (item.data) {
      (function (capturedId, capturedData) {
        capturedData.entries.forEach(function (entry, idx) {
          var swapBtn = document.createElement("button");
          swapBtn.className = "si-swap-btn";
          swapBtn.textContent = "swap";
          swapBtn.title = "Move " + entry.name + " to another spot";
          swapBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            openSwapModal(capturedId, idx);
          });
          row.appendChild(swapBtn);

          var delBtn = document.createElement("button");
          delBtn.className = "si-del-btn";
          delBtn.textContent = "×";
          delBtn.title = "Remove " + entry.name;
          delBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (
              confirm("Remove " + entry.name + " from spot " + capturedId + "?")
            ) {
              deleteEntry(capturedId, idx);
            }
          });
          row.appendChild(delBtn);
        });
      })(item.id, item.data);
    }

    row.addEventListener("click", function () {
      scrollToSpot(item.id);
    });
    list.appendChild(row);
  });
}

function scrollToSpot(id) {
  var spot = SPOTS.find(function (s) {
    return s.id === id;
  });
  if (!spot) return;
  var d = imgDims();
  var px = spot.x * (d.w / IMG_W) * currentScale;
  var py = spot.y * (d.h / IMG_H) * currentScale;
  var mc = document.getElementById("mapContainer");
  mc.scrollTo({
    left: px - mc.clientWidth / 2,
    top: py - mc.clientHeight / 2,
    behavior: "smooth",
  });
}

// ── CSV Import ────────────────────────────────────────────────────────────────
var importPanel = document.getElementById("importPanel");
importPanel.addEventListener("dragover", function (e) {
  e.preventDefault();
  importPanel.classList.add("dragover");
});
importPanel.addEventListener("dragleave", function () {
  importPanel.classList.remove("dragover");
});
importPanel.addEventListener("drop", function (e) {
  e.preventDefault();
  importPanel.classList.remove("dragover");
  if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
});

function handleFile(file) {
  var meta = document.getElementById("importMeta");
  if (!file) return;
  meta.textContent = "Reading " + file.name + "...";

  var reader = new FileReader();
  reader.onload = function (e) {
    var text = e.target.result;
    var lines = text.split(/\r?\n/).filter(function (l) {
      return l.trim();
    });
    if (lines.length < 2) {
      meta.textContent = "File seems empty.";
      return;
    }

    importedHeaders = parseCSVLine(lines[0]);
    importedRows = lines.slice(1).map(parseCSVLine);

    meta.textContent =
      file.name +
      " — " +
      importedRows.length +
      " rows, " +
      importedHeaders.length +
      " columns";

    // Populate column pickers
    ["colName", "colSpot", "colProject"].forEach(function (id) {
      var sel = document.getElementById(id);
      sel.innerHTML = "";
      importedHeaders.forEach(function (h, i) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = h;
        // Smart defaults
        if (id === "colName" && /name/i.test(h)) opt.selected = true;
        if (id === "colSpot" && /spot|space|number/i.test(h))
          opt.selected = true;
        if (id === "colProject" && /project|title/i.test(h))
          opt.selected = true;
        sel.appendChild(opt);
      });
    });

    document.getElementById("colMap").classList.add("show");
  };
  reader.readAsText(file);
}

function parseCSVLine(line) {
  var result = [],
    current = "",
    inQuotes = false;
  for (var i = 0; i < line.length; i++) {
    var c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += c;
    }
  }
  result.push(current.trim());
  return result;
}

function applyImport() {
  var ci = parseInt(document.getElementById("colName").value);
  var cs = parseInt(document.getElementById("colSpot").value);
  var cp = parseInt(document.getElementById("colProject").value);

  var newMap = {};
  importedRows.forEach(function (row) {
    if (!row[ci] || !row[cs]) return;
    var name = row[ci].trim();
    var project = row[cp] ? row[cp].trim() : "";
    var spotRaw = row[cs];
    var nums = spotRaw.match(/\d+/g) || [];
    nums.forEach(function (n) {
      var id = parseInt(n);
      if (id < 1 || id > 131) return;
      if (!newMap[id])
        newMap[id] = {
          entries: [],
          zone: ZONE_MAP[id] || "Other",
          label: String(id),
        };
      var entry = { name: name, project: project, space_raw: spotRaw };
      var key = name + "|||" + project;
      if (
        !newMap[id].entries.find(function (e) {
          return e.name + "|||" + e.project === key;
        })
      ) {
        newMap[id].entries.push(entry);
      }
    });
  });

  // Convert keys to strings
  FINAL_MAP = {};
  Object.keys(newMap).forEach(function (k) {
    FINAL_MAP[String(k)] = newMap[k];
  });

  document.getElementById("importMeta").textContent =
    "Imported! " + Object.keys(FINAL_MAP).length + " spots assigned.";
  document.getElementById("colMap").classList.remove("show");
  buildSpots();
  saveMapToStorage();
}

// ── Export CSV ────────────────────────────────────────────────────────────────
function exportCSV() {
  var rows = [["Spot", "Zone", "Status", "Name", "Project"]];
  SPOTS.forEach(function (s) {
    var status = getSpotStatus(s.id);
    var zone = ZONE_MAP[s.id] || "Other";
    var data = FINAL_MAP[String(s.id)];
    if (!data) {
      rows.push([s.id, zone, "Available", "", ""]);
    } else {
      data.entries.forEach(function (e) {
        rows.push([s.id, zone, status, e.name, e.project]);
      });
    }
  });
  var csv = rows
    .map(function (r) {
      return r
        .map(function (c) {
          return '"' + String(c).replace(/"/g, '""') + '"';
        })
        .join(",");
    })
    .join("\n");
  var a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  a.download = "sats2026-spots.csv";
  a.click();
}

// ── Pan ───────────────────────────────────────────────────────────────────────
var mc = document.getElementById("mapContainer");
mc.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("spot")) return;
  isPanning = true;
  panSX = e.pageX - mc.offsetLeft;
  panSY = e.pageY - mc.offsetTop;
  panSL = mc.scrollLeft;
  panST = mc.scrollTop;
});
mc.addEventListener("mousemove", function (e) {
  if (!isPanning) return;
  e.preventDefault();
  mc.scrollLeft = panSL - (e.pageX - mc.offsetLeft - panSX);
  mc.scrollTop = panST - (e.pageY - mc.offsetTop - panSY);
});
mc.addEventListener("mouseup", function () {
  isPanning = false;
});
mc.addEventListener("mouseleave", function () {
  isPanning = false;
});

function zoom(f) {
  currentScale = Math.min(Math.max(currentScale * f, 0.3), 6);
  document.getElementById("mapInner").style.transform =
    "scale(" + currentScale + ")";
}
function resetZoom() {
  currentScale = 1;
  document.getElementById("mapInner").style.transform = "scale(1)";
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.getElementById("mapImg").addEventListener("load", buildSpots);
document.getElementById("mapImg").src = window.ADMIN_IMG_SRC;
// ── Swap modal ────────────────────────────────────────────────────────────────
var swapState = null; // {spotId, entryIndex}

function openSwapModal(spotId, entryIndex) {
  swapState = { spotId: spotId, entryIndex: entryIndex };
  var data = FINAL_MAP[String(spotId)];
  var entry = data.entries[entryIndex];

  document.getElementById("swapPersonName").textContent = entry.name;
  document.getElementById("swapPersonProject").textContent =
    entry.project || "";
  document.getElementById("swapFromSpot").textContent =
    "Spot " + spotId + " \u00b7 " + (ZONE_MAP[spotId] || "");

  // Populate destination dropdown
  var sel = document.getElementById("swapToSpot");
  sel.innerHTML = '<option value="">-- pick a spot --</option>';
  SPOTS.forEach(function (s) {
    if (s.id === spotId) return;
    var status = getSpotStatus(s.id);
    var zone = ZONE_MAP[s.id] || "";
    var label = "Spot " + s.id + " \u00b7 " + zone;
    if (status === "available") label += " \u2713 available";
    else if (status === "conflict") label += " \u26a0 conflict";
    var opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = label;
    if (status === "available") opt.style.color = "#1DB87A";
    sel.appendChild(opt);
  });

  document.getElementById("swapModal").style.display = "flex";
}

function closeSwapModal() {
  document.getElementById("swapModal").style.display = "none";
  swapState = null;
}

function confirmSwap() {
  if (!swapState) return;
  var toId = parseInt(document.getElementById("swapToSpot").value);
  if (!toId) return;

  var fromId = swapState.spotId;
  var fromData = FINAL_MAP[String(fromId)];
  var entry = fromData.entries[swapState.entryIndex];

  // Remove from source
  fromData.entries.splice(swapState.entryIndex, 1);
  if (fromData.entries.length === 0) delete FINAL_MAP[String(fromId)];

  // Add to destination
  if (!FINAL_MAP[String(toId)]) {
    FINAL_MAP[String(toId)] = {
      entries: [],
      zone: ZONE_MAP[toId] || "",
      label: String(toId),
    };
  }
  FINAL_MAP[String(toId)].entries.push(entry);

  closeSwapModal();
  buildSpots();
  saveMapToStorage();
}

// Close on backdrop click
document.getElementById("swapModal").addEventListener("click", function (e) {
  if (e.target === this) closeSwapModal();
});

// ── Others / Unassigned ───────────────────────────────────────────────────────
var OTHERS = []; // [{name, note}]

function showAddOther() {
  document.getElementById("addOtherForm").style.display = "block";
  document.getElementById("otherName").focus();
}
function hideAddOther() {
  document.getElementById("addOtherForm").style.display = "none";
  document.getElementById("otherName").value = "";
  document.getElementById("otherNote").value = "";
}
function addOtherEntry() {
  var name = document.getElementById("otherName").value.trim();
  var note = document.getElementById("otherNote").value.trim();
  if (!name) return;
  OTHERS.push({ name: name, note: note });
  hideAddOther();
  renderOthers();
  // Also push into index.html's public data via localStorage so search works
  saveOthersToStorage();
}
function removeOther(idx) {
  OTHERS.splice(idx, 1);
  renderOthers();
  saveOthersToStorage();
}
function renderOthers() {
  var list = document.getElementById("othersList");
  list.innerHTML = "";
  if (OTHERS.length === 0) {
    list.innerHTML =
      '<div style="padding:8px 10px;font-size:11px;color:var(--muted)">None yet</div>';
    return;
  }
  OTHERS.forEach(function (o, idx) {
    var row = document.createElement("div");
    row.style.cssText =
      "display:flex;align-items:flex-start;gap:7px;padding:5px 8px;border-bottom:1px solid rgba(255,255,255,0.04)";
    var info = document.createElement("div");
    info.style.flex = "1";
    var nm = document.createElement("div");
    nm.style.cssText = "font-size:11px;color:var(--text);font-weight:500";
    nm.textContent = o.name;
    var nt = document.createElement("div");
    nt.style.cssText = "font-size:10px;color:var(--muted);margin-top:1px";
    nt.textContent = o.note || "No note";
    info.appendChild(nm);
    info.appendChild(nt);
    var del = document.createElement("button");
    del.style.cssText =
      "background:none;border:none;color:var(--muted);cursor:pointer;font-size:14px;padding:0 2px;flex-shrink:0";
    del.textContent = "×";
    del.title = "Remove";
    del.addEventListener("click", function () {
      removeOther(idx);
    });
    row.appendChild(info);
    row.appendChild(del);
    list.appendChild(row);
  });
}

function saveOthersToStorage() {
  try {
    localStorage.setItem("sats_others", JSON.stringify(OTHERS));
  } catch (e) {}
  fetch("/api/save-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ others: OTHERS }),
  }).catch(function (e) {
    console.warn("KV save failed:", e);
  });
}
function loadOthersFromStorage() {
  try {
    var saved = localStorage.getItem("sats_others");
    if (saved) OTHERS = JSON.parse(saved);
  } catch (e) {}
  renderOthers();
}

// Init — load from KV first, fall back to localStorage
function loadFromKV() {
  fetch("/api/get-data")
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      if (data.finalMap && Object.keys(data.finalMap).length > 0) {
        FINAL_MAP = data.finalMap;
        try {
          localStorage.setItem("sats_final_map", JSON.stringify(FINAL_MAP));
        } catch (e) {}
        buildSpots();
      }
      if (data.others && data.others.length > 0) {
        OTHERS = data.others;
        try {
          localStorage.setItem("sats_others", JSON.stringify(OTHERS));
        } catch (e) {}
        renderOthers();
      }
    })
    .catch(function () {
      // KV unavailable — fall back to localStorage
      loadOthersFromStorage();
    });
}

loadFromKV();

// Pre-load known special requests
if (OTHERS.length === 0) {
  OTHERS.push({
    name: "David Stein",
    note: "Soundscape too large for spot 102 and makes a lot of noise. Requested hallway outside toward the cabins — typical spot for spring/fall shows. Can help draw people toward the cabins.",
  });
  saveOthersToStorage();
  renderOthers();
}

// ── Add late submission ───────────────────────────────────────────────────────
function toggleAddCamper() {
  var panel = document.getElementById("addCamperPanel");
  var isOpen = panel.style.display !== "none";
  panel.style.display = isOpen ? "none" : "block";
  if (!isOpen) document.getElementById("newName").focus();
}

function submitNewCamper() {
  var name = document.getElementById("newName").value.trim();
  var project = document.getElementById("newProject").value.trim();
  var spotRaw = document.getElementById("newSpot")
    ? document.getElementById("newSpot").value.trim()
    : "";
  var msg = document.getElementById("addCamperMsg");
  var spotId = parseInt(spotRaw);

  msg.style.display = "block";
  if (!name) {
    msg.style.color = "var(--red)";
    msg.textContent = "Name is required.";
    return;
  }

  if (spotId && spotId >= 1 && spotId <= 131) {
    // Has a spot — add to FINAL_MAP
    var key = String(spotId);
    if (!FINAL_MAP[key]) {
      FINAL_MAP[key] = {
        entries: [],
        zone: ZONE_MAP[spotId] || "Other",
        label: key,
      };
    }
    var already = FINAL_MAP[key].entries.find(function (e) {
      return e.name.toLowerCase() === name.toLowerCase();
    });
    if (already) {
      msg.style.color = "var(--yellow)";
      msg.textContent = name + " is already at spot " + spotId + ".";
      return;
    }
    FINAL_MAP[key].entries.push({
      name: name,
      project: project,
      space_raw: spotRaw,
    });
    saveMapToStorage();
    buildSpots();
    msg.style.color = "var(--green)";
    msg.textContent =
      name +
      " added to spot " +
      spotId +
      " · " +
      (ZONE_MAP[spotId] || "") +
      " ✓";
  } else {
    // No spot — add to Others/unassigned
    OTHERS.push({
      name: name,
      note: project || "Late submission — no spot assigned",
    });
    saveOthersToStorage();
    renderOthers();
    msg.style.color = "var(--green)";
    msg.textContent = name + " added to unassigned list ✓";
  }

  document.getElementById("newName").value = "";
  document.getElementById("newProject").value = "";
  if (document.getElementById("newSpot"))
    document.getElementById("newSpot").value = "";

  setTimeout(function () {
    msg.style.display = "none";
    toggleAddCamper();
  }, 2500);
}

// Allow Enter key to submit
["newName", "newProject"].forEach(function (id) {
  document.addEventListener("DOMContentLoaded", function () {
    var el = document.getElementById(id);
    if (el)
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter") submitNewCamper();
      });
  });
});
