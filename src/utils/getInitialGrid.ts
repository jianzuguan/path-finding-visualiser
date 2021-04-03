import {
  NUM_ROWS,
  NUM_COLS,
  START_NODE_Y,
  START_NODE_X,
  END_NODE_ROW,
  END_NODE_COL,
} from "utils/controlParams";
import TypeNode from "types/Node";
import createNode from "utils/createNode";

const getInitialGrid = (
  numRows = NUM_ROWS,
  numCols = NUM_COLS,
  startNodeX = START_NODE_X,
  startNodeY = START_NODE_Y,
  endNodeRow = END_NODE_ROW,
  endNodeCol = END_NODE_COL
) => {
  const grid: TypeNode[][] = [];
  for (let row = 0; row < numRows; row++) {
    const currentRow = [];
    for (let col = 0; col < numCols; col++) {
      currentRow.push(
        createNode(col, row, startNodeY, startNodeX, endNodeRow, endNodeCol)
      );
    }
    grid.push(currentRow);
  }
  return grid;
};

export default getInitialGrid;
