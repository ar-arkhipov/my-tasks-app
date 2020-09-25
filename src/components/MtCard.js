import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { selectById, toggleOpenCard } from '../store/slices/cards.slice';

const useStyles = makeStyles({
  container: {
    marginBottom: 15,
    maxHeight: 500,
    transition: 'max-height ease .5s',
    wordBreak: 'break-all',
    position: 'relative',
    outline: 'none'
  },
  description: {
    marginTop: 4,
    fontSize: 13,
    color: '#717171',
    lineHeight: 1.2,
  },
  commentsCounter: {
    position: 'absolute',
    color: '#ff8c8c',
    right: 4,
    bottom: 4,
    fontSize: 12
  },
  collapsed: {
    maxHeight: 6
  },
});

const MtCard = ({ id, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { title, description, comments } = useSelector(store => selectById(store, id));
  const search = useSelector(store => store.cards.search);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    const found = title.toLowerCase().includes(search);
    setCollapse(!found);
  }, [search, title]);

  const handleClick = () => {
    dispatch(toggleOpenCard(id));
  };

  const renderCommentsCount = () => {
    if (comments.length === 0) return '';

    const phrase = comments.length > 1 ? 'comments' : 'comment';
    return (
      <span className={classes.commentsCounter}>
        { comments.length } {phrase}
      </span>
    )
  };

  return (
    <Draggable draggableId={id} index={index}>
      {
        (innerProps) => (
          <Card
            onClick={handleClick}
            className={`${classes.container} ${collapse && classes.collapsed}`}
            ref={innerProps.innerRef}
            {...innerProps.draggableProps}
            {...innerProps.dragHandleProps}
          >
            <CardContent>
              <Typography variant="body2" component="p">
                { title }
              </Typography>
              <Typography className={classes.description} >
                { description.substring(0, 100) }{description.length > 100 ? '...' : ''}
              </Typography>
              { renderCommentsCount() }
            </CardContent>
          </Card>
        )
      }
    </Draggable>
  )
};

export default MtCard;
