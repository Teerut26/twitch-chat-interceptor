import * as timeago from "timeago.js";
import { Comments } from "../store/slice/chat_history";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { chatSelectActions } from "../store/slice/chat_select";

export default function List(props: Comments) {
  const [ShowMessage, setShowMessage] = useState(false);
  const [, setTime] = useState(Date.now());

  const dispatch = useDispatch()

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
      setShowMessage(false);
    };
  }, []);

  return (
    <>
      <div
        onClick={() => {
          setShowMessage((pre) => !pre);
          dispatch(chatSelectActions.setUser(props))
        }}
        className="cursor-pointer select-none"
      >
        <div className="flex flex-wrap gap-1 items-start">
          <div
            className={
              props.message_history.length === 1
                ? "badge badge-secondary badge-outline"
                : "badge badge-outline"
            }
          >
            {props.message_history.length === 1
              ? "new"
              : props.message_history.length}
          </div>
          <div
            className={
              timeago.format(
                _.last(props.message_history)?.time_stemp as timeago.TDate,
                "th_TH"
              ) === "just now"
                ? "badge badge-accent "
                : "badge badge-outline "
            }
          >
            {timeago.format(
              _.last(props.message_history)?.time_stemp as timeago.TDate,
              "th_TH"
            )}
          </div>
          <div>{props.username}</div>
          <div className="bg-primary">
            {_.last(props.message_history)?.message}
          </div>
        </div>
      </div>
    </>
  );
}
