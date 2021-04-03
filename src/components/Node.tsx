import "components/Node.css";
import TypeNode from "types/Node";

interface Props {
  nodeObj: TypeNode;
}

const Node = (props: Props) => {
  const { y: row, x: col, isStart, isEnd, weight } = props.nodeObj;

  const colourStyle = isStart ? "node-start" : isEnd ? "node-end" : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${colourStyle}`}
      style={{ opacity: weight }}
    >
      {/* {weight} */}
    </div>
  );
};

export default Node;
