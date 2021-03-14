import { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import TypeNode from "../types/Node";
import Components from "../components";
import dijkstra, { getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import "./index.css";
import { noise } from "../utils/perlinNoise";

const NUM_ROWS = 32;
const NUM_COLS = 64;
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = NUM_ROWS - 10;
const END_NODE_COL = NUM_COLS - 10;
const NOISE_ZOOM = 0.25;
const NOISE_OFFSET_ROW = 100;
const NOISE_OFFSET_COL = 10;

const createNode = (
  col: number,
  row: number,
  startNodeRow: number,
  startNodeCol: number,
  endNodeRow: number,
  endNodeCol: number
): TypeNode => {
  return {
    col,
    row,
    isStart: startNodeCol === col && startNodeRow === row,
    isEnd: endNodeCol === col && endNodeRow === row,
    weight: noise(
      col * NOISE_ZOOM + NOISE_OFFSET_COL,
      row * NOISE_ZOOM + NOISE_OFFSET_ROW
    ),
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};

const getInitialGrid = (
  numRows = NUM_ROWS,
  numCols = NUM_COLS,
  startNodeRow = START_NODE_ROW,
  startNodeCol = START_NODE_COL,
  endNodeRow = END_NODE_ROW,
  endNodeCol = END_NODE_COL
) => {
  const grid: TypeNode[][] = [];
  for (let row = 0; row < numRows; row++) {
    const currentRow = [];
    for (let col = 0; col < numCols; col++) {
      currentRow.push(
        createNode(col, row, startNodeRow, startNodeCol, endNodeRow, endNodeCol)
      );
    }
    grid.push(currentRow);
  }
  return grid;
};

const PathFindingVisualiser = () => {
  const [numRows, setNumRows] = useState(NUM_ROWS);
  const [numCols, setNumCols] = useState(NUM_COLS);
  const [startNodeRow, setStartNodeRow] = useState(START_NODE_ROW);
  const [startNodeCol, setStartNodeCol] = useState(START_NODE_COL);
  const [endNodeRow, setEndNodeRow] = useState(END_NODE_ROW);
  const [endNodeCol, setEndNodeCol] = useState(END_NODE_COL);

  const [grid, setGrid] = useState<TypeNode[][]>();

  const animateShortestPath = (nodesInShortestPathOrder: TypeNode[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (
          node === null ||
          (startNodeRow === node.row && startNodeCol === node.col) ||
          (endNodeRow === node.row && endNodeCol === node.col)
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
          (startNodeRow === node.row && startNodeCol === node.col) ||
          (endNodeRow === node.row && endNodeCol === node.col)
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
    const startNode = grid[startNodeRow][startNodeCol];
    const endNode = grid[endNodeRow][endNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  useEffect(() => {
    const initialGrid = getInitialGrid(
      numRows,
      numCols,
      startNodeRow,
      startNodeCol,
      endNodeRow,
      endNodeCol
    );
    setGrid(initialGrid);
  }, [numRows, numCols, startNodeRow, startNodeCol, endNodeRow, endNodeCol]);

  return (
    <>
      <div className="side-bar">
        <Button variant="contained" color="primary" onClick={visualiseDijkstra}>
          Just do it
        </Button>

        <TextField
          variant="outlined"
          type="number"
          id="number-of-rows-text-field"
          label="Number of Rows"
          value={numRows}
          onChange={(e) => setNumRows(Number(e.target.value) || NUM_ROWS)}
        />

        <TextField
          variant="outlined"
          type="number"
          id="number-of-cols-text-field"
          label="Number of col"
          value={numCols}
          onChange={(e) => setNumCols(Number(e.target.value) || NUM_COLS)}
        />

        <TextField
          variant="outlined"
          type="number"
          id="start-node-row-text-field"
          label="Start Node Row"
          value={startNodeRow}
          onChange={(e) => setStartNodeRow(Number(e.target.value) || 1)}
        />

        <TextField
          variant="outlined"
          type="number"
          id="start-node-col-text-field"
          label="Start Node Col"
          value={startNodeCol}
          onChange={(e) => setStartNodeCol(Number(e.target.value) || 1)}
        />

        <TextField
          variant="outlined"
          type="number"
          id="end-node-row-text-field"
          label="End Node Row"
          value={endNodeRow}
          onChange={(e) => setEndNodeRow(Number(e.target.value) || 1)}
        />

        <TextField
          variant="outlined"
          type="number"
          id="end-node-col-text-field"
          label="End Node Col"
          value={endNodeCol}
          onChange={(e) => setEndNodeCol(Number(e.target.value) || 1)}
        />
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
