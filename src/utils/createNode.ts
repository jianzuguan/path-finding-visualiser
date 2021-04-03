import {
  NOISE_ZOOM,
  NOISE_OFFSET_X,
  NOISE_OFFSET_Y,
} from "utils/controlParams";
import { noise } from "utils/perlinNoise";
import TypeNode from "types/Node";

const createNode = (
  x: number,
  y: number,
  startNodeX: number,
  startNodeY: number,
  endNodeX: number,
  endNodeY: number
): TypeNode => {
  return {
    x,
    y,
    isStart: startNodeX === x && startNodeY === y,
    isEnd: endNodeX === x && endNodeY === y,
    weight: noise(
      x * NOISE_ZOOM + NOISE_OFFSET_X,
      y * NOISE_ZOOM + NOISE_OFFSET_Y
    ),
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};

export default createNode;
