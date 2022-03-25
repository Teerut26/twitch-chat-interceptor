import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// const tmi = require("tmi.js");
import tmi from "tmi.js";
import { chatActions, Comments } from "./../store/slice/chat";

import CommentsCom from "./CommentsCom";
import { chatHistoryActions } from "./../store/slice/chat_history";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import List from "./List";

export default function LiveChat() {
  const [messages, setMessages] = useState<Array<Comments>>([]);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const selecteds = useSelector((state: any) => state.chat.selecteds);
  const channelInit = useSelector((state: any) => state.chat.channelInit);
  const comments = useSelector((state: any) => state.chat.comments);
//   const chat_history = useSelector(
//     (state: {
//       chat_history: { comments: Array<CommentsHistory> | undefined | null };
//     }) => state.chat_history.comments
//   );
  const [IsCapture, setIsCapture] = useState(false);

  useEffect(() => {
    if (channelInit === null) {
      setMessages([]);
      dispatch(chatActions.clearData());
    }

    const client = new tmi.Client({
      channels: [channelInit],
    });

    client.connect();
    let obj = [];
    client.on("message", (channel: any, tags: any, message: any, self: any) => {
      //   console.log(message);
      (() => onMessage(message, tags["display-name"]))();
    });
    return () => {
      client.disconnect();
    };
  }, [channelInit]);

  const onMessage = (message: string, username: string) => {
    setMessages((oldArray) => [
      ...oldArray,
      {
        message,
        username,
        timestamp: new Date().toISOString(),
      },
    ]);
    dispatch(
      chatHistoryActions.addUser({
        username,
        message_history: [
          {
            message,
            time_stemp: new Date().toISOString(),
          },
        ],
        last_timestemp:new Date().toISOString()
      })
    );
  };

  useEffect(() => {
    if (messages.length > 100) {
      messages.splice(0, 1);
    }

    if (IsCapture) {
      const lastMessage = messages[messages.length - 1];

      if (selecteds.includes(lastMessage.username)) {
        dispatch(
          chatActions.addComment({
            message: lastMessage.message,
            username: lastMessage.username,
            timestamp: new Date().toISOString(),
          })
        );
        setIsCapture(false);
      }
    }
  }, [messages]);

  return (
    <>
      <div className="w-full lg:w-[50%] lg:h-full h-[50%] bg-base-200 p-3 flex flex-col gap-2 rounded-xl ">
        <div className="flex gap-2 justify-between items-center">
          <div className="flex gap-2 items-center">
            <div>LiveChat</div>
            {channelInit !== null ? (
              <div className="w-3 h-3 bg-red-500 rounded-full" />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-col overflow-y-auto bg-base-300 p-2 h-full rounded-xl">
          {messages?.map((message, index) => (
            <div
              onClick={() => {
                if (!selecteds.includes(message.username)) {
                  dispatch(chatActions.addUser(message.username));
                  setIsCapture(true);
                }
              }}
            >
              <CommentsCom {...message} key={index} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
