import TypeNode from "types/Node";

const getAllNodes = (grid: TypeNode[][]) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

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

const dijkstra = (
  grid: TypeNode[][],
  startNode: TypeNode,
  finishNode: TypeNode
) => {
  const unvisitedNodes = getAllNodes(grid);
  startNode.distance = 0;
  const visitedNodesInOrder = [];
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (!closestNode) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }

  return visitedNodesInOrder;
};

export const getNodesInShortestPathOrder = (endNode: TypeNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode: TypeNode | null = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.push(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

export const init = (grid: TypeNode[][], startNode: TypeNode): TypeNode[][] => {
  const gridClone = [...grid].map((row) => [...row]);

  if (
    gridClone.length > startNode.y &&
    gridClone[startNode.y].length > startNode.x
  ) {
    gridClone[startNode.y][startNode.x].distance = 0;
  }

  return gridClone;
};

export const hasVisitedFinishNode = (
  grid: TypeNode[][],
  finishNode: TypeNode
) => {
  if (finishNode.x < 0 || finishNode.y < 0) {
    return false;
  }

  if (grid.length > finishNode.y && grid[finishNode.y].length > finishNode.x) {
    return grid[finishNode.y][finishNode.x].isVisited;
  }

  return false;
};

export const hasNext = (grid: TypeNode[][], finishNode: TypeNode) => {
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
  const gridClone = [...grid].map((row) => [...row]);

  const unvisitedNodes = getAllUnvisitedNode(gridClone);
  sortNodesByDistance(unvisitedNodes);
  const closestNode = unvisitedNodes.shift();
  if (!closestNode) return gridClone;
  closestNode.isVisited = true;
  updateUnvisitedNeighbors(closestNode, gridClone);

  return gridClone;
};

export default dijkstra;
