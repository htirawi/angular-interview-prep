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
  },
  {
    id: 16,
    question: "What is React Suspense? How does it work with data fetching and code splitting?",
    answer:
      "React Suspense is a mechanism that lets components 'wait' for something before rendering. It's primarily used for code splitting and data fetching, allowing you to declaratively handle loading states.\n\n" +
      "**How Suspense Works:**\n" +
      "1. Component throws a Promise during render\n" +
      "2. Suspense boundary catches the Promise\n" +
      "3. Shows fallback UI while Promise resolves\n" +
      "4. Re-renders component when Promise resolves\n\n" +
      "**Code Splitting Example:**\n" +
      "```javascript\n" +
      "import { lazy, Suspense } from 'react';\n\n" +
      "const LazyComponent = lazy(() => import('./HeavyComponent'));\n\n" +
      "function App() {\n" +
      "  return (\n" +
      "    <Suspense fallback={<div>Loading...</div>}>\n" +
      "      <LazyComponent />\n" +
      "    </Suspense>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Data Fetching with Suspense:**\n" +
      "```javascript\n" +
      "// Custom hook that throws Promise\n" +
      "function useUserData(userId) {\n" +
      "  const [data, setData] = useState(null);\n" +
      "  const [error, setError] = useState(null);\n\n" +
      "  useEffect(() => {\n" +
      "    let cancelled = false;\n" +
      "    \n" +
      "    fetchUser(userId)\n" +
      "      .then(result => {\n" +
      "        if (!cancelled) setData(result);\n" +
      "      })\n" +
      "      .catch(err => {\n" +
      "        if (!cancelled) setError(err);\n" +
      "      });\n\n" +
      "    return () => { cancelled = true; };\n" +
      "  }, [userId]);\n\n" +
      "  if (error) throw error;\n" +
      "  if (!data) throw new Promise(resolve => setTimeout(resolve, 100));\n" +
      "  return data;\n" +
      "}\n\n" +
      "function UserProfile({ userId }) {\n" +
      "  const userData = useUserData(userId); // Throws Promise\n" +
      "  return <div>{userData.name}</div>;\n" +
      "}\n\n" +
      "function App() {\n" +
      "  return (\n" +
      "    <Suspense fallback={<UserSkeleton />}>\n" +
      "      <UserProfile userId={123} />\n" +
      "    </Suspense>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Declarative loading states\n" +
      "- No loading prop drilling\n" +
      "- Automatic error boundaries\n" +
      "- Better UX with progressive loading\n\n" +
      "**Limitations:**\n" +
      "- Still experimental for data fetching\n" +
      "- Requires compatible data fetching libraries\n" +
      "- Error handling needs Error Boundaries",
    category: "Advanced",
    difficulty: "hard",
    tags: ["suspense", "code-splitting", "data-fetching", "loading", "async", "patterns"],
  },
  {
    id: 17,
    question: "Explain React Server Components (RSC). How do they differ from traditional SSR?",
    answer:
      "React Server Components (RSC) are a new paradigm that allows React components to run on the server and send their output to the client, enabling better performance and reduced bundle sizes.\n\n" +
      "**Key Differences from SSR:**\n\n" +
      "**Traditional SSR:**\n" +
      "- Server renders HTML string\n" +
      "- Client hydrates entire tree\n" +
      "- All components ship to client\n" +
      "- Full JavaScript bundle required\n\n" +
      "**Server Components:**\n" +
      "- Components run on server\n" +
      "- Send serialized component tree\n" +
      "- Only Client Components ship to browser\n" +
      "- Selective hydration\n\n" +
      "**Example:**\n" +
      "```javascript\n" +
      "// Server Component (runs on server)\n" +
      "async function UserProfile({ userId }) {\n" +
      "  const user = await fetchUser(userId); // Direct DB access\n" +
      "  const posts = await fetchUserPosts(userId);\n\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>{user.name}</h1>\n" +
      "      <PostList posts={posts} />\n" +
      "      <LikeButton postId={posts[0].id} /> {/* Client Component */}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n\n" +
      "// Client Component (runs in browser)\n" +
      "'use client';\n" +
      "function LikeButton({ postId }) {\n" +
      "  const [liked, setLiked] = useState(false);\n" +
      "  return (\n" +
      "    <button onClick={() => setLiked(!liked)}>\n" +
      "      {liked ? '❤️' : '🤍'}\n" +
      "    </button>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Smaller JavaScript bundles\n" +
      "- Direct server data access\n" +
      "- Better SEO and performance\n" +
      "- Reduced client-server round trips\n\n" +
      "**Limitations:**\n" +
      "- No browser APIs in Server Components\n" +
      "- No state or effects\n" +
      "- No event handlers\n" +
      "- Requires compatible framework (Next.js 13+)\n\n" +
      "**When to Use:**\n" +
      "- Data fetching components\n" +
      "- Static content rendering\n" +
      "- Components that don't need interactivity",
    category: "Advanced",
    difficulty: "hard",
    tags: ["server-components", "ssr", "performance", "nextjs", "architecture", "rsc"],
  },
  {
    id: 18,
    question:
      "What are React Concurrent Features? Explain startTransition, useDeferredValue, and useTransition.",
    answer:
      "React Concurrent Features are APIs that help manage non-urgent updates, allowing React to keep the UI responsive during heavy computations.\n\n" +
      "**startTransition:**\n" +
      "Marks state updates as non-urgent, allowing React to interrupt them for urgent updates.\n\n" +
      "```javascript\n" +
      "import { startTransition, useState } from 'react';\n\n" +
      "function SearchResults({ query }) {\n" +
      "  const [results, setResults] = useState([]);\n" +
      "  const [isPending, setIsPending] = useState(false);\n\n" +
      "  useEffect(() => {\n" +
      "    if (!query) return;\n\n" +
      "    setIsPending(true);\n" +
      "    \n" +
      "    startTransition(() => {\n" +
      "      const filtered = heavyFilter(data, query);\n" +
      "      setResults(filtered);\n" +
      "      setIsPending(false);\n" +
      "    });\n" +
      "  }, [query]);\n\n" +
      "  return (\n" +
      "    <div>\n" +
      "      {isPending && <Spinner />}\n" +
      "      {results.map(item => <Item key={item.id} {...item} />)}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**useTransition:**\n" +
      "Hook version of startTransition with pending state.\n\n" +
      "```javascript\n" +
      "function App() {\n" +
      "  const [isPending, startTransition] = useTransition();\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const [items, setItems] = useState([]);\n\n" +
      "  const handleClick = () => {\n" +
      "    setCount(c => c + 1); // Urgent update\n" +
      "    \n" +
      "    startTransition(() => {\n" +
      "      setItems(createLargeList()); // Non-urgent\n" +
      "    });\n" +
      "  };\n\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <button onClick={handleClick}>\n" +
      "        Count: {count}\n" +
      "        {isPending && <Spinner />}\n" +
      "      </button>\n" +
      "      <ItemList items={items} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**useDeferredValue:**\n" +
      "Defers a value update, keeping the old value during urgent updates.\n\n" +
      "```javascript\n" +
      "function SearchResults({ query }) {\n" +
      "  const deferredQuery = useDeferredValue(query);\n" +
      "  const results = useMemo(() => {\n" +
      "    return expensiveSearch(deferredQuery);\n" +
      "  }, [deferredQuery]);\n\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <SearchInput value={query} /> {/* Always responsive */}\n" +
      "      <ResultsList results={results} /> {/* May be stale */}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Key Benefits:**\n" +
      "- Keep input responsive during heavy updates\n" +
      "- Automatic priority management\n" +
      "- Better perceived performance\n" +
      "- Graceful degradation\n\n" +
      "**When to Use:**\n" +
      "- Heavy filtering/sorting operations\n" +
      "- Large list updates\n" +
      "- Non-critical UI updates\n" +
      "- Search and autocomplete",
    category: "Performance",
    difficulty: "hard",
    tags: [
      "concurrent",
      "startTransition",
      "useTransition",
      "useDeferredValue",
      "performance",
      "priority",
    ],
  },
  {
    id: 19,
    question: "How do you implement custom hooks? What are the best practices and common patterns?",
    answer:
      "Custom hooks are functions that start with 'use' and can call other hooks. They allow you to extract component logic into reusable functions.\n\n" +
      "**Basic Custom Hook:**\n" +
      "```javascript\n" +
      "function useCounter(initialValue = 0) {\n" +
      "  const [count, setCount] = useState(initialValue);\n\n" +
      "  const increment = useCallback(() => {\n" +
      "    setCount(c => c + 1);\n" +
      "  }, []);\n\n" +
      "  const decrement = useCallback(() => {\n" +
      "    setCount(c => c - 1);\n" +
      "  }, []);\n\n" +
      "  const reset = useCallback(() => {\n" +
      "    setCount(initialValue);\n" +
      "  }, [initialValue]);\n\n" +
      "  return { count, increment, decrement, reset };\n" +
      "}\n\n" +
      "// Usage\n" +
      "function Counter() {\n" +
      "  const { count, increment, decrement, reset } = useCounter(10);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <span>{count}</span>\n" +
      "      <button onClick={increment}>+</button>\n" +
      "      <button onClick={decrement}>-</button>\n" +
      "      <button onClick={reset}>Reset</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Data Fetching Hook:**\n" +
      "```javascript\n" +
      "function useApi(url) {\n" +
      "  const [data, setData] = useState(null);\n" +
      "  const [loading, setLoading] = useState(true);\n" +
      "  const [error, setError] = useState(null);\n\n" +
      "  useEffect(() => {\n" +
      "    let cancelled = false;\n\n" +
      "    async function fetchData() {\n" +
      "      try {\n" +
      "        setLoading(true);\n" +
      "        setError(null);\n" +
      "        \n" +
      "        const response = await fetch(url);\n" +
      "        if (!response.ok) throw new Error('Failed to fetch');\n" +
      "        \n" +
      "        const result = await response.json();\n" +
      "        \n" +
      "        if (!cancelled) {\n" +
      "          setData(result);\n" +
      "        }\n" +
      "      } catch (err) {\n" +
      "        if (!cancelled) {\n" +
      "          setError(err.message);\n" +
      "        }\n" +
      "      } finally {\n" +
      "        if (!cancelled) {\n" +
      "          setLoading(false);\n" +
      "        }\n" +
      "      }\n" +
      "    }\n\n" +
      "    fetchData();\n\n" +
      "    return () => {\n" +
      "      cancelled = true;\n" +
      "    };\n" +
      "  }, [url]);\n\n" +
      "  return { data, loading, error };\n" +
      "}\n" +
      "```\n\n" +
      "**Local Storage Hook:**\n" +
      "```javascript\n" +
      "function useLocalStorage(key, initialValue) {\n" +
      "  const [storedValue, setStoredValue] = useState(() => {\n" +
      "    try {\n" +
      "      const item = window.localStorage.getItem(key);\n" +
      "      return item ? JSON.parse(item) : initialValue;\n" +
      "    } catch (error) {\n" +
      '      console.error(`Error reading localStorage key "${key}":`, error);\n' +
      "      return initialValue;\n" +
      "    }\n" +
      "  });\n\n" +
      "  const setValue = useCallback((value) => {\n" +
      "    try {\n" +
      "      const valueToStore = value instanceof Function ? value(storedValue) : value;\n" +
      "      setStoredValue(valueToStore);\n" +
      "      window.localStorage.setItem(key, JSON.stringify(valueToStore));\n" +
      "    } catch (error) {\n" +
      '      console.error(`Error setting localStorage key "${key}":`, error);\n' +
      "    }\n" +
      "  }, [key, storedValue]);\n\n" +
      "  return [storedValue, setValue];\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Always start with 'use' prefix\n" +
      "- Return consistent interface (object or array)\n" +
      "- Handle cleanup in useEffect\n" +
      "- Use useCallback for returned functions\n" +
      "- Handle errors gracefully\n" +
      "- Consider TypeScript for better DX\n\n" +
      "**Common Patterns:**\n" +
      "- Data fetching (useApi, useQuery)\n" +
      "- Form handling (useForm, useValidation)\n" +
      "- Local storage (useLocalStorage, useSessionStorage)\n" +
      "- Debouncing (useDebounce, useDebouncedCallback)\n" +
      "- Media queries (useMediaQuery)\n" +
      "- Intersection observer (useIntersectionObserver)",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["custom-hooks", "reusability", "patterns", "best-practices", "composition", "api"],
  },
  {
    id: 20,
    question:
      "What is React Context and when should you use it vs other state management solutions?",
    answer:
      "React Context provides a way to pass data through the component tree without having to pass props down manually at every level. It's React's built-in solution for sharing state across components.\n\n" +
      "**Basic Context Usage:**\n" +
      "```javascript\n" +
      "// Create context\n" +
      "const ThemeContext = createContext();\n\n" +
      "// Provider component\n" +
      "function ThemeProvider({ children }) {\n" +
      "  const [theme, setTheme] = useState('light');\n\n" +
      "  const toggleTheme = useCallback(() => {\n" +
      "    setTheme(prev => prev === 'light' ? 'dark' : 'light');\n" +
      "  }, []);\n\n" +
      "  const value = useMemo(() => ({\n" +
      "    theme,\n" +
      "    toggleTheme\n" +
      "  }), [theme, toggleTheme]);\n\n" +
      "  return (\n" +
      "    <ThemeContext.Provider value={value}>\n" +
      "      {children}\n" +
      "    </ThemeContext.Provider>\n" +
      "  );\n" +
      "}\n\n" +
      "// Custom hook for consuming context\n" +
      "function useTheme() {\n" +
      "  const context = useContext(ThemeContext);\n" +
      "  if (!context) {\n" +
      "    throw new Error('useTheme must be used within ThemeProvider');\n" +
      "  }\n" +
      "  return context;\n" +
      "}\n\n" +
      "// Usage in components\n" +
      "function Header() {\n" +
      "  const { theme, toggleTheme } = useTheme();\n" +
      "  \n" +
      "  return (\n" +
      "    <header className={`header-${theme}`}>\n" +
      "      <button onClick={toggleTheme}>\n" +
      "        Switch to {theme === 'light' ? 'dark' : 'light'} theme\n" +
      "      </button>\n" +
      "    </header>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Multiple Contexts Pattern:**\n" +
      "```javascript\n" +
      "// Separate contexts for different concerns\n" +
      "const UserContext = createContext();\n" +
      "const SettingsContext = createContext();\n" +
      "const NotificationContext = createContext();\n\n" +
      "function App() {\n" +
      "  return (\n" +
      "    <UserProvider>\n" +
      "      <SettingsProvider>\n" +
      "        <NotificationProvider>\n" +
      "          <MainApp />\n" +
      "        </NotificationProvider>\n" +
      "      </SettingsProvider>\n" +
      "    </UserProvider>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use Context:**\n" +
      "- **Theme/UI state** (dark mode, language)\n" +
      "- **User authentication** (user info, permissions)\n" +
      "- **Global settings** (preferences, configuration)\n" +
      "- **Avoiding prop drilling** for deeply nested data\n\n" +
      "**When NOT to Use Context:**\n" +
      "- **Frequently changing data** (causes unnecessary re-renders)\n" +
      "- **Large amounts of state** (use Redux/Zustand instead)\n" +
      "- **Complex state logic** (useReducer or external state manager)\n" +
      "- **Performance-critical components** (consider alternatives)\n\n" +
      "**Context vs Other Solutions:**\n\n" +
      "| Feature | Context | Redux | Zustand | Jotai |\n" +
      "|---------|---------|-------|---------|-------|\n" +
      "| Bundle Size | Built-in | Large | Small | Small |\n" +
      "| Learning Curve | Easy | Steep | Easy | Medium |\n" +
      "| DevTools | Basic | Excellent | Good | Good |\n" +
      "| Performance | Poor for frequent updates | Good | Good | Excellent |\n" +
      "| TypeScript | Good | Excellent | Excellent | Excellent |\n\n" +
      "**Performance Optimization:**\n" +
      "```javascript\n" +
      "// Split context to avoid unnecessary re-renders\n" +
      "const UserStateContext = createContext();\n" +
      "const UserActionsContext = createContext();\n\n" +
      "function UserProvider({ children }) {\n" +
      "  const [user, setUser] = useState(null);\n" +
      "  \n" +
      "  const actions = useMemo(() => ({\n" +
      "    login: (userData) => setUser(userData),\n" +
      "    logout: () => setUser(null),\n" +
      "    updateProfile: (updates) => setUser(prev => ({ ...prev, ...updates }))\n" +
      "  }), []);\n\n" +
      "  return (\n" +
      "    <UserStateContext.Provider value={user}>\n" +
      "      <UserActionsContext.Provider value={actions}>\n" +
      "        {children}\n" +
      "      </UserActionsContext.Provider>\n" +
      "    </UserStateContext.Provider>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Key Takeaways:**\n" +
      "- Use Context for global, rarely changing data\n" +
      "- Split contexts by concern to optimize performance\n" +
      "- Consider external state management for complex apps\n" +
      "- Always provide meaningful error messages for missing providers",
    category: "State Management",
    difficulty: "intermediate",
    tags: [
      "context",
      "state-management",
      "prop-drilling",
      "performance",
      "patterns",
      "global-state",
    ],
  },
  {
    id: 21,
    question: "What are React Error Boundaries? How do you implement and test them?",
    answer:
      "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire app.\n\n" +
      "**Basic Error Boundary:**\n" +
      "```javascript\n" +
      "class ErrorBoundary extends React.Component {\n" +
      "  constructor(props) {\n" +
      "    super(props);\n" +
      "    this.state = { hasError: false, error: null, errorInfo: null };\n" +
      "  }\n\n" +
      "  static getDerivedStateFromError(error) {\n" +
      "    return { hasError: true };\n" +
      "  }\n\n" +
      "  componentDidCatch(error, errorInfo) {\n" +
      "    console.error('Error caught by boundary:', error, errorInfo);\n" +
      "    this.setState({ error, errorInfo });\n" +
      "  }\n\n" +
      "  render() {\n" +
      "    if (this.state.hasError) {\n" +
      "      return (\n" +
      '        <div className="error-boundary">\n' +
      "          <h2>Something went wrong.</h2>\n" +
      "          <button onClick={() => this.setState({ hasError: false })}>\n" +
      "            Try again\n" +
      "          </button>\n" +
      "        </div>\n" +
      "      );\n" +
      "    }\n" +
      "    return this.props.children;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**What Error Boundaries CAN'T Catch:**\n" +
      "- Errors in event handlers\n" +
      "- Errors in async code (setTimeout, promises)\n" +
      "- Errors during server-side rendering\n" +
      "- Errors in the error boundary itself\n\n" +
      "**Best Practices:**\n" +
      "- Place error boundaries strategically\n" +
      "- Always log errors for debugging\n" +
      "- Provide meaningful fallback UI\n" +
      "- Consider recovery mechanisms",
    category: "Error Handling",
    difficulty: "intermediate",
    tags: ["error-boundaries", "error-handling", "testing", "recovery", "logging", "fallback"],
  },
  {
    id: 22,
    question: "What is React's createRoot API? How does it differ from ReactDOM.render?",
    answer:
      "The createRoot API is React 18's new way to render React applications, replacing the legacy ReactDOM.render method. It enables concurrent features and provides better performance.\n\n" +
      "**Legacy ReactDOM.render:**\n" +
      "```javascript\n" +
      "import ReactDOM from 'react-dom';\n" +
      "import App from './App';\n\n" +
      "// Old way (React 17 and earlier)\n" +
      "ReactDOM.render(<App />, document.getElementById('root'));\n" +
      "```\n\n" +
      "**New createRoot API:**\n" +
      "```javascript\n" +
      "import { createRoot } from 'react-dom/client';\n" +
      "import App from './App';\n\n" +
      "// New way (React 18+)\n" +
      "const container = document.getElementById('root');\n" +
      "const root = createRoot(container);\n" +
      "root.render(<App />);\n" +
      "```\n\n" +
      "**Key Benefits:**\n" +
      "- **Concurrent Features**: Automatic batching, Suspense improvements\n" +
      "- **Better Performance**: More efficient rendering\n" +
      "- **Future-Proof**: Enables upcoming React features\n" +
      "- **Cleaner API**: More explicit root management\n\n" +
      "**Automatic Batching Example:**\n" +
      "```javascript\n" +
      "function App() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const [flag, setFlag] = useState(false);\n\n" +
      "  const handleClick = () => {\n" +
      "    // These are automatically batched in React 18\n" +
      "    setCount(c => c + 1);\n" +
      "    setFlag(f => !f);\n" +
      "    // Only one re-render happens\n" +
      "  };\n\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <button onClick={handleClick}>\n" +
      "        Count: {count}, Flag: {flag.toString()}\n" +
      "      </button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```",
    category: "Core Concepts",
    difficulty: "intermediate",
    tags: ["createRoot", "react18", "concurrent", "rendering", "migration", "performance"],
  },
  {
    id: 23,
    question:
      "How do you implement React forms with validation? Compare controlled vs uncontrolled components.",
    answer:
      "React forms can be implemented using controlled or uncontrolled components, each with different trade-offs for validation and user experience.\n\n" +
      "**Controlled Components:**\n" +
      "```javascript\n" +
      "function ContactForm() {\n" +
      "  const [formData, setFormData] = useState({\n" +
      "    name: '',\n" +
      "    email: '',\n" +
      "    message: ''\n" +
      "  });\n" +
      "  const [errors, setErrors] = useState({});\n" +
      "  const [isSubmitting, setIsSubmitting] = useState(false);\n\n" +
      "  const validateForm = () => {\n" +
      "    const newErrors = {};\n" +
      "    \n" +
      "    if (!formData.name.trim()) {\n" +
      "      newErrors.name = 'Name is required';\n" +
      "    }\n" +
      "    \n" +
      "    if (!formData.email.trim()) {\n" +
      "      newErrors.email = 'Email is required';\n" +
      "    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {\n" +
      "      newErrors.email = 'Invalid email format';\n" +
      "    }\n" +
      "    \n" +
      "    if (!formData.message.trim()) {\n" +
      "      newErrors.message = 'Message is required';\n" +
      "    }\n" +
      "    \n" +
      "    setErrors(newErrors);\n" +
      "    return Object.keys(newErrors).length === 0;\n" +
      "  };\n\n" +
      "  const handleChange = (e) => {\n" +
      "    const { name, value } = e.target;\n" +
      "    setFormData(prev => ({\n" +
      "      ...prev,\n" +
      "      [name]: value\n" +
      "    }));\n" +
      "    \n" +
      "    // Clear error when user starts typing\n" +
      "    if (errors[name]) {\n" +
      "      setErrors(prev => ({\n" +
      "        ...prev,\n" +
      "        [name]: ''\n" +
      "      }));\n" +
      "    }\n" +
      "  };\n\n" +
      "  const handleSubmit = async (e) => {\n" +
      "    e.preventDefault();\n" +
      "    \n" +
      "    if (!validateForm()) return;\n" +
      "    \n" +
      "    setIsSubmitting(true);\n" +
      "    try {\n" +
      "      await submitForm(formData);\n" +
      "      // Reset form\n" +
      "      setFormData({ name: '', email: '', message: '' });\n" +
      "    } catch (error) {\n" +
      "      console.error('Submission error:', error);\n" +
      "    } finally {\n" +
      "      setIsSubmitting(false);\n" +
      "    }\n" +
      "  };\n\n" +
      "  return (\n" +
      "    <form onSubmit={handleSubmit}>\n" +
      "      <div>\n" +
      '        <label htmlFor="name">Name:</label>\n' +
      "        <input\n" +
      '          type="text"\n' +
      '          id="name"\n' +
      '          name="name"\n' +
      "          value={formData.name}\n" +
      "          onChange={handleChange}\n" +
      "          className={errors.name ? 'error' : ''}\n" +
      "        />\n" +
      '        {errors.name && <span className="error-message">{errors.name}</span>}\n' +
      "      </div>\n" +
      "      \n" +
      "      <div>\n" +
      '        <label htmlFor="email">Email:</label>\n' +
      "        <input\n" +
      '          type="email"\n' +
      '          id="email"\n' +
      '          name="email"\n' +
      "          value={formData.email}\n" +
      "          onChange={handleChange}\n" +
      "          className={errors.email ? 'error' : ''}\n" +
      "        />\n" +
      '        {errors.email && <span className="error-message">{errors.email}</span>}\n' +
      "      </div>\n" +
      "      \n" +
      "      <div>\n" +
      '        <label htmlFor="message">Message:</label>\n' +
      "        <textarea\n" +
      '          id="message"\n' +
      '          name="message"\n' +
      "          value={formData.message}\n" +
      "          onChange={handleChange}\n" +
      "          className={errors.message ? 'error' : ''}\n" +
      "        />\n" +
      '        {errors.message && <span className="error-message">{errors.message}</span>}\n' +
      "      </div>\n" +
      "      \n" +
      '      <button type="submit" disabled={isSubmitting}>\n' +
      "        {isSubmitting ? 'Submitting...' : 'Submit'}\n" +
      "      </button>\n" +
      "    </form>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Uncontrolled Components with useRef:**\n" +
      "```javascript\n" +
      "function UncontrolledForm() {\n" +
      "  const nameRef = useRef();\n" +
      "  const emailRef = useRef();\n" +
      "  const messageRef = useRef();\n" +
      "  const [errors, setErrors] = useState({});\n\n" +
      "  const validateForm = () => {\n" +
      "    const newErrors = {};\n" +
      "    const name = nameRef.current.value;\n" +
      "    const email = emailRef.current.value;\n" +
      "    const message = messageRef.current.value;\n\n" +
      "    if (!name.trim()) newErrors.name = 'Name is required';\n" +
      "    if (!email.trim()) newErrors.email = 'Email is required';\n" +
      "    if (!message.trim()) newErrors.message = 'Message is required';\n\n" +
      "    setErrors(newErrors);\n" +
      "    return Object.keys(newErrors).length === 0;\n" +
      "  };\n\n" +
      "  const handleSubmit = (e) => {\n" +
      "    e.preventDefault();\n" +
      "    \n" +
      "    if (!validateForm()) return;\n" +
      "    \n" +
      "    const formData = {\n" +
      "      name: nameRef.current.value,\n" +
      "      email: emailRef.current.value,\n" +
      "      message: messageRef.current.value\n" +
      "    };\n" +
      "    \n" +
      "    console.log('Form data:', formData);\n" +
      "  };\n\n" +
      "  return (\n" +
      "    <form onSubmit={handleSubmit}>\n" +
      "      <input\n" +
      "        ref={nameRef}\n" +
      '        type="text"\n' +
      '        placeholder="Name"\n' +
      "        className={errors.name ? 'error' : ''}\n" +
      "      />\n" +
      '      {errors.name && <span className="error-message">{errors.name}</span>}\n' +
      "      \n" +
      "      <input\n" +
      "        ref={emailRef}\n" +
      '        type="email"\n' +
      '        placeholder="Email"\n' +
      "        className={errors.email ? 'error' : ''}\n" +
      "      />\n" +
      '      {errors.email && <span className="error-message">{errors.email}</span>}\n' +
      "      \n" +
      "      <textarea\n" +
      "        ref={messageRef}\n" +
      '        placeholder="Message"\n' +
      "        className={errors.message ? 'error' : ''}\n" +
      "      />\n" +
      '      {errors.message && <span className="error-message">{errors.message}</span>}\n' +
      "      \n" +
      '      <button type="submit">Submit</button>\n' +
      "    </form>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Comparison:**\n\n" +
      "| Feature | Controlled | Uncontrolled |\n" +
      "|---------|------------|--------------|\n" +
      "| State Management | React state | DOM state |\n" +
      "| Validation | Real-time | On submit |\n" +
      "| Performance | More re-renders | Fewer re-renders |\n" +
      "| Form Libraries | Easy integration | Requires refs |\n" +
      "| Testing | Easier to test | Harder to test |\n" +
      "| Accessibility | Better | Requires more work |\n\n" +
      "**Best Practices:**\n" +
      "- Use controlled components for most forms\n" +
      "- Implement real-time validation\n" +
      "- Provide clear error messages\n" +
      "- Consider form libraries (React Hook Form, Formik)\n" +
      "- Test form validation thoroughly",
    category: "Forms",
    difficulty: "intermediate",
    tags: ["forms", "validation", "controlled", "uncontrolled", "refs", "best-practices"],
  },
  {
    id: 24,
    question: "What is React Testing Library? How do you test React components effectively?",
    answer:
      "React Testing Library (RTL) is a testing utility that encourages testing components the way users interact with them, focusing on behavior rather than implementation details.\n\n" +
      "**Core Principles:**\n" +
      "- Test behavior, not implementation\n" +
      "- Query elements like users would\n" +
      "- Avoid testing internal state\n" +
      "- Focus on accessibility\n\n" +
      "**Basic Testing Example:**\n" +
      "```javascript\n" +
      "import { render, screen, fireEvent, waitFor } from '@testing-library/react';\n" +
      "import userEvent from '@testing-library/user-event';\n" +
      "import Counter from './Counter';\n\n" +
      "test('increments counter when button is clicked', async () => {\n" +
      "  const user = userEvent.setup();\n" +
      "  render(<Counter />);\n" +
      "  \n" +
      "  const button = screen.getByRole('button', { name: /increment/i });\n" +
      "  const count = screen.getByText('Count: 0');\n" +
      "  \n" +
      "  expect(count).toBeInTheDocument();\n" +
      "  \n" +
      "  await user.click(button);\n" +
      "  \n" +
      "  expect(screen.getByText('Count: 1')).toBeInTheDocument();\n" +
      "});\n" +
      "```\n\n" +
      "**Query Priority (Best to Worst):**\n" +
      "1. **getByRole** - Most accessible\n" +
      "2. **getByLabelText** - Form inputs\n" +
      "3. **getByPlaceholderText** - Input placeholders\n" +
      "4. **getByText** - Text content\n" +
      "5. **getByDisplayValue** - Form values\n" +
      "6. **getByAltText** - Images\n" +
      "7. **getByTitle** - Title attributes\n" +
      "8. **getByTestId** - Last resort\n\n" +
      "**Testing Async Operations:**\n" +
      "```javascript\n" +
      "test('loads user data on mount', async () => {\n" +
      "  const mockFetch = jest.fn().mockResolvedValue({\n" +
      "    json: () => Promise.resolve({ name: 'John Doe' })\n" +
      "  });\n" +
      "  global.fetch = mockFetch;\n\n" +
      "  render(<UserProfile userId={123} />);\n" +
      "  \n" +
      "  expect(screen.getByText('Loading...')).toBeInTheDocument();\n" +
      "  \n" +
      "  await waitFor(() => {\n" +
      "    expect(screen.getByText('John Doe')).toBeInTheDocument();\n" +
      "  });\n" +
      "  \n" +
      "  expect(mockFetch).toHaveBeenCalledWith('/api/users/123');\n" +
      "});\n" +
      "```\n\n" +
      "**Testing Forms:**\n" +
      "```javascript\n" +
      "test('submits form with valid data', async () => {\n" +
      "  const user = userEvent.setup();\n" +
      "  const mockSubmit = jest.fn();\n" +
      "  \n" +
      "  render(<ContactForm onSubmit={mockSubmit} />);\n" +
      "  \n" +
      "  await user.type(screen.getByLabelText(/name/i), 'John Doe');\n" +
      "  await user.type(screen.getByLabelText(/email/i), 'john@example.com');\n" +
      "  await user.type(screen.getByLabelText(/message/i), 'Hello world');\n" +
      "  \n" +
      "  await user.click(screen.getByRole('button', { name: /submit/i }));\n" +
      "  \n" +
      "  expect(mockSubmit).toHaveBeenCalledWith({\n" +
      "    name: 'John Doe',\n" +
      "    email: 'john@example.com',\n" +
      "    message: 'Hello world'\n" +
      "  });\n" +
      "});\n" +
      "```\n\n" +
      "**Testing Custom Hooks:**\n" +
      "```javascript\n" +
      "import { renderHook, act } from '@testing-library/react';\n" +
      "import { useCounter } from './useCounter';\n\n" +
      "test('useCounter hook', () => {\n" +
      "  const { result } = renderHook(() => useCounter(0));\n" +
      "  \n" +
      "  expect(result.current.count).toBe(0);\n" +
      "  \n" +
      "  act(() => {\n" +
      "    result.current.increment();\n" +
      "  });\n" +
      "  \n" +
      "  expect(result.current.count).toBe(1);\n" +
      "});\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use semantic queries (getByRole, getByLabelText)\n" +
      "- Test user interactions, not implementation\n" +
      "- Use userEvent over fireEvent\n" +
      "- Mock external dependencies\n" +
      "- Test error states and edge cases\n" +
      "- Keep tests simple and focused",
    category: "Testing",
    difficulty: "intermediate",
    tags: ["testing", "rtl", "jest", "user-event", "accessibility", "best-practices"],
  },
  {
    id: 25,
    question:
      "What are React's built-in hooks? Explain useCallback, useMemo, and useRef in detail.",
    answer:
      "React provides several built-in hooks for different purposes. Understanding when and how to use them is crucial for writing efficient React applications.\n\n" +
      "**useCallback - Memoizing Functions:**\n" +
      "```javascript\n" +
      "function Parent() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const [items, setItems] = useState([]);\n\n" +
      "  // Without useCallback - creates new function every render\n" +
      "  const handleAddItem = useCallback((item) => {\n" +
      "    setItems(prev => [...prev, item]);\n" +
      "  }, []); // Empty dependency array - function never changes\n\n" +
      "  // With dependencies - function changes when deps change\n" +
      "  const handleFilterItems = useCallback((filter) => {\n" +
      "    return items.filter(item => item.category === filter);\n" +
      "  }, [items]); // Function changes when items change\n\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <button onClick={() => setCount(c => c + 1)}>\n" +
      "        Count: {count}\n" +
      "      </button>\n" +
      "      <ItemList items={items} onAddItem={handleAddItem} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n\n" +
      "const ItemList = React.memo(function ItemList({ items, onAddItem }) {\n" +
      "  console.log('ItemList rendered');\n" +
      "  return (\n" +
      "    <div>\n" +
      "      {items.map(item => <Item key={item.id} item={item} />)}\n" +
      "      <button onClick={() => onAddItem({ id: Date.now(), name: 'New' })}>\n" +
      "        Add Item\n" +
      "      </button>\n" +
      "    </div>\n" +
      "  );\n" +
      "});\n" +
      "```\n\n" +
      "**useMemo - Memoizing Values:**\n" +
      "```javascript\n" +
      "function ExpensiveComponent({ items, filter }) {\n" +
      "  // Expensive calculation - only runs when items or filter change\n" +
      "  const filteredItems = useMemo(() => {\n" +
      "    console.log('Filtering items...');\n" +
      "    return items.filter(item => {\n" +
      "      return item.name.toLowerCase().includes(filter.toLowerCase());\n" +
      "    });\n" +
      "  }, [items, filter]);\n\n" +
      "  // Another expensive calculation\n" +
      "  const sortedItems = useMemo(() => {\n" +
      "    console.log('Sorting items...');\n" +
      "    return [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));\n" +
      "  }, [filteredItems]);\n\n" +
      "  return (\n" +
      "    <ul>\n" +
      "      {sortedItems.map(item => (\n" +
      "        <li key={item.id}>{item.name}</li>\n" +
      "      ))}\n" +
      "    </ul>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**useRef - Mutable References:**\n" +
      "```javascript\n" +
      "function RefExamples() {\n" +
      "  // 1. DOM element reference\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  // 2. Mutable value that doesn't trigger re-renders\n" +
      "  const renderCount = useRef(0);\n" +
      "  const previousValue = useRef();\n" +
      "  \n" +
      "  // 3. Timer reference\n" +
      "  const timerRef = useRef();\n" +
      "  \n" +
      "  const [value, setValue] = useState('');\n" +
      "  \n" +
      "  // Track render count\n" +
      "  renderCount.current += 1;\n" +
      "  \n" +
      "  // Store previous value\n" +
      "  useEffect(() => {\n" +
      "    previousValue.current = value;\n" +
      "  });\n" +
      "  \n" +
      "  const focusInput = () => {\n" +
      "    inputRef.current.focus();\n" +
      "  };\n" +
      "  \n" +
      "  const startTimer = () => {\n" +
      "    timerRef.current = setInterval(() => {\n" +
      "      console.log('Timer tick');\n" +
      "    }, 1000);\n" +
      "  };\n" +
      "  \n" +
      "  const stopTimer = () => {\n" +
      "    if (timerRef.current) {\n" +
      "      clearInterval(timerRef.current);\n" +
      "    }\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input\n" +
      "        ref={inputRef}\n" +
      "        value={value}\n" +
      "        onChange={(e) => setValue(e.target.value)}\n" +
      '        placeholder="Type something"\n' +
      "      />\n" +
      "      <button onClick={focusInput}>Focus Input</button>\n" +
      "      <button onClick={startTimer}>Start Timer</button>\n" +
      "      <button onClick={stopTimer}>Stop Timer</button>\n" +
      "      <p>Current: {value}</p>\n" +
      "      <p>Previous: {previousValue.current}</p>\n" +
      "      <p>Renders: {renderCount.current}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use Each Hook:**\n\n" +
      "**useCallback:**\n" +
      "- Passing functions to memoized components\n" +
      "- Functions used in useEffect dependencies\n" +
      "- Event handlers passed to child components\n\n" +
      "**useMemo:**\n" +
      "- Expensive calculations\n" +
      "- Creating objects/arrays that are dependencies\n" +
      "- Filtering/sorting large datasets\n\n" +
      "**useRef:**\n" +
      "- DOM element references\n" +
      "- Storing mutable values that don't trigger re-renders\n" +
      "- Timer/interval references\n" +
      "- Previous value tracking\n\n" +
      "**Common Pitfalls:**\n" +
      "- Overusing useCallback/useMemo (measure first!)\n" +
      "- Missing dependencies in dependency arrays\n" +
      "- Using useRef for values that should trigger re-renders\n" +
      "- Not cleaning up refs in useEffect cleanup",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["hooks", "useCallback", "useMemo", "useRef", "optimization", "performance"],
  },
  {
    id: 26,
    question:
      "What is React Router? How do you implement client-side routing in React applications?",
    answer:
      "React Router is the standard routing library for React applications. It enables client-side routing, allowing you to create single-page applications with navigation that doesn't require full page reloads.\n\n" +
      "**Basic Setup:**\n" +
      "```javascript\n" +
      "import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\n\n" +
      "function App() {\n" +
      "  return (\n" +
      "    <BrowserRouter>\n" +
      "      <nav>\n" +
      '        <Link to="/">Home</Link>\n' +
      '        <Link to="/about">About</Link>\n' +
      '        <Link to="/contact">Contact</Link>\n' +
      "      </nav>\n" +
      "      \n" +
      "      <Routes>\n" +
      '        <Route path="/" element={<Home />} />\n' +
      '        <Route path="/about" element={<About />} />\n' +
      '        <Route path="/contact" element={<Contact />} />\n' +
      '        <Route path="*" element={<NotFound />} />\n' +
      "      </Routes>\n" +
      "    </BrowserRouter>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Dynamic Routes:**\n" +
      "```javascript\n" +
      "import { useParams, useNavigate } from 'react-router-dom';\n\n" +
      "function App() {\n" +
      "  return (\n" +
      "    <BrowserRouter>\n" +
      "      <Routes>\n" +
      '        <Route path="/users" element={<UserList />} />\n' +
      '        <Route path="/users/:id" element={<UserProfile />} />\n' +
      '        <Route path="/users/:id/posts" element={<UserPosts />} />\n' +
      "      </Routes>\n" +
      "    </BrowserRouter>\n" +
      "  );\n" +
      "}\n\n" +
      "function UserProfile() {\n" +
      "  const { id } = useParams();\n" +
      "  const navigate = useNavigate();\n" +
      "  \n" +
      "  const handleGoBack = () => {\n" +
      "    navigate(-1); // Go back one step\n" +
      "  };\n" +
      "  \n" +
      "  const handleEdit = () => {\n" +
      "    navigate(`/users/${id}/edit`);\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>User Profile: {id}</h1>\n" +
      "      <button onClick={handleGoBack}>Back</button>\n" +
      "      <button onClick={handleEdit}>Edit</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Nested Routes:**\n" +
      "```javascript\n" +
      "function App() {\n" +
      "  return (\n" +
      "    <BrowserRouter>\n" +
      "      <Routes>\n" +
      '        <Route path="/dashboard" element={<Dashboard />}>\n' +
      "          <Route index element={<DashboardHome />} />\n" +
      '          <Route path="settings" element={<Settings />} />\n' +
      '          <Route path="profile" element={<Profile />} />\n' +
      "        </Route>\n" +
      "      </Routes>\n" +
      "    </BrowserRouter>\n" +
      "  );\n" +
      "}\n\n" +
      "function Dashboard() {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>Dashboard</h1>\n" +
      "      <nav>\n" +
      '        <Link to="/dashboard">Home</Link>\n' +
      '        <Link to="/dashboard/settings">Settings</Link>\n' +
      '        <Link to="/dashboard/profile">Profile</Link>\n' +
      "      </nav>\n" +
      "      <Outlet /> {/* Renders child routes */}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Protected Routes:**\n" +
      "```javascript\n" +
      "import { Navigate } from 'react-router-dom';\n\n" +
      "function ProtectedRoute({ children }) {\n" +
      "  const isAuthenticated = useAuth();\n" +
      "  \n" +
      '  return isAuthenticated ? children : <Navigate to="/login" replace />;\n' +
      "}\n\n" +
      "function App() {\n" +
      "  return (\n" +
      "    <BrowserRouter>\n" +
      "      <Routes>\n" +
      '        <Route path="/login" element={<Login />} />\n' +
      "        <Route \n" +
      '          path="/dashboard" \n' +
      "          element={\n" +
      "            <ProtectedRoute>\n" +
      "              <Dashboard />\n" +
      "            </ProtectedRoute>\n" +
      "          } \n" +
      "        />\n" +
      "      </Routes>\n" +
      "    </BrowserRouter>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Programmatic Navigation:**\n" +
      "```javascript\n" +
      "import { useNavigate, useLocation } from 'react-router-dom';\n\n" +
      "function LoginForm() {\n" +
      "  const navigate = useNavigate();\n" +
      "  const location = useLocation();\n" +
      "  \n" +
      "  const handleLogin = async (credentials) => {\n" +
      "    try {\n" +
      "      await login(credentials);\n" +
      "      \n" +
      "      // Redirect to intended page or dashboard\n" +
      "      const from = location.state?.from?.pathname || '/dashboard';\n" +
      "      navigate(from, { replace: true });\n" +
      "    } catch (error) {\n" +
      "      console.error('Login failed:', error);\n" +
      "    }\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <form onSubmit={handleLogin}>\n" +
      "      {/* Form fields */}\n" +
      "    </form>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**URL Parameters and Search:**\n" +
      "```javascript\n" +
      "import { useSearchParams } from 'react-router-dom';\n\n" +
      "function ProductList() {\n" +
      "  const [searchParams, setSearchParams] = useSearchParams();\n" +
      "  const category = searchParams.get('category');\n" +
      "  const page = searchParams.get('page') || '1';\n" +
      "  \n" +
      "  const updateFilters = (newFilters) => {\n" +
      "    setSearchParams(prev => {\n" +
      "      const newParams = new URLSearchParams(prev);\n" +
      "      Object.entries(newFilters).forEach(([key, value]) => {\n" +
      "        if (value) {\n" +
      "          newParams.set(key, value);\n" +
      "        } else {\n" +
      "          newParams.delete(key);\n" +
      "        }\n" +
      "      });\n" +
      "      return newParams;\n" +
      "    });\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>Products</h1>\n" +
      "      <p>Category: {category || 'All'}</p>\n" +
      "      <p>Page: {page}</p>\n" +
      "      <button onClick={() => updateFilters({ category: 'electronics' })}>\n" +
      "        Filter Electronics\n" +
      "      </button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Key Features:**\n" +
      "- Client-side routing without page reloads\n" +
      "- Dynamic route parameters\n" +
      "- Nested routing support\n" +
      "- Programmatic navigation\n" +
      "- URL state management\n" +
      "- Route protection and guards\n\n" +
      "**Best Practices:**\n" +
      "- Use semantic route names\n" +
      "- Implement route protection\n" +
      "- Handle 404 cases\n" +
      "- Use relative navigation when possible\n" +
      "- Consider code splitting with lazy loading",
    category: "Routing",
    difficulty: "intermediate",
    tags: ["routing", "react-router", "navigation", "spa", "url", "programmatic"],
  },
  {
    id: 27,
    question: "What are React Portals? How do you use them and when should you use them?",
    answer:
      "React Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. This is useful for modals, tooltips, dropdowns, and other UI elements that need to break out of their parent's container.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { createPortal } from 'react-dom';\n" +
      "\n" +
      "function Modal({ children, isOpen }) {\n" +
      "  if (!isOpen) return null;\n" +
      "  \n" +
      "  return createPortal(\n" +
      "    <div className='modal-overlay'>\n" +
      "      <div className='modal-content'>\n" +
      "        {children}\n" +
      "      </div>\n" +
      "    </div>,\n" +
      "    document.body // Render into body, not parent component\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Portal Implementation:**\n" +
      "```javascript\n" +
      "// Custom hook for portal management\n" +
      "function usePortal(containerId = 'portal-root') {\n" +
      "  const [container, setContainer] = useState(null);\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    let element = document.getElementById(containerId);\n" +
      "    \n" +
      "    if (!element) {\n" +
      "      element = document.createElement('div');\n" +
      "      element.id = containerId;\n" +
      "      element.style.position = 'relative';\n" +
      "      element.style.zIndex = '1000';\n" +
      "      document.body.appendChild(element);\n" +
      "    }\n" +
      "    \n" +
      "    setContainer(element);\n" +
      "    \n" +
      "    return () => {\n" +
      "      if (element && element.parentNode) {\n" +
      "        element.parentNode.removeChild(element);\n" +
      "      }\n" +
      "    };\n" +
      "  }, [containerId]);\n" +
      "  \n" +
      "  return container;\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use Portals:**\n" +
      "- **Modals and Dialogs**: Break out of parent container constraints\n" +
      "- **Tooltips**: Position relative to viewport, not parent\n" +
      "- **Dropdowns**: Avoid overflow issues with parent containers\n" +
      "- **Loading Overlays**: Cover entire screen\n" +
      "- **Notifications**: Global positioning\n\n" +
      "**Benefits:**\n" +
      "- Escape CSS containment (overflow: hidden, z-index stacking)\n" +
      "- Maintain React component hierarchy and event bubbling\n" +
      "- Clean separation of concerns\n" +
      "- Better accessibility (focus management)",
    category: "Advanced",
    difficulty: "intermediate",
    tags: ["portals", "dom", "modals", "advanced", "rendering"],
  },
  {
    id: 28,
    question:
      "Explain React's reconciliation algorithm in detail. How does React decide which components to update?",
    answer:
      "React's reconciliation is the process of determining what changes need to be made to the DOM when the component tree changes. It's based on a heuristic algorithm that assumes two elements of different types will produce different trees.\n\n" +
      "**The Diffing Algorithm:**\n\n" +
      "1. **Different Root Elements**: If root elements have different types, React tears down the old tree and builds a new one.\n" +
      "2. **Same Element Types**: React compares attributes and only updates changed attributes.\n" +
      "3. **Component Elements**: React updates the component instance (same props = no re-render).\n\n" +
      "**Key Reconciliation Strategies:**\n" +
      "```javascript\n" +
      "// Keys help React identify which items have changed\n" +
      "function TodoList({ todos }) {\n" +
      "  return (\n" +
      "    <ul>\n" +
      "      {todos.map(todo => (\n" +
      "        <TodoItem \n" +
      "          key={todo.id} // Key helps React track items\n" +
      "          todo={todo} \n" +
      "        />\n" +
      "      ))}\n" +
      "    </ul>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Optimizations:**\n" +
      "- Use stable keys for list items\n" +
      "- Avoid creating objects/functions in render\n" +
      "- Use React.memo for expensive components\n" +
      "- Use useMemo/useCallback for expensive calculations",
    category: "Core Concepts",
    difficulty: "advanced",
    tags: ["reconciliation", "diffing", "performance", "virtual-dom", "optimization"],
  },
  {
    id: 29,
    question: "What is React Fiber? How does it improve React's performance and user experience?",
    answer:
      "React Fiber is React's reconciliation engine, introduced in React 16. It's a complete rewrite of React's core algorithm that enables incremental rendering, allowing React to split work into chunks and prioritize updates.\n\n" +
      "**Key Features of Fiber:**\n\n" +
      "1. **Incremental Rendering**: Work can be split into chunks and spread across multiple frames\n" +
      "2. **Priority-based Updates**: High-priority updates (user input) interrupt low-priority updates\n" +
      "3. **Pause and Resume**: Work can be paused, aborted, or reused as priorities change\n" +
      "4. **Concurrent Features**: Enables features like Suspense and concurrent rendering\n\n" +
      "**How Fiber Works:**\n" +
      "```javascript\n" +
      "// Fiber represents each component as a fiber node\n" +
      "const fiberNode = {\n" +
      "  type: 'div',\n" +
      "  props: { className: 'container' },\n" +
      "  child: childFiber,\n" +
      "  sibling: siblingFiber,\n" +
      "  return: parentFiber,\n" +
      "  alternate: previousFiber, // For diffing\n" +
      "  effectTag: 'UPDATE', // What needs to be done\n" +
      "  expirationTime: 1000, // Priority\n" +
      "};\n" +
      "```\n\n" +
      "**Priority Levels:**\n" +
      "- **Synchronous**: Immediate (dangerous operations)\n" +
      "- **Task**: User interactions (clicks, input)\n" +
      "- **Normal**: Default priority\n" +
      "- **Low**: Data fetching, analytics\n" +
      "- **Idle**: Background work\n\n" +
      "**Benefits:**\n" +
      "- Better perceived performance\n" +
      "- Smoother animations\n" +
      "- More responsive user interface\n" +
      "- Enables concurrent features",
    category: "Core Concepts",
    difficulty: "advanced",
    tags: ["fiber", "concurrent", "performance", "scheduling", "architecture"],
  },
  {
    id: 30,
    question: "What are React Server Components? How do they differ from regular React components?",
    answer:
      "React Server Components (RSC) are a new type of component that run on the server and can be rendered to HTML before being sent to the client. They enable better performance by reducing the JavaScript bundle size and allowing direct access to server-side resources.\n\n" +
      "**Key Differences:**\n\n" +
      "**Server Components:**\n" +
      "- Run on the server during build time or request time\n" +
      "- Can directly access databases, file systems, and server APIs\n" +
      "- Don't include JavaScript in the client bundle\n" +
      "- Can't use browser-only APIs or event handlers\n" +
      "- Can't use state or effects\n\n" +
      "**Client Components:**\n" +
      "- Run in the browser\n" +
      "- Can use state, effects, and event handlers\n" +
      "- Include JavaScript in the client bundle\n" +
      "- Can access browser APIs\n\n" +
      "**Example Implementation:**\n" +
      "```javascript\n" +
      "// Server Component (no 'use client' directive)\n" +
      "async function BlogPost({ id }) {\n" +
      "  // Direct database access on server\n" +
      "  const post = await db.posts.findById(id);\n" +
      "  const comments = await db.comments.findByPostId(id);\n" +
      "  \n" +
      "  return (\n" +
      "    <article>\n" +
      "      <h1>{post.title}</h1>\n" +
      "      <p>{post.content}</p>\n" +
      "      <CommentsList comments={comments} />\n" +
      "    </article>\n" +
      "  );\n" +
      "}\n\n" +
      "// Client Component (with 'use client' directive)\n" +
      "'use client';\n" +
      "function CommentsList({ comments }) {\n" +
      "  const [newComment, setNewComment] = useState('');\n" +
      "  \n" +
      "  const handleSubmit = async (e) => {\n" +
      "    e.preventDefault();\n" +
      "    // Handle form submission\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      {comments.map(comment => (\n" +
      "        <div key={comment.id}>{comment.text}</div>\n" +
      "      ))}\n" +
      "      <form onSubmit={handleSubmit}>\n" +
      "        <input \n" +
      "          value={newComment}\n" +
      "          onChange={(e) => setNewComment(e.target.value)}\n" +
      "        />\n" +
      "        <button type='submit'>Add Comment</button>\n" +
      "      </form>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Smaller JavaScript bundles\n" +
      "- Better performance\n" +
      "- Direct server resource access\n" +
      "- Improved SEO\n" +
      "- Reduced client-side complexity",
    category: "Advanced",
    difficulty: "advanced",
    tags: ["server-components", "rsc", "nextjs", "performance", "architecture"],
  },
  {
    id: 31,
    question:
      "Explain React's Concurrent Features: startTransition, useDeferredValue, and useTransition.",
    answer:
      "React's concurrent features allow you to mark updates as non-urgent, enabling React to interrupt them if more urgent updates come in. This improves user experience by keeping the UI responsive.\n\n" +
      "**startTransition:**\n" +
      "Marks state updates as transitions (non-urgent).\n" +
      "```javascript\n" +
      "import { startTransition, useState } from 'react';\n\n" +
      "function SearchResults({ query }) {\n" +
      "  const [isPending, startTransition] = useTransition();\n" +
      "  const [results, setResults] = useState([]);\n" +
      "  \n" +
      "  const handleSearch = (newQuery) => {\n" +
      "    // Urgent: Update input immediately\n" +
      "    setQuery(newQuery);\n" +
      "    \n" +
      "    // Non-urgent: Mark search as transition\n" +
      "    startTransition(() => {\n" +
      "      setResults(searchResults(newQuery));\n" +
      "    });\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input \n" +
      "        value={query}\n" +
      "        onChange={(e) => handleSearch(e.target.value)}\n" +
      "      />\n" +
      "      {isPending && <div>Searching...</div>}\n" +
      "      <ResultsList results={results} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**useDeferredValue:**\n" +
      "Defers updating a value until more urgent updates are complete.\n" +
      "```javascript\n" +
      "import { useDeferredValue, useMemo } from 'react';\n\n" +
      "function ProductList({ products, filter }) {\n" +
      "  const deferredFilter = useDeferredValue(filter);\n" +
      "  \n" +
      "  const filteredProducts = useMemo(() => {\n" +
      "    return products.filter(product => \n" +
      "      product.name.includes(deferredFilter)\n" +
      "    );\n" +
      "  }, [products, deferredFilter]);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      {filteredProducts.map(product => (\n" +
      "        <ProductCard key={product.id} product={product} />\n" +
      "      ))}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**useTransition:**\n" +
      "Returns a boolean indicating if a transition is pending.\n" +
      "```javascript\n" +
      "function App() {\n" +
      "  const [isPending, startTransition] = useTransition();\n" +
      "  const [tab, setTab] = useState('home');\n" +
      "  \n" +
      "  const handleTabChange = (newTab) => {\n" +
      "    startTransition(() => {\n" +
      "      setTab(newTab);\n" +
      "    });\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <nav>\n" +
      "        <button onClick={() => handleTabChange('home')}>Home</button>\n" +
      "        <button onClick={() => handleTabChange('about')}>About</button>\n" +
      "      </nav>\n" +
      "      {isPending && <div>Loading...</div>}\n" +
      "      <TabContent tab={tab} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- Large list filtering/sorting\n" +
      "- Search results\n" +
      "- Tab switching\n" +
      "- Any non-critical UI updates\n\n" +
      "**Benefits:**\n" +
      "- Keeps UI responsive\n" +
      "- Prevents blocking user interactions\n" +
      "- Better perceived performance",
    category: "Concurrent Features",
    difficulty: "advanced",
    tags: ["concurrent", "startTransition", "useDeferredValue", "useTransition", "performance"],
  },
  {
    id: 32,
    question: "What is React's useId hook? How and when should you use it?",
    answer:
      "useId is a React hook that generates unique IDs that are stable across server and client rendering. It's primarily used for accessibility attributes like htmlFor and id, ensuring they match correctly.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useId } from 'react';\n\n" +
      "function FormField({ label, type = 'text' }) {\n" +
      "  const id = useId();\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <label htmlFor={id}>{label}</label>\n" +
      "      <input id={id} type={type} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage:**\n" +
      "```javascript\n" +
      "function Accordion({ items }) {\n" +
      "  const baseId = useId();\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      {items.map((item, index) => {\n" +
      "        const headerId = `${baseId}-header-${index}`;\n" +
      "        const panelId = `${baseId}-panel-${index}`;\n" +
      "        \n" +
      "        return (\n" +
      "          <div key={index}>\n" +
      "            <button \n" +
      "              id={headerId}\n" +
      "              aria-expanded={item.isOpen}\n" +
      "              aria-controls={panelId}\n" +
      "            >\n" +
      "              {item.title}\n" +
      "            </button>\n" +
      "            <div \n" +
      "              id={panelId}\n" +
      "              role='region'\n" +
      "              aria-labelledby={headerId}\n" +
      "            >\n" +
      "              {item.content}\n" +
      "            </div>\n" +
      "          </div>\n" +
      "        );\n" +
      "      })}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Key Benefits:**\n" +
      "- Stable across server/client rendering\n" +
      "- No hydration mismatches\n" +
      "- Unique within component tree\n" +
      "- Perfect for accessibility attributes\n\n" +
      "**When to Use:**\n" +
      "- Form labels and inputs\n" +
      "- ARIA attributes\n" +
      "- Any element that needs a unique ID\n" +
      "- Server-side rendering scenarios",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useId", "accessibility", "ssr", "hydration", "forms"],
  },
  {
    id: 33,
    question: "Explain React's useImperativeHandle hook. When and how should you use it?",
    answer:
      "useImperativeHandle allows you to customize the instance value that is exposed to parent components when using ref. It's used to expose specific methods or properties from a child component to its parent.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { forwardRef, useImperativeHandle, useRef } from 'react';\n\n" +
      "const FancyInput = forwardRef((props, ref) => {\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  useImperativeHandle(ref, () => ({\n" +
      "    focus: () => {\n" +
      "      inputRef.current.focus();\n" +
      "    },\n" +
      "    clear: () => {\n" +
      "      inputRef.current.value = '';\n" +
      "    },\n" +
      "    getValue: () => {\n" +
      "      return inputRef.current.value;\n" +
      "    }\n" +
      "  }));\n" +
      "  \n" +
      "  return <input ref={inputRef} {...props} />;\n" +
      "});\n\n" +
      "// Usage in parent component\n" +
      "function App() {\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  const handleFocus = () => {\n" +
      "    inputRef.current.focus();\n" +
      "  };\n" +
      "  \n" +
      "  const handleClear = () => {\n" +
      "    inputRef.current.clear();\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <FancyInput ref={inputRef} />\n" +
      "      <button onClick={handleFocus}>Focus</button>\n" +
      "      <button onClick={handleClear}>Clear</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with Dependencies:**\n" +
      "```javascript\n" +
      "const VideoPlayer = forwardRef(({ src, autoplay }, ref) => {\n" +
      "  const videoRef = useRef();\n" +
      "  const [isPlaying, setIsPlaying] = useState(false);\n" +
      "  \n" +
      "  useImperativeHandle(ref, () => ({\n" +
      "    play: () => {\n" +
      "      videoRef.current.play();\n" +
      "      setIsPlaying(true);\n" +
      "    },\n" +
      "    pause: () => {\n" +
      "      videoRef.current.pause();\n" +
      "      setIsPlaying(false);\n" +
      "    },\n" +
      "    getCurrentTime: () => videoRef.current.currentTime,\n" +
      "    setCurrentTime: (time) => {\n" +
      "      videoRef.current.currentTime = time;\n" +
      "    },\n" +
      "    isPlaying: () => isPlaying\n" +
      "  }), [isPlaying]); // Re-create when isPlaying changes\n" +
      "  \n" +
      "  return (\n" +
      "    <video \n" +
      "      ref={videoRef} \n" +
      "      src={src} \n" +
      "      autoPlay={autoplay}\n" +
      "      onPlay={() => setIsPlaying(true)}\n" +
      "      onPause={() => setIsPlaying(false)}\n" +
      "    />\n" +
      "  );\n" +
      "});\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- Exposing imperative APIs (focus, scroll, play/pause)\n" +
      "- Third-party library integration\n" +
      "- Complex component interactions\n" +
      "- When declarative props aren't sufficient\n\n" +
      "**Best Practices:**\n" +
      "- Use sparingly (prefer declarative patterns)\n" +
      "- Keep the exposed API minimal\n" +
      "- Document the imperative API\n" +
      "- Consider if the functionality could be achieved declaratively",
    category: "Hooks",
    difficulty: "advanced",
    tags: ["useImperativeHandle", "refs", "forwardRef", "imperative", "api"],
  },
  {
    id: 34,
    question: "What is React's useLayoutEffect hook? How does it differ from useEffect?",
    answer:
      "useLayoutEffect is identical to useEffect, but it fires synchronously after all DOM mutations but before the browser paints. This makes it perfect for DOM measurements and synchronous updates.\n\n" +
      "**Key Differences:**\n\n" +
      "**useEffect:**\n" +
      "- Runs asynchronously after render\n" +
      "- Doesn't block browser painting\n" +
      "- Good for side effects, data fetching, subscriptions\n\n" +
      "**useLayoutEffect:**\n" +
      "- Runs synchronously after DOM mutations\n" +
      "- Blocks browser painting until it completes\n" +
      "- Good for DOM measurements and synchronous updates\n\n" +
      "**Example: DOM Measurements:**\n" +
      "```javascript\n" +
      "function Tooltip({ children, content }) {\n" +
      "  const [position, setPosition] = useState({ top: 0, left: 0 });\n" +
      "  const tooltipRef = useRef();\n" +
      "  const triggerRef = useRef();\n" +
      "  \n" +
      "  useLayoutEffect(() => {\n" +
      "    if (tooltipRef.current && triggerRef.current) {\n" +
      "      const triggerRect = triggerRef.current.getBoundingClientRect();\n" +
      "      const tooltipRect = tooltipRef.current.getBoundingClientRect();\n" +
      "      \n" +
      "      setPosition({\n" +
      "        top: triggerRect.bottom + 8,\n" +
      "        left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2\n" +
      "      });\n" +
      "    }\n" +
      "  }, [content]);\n" +
      "  \n" +
      "  return (\n" +
      "    <>\n" +
      "      <div ref={triggerRef}>{children}</div>\n" +
      "      <div \n" +
      "        ref={tooltipRef}\n" +
      "        style={{\n" +
      "          position: 'absolute',\n" +
      "          top: position.top,\n" +
      "          left: position.left,\n" +
      "          backgroundColor: 'black',\n" +
      "          color: 'white',\n" +
      "          padding: '4px 8px',\n" +
      "          borderRadius: '4px'\n" +
      "        }}\n" +
      "      >\n" +
      "        {content}\n" +
      "      </div>\n" +
      "    </>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Example: Synchronous Updates:**\n" +
      "```javascript\n" +
      "function ScrollToTop({ shouldScroll }) {\n" +
      "  useLayoutEffect(() => {\n" +
      "    if (shouldScroll) {\n" +
      "      window.scrollTo(0, 0);\n" +
      "    }\n" +
      "  }, [shouldScroll]);\n" +
      "  \n" +
      "  return null;\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use useLayoutEffect:**\n" +
      "- DOM measurements (getBoundingClientRect, offsetWidth, etc.)\n" +
      "- Synchronous DOM updates\n" +
      "- Preventing visual flicker\n" +
      "- Scrolling or focusing elements\n\n" +
      "**Performance Considerations:**\n" +
      "- Can cause performance issues if overused\n" +
      "- Blocks browser painting\n" +
      "- Use sparingly\n" +
      "- Prefer useEffect when possible",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useLayoutEffect", "dom", "measurements", "synchronous", "performance"],
  },
  {
    id: 35,
    question: "Explain React's useDebugValue hook. How is it used for custom hook debugging?",
    answer:
      "useDebugValue is a hook that allows you to display a label for custom hooks in React DevTools. It helps with debugging by showing meaningful information about the hook's state.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useState, useDebugValue } from 'react';\n\n" +
      "function useCounter(initialValue = 0) {\n" +
      "  const [count, setCount] = useState(initialValue);\n" +
      "  \n" +
      "  useDebugValue(count); // Shows count value in DevTools\n" +
      "  \n" +
      "  const increment = () => setCount(c => c + 1);\n" +
      "  const decrement = () => setCount(c => c - 1);\n" +
      "  \n" +
      "  return { count, increment, decrement };\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with Formatter:**\n" +
      "```javascript\n" +
      "function useLocalStorage(key, initialValue) {\n" +
      "  const [storedValue, setStoredValue] = useState(() => {\n" +
      "    try {\n" +
      "      const item = window.localStorage.getItem(key);\n" +
      "      return item ? JSON.parse(item) : initialValue;\n" +
      "    } catch (error) {\n" +
      "      return initialValue;\n" +
      "    }\n" +
      "  });\n" +
      "  \n" +
      "  const setValue = (value) => {\n" +
      "    try {\n" +
      "      setStoredValue(value);\n" +
      "      window.localStorage.setItem(key, JSON.stringify(value));\n" +
      "    } catch (error) {\n" +
      "      console.error(error);\n" +
      "    }\n" +
      "  };\n" +
      "  \n" +
      "  useDebugValue(storedValue, (value) => {\n" +
      "    return `localStorage[${key}]: ${JSON.stringify(value)}`;\n" +
      "  });\n" +
      "  \n" +
      "  return [storedValue, setValue];\n" +
      "}\n" +
      "```\n\n" +
      "**Complex Debug Information:**\n" +
      "```javascript\n" +
      "function useApi(url) {\n" +
      "  const [data, setData] = useState(null);\n" +
      "  const [loading, setLoading] = useState(true);\n" +
      "  const [error, setError] = useState(null);\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    fetch(url)\n" +
      "      .then(response => response.json())\n" +
      "      .then(data => {\n" +
      "        setData(data);\n" +
      "        setLoading(false);\n" +
      "      })\n" +
      "      .catch(error => {\n" +
      "        setError(error);\n" +
      "        setLoading(false);\n" +
      "      });\n" +
      "  }, [url]);\n" +
      "  \n" +
      "  useDebugValue(\n" +
      "    { data, loading, error },\n" +
      "    (state) => {\n" +
      "      if (state.loading) return 'Loading...';\n" +
      "      if (state.error) return `Error: ${state.error.message}`;\n" +
      "      return `Data: ${state.data ? 'Loaded' : 'No data'}`;\n" +
      "    }\n" +
      "  );\n" +
      "  \n" +
      "  return { data, loading, error };\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Better debugging experience\n" +
      "- Clear hook state visualization\n" +
      "- Custom formatting for complex data\n" +
      "- Helps identify hook issues\n\n" +
      "**Best Practices:**\n" +
      "- Only use in custom hooks\n" +
      "- Provide meaningful labels\n" +
      "- Use formatter functions for complex data\n" +
      "- Don't use in production builds (automatically removed)",
    category: "Development",
    difficulty: "intermediate",
    tags: ["useDebugValue", "debugging", "devtools", "custom-hooks", "development"],
  },
  {
    id: 36,
    question:
      "What is React's useSyncExternalStore hook? How is it used for external state management?",
    answer:
      "useSyncExternalStore is a hook that allows you to subscribe to external data sources and keep your component in sync with them. It's designed to work with external stores like Redux, Zustand, or any custom state management solution.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useSyncExternalStore } from 'react';\n\n" +
      "// External store\n" +
      "class ExternalStore {\n" +
      "  constructor() {\n" +
      "    this.state = { count: 0 };\n" +
      "    this.listeners = new Set();\n" +
      "  }\n" +
      "  \n" +
      "  getSnapshot() {\n" +
      "    return this.state;\n" +
      "  }\n" +
      "  \n" +
      "  subscribe(listener) {\n" +
      "    this.listeners.add(listener);\n" +
      "    return () => this.listeners.delete(listener);\n" +
      "  }\n" +
      "  \n" +
      "  increment() {\n" +
      "    this.state = { ...this.state, count: this.state.count + 1 };\n" +
      "    this.listeners.forEach(listener => listener());\n" +
      "  }\n" +
      "}\n\n" +
      "const store = new ExternalStore();\n\n" +
      "// Component using the store\n" +
      "function Counter() {\n" +
      "  const state = useSyncExternalStore(\n" +
      "    store.subscribe.bind(store),\n" +
      "    store.getSnapshot.bind(store)\n" +
      "  );\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {state.count}</p>\n" +
      "      <button onClick={() => store.increment()}>Increment</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with Server Snapshot:**\n" +
      "```javascript\n" +
      "function useLocalStorage(key, initialValue) {\n" +
      "  const getSnapshot = () => {\n" +
      "    try {\n" +
      "      const item = localStorage.getItem(key);\n" +
      "      return item ? JSON.parse(item) : initialValue;\n" +
      "    } catch {\n" +
      "      return initialValue;\n" +
      "    }\n" +
      "  };\n" +
      "  \n" +
      "  const getServerSnapshot = () => initialValue;\n" +
      "  \n" +
      "  const subscribe = (listener) => {\n" +
      "    const handleStorageChange = (e) => {\n" +
      "      if (e.key === key) {\n" +
      "        listener();\n" +
      "      }\n" +
      "    };\n" +
      "    \n" +
      "    window.addEventListener('storage', handleStorageChange);\n" +
      "    return () => window.removeEventListener('storage', handleStorageChange);\n" +
      "  };\n" +
      "  \n" +
      "  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Works with any external store\n" +
      "- Handles server-side rendering\n" +
      "- Prevents hydration mismatches\n" +
      "- Optimized for performance\n\n" +
      "**When to Use:**\n" +
      "- Integrating with external state libraries\n" +
      "- Custom state management solutions\n" +
      "- Browser APIs (localStorage, sessionStorage)\n" +
      "- WebSocket connections",
    category: "State Management",
    difficulty: "advanced",
    tags: ["useSyncExternalStore", "external-state", "stores", "ssr", "hydration"],
  },
  {
    id: 37,
    question: "Explain React's useInsertionEffect hook. When and how should you use it?",
    answer:
      "useInsertionEffect is a hook that fires before any DOM mutations. It's primarily used for injecting styles into the DOM, ensuring they're available before the browser paints.\n\n" +
      "**Key Characteristics:**\n" +
      "- Fires before DOM mutations\n" +
      "- Runs synchronously\n" +
      "- Perfect for style injection\n" +
      "- Similar to useLayoutEffect but earlier\n\n" +
      "**Basic Usage for Style Injection:**\n" +
      "```javascript\n" +
      "import { useInsertionEffect } from 'react';\n\n" +
      "function useCSS(css) {\n" +
      "  useInsertionEffect(() => {\n" +
      "    const style = document.createElement('style');\n" +
      "    style.textContent = css;\n" +
      "    document.head.appendChild(style);\n" +
      "    \n" +
      "    return () => {\n" +
      "      document.head.removeChild(style);\n" +
      "    };\n" +
      "  }, [css]);\n" +
      "}\n\n" +
      "function StyledComponent({ children }) {\n" +
      "  useCSS(`\n" +
      "    .my-component {\n" +
      "      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n" +
      "      padding: 20px;\n" +
      "      border-radius: 8px;\n" +
      "    }\n" +
      "  `);\n" +
      "  \n" +
      "  return <div className='my-component'>{children}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with CSS-in-JS:**\n" +
      "```javascript\n" +
      "function useStyledComponent(componentName, styles) {\n" +
      "  useInsertionEffect(() => {\n" +
      "    const styleId = `styled-${componentName}`;\n" +
      "    let styleElement = document.getElementById(styleId);\n" +
      "    \n" +
      "    if (!styleElement) {\n" +
      "      styleElement = document.createElement('style');\n" +
      "      styleElement.id = styleId;\n" +
      "      document.head.appendChild(styleElement);\n" +
      "    }\n" +
      "    \n" +
      "    styleElement.textContent = styles;\n" +
      "    \n" +
      "    return () => {\n" +
      "      if (styleElement && styleElement.parentNode) {\n" +
      "        styleElement.parentNode.removeChild(styleElement);\n" +
      "      }\n" +
      "    };\n" +
      "  }, [componentName, styles]);\n" +
      "}\n\n" +
      "function Button({ children, variant = 'primary' }) {\n" +
      "  const styles = `\n" +
      "    .btn {\n" +
      "      padding: 12px 24px;\n" +
      "      border: none;\n" +
      "      border-radius: 4px;\n" +
      "      cursor: pointer;\n" +
      "      font-weight: 500;\n" +
      "    }\n" +
      "    .btn-primary {\n" +
      "      background-color: #007bff;\n" +
      "      color: white;\n" +
      "    }\n" +
      "    .btn-secondary {\n" +
      "      background-color: #6c757d;\n" +
      "      color: white;\n" +
      "    }\n" +
      "  `;\n" +
      "  \n" +
      "  useStyledComponent('Button', styles);\n" +
      "  \n" +
      "  return (\n" +
      "    <button className={`btn btn-${variant}`}>\n" +
      "      {children}\n" +
      "    </button>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- CSS-in-JS libraries\n" +
      "- Dynamic style injection\n" +
      "- Theme switching\n" +
      "- Critical CSS loading\n\n" +
      "**Performance Considerations:**\n" +
      "- Runs synchronously\n" +
      "- Can block rendering if overused\n" +
      "- Use sparingly\n" +
      "- Prefer CSS modules or styled-components for most cases",
    category: "Hooks",
    difficulty: "advanced",
    tags: ["useInsertionEffect", "styles", "css-in-js", "dom", "performance"],
  },
  {
    id: 38,
    question:
      "What is React's useReducer hook? How does it compare to useState and when should you use it?",
    answer:
      "useReducer is a hook that manages complex state logic using a reducer function. It's similar to useState but more powerful for managing state that involves multiple sub-values or when the next state depends on the previous one.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useReducer } from 'react';\n\n" +
      "const initialState = { count: 0 };\n\n" +
      "function reducer(state, action) {\n" +
      "  switch (action.type) {\n" +
      "    case 'increment':\n" +
      "      return { count: state.count + 1 };\n" +
      "    case 'decrement':\n" +
      "      return { count: state.count - 1 };\n" +
      "    case 'reset':\n" +
      "      return { count: 0 };\n" +
      "    default:\n" +
      "      throw new Error(`Unhandled action type: ${action.type}`);\n" +
      "  }\n" +
      "}\n\n" +
      "function Counter() {\n" +
      "  const [state, dispatch] = useReducer(reducer, initialState);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {state.count}</p>\n" +
      "      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n" +
      "      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>\n" +
      "      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with Complex State:**\n" +
      "```javascript\n" +
      "const initialState = {\n" +
      "  todos: [],\n" +
      "  filter: 'all',\n" +
      "  loading: false,\n" +
      "  error: null\n" +
      "};\n\n" +
      "function todosReducer(state, action) {\n" +
      "  switch (action.type) {\n" +
      "    case 'ADD_TODO':\n" +
      "      return {\n" +
      "        ...state,\n" +
      "        todos: [...state.todos, {\n" +
      "          id: Date.now(),\n" +
      "          text: action.text,\n" +
      "          completed: false\n" +
      "        }]\n" +
      "      };\n" +
      "    case 'TOGGLE_TODO':\n" +
      "      return {\n" +
      "        ...state,\n" +
      "        todos: state.todos.map(todo =>\n" +
      "          todo.id === action.id\n" +
      "            ? { ...todo, completed: !todo.completed }\n" +
      "            : todo\n" +
      "        )\n" +
      "      };\n" +
      "    case 'SET_FILTER':\n" +
      "      return { ...state, filter: action.filter };\n" +
      "    case 'SET_LOADING':\n" +
      "      return { ...state, loading: action.loading };\n" +
      "    case 'SET_ERROR':\n" +
      "      return { ...state, error: action.error };\n" +
      "    default:\n" +
      "      return state;\n" +
      "  }\n" +
      "}\n\n" +
      "function TodoApp() {\n" +
      "  const [state, dispatch] = useReducer(todosReducer, initialState);\n" +
      "  \n" +
      "  const addTodo = (text) => {\n" +
      "    dispatch({ type: 'ADD_TODO', text });\n" +
      "  };\n" +
      "  \n" +
      "  const toggleTodo = (id) => {\n" +
      "    dispatch({ type: 'TOGGLE_TODO', id });\n" +
      "  };\n" +
      "  \n" +
      "  const setFilter = (filter) => {\n" +
      "    dispatch({ type: 'SET_FILTER', filter });\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <TodoInput onAdd={addTodo} />\n" +
      "      <TodoFilter filter={state.filter} onFilterChange={setFilter} />\n" +
      "      <TodoList \n" +
      "        todos={state.todos}\n" +
      "        filter={state.filter}\n" +
      "        onToggle={toggleTodo}\n" +
      "      />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Lazy Initialization:**\n" +
      "```javascript\n" +
      "function init(initialCount) {\n" +
      "  return { count: initialCount };\n" +
      "}\n\n" +
      "function reducer(state, action) {\n" +
      "  switch (action.type) {\n" +
      "    case 'increment':\n" +
      "      return { count: state.count + 1 };\n" +
      "    case 'decrement':\n" +
      "      return { count: state.count - 1 };\n" +
      "    case 'reset':\n" +
      "      return init(action.payload);\n" +
      "    default:\n" +
      "      throw new Error();\n" +
      "  }\n" +
      "}\n\n" +
      "function Counter({ initialCount }) {\n" +
      "  const [state, dispatch] = useReducer(reducer, initialCount, init);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {state.count}</p>\n" +
      "      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n" +
      "      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>\n" +
      "      <button onClick={() => dispatch({ type: 'reset', payload: initialCount })}>\n" +
      "        Reset\n" +
      "      </button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use useReducer:**\n" +
      "- Complex state logic\n" +
      "- Multiple sub-values\n" +
      "- Next state depends on previous state\n" +
      "- Predictable state updates\n" +
      "- Better testing (pure functions)\n\n" +
      "**Benefits over useState:**\n" +
      "- More predictable state updates\n" +
      "- Better for complex state logic\n" +
      "- Easier to test\n" +
      "- Can be used with useContext for global state",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useReducer", "state", "reducer", "complex-state", "predictable"],
  },
  {
    id: 39,
    question:
      "Explain React's useMemo and useCallback hooks in detail. How do they optimize performance?",
    answer:
      "useMemo and useCallback are React hooks that help optimize performance by memoizing values and functions respectively. They prevent unnecessary recalculations and re-renders.\n\n" +
      "**useMemo - Memoizing Values:**\n" +
      "```javascript\n" +
      "import { useMemo, useState } from 'react';\n\n" +
      "function ExpensiveComponent({ items, filter }) {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  \n" +
      "  // Expensive calculation that only runs when items or filter change\n" +
      "  const filteredItems = useMemo(() => {\n" +
      "    console.log('Filtering items...');\n" +
      "    return items.filter(item => \n" +
      "      item.name.toLowerCase().includes(filter.toLowerCase())\n" +
      "    );\n" +
      "  }, [items, filter]);\n" +
      "  \n" +
      "  // Expensive calculation that only runs when filteredItems change\n" +
      "  const totalPrice = useMemo(() => {\n" +
      "    console.log('Calculating total...');\n" +
      "    return filteredItems.reduce((sum, item) => sum + item.price, 0);\n" +
      "  }, [filteredItems]);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {count}</p>\n" +
      "      <button onClick={() => setCount(c => c + 1)}>Increment</button>\n" +
      "      <p>Total Price: ${totalPrice}</p>\n" +
      "      <ul>\n" +
      "        {filteredItems.map(item => (\n" +
      "          <li key={item.id}>{item.name} - ${item.price}</li>\n" +
      "        ))}\n" +
      "      </ul>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**useCallback - Memoizing Functions:**\n" +
      "```javascript\n" +
      "import { useCallback, useState, memo } from 'react';\n\n" +
      "const ExpensiveChild = memo(({ onClick, label }) => {\n" +
      "  console.log(`Rendering ${label}`);\n" +
      "  return <button onClick={onClick}>{label}</button>;\n" +
      "});\n\n" +
      "function Parent() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const [name, setName] = useState('');\n" +
      "  \n" +
      "  // Memoized function that only changes when count changes\n" +
      "  const handleIncrement = useCallback(() => {\n" +
      "    setCount(c => c + 1);\n" +
      "  }, []);\n" +
      "  \n" +
      "  // Memoized function that only changes when name changes\n" +
      "  const handleNameChange = useCallback((e) => {\n" +
      "    setName(e.target.value);\n" +
      "  }, []);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input value={name} onChange={handleNameChange} />\n" +
      "      <ExpensiveChild onClick={handleIncrement} label='Increment' />\n" +
      "      <ExpensiveChild onClick={handleNameChange} label='Change Name' />\n" +
      "      <p>Count: {count}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with Dependencies:**\n" +
      "```javascript\n" +
      "function SearchResults({ query, filters }) {\n" +
      "  const [results, setResults] = useState([]);\n" +
      "  \n" +
      "  // Memoized search function\n" +
      "  const search = useCallback(async (searchQuery, searchFilters) => {\n" +
      "    const response = await fetch(`/api/search?q=${searchQuery}&filters=${JSON.stringify(searchFilters)}`);\n" +
      "    const data = await response.json();\n" +
      "    setResults(data.results);\n" +
      "  }, []);\n" +
      "  \n" +
      "  // Memoized search parameters\n" +
      "  const searchParams = useMemo(() => ({\n" +
      "    query,\n" +
      "    filters,\n" +
      "    timestamp: Date.now()\n" +
      "  }), [query, filters]);\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    search(searchParams.query, searchParams.filters);\n" +
      "  }, [search, searchParams]);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      {results.map(result => (\n" +
      "        <div key={result.id}>{result.title}</div>\n" +
      "      ))}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Considerations:**\n" +
      "- Only use when you have performance issues\n" +
      "- Don't overuse (can hurt performance)\n" +
      "- Measure before and after optimization\n" +
      "- Consider the cost of memoization\n\n" +
      "**When to Use:**\n" +
      "- Expensive calculations\n" +
      "- Preventing unnecessary re-renders\n" +
      "- Optimizing child components\n" +
      "- Complex dependency arrays",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["useMemo", "useCallback", "performance", "memoization", "optimization"],
  },
  {
    id: 40,
    question:
      "What is React's useRef hook? How does it differ from useState and when should you use it?",
    answer:
      "useRef is a hook that returns a mutable ref object whose .current property is initialized to the passed argument. The returned object will persist for the full lifetime of the component and doesn't cause re-renders when its value changes.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useRef, useEffect } from 'react';\n\n" +
      "function TextInputWithFocusButton() {\n" +
      "  const inputEl = useRef(null);\n" +
      "  \n" +
      "  const onButtonClick = () => {\n" +
      "    inputEl.current.focus();\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input ref={inputEl} type='text' />\n" +
      "      <button onClick={onButtonClick}>Focus the input</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Storing Mutable Values:**\n" +
      "```javascript\n" +
      "function Timer() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const intervalRef = useRef();\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    intervalRef.current = setInterval(() => {\n" +
      "      setCount(c => c + 1);\n" +
      "    }, 1000);\n" +
      "    \n" +
      "    return () => clearInterval(intervalRef.current);\n" +
      "  }, []);\n" +
      "  \n" +
      "  const stopTimer = () => {\n" +
      "    clearInterval(intervalRef.current);\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {count}</p>\n" +
      "      <button onClick={stopTimer}>Stop Timer</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Accessing Previous Values:**\n" +
      "```javascript\n" +
      "function usePrevious(value) {\n" +
      "  const ref = useRef();\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    ref.current = value;\n" +
      "  });\n" +
      "  \n" +
      "  return ref.current;\n" +
      "}\n\n" +
      "function Counter() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const prevCount = usePrevious(count);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Current: {count}</p>\n" +
      "      <p>Previous: {prevCount}</p>\n" +
      "      <button onClick={() => setCount(c => c + 1)}>Increment</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Key Differences from useState:**\n" +
      "- **useRef**: Doesn't trigger re-renders, mutable .current property\n" +
      "- **useState**: Triggers re-renders, immutable state value\n\n" +
      "**When to Use useRef:**\n" +
      "- Accessing DOM elements\n" +
      "- Storing mutable values that don't need to trigger re-renders\n" +
      "- Storing previous values\n" +
      "- Storing timers, intervals, or other side effects\n\n" +
      "**Best Practices:**\n" +
      "- Don't use refs for values that should trigger re-renders\n" +
      "- Use refs sparingly\n" +
      "- Prefer declarative approaches when possible",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useRef", "refs", "mutable", "dom", "side-effects"],
  },
  {
    id: 41,
    question: "Explain React's useImperativeHandle hook. When and how should you use it?",
    answer:
      "useImperativeHandle allows you to customize the instance value that is exposed to parent components when using ref. It's used to expose specific methods or properties from a child component to its parent.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { forwardRef, useImperativeHandle, useRef } from 'react';\n\n" +
      "const FancyInput = forwardRef((props, ref) => {\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  useImperativeHandle(ref, () => ({\n" +
      "    focus: () => {\n" +
      "      inputRef.current.focus();\n" +
      "    },\n" +
      "    clear: () => {\n" +
      "      inputRef.current.value = '';\n" +
      "    },\n" +
      "    getValue: () => {\n" +
      "      return inputRef.current.value;\n" +
      "    }\n" +
      "  }));\n" +
      "  \n" +
      "  return <input ref={inputRef} {...props} />;\n" +
      "});\n\n" +
      "// Usage in parent component\n" +
      "function App() {\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  const handleFocus = () => {\n" +
      "    inputRef.current.focus();\n" +
      "  };\n" +
      "  \n" +
      "  const handleClear = () => {\n" +
      "    inputRef.current.clear();\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <FancyInput ref={inputRef} />\n" +
      "      <button onClick={handleFocus}>Focus</button>\n" +
      "      <button onClick={handleClear}>Clear</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- Exposing imperative APIs (focus, scroll, play/pause)\n" +
      "- Third-party library integration\n" +
      "- Complex component interactions\n" +
      "- When declarative props aren't sufficient\n\n" +
      "**Best Practices:**\n" +
      "- Use sparingly (prefer declarative patterns)\n" +
      "- Keep the exposed API minimal\n" +
      "- Document the imperative API\n" +
      "- Consider if the functionality could be achieved declaratively",
    category: "Hooks",
    difficulty: "advanced",
    tags: ["useImperativeHandle", "refs", "forwardRef", "imperative", "api"],
  },
  {
    id: 42,
    question: "What is React's useLayoutEffect hook? How does it differ from useEffect?",
    answer:
      "useLayoutEffect is identical to useEffect, but it fires synchronously after all DOM mutations but before the browser paints. This makes it perfect for DOM measurements and synchronous updates.\n\n" +
      "**Key Differences:**\n\n" +
      "**useEffect:**\n" +
      "- Runs asynchronously after render\n" +
      "- Doesn't block browser painting\n" +
      "- Good for side effects, data fetching, subscriptions\n\n" +
      "**useLayoutEffect:**\n" +
      "- Runs synchronously after DOM mutations\n" +
      "- Blocks browser painting until it completes\n" +
      "- Good for DOM measurements and synchronous updates\n\n" +
      "**Example: DOM Measurements:**\n" +
      "```javascript\n" +
      "function Tooltip({ children, content }) {\n" +
      "  const [position, setPosition] = useState({ top: 0, left: 0 });\n" +
      "  const tooltipRef = useRef();\n" +
      "  const triggerRef = useRef();\n" +
      "  \n" +
      "  useLayoutEffect(() => {\n" +
      "    if (tooltipRef.current && triggerRef.current) {\n" +
      "      const triggerRect = triggerRef.current.getBoundingClientRect();\n" +
      "      const tooltipRect = tooltipRef.current.getBoundingClientRect();\n" +
      "      \n" +
      "      setPosition({\n" +
      "        top: triggerRect.bottom + 8,\n" +
      "        left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2\n" +
      "      });\n" +
      "    }\n" +
      "  }, [content]);\n" +
      "  \n" +
      "  return (\n" +
      "    <>\n" +
      "      <div ref={triggerRef}>{children}</div>\n" +
      "      <div \n" +
      "        ref={tooltipRef}\n" +
      "        style={{\n" +
      "          position: 'absolute',\n" +
      "          top: position.top,\n" +
      "          left: position.left,\n" +
      "          backgroundColor: 'black',\n" +
      "          color: 'white',\n" +
      "          padding: '4px 8px',\n" +
      "          borderRadius: '4px'\n" +
      "        }}\n" +
      "      >\n" +
      "        {content}\n" +
      "      </div>\n" +
      "    </>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use useLayoutEffect:**\n" +
      "- DOM measurements (getBoundingClientRect, offsetWidth, etc.)\n" +
      "- Synchronous DOM updates\n" +
      "- Preventing visual flicker\n" +
      "- Scrolling or focusing elements\n\n" +
      "**Performance Considerations:**\n" +
      "- Can cause performance issues if overused\n" +
      "- Blocks browser painting\n" +
      "- Use sparingly\n" +
      "- Prefer useEffect when possible",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useLayoutEffect", "dom", "measurements", "synchronous", "performance"],
  },
  {
    id: 43,
    question: "Explain React's useDebugValue hook. How is it used for custom hook debugging?",
    answer:
      "useDebugValue is a hook that allows you to display a label for custom hooks in React DevTools. It helps with debugging by showing meaningful information about the hook's state.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useState, useDebugValue } from 'react';\n\n" +
      "function useCounter(initialValue = 0) {\n" +
      "  const [count, setCount] = useState(initialValue);\n" +
      "  \n" +
      "  useDebugValue(count); // Shows count value in DevTools\n" +
      "  \n" +
      "  const increment = () => setCount(c => c + 1);\n" +
      "  const decrement = () => setCount(c => c - 1);\n" +
      "  \n" +
      "  return { count, increment, decrement };\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with Formatter:**\n" +
      "```javascript\n" +
      "function useLocalStorage(key, initialValue) {\n" +
      "  const [storedValue, setStoredValue] = useState(() => {\n" +
      "    try {\n" +
      "      const item = window.localStorage.getItem(key);\n" +
      "      return item ? JSON.parse(item) : initialValue;\n" +
      "    } catch (error) {\n" +
      "      return initialValue;\n" +
      "    }\n" +
      "  });\n" +
      "  \n" +
      "  const setValue = (value) => {\n" +
      "    try {\n" +
      "      setStoredValue(value);\n" +
      "      window.localStorage.setItem(key, JSON.stringify(value));\n" +
      "    } catch (error) {\n" +
      "      console.error(error);\n" +
      "    }\n" +
      "  };\n" +
      "  \n" +
      "  useDebugValue(storedValue, (value) => {\n" +
      "    return `localStorage[${key}]: ${JSON.stringify(value)}`;\n" +
      "  });\n" +
      "  \n" +
      "  return [storedValue, setValue];\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Better debugging experience\n" +
      "- Clear hook state visualization\n" +
      "- Custom formatting for complex data\n" +
      "- Helps identify hook issues\n\n" +
      "**Best Practices:**\n" +
      "- Only use in custom hooks\n" +
      "- Provide meaningful labels\n" +
      "- Use formatter functions for complex data\n" +
      "- Don't use in production builds (automatically removed)",
    category: "Development",
    difficulty: "intermediate",
    tags: ["useDebugValue", "debugging", "devtools", "custom-hooks", "development"],
  },
  {
    id: 44,
    question:
      "What is React's useSyncExternalStore hook? How is it used for external state management?",
    answer:
      "useSyncExternalStore is a hook that allows you to subscribe to external data sources and keep your component in sync with them. It's designed to work with external stores like Redux, Zustand, or any custom state management solution.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useSyncExternalStore } from 'react';\n\n" +
      "// External store\n" +
      "class ExternalStore {\n" +
      "  constructor() {\n" +
      "    this.state = { count: 0 };\n" +
      "    this.listeners = new Set();\n" +
      "  }\n" +
      "  \n" +
      "  getSnapshot() {\n" +
      "    return this.state;\n" +
      "  }\n" +
      "  \n" +
      "  subscribe(listener) {\n" +
      "    this.listeners.add(listener);\n" +
      "    return () => this.listeners.delete(listener);\n" +
      "  }\n" +
      "  \n" +
      "  increment() {\n" +
      "    this.state = { ...this.state, count: this.state.count + 1 };\n" +
      "    this.listeners.forEach(listener => listener());\n" +
      "  }\n" +
      "}\n\n" +
      "const store = new ExternalStore();\n\n" +
      "// Component using the store\n" +
      "function Counter() {\n" +
      "  const state = useSyncExternalStore(\n" +
      "    store.subscribe.bind(store),\n" +
      "    store.getSnapshot.bind(store)\n" +
      "  );\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {state.count}</p>\n" +
      "      <button onClick={() => store.increment()}>Increment</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Works with any external store\n" +
      "- Handles server-side rendering\n" +
      "- Prevents hydration mismatches\n" +
      "- Optimized for performance\n\n" +
      "**When to Use:**\n" +
      "- Integrating with external state libraries\n" +
      "- Custom state management solutions\n" +
      "- Browser APIs (localStorage, sessionStorage)\n" +
      "- WebSocket connections",
    category: "State Management",
    difficulty: "advanced",
    tags: ["useSyncExternalStore", "external-state", "stores", "ssr", "hydration"],
  },
  {
    id: 45,
    question: "Explain React's useInsertionEffect hook. When and how should you use it?",
    answer:
      "useInsertionEffect is a hook that fires before any DOM mutations. It's primarily used for injecting styles into the DOM, ensuring they're available before the browser paints.\n\n" +
      "**Key Characteristics:**\n" +
      "- Fires before DOM mutations\n" +
      "- Runs synchronously\n" +
      "- Perfect for style injection\n" +
      "- Similar to useLayoutEffect but earlier\n\n" +
      "**Basic Usage for Style Injection:**\n" +
      "```javascript\n" +
      "import { useInsertionEffect } from 'react';\n\n" +
      "function useCSS(css) {\n" +
      "  useInsertionEffect(() => {\n" +
      "    const style = document.createElement('style');\n" +
      "    style.textContent = css;\n" +
      "    document.head.appendChild(style);\n" +
      "    \n" +
      "    return () => {\n" +
      "      document.head.removeChild(style);\n" +
      "    };\n" +
      "  }, [css]);\n" +
      "}\n\n" +
      "function StyledComponent({ children }) {\n" +
      "  useCSS(`\n" +
      "    .my-component {\n" +
      "      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n" +
      "      padding: 20px;\n" +
      "      border-radius: 8px;\n" +
      "    }\n" +
      "  `);\n" +
      "  \n" +
      "  return <div className='my-component'>{children}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- CSS-in-JS libraries\n" +
      "- Dynamic style injection\n" +
      "- Theme switching\n" +
      "- Critical CSS loading\n\n" +
      "**Performance Considerations:**\n" +
      "- Runs synchronously\n" +
      "- Can block rendering if overused\n" +
      "- Use sparingly\n" +
      "- Prefer CSS modules or styled-components for most cases",
    category: "Hooks",
    difficulty: "advanced",
    tags: ["useInsertionEffect", "styles", "css-in-js", "dom", "performance"],
  },
  {
    id: 46,
    question:
      "What is React's useReducer hook? How does it compare to useState and when should you use it?",
    answer:
      "useReducer is a hook that manages complex state logic using a reducer function. It's similar to useState but more powerful for managing state that involves multiple sub-values or when the next state depends on the previous one.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useReducer } from 'react';\n\n" +
      "const initialState = { count: 0 };\n\n" +
      "function reducer(state, action) {\n" +
      "  switch (action.type) {\n" +
      "    case 'increment':\n" +
      "      return { count: state.count + 1 };\n" +
      "    case 'decrement':\n" +
      "      return { count: state.count - 1 };\n" +
      "    case 'reset':\n" +
      "      return { count: 0 };\n" +
      "    default:\n" +
      "      throw new Error(`Unhandled action type: ${action.type}`);\n" +
      "  }\n" +
      "}\n\n" +
      "function Counter() {\n" +
      "  const [state, dispatch] = useReducer(reducer, initialState);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {state.count}</p>\n" +
      "      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n" +
      "      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>\n" +
      "      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use useReducer:**\n" +
      "- Complex state logic\n" +
      "- Multiple sub-values\n" +
      "- Next state depends on previous state\n" +
      "- Predictable state updates\n" +
      "- Better testing (pure functions)\n\n" +
      "**Benefits over useState:**\n" +
      "- More predictable state updates\n" +
      "- Better for complex state logic\n" +
      "- Easier to test\n" +
      "- Can be used with useContext for global state",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useReducer", "state", "reducer", "complex-state", "predictable"],
  },
  {
    id: 47,
    question: "What is React's useImperativeHandle hook? When and how should you use it?",
    answer:
      "useImperativeHandle allows you to customize the instance value that is exposed to parent components when using ref. It's used to expose specific methods or properties from a child component to its parent.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { forwardRef, useImperativeHandle, useRef } from 'react';\n\n" +
      "const FancyInput = forwardRef((props, ref) => {\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  useImperativeHandle(ref, () => ({\n" +
      "    focus: () => {\n" +
      "      inputRef.current.focus();\n" +
      "    },\n" +
      "    clear: () => {\n" +
      "      inputRef.current.value = '';\n" +
      "    },\n" +
      "    getValue: () => {\n" +
      "      return inputRef.current.value;\n" +
      "    }\n" +
      "  }));\n" +
      "  \n" +
      "  return <input ref={inputRef} {...props} />;\n" +
      "});\n\n" +
      "// Usage in parent component\n" +
      "function App() {\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  const handleFocus = () => {\n" +
      "    inputRef.current.focus();\n" +
      "  };\n" +
      "  \n" +
      "  const handleClear = () => {\n" +
      "    inputRef.current.clear();\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <FancyInput ref={inputRef} />\n" +
      "      <button onClick={handleFocus}>Focus</button>\n" +
      "      <button onClick={handleClear}>Clear</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- Exposing imperative APIs (focus, scroll, play/pause)\n" +
      "- Third-party library integration\n" +
      "- Complex component interactions\n" +
      "- When declarative props aren't sufficient\n\n" +
      "**Best Practices:**\n" +
      "- Use sparingly (prefer declarative patterns)\n" +
      "- Keep the exposed API minimal\n" +
      "- Document the imperative API\n" +
      "- Consider if the functionality could be achieved declaratively",
    category: "Hooks",
    difficulty: "advanced",
    tags: ["useImperativeHandle", "refs", "forwardRef", "imperative", "api"],
  },
  {
    id: 48,
    question: "Explain React's useLayoutEffect hook. How does it differ from useEffect?",
    answer:
      "useLayoutEffect is identical to useEffect, but it fires synchronously after all DOM mutations but before the browser paints. This makes it perfect for DOM measurements and synchronous updates.\n\n" +
      "**Key Differences:**\n\n" +
      "**useEffect:**\n" +
      "- Runs asynchronously after render\n" +
      "- Doesn't block browser painting\n" +
      "- Good for side effects, data fetching, subscriptions\n\n" +
      "**useLayoutEffect:**\n" +
      "- Runs synchronously after DOM mutations\n" +
      "- Blocks browser painting until it completes\n" +
      "- Good for DOM measurements and synchronous updates\n\n" +
      "**Example: DOM Measurements:**\n" +
      "```javascript\n" +
      "function Tooltip({ children, content }) {\n" +
      "  const [position, setPosition] = useState({ top: 0, left: 0 });\n" +
      "  const tooltipRef = useRef();\n" +
      "  const triggerRef = useRef();\n" +
      "  \n" +
      "  useLayoutEffect(() => {\n" +
      "    if (tooltipRef.current && triggerRef.current) {\n" +
      "      const triggerRect = triggerRef.current.getBoundingClientRect();\n" +
      "      const tooltipRect = tooltipRef.current.getBoundingClientRect();\n" +
      "      \n" +
      "      setPosition({\n" +
      "        top: triggerRect.bottom + 8,\n" +
      "        left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2\n" +
      "      });\n" +
      "    }\n" +
      "  }, [content]);\n" +
      "  \n" +
      "  return (\n" +
      "    <>\n" +
      "      <div ref={triggerRef}>{children}</div>\n" +
      "      <div \n" +
      "        ref={tooltipRef}\n" +
      "        style={{\n" +
      "          position: 'absolute',\n" +
      "          top: position.top,\n" +
      "          left: position.left,\n" +
      "          backgroundColor: 'black',\n" +
      "          color: 'white',\n" +
      "          padding: '4px 8px',\n" +
      "          borderRadius: '4px'\n" +
      "        }}\n" +
      "      >\n" +
      "        {content}\n" +
      "      </div>\n" +
      "    </>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use useLayoutEffect:**\n" +
      "- DOM measurements (getBoundingClientRect, offsetWidth, etc.)\n" +
      "- Synchronous DOM updates\n" +
      "- Preventing visual flicker\n" +
      "- Scrolling or focusing elements\n\n" +
      "**Performance Considerations:**\n" +
      "- Can cause performance issues if overused\n" +
      "- Blocks browser painting\n" +
      "- Use sparingly\n" +
      "- Prefer useEffect when possible",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useLayoutEffect", "dom", "measurements", "synchronous", "performance"],
  },
  {
    id: 49,
    question: "What is React's useDebugValue hook? How is it used for custom hook debugging?",
    answer:
      "useDebugValue is a hook that allows you to display a label for custom hooks in React DevTools. It helps with debugging by showing meaningful information about the hook's state.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useState, useDebugValue } from 'react';\n\n" +
      "function useCounter(initialValue = 0) {\n" +
      "  const [count, setCount] = useState(initialValue);\n" +
      "  \n" +
      "  useDebugValue(count); // Shows count value in DevTools\n" +
      "  \n" +
      "  const increment = () => setCount(c => c + 1);\n" +
      "  const decrement = () => setCount(c => c - 1);\n" +
      "  \n" +
      "  return { count, increment, decrement };\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with Formatter:**\n" +
      "```javascript\n" +
      "function useLocalStorage(key, initialValue) {\n" +
      "  const [storedValue, setStoredValue] = useState(() => {\n" +
      "    try {\n" +
      "      const item = window.localStorage.getItem(key);\n" +
      "      return item ? JSON.parse(item) : initialValue;\n" +
      "    } catch (error) {\n" +
      "      return initialValue;\n" +
      "    }\n" +
      "  });\n" +
      "  \n" +
      "  const setValue = (value) => {\n" +
      "    try {\n" +
      "      setStoredValue(value);\n" +
      "      window.localStorage.setItem(key, JSON.stringify(value));\n" +
      "    } catch (error) {\n" +
      "      console.error(error);\n" +
      "    }\n" +
      "  };\n" +
      "  \n" +
      "  useDebugValue(storedValue, (value) => {\n" +
      "    return `localStorage[${key}]: ${JSON.stringify(value)}`;\n" +
      "  });\n" +
      "  \n" +
      "  return [storedValue, setValue];\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Better debugging experience\n" +
      "- Clear hook state visualization\n" +
      "- Custom formatting for complex data\n" +
      "- Helps identify hook issues\n\n" +
      "**Best Practices:**\n" +
      "- Only use in custom hooks\n" +
      "- Provide meaningful labels\n" +
      "- Use formatter functions for complex data\n" +
      "- Don't use in production builds (automatically removed)",
    category: "Development",
    difficulty: "intermediate",
    tags: ["useDebugValue", "debugging", "devtools", "custom-hooks", "development"],
  },
  {
    id: 50,
    question:
      "What is React's useSyncExternalStore hook? How is it used for external state management?",
    answer:
      "useSyncExternalStore is a hook that allows you to subscribe to external data sources and keep your component in sync with them. It's designed to work with external stores like Redux, Zustand, or any custom state management solution.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useSyncExternalStore } from 'react';\n\n" +
      "// External store\n" +
      "class ExternalStore {\n" +
      "  constructor() {\n" +
      "    this.state = { count: 0 };\n" +
      "    this.listeners = new Set();\n" +
      "  }\n" +
      "  \n" +
      "  getSnapshot() {\n" +
      "    return this.state;\n" +
      "  }\n" +
      "  \n" +
      "  subscribe(listener) {\n" +
      "    this.listeners.add(listener);\n" +
      "    return () => this.listeners.delete(listener);\n" +
      "  }\n" +
      "  \n" +
      "  increment() {\n" +
      "    this.state = { ...this.state, count: this.state.count + 1 };\n" +
      "    this.listeners.forEach(listener => listener());\n" +
      "  }\n" +
      "}\n\n" +
      "const store = new ExternalStore();\n\n" +
      "// Component using the store\n" +
      "function Counter() {\n" +
      "  const state = useSyncExternalStore(\n" +
      "    store.subscribe.bind(store),\n" +
      "    store.getSnapshot.bind(store)\n" +
      "  );\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {state.count}</p>\n" +
      "      <button onClick={() => store.increment()}>Increment</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Works with any external store\n" +
      "- Handles server-side rendering\n" +
      "- Prevents hydration mismatches\n" +
      "- Optimized for performance\n\n" +
      "**When to Use:**\n" +
      "- Integrating with external state libraries\n" +
      "- Custom state management solutions\n" +
      "- Browser APIs (localStorage, sessionStorage)\n" +
      "- WebSocket connections",
    category: "State Management",
    difficulty: "advanced",
    tags: ["useSyncExternalStore", "external-state", "stores", "ssr", "hydration"],
  },
  {
    id: 51,
    question: "What is React's useInsertionEffect hook? When and how should you use it?",
    answer:
      "useInsertionEffect is a hook that fires before any DOM mutations. It's primarily used for injecting styles into the DOM, ensuring they're available before the browser paints.\n\n" +
      "**Key Characteristics:**\n" +
      "- Fires before DOM mutations\n" +
      "- Runs synchronously\n" +
      "- Perfect for style injection\n" +
      "- Similar to useLayoutEffect but earlier\n\n" +
      "**Basic Usage for Style Injection:**\n" +
      "```javascript\n" +
      "import { useInsertionEffect } from 'react';\n\n" +
      "function useCSS(css) {\n" +
      "  useInsertionEffect(() => {\n" +
      "    const style = document.createElement('style');\n" +
      "    style.textContent = css;\n" +
      "    document.head.appendChild(style);\n" +
      "    \n" +
      "    return () => {\n" +
      "      document.head.removeChild(style);\n" +
      "    };\n" +
      "  }, [css]);\n" +
      "}\n\n" +
      "function StyledComponent({ children }) {\n" +
      "  useCSS(`\n" +
      "    .my-component {\n" +
      "      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n" +
      "      padding: 20px;\n" +
      "      border-radius: 8px;\n" +
      "    }\n" +
      "  `);\n" +
      "  \n" +
      "  return <div className='my-component'>{children}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- CSS-in-JS libraries\n" +
      "- Dynamic style injection\n" +
      "- Theme switching\n" +
      "- Critical CSS loading\n\n" +
      "**Performance Considerations:**\n" +
      "- Runs synchronously\n" +
      "- Can block rendering if overused\n" +
      "- Use sparingly\n" +
      "- Prefer CSS modules or styled-components for most cases",
    category: "Hooks",
    difficulty: "advanced",
    tags: ["useInsertionEffect", "styles", "css-in-js", "dom", "performance"],
  },
  {
    id: 52,
    question:
      "What is React's useReducer hook? How does it compare to useState and when should you use it?",
    answer:
      "useReducer is a hook that manages complex state logic using a reducer function. It's similar to useState but more powerful for managing state that involves multiple sub-values or when the next state depends on the previous one.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useReducer } from 'react';\n\n" +
      "const initialState = { count: 0 };\n\n" +
      "function reducer(state, action) {\n" +
      "  switch (action.type) {\n" +
      "    case 'increment':\n" +
      "      return { count: state.count + 1 };\n" +
      "    case 'decrement':\n" +
      "      return { count: state.count - 1 };\n" +
      "    case 'reset':\n" +
      "      return { count: 0 };\n" +
      "    default:\n" +
      "      throw new Error(`Unhandled action type: ${action.type}`);\n" +
      "  }\n" +
      "}\n\n" +
      "function Counter() {\n" +
      "  const [state, dispatch] = useReducer(reducer, initialState);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {state.count}</p>\n" +
      "      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n" +
      "      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>\n" +
      "      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use useReducer:**\n" +
      "- Complex state logic\n" +
      "- Multiple sub-values\n" +
      "- Next state depends on previous state\n" +
      "- Predictable state updates\n" +
      "- Better testing (pure functions)\n\n" +
      "**Benefits over useState:**\n" +
      "- More predictable state updates\n" +
      "- Better for complex state logic\n" +
      "- Easier to test\n" +
      "- Can be used with useContext for global state",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useReducer", "state", "reducer", "complex-state", "predictable"],
  },
  {
    id: 53,
    question:
      "Explain React's useMemo and useCallback hooks in detail. How do they optimize performance?",
    answer:
      "useMemo and useCallback are React hooks that help optimize performance by memoizing values and functions respectively. They prevent unnecessary recalculations and re-renders.\n\n" +
      "**useMemo - Memoizing Values:**\n" +
      "```javascript\n" +
      "import { useMemo, useState } from 'react';\n\n" +
      "function ExpensiveComponent({ items, filter }) {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  \n" +
      "  // Expensive calculation that only runs when items or filter change\n" +
      "  const filteredItems = useMemo(() => {\n" +
      "    console.log('Filtering items...');\n" +
      "    return items.filter(item => \n" +
      "      item.name.toLowerCase().includes(filter.toLowerCase())\n" +
      "    );\n" +
      "  }, [items, filter]);\n" +
      "  \n" +
      "  // Expensive calculation that only runs when filteredItems change\n" +
      "  const totalPrice = useMemo(() => {\n" +
      "    console.log('Calculating total...');\n" +
      "    return filteredItems.reduce((sum, item) => sum + item.price, 0);\n" +
      "  }, [filteredItems]);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {count}</p>\n" +
      "      <button onClick={() => setCount(c => c + 1)}>Increment</button>\n" +
      "      <p>Total Price: ${totalPrice}</p>\n" +
      "      <ul>\n" +
      "        {filteredItems.map(item => (\n" +
      "          <li key={item.id}>{item.name} - ${item.price}</li>\n" +
      "        ))}\n" +
      "      </ul>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**useCallback - Memoizing Functions:**\n" +
      "```javascript\n" +
      "import { useCallback, useState, memo } from 'react';\n\n" +
      "const ExpensiveChild = memo(({ onClick, label }) => {\n" +
      "  console.log(`Rendering ${label}`);\n" +
      "  return <button onClick={onClick}>{label}</button>;\n" +
      "});\n\n" +
      "function Parent() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const [name, setName] = useState('');\n" +
      "  \n" +
      "  // Memoized function that only changes when count changes\n" +
      "  const handleIncrement = useCallback(() => {\n" +
      "    setCount(c => c + 1);\n" +
      "  }, []);\n" +
      "  \n" +
      "  // Memoized function that only changes when name changes\n" +
      "  const handleNameChange = useCallback((e) => {\n" +
      "    setName(e.target.value);\n" +
      "  }, []);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input value={name} onChange={handleNameChange} />\n" +
      "      <ExpensiveChild onClick={handleIncrement} label='Increment' />\n" +
      "      <ExpensiveChild onClick={handleNameChange} label='Change Name' />\n" +
      "      <p>Count: {count}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Considerations:**\n" +
      "- Only use when you have performance issues\n" +
      "- Don't overuse (can hurt performance)\n" +
      "- Measure before and after optimization\n" +
      "- Consider the cost of memoization\n\n" +
      "**When to Use:**\n" +
      "- Expensive calculations\n" +
      "- Preventing unnecessary re-renders\n" +
      "- Optimizing child components\n" +
      "- Complex dependency arrays",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["useMemo", "useCallback", "performance", "memoization", "optimization"],
  },
  {
    id: 54,
    question:
      "What is React's useRef hook? How does it differ from useState and when should you use it?",
    answer:
      "useRef is a hook that returns a mutable ref object whose .current property is initialized to the passed argument. The returned object will persist for the full lifetime of the component and doesn't cause re-renders when its value changes.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useRef, useEffect } from 'react';\n\n" +
      "function TextInputWithFocusButton() {\n" +
      "  const inputEl = useRef(null);\n" +
      "  \n" +
      "  const onButtonClick = () => {\n" +
      "    inputEl.current.focus();\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input ref={inputEl} type='text' />\n" +
      "      <button onClick={onButtonClick}>Focus the input</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Storing Mutable Values:**\n" +
      "```javascript\n" +
      "function Timer() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const intervalRef = useRef();\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    intervalRef.current = setInterval(() => {\n" +
      "      setCount(c => c + 1);\n" +
      "    }, 1000);\n" +
      "    \n" +
      "    return () => clearInterval(intervalRef.current);\n" +
      "  }, []);\n" +
      "  \n" +
      "  const stopTimer = () => {\n" +
      "    clearInterval(intervalRef.current);\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {count}</p>\n" +
      "      <button onClick={stopTimer}>Stop Timer</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Key Differences from useState:**\n" +
      "- **useRef**: Doesn't trigger re-renders, mutable .current property\n" +
      "- **useState**: Triggers re-renders, immutable state value\n\n" +
      "**When to Use useRef:**\n" +
      "- Accessing DOM elements\n" +
      "- Storing mutable values that don't need to trigger re-renders\n" +
      "- Storing previous values\n" +
      "- Storing timers, intervals, or other side effects\n\n" +
      "**Best Practices:**\n" +
      "- Don't use refs for values that should trigger re-renders\n" +
      "- Use refs sparingly\n" +
      "- Prefer declarative approaches when possible",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useRef", "refs", "mutable", "dom", "side-effects"],
  },
  {
    id: 55,
    question: "What is React's useImperativeHandle hook? When and how should you use it?",
    answer:
      "useImperativeHandle allows you to customize the instance value that is exposed to parent components when using ref. It's used to expose specific methods or properties from a child component to its parent.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { forwardRef, useImperativeHandle, useRef } from 'react';\n\n" +
      "const FancyInput = forwardRef((props, ref) => {\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  useImperativeHandle(ref, () => ({\n" +
      "    focus: () => {\n" +
      "      inputRef.current.focus();\n" +
      "    },\n" +
      "    clear: () => {\n" +
      "      inputRef.current.value = '';\n" +
      "    },\n" +
      "    getValue: () => {\n" +
      "      return inputRef.current.value;\n" +
      "    }\n" +
      "  }));\n" +
      "  \n" +
      "  return <input ref={inputRef} {...props} />;\n" +
      "});\n\n" +
      "// Usage in parent component\n" +
      "function App() {\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  const handleFocus = () => {\n" +
      "    inputRef.current.focus();\n" +
      "  };\n" +
      "  \n" +
      "  const handleClear = () => {\n" +
      "    inputRef.current.clear();\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <FancyInput ref={inputRef} />\n" +
      "      <button onClick={handleFocus}>Focus</button>\n" +
      "      <button onClick={handleClear}>Clear</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- Exposing imperative APIs (focus, scroll, play/pause)\n" +
      "- Third-party library integration\n" +
      "- Complex component interactions\n" +
      "- When declarative props aren't sufficient\n\n" +
      "**Best Practices:**\n" +
      "- Use sparingly (prefer declarative patterns)\n" +
      "- Keep the exposed API minimal\n" +
      "- Document the imperative API\n" +
      "- Consider if the functionality could be achieved declaratively",
    category: "Hooks",
    difficulty: "advanced",
    tags: ["useImperativeHandle", "refs", "forwardRef", "imperative", "api"],
  },
  {
    id: 56,
    question: "Explain React's useLayoutEffect hook. How does it differ from useEffect?",
    answer:
      "useLayoutEffect is identical to useEffect, but it fires synchronously after all DOM mutations but before the browser paints. This makes it perfect for DOM measurements and synchronous updates.\n\n" +
      "**Key Differences:**\n\n" +
      "**useEffect:**\n" +
      "- Runs asynchronously after render\n" +
      "- Doesn't block browser painting\n" +
      "- Good for side effects, data fetching, subscriptions\n\n" +
      "**useLayoutEffect:**\n" +
      "- Runs synchronously after DOM mutations\n" +
      "- Blocks browser painting until it completes\n" +
      "- Good for DOM measurements and synchronous updates\n\n" +
      "**Example: DOM Measurements:**\n" +
      "```javascript\n" +
      "function Tooltip({ children, content }) {\n" +
      "  const [position, setPosition] = useState({ top: 0, left: 0 });\n" +
      "  const tooltipRef = useRef();\n" +
      "  const triggerRef = useRef();\n" +
      "  \n" +
      "  useLayoutEffect(() => {\n" +
      "    if (tooltipRef.current && triggerRef.current) {\n" +
      "      const triggerRect = triggerRef.current.getBoundingClientRect();\n" +
      "      const tooltipRect = tooltipRef.current.getBoundingClientRect();\n" +
      "      \n" +
      "      setPosition({\n" +
      "        top: triggerRect.bottom + 8,\n" +
      "        left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2\n" +
      "      });\n" +
      "    }\n" +
      "  }, [content]);\n" +
      "  \n" +
      "  return (\n" +
      "    <>\n" +
      "      <div ref={triggerRef}>{children}</div>\n" +
      "      <div \n" +
      "        ref={tooltipRef}\n" +
      "        style={{\n" +
      "          position: 'absolute',\n" +
      "          top: position.top,\n" +
      "          left: position.left,\n" +
      "          backgroundColor: 'black',\n" +
      "          color: 'white',\n" +
      "          padding: '4px 8px',\n" +
      "          borderRadius: '4px'\n" +
      "        }}\n" +
      "      >\n" +
      "        {content}\n" +
      "      </div>\n" +
      "    </>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use useLayoutEffect:**\n" +
      "- DOM measurements (getBoundingClientRect, offsetWidth, etc.)\n" +
      "- Synchronous DOM updates\n" +
      "- Preventing visual flicker\n" +
      "- Scrolling or focusing elements\n\n" +
      "**Performance Considerations:**\n" +
      "- Can cause performance issues if overused\n" +
      "- Blocks browser painting\n" +
      "- Use sparingly\n" +
      "- Prefer useEffect when possible",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useLayoutEffect", "dom", "measurements", "synchronous", "performance"],
  },
  {
    id: 57,
    question: "What is React's useDebugValue hook? How is it used for custom hook debugging?",
    answer:
      "useDebugValue is a hook that allows you to display a label for custom hooks in React DevTools. It helps with debugging by showing meaningful information about the hook's state.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useState, useDebugValue } from 'react';\n\n" +
      "function useCounter(initialValue = 0) {\n" +
      "  const [count, setCount] = useState(initialValue);\n" +
      "  \n" +
      "  useDebugValue(count); // Shows count value in DevTools\n" +
      "  \n" +
      "  const increment = () => setCount(c => c + 1);\n" +
      "  const decrement = () => setCount(c => c - 1);\n" +
      "  \n" +
      "  return { count, increment, decrement };\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with Formatter:**\n" +
      "```javascript\n" +
      "function useLocalStorage(key, initialValue) {\n" +
      "  const [storedValue, setStoredValue] = useState(() => {\n" +
      "    try {\n" +
      "      const item = window.localStorage.getItem(key);\n" +
      "      return item ? JSON.parse(item) : initialValue;\n" +
      "    } catch (error) {\n" +
      "      return initialValue;\n" +
      "    }\n" +
      "  });\n" +
      "  \n" +
      "  const setValue = (value) => {\n" +
      "    try {\n" +
      "      setStoredValue(value);\n" +
      "      window.localStorage.setItem(key, JSON.stringify(value));\n" +
      "    } catch (error) {\n" +
      "      console.error(error);\n" +
      "    }\n" +
      "  };\n" +
      "  \n" +
      "  useDebugValue(storedValue, (value) => {\n" +
      "    return `localStorage[${key}]: ${JSON.stringify(value)}`;\n" +
      "  });\n" +
      "  \n" +
      "  return [storedValue, setValue];\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Better debugging experience\n" +
      "- Clear hook state visualization\n" +
      "- Custom formatting for complex data\n" +
      "- Helps identify hook issues\n\n" +
      "**Best Practices:**\n" +
      "- Only use in custom hooks\n" +
      "- Provide meaningful labels\n" +
      "- Use formatter functions for complex data\n" +
      "- Don't use in production builds (automatically removed)",
    category: "Development",
    difficulty: "intermediate",
    tags: ["useDebugValue", "debugging", "devtools", "custom-hooks", "development"],
  },
  {
    id: 58,
    question:
      "What is React's useSyncExternalStore hook? How is it used for external state management?",
    answer:
      "useSyncExternalStore is a hook that allows you to subscribe to external data sources and keep your component in sync with them. It's designed to work with external stores like Redux, Zustand, or any custom state management solution.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useSyncExternalStore } from 'react';\n\n" +
      "// External store\n" +
      "class ExternalStore {\n" +
      "  constructor() {\n" +
      "    this.state = { count: 0 };\n" +
      "    this.listeners = new Set();\n" +
      "  }\n" +
      "  \n" +
      "  getSnapshot() {\n" +
      "    return this.state;\n" +
      "  }\n" +
      "  \n" +
      "  subscribe(listener) {\n" +
      "    this.listeners.add(listener);\n" +
      "    return () => this.listeners.delete(listener);\n" +
      "  }\n" +
      "  \n" +
      "  increment() {\n" +
      "    this.state = { ...this.state, count: this.state.count + 1 };\n" +
      "    this.listeners.forEach(listener => listener());\n" +
      "  }\n" +
      "}\n\n" +
      "const store = new ExternalStore();\n\n" +
      "// Component using the store\n" +
      "function Counter() {\n" +
      "  const state = useSyncExternalStore(\n" +
      "    store.subscribe.bind(store),\n" +
      "    store.getSnapshot.bind(store)\n" +
      "  );\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {state.count}</p>\n" +
      "      <button onClick={() => store.increment()}>Increment</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Works with any external store\n" +
      "- Handles server-side rendering\n" +
      "- Prevents hydration mismatches\n" +
      "- Optimized for performance\n\n" +
      "**When to Use:**\n" +
      "- Integrating with external state libraries\n" +
      "- Custom state management solutions\n" +
      "- Browser APIs (localStorage, sessionStorage)\n" +
      "- WebSocket connections",
    category: "State Management",
    difficulty: "advanced",
    tags: ["useSyncExternalStore", "external-state", "stores", "ssr", "hydration"],
  },
  {
    id: 59,
    question: "What is React's useInsertionEffect hook? When and how should you use it?",
    answer:
      "useInsertionEffect is a hook that fires before any DOM mutations. It's primarily used for injecting styles into the DOM, ensuring they're available before the browser paints.\n\n" +
      "**Key Characteristics:**\n" +
      "- Fires before DOM mutations\n" +
      "- Runs synchronously\n" +
      "- Perfect for style injection\n" +
      "- Similar to useLayoutEffect but earlier\n\n" +
      "**Basic Usage for Style Injection:**\n" +
      "```javascript\n" +
      "import { useInsertionEffect } from 'react';\n\n" +
      "function useCSS(css) {\n" +
      "  useInsertionEffect(() => {\n" +
      "    const style = document.createElement('style');\n" +
      "    style.textContent = css;\n" +
      "    document.head.appendChild(style);\n" +
      "    \n" +
      "    return () => {\n" +
      "      document.head.removeChild(style);\n" +
      "    };\n" +
      "  }, [css]);\n" +
      "}\n\n" +
      "function StyledComponent({ children }) {\n" +
      "  useCSS(`\n" +
      "    .my-component {\n" +
      "      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n" +
      "      padding: 20px;\n" +
      "      border-radius: 8px;\n" +
      "    }\n" +
      "  `);\n" +
      "  \n" +
      "  return <div className='my-component'>{children}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- CSS-in-JS libraries\n" +
      "- Dynamic style injection\n" +
      "- Theme switching\n" +
      "- Critical CSS loading\n\n" +
      "**Performance Considerations:**\n" +
      "- Runs synchronously\n" +
      "- Can block rendering if overused\n" +
      "- Use sparingly\n" +
      "- Prefer CSS modules or styled-components for most cases",
    category: "Hooks",
    difficulty: "advanced",
    tags: ["useInsertionEffect", "styles", "css-in-js", "dom", "performance"],
  },
  {
    id: 60,
    question:
      "What is React's useReducer hook? How does it compare to useState and when should you use it?",
    answer:
      "useReducer is a hook that manages complex state logic using a reducer function. It's similar to useState but more powerful for managing state that involves multiple sub-values or when the next state depends on the previous one.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useReducer } from 'react';\n\n" +
      "const initialState = { count: 0 };\n\n" +
      "function reducer(state, action) {\n" +
      "  switch (action.type) {\n" +
      "    case 'increment':\n" +
      "      return { count: state.count + 1 };\n" +
      "    case 'decrement':\n" +
      "      return { count: state.count - 1 };\n" +
      "    case 'reset':\n" +
      "      return { count: 0 };\n" +
      "    default:\n" +
      "      throw new Error(`Unhandled action type: ${action.type}`);\n" +
      "  }\n" +
      "}\n\n" +
      "function Counter() {\n" +
      "  const [state, dispatch] = useReducer(reducer, initialState);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {state.count}</p>\n" +
      "      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n" +
      "      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>\n" +
      "      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use useReducer:**\n" +
      "- Complex state logic\n" +
      "- Multiple sub-values\n" +
      "- Next state depends on previous state\n" +
      "- Predictable state updates\n" +
      "- Better testing (pure functions)\n\n" +
      "**Benefits over useState:**\n" +
      "- More predictable state updates\n" +
      "- Better for complex state logic\n" +
      "- Easier to test\n" +
      "- Can be used with useContext for global state",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useReducer", "state", "reducer", "complex-state", "predictable"],
  },
  {
    id: 61,
    question:
      "Explain React's useMemo and useCallback hooks in detail. How do they optimize performance?",
    answer:
      "useMemo and useCallback are React hooks that help optimize performance by memoizing values and functions respectively. They prevent unnecessary recalculations and re-renders.\n\n" +
      "**useMemo - Memoizing Values:**\n" +
      "```javascript\n" +
      "import { useMemo, useState } from 'react';\n\n" +
      "function ExpensiveComponent({ items, filter }) {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  \n" +
      "  // Expensive calculation that only runs when items or filter change\n" +
      "  const filteredItems = useMemo(() => {\n" +
      "    console.log('Filtering items...');\n" +
      "    return items.filter(item => \n" +
      "      item.name.toLowerCase().includes(filter.toLowerCase())\n" +
      "    );\n" +
      "  }, [items, filter]);\n" +
      "  \n" +
      "  // Expensive calculation that only runs when filteredItems change\n" +
      "  const totalPrice = useMemo(() => {\n" +
      "    console.log('Calculating total...');\n" +
      "    return filteredItems.reduce((sum, item) => sum + item.price, 0);\n" +
      "  }, [filteredItems]);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {count}</p>\n" +
      "      <button onClick={() => setCount(c => c + 1)}>Increment</button>\n" +
      "      <p>Total Price: ${totalPrice}</p>\n" +
      "      <ul>\n" +
      "        {filteredItems.map(item => (\n" +
      "          <li key={item.id}>{item.name} - ${item.price}</li>\n" +
      "        ))}\n" +
      "      </ul>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**useCallback - Memoizing Functions:**\n" +
      "```javascript\n" +
      "import { useCallback, useState, memo } from 'react';\n\n" +
      "const ExpensiveChild = memo(({ onClick, label }) => {\n" +
      "  console.log(`Rendering ${label}`);\n" +
      "  return <button onClick={onClick}>{label}</button>;\n" +
      "});\n\n" +
      "function Parent() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const [name, setName] = useState('');\n" +
      "  \n" +
      "  // Memoized function that only changes when count changes\n" +
      "  const handleIncrement = useCallback(() => {\n" +
      "    setCount(c => c + 1);\n" +
      "  }, []);\n" +
      "  \n" +
      "  // Memoized function that only changes when name changes\n" +
      "  const handleNameChange = useCallback((e) => {\n" +
      "    setName(e.target.value);\n" +
      "  }, []);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input value={name} onChange={handleNameChange} />\n" +
      "      <ExpensiveChild onClick={handleIncrement} label='Increment' />\n" +
      "      <ExpensiveChild onClick={handleNameChange} label='Change Name' />\n" +
      "      <p>Count: {count}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Considerations:**\n" +
      "- Only use when you have performance issues\n" +
      "- Don't overuse (can hurt performance)\n" +
      "- Measure before and after optimization\n" +
      "- Consider the cost of memoization\n\n" +
      "**When to Use:**\n" +
      "- Expensive calculations\n" +
      "- Preventing unnecessary re-renders\n" +
      "- Optimizing child components\n" +
      "- Complex dependency arrays",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["useMemo", "useCallback", "performance", "memoization", "optimization"],
  },
  {
    id: 62,
    question:
      "What is React's useRef hook? How does it differ from useState and when should you use it?",
    answer:
      "useRef is a hook that returns a mutable ref object whose .current property is initialized to the passed argument. The returned object will persist for the full lifetime of the component and doesn't cause re-renders when its value changes.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useRef, useEffect } from 'react';\n\n" +
      "function TextInputWithFocusButton() {\n" +
      "  const inputEl = useRef(null);\n" +
      "  \n" +
      "  const onButtonClick = () => {\n" +
      "    inputEl.current.focus();\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input ref={inputEl} type='text' />\n" +
      "      <button onClick={onButtonClick}>Focus the input</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Storing Mutable Values:**\n" +
      "```javascript\n" +
      "function Timer() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const intervalRef = useRef();\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    intervalRef.current = setInterval(() => {\n" +
      "      setCount(c => c + 1);\n" +
      "    }, 1000);\n" +
      "    \n" +
      "    return () => clearInterval(intervalRef.current);\n" +
      "  }, []);\n" +
      "  \n" +
      "  const stopTimer = () => {\n" +
      "    clearInterval(intervalRef.current);\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {count}</p>\n" +
      "      <button onClick={stopTimer}>Stop Timer</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Key Differences from useState:**\n" +
      "- **useRef**: Doesn't trigger re-renders, mutable .current property\n" +
      "- **useState**: Triggers re-renders, immutable state value\n\n" +
      "**When to Use useRef:**\n" +
      "- Accessing DOM elements\n" +
      "- Storing mutable values that don't need to trigger re-renders\n" +
      "- Storing previous values\n" +
      "- Storing timers, intervals, or other side effects\n\n" +
      "**Best Practices:**\n" +
      "- Don't use refs for values that should trigger re-renders\n" +
      "- Use refs sparingly\n" +
      "- Prefer declarative approaches when possible",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useRef", "refs", "mutable", "dom", "side-effects"],
  },
  {
    id: 63,
    question: "What is React's useImperativeHandle hook? When and how should you use it?",
    answer:
      "useImperativeHandle allows you to customize the instance value that is exposed to parent components when using ref. It's used to expose specific methods or properties from a child component to its parent.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { forwardRef, useImperativeHandle, useRef } from 'react';\n\n" +
      "const FancyInput = forwardRef((props, ref) => {\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  useImperativeHandle(ref, () => ({\n" +
      "    focus: () => {\n" +
      "      inputRef.current.focus();\n" +
      "    },\n" +
      "    clear: () => {\n" +
      "      inputRef.current.value = '';\n" +
      "    },\n" +
      "    getValue: () => {\n" +
      "      return inputRef.current.value;\n" +
      "    }\n" +
      "  }));\n" +
      "  \n" +
      "  return <input ref={inputRef} {...props} />;\n" +
      "});\n\n" +
      "// Usage in parent component\n" +
      "function App() {\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  const handleFocus = () => {\n" +
      "    inputRef.current.focus();\n" +
      "  };\n" +
      "  \n" +
      "  const handleClear = () => {\n" +
      "    inputRef.current.clear();\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <FancyInput ref={inputRef} />\n" +
      "      <button onClick={handleFocus}>Focus</button>\n" +
      "      <button onClick={handleClear}>Clear</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- Exposing imperative APIs (focus, scroll, play/pause)\n" +
      "- Third-party library integration\n" +
      "- Complex component interactions\n" +
      "- When declarative props aren't sufficient\n\n" +
      "**Best Practices:**\n" +
      "- Use sparingly (prefer declarative patterns)\n" +
      "- Keep the exposed API minimal\n" +
      "- Document the imperative API\n" +
      "- Consider if the functionality could be achieved declaratively",
    category: "Hooks",
    difficulty: "advanced",
    tags: ["useImperativeHandle", "refs", "forwardRef", "imperative", "api"],
  },
  {
    id: 64,
    question: "Explain React's useLayoutEffect hook. How does it differ from useEffect?",
    answer:
      "useLayoutEffect is identical to useEffect, but it fires synchronously after all DOM mutations but before the browser paints. This makes it perfect for DOM measurements and synchronous updates.\n\n" +
      "**Key Differences:**\n\n" +
      "**useEffect:**\n" +
      "- Runs asynchronously after render\n" +
      "- Doesn't block browser painting\n" +
      "- Good for side effects, data fetching, subscriptions\n\n" +
      "**useLayoutEffect:**\n" +
      "- Runs synchronously after DOM mutations\n" +
      "- Blocks browser painting until it completes\n" +
      "- Good for DOM measurements and synchronous updates\n\n" +
      "**Example: DOM Measurements:**\n" +
      "```javascript\n" +
      "function Tooltip({ children, content }) {\n" +
      "  const [position, setPosition] = useState({ top: 0, left: 0 });\n" +
      "  const tooltipRef = useRef();\n" +
      "  const triggerRef = useRef();\n" +
      "  \n" +
      "  useLayoutEffect(() => {\n" +
      "    if (tooltipRef.current && triggerRef.current) {\n" +
      "      const triggerRect = triggerRef.current.getBoundingClientRect();\n" +
      "      const tooltipRect = tooltipRef.current.getBoundingClientRect();\n" +
      "      \n" +
      "      setPosition({\n" +
      "        top: triggerRect.bottom + 8,\n" +
      "        left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2\n" +
      "      });\n" +
      "    }\n" +
      "  }, [content]);\n" +
      "  \n" +
      "  return (\n" +
      "    <>\n" +
      "      <div ref={triggerRef}>{children}</div>\n" +
      "      <div \n" +
      "        ref={tooltipRef}\n" +
      "        style={{\n" +
      "          position: 'absolute',\n" +
      "          top: position.top,\n" +
      "          left: position.left,\n" +
      "          backgroundColor: 'black',\n" +
      "          color: 'white',\n" +
      "          padding: '4px 8px',\n" +
      "          borderRadius: '4px'\n" +
      "        }}\n" +
      "      >\n" +
      "        {content}\n" +
      "      </div>\n" +
      "    </>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use useLayoutEffect:**\n" +
      "- DOM measurements (getBoundingClientRect, offsetWidth, etc.)\n" +
      "- Synchronous DOM updates\n" +
      "- Preventing visual flicker\n" +
      "- Scrolling or focusing elements\n\n" +
      "**Performance Considerations:**\n" +
      "- Can cause performance issues if overused\n" +
      "- Blocks browser painting\n" +
      "- Use sparingly\n" +
      "- Prefer useEffect when possible",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useLayoutEffect", "dom", "measurements", "synchronous", "performance"],
  },
  {
    id: 65,
    question: "What is React's useDebugValue hook? How is it used for custom hook debugging?",
    answer:
      "useDebugValue is a hook that allows you to display a label for custom hooks in React DevTools. It helps with debugging by showing meaningful information about the hook's state.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useState, useDebugValue } from 'react';\n\n" +
      "function useCounter(initialValue = 0) {\n" +
      "  const [count, setCount] = useState(initialValue);\n" +
      "  \n" +
      "  useDebugValue(count); // Shows count value in DevTools\n" +
      "  \n" +
      "  const increment = () => setCount(c => c + 1);\n" +
      "  const decrement = () => setCount(c => c - 1);\n" +
      "  \n" +
      "  return { count, increment, decrement };\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with Formatter:**\n" +
      "```javascript\n" +
      "function useLocalStorage(key, initialValue) {\n" +
      "  const [storedValue, setStoredValue] = useState(() => {\n" +
      "    try {\n" +
      "      const item = window.localStorage.getItem(key);\n" +
      "      return item ? JSON.parse(item) : initialValue;\n" +
      "    } catch (error) {\n" +
      "      return initialValue;\n" +
      "    }\n" +
      "  });\n" +
      "  \n" +
      "  const setValue = (value) => {\n" +
      "    try {\n" +
      "      setStoredValue(value);\n" +
      "      window.localStorage.setItem(key, JSON.stringify(value));\n" +
      "    } catch (error) {\n" +
      "      console.error(error);\n" +
      "    }\n" +
      "  };\n" +
      "  \n" +
      "  useDebugValue(storedValue, (value) => {\n" +
      "    return `localStorage[${key}]: ${JSON.stringify(value)}`;\n" +
      "  });\n" +
      "  \n" +
      "  return [storedValue, setValue];\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Better debugging experience\n" +
      "- Clear hook state visualization\n" +
      "- Custom formatting for complex data\n" +
      "- Helps identify hook issues\n\n" +
      "**Best Practices:**\n" +
      "- Only use in custom hooks\n" +
      "- Provide meaningful labels\n" +
      "- Use formatter functions for complex data\n" +
      "- Don't use in production builds (automatically removed)",
    category: "Development",
    difficulty: "intermediate",
    tags: ["useDebugValue", "debugging", "devtools", "custom-hooks", "development"],
  },
  {
    id: 66,
    question:
      "What is React's useSyncExternalStore hook? How is it used for external state management?",
    answer:
      "useSyncExternalStore is a hook that allows you to subscribe to external data sources and keep your component in sync with them. It's designed to work with external stores like Redux, Zustand, or any custom state management solution.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useSyncExternalStore } from 'react';\n\n" +
      "// External store\n" +
      "class ExternalStore {\n" +
      "  constructor() {\n" +
      "    this.state = { count: 0 };\n" +
      "    this.listeners = new Set();\n" +
      "  }\n" +
      "  \n" +
      "  getSnapshot() {\n" +
      "    return this.state;\n" +
      "  }\n" +
      "  \n" +
      "  subscribe(listener) {\n" +
      "    this.listeners.add(listener);\n" +
      "    return () => this.listeners.delete(listener);\n" +
      "  }\n" +
      "  \n" +
      "  increment() {\n" +
      "    this.state = { ...this.state, count: this.state.count + 1 };\n" +
      "    this.listeners.forEach(listener => listener());\n" +
      "  }\n" +
      "}\n\n" +
      "const store = new ExternalStore();\n\n" +
      "// Component using the store\n" +
      "function Counter() {\n" +
      "  const state = useSyncExternalStore(\n" +
      "    store.subscribe.bind(store),\n" +
      "    store.getSnapshot.bind(store)\n" +
      "  );\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {state.count}</p>\n" +
      "      <button onClick={() => store.increment()}>Increment</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Works with any external store\n" +
      "- Handles server-side rendering\n" +
      "- Prevents hydration mismatches\n" +
      "- Optimized for performance\n\n" +
      "**When to Use:**\n" +
      "- Integrating with external state libraries\n" +
      "- Custom state management solutions\n" +
      "- Browser APIs (localStorage, sessionStorage)\n" +
      "- WebSocket connections",
    category: "State Management",
    difficulty: "advanced",
    tags: ["useSyncExternalStore", "external-state", "stores", "ssr", "hydration"],
  },
  {
    id: 67,
    question: "What is React's useInsertionEffect hook? When and how should you use it?",
    answer:
      "useInsertionEffect is a hook that fires before any DOM mutations. It's primarily used for injecting styles into the DOM, ensuring they're available before the browser paints.\n\n" +
      "**Key Characteristics:**\n" +
      "- Fires before DOM mutations\n" +
      "- Runs synchronously\n" +
      "- Perfect for style injection\n" +
      "- Similar to useLayoutEffect but earlier\n\n" +
      "**Basic Usage for Style Injection:**\n" +
      "```javascript\n" +
      "import { useInsertionEffect } from 'react';\n\n" +
      "function useCSS(css) {\n" +
      "  useInsertionEffect(() => {\n" +
      "    const style = document.createElement('style');\n" +
      "    style.textContent = css;\n" +
      "    document.head.appendChild(style);\n" +
      "    \n" +
      "    return () => {\n" +
      "      document.head.removeChild(style);\n" +
      "    };\n" +
      "  }, [css]);\n" +
      "}\n\n" +
      "function StyledComponent({ children }) {\n" +
      "  useCSS(`\n" +
      "    .my-component {\n" +
      "      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n" +
      "      padding: 20px;\n" +
      "      border-radius: 8px;\n" +
      "    }\n" +
      "  `);\n" +
      "  \n" +
      "  return <div className='my-component'>{children}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- CSS-in-JS libraries\n" +
      "- Dynamic style injection\n" +
      "- Theme switching\n" +
      "- Critical CSS loading\n\n" +
      "**Performance Considerations:**\n" +
      "- Runs synchronously\n" +
      "- Can block rendering if overused\n" +
      "- Use sparingly\n" +
      "- Prefer CSS modules or styled-components for most cases",
    category: "Hooks",
    difficulty: "advanced",
    tags: ["useInsertionEffect", "styles", "css-in-js", "dom", "performance"],
  },
  {
    id: 68,
    question:
      "What is React's useReducer hook? How does it compare to useState and when should you use it?",
    answer:
      "useReducer is a hook that manages complex state logic using a reducer function. It's similar to useState but more powerful for managing state that involves multiple sub-values or when the next state depends on the previous one.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useReducer } from 'react';\n\n" +
      "const initialState = { count: 0 };\n\n" +
      "function reducer(state, action) {\n" +
      "  switch (action.type) {\n" +
      "    case 'increment':\n" +
      "      return { count: state.count + 1 };\n" +
      "    case 'decrement':\n" +
      "      return { count: state.count - 1 };\n" +
      "    case 'reset':\n" +
      "      return { count: 0 };\n" +
      "    default:\n" +
      "      throw new Error(`Unhandled action type: ${action.type}`);\n" +
      "  }\n" +
      "}\n\n" +
      "function Counter() {\n" +
      "  const [state, dispatch] = useReducer(reducer, initialState);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {state.count}</p>\n" +
      "      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n" +
      "      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>\n" +
      "      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use useReducer:**\n" +
      "- Complex state logic\n" +
      "- Multiple sub-values\n" +
      "- Next state depends on previous state\n" +
      "- Predictable state updates\n" +
      "- Better testing (pure functions)\n\n" +
      "**Benefits over useState:**\n" +
      "- More predictable state updates\n" +
      "- Better for complex state logic\n" +
      "- Easier to test\n" +
      "- Can be used with useContext for global state",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useReducer", "state", "reducer", "complex-state", "predictable"],
  },
  {
    id: 69,
    question:
      "Explain React's useMemo and useCallback hooks in detail. How do they optimize performance?",
    answer:
      "useMemo and useCallback are React hooks that help optimize performance by memoizing values and functions respectively. They prevent unnecessary recalculations and re-renders.\n\n" +
      "**useMemo - Memoizing Values:**\n" +
      "```javascript\n" +
      "import { useMemo, useState } from 'react';\n\n" +
      "function ExpensiveComponent({ items, filter }) {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  \n" +
      "  // Expensive calculation that only runs when items or filter change\n" +
      "  const filteredItems = useMemo(() => {\n" +
      "    console.log('Filtering items...');\n" +
      "    return items.filter(item => \n" +
      "      item.name.toLowerCase().includes(filter.toLowerCase())\n" +
      "    );\n" +
      "  }, [items, filter]);\n" +
      "  \n" +
      "  // Expensive calculation that only runs when filteredItems change\n" +
      "  const totalPrice = useMemo(() => {\n" +
      "    console.log('Calculating total...');\n" +
      "    return filteredItems.reduce((sum, item) => sum + item.price, 0);\n" +
      "  }, [filteredItems]);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {count}</p>\n" +
      "      <button onClick={() => setCount(c => c + 1)}>Increment</button>\n" +
      "      <p>Total Price: ${totalPrice}</p>\n" +
      "      <ul>\n" +
      "        {filteredItems.map(item => (\n" +
      "          <li key={item.id}>{item.name} - ${item.price}</li>\n" +
      "        ))}\n" +
      "      </ul>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**useCallback - Memoizing Functions:**\n" +
      "```javascript\n" +
      "import { useCallback, useState, memo } from 'react';\n\n" +
      "const ExpensiveChild = memo(({ onClick, label }) => {\n" +
      "  console.log(`Rendering ${label}`);\n" +
      "  return <button onClick={onClick}>{label}</button>;\n" +
      "});\n\n" +
      "function Parent() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const [name, setName] = useState('');\n" +
      "  \n" +
      "  // Memoized function that only changes when count changes\n" +
      "  const handleIncrement = useCallback(() => {\n" +
      "    setCount(c => c + 1);\n" +
      "  }, []);\n" +
      "  \n" +
      "  // Memoized function that only changes when name changes\n" +
      "  const handleNameChange = useCallback((e) => {\n" +
      "    setName(e.target.value);\n" +
      "  }, []);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input value={name} onChange={handleNameChange} />\n" +
      "      <ExpensiveChild onClick={handleIncrement} label='Increment' />\n" +
      "      <ExpensiveChild onClick={handleNameChange} label='Change Name' />\n" +
      "      <p>Count: {count}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Considerations:**\n" +
      "- Only use when you have performance issues\n" +
      "- Don't overuse (can hurt performance)\n" +
      "- Measure before and after optimization\n" +
      "- Consider the cost of memoization\n\n" +
      "**When to Use:**\n" +
      "- Expensive calculations\n" +
      "- Preventing unnecessary re-renders\n" +
      "- Optimizing child components\n" +
      "- Complex dependency arrays",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["useMemo", "useCallback", "performance", "memoization", "optimization"],
  },
  {
    id: 70,
    question:
      "What is React's useRef hook? How does it differ from useState and when should you use it?",
    answer:
      "useRef is a hook that returns a mutable ref object whose .current property is initialized to the passed argument. The returned object will persist for the full lifetime of the component and doesn't cause re-renders when its value changes.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useRef, useEffect } from 'react';\n\n" +
      "function TextInputWithFocusButton() {\n" +
      "  const inputEl = useRef(null);\n" +
      "  \n" +
      "  const onButtonClick = () => {\n" +
      "    inputEl.current.focus();\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input ref={inputEl} type='text' />\n" +
      "      <button onClick={onButtonClick}>Focus the input</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Storing Mutable Values:**\n" +
      "```javascript\n" +
      "function Timer() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const intervalRef = useRef();\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    intervalRef.current = setInterval(() => {\n" +
      "      setCount(c => c + 1);\n" +
      "    }, 1000);\n" +
      "    \n" +
      "    return () => clearInterval(intervalRef.current);\n" +
      "  }, []);\n" +
      "  \n" +
      "  const stopTimer = () => {\n" +
      "    clearInterval(intervalRef.current);\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {count}</p>\n" +
      "      <button onClick={stopTimer}>Stop Timer</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Key Differences from useState:**\n" +
      "- **useRef**: Doesn't trigger re-renders, mutable .current property\n" +
      "- **useState**: Triggers re-renders, immutable state value\n\n" +
      "**When to Use useRef:**\n" +
      "- Accessing DOM elements\n" +
      "- Storing mutable values that don't need to trigger re-renders\n" +
      "- Storing previous values\n" +
      "- Storing timers, intervals, or other side effects\n\n" +
      "**Best Practices:**\n" +
      "- Don't use refs for values that should trigger re-renders\n" +
      "- Use refs sparingly\n" +
      "- Prefer declarative approaches when possible",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["useRef", "refs", "mutable", "dom", "side-effects"],
  },
  {
    id: 71,
    question:
      "What is React's StrictMode? How does it help with development and what warnings does it provide?",
    answer:
      "React.StrictMode is a tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants and helps identify unsafe lifecycles, legacy API usage, and other problems.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import React from 'react';\n" +
      "import ReactDOM from 'react-dom/client';\n" +
      "import App from './App';\n\n" +
      "const root = ReactDOM.createRoot(document.getElementById('root'));\n" +
      "root.render(\n" +
      "  <React.StrictMode>\n" +
      "    <App />\n" +
      "  </React.StrictMode>\n" +
      ");\n" +
      "```\n\n" +
      "**What StrictMode Does:**\n" +
      "- Identifies components with unsafe lifecycles\n" +
      "- Warns about legacy string ref API usage\n" +
      "- Warns about deprecated findDOMNode usage\n" +
      "- Detects unexpected side effects\n" +
      "- Detects legacy context API\n" +
      "- Ensures reusable state\n\n" +
      "**Double Invocation:**\n" +
      "```javascript\n" +
      "function MyComponent() {\n" +
      "  console.log('Component rendered'); // This will log twice in StrictMode\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    console.log('Effect ran'); // This will also run twice\n" +
      "    \n" +
      "    return () => {\n" +
      "      console.log('Cleanup ran'); // This will run twice too\n" +
      "    };\n" +
      "  }, []);\n" +
      "  \n" +
      "  return <div>Hello World</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Helps identify side effects\n" +
      "- Prepares for future React versions\n" +
      "- Encourages best practices\n" +
      "- Only runs in development mode\n\n" +
      "**When to Use:**\n" +
      "- Always wrap your app in StrictMode during development\n" +
      "- Helps catch bugs early\n" +
      "- Prepares for concurrent features",
    category: "Development",
    difficulty: "intermediate",
    tags: ["StrictMode", "development", "warnings", "side-effects", "best-practices"],
  },
  {
    id: 72,
    question: "What is React's Error Boundary? How do you implement and use error boundaries?",
    answer:
      "Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.\n\n" +
      "**Basic Implementation:**\n" +
      "```javascript\n" +
      "import React from 'react';\n\n" +
      "class ErrorBoundary extends React.Component {\n" +
      "  constructor(props) {\n" +
      "    super(props);\n" +
      "    this.state = { hasError: false, error: null };\n" +
      "  }\n\n" +
      "  static getDerivedStateFromError(error) {\n" +
      "    return { hasError: true, error };\n" +
      "  }\n\n" +
      "  componentDidCatch(error, errorInfo) {\n" +
      "    console.error('Error caught by boundary:', error, errorInfo);\n" +
      "    // Log error to service\n" +
      "    this.logErrorToService(error, errorInfo);\n" +
      "  }\n\n" +
      "  logErrorToService = (error, errorInfo) => {\n" +
      "    // Send to error reporting service\n" +
      "    console.log('Logging error:', { error, errorInfo });\n" +
      "  };\n\n" +
      "  render() {\n" +
      "    if (this.state.hasError) {\n" +
      "      return (\n" +
      "        <div className='error-boundary'>\n" +
      "          <h2>Something went wrong.</h2>\n" +
      "          <details>\n" +
      "            <summary>Error details</summary>\n" +
      "            <pre>{this.state.error && this.state.error.toString()}</pre>\n" +
      "          </details>\n" +
      "          <button onClick={() => this.setState({ hasError: false, error: null })}>\n" +
      "            Try again\n" +
      "          </button>\n" +
      "        </div>\n" +
      "      );\n" +
      "    }\n\n" +
      "    return this.props.children;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Usage:**\n" +
      "```javascript\n" +
      "function App() {\n" +
      "  return (\n" +
      "    <ErrorBoundary>\n" +
      "      <Header />\n" +
      "      <MainContent />\n" +
      "      <Footer />\n" +
      "    </ErrorBoundary>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**What Error Boundaries Catch:**\n" +
      "- Render errors\n" +
      "- Lifecycle method errors\n" +
      "- Constructor errors\n\n" +
      "**What They Don't Catch:**\n" +
      "- Event handlers\n" +
      "- Asynchronous code\n" +
      "- Errors during server-side rendering\n" +
      "- Errors in the error boundary itself\n\n" +
      "**Best Practices:**\n" +
      "- Place error boundaries strategically\n" +
      "- Log errors to monitoring services\n" +
      "- Provide meaningful fallback UIs\n" +
      "- Allow users to recover from errors",
    category: "Error Handling",
    difficulty: "intermediate",
    tags: ["ErrorBoundary", "error-handling", "fallback-ui", "component-lifecycle", "recovery"],
  },
  {
    id: 73,
    question:
      "What is React's Context API? How do you create and use context for state management?",
    answer:
      "React Context provides a way to pass data through the component tree without having to pass props down manually at every level. It's designed to share data that can be considered 'global' for a tree of React components.\n\n" +
      "**Creating Context:**\n" +
      "```javascript\n" +
      "import React, { createContext, useContext, useState } from 'react';\n\n" +
      "// Create context\n" +
      "const ThemeContext = createContext();\n\n" +
      "// Provider component\n" +
      "function ThemeProvider({ children }) {\n" +
      "  const [theme, setTheme] = useState('light');\n" +
      "  \n" +
      "  const toggleTheme = () => {\n" +
      "    setTheme(prev => prev === 'light' ? 'dark' : 'light');\n" +
      "  };\n" +
      "  \n" +
      "  const value = {\n" +
      "    theme,\n" +
      "    toggleTheme,\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <ThemeContext.Provider value={value}>\n" +
      "      {children}\n" +
      "    </ThemeContext.Provider>\n" +
      "  );\n" +
      "}\n\n" +
      "// Custom hook to use context\n" +
      "function useTheme() {\n" +
      "  const context = useContext(ThemeContext);\n" +
      "  if (!context) {\n" +
      "    throw new Error('useTheme must be used within a ThemeProvider');\n" +
      "  }\n" +
      "  return context;\n" +
      "}\n" +
      "```\n\n" +
      "**Using Context:**\n" +
      "```javascript\n" +
      "function App() {\n" +
      "  return (\n" +
      "    <ThemeProvider>\n" +
      "      <Header />\n" +
      "      <MainContent />\n" +
      "      <Footer />\n" +
      "    </ThemeProvider>\n" +
      "  );\n" +
      "}\n\n" +
      "function Header() {\n" +
      "  const { theme, toggleTheme } = useTheme();\n" +
      "  \n" +
      "  return (\n" +
      "    <header className={`header ${theme}`}>\n" +
      "      <h1>My App</h1>\n" +
      "      <button onClick={toggleTheme}>\n" +
      "        Switch to {theme === 'light' ? 'dark' : 'light'} theme\n" +
      "      </button>\n" +
      "    </header>\n" +
      "  );\n" +
      "}\n\n" +
      "function MainContent() {\n" +
      "  const { theme } = useTheme();\n" +
      "  \n" +
      "  return (\n" +
      "    <main className={`main ${theme}`}>\n" +
      "      <p>Current theme: {theme}</p>\n" +
      "    </main>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use Context:**\n" +
      "- Global state (theme, user authentication, language)\n" +
      "- Avoiding prop drilling\n" +
      "- Sharing data across many components\n\n" +
      "**Performance Considerations:**\n" +
      "- Context causes re-renders when value changes\n" +
      "- Split contexts by concern\n" +
      "- Use multiple contexts instead of one large context\n" +
      "- Memoize context values when possible\n\n" +
      "**Best Practices:**\n" +
      "- Create custom hooks for context consumption\n" +
      "- Provide default values\n" +
      "- Validate context usage\n" +
      "- Consider using state management libraries for complex state",
    category: "State Management",
    difficulty: "intermediate",
    tags: ["Context", "state-management", "prop-drilling", "global-state", "provider"],
  },
  {
    id: 74,
    question: "What is React's forwardRef? How do you use it to pass refs to child components?",
    answer:
      "forwardRef is a React function that allows you to pass a ref through a component to one of its children. It's useful when you need to access DOM elements or component instances from parent components.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import React, { forwardRef } from 'react';\n\n" +
      "const FancyButton = forwardRef((props, ref) => (\n" +
      "  <button ref={ref} className='fancy-button' {...props}>\n" +
      "    {props.children}\n" +
      "  </button>\n" +
      "));\n\n" +
      "function App() {\n" +
      "  const buttonRef = useRef();\n" +
      "  \n" +
      "  const focusButton = () => {\n" +
      "    buttonRef.current.focus();\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <FancyButton ref={buttonRef}>\n" +
      "        Click me!\n" +
      "      </FancyButton>\n" +
      "      <button onClick={focusButton}>Focus Fancy Button</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with useImperativeHandle:**\n" +
      "```javascript\n" +
      "import React, { forwardRef, useImperativeHandle, useRef } from 'react';\n\n" +
      "const CustomInput = forwardRef((props, ref) => {\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  useImperativeHandle(ref, () => ({\n" +
      "    focus: () => {\n" +
      "      inputRef.current.focus();\n" +
      "    },\n" +
      "    clear: () => {\n" +
      "      inputRef.current.value = '';\n" +
      "    },\n" +
      "    getValue: () => {\n" +
      "      return inputRef.current.value;\n" +
      "    },\n" +
      "    setValue: (value) => {\n" +
      "      inputRef.current.value = value;\n" +
      "    }\n" +
      "  }));\n" +
      "  \n" +
      "  return (\n" +
      "    <input\n" +
      "      ref={inputRef}\n" +
      "      {...props}\n" +
      "    />\n" +
      "  );\n" +
      "});\n\n" +
      "function Form() {\n" +
      "  const inputRef = useRef();\n" +
      "  \n" +
      "  const handleSubmit = () => {\n" +
      "    const value = inputRef.current.getValue();\n" +
      "    console.log('Form value:', value);\n" +
      "  };\n" +
      "  \n" +
      "  const handleClear = () => {\n" +
      "    inputRef.current.clear();\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <CustomInput ref={inputRef} placeholder='Enter text...' />\n" +
      "      <button onClick={handleSubmit}>Submit</button>\n" +
      "      <button onClick={handleClear}>Clear</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use forwardRef:**\n" +
      "- Building reusable component libraries\n" +
      "- Wrapping third-party components\n" +
      "- Creating components that need DOM access\n" +
      "- Implementing imperative APIs\n\n" +
      "**Best Practices:**\n" +
      "- Use sparingly (prefer declarative patterns)\n" +
      "- Combine with useImperativeHandle for custom APIs\n" +
      "- Document the exposed methods\n" +
      "- Consider if the functionality could be achieved declaratively",
    category: "Advanced Patterns",
    difficulty: "intermediate",
    tags: ["forwardRef", "refs", "imperative", "component-libraries", "dom-access"],
  },
  {
    id: 75,
    question: "What is React's memo? How does it optimize component re-rendering?",
    answer:
      "React.memo is a higher-order component that memoizes the result of a component. It only re-renders if its props have changed, similar to React.PureComponent but for function components.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import React, { memo, useState } from 'react';\n\n" +
      "const ExpensiveComponent = memo(({ name, age }) => {\n" +
      "  console.log('ExpensiveComponent rendered');\n" +
      "  \n" +
      "  // Simulate expensive calculation\n" +
      "  const expensiveValue = useMemo(() => {\n" +
      "    let result = 0;\n" +
      "    for (let i = 0; i < 1000000; i++) {\n" +
      "      result += i;\n" +
      "    }\n" +
      "    return result;\n" +
      "  }, []);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h3>{name}</h3>\n" +
      "      <p>Age: {age}</p>\n" +
      "      <p>Expensive value: {expensiveValue}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "});\n\n" +
      "function Parent() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  const [name, setName] = useState('John');\n" +
      "  const [age, setAge] = useState(25);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {count}</p>\n" +
      "      <button onClick={() => setCount(c => c + 1)}>Increment</button>\n" +
      "      \n" +
      "      <ExpensiveComponent name={name} age={age} />\n" +
      "      \n" +
      "      <button onClick={() => setName('Jane')}>Change Name</button>\n" +
      "      <button onClick={() => setAge(30)}>Change Age</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Custom Comparison Function:**\n" +
      "```javascript\n" +
      "const MyComponent = memo(({ user, settings }) => {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h3>{user.name}</h3>\n" +
      "      <p>Theme: {settings.theme}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}, (prevProps, nextProps) => {\n" +
      "  // Custom comparison logic\n" +
      "  return (\n" +
      "    prevProps.user.id === nextProps.user.id &&\n" +
      "    prevProps.settings.theme === nextProps.settings.theme\n" +
      "  );\n" +
      "});\n" +
      "```\n\n" +
      "**When to Use memo:**\n" +
      "- Components that render frequently\n" +
      "- Components with expensive render logic\n" +
      "- Components that receive the same props often\n" +
      "- Leaf components in large component trees\n\n" +
      "**Performance Considerations:**\n" +
      "- Only use when you have performance issues\n" +
      "- Measure before and after optimization\n" +
      "- Don't overuse (can hurt performance)\n" +
      "- Consider the cost of comparison\n\n" +
      "**Best Practices:**\n" +
      "- Use with useMemo and useCallback\n" +
      "- Profile performance before optimizing\n" +
      "- Consider if props are stable\n" +
      "- Use custom comparison functions sparingly",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["memo", "performance", "optimization", "re-rendering", "pure-component"],
  },
  {
    id: 76,
    question:
      "What is React's lazy loading? How do you implement code splitting with React.lazy and Suspense?",
    answer:
      "React.lazy allows you to load components lazily (on-demand) as they're needed. Combined with Suspense, it enables code splitting to reduce bundle size and improve initial load performance.\n\n" +
      "**Basic Implementation:**\n" +
      "```javascript\n" +
      "import React, { Suspense, lazy } from 'react';\n\n" +
      "// Lazy load components\n" +
      "const LazyComponent = lazy(() => import('./LazyComponent'));\n" +
      "const LazyDashboard = lazy(() => import('./Dashboard'));\n" +
      "const LazyProfile = lazy(() => import('./Profile'));\n\n" +
      "function App() {\n" +
      "  const [currentView, setCurrentView] = useState('home');\n" +
      "  \n" +
      "  const renderView = () => {\n" +
      "    switch (currentView) {\n" +
      "      case 'dashboard':\n" +
      "        return <LazyDashboard />;\n" +
      "      case 'profile':\n" +
      "        return <LazyProfile />;\n" +
      "      default:\n" +
      "        return <LazyComponent />;\n" +
      "    }\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <nav>\n" +
      "        <button onClick={() => setCurrentView('home')}>Home</button>\n" +
      "        <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>\n" +
      "        <button onClick={() => setCurrentView('profile')}>Profile</button>\n" +
      "      </nav>\n" +
      "      \n" +
      "      <Suspense fallback={<div>Loading...</div>}>\n" +
      "        {renderView()}\n" +
      "      </Suspense>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Route-based Code Splitting:**\n" +
      "```javascript\n" +
      "import React, { Suspense, lazy } from 'react';\n" +
      "import { BrowserRouter, Routes, Route } from 'react-router-dom';\n\n" +
      "const Home = lazy(() => import('./pages/Home'));\n" +
      "const About = lazy(() => import('./pages/About'));\n" +
      "const Contact = lazy(() => import('./pages/Contact'));\n\n" +
      "function App() {\n" +
      "  return (\n" +
      "    <BrowserRouter>\n" +
      "      <Suspense fallback={<div>Loading page...</div>}>\n" +
      "        <Routes>\n" +
      "          <Route path='/' element={<Home />} />\n" +
      "          <Route path='/about' element={<About />} />\n" +
      "          <Route path='/contact' element={<Contact />} />\n" +
      "        </Routes>\n" +
      "      </Suspense>\n" +
      "    </BrowserRouter>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Loading States:**\n" +
      "```javascript\n" +
      "function LoadingSpinner() {\n" +
      "  return (\n" +
      "    <div className='loading-spinner'>\n" +
      "      <div className='spinner'></div>\n" +
      "      <p>Loading component...</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n\n" +
      "function App() {\n" +
      "  return (\n" +
      "    <Suspense fallback={<LoadingSpinner />}>\n" +
      "      <LazyComponent />\n" +
      "    </Suspense>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Reduced initial bundle size\n" +
      "- Faster initial page load\n" +
      "- Better user experience\n" +
      "- Improved performance\n\n" +
      "**Best Practices:**\n" +
      "- Use for large components\n" +
      "- Implement proper loading states\n" +
      "- Consider preloading critical components\n" +
      "- Monitor bundle sizes",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["lazy", "code-splitting", "suspense", "performance", "bundle-size"],
  },
  {
    id: 77,
    question:
      "What is React's Concurrent Mode? How does it improve user experience and performance?",
    answer:
      "React Concurrent Mode is a set of new features that help React apps stay responsive and gracefully adjust to the user's device capabilities and network speed. It enables React to interrupt rendering work to handle higher priority updates.\n\n" +
      "**Key Features:**\n" +
      "- **Interruptible Rendering**: React can pause, abort, or restart work\n" +
      "- **Priority-based Updates**: Urgent updates can interrupt less urgent ones\n" +
      "- **Suspense for Data Fetching**: Better loading states\n" +
      "- **Automatic Batching**: Multiple state updates are batched automatically\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import React, { startTransition, useState } from 'react';\n\n" +
      "function SearchResults({ query }) {\n" +
      "  const [results, setResults] = useState([]);\n" +
      "  const [isPending, startTransition] = useTransition();\n" +
      "  \n" +
      "  const handleSearch = (newQuery) => {\n" +
      "    // Urgent: Update input immediately\n" +
      "    setQuery(newQuery);\n" +
      "    \n" +
      "    // Non-urgent: Update results\n" +
      "    startTransition(() => {\n" +
      "      setResults(expensiveSearch(newQuery));\n" +
      "    });\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input \n" +
      "        value={query} \n" +
      "        onChange={(e) => handleSearch(e.target.value)}\n" +
      "      />\n" +
      "      {isPending && <div>Searching...</div>}\n" +
      "      <ResultsList results={results} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Suspense for Data Fetching:**\n" +
      "```javascript\n" +
      "import { Suspense } from 'react';\n" +
      "import { useQuery } from '@tanstack/react-query';\n\n" +
      "function UserProfile({ userId }) {\n" +
      "  const { data: user } = useQuery({\n" +
      "    queryKey: ['user', userId],\n" +
      "    queryFn: () => fetchUser(userId),\n" +
      "    suspense: true\n" +
      "  });\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h2>{user.name}</h2>\n" +
      "      <p>{user.email}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n\n" +
      "function App() {\n" +
      "  return (\n" +
      "    <Suspense fallback={<div>Loading user...</div>}>\n" +
      "      <UserProfile userId={123} />\n" +
      "    </Suspense>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Better user experience\n" +
      "- More responsive interfaces\n" +
      "- Graceful handling of slow networks\n" +
      "- Improved performance\n\n" +
      "**When to Use:**\n" +
      "- Large applications\n" +
      "- Complex user interactions\n" +
      "- Data-heavy components\n" +
      "- Performance-critical features",
    category: "Advanced Features",
    difficulty: "advanced",
    tags: ["concurrent-mode", "suspense", "transitions", "performance", "user-experience"],
  },
  {
    id: 78,
    question: "What is React's Server Components? How do they differ from Client Components?",
    answer:
      "React Server Components are a new way to build React applications that run on the server and can be rendered to HTML before being sent to the client. They enable better performance and reduced bundle size by keeping server-only code on the server.\n\n" +
      "**Key Differences:**\n" +
      "- **Server Components**: Run on server, no JavaScript sent to client\n" +
      "- **Client Components**: Run in browser, JavaScript sent to client\n\n" +
      "**Server Component Example:**\n" +
      "```javascript\n" +
      "// Server Component (runs on server)\n" +
      "async function UserProfile({ userId }) {\n" +
      "  // Direct database access (server-only)\n" +
      "  const user = await db.users.findById(userId);\n" +
      "  const posts = await db.posts.findByUserId(userId);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>{user.name}</h1>\n" +
      "      <p>{user.email}</p>\n" +
      "      <PostsList posts={posts} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Client Component Example:**\n" +
      "```javascript\n" +
      "'use client';\n\n" +
      "// Client Component (runs in browser)\n" +
      "function InteractiveButton({ onClick }) {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  \n" +
      "  return (\n" +
      "    <button onClick={() => setCount(c => c + 1)}>\n" +
      "      Clicked {count} times\n" +
      "    </button>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Mixed Usage:**\n" +
      "```javascript\n" +
      "// Server Component\n" +
      "async function BlogPost({ postId }) {\n" +
      "  const post = await db.posts.findById(postId);\n" +
      "  \n" +
      "  return (\n" +
      "    <article>\n" +
      "      <h1>{post.title}</h1>\n" +
      "      <p>{post.content}</p>\n" +
      "      <LikeButton postId={postId} />\n" +
      "    </article>\n" +
      "  );\n" +
      "}\n\n" +
      "'use client';\n" +
      "// Client Component\n" +
      "function LikeButton({ postId }) {\n" +
      "  const [likes, setLikes] = useState(0);\n" +
      "  \n" +
      "  const handleLike = async () => {\n" +
      "    await fetch(`/api/posts/${postId}/like`, { method: 'POST' });\n" +
      "    setLikes(l => l + 1);\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <button onClick={handleLike}>\n" +
      "      👍 {likes}\n" +
      "    </button>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Smaller JavaScript bundles\n" +
      "- Better performance\n" +
      "- Direct server access\n" +
      "- Reduced client-side complexity\n\n" +
      "**Limitations:**\n" +
      "- No browser APIs\n" +
      "- No event handlers\n" +
      "- No state or effects\n" +
      "- No client-side interactivity",
    category: "Advanced Features",
    difficulty: "advanced",
    tags: ["server-components", "client-components", "server-side", "performance", "bundle-size"],
  },
  {
    id: 79,
    question:
      "What is React's useDeferredValue hook? How does it help with performance optimization?",
    answer:
      "useDeferredValue is a React hook that lets you defer updating a part of the UI. It's useful for keeping the interface responsive during expensive updates by showing stale content while new content is being prepared.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useDeferredValue, useState, useMemo } from 'react';\n\n" +
      "function SearchResults({ query }) {\n" +
      "  const [query, setQuery] = useState('');\n" +
      "  const deferredQuery = useDeferredValue(query);\n" +
      "  \n" +
      "  // Expensive search that only runs when deferredQuery changes\n" +
      "  const results = useMemo(() => {\n" +
      "    if (!deferredQuery) return [];\n" +
      "    \n" +
      "    console.log('Searching for:', deferredQuery);\n" +
      "    return expensiveSearch(deferredQuery);\n" +
      "  }, [deferredQuery]);\n" +
      "  \n" +
      "  const isStale = query !== deferredQuery;\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input \n" +
      "        value={query} \n" +
      "        onChange={(e) => setQuery(e.target.value)}\n" +
      "        placeholder='Search...'\n" +
      "      />\n" +
      "      \n" +
      "      <div style={{ opacity: isStale ? 0.5 : 1 }}>\n" +
      "        {results.map(result => (\n" +
      "          <div key={result.id}>{result.title}</div>\n" +
      "        ))}\n" +
      "      </div>\n" +
      "      \n" +
      "      {isStale && <div>Updating results...</div>}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with Transitions:**\n" +
      "```javascript\n" +
      "import { useDeferredValue, useTransition, useState } from 'react';\n\n" +
      "function DataVisualization({ data }) {\n" +
      "  const [filter, setFilter] = useState('all');\n" +
      "  const [isPending, startTransition] = useTransition();\n" +
      "  const deferredFilter = useDeferredValue(filter);\n" +
      "  \n" +
      "  const handleFilterChange = (newFilter) => {\n" +
      "    startTransition(() => {\n" +
      "      setFilter(newFilter);\n" +
      "    });\n" +
      "  };\n" +
      "  \n" +
      "  const filteredData = useMemo(() => {\n" +
      "    return data.filter(item => \n" +
      "      deferredFilter === 'all' || item.category === deferredFilter\n" +
      "    );\n" +
      "  }, [data, deferredFilter]);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <div>\n" +
      "        <button onClick={() => handleFilterChange('all')}>All</button>\n" +
      "        <button onClick={() => handleFilterChange('tech')}>Tech</button>\n" +
      "        <button onClick={() => handleFilterChange('business')}>Business</button>\n" +
      "      </div>\n" +
      "      \n" +
      "      {isPending && <div>Filtering...</div>}\n" +
      "      \n" +
      "      <Chart data={filteredData} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- Expensive computations\n" +
      "- Large lists or tables\n" +
      "- Complex data transformations\n" +
      "- Search and filtering\n\n" +
      "**Benefits:**\n" +
      "- Keeps UI responsive\n" +
      "- Prevents blocking updates\n" +
      "- Better user experience\n" +
      "- Automatic optimization\n\n" +
      "**Best Practices:**\n" +
      "- Use with useMemo for expensive calculations\n" +
      "- Combine with useTransition for better control\n" +
      "- Show loading states when appropriate\n" +
      "- Consider the trade-off between freshness and performance",
    category: "Performance",
    difficulty: "advanced",
    tags: ["useDeferredValue", "performance", "optimization", "responsive", "expensive-updates"],
  },
  {
    id: 80,
    question:
      "What is React's useTransition hook? How does it help with managing non-urgent updates?",
    answer:
      "useTransition is a React hook that lets you mark state updates as transitions, which are non-urgent updates that can be interrupted by more urgent updates. It helps keep the UI responsive during expensive operations.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import { useTransition, useState } from 'react';\n\n" +
      "function SearchResults({ query }) {\n" +
      "  const [results, setResults] = useState([]);\n" +
      "  const [isPending, startTransition] = useTransition();\n" +
      "  \n" +
      "  const handleSearch = (newQuery) => {\n" +
      "    // Urgent: Update input immediately\n" +
      "    setQuery(newQuery);\n" +
      "    \n" +
      "    // Non-urgent: Update results\n" +
      "    startTransition(() => {\n" +
      "      setResults(expensiveSearch(newQuery));\n" +
      "    });\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input \n" +
      "        value={query} \n" +
      "        onChange={(e) => handleSearch(e.target.value)}\n" +
      "        placeholder='Search...'\n" +
      "      />\n" +
      "      \n" +
      "      {isPending && <div>Searching...</div>}\n" +
      "      \n" +
      "      <div style={{ opacity: isPending ? 0.5 : 1 }}>\n" +
      "        {results.map(result => (\n" +
      "          <div key={result.id}>{result.title}</div>\n" +
      "        ))}\n" +
      "      </div>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage with Multiple Transitions:**\n" +
      "```javascript\n" +
      "function DataTable({ data }) {\n" +
      "  const [sortBy, setSortBy] = useState('name');\n" +
      "  const [filter, setFilter] = useState('');\n" +
      "  const [isPending, startTransition] = useTransition();\n" +
      "  \n" +
      "  const handleSort = (newSortBy) => {\n" +
      "    startTransition(() => {\n" +
      "      setSortBy(newSortBy);\n" +
      "    });\n" +
      "  };\n" +
      "  \n" +
      "  const handleFilter = (newFilter) => {\n" +
      "    startTransition(() => {\n" +
      "      setFilter(newFilter);\n" +
      "    });\n" +
      "  };\n" +
      "  \n" +
      "  const processedData = useMemo(() => {\n" +
      "    let filtered = data.filter(item => \n" +
      "      item.name.toLowerCase().includes(filter.toLowerCase())\n" +
      "    );\n" +
      "    \n" +
      "    return filtered.sort((a, b) => {\n" +
      "      if (sortBy === 'name') return a.name.localeCompare(b.name);\n" +
      "      if (sortBy === 'date') return new Date(a.date) - new Date(b.date);\n" +
      "      return 0;\n" +
      "    });\n" +
      "  }, [data, filter, sortBy]);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <div>\n" +
      "        <input \n" +
      "          value={filter} \n" +
      "          onChange={(e) => handleFilter(e.target.value)}\n" +
      "          placeholder='Filter...'\n" +
      "        />\n" +
      "        <button onClick={() => handleSort('name')}>Sort by Name</button>\n" +
      "        <button onClick={() => handleSort('date')}>Sort by Date</button>\n" +
      "      </div>\n" +
      "      \n" +
      "      {isPending && <div>Processing...</div>}\n" +
      "      \n" +
      "      <table>\n" +
      "        <tbody>\n" +
      "          {processedData.map(item => (\n" +
      "            <tr key={item.id}>\n" +
      "              <td>{item.name}</td>\n" +
      "              <td>{item.date}</td>\n" +
      "            </tr>\n" +
      "          ))}\n" +
      "        </tbody>\n" +
      "      </table>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- Expensive state updates\n" +
      "- Large data processing\n" +
      "- Complex filtering or sorting\n" +
      "- Non-critical UI updates\n\n" +
      "**Benefits:**\n" +
      "- Keeps UI responsive\n" +
      "- Prevents blocking updates\n" +
      "- Better user experience\n" +
      "- Automatic priority management\n\n" +
      "**Best Practices:**\n" +
      "- Use for non-urgent updates\n" +
      "- Show loading states\n" +
      "- Combine with useDeferredValue\n" +
      "- Consider the user experience impact",
    category: "Performance",
    difficulty: "advanced",
    tags: ["useTransition", "performance", "non-urgent", "responsive", "priority"],
  },
];

export default REACT_ENHANCED_QUESTIONS;
