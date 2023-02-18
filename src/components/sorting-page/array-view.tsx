import { ArrayStates } from "../../types/array-states";
import { TArray } from "../../types/common";
import styles from "./sorting-page.module.css";

const colorSelector = {
    [ArrayStates.Default]: 'var(--default-color)',
    [ArrayStates.Selected]: 'var(--changing-color)',
    [ArrayStates.Sorted]: 'var(--modified-color)'
}

export default function ArrayView ({ array }: { array: TArray }) {
    const elements = array.map((ele, index) => {
        const height = { height: `${340 * (ele.value / 100)}px` };
        const color = { backgroundColor: colorSelector[ele.state]}
        return (
            <div key={index}>
                <div className={styles.bar} style={{ ...height, ...color }}></div>
                <span>{ele.value}</span>
            </div>
        )
    })
    return (
        <div className={styles.array}>
            {elements}
        </div>
    )
}