import TypeNode from 'types/Node';

const getAllUnvisitedNode = (grid: TypeNode[][]) => {
  const unvisitedNodes = [];
  for (const row of grid) {
    for (const node of row) {
      if (!node.isVisited) {
        unvisitedNodes.push(node);
      }
    }
  }
  return unvisitedNodes;
};

const sortNodesByDistance = (unvisitedNoes: TypeNode[]) => {
  unvisitedNoes.sort(
    (nodeA: TypeNode, nodeB: TypeNode) => nodeA.distance - nodeB.distance
  );
};

const getUnvisitedNeighbors = (node: TypeNode, grid: TypeNode[][]) => {
  const neighbors = [];
  const { x: col, y: row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

const updateUnvisitedNeighbors = (
  currentNode: TypeNode,
  grid: TypeNode[][]
) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
  for (const neighbor of unvisitedNeighbors) {
    const newDistance = currentNode.distance + neighbor.weight;
    if (newDistance < neighbor.distance) {
      neighbor.distance = newDistance;
      neighbor.previousNode = currentNode;
    }
  }
};

export const getNodesInShortestPathOrder = (finishNode: TypeNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode: TypeNode | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.push(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

export const init = (
  grid: TypeNode[][],
  startNodeX: number,
  startNodeY: number
): TypeNode[][] => {
  const gridClone = [...grid].map((row) => [...row]);

  if (
    gridClone.length > startNodeY &&
    gridClone[startNodeY].length > startNodeX
  ) {
    gridClone[startNodeY][startNodeX] = {
      ...gridClone[startNodeY][startNodeX],
      distance: 0,
    };
  }

  return gridClone;
};

export const hasVisitedFinishNode = (
  grid: TypeNode[][],
  finishNodeX: number,
  finishNodeY: number
) => {
  if (finishNodeX < 0 || finishNodeY < 0) {
    return false;
  }

  if (grid.length > finishNodeY && grid[finishNodeY].length > finishNodeX) {
    return grid[finishNodeY][finishNodeX].isVisited;
  }

  return false;
};

export const hasNext = (grid: TypeNode[][]) => {
  const unvisitedNodes = getAllUnvisitedNode(grid);

  sortNodesByDistance(unvisitedNodes);
  const closestNode = unvisitedNodes.shift();
  // All nodes in grid visited.
  if (!closestNode) return false;
  // All reachable nodes visited.
  if (closestNode.distance === Infinity) return false;

  return true;
};

export const next = (grid: TypeNode[][]) => {
  const gridClone = [...grid].map((row) =>
    [...row].map(function (gridNode: TypeNode) {
      return { ...gridNode };
    })
  );

  const unvisitedNodes = getAllUnvisitedNode(gridClone);
  sortNodesByDistance(unvisitedNodes);
  let closestNode = unvisitedNodes.shift();
  if (!closestNode) return gridClone;
  closestNode.isVisited = true;
  updateUnvisitedNeighbors(closestNode, gridClone);

  return gridClone;
};

export const initShortestPathTrace = (
  grid: TypeNode[][],
  finishNodeX: number,
  finishNodeY: number
) => {
  const currentNode: TypeNode = grid[finishNodeY][finishNodeX];
  if (currentNode.isVisited) {
    return [...grid].map((row) =>
      [...row].map(function (gridNode: TypeNode) {
        if (gridNode.x === finishNodeX && gridNode.y === finishNodeY) {
          return { ...gridNode, isInShortestPath: true };
        }
        return { ...gridNode };
      })
    );
  }

  return grid;
};

export const hasNextPathNode = (
  grid: TypeNode[][],
  startNodeX: number,
  startNodeY: number,
  finishNodeX: number,
  finishNodeY: number
) => {
  // Start from finish node and trace back.
  let currentNode: TypeNode | null = grid[finishNodeY][finishNodeX];

  while (currentNode?.isInShortestPath) {
    // Node in shortest path means this node already been traced.
    const previousNode: TypeNode | null = currentNode.previousNode;
    if (previousNode === null) return grid;
    currentNode = grid[previousNode.y][previousNode.x];
  }
  // Now the currentNode has not been marked as traced.

  if (!currentNode || !currentNode.previousNode) {
    return false;
  }

  const startNode: TypeNode = grid[startNodeY][startNodeX];
  if (currentNode === startNode) {
    return false;
  }

  return true;
};

export const nextPathNode = (
  grid: TypeNode[][],
  finishNodeX: number,
  finishNodeY: number
) => {
  let currentNode: TypeNode | null = grid[finishNodeY][finishNodeX];
  while (currentNode && currentNode.isInShortestPath) {
    const previousNode: TypeNode | null = currentNode.previousNode;
    if (previousNode === null) return grid;
    currentNode = grid[previousNode.y][previousNode.x];
  }

  if (currentNode === null) return grid;

  const { x, y } = currentNode;
  return [...grid].map((row) =>
    [...row].map(function (gridNode: TypeNode) {
      if (gridNode.x === x && gridNode.y === y) {
        const updatedNode = { ...gridNode, isInShortestPath: true };
        return updatedNode;
      }

      return { ...gridNode };
    })
  );
};
