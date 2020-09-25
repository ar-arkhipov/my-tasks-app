import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import { selectById, toggleOpenCard, editCard, deleteCard } from '../../store/slices/cards.slice';
import { deleteManyComments } from '../../store/slices/comments.slice';
import MtDialogEditablePart from './MtDialogEditablePart';
import MtDeleteConfirm from './MtDeleteConfirm';
import MtCommentsViewer from '../MtCommentsViewer';


const MtCardViewDialog = () => {
  const dispatch = useDispatch();
  const openedId = useSelector(state => state.cards.openedId);
  const card = useSelector(state => selectById(state, openedId));

  const handleClose = () => {
    dispatch(toggleOpenCard(''))
  };

  const handleTitleEdited = (text) => {
    dispatch(editCard({id: openedId, title: text}))
  };

  const handleDescriptionEdited = (text) => {
    dispatch(editCard({id: openedId, description: text}))
  };

  const handleDelete = () => {
    dispatch(deleteCard(openedId));
    if (card.comments && card.comments.length) {
      dispatch(deleteManyComments(card.comments));
    }
  };

  if (!card) return '';

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      onClose={handleClose}
      open={Boolean(openedId)}
    >
      <DialogTitle id="confirmation-dialog-title">
        <MtDialogEditablePart stopOnEnter initText={card.title} onEdited={handleTitleEdited}/>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container direction="row" spacing={2}>
          <Grid item md={8}>
            <MtDialogEditablePart wrap name="Description" initText={card.description} onEdited={handleDescriptionEdited}/>
          </Grid>
          <Grid item md={4}>
            <MtCommentsViewer cardId={openedId} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <MtDeleteConfirm onDelete={handleDelete} />
      </DialogActions>
    </Dialog>
  )
};

export default MtCardViewDialog;
