type TLinkedListNode<T> = {
    value: T | null;
    next: TLinkedListNode<T> | null;
}

type TLinkedList<T> = {
    head: TLinkedListNode<T> | null;
    prepend: (value: T) => void;
    append: (value: T) => void;
    addByIndex: (value: T, index: number) => void;
    deleteByIndex: (index: number) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    toArray: () => T[];
}

export class LinkedListNode<T> implements TLinkedListNode<T> {
    value: T | null;
    next: LinkedListNode<T> | null;
    
    constructor (value?: T, next?: LinkedListNode<T> | null) {
        this.value = value || null;
        this.next = next || null;
    }
}

export default class LinkedList<T> implements TLinkedList<T> {
    head: LinkedListNode<T> | null = null;

    constructor (values?: T[]) {
        this.head = new LinkedListNode<T>();
        let current = this.head;
        if (values && values.length > 0) {
            for (let i = 0; i < values.length; i++) {
                current.value = values[i];
                if (i < values.length - 1) {
                    current.next = new LinkedListNode<T>();
                    current = current.next;
                }
            }
        }
    }
    
    prepend (value: T) {
        const newHead = new LinkedListNode<T>(value, this.head)
        this.head = newHead;
    }
    
    append (value: T) {
        const newTail = new LinkedListNode<T>(value);
        let current = this.head;
        while (current?.next) {
            current = current.next;
        }
        current!.next = newTail;
    }
    
    addByIndex (value: T, index: number) {
        let current = this.head;
        if (!current) {
            throw new Error("The Linked List is empty");
        }
        if (index === 0) {
            this.prepend(value);
            return;
        }
        for (let i = 0; i < index - 1; i++) {
            if (!current.next) {
                throw new Error("Index exeeds Linked List length");
            }
            current = current.next;
        }
        const insert = new LinkedListNode(value, current.next);
        current.next = insert;
    }
    
    deleteByIndex (index: number) {
        let current = this.head;
        if (!current) {
            throw new Error("The Linked List is empty");
        }
        if (index === 0) {
            this.deleteHead();
            return;
        }
        for (let i = 0; i < index - 1; i++) {
            if (!current.next) {
                throw new Error("Index exeeds Linked List length");
            }
            current = current.next;
        }
        current.next = current.next?.next || null;
    }
    
    deleteHead () {
        this.head = this.head?.next || null;
    }
    
    deleteTail () {
        let current = this.head;
        if (!current) return;
        if (!current.next) {
            this.head = null;
            return;
        }
        while (current.next?.next) {
            current = current.next;
        }
        current.next = null;
    }
    
    toArray () {
        const res: T[] = [];
        if (!this.head) return res;
        let current: TLinkedListNode<T> | null = this.head;
        while (current) {
            res.push(current.value!);
            current = current.next;
        }
        return res;
    }
}