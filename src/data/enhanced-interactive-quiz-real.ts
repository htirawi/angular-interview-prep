/**
 * Enhanced Interactive Quiz Data - Real Angular Questions
 * Contains actual questions with meaningful content and answers
 */

import type { InteractiveQuizQuestion } from "../types/interactive-quiz";

// Angular Questions - Real questions with actual content
export const ANGULAR_ENHANCED_QUESTIONS = {
  junior: [
    {
      id: "angular-junior-1",
      question: "What is Angular?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "A JavaScript library", isCorrect: false },
        { id: "b", text: "A complete platform for building web applications", isCorrect: true },
        { id: "c", text: "A CSS framework", isCorrect: false },
        { id: "d", text: "A database management system", isCorrect: false },
      ],
      explanation:
        "Angular is a complete platform for building web applications, not just a library. It provides a full framework with routing, forms, HTTP client, and more.",
      category: "Angular Basics",
      difficulty: "easy" as const,
      tags: ["basics", "platform"],
      points: 1,
    },
    {
      id: "angular-junior-2",
      question: "Complete the following: Angular uses _____ for two-way data binding.",
      type: "fill-blank" as const,
      correctAnswer: "ngModel",
      explanation:
        "Angular uses ngModel directive for two-way data binding, allowing data to flow both from component to view and from view to component.",
      category: "Data Binding",
      difficulty: "easy" as const,
      tags: ["data-binding", "ngModel"],
      points: 1,
    },
    {
      id: "angular-junior-3",
      question:
        "Which Angular features help with performance optimization? (Select all that apply)",
      type: "multiple-checkbox" as const,
      options: [
        { id: "a", text: "OnPush change detection", isCorrect: true },
        { id: "b", text: "Lazy loading", isCorrect: true },
        { id: "c", text: "TrackBy function", isCorrect: true },
        { id: "d", text: "All of the above", isCorrect: true },
      ],
      correctAnswers: ["a", "b", "c", "d"],
      explanation:
        "OnPush change detection, lazy loading, and TrackBy functions all help optimize Angular application performance.",
      category: "Performance",
      difficulty: "easy" as const,
      tags: ["performance", "optimization"],
      points: 1,
    },
    {
      id: "angular-junior-4",
      question: "Angular guards are used to control route access.",
      type: "true-false" as const,
      correctAnswer: "true",
      explanation:
        "Angular guards are used to control access to routes, ensuring users can only access certain parts of the application when authorized.",
      category: "Routing",
      difficulty: "easy" as const,
      tags: ["guards", "routing", "security"],
      points: 1,
    },
    {
      id: "angular-junior-5",
      question: "What is the difference between Angular services and components?",
      type: "multiple-choice" as const,
      options: [
        {
          id: "a",
          text: "Components handle UI, services handle business logic and data sharing",
          isCorrect: true,
        },
        { id: "b", text: "Services handle UI, components handle business logic", isCorrect: false },
        { id: "c", text: "They are the same thing", isCorrect: false },
        { id: "d", text: "Services are deprecated in Angular", isCorrect: false },
      ],
      explanation:
        "Components handle the UI and user interactions, while services handle business logic and data sharing between components.",
      category: "Architecture",
      difficulty: "easy" as const,
      tags: ["components", "services", "architecture"],
      points: 1,
    },
    {
      id: "angular-junior-6",
      question: "Complete: Angular uses ____ for reactive programming.",
      type: "fill-blank" as const,
      correctAnswer: "RxJS",
      explanation:
        "Angular uses RxJS (Reactive Extensions for JavaScript) for reactive programming and handling asynchronous operations.",
      category: "Reactive Programming",
      difficulty: "easy" as const,
      tags: ["rxjs", "reactive", "observables"],
      points: 1,
    },
    {
      id: "angular-junior-7",
      question: "What is dependency injection in Angular?",
      type: "multiple-choice" as const,
      options: [
        {
          id: "a",
          text: "A design pattern that provides dependencies to a class",
          isCorrect: true,
        },
        { id: "b", text: "A way to inject CSS into components", isCorrect: false },
        { id: "c", text: "A method for database connections", isCorrect: false },
        { id: "d", text: "A deprecated feature", isCorrect: false },
      ],
      explanation:
        "Dependency injection is a design pattern where dependencies are provided to a class rather than the class creating them itself.",
      category: "Dependency Injection",
      difficulty: "easy" as const,
      tags: ["dependency-injection", "design-pattern"],
      points: 1,
    },
    {
      id: "angular-junior-8",
      question: "Angular CLI is used for project scaffolding and development tasks.",
      type: "true-false" as const,
      correctAnswer: "true",
      explanation:
        "Angular CLI (Command Line Interface) is used for creating projects, generating components, services, and other development tasks.",
      category: "Angular CLI",
      difficulty: "easy" as const,
      tags: ["cli", "tooling", "scaffolding"],
      points: 1,
    },
    {
      id: "angular-junior-9",
      question: "Which decorators are commonly used in Angular? (Select all that apply)",
      type: "multiple-checkbox" as const,
      options: [
        { id: "a", text: "@Component", isCorrect: true },
        { id: "b", text: "@Injectable", isCorrect: true },
        { id: "c", text: "@Input", isCorrect: true },
        { id: "d", text: "@Output", isCorrect: true },
      ],
      correctAnswers: ["a", "b", "c", "d"],
      explanation:
        "Angular uses decorators like @Component, @Injectable, @Input, and @Output to define metadata for classes.",
      category: "Decorators",
      difficulty: "easy" as const,
      tags: ["decorators", "metadata"],
      points: 1,
    },
    {
      id: "angular-junior-10",
      question: "Complete: Angular applications are built using ____ architecture.",
      type: "fill-blank" as const,
      correctAnswer: "component-based",
      explanation:
        "Angular applications follow a component-based architecture where the application is built as a tree of components.",
      category: "Architecture",
      difficulty: "easy" as const,
      tags: ["architecture", "components"],
      points: 1,
    },
    // Adding more real questions to reach 30...
    {
      id: "angular-junior-11",
      question: "What is the purpose of Angular modules?",
      type: "multiple-choice" as const,
      options: [
        {
          id: "a",
          text: "To organize related components, services, and other code",
          isCorrect: true,
        },
        { id: "b", text: "To create CSS styles", isCorrect: false },
        { id: "c", text: "To handle HTTP requests", isCorrect: false },
        { id: "d", text: "To manage database connections", isCorrect: false },
      ],
      explanation:
        "Angular modules are used to organize related components, services, pipes, and other code into cohesive blocks.",
      category: "Modules",
      difficulty: "easy" as const,
      tags: ["modules", "organization"],
      points: 1,
    },
    {
      id: "angular-junior-12",
      question: "Angular supports both template-driven and reactive forms.",
      type: "true-false" as const,
      correctAnswer: "true",
      explanation:
        "Angular provides both template-driven forms (declarative) and reactive forms (programmatic) for handling user input.",
      category: "Forms",
      difficulty: "easy" as const,
      tags: ["forms", "validation"],
      points: 1,
    },
    {
      id: "angular-junior-13",
      question: "What is the purpose of Angular pipes?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "To transform data in templates", isCorrect: true },
        { id: "b", text: "To create HTTP connections", isCorrect: false },
        { id: "c", text: "To manage component lifecycle", isCorrect: false },
        { id: "d", text: "To handle routing", isCorrect: false },
      ],
      explanation:
        "Angular pipes are used to transform data in templates, such as formatting dates, currency, or text.",
      category: "Pipes",
      difficulty: "easy" as const,
      tags: ["pipes", "data-transformation"],
      points: 1,
    },
    {
      id: "angular-junior-14",
      question: "Complete: Angular uses ____ for styling components.",
      type: "fill-blank" as const,
      correctAnswer: "CSS",
      explanation:
        "Angular components can be styled using CSS, SCSS, SASS, or other CSS preprocessors.",
      category: "Styling",
      difficulty: "easy" as const,
      tags: ["css", "styling"],
      points: 1,
    },
    {
      id: "angular-junior-15",
      question:
        "Which lifecycle hooks are available in Angular components? (Select all that apply)",
      type: "multiple-checkbox" as const,
      options: [
        { id: "a", text: "ngOnInit", isCorrect: true },
        { id: "b", text: "ngOnDestroy", isCorrect: true },
        { id: "c", text: "ngOnChanges", isCorrect: true },
        { id: "d", text: "ngAfterViewInit", isCorrect: true },
      ],
      correctAnswers: ["a", "b", "c", "d"],
      explanation:
        "Angular provides several lifecycle hooks including ngOnInit, ngOnDestroy, ngOnChanges, and ngAfterViewInit.",
      category: "Lifecycle",
      difficulty: "easy" as const,
      tags: ["lifecycle", "hooks"],
      points: 1,
    },
    // Continue with more questions to reach 30...
    {
      id: "angular-junior-16",
      question: "Angular applications are single-page applications (SPAs).",
      type: "true-false" as const,
      correctAnswer: "true",
      explanation:
        "Angular applications are typically single-page applications that load once and dynamically update content.",
      category: "SPA",
      difficulty: "easy" as const,
      tags: ["spa", "architecture"],
      points: 1,
    },
    {
      id: "angular-junior-17",
      question: "What is the purpose of Angular directives?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "To extend HTML with custom behavior", isCorrect: true },
        { id: "b", text: "To create database tables", isCorrect: false },
        { id: "c", text: "To handle HTTP requests", isCorrect: false },
        { id: "d", text: "To manage component state", isCorrect: false },
      ],
      explanation:
        "Angular directives are used to extend HTML with custom behavior and functionality.",
      category: "Directives",
      difficulty: "easy" as const,
      tags: ["directives", "html"],
      points: 1,
    },
    {
      id: "angular-junior-18",
      question: "Complete: Angular uses ____ for HTTP requests.",
      type: "fill-blank" as const,
      correctAnswer: "HttpClient",
      explanation: "Angular provides HttpClient service for making HTTP requests to external APIs.",
      category: "HTTP",
      difficulty: "easy" as const,
      tags: ["http", "api"],
      points: 1,
    },
    {
      id: "angular-junior-19",
      question: "Which built-in directives does Angular provide? (Select all that apply)",
      type: "multiple-checkbox" as const,
      options: [
        { id: "a", text: "*ngIf", isCorrect: true },
        { id: "b", text: "*ngFor", isCorrect: true },
        { id: "c", text: "*ngSwitch", isCorrect: true },
        { id: "d", text: "*ngStyle", isCorrect: true },
      ],
      correctAnswers: ["a", "b", "c", "d"],
      explanation:
        "Angular provides several built-in structural and attribute directives like *ngIf, *ngFor, *ngSwitch, and *ngStyle.",
      category: "Directives",
      difficulty: "easy" as const,
      tags: ["directives", "built-in"],
      points: 1,
    },
    {
      id: "angular-junior-20",
      question: "Angular supports TypeScript by default.",
      type: "true-false" as const,
      correctAnswer: "true",
      explanation:
        "Angular is built with TypeScript and provides excellent TypeScript support out of the box.",
      category: "TypeScript",
      difficulty: "easy" as const,
      tags: ["typescript", "language"],
      points: 1,
    },
    // Adding more questions to complete the set...
    {
      id: "angular-junior-21",
      question: "What is the purpose of Angular interceptors?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "To intercept and modify HTTP requests/responses", isCorrect: true },
        { id: "b", text: "To create animations", isCorrect: false },
        { id: "c", text: "To manage routing", isCorrect: false },
        { id: "d", text: "To handle forms", isCorrect: false },
      ],
      explanation:
        "Angular interceptors are used to intercept and modify HTTP requests and responses globally.",
      category: "Interceptors",
      difficulty: "easy" as const,
      tags: ["interceptors", "http"],
      points: 1,
    },
    {
      id: "angular-junior-22",
      question: "Complete: Angular uses ____ for animations.",
      type: "fill-blank" as const,
      correctAnswer: "Angular Animations",
      explanation:
        "Angular provides a powerful animations API for creating smooth transitions and animations.",
      category: "Animations",
      difficulty: "easy" as const,
      tags: ["animations", "transitions"],
      points: 1,
    },
    {
      id: "angular-junior-23",
      question: "Which testing frameworks does Angular support? (Select all that apply)",
      type: "multiple-checkbox" as const,
      options: [
        { id: "a", text: "Jasmine", isCorrect: true },
        { id: "b", text: "Karma", isCorrect: true },
        { id: "c", text: "Protractor", isCorrect: true },
        { id: "d", text: "Jest", isCorrect: true },
      ],
      correctAnswers: ["a", "b", "c", "d"],
      explanation:
        "Angular supports various testing frameworks including Jasmine, Karma, Protractor, and Jest.",
      category: "Testing",
      difficulty: "easy" as const,
      tags: ["testing", "frameworks"],
      points: 1,
    },
    {
      id: "angular-junior-24",
      question: "Angular applications can be deployed to various platforms.",
      type: "true-false" as const,
      correctAnswer: "true",
      explanation:
        "Angular applications can be deployed to web servers, mobile apps, desktop apps, and various cloud platforms.",
      category: "Deployment",
      difficulty: "easy" as const,
      tags: ["deployment", "platforms"],
      points: 1,
    },
    {
      id: "angular-junior-25",
      question: "What is the purpose of Angular schematics?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "To generate and modify code", isCorrect: true },
        { id: "b", text: "To create animations", isCorrect: false },
        { id: "c", text: "To handle HTTP requests", isCorrect: false },
        { id: "d", text: "To manage routing", isCorrect: false },
      ],
      explanation:
        "Angular schematics are code generation tools that help create and modify Angular projects.",
      category: "Schematics",
      difficulty: "easy" as const,
      tags: ["schematics", "code-generation"],
      points: 1,
    },
    {
      id: "angular-junior-26",
      question: "Complete: Angular uses ____ for internationalization.",
      type: "fill-blank" as const,
      correctAnswer: "i18n",
      explanation:
        "Angular provides i18n (internationalization) support for creating multi-language applications.",
      category: "i18n",
      difficulty: "easy" as const,
      tags: ["i18n", "internationalization"],
      points: 1,
    },
    {
      id: "angular-junior-27",
      question: "Which Angular features help with SEO? (Select all that apply)",
      type: "multiple-checkbox" as const,
      options: [
        { id: "a", text: "Server-side rendering", isCorrect: true },
        { id: "b", text: "Angular Universal", isCorrect: true },
        { id: "c", text: "Meta tags", isCorrect: true },
        { id: "d", text: "Static generation", isCorrect: true },
      ],
      correctAnswers: ["a", "b", "c", "d"],
      explanation:
        "Angular provides several features for SEO including server-side rendering, Angular Universal, meta tags, and static generation.",
      category: "SEO",
      difficulty: "easy" as const,
      tags: ["seo", "ssr", "universal"],
      points: 1,
    },
    {
      id: "angular-junior-28",
      question: "Angular supports progressive web app (PWA) features.",
      type: "true-false" as const,
      correctAnswer: "true",
      explanation:
        "Angular provides built-in support for creating progressive web apps with service workers and offline capabilities.",
      category: "PWA",
      difficulty: "easy" as const,
      tags: ["pwa", "offline"],
      points: 1,
    },
    {
      id: "angular-junior-29",
      question: "What is the purpose of Angular elements?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "To create reusable web components", isCorrect: true },
        { id: "b", text: "To create animations", isCorrect: false },
        { id: "c", text: "To handle HTTP requests", isCorrect: false },
        { id: "d", text: "To manage routing", isCorrect: false },
      ],
      explanation:
        "Angular elements allow you to create reusable web components that can be used in any web application.",
      category: "Elements",
      difficulty: "easy" as const,
      tags: ["elements", "web-components"],
      points: 1,
    },
    {
      id: "angular-junior-30",
      question: "Complete: Angular uses ____ for state management.",
      type: "fill-blank" as const,
      correctAnswer: "services",
      explanation:
        "Angular uses services for state management, though you can also integrate with libraries like NgRx for complex state management.",
      category: "State Management",
      difficulty: "easy" as const,
      tags: ["state", "services"],
      points: 1,
    },
  ] as InteractiveQuizQuestion[],

  intermediate: [
    {
      id: "angular-intermediate-1",
      question: "How do you implement lazy loading in Angular?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "Using loadChildren in routing configuration", isCorrect: true },
        { id: "b", text: "Using ngOnInit hook", isCorrect: false },
        { id: "c", text: "Using @Injectable decorator", isCorrect: false },
        { id: "d", text: "Using *ngIf directive", isCorrect: false },
      ],
      explanation:
        "Lazy loading is implemented using loadChildren in the routing configuration to load modules on demand.",
      category: "Performance",
      difficulty: "medium" as const,
      tags: ["lazy-loading", "routing", "performance"],
      points: 2,
    },
    {
      id: "angular-intermediate-2",
      question: "What is the difference between Angular services and components?",
      type: "multiple-choice" as const,
      options: [
        {
          id: "a",
          text: "Components handle UI, services handle business logic and data sharing",
          isCorrect: true,
        },
        { id: "b", text: "Services handle UI, components handle business logic", isCorrect: false },
        { id: "c", text: "They are the same thing", isCorrect: false },
        { id: "d", text: "Services are deprecated in Angular", isCorrect: false },
      ],
      explanation:
        "Components handle the UI and user interactions, while services handle business logic and data sharing between components.",
      category: "Architecture",
      difficulty: "medium" as const,
      tags: ["components", "services", "architecture"],
      points: 2,
    },
    // Add more intermediate questions...
  ] as InteractiveQuizQuestion[],

  senior: [
    {
      id: "angular-senior-1",
      question: "How would you implement a custom change detection strategy in Angular?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "By implementing ChangeDetectionStrategy interface", isCorrect: true },
        { id: "b", text: "By extending Component class", isCorrect: false },
        { id: "c", text: "By using @Injectable decorator", isCorrect: false },
        { id: "d", text: "By modifying Angular core", isCorrect: false },
      ],
      explanation:
        "Custom change detection strategies are implemented by creating classes that implement the ChangeDetectionStrategy interface.",
      category: "Advanced",
      difficulty: "hard" as const,
      tags: ["change-detection", "performance", "advanced"],
      points: 3,
    },
    // Add more senior questions...
  ] as InteractiveQuizQuestion[],
};

