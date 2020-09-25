import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { addCard } from '../store/slices/cards.slice';

const useStyles = makeStyles({
  container: {
    marginTop: -15,
  },
  textarea: {
    width: '100%',
    resize: 'none',
    border: 'none',
    outline: 'none',
    fontFamily: 'inherit',
  },
  button: {
    color: '#919191'
  }
});

const MtCardCreate = ({ columnId }) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const createCard = () => {
    dispatch(addCard({ title, columnId }));
  };

  const handleClick = () => {
    setEditing(true);
    setTitle('');
  };

  const handleClickAway = () => setEditing(false);

  const handleChange = (evt) => {
    setTitle(evt.target.value.trim());
  };

  const handleKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      setEditing(false);
      title.length > 0 && createCard();
    }
  };

  return (
    <div className={classes.container}>
      {editing && <ClickAwayListener onClickAway={handleClickAway}>
        <Card>
          <CardContent>
            <TextareaAutosize
              autoFocus
              rowsMin={2}
              className={classes.textarea}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type the title and hit Enter :)"
            />
          </CardContent>
        </Card>
      </ClickAwayListener>}

      {!editing && <Button
        onClick={handleClick}
        className={classes.button}
        fullWidth
        size="small"
      >
        <AddIcon />
      </Button>}
    </div>
  );
};

export default MtCardCreate;
