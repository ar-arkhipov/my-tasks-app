import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize/TextareaAutosize';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { selectById } from '../store/slices/cards.slice';
import { selectById as selectCommentById, addComment, deleteComment } from '../store/slices/comments.slice';


const useStyles = makeStyles({
  container: {
    borderLeft: '1px solid #cccccc',
    paddingLeft: 10
  },
  list: {
    listStyle: 'none',
    marginTop: 0,
  },
  comment: {
    position: 'relative',
    padding: '12px 0',
    borderBottom: '1px solid #cccccc',
    color: '#524b4b'
  },
  author: {
    position: 'absolute',
    top: 10,
    left: -40
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
    color: '#c1c1c1',
    position: 'absolute',
    right: -12
  }
});

const MtComment = ({ id, onDelete }) => {
  const classes = useStyles();
  const { text } = useSelector(state => selectCommentById(state, id));

  return (
    <li className={classes.comment}>
      <span className={classes.author}>Me:</span>
      { text }
      <IconButton size="small" className={classes.button} onClick={() => onDelete(id)}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </li>
  )
};

const MtCommentsViewer = ({ cardId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { comments: commIds = [] } = useSelector(state => selectById(state, cardId));
  const [text, setText] = useState('');

  const handleDeleteComment = (id) => {
    dispatch(deleteComment({ id, cardId }))
  };

  const handleChange = (evt) => setText(evt.target.value);

  const handleKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      text.length > 0 && dispatch(addComment({ text, cardId }));
      setText('');
    }
  };

  return (
    <div className={classes.container}>

      <h4>Comments</h4>

      <ul className={classes.list}>
        { commIds.map(id => <MtComment id={id} key={id} onDelete={handleDeleteComment}/>)}
      </ul>

      <TextareaAutosize
        value={text}
        className={classes.textarea}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter comment..."
      />
    </div>
  )
};

export default MtCommentsViewer;
