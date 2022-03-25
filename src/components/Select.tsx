import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions, Comments } from "./../store/slice/chat";
import CommentsCom from "./CommentsCom";
import { Comments as CommentsHistory } from "./../store/slice/chat_history";

import _ from "lodash";
import List from "./List";

export enum Pages {
  select_by_click,
  chat_history,
}

export default function Select() {
  const dispatch = useDispatch();
  const chat: { selecteds: any; comments: [Comments] } = useSelector(
    (state: any) => state.chat
  );
  const chat_history = useSelector(
    (state: {
      chat_history: { comments: Array<CommentsHistory> | undefined | null };
    }) => state.chat_history.comments
  );
  const [channelName, setChannelName] = useState<string>("");
  const [page, setPage] = useState<Pages>();

  const SelectedChannel = () => {
    if (channelName.length === 0) return;
    dispatch(chatActions.setInitChannel(channelName));
  };

  return (
    // <div className="w-full lg:w-[50%] lg:h-full h-[50%] bg-base-200 p-3 flex flex-col rounded-xl">
    <div className="w-full lg:w-[50%] lg:h-full h-[50%] bg-base-200 p-3 flex flex-col rounded-xl">
      <div className="form-control">
        <div className="input-group ">
          <input
            onChange={(e) => setChannelName(e.target.value)}
            value={channelName}
            type="text"
            placeholder="ชื่อช่อง Twitch"
            className="input input-bordered input-sm w-full"
          />
          <button onClick={() => SelectedChannel()} className="btn btn-sm">
            เลือก
          </button>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-sm"
          >
            clear
          </button>
        </div>
        <div className="mt-2 flex gap-2">
          <div onClick={()=>setPage(Pages.select_by_click)} className="btn btn-sm">select_by_click</div>
          <div onClick={()=>setPage(Pages.chat_history)}  className="btn btn-sm">chat_history</div>
        </div>

        <div className="flex items-center gap-2 py-3">
          <div>Select: </div>
          <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[5rem] my-auto">
            {chat.selecteds.map((item: any, index: any) => (
              <div
                onClick={() => dispatch(chatActions.deleteUser(item))}
                className="badge badge-primary cursor-pointer flex gap-3"
                key={index}
              >
                <div>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto bg-base-300 p-2 h-full rounded-xl">
        {page === Pages.select_by_click ? (
          chat.comments.map((item, key: any) => (
            <CommentsCom {...item} key={key} />
          ))
        ) : page === Pages.chat_history ? (
          <ul className="list-disc list-inside text-slate-900 dark:text-slate-200">
            {_.orderBy(
              chat_history,
              // [(user) => user.username.toLowerCase()],
              [(user) => user.last_timestemp],
              ["desc"]
            ).map((item, idx) => (
              <List key={idx} {...item} />
            ))}
          </ul>
        ) : (
          ""
        )}
        {/* {chat.comments.map((item, key: any) => (
          <CommentsCom {...item} key={key} />
        ))} */}
      </div>
    </div>
  );
}
