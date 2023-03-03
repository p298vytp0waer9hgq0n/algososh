import { useRef } from "react";
import LinkedList from "../utils/linked-list";

export default function useLinkedList<T> (arr?: T[]) {
    const ref = useRef<LinkedList<T>>();
    if (!ref.current) {
        ref.current = new LinkedList<T>(arr);
    }
    return ref.current;
}