import React, { useEffect, useState } from "react";
import useLinkedList from "../../hooks/use-linked-list";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import styles from "./list-page.module.css";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

enum RunningValues {
  append = 1,
  prepend,
  pop,
  shift,
  addAtIndex,
  deleteAtIndex
}

type TRenderEle = {
  value: number | null;
  super?: {
    value: number | null;
  };
  sub?: {
    value: number | null;
  }
  state: ElementStates;
}

export const ListPage: React.FC = () => {
  const [value, setValue] = useState<string>();
  const [index, setIndex] = useState<number>();
  const [running, setRunning] = useState<RunningValues | false>(false);
  const [renderArr, setRenderArr] = useState<any>([]);
  const linkedList = useLinkedList<number>(randomList());
  let interval: NodeJS.Timeout | null = null;
  
  function randomList () {
    const length = 3 + Math.floor(Math.random() * 3);
    const arr = [];
    for (let i = 0; i <= length; i++) {
      arr.push(Math.floor(Math.random() * 101));
    }
    return arr;
  }
  
  useEffect(() => {
    setRenderArr(renderDefault());
    return () => {
      if (interval) clearInterval(interval);
    }
  }, [])
  
  useEffect(() => {
    if (!running) {
      interval = setTimeout(() => setRenderArr(renderDefault()), SHORT_DELAY_IN_MS);
    }
  }, [running])

  function renderDefault (): TRenderEle[] {
    const arr = linkedList.toArray().map((ele) => {
      return {
        value: ele,
        state: ElementStates.Default
      }
    });
    return arr;
  }

  function append () {
    setRunning(RunningValues.append);
    const curValue = parseInt(value!);
    setValue('');
    let finished = false;
    setRenderArr((prev: any) => {
      prev[prev.length - 1].super = { value: curValue };
      return prev;
    });
    linkedList.append(curValue);
    interval = setInterval(() => {
      if (finished) {
        setRunning(false);
        clearInterval(interval!);
        return;
      }
      const arr = renderDefault();
      arr[arr.length - 1].state = ElementStates.Modified;
      setRenderArr(arr);
      finished = true;
    }, SHORT_DELAY_IN_MS);
  }
  function prepend () {
    setRunning(RunningValues.prepend);
    const curValue = parseInt(value!);
    setValue('');
    let finished = false;
    setRenderArr((prev: any) => {
      prev[0].super = { value: curValue };
      return prev;
    });
    linkedList.prepend(curValue);
    interval = setInterval(() => {
      if (finished) {
        setRunning(false);
        clearInterval(interval!);
        return;
      }
      const arr = renderDefault();
      arr[0].state = ElementStates.Modified;
      setRenderArr(arr);
      finished = true;
    }, SHORT_DELAY_IN_MS);
  }
  function pop () {
    setRunning(RunningValues.pop);
    const arr = renderDefault();
    const index = arr.length - 1;
    const val = arr[index].value;
    arr[index].value = null;
    arr[index].sub = {value: val};
    setRenderArr(arr);
    interval = setTimeout(() => {
      linkedList.deleteTail();
      setRunning(false);
      clearInterval(interval!);
    }, SHORT_DELAY_IN_MS);
  }
  function shift () {
    setRunning(RunningValues.shift);
    const arr = renderDefault();
    const val = arr[0].value;
    arr[0].value = null;
    arr[0].sub = {value: val};
    setRenderArr(arr);
    interval = setTimeout(() => {
      linkedList.deleteHead();
      setRunning(false);
      clearInterval(interval!);
    }, SHORT_DELAY_IN_MS);
  }
  function addAtIndex () {
    setRunning(RunningValues.addAtIndex);
    const val = value!;
    const goal = index!;
    setValue(undefined);
    setIndex(undefined);
    let currentIndex = 0;
    let finished = false;
    interval = setInterval(() => {
      if (finished) {
        setRunning(false);
        clearInterval(interval!);
        return;
      }
      const arr = renderDefault();
      for (let i = 0; i <= goal; i++) {
        if (i < currentIndex) {
          arr[i].state = ElementStates.Changing;
        }
        if (i === currentIndex && currentIndex <= goal) {
          arr[i].super = {value: parseInt(val)}
        }
        if (i === goal && currentIndex > goal) {
          arr[i].state = ElementStates.Modified;
        }
      }
      setRenderArr(arr);
      if (currentIndex === goal) {
        linkedList.addByIndex(parseInt(val), goal);
      }
      if (currentIndex > goal) finished = true;
      currentIndex++;
    }, SHORT_DELAY_IN_MS);
  }
  function deleteAtIndex () {
    setRunning(RunningValues.deleteAtIndex);
    const goal = index!;
    setValue(undefined);
    setIndex(undefined);
    let currentIndex = 0;
    let finished = false;
    interval = setInterval(() => {
      if (finished) {
        setRunning(false);
        clearInterval(interval!);
        linkedList.deleteByIndex(goal);
        return;
      }
      const arr = renderDefault();
      for (let i = 0; i <= goal; i++) {
        if (i < currentIndex) {
          arr[i].state = ElementStates.Changing;
        }
        if (i === goal && currentIndex > goal) {
          arr[i].state = ElementStates.Modified;
          arr[i].sub = { value: arr[i].value };
          arr[i].value = null;
        }
      }
      setRenderArr(arr);
      if (currentIndex > goal) finished = true;
      currentIndex++;
    }, DELAY_IN_MS);
  }

  const elements = renderArr.map((ele: TRenderEle, index: number) => {
    let head;
    let tail;
    if (ele.super) {
      head = <Circle isSmall={true} letter={String(ele.super.value)} state={ElementStates.Changing} />
    } else if (index === 0) {
      head = 'head';
    }
    if (ele.sub) {
      tail = <Circle isSmall={true} letter={String(ele.sub.value)} state={ElementStates.Changing} />
    } else if (index === renderArr.length - 1) {
      tail = 'tail';
    }
    return (
      <div key={index} className={styles.element}>
        { index > 0 && <ArrowIcon /> }
        <Circle
          letter={String(ele.value || '')}
          index={index}
          head={head}
          tail={tail}
          state={ele.state}
        />
      </div>
    )
  })

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input placeholder="Введите значение" value={value || ''} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setValue(evt.target.value)} maxLength={4} isLimitText={true} disabled={Boolean(running)} />
        <Button onClick={prepend} disabled={Boolean(running) || !value} isLoader={running === RunningValues.prepend}>Добавить в head</Button>
        <Button onClick={append} disabled={Boolean(running) || !value} isLoader={running === RunningValues.append}>Добавить в tail</Button>
        <Button onClick={shift} disabled={Boolean(running) || renderArr.length < 2} isLoader={running === RunningValues.shift}>Удалить из head</Button>
        <Button onClick={pop} disabled={Boolean(running) || renderArr.length < 2} isLoader={running === RunningValues.pop}>Удалить из tail</Button>
      </div>
      <div className={styles.container}>
        <Input placeholder="Введите индекс" type="number" value={index || ''} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setIndex(Math.min(evt.target.valueAsNumber, renderArr.length - 1))} min={0} max={7} disabled={Boolean(running)} />
        <Button onClick={addAtIndex} disabled={Boolean(running) || !value || !index} isLoader={running === RunningValues.addAtIndex}>Добавить по индексу</Button>
        <Button onClick={deleteAtIndex} disabled={Boolean(running) || !value || !index} isLoader={running === RunningValues.deleteAtIndex}>Удалить по индексу</Button>
      </div>
      <div className={styles.render}>{elements}</div>
    </SolutionLayout>
  );
};
