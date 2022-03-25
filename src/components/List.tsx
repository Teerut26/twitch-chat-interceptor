import * as timeago from "timeago.js";
import { Comments } from "../store/slice/chat_history";
import _ from "lodash";
import { useEffect, useState } from "react";

export default function List(props: Comments) {
  const [ShowMessage, setShowMessage] = useState(false);
  const [, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
      setShowMessage(false);
    };
  }, []);

  return (
    <>
      {/* <li
        onClick={() => setShowMessage((pre) => !pre)}
        className="flex gap-2 cursor-pointer"
      >
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
        {timeago.format(
          _.last(props.message_history)?.time_stemp as timeago.TDate,
          "th_TH"
        ) === "just now" ? (
          <div className="bg-primary inline">
            {_.last(props.message_history)?.message}
          </div>
        ) : (
          ""
        )}
      </li> */}
      <div className="cursor-pointer select-none">
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
          {/* {timeago.format(
            _.last(props.message_history)?.time_stemp as timeago.TDate,
            "th_TH"
          ) === "just now" ? (
            <div className="bg-primary inline">
              {_.last(props.message_history)?.message}
            </div>
          ) : (
            ""
          )} */}
           <div className="bg-primary">
              {_.last(props.message_history)?.message}
            </div>
        </div>
      </div>

      {/* {ShowMessage ? (
        <div className="mb-3">
          <ul className="list-disc list-inside text-slate-900 dark:text-slate-200">
            {props.message_history.map((item, idx) => (
              <li>{item.message}</li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )} */}
    </>
  );
}
