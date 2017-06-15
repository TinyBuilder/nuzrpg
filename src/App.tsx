import * as React from 'react';
import { render } from 'react-dom';
import Character from './models/Character';

type State = {
  character: Character;
};

export default class App extends React.Component<{}, State> {
  constructor() {
    super();
    this.state = {
      character: new Character(
        { name: '', class: '', gender: '-', spritesheet: '' },
        {
          level: 1,
          str: 10,
          dex: 10,
          agi: 10,
          afn: 10,
          cha: 10,
          gay: 50,
          edg: 50,
          mta: 50,
          luk: 10,
        },
      ),
    };
  }
}
