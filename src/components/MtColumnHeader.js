import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 30,
    padding: 4,
    borderBottom: '1px solid #bcbcbc',
    '& h4': {
      maxWidth: '70%',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  },
  input: {
    padding: 0,
  },
  button: {
    color: '#919191'
  }
});

const MtColumnHeader = ({ title, onRename, onDelete, dragHandleProps }) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewtitle] = useState(false);

  const handleClick = () => setEditing(true);

  const handleClickAway = () => {
    setEditing(false);
    newTitle.length > 0 && onRename(newTitle)
  };

  const handleChange = (evt) => {
    setNewtitle(evt.target.value.trim());
  };

  const handleKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      setEditing(false);
      newTitle.length > 0 && onRename(newTitle);
    }
  };

  return (
    <div className={classes.container} {...dragHandleProps} >
      {!editing && <h4 onClick={handleClick}>{title}</h4>}

      {editing &&
        <ClickAwayListener onClickAway={handleClickAway}>
          <Input
            defaultValue={title}
            inputProps={{className:classes.input}}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
            disableUnderline
          />
        </ClickAwayListener>
      }

      <IconButton size="small" className={classes.button} onClick={onDelete}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </div>
  )
};

export default MtColumnHeader;
