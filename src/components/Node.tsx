import styles from "./Node.module.css";

interface Props {
  row: number;
  col: number;
}

const Node = (props: Props) => {
  const { row, col } = props;

  return <div className={styles.node} id={`node-${row}-${col}`}></div>;
};

export default Node;
