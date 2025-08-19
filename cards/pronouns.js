const CARDS = [
  { front: "Ja", back: "я", hint: "" },
  { front: "mnie", back: "меня", hint: "Nie ma mnie w domu." },
  { front: "mi", back: "мне", hint: "Daj mi książkę." },
  { front: "mną", back: "мной", hint: "Idź ze mną." },

  { front: "Ty", back: "ты", hint: "" },
  { front: "ciebie/cię", back: "тебя", hint: "Lubię ciebie." },
  { front: "tobie/ci", back: "тебе", hint: "Powiem ci prawdę." },
  { front: "tobą", back: "тобой", hint: "Idę z tobą." },

  { front: "On", back: "он", hint: "" },
  { front: "jego/go/niego", back: "его", hint: "Widzę go na ulicy." },
  { front: "jemu/mu", back: "ему", hint: "Pomogę mu." },
  { front: "nim", back: "им", hint: "Rozmawiam z nim." },

  { front: "Ona", back: "она", hint: "" },
  { front: "jej/niej", back: "её", hint: "Znam jej brata." },
  { front: "jej/niej", back: "ей", hint: "Pomagam jej." },
  { front: "nią", back: "ею", hint: "Jestem z nią." },

  { front: "Ono", back: "оно", hint: "" },
  { front: "je/nie", back: "его (оно)", hint: "Widzę je." },
  { front: "mu/niemu", back: "ему (оно)", hint: "Daj mu zabawkę." },
  { front: "nim", back: "им (оно)", hint: "Bawi się nim." },

  { front: "My", back: "мы", hint: "" },
  { front: "nas", back: "нас", hint: "Oni widzą nas." },
  { front: "nam", back: "нам", hint: "Powiedz nam historię." },
  { front: "nami", back: "нами", hint: "Idź z nami." },

  { front: "Wy", back: "вы", hint: "" },
  { front: "was", back: "вас", hint: "Słyszę was." },
  { front: "wam", back: "вам", hint: "Pomogę wam." },
  { front: "wami", back: "вами", hint: "Rozmawiam z wami." },

  { front: "Oni/One", back: "они", hint: "" },
  { front: "ich/nie", back: "их", hint: "Znam ich dobrze." },
  { front: "im/nim", back: "им", hint: "Pomogę im." },
  { front: "nimi", back: "ими", hint: "Idę z nimi." },

  { front: "Siebie", back: "себя", hint: "" },
  { front: "siebie", back: "себя", hint: "Nie widzę siebie w lustrze." },
  { front: "sobie", back: "себе", hint: "Kupiłem sobie prezent." },
  { front: "sobą", back: "собой", hint: "Jestem z sobą szczęśliwy." },

  { front: "Mój", back: "мой", hint: "" },
  { front: "mój", back: "мой", hint: "To jest mój dom." },
  { front: "mojego", back: "моего", hint: "Lubię mojego psa." },
  { front: "mojemu", back: "моему", hint: "Pomagam mojemu bratu." },
  { front: "moim", back: "моим", hint: "Idę z moim kolegą." },

  { front: "Twój", back: "твой", hint: "" },
  { front: "twój", back: "твой", hint: "To jest twój samochód." },
  { front: "twojego", back: "твоего", hint: "Widzę twojego ojca." },
  { front: "twojemu", back: "твоему", hint: "Pomogę twojemu dziecku." },
  { front: "twoim", back: "твоим", hint: "Idę z twoim bratem." },

  { front: "Jego", back: "его", hint: "" },
  { front: "jego", back: "его (не изменяется)", hint: "To jest jego książka." },

  { front: "Jej", back: "её", hint: "" },
  { front: "jej", back: "её (не изменяется)", hint: "To jest jej kot." },

  { front: "Nasz", back: "наш", hint: "" },
  { front: "nasz", back: "наш", hint: "To jest nasz ogród." },
  { front: "naszego", back: "нашего", hint: "Kocham naszego psa." },
  { front: "naszemu", back: "нашему", hint: "Pomogę naszemu dziecku." },
  { front: "naszym", back: "нашим", hint: "Idę z naszym kolegą." },

  { front: "Wasz", back: "ваш", hint: "" },
  { front: "wasz", back: "ваш", hint: "To jest wasz pokój." },
  { front: "waszego", back: "вашего", hint: "Widzę waszego tatę." },
  { front: "waszemu", back: "вашему", hint: "Pomogę waszemu dzieckу." },
  { front: "waszym", back: "вашим", hint: "Idę z waszym przyjacielem." },

  { front: "Ich", back: "их", hint: "" },
  { front: "ich", back: "их (не изменяется)", hint: "To jest ich dom." },

  { front: "Swój", back: "свой", hint: "" },
  { front: "swój", back: "свой", hint: "Każdy kocha swój kraj." },
  { front: "swojego", back: "своего", hint: "Znalazłem swojego kota." },
  { front: "swojemu", back: "своему", hint: "Pomogę swojemu dziecku." },
  { front: "swoim", back: "своим", hint: "Jestem ze swoim przyjacielem." }
];