import React from 'react';
import { shallow } from 'enzyme';

import { ScoreBoard } from './scoreboard';

describe('<ScoreBoard />', () => {
  it('Renders without crashing', () => {
    shallow(<ScoreBoard />);
  });

})
