import "./App.css";
import axios from "axios";

function App() {
  const handleClick = () => {
    axios.get("http://localhost:4000/send-notification");
  };
  return <button onClick={handleClick}>push notification from kizukai</button>;
}

export default App;
