function get_random_int(max) {
  return Math.floor(Math.random() * max);
}
function get_random_int_from_to(from_, to_) {
  return get_random_int(to_ - from_ + 1) + from_;
}

let joker_active = false;

class Thief {
  constructor(elem) {
    this.elem = elem;
    this.elem.onclick = () => { if (joker_active) {
      this.flip();
      calculate_round_score();
      update_label();
    } }
    this.num = 1;
    this.set(0);
  }
  set(num) {
    this.elem.textContent = "" + num;
    this.num = num;
  }
  get() {
    return this.num;
  }
  randomize() {
    this.set( get_random_int_from_to(1,6) )
  }
  flip() {
    this.set( 7 - this.num )
  }
}
let thieves = [
  new Thief(thief_0),
  new Thief(thief_1),
  new Thief(thief_2),
  new Thief(thief_3),
  new Thief(thief_4),
  new Thief(thief_5)
];

function roll () {
  // we remove before roll because Ace can still bring them back
  joker_active = false;
  for (const thief of thieves) {
    if (thief.get() == 1) { thief.elem.disabled = true; thief.elem.textContent = "X"; }
  }
  thieves = thieves.filter(thief => thief.get()!=1);
  for (const thief of thieves) {
    thief.randomize();
  }
}


function calculate_round_score() {
  let round_score = 0;
  for (const thief of thieves) {
    if (round_score < thief.get()) {
      round_score = thief.get();
    }
  }
  return round_score;
}
let score = 0;
let round_score = 0;

function update_label() {
  score_label.textContent = "score: " + score + " +" + round_score;
}

btn_roll.onclick = () => {
  score += round_score;
  roll();
  round_score = calculate_round_score();
  update_label();
}

card_ace.onclick = () => {
  for (const thief of thieves) {
    if (thief.get() == 1) {
      thief.set(2);
      thief.elem.disabled = false;
    }
  }
  round_score = calculate_round_score();
  update_label();
  card_ace.disabled = true;
}

function calculate_round_score_w_card(card_n) {
  let round_score = 0;
  for (const thief of thieves) {
    if (card_n == thief.get()) {
      round_score += thief.get();
    }
  }
  return round_score;
}
card_2.onclick = () => {
  round_score = calculate_round_score_w_card(2);
  update_label();
  card_2.disabled = true;
}
card_3.onclick = () => {
  round_score = calculate_round_score_w_card(3);
  update_label();
  card_3.disabled = true;
}
card_4.onclick = () => {
  round_score = calculate_round_score_w_card(4);
  update_label();
  card_4.disabled = true;
}
card_5.onclick = () => {
  round_score = calculate_round_score_w_card(5);
  update_label();
  card_5.disabled = true;
}
card_6.onclick = () => {
  round_score = calculate_round_score_w_card(6);
  update_label();
  card_6.disabled = true;
}
card_joker.onclick = () => {
  joker_active = true;
  card_joker.disabled = true;
}


