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
  const endNodeX = useAppSelector(
    (state: RootState) => state.controls.endNodeX
  );
  const endNodeY = useAppSelector(
    (state: RootState) => state.controls.endNodeY
  );

  const grid: TypeNode[][] = useAppSelector(
    (state: RootState) => state.grid.grid
  );

  const isSearchCompleted: boolean = useAppSelector(
    (state: RootState) => state.grid.isSearchCompleted
  );

  const intervalRef = useRef<NodeJS.Timeout>();

  const start = () => {
    dispatch(gridSlice.actions.setGrid(init(grid, startNodeX, startNodeY)));
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

  useEffect(() => {
    if (isSearchCompleted) return;

    const hasVisitedEndNode = hasVisitedFinishNode(grid, endNodeX, endNodeY);
    const hasNextStep = hasNext(grid);

    if (!hasVisitedEndNode && hasNextStep) {
      const delay = instantShowResult ? 0 : 1000;
      intervalRef.current = setTimeout(() => {
        dispatch(gridSlice.actions.setGrid(next(grid)));
      }, delay);
      return;
    }

    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
      dispatch(
        gridSlice.actions.setGrid(
          initShortestPathTrace(grid, endNodeX, endNodeY)
        )
      );
      dispatch(gridSlice.actions.setIsSearchComplete(true));
    }
  }, [dispatch, grid, isSearchCompleted, endNodeX, endNodeY, instantShowResult]);

  useEffect(() => {
    if (!isSearchCompleted) return;

    if (hasNextPathNode(grid, startNodeX, startNodeY, endNodeX, endNodeY)) {
      const delay = instantShowResult ? 0 : 10;
      intervalRef.current = setTimeout(() => {
        const nextGrid = nextPathNode(grid, endNodeX, endNodeY);
        dispatch(gridSlice.actions.setGrid(nextGrid));
      }, delay);
      return;
    }

    if (intervalRef.current !== undefined) {
      return clearInterval(intervalRef.current);
    }
  }, [
    dispatch,
    grid,
    isSearchCompleted,
    startNodeX,
    startNodeY,
    endNodeX,
    endNodeY,
    instantShowResult
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
