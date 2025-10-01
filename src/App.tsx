import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FrameworkSelection from "./pages/FrameworkSelection";
import InterviewPage from "./pages/InterviewPage";
import { ErrorBoundary } from "./core/components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrameworkSelection />} />
          <Route path="/:framework" element={<InterviewPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
