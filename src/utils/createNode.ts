import {
  NOISE_ZOOM,
  NOISE_OFFSET_COL,
  NOISE_OFFSET_ROW,
} from "utils/controlParams";
import { noise } from "utils/perlinNoise";
import TypeNode from "types/Node";

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

export default createNode;
