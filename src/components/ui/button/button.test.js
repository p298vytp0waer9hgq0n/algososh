import renderer from "react-test-renderer";

import { Button } from "./button";

describe(Button, () => {
    it('с текстом', () => {
        const tree = renderer.create(<Button>with text</Button>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('без текста', () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('заблокирована', () => {
        const tree = renderer.create(<Button disabled={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('с индикатором загрузки', () => {
        const tree = renderer.create(<Button isLoader={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});