import React from 'react';
import { shallow } from 'enzyme';

import ScoreForm from './scoreform';

describe('<ScoreForm />', () => {
  it('Render a ScoreForm', () => {
    shallow(<ScoreForm />);
  });
});
