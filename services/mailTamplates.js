class EmptyLetter {
  constructor(letter) {
    //gimly99@mail.ru,
    // console.log('Letter constructor', letter)
    this.from = '"Smart Home App ✅ " <@gmail.com>'; // sender address
    this.to = "@yandex.ru"; // list of receivers
    this.subject = letter.subject; // Subject line
    this.text = letter.text; // plain text body
    this.html = letter.html; // html body
  }
}

class VolgogradEnergoSbytCounterLetter {
  constructor(from, counterCount) {
    this.from = from;
    this.counterCount = counterCount;
  }
  createLetter() {
    return {
      from: this.from,
      to: "@yandex.ru", //Vologorad Energo sbyt
      subject: "",
      text: `text: ${this.counterCount}`,
    };
  }
}

export { VolgogradEnergoSbytCounterLetter };
