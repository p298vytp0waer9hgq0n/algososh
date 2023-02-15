import React, { useRef, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./string.module.css";
import { ReverseString } from "./reverse-string";
import { ElementStates } from "../../types/element-states";
import switchElems from "../../utils/switch";

const enum WORD_REDUCER_ACTION_TYPE {
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
}

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [running, setRunning] = useState(false);
  const [workingWord, setWorkingWord] = useState<any>();
  const strInput = useRef<HTMLInputElement>(null);
  
  function handleClick () {
    if (string.length < 2) return;
    setRunning(true);
    const word = Array.from(string).map((letter) => {
      return {letter: letter, state: ElementStates.Default};
    })
    setWorkingWord(word);
  }
  function handleChange (evt: React.ChangeEvent<HTMLInputElement>) {
    setString(evt.target.value);
  }
  function finishRender () {
    setRunning(false);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles['input-container']}>
        <Input ref={strInput} isLimitText={true} maxLength={11} value={string} onChange={handleChange} />
        <Button onClick={handleClick} isLoader={running}>Развернуть</Button>
      </div>
      { workingWord && <ReverseString word={workingWord} /> }
    </SolutionLayout>
  );
};
