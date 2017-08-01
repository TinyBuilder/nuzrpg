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
          <h3 onClick={this.toggleDisplay.bind(this)}>
            {this.props.character.details.name}
          </h3>
        </div>
      );

    return (
      <div>
        <h3 onClick={this.toggleDisplay.bind(this)}>
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
          <form>
            {Object.keys(this.props.character.stats).map(stat =>
              <label key={stat}>
                {stat}:<input
                  type="number"
                  name={`${this.props.character.details.name}${stat}`}
                  defaultValue={String(this.props.character.stats[stat])}
                />
              </label>,
            )}
            <input type="submit" value="Save" />
          </form>
        </div>
        <div>
          <span>Derived Stats</span>
          {Object.keys(this.props.character).map(stat => {
            if (typeof this.props.character[stat] !== 'number') return;
            return (
              <div key={stat}>
                <span>
                  {stat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                </span>
                <span>
                  {this.props.character[stat]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
