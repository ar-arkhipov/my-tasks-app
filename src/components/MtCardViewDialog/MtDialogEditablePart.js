import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  container: {
    paddingLeft: 40,
    position: 'relative',
    whiteSpace: ({wrap}) => wrap ? 'pre-wrap' : 'nowrap'
  },
  textarea: {
    border: '1px solid #cccccc',
    width: '100%',
    resize: 'none',
    outline: 'none',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit'
  },
  button: {
    position: 'absolute',
    left: 0,
    top: 0,
    color: '#cccccc'
  }
});

const MtDialogEditablePart = ({ wrap, stopOnEnter, name, initText, onEdited }) => {
  const classes = useStyles({ wrap });
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(initText || '');

  const handleClick = () => setEditing(true);

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    onEdited(text);
  };

  const handleKeyDown = (evt) => {
    if (stopOnEnter && evt.keyCode === 13) {
      evt.preventDefault();
      setEditing(false);
      onEdited(text);
    }
  };

  return (
    <div className={classes.container}>
      {!!name && <h4>{ name }</h4> }

      {!editing && <IconButton className={classes.button} size="small" onClick={handleClick}>
        <EditIcon />
      </IconButton> }

      {!editing && text }

      {editing && <TextareaAutosize
        autoFocus
        value={text}
        className={classes.textarea}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Enter text..."
      /> }
    </div>
  )
};

export default MtDialogEditablePart;
