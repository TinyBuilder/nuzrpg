import * as React from 'react';
import Character from './models/Character';

type Props = { character: Character; update: (newChar: Character) => void };

type State = { opened: boolean };

export default class CharacterInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super();
    this.state = { opened: false };
  }

  toggleDisplay() {
    this.setState({ opened: !this.state.opened });
  }

  update(type: 'detail' | 'stat', prop: string) {
    return (e: React.FormEvent<HTMLInputElement>) => {
      if (type === 'detail')
        return this.props.update(
          this.props.character.updateDetails({ [prop]: e.currentTarget.value }),
        );

      this.props.update(
        this.props.character.updateStats({ [prop]: parseInt(e.currentTarget.value) }),
      );
    };
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
        <button onClick={this.toggleDisplay.bind(this)}>Minimize</button>
        <input
          type="text"
          value={this.props.character.details.name}
          onChange={this.update('detail', 'name').bind(this)}
        />
        <label>
          Picture URL:
          <input
            type="text"
            value={this.props.character.details.spritesheet}
            onChange={this.update('detail', 'spritesheet').bind(this)}
          />
        </label>
        <img src={this.props.character.details.spritesheet} alt="profile" />
        <div>
          <label>
            Class:
            <input
              type="text"
              value={this.props.character.details.class}
              onChange={this.update('detail', 'class').bind(this)}
            />
          </label>
          <br />
          <label>
            Gender:
            <select
              value={this.props.character.details.gender}
              onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                this.props.update(
                  this.props.character.updateDetails({
                    gender: e.currentTarget.value as 'm' | 'f' | '-' | '*',
                  }),
                );
              }}
            >
              <option>m</option>
              <option>f</option>
              <option>-</option>
              <option>*</option>
            </select>
          </label>
        </div>
        <div>
          <span>Base Stats</span>
          <form>
            {Object.keys(this.props.character.stats).map(stat =>
              <div>
                <br />
                <label key={stat}>
                  {stat}:<input
                    type="number"
                    name={`${this.props.character.details.name}${stat}`}
                    value={this.props.character.stats[stat]}
                    onChange={this.update('stat', stat).bind(this)}
                  />
                </label>
              </div>,
            )}
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
