import { NUM_COLS, NUM_ROWS } from 'utils/controlParams';
import { RootState } from 'redux/store';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { controlsSlice } from 'redux/reducers/controlSlice';

interface Props {
  start: () => void;
}
const ControlPanel = (props: Props) => {
  const { start } = props;

  const dispatch = useAppDispatch();

  const instantShowResult = useAppSelector(
    (state: RootState) => state.controls.instantShowResult
  );
  const numRows = useAppSelector((state: RootState) => state.controls.numRows);
  const numCols = useAppSelector((state: RootState) => state.controls.numCols);
  const startNodeX = useAppSelector(
    (state: RootState) => state.controls.startNodeX
  );
  const startNodeY = useAppSelector(
    (state: RootState) => state.controls.startNodeY
  );
  const finishNodeX = useAppSelector(
    (state: RootState) => state.controls.finishNodeX
  );
  const finishNodeY = useAppSelector(
    (state: RootState) => state.controls.finishNodeY
  );

  return (
    <div className="flex flex-col p-2">
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 my-4 rounded"
        onClick={start}
      >
        Just do it
      </button>

      <label className="w-max block text-gray-500 font-bold">
        <input
          type="checkbox"
          className="mr-2 leading-tight"
          checked={instantShowResult}
          onChange={(e) =>
            dispatch(
              controlsSlice.actions.setInstantShowResult(e.target.checked)
            )
          }
          name="instant-show-result-checkbox"
        />
        <span>Instant show result</span>
      </label>

      <div className="flex flex-row my-4">
        <div className="flex flex-col mx-2">
          <label htmlFor="number-of-rows-text-field" className="text-left">
            Number of Rows
          </label>
          <input
            type="number"
            className="w-32 px-4 py-2 rounded-lg shadow-md border-gray-300"
            name="number-of-rows-text-field"
            id="number-of-rows-text-field"
            value={numRows}
            onChange={(e) =>
              dispatch(
                controlsSlice.actions.setNumRows(
                  Number(e.target.value) || NUM_ROWS
                )
              )
            }
          />
        </div>
        <div className="flex flex-col mx-2">
          <label htmlFor="number-of-cols-text-field" className="text-left">
            Number of Columns
          </label>
          <input
            type="number"
            className="w-32 px-4 py-2 rounded-lg shadow-md border-gray-300"
            name="number-of-cols-text-field"
            id="number-of-cols-text-field"
            value={numCols}
            onChange={(e) =>
              dispatch(
                controlsSlice.actions.setNumCols(
                  Number(e.target.value) || NUM_COLS
                )
              )
            }
          />
        </div>
      </div>

      <div className="flex flex-row my-4">
        <div className="flex flex-col mx-2">
          <label htmlFor="start-node-row-text-field" className="text-left">
            Start Node Row
          </label>
          <input
            type="number"
            className="w-32 px-4 py-2 rounded-lg shadow-md border-gray-300"
            name="start-node-row-text-field"
            id="start-node-row-text-field"
            value={startNodeY}
            onChange={(e) =>
              dispatch(
                controlsSlice.actions.setStartNodeY(Number(e.target.value) || 1)
              )
            }
          />
        </div>
        <div className="flex flex-col mx-2">
          <label htmlFor="start-node-col-text-field" className="text-left">
            Start Node Col
          </label>
          <input
            type="number"
            className="w-32 px-4 py-2 rounded-lg shadow-md border-gray-300"
            name="start-node-col-text-field"
            id="start-node-col-text-field"
            value={startNodeX}
            onChange={(e) =>
              dispatch(
                controlsSlice.actions.setStartNodeX(Number(e.target.value) || 1)
              )
            }
          />
        </div>
      </div>

      <div className="flex flex-row my-4">
        <div className="flex flex-col mx-2">
          <label htmlFor="finish-node-row-text-field" className="text-left">
            Finish Node Row
          </label>
          <input
            type="number"
            className="w-32 px-4 py-2 rounded-lg shadow-md border-gray-300"
            name="finish-node-row-text-field"
            id="finish-node-row-text-field"
            value={finishNodeY}
            onChange={(e) =>
              dispatch(
                controlsSlice.actions.setFinishNodeY(
                  Number(e.target.value) || 1
                )
              )
            }
          />
        </div>
        <div className="flex flex-col mx-2">
          <label htmlFor="finish-node-col-text-field" className="text-left">
            Finish Node Col
          </label>
          <input
            type="number"
            className="w-32 px-4 py-2 rounded-lg shadow-md border-gray-300"
            name="finish-node-col-text-field"
            id="finish-node-col-text-field"
            value={finishNodeX}
            onChange={(e) =>
              dispatch(
                controlsSlice.actions.setFinishNodeX(
                  Number(e.target.value) || 1
                )
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
