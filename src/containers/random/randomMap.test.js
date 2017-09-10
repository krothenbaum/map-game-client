import React from 'react';
import { shallow } from 'enzyme';

import { resetGame } from '../random/randomMap.js';
import { RandomCityMap } from './index';

describe('<RandomCityMap />', () => {
  let wrapper;
  const winner = true;
  const distance = 1000;
  const center = {'lat': 45.52, 'lng': -122.68};
  const name = "Portland";

  beforeEach(() => {
    wrapper = shallow(<RandomCityMap winner={winner} center={center} distance={distance} name={name} />);
  });

  it('--- Render RandomCityMap ---', () => {
    expect(wrapper.length).toEqual(1);
  });

  // it('--- Contains RandomCity Component ---', () => {
  //   console.log(wrapper);
  //   expect(wrapper.contains(<button>Is `{name}` the closest</button>)).toBe(true);
  // })
});
