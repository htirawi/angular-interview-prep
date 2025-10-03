/**
 * Quiz Selection Page - Modern card-based quiz selection with hover details
 */

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FrameworkIcon } from "../components/common/icons/FrameworkIcon";

interface QuizCard {
  id: string;
  framework: string;
  level: "junior" | "intermediate" | "senior";
  title: string;
  subtitle: string;
  skills: string[];
  duration: string;
  evaluation: string;
  description: string;
  icon: string;
}

const QUIZ_CARDS: QuizCard[] = [
  // Angular Cards
  {
    id: "angular-junior",
    framework: "angular",
    level: "junior",
    title: "Junior Angular Developer | TypeScript",
    subtitle: "Component Architecture & Services",
    skills: [
      "Angular Components",
      "TypeScript",
      "Services",
      "Dependency Injection",
      "RxJS",
      "Angular CLI",
      "Modules",
      "Directives",
    ],
    duration: "45 minutes",
    evaluation: "Automatic",
    description:
      "This quiz evaluates fundamental Angular concepts including components, services, and basic TypeScript knowledge.",
    icon: "angular",
  },
  {
    id: "angular-intermediate",
    framework: "angular",
    level: "intermediate",
    title: "Intermediate Angular Developer | Advanced Features",
    subtitle: "Advanced Patterns & State Management",
    skills: [
      "Angular Forms",
      "Routing",
      "Guards",
      "Interceptors",
      "State Management",
      "Testing",
      "Performance",
      "Angular Material",
    ],
    duration: "60 minutes",
    evaluation: "Automatic",
    description:
      "This quiz covers intermediate Angular concepts including advanced routing, forms, and state management patterns.",
    icon: "angular",
  },
  {
    id: "angular-senior",
    framework: "angular",
    level: "senior",
    title: "Senior Angular Developer | Enterprise Architecture",
    subtitle: "Enterprise Solutions & Performance",
    skills: [
      "Architecture Patterns",
      "Microservices",
      "Performance Optimization",
      "Security",
      "Testing Strategies",
      "CI/CD",
      "Advanced RxJS",
      "Angular Universal",
    ],
    duration: "75 minutes",
    evaluation: "Automatic",
    description:
      "This quiz evaluates senior-level Angular expertise including enterprise architecture and performance optimization.",
    icon: "angular",
  },

  // React Cards
  {
    id: "react-junior",
    framework: "react",
    level: "junior",
    title: "Junior React Developer | JavaScript",
    subtitle: "Component Basics & Hooks",
    skills: [
      "React Components",
      "JSX",
      "Props",
      "State",
      "Hooks",
      "Event Handling",
      "Conditional Rendering",
      "Lists",
    ],
    duration: "45 minutes",
    evaluation: "Automatic",
    description:
      "This quiz covers fundamental React concepts including components, hooks, and basic JavaScript patterns.",
    icon: "react",
  },
  {
    id: "react-intermediate",
    framework: "react",
    level: "intermediate",
    title: "Intermediate React Developer | Advanced Patterns",
    subtitle: "State Management & Performance",
    skills: [
      "Context API",
      "Custom Hooks",
      "Performance",
      "Testing",
      "Routing",
      "Forms",
      "Error Boundaries",
      "Code Splitting",
    ],
    duration: "60 minutes",
    evaluation: "Automatic",
    description:
      "This quiz evaluates intermediate React skills including state management and performance optimization.",
    icon: "react",
  },
  {
    id: "react-senior",
    framework: "react",
    level: "senior",
    title: "Senior React Developer | Enterprise Solutions",
    subtitle: "Architecture & Advanced Patterns",
    skills: [
      "React Architecture",
      "Design Patterns",
      "Performance",
      "Testing Strategies",
      "SSR/SSG",
      "Micro Frontends",
      "Advanced Hooks",
      "Concurrent Features",
    ],
    duration: "75 minutes",
    evaluation: "Automatic",
    description:
      "This quiz covers senior-level React expertise including enterprise architecture and advanced patterns.",
    icon: "react",
  },

  // Next.js Cards
  {
    id: "nextjs-junior",
    framework: "nextjs",
    level: "junior",
    title: "Junior Next.js Developer | Full-Stack Basics",
    subtitle: "Pages & API Routes",
    skills: [
      "Next.js Pages",
      "API Routes",
      "File-based Routing",
      "Static Generation",
      "Image Optimization",
      "CSS Modules",
      "Environment Variables",
      "Deployment",
    ],
    duration: "45 minutes",
    evaluation: "Automatic",
    description:
      "This quiz covers fundamental Next.js concepts including pages, API routes, and basic full-stack development.",
    icon: "nextjs",
  },
  {
    id: "nextjs-intermediate",
    framework: "nextjs",
    level: "intermediate",
    title: "Intermediate Next.js Developer | App Router",
    subtitle: "Modern Architecture & Performance",
    skills: [
      "App Router",
      "Server Components",
      "Client Components",
      "Streaming",
      "Middleware",
      "Caching",
      "Performance",
      "SEO",
    ],
    duration: "60 minutes",
    evaluation: "Automatic",
    description:
      "This quiz evaluates intermediate Next.js skills including App Router and modern architecture patterns.",
    icon: "nextjs",
  },
  {
    id: "nextjs-senior",
    framework: "nextjs",
    level: "senior",
    title: "Senior Next.js Developer | Enterprise Architecture",
    subtitle: "Advanced Patterns & Optimization",
    skills: [
      "Enterprise Architecture",
      "Microservices",
      "Performance",
      "Security",
      "Advanced Caching",
      "Edge Functions",
      "Monitoring",
      "Scalability",
    ],
    duration: "75 minutes",
    evaluation: "Automatic",
    description:
      "This quiz covers senior-level Next.js expertise including enterprise architecture and advanced optimization.",
    icon: "nextjs",
  },

  // Redux Cards
  {
    id: "redux-junior",
    framework: "redux",
    level: "junior",
    title: "Junior Redux Developer | State Management",
    subtitle: "Basic State Management",
    skills: [
      "Redux Basics",
      "Actions",
      "Reducers",
      "Store",
      "React-Redux",
      "useSelector",
      "useDispatch",
      "Provider",
    ],
    duration: "45 minutes",
    evaluation: "Automatic",
    description:
      "This quiz covers fundamental Redux concepts including basic state management and React integration.",
    icon: "redux",
  },
  {
    id: "redux-intermediate",
    framework: "redux",
    level: "intermediate",
    title: "Intermediate Redux Developer | Advanced Patterns",
    subtitle: "Middleware & Redux Toolkit",
    skills: [
      "Redux Toolkit",
      "Middleware",
      "Async Actions",
      "Selectors",
      "DevTools",
      "Performance",
      "Testing",
      "Best Practices",
    ],
    duration: "60 minutes",
    evaluation: "Automatic",
    description:
      "This quiz evaluates intermediate Redux skills including middleware and Redux Toolkit patterns.",
    icon: "redux",
  },
  {
    id: "redux-senior",
    framework: "redux",
    level: "senior",
    title: "Senior Redux Developer | Enterprise Architecture",
    subtitle: "Advanced State Management",
    skills: [
      "Enterprise Patterns",
      "Microservices",
      "Performance",
      "Security",
      "Advanced Middleware",
      "State Persistence",
      "Monitoring",
      "Scalability",
    ],
    duration: "75 minutes",
    evaluation: "Automatic",
    description:
      "This quiz covers senior-level Redux expertise including enterprise architecture and advanced state management.",
    icon: "redux",
  },
];

