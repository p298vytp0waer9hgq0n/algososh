import React, { useEffect, useRef, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import useStack from "../../hooks/use-stack";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./stack-page.module.css";

enum RunningValues {
  Add = 1,
  Remove
}

export const StackPage: React.FC = () => {
  const [value, setValue] = useState<string>();
  const [stackRender, setStackRender] = useState<string[]>([]);
  const [running, setRunning] = useState<RunningValues | false>();
  const stack = useStack<string>();
  const interval = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    return () => {
      if (interval.current) clearTimeout(interval.current);
    }
  }, []);
  
  function stackAdd () {
    setValue('');
    setRunning(RunningValues.Add);
    value && stack.push(value);
    setStackRender(stack.elements);
    interval.current = setTimeout(() => {
      setRunning(false);
    }, SHORT_DELAY_IN_MS);
  }
  function stackRemove () {
    setRunning(RunningValues.Remove);
    interval.current = setTimeout(() => {
      stack.pop();
      setStackRender(stack.elements);
      setRunning(false);
    }, SHORT_DELAY_IN_MS);
  }
  function stackClear () {
    stack.clear();
    setStackRender([]);
  }
  
  const elements = stackRender.map((ele, index) => {
    return (
      <Circle 
        key={index + ele}
        letter={ele}
        index={index}
        head={index === stackRender.length - 1 ? 'top' : undefined}
        state={index === stackRender.length - 1 && running ? ElementStates.Changing : ElementStates.Default}
      />
    )
  })
  
  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input extraClass={styles.input} value={value || ''} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setValue(evt.target.value)} maxLength={4} isLimitText={true} disabled={Boolean(running)} />
        <Button extraClass={styles.button} onClick={stackAdd} disabled={Boolean(running) || !value} isLoader={running === RunningValues.Add}>Добавить</Button>
        <Button extraClass={styles.button} onClick={stackRemove} disabled={Boolean(running) || stackRender.length < 1} isLoader={running === RunningValues.Remove}>Удалить</Button>
        <Button extraClass={styles.button} onClick={stackClear} disabled={Boolean(running) || stackRender.length < 1}>Очистить</Button>
      </div>
      <div className={styles.render}>{elements}</div>
    </SolutionLayout>
  );
};
