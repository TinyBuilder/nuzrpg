import * as React from 'react';
import Character from './models/Character';

type Props = { character: Character; update: (newChar: Character) => void };

type State = { opened: boolean };

const containerStyle: React.CSSProperties = {
  backgroundColor: 'white',
  marginBottom: '8px',
  paddingTop: '8px',
  position: 'relative',
};

const textBoxStyle: React.CSSProperties = {
  border: 0,
  borderBottom: '1px solid gainsboro',
  padding: '8px 8px 0',
  fontSize: '1em',
};

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
        <div style={containerStyle} onClick={this.toggleDisplay.bind(this)}>
          <h3 style={{ margin: 0 }}>
            {this.props.character.details.name}
          </h3>
          <span style={{ color: 'gainsboro' }}>Click to expand</span>
        </div>
      );

    return (
      <div style={containerStyle}>
        <button
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            padding: '8px',
            backgroundColor: 'gainsboro',
            border: 0,
          }}
          onClick={this.toggleDisplay.bind(this)}
        >
          Minimize
        </button>
        <input
          type="text"
          style={textBoxStyle}
          value={this.props.character.details.name}
          onChange={this.update('detail', 'name').bind(this)}
        />
        <br />
        <label>
          Avatar URL:
          <input
            type="text"
            style={textBoxStyle}
            value={this.props.character.details.spritesheet}
            onChange={this.update('detail', 'spritesheet').bind(this)}
          />
        </label>
        <img src={this.props.character.details.spritesheet} alt="avatar" />
        <div>
          <label>
            Class:
            <input
              type="text"
              style={textBoxStyle}
              value={this.props.character.details.class}
              onChange={this.update('detail', 'class').bind(this)}
            />
          </label>
          <br />
          <label>
            Gender:
            <select
              style={{
                backgroundColor: 'transparent',
                border: 0,
                borderBottom: '1px solid gainsboro',
              }}
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
        <div style={{ marginTop: '8px' }}>
          <span style={{ fontSize: '2em' }}>Base Stats</span>
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
