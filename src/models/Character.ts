import deepFreeze from '../lib/deepFreeze';

type Armor = {
  name: string;
  defense: number;
  spDefense: number;
  dodge: number;
};

type Weapon = {
  name: string;
  scaling: number;
  range: number;
  attack: number;
  spAttack: number;
  accuracy: number;
};

type Details = {
  name: string;
  class: string;
  gender: 'm' | 'f' | '-' | '*';
  spritesheet: string;
};

type Stats = {
  level?: number;
  str?: number;
  dex?: number;
  agi?: number;
  afn?: number;
  gay?: number;
  edg?: number;
  mta?: number;
  luk?: number;
  [key: string]: number;
};

type Equipment = { armor: Armor; lHand: Weapon; rHand: Weapon };

const TOTAL_MULTIPLIER = 20;

export default class Character {
  details: Details;
  stats: Stats;
  equipment: Equipment;

  constructor(details: Details, stats: Stats, equipment: Equipment) {
    this.details = details;
    this.stats = stats;
    this.equipment = equipment;
    deepFreeze(this);
  }

  private scale(mult: Stats) {
    const stats = Object.keys(this.stats);
    if (
      stats.map(stat => mult[stat]).reduce((acc, stat) => (stat ? acc + stat : acc)) !==
      TOTAL_MULTIPLIER
    )
      throw new Error(`Multipliers have to add up to exactly ${TOTAL_MULTIPLIER}`);

    return stats
      .map(stat => (mult[stat] ? this.stats[stat] * mult[stat] : 0))
      .reduce((acc, stat) => acc + stat);
  }

  get concentration() {
    return this.scale({ level: 10, afn: 5, dex: 2, luk: 2, edg: 2, mta: -1 });
  }

  get stamina() {
    return this.scale({ level: 10, str: 5, agi: 3, luk: 2, dex: 1, edg: -1 });
  }

  get movementRange() {
    return 3 + Math.floor(this.scale({ agi: 10, level: 5, afn: 3, str: 3, edg: -1 }) / 750);
  }
}
