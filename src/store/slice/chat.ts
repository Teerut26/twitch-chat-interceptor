import { createSlice } from "@reduxjs/toolkit";

export interface Comments {
  username: string;
  message: string;
  timestamp: string;
}

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    selecteds: [] as Array<string>,
    comments: [] as Array<Comments>,
    channelInit: null as string | null,
  },
  reducers: {
    // setUser(state, actions) {
    //   state.selecteds = actions.payload;
    // },
    addUser(state, actions) {
      state.selecteds.push(actions.payload);
    },
    addComment(state, actions: { payload: Comments }) {
      state.comments.push(actions.payload);
    },
    clearData(state) {
      state.comments = [];
      state.selecteds = [];
      state.channelInit= null
    },
    setInitChannel(state, actions) {
      state.channelInit = actions.payload;
    },
    deleteUser(state, actions) {
      const newSelecteds = state.selecteds.filter(
        (selected) => selected !== actions.payload
      );
      const newComments = state.comments.filter(
        (selected) => selected.username !== actions.payload
      );
      state.comments = newComments;
      state.selecteds = newSelecteds;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
