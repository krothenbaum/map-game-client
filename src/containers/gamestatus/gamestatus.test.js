import React from 'react';
import { shallow } from 'enzyme';

import GameStatus from './gamestatus';

describe('<GameStatus />', () => {
  let wrapper;
  const testScore = 100;
  const testStrikes = 1;

  beforeEach(() => {
    wrapper = shallow(<GameStatus score={testScore} strikes={testStrikes} />);
  });

  describe('--- Renders GameStatus ---', () => {
    console.log(wrapper);
    expect(wrapper.length).toEqual(1);
  });

  describe('--- Renders div with class strikes ---', () => {
    expect(wrapper.contains(<div className='strikes'>{testStrikes}</div>)).toBe(true);
  });

  describe('--- Div with class strikes equals testStrikes ---', () => {
    expect(wrapper.find('.strike').get(0).props.children).toBe(testStrikes);
  });
});
