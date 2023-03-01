import { useRef } from "react";
import Stack, { TStack } from "../utils/stack";

export default function useStack<T> () {
    const ref = useRef<TStack<T>>();
    if (!ref.current) {
        ref.current = new Stack<T>();
    }
    return ref.current;
}