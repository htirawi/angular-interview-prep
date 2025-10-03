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
        className={`relative flex h-80 flex-col overflow-hidden rounded-xl border-2 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
          isHovered ? "border-blue-400 shadow-xl" : "border-gray-200"
        }`}
      >
        {/* Header with Icons */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <FrameworkIcon framework={card.icon} size={24} />
            </div>
          </div>
          <DifficultyIndicator level={card.level} />
        </div>

        {/* Title and Subtitle */}
        <div className="mb-4 flex-grow">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700">
            {card.title}
          </h3>
          <p className="text-sm text-gray-600">{card.subtitle}</p>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Tested Skills
          </div>
          <div className="flex flex-wrap gap-1">
            {card.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
              >
                {skill}
              </span>
            ))}
            {card.skills.length > 3 && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                +{card.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Hover Gradient Overlay - Behind content */}
        <div
          className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : ""
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
      navigate(`/quiz/${card.framework}/${card.level}/interactive`);
    }
  };

  const handleStartQuiz = (card: QuizCard) => {
    navigate(`/quiz/${card.framework}/${card.level}/interactive`);
  };

  const closePopup = () => {
    setHoveredCard(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Developer Quiz Selection</h1>
          <p className="text-lg text-gray-600">
            Choose your quiz level and framework to test your skills
          </p>
        </div>

        {/* Quiz Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {QUIZ_CARDS.map((card) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[card.id] = el;
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
          ))}
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
    </div>
  );
}
