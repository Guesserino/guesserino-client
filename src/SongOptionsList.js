import React from 'react';

const SongOptionsList = React.createClass({
  getInitialState () {
    return {
      selectedOption: ''
    };
  },

  render () {
    return (
      <ul className='options-list'>
      {this.props.options.map(option =>
        <SongOptionsListItem
          option={option}
          selected={this.props.selectedOption === option.title}
          showVoters={this.props.selectedOption !== ''|| this.props.secondsRemaining < 1}
          onclick={title => {
            this.props.onclick(title)
          }}/>)}
      </ul>
    )
  }
});

const Voters = ({
  voters,
  showVoters
}) => {
  if (showVoters) {
    return (
      <ul className='voters-list'>
        {voters.map(voter => {
          return (
            <li className='voters-list__voter'>{voter.name}</li>
          )
        })}
      </ul>
    )
  }
  return null
}

const SongOptionsListItem = ({
  option,
  selected,
  showVoters,
  onclick
}) => {
  if (selected) {
    return (
      <li className='options-list__option options-list__option--selected'>
        <h2 className='options-list__option-text options-list__option-text--selected'>{option.title}</h2>
        <Voters showVoters={showVoters} voters={option.voters} />
      </li>
    );
  } else {
    return (
      <li className='options-list__option' onClick={() => onclick(option.title)}>
        <h2 className='options-list__option-text'>{option.title}</h2>
        <Voters showVoters={showVoters} voters={option.voters} />
      </li>
    );
  }
};

export default SongOptionsList
