// React Interview Questions - 30 Core Senior-Level Questions
// Comprehensive answers designed for technical interview preparation
// Each question includes detailed explanations, code examples, and best practices

export interface QA {
  id: number;
  question: string;
  answer: string;
  category?: string;
  difficulty?: string;
  tags?: string[];
}

export const REACT_ENHANCED_QUESTIONS: QA[] = [
  {
    id: 1,
    question: "Explain the Virtual DOM in detail. How does React use it to optimize rendering?",
    answer:
      "The Virtual DOM (VDOM) is a lightweight JavaScript representation of the actual DOM. It's a tree structure where each node represents a React element with properties like type, props, and children.\n\n" +
      "**How it works:**\n" +
      "1. When state/props change, React creates a new VDOM tree\n" +
      "2. React compares (diffs) the new tree with the previous one\n" +
      "3. Calculates the minimal set of DOM operations needed\n" +
      "4. Applies only those changes to the real DOM (batched updates)\n\n" +
      "**Benefits:**\n" +
      "- DOM manipulation is expensive; VDOM operations are cheap (plain JS objects)\n" +
      "- Batching prevents layout thrashing\n" +
      "- Enables declarative programming—you describe UI, React optimizes updates\n" +
      "- Cross-platform rendering (React Native, SSR) uses same reconciliation\n\n" +
      "**Example:**\n" +
      "```javascript\n" +
      "// Virtual DOM representation\n" +
      "{\n" +
      "  type: 'div',\n" +
      "  props: { className: 'container' },\n" +
      "  children: [\n" +
      "    { type: 'h1', props: {}, children: ['Hello'] },\n" +
      "    { type: 'p', props: {}, children: ['World'] }\n" +
      "  ]\n" +
      "}\n\n" +
      "// If only <p> text changes, React updates just that text node\n" +
      "// Doesn't touch <div> or <h1>\n" +
      "```\n\n" +
      "**Limitations:**\n" +
      "- Memory overhead for maintaining tree\n" +
      "- Diffing has complexity, optimized to O(n) with heuristics\n" +
      "- Not always faster than targeted DOM updates for simple changes\n\n" +
      "**Key Insight:** VDOM isn't about being faster than DOM manipulation. It's about making updates predictable and allowing React to optimize automatically, so you can write declarative code without manual DOM management.",
    category: "Core Concepts",
    difficulty: "hard",
    tags: ["virtual-dom", "rendering", "performance", "internals", "fundamentals"],
  },
  {
    id: 2,
    question:
      "Describe React's Reconciliation algorithm and the Diffing process. What are the key heuristics?",
    answer:
      "Reconciliation is React's algorithm for determining what changed between two VDOM trees and updating the real DOM efficiently. Traditional tree diff algorithms are O(n³), but React reduces this to O(n) using heuristics.\n\n" +
      "**Key Heuristics:**\n\n" +
      "**1. Different Element Types → Full Rebuild**\n" +
      "```javascript\n" +
      "// Old: <div><Counter /></div>\n" +
      "// New: <span><Counter /></span>\n" +
      "// React: Destroy entire subtree, build new one from scratch\n" +
      "// Counter loses all state!\n" +
      "```\n\n" +
      "**2. Same Type → Update Attributes**\n" +
      "```javascript\n" +
      "// Old: <div className='old' title='a'>...</div>\n" +
      "// New: <div className='new' title='a'>...</div>\n" +
      "// React: Keep same DOM node, update className only\n" +
      "// Then recursively process children\n" +
      "```\n\n" +
      "**3. Keys for List Reconciliation**\n" +
      "```javascript\n" +
      "// Without keys (uses index):\n" +
      "// Old: [<Item>A</Item>, <Item>B</Item>, <Item>C</Item>]\n" +
      "// New: [<Item>B</Item>, <Item>C</Item>]\n" +
      "// React thinks: Item[0] changed A→B, Item[1] changed B→C, removed Item[2]\n" +
      "// Causes unnecessary updates!\n\n" +
      "// With keys:\n" +
      "// Old: [<Item key='a'>A</Item>, <Item key='b'>B</Item>, <Item key='c'>C</Item>]\n" +
      "// New: [<Item key='b'>B</Item>, <Item key='c'>C</Item>]\n" +
      "// React knows: Remove 'a', keep 'b' and 'c' unchanged\n" +
      "// Efficient!\n" +
      "```\n\n" +
      "**Process Flow:**\n" +
      "1. Start at root, compare element types\n" +
      "2. If same type: update props, recursively diff children\n" +
      "3. If different type: unmount old tree, mount new tree\n" +
      "4. For lists: use keys to match elements across renders\n" +
      "5. Batch DOM updates for performance\n\n" +
      "**Component Updates:**\n" +
      "- Same component type + same key → update props, call render()\n" +
      "- Different type or key → unmount old, mount new (state is lost)\n\n" +
      "**Optimization Tips:**\n" +
      "- Use stable keys (not array index) for dynamic lists\n" +
      "- Keep component types consistent (avoid conditional types)\n" +
      "- Use React.memo to prevent unnecessary renders\n" +
      "- Avoid inline component definitions (creates new type each render)",
    category: "Core Concepts",
    difficulty: "hard",
    tags: ["reconciliation", "diffing", "algorithm", "internals", "performance", "keys"],
  },
  {
    id: 3,
    question:
      "What is React Fiber architecture? How does it improve upon the old Stack reconciler?",
    answer:
      "Fiber is React's reconciliation engine (React 16+) that enables incremental rendering—the ability to split work into chunks, pause, and resume.\n\n" +
      "**Old Stack Reconciler Problems:**\n" +
      "- Synchronous, recursive, couldn't be interrupted\n" +
      "- Long renders blocked main thread → janky UI\n" +
      "- All-or-nothing updates\n" +
      "- No concept of priority\n\n" +
      "**What is a Fiber?**\n" +
      "Each Fiber is a JavaScript object representing a unit of work:\n" +
      "```javascript\n" +
      "{\n" +
      "  type: 'div',           // Component type\n" +
      "  key: null,\n" +
      "  props: {...},\n" +
      "  stateNode: DOMNode,    // DOM node reference\n" +
      "  child: Fiber,          // First child\n" +
      "  sibling: Fiber,        // Next sibling\n" +
      "  return: Fiber,         // Parent fiber\n" +
      "  alternate: Fiber,      // Work-in-progress ↔ current\n" +
      "  effectTag: 'UPDATE',   // What needs to happen\n" +
      "  updateQueue: [...],    // Pending state updates\n" +
      "  memoizedState: {...},  // Last rendered state\n" +
      "}\n" +
      "```\n\n" +
      "**Key Improvements:**\n\n" +
      "**1. Incremental Rendering**\n" +
      "Break work into chunks, yield to browser between chunks for responsiveness\n\n" +
      "**2. Priority-Based Scheduling**\n" +
      "```javascript\n" +
      "// Urgent (user input)\n" +
      "onClick={() => setCount(c => c + 1)}\n\n" +
      "// Non-urgent (background update)\n" +
      "startTransition(() => {\n" +
      "  setSearchResults(heavyFilter(data));\n" +
      "});\n\n" +
      "// React prioritizes click over search\n" +
      "```\n\n" +
      "**3. Pause and Resume**\n" +
      "Can abort work if props/state change again before commit\n\n" +
      "**4. Two Phases:**\n" +
      "- **Render Phase** (interruptible): Build fiber tree, diff, mark effects\n" +
      "- **Commit Phase** (synchronous): Apply DOM changes, run effects\n\n" +
      "**5. Error Boundaries**\n" +
      "Better error handling with componentDidCatch\n\n" +
      "**6. Concurrent Features**\n" +
      "Enables Suspense, Transitions, useTransition, useDeferredValue\n\n" +
      "**Real-World Impact:**\n" +
      "```javascript\n" +
      "// Before Fiber: typing in search feels laggy\n" +
      "const [query, setQuery] = useState('');\n" +
      "const [results, setResults] = useState([]);\n\n" +
      "onChange={(e) => {\n" +
      "  setQuery(e.target.value);\n" +
      "  setResults(expensiveFilter(e.target.value)); // Blocks UI\n" +
      "}}\n\n" +
      "// With Fiber + Transitions: input stays responsive\n" +
      "onChange={(e) => {\n" +
      "  setQuery(e.target.value); // Urgent: immediate\n" +
      "  startTransition(() => {\n" +
      "    setResults(expensiveFilter(e.target.value)); // Can be interrupted\n" +
      "  });\n" +
      "}}\n" +
      "```\n\n" +
      "**Key Takeaway:** Fiber architecture makes React more responsive by allowing it to pause expensive work, prioritize urgent updates (like user input), and split rendering across multiple frames.",
    category: "Core Concepts",
    difficulty: "hard",
    tags: ["fiber", "architecture", "internals", "concurrent", "performance", "rendering"],
  },
  {
    id: 4,
    question: "Explain Portals in React. What are common use cases and potential pitfalls?",
    answer:
      "Portals provide a way to render children into a DOM node that exists outside the parent component's DOM hierarchy, while maintaining the React tree relationship.\n\n" +
      "**Syntax:**\n" +
      "```javascript\n" +
      "ReactDOM.createPortal(child, containerDOMNode)\n" +
      "```\n\n" +
      "**How It Works:**\n" +
      "- Child is rendered into different DOM node\n" +
      "- But remains in React tree (context works, events bubble)\n" +
      "- Event bubbling follows React tree, not DOM tree\n\n" +
      "**Common Use Cases:**\n\n" +
      "**1. Modals/Dialogs:**\n" +
      "```javascript\n" +
      "function Modal({ children, isOpen }) {\n" +
      "  if (!isOpen) return null;\n" +
      "  \n" +
      "  return ReactDOM.createPortal(\n" +
      "    <div className='modal-overlay'>\n" +
      "      <div className='modal-content'>{children}</div>\n" +
      "    </div>,\n" +
      "    document.getElementById('modal-root')\n" +
      "  );\n" +
      "}\n\n" +
      "// In index.html:\n" +
      "// <div id='root'></div>\n" +
      "// <div id='modal-root'></div>\n" +
      "```\n\n" +
      "**2. Tooltips:**\n" +
      "Escape parent's overflow:hidden\n\n" +
      "**3. Dropdowns/Popovers:**\n" +
      "Position relative to viewport, not parent\n\n" +
      "**4. Notifications:**\n" +
      "Render at document root for consistent z-index\n\n" +
      "**Benefits:**\n" +
      "- Escape CSS constraints (overflow, z-index, position)\n" +
      "- Control stacking context\n" +
      "- Keep component hierarchy clean\n\n" +
      "**Pitfalls & Solutions:**\n\n" +
      "**1. Focus Management:**\n" +
      "```javascript\n" +
      "function AccessibleModal({ children, onClose }) {\n" +
      "  const modalRef = useRef(null);\n" +
      "  const previousActiveElement = useRef(null);\n\n" +
      "  useEffect(() => {\n" +
      "    // Save currently focused element\n" +
      "    previousActiveElement.current = document.activeElement;\n" +
      "    \n" +
      "    // Focus modal\n" +
      "    modalRef.current?.focus();\n" +
      "    \n" +
      "    // Trap focus inside modal\n" +
      "    const handleTab = (e) => {\n" +
      "      const focusable = modalRef.current.querySelectorAll(\n" +
      "        'button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])'\n" +
      "      );\n" +
      "      const first = focusable[0];\n" +
      "      const last = focusable[focusable.length - 1];\n\n" +
      "      if (e.shiftKey && document.activeElement === first) {\n" +
      "        last.focus();\n" +
      "        e.preventDefault();\n" +
      "      } else if (!e.shiftKey && document.activeElement === last) {\n" +
      "        first.focus();\n" +
      "        e.preventDefault();\n" +
      "      }\n" +
      "    };\n\n" +
      "    document.addEventListener('keydown', handleTab);\n\n" +
      "    return () => {\n" +
      "      document.removeEventListener('keydown', handleTab);\n" +
      "      // Restore focus\n" +
      "      previousActiveElement.current?.focus();\n" +
      "    };\n" +
      "  }, []);\n\n" +
      "  return ReactDOM.createPortal(\n" +
      "    <div \n" +
      "      ref={modalRef}\n" +
      "      role='dialog'\n" +
      "      aria-modal='true'\n" +
      "      tabIndex={-1}\n" +
      "    >\n" +
      "      {children}\n" +
      "    </div>,\n" +
      "    document.getElementById('modal-root')\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**2. Event Bubbling:**\n" +
      "Events bubble through React tree, not DOM:\n" +
      "```javascript\n" +
      "function Parent() {\n" +
      "  const handleClick = () => console.log('Parent clicked');\n" +
      "  \n" +
      "  return (\n" +
      "    <div onClick={handleClick}>\n" +
      "      <Portal>\n" +
      "        {/* Click here triggers Parent's handler */}\n" +
      "        <button>Click me</button>\n" +
      "      </Portal>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**3. SSR Compatibility:**\n" +
      "```javascript\n" +
      "function Portal({ children }) {\n" +
      "  const [mounted, setMounted] = useState(false);\n\n" +
      "  useEffect(() => {\n" +
      "    setMounted(true);\n" +
      "  }, []);\n\n" +
      "  if (!mounted) return null;\n\n" +
      "  return ReactDOM.createPortal(\n" +
      "    children,\n" +
      "    document.getElementById('portal-root')\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**4. Accessibility:**\n" +
      "```javascript\n" +
      "// Hide main content when modal is open\n" +
      "useEffect(() => {\n" +
      "  const main = document.getElementById('main');\n" +
      "  if (isOpen) {\n" +
      "    main.setAttribute('aria-hidden', 'true');\n" +
      "  }\n" +
      "  return () => main.removeAttribute('aria-hidden');\n" +
      "}, [isOpen]);\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "1. Create portal container in index.html\n" +
      "2. Trap focus inside modal\n" +
      "3. Restore focus on close\n" +
      "4. Handle Esc key to close\n" +
      "5. Set aria-modal and role\n" +
      "6. Hide background content from screen readers\n" +
      "7. Prevent body scroll when modal open\n" +
      "8. Clean up on unmount",
    category: "Advanced",
    difficulty: "intermediate",
    tags: ["portals", "dom", "modals", "accessibility", "events", "use-cases"],
  },
  {
    id: 5,
    question:
      "What is the difference between controlled and uncontrolled components? When should you use each?",
    answer:
      "**Controlled Components:**\n" +
      "Form elements whose value is controlled by React state. React is the 'single source of truth'.\n\n" +
      "```javascript\n" +
      "function ControlledInput() {\n" +
      "  const [value, setValue] = useState('');\n" +
      "  \n" +
      "  return (\n" +
      "    <input \n" +
      "      value={value}                           // Controlled by state\n" +
      "      onChange={(e) => setValue(e.target.value)}  // Updates state\n" +
      "    />\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Characteristics:**\n" +
      "- Single source of truth (React state)\n" +
      "- Value always in sync with state\n" +
      "- Every keystroke triggers re-render\n" +
      "- Easy to validate/transform on change\n" +
      "- Can derive other state from value\n\n" +
      "**Uncontrolled Components:**\n" +
      "Form elements maintain their own internal state. Access via refs.\n\n" +
      "```javascript\n" +
      "function UncontrolledInput() {\n" +
      "  const inputRef = useRef(null);\n" +
      "  \n" +
      "  const handleSubmit = () => {\n" +
      "    console.log(inputRef.current.value); // Access DOM directly\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <form onSubmit={handleSubmit}>\n" +
      "      <input ref={inputRef} defaultValue='' /> {/* defaultValue, not value */}\n" +
      "      <button type='submit'>Submit</button>\n" +
      "    </form>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Characteristics:**\n" +
      "- DOM holds the state\n" +
      "- Access via refs when needed\n" +
      "- No re-renders on input\n" +
      "- Less code for simple forms\n" +
      "- Use `defaultValue` for initial value\n\n" +
      "**When to Use Controlled:**\n\n" +
      "**1. Real-time Validation:**\n" +
      "```javascript\n" +
      "const [email, setEmail] = useState('');\n" +
      "const [error, setError] = useState('');\n\n" +
      "const handleChange = (e) => {\n" +
      "  const value = e.target.value;\n" +
      "  setEmail(value);\n" +
      "  setError(validateEmail(value) ? '' : 'Invalid email');\n" +
      "};\n" +
      "```\n\n" +
      "**2. Conditional Input:**\n" +
      "```javascript\n" +
      "// Format phone number as user types\n" +
      "const handleChange = (e) => {\n" +
      "  const formatted = formatPhoneNumber(e.target.value);\n" +
      "  setPhone(formatted);\n" +
      "};\n" +
      "```\n\n" +
      "**3. Disable Submit Until Valid:**\n" +
      "```javascript\n" +
      "const isValid = email && password.length >= 8;\n" +
      "<button disabled={!isValid}>Submit</button>\n" +
      "```\n\n" +
      "**4. Dynamic Fields:**\n" +
      "```javascript\n" +
      "// Add/remove fields based on input\n" +
      "const [fields, setFields] = useState([{ value: '' }]);\n" +
      "```\n\n" +
      "**When to Use Uncontrolled:**\n\n" +
      "**1. Simple Forms:**\n" +
      "```javascript\n" +
      "// Login form - just need values on submit\n" +
      "function LoginForm() {\n" +
      "  const emailRef = useRef();\n" +
      "  const passwordRef = useRef();\n\n" +
      "  const handleSubmit = (e) => {\n" +
      "    e.preventDefault();\n" +
      "    login(emailRef.current.value, passwordRef.current.value);\n" +
      "  };\n\n" +
      "  return (\n" +
      "    <form onSubmit={handleSubmit}>\n" +
      "      <input ref={emailRef} type='email' />\n" +
      "      <input ref={passwordRef} type='password' />\n" +
      "      <button>Login</button>\n" +
      "    </form>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**2. File Inputs:**\n" +
      "```javascript\n" +
      "// File inputs are always uncontrolled\n" +
      "const fileRef = useRef();\n" +
      "<input ref={fileRef} type='file' />\n" +
      "```\n\n" +
      "**3. Performance-Critical:**\n" +
      "```javascript\n" +
      "// Large form, avoid re-renders on every keystroke\n" +
      "```\n\n" +
      "**4. Integration with Non-React:**\n" +
      "```javascript\n" +
      "// Using jQuery plugin or other library\n" +
      "useEffect(() => {\n" +
      "  $(inputRef.current).datepicker();\n" +
      "}, []);\n" +
      "```\n\n" +
      "**Hybrid Approach:**\n" +
      "Uncontrolled input with validation feedback:\n" +
      "```javascript\n" +
      "function HybridInput() {\n" +
      "  const [error, setError] = useState('');\n\n" +
      "  return (\n" +
      "    <>\n" +
      "      <input\n" +
      "        defaultValue=''\n" +
      "        onChange={(e) => setError(validate(e.target.value))}\n" +
      "      />\n" +
      "      {error && <span>{error}</span>}\n" +
      "    </>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Key Differences Table:**\n\n" +
      "| Feature | Controlled | Uncontrolled |\n" +
      "|---------|-----------|-------------|\n" +
      "| State location | React | DOM |\n" +
      "| Access value | `value` state | `ref.current.value` |\n" +
      "| Initial value | `value={...}` | `defaultValue={...}` |\n" +
      "| Re-renders | Every change | Only on submit |\n" +
      "| Validation | Real-time easy | On submit/blur |\n" +
      "| Value transformation | Easy | Manual |\n" +
      "| Performance | Slower (re-renders) | Faster (no re-renders) |\n\n" +
      "**Best Practice:** Start with controlled for most forms. Use uncontrolled only when you have performance issues or integrating with non-React code.",
    category: "Forms",
    difficulty: "intermediate",
    tags: ["forms", "controlled", "uncontrolled", "refs", "state", "performance"],
  },
  // Continue with remaining 25 questions...
  {
    id: 6,
    question:
      "Explain React's Context API in detail. What are the performance implications and how do you optimize?",
    answer:
      "Context provides a way to pass data through the component tree without prop drilling, but it has significant performance implications.\n\n" +
      "**Creating and Using Context:**\n" +
      "```javascript\n" +
      "// Create\n" +
      "const ThemeContext = React.createContext(defaultValue);\n\n" +
      "// Provide\n" +
      "function App() {\n" +
      "  const [theme, setTheme] = useState('dark');\n" +
      "  \n" +
      "  return (\n" +
      "    <ThemeContext.Provider value={{ theme, setTheme }}>\n" +
      "      <Page />\n" +
      "    </ThemeContext.Provider>\n" +
      "  );\n" +
      "}\n\n" +
      "// Consume (hooks)\n" +
      "function Component() {\n" +
      "  const { theme } = useContext(ThemeContext);\n" +
      "  return <div className={theme}>...</div>;\n" +
      "}\n\n" +
      "// Consume (legacy)\n" +
      "<ThemeContext.Consumer>\n" +
      "  {value => <div className={value.theme}>...</div>}\n" +
      "</ThemeContext.Consumer>\n" +
      "```\n\n" +
      "**THE PERFORMANCE PROBLEM:**\n\n" +
      "**Every consumer re-renders when Provider value changes, even if they don't use the changed part!**\n\n" +
      "```javascript\n" +
      "// ❌ PROBLEM\n" +
      "function App() {\n" +
      "  const [user, setUser] = useState(null);\n" +
      "  const [theme, setTheme] = useState('dark');\n" +
      "  const [settings, setSettings] = useState({});\n\n" +
      "  // New object every render!\n" +
      "  const value = { user, theme, settings, setUser, setTheme, setSettings };\n\n" +
      "  return (\n" +
      "    <AppContext.Provider value={value}>\n" +
      "      <Page />\n" +
      "    </AppContext.Provider>\n" +
      "  );\n" +
      "}\n\n" +
      "// ALL these re-render when ANY value changes:\n" +
      "function UserProfile() {\n" +
      "  const { user } = useContext(AppContext); // Only needs user\n" +
      "}\n\n" +
      "function ThemeSwitcher() {\n" +
      "  const { theme } = useContext(AppContext); // Only needs theme\n" +
      "}\n\n" +
      "// ThemeSwitcher re-renders when user changes!\n" +
      "// UserProfile re-renders when theme changes!\n" +
      "```\n\n" +
      "**Optimization Strategies:**\n\n" +
      "**1. Split Contexts:**\n" +
      "```javascript\n" +
      "// ✅ BETTER\n" +
      "const UserContext = createContext();\n" +
      "const ThemeContext = createContext();\n" +
      "const SettingsContext = createContext();\n\n" +
      "function App() {\n" +
      "  const [user, setUser] = useState(null);\n" +
      "  const [theme, setTheme] = useState('dark');\n\n" +
      "  return (\n" +
      "    <UserContext.Provider value={useMemo(() => ({ user, setUser }), [user])}>\n" +
      "      <ThemeContext.Provider value={useMemo(() => ({ theme, setTheme }), [theme])}>\n" +
      "        <Page />\n" +
      "      </ThemeContext.Provider>\n" +
      "    </UserContext.Provider>\n" +
      "  );\n" +
      "}\n\n" +
      "// Now components only subscribe to what they need\n" +
      "function UserProfile() {\n" +
      "  const { user } = useContext(UserContext); // Only user updates trigger re-render\n" +
      "}\n" +
      "```\n\n" +
      "**2. Memoize Provider Value:**\n" +
      "```javascript\n" +
      "function App() {\n" +
      "  const [user, setUser] = useState(null);\n\n" +
      "  // ✅ Stable reference\n" +
      "  const value = useMemo(\n" +
      "    () => ({ user, login, logout }),\n" +
      "    [user] // Only changes when user changes\n" +
      "  );\n\n" +
      "  return <AuthContext.Provider value={value}>...</AuthContext.Provider>;\n" +
      "}\n" +
      "```\n\n" +
      "**3. Separate State and Dispatch:**\n" +
      "```javascript\n" +
      "const StateContext = createContext();\n" +
      "const DispatchContext = createContext();\n\n" +
      "function Provider({ children }) {\n" +
      "  const [state, dispatch] = useReducer(reducer, initialState);\n\n" +
      "  return (\n" +
      "    <DispatchContext.Provider value={dispatch}>\n" +
      "      <StateContext.Provider value={state}>\n" +
      "        {children}\n" +
      "      </StateContext.Provider>\n" +
      "    </DispatchContext.Provider>\n" +
      "  );\n" +
      "}\n\n" +
      "// Components using only dispatch don't re-render on state change\n" +
      "function Button() {\n" +
      "  const dispatch = useContext(DispatchContext); // Dispatch never changes\n" +
      "  return <button onClick={() => dispatch({ type: 'INCREMENT' })} />;\n" +
      "}\n" +
      "```\n\n" +
      "**4. Use External Store (For Frequent Updates):**\n" +
      "```javascript\n" +
      "// Zustand - selective subscriptions\n" +
      "import create from 'zustand';\n\n" +
      "const useStore = create(set => ({\n" +
      "  count: 0,\n" +
      "  user: null,\n" +
      "  increment: () => set(s => ({ count: s.count + 1 })),\n" +
      "  setUser: (user) => set({ user }),\n" +
      "}));\n\n" +
      "// Only re-renders when count changes\n" +
      "function Counter() {\n" +
      "  const count = useStore(s => s.count);\n" +
      "  const increment = useStore(s => s.increment);\n" +
      "  return <button onClick={increment}>{count}</button>;\n" +
      "}\n\n" +
      "// Doesn't re-render when count changes\n" +
      "function UserProfile() {\n" +
      "  const user = useStore(s => s.user);\n" +
      "  return <div>{user?.name}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**5. Bail Out with React.memo:**\n" +
      "```javascript\n" +
      "const Child = React.memo(({ value }) => {\n" +
      "  // Won't re-render if value hasn't changed\n" +
      "  return <div>{value}</div>;\n" +
      "});\n" +
      "```\n\n" +
      "**When to Use Context:**\n" +
      "- Theme (changes infrequently)\n" +
      "- Locale/i18n (rarely changes)\n" +
      "- Auth state (login/logout)\n" +
      "- User preferences\n" +
      "- Dependency injection\n\n" +
      "**When NOT to Use Context:**\n" +
      "- High-frequency updates (every keystroke)\n" +
      "- Large state with independent parts\n" +
      "- Need selective subscriptions\n" +
      "- Performance-critical rendering\n\n" +
      "**Best Practices:**\n" +
      "1. Split contexts by update frequency\n" +
      "2. Always memoize provider values\n" +
      "3. Put contexts near where they're used\n" +
      "4. Consider external stores for complex state\n" +
      "5. Use React DevTools Profiler to measure impact",
    category: "State Management",
    difficulty: "hard",
    tags: ["context", "performance", "optimization", "state-management", "patterns", "memoization"],
  },
  {
    id: 7,
    question: "Describe the component lifecycle in React. How do lifecycle methods map to hooks?",
    answer:
      "**Class Component Lifecycle:**\n\n" +
      "**Mounting (component created):**\n" +
      "1. `constructor()` - Initialize state\n" +
      "2. `static getDerivedStateFromProps()` - Sync state to props (rare)\n" +
      "3. `render()` - Return JSX\n" +
      "4. `componentDidMount()` - Side effects, API calls, subscriptions\n\n" +
      "**Updating (props/state change):**\n" +
      "1. `static getDerivedStateFromProps()`\n" +
      "2. `shouldComponentUpdate()` - Performance optimization (return false to skip)\n" +
      "3. `render()`\n" +
      "4. `getSnapshotBeforeUpdate()` - Capture info before DOM updates (scroll position)\n" +
      "5. `componentDidUpdate()` - Side effects after update\n\n" +
      "**Unmounting:**\n" +
      "1. `componentWillUnmount()` - Cleanup (timers, subscriptions, cancel requests)\n\n" +
      "**Error Handling:**\n" +
      "1. `static getDerivedStateFromError()` - Update state on error\n" +
      "2. `componentDidCatch()` - Log errors to service\n\n" +
      "**Mapping to Hooks:**\n\n" +
      "```javascript\n" +
      "// constructor - initialize state\n" +
      "const [state, setState] = useState(initialState);\n" +
      "const [count, setCount] = useState(0);\n\n" +
      "// componentDidMount - runs once after first render\n" +
      "useEffect(() => {\n" +
      "  fetchData();\n" +
      "  const subscription = subscribe();\n" +
      "  \n" +
      "  // componentWillUnmount - cleanup\n" +
      "  return () => {\n" +
      "    subscription.unsubscribe();\n" +
      "  };\n" +
      "}, []); // Empty deps = mount only\n\n" +
      "// componentDidUpdate - specific dependency\n" +
      "useEffect(() => {\n" +
      "  updateChart(data);\n" +
      "}, [data]); // Only when data changes\n\n" +
      "// componentDidUpdate - every render\n" +
      "useEffect(() => {\n" +
      "  logRender();\n" +
      "}); // No deps = every render\n\n" +
      "// getDerivedStateFromProps (rarely needed with hooks)\n" +
      "const [derivedState, setDerivedState] = useState(() => computeFromProps(props));\n" +
      "useEffect(() => {\n" +
      "  setDerivedState(computeFromProps(props));\n" +
      "}, [props.someProp]);\n\n" +
      "// shouldComponentUpdate\n" +
      "const MemoComponent = React.memo(Component, (prevProps, nextProps) => {\n" +
      "  return prevProps.id === nextProps.id; // true = skip render\n" +
      "});\n\n" +
      "// getSnapshotBeforeUpdate\n" +
      "useLayoutEffect(() => {\n" +
      "  const scrollHeight = divRef.current.scrollHeight;\n" +
      "  // Use scrollHeight\n" +
      "  return () => {\n" +
      "    // Cleanup\n" +
      "  };\n" +
      "}, [deps]);\n" +
      "```\n\n" +
      "**Key Differences:**\n" +
      "1. Hooks run after every render by default (vs specific lifecycle methods)\n" +
      "2. Must explicitly specify dependencies\n" +
      "3. Can have multiple effects (vs one componentDidMount)\n" +
      "4. Cleanup runs before next effect and on unmount\n" +
      "5. No error boundary hook yet (must use class component)\n\n" +
      "**Common Patterns:**\n\n" +
      "```javascript\n" +
      "// Fetch data on mount\n" +
      "useEffect(() => {\n" +
      "  let cancelled = false;\n" +
      "  \n" +
      "  fetchUser(id).then(user => {\n" +
      "    if (!cancelled) setUser(user);\n" +
      "  });\n" +
      "  \n" +
      "  return () => { cancelled = true; };\n" +
      "}, [id]);\n\n" +
      "// Subscribe/unsubscribe\n" +
      "useEffect(() => {\n" +
      "  const handleResize = () => setWidth(window.innerWidth);\n" +
      "  window.addEventListener('resize', handleResize);\n" +
      "  return () => window.removeEventListener('resize', handleResize);\n" +
      "}, []);\n\n" +
      "// Timer cleanup\n" +
      "useEffect(() => {\n" +
      "  const timer = setInterval(() => tick(), 1000);\n" +
      "  return () => clearInterval(timer);\n" +
      "}, []);\n" +
      "```",
    category: "Core Concepts",
    difficulty: "intermediate",
    tags: ["lifecycle", "hooks", "effects", "class-components", "migration", "patterns"],
  },
  {
    id: 8,
    question:
      "What are the rules of hooks? Why do these rules exist and what problems do they prevent?",
    answer:
      "**The Two Rules:**\n\n" +
      "1. **Only call hooks at the top level** - Don't call inside loops, conditions, or nested functions\n" +
      "2. **Only call hooks from React functions** - Function components or custom hooks only\n\n" +
      "**Why These Rules Exist:**\n\n" +
      "React relies on the **order of hook calls** to maintain state between renders. Hooks are stored in an array internally.\n\n" +
      "**Simplified Internal Implementation:**\n" +
      "```javascript\n" +
      "// React's internal hook storage\n" +
      "let hooks = [];\n" +
      "let currentHook = 0;\n\n" +
      "function useState(initialValue) {\n" +
      "  const hookIndex = currentHook;\n" +
      "  \n" +
      "  // First render: initialize\n" +
      "  if (hooks[hookIndex] === undefined) {\n" +
      "    hooks[hookIndex] = initialValue;\n" +
      "  }\n" +
      "  \n" +
      "  const setState = (newValue) => {\n" +
      "    hooks[hookIndex] = newValue;\n" +
      "    rerender(); // Trigger re-render\n" +
      "  };\n" +
      "  \n" +
      "  currentHook++;\n" +
      "  return [hooks[hookIndex], setState];\n" +
      "}\n\n" +
      "function resetHooks() {\n" +
      "  currentHook = 0; // Reset for next render\n" +
      "}\n" +
      "```\n\n" +
      "**Problems Prevented:**\n\n" +
      "**1. Inconsistent Hook Order:**\n" +
      "```javascript\n" +
      "// ❌ WRONG - Conditional hook\n" +
      "function Component({ condition }) {\n" +
      "  if (condition) {\n" +
      "    const [a, setA] = useState(1); // Hook at index 0 sometimes\n" +
      "  }\n" +
      "  const [b, setB] = useState(2);   // Hook at index 0 or 1 - INCONSISTENT!\n" +
      "  return <div>{b}</div>;\n" +
      "}\n\n" +
      "// First render (condition=true):  hooks = [1, 2]\n" +
      "// Second render (condition=false): hooks = [2]\n" +
      "// React gets confused! b gets value of a!\n" +
      "```\n\n" +
      "**2. State Corruption:**\n" +
      "```javascript\n" +
      "// ❌ WRONG - Hook in loop\n" +
      "function Component({ items }) {\n" +
      "  const states = [];\n" +
      "  items.forEach(item => {\n" +
      "    const [state, setState] = useState(0); // Different count each render!\n" +
      "    states.push(state);\n" +
      "  });\n" +
      "}\n\n" +
      "// First render (3 items): hooks = [0, 0, 0]\n" +
      "// Second render (2 items): hooks = [0, 0] ???\n" +
      "// React doesn't know which hook to discard\n" +
      "```\n\n" +
      "**3. Effect Cleanup Issues:**\n" +
      "```javascript\n" +
      "// ❌ WRONG - Conditional effect\n" +
      "if (shouldSubscribe) {\n" +
      "  useEffect(() => {\n" +
      "    const sub = subscribe();\n" +
      "    return () => sub.unsubscribe();\n" +
      "  });\n" +
      "}\n\n" +
      "// If shouldSubscribe becomes false:\n" +
      "// - Effect doesn't run\n" +
      "// - But cleanup from previous render never runs!\n" +
      "// - Memory leak!\n" +
      "```\n\n" +
      "**Correct Patterns:**\n\n" +
      "**Early Returns (After All Hooks):**\n" +
      "```javascript\n" +
      "// ✅ CORRECT\n" +
      "function Component({ condition }) {\n" +
      "  // All hooks at top level\n" +
      "  const [a, setA] = useState(1);\n" +
      "  const [b, setB] = useState(2);\n" +
      "  \n" +
      "  // Early return after hooks\n" +
      "  if (!condition) return null;\n" +
      "  \n" +
      "  return <div>{a} {b}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**Conditional Logic Inside Hooks:**\n" +
      "```javascript\n" +
      "// ✅ CORRECT\n" +
      "useEffect(() => {\n" +
      "  if (shouldSubscribe) {\n" +
      "    const sub = subscribe();\n" +
      "    return () => sub.unsubscribe();\n" +
      "  }\n" +
      "}, [shouldSubscribe]); // Hook always called\n" +
      "```\n\n" +
      "**Dynamic Lists:**\n" +
      "```javascript\n" +
      "// ❌ WRONG\n" +
      "items.map(item => {\n" +
      "  const [state] = useState(item.value);\n" +
      "});\n\n" +
      "// ✅ CORRECT - Single state for array\n" +
      "const [states, setStates] = useState(\n" +
      "  items.map(item => item.value)\n" +
      ");\n" +
      "```\n\n" +
      "**Enforcement:**\n" +
      "1. **ESLint Plugin:** `eslint-plugin-react-hooks` catches violations\n" +
      "2. **React DevTools:** Shows hook call order\n" +
      "3. **Runtime Errors:** React throws in development\n\n" +
      "```javascript\n" +
      "// .eslintrc\n" +
      "{\n" +
      '  "plugins": ["react-hooks"],\n' +
      '  "rules": {\n' +
      '    "react-hooks/rules-of-hooks": "error",\n' +
      '    "react-hooks/exhaustive-deps": "warn"\n' +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Key Takeaway:** The rules exist because React needs to maintain a consistent mapping between hook calls and their internal state. Breaking the rules causes state corruption and memory leaks.",
    category: "Hooks",
    difficulty: "hard",
    tags: ["hooks", "rules", "internals", "best-practices", "common-mistakes", "eslint"],
  },
  {
    id: 9,
    question:
      "What is the difference between useEffect and useLayoutEffect? When should you use each?",
    answer:
      "Both hooks run side effects, but at different times in the render cycle, which has critical implications for performance and visual consistency.\n\n" +
      "**Execution Timing:**\n\n" +
      "**useEffect (Asynchronous):**\n" +
      "1. React renders component (creates VDOM)\n" +
      "2. React commits changes to DOM\n" +
      "3. **Browser paints screen** 🎨\n" +
      "4. useEffect runs (after paint)\n\n" +
      "**useLayoutEffect (Synchronous):**\n" +
      "1. React renders component\n" +
      "2. React commits changes to DOM\n" +
      "3. **useLayoutEffect runs** (before paint, blocks painting)\n" +
      "4. Browser paints screen 🎨\n\n" +
      "**Visual Comparison:**\n\n" +
      "```javascript\n" +
      "// With useEffect - User sees flicker!\n" +
      "function Tooltip() {\n" +
      "  const [position, setPosition] = useState({ x: 0, y: 0 });\n" +
      "  const ref = useRef();\n\n" +
      "  useEffect(() => {\n" +
      "    const rect = ref.current.getBoundingClientRect();\n" +
      "    setPosition({ x: rect.left, y: rect.top });\n" +
      "  }, []);\n\n" +
      "  // User sees tooltip at (0,0) THEN jump to correct position!\n" +
      "  return <div ref={ref} style={{ left: position.x, top: position.y }}>Tooltip</div>;\n" +
      "}\n\n" +
      "// ✅ With useLayoutEffect - No flicker!\n" +
      "function Tooltip() {\n" +
      "  const [position, setPosition] = useState({ x: 0, y: 0 });\n" +
      "  const ref = useRef();\n\n" +
      "  useLayoutEffect(() => {\n" +
      "    const rect = ref.current.getBoundingClientRect();\n" +
      "    setPosition({ x: rect.left, y: rect.top });\n" +
      "  }, []);\n\n" +
      "  // Position calculated before paint - user sees correct position immediately\n" +
      "  return <div ref={ref} style={{ left: position.x, top: position.y }}>Tooltip</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use useEffect (Default Choice):**\n\n" +
      "```javascript\n" +
      "// ✅ Data fetching\n" +
      "useEffect(() => {\n" +
      "  fetchUser(id).then(setUser);\n" +
      "}, [id]);\n\n" +
      "// ✅ Event listeners\n" +
      "useEffect(() => {\n" +
      "  window.addEventListener('scroll', handleScroll);\n" +
      "  return () => window.removeEventListener('scroll', handleScroll);\n" +
      "}, []);\n\n" +
      "// ✅ Subscriptions\n" +
      "useEffect(() => {\n" +
      "  const unsubscribe = store.subscribe(handleChange);\n" +
      "  return unsubscribe;\n" +
      "}, []);\n\n" +
      "// ✅ Logging/analytics\n" +
      "useEffect(() => {\n" +
      "  trackPageView(pathname);\n" +
      "}, [pathname]);\n\n" +
      "// ✅ localStorage\n" +
      "useEffect(() => {\n" +
      "  localStorage.setItem('key', value);\n" +
      "}, [value]);\n" +
      "```\n\n" +
      "**When to Use useLayoutEffect:**\n\n" +
      "**1. DOM Measurements Before Paint:**\n" +
      "```javascript\n" +
      "function Popover({ targetRef }) {\n" +
      "  const [position, setPosition] = useState({ x: 0, y: 0 });\n" +
      "  const popoverRef = useRef();\n\n" +
      "  useLayoutEffect(() => {\n" +
      "    const targetRect = targetRef.current.getBoundingClientRect();\n" +
      "    const popoverRect = popoverRef.current.getBoundingClientRect();\n\n" +
      "    // Calculate position to avoid going off-screen\n" +
      "    let x = targetRect.right;\n" +
      "    if (x + popoverRect.width > window.innerWidth) {\n" +
      "      x = targetRect.left - popoverRect.width;\n" +
      "    }\n\n" +
      "    setPosition({ x, y: targetRect.bottom });\n" +
      "  }, []);\n\n" +
      "  return (\n" +
      "    <div ref={popoverRef} style={{ left: position.x, top: position.y }}>\n" +
      "      Popover content\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**2. Preventing Layout Shift:**\n" +
      "```javascript\n" +
      "function DynamicHeightContainer() {\n" +
      "  const [height, setHeight] = useState(0);\n" +
      "  const contentRef = useRef();\n\n" +
      "  useLayoutEffect(() => {\n" +
      "    // Measure content before user sees it\n" +
      "    setHeight(contentRef.current.scrollHeight);\n" +
      "  }, [children]);\n\n" +
      "  // User never sees wrong height\n" +
      "  return (\n" +
      "    <div style={{ height }}>\n" +
      "      <div ref={contentRef}>{children}</div>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**3. Synchronous Animations:**\n" +
      "```javascript\n" +
      "useLayoutEffect(() => {\n" +
      "  const element = ref.current;\n" +
      "  const startPos = element.offsetTop;\n" +
      "  const endPos = targetY;\n" +
      "  \n" +
      "  // Must be synchronous to avoid flicker\n" +
      "  element.style.transform = `translateY(${endPos - startPos}px)`;\n" +
      "}, [targetY]);\n" +
      "```\n\n" +
      "**4. Scroll Restoration:**\n" +
      "```javascript\n" +
      "useLayoutEffect(() => {\n" +
      "  // Restore before paint to avoid seeing scroll jump\n" +
      "  window.scrollTo(0, savedScrollY);\n" +
      "}, []);\n" +
      "```\n\n" +
      "**Performance Impact:**\n\n" +
      "```javascript\n" +
      "// ❌ useLayoutEffect blocks painting\n" +
      "useLayoutEffect(() => {\n" +
      "  // 100ms of synchronous work\n" +
      "  expensiveCalculation(); // User sees blank screen for 100ms!\n" +
      "}, []);\n\n" +
      "// ✅ useEffect doesn't block\n" +
      "useEffect(() => {\n" +
      "  expensiveCalculation(); // Screen paints, then calculation runs\n" +
      "}, []);\n" +
      "```\n\n" +
      "**SSR Warning:**\n" +
      "```javascript\n" +
      "// ❌ Server doesn't have DOM\n" +
      "useLayoutEffect(() => {\n" +
      "  // Warning: useLayoutEffect does nothing on the server\n" +
      "}, []);\n\n" +
      "// ✅ Use isomorphic hook\n" +
      "const useIsomorphicLayoutEffect = \n" +
      "  typeof window !== 'undefined' ? useLayoutEffect : useEffect;\n\n" +
      "useIsomorphicLayoutEffect(() => {\n" +
      "  // Safe on both server and client\n" +
      "}, []);\n" +
      "```\n\n" +
      "**Decision Tree:**\n" +
      "1. Need to measure DOM? → useLayoutEffect\n" +
      "2. Seeing visual glitch/flicker? → try useLayoutEffect\n" +
      "3. Doing heavy computation? → useEffect\n" +
      "4. Everything else? → useEffect\n\n" +
      "**Rule of Thumb:** Start with useEffect (99% of cases). Switch to useLayoutEffect only if you see visual issues or need DOM measurements before paint.",
    category: "Hooks",
    difficulty: "hard",
    tags: ["hooks", "effects", "layout", "timing", "performance", "dom"],
  },
  {
    id: 10,
    question:
      "Explain keys in React lists. Why are they important and what are the consequences of incorrect keys?",
    answer:
      "Keys help React identify which items have changed, been added, or removed in lists. They're critical for efficient reconciliation and preventing bugs.\n\n" +
      "**Why Keys Matter:**\n\n" +
      "React uses keys to match elements between renders:\n" +
      "```javascript\n" +
      "// React's internal map: key → fiber node\n" +
      "{\n" +
      "  'user-1': <UserCard user={alice} />,\n" +
      "  'user-2': <UserCard user={bob} />,\n" +
      "  'user-3': <UserCard user={carol} />,\n" +
      "}\n\n" +
      "// On re-render:\n" +
      "// Same key → reuse fiber, update props\n" +
      "// New key → mount new fiber\n" +
      "// Missing key → unmount fiber\n" +
      "```\n\n" +
      "**The Index-as-Key Problem:**\n\n" +
      "```javascript\n" +
      "// ❌ BAD: Using array index as key\n" +
      "users.map((user, index) => (\n" +
      "  <UserCard key={index} user={user} />\n" +
      "));\n\n" +
      "// Initial state:\n" +
      "// [Alice(key=0), Bob(key=1), Carol(key=2)]\n\n" +
      "// After deleting Bob:\n" +
      "// [Alice(key=0), Carol(key=1)]\n\n" +
      "// React's reconciliation:\n" +
      "// - Key 0: Alice → Alice ✓ (no change, reuse)\n" +
      "// - Key 1: Bob → Carol ✗ (update props, WRONG!)\n" +
      "// - Key 2: Carol → removed\n\n" +
      "// Result: Bob's component instance is used for Carol!\n" +
      "// Carol gets Bob's component state!\n" +
      "```\n\n" +
      "**Real-World Bugs from Wrong Keys:**\n\n" +
      "**1. State Bleeding Between Items:**\n" +
      "```javascript\n" +
      "function TodoItem({ todo }) {\n" +
      "  const [isEditing, setIsEditing] = useState(false);\n" +
      "  const [draft, setDraft] = useState(todo.text);\n\n" +
      "  return (\n" +
      "    <div>\n" +
      "      {isEditing ? (\n" +
      "        <input value={draft} onChange={e => setDraft(e.target.value)} />\n" +
      "      ) : (\n" +
      "        <span onClick={() => setIsEditing(true)}>{todo.text}</span>\n" +
      "      )}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n\n" +
      "// ❌ With index keys:\n" +
      "todos.map((todo, i) => <TodoItem key={i} todo={todo} />);\n\n" +
      "// Bug reproduction:\n" +
      "// 1. Start editing todo #2 (isEditing=true, draft='Buy milk')\n" +
      "// 2. Delete todo #1\n" +
      "// 3. BUG: Todo #3 is now in edit mode with 'Buy milk' text!\n" +
      "//    (It inherited todo #2's component state)\n" +
      "```\n\n" +
      "**2. Input Focus Loss:**\n" +
      "```javascript\n" +
      "// ❌ With index keys\n" +
      "items.map((item, i) => (\n" +
      "  <input key={i} defaultValue={item.name} />\n" +
      "));\n\n" +
      "// Steps to reproduce:\n" +
      "// 1. Focus on input #2\n" +
      "// 2. Sort or filter items\n" +
      "// 3. BUG: Focus jumps to different input!\n" +
      "```\n\n" +
      "**3. Animation Glitches:**\n" +
      "```javascript\n" +
      "function AnimatedList({ items }) {\n" +
      "  return items.map((item, i) => (\n" +
      "    <motion.div\n" +
      "      key={i} // ❌ Wrong\n" +
      "      initial={{ opacity: 0 }}\n" +
      "      animate={{ opacity: 1 }}\n" +
      "    >\n" +
      "      {item.text}\n" +
      "    </motion.div>\n" +
      "  ));\n" +
      "}\n\n" +
      "// Bug: When reordering items:\n" +
      "// - Wrong items animate\n" +
      "// - Items appear to jump instead of slide\n" +
      "```\n\n" +
      "**4. Performance Problems:**\n" +
      "```javascript\n" +
      "// Without proper keys, React can't efficiently reuse DOM nodes\n" +
      "// It may destroy and recreate instead of moving\n" +
      "// Causes expensive unmount/mount cycles\n" +
      "```\n\n" +
      "**Correct Key Strategies:**\n\n" +
      "**1. Stable Unique IDs (Best):**\n" +
      "```javascript\n" +
      "// ✅ ID from database\n" +
      "users.map(user => (\n" +
      "  <UserCard key={user.id} user={user} />\n" +
      "));\n\n" +
      "// ✅ Generate IDs when creating data\n" +
      "const addTodo = (text) => {\n" +
      "  setTodos(prev => [...prev, {\n" +
      "    id: generateId(), // uuid, nanoid, Date.now()\n" +
      "    text\n" +
      "  }]);\n" +
      "};\n" +
      "```\n\n" +
      "**2. Composite Keys (If No ID):**\n" +
      "```javascript\n" +
      "// ✅ Combine unique properties\n" +
      "items.map(item => (\n" +
      "  <Item key={`${item.category}-${item.name}`} item={item} />\n" +
      "));\n\n" +
      "// ✅ Hash content if truly unique\n" +
      "items.map(item => (\n" +
      "  <Item key={hash(JSON.stringify(item))} item={item} />\n" +
      "));\n" +
      "```\n\n" +
      "**When Index is OK:**\n\n" +
      "```javascript\n" +
      "// ✅ Static list that never changes\n" +
      "const NAV_ITEMS = ['Home', 'About', 'Contact'];\n" +
      "NAV_ITEMS.map((item, i) => <NavLink key={i}>{item}</NavLink>);\n\n" +
      "// ✅ Items never reordered/removed/added\n" +
      "const months = getMonths();\n" +
      "months.map((m, i) => <Month key={i} data={m} />);\n\n" +
      "// ✅ Pure presentation, no local state\n" +
      "items.map((item, i) => (\n" +
      "  <div key={i}>{item.name}</div> // Just displays text\n" +
      "));\n" +
      "```\n\n" +
      "**Anti-Patterns:**\n\n" +
      "```javascript\n" +
      "// ❌ No key - React warns, falls back to index\n" +
      "items.map(item => <Item item={item} />);\n\n" +
      "// ❌ Non-unique key\n" +
      "items.map(item => <Item key={item.category} item={item} />);\n" +
      "// If two items have same category, bugs!\n\n" +
      "// ❌ Unstable key - generates new key every render\n" +
      "items.map(item => <Item key={Math.random()} item={item} />);\n" +
      "// React thinks everything is new, remounts all!\n\n" +
      "// ❌ Key that changes with state\n" +
      "items.map(item => <Item key={item.isSelected ? '1' : '0'} />);\n" +
      "// When isSelected changes, component is destroyed and recreated!\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "1. Use stable, unique IDs from your data\n" +
      "2. Generate IDs when data is created (not during render)\n" +
      "3. Avoid index unless list is static and will never change\n" +
      "4. Never use random values or timestamps\n" +
      "5. Keys only need to be unique among siblings (not globally)\n" +
      "6. Don't use keys for non-list elements (unnecessarily remounts)\n\n" +
      "**Key Takeaway:** Keys are React's way of tracking element identity across renders. Wrong keys cause subtle bugs that are hard to debug, especially with component state and animations.",
    category: "Core Concepts",
    difficulty: "intermediate",
    tags: ["keys", "lists", "reconciliation", "common-mistakes", "state", "performance"],
  },
  {
    id: 11,
    question:
      "What are Error Boundaries? How do you implement them and what are their limitations?",
    answer:
      "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire app.\n\n" +
      "**Implementation (Class Component Required):**\n\n" +
      "```javascript\n" +
      "class ErrorBoundary extends React.Component {\n" +
      "  constructor(props) {\n" +
      "    super(props);\n" +
      "    this.state = { \n" +
      "      hasError: false, \n" +
      "      error: null, \n" +
      "      errorInfo: null \n" +
      "    };\n" +
      "  }\n\n" +
      "  static getDerivedStateFromError(error) {\n" +
      "    // Update state to trigger fallback UI\n" +
      "    return { hasError: true };\n" +
      "  }\n\n" +
      "  componentDidCatch(error, errorInfo) {\n" +
      "    // Log error to monitoring service\n" +
      "    console.error('Error caught:', error, errorInfo);\n" +
      "    logErrorToService(error, errorInfo);\n" +
      "    \n" +
      "    this.setState({\n" +
      "      error,\n" +
      "      errorInfo,\n" +
      "    });\n" +
      "  }\n\n" +
      "  render() {\n" +
      "    if (this.state.hasError) {\n" +
      "      return (\n" +
      "        <div role='alert'>\n" +
      "          <h1>Something went wrong</h1>\n" +
      "          <details style={{ whiteSpace: 'pre-wrap' }}>\n" +
      "            {this.state.error && this.state.error.toString()}\n" +
      "            <br />\n" +
      "            {this.state.errorInfo.componentStack}\n" +
      "          </details>\n" +
      "          <button onClick={() => this.setState({ hasError: false })}>\n" +
      "            Try again\n" +
      "          </button>\n" +
      "        </div>\n" +
      "      );\n" +
      "    }\n\n" +
      "    return this.props.children;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Usage - Wrap Risky Components:**\n\n" +
      "```javascript\n" +
      "// Whole app\n" +
      "<ErrorBoundary>\n" +
      "  <App />\n" +
      "</ErrorBoundary>\n\n" +
      "// Granular boundaries for better UX\n" +
      "<Page>\n" +
      "  <ErrorBoundary fallback={<SidebarError />}>\n" +
      "    <Sidebar />\n" +
      "  </ErrorBoundary>\n" +
      "  \n" +
      "  <ErrorBoundary fallback={<MainError />}>\n" +
      "    <MainContent />\n" +
      "  </ErrorBoundary>\n" +
      "</Page>\n" +
      "// If Sidebar crashes, MainContent still works!\n" +
      "```\n\n" +
      "**What Error Boundaries Catch:**\n\n" +
      "✅ **DO Catch:**\n" +
      "- Errors during rendering\n" +
      "- Errors in lifecycle methods\n" +
      "- Errors in constructors of child components\n\n" +
      "```javascript\n" +
      "function BuggyComponent() {\n" +
      "  const data = props.data.items; // ✅ Caught if data is null\n" +
      "  return <div>{data.map(...)}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "❌ **DO NOT Catch:**\n\n" +
      "**1. Event Handlers:**\n" +
      "```javascript\n" +
      "function Component() {\n" +
      "  const handleClick = () => {\n" +
      "    throw new Error('Not caught by boundary!');\n" +
      "  };\n" +
      "  \n" +
      "  return <button onClick={handleClick}>Click</button>;\n" +
      "}\n\n" +
      "// ✅ Solution: Use try/catch\n" +
      "const handleClick = () => {\n" +
      "  try {\n" +
      "    riskyOperation();\n" +
      "  } catch (error) {\n" +
      "    setError(error); // Setting state triggers re-render\n" +
      "    // Now error boundary catches it during render\n" +
      "  }\n" +
      "};\n\n" +
      "if (error) throw error; // In render\n" +
      "```\n\n" +
      "**2. Async Code:**\n" +
      "```javascript\n" +
      "// ❌ Not caught\n" +
      "useEffect(() => {\n" +
      "  fetchData().catch(err => {\n" +
      "    throw err; // Error boundary doesn't catch this!\n" +
      "  });\n" +
      "}, []);\n\n" +
      "// ✅ Solution: Set error state\n" +
      "const [error, setError] = useState(null);\n\n" +
      "useEffect(() => {\n" +
      "  fetchData().catch(setError);\n" +
      "}, []);\n\n" +
      "if (error) throw error; // Throw in render to trigger boundary\n" +
      "```\n\n" +
      "**3. Server-Side Rendering:**\n" +
      "```javascript\n" +
      "// Error boundaries don't work during SSR\n" +
      "// Handle in getServerSideProps/getStaticProps\n" +
      "```\n\n" +
      "**4. Errors in Error Boundary Itself:**\n" +
      "```javascript\n" +
      "// If error boundary's own code throws, error bubbles to parent\n" +
      "// Need another error boundary above\n" +
      "```\n\n" +
      "**Advanced Patterns:**\n\n" +
      "**1. Retry with Key Reset:**\n" +
      "```javascript\n" +
      "class ErrorBoundary extends React.Component {\n" +
      "  state = { hasError: false, resetKey: 0 };\n\n" +
      "  static getDerivedStateFromError() {\n" +
      "    return { hasError: true };\n" +
      "  }\n\n" +
      "  resetError = () => {\n" +
      "    this.setState(prev => ({\n" +
      "      hasError: false,\n" +
      "      resetKey: prev.resetKey + 1, // Force remount\n" +
      "    }));\n" +
      "  };\n\n" +
      "  render() {\n" +
      "    if (this.state.hasError) {\n" +
      "      return <button onClick={this.resetError}>Try Again</button>;\n" +
      "    }\n" +
      "    // Key forces full remount on retry\n" +
      "    return <div key={this.state.resetKey}>{this.props.children}</div>;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**2. Error Logging:**\n" +
      "```javascript\n" +
      "componentDidCatch(error, errorInfo) {\n" +
      "  // Sentry\n" +
      "  Sentry.captureException(error, {\n" +
      "    contexts: {\n" +
      "      react: { componentStack: errorInfo.componentStack },\n" +
      "    },\n" +
      "  });\n\n" +
      "  // LogRocket\n" +
      "  LogRocket.captureException(error, {\n" +
      "    tags: { section: 'checkout' },\n" +
      "    extra: { errorInfo },\n" +
      "  });\n" +
      "}\n" +
      "```\n\n" +
      "**3. Context-Based Error Handling:**\n" +
      "```javascript\n" +
      "const ErrorContext = createContext();\n\n" +
      "function ErrorBoundary({ children }) {\n" +
      "  const [error, setError] = useState(null);\n\n" +
      "  if (error) throw error;\n\n" +
      "  return (\n" +
      "    <ErrorContext.Provider value={{ reportError: setError }}>\n" +
      "      {children}\n" +
      "    </ErrorContext.Provider>\n" +
      "  );\n" +
      "}\n\n" +
      "// In components\n" +
      "function Component() {\n" +
      "  const { reportError } = useContext(ErrorContext);\n" +
      "  \n" +
      "  const handleClick = async () => {\n" +
      "    try {\n" +
      "      await riskyOperation();\n" +
      "    } catch (error) {\n" +
      "      reportError(error); // Bubbles to boundary\n" +
      "    }\n" +
      "  };\n" +
      "}\n" +
      "```\n\n" +
      "**No Hook Equivalent (Yet!):**\n\n" +
      "```javascript\n" +
      "// ❌ This doesn't exist\n" +
      "const [error, resetError] = useErrorBoundary();\n\n" +
      "// Workaround: Use library (react-error-boundary)\n" +
      "import { useErrorHandler } from 'react-error-boundary';\n\n" +
      "function Component() {\n" +
      "  const handleError = useErrorHandler();\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    fetchData().catch(handleError); // Triggers nearest boundary\n" +
      "  }, [handleError]);\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "1. Place boundaries at strategic points (page level, major features)\n" +
      "2. Don't wrap entire app - use granular boundaries\n" +
      "3. Provide meaningful error messages and recovery options\n" +
      "4. Log errors to monitoring service\n" +
      "5. Different fallbacks for dev vs production\n" +
      "6. Test error boundaries with intentional errors",
    category: "Error Handling",
    difficulty: "hard",
    tags: ["error-boundaries", "errors", "class-components", "error-handling", "patterns"],
  },
  {
    id: 12,
    question:
      "Explain useMemo and useCallback in depth. When should you use them and what are the performance trade-offs?",
    answer:
      "Both hooks memoize values to avoid unnecessary recalculations or re-renders, but have costs of their own.\n\n" +
      "**useMemo - Memoize Computed Values:**\n\n" +
      "```javascript\n" +
      "const expensiveValue = useMemo(\n" +
      "  () => computeExpensiveValue(a, b),\n" +
      "  [a, b] // Only recompute when a or b changes\n" +
      ");\n" +
      "```\n\n" +
      "**useCallback - Memoize Functions:**\n\n" +
      "```javascript\n" +
      "const memoizedCallback = useCallback(\n" +
      "  (arg) => {\n" +
      "    doSomething(a, b, arg);\n" +
      "  },\n" +
      "  [a, b] // Function identity stays same unless a or b changes\n" +
      ");\n" +
      "```\n\n" +
      "**Relationship:**\n" +
      "```javascript\n" +
      "useCallback(fn, deps) === useMemo(() => fn, deps)\n" +
      "```\n\n" +
      "**When to Use useMemo:**\n\n" +
      "**1. Expensive Calculations:**\n" +
      "```javascript\n" +
      "function DataTable({ rows }) {\n" +
      "  // ❌ Without memo: Sorts 10,000 items on every render\n" +
      "  const sortedRows = heavySort(rows); // Even if rows hasn't changed!\n\n" +
      "  // ✅ With memo: Only sorts when rows actually changes\n" +
      "  const sortedRows = useMemo(\n" +
      "    () => heavySort(rows),\n" +
      "    [rows]\n" +
      "  );\n" +
      "  \n" +
      "  return <Table rows={sortedRows} />;\n" +
      "}\n" +
      "```\n\n" +
      "**2. Referential Equality for Dependencies:**\n" +
      "```javascript\n" +
      "function Component({ data }) {\n" +
      "  // ❌ New object every render\n" +
      "  const config = { data, options: { sort: true } };\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    processData(config); // Runs EVERY render (config always new)\n" +
      "  }, [config]);\n" +
      "}\n\n" +
      "// ✅ Stable reference\n" +
      "function Component({ data }) {\n" +
      "  const config = useMemo(\n" +
      "    () => ({ data, options: { sort: true } }),\n" +
      "    [data] // Only changes when data changes\n" +
      "  );\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    processData(config); // Only runs when data changes\n" +
      "  }, [config]);\n" +
      "}\n" +
      "```\n\n" +
      "**3. Preventing Child Re-renders:**\n" +
      "```javascript\n" +
      "const Child = React.memo(({ items }) => {\n" +
      "  console.log('Child rendered');\n" +
      "  return <List items={items} />;\n" +
      "});\n\n" +
      "function Parent() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  \n" +
      "  // ❌ Child re-renders on every count change\n" +
      "  const items = data.filter(x => x.active);\n" +
      "  \n" +
      "  // ✅ Child only re-renders when data changes\n" +
      "  const items = useMemo(\n" +
      "    () => data.filter(x => x.active),\n" +
      "    [data]\n" +
      "  );\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <button onClick={() => setCount(c => c + 1)}>{count}</button>\n" +
      "      <Child items={items} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use useCallback:**\n\n" +
      "**1. Callbacks to Memoized Children:**\n" +
      "```javascript\n" +
      "const ExpensiveChild = React.memo(({ onClick }) => {\n" +
      "  console.log('Rendering ExpensiveChild');\n" +
      "  return <button onClick={onClick}>Click</button>;\n" +
      "});\n\n" +
      "function Parent() {\n" +
      "  const [count, setCount] = useState(0);\n\n" +
      "  // ❌ New function every render, memo is useless\n" +
      "  const handleClick = () => console.log('clicked');\n\n" +
      "  // ✅ Stable function reference\n" +
      "  const handleClick = useCallback(\n" +
      "    () => console.log('clicked'),\n" +
      "    [] // Never changes\n" +
      "  );\n\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <button onClick={() => setCount(c => c + 1)}>{count}</button>\n" +
      "      <ExpensiveChild onClick={handleClick} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**2. Effect Dependencies:**\n" +
      "```javascript\n" +
      "// ❌ Effect runs every render\n" +
      "function Component({ id }) {\n" +
      "  const fetchUser = () => fetch(`/api/users/${id}`);\n\n" +
      "  useEffect(() => {\n" +
      "    fetchUser(); // fetchUser is new every render!\n" +
      "  }, [fetchUser]); // Infinite loop risk\n" +
      "}\n\n" +
      "// ✅ Stable function, effect runs only when id changes\n" +
      "function Component({ id }) {\n" +
      "  const fetchUser = useCallback(\n" +
      "    () => fetch(`/api/users/${id}`),\n" +
      "    [id]\n" +
      "  );\n\n" +
      "  useEffect(() => {\n" +
      "    fetchUser();\n" +
      "  }, [fetchUser]); // Only re-runs when id changes\n" +
      "}\n\n" +
      "// ✅ Better: Just use id directly\n" +
      "useEffect(() => {\n" +
      "  fetch(`/api/users/${id}`);\n" +
      "}, [id]);\n" +
      "```\n\n" +
      "**3. Custom Hooks:**\n" +
      "```javascript\n" +
      "function useCustomHook(value) {\n" +
      "  // ✅ Return stable functions\n" +
      "  const doSomething = useCallback(() => {\n" +
      "    process(value);\n" +
      "  }, [value]);\n" +
      "  \n" +
      "  return { doSomething };\n" +
      "}\n" +
      "```\n\n" +
      "**When NOT to Use (Premature Optimization):**\n\n" +
      "```javascript\n" +
      "// ❌ Unnecessary - simple calculation\n" +
      "const doubled = useMemo(() => count * 2, [count]);\n" +
      "// ✅ Just calculate it\n" +
      "const doubled = count * 2; // Costs nanoseconds\n\n" +
      "// ❌ Unnecessary - child not memoized\n" +
      "const handleClick = useCallback(() => {}, []);\n" +
      "return <Child onClick={handleClick} />; // Child not React.memo'd\n" +
      "// ✅ Just use inline\n" +
      "return <Child onClick={() => {}} />;\n\n" +
      "// ❌ Unnecessary - primitive values\n" +
      "const value = useMemo(() => props.number, [props.number]);\n" +
      "// ✅ Primitives are already compared by value\n" +
      "const value = props.number;\n" +
      "```\n\n" +
      "**Cost of Memoization:**\n\n" +
      "```javascript\n" +
      "// Every useMemo/useCallback has cost:\n" +
      "// 1. Allocate closure\n" +
      "// 2. Store previous value and deps\n" +
      "// 3. Compare dependencies (shallow comparison)\n" +
      "// 4. Garbage collect old values\n\n" +
      "// Only beneficial if:\n" +
      "// Cost(recomputation) > Cost(memoization + comparison)\n" +
      "```\n\n" +
      "**Common Pitfalls:**\n\n" +
      "**1. Wrong Dependencies:**\n" +
      "```javascript\n" +
      "// ❌ Missing dependency b\n" +
      "const value = useMemo(() => compute(a, b), [a]);\n\n" +
      "// ✅ Include all dependencies\n" +
      "const value = useMemo(() => compute(a, b), [a, b]);\n" +
      "```\n\n" +
      "**2. Inline Object Dependencies:**\n" +
      "```javascript\n" +
      "// ❌ Defeats the purpose\n" +
      "const value = useMemo(\n" +
      "  () => compute(config),\n" +
      "  [{ option: true }] // New object every render!\n" +
      ");\n\n" +
      "// ✅ Dependencies should be primitives or memoized\n" +
      "const config = useMemo(() => ({ option: true }), []);\n" +
      "const value = useMemo(() => compute(config), [config]);\n" +
      "```\n\n" +
      "**3. Memoizing Already Cheap Operations:**\n" +
      "```javascript\n" +
      "// ❌ Memoization costs more than operation\n" +
      "const sum = useMemo(() => a + b, [a, b]);\n" +
      "```\n\n" +
      "**How to Decide:**\n\n" +
      "1. **Profile First:** Use React DevTools Profiler\n" +
      "2. **Measure Impact:** Before/after comparison\n" +
      "3. **Start Without:** Add only when profiler shows problem\n" +
      "4. **ESLint:** Use exhaustive-deps rule\n\n" +
      "**Rule of Thumb:**\n" +
      "- **useMemo:** Expensive calculations (>5ms), object/array identity for deps\n" +
      "- **useCallback:** Callbacks to React.memo'd components, effect dependencies\n" +
      "- **Neither:** Simple math, primitives, components not memoized",
    category: "Performance",
    difficulty: "hard",
    tags: ["useMemo", "useCallback", "performance", "optimization", "memoization", "hooks"],
  },
  {
    id: 13,
    question: "What is React.memo? How does it differ from useMemo?",
    answer:
      "React.memo is a Higher-Order Component (HOC) that memoizes component rendering. useMemo memoizes values.\n\n" +
      "**React.memo - Component Memoization:**\n\n" +
      "```javascript\n" +
      "// Wraps a component\n" +
      "const MemoizedComponent = React.memo(ExpensiveComponent);\n\n" +
      "// Prevents re-render if props haven't changed\n" +
      "function Parent() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const [name] = useState('John');\n\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <button onClick={() => setCount(c => c + 1)}>{count}</button>\n" +
      "      <MemoizedComponent name={name} />\n" +
      "      {/* Doesn't re-render when count changes! */}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**How React.memo Works:**\n\n" +
      "1. Before re-rendering, React compares new props with previous props\n" +
      "2. Uses **shallow comparison** (Object.is for each prop)\n" +
      "3. If props are equal → skip render, reuse previous result\n" +
      "4. If props differ → render component\n\n" +
      "**Shallow Comparison:**\n\n" +
      "```javascript\n" +
      "// Primitives: compared by value\n" +
      "1 === 1 // true → skip render\n" +
      "'hello' === 'hello' // true → skip render\n\n" +
      "// Objects/Arrays: compared by reference\n" +
      "{ a: 1 } === { a: 1 } // false → re-render!\n" +
      "[1, 2] === [1, 2] // false → re-render!\n\n" +
      "// Same reference:\n" +
      "const obj = { a: 1 };\n" +
      "obj === obj // true → skip render\n" +
      "```\n\n" +
      "**Common Problem:**\n\n" +
      "```javascript\n" +
      "const Child = React.memo(({ config }) => {\n" +
      "  return <div>{config.name}</div>;\n" +
      "});\n\n" +
      "function Parent() {\n" +
      "  const [count, setCount] = useState(0);\n\n" +
      "  // ❌ New object every render - memo is useless!\n" +
      "  return <Child config={{ name: 'John' }} />;\n" +
      "}\n\n" +
      "// ✅ Solution: Memoize object\n" +
      "function Parent() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  \n" +
      "  const config = useMemo(\n" +
      "    () => ({ name: 'John' }),\n" +
      "    [] // Never changes\n" +
      "  );\n\n" +
      "  return <Child config={config} />; // Now memo works!\n" +
      "}\n" +
      "```\n\n" +
      "**Custom Comparison Function:**\n\n" +
      "```javascript\n" +
      "function areEqual(prevProps, nextProps) {\n" +
      "  // Return true to skip render, false to render\n" +
      "  return prevProps.user.id === nextProps.user.id;\n" +
      "}\n\n" +
      "const UserCard = React.memo(({ user }) => {\n" +
      "  return <div>{user.name}</div>;\n" +
      "}, areEqual); // Custom comparison\n\n" +
      "// Only re-renders if user.id changes\n" +
      "// Ignores changes to user.name, user.email, etc.\n" +
      "```\n\n" +
      "**Difference from useMemo:**\n\n" +
      "```javascript\n" +
      "// React.memo - Memoizes component output\n" +
      "const MemoComp = React.memo(Component);\n" +
      "// Compares props, skips render\n\n" +
      "// useMemo - Memoizes any value\n" +
      "const value = useMemo(() => expensiveCalc(), [dep]);\n" +
      "// Compares deps, skips recalculation\n" +
      "```\n\n" +
      "**When NOT to Use:**\n\n" +
      "```javascript\n" +
      "// ❌ Component always gets different props\n" +
      "const Child = React.memo(({ timestamp }) => {\n" +
      "  return <div>{timestamp}</div>;\n" +
      "});\n" +
      "<Child timestamp={Date.now()} /> // Always different!\n\n" +
      "// ❌ Component is cheap to render\n" +
      "const Tiny = React.memo(({ text }) => <span>{text}</span>);\n" +
      "// Comparison cost > render cost\n\n" +
      "// ❌ Props include callbacks without useCallback\n" +
      "const Child = React.memo(({ onClick }) => ...);\n" +
      "<Child onClick={() => {}} /> // New function every render\n" +
      "```\n\n" +
      "**Best Practices:**\n\n" +
      "1. Profile before optimizing\n" +
      "2. Use for components that render often with same props\n" +
      "3. Combine with useMemo/useCallback for props\n" +
      "4. Don't memo everything (overhead adds up)\n" +
      "5. Memo leaf components in large trees\n" +
      "6. Use custom comparison for complex props\n\n" +
      "**Debugging:**\n\n" +
      "```javascript\n" +
      "// Log when component renders\n" +
      "const Component = React.memo(({ prop }) => {\n" +
      "  console.log('Rendered with:', prop);\n" +
      "  return <div>{prop}</div>;\n" +
      "});\n\n" +
      "// Use React DevTools Profiler\n" +
      "// - Record session\n" +
      "// - Check 'Why did this render?'\n" +
      "// - See which props changed\n" +
      "```",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["memo", "performance", "optimization", "hoc", "re-renders"],
  },
  {
    id: 14,
    question: "What is StrictMode and what checks does it perform in React?",
    answer:
      "StrictMode is a development-only tool that highlights potential problems in your application by performing additional checks and warnings.\n\n" +
      "**Usage:**\n" +
      "```javascript\n" +
      "import { StrictMode } from 'react';\n\n" +
      "ReactDOM.createRoot(document.getElementById('root')).render(\n" +
      "  <StrictMode>\n" +
      "    <App />\n" +
      "  </StrictMode>\n" +
      ");\n" +
      "```\n\n" +
      "**Checks Performed:**\n\n" +
      "**1. Double-Invocation (React 18+):**\n\n" +
      "Intentionally calls functions twice to surface side effects:\n" +
      "```javascript\n" +
      "// These are called twice in development:\n" +
      "- Component function bodies\n" +
      "- useState/useReducer/useMemo initializers\n" +
      "- Class component constructor/render/shouldComponentUpdate\n" +
      "```\n\n" +
      "**Why?** To detect impure functions:\n" +
      "```javascript\n" +
      "// ❌ Side effect in render (BUG!)\n" +
      "let globalCount = 0;\n\n" +
      "function Component() {\n" +
      "  globalCount++; // Mutates global state!\n" +
      "  return <div>{globalCount}</div>;\n" +
      "}\n\n" +
      "// StrictMode reveals: globalCount is 2 instead of 1\n" +
      "// Because component ran twice\n\n" +
      "// ✅ Pure render\n" +
      "function Component() {\n" +
      "  const [count, setCount] = useState(0); // Isolated state\n" +
      "  return <div>{count}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**2. Effect Double-Invocation:**\n\n" +
      "Runs: mount → unmount → mount to test cleanup:\n" +
      "```javascript\n" +
      "useEffect(() => {\n" +
      "  console.log('Effect runs');\n" +
      "  const subscription = subscribe();\n\n" +
      "  return () => {\n" +
      "    console.log('Cleanup runs');\n" +
      "    subscription.unsubscribe();\n" +
      "  };\n" +
      "}, []);\n\n" +
      "// In StrictMode console:\n" +
      "// 'Effect runs'\n" +
      "// 'Cleanup runs'    ← Tests cleanup!\n" +
      "// 'Effect runs'\n" +
      "```\n\n" +
      "**Catches Missing Cleanup:**\n" +
      "```javascript\n" +
      "// ❌ Missing cleanup - StrictMode reveals double subscription!\n" +
      "useEffect(() => {\n" +
      "  const subscription = subscribe();\n" +
      "  // No return - memory leak!\n" +
      "}, []);\n\n" +
      "// ✅ Proper cleanup\n" +
      "useEffect(() => {\n" +
      "  const subscription = subscribe();\n" +
      "  return () => subscription.unsubscribe();\n" +
      "}, []);\n" +
      "```\n\n" +
      "**3. Deprecated API Warnings:**\n\n" +
      "Warns about:\n" +
      "- findDOMNode()\n" +
      "- Legacy string refs (`ref='myRef'`)\n" +
      "- Legacy context API (contextTypes)\n" +
      "- Deprecated lifecycle methods:\n" +
      "  - componentWillMount\n" +
      "  - componentWillReceiveProps\n" +
      "  - componentWillUpdate\n\n" +
      "**4. Unexpected Side Effects:**\n\n" +
      "Detects impure functions:\n" +
      "```javascript\n" +
      "// ❌ Impure initializer\n" +
      "let globalId = 0;\n" +
      "const [id] = useState(globalId++); // Runs twice, increments twice!\n\n" +
      "// ✅ Use function form\n" +
      "const [id] = useState(() => globalId++);\n" +
      "// Function called once, even with StrictMode\n" +
      "```\n\n" +
      "**Common Issues Revealed:**\n\n" +
      "**1. Non-idempotent Effects:**\n" +
      "```javascript\n" +
      "// ❌ Sets up multiple timers\n" +
      "useEffect(() => {\n" +
      "  setInterval(() => tick(), 1000);\n" +
      "}, []); // No cleanup!\n\n" +
      "// StrictMode: Two timers run simultaneously\n\n" +
      "// ✅ Cleans up timer\n" +
      "useEffect(() => {\n" +
      "  const id = setInterval(() => tick(), 1000);\n" +
      "  return () => clearInterval(id);\n" +
      "}, []);\n" +
      "```\n\n" +
      "**2. Race Conditions:**\n" +
      "```javascript\n" +
      "// ❌ Doesn't handle unmount\n" +
      "useEffect(() => {\n" +
      "  fetchData(id).then(data => {\n" +
      "    setState(data); // Might update unmounted component!\n" +
      "  });\n" +
      "}, [id]);\n\n" +
      "// ✅ Cancel on unmount\n" +
      "useEffect(() => {\n" +
      "  let cancelled = false;\n" +
      "  \n" +
      "  fetchData(id).then(data => {\n" +
      "    if (!cancelled) setState(data);\n" +
      "  });\n" +
      "  \n" +
      "  return () => { cancelled = true; };\n" +
      "}, [id]);\n" +
      "```\n\n" +
      "**Production vs Development:**\n\n" +
      "```javascript\n" +
      "// Development: Double-invocation, warnings\n" +
      "// Production: Zero overhead (completely removed)\n" +
      "```\n\n" +
      "**Best Practices:**\n\n" +
      "1. Always use StrictMode in development\n" +
      "2. Make effects idempotent (safe to run multiple times)\n" +
      "3. Always return cleanup from effects\n" +
      "4. Use function form for useState when using external values\n" +
      "5. Fix all StrictMode warnings before deploying\n\n" +
      "**Key Takeaway:** StrictMode prepares your app for Concurrent Mode by surfacing bugs that might not appear now but will cause issues with concurrent rendering.",
    category: "Development",
    difficulty: "intermediate",
    tags: ["strict-mode", "development", "best-practices", "debugging", "effects", "purity"],
  },
  {
    id: 15,
    question: "Explain useState vs useReducer. When should you choose one over the other?",
    answer:
      "Both manage component state, but useReducer is better for complex state logic.\n\n" +
      "**useState - Simple State:**\n\n" +
      "```javascript\n" +
      "const [count, setCount] = useState(0);\n\n" +
      "// Update\n" +
      "setCount(count + 1);\n" +
      "setCount(c => c + 1); // Functional update\n" +
      "```\n\n" +
      "**useReducer - Complex State Logic:**\n\n" +
      "```javascript\n" +
      "const initialState = { count: 0, history: [] };\n\n" +
      "function reducer(state, action) {\n" +
      "  switch (action.type) {\n" +
      "    case 'increment':\n" +
      "      return {\n" +
      "        count: state.count + 1,\n" +
      "        history: [...state.history, state.count]\n" +
      "      };\n" +
      "    case 'decrement':\n" +
      "      return {\n" +
      "        count: state.count - 1,\n" +
      "        history: [...state.history, state.count]\n" +
      "      };\n" +
      "    case 'reset':\n" +
      "      return initialState;\n" +
      "    default:\n" +
      "      throw new Error(`Unknown action: ${action.type}`);\n" +
      "  }\n" +
      "}\n\n" +
      "const [state, dispatch] = useReducer(reducer, initialState);\n\n" +
      "// Update\n" +
      "dispatch({ type: 'increment' });\n" +
      "dispatch({ type: 'decrement' });\n" +
      "```\n\n" +
      "**When to Use useState:**\n\n" +
      "**1. Simple, Independent State:**\n" +
      "```javascript\n" +
      "const [name, setName] = useState('');\n" +
      "const [email, setEmail] = useState('');\n" +
      "const [age, setAge] = useState(0);\n" +
      "```\n\n" +
      "**2. Single Values:**\n" +
      "```javascript\n" +
      "const [isOpen, setIsOpen] = useState(false);\n" +
      "const [count, setCount] = useState(0);\n" +
      "```\n\n" +
      "**3. Toggle State:**\n" +
      "```javascript\n" +
      "const [darkMode, setDarkMode] = useState(false);\n" +
      "const toggle = () => setDarkMode(prev => !prev);\n" +
      "```\n\n" +
      "**When to Use useReducer:**\n\n" +
      "**1. Complex State Object:**\n" +
      "```javascript\n" +
      "// ❌ Multiple useState - hard to keep in sync\n" +
      "const [cart, setCart] = useState([]);\n" +
      "const [total, setTotal] = useState(0);\n" +
      "const [itemCount, setItemCount] = useState(0);\n\n" +
      "// ✅ Single reducer - always consistent\n" +
      "const [state, dispatch] = useReducer(cartReducer, {\n" +
      "  items: [],\n" +
      "  total: 0,\n" +
      "  count: 0\n" +
      "});\n" +
      "```\n\n" +
      "**2. State Machine / Multiple Related Transitions:**\n" +
      "```javascript\n" +
      "// Form with validation and submission states\n" +
      "const initialState = {\n" +
      "  data: {},\n" +
      "  errors: {},\n" +
      "  status: 'idle', // idle | validating | submitting | success | error\n" +
      "};\n\n" +
      "function formReducer(state, action) {\n" +
      "  switch (action.type) {\n" +
      "    case 'FIELD_CHANGE':\n" +
      "      return {\n" +
      "        ...state,\n" +
      "        data: { ...state.data, [action.field]: action.value },\n" +
      "        errors: { ...state.errors, [action.field]: null },\n" +
      "      };\n" +
      "    case 'VALIDATE':\n" +
      "      return { ...state, status: 'validating' };\n" +
      "    case 'VALIDATION_ERROR':\n" +
      "      return { ...state, errors: action.errors, status: 'idle' };\n" +
      "    case 'SUBMIT':\n" +
      "      return { ...state, status: 'submitting' };\n" +
      "    case 'SUBMIT_SUCCESS':\n" +
      "      return { ...state, status: 'success' };\n" +
      "    case 'SUBMIT_ERROR':\n" +
      "      return { ...state, status: 'error', errors: action.errors };\n" +
      "    default:\n" +
      "      return state;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**3. Next State Depends on Previous:**\n" +
      "```javascript\n" +
      "// ✅ Reducer makes dependencies clear\n" +
      "function todoReducer(state, action) {\n" +
      "  switch (action.type) {\n" +
      "    case 'add':\n" +
      "      return [...state, { id: Date.now(), text: action.text }];\n" +
      "    case 'remove':\n" +
      "      return state.filter(todo => todo.id !== action.id);\n" +
      "    case 'toggle':\n" +
      "      return state.map(todo =>\n" +
      "        todo.id === action.id\n" +
      "          ? { ...todo, done: !todo.done }\n" +
      "          : todo\n" +
      "      );\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**4. Testing Complex Logic:**\n" +
      "```javascript\n" +
      "// ✅ Reducer is pure function - easy to test\n" +
      "describe('todoReducer', () => {\n" +
      "  it('adds todo', () => {\n" +
      "    const state = [];\n" +
      "    const action = { type: 'add', text: 'Test' };\n" +
      "    const result = todoReducer(state, action);\n" +
      "    expect(result).toHaveLength(1);\n" +
      "  });\n" +
      "});\n" +
      "```\n\n" +
      "**Benefits of useReducer:**\n\n" +
      "1. **Centralized State Logic:** All updates in one place\n" +
      "2. **Testable:** Pure reducer functions\n" +
      "3. **Predictable:** Same action always produces same result\n" +
      "4. **Time-Travel Debugging:** Can replay actions\n" +
      "5. **Type Safety:** TypeScript discriminated unions for actions\n\n" +
      "**Lazy Initialization:**\n\n" +
      "```javascript\n" +
      "// Expensive initial state\n" +
      "function init(initialValue) {\n" +
      "  return { value: expensiveComputation(initialValue) };\n" +
      "}\n\n" +
      "const [state, dispatch] = useReducer(reducer, initialArg, init);\n" +
      "// init only called once\n" +
      "```\n\n" +
      "**useReducer with Context (Mini Redux):**\n\n" +
      "```javascript\n" +
      "const StateContext = createContext();\n" +
      "const DispatchContext = createContext();\n\n" +
      "function Provider({ children }) {\n" +
      "  const [state, dispatch] = useReducer(reducer, initialState);\n\n" +
      "  return (\n" +
      "    <DispatchContext.Provider value={dispatch}>\n" +
      "      <StateContext.Provider value={state}>\n" +
      "        {children}\n" +
      "      </StateContext.Provider>\n" +
      "    </DispatchContext.Provider>\n" +
      "  );\n" +
      "}\n\n" +
      "// Components only using dispatch don't re-render on state changes\n" +
      "function TodoList() {\n" +
      "  const state = useContext(StateContext);\n" +
      "  const dispatch = useContext(DispatchContext);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      {state.todos.map(todo => (\n" +
      "        <Todo \n" +
      "          key={todo.id} \n" +
      "          todo={todo}\n" +
      "          onToggle={() => dispatch({ type: 'toggle', id: todo.id })}\n" +
      "        />\n" +
      "      ))}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Decision Guide:**\n\n" +
      "Use **useState** when:\n" +
      "- Simple primitive values\n" +
      "- Independent state variables\n" +
      "- No complex update logic\n\n" +
      "Use **useReducer** when:\n" +
      "- Multiple related state values\n" +
      "- Complex update logic\n" +
      "- Next state depends on previous\n" +
      "- Want to extract/test state logic\n" +
      "- Building state machine",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useState", "useReducer", "state-management", "hooks", "patterns", "testing"],
  },
];

export default REACT_ENHANCED_QUESTIONS;
