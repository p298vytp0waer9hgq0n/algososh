import React, { useEffect, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { ReverseString } from "./reverse-string";
import { ElementStates } from "../../types/element-states";
import switchElems from "../../utils/switch";
import { DELAY_IN_MS } from "../../constants/delays";

import styles from "./string.module.css";

type TWord = Array<{
  letter: string;
  state: ElementStates;
}>

/* const enum WORD_REDUCER_ACTION_TYPE {
  INIT,
  HIGHLIGHT,
  SWITCH
}
type TWordReducerActions = {
  type: WORD_REDUCER_ACTION_TYPE;
  payload?: string;
}
type TWord = {
  word: Array<{
    letter: string;
    state: ElementStates;
  }>;
  currentIndex: number;
  finished: boolean;
}
const initialWordState = {
  word: [],
  currentIndex: 0,
  finished: false
}

function wordReducer (state: TWord, action: TWordReducerActions) {
  switch (action.type) {
    case WORD_REDUCER_ACTION_TYPE.INIT:
      if (!action.payload) return;
      return { 
        word: Array.from(action.payload).map((letter) => {
          return { letter: letter, state: ElementStates.Default };
        }),
        currentIndex: 0,
        finished: false
      };
    case WORD_REDUCER_ACTION_TYPE.HIGHLIGHT: {
      const newWord = [...state.word];
      const xIndex = state.currentIndex;
      const yIndex = state.word.length - 1 - state.currentIndex;
      newWord[xIndex] = { ...newWord[xIndex], state: ElementStates.Changing };
      newWord[yIndex] = { ...newWord[yIndex], state: ElementStates.Changing };
      return {
        ...state, 
        word: newWord
      };
    }
    case WORD_REDUCER_ACTION_TYPE.SWITCH: {
      const newWord = [...state.word];
      const xIndex = state.currentIndex;
      const yIndex = state.word.length - 1 - state.currentIndex;
      switchElems(newWord, xIndex, yIndex);
      return {
        word: newWord,
        currentIndex: state.currentIndex + 1,
        finished: xIndex < yIndex - 1
      }
    }
  }
} */

export const StringComponent: React.FC = () => {
  const [string, setString] = useState('');
  const [running, setRunning] = useState(false);
  const [workingWord, setWorkingWord] = useState<TWord>();
  
  function handleClick () {
    if (string.length < 2) return;
    setRunning(true);
    /* const word = Array.from(string).map((letter) => {
      return {letter: letter, state: ElementStates.Default};
    })
    setWorkingWord(word);
    let promiseA = new Promise((resolve, reject) => {
      resolve('');
    })
    for (let i = 0; i < word.length / 2; i++) {
      promiseA = promiseA.then(() => setTimeout(() => { 
        const newWord = switchElems(word, i, word.length - 1 - i);
        console.log(newWord);
        setWorkingWord(newWord);
      }, 3000 * (i + 1)));
    } */
  }
  function handleChange (evt: React.ChangeEvent<HTMLInputElement>) {
    setString(evt.target.value);
  }
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (running) {
      const word = Array.from(string).map((letter) => {
        return { letter: letter, state: ElementStates.Default };
      });
      let iter = 0;
      const mi = Math.floor((word.length - 1) / 2);
      setWorkingWord(word);
      interval = setInterval(() => {
        if (iter <= mi + 1) {
          setWorkingWord((oldWord) => {
            const fi = iter - 1;
            const si = oldWord!.length - iter;
            const newWord = [ ...oldWord! ];
            if (iter === 0) {
              newWord[0].state = newWord[newWord.length - 1].state = ElementStates.Changing;
            } else {
              switchElems(newWord, fi, si);
              newWord[fi].state = newWord[si].state = ElementStates.Modified;
              if (si - fi > 2) { 
                newWord[fi + 1].state = newWord[si - 1].state = ElementStates.Changing;
              } else { 
                newWord[fi + 1].state = ElementStates.Modified;
                setRunning(false);
              }
            }
            return newWord;
          });
          iter++;
        } 
      }, DELAY_IN_MS);
    }
    return (() => {
      if (interval) clearInterval(interval);
    });
  }, [running])

  return (
    <SolutionLayout title="Строка">
      <div className={styles['input-container']}>
        <Input isLimitText={true} maxLength={11} value={string} onChange={handleChange} disabled={Boolean(running)} />
        <Button onClick={handleClick} disabled={Boolean(running)} isLoader={running}>Развернуть</Button>
      </div>
      { workingWord && <ReverseString word={workingWord} /> }
    </SolutionLayout>
  );
};
