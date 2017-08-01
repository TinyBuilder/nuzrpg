import deepFreeze from '../lib/deepFreeze';
import Character from '../models/Character';

export default class CharacterStore {
  characters: Character[];

  constructor(characters?: Character | Character[]) {
    if (!characters) {
      this.characters = [];
    } else if (Array.isArray(characters)) {
      this.characters = characters;
    } else {
      this.characters = [characters];
    }

    deepFreeze(this);
  }

  addNewCharacter(character: Character) {
    return new CharacterStore(this.characters.concat(character));
  }

  removeCharacter(characterID: number) {
    return new CharacterStore(
      this.characters.slice(0, characterID - 1).concat(this.characters.slice(characterID + 1)),
    );
  }

  updateCharacter(id: number, character: Character) {
    return new CharacterStore(
      this.characters.slice(0, id - 1).concat(character).concat(this.characters.slice(id + 1)),
    );
  }

  export() {
    return JSON.stringify(this.characters);
  }

  save() {
    localStorage.setItem('savedCharacters', this.export());
  }

  static import(data: string) {
    return new CharacterStore(JSON.parse(data));
  }

  static load() {
    return CharacterStore.import(localStorage.getItem('savedCharacters'));
  }
}