const DifficultyIndicator = ({ level }: { level: "junior" | "intermediate" | "senior" }) => {
  const bars = level === "junior" ? 1 : level === "intermediate" ? 2 : 3;
  const label = level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className={`h-4 w-1.5 rounded-full transition-colors duration-200 ${
              bar <= bars ? "bg-green-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-bold text-green-600">{label}</span>
    </div>
  );
};

const QuizCardComponent = ({
  card,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  card: QuizCard;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="group relative cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Start ${card.title} quiz`}
    >
      <div
        className={`relative flex h-80 flex-col overflow-hidden rounded-xl border-2 bg-white p-6 shadow-lg transition-all duration-300 ${
          isHovered
            ? "-translate-y-2 scale-[1.02] border-blue-400 shadow-xl"
            : "border-gray-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
        }`}
      >
        {/* Header with Icons */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg p-2 transition-all duration-300 ${
                isHovered
                  ? "scale-110 bg-blue-100 shadow-md"
                  : "bg-blue-50 group-hover:scale-105 group-hover:bg-blue-100"
              }`}
            >
              <FrameworkIcon framework={card.icon} size={24} />
            </div>
            <div
              className={`text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${
                isHovered ? "text-blue-600" : "text-gray-500 group-hover:text-blue-500"
              }`}
            >
              {card.framework.toUpperCase()}
            </div>
          </div>
          <DifficultyIndicator level={card.level} />
        </div>

        {/* Title and Subtitle */}
        <div className="mb-4 flex-grow">
          <h3
            className={`text-lg font-bold transition-colors duration-300 ${
              isHovered ? "text-blue-700" : "text-gray-900 group-hover:text-blue-600"
            }`}
          >
            {card.title}
          </h3>
          <p
            className={`mt-1 text-sm transition-colors duration-300 ${
              isHovered ? "text-blue-600" : "text-gray-600 group-hover:text-gray-700"
            }`}
          >
            {card.subtitle}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div
            className={`mb-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${
              isHovered ? "text-blue-500" : "text-gray-500 group-hover:text-blue-400"
            }`}
          >
            Tested Skills
          </div>
          <div className="flex flex-wrap gap-1">
            {card.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className={`rounded-full px-2 py-1 text-xs transition-all duration-300 ${
                  isHovered
                    ? "scale-105 bg-blue-100 text-blue-700 shadow-sm"
                    : "bg-gray-100 text-gray-700 group-hover:scale-102 group-hover:bg-blue-50 group-hover:text-blue-600"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {skill}
              </span>
            ))}
            {card.skills.length > 3 && (
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold transition-all duration-300 ${
                  isHovered
                    ? "scale-105 bg-blue-200 text-blue-800 shadow-sm"
                    : "group-hover:bg-blue-150 bg-blue-100 text-blue-700 group-hover:scale-102 group-hover:text-blue-800"
                }`}
              >
                +{card.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Duration and Evaluation */}
        <div className="mb-4 flex items-center justify-between text-xs">
          <div
            className={`flex items-center gap-1 transition-colors duration-300 ${
              isHovered ? "text-blue-600" : "text-gray-500 group-hover:text-blue-500"
            }`}
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{card.duration}</span>
          </div>
          <div
            className={`flex items-center gap-1 transition-colors duration-300 ${
              isHovered ? "text-blue-600" : "text-gray-500 group-hover:text-blue-500"
            }`}
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{card.evaluation}</span>
          </div>
        </div>

        {/* Start Quiz Button */}
        <div
          className={`transition-all duration-300 ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          <div className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Start Quiz
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Hover Gradient Overlay - Behind content */}
        <div
          className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "group-hover:opacity-50"
          }`}
        />
      </div>
    </div>
  );
};

const QuizDetailsPopup = ({
  card,
  isVisible,
  position,
  onClose,
  onStartQuiz,
}: {
  card: QuizCard | null;
  isVisible: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onStartQuiz?: (card: QuizCard) => void;
}) => {
  if (!card || !isVisible) return null;

  // Determine arrow direction based on popup position
  const isLeftPosition = position.x < window.innerWidth / 2;
  const arrowClass = isLeftPosition
    ? "absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-b border-l border-gray-200 bg-white"
    : "absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-t border-r border-gray-200 bg-white";

  return (
    <>
      {/* Mobile Overlay */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={onClose} />

      {/* Desktop Popup */}
      <div
        className="fixed z-50 hidden w-[28rem] max-w-[90vw] rounded-xl border border-gray-200 bg-white p-6 shadow-2xl lg:block"
        style={{
          left: position.x,
          top: position.y,
          transform: "translateY(-50%)",
        }}
      >
        {/* Arrow pointing to card */}
        <div className={arrowClass} />

        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
          <p className="text-sm text-gray-600">{card.subtitle}</p>
        </div>

        {/* Tested Skills */}
        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Tested Skills
          </div>
          <div className="flex flex-wrap gap-1">
            {card.skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Duration
          </div>
          <div className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
            {card.duration}
          </div>
        </div>

        {/* Evaluation */}
        <div className="mb-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Evaluation
          </div>
          <div className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
            {card.evaluation}
          </div>
        </div>

        {/* Test Overview */}
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Test Overview
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-sm font-medium text-gray-900">Choice Questions</div>
              <div className="text-sm text-gray-600">
                Assessing knowledge of {card.framework}, JavaScript, and related technologies
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                Interactive Quiz - Level: {card.level.charAt(0).toUpperCase() + card.level.slice(1)}
              </div>
              <div className="text-sm text-gray-600">{card.description}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      <div className="fixed inset-x-4 bottom-4 z-50 rounded-xl border border-gray-200 bg-white p-6 shadow-2xl lg:hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close details"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-4 pr-8">
          <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
          <p className="text-sm text-gray-600">{card.subtitle}</p>
        </div>

        {/* Tested Skills */}
        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Tested Skills
          </div>
          <div className="flex flex-wrap gap-1">
            {card.skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Duration
          </div>
          <div className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
            {card.duration}
          </div>
        </div>

        {/* Evaluation */}
        <div className="mb-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Evaluation
          </div>
          <div className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
            {card.evaluation}
          </div>
        </div>

        {/* Test Overview */}
        <div className="mb-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Test Overview
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-sm font-medium text-gray-900">Choice Questions</div>
              <div className="text-sm text-gray-600">
                Assessing knowledge of {card.framework}, JavaScript, and related technologies
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                Interactive Quiz - Level: {card.level.charAt(0).toUpperCase() + card.level.slice(1)}
              </div>
              <div className="text-sm text-gray-600">{card.description}</div>
            </div>
          </div>
        </div>

        {/* Start Quiz Button */}
        <button
          onClick={() => {
            onClose();
            onStartQuiz?.(card);
          }}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Start Quiz
        </button>
      </div>
    </>
  );
};

export default function QuizSelectionPage() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFramework, setSelectedFramework] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && hoveredCard) {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [hoveredCard]);

  const handleCardHover = (cardId: string) => {
    if (isMobile) return; // Don't show hover on mobile
    setHoveredCard(cardId);

    // Calculate popup position
    const cardElement = cardRefs.current[cardId];
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      const popupWidth = 448; // 28rem = 448px
      const popupHeight = 400; // Estimated popup height

      // Calculate position with screen boundary checks
      let x = rect.right + 20;
      let y = rect.top + rect.height / 2;

      // Check if popup would go off right edge
      if (x + popupWidth > window.innerWidth) {
        x = rect.left - popupWidth - 20; // Position to the left instead
      }

      // Check if popup would go off bottom edge
      if (y + popupHeight / 2 > window.innerHeight) {
        y = window.innerHeight - popupHeight / 2 - 20;
      }

      // Check if popup would go off top edge
      if (y - popupHeight / 2 < 20) {
        y = popupHeight / 2 + 20;
      }

      setPopupPosition({ x, y });
    }
  };

  const handleCardClick = (card: QuizCard) => {
    if (isMobile) {
      // On mobile, show details modal instead of navigating directly
      setHoveredCard(card.id);
    } else {
      navigate(`/quiz/${card.framework}/${card.level}`);
    }
  };

  const handleStartQuiz = (card: QuizCard) => {
    navigate(`/quiz/${card.framework}/${card.level}`);
  };

  const closePopup = () => {
    setHoveredCard(null);
  };

  // Filter cards based on search and filters
  const filteredCards = QUIZ_CARDS.filter((card) => {
    const matchesSearch =
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFramework = selectedFramework === "all" || card.framework === selectedFramework;
    const matchesLevel = selectedLevel === "all" || card.level === selectedLevel;

    return matchesSearch && matchesFramework && matchesLevel;
  });

  // Get unique frameworks and levels for filter options
  const frameworks = Array.from(new Set(QUIZ_CARDS.map((card) => card.framework)));
  const levels = Array.from(new Set(QUIZ_CARDS.map((card) => card.level)));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `,
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="mb-12">
          {/* Main Title Section */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">
                Developer Quiz Selection
              </h1>
            </div>
            <p className="text-lg text-gray-600 lg:text-xl">
              Choose your quiz level and framework to test your skills
            </p>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>12 Quizzes Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>4 Frameworks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span>3 Difficulty Levels</span>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search Bar */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search quizzes by title, skills, or framework..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                {/* Framework Filter */}
                <select
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All Frameworks</option>
                  {frameworks.map((framework) => (
                    <option key={framework} value={framework}>
                      {framework.charAt(0).toUpperCase() + framework.slice(1)}
                    </option>
                  ))}
                </select>

                {/* Level Filter */}
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All Levels</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing {filteredCards.length} of {QUIZ_CARDS.length} quizzes
              </span>
              {(searchTerm || selectedFramework !== "all" || selectedLevel !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedFramework("all");
                    setSelectedLevel("all");
                  }}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quiz Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCards.length > 0 ? (
            filteredCards.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[card.id] = el;
                }}
                className="transform transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                  opacity: 0,
                }}
              >
                <QuizCardComponent
                  card={card}
                  isHovered={hoveredCard === card.id}
                  onMouseEnter={() => handleCardHover(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCardClick(card)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No quizzes found</h3>
              <p className="mb-4 text-gray-600">Try adjusting your search terms or filters</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFramework("all");
                  setSelectedLevel("all");
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Details Popup */}
        <QuizDetailsPopup
          card={hoveredCard ? QUIZ_CARDS.find((c) => c.id === hoveredCard) || null : null}
          isVisible={!!hoveredCard}
          position={popupPosition}
          onClose={closePopup}
          onStartQuiz={handleStartQuiz}
        />
      </div>

      {/* Enhanced Footer */}
      <div className="mt-20 border-t border-slate-200/50 pt-12 dark:border-slate-700/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Built with React 19, TypeScript, and Tailwind CSS
            </p>
            <p className="mt-2 text-slate-700 dark:text-slate-300">
              Crafted with ❤️ by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
                Hussein Tirawi
              </span>
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
              © 2024 All rights reserved
            </p>
            <div className="mt-6">
              <a
                href="https://github.com/htirawi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