// For now, let's create similar structures for other frameworks with real questions
export const REACT_ENHANCED_QUESTIONS = {
  junior: [
    {
      id: "react-junior-1",
      question: "What is React?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "A JavaScript library for building user interfaces", isCorrect: true },
        { id: "b", text: "A complete framework", isCorrect: false },
        { id: "c", text: "A CSS framework", isCorrect: false },
        { id: "d", text: "A database management system", isCorrect: false },
      ],
      explanation:
        "React is a JavaScript library for building user interfaces, particularly web applications.",
      category: "React Basics",
      difficulty: "easy" as const,
      tags: ["basics", "library"],
      points: 1,
    },
    // Add more React questions...
  ] as InteractiveQuizQuestion[],

  intermediate: [
    {
      id: "react-intermediate-1",
      question: "What is the purpose of useEffect hook?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "To perform side effects in functional components", isCorrect: true },
        { id: "b", text: "To create state", isCorrect: false },
        { id: "c", text: "To handle events", isCorrect: false },
        { id: "d", text: "To manage routing", isCorrect: false },
      ],
      explanation:
        "useEffect hook is used to perform side effects like data fetching, subscriptions, or DOM manipulation in functional components.",
      category: "Hooks",
      difficulty: "medium" as const,
      tags: ["hooks", "side-effects"],
      points: 2,
    },
    // Add more React intermediate questions...
  ] as InteractiveQuizQuestion[],

  senior: [
    {
      id: "react-senior-1",
      question: "How would you optimize a React application with performance issues?",
      type: "multiple-choice" as const,
      options: [
        {
          id: "a",
          text: "Use React.memo, useMemo, useCallback, and code splitting",
          isCorrect: true,
        },
        { id: "b", text: "Use only class components", isCorrect: false },
        { id: "c", text: "Remove all hooks", isCorrect: false },
        { id: "d", text: "Use only functional components", isCorrect: false },
      ],
      explanation:
        "React performance optimization involves using React.memo, useMemo, useCallback for memoization, and code splitting for bundle optimization.",
      category: "Performance",
      difficulty: "hard" as const,
      tags: ["performance", "optimization", "memoization"],
      points: 3,
    },
    // Add more React senior questions...
  ] as InteractiveQuizQuestion[],
};

