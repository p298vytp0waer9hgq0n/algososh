import { Circle } from "../ui/circle/circle"

import styles from "./fibonacci-page.module.css";

type TFibonacciProps = {
    seq: Array<number>;
}

export function FibonacciString ({ seq }: TFibonacciProps) {
    const elements = seq.map((num, index) => {
        return (
            <div>
                <Circle letter={String(num)} />
                <span className={styles['fibonacci-index']}>{index}</span>
            </div>
        );
    })

    return (
        <div className={styles['fibonacci-container']}>
            {elements}
        </div>
    );
}