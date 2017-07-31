import * as React from 'react';
import { render } from 'react-dom';
import Character, { Armor, Weapon, Details, Stats } from './models/Character';
import CharacterStore from './stores/CharacterStore';

type State = {
  store: CharacterStore;
};

export default class App extends React.Component<{}, State> {
  constructor() {
    super();
    this.state = { store: CharacterStore.load() };
  }

  createNewCharacter(details: Details, stats: Stats) {
    this.setState({ store: this.state.store.addNewCharacter(new Character(details, stats)) });
  }

  export() {
    this.state.store.export();
  }

  save() {
    this.state.store.save();
  }

  import(data: string) {
    this.setState({ store: CharacterStore.import(data) });
  }
}
