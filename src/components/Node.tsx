import  "./Node.css";
import TypeNode from "../types/Node";

interface Props {
  nodeObj: TypeNode;
}

const Node = (props: Props) => {
  const { row, col, isStart, isEnd, weight } = props.nodeObj;

  const colourStyle = isStart ? 'node-start' : isEnd ? 'node-end' : "";

  return <div className={`node ${colourStyle}`} id={`node-${row}-${col}`}>{weight}</div>;
};

export default Node;
