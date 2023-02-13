import React, { useRef, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./string.module.css";
import { ReverseString } from "./reverse-string";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [working, setWorking] = useState(false);
  const [workingWord, setWorkingWord] = useState<any>();
  const strInput = useRef<HTMLInputElement>(null);
  
  function handleClick () {
    setWorking(true);
    const word = Array.from(string).map((letter) => {
      return {letter: letter, state: ElementStates.Default};
    })
    setWorkingWord(word);
  }
  function handleChange (evt: React.ChangeEvent<HTMLInputElement>) {
    setString(evt.target.value);
  }
  function finishRender () {
    setWorking(false);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles['input-container']}>
        <Input ref={strInput} isLimitText={true} maxLength={11} value={string} onChange={handleChange} />
        <Button onClick={handleClick} isLoader={working}>Развернуть</Button>
      </div>
      { workingWord && <ReverseString word={workingWord} /> }
    </SolutionLayout>
  );
};
