import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { NUM_COLS, NUM_ROWS } from 'utils/controlParams';
import { RootState } from 'redux/store';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { controlsSlice } from 'redux/reducers/controlSlice';

const ControlPanel = () => {
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
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={instantShowResult}
            onChange={(e) =>
              dispatch(
                controlsSlice.actions.setInstantShowResult(e.target.checked)
              )
            }
            name="instant-show-result-checkbox"
            color="primary"
          />
        }
        label="Instant show result"
      />
      <TextField
        variant="outlined"
        type="number"
        id="number-of-rows-text-field"
        label="Number of Rows"
        value={numRows}
        onChange={(e) =>
          dispatch(
            controlsSlice.actions.setNumRows(Number(e.target.value) || NUM_ROWS)
          )
        }
      />

      <TextField
        variant="outlined"
        type="number"
        id="number-of-cols-text-field"
        label="Number of col"
        value={numCols}
        onChange={(e) =>
          dispatch(
            controlsSlice.actions.setNumCols(Number(e.target.value) || NUM_COLS)
          )
        }
      />

      <TextField
        variant="outlined"
        type="number"
        id="start-node-row-text-field"
        label="Start Node Row"
        value={startNodeY}
        onChange={(e) =>
          dispatch(
            controlsSlice.actions.setStartNodeY(Number(e.target.value) || 1)
          )
        }
      />

      <TextField
        variant="outlined"
        type="number"
        id="start-node-col-text-field"
        label="Start Node Col"
        value={startNodeX}
        onChange={(e) =>
          dispatch(
            controlsSlice.actions.setStartNodeX(Number(e.target.value) || 1)
          )
        }
      />

      <TextField
        variant="outlined"
        type="number"
        id="end-node-row-text-field"
        label="Finish Node Row"
        value={finishNodeY}
        onChange={(e) =>
          dispatch(
            controlsSlice.actions.setFinishNodeY(Number(e.target.value) || 1)
          )
        }
      />

      <TextField
        variant="outlined"
        type="number"
        id="end-node-col-text-field"
        label="Finish Node Col"
        value={finishNodeX}
        onChange={(e) =>
          dispatch(
            controlsSlice.actions.setFinishNodeX(Number(e.target.value) || 1)
          )
        }
      />
    </>
  );
};

export default ControlPanel;
