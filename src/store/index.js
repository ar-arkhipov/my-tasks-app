import { configureStore } from '@reduxjs/toolkit';
import columnsSlice from './slices/columns.slice';
import cardsSlice from './slices/cards.slice';
import commentsSlice from './slices/comments.slice';
import { saveState, retrieveState } from '../helpers/storage';

const preloadedState = retrieveState();

const store = configureStore({
  preloadedState: preloadedState,
  reducer: {
    columns: columnsSlice.reducer,
    cards: cardsSlice.reducer,
    comments: commentsSlice.reducer,
  },
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
