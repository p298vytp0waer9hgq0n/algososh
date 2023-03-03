import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./fibonacci-page.module.css";
import { FibonacciString } from "./fibonacci-string";

export const FibonacciPage: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [limit, setLimit] = useState<number>();
  const [sequense, setSequense] = useState<Array<number>>();

  function handleClick () {
    if (!limit) return;
    setRunning(true);
  }
  function handleChange (evt: React.ChangeEvent<HTMLInputElement>) {
    setLimit(evt.target.valueAsNumber);
  }
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (running) {
      setSequense([1]);
      let iter = 0;
      let until = limit!;
      interval = setInterval(() => {
        iter++;
        if (until && iter <= until) {
          setSequense((oldSequence) => {
            if (oldSequence!.length <= 1) return [1, 1];
            const newSequense = [ ...oldSequence! ];
            newSequense.push(newSequense[newSequense.length - 1] + newSequense[newSequense.length - 2]);
            return newSequense;
          });
        } else {
          setRunning(false);
        }
      }, SHORT_DELAY_IN_MS);
    }
    return (() => {
      if (interval) clearInterval(interval);
    });
  }, [running])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles['input-container']}>
        <Input extraClass={styles.input} value={limit || ''} isLimitText={true} type={'number'} max={19} min={1} onChange={handleChange} />
        <Button extraClass={styles.button} onClick={handleClick} isLoader={running} disabled={(!limit && limit !== 0) || limit > 19}>Рассчитать</Button>
      </div>
      { sequense && <FibonacciString seq={sequense} /> }
    </SolutionLayout>
  );
};
