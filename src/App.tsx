import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ModeSelection from "./pages/ModeSelection";
import FrameworkSelection from "./pages/FrameworkSelection";
import InterviewPage from "./pages/InterviewPage";
import QuizSelectionPage from "./pages/QuizSelectionPage";
import InteractiveQuizPage from "./pages/InteractiveQuizPage";
import { ErrorBoundary } from "./core/components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AccessibilityEnhancements } from "./components/common/AccessibilityEnhancements";

export default function App() {
  return (
    <ThemeProvider>
      <AccessibilityEnhancements>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ModeSelection />} />
              <Route path="/study" element={<FrameworkSelection />} />
              <Route path="/study/:framework" element={<InterviewPage />} />
              <Route path="/quiz" element={<QuizSelectionPage />} />
              <Route path="/quiz/:framework/:level" element={<InteractiveQuizPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </AccessibilityEnhancements>
    </ThemeProvider>
  );
}
