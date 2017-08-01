import deepFreeze from '../lib/deepFreeze';

export type Armor = {
  name: string;
  defense: number;
  spDefense: number;
  dodge: number;
};

export type Weapon = {
  name: string;
  scaling: number;
  range: number;
  attack: number;
  spAttack: number;
  accuracy: number;
};

export type Details = {
  name: string;
  class: string;
  gender: 'm' | 'f' | '-' | '*';
  spritesheet: string;
};

export type Stats = {
  level: number;
  str: number;
  dex: number;
  agi: number;
  afn: number;
  cha: number;
  gay: number;
  edg: number;
  mta: number;
  luk: number;
  [key: string]: number;
};

export type Partial<T> = { [P in keyof T]?: T[P] };

const TOTAL_MULTIPLIER = 20;

// const enumerable = function enumerable() {
//   return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     descriptor.enumerable = true;
//   };
// };

const calculateStatCost = function calculateStatCost(stat: number) {
  let cost = 0;
  for (let i = 10; i <= stat; i++) {
    cost += Math.floor((i - 1) / 10) + 2;
  }

  return cost;
};

const calculateLevel = function calculateLevel(cost: number) {
  let level = 1;
  let remainingCost = cost;
  while (remainingCost > 0) {
    remainingCost -= 10 + Math.floor(level / 5) + 3;
    if (remainingCost > 0) level++;
  }

  return level;
};

export default class Character {
  [key: string]: number | Function | Details | Partial<Stats>;
  details: Details;
  stats: Partial<Stats>;

  constructor(details: Details, stats: Partial<Stats>) {
    this.details = details;
    this.stats = Object.keys(stats)
      .map(
        stat => (stat !== 'level' && stats[stat] > 100 ? { [stat]: 100 } : { [stat]: stats[stat] }),
      )
      .reduce((acc, statObj) => Object.assign({}, acc, statObj), {});

    this.stats.level = calculateLevel(
      Object.keys(this.stats)
        .map(stat => calculateStatCost(this.stats[stat]))
        .reduce((acc, cost) => acc + cost, 0),
    );

    this.concentration =
      1000 +
      Math.floor(this.scale({ level: 10, afn: 5, dex: 2, luk: 2, cha: 1, edg: 1, mta: -1 }) * 10);

    this.stamina =
      1000 + Math.floor(this.scale({ level: 10, str: 5, agi: 3, luk: 2, dex: 1, edg: -1 }) * 10);

    this.movementRange =
      3 + Math.floor(this.scale({ agi: 10, level: 5, afn: 3, str: 3, edg: -1 }) / 30);

    this.speed =
      10 + Math.floor(this.scale({ agi: 10, level: 5, edg: 2, luk: 2, dex: 2, str: -1 }) / 10);

    this.meleeAccuracy = 50 + this.scale({ dex: 7, str: 6, level: 3, agi: 3, luk: 2, edg: -1 }) / 2;

    this.rangedAccuracy =
      50 + this.scale({ dex: 10, level: 3, agi: 3, afn: 3, luk: 2, edg: -1 }) / 2;

    this.precision = this.scale({ dex: 7, luk: 6, agi: 3, edg: 3, level: 1 });

    this.attack = 10 + this.scale({ str: 8, level: 5, agi: 2, luk: 2, dex: 2, edg: 1 }) / 10;

    this.specialAttack = 10 + this.scale({ afn: 8, level: 5, dex: 2, mta: 2, luk: 2, edg: 1 }) / 10;

    this.charm = 10 + this.scale({ cha: 10, mta: 5, level: 3, str: 2, afn: 1, edg: -1 }) / 10;

    this.defense = 10 + this.scale({ str: 7, level: 5, agi: 3, luk: 3, edg: 2 }) / 10;

    this.specialDefense = 10 + this.scale({ afn: 7, level: 5, mta: 4, agi: 2, luk: 2 }) / 10;

    this.evasion =
      50 + this.scale({ agi: 7, level: 5, dex: 3, luk: 2, afn: 1, mta: 1, edg: 1 }) / 2;

    this.reflex = this.scale({ agi: 7, dex: 4, luk: 4, mta: 3, level: 2 });

    this.social = this.scale({ luk: 10, cha: 10, mta: 10, edg: -10 });

    this.intimidation = this.scale({ edg: 9, cha: 9, mta: 2 }) + this.details.name.length * 5;

    deepFreeze(this);
  }

  private scale(mult: Partial<Stats>) {
    const multSum = Object.keys(mult).map(stat => mult[stat]).reduce((acc, stat) => acc + stat);

    if (multSum !== TOTAL_MULTIPLIER)
      throw new Error(
        `Multipliers have to add up to exactly ${TOTAL_MULTIPLIER}, you have ${multSum}`,
      );

    const stats = Object.keys(this.stats);
    return stats
      .map(
        stat =>
          mult[stat]
            ? this.stats[stat] * mult[stat] / TOTAL_MULTIPLIER +
              Math.floor(this.stats[stat] / (TOTAL_MULTIPLIER * 0.75 - mult[stat] || 1))
            : 0,
      )
      .reduce((acc, stat) => acc + stat, 0);
  }

  updateDetails(newDetails: Partial<Details>) {
    return new Character(Object.assign({}, this.details, newDetails), this.stats);
  }

  updateStats(newStats: Partial<Stats>) {
    return new Character(this.details, Object.assign({}, this.stats, newStats));
  }
}
