import { useContext, useEffect } from "react";
import { useGlobalContext } from "./context/AppContext";
import { LoginContext } from "./context/LoginContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { verifySession } = useGlobalContext();
  useEffect(() => {
    verifySession();
  }, []);

  const { verifyLogin, auth } = useContext(LoginContext);
  useEffect(() => {
    verifyLogin();
  }, [auth]);
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
