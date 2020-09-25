import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { addComment, deleteComment } from './comments.slice';

export const cardsAdapter = createEntityAdapter();

const newCard = {
  id: '',
  title: '',
  description: '',
  comments: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState: cardsAdapter.getInitialState({ search: '', openedId: '' }),
  reducers: {
    addCard: {
      reducer: (state, action) => {
        const card = {...newCard, ...action.payload};
        delete card.columnId;
        cardsAdapter.addOne(state, card);
      },
      prepare: (data) => ({
        payload: {...data, id: nanoid()}
      }),
    },
    deleteCard: cardsAdapter.removeOne,
    deleteManyCards: cardsAdapter.removeMany,
    editCard: (state, action) => {
      cardsAdapter.updateOne(state, {id: action.payload.id, changes: action.payload })
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    toggleOpenCard: (state, action) => {
      state.openedId = action.payload;
    }
  },
  extraReducers: {
    [addComment]: (state, action) => {
      const { id: commId, cardId } = action.payload;
      state.entities[cardId].comments.push(commId);
    },
    [deleteComment]: (state, action) => {
      const { id: commId, cardId } = action.payload;
      const { comments } = state.entities[cardId];
      comments.splice(comments.indexOf(commId), 1)
    }
  }
});

export const { selectById, selectAll, selectIds } = cardsAdapter.getSelectors(state => state.cards);

export const { addCard, editCard, deleteCard, deleteManyCards, setSearch, toggleOpenCard } = cardsSlice.actions;

export default cardsSlice;
