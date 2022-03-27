// import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { numberActions } from "./store/slice/number";
import LiveChat from "./components/LiveChat";
import Select from "./components/Select";
import { Comments } from "./store/slice/chat_select";
import { chatSelectActions } from "./store/slice/chat_select";

function App() {
  const dispatch = useDispatch();
  const chat_select = useSelector(
    (state: { chat_select: { selection: Comments | null } }) =>
      state.chat_select.selection
  );

  return (
    <>
      {chat_select !== null ? (
        <div className="top-0 absolute bottom-0 right-0 left-0 z-[50] flex flex-col items-center justify-center backdrop-blur-lg bg-transparent overflow-hidden px-3">
          <div className="modal-open max-w-4xl mx-auto w-full max-h-xl">
            <div className="flex flex-col gap-3 w-full h-full">
              <div className="text-2xl">{chat_select?.username}</div>
              <div className="mb-3 overflow-auto h-[31rem]">
                <ul className="list-disc list-inside text-slate-900 dark:text-slate-200">
                  {chat_select.message_history.map((item, idx) => (
                    <li>{item.message}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3 justify-start">
                <div
                  onClick={() => dispatch(chatSelectActions.clearUser())}
                  className="btn"
                >
                  ยกเลิก
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="absolute top-0 bottom-0 right-0 left-0 flex flex-col lg:flex-row justify-between p-3 gap-3">
        <Select />
        <LiveChat />
      </div>
    </>
  );
}

export default App;