export const NEXTJS_ENHANCED_QUESTIONS = {
  junior: [
    {
      id: "nextjs-junior-1",
      question: "What is Next.js?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "A React framework for production", isCorrect: true },
        { id: "b", text: "A CSS framework", isCorrect: false },
        { id: "c", text: "A database management system", isCorrect: false },
        { id: "d", text: "A JavaScript library", isCorrect: false },
      ],
      explanation:
        "Next.js is a React framework that provides additional features like server-side rendering, static generation, and API routes.",
      category: "Next.js Basics",
      difficulty: "easy" as const,
      tags: ["basics", "framework"],
      points: 1,
    },
    // Add more Next.js questions...
  ] as InteractiveQuizQuestion[],

  intermediate: [
    {
      id: "nextjs-intermediate-1",
      question: "Which rendering methods does Next.js support? (Select all that apply)",
      type: "multiple-checkbox" as const,
      options: [
        { id: "a", text: "Static Site Generation (SSG)", isCorrect: true },
        { id: "b", text: "Server-Side Rendering (SSR)", isCorrect: true },
        { id: "c", text: "Client-Side Rendering (CSR)", isCorrect: true },
        { id: "d", text: "Incremental Static Regeneration (ISR)", isCorrect: true },
      ],
      correctAnswers: ["a", "b", "c", "d"],
      explanation:
        "Next.js supports multiple rendering methods including SSG, SSR, CSR, and ISR for different use cases.",
      category: "Rendering",
      difficulty: "medium" as const,
      tags: ["rendering", "ssg", "ssr"],
      points: 2,
    },
    // Add more Next.js intermediate questions...
  ] as InteractiveQuizQuestion[],

  senior: [
    {
      id: "nextjs-senior-1",
      question: "How would you implement custom server middleware in Next.js?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "Using middleware.ts file in the root directory", isCorrect: true },
        { id: "b", text: "Using getServerSideProps", isCorrect: false },
        { id: "c", text: "Using getStaticProps", isCorrect: false },
        { id: "d", text: "Using API routes", isCorrect: false },
      ],
      explanation:
        "Custom server middleware in Next.js is implemented using the middleware.ts file in the root directory.",
      category: "Middleware",
      difficulty: "hard" as const,
      tags: ["middleware", "server", "advanced"],
      points: 3,
    },
    // Add more Next.js senior questions...
  ] as InteractiveQuizQuestion[],
};

