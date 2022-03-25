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

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState: {
    comments: [] as Array<Comments>,
  },
  reducers: {
    addUser(state, actions: PayloadAction<Comments>) {
      let check_user_exists = state.comments.filter(
        (item) => item.username === actions.payload.username
      );

      if (check_user_exists.length === 0) {
        state.comments.push({
          ...actions.payload,
        });
      } else {
        let old_without_playload = state.comments.filter(
          (item) => item.username !== actions.payload.username
        );
        old_without_playload.push({
          username: actions.payload.username,
          message_history: [
            ...check_user_exists[0].message_history,
            ...actions.payload.message_history,
          ],
          last_timestemp: new Date().toISOString(),
        });
        state.comments = old_without_playload;
      }
    },
  },
});

export const chatHistoryActions = chatHistorySlice.actions;

export default chatHistorySlice;
