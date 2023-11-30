import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Button from "./Button";
import { data, GameMode, ButtonData, ListPlayButton } from "../App";
import { ReactComponent as Pentagon } from "./../images/bg-pentagon.svg";
import { ReactComponent as Triangle } from "./../images/bg-triangle.svg";
type Props = {
  record: ButtonData;
  score: number;
  mode: GameMode;
  setScore: (s: number) => void;
};

function Game({ record, score, mode, setScore }: Props) {
  const [userChoose, setUserChoose] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [datas, setDatas] = useState<ButtonData>({});
  const [computedValue, setComputedValue] = useState<boolean>(false);
  const [stateOfGame, setStateOfGame] = useState<
    "draw" | "win" | "loss" | null
  >(null);
  const [userSelectButton, setUserSelectButton] = useState<data | null>(null);
  const indexRef = useRef<HTMLInputElement>(null);

  function handleClick(s: number): void {
    setUserSelectButton(record[s]);
    //console.log(record[s]);
  }

  function handleClickReset() {
    setStateOfGame(null);
    setUserChoose(false);
    setComputedValue(false);
    setUserSelectButton(null);
  }
  useEffect(() => {
    handleClickReset();
  }, [mode]);
  useEffect(() => {
    if (record) {
      setCount([...Object.entries(record)].length);
    }
  }, [record]);
  useLayoutEffect(() => {
    if (record) {
      setDatas(record);
    }
  }, [record]);
  useLayoutEffect(() => {
    let unsubscribe: any;
    if (userChoose) {
      unsubscribe = setInterval(() => {
        setIndex(() => {
          let v = Math.floor(Math.random() * count);
          return v;
        });
      }, 150);
      wait(1000).then(() => {
        clearInterval(unsubscribe);
        setComputedValue(true);

        let value: number = score;
        let randomPick = indexRef.current?.value;

        let data: string = randomPick!;

        if (userSelectButton?.beat.includes(data as ListPlayButton)) {
          setStateOfGame("win");
          value = value + 5;
        } else {
          if (userSelectButton?.loss.includes(data as ListPlayButton)) {
            setStateOfGame("loss");
            value = value - 3;
          } else {
            setStateOfGame("draw");
          }
        }
        setScore(value < 0 ? 0 : value);
      });
      //});
    }
  }, [userChoose]);
  async function wait(time: number) {
    return await new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve("donne");
      }, time);
    });
  }
  useEffect(() => {
    if (userSelectButton) {
      setTimeout(() => {
        setUserChoose(true);
      }, 450);
    }
  }, [userSelectButton]);

  return (
    <div className="container__game">
      {!userChoose && (
        <div className={`container__choose ${mode === "bonus" && "bonus"}`}>
          {mode === "default" ? (
            <Triangle className={`container__game__shape `} />
          ) : (
            <Pentagon className={`container__game__shape `} />
          )}
          {[...Object.entries(datas)].map((b, i) => (
            <Button
              key={i}
              coord={b[1].coord}
              name={b[1].name}
              id={b[0] as unknown as number}
              src={`images/icon-${b[1].name}.svg`}
              click={handleClick}
            />
          ))}
        </div>
      )}
      {userChoose && (
        <div className={`container__play ${userChoose ? "show" : ""}`}>
          <div
            className={`wrapper-btn ${computedValue ? "" : "pick"}  ${
              stateOfGame === "win" ? "winner" : ""
            }`}
          >
            <span className="label-btn">YOU PICKED</span>
            <Button
              name={userSelectButton?.name}
              click={() => console.log("click")}
            />
          </div>
          {stateOfGame && (
            <div className="wrapper-btn wrapper-reset">
              <span className="title">
                {stateOfGame === "win"
                  ? "YOU WIN"
                  : stateOfGame === "loss"
                  ? "YOU LOSE"
                  : stateOfGame === "draw"
                  ? "DRAW"
                  : ""}
              </span>
              <button className="btn-reset" onClick={handleClickReset}>
                Play again
              </button>
            </div>
          )}
          <div
            className={`wrapper-btn ${stateOfGame === "loss" ? "winner" : ""}`}
          >
            <span className="label-btn">THE HOUSE PICKED</span>
            <Button
              name={record[index]?.name}
              click={() => console.log("click")}
            />
          </div>
        </div>
      )}
      <input
        ref={indexRef}
        type="hidden"
        name="viewValue"
        value={record[index]?.name}
      />
      <br />
    </div>
  );
}

export default Game;
