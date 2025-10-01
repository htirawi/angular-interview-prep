// Auto-generate metadata for questions that don't have it
export function enrichQuestions<T extends { id: number; question: string; answer: string; category?: string; difficulty?: string; tags?: string[] }>(
  questions: T[]
): Array<
  Omit<T, 'category' | 'difficulty' | 'tags'> & {
    category: string;
    difficulty: "intermediate" | "advanced" | "expert";
    tags: string[];
  }
> {
  return questions.map((q) => {
    // If already has all metadata, return as-is
    if (q.category && q.difficulty && q.tags) {
      return q as any;
    }

    // Auto-categorize based on question content
    const questionLower = (q.question + " " + q.answer).toLowerCase();

    let category = "General";
    let difficulty: "intermediate" | "advanced" | "expert" = "intermediate";
    const tags: string[] = [];

    // Categorization logic
    if (
      questionLower.includes("signal") ||
      questionLower.includes("observable") ||
      questionLower.includes("rxjs")
    ) {
      category = "Reactive Programming";
      tags.push("signals", "rxjs", "observables");
    } else if (
      questionLower.includes("change detection") ||
      questionLower.includes("onpush") ||
      questionLower.includes("rendering")
    ) {
      category = "Change Detection";
      tags.push("performance", "change-detection");
    } else if (
      questionLower.includes("form") ||
      questionLower.includes("validation") ||
      questionLower.includes("controlvalueaccessor")
    ) {
      category = "Forms";
      tags.push("forms", "validation");
    } else if (
      questionLower.includes("router") ||
      questionLower.includes("guard") ||
      questionLower.includes("resolver")
    ) {
      category = "Routing";
      tags.push("routing", "navigation");
    } else if (
      questionLower.includes("http") ||
      questionLower.includes("interceptor") ||
      questionLower.includes("request")
    ) {
      category = "HTTP & API";
      tags.push("http", "interceptors");
    } else if (
      questionLower.includes("ngrx") ||
      questionLower.includes("state") ||
      questionLower.includes("store")
    ) {
      category = "State Management";
      tags.push("ngrx", "state");
    } else if (
      questionLower.includes("test") ||
      questionLower.includes("testing") ||
      questionLower.includes("spec")
    ) {
      category = "Testing";
      tags.push("testing", "unit-tests");
    } else if (
      questionLower.includes("performance") ||
      questionLower.includes("optimization") ||
      questionLower.includes("lcp") ||
      questionLower.includes("tbt")
    ) {
      category = "Performance";
      tags.push("performance", "optimization");
    } else if (
      questionLower.includes("di") ||
      questionLower.includes("inject") ||
      questionLower.includes("provider")
    ) {
      category = "Dependency Injection";
      tags.push("DI", "providers");
    } else if (
      questionLower.includes("security") ||
      questionLower.includes("auth") ||
      questionLower.includes("token")
    ) {
      category = "Security & Auth";
      tags.push("security", "authentication");
    } else if (
      questionLower.includes("component") ||
      questionLower.includes("directive") ||
      questionLower.includes("lifecycle")
    ) {
      category = "Components";
      tags.push("components", "lifecycle");
    } else if (
      questionLower.includes("websocket") ||
      questionLower.includes("signalr") ||
      questionLower.includes("realtime")
    ) {
      category = "Real-time";
      tags.push("websocket", "real-time");
    } else if (questionLower.includes("ssr") || questionLower.includes("hydration")) {
      category = "SSR & Hydration";
      tags.push("ssr", "hydration");
    } else if (
      questionLower.includes("accessibility") ||
      questionLower.includes("a11y") ||
      questionLower.includes("aria")
    ) {
      category = "Accessibility";
      tags.push("accessibility", "a11y");
    }

    // Difficulty detection
    if (
      questionLower.includes("advanced") ||
      questionLower.includes("complex") ||
      questionLower.includes("deep") ||
      questionLower.includes("architecture")
    ) {
      difficulty = "advanced";
    }
    if (
      questionLower.includes("expert") ||
      questionLower.includes("senior") ||
      questionLower.includes("optimization") ||
      questionLower.includes("scaling")
    ) {
      difficulty = "expert";
    }

    return {
      ...q,
      category,
      difficulty,
      tags,
    };
  });
}

