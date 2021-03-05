interface Node {
  col: number;
  row: number;
  isStart: boolean;
  isEnd: boolean; 
  weight: number;
  distance: number;
}

export default Node;
