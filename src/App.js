import * as useComponent from "./index";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <br />
      <useComponent.Header />

      <useComponent.UserInput />
    </div>
  );
}
