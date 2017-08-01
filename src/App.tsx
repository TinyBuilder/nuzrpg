import * as React from 'react';
import { render } from 'react-dom';
import Character, { Armor, Weapon, Details, Stats } from './models/Character';
import CharacterStore from './stores/CharacterStore';
import CharacterInfo from './CharacterInfo';

type State = {
  store: CharacterStore;
};

const defaultDetails: Details = { name: 'Name', class: 'Class', gender: '-', spritesheet: 'none' };
const defaultStats: Stats = {
  level: 0,
  str: 0,
  dex: 0,
  agi: 0,
  afn: 0,
  cha: 0,
  gay: 0,
  edg: 0,
  mta: 0,
  luk: 0,
};

export default class App extends React.Component<{}, State> {
  constructor() {
    super();
    this.state = { store: CharacterStore.load() };
  }

  createNewCharacter() {
    this.setState({
      store: this.state.store.addNewCharacter(new Character(defaultDetails, defaultStats)),
    });
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

  render() {
    return (
      <div>
        {this.state.store.characters.map((character, index) =>
          <CharacterInfo
            character={character}
            update={(newChar: Character) => {
              this.save();
              this.setState({ store: this.state.store.updateCharacter(index, newChar) });
            }}
            key={index}
          />,
        )}
        <button onClick={this.createNewCharacter.bind(this)}>Add new character</button>
      </div>
    );
  }
}

render(<App />, document.getElementById('container'));
