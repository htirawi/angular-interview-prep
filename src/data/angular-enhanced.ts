// Angular Interview Questions - Senior-Level (Angular 16-19)
// Comprehensive answers designed for technical interview preparation
// Covers: Interceptors, RxJS, Observables, NgRx, Change Detection, Signals, and more

export interface QA {
  id: number;
  question: string;
  answer: string;
  category?: string;
  difficulty?: string;
  tags?: string[];
}

export const ANGULAR_ENHANCED_QUESTIONS: QA[] = [
  {
    id: 1,
    question:
      "What are HTTP Interceptors in Angular? Explain common use cases with detailed examples.",
    answer:
      "HTTP Interceptors are services that intercept and modify HTTP requests and responses globally in your Angular application.\n\n" +
      "**How Interceptors Work:**\n\n" +
      "Interceptors sit between your application and the HTTP backend:\n" +
      "```\n" +
      "Component → HttpClient → Interceptor Chain → Backend\n" +
      "Component ← HttpClient ← Interceptor Chain ← Backend\n" +
      "```\n\n" +
      "**Creating an Interceptor:**\n\n" +
      "```typescript\n" +
      "import { Injectable } from '@angular/core';\n" +
      "import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';\n" +
      "import { Observable } from 'rxjs';\n\n" +
      "@Injectable()\n" +
      "export class AuthInterceptor implements HttpInterceptor {\n" +
      "  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {\n" +
      "    // Clone and modify request\n" +
      "    const authReq = req.clone({\n" +
      "      setHeaders: {\n" +
      "        Authorization: `Bearer ${this.getToken()}`\n" +
      "      }\n" +
      "    });\n\n" +
      "    // Pass to next interceptor or backend\n" +
      "    return next.handle(authReq);\n" +
      "  }\n\n" +
      "  private getToken(): string {\n" +
      "    return localStorage.getItem('token') || '';\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Registering Interceptors (Angular 15+):**\n\n" +
      "```typescript\n" +
      "// main.ts or app.config.ts\n" +
      "import { provideHttpClient, withInterceptors } from '@angular/common/http';\n\n" +
      "export const appConfig: ApplicationConfig = {\n" +
      "  providers: [\n" +
      "    provideHttpClient(\n" +
      "      withInterceptors([authInterceptor, loggingInterceptor])\n" +
      "    )\n" +
      "  ]\n" +
      "};\n\n" +
      "// Functional interceptor (Angular 15+)\n" +
      "export const authInterceptor: HttpInterceptorFn = (req, next) => {\n" +
      "  const token = inject(AuthService).getToken();\n" +
      "  \n" +
      "  const authReq = req.clone({\n" +
      "    setHeaders: { Authorization: `Bearer ${token}` }\n" +
      "  });\n" +
      "  \n" +
      "  return next(authReq);\n" +
      "};\n" +
      "```\n\n" +
      "**Legacy Registration (Angular <15):**\n\n" +
      "```typescript\n" +
      "// app.module.ts\n" +
      "import { HTTP_INTERCEPTORS } from '@angular/common/http';\n\n" +
      "@NgModule({\n" +
      "  providers: [\n" +
      "    {\n" +
      "      provide: HTTP_INTERCEPTORS,\n" +
      "      useClass: AuthInterceptor,\n" +
      "      multi: true // Important! Allows multiple interceptors\n" +
      "    }\n" +
      "  ]\n" +
      "})\n" +
      "```\n\n" +
      "**Common Use Cases:**\n\n" +
      "**1. Authentication (Add JWT Token):**\n\n" +
      "```typescript\n" +
      "@Injectable()\n" +
      "export class AuthInterceptor implements HttpInterceptor {\n" +
      "  constructor(private authService: AuthService) {}\n\n" +
      "  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {\n" +
      "    // Skip for login/register endpoints\n" +
      "    if (req.url.includes('/auth/')) {\n" +
      "      return next.handle(req);\n" +
      "    }\n\n" +
      "    const token = this.authService.getToken();\n" +
      "    \n" +
      "    if (token) {\n" +
      "      const cloned = req.clone({\n" +
      "        setHeaders: {\n" +
      "          Authorization: `Bearer ${token}`\n" +
      "        }\n" +
      "      });\n" +
      "      return next.handle(cloned);\n" +
      "    }\n\n" +
      "    return next.handle(req);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**2. Error Handling & Retry:**\n\n" +
      "```typescript\n" +
      "import { catchError, retry, throwError } from 'rxjs';\n\n" +
      "@Injectable()\n" +
      "export class ErrorInterceptor implements HttpInterceptor {\n" +
      "  constructor(\n" +
      "    private router: Router,\n" +
      "    private toastr: ToastrService\n" +
      "  ) {}\n\n" +
      "  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {\n" +
      "    return next.handle(req).pipe(\n" +
      "      retry(2), // Retry failed requests twice\n" +
      "      catchError((error: HttpErrorResponse) => {\n" +
      "        if (error.status === 401) {\n" +
      "          // Unauthorized - redirect to login\n" +
      "          this.router.navigate(['/login']);\n" +
      "        } else if (error.status === 403) {\n" +
      "          this.toastr.error('Access denied');\n" +
      "        } else if (error.status === 500) {\n" +
      "          this.toastr.error('Server error. Please try again later.');\n" +
      "        }\n\n" +
      "        return throwError(() => error);\n" +
      "      })\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**3. Logging & Monitoring:**\n\n" +
      "```typescript\n" +
      "import { tap, finalize } from 'rxjs/operators';\n\n" +
      "@Injectable()\n" +
      "export class LoggingInterceptor implements HttpInterceptor {\n" +
      "  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {\n" +
      "    const started = Date.now();\n" +
      "    console.log(`[HTTP] ${req.method} ${req.url}`);\n\n" +
      "    return next.handle(req).pipe(\n" +
      "      tap(\n" +
      "        event => {\n" +
      "          if (event instanceof HttpResponse) {\n" +
      "            const elapsed = Date.now() - started;\n" +
      "            console.log(`[HTTP] ${req.method} ${req.url} - ${event.status} in ${elapsed}ms`);\n" +
      "          }\n" +
      "        }\n" +
      "      ),\n" +
      "      finalize(() => {\n" +
      "        console.log(`[HTTP] ${req.method} ${req.url} completed`);\n" +
      "      })\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**4. Loading Indicator:**\n\n" +
      "```typescript\n" +
      "@Injectable()\n" +
      "export class LoadingInterceptor implements HttpInterceptor {\n" +
      "  constructor(private loadingService: LoadingService) {}\n\n" +
      "  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {\n" +
      "    this.loadingService.show();\n\n" +
      "    return next.handle(req).pipe(\n" +
      "      finalize(() => this.loadingService.hide())\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**5. Caching:**\n\n" +
      "```typescript\n" +
      "@Injectable()\n" +
      "export class CacheInterceptor implements HttpInterceptor {\n" +
      "  private cache = new Map<string, HttpResponse<any>>();\n\n" +
      "  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {\n" +
      "    // Only cache GET requests\n" +
      "    if (req.method !== 'GET') {\n" +
      "      return next.handle(req);\n" +
      "    }\n\n" +
      "    // Check cache\n" +
      "    const cachedResponse = this.cache.get(req.url);\n" +
      "    if (cachedResponse) {\n" +
      "      return of(cachedResponse.clone());\n" +
      "    }\n\n" +
      "    // Cache response\n" +
      "    return next.handle(req).pipe(\n" +
      "      tap(event => {\n" +
      "        if (event instanceof HttpResponse) {\n" +
      "          this.cache.set(req.url, event.clone());\n" +
      "        }\n" +
      "      })\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**6. Request/Response Transformation:**\n\n" +
      "```typescript\n" +
      "@Injectable()\n" +
      "export class ApiInterceptor implements HttpInterceptor {\n" +
      "  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {\n" +
      "    // Add API prefix\n" +
      "    const apiReq = req.clone({\n" +
      "      url: `https://api.myapp.com${req.url}`,\n" +
      "      setHeaders: {\n" +
      "        'Content-Type': 'application/json',\n" +
      "        'X-API-Version': '2.0'\n" +
      "      }\n" +
      "    });\n\n" +
      "    return next.handle(apiReq).pipe(\n" +
      "      map(event => {\n" +
      "        if (event instanceof HttpResponse) {\n" +
      "          // Transform response data\n" +
      "          return event.clone({\n" +
      "            body: this.transformResponse(event.body)\n" +
      "          });\n" +
      "        }\n" +
      "        return event;\n" +
      "      })\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**7. Token Refresh:**\n\n" +
      "```typescript\n" +
      "@Injectable()\n" +
      "export class TokenInterceptor implements HttpInterceptor {\n" +
      "  private isRefreshing = false;\n" +
      "  private refreshTokenSubject = new BehaviorSubject<string | null>(null);\n\n" +
      "  constructor(\n" +
      "    private authService: AuthService,\n" +
      "    private router: Router\n" +
      "  ) {}\n\n" +
      "  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {\n" +
      "    const token = this.authService.getAccessToken();\n\n" +
      "    if (token) {\n" +
      "      req = this.addToken(req, token);\n" +
      "    }\n\n" +
      "    return next.handle(req).pipe(\n" +
      "      catchError(error => {\n" +
      "        if (error.status === 401 && !req.url.includes('/refresh')) {\n" +
      "          return this.handle401Error(req, next);\n" +
      "        }\n" +
      "        return throwError(() => error);\n" +
      "      })\n" +
      "    );\n" +
      "  }\n\n" +
      "  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {\n" +
      "    if (!this.isRefreshing) {\n" +
      "      this.isRefreshing = true;\n" +
      "      this.refreshTokenSubject.next(null);\n\n" +
      "      return this.authService.refreshToken().pipe(\n" +
      "        switchMap((token: string) => {\n" +
      "          this.isRefreshing = false;\n" +
      "          this.refreshTokenSubject.next(token);\n" +
      "          return next.handle(this.addToken(req, token));\n" +
      "        }),\n" +
      "        catchError(err => {\n" +
      "          this.isRefreshing = false;\n" +
      "          this.authService.logout();\n" +
      "          return throwError(() => err);\n" +
      "        })\n" +
      "      );\n" +
      "    } else {\n" +
      "      // Wait for token refresh\n" +
      "      return this.refreshTokenSubject.pipe(\n" +
      "        filter(token => token !== null),\n" +
      "        take(1),\n" +
      "        switchMap(token => next.handle(this.addToken(req, token)))\n" +
      "      );\n" +
      "    }\n" +
      "  }\n\n" +
      "  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {\n" +
      "    return req.clone({\n" +
      "      setHeaders: { Authorization: `Bearer ${token}` }\n" +
      "    });\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n\n" +
      "1. **Immutability:** Always clone requests (they're immutable)\n" +
      "2. **Order Matters:** Interceptors execute in registration order\n" +
      "3. **Error Handling:** Use catchError to handle errors gracefully\n" +
      "4. **Skip Interceptors:** Use HttpBackend for requests that should skip interceptors\n" +
      "5. **Testing:** Mock interceptors in tests using HttpTestingController",
    category: "HTTP",
    difficulty: "hard",
    tags: ["interceptors", "http", "auth", "error-handling", "rxjs"],
  },
  {
    id: 2,
    question: "Explain Observables in Angular/RxJS. How do they differ from Promises?",
    answer:
      "Observables are lazy, cancellable streams that can emit multiple values over time, unlike Promises which are eager and emit one value.\n\n" +
      "**Observable Basics:**\n\n" +
      "```typescript\n" +
      "import { Observable } from 'rxjs';\n\n" +
      "// Create an observable\n" +
      "const observable = new Observable<number>(subscriber => {\n" +
      "  console.log('Observable started');\n" +
      "  subscriber.next(1);\n" +
      "  subscriber.next(2);\n" +
      "  subscriber.next(3);\n" +
      "  subscriber.complete();\n" +
      "  \n" +
      "  // Cleanup function\n" +
      "  return () => {\n" +
      "    console.log('Observable cleaned up');\n" +
      "  };\n" +
      "});\n\n" +
      "// Subscribe to receive values\n" +
      "const subscription = observable.subscribe({\n" +
      "  next: (value) => console.log('Received:', value),\n" +
      "  error: (err) => console.error('Error:', err),\n" +
      "  complete: () => console.log('Complete')\n" +
      "});\n\n" +
      "// Unsubscribe to cancel\n" +
      "subscription.unsubscribe();\n" +
      "```\n\n" +
      "**Observable vs Promise:**\n\n" +
      "| Feature | Observable | Promise |\n" +
      "|---------|-----------|--------|\n" +
      "| Execution | Lazy (starts on subscribe) | Eager (starts immediately) |\n" +
      "| Values | Multiple (stream) | Single value |\n" +
      "| Cancellation | Yes (unsubscribe) | No |\n" +
      "| Operators | Rich (map, filter, etc.) | Limited (then, catch) |\n" +
      "| Push/Pull | Push (producer decides) | Push (one value) |\n\n" +
      "**Comparison Example:**\n\n" +
      "```typescript\n" +
      "// Promise - Executes immediately\n" +
      "const promise = fetch('/api/data').then(res => res.json());\n" +
      "console.log('Promise created');\n" +
      "// Output: 'Promise created' (fetch already running)\n\n" +
      "// Observable - Lazy (doesn't execute until subscribe)\n" +
      "const observable = new Observable(subscriber => {\n" +
      "  console.log('Fetching...');\n" +
      "  fetch('/api/data')\n" +
      "    .then(res => res.json())\n" +
      "    .then(data => {\n" +
      "      subscriber.next(data);\n" +
      "      subscriber.complete();\n" +
      "    });\n" +
      "});\n\n" +
      "console.log('Observable created');\n" +
      "// Output: 'Observable created' (NO fetch yet)\n\n" +
      "observable.subscribe(data => console.log(data));\n" +
      "// NOW Output: 'Fetching...'\n" +
      "```\n\n" +
      "**Multiple Values:**\n\n" +
      "```typescript\n" +
      "// Promise - Single value\n" +
      "const promise = Promise.resolve(1);\n" +
      "promise.then(val => console.log(val)); // 1\n" +
      "// Can't emit more values\n\n" +
      "// Observable - Multiple values\n" +
      "const observable = new Observable(subscriber => {\n" +
      "  subscriber.next(1);\n" +
      "  subscriber.next(2);\n" +
      "  subscriber.next(3);\n" +
      "});\n\n" +
      "observable.subscribe(val => console.log(val));\n" +
      "// Output: 1, 2, 3\n" +
      "```\n\n" +
      "**Cancellation:**\n\n" +
      "```typescript\n" +
      "// Promise - Cannot cancel\n" +
      "const promise = longRunningOperation();\n" +
      "// No way to cancel it!\n\n" +
      "// Observable - Cancellable\n" +
      "const subscription = observable.subscribe(...);\n" +
      "subscription.unsubscribe(); // Stops execution, runs cleanup\n" +
      "```\n\n" +
      "**Common Operators:**\n\n" +
      "```typescript\n" +
      "import { of, interval } from 'rxjs';\n" +
      "import { map, filter, take, debounceTime, switchMap } from 'rxjs/operators';\n\n" +
      "// map - Transform values\n" +
      "of(1, 2, 3).pipe(\n" +
      "  map(x => x * 2)\n" +
      ").subscribe(console.log); // 2, 4, 6\n\n" +
      "// filter - Filter values\n" +
      "of(1, 2, 3, 4).pipe(\n" +
      "  filter(x => x % 2 === 0)\n" +
      ").subscribe(console.log); // 2, 4\n\n" +
      "// take - Limit emissions\n" +
      "interval(1000).pipe(\n" +
      "  take(3)\n" +
      ").subscribe(console.log); // 0, 1, 2, then complete\n\n" +
      "// debounceTime - Wait for pause in emissions\n" +
      "searchInput.valueChanges.pipe(\n" +
      "  debounceTime(300), // Wait 300ms after last keystroke\n" +
      "  switchMap(query => this.searchService.search(query))\n" +
      ").subscribe(results => this.results = results);\n" +
      "```\n\n" +
      "**Angular Integration:**\n\n" +
      "```typescript\n" +
      "// HttpClient returns Observables\n" +
      "@Component({...})\n" +
      "export class UserComponent implements OnInit, OnDestroy {\n" +
      "  users$: Observable<User[]>;\n" +
      "  private subscription = new Subscription();\n\n" +
      "  constructor(private http: HttpClient) {}\n\n" +
      "  ngOnInit() {\n" +
      "    // Method 1: Subscribe in component\n" +
      "    this.subscription.add(\n" +
      "      this.http.get<User[]>('/api/users').subscribe({\n" +
      "        next: users => this.users = users,\n" +
      "        error: err => console.error(err)\n" +
      "      })\n" +
      "    );\n\n" +
      "    // Method 2: Use async pipe (better!)\n" +
      "    this.users$ = this.http.get<User[]>('/api/users');\n" +
      "  }\n\n" +
      "  ngOnDestroy() {\n" +
      "    this.subscription.unsubscribe(); // Prevent memory leaks\n" +
      "  }\n" +
      "}\n\n" +
      "// Template with async pipe\n" +
      '<div *ngFor="let user of users$ | async">\n' +
      "  {{ user.name }}\n" +
      "</div>\n" +
      "// async pipe auto-subscribes and auto-unsubscribes!\n" +
      "```\n\n" +
      "**Key Takeaway:** Observables are perfect for async streams (HTTP, events, websockets). They're lazy, cancellable, and composable with operators. Always unsubscribe to prevent memory leaks (or use async pipe).",
    category: "RxJS",
    difficulty: "hard",
    tags: ["observables", "rxjs", "async", "streams", "fundamentals"],
  },
  {
    id: 3,
    question:
      "Explain RxJS Subjects. What are the differences between Subject, BehaviorSubject, ReplaySubject, and AsyncSubject?",
    answer:
      "Subjects are special Observables that can multicast to multiple observers AND allow you to manually emit values.\n\n" +
      "**Observable vs Subject:**\n\n" +
      "```typescript\n" +
      "// Regular Observable - Unicast (separate execution per subscriber)\n" +
      "const observable = new Observable(subscriber => {\n" +
      "  console.log('Execution!');\n" +
      "  subscriber.next(Math.random());\n" +
      "});\n\n" +
      "observable.subscribe(val => console.log('Sub 1:', val));\n" +
      "observable.subscribe(val => console.log('Sub 2:', val));\n" +
      "// Output:\n" +
      "// 'Execution!'\n" +
      "// 'Sub 1: 0.123'\n" +
      "// 'Execution!'\n" +
      "// 'Sub 2: 0.456'\n" +
      "// Different values! (separate executions)\n\n" +
      "// Subject - Multicast (shared execution)\n" +
      "const subject = new Subject<number>();\n\n" +
      "subject.subscribe(val => console.log('Sub 1:', val));\n" +
      "subject.subscribe(val => console.log('Sub 2:', val));\n\n" +
      "subject.next(0.789);\n" +
      "// Output:\n" +
      "// 'Sub 1: 0.789'\n" +
      "// 'Sub 2: 0.789'\n" +
      "// Same value! (shared execution)\n" +
      "```\n\n" +
      "**1. Subject (Basic):**\n\n" +
      "No initial value. New subscribers only get future emissions.\n\n" +
      "```typescript\n" +
      "import { Subject } from 'rxjs';\n\n" +
      "const subject = new Subject<string>();\n\n" +
      "subject.subscribe(val => console.log('Sub 1:', val));\n" +
      "subject.next('A'); // Sub 1: A\n\n" +
      "subject.subscribe(val => console.log('Sub 2:', val));\n" +
      "subject.next('B'); // Sub 1: B, Sub 2: B\n\n" +
      "// Sub 2 never receives 'A' (it was emitted before subscription)\n" +
      "```\n\n" +
      "**Use Case:** Event bus, notifications\n\n" +
      "```typescript\n" +
      "// Notification service\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class NotificationService {\n" +
      "  private notificationSubject = new Subject<Notification>();\n" +
      "  notifications$ = this.notificationSubject.asObservable();\n\n" +
      "  show(message: string, type: 'success' | 'error') {\n" +
      "    this.notificationSubject.next({ message, type });\n" +
      "  }\n" +
      "}\n\n" +
      "// In component\n" +
      "this.notificationService.notifications$.subscribe(notif => {\n" +
      "  this.showToast(notif);\n" +
      "});\n" +
      "```\n\n" +
      "**2. BehaviorSubject:**\n\n" +
      "Requires initial value. New subscribers immediately receive current/last value.\n\n" +
      "```typescript\n" +
      "import { BehaviorSubject } from 'rxjs';\n\n" +
      "const subject = new BehaviorSubject<string>('Initial');\n\n" +
      "subject.subscribe(val => console.log('Sub 1:', val));\n" +
      "// Sub 1: Initial (receives immediately!)\n\n" +
      "subject.next('A'); // Sub 1: A\n\n" +
      "subject.subscribe(val => console.log('Sub 2:', val));\n" +
      "// Sub 2: A (receives current value immediately)\n\n" +
      "subject.next('B'); // Sub 1: B, Sub 2: B\n\n" +
      "// Get current value synchronously\n" +
      "console.log(subject.getValue()); // 'B'\n" +
      "```\n\n" +
      "**Use Case:** Shared state, current user, theme\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class AuthService {\n" +
      "  private currentUserSubject = new BehaviorSubject<User | null>(null);\n" +
      "  currentUser$ = this.currentUserSubject.asObservable();\n\n" +
      "  constructor() {\n" +
      "    // Initialize from localStorage\n" +
      "    const user = this.getUserFromStorage();\n" +
      "    this.currentUserSubject.next(user);\n" +
      "  }\n\n" +
      "  login(credentials: Credentials) {\n" +
      "    return this.http.post<User>('/api/login', credentials).pipe(\n" +
      "      tap(user => this.currentUserSubject.next(user))\n" +
      "    );\n" +
      "  }\n\n" +
      "  logout() {\n" +
      "    this.currentUserSubject.next(null);\n" +
      "  }\n\n" +
      "  // Synchronous access to current value\n" +
      "  get currentUserValue(): User | null {\n" +
      "    return this.currentUserSubject.getValue();\n" +
      "  }\n" +
      "}\n\n" +
      "// In component - always has current user\n" +
      "this.authService.currentUser$.subscribe(user => {\n" +
      "  this.user = user; // Receives immediately if user exists\n" +
      "});\n" +
      "```\n\n" +
      "**3. ReplaySubject:**\n\n" +
      "Buffers N previous values. New subscribers receive buffered values.\n\n" +
      "```typescript\n" +
      "import { ReplaySubject } from 'rxjs';\n\n" +
      "// Buffer last 3 values\n" +
      "const subject = new ReplaySubject<string>(3);\n\n" +
      "subject.next('A');\n" +
      "subject.next('B');\n" +
      "subject.next('C');\n" +
      "subject.next('D');\n\n" +
      "subject.subscribe(val => console.log('Sub 1:', val));\n" +
      "// Sub 1: B (oldest in buffer)\n" +
      "// Sub 1: C\n" +
      "// Sub 1: D (newest)\n\n" +
      "subject.next('E');\n" +
      "// Sub 1: E\n\n" +
      "subject.subscribe(val => console.log('Sub 2:', val));\n" +
      "// Sub 2: C\n" +
      "// Sub 2: D\n" +
      "// Sub 2: E\n" +
      "```\n\n" +
      "**Time Window:**\n" +
      "```typescript\n" +
      "// Replay values from last 500ms\n" +
      "const subject = new ReplaySubject<string>(100, 500);\n" +
      "```\n\n" +
      "**Use Case:** Activity log, chat history\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class ActivityService {\n" +
      "  // Keep last 10 activities\n" +
      "  private activitySubject = new ReplaySubject<Activity>(10);\n" +
      "  activities$ = this.activitySubject.asObservable();\n\n" +
      "  logActivity(activity: Activity) {\n" +
      "    this.activitySubject.next(activity);\n" +
      "  }\n" +
      "}\n\n" +
      "// Late subscriber gets last 10 activities immediately\n" +
      "```\n\n" +
      "**4. AsyncSubject:**\n\n" +
      "Emits only the last value when complete.\n\n" +
      "```typescript\n" +
      "import { AsyncSubject } from 'rxjs';\n\n" +
      "const subject = new AsyncSubject<string>();\n\n" +
      "subject.subscribe(val => console.log('Sub 1:', val));\n\n" +
      "subject.next('A');\n" +
      "subject.next('B');\n" +
      "subject.next('C');\n" +
      "// Nothing logged yet!\n\n" +
      "subject.complete();\n" +
      "// Sub 1: C (only last value before complete)\n\n" +
      "subject.subscribe(val => console.log('Sub 2:', val));\n" +
      "// Sub 2: C (immediately receives last value)\n" +
      "```\n\n" +
      "**Use Case:** Final result of async operation\n\n" +
      "**Comparison Table:**\n\n" +
      "| Type | Initial Value | Emissions | Use Case |\n" +
      "|------|--------------|-----------|----------|\n" +
      "| Subject | None | Future only | Events, messages |\n" +
      "| BehaviorSubject | Required | Current + future | State, current user |\n" +
      "| ReplaySubject | None | Buffer + future | History, audit log |\n" +
      "| AsyncSubject | None | Last value only | Final result |\n\n" +
      "**Common Patterns:**\n\n" +
      "```typescript\n" +
      "// Private Subject, public Observable\n" +
      "export class DataService {\n" +
      "  private dataSubject = new BehaviorSubject<Data>(initialData);\n" +
      "  data$ = this.dataSubject.asObservable(); // Read-only\n\n" +
      "  // Only service can emit\n" +
      "  updateData(data: Data) {\n" +
      "    this.dataSubject.next(data);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Memory Leaks:**\n\n" +
      "```typescript\n" +
      "// ❌ Leak - never completes, subscribers accumulate\n" +
      "private subject = new Subject<string>();\n\n" +
      "ngOnInit() {\n" +
      "  this.subject.subscribe(...); // Leak if component destroyed\n" +
      "}\n\n" +
      "// ✅ Complete on destroy\n" +
      "ngOnDestroy() {\n" +
      "  this.subject.complete(); // Unsubscribes all observers\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "1. Use BehaviorSubject for state management\n" +
      "2. Expose as Observable (not Subject)\n" +
      "3. Complete subjects in ngOnDestroy\n" +
      "4. Use async pipe when possible (auto-unsubscribe)\n" +
      "5. Prefer Subject over EventEmitter in services",
    category: "RxJS",
    difficulty: "hard",
    tags: ["subject", "behaviorsubject", "replaysubject", "rxjs", "state-management", "multicast"],
  },
  {
    id: 4,
    question:
      "Explain Angular's Change Detection mechanism. How does it work and how can you optimize it?",
    answer:
      "Change Detection is Angular's mechanism for synchronizing the component tree with the DOM when data changes.\n\n" +
      "**How Change Detection Works:**\n\n" +
      "**1. Zone.js (Default Strategy):**\n\n" +
      "Zone.js patches async operations and triggers change detection automatically:\n" +
      "```typescript\n" +
      "// These trigger change detection:\n" +
      "- DOM events (click, input, etc.)\n" +
      "- setTimeout / setInterval\n" +
      "- HTTP requests\n" +
      "- Promises\n" +
      "- RxJS observables (with async pipe)\n" +
      "```\n\n" +
      "**Change Detection Flow:**\n\n" +
      "```\n" +
      "1. Event occurs (e.g., button click)\n" +
      "2. Zone.js notifies Angular\n" +
      "3. Angular runs change detection from root\n" +
      "4. Checks each component's bindings\n" +
      "5. Updates DOM if values changed\n" +
      "```\n\n" +
      "**Default Strategy:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-user',\n" +
      "  template: `<div>{{ user.name }}</div>`,\n" +
      "  // changeDetection: ChangeDetectionStrategy.Default (default)\n" +
      "})\n" +
      "export class UserComponent {\n" +
      "  @Input() user: User;\n" +
      "}\n\n" +
      "// Checks component on EVERY change detection cycle\n" +
      "// Even if inputs haven't changed!\n" +
      "```\n\n" +
      "**OnPush Strategy (Optimized):**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-user',\n" +
      "  template: `<div>{{ user.name }}</div>`,\n" +
      "  changeDetection: ChangeDetectionStrategy.OnPush // Optimize!\n" +
      "})\n" +
      "export class UserComponent {\n" +
      "  @Input() user: User;\n" +
      "}\n\n" +
      "// Only checks component when:\n" +
      "// 1. Input reference changes\n" +
      "// 2. Event fires from component or children\n" +
      "// 3. Observable emits via async pipe\n" +
      "// 4. Manual trigger (ChangeDetectorRef.markForCheck)\n" +
      "```\n\n" +
      "**OnPush Gotchas:**\n\n" +
      "```typescript\n" +
      "// ❌ Mutation doesn't trigger change detection\n" +
      "@Component({\n" +
      "  changeDetection: ChangeDetectionStrategy.OnPush\n" +
      "})\n" +
      "export class ListComponent {\n" +
      "  @Input() items: Item[];\n\n" +
      "  addItem(item: Item) {\n" +
      "    this.items.push(item); // Mutation! Reference didn't change\n" +
      "    // UI won't update!\n" +
      "  }\n" +
      "}\n\n" +
      "// ✅ Create new reference\n" +
      "addItem(item: Item) {\n" +
      "  this.items = [...this.items, item]; // New array reference\n" +
      "  // UI updates!\n" +
      "}\n" +
      "```\n\n" +
      "**Manual Change Detection:**\n\n" +
      "```typescript\n" +
      "import { ChangeDetectorRef } from '@angular/core';\n\n" +
      "@Component({...})\n" +
      "export class MyComponent {\n" +
      "  constructor(private cdr: ChangeDetectorRef) {}\n\n" +
      "  // Mark this component and ancestors for check\n" +
      "  markForCheck() {\n" +
      "    this.cdr.markForCheck();\n" +
      "  }\n\n" +
      "  // Immediately check this component and children\n" +
      "  detectChanges() {\n" +
      "    this.cdr.detectChanges();\n" +
      "  }\n\n" +
      "  // Detach from change detection tree\n" +
      "  detach() {\n" +
      "    this.cdr.detach();\n" +
      "    // Component won't be checked until reattach()\n" +
      "  }\n\n" +
      "  // Reattach to change detection tree\n" +
      "  reattach() {\n" +
      "    this.cdr.reattach();\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Optimization Patterns:**\n\n" +
      "**1. Use OnPush Everywhere:**\n\n" +
      "```typescript\n" +
      "// ✅ OnPush + Immutable data\n" +
      "@Component({\n" +
      "  changeDetection: ChangeDetectionStrategy.OnPush\n" +
      "})\n" +
      "export class SmartComponent {\n" +
      "  users$ = this.userService.getUsers(); // Observable\n" +
      "}\n\n" +
      "// Template\n" +
      '<div *ngFor="let user of users$ | async">\n' +
      "  {{ user.name }}\n" +
      "</div>\n" +
      "```\n\n" +
      "**2. Detach for High-Frequency Updates:**\n\n" +
      "```typescript\n" +
      "// WebSocket updates 60 times per second\n" +
      "@Component({...})\n" +
      "export class ChartComponent implements OnInit, OnDestroy {\n" +
      "  constructor(private cdr: ChangeDetectorRef) {}\n\n" +
      "  ngOnInit() {\n" +
      "    this.cdr.detach(); // Detach from automatic CD\n\n" +
      "    this.websocket.data$.subscribe(data => {\n" +
      "      this.chartData = data;\n" +
      "      // Manually trigger CD only every 100ms\n" +
      "      this.scheduleUpdate();\n" +
      "    });\n" +
      "  }\n\n" +
      "  private updateScheduled = false;\n\n" +
      "  private scheduleUpdate() {\n" +
      "    if (this.updateScheduled) return;\n" +
      "    \n" +
      "    this.updateScheduled = true;\n" +
      "    setTimeout(() => {\n" +
      "      this.cdr.detectChanges();\n" +
      "      this.updateScheduled = false;\n" +
      "    }, 100);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**3. Run Outside Angular Zone:**\n\n" +
      "```typescript\n" +
      "import { NgZone } from '@angular/core';\n\n" +
      "@Component({...})\n" +
      "export class AnimationComponent {\n" +
      "  constructor(private ngZone: NgZone) {}\n\n" +
      "  startAnimation() {\n" +
      "    // Run outside Angular - no change detection\n" +
      "    this.ngZone.runOutsideAngular(() => {\n" +
      "      requestAnimationFrame(() => this.animate());\n" +
      "    });\n" +
      "  }\n\n" +
      "  private animate() {\n" +
      "    // Heavy animation loop\n" +
      "    // Doesn't trigger CD on every frame\n" +
      "    \n" +
      "    if (this.shouldContinue) {\n" +
      "      requestAnimationFrame(() => this.animate());\n" +
      "    } else {\n" +
      "      // Re-enter Angular zone when done\n" +
      "      this.ngZone.run(() => {\n" +
      "        this.animationComplete = true;\n" +
      "      });\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**4. TrackBy for ngFor:**\n\n" +
      "```typescript\n" +
      "// ❌ Without trackBy - recreates DOM on every change\n" +
      '<div *ngFor="let item of items">\n' +
      "  {{ item.name }}\n" +
      "</div>\n\n" +
      "// ✅ With trackBy - reuses DOM\n" +
      '<div *ngFor="let item of items; trackBy: trackById">\n' +
      "  {{ item.name }}\n" +
      "</div>\n\n" +
      "trackById(index: number, item: Item): number {\n" +
      "  return item.id; // Unique identifier\n" +
      "}\n" +
      "```\n\n" +
      "**Zoneless Angular (Angular 18+):**\n\n" +
      "```typescript\n" +
      "// Opt out of Zone.js\n" +
      "bootstrapApplication(AppComponent, {\n" +
      "  providers: [\n" +
      "    provideExperimentalZonelessChangeDetection()\n" +
      "  ]\n" +
      "});\n\n" +
      "// Use Signals for reactivity instead\n" +
      "@Component({...})\n" +
      "export class MyComponent {\n" +
      "  count = signal(0); // Signal\n\n" +
      "  increment() {\n" +
      "    this.count.set(this.count() + 1); // Triggers CD automatically\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Profiling:**\n\n" +
      "```typescript\n" +
      "// Enable in DevTools\n" +
      "ng.profiler.timeChangeDetection();\n\n" +
      "// Chrome DevTools Performance tab\n" +
      "// Look for: [AngularChangeDetection]\n" +
      "```\n\n" +
      "**Key Takeaway:** Use OnPush + immutable data + async pipe for optimal performance. Zone.js is convenient but has overhead; Signals (Angular 16+) offer better performance with fine-grained reactivity.",
    category: "Core Concepts",
    difficulty: "hard",
    tags: ["change-detection", "performance", "zonejs", "onpush", "optimization", "signals"],
  },
  {
    id: 5,
    question:
      "What are Signals in Angular (16+)? How do they differ from Observables and improve change detection?",
    answer:
      "Signals are Angular's new primitive for reactive state management, providing fine-grained reactivity without Zone.js overhead.\n\n" +
      "**What is a Signal?**\n\n" +
      "A signal is a wrapper around a value that notifies consumers when the value changes.\n\n" +
      "```typescript\n" +
      "import { signal, computed, effect } from '@angular/core';\n\n" +
      "@Component({...})\n" +
      "export class CounterComponent {\n" +
      "  // Create signal with initial value\n" +
      "  count = signal(0);\n\n" +
      "  // Read value\n" +
      "  get currentCount() {\n" +
      "    return this.count(); // Call as function\n" +
      "  }\n\n" +
      "  // Update value\n" +
      "  increment() {\n" +
      "    this.count.set(this.count() + 1); // Set new value\n" +
      "    // or\n" +
      "    this.count.update(val => val + 1); // Update based on current\n" +
      "  }\n" +
      "}\n\n" +
      "// Template - auto updates when signal changes\n" +
      "<div>Count: {{ count() }}</div>\n" +
      '<button (click)="increment()">+</button>\n' +
      "```\n\n" +
      "**Computed Signals:**\n\n" +
      "Derived values that automatically update when dependencies change:\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class CartComponent {\n" +
      "  items = signal<CartItem[]>([]);\n" +
      "  \n" +
      "  // Computed - automatically updates when items changes\n" +
      "  total = computed(() => \n" +
      "    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)\n" +
      "  );\n" +
      "  \n" +
      "  itemCount = computed(() => this.items().length);\n\n" +
      "  isEmpty = computed(() => this.items().length === 0);\n" +
      "}\n\n" +
      "// Template\n" +
      "<div>Total: {{ total() }}</div>\n" +
      "<div>Items: {{ itemCount() }}</div>\n" +
      "```\n\n" +
      "**Effects:**\n\n" +
      "Side effects that run when signals change:\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class UserComponent {\n" +
      "  userId = signal(1);\n\n" +
      "  constructor() {\n" +
      "    // Effect runs whenever userId changes\n" +
      "    effect(() => {\n" +
      "      console.log('User ID changed to:', this.userId());\n" +
      "      this.loadUserData(this.userId());\n" +
      "    });\n" +
      "  }\n\n" +
      "  loadUserData(id: number) {\n" +
      "    // Fetch user data\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Signals vs Observables:**\n\n" +
      "| Feature | Signals | Observables |\n" +
      "|---------|---------|-------------|\n" +
      "| Reactivity | Synchronous, automatic | Asynchronous, manual subscribe |\n" +
      "| Current Value | Always available: `signal()` | Not always available |\n" +
      "| Subscription | Automatic in templates | Need async pipe or manual |\n" +
      "| Memory | Auto-cleanup | Must unsubscribe |\n" +
      "| Operators | Limited (computed, effect) | Rich (map, filter, etc.) |\n" +
      "| Change Detection | Fine-grained updates | Zone.js or OnPush |\n" +
      "| Use Case | Sync state | Async streams (HTTP, events) |\n\n" +
      "**When to Use Each:**\n\n" +
      "**Signals:**\n" +
      "```typescript\n" +
      "// ✅ Local component state\n" +
      "count = signal(0);\n" +
      "isOpen = signal(false);\n" +
      "selectedItems = signal<Item[]>([]);\n\n" +
      "// ✅ Derived state\n" +
      "doubleCount = computed(() => this.count() * 2);\n\n" +
      "// ✅ Shared state (in service)\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class ThemeService {\n" +
      "  theme = signal<'light' | 'dark'>('light');\n\n" +
      "  toggle() {\n" +
      "    this.theme.update(t => t === 'light' ? 'dark' : 'light');\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Observables:**\n" +
      "```typescript\n" +
      "// ✅ HTTP requests\n" +
      "users$ = this.http.get<User[]>('/api/users');\n\n" +
      "// ✅ Events over time\n" +
      "clicks$ = fromEvent(document, 'click');\n\n" +
      "// ✅ Complex async flows\n" +
      "searchResults$ = this.searchControl.valueChanges.pipe(\n" +
      "  debounceTime(300),\n" +
      "  distinctUntilChanged(),\n" +
      "  switchMap(query => this.searchService.search(query))\n" +
      ");\n" +
      "```\n\n" +
      "**Interoperability:**\n\n" +
      "```typescript\n" +
      "import { toSignal, toObservable } from '@angular/core/rxjs-interop';\n\n" +
      "// Observable → Signal\n" +
      "users$ = this.http.get<User[]>('/api/users');\n" +
      "users = toSignal(this.users$, { initialValue: [] });\n" +
      "// Now use as signal: {{ users()[0].name }}\n\n" +
      "// Signal → Observable\n" +
      "count = signal(0);\n" +
      "count$ = toObservable(this.count);\n" +
      "// Can use RxJS operators on count$\n" +
      "```\n\n" +
      "**Signal Inputs/Outputs (Angular 17.1+):**\n\n" +
      "```typescript\n" +
      "import { input, output } from '@angular/core';\n\n" +
      "@Component({...})\n" +
      "export class UserCardComponent {\n" +
      "  // Signal input (replaces @Input)\n" +
      "  user = input.required<User>(); // Required\n" +
      "  size = input<'sm' | 'lg'>('sm'); // Optional with default\n\n" +
      "  // Signal output (replaces @Output)\n" +
      "  userClick = output<User>(); // EventEmitter replacement\n\n" +
      "  // Computed from signal input\n" +
      "  displayName = computed(() => \n" +
      "    `${this.user().firstName} ${this.user().lastName}`\n" +
      "  );\n\n" +
      "  onClick() {\n" +
      "    this.userClick.emit(this.user());\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage\n" +
      "<app-user-card \n" +
      '  [user]="currentUser" \n' +
      '  (userClick)="handleClick($event)"\n' +
      "/>\n" +
      "```\n\n" +
      "**Benefits of Signals:**\n\n" +
      "1. **Fine-Grained Reactivity:** Only updates what changed\n" +
      "2. **No Zone.js Needed:** Can run zoneless for better performance\n" +
      "3. **Synchronous:** Immediate value access, no async pipe needed\n" +
      "4. **Auto-Cleanup:** No unsubscribe needed\n" +
      "5. **Type-Safe:** Full TypeScript support\n" +
      "6. **Composable:** Computed signals build on each other\n\n" +
      "**Migration Pattern:**\n\n" +
      "```typescript\n" +
      "// Old: Observable + async pipe\n" +
      "users$: Observable<User[]>;\n" +
      "\n" +
      "ngOnInit() {\n" +
      "  this.users$ = this.userService.getUsers();\n" +
      "}\n\n" +
      "// Template\n" +
      '<div *ngFor="let user of users$ | async">\n\n' +
      "// New: Signal\n" +
      "users = signal<User[]>([]);\n\n" +
      "ngOnInit() {\n" +
      "  this.userService.getUsers().subscribe(users => {\n" +
      "    this.users.set(users);\n" +
      "  });\n" +
      "  \n" +
      "  // Or use toSignal\n" +
      "  this.users = toSignal(this.userService.getUsers(), { initialValue: [] });\n" +
      "}\n\n" +
      "// Template\n" +
      '<div *ngFor="let user of users()">\n' +
      "```\n\n" +
      "**Key Takeaway:** Signals are Angular's future for state management. They provide better performance through fine-grained reactivity and enable zoneless Angular. Use Signals for state, Observables for async streams.",
    category: "State Management",
    difficulty: "hard",
    tags: ["signals", "reactivity", "state-management", "angular16+", "performance"],
  },
  {
    id: 6,
    question:
      "Explain NgRx and the Redux pattern in Angular. When should you use NgRx vs Services?",
    answer:
      "NgRx is Angular's implementation of the Redux pattern for state management, providing a single source of truth for application state.\n\n" +
      "**Core Concepts:**\n\n" +
      "**1. Store (Single Source of Truth):**\n" +
      "```typescript\n" +
      "// Store holds entire app state\n" +
      "interface AppState {\n" +
      "  users: UserState;\n" +
      "  products: ProductState;\n" +
      "  auth: AuthState;\n" +
      "}\n" +
      "```\n\n" +
      "**2. Actions (Events):**\n" +
      "```typescript\n" +
      "import { createAction, props } from '@ngrx/store';\n\n" +
      "// Action describes what happened\n" +
      "export const loadUsers = createAction('[User List] Load Users');\n\n" +
      "export const loadUsersSuccess = createAction(\n" +
      "  '[User API] Load Users Success',\n" +
      "  props<{ users: User[] }>()\n" +
      ");\n\n" +
      "export const loadUsersFailure = createAction(\n" +
      "  '[User API] Load Users Failure',\n" +
      "  props<{ error: string }>()\n" +
      ");\n" +
      "```\n\n" +
      "**3. Reducers (Pure Functions):**\n" +
      "```typescript\n" +
      "import { createReducer, on } from '@ngrx/store';\n\n" +
      "export interface UserState {\n" +
      "  users: User[];\n" +
      "  loading: boolean;\n" +
      "  error: string | null;\n" +
      "}\n\n" +
      "const initialState: UserState = {\n" +
      "  users: [],\n" +
      "  loading: false,\n" +
      "  error: null\n" +
      "};\n\n" +
      "export const userReducer = createReducer(\n" +
      "  initialState,\n" +
      "  on(loadUsers, (state) => ({\n" +
      "    ...state,\n" +
      "    loading: true,\n" +
      "    error: null\n" +
      "  })),\n" +
      "  on(loadUsersSuccess, (state, { users }) => ({\n" +
      "    ...state,\n" +
      "    users,\n" +
      "    loading: false\n" +
      "  })),\n" +
      "  on(loadUsersFailure, (state, { error }) => ({\n" +
      "    ...state,\n" +
      "    error,\n" +
      "    loading: false\n" +
      "  }))\n" +
      ");\n" +
      "```\n\n" +
      "**4. Effects (Side Effects):**\n" +
      "```typescript\n" +
      "import { Injectable } from '@angular/core';\n" +
      "import { Actions, createEffect, ofType } from '@ngrx/effects';\n" +
      "import { of } from 'rxjs';\n" +
      "import { map, catchError, switchMap } from 'rxjs/operators';\n\n" +
      "@Injectable()\n" +
      "export class UserEffects {\n" +
      "  loadUsers$ = createEffect(() =>\n" +
      "    this.actions$.pipe(\n" +
      "      ofType(loadUsers),\n" +
      "      switchMap(() =>\n" +
      "        this.userService.getUsers().pipe(\n" +
      "          map(users => loadUsersSuccess({ users })),\n" +
      "          catchError(error => of(loadUsersFailure({ error: error.message })))\n" +
      "        )\n" +
      "      )\n" +
      "    )\n" +
      "  );\n\n" +
      "  constructor(\n" +
      "    private actions$: Actions,\n" +
      "    private userService: UserService\n" +
      "  ) {}\n" +
      "}\n" +
      "```\n\n" +
      "**5. Selectors (Derived State):**\n" +
      "```typescript\n" +
      "import { createSelector, createFeatureSelector } from '@ngrx/store';\n\n" +
      "// Feature selector\n" +
      "export const selectUserState = createFeatureSelector<UserState>('users');\n\n" +
      "// Memoized selectors\n" +
      "export const selectAllUsers = createSelector(\n" +
      "  selectUserState,\n" +
      "  (state) => state.users\n" +
      ");\n\n" +
      "export const selectUserLoading = createSelector(\n" +
      "  selectUserState,\n" +
      "  (state) => state.loading\n" +
      ");\n\n" +
      "export const selectActiveUsers = createSelector(\n" +
      "  selectAllUsers,\n" +
      "  (users) => users.filter(u => u.active)\n" +
      ");\n" +
      "```\n\n" +
      "**Using in Components:**\n\n" +
      "```typescript\n" +
      "import { Store } from '@ngrx/store';\n\n" +
      "@Component({...})\n" +
      "export class UserListComponent implements OnInit {\n" +
      "  users$ = this.store.select(selectAllUsers);\n" +
      "  loading$ = this.store.select(selectUserLoading);\n\n" +
      "  constructor(private store: Store) {}\n\n" +
      "  ngOnInit() {\n" +
      "    // Dispatch action\n" +
      "    this.store.dispatch(loadUsers());\n" +
      "  }\n\n" +
      "  deleteUser(id: number) {\n" +
      "    this.store.dispatch(deleteUser({ id }));\n" +
      "  }\n" +
      "}\n\n" +
      "// Template\n" +
      '<div *ngIf="loading$ | async">Loading...</div>\n' +
      '<div *ngFor="let user of users$ | async">\n' +
      "  {{ user.name }}\n" +
      '  <button (click)="deleteUser(user.id)">Delete</button>\n' +
      "</div>\n" +
      "```\n\n" +
      "**When to Use NgRx:**\n\n" +
      "✅ **Use NgRx when:**\n" +
      "- Large application with complex state\n" +
      "- Multiple components need same data\n" +
      "- Need time-travel debugging\n" +
      "- Want predictable state management\n" +
      "- Team wants enforced patterns\n" +
      "- Need to track all state changes (audit)\n\n" +
      "❌ **Don't use NgRx when:**\n" +
      "- Small application\n" +
      "- Simple CRUD\n" +
      "- State is mostly local to components\n" +
      "- Team unfamiliar with Redux\n" +
      "- Adds unnecessary complexity\n\n" +
      "**NgRx vs Services:**\n\n" +
      "```typescript\n" +
      "// Service approach (simpler)\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class UserService {\n" +
      "  private usersSubject = new BehaviorSubject<User[]>([]);\n" +
      "  users$ = this.usersSubject.asObservable();\n\n" +
      "  loadUsers() {\n" +
      "    this.http.get<User[]>('/api/users').subscribe(\n" +
      "      users => this.usersSubject.next(users)\n" +
      "    );\n" +
      "  }\n" +
      "}\n\n" +
      "// NgRx approach (more structure)\n" +
      "// - Actions for every event\n" +
      "// - Reducer for state changes\n" +
      "// - Effects for side effects\n" +
      "// - Selectors for derived data\n" +
      "// More boilerplate but more predictable\n" +
      "```\n\n" +
      "**Entity Adapter (Common Pattern):**\n\n" +
      "```typescript\n" +
      "import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';\n\n" +
      "export interface UserState extends EntityState<User> {\n" +
      "  selectedUserId: number | null;\n" +
      "}\n\n" +
      "export const adapter: EntityAdapter<User> = createEntityAdapter<User>({\n" +
      "  selectId: (user: User) => user.id,\n" +
      "  sortComparer: (a, b) => a.name.localeCompare(b.name)\n" +
      "});\n\n" +
      "const initialState: UserState = adapter.getInitialState({\n" +
      "  selectedUserId: null\n" +
      "});\n\n" +
      "export const userReducer = createReducer(\n" +
      "  initialState,\n" +
      "  on(loadUsersSuccess, (state, { users }) => \n" +
      "    adapter.setAll(users, state)\n" +
      "  ),\n" +
      "  on(addUserSuccess, (state, { user }) => \n" +
      "    adapter.addOne(user, state)\n" +
      "  ),\n" +
      "  on(updateUserSuccess, (state, { user }) => \n" +
      "    adapter.updateOne({ id: user.id, changes: user }, state)\n" +
      "  ),\n" +
      "  on(deleteUserSuccess, (state, { id }) => \n" +
      "    adapter.removeOne(id, state)\n" +
      "  )\n" +
      ");\n\n" +
      "// Auto-generated selectors\n" +
      "const { selectAll, selectEntities, selectIds } = adapter.getSelectors();\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "1. Keep reducers pure (no side effects)\n" +
      "2. Use effects for async operations\n" +
      "3. Use selectors for derived data (memoized)\n" +
      "4. Action naming: [Source] Event\n" +
      "5. Use Entity Adapter for collections\n" +
      "6. DevTools for debugging",
    category: "State Management",
    difficulty: "hard",
    tags: ["ngrx", "redux", "state-management", "effects", "selectors", "store"],
  },
  {
    id: 7,
    question:
      "What are Pipes in Angular? Explain built-in pipes, custom pipes, and RxJS pipeable operators.",
    answer:
      "Pipes transform data in templates. RxJS pipeable operators transform observable streams.\n\n" +
      "**Template Pipes:**\n\n" +
      "**Built-in Pipes:**\n" +
      "```typescript\n" +
      "// DatePipe\n" +
      "{{ today | date:'short' }}  // 1/1/24, 12:00 PM\n" +
      "{{ today | date:'fullDate' }} // Monday, January 1, 2024\n\n" +
      "// CurrencyPipe\n" +
      "{{ price | currency }}  // $99.99\n" +
      "{{ price | currency:'EUR':'symbol':'1.2-2' }}  // €99.99\n\n" +
      "// PercentPipe\n" +
      "{{ 0.25 | percent }}  // 25%\n\n" +
      "// DecimalPipe\n" +
      "{{ 123.456 | number:'1.2-2' }}  // 123.46\n\n" +
      "// UpperCase/LowerCase/TitleCase\n" +
      "{{ 'hello' | uppercase }}  // HELLO\n" +
      "{{ 'WORLD' | lowercase }}  // world\n" +
      "{{ 'hello world' | titlecase }}  // Hello World\n\n" +
      "// JsonPipe (debugging)\n" +
      "{{ user | json }}  // Formatted JSON\n\n" +
      "// SlicePipe\n" +
      "{{ items | slice:0:5 }}  // First 5 items\n\n" +
      "// AsyncPipe (most important!)\n" +
      "{{ users$ | async }}  // Auto-subscribe/unsubscribe\n" +
      "```\n\n" +
      "**Custom Pipe:**\n\n" +
      "```typescript\n" +
      "import { Pipe, PipeTransform } from '@angular/core';\n\n" +
      "@Pipe({\n" +
      "  name: 'truncate',\n" +
      "  standalone: true // Angular 14+\n" +
      "})\n" +
      "export class TruncatePipe implements PipeTransform {\n" +
      "  transform(value: string, limit: number = 20, trail: string = '...'): string {\n" +
      "    if (!value) return '';\n" +
      "    if (value.length <= limit) return value;\n" +
      "    return value.substring(0, limit) + trail;\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage\n" +
      "{{ longText | truncate:50:'...' }}\n" +
      "```\n\n" +
      "**Pure vs Impure Pipes:**\n\n" +
      "```typescript\n" +
      "// Pure pipe (default) - only re-runs when input reference changes\n" +
      "@Pipe({\n" +
      "  name: 'filterPure',\n" +
      "  pure: true // default\n" +
      "})\n" +
      "export class FilterPurePipe implements PipeTransform {\n" +
      "  transform(items: Item[], filter: string): Item[] {\n" +
      "    console.log('FilterPipe executed');\n" +
      "    return items.filter(item => item.name.includes(filter));\n" +
      "  }\n" +
      "}\n\n" +
      "// ❌ Doesn't work with mutations\n" +
      "addItem(item: Item) {\n" +
      "  this.items.push(item); // Mutation - same reference\n" +
      "  // Pipe doesn't re-run!\n" +
      "}\n\n" +
      "// ✅ Works with new reference\n" +
      "addItem(item: Item) {\n" +
      "  this.items = [...this.items, item]; // New reference\n" +
      "  // Pipe re-runs\n" +
      "}\n\n" +
      "// Impure pipe - re-runs on every change detection\n" +
      "@Pipe({\n" +
      "  name: 'filterImpure',\n" +
      "  pure: false // Runs every CD cycle - expensive!\n" +
      "})\n" +
      "export class FilterImpurePipe implements PipeTransform {\n" +
      "  transform(items: Item[], filter: string): Item[] {\n" +
      "    return items.filter(item => item.name.includes(filter));\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**AsyncPipe (Critical for Memory Management):**\n\n" +
      "```typescript\n" +
      "// ❌ Manual subscription - memory leak risk\n" +
      "@Component({...})\n" +
      "export class UsersComponent implements OnInit, OnDestroy {\n" +
      "  users: User[];\n" +
      "  private subscription: Subscription;\n\n" +
      "  ngOnInit() {\n" +
      "    this.subscription = this.userService.getUsers().subscribe(\n" +
      "      users => this.users = users\n" +
      "    );\n" +
      "  }\n\n" +
      "  ngOnDestroy() {\n" +
      "    this.subscription.unsubscribe(); // Must remember!\n" +
      "  }\n" +
      "}\n\n" +
      "// ✅ AsyncPipe - automatic cleanup\n" +
      "@Component({...})\n" +
      "export class UsersComponent {\n" +
      "  users$ = this.userService.getUsers();\n" +
      "  // No ngOnDestroy needed!\n" +
      "}\n\n" +
      "// Template\n" +
      '<div *ngFor="let user of users$ | async">\n' +
      "  {{ user.name }}\n" +
      "</div>\n" +
      "```\n\n" +
      "**RxJS Pipeable Operators:**\n\n" +
      "Chain operators to transform observable streams:\n\n" +
      "```typescript\n" +
      "import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';\n\n" +
      "// Search with debounce\n" +
      "this.searchControl.valueChanges.pipe(\n" +
      "  debounceTime(300),           // Wait 300ms after last keystroke\n" +
      "  distinctUntilChanged(),      // Only if value actually changed\n" +
      "  filter(query => query.length >= 3),  // Minimum 3 characters\n" +
      "  switchMap(query => this.searchService.search(query))  // Cancel previous, switch to new\n" +
      ").subscribe(results => this.results = results);\n\n" +
      "// Multiple transformations\n" +
      "this.users$.pipe(\n" +
      "  map(users => users.filter(u => u.active)),  // Filter active\n" +
      "  map(users => users.sort((a, b) => a.name.localeCompare(b.name))),  // Sort\n" +
      "  map(users => users.slice(0, 10))  // Take first 10\n" +
      ").subscribe(topUsers => this.topUsers = topUsers);\n" +
      "```\n\n" +
      "**Common RxJS Operators:**\n\n" +
      "**Transformation:**\n" +
      "- `map` - Transform each value\n" +
      "- `pluck` - Extract property\n" +
      "- `scan` - Accumulate values (like reduce)\n\n" +
      "**Filtering:**\n" +
      "- `filter` - Filter emissions\n" +
      "- `take` - Take N values\n" +
      "- `skip` - Skip N values\n" +
      "- `distinctUntilChanged` - Skip duplicates\n\n" +
      "**Combination:**\n" +
      "- `combineLatest` - Combine latest from all\n" +
      "- `merge` - Merge multiple observables\n" +
      "- `concat` - Subscribe sequentially\n\n" +
      "**Higher-Order:**\n" +
      "- `switchMap` - Cancel previous, switch to new\n" +
      "- `mergeMap` - Run all concurrently\n" +
      "- `concatMap` - Run sequentially\n" +
      "- `exhaustMap` - Ignore new until current completes\n\n" +
      "**Utility:**\n" +
      "- `tap` - Side effects without changing stream\n" +
      "- `catchError` - Error handling\n" +
      "- `retry` - Retry on error\n" +
      "- `delay` - Delay emissions\n\n" +
      "**Key Differences:**\n\n" +
      "| Feature | Template Pipes | RxJS Operators |\n" +
      "|---------|---------------|----------------|\n" +
      "| Used in | Templates | TypeScript code |\n" +
      "| Transform | Display values | Observable streams |\n" +
      "| Syntax | `value \\| pipe:arg` | `obs.pipe(operator())` |\n" +
      "| Purity | Pure by default | Depends on operator |\n\n" +
      "**Best Practices:**\n" +
      "1. Use async pipe for all observables\n" +
      "2. Keep pipes pure when possible\n" +
      "3. Avoid complex logic in pipes\n" +
      "4. Use switchMap for search (cancels previous)\n" +
      "5. Use mergeMap for independent requests\n" +
      "6. Always handle errors with catchError",
    category: "Pipes & Operators",
    difficulty: "intermediate",
    tags: ["pipes", "rxjs", "operators", "async-pipe", "custom-pipes", "transforms"],
  },
  {
    id: 8,
    question:
      "Explain Angular component lifecycle hooks. What is ngOnDestroy used for and why is it critical?",
    answer:
      "Angular components go through a lifecycle managed by Angular, with hooks that let you tap into key moments.\n\n" +
      "**Complete Lifecycle Order:**\n\n" +
      "1. **constructor()** - Class instantiation\n" +
      "2. **ngOnChanges()** - When @Input properties change (before ngOnInit and on every change)\n" +
      "3. **ngOnInit()** - After first ngOnChanges, one-time initialization\n" +
      "4. **ngDoCheck()** - Custom change detection (every CD cycle)\n" +
      "5. **ngAfterContentInit()** - After content (ng-content) projection initialized\n" +
      "6. **ngAfterContentChecked()** - After content checked (every CD)\n" +
      "7. **ngAfterViewInit()** - After component view and child views initialized\n" +
      "8. **ngAfterViewChecked()** - After view checked (every CD)\n" +
      "9. **ngOnDestroy()** - Just before component destruction\n\n" +
      "**ngOnDestroy - Critical for Cleanup:**\n\n" +
      "```typescript\n" +
      "import { OnDestroy } from '@angular/core';\n" +
      "import { Subscription, Subject } from 'rxjs';\n" +
      "import { takeUntil } from 'rxjs/operators';\n\n" +
      "export class Component implements OnInit, OnDestroy {\n" +
      "  // Pattern 1: Subscription collection\n" +
      "  private subscriptions = new Subscription();\n\n" +
      "  // Pattern 2: takeUntil with Subject\n" +
      "  private destroy$ = new Subject<void>();\n\n" +
      "  private intervalId: any;\n" +
      "  private webSocket: WebSocket;\n\n" +
      "  ngOnInit() {\n" +
      "    // ❌ Memory leak without cleanup\n" +
      "    this.userService.getUsers().subscribe(users => this.users = users);\n\n" +
      "    // ✅ Add to subscriptions\n" +
      "    this.subscriptions.add(\n" +
      "      this.userService.getUsers().subscribe(users => this.users = users)\n" +
      "    );\n\n" +
      "    // ✅ Or use takeUntil\n" +
      "    this.route.params\n" +
      "      .pipe(takeUntil(this.destroy$))\n" +
      "      .subscribe(params => this.loadData(params));\n\n" +
      "    this.intervalId = setInterval(() => this.poll(), 5000);\n" +
      "    this.webSocket = new WebSocket('ws://...');\n" +
      "  }\n\n" +
      "  ngOnDestroy() {\n" +
      "    // ✅ Unsubscribe from observables\n" +
      "    this.subscriptions.unsubscribe();\n\n" +
      "    // ✅ Complete takeUntil subject\n" +
      "    this.destroy$.next();\n" +
      "    this.destroy$.complete();\n\n" +
      "    // ✅ Clear timers\n" +
      "    if (this.intervalId) {\n" +
      "      clearInterval(this.intervalId);\n" +
      "    }\n\n" +
      "    // ✅ Close WebSocket\n" +
      "    this.webSocket?.close();\n\n" +
      "    // ✅ Remove event listeners\n" +
      "    document.removeEventListener('click', this.handleClick);\n\n" +
      "    // ✅ Complete custom subjects\n" +
      "    this.dataSubject.complete();\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**What Happens Without Cleanup:**\n" +
      "- Memory leaks (subscriptions never released)\n" +
      "- Multiple subscriptions accumulate\n" +
      "- Timers keep running\n" +
      "- Event listeners stay attached\n" +
      "- WebSockets stay open\n\n" +
      "**Best Practices:**\n" +
      "1. Always implement ngOnDestroy if subscribing\n" +
      "2. Use async pipe when possible (auto-cleanup)\n" +
      "3. Use takeUntil pattern for multiple subscriptions\n" +
      "4. Complete custom Subjects\n" +
      "5. Clear timers and intervals\n" +
      "6. Remove event listeners",
    category: "Lifecycle",
    difficulty: "intermediate",
    tags: ["lifecycle", "ngOnDestroy", "cleanup", "memory-leaks", "subscriptions"],
  },
  {
    id: 9,
    question:
      "Compare localStorage, sessionStorage, and Cookies. When should you use each for storing JWT tokens?",
    answer:
      "**Comparison:**\n\n" +
      "| Feature | localStorage | sessionStorage | Cookies |\n" +
      "|---------|-------------|----------------|--------|\n" +
      "| Size | ~10MB | ~10MB | ~4KB |\n" +
      "| Lifetime | Forever | Tab session | Set expiration |\n" +
      "| Scope | All tabs | Single tab | All tabs |\n" +
      "| Sent to server | No | No | Yes (auto) |\n" +
      "| Access | JS only | JS only | JS (unless HttpOnly) |\n" +
      "| XSS vulnerable | Yes | Yes | Can be protected |\n\n" +
      "**JWT Token Storage (Security Critical):**\n\n" +
      "```typescript\n" +
      "// ❌ INSECURE - XSS can steal token\n" +
      "localStorage.setItem('token', jwt);\n\n" +
      "// ✅ SECURE - HttpOnly cookie (server-side only)\n" +
      "// Server sets:\n" +
      "Set-Cookie: token=xyz; HttpOnly; Secure; SameSite=Strict\n\n" +
      "// HttpOnly = JavaScript cannot access (XSS protection)\n" +
      "// Secure = HTTPS only\n" +
      "// SameSite = CSRF protection\n" +
      "```\n\n" +
      "**Best Practice - Hybrid Approach:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class TokenService {\n" +
      "  // Access token in memory (most secure)\n" +
      "  private accessToken: string | null = null;\n\n" +
      "  // Refresh token in HttpOnly cookie (server manages)\n" +
      "  // User data in localStorage (non-sensitive)\n\n" +
      "  setAccessToken(token: string) {\n" +
      "    this.accessToken = token; // Memory only\n" +
      "  }\n\n" +
      "  getAccessToken(): string | null {\n" +
      "    return this.accessToken;\n" +
      "  }\n\n" +
      "  setUserData(user: User) {\n" +
      "    localStorage.setItem('user', JSON.stringify({\n" +
      "      id: user.id,\n" +
      "      name: user.name // Non-sensitive data only\n" +
      "    }));\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "Security",
    difficulty: "intermediate",
    tags: ["storage", "security", "jwt", "cookies", "xss"],
  },
];
