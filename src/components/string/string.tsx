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

export const StringComponent: React.FC = () => {
  const [string, setString] = useState('');
  const [running, setRunning] = useState(false);
  const [workingWord, setWorkingWord] = useState<TWord>();
  
  function handleClick () {
    // if (string.length < 2) return;
    setRunning(true);
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
        if (word.length === 1) {
          setWorkingWord((oldWord) => {
            oldWord![0].state = ElementStates.Modified;
            return oldWord;
          })
          setRunning(false);
        } else if (iter <= mi + 1) {
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
  }, [running, string])

  return (
    <SolutionLayout title="Строка">
      <div className={styles['input-container']}>
        <Input isLimitText={true} maxLength={11} value={string} onChange={handleChange} disabled={Boolean(running)} />
        <Button onClick={handleClick} disabled={running || !string} isLoader={running}>Развернуть</Button>
      </div>
      { workingWord && <ReverseString word={workingWord} /> }
    </SolutionLayout>
  );
};
