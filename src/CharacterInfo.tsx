import * as React from 'react';
import Character from './models/Character';

type Props = { character: Character };

type State = { opened: boolean };

export default class CharacterInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super();
    this.state = { opened: false };
  }

  toggleDisplay() {
    this.setState({ opened: !this.state.opened });
  }

  render() {
    if (!this.state.opened)
      return (
        <div>
          <h3>
            {this.props.character.details.name}
          </h3>
        </div>
      );

    return (
      <div>
        <h3>
          {this.props.character.details.name}
        </h3>
        <img src={this.props.character.details.spritesheet} alt="profile" />
        <div>
          <span>
            Class: {this.props.character.details.class}
          </span>
          <br />
          <span>
            Gender: {this.props.character.details.gender}
          </span>
        </div>
        <div>
          <span>Base Stats</span>
          
        </div>
      </div>
    );
  }
}
