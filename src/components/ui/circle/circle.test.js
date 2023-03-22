import renderer from "react-test-renderer";

import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe(Circle, () => {
    it('без буквы', () => {
        const tree = renderer.create(<Circle />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('с буквами', () => {
        const letters = 'abcd';
        const tree = renderer.create(<Circle letter={letters} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('с head', () => {
        const head = 'head';
        const tree = renderer.create(<Circle head={head} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('с react-элементом в head', () => {
        const head = <Circle />;
        const tree = renderer.create(<Circle head={head} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('с tail', () => {
        const tail = 'tail';
        const tree = renderer.create(<Circle tail={tail} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('с react-елементом в tail', () => {
        const tail = <Circle />;
        const tree = renderer.create(<Circle tail={tail} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('с index', () => {
        const index = 0;
        const tree = renderer.create(<Circle index={index} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('с пропсом isSmall', () => {
        const tree = renderer.create(<Circle isSmall />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('в состоянии default', () => {
        const state = ElementStates.Default;
        const tree = renderer.create(<Circle state={state} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('в состоянии default', () => {
        const state = ElementStates.Default;
        const tree = renderer.create(<Circle state={state} />).toJSON();
        expect(tree).toMatchSnapshot();        
    });

    it('в состоянии changing', () => {
        const state = ElementStates.Changing;
        const tree = renderer.create(<Circle state={state} />).toJSON();
        expect(tree).toMatchSnapshot();        
    });

    it('в состоянии modified', () => {
        const state = ElementStates.Modified;
        const tree = renderer.create(<Circle state={state} />).toJSON();
        expect(tree).toMatchSnapshot();        
    });
})