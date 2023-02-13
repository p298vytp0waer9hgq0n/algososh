import React, { useRef, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>();
  const [working, setWorking] = useState(false);
  const strInput = useRef<HTMLInputElement>(null);
  
  function handleClick () {
    setWorking(true);
  }
  function handleChange (evt: React.ChangeEvent<HTMLInputElement>) {
    setString(evt.target.value);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles['input-container']}>
        <Input ref={strInput} isLimitText={true} maxLength={11} value={string} onChange={handleChange} />
        <Button onClick={handleClick} isLoader={working}>Развернуть</Button>
      </div>
    </SolutionLayout>
  );
};
