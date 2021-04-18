import {
  NOISE_ZOOM,
  NOISE_OFFSET_X,
  NOISE_OFFSET_Y,
} from 'utils/controlParams';
import { noise } from 'utils/perlinNoise';
import TypeNode from 'types/Node';

const createNode = (
  x: number,
  y: number,
  startNodeX: number,
  startNodeY: number,
  finishNodeX: number,
  finishNodeY: number,
  useNoise: boolean = true
): TypeNode => {
  return {
    x,
    y,
    isStart: startNodeX === x && startNodeY === y,
    isFinish: finishNodeX === x && finishNodeY === y,
    weight: useNoise
      ? noise(x * NOISE_ZOOM + NOISE_OFFSET_X, y * NOISE_ZOOM + NOISE_OFFSET_Y)
      : 1,
    distance: Infinity,
    isVisited: false,
    isInShortestPath: false,
    previousNode: null,
  };
};

export default createNode;
