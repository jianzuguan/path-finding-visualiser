import 'components/Node.css';
import TypeNode from 'types/Node';

interface Props {
  nodeObj: TypeNode;
}

const calculateClassName = (nodeObj: TypeNode) => {
  if (nodeObj.isStart) return 'node node-start';
  if (nodeObj.isFinish) return 'node node-finish';
  if (nodeObj.isInShortestPath) return 'node node-shortest-path';
  if (nodeObj.isVisited) return 'node node-visited';

  return 'node';
};

const Node = (props: Props) => {
  const { y: row, x: col, weight } = props.nodeObj;

  const colourStyle = calculateClassName(props.nodeObj);

  return (
    <div
      id={`node-${row}-${col}`}
      className={colourStyle}
      style={{ opacity: weight }}
    >
      {/* {weight} */}
    </div>
  );
};

export default Node;
