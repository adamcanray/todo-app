import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ThemedSuspenseFallback from "./components/ThemedSuspendFallback";

const TaskPage = lazy(() => import("./pages/Task"));
const NoMatch = lazy(() => import("./pages/NoMatch"));

function App() {
  return (
    <Suspense fallback={<ThemedSuspenseFallback />}>
      <Routes>
        <Route path="/">
          <Route index element={<TaskPage />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Suspense>
  );
}

export default App;
