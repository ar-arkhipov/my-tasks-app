import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  button: {
    marginLeft: 10,
  }
});

const MtDeleteConfirm = ({ onDelete }) => {
  const classes = useStyles();
  const [asking, setAsking] = useState(false);

  return (
    <div>
      {
        asking && <div>
          Are you sure?
          <Button
            onClick={() => setAsking(false)}
            className={classes.button}
            variant="outlined"
            color="primary"
            size="small"
          >
            Cancel
          </Button>

          <Button
            onClick={onDelete}
            className={classes.button}
            variant="outlined"
            color="secondary"
            size="small"
          >
            Yes
          </Button>
        </div>
      }

      {
        !asking && <Button
          onClick={() => setAsking(true)}
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<DeleteIcon />}
        >
          Delete Card
        </Button>
      }
    </div>
  )
};

export default MtDeleteConfirm;
