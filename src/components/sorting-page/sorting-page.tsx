import React, { useEffect, useState } from "react";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ArrayStates } from "../../types/array-states";
import { TArray } from "../../types/common";
import switchElems from "../../utils/switch";
import { Button } from "../ui/button/button";
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
  const [algorithm, setAlgorithm] = useState<AlgorithmValues>(AlgorithmValues.Bubble);

  function selectSort () {
    setArray((oldArray) => {
      return oldArray.map((ele, index) => {
        return {
          ...ele,
          state: index < 2 ? ArrayStates.Selected : ele.state
        }
      });
    });
    let i = 0;
    let startIndex = 0;
    let pivotIndex = 0;
    let currentIndex = 0;
    const currentArray = [ ...array ];
    const interval = setInterval(() => {
      console.log(i++);
      const condition = running === RunningValues.Ascending ? currentArray[pivotIndex].value > currentArray[currentIndex].value : currentArray[pivotIndex].value < currentArray[currentIndex].value;
      if (condition) pivotIndex = currentIndex;
      currentIndex++;
      if (currentIndex > currentArray.length - 1) {
        switchElems(currentArray, startIndex, pivotIndex);
        startIndex++;
        pivotIndex = currentIndex = startIndex;
      } else {
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
        clearInterval(interval!);
      }
    }, DELAY_IN_MS);
  }
  
  function bubbleSort () {
    setArray((oldArray) => {
      return oldArray.map((ele, index) => {
        return {
          ...ele,
          state: index < 2 ? ArrayStates.Selected : ArrayStates.Default
        }
      });
    });
    let i = 0;
    let firstIndex = 0;
    let secondIndex = 1;
    let endIndex = array.length - 1;
    const currentArray = [ ...array ];
    const interval = setInterval(() => {
      // console.log(i++);
      const condition = running === RunningValues.Ascending ? currentArray[firstIndex].value > currentArray[secondIndex].value : currentArray[firstIndex].value < currentArray[secondIndex].value;
      if (condition) {
        switchElems(currentArray, firstIndex, secondIndex);
      } 
      if (endIndex < 2) {
        endIndex = -1;
      } else {
        firstIndex++;
        secondIndex++;
        if (secondIndex > endIndex) {
          endIndex--;
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
        clearInterval(interval);
      }
    }, DELAY_IN_MS);
  }
  
  useEffect(() => {
    setArray([5, 100, 66, 56, 16].map((ele) => {
      return {
        value: ele,
        state: ArrayStates.Default
      }
    }));
  }, []);

  useEffect(() => {
    if (running && algorithm === AlgorithmValues.Select) {
      selectSort();
    }
    if (running && algorithm === AlgorithmValues.Bubble) {
      bubbleSort();
    }
  }, [running])

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.controls}>
        <RadioInput label="Выбор" />
        <RadioInput label="Пузырёк" />
        <Button onClick={() => setRunning(RunningValues.Ascending)}>По возрастанию</Button>
        <Button onClick={() => setRunning(RunningValues.Descending)}>По убыванию</Button>
        <Button>Новый массив</Button>
      </div>
      <ArrayView array={array} />
    </SolutionLayout>
  );
};
