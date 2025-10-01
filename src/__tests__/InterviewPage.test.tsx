import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import InterviewPage from "../pages/InterviewPage";

// Helper to render with router at /angular
const renderInterviewPage = (framework = "angular") => {
  return render(
    <MemoryRouter initialEntries={[`/${framework}`]}>
      <Routes>
        <Route path="/:framework" element={<InterviewPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("InterviewPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders angular questions by default", () => {
    renderInterviewPage("angular");
    // Should have "Change Framework" button
    expect(screen.getByText(/Change Framework/i)).toBeInTheDocument();
  });

  it("renders nextjs questions when on /nextjs", () => {
    renderInterviewPage("nextjs");
    // Should have "Change Framework" button
    expect(screen.getByText(/Change Framework/i)).toBeInTheDocument();
  });

  it("renders react questions when on /react", () => {
    renderInterviewPage("react");
    // Should have "Change Framework" button
    expect(screen.getByText(/Change Framework/i)).toBeInTheDocument();
  });

  it("renders redux questions when on /redux", () => {
    renderInterviewPage("redux");
    // Should have "Change Framework" button
    expect(screen.getByText(/Change Framework/i)).toBeInTheDocument();
  });
});
