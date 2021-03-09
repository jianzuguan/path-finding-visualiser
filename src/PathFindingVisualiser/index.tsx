import { useEffect, useState } from "react";
import TypeNode from "../types/Node";
import Components from "../components";
import dijkstra, { getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import "./index.css";
import { getRandomInt } from "../utils";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 30;
const END_NODE_COL = 30;

const createNode = (col: number, row: number): TypeNode => {
  return {
    col,
    row,
    isStart: START_NODE_COL === col && START_NODE_ROW === row,
    isEnd: END_NODE_COL === col && END_NODE_ROW === row,
    weight: getRandomInt(1, 100),
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};

const getInitialGrid = () => {
  const grid: TypeNode[][] = [];
  for (let row = 0; row < 40; row++) {
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

  const animateShortestPath = (nodesInShortestPathOrder: TypeNode[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (
          node === null ||
          (START_NODE_ROW === node.row && START_NODE_COL === node.col) ||
          (END_NODE_ROW === node.row && END_NODE_COL === node.col)
        ) {
          return;
        }
        const domElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (domElement === null) {
          return;
        }
        domElement.className = "node node-shortest-path";
      }, 50 * i);
    }
  };

  const animateDijkstra = async (
    visitedNodesInOrder: TypeNode[],
    nodesInShortestPathOrder: TypeNode[]
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (
          node === null ||
          (START_NODE_ROW === node.row && START_NODE_COL === node.col) ||
          (END_NODE_ROW === node.row && END_NODE_COL === node.col)
        ) {
          return;
        }
        const domElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (domElement !== null) {
          domElement.className = "node node-visited";
        }
      }, 10 * i);
    }
  };

  const visualiseDijkstra = () => {
    if (grid === undefined) return;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
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
