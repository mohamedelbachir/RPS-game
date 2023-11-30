import React from "react";
import HeadScore from "./components/HeadScore";
import Modal from "./components/Modal";
import Game from "./components/Game";
import { Position } from "./components/Button";
import { ReactComponent as BonusRule } from "./images/image-rules-bonus.svg";
import { ReactComponent as Rule } from "./images/image-rules.svg";
import { ReactComponent as Paper } from "./icons/icon-paper.svg";
import { ReactComponent as Lizard } from "./icons/icon-lizard.svg";
import { ReactComponent as Rock } from "./icons/icon-rock.svg";
import { ReactComponent as Scissor } from "./icons/icon-scissors.svg";
import { ReactComponent as Spock } from "./icons/icon-spock.svg";
type Props = {};
export type GameMode = "default" | "bonus";
interface State {
  score: number;
  showHelp: boolean;
  mode: GameMode;
}

export type ListPlayButton = "paper" | "scissors" | "rock" | "lizard" | "spock";
export interface data {
  name: ListPlayButton;
  loss: Array<ListPlayButton>;
  beat: Array<ListPlayButton>;
  coord: Position;
}

export const icons: Record<ListPlayButton, JSX.Element> = {
  paper: <Paper />,
  scissors: <Scissor />,
  rock: <Rock />,
  lizard: <Lizard />,
  spock: <Spock />,
};

export type ButtonData = Record<number, data>;
const DefaultPlayButtons: ButtonData = {
  0: {
    beat: ["rock"],
    loss: ["scissors"],
    name: "paper",
    coord: { top: 0, left: 0, right: "unset", bottom: "unset" },
  },
  1: {
    beat: ["scissors"],
    loss: ["paper"],
    name: "rock",
    coord: { bottom: -90, left: 50, right: "unset", top: "unset" },
  },
  2: {
    beat: ["paper"],
    loss: ["rock"],
    name: "scissors",
    coord: { right: -65, top: 0, left: "unset", bottom: "unset" },
  },
};

const BonusPlayButtons: ButtonData = {
  0: {
    beat: ["rock", "spock"],
    loss: ["scissors", "lizard"],
    name: "paper",
    coord: { top: 35, right: -40, left: "unset", bottom: "unset" },
  },
  1: {
    beat: ["scissors", "lizard"],
    loss: ["paper", "spock"],
    name: "rock",
    coord: { bottom: -50, right: -25, left: "unset", top: "unset" },
  },
  2: {
    beat: ["paper", "lizard"],
    loss: ["rock", "spock"],
    name: "scissors",
    coord: { left: 50, top: 0, right: "unset", bottom: "unset" },
  },
  3: {
    beat: ["spock", "paper"],
    loss: ["scissors", "rock"],
    name: "lizard",
    coord: { bottom: -50, left: 25, right: "unset", top: "unset" },
  },
  4: {
    beat: ["scissors", "rock"],
    loss: ["lizard", "paper"],
    name: "spock",
    coord: { left: 5, top: 35, right: "unset", bottom: "unset" },
  },
};
const Data: Record<GameMode, ButtonData> = {
  default: DefaultPlayButtons,
  bonus: BonusPlayButtons,
};

class App extends React.Component<Props, State> {
  state: State = {
    score: localStorage.getItem("score")
      ? (localStorage.getItem("score") as unknown as number)
      : 0,
    showHelp: false,
    mode: (localStorage.getItem("mode") as GameMode) ?? "default",
  };
  constructor(props: Props) {
    super(props);
    this.setScore = this.setScore.bind(this);
    this.setGameMode = this.setGameMode.bind(this);
  }

  handleOpenModal(state: boolean) {
    this.setState((s) => ({
      ...s,
      showHelp: state,
    }));
  }
  setScore(score: number): void {
    this.setState((s) => ({
      ...s,
      score: score,
    }));
    localStorage.setItem("score", score.toString());
  }
  setGameMode(mode: GameMode) {
    this.setScore(0);
    this.setState((s) => ({
      ...s,
      mode: mode,
    }));
  }
  render() {
    return (
      <div className="container">
        {this.state.showHelp && (
          <Modal>
            <div className="container__modal__content">
              <div className="container__title">
                <h1 className="title-modal">RULES</h1>
                <img
                  src="images/icon-close.svg"
                  alt="close"
                  onClick={() => this.handleOpenModal(false)}
                />
              </div>

              {this.state.mode === "default" ? <Rule /> : <BonusRule />}
            </div>
          </Modal>
        )}
        <HeadScore
          score={this.state.score}
          gameMode={this.state.mode}
          changeGameMode={this.setGameMode}
        />
        <Game
          record={Data[this.state.mode]}
          mode={this.state.mode}
          score={this.state.score}
          setScore={this.setScore}
        />
        <div className="wrapper-help">
          <span className="text">
            Challenge by{" "}
            <a
              href="https://www.frontendmentor.io?ref=challenge"
              target="_blank"
              rel="noreferrer"
            >
              Frontend Mentor
            </a>
            . Coded by
            <a
              href="http://github.com/mohamedelbachir"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Mohamed
            </a>
            .
          </span>
          <button
            className="btn-help"
            onClick={() => this.handleOpenModal(true)}
          >
            RULES
          </button>
        </div>
      </div>
    );
  }
}
export default App;
