import React from "react";
import { GameMode } from "../App";
type Props = {
  score: number;
  gameMode: GameMode;
  changeGameMode: (m: GameMode) => void;
};

function HeadScore({ score, gameMode, changeGameMode }: Props) {
  function handleChangeGameMode(e: React.ChangeEvent<HTMLInputElement>) {
    const toogle: GameMode = gameMode === "default" ? "bonus" : "default";
    changeGameMode(toogle);
    localStorage.setItem("mode", toogle);
  }
  return (
    <div className="header">
      <div className={`header__image ${gameMode === "bonus" && "bonus"}`}>
        {gameMode === "default" ? (
          <img src="images/logo.svg" alt="logo" />
        ) : (
          <img src="images/logo-bonus.svg" alt="logo" />
        )}
      </div>
      <div className="switch__container">
        <span>Bonus Mode : </span>
        <div className="switcher__container">
          <input
            type="checkbox"
            id="switch"
            onChange={handleChangeGameMode}
            defaultChecked={gameMode === "bonus"}
          />
          <label htmlFor="switch">Bonus Mode</label>
        </div>
      </div>
      <div className="header__container">
        <div className="header__container__label">score</div>
        <div className="header__container__score">{score}</div>
      </div>
    </div>
  );
}

export default HeadScore;
