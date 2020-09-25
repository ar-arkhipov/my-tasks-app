import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { selectIds, moveCard, moveColumn, addColumn } from '../store/slices/columns.slice';
import MtColumn from './MtColumn';
import MtColumnCreate from './MtColumnCreate';

const useStyles = makeStyles({
  container: {
    height: '100%',
    padding: 15,
    paddingTop: 64,
    display: 'flex',
    alignItems: 'flex-start',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  }
});

const MtBoard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const columnsIds = useSelector(selectIds);

  const handleCreateColumn = (title) => {
    dispatch(addColumn({ title, cards: [] }))
  };

  const handleDragEnd = (data) => {
    const { type, source, destination } = data;

    if (type === 'board') {
      if (source.index === destination.index) return;
      dispatch(moveColumn({ from: source.index, to: destination.index }));
    }

    if (type === 'card') {
      const from = {id: source.droppableId, index: source.index};
      const to = {id: destination.droppableId, index: destination.index};
      dispatch(moveCard({ from, to }))
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable direction="horizontal" type="board" droppableId="main">
        {
          (innerProps) => (
            <div className={classes.container} ref={innerProps.innerRef} {...innerProps.droppableProps}>

              {
                columnsIds.map((id, index) => <MtColumn id={id} key={id} index={index}/>)
              }

              { innerProps.placeholder }

              <MtColumnCreate onCreate={handleCreateColumn}/>
            </div>
          )
        }
      </Droppable>
    </DragDropContext>
  )
};

export default MtBoard;
