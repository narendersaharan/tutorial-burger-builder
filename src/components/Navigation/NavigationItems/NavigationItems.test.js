import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
    adapter: new Adapter()
});

describe('<NavigationItems />', () => {
    let wrapper = null;
    
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two navigation item if it is not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three navigation item if it is authenticated', () => {
        //wrapper = shallow(<NavigationItems isAuth/>);
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should contains logout navigation item if it is authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>))
    });
});