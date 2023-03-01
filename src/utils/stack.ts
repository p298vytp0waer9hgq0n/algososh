export type TStack<T> = {
    push: (arg0: T) => void;
    pop: () => void;
    clear: () => void;
    elements: T[];
    size: number;
}

export default class Stack<T> implements TStack<T> {
    private container: T[] = [];

    constructor () {
        this.container = [];
    }
    
    push = (ele: T) => {
        this.container.push(ele);
    }

    pop = () => {
        this.container.pop();
    }

    clear = () => {
        this.container = [];
    }
    
    get elements () {
        return [...this.container];
    }

    get size () {
        return this.container.length;
    }
}