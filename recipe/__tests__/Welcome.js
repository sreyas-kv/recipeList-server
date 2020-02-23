import React from 'react';
import { shallow, mount } from 'enzyme';
import Welcome from '../src/components/Welcome';

const props = {
    recieveAuth: jest.fn(),

}

describe('<Welcome />', () => {
    it('Renders without crashing', () => {
        shallow(<Welcome {...props} />);
    });


})