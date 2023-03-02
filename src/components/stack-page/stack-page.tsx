import React, { useEffect, useState } from "react";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import useStack from "../../hooks/use-stack";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState<string>();
  const [stackRender, setStackRender] = useState<string[]>([]);
  const [running, setRunning] = useState<boolean>();
  const stack = useStack<string>();
  let interval: NodeJS.Timeout | null = null;
  
  useEffect(() => {
    return () => {
      if (interval) clearTimeout(interval);
    }
  }, []);
  
  function stackAdd () {
    setValue('');
    setRunning(true);
    value && stack.push(value);
    setStackRender(stack.elements);
    interval = setTimeout(() => {
      setRunning(false);
    }, SHORT_DELAY_IN_MS);
  }
  function stackRemove () {
    setRunning(true);
    interval = setTimeout(() => {
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
        <Input value={value || ''} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setValue(evt.target.value)} maxLength={4} isLimitText={true} />
        <Button onClick={stackAdd}>Добавить</Button>
        <Button onClick={stackRemove}>Удалить</Button>
        <Button onClick={stackClear}>Очистить</Button>
      </div>
      <div className={styles.render}>{elements}</div>
    </SolutionLayout>
  );
};
