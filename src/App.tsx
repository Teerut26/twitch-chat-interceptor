// import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { numberActions } from "./store/slice/number";
import LiveChat from "./components/LiveChat";
import Select from "./components/Select";

function App() {
  const dispatch = useDispatch();
  const number = useSelector((state: any) => state.number.count);

  const increment = () => {
    dispatch(numberActions.increment());
  };

  const decrement = () => {
    dispatch(numberActions.decrement());
  };

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 flex flex-col lg:flex-row justify-between p-3 gap-3">
      <Select />
      <LiveChat />
    </div>
  );
}

export default App;
