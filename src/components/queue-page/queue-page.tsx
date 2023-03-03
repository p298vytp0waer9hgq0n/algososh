import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import useQueue from "../../hooks/use-queue";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./queue-page.module.css";

const queueLength = 7;
enum RunningValues {
  Enqueue = 1,
  Dequeue,
  Clear
}

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState<string>();
  const [running, setRunning] = useState<RunningValues | false>(false);
  const queue = useQueue<string>(queueLength);
  let timeout: NodeJS.Timeout | null = null;
  
  useEffect(() => {
    return () => {
      if (timeout) clearInterval(timeout);
    }
  }, [])
  
  function enqueue () {
    queue.enqueue(value as string);
    setRunning(RunningValues.Enqueue);
    setValue('');
    timeout = setTimeout(() => {
      setRunning(false);
    }, SHORT_DELAY_IN_MS);
  }
  function dequeue () {
    setRunning(RunningValues.Dequeue);
    timeout = setTimeout(() => {
      queue.dequeue();
      setRunning(false);
    }, SHORT_DELAY_IN_MS);
  }
  function clearQueue () {
    setRunning(RunningValues.Clear);
    timeout = setTimeout(() => {
      queue.clear();
      setRunning(false);
    }, SHORT_DELAY_IN_MS);
  }

  const elements = queue.elements.map((ele, index) => {
    const isHead = !queue.isEmpty && index === queue.headIndex;
    const isTail = !queue.isEmpty && index === queue.tailIndex;
    let stateValue = ElementStates.Default;
    if ((running === RunningValues.Enqueue && isTail) || (running === RunningValues.Dequeue && isHead) || (running === RunningValues.Clear && ele)) stateValue = ElementStates.Changing; 
    return (
      <Circle 
        key={index}
        letter={ele}
        index={index}
        head={isHead ? 'head' : undefined}
        tail={isTail ? 'tail' : undefined}
        state={stateValue}
      />
    )
  })

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <Input value={value || ''} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setValue(evt.target.value)} maxLength={4} isLimitText={true} disabled={Boolean(running)} />
        <Button onClick={enqueue} disabled={Boolean(running) || !value || queue.isFull} isLoader={running === RunningValues.Enqueue}>Добавить</Button>
        <Button onClick={dequeue} disabled={Boolean(running) || queue.isEmpty} isLoader={running === RunningValues.Dequeue}>Удалить</Button>
        <Button onClick={clearQueue} disabled={Boolean(running) || queue.isEmpty} isLoader={running === RunningValues.Clear}>Очистить</Button>
      </div>
      <div className={styles.render}>
        {elements}
      </div>
    </SolutionLayout>
  );
};
