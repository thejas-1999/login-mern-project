import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* root routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Root Router</div>,
  },
  {
    path: "/register",
    element: <div>Register router</div>,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
