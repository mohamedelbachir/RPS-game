import React, { useEffect } from "react";
import { ListPlayButton, icons } from "../App";
export interface Position {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
}

type ButtonProps = {
  coord?: Position;
  name?: string;
  src?: string;
  id?: number;
  click?: (id: number) => void;
};

function Button({ coord, name, src, click, id }: ButtonProps) {
  function handleClick(
    e: React.MouseEvent<HTMLButtonElement>,
    v: number
  ): void {
    e.preventDefault();
    click!(v);
  }

  return (
    <button
      className={`btn btn-${name} ${coord ? "" : "btn-no-transform"}`}
      style={{
        position: coord ? "absolute" : undefined,
        top: coord?.top + "%",
        left: coord?.left === "unset" ? "" : coord?.left + "%",
        right: coord?.right + "%",
        bottom: coord?.bottom + "%",
      }}
      onClick={(e) => handleClick(e, id!)}
    >
      {icons[name as ListPlayButton]}
    </button>
  );
}

export default Button;
