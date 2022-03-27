import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export interface Comments {
  username: string;
  message_history: Message[];
  last_timestemp: string;
}

export interface Message {
  message: string;
  time_stemp: string;
}

const chatSelectSlice = createSlice({
  name: "chatSelect",
  initialState: {
    selection: null as Comments | null,
  },
  reducers: {
    setUser(state, actions: PayloadAction<Comments>) {
      state.selection = actions.payload
    },
    clearUser(state){
        state.selection = null
    }
  },
});

export const chatSelectActions = chatSelectSlice.actions;

export default chatSelectSlice;
