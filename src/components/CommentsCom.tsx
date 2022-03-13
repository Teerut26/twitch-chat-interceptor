import React from "react";

export default function CommentsCom(props: {
  username: string;
  message: string;
}) {
  return (
    <div className="cursor-pointer select-none">
      <div className="flex gap-1 items-start">
        <div className="badge badge-accent">{props.username}</div>
        <div>{props.message}</div>
      </div>
    </div>
  );
}
