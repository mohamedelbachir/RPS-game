import React from "react";
import ReactDOM from "react-dom";
const modalRoot = document.querySelector("#modal-root") as HTMLElement;
interface Props {
  children?: React.ReactNode;
}
class Modal extends React.Component<Props> {
  el = document.createElement("div");
  constructor(props: Props) {
    super(props);
    this.el.setAttribute("class", "container__modal__help");
  }
  componentDidMount(): void {
    modalRoot?.appendChild(this.el);
  }
  componentWillUnmount(): void {
    modalRoot?.removeChild(this.el);
  }
  render(): React.ReactNode {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Modal;