export const REDUX_ENHANCED_QUESTIONS = {
  junior: [
    {
      id: "redux-junior-1",
      question: "What is Redux?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "A predictable state container for JavaScript apps", isCorrect: true },
        { id: "b", text: "A CSS framework", isCorrect: false },
        { id: "c", text: "A database management system", isCorrect: false },
        { id: "d", text: "A JavaScript library", isCorrect: false },
      ],
      explanation:
        "Redux is a predictable state container for JavaScript applications, commonly used with React.",
      category: "Redux Basics",
      difficulty: "easy" as const,
      tags: ["basics", "state-management"],
      points: 1,
    },
    // Add more Redux questions...
  ] as InteractiveQuizQuestion[],

  intermediate: [
    {
      id: "redux-intermediate-1",
      question: "What are the three principles of Redux? (Select all that apply)",
      type: "multiple-checkbox" as const,
      options: [
        { id: "a", text: "Single source of truth", isCorrect: true },
        { id: "b", text: "State is read-only", isCorrect: true },
        { id: "c", text: "Changes are made with pure functions", isCorrect: true },
        { id: "d", text: "State is mutable", isCorrect: false },
      ],
      correctAnswers: ["a", "b", "c"],
      explanation:
        "Redux follows three principles: single source of truth, state is read-only, and changes are made with pure functions (reducers).",
      category: "Redux Principles",
      difficulty: "medium" as const,
      tags: ["principles", "architecture"],
      points: 2,
    },
    // Add more Redux intermediate questions...
  ] as InteractiveQuizQuestion[],

  senior: [
    {
      id: "redux-senior-1",
      question: "How would you implement Redux middleware for handling asynchronous actions?",
      type: "multiple-choice" as const,
      options: [
        { id: "a", text: "Using Redux Thunk or Redux Saga", isCorrect: true },
        { id: "b", text: "Using only reducers", isCorrect: false },
        { id: "c", text: "Using only actions", isCorrect: false },
        { id: "d", text: "Using only selectors", isCorrect: false },
      ],
      explanation:
        "Redux middleware like Redux Thunk or Redux Saga are used to handle asynchronous actions and side effects.",
      category: "Middleware",
      difficulty: "hard" as const,
      tags: ["middleware", "async", "thunk", "saga"],
      points: 3,
    },
    // Add more Redux senior questions...
  ] as InteractiveQuizQuestion[],
};

// Export the main data structure
export const ENHANCED_INTERACTIVE_QUIZ_DATA = {
  angular: ANGULAR_ENHANCED_QUESTIONS,
  react: REACT_ENHANCED_QUESTIONS,
  nextjs: NEXTJS_ENHANCED_QUESTIONS,
  redux: REDUX_ENHANCED_QUESTIONS,
};
