import {
  NUM_ROWS,
  NUM_COLS,
  START_NODE_Y,
  START_NODE_X,
  FINISH_NODE_Y,
  FINISH_NODE_X,
} from 'utils/controlParams';
import TypeNode from 'types/Node';
import createNode from 'utils/createNode';

const getInitialGrid = (
  numRows = NUM_ROWS,
  numCols = NUM_COLS,
  startNodeX = START_NODE_X,
  startNodeY = START_NODE_Y,
  finishNodeX = FINISH_NODE_X,
  finishNodeY = FINISH_NODE_Y
) => {
  const grid: TypeNode[][] = [];
  for (let row = 0; row < numRows; row++) {
    const currentRow = [];
    for (let col = 0; col < numCols; col++) {
      currentRow.push(
        createNode(col, row, startNodeX, startNodeY, finishNodeX, finishNodeY)
      );
    }
    grid.push(currentRow);
  }
  return grid;
};

export default getInitialGrid;
