import { useEffect, useState } from "react";
import {
  Checkbox,
  Button,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import TypeNode from "types/Node";
import Components from "components";
import dijkstra, { getNodesInShortestPathOrder } from "algorithms/dijkstra";
import "./index.css";
import { NUM_ROWS, NUM_COLS } from "utils/controlParams";
import getInitialGrid from "utils/getInitialGrid";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import { controlsSlice } from "redux/controlSlice";
import { RootState } from "redux/store";

const PathFindingVisualiser = () => {
  const dispatch = useAppDispatch();
  const startNodeX = useAppSelector(
    (state: RootState) => state.controls.startNodeX
  );
  const startNodeY = useAppSelector(
    (state: RootState) => state.controls.startNodeY
  );
  const endNodeX = useAppSelector(
    (state: RootState) => state.controls.endNodeX
  );
  const endNodeY = useAppSelector(
    (state: RootState) => state.controls.endNodeY
  );

  const [numRows, setNumRows] = useState(NUM_ROWS);
  const [numCols, setNumCols] = useState(NUM_COLS);
  const [instantShowResult, setInstantShowResult] = useState(true);

  const [grid, setGrid] = useState<TypeNode[][]>();

  const animateShortestPath = (nodesInShortestPathOrder: TypeNode[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (
          node === null ||
          (startNodeY === node.y && startNodeX === node.x) ||
          (endNodeY === node.y && endNodeX === node.x)
        ) {
          return;
        }
        const domElement = document.getElementById(`node-${node.y}-${node.x}`);
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
        }, 100 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (
          node === null ||
          (startNodeY === node.y && startNodeX === node.x) ||
          (endNodeY === node.y && endNodeX === node.x)
        ) {
          return;
        }
        const domElement = document.getElementById(`node-${node.y}-${node.x}`);
        if (domElement !== null) {
          domElement.className = "node node-visited";
        }
      }, 100 * i);
    }
  };

  const instantResult = async (
    visitedNodesInOrder: TypeNode[],
    nodesInShortestPathOrder: TypeNode[]
  ) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const node = visitedNodesInOrder[i];
      if (
        node === null ||
        (startNodeY === node.y && startNodeX === node.x) ||
        (endNodeY === node.y && endNodeX === node.x)
      ) {
        continue;
      }
      const domElement = document.getElementById(`node-${node.y}-${node.x}`);
      if (domElement !== null) {
        domElement.className = "node node-visited";
      }
    }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const node = nodesInShortestPathOrder[i];
      if (
        node === null ||
        (startNodeY === node.y && startNodeX === node.x) ||
        (endNodeY === node.y && endNodeX === node.x)
      ) {
        continue;
      }
      const domElement = document.getElementById(`node-${node.y}-${node.x}`);
      if (domElement === null) {
        continue;
      }
      domElement.className = "node node-shortest-path";
    }
  };

  const visualiseDijkstra = () => {
    if (grid === undefined) return;
    const startNode = grid[startNodeY][startNodeX];
    const endNode = grid[endNodeY][endNodeX];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    if (instantShowResult) {
      instantResult(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  };

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  useEffect(() => {
    const initialGrid = getInitialGrid(
      numRows,
      numCols,
      startNodeX,
      startNodeY,
      endNodeX,
      endNodeY
    );
    setGrid(initialGrid);
  }, [numRows, numCols, startNodeX, startNodeY, endNodeX, endNodeY]);

  return (
    <>
      <div className="side-bar">
        <Button variant="contained" color="primary" onClick={visualiseDijkstra}>
          Just do it
        </Button>
        <FormControlLabel
          control={
            <Checkbox
              checked={instantShowResult}
              onChange={(e) => setInstantShowResult(e.target.checked)}
              name="instant-show-result-checkbox"
              color="primary"
            />
          }
          label="Instant show result"
        />
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
          value={startNodeY}
          onChange={(e) =>
            dispatch(
              controlsSlice.actions.setStartNodeY(Number(e.target.value) || 1)
            )
          }
        />

        <TextField
          variant="outlined"
          type="number"
          id="start-node-col-text-field"
          label="Start Node Col"
          value={startNodeX}
          onChange={(e) =>
            dispatch(
              controlsSlice.actions.setStartNodeX(Number(e.target.value) || 1)
            )
          }
        />

        <TextField
          variant="outlined"
          type="number"
          id="end-node-row-text-field"
          label="End Node Row"
          value={endNodeY}
          onChange={(e) =>
            dispatch(
              controlsSlice.actions.setEndNodeY(Number(e.target.value) || 1)
            )
          }
        />

        <TextField
          variant="outlined"
          type="number"
          id="end-node-col-text-field"
          label="End Node Col"
          value={endNodeX}
          onChange={(e) =>
            dispatch(
              controlsSlice.actions.setEndNodeX(Number(e.target.value) || 1)
            )
          }
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
