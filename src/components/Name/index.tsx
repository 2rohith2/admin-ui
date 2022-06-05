import React from 'react';
import './index.scss';

interface Props {
  id: string;
  name: string;
}

export default function NameComponent(props: Props): JSX.Element {
  const colorFinder = parseInt(props.id) % 5;

  function getFirstLettersFromFullName(): string {
    const splitName = props.name.split(' ');
    const firstName = splitName[0];
    if (splitName.length === 2) {
      const lastName = splitName[1];
      return `${firstName[0]}${lastName[0]}`;
    } else {
      return firstName[0];
    }
  }

  return (
    <div className='name-container'>
      <div className={`name-placeholder color-${colorFinder}`}>
        {getFirstLettersFromFullName()}
      </div>
      <div className='name'>
        <div>{props.name}</div>
        <div className='id'>
          {props.id}
        </div>
      </div>
    </div >
  );
}