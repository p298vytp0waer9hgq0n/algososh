import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

import styles from "./string.module.css";

type TReverseStringProps = {
    word: {letter: string; state: ElementStates}[];
}

export function ReverseString ({ word }: TReverseStringProps) {
    const elements = word.map(({ letter, state }, index) => {
        return <Circle letter={letter} state={state} key={index + letter} />;
    })
    return (
        <div className={`${styles.letters} ${styles.visible}`}>{elements}</div>
    )
}