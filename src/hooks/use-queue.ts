import { useRef } from "react";
import Queue, { TQueue } from "../utils/queue";

export default function useQueue<T> (length: number) {
    const ref = useRef<TQueue<T>>();
    if (!ref.current) {
        ref.current = new Queue<T>(length);
    }
    return ref.current;
}