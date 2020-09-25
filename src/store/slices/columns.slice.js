import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { addCard, deleteCard } from './cards.slice';

export const columnsAdapter = createEntityAdapter();

const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnsAdapter.getInitialState(),
  reducers: {
    addColumn: {
      reducer: columnsAdapter.addOne,
      prepare: (data) => ({
        payload: {...data, id: nanoid()}
      })
    },
    updateColumn: columnsAdapter.updateOne,
    deleteColumn: columnsAdapter.removeOne,
    moveColumn: {
      reducer: (state, action) => {
        const {from, to} = action.payload;
        const [temp] = state.ids.splice(from, 1);
        state.ids.splice(to, 0, temp);
      }
    },
    moveCard: {
      reducer: (state, action) => {
        const {from, to} = action.payload;
        const [temp] = state.entities[from.id].cards.splice(from.index, 1);
        state.entities[to.id].cards.splice(to.index, 0, temp);
      },
    }
  },
  extraReducers: {
    [addCard]: (state, action) => {
      const { columnId, id } = action.payload;
      state.entities[columnId].cards.push(id);
    },
    [deleteCard]: (state, action) => { // not the best way, but still acceptable
      const cardId = action.payload;
      const column = Object.values(state.entities).find(ent => ent.cards.includes(cardId));
      column.cards.splice(column.cards.indexOf(cardId), 1);
    }
  }
});

export const { selectById, selectAll, selectIds } = columnsAdapter.getSelectors(state => state.columns);

export const { addColumn, updateColumn, deleteColumn, moveColumn, moveCard } = columnsSlice.actions;

export default columnsSlice;
