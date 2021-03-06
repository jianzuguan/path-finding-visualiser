interface Node {
  col: number;
  row: number;
  isStart: boolean;
  isEnd: boolean; 
  weight: number;
  distance: number;
  isVisited: boolean;
  previousNode: Node | null;
}

export default Node;
