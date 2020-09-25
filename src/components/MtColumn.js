import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { updateColumn, deleteColumn, selectById } from '../store/slices/columns.slice';
import { deleteManyCards } from '../store/slices/cards.slice';
import MtCard from './MtCard';
import MtColumnHeader from './MtColumnHeader';
import MtCardCreate from './MtCardCreate';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#cecece',
    marginRight: 15,
    borderRadius: 4,
    padding: 5,
    width: 250
  },
  cardsContainer: {
    paddingTop: 15,
    paddingBottom: 15,
  }
});

const MtColumn = ({ id, index }) => {
  const classes = useStyles();
  const column = useSelector(store => selectById(store, id));
  const { title, cards: cardsIds } = column;

  const dispatch = useDispatch();

  const handleRename = (title) => {
    dispatch(updateColumn({ id, changes: { title }}))
  };

  const handleDelete = () => {
    dispatch(deleteColumn(id));
    dispatch(deleteManyCards(cardsIds))
  };

  return (
    <Draggable draggableId={id} index={index}>
      {
        (innerProps) => (
          <div className={classes.container} ref={innerProps.innerRef} {...innerProps.draggableProps} >
            <MtColumnHeader title={title} onRename={handleRename} onDelete={handleDelete} dragHandleProps={innerProps.dragHandleProps}/>
            <Droppable droppableId={id} type="card">
              {
                (innerDropProps) => (
                  <div className={classes.cardsContainer} ref={innerDropProps.innerRef} {...innerDropProps.droppableProps}>
                    { cardsIds.map((id, index) => <MtCard id={id} key={id} index={index}/>) }
                    { innerDropProps.placeholder }
                  </div>
                )
              }
            </Droppable>
            <MtCardCreate columnId={id} />
          </div>
        )
      }
    </Draggable>
  )
};

export default MtColumn;
