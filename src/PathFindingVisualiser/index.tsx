import { useEffect, useState } from "react";
import TypeNode from "../types/Node";
import Components from "../components";
import styles from "./index.module.css";

const createNode = (col: number, row: number) => {
  return {
    col,
    row,
  };
};

const getInitialGrid = () => {
  const grid: TypeNode[][] = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const PathFindingVisualiser = () => {
  const [grid, setGrid] = useState<TypeNode[][]>();

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);
  return (
    <>
      <div>
        <button onClick={() => {}}>Visualize Dijkstra's Algorithm</button>
      </div>
      <div className={styles.grid}>
        {grid?.map((row, rowIndex) => {
          return (
            <div className={styles.row} key={rowIndex}>
              {row.map((node, nodeIndex) => {
                const { col, row } = node;
                return <Components.Node key={nodeIndex} col={col} row={row} />;
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PathFindingVisualiser;
