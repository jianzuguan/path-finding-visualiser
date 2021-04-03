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
  stratNode: TypeNode,
  finishNode: TypeNode
) => {
  const unvisitedNodes = getAllNodes(grid);
  stratNode.distance = 0;
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

export default dijkstra;
