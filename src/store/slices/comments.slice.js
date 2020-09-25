import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit';

export const commentsAdapter = createEntityAdapter();

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState(),
  reducers: {
    addComment: {
      reducer: (state, action) => {
        commentsAdapter.addOne(state, action.payload);
      },
      prepare: (data) => ({
        payload: {...data, id: nanoid()}
      }),
    },
    deleteComment: (state, action) => {
      const { id } = action.payload;
      commentsAdapter.removeOne(state, id);
    },
    deleteManyComments: commentsAdapter.removeMany,
  },
  extraReducers: {}
});

export const { selectById, selectAll, selectIds } = commentsAdapter.getSelectors(state => state.comments);

export const { addComment, deleteComment, deleteManyComments } = commentsSlice.actions;

export default commentsSlice;
