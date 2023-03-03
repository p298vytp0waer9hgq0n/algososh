export type TQueue<T> = {
    enqueue: (arg0: T) => void;
    dequeue: () => void;
    clear: () => void;
    peek: () => T | undefined;
    isEmpty: boolean;
    isFull: boolean;
    headIndex: number;
    tailIndex: number;
    elements: Array<T | undefined>;
}

export default class Queue<T> implements TQueue<T> {
    private container: Array<T | undefined> = [];
    private head: number = 0;
    private tail: number = 0;
    private size: number = 0;
    private length: number = 0;

    constructor (length: number) {
        this.head = 0;
        this.tail = 0;
        this.size = 0;
        this.container = Array(length);
        this.length = length;
    }
    
    enqueue (item: T) {
        if (this.size === this.length) {
            throw new Error("The queue is full, yet additional enqueue attempted.")
        }
        this.container[this.tail % this.length] = item;
        this.tail++;
        this.size++;
    }

    dequeue () {
        if (this.size === 0) {
            throw new Error("The queue is empty, yet dequeue attempted.")
        }
        this.container[this.head % this.length] = undefined;
        this.head++;
        this.size--;
    }
    
    clear () {
        for (let i = 0; i < this.length; i++) {
            this.container[i] = undefined;
        }
        this.head = 0;
        this.tail = 0;
        this.size = 0;
    }
    
    peek () {
        return this.container[this.head];
    }

    get isEmpty () {
        return (this.size === 0);
    }

    get isFull () {
        return (this.size === this.length);
    }
    
    get headIndex () {
        return this.head % this.length;
    }

    get tailIndex () {
        return Math.max(this.tail - 1, 0) % this.length;
    }

    get elements () {
        return [...this.container];
    }
}