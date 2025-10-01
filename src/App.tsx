import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FrameworkSelection from "./pages/FrameworkSelection";
import InterviewPage from "./pages/InterviewPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page - Framework selection */}
        <Route path="/" element={<FrameworkSelection />} />

        {/* Interview pages per framework */}
        <Route path="/angular" element={<InterviewPage />} />
        <Route path="/nextjs" element={<InterviewPage />} />
        <Route path="/react" element={<InterviewPage />} />
        <Route path="/redux" element={<InterviewPage />} />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
