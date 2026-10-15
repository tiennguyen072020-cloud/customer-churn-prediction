import { useRoutes } from "react-router-dom";

import { routes } from "./app/router";


function App() {
  return useRoutes(routes);
}


export default App;