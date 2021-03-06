import { useEffect, useState } from "react";
import TypeNode from "../types/Node";
import Components from "../components";
import dijkstra from '../algorithms/dijkstra';
import "./index.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 40;
const END_NODE_COL = 40;

const createNode = (col: number, row: number): TypeNode => {
  return {
    col,
    row,
    isStart: START_NODE_COL === col && START_NODE_ROW === row,
    isEnd: END_NODE_COL === col && END_NODE_ROW === row,
    weight: 1,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};

const getInitialGrid = () => {
  const grid: TypeNode[][] = [];
  for (let row = 0; row < 50; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const PathFindingVisualiser = () => {
  const [grid, setGrid] = useState<TypeNode[][]>();

  const visualiseDijkstra = () => {
    if (grid === undefined) return;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    console.log(visitedNodesInOrder);
  };

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);
  return (
    <>
      <div>
        <button onClick={visualiseDijkstra}>Just do it</button>
      </div>
      <div className="grid">
        {grid?.map((row, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              {row.map((node, nodeIndex) => {
                return <Components.Node key={nodeIndex} nodeObj={node} />;
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PathFindingVisualiser;
