interface Node {
  x: number;
  y: number;
  isStart: boolean;
  isFinish: boolean;
  weight: number;
  distance: number;
  isVisited: boolean;
  isInShortestPath: boolean;
  previousNode: Node | null;
}

export default Node;
