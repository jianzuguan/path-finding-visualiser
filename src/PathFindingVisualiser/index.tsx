import { useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';
import TypeNode from 'types/Node';
import Components from 'components';
import ControlPanel from 'PathFindingVisualiser/ControlPanel';
import './index.css';
import {
  hasNext,
  hasNextPathNode,
  hasVisitedFinishNode,
  init,
  initShortestPathTrace,
  next,
  nextPathNode,
} from 'algorithms/dijkstra';
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
  const finishNodeX = useAppSelector(
    (state: RootState) => state.controls.finishNodeX
  );
  const finishNodeY = useAppSelector(
    (state: RootState) => state.controls.finishNodeY
  );

  const grid: TypeNode[][] = useAppSelector(
    (state: RootState) => state.grid.grid
  );

  const isSearching: boolean = useAppSelector(
    (state: RootState) => state.grid.isSearching
  );
  const isTracing: boolean = useAppSelector(
    (state: RootState) => state.grid.isTracing
  );

  const intervalRef = useRef<NodeJS.Timeout>();

  const start = () => {
    if (!instantShowResult) {
      dispatch(gridSlice.actions.setGrid(init(grid, startNodeX, startNodeY)));
      dispatch(gridSlice.actions.setIsSearching(true));
      return;
    }

    let currentGrid = init(grid, startNodeX, startNodeY);
    while (
      !hasVisitedFinishNode(currentGrid, finishNodeX, finishNodeY) &&
      hasNext(currentGrid)
    ) {
      currentGrid = next(currentGrid);
    }
    currentGrid = initShortestPathTrace(currentGrid, finishNodeX, finishNodeY);
    while (hasNextPathNode(currentGrid, startNodeX, startNodeY, finishNodeX, finishNodeY)) {
      currentGrid = nextPathNode(currentGrid, finishNodeX, finishNodeY);
    }

    dispatch(gridSlice.actions.setGrid(currentGrid));
  };

  // Page loaded and generate a grid.
  useEffect(() => {
    const initialGrid = getInitialGrid();
    dispatch(gridSlice.actions.setGrid(initialGrid));
  }, [dispatch]);

  // Reset and regenerate the grid.
  useEffect(() => {
    const initialGrid = getInitialGrid(
      numRows,
      numCols,
      startNodeX,
      startNodeY,
      finishNodeX,
      finishNodeY
    );
    dispatch(gridSlice.actions.setIsSearching(false));
    dispatch(gridSlice.actions.setIsTracing(false));
    dispatch(gridSlice.actions.setGrid(initialGrid));
  }, [dispatch, numRows, numCols, startNodeX, startNodeY, finishNodeX, finishNodeY]);

  // Searching for the finish node.
  useEffect(() => {
    if (!isSearching) return;

    const hasFinishSearching = hasVisitedFinishNode(grid, finishNodeX, finishNodeY);
    const hasNextStep = hasNext(grid);

    if (!hasFinishSearching && hasNextStep) {
      intervalRef.current = setTimeout(() => {
        dispatch(gridSlice.actions.setGrid(next(grid)));
      }, 10);
      return;
    }

    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
      dispatch(
        gridSlice.actions.setGrid(
          initShortestPathTrace(grid, finishNodeX, finishNodeY)
        )
      );
      dispatch(gridSlice.actions.setIsSearching(false));
      dispatch(gridSlice.actions.setIsTracing(true));
    }
  }, [dispatch, grid, isSearching, finishNodeX, finishNodeY]);

  // Finish node found, trace back to start node.
  useEffect(() => {
    if (!isTracing) return;

    if (hasNextPathNode(grid, startNodeX, startNodeY, finishNodeX, finishNodeY)) {
      intervalRef.current = setTimeout(() => {
        const nextGrid = nextPathNode(grid, finishNodeX, finishNodeY);
        dispatch(gridSlice.actions.setGrid(nextGrid));
      }, 1);
      return;
    }

    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
      dispatch(gridSlice.actions.setIsTracing(false));
      return ;
    }
  }, [
    dispatch,
    grid,
    isTracing,
    startNodeX,
    startNodeY,
    finishNodeX,
    finishNodeY,
  ]);

  return (
    <>
      <div className="side-bar">
        <Button variant="contained" color="primary" onClick={start}>
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
