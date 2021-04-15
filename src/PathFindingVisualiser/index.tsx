import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import TypeNode from 'types/Node';
import Components from 'components';
import ControlPanel from 'PathFindingVisualiser/ControlPanel';
import './index.css';
import dijkstra, { getNodesInShortestPathOrder } from 'algorithms/dijkstra';
import getInitialGrid from 'utils/getInitialGrid';
import { RootState } from 'redux/store';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { gridSlice } from 'redux/reducers/gridSlice';

const PathFindingVisualiser = () => {
  const dispatch = useAppDispatch();

  const instantShowResult = useAppSelector(
    (state: RootState) => state.controls.instantShowResult
  );
  const numRows = useAppSelector((state: RootState) => state.controls.numRows);
  const numCols = useAppSelector((state: RootState) => state.controls.numCols);
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

  const grid: TypeNode[][] = useAppSelector(
    (state: RootState) => state.grid.grid
  );

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
        domElement.className = 'node node-shortest-path';
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
          domElement.className = 'node node-visited';
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
        domElement.className = 'node node-visited';
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
      domElement.className = 'node node-shortest-path';
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
    dispatch(gridSlice.actions.setGrid(initialGrid));
  }, [dispatch]);

  useEffect(() => {
    const initialGrid = getInitialGrid(
      numRows,
      numCols,
      startNodeX,
      startNodeY,
      endNodeX,
      endNodeY
    );
    dispatch(gridSlice.actions.setGrid(initialGrid));
  }, [dispatch, numRows, numCols, startNodeX, startNodeY, endNodeX, endNodeY]);

  return (
    <>
      <div className="side-bar">
        <Button variant="contained" color="primary" onClick={visualiseDijkstra}>
          Just do it
        </Button>

        <ControlPanel />
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
