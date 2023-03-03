import React, { useEffect, useRef, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ArrayStates } from "../../types/array-states";
import { TArray } from "../../types/common";
import switchElems from "../../utils/switch";
import { Button } from "../ui/button/button";
import { AscendingIcon } from "../ui/icons/ascending-icon";
import { DescendingIcon } from "../ui/icons/descending-icon";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import ArrayView from "./array-view";

import styles from "./sorting-page.module.css";

enum RunningValues {
  Ascending = 1,
  Descending
}
enum AlgorithmValues {
  Select,
  Bubble
}

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<TArray>([]);
  const [running, setRunning] = useState<RunningValues | false>(false);
  const [algorithm, setAlgorithm] = useState<AlgorithmValues>(AlgorithmValues.Select);
  const interval = useRef<NodeJS.Timeout>();

  function randomArr () {
    const length = 3 + Math.floor(Math.random() * 14);
    const arr = [];
    for (let i = 0; i <= length; i++) {
      arr.push({value: Math.floor(Math.random() * 101), state: ArrayStates.Default});
    }
    return arr;
  }

  function selectSort (direction: RunningValues) {
    setArray((oldArray) => {
      return oldArray.map((ele, index) => {
        return {
          ...ele,
          state: index < 2 ? ArrayStates.Selected : ele.state
        }
      });
    });
    let startIndex = 0;
    let pivotIndex = 0;
    let currentIndex = 0;
    const currentArray = [ ...array ];
    interval.current = setInterval(() => {
      const condition = direction === RunningValues.Ascending ? currentArray[pivotIndex].value > currentArray[currentIndex].value : currentArray[pivotIndex].value < currentArray[currentIndex].value;
      if (condition) pivotIndex = currentIndex;
      currentIndex++;
      if (currentIndex > currentArray.length - 1) {
        switchElems(currentArray, startIndex, pivotIndex);
        startIndex++;
        pivotIndex = currentIndex = startIndex;
      }
      setArray(currentArray.map((ele, index) => {
        let state: ArrayStates | undefined;
        if (index < startIndex) state = ArrayStates.Sorted;
        if (index === pivotIndex || index === currentIndex) state = ArrayStates.Selected;
        return {
          ...ele,
          state: state ? state : ArrayStates.Default
        }
      }));
      if (startIndex > currentArray.length - 1) {
        setRunning(false);
        clearInterval(interval.current!);
      }
    }, DELAY_IN_MS);
  }
  
  function bubbleSort (direction: RunningValues) {
    setArray((oldArray) => {
      return oldArray.map((ele, index) => {
        return {
          ...ele,
          state: index < 2 ? ArrayStates.Selected : ArrayStates.Default
        }
      });
    });
    let lastIndex = -1;
    let firstIndex = 0;
    let secondIndex = 1;
    let endIndex = array.length - 1;
    const currentArray = [ ...array ];
    interval.current = setInterval(() => {
      const condition = direction === RunningValues.Ascending ? currentArray[firstIndex].value > currentArray[secondIndex].value : currentArray[firstIndex].value < currentArray[secondIndex].value;
      if (condition) {
        switchElems(currentArray, firstIndex, secondIndex);
        lastIndex = firstIndex;
      } 
      if (endIndex < 2) {
        endIndex = -1;
      } else {
        firstIndex++;
        secondIndex++;
        if (secondIndex > endIndex) {
          endIndex = lastIndex;
          lastIndex = -1;
          firstIndex = 0;
          secondIndex = 1;
        }
      }
      setArray(currentArray.map((ele, index) => {
        let state: ArrayStates | undefined;
        if (index === firstIndex || index === secondIndex) state = ArrayStates.Selected;
        if (index > endIndex) state = ArrayStates.Sorted;
        return {
          ...ele,
          state: state ? state : ArrayStates.Default
        }
      }));
      if (endIndex < 0) {
        setRunning(false);
        clearInterval(interval.current!);
      }
    }, DELAY_IN_MS);
  }
  
  useEffect(() => {
    setArray(randomArr());
    return () => {
      if (interval.current) clearInterval(interval.current);
    }
  }, []);

  function runSort (runningValue: RunningValues) {
    setRunning(runningValue);
    if (algorithm === AlgorithmValues.Select) selectSort(runningValue);
    if (algorithm === AlgorithmValues.Bubble) bubbleSort(runningValue);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.controls}>
        <RadioInput extraClass={styles.radio} label="Выбор" checked={algorithm === AlgorithmValues.Select} onChange={() => setAlgorithm(AlgorithmValues.Select)} disabled={Boolean(running)} />
        <RadioInput extraClass={styles.radio} label="Пузырёк" checked={algorithm === AlgorithmValues.Bubble} onChange={() => setAlgorithm(AlgorithmValues.Bubble)} disabled={Boolean(running)} />
        <Button extraClass={styles.button} onClick={() => runSort(RunningValues.Ascending)} disabled={Boolean(running)} isLoader={running === RunningValues.Ascending}><AscendingIcon />По возрастанию</Button>
        <Button extraClass={styles.button} onClick={() => runSort(RunningValues.Descending)} disabled={Boolean(running)} isLoader={running === RunningValues.Descending}><DescendingIcon />По убыванию</Button>
        <Button extraClass={styles.button} onClick={() => setArray(randomArr())} disabled={Boolean(running)}>Новый массив</Button>
      </div>
      <ArrayView array={array} />
    </SolutionLayout>
  );
};
