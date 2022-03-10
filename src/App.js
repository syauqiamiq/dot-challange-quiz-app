import { useEffect } from "react";
import { useGlobalContext } from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { verifySession } = useGlobalContext();
  useEffect(() => {
    verifySession();
  }, []);
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
