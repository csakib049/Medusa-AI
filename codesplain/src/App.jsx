import CodeEntry from "./components/CodeEntry";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <CodeEntry/>
    </ToastProvider>
  );
}

export default App;
