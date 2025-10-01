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
      "  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n" +
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
      "  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n" +
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
      "  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n" +
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
      "  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n" +
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
      "  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n" +
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
      "  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n" +
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
      "  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n" +
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
      "  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n" +
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
  {
    id: 10,
    question:
      "What is the difference between Reactive Forms and Template-Driven Forms? Provide examples.",
    answer:
      "**Reactive Forms (Recommended):**\n\n" +
      "```typescript\n" +
      "import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';\n\n" +
      "@Component({\n" +
      "  imports: [ReactiveFormsModule],\n" +
      "  template: `\n" +
      '    <form [formGroup]="form" (ngSubmit)="onSubmit()">\n' +
      '      <input formControlName="email" />\n' +
      '      <input formControlName="password" type="password" />\n' +
      '      <button [disabled]="form.invalid">Submit</button>\n' +
      "    </form>\n" +
      "  `\n" +
      "})\n" +
      "export class LoginComponent {\n" +
      "  form = this.fb.group({\n" +
      "    email: ['', [Validators.required, Validators.email]],\n" +
      "    password: ['', [Validators.required, Validators.minLength(8)]]\n" +
      "  });\n\n" +
      "  constructor(private fb: FormBuilder) {}\n\n" +
      "  onSubmit() {\n" +
      "    if (this.form.valid) {\n" +
      "      console.log(this.form.value);\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Template-Driven Forms:**\n\n" +
      "```typescript\n" +
      "import { FormsModule } from '@angular/forms';\n\n" +
      "@Component({\n" +
      "  imports: [FormsModule],\n" +
      "  template: `\n" +
      '    <form #f="ngForm" (ngSubmit)="onSubmit(f)">\n' +
      '      <input name="email" [(ngModel)]="user.email" required email />\n' +
      '      <input name="password" [(ngModel)]="user.password" required minlength="8" />\n' +
      '      <button [disabled]="f.invalid">Submit</button>\n' +
      "    </form>\n" +
      "  `\n" +
      "})\n" +
      "export class LoginComponent {\n" +
      "  user = { email: '', password: '' };\n\n" +
      "  onSubmit(form: NgForm) {\n" +
      "    if (form.valid) console.log(form.value);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use Reactive:**\n" +
      "- Complex validation\n" +
      "- Dynamic forms\n" +
      "- Unit testing\n" +
      "- Programmatic control\n\n" +
      "**When to Use Template-Driven:**\n" +
      "- Simple forms\n" +
      "- Rapid prototyping",
    category: "Forms",
    difficulty: "intermediate",
    tags: ["forms", "reactive-forms", "template-driven", "validation"],
  },
  {
    id: 11,
    question: "Explain CanActivate, CanLoad, CanDeactivate routing guards. Provide use cases.",
    answer:
      "**CanActivate - Protect Routes:**\n\n" +
      "```typescript\n" +
      "export const authGuard: CanActivateFn = (route, state) => {\n" +
      "  const authService = inject(AuthService);\n" +
      "  const router = inject(Router);\n\n" +
      "  if (authService.isAuthenticated()) {\n" +
      "    return true;\n" +
      "  }\n\n" +
      "  return router.createUrlTree(['/login'], {\n" +
      "    queryParams: { returnUrl: state.url }\n" +
      "  });\n" +
      "};\n\n" +
      "// Route\n" +
      "{ path: 'dashboard', canActivate: [authGuard], component: DashboardComponent }\n" +
      "```\n\n" +
      "**CanLoad - Lazy Loading Protection:**\n\n" +
      "```typescript\n" +
      "export const adminCanLoad: CanLoadFn = () => {\n" +
      "  const auth = inject(AuthService);\n" +
      "  return auth.hasRole('admin'); // Module won't load if false\n" +
      "};\n\n" +
      "// Route\n" +
      "{\n" +
      "  path: 'admin',\n" +
      "  loadChildren: () => import('./admin/admin.routes'),\n" +
      "  canLoad: [adminCanLoad]\n" +
      "}\n" +
      "```\n\n" +
      "**CanDeactivate - Unsaved Changes:**\n\n" +
      "```typescript\n" +
      "export const unsavedChangesGuard: CanDeactivateFn<FormComponent> = (component) => {\n" +
      "  if (component.form.dirty && !component.saved) {\n" +
      "    return confirm('Unsaved changes. Leave anyway?');\n" +
      "  }\n" +
      "  return true;\n" +
      "};\n\n" +
      "// Route\n" +
      "{ path: 'edit/:id', canDeactivate: [unsavedChangesGuard], component: FormComponent }\n" +
      "```\n\n" +
      "**Execution Order:**\n" +
      "1. CanDeactivate (current route)\n" +
      "2. CanLoad (if lazy)\n" +
      "3. CanActivate (target route)\n" +
      "4. Resolve (if guards pass)",
    category: "Routing",
    difficulty: "hard",
    tags: ["routing", "guards", "canactivate", "canload", "candeactivate", "auth"],
  },
  {
    id: 12,
    question: "What are Route Resolvers? How do they differ from guards?",
    answer:
      "Resolvers pre-fetch data before activating a route, ensuring data is available when component loads.\n\n" +
      "**Resolver Implementation:**\n\n" +
      "```typescript\n" +
      "import { ResolveFn } from '@angular/router';\n\n" +
      "export const userResolver: ResolveFn<User> = (route, state) => {\n" +
      "  const userService = inject(UserService);\n" +
      "  const userId = route.paramMap.get('id')!;\n" +
      "  \n" +
      "  return userService.getUser(userId).pipe(\n" +
      "    catchError(() => {\n" +
      "      const router = inject(Router);\n" +
      "      router.navigate(['/not-found']);\n" +
      "      return EMPTY;\n" +
      "    })\n" +
      "  );\n" +
      "};\n\n" +
      "// Route\n" +
      "{\n" +
      "  path: 'user/:id',\n" +
      "  component: UserDetailComponent,\n" +
      "  resolve: { user: userResolver }\n" +
      "}\n\n" +
      "// Component\n" +
      "@Component({...})\n" +
      "export class UserDetailComponent implements OnInit {\n" +
      "  user: User;\n\n" +
      "  constructor(private route: ActivatedRoute) {}\n\n" +
      "  ngOnInit() {\n" +
      "    // Data already loaded!\n" +
      "    this.user = this.route.snapshot.data['user'];\n" +
      "    \n" +
      "    // Or observe changes\n" +
      "    this.route.data.subscribe(data => {\n" +
      "      this.user = data['user'];\n" +
      "    });\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Resolver vs Guard:**\n" +
      "- **Guard:** Decides if route can activate (true/false)\n" +
      "- **Resolver:** Fetches data before activation (returns data)\n\n" +
      "**Resolver vs Component Fetch:**\n" +
      "- **Resolver:** Data ready immediately, no loading state\n" +
      "- **Component:** Shows loading spinner, data arrives async",
    category: "Routing",
    difficulty: "intermediate",
    tags: ["routing", "resolver", "data-fetching", "guards"],
  },
  {
    id: 13,
    question:
      "Explain @Input/@Output decorators. How do Signal inputs/outputs (Angular 17+) improve upon them?",
    answer:
      "**Traditional @Input/@Output:**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class UserCardComponent {\n" +
      "  @Input() user: User; // Can be undefined!\n" +
      "  @Input() size: 'sm' | 'lg' = 'sm';\n" +
      "  @Output() userClick = new EventEmitter<User>();\n\n" +
      "  onClick() {\n" +
      "    this.userClick.emit(this.user);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Signal Inputs/Outputs (Angular 17.1+):**\n\n" +
      "```typescript\n" +
      "import { input, output, computed } from '@angular/core';\n\n" +
      "@Component({...})\n" +
      "export class UserCardComponent {\n" +
      "  // Signal input - always has value, type-safe\n" +
      "  user = input.required<User>(); // Required\n" +
      "  size = input<'sm' | 'lg'>('sm'); // Optional with default\n\n" +
      "  // Signal output - type-safe\n" +
      "  userClick = output<User>();\n\n" +
      "  // Computed from input\n" +
      "  displayName = computed(() => \n" +
      "    `${this.user().firstName} ${this.user().lastName}`\n" +
      "  );\n\n" +
      "  onClick() {\n" +
      "    this.userClick.emit(this.user());\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage identical\n" +
      '<app-user-card [user]="currentUser" (userClick)="handleClick($event)" />\n' +
      "```\n\n" +
      "**Benefits of Signal Inputs:**\n" +
      "1. Type-safe (required vs optional)\n" +
      "2. Can use in computed signals\n" +
      "3. Better change detection\n" +
      "4. No undefined checks needed\n" +
      "5. Automatic reactivity\n\n" +
      "**Key Difference:**\n" +
      "```typescript\n" +
      "// Traditional - might be undefined\n" +
      "@Input() user: User;\n" +
      "ngOnInit() {\n" +
      "  if (this.user) { // Must check!\n" +
      "    this.loadData(this.user.id);\n" +
      "  }\n" +
      "}\n\n" +
      "// Signal - always has value\n" +
      "user = input.required<User>();\n" +
      "ngOnInit() {\n" +
      "  this.loadData(this.user().id); // No check needed\n" +
      "}\n" +
      "```",
    category: "Component Communication",
    difficulty: "intermediate",
    tags: ["input", "output", "signals", "component-communication", "angular17+"],
  },
  {
    id: 14,
    question:
      "How do you implement WebSocket communication in Angular? What is SignalR and how to integrate it?",
    answer:
      "**WebSocket with RxJS:**\n\n" +
      "```typescript\n" +
      "import { webSocket, WebSocketSubject } from 'rxjs/webSocket';\n\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class WebSocketService {\n" +
      "  private socket$: WebSocketSubject<any>;\n\n" +
      "  connect(url: string): WebSocketSubject<any> {\n" +
      "    if (!this.socket$ || this.socket$.closed) {\n" +
      "      this.socket$ = webSocket({\n" +
      "        url,\n" +
      "        openObserver: {\n" +
      "          next: () => console.log('WebSocket connected')\n" +
      "        },\n" +
      "        closeObserver: {\n" +
      "          next: () => console.log('WebSocket disconnected')\n" +
      "        }\n" +
      "      });\n" +
      "    }\n" +
      "    return this.socket$;\n" +
      "  }\n\n" +
      "  send(message: any) {\n" +
      "    this.socket$.next(message);\n" +
      "  }\n\n" +
      "  close() {\n" +
      "    this.socket$.complete();\n" +
      "  }\n" +
      "}\n\n" +
      "// Component\n" +
      "ngOnInit() {\n" +
      "  this.ws.connect('wss://api.example.com').subscribe(\n" +
      "    message => console.log('Received:', message),\n" +
      "    error => console.error('Error:', error)\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**SignalR Integration:**\n\n" +
      "```typescript\n" +
      "import * as signalR from '@microsoft/signalr';\n\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class SignalRService {\n" +
      "  private hubConnection: signalR.HubConnection;\n" +
      "  private messageSubject = new Subject<Message>();\n" +
      "  messages$ = this.messageSubject.asObservable();\n\n" +
      "  async connect() {\n" +
      "    this.hubConnection = new signalR.HubConnectionBuilder()\n" +
      "      .withUrl('https://api.example.com/chatHub', {\n" +
      "        accessTokenFactory: () => this.authService.getToken()\n" +
      "      })\n" +
      "      .withAutomaticReconnect() // Auto-reconnect\n" +
      "      .build();\n\n" +
      "    // Register handlers\n" +
      "    this.hubConnection.on('ReceiveMessage', (message) => {\n" +
      "      this.messageSubject.next(message);\n" +
      "    });\n\n" +
      "    // Connect\n" +
      "    await this.hubConnection.start();\n" +
      "    console.log('SignalR connected');\n" +
      "  }\n\n" +
      "  async sendMessage(message: string) {\n" +
      "    await this.hubConnection.invoke('SendMessage', message);\n" +
      "  }\n\n" +
      "  async disconnect() {\n" +
      "    await this.hubConnection.stop();\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "Real-time",
    difficulty: "hard",
    tags: ["websocket", "signalr", "real-time", "rxjs"],
  },
  {
    id: 15,
    question:
      "Explain JWT authentication in Angular. How do you implement token refresh and secure storage?",
    answer:
      "**Authentication Flow:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class AuthService {\n" +
      "  private accessToken: string | null = null;\n" +
      "  private currentUserSubject = new BehaviorSubject<User | null>(null);\n" +
      "  currentUser$ = this.currentUserSubject.asObservable();\n\n" +
      "  constructor(private http: HttpClient) {\n" +
      "    // Initialize from storage\n" +
      "    const user = localStorage.getItem('user');\n" +
      "    if (user) {\n" +
      "      this.currentUserSubject.next(JSON.parse(user));\n" +
      "    }\n" +
      "  }\n\n" +
      "  login(credentials: Credentials): Observable<LoginResponse> {\n" +
      "    return this.http.post<LoginResponse>('/api/auth/login', credentials).pipe(\n" +
      "      tap(response => {\n" +
      "        this.accessToken = response.accessToken;\n" +
      "        localStorage.setItem('user', JSON.stringify(response.user));\n" +
      "        this.currentUserSubject.next(response.user);\n" +
      "      })\n" +
      "    );\n" +
      "  }\n\n" +
      "  refreshToken(): Observable<TokenResponse> {\n" +
      "    return this.http.post<TokenResponse>('/api/auth/refresh', {}, \n" +
      "      { withCredentials: true } // Send refresh token cookie\n" +
      "    ).pipe(\n" +
      "      tap(response => {\n" +
      "        this.accessToken = response.accessToken;\n" +
      "      })\n" +
      "    );\n" +
      "  }\n\n" +
      "  logout() {\n" +
      "    this.accessToken = null;\n" +
      "    localStorage.removeItem('user');\n" +
      "    this.currentUserSubject.next(null);\n" +
      "    this.http.post('/api/auth/logout', {}, { withCredentials: true }).subscribe();\n" +
      "  }\n\n" +
      "  getToken(): string | null {\n" +
      "    return this.accessToken;\n" +
      "  }\n\n" +
      "  isAuthenticated(): boolean {\n" +
      "    return !!this.accessToken;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Token Interceptor:**\n\n" +
      "```typescript\n" +
      "export const authInterceptor: HttpInterceptorFn = (req, next) => {\n" +
      "  const authService = inject(AuthService);\n" +
      "  const token = authService.getToken();\n\n" +
      "  if (token && !req.url.includes('/auth/')) {\n" +
      "    req = req.clone({\n" +
      "      setHeaders: { Authorization: `Bearer ${token}` }\n" +
      "    });\n" +
      "  }\n\n" +
      "  return next(req).pipe(\n" +
      "    catchError((error: HttpErrorResponse) => {\n" +
      "      if (error.status === 401) {\n" +
      "        // Token expired - try refresh\n" +
      "        return authService.refreshToken().pipe(\n" +
      "          switchMap(response => {\n" +
      "            // Retry original request with new token\n" +
      "            const retryReq = req.clone({\n" +
      "              setHeaders: { Authorization: `Bearer ${response.accessToken}` }\n" +
      "            });\n" +
      "            return next(retryReq);\n" +
      "          }),\n" +
      "          catchError(refreshError => {\n" +
      "            // Refresh failed - logout\n" +
      "            authService.logout();\n" +
      "            inject(Router).navigate(['/login']);\n" +
      "            return throwError(() => refreshError);\n" +
      "          })\n" +
      "        );\n" +
      "      }\n" +
      "      return throwError(() => error);\n" +
      "    })\n" +
      "  );\n" +
      "};\n" +
      "```\n\n" +
      "**Security Best Practices:**\n" +
      "1. Store access token in memory\n" +
      "2. Store refresh token in HttpOnly cookie\n" +
      "3. Use HTTPS only (Secure flag)\n" +
      "4. Set SameSite=Strict (CSRF protection)\n" +
      "5. Short access token lifetime (15 min)\n" +
      "6. Rotate refresh tokens\n" +
      "7. Clear all on logout",
    category: "Security",
    difficulty: "hard",
    tags: ["auth", "jwt", "security", "interceptors", "tokens"],
  },
  {
    id: 16,
    question:
      "Explain Dependency Injection in Angular. What are providers, injection tokens, and hierarchical injectors?",
    answer:
      "Dependency Injection (DI) is Angular's core design pattern for providing dependencies to classes.\n\n" +
      "**Basic DI:**\n\n" +
      "```typescript\n" +
      "// Service\n" +
      "@Injectable({ providedIn: 'root' }) // Singleton\n" +
      "export class UserService {\n" +
      "  constructor(private http: HttpClient) {}\n" +
      "}\n\n" +
      "// Component injects service\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  constructor(private userService: UserService) {}\n" +
      "}\n" +
      "```\n\n" +
      "**Injection Tokens:**\n\n" +
      "```typescript\n" +
      "import { InjectionToken } from '@angular/core';\n\n" +
      "// Create token\n" +
      "export const API_URL = new InjectionToken<string>('API_URL');\n\n" +
      "// Provide value\n" +
      "providers: [\n" +
      "  { provide: API_URL, useValue: 'https://api.example.com' }\n" +
      "]\n\n" +
      "// Inject\n" +
      "constructor(@Inject(API_URL) private apiUrl: string) {}\n" +
      "```\n\n" +
      "**Provider Types:**\n\n" +
      "```typescript\n" +
      "// useClass\n" +
      "{ provide: Logger, useClass: ConsoleLogger }\n\n" +
      "// useValue\n" +
      "{ provide: 'API_URL', useValue: 'https://api.example.com' }\n\n" +
      "// useFactory\n" +
      "{\n" +
      "  provide: Logger,\n" +
      "  useFactory: (config: Config) => {\n" +
      "    return config.debug ? new DebugLogger() : new ProductionLogger();\n" +
      "  },\n" +
      "  deps: [Config]\n" +
      "}\n\n" +
      "// useExisting (alias)\n" +
      "{ provide: NewLogger, useExisting: Logger }\n" +
      "```",
    category: "Dependency Injection",
    difficulty: "hard",
    tags: ["di", "providers", "injection-tokens", "services"],
  },
  {
    id: 17,
    question:
      "What are Standalone Components (Angular 14+)? How do they differ from NgModule-based components?",
    answer:
      "Standalone components simplify Angular by eliminating the need for NgModules.\n\n" +
      "**Traditional NgModule Approach:**\n\n" +
      "```typescript\n" +
      "// Component\n" +
      "@Component({ selector: 'app-user', template: '...' })\n" +
      "export class UserComponent {}\n\n" +
      "// Must declare in NgModule\n" +
      "@NgModule({\n" +
      "  declarations: [UserComponent],\n" +
      "  imports: [CommonModule, FormsModule],\n" +
      "  exports: [UserComponent]\n" +
      "})\n" +
      "export class UserModule {}\n" +
      "```\n\n" +
      "**Standalone Approach:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-user',\n" +
      "  standalone: true, // Key flag\n" +
      "  imports: [CommonModule, FormsModule], // Direct imports\n" +
      "  template: '...'\n" +
      "})\n" +
      "export class UserComponent {}\n\n" +
      "// No NgModule needed!\n" +
      "// Use directly in other components or routes\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "1. Less boilerplate (no NgModule ceremony)\n" +
      "2. Clearer dependencies (imports in component)\n" +
      "3. Better tree-shaking\n" +
      "4. Simpler mental model\n" +
      "5. Easier lazy loading\n\n" +
      "**Migration Pattern:**\n\n" +
      "```typescript\n" +
      "// Standalone routes (Angular 15+)\n" +
      "const routes: Routes = [\n" +
      "  {\n" +
      "    path: 'user',\n" +
      "    loadComponent: () => import('./user.component').then(m => m.UserComponent)\n" +
      "  }\n" +
      "];\n\n" +
      "// Standalone bootstrap (Angular 14+)\n" +
      "bootstrapApplication(AppComponent, {\n" +
      "  providers: [\n" +
      "    provideRouter(routes),\n" +
      "    provideHttpClient()\n" +
      "  ]\n" +
      "});\n" +
      "```",
    category: "Architecture",
    difficulty: "intermediate",
    tags: ["standalone", "angular14+", "architecture", "modules"],
  },
  {
    id: 18,
    question: "Explain @ViewChild and @ContentChild. When do you use each?",
    answer:
      "**@ViewChild - Query Component's View:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  template: `\n" +
      "    <input #nameInput />\n" +
      "    <app-child #childComp></app-child>\n" +
      "  `\n" +
      "})\n" +
      "export class Parent implements AfterViewInit {\n" +
      "  @ViewChild('nameInput') input: ElementRef;\n" +
      "  @ViewChild('childComp') child: ChildComponent;\n" +
      "  @ViewChild(ChildComponent) childByType: ChildComponent;\n\n" +
      "  ngAfterViewInit() {\n" +
      "    // Available here!\n" +
      "    this.input.nativeElement.focus();\n" +
      "    this.child.someMethod();\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**@ContentChild - Query Projected Content:**\n\n" +
      "```typescript\n" +
      "// Child component\n" +
      "@Component({\n" +
      "  selector: 'app-card',\n" +
      "  template: '<div><ng-content></ng-content></div>'\n" +
      "})\n" +
      "export class CardComponent implements AfterContentInit {\n" +
      "  @ContentChild(HeaderComponent) header: HeaderComponent;\n\n" +
      "  ngAfterContentInit() {\n" +
      "    // Projected content available here\n" +
      "    if (this.header) {\n" +
      "      this.header.highlight();\n" +
      "    }\n" +
      "  }\n" +
      "}\n\n" +
      "// Parent usage\n" +
      "<app-card>\n" +
      "  <app-header>Title</app-header>\n" +
      "  <p>Content</p>\n" +
      "</app-card>\n" +
      "```\n\n" +
      "**Key Difference:**\n" +
      "- @ViewChild: Query component's own template\n" +
      "- @ContentChild: Query content projected via ng-content",
    category: "Component Queries",
    difficulty: "intermediate",
    tags: ["viewchild", "contentchild", "queries", "dom-access"],
  },
  {
    id: 19,
    question:
      "What are Directives in Angular? Explain structural vs attribute directives with custom examples.",
    answer:
      "Directives are classes that add behavior to elements.\n\n" +
      "**Three Types:**\n" +
      "1. Components (directives with templates)\n" +
      "2. Structural directives (change DOM structure)\n" +
      "3. Attribute directives (change appearance/behavior)\n\n" +
      "**Structural Directives:**\n\n" +
      "```typescript\n" +
      "// Built-in: *ngIf, *ngFor, *ngSwitch\n" +
      '<div *ngIf="isVisible">Content</div>\n' +
      '<div *ngFor="let item of items">{{ item }}</div>\n\n' +
      "// Custom structural directive\n" +
      "@Directive({\n" +
      "  selector: '[appUnless]',\n" +
      "  standalone: true\n" +
      "})\n" +
      "export class UnlessDirective {\n" +
      "  constructor(\n" +
      "    private templateRef: TemplateRef<any>,\n" +
      "    private viewContainer: ViewContainerRef\n" +
      "  ) {}\n\n" +
      "  @Input() set appUnless(condition: boolean) {\n" +
      "    if (!condition) {\n" +
      "      this.viewContainer.createEmbeddedView(this.templateRef);\n" +
      "    } else {\n" +
      "      this.viewContainer.clear();\n" +
      "    }\n" +
      "  }\n" +
      "}\n\n" +
      '// Usage: <div *appUnless="isHidden">Shown when isHidden is false</div>\n' +
      "```\n\n" +
      "**Attribute Directives:**\n\n" +
      "```typescript\n" +
      "// Built-in: ngClass, ngStyle, ngModel\n" +
      '<div [ngClass]="{ active: isActive }"></div>\n\n' +
      "// Custom attribute directive\n" +
      "@Directive({\n" +
      "  selector: '[appHighlight]',\n" +
      "  standalone: true\n" +
      "})\n" +
      "export class HighlightDirective {\n" +
      "  constructor(private el: ElementRef) {}\n\n" +
      "  @Input() appHighlight = 'yellow';\n\n" +
      "  @HostListener('mouseenter') onMouseEnter() {\n" +
      "    this.highlight(this.appHighlight);\n" +
      "  }\n\n" +
      "  @HostListener('mouseleave') onMouseLeave() {\n" +
      "    this.highlight('');\n" +
      "  }\n\n" +
      "  private highlight(color: string) {\n" +
      "    this.el.nativeElement.style.backgroundColor = color;\n" +
      "  }\n" +
      "}\n\n" +
      '// Usage: <div appHighlight="lightblue">Hover me</div>\n' +
      "```",
    category: "Directives",
    difficulty: "intermediate",
    tags: ["directives", "structural", "attribute", "dom"],
  },
  {
    id: 20,
    question: "How do you test Angular components and services? Explain TestBed and async testing.",
    answer:
      "**Testing a Component:**\n\n" +
      "```typescript\n" +
      "import { TestBed, ComponentFixture } from '@angular/core/testing';\n\n" +
      "describe('UserComponent', () => {\n" +
      "  let component: UserComponent;\n" +
      "  let fixture: ComponentFixture<UserComponent>;\n\n" +
      "  beforeEach(async () => {\n" +
      "    await TestBed.configureTestingModule({\n" +
      "      imports: [UserComponent] // Standalone\n" +
      "    }).compileComponents();\n\n" +
      "    fixture = TestBed.createComponent(UserComponent);\n" +
      "    component = fixture.componentInstance;\n" +
      "    fixture.detectChanges();\n" +
      "  });\n\n" +
      "  it('should create', () => {\n" +
      "    expect(component).toBeTruthy();\n" +
      "  });\n\n" +
      "  it('should display user name', () => {\n" +
      "    component.user = { name: 'John', email: 'john@example.com' };\n" +
      "    fixture.detectChanges(); // Trigger change detection\n" +
      "    \n" +
      "    const compiled = fixture.nativeElement;\n" +
      "    expect(compiled.querySelector('h1').textContent).toContain('John');\n" +
      "  });\n" +
      "});\n" +
      "```\n\n" +
      "**Testing Services:**\n\n" +
      "```typescript\n" +
      "import { TestBed } from '@angular/core/testing';\n" +
      "import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';\n\n" +
      "describe('UserService', () => {\n" +
      "  let service: UserService;\n" +
      "  let httpMock: HttpTestingController;\n\n" +
      "  beforeEach(() => {\n" +
      "    TestBed.configureTestingModule({\n" +
      "      imports: [HttpClientTestingModule],\n" +
      "      providers: [UserService]\n" +
      "    });\n\n" +
      "    service = TestBed.inject(UserService);\n" +
      "    httpMock = TestBed.inject(HttpTestingController);\n" +
      "  });\n\n" +
      "  afterEach(() => {\n" +
      "    httpMock.verify(); // No outstanding requests\n" +
      "  });\n\n" +
      "  it('should fetch users', () => {\n" +
      "    const mockUsers = [{ id: 1, name: 'John' }];\n\n" +
      "    service.getUsers().subscribe(users => {\n" +
      "      expect(users).toEqual(mockUsers);\n" +
      "    });\n\n" +
      "    const req = httpMock.expectOne('/api/users');\n" +
      "    expect(req.request.method).toBe('GET');\n" +
      "    req.flush(mockUsers);\n" +
      "  });\n" +
      "});\n" +
      "```\n\n" +
      "**Async Testing:**\n\n" +
      "```typescript\n" +
      "import { fakeAsync, tick, flush } from '@angular/core/testing';\n\n" +
      "// fakeAsync - control time\n" +
      "it('should debounce search', fakeAsync(() => {\n" +
      "  component.search('test');\n" +
      "  tick(299); // Just before debounce\n" +
      "  expect(component.results).toEqual([]);\n" +
      "  \n" +
      "  tick(1); // After 300ms debounce\n" +
      "  expect(component.results.length).toBeGreaterThan(0);\n" +
      "}));\n\n" +
      "// waitForAsync - handle async operations\n" +
      "it('should load data', waitForAsync(() => {\n" +
      "  component.ngOnInit();\n" +
      "  fixture.whenStable().then(() => {\n" +
      "    expect(component.data).toBeDefined();\n" +
      "  });\n" +
      "}));\n" +
      "```",
    category: "Testing",
    difficulty: "hard",
    tags: ["testing", "testbed", "jasmine", "async", "http-testing"],
  },
  {
    id: 21,
    question:
      "Explain RxJS higher-order operators: switchMap, mergeMap, concatMap, exhaustMap. When to use each?",
    answer:
      "Higher-order operators handle observables that emit observables (flattening).\n\n" +
      "**switchMap - Cancel Previous:**\n\n" +
      "```typescript\n" +
      "// Search - cancel old search when new query arrives\n" +
      "searchControl.valueChanges.pipe(\n" +
      "  debounceTime(300),\n" +
      "  switchMap(query => this.searchService.search(query))\n" +
      ").subscribe(results => this.results = results);\n\n" +
      "// Query: 'ang' → starts search\n" +
      "// Query: 'angu' → CANCELS 'ang' search, starts new\n" +
      "// Query: 'angular' → CANCELS 'angu', starts new\n" +
      "// Only last search completes\n" +
      "```\n\n" +
      "**mergeMap - Run All Concurrently:**\n\n" +
      "```typescript\n" +
      "// Process all items in parallel\n" +
      "from([1, 2, 3]).pipe(\n" +
      "  mergeMap(id => this.http.get(`/api/user/${id}`))\n" +
      ").subscribe(user => console.log(user));\n\n" +
      "// All 3 requests run simultaneously\n" +
      "// Results arrive in completion order (not input order)\n" +
      "```\n\n" +
      "**concatMap - Run Sequentially:**\n\n" +
      "```typescript\n" +
      "// Process one at a time, in order\n" +
      "from([1, 2, 3]).pipe(\n" +
      "  concatMap(id => this.http.get(`/api/user/${id}`))\n" +
      ").subscribe(user => console.log(user));\n\n" +
      "// Waits for request 1 to complete before starting 2\n" +
      "// Maintains order\n" +
      "```\n\n" +
      "**exhaustMap - Ignore New Until Current Completes:**\n\n" +
      "```typescript\n" +
      "// Save button - ignore clicks while saving\n" +
      "saveButton.clicks$.pipe(\n" +
      "  exhaustMap(() => this.http.post('/api/save', data))\n" +
      ").subscribe();\n\n" +
      "// Click 1 → starts save\n" +
      "// Click 2 (while saving) → IGNORED\n" +
      "// Click 3 (while saving) → IGNORED\n" +
      "// After save completes, new clicks work\n" +
      "```\n\n" +
      "**Use Cases:**\n" +
      "- switchMap: Search, autocomplete, typeahead\n" +
      "- mergeMap: Parallel independent requests\n" +
      "- concatMap: Sequential operations (upload queue)\n" +
      "- exhaustMap: Prevent duplicate submissions",
    category: "RxJS",
    difficulty: "hard",
    tags: ["rxjs", "operators", "switchmap", "mergemap", "concatmap", "exhaustmap"],
  },
  {
    id: 22,
    question: "How do you implement lazy loading in Angular? What are the benefits?",
    answer:
      "Lazy loading loads feature modules on-demand, reducing initial bundle size.\n\n" +
      "**Lazy Loading with Standalone (Angular 14+):**\n\n" +
      "```typescript\n" +
      "const routes: Routes = [\n" +
      "  {\n" +
      "    path: 'admin',\n" +
      "    loadComponent: () => import('./admin/admin.component')\n" +
      "      .then(m => m.AdminComponent)\n" +
      "  },\n" +
      "  {\n" +
      "    path: 'users',\n" +
      "    loadChildren: () => import('./users/users.routes')\n" +
      "      .then(m => m.USERS_ROUTES)\n" +
      "  }\n" +
      "];\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "1. Smaller initial bundle\n" +
      "2. Faster initial load\n" +
      "3. Load features on-demand\n" +
      "4. Better code splitting\n\n" +
      "**Preloading Strategy:**\n\n" +
      "```typescript\n" +
      "import { PreloadAllModules } from '@angular/router';\n\n" +
      "provideRouter(routes, \n" +
      "  withPreloading(PreloadAllModules) // Preload in background\n" +
      ")\n" +
      "```",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["lazy-loading", "performance", "routing", "code-splitting"],
  },
  {
    id: 23,
    question:
      "What is Angular's inject() function (Angular 14+)? How does it compare to constructor injection?",
    answer:
      "**inject() Function - Modern DI:**\n\n" +
      "```typescript\n" +
      "import { inject } from '@angular/core';\n\n" +
      "// Functional approach\n" +
      "export const authGuard: CanActivateFn = (route, state) => {\n" +
      "  const authService = inject(AuthService); // No constructor!\n" +
      "  const router = inject(Router);\n\n" +
      "  return authService.isAuthenticated() \n" +
      "    ? true \n" +
      "    : router.createUrlTree(['/login']);\n" +
      "};\n\n" +
      "// In components\n" +
      "@Component({...})\n" +
      "export class MyComponent {\n" +
      "  private userService = inject(UserService);\n" +
      "  private router = inject(Router);\n\n" +
      "  // No constructor needed!\n" +
      "}\n" +
      "```\n\n" +
      "**vs Constructor Injection:**\n\n" +
      "```typescript\n" +
      "// Traditional\n" +
      "@Component({...})\n" +
      "export class MyComponent {\n" +
      "  constructor(\n" +
      "    private userService: UserService,\n" +
      "    private router: Router\n" +
      "  ) {}\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits of inject():**\n" +
      "1. Use in functional guards/interceptors\n" +
      "2. Conditional injection\n" +
      "3. Cleaner code\n" +
      "4. Works outside constructors",
    category: "Dependency Injection",
    difficulty: "intermediate",
    tags: ["inject", "di", "angular14+", "functional"],
  },
  {
    id: 24,
    question:
      "What is Zone.js and how does it enable automatic change detection? What is Zoneless Angular?",
    answer:
      "**Zone.js:**\n" +
      "Library that patches browser async APIs to notify Angular of changes.\n\n" +
      "**What it Patches:**\n" +
      "```typescript\n" +
      "// Zone.js intercepts:\n" +
      "- setTimeout/setInterval\n" +
      "- Promise.then\n" +
      "- addEventListener\n" +
      "- XMLHttpRequest/fetch\n" +
      "- requestAnimationFrame\n" +
      "```\n\n" +
      "**How it Works:**\n" +
      "```typescript\n" +
      "// When async completes, Zone.js notifies Angular\n" +
      "button.addEventListener('click', () => {\n" +
      "  this.count++; // Zone detects this\n" +
      "  // Zone triggers change detection automatically\n" +
      "});\n" +
      "```\n\n" +
      "**Zoneless Angular (Angular 18+):**\n\n" +
      "```typescript\n" +
      "// Bootstrap without Zone.js\n" +
      "bootstrapApplication(AppComponent, {\n" +
      "  providers: [\n" +
      "    provideExperimentalZonelessChangeDetection()\n" +
      "  ]\n" +
      "});\n\n" +
      "// Use Signals for reactivity\n" +
      "@Component({...})\n" +
      "export class MyComponent {\n" +
      "  count = signal(0);\n\n" +
      "  increment() {\n" +
      "    this.count.update(c => c + 1); // Auto-updates view\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits of Zoneless:**\n" +
      "- Better performance (no patching overhead)\n" +
      "- Smaller bundle (no Zone.js)\n" +
      "- More predictable\n" +
      "- Explicit reactivity with Signals",
    category: "Core Concepts",
    difficulty: "hard",
    tags: ["zonejs", "change-detection", "zoneless", "signals", "performance"],
  },
  {
    id: 25,
    question: "What is Content Projection (ng-content)? Explain single and multi-slot projection.",
    answer:
      "Content projection allows components to accept and display external content.\n\n" +
      "**Single Slot:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-card',\n" +
      "  template: `\n" +
      '    <div class="card">\n' +
      "      <ng-content></ng-content>\n" +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "export class CardComponent {}\n\n" +
      "// Usage\n" +
      "<app-card>\n" +
      "  <h1>Title</h1>\n" +
      "  <p>Content here</p>\n" +
      "</app-card>\n" +
      "```\n\n" +
      "**Multi-Slot (select attribute):**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-card',\n" +
      "  template: `\n" +
      '    <div class="card">\n' +
      '      <div class="header">\n' +
      '        <ng-content select="[card-header]"></ng-content>\n' +
      "      </div>\n" +
      '      <div class="body">\n' +
      '        <ng-content select="[card-body]"></ng-content>\n' +
      "      </div>\n" +
      '      <div class="footer">\n' +
      '        <ng-content select="[card-footer]"></ng-content>\n' +
      "      </div>\n" +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "export class CardComponent {}\n\n" +
      "// Usage\n" +
      "<app-card>\n" +
      "  <div card-header>Header Content</div>\n" +
      "  <div card-body>Body Content</div>\n" +
      "  <div card-footer>Footer Content</div>\n" +
      "</app-card>\n" +
      "```\n\n" +
      "**Use Cases:**\n" +
      "- Reusable layout components\n" +
      "- Custom dialogs\n" +
      "- Tab panels\n" +
      "- Accordion items",
    category: "Component Patterns",
    difficulty: "intermediate",
    tags: ["content-projection", "ng-content", "slots", "composition"],
  },
  {
    id: 26,
    question: "How do you optimize Angular application performance? List key strategies.",
    answer:
      "**Key Optimization Strategies:**\n\n" +
      "**1. OnPush Change Detection:**\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  changeDetection: ChangeDetectionStrategy.OnPush\n" +
      "})\n" +
      "```\n\n" +
      "**2. TrackBy Functions:**\n" +
      "```typescript\n" +
      '<div *ngFor="let item of items; trackBy: trackById">\n' +
      "trackById(index: number, item: Item) {\n" +
      "  return item.id;\n" +
      "}\n" +
      "```\n\n" +
      "**3. Lazy Loading Modules:**\n" +
      "```typescript\n" +
      "loadChildren: () => import('./feature/feature.routes')\n" +
      "```\n\n" +
      "**4. Pure Pipes:**\n" +
      "```typescript\n" +
      "@Pipe({ name: 'filter', pure: true })\n" +
      "```\n\n" +
      "**5. Async Pipe (No Manual Subscriptions):**\n" +
      "```typescript\n" +
      "users$ = this.userService.getUsers();\n" +
      "// Template: {{ users$ | async }}\n" +
      "```\n\n" +
      "**6. Virtual Scrolling:**\n" +
      "```typescript\n" +
      "import { ScrollingModule } from '@angular/cdk/scrolling';\n\n" +
      '<cdk-virtual-scroll-viewport itemSize="50" class="viewport">\n' +
      '  <div *cdkVirtualFor="let item of items" class="item">\n' +
      "    {{ item.name }}\n" +
      "  </div>\n" +
      "</cdk-virtual-scroll-viewport>\n" +
      "```\n\n" +
      "**7. Detach Change Detection:**\n" +
      "```typescript\n" +
      "constructor(private cdr: ChangeDetectorRef) {}\n\n" +
      "ngOnInit() {\n" +
      "  this.cdr.detach();\n" +
      "  // Manually trigger when needed\n" +
      "  this.cdr.detectChanges();\n" +
      "}\n" +
      "```\n\n" +
      "**8. Run Outside Zone:**\n" +
      "```typescript\n" +
      "this.ngZone.runOutsideAngular(() => {\n" +
      "  // Heavy computation\n" +
      "});\n" +
      "```\n\n" +
      "**9. Preload Strategy:**\n" +
      "```typescript\n" +
      "provideRouter(routes, withPreloading(PreloadAllModules))\n" +
      "```\n\n" +
      "**10. Build Optimization:**\n" +
      "```bash\n" +
      "ng build --configuration production\n" +
      "# Enables: AOT, tree-shaking, minification, bundling\n" +
      "```",
    category: "Performance",
    difficulty: "hard",
    tags: ["performance", "optimization", "best-practices", "bundle-size"],
  },
  {
    id: 27,
    question: "What are Custom Validators in Angular? Implement sync and async validators.",
    answer:
      "**Synchronous Validator:**\n\n" +
      "```typescript\n" +
      "import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';\n\n" +
      "export function passwordStrength(): ValidatorFn {\n" +
      "  return (control: AbstractControl): ValidationErrors | null => {\n" +
      "    const value = control.value;\n" +
      "    if (!value) return null;\n\n" +
      "    const hasNumber = /[0-9]/.test(value);\n" +
      "    const hasUpper = /[A-Z]/.test(value);\n" +
      "    const hasLower = /[a-z]/.test(value);\n" +
      "    const hasSpecial = /[!@#$%^&*]/.test(value);\n\n" +
      "    const valid = hasNumber && hasUpper && hasLower && hasSpecial;\n" +
      "    return valid ? null : { \n" +
      "      passwordStrength: {\n" +
      "        hasNumber,\n" +
      "        hasUpper,\n" +
      "        hasLower,\n" +
      "        hasSpecial\n" +
      "      }\n" +
      "    };\n" +
      "  };\n" +
      "}\n\n" +
      "// Usage\n" +
      "this.form = this.fb.group({\n" +
      "  password: ['', [Validators.required, passwordStrength()]]\n" +
      "});\n" +
      "```\n\n" +
      "**Async Validator (Check Email Uniqueness):**\n\n" +
      "```typescript\n" +
      "import { AsyncValidatorFn } from '@angular/forms';\n" +
      "import { map, catchError, debounceTime, take } from 'rxjs/operators';\n\n" +
      "export function emailExistsValidator(userService: UserService): AsyncValidatorFn {\n" +
      "  return (control: AbstractControl): Observable<ValidationErrors | null> => {\n" +
      "    if (!control.value) {\n" +
      "      return of(null);\n" +
      "    }\n\n" +
      "    return userService.checkEmailExists(control.value).pipe(\n" +
      "      debounceTime(300), // Wait for user to stop typing\n" +
      "      take(1),\n" +
      "      map(exists => exists ? { emailExists: true } : null),\n" +
      "      catchError(() => of(null))\n" +
      "    );\n" +
      "  };\n" +
      "}\n\n" +
      "// Usage\n" +
      "this.form = this.fb.group({\n" +
      "  email: [\n" +
      "    '',\n" +
      "    [Validators.required, Validators.email], // Sync\n" +
      "    [emailExistsValidator(this.userService)] // Async\n" +
      "  ]\n" +
      "});\n\n" +
      "// Check status\n" +
      "if (this.form.get('email').pending) {\n" +
      "  // Async validation in progress\n" +
      "}\n" +
      "```\n\n" +
      "**Cross-Field Validator:**\n\n" +
      "```typescript\n" +
      "export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {\n" +
      "  const password = group.get('password');\n" +
      "  const confirm = group.get('confirmPassword');\n\n" +
      "  return password && confirm && password.value === confirm.value \n" +
      "    ? null \n" +
      "    : { passwordMismatch: true };\n" +
      "};\n\n" +
      "// Apply to FormGroup\n" +
      "this.form = this.fb.group({\n" +
      "  password: [''],\n" +
      "  confirmPassword: ['']\n" +
      "}, { validators: [passwordMatchValidator] });\n" +
      "```",
    category: "Forms",
    difficulty: "intermediate",
    tags: ["validation", "forms", "async-validators", "custom-validators"],
  },
  {
    id: 28,
    question: "How do you handle errors in Angular applications? Implement global error handling.",
    answer:
      "**Global Error Handler:**\n\n" +
      "```typescript\n" +
      "import { ErrorHandler, Injectable, Injector } from '@angular/core';\n\n" +
      "@Injectable()\n" +
      "export class GlobalErrorHandler implements ErrorHandler {\n" +
      "  constructor(private injector: Injector) {}\n\n" +
      "  handleError(error: Error | HttpErrorResponse) {\n" +
      "    const notificationService = this.injector.get(NotificationService);\n\n" +
      "    if (error instanceof HttpErrorResponse) {\n" +
      "      // Server error\n" +
      "      console.error('Server error:', error);\n" +
      "      notificationService.showError(`Server error: ${error.message}`);\n" +
      "    } else {\n" +
      "      // Client error\n" +
      "      console.error('Client error:', error);\n" +
      "      notificationService.showError(`Error: ${error.message}`);\n" +
      "    }\n\n" +
      "    // Log to monitoring service\n" +
      "    this.logError(error);\n" +
      "  }\n\n" +
      "  private logError(error: any) {\n" +
      "    // Send to Sentry, LogRocket, etc.\n" +
      "  }\n" +
      "}\n\n" +
      "// Register\n" +
      "providers: [\n" +
      "  { provide: ErrorHandler, useClass: GlobalErrorHandler }\n" +
      "]\n" +
      "```\n\n" +
      "**HTTP Error Interceptor:**\n\n" +
      "```typescript\n" +
      "export const errorInterceptor: HttpInterceptorFn = (req, next) => {\n" +
      "  return next(req).pipe(\n" +
      "    retry(2),\n" +
      "    catchError((error: HttpErrorResponse) => {\n" +
      "      if (error.status === 401) {\n" +
      "        inject(Router).navigate(['/login']);\n" +
      "      }\n" +
      "      return throwError(() => error);\n" +
      "    })\n" +
      "  );\n" +
      "};\n" +
      "```",
    category: "Error Handling",
    difficulty: "intermediate",
    tags: ["error-handling", "global-error-handler", "http-errors"],
  },
  {
    id: 29,
    question: "What is AOT compilation? How does it differ from JIT and what are the benefits?",
    answer:
      "**AOT (Ahead-of-Time) Compilation:**\n" +
      "Templates compiled during build, before browser downloads code.\n\n" +
      "**JIT (Just-in-Time) Compilation:**\n" +
      "Templates compiled in browser at runtime.\n\n" +
      "**Comparison:**\n\n" +
      "| Feature | AOT | JIT |\n" +
      "|---------|-----|-----|\n" +
      "| Compilation | Build time | Runtime |\n" +
      "| Bundle size | Smaller | Larger (includes compiler) |\n" +
      "| Load time | Faster | Slower |\n" +
      "| Template errors | Build time | Runtime |\n" +
      "| Production | Yes | No |\n" +
      "| Development | Slower builds | Faster builds |\n\n" +
      "**AOT Benefits:**\n\n" +
      "1. **Faster Rendering:** Pre-compiled templates\n" +
      "2. **Smaller Bundles:** No compiler in bundle\n" +
      "3. **Earlier Error Detection:** Template errors at build\n" +
      "4. **Better Security:** No eval() or new Function()\n" +
      "5. **Tree-Shaking:** Unused code removed\n\n" +
      "**Angular CLI:**\n\n" +
      "```bash\n" +
      "# Development (JIT by default)\n" +
      "ng serve\n\n" +
      "# Production (AOT by default)\n" +
      "ng build --configuration production\n" +
      "```",
    category: "Build & Compilation",
    difficulty: "intermediate",
    tags: ["aot", "jit", "compilation", "performance", "build"],
  },
  {
    id: 30,
    question: "What are Angular Animations? Provide basic and advanced examples.",
    answer:
      "**Basic Animation:**\n\n" +
      "```typescript\n" +
      "import { trigger, state, style, transition, animate } from '@angular/animations';\n\n" +
      "@Component({\n" +
      "  animations: [\n" +
      "    trigger('openClose', [\n" +
      "      state('open', style({\n" +
      "        height: '200px',\n" +
      "        opacity: 1\n" +
      "      })),\n" +
      "      state('closed', style({\n" +
      "        height: '100px',\n" +
      "        opacity: 0.5\n" +
      "      })),\n" +
      "      transition('open <=> closed', [\n" +
      "        animate('0.3s ease-in-out')\n" +
      "      ])\n" +
      "    ])\n" +
      "  ]\n" +
      "})\n" +
      "export class AnimatedComponent {\n" +
      "  isOpen = true;\n" +
      "}\n\n" +
      "// Template\n" +
      "<div [@openClose]=\"isOpen ? 'open' : 'closed'\">Content</div>\n" +
      '<button (click)="isOpen = !isOpen">Toggle</button>\n' +
      "```\n\n" +
      "**Enter/Leave Animations:**\n\n" +
      "```typescript\n" +
      "trigger('fadeIn', [\n" +
      "  transition(':enter', [\n" +
      "    style({ opacity: 0 }),\n" +
      "    animate('300ms', style({ opacity: 1 }))\n" +
      "  ]),\n" +
      "  transition(':leave', [\n" +
      "    animate('300ms', style({ opacity: 0 }))\n" +
      "  ])\n" +
      "])\n\n" +
      "// Template\n" +
      '<div *ngIf="isVisible" @fadeIn>Fades in/out</div>\n' +
      "```\n\n" +
      "**List Animations:**\n\n" +
      "```typescript\n" +
      "import { query, stagger } from '@angular/animations';\n\n" +
      "trigger('listAnimation', [\n" +
      "  transition('* => *', [\n" +
      "    query(':enter', [\n" +
      "      style({ opacity: 0, transform: 'translateY(-10px)' }),\n" +
      "      stagger(100, [\n" +
      "        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' }))\n" +
      "      ])\n" +
      "    ], { optional: true })\n" +
      "  ])\n" +
      "])\n\n" +
      '<div *ngFor="let item of items" @listAnimation>{{ item }}</div>\n' +
      "```",
    category: "Animations",
    difficulty: "intermediate",
    tags: ["animations", "transitions", "ui", "user-experience"],
  },
  {
    id: 31,
    question:
      "Explain Dynamic Component Loading in Angular. How do you create and destroy components programmatically?",
    answer:
      "Dynamic components are created programmatically at runtime, not declared in templates.\n\n" +
      "**Dynamic Component Loading:**\n\n" +
      "```typescript\n" +
      "import { Component, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';\n\n" +
      "@Component({\n" +
      "  selector: 'app-container',\n" +
      "  template: '<ng-container #dynamicContainer></ng-container>'\n" +
      "})\n" +
      "export class ContainerComponent {\n" +
      "  @ViewChild('dynamicContainer', { read: ViewContainerRef }) \n" +
      "  container: ViewContainerRef;\n\n" +
      "  private componentRef: ComponentRef<any>;\n\n" +
      "  loadComponent() {\n" +
      "    // Clear existing\n" +
      "    this.container.clear();\n\n" +
      "    // Create component\n" +
      "    this.componentRef = this.container.createComponent(DynamicComponent);\n\n" +
      "    // Set inputs\n" +
      "    this.componentRef.instance.data = { title: 'Dynamic' };\n\n" +
      "    // Subscribe to outputs\n" +
      "    this.componentRef.instance.action.subscribe(event => {\n" +
      "      console.log('Event from dynamic component:', event);\n" +
      "    });\n\n" +
      "    // Trigger change detection\n" +
      "    this.componentRef.changeDetectorRef.detectChanges();\n" +
      "  }\n\n" +
      "  destroyComponent() {\n" +
      "    if (this.componentRef) {\n" +
      "      this.componentRef.destroy();\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Use Cases:**\n" +
      "- Modal dialogs\n" +
      "- Toast notifications\n" +
      "- Dynamic forms\n" +
      "- Plugin architecture\n" +
      "- Dashboard widgets\n\n" +
      "**Modal Service Example:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class ModalService {\n" +
      "  constructor(\n" +
      "    private appRef: ApplicationRef,\n" +
      "    private injector: Injector\n" +
      "  ) {}\n\n" +
      "  open(component: Type<any>, data?: any): ComponentRef<any> {\n" +
      "    // Create component\n" +
      "    const componentRef = createComponent(component, {\n" +
      "      environmentInjector: this.appRef.injector\n" +
      "    });\n\n" +
      "    // Set data\n" +
      "    if (data) {\n" +
      "      Object.assign(componentRef.instance, data);\n" +
      "    }\n\n" +
      "    // Attach to DOM\n" +
      "    this.appRef.attachView(componentRef.hostView);\n" +
      "    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];\n" +
      "    document.body.appendChild(domElem);\n\n" +
      "    return componentRef;\n" +
      "  }\n\n" +
      "  close(componentRef: ComponentRef<any>) {\n" +
      "    this.appRef.detachView(componentRef.hostView);\n" +
      "    componentRef.destroy();\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage\n" +
      "const modalRef = this.modalService.open(ConfirmDialogComponent, {\n" +
      "  message: 'Are you sure?'\n" +
      "});\n\n" +
      "modalRef.instance.confirmed.subscribe(() => {\n" +
      "  console.log('Confirmed!');\n" +
      "  this.modalService.close(modalRef);\n" +
      "});\n" +
      "```",
    category: "Advanced Patterns",
    difficulty: "hard",
    tags: ["dynamic-components", "viewcontainerref", "componentref", "advanced"],
  },
  {
    id: 32,
    question:
      "What is ViewEncapsulation in Angular? Explain Emulated, ShadowDom, and None strategies.",
    answer:
      "ViewEncapsulation controls how component styles are scoped and applied.\n\n" +
      "**Three Strategies:**\n\n" +
      "**1. Emulated (Default):**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-user',\n" +
      "  styles: [`\n" +
      "    h1 { color: blue; }\n" +
      "  `],\n" +
      "  encapsulation: ViewEncapsulation.Emulated // Default\n" +
      "})\n" +
      "export class UserComponent {}\n\n" +
      "// Angular adds unique attributes:\n" +
      "// <h1 _ngcontent-abc-123>Title</h1>\n" +
      "// h1[_ngcontent-abc-123] { color: blue; }\n" +
      "// Styles scoped to component only\n" +
      "```\n\n" +
      "**2. ShadowDom (Native):**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  encapsulation: ViewEncapsulation.ShadowDom\n" +
      "})\n" +
      "// Uses native Shadow DOM\n" +
      "// True style isolation\n" +
      "// Doesn't work in older browsers\n" +
      "```\n\n" +
      "**3. None (Global):**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  encapsulation: ViewEncapsulation.None\n" +
      "})\n" +
      "// Styles applied globally\n" +
      "// Can affect other components\n" +
      "// Use for theme overrides\n" +
      "```\n\n" +
      "**When to Use Each:**\n" +
      "- Emulated: Default, best for most cases\n" +
      "- ShadowDom: True isolation, web components\n" +
      "- None: Global styles, third-party lib overrides",
    category: "Styling",
    difficulty: "intermediate",
    tags: ["view-encapsulation", "styles", "shadow-dom", "css"],
  },
  {
    id: 33,
    question: "What are Template Reference Variables in Angular? How do you use them?",
    answer:
      "Template reference variables (#var) reference DOM elements or components in templates.\n\n" +
      "**Basic Usage:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  template: `\n" +
      "    <!-- Reference input element -->\n" +
      '    <input #nameInput type="text" />\n' +
      '    <button (click)="nameInput.focus()">Focus Input</button>\n' +
      "    <p>Value: {{ nameInput.value }}</p>\n\n" +
      "    <!-- Reference form -->\n" +
      '    <form #myForm="ngForm">\n' +
      '      <input name="email" ngModel required />\n' +
      '      <button [disabled]="myForm.invalid">Submit</button>\n' +
      "      <p>Valid: {{ myForm.valid }}</p>\n" +
      "    </form>\n\n" +
      "    <!-- Reference component -->\n" +
      "    <app-child #childComp></app-child>\n" +
      '    <button (click)="childComp.doSomething()">Call Child Method</button>\n' +
      "  `\n" +
      "})\n" +
      "export class TemplateRefComponent {}\n" +
      "```\n\n" +
      "**Access in Component Class:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  template: '<input #myInput />'\n" +
      "})\n" +
      "export class Component implements AfterViewInit {\n" +
      "  @ViewChild('myInput') input: ElementRef;\n\n" +
      "  ngAfterViewInit() {\n" +
      "    this.input.nativeElement.focus();\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Common Patterns:**\n\n" +
      "```typescript\n" +
      "// Pass to child component\n" +
      "<input #searchInput />\n" +
      '<app-search-results [input]="searchInput"></app-search-results>\n\n' +
      "// Call methods\n" +
      '<video #videoPlayer src="movie.mp4"></video>\n' +
      '<button (click)="videoPlayer.play()">Play</button>\n' +
      '<button (click)="videoPlayer.pause()">Pause</button>\n\n' +
      "// Check state\n" +
      '<form #f="ngForm">\n' +
      '  <div *ngIf="f.submitted && f.invalid">\n' +
      "    Please fix errors\n" +
      "  </div>\n" +
      "</form>\n" +
      "```",
    category: "Templates",
    difficulty: "easy",
    tags: ["template-reference", "dom-access", "templates"],
  },
  {
    id: 34,
    question:
      "What is Renderer2 in Angular? Why should you use it instead of direct DOM manipulation?",
    answer:
      "Renderer2 is Angular's abstraction for safe, platform-agnostic DOM manipulation.\n\n" +
      "**Why Not Direct DOM Manipulation:**\n\n" +
      "```typescript\n" +
      "// ❌ BAD - Direct DOM access\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  @ViewChild('div') div: ElementRef;\n\n" +
      "  ngAfterViewInit() {\n" +
      "    // Breaks SSR, Web Workers, doesn't work in all platforms\n" +
      "    this.div.nativeElement.style.color = 'red';\n" +
      "    this.div.nativeElement.addEventListener('click', this.onClick);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**✅ Good - Use Renderer2:**\n\n" +
      "```typescript\n" +
      "import { Renderer2 } from '@angular/core';\n\n" +
      "@Component({...})\n" +
      "export class Component implements AfterViewInit, OnDestroy {\n" +
      "  @ViewChild('div') div: ElementRef;\n" +
      "  private listeners: (() => void)[] = [];\n\n" +
      "  constructor(private renderer: Renderer2) {}\n\n" +
      "  ngAfterViewInit() {\n" +
      "    const el = this.div.nativeElement;\n\n" +
      "    // Set styles\n" +
      "    this.renderer.setStyle(el, 'color', 'red');\n" +
      "    this.renderer.setStyle(el, 'font-size', '20px');\n\n" +
      "    // Add/remove classes\n" +
      "    this.renderer.addClass(el, 'active');\n" +
      "    this.renderer.removeClass(el, 'inactive');\n\n" +
      "    // Set attributes\n" +
      "    this.renderer.setAttribute(el, 'data-id', '123');\n" +
      "    this.renderer.removeAttribute(el, 'disabled');\n\n" +
      "    // Create elements\n" +
      "    const span = this.renderer.createElement('span');\n" +
      "    const text = this.renderer.createText('Hello');\n" +
      "    this.renderer.appendChild(span, text);\n" +
      "    this.renderer.appendChild(el, span);\n\n" +
      "    // Event listeners (returns cleanup function)\n" +
      "    const unlisten = this.renderer.listen(el, 'click', (event) => {\n" +
      "      console.log('Clicked!', event);\n" +
      "    });\n" +
      "    this.listeners.push(unlisten);\n\n" +
      "    // Set properties\n" +
      "    this.renderer.setProperty(el, 'innerHTML', '<strong>Bold</strong>');\n" +
      "  }\n\n" +
      "  ngOnDestroy() {\n" +
      "    // Clean up listeners\n" +
      "    this.listeners.forEach(unlisten => unlisten());\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "1. Platform-agnostic (works in SSR, Web Workers)\n" +
      "2. Safer (prevents XSS when used correctly)\n" +
      "3. Testable\n" +
      "4. Future-proof\n\n" +
      "**Custom Directive with Renderer2:**\n\n" +
      "```typescript\n" +
      "@Directive({\n" +
      "  selector: '[appTooltip]',\n" +
      "  standalone: true\n" +
      "})\n" +
      "export class TooltipDirective implements OnInit, OnDestroy {\n" +
      "  @Input() appTooltip: string;\n" +
      "  private tooltipElement: HTMLElement;\n\n" +
      "  constructor(\n" +
      "    private el: ElementRef,\n" +
      "    private renderer: Renderer2\n" +
      "  ) {}\n\n" +
      "  @HostListener('mouseenter') onMouseEnter() {\n" +
      "    this.show();\n" +
      "  }\n\n" +
      "  @HostListener('mouseleave') onMouseLeave() {\n" +
      "    this.hide();\n" +
      "  }\n\n" +
      "  private show() {\n" +
      "    this.tooltipElement = this.renderer.createElement('div');\n" +
      "    const text = this.renderer.createText(this.appTooltip);\n" +
      "    \n" +
      "    this.renderer.appendChild(this.tooltipElement, text);\n" +
      "    this.renderer.addClass(this.tooltipElement, 'tooltip');\n" +
      "    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');\n" +
      "    \n" +
      "    this.renderer.appendChild(document.body, this.tooltipElement);\n" +
      "  }\n\n" +
      "  private hide() {\n" +
      "    if (this.tooltipElement) {\n" +
      "      this.renderer.removeChild(document.body, this.tooltipElement);\n" +
      "    }\n" +
      "  }\n\n" +
      "  ngOnDestroy() {\n" +
      "    this.hide();\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "DOM Manipulation",
    difficulty: "hard",
    tags: ["renderer2", "dom", "ssr", "directives", "safe-dom"],
  },
  {
    id: 35,
    question:
      "What is FormArray in Angular? How do you implement dynamic forms with add/remove functionality?",
    answer:
      "FormArray manages a dynamic array of form controls, useful for dynamic forms.\n\n" +
      "**Dynamic Form with FormArray:**\n\n" +
      "```typescript\n" +
      "import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';\n\n" +
      "@Component({\n" +
      "  template: `\n" +
      '    <form [formGroup]="form" (ngSubmit)="onSubmit()">\n' +
      '      <div formArrayName="skills">\n' +
      '        <div *ngFor="let skill of skills.controls; let i = index" [formGroupName]="i">\n' +
      '          <input formControlName="name" placeholder="Skill name" />\n' +
      '          <select formControlName="level">\n' +
      '            <option value="beginner">Beginner</option>\n' +
      '            <option value="intermediate">Intermediate</option>\n' +
      '            <option value="expert">Expert</option>\n' +
      "          </select>\n" +
      '          <input formControlName="years" type="number" placeholder="Years" />\n' +
      '          <button type="button" (click)="removeSkill(i)">Remove</button>\n' +
      "        </div>\n" +
      "      </div>\n" +
      "      \n" +
      '      <button type="button" (click)="addSkill()">Add Skill</button>\n' +
      '      <button type="submit" [disabled]="form.invalid">Submit</button>\n' +
      "    </form>\n" +
      "    \n" +
      "    <pre>{{ form.value | json }}</pre>\n" +
      "  `\n" +
      "})\n" +
      "export class DynamicFormComponent {\n" +
      "  form: FormGroup;\n\n" +
      "  constructor(private fb: FormBuilder) {\n" +
      "    this.form = this.fb.group({\n" +
      "      name: ['', Validators.required],\n" +
      "      skills: this.fb.array([]) // Empty array initially\n" +
      "    });\n" +
      "  }\n\n" +
      "  get skills(): FormArray {\n" +
      "    return this.form.get('skills') as FormArray;\n" +
      "  }\n\n" +
      "  createSkillForm(): FormGroup {\n" +
      "    return this.fb.group({\n" +
      "      name: ['', Validators.required],\n" +
      "      level: ['beginner'],\n" +
      "      years: [0, [Validators.required, Validators.min(0)]]\n" +
      "    });\n" +
      "  }\n\n" +
      "  addSkill() {\n" +
      "    this.skills.push(this.createSkillForm());\n" +
      "  }\n\n" +
      "  removeSkill(index: number) {\n" +
      "    this.skills.removeAt(index);\n" +
      "  }\n\n" +
      "  onSubmit() {\n" +
      "    if (this.form.valid) {\n" +
      "      console.log(this.form.value);\n" +
      "      // Output: { name: 'John', skills: [{ name: 'Angular', level: 'expert', years: 3 }] }\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Validation:**\n\n" +
      "```typescript\n" +
      "// Array-level validation\n" +
      "this.form = this.fb.group({\n" +
      "  skills: this.fb.array([], Validators.minLength(1)) // At least 1 skill\n" +
      "});\n\n" +
      "// Access errors\n" +
      "if (this.skills.hasError('minLength')) {\n" +
      "  console.log('Add at least one skill');\n" +
      "}\n" +
      "```\n\n" +
      "**Patch Values:**\n\n" +
      "```typescript\n" +
      "// Load existing data\n" +
      "ngOnInit() {\n" +
      "  const userData = {\n" +
      "    name: 'John',\n" +
      "    skills: [\n" +
      "      { name: 'Angular', level: 'expert', years: 3 },\n" +
      "      { name: 'TypeScript', level: 'intermediate', years: 2 }\n" +
      "    ]\n" +
      "  };\n\n" +
      "  // Clear and repopulate\n" +
      "  this.skills.clear();\n" +
      "  userData.skills.forEach(skill => {\n" +
      "    this.skills.push(this.fb.group(skill));\n" +
      "  });\n" +
      "}\n" +
      "```",
    category: "Forms",
    difficulty: "hard",
    tags: ["formarray", "dynamic-forms", "reactive-forms", "validation"],
  },
  {
    id: 36,
    question: "Explain @HostListener and @HostBinding decorators. Provide practical examples.",
    answer:
      "@HostListener listens to host element events. @HostBinding binds to host element properties.\n\n" +
      "**@HostListener - Event Handling:**\n\n" +
      "```typescript\n" +
      "@Directive({\n" +
      "  selector: '[appClickOutside]',\n" +
      "  standalone: true\n" +
      "})\n" +
      "export class ClickOutsideDirective {\n" +
      "  @Output() clickOutside = new EventEmitter<void>();\n\n" +
      "  @HostListener('document:click', ['$event'])\n" +
      "  onClick(event: MouseEvent) {\n" +
      "    const clickedInside = this.el.nativeElement.contains(event.target);\n" +
      "    if (!clickedInside) {\n" +
      "      this.clickOutside.emit();\n" +
      "    }\n" +
      "  }\n\n" +
      "  constructor(private el: ElementRef) {}\n" +
      "}\n\n" +
      '// Usage: <div appClickOutside (clickOutside)="closeMenu()">Menu</div>\n' +
      "```\n\n" +
      "**@HostBinding - Property Binding:**\n\n" +
      "```typescript\n" +
      "@Directive({\n" +
      "  selector: '[appHighlight]',\n" +
      "  standalone: true\n" +
      "})\n" +
      "export class HighlightDirective {\n" +
      "  @Input() appHighlight = 'yellow';\n" +
      "  @HostBinding('style.backgroundColor') backgroundColor: string;\n" +
      "  @HostBinding('class.highlighted') isHighlighted = false;\n\n" +
      "  @HostListener('mouseenter')\n" +
      "  onMouseEnter() {\n" +
      "    this.backgroundColor = this.appHighlight;\n" +
      "    this.isHighlighted = true;\n" +
      "  }\n\n" +
      "  @HostListener('mouseleave')\n" +
      "  onMouseLeave() {\n" +
      "    this.backgroundColor = '';\n" +
      "    this.isHighlighted = false;\n" +
      "  }\n" +
      "}\n\n" +
      '// Usage: <div appHighlight="lightblue">Hover me</div>\n' +
      '// Result: <div class="highlighted" style="background-color: lightblue">Hover me</div>\n' +
      "```\n\n" +
      "**Complex Example - Draggable:**\n\n" +
      "```typescript\n" +
      "@Directive({\n" +
      "  selector: '[appDraggable]',\n" +
      "  standalone: true\n" +
      "})\n" +
      "export class DraggableDirective {\n" +
      "  @HostBinding('style.position') position = 'absolute';\n" +
      "  @HostBinding('style.left.px') left = 0;\n" +
      "  @HostBinding('style.top.px') top = 0;\n" +
      "  @HostBinding('style.cursor') cursor = 'move';\n\n" +
      "  private isDragging = false;\n" +
      "  private startX = 0;\n" +
      "  private startY = 0;\n\n" +
      "  @HostListener('mousedown', ['$event'])\n" +
      "  onMouseDown(event: MouseEvent) {\n" +
      "    this.isDragging = true;\n" +
      "    this.startX = event.clientX - this.left;\n" +
      "    this.startY = event.clientY - this.top;\n" +
      "    event.preventDefault();\n" +
      "  }\n\n" +
      "  @HostListener('document:mousemove', ['$event'])\n" +
      "  onMouseMove(event: MouseEvent) {\n" +
      "    if (this.isDragging) {\n" +
      "      this.left = event.clientX - this.startX;\n" +
      "      this.top = event.clientY - this.startY;\n" +
      "    }\n" +
      "  }\n\n" +
      "  @HostListener('document:mouseup')\n" +
      "  onMouseUp() {\n" +
      "    this.isDragging = false;\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage: <div appDraggable>Drag me!</div>\n" +
      "```",
    category: "Directives",
    difficulty: "intermediate",
    tags: ["hostlistener", "hostbinding", "directives", "events"],
  },
  {
    id: 37,
    question: "What is Angular Universal (SSR)? How do you implement server-side rendering?",
    answer:
      "Angular Universal enables server-side rendering (SSR) for faster initial loads and better SEO.\n\n" +
      "**Setup:**\n\n" +
      "```bash\n" +
      "ng add @nguniversal/express-engine\n" +
      "```\n\n" +
      "**Server Configuration:**\n\n" +
      "```typescript\n" +
      "// server.ts\n" +
      "import { APP_BASE_HREF } from '@angular/common';\n" +
      "import { CommonEngine } from '@angular/ssr';\n" +
      "import express from 'express';\n\n" +
      "const app = express();\n" +
      "const commonEngine = new CommonEngine();\n\n" +
      "app.get('*', (req, res) => {\n" +
      "  commonEngine\n" +
      "    .render({\n" +
      "      bootstrap: AppServerModule,\n" +
      "      documentFilePath: indexHtml,\n" +
      "      url: req.url,\n" +
      "      publicPath: distFolder,\n" +
      "      providers: [\n" +
      "        { provide: APP_BASE_HREF, useValue: req.baseUrl }\n" +
      "      ]\n" +
      "    })\n" +
      "    .then(html => res.send(html))\n" +
      "    .catch(err => res.status(500).send(err));\n" +
      "});\n\n" +
      "app.listen(4000, () => {\n" +
      "  console.log('Server listening on http://localhost:4000');\n" +
      "});\n" +
      "```\n\n" +
      "**Platform-Agnostic Code:**\n\n" +
      "```typescript\n" +
      "import { isPlatformBrowser } from '@angular/common';\n" +
      "import { PLATFORM_ID, inject } from '@angular/core';\n\n" +
      "@Component({...})\n" +
      "export class Component implements OnInit {\n" +
      "  private platformId = inject(PLATFORM_ID);\n\n" +
      "  ngOnInit() {\n" +
      "    // ❌ Breaks SSR\n" +
      "    localStorage.setItem('key', 'value');\n" +
      "    window.addEventListener('resize', this.onResize);\n\n" +
      "    // ✅ Check platform first\n" +
      "    if (isPlatformBrowser(this.platformId)) {\n" +
      "      localStorage.setItem('key', 'value');\n" +
      "      window.addEventListener('resize', this.onResize);\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "1. Faster First Contentful Paint\n" +
      "2. Better SEO (crawlers see full HTML)\n" +
      "3. Social media preview (og:tags)\n" +
      "4. Works without JavaScript\n\n" +
      "**Challenges:**\n" +
      "- No browser APIs (window, document, localStorage)\n" +
      "- Different lifecycle on server\n" +
      "- Must handle async data carefully\n" +
      "- Increased server costs",
    category: "SSR",
    difficulty: "hard",
    tags: ["ssr", "universal", "seo", "performance", "server"],
  },
  {
    id: 38,
    question:
      "How do you implement internationalization (i18n) in Angular? Explain runtime vs compile-time i18n.",
    answer:
      "**Angular Built-in i18n (Compile-Time):**\n\n" +
      "```html\n" +
      "<!-- Mark text for translation -->\n" +
      "<h1 i18n>Hello</h1>\n" +
      '<p i18n="User greeting">Welcome, {{name}}</p>\n\n' +
      "<!-- With description and meaning -->\n" +
      '<button i18n="Delete button|Button to delete item@@deleteButton">\n' +
      "  Delete\n" +
      "</button>\n\n" +
      "<!-- Attributes -->\n" +
      '<img [src]="logo" i18n-title title="Company Logo" />\n' +
      "```\n\n" +
      "**Extract Messages:**\n\n" +
      "```bash\n" +
      "ng extract-i18n --output-path src/locale\n" +
      "# Generates: messages.xlf (source file)\n" +
      "```\n\n" +
      "**Build for Each Locale:**\n\n" +
      "```bash\n" +
      "ng build --localize\n" +
      "# Builds: dist/en/, dist/fr/, dist/es/\n" +
      "```\n\n" +
      "**Runtime i18n (ngx-translate):**\n\n" +
      "```typescript\n" +
      "import { TranslateModule, TranslateLoader } from '@ngx-translate/core';\n\n" +
      "@Component({\n" +
      "  imports: [TranslateModule],\n" +
      "  template: `\n" +
      "    <h1>{{ 'HELLO' | translate }}</h1>\n" +
      "    <p>{{ 'WELCOME' | translate:{ name: userName } }}</p>\n" +
      "    \n" +
      '    <select (change)="switchLanguage($event)">\n' +
      '      <option value="en">English</option>\n' +
      '      <option value="fr">Français</option>\n' +
      "    </select>\n" +
      "  `\n" +
      "})\n" +
      "export class Component {\n" +
      "  constructor(private translate: TranslateService) {\n" +
      "    translate.setDefaultLang('en');\n" +
      "    translate.use('en');\n" +
      "  }\n\n" +
      "  switchLanguage(event: any) {\n" +
      "    this.translate.use(event.target.value);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Translation Files:**\n\n" +
      "```json\n" +
      "// assets/i18n/en.json\n" +
      "{\n" +
      '  "HELLO": "Hello",\n' +
      '  "WELCOME": "Welcome, {{name}}"\n' +
      "}\n\n" +
      "// assets/i18n/fr.json\n" +
      "{\n" +
      '  "HELLO": "Bonjour",\n' +
      '  "WELCOME": "Bienvenue, {{name}}"\n' +
      "}\n" +
      "```",
    category: "Internationalization",
    difficulty: "intermediate",
    tags: ["i18n", "internationalization", "localization", "translation"],
  },
  {
    id: 39,
    question: "What is the Angular CDK (Component Dev Kit)? Explain key modules and use cases.",
    answer:
      "Angular CDK provides behavior primitives for building UI components without Material Design styling.\n\n" +
      "**Key CDK Modules:**\n\n" +
      "**1. Virtual Scrolling:**\n\n" +
      "```typescript\n" +
      "import { ScrollingModule } from '@angular/cdk/scrolling';\n\n" +
      "@Component({\n" +
      "  imports: [ScrollingModule],\n" +
      "  template: `\n" +
      '    <cdk-virtual-scroll-viewport itemSize="50" class="viewport">\n' +
      '      <div *cdkVirtualFor="let item of items" class="item">\n' +
      "        {{ item.name }}\n" +
      "      </div>\n" +
      "    </cdk-virtual-scroll-viewport>\n" +
      "  `,\n" +
      "  styles: ['.viewport { height: 400px; }']\n" +
      "})\n" +
      "export class VirtualListComponent {\n" +
      "  items = Array.from({ length: 10000 }, (_, i) => ({ \n" +
      "    id: i, \n" +
      "    name: `Item ${i}` \n" +
      "  }));\n" +
      "}\n" +
      "// Only renders visible items - handles 100k+ items smoothly\n" +
      "```\n\n" +
      "**2. Drag and Drop:**\n\n" +
      "```typescript\n" +
      "import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';\n\n" +
      "@Component({\n" +
      "  imports: [DragDropModule],\n" +
      "  template: `\n" +
      '    <div cdkDropList (cdkDropListDropped)="drop($event)">\n' +
      '      <div *ngFor="let item of items" cdkDrag>\n' +
      "        {{ item }}\n" +
      "      </div>\n" +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "export class DragDropComponent {\n" +
      "  items = ['Item 1', 'Item 2', 'Item 3'];\n\n" +
      "  drop(event: CdkDragDrop<string[]>) {\n" +
      "    moveItemInArray(this.items, event.previousIndex, event.currentIndex);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**3. Overlay (Modals, Dropdowns):**\n\n" +
      "```typescript\n" +
      "import { Overlay, OverlayRef } from '@angular/cdk/overlay';\n" +
      "import { ComponentPortal } from '@angular/cdk/portal';\n\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class DialogService {\n" +
      "  private overlayRef: OverlayRef;\n\n" +
      "  constructor(private overlay: Overlay) {}\n\n" +
      "  open(component: Type<any>) {\n" +
      "    const positionStrategy = this.overlay\n" +
      "      .position()\n" +
      "      .global()\n" +
      "      .centerHorizontally()\n" +
      "      .centerVertically();\n\n" +
      "    this.overlayRef = this.overlay.create({\n" +
      "      hasBackdrop: true,\n" +
      "      backdropClass: 'dark-backdrop',\n" +
      "      positionStrategy\n" +
      "    });\n\n" +
      "    const portal = new ComponentPortal(component);\n" +
      "    this.overlayRef.attach(portal);\n\n" +
      "    // Close on backdrop click\n" +
      "    this.overlayRef.backdropClick().subscribe(() => this.close());\n" +
      "  }\n\n" +
      "  close() {\n" +
      "    this.overlayRef?.dispose();\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Other CDK Modules:**\n" +
      "- Accessibility (A11y, FocusTrap)\n" +
      "- Layout (Breakpoint Observer)\n" +
      "- Clipboard\n" +
      "- Platform detection\n" +
      "- Bi-directionality (RTL support)",
    category: "CDK",
    difficulty: "hard",
    tags: ["cdk", "virtual-scroll", "drag-drop", "overlay", "angular-material"],
  },
  {
    id: 40,
    question:
      "How do you implement accessibility (a11y) in Angular applications? Provide ARIA examples.",
    answer:
      "Accessibility ensures your app works for all users, including those using assistive technologies.\n\n" +
      "**ARIA Attributes:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  template: `\n" +
      "    <!-- Semantic HTML first -->\n" +
      '    <button (click)="save()">Save</button> <!-- Better than <div> -->\n\n' +
      "    <!-- ARIA labels -->\n" +
      '    <button aria-label="Close dialog" (click)="close()">\n' +
      '      <span aria-hidden="true">&times;</span>\n' +
      "    </button>\n\n" +
      "    <!-- ARIA roles -->\n" +
      '    <div role="alert" *ngIf="error">{{ error }}</div>\n\n' +
      "    <!-- ARIA live regions -->\n" +
      '    <div aria-live="polite" aria-atomic="true">\n' +
      "      {{ statusMessage }}\n" +
      "    </div>\n\n" +
      "    <!-- Form labels -->\n" +
      '    <label for="email">Email:</label>\n' +
      '    <input id="email" type="email" aria-required="true" />\n' +
      '    <span id="email-error" role="alert">{{ emailError }}</span>\n' +
      '    <input aria-describedby="email-error" />\n\n' +
      "    <!-- Expandable sections -->\n" +
      "    <button \n" +
      '      (click)="toggle()"\n' +
      '      [attr.aria-expanded]="isExpanded"\n' +
      '      aria-controls="content"\n' +
      "    >\n" +
      "      Toggle\n" +
      "    </button>\n" +
      '    <div id="content" [hidden]="!isExpanded">\n' +
      "      Content here\n" +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "```\n\n" +
      "**Focus Management:**\n\n" +
      "```typescript\n" +
      "import { FocusMonitor } from '@angular/cdk/a11y';\n\n" +
      "@Component({...})\n" +
      "export class DialogComponent implements AfterViewInit, OnDestroy {\n" +
      "  @ViewChild('closeButton') closeButton: ElementRef;\n" +
      "  private previousActiveElement: HTMLElement;\n\n" +
      "  constructor(private focusMonitor: FocusMonitor) {}\n\n" +
      "  ngAfterViewInit() {\n" +
      "    // Save currently focused element\n" +
      "    this.previousActiveElement = document.activeElement as HTMLElement;\n\n" +
      "    // Focus first element in modal\n" +
      "    this.closeButton.nativeElement.focus();\n\n" +
      "    // Monitor focus\n" +
      "    this.focusMonitor.monitor(this.closeButton);\n" +
      "  }\n\n" +
      "  ngOnDestroy() {\n" +
      "    // Restore focus\n" +
      "    if (this.previousActiveElement) {\n" +
      "      this.previousActiveElement.focus();\n" +
      "    }\n" +
      "    this.focusMonitor.stopMonitoring(this.closeButton);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Keyboard Navigation:**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class MenuComponent {\n" +
      "  selectedIndex = 0;\n\n" +
      "  @HostListener('keydown', ['$event'])\n" +
      "  handleKeyboard(event: KeyboardEvent) {\n" +
      "    switch(event.key) {\n" +
      "      case 'ArrowDown':\n" +
      "        this.selectedIndex++;\n" +
      "        event.preventDefault();\n" +
      "        break;\n" +
      "      case 'ArrowUp':\n" +
      "        this.selectedIndex--;\n" +
      "        event.preventDefault();\n" +
      "        break;\n" +
      "      case 'Enter':\n" +
      "        this.selectItem(this.selectedIndex);\n" +
      "        break;\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "Accessibility",
    difficulty: "intermediate",
    tags: ["accessibility", "a11y", "aria", "keyboard", "focus"],
  },
  {
    id: 41,
    question:
      "Explain Angular security best practices. How do you prevent XSS, CSRF, and other attacks?",
    answer:
      "Angular has built-in security features, but you must use them correctly.\n\n" +
      "**XSS Prevention:**\n\n" +
      "```typescript\n" +
      "import { DomSanitizer, SafeHtml } from '@angular/platform-browser';\n\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  userInput: string;\n\n" +
      "  constructor(private sanitizer: DomSanitizer) {}\n\n" +
      "  // ❌ DANGEROUS - XSS vulnerability\n" +
      "  get unsafeHtml() {\n" +
      "    return this.userInput; // If contains <script>, will execute!\n" +
      "  }\n\n" +
      "  // ✅ Safe - Angular auto-sanitizes\n" +
      "  // Template: <div>{{ userInput }}</div>\n" +
      "  // Angular escapes HTML automatically\n\n" +
      "  // If you MUST use innerHTML:\n" +
      "  get safeHtml(): SafeHtml {\n" +
      "    return this.sanitizer.sanitize(SecurityContext.HTML, this.userInput);\n" +
      "  }\n" +
      '  // Template: <div [innerHTML]="safeHtml"></div>\n' +
      "}\n" +
      "```\n\n" +
      "**CSRF Protection:**\n\n" +
      "```typescript\n" +
      "// Angular's HttpClient includes CSRF protection\n" +
      "import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';\n\n" +
      "providers: [\n" +
      "  provideHttpClient(\n" +
      "    withXsrfConfiguration({\n" +
      "      cookieName: 'XSRF-TOKEN',\n" +
      "      headerName: 'X-XSRF-TOKEN'\n" +
      "    })\n" +
      "  )\n" +
      "]\n\n" +
      "// Server must:\n" +
      "// 1. Set XSRF-TOKEN cookie\n" +
      "// 2. Verify X-XSRF-TOKEN header matches\n" +
      "```\n\n" +
      "**Content Security Policy (CSP):**\n\n" +
      "```html\n" +
      "<!-- index.html -->\n" +
      '<meta http-equiv="Content-Security-Policy" \n' +
      "      content=\"default-src 'self'; \n" +
      "               script-src 'self'; \n" +
      "               style-src 'self' 'unsafe-inline'; \n" +
      "               img-src 'self' data: https:;\">\n" +
      "```\n\n" +
      "**URL Sanitization:**\n\n" +
      "```typescript\n" +
      "// ❌ Dangerous\n" +
      '<a [href]="userProvidedUrl">Link</a>\n\n' +
      "// ✅ Safe\n" +
      "get safeUrl() {\n" +
      "  return this.sanitizer.sanitize(SecurityContext.URL, this.userProvidedUrl);\n" +
      "}\n" +
      "```\n\n" +
      "**Security Checklist:**\n" +
      "1. Never use innerHTML with untrusted content\n" +
      "2. Always sanitize user input\n" +
      "3. Use HttpOnly cookies for tokens\n" +
      "4. Enable CSRF protection\n" +
      "5. Set CSP headers\n" +
      "6. Validate on server AND client\n" +
      "7. Use HTTPS only\n" +
      "8. Keep Angular updated",
    category: "Security",
    difficulty: "hard",
    tags: ["security", "xss", "csrf", "sanitization", "csp"],
  },
  {
    id: 42,
    question:
      "What are RxJS creation operators? Explain of, from, interval, fromEvent with examples.",
    answer:
      "Creation operators create observables from various sources.\n\n" +
      "**of - From Values:**\n\n" +
      "```typescript\n" +
      "import { of } from 'rxjs';\n\n" +
      "// Emit values immediately, then complete\n" +
      "of(1, 2, 3).subscribe(val => console.log(val));\n" +
      "// Output: 1, 2, 3\n\n" +
      "// Use case: Testing, default values\n" +
      "getUser(id: number): Observable<User> {\n" +
      "  if (id === 0) {\n" +
      "    return of({ id: 0, name: 'Guest' }); // Immediate value\n" +
      "  }\n" +
      "  return this.http.get<User>(`/api/users/${id}`);\n" +
      "}\n" +
      "```\n\n" +
      "**from - From Array/Promise:**\n\n" +
      "```typescript\n" +
      "import { from } from 'rxjs';\n\n" +
      "// From array\n" +
      "from([1, 2, 3]).subscribe(val => console.log(val));\n" +
      "// Output: 1, 2, 3 (one at a time)\n\n" +
      "// From Promise\n" +
      "from(fetch('/api/data').then(r => r.json()))\n" +
      "  .subscribe(data => console.log(data));\n\n" +
      "// From async iterator\n" +
      "async function* generate() {\n" +
      "  yield 1;\n" +
      "  yield 2;\n" +
      "}\n" +
      "from(generate()).subscribe(val => console.log(val));\n" +
      "```\n\n" +
      "**interval - Timer:**\n\n" +
      "```typescript\n" +
      "import { interval } from 'rxjs';\n" +
      "import { take } from 'rxjs/operators';\n\n" +
      "// Emit every 1000ms\n" +
      "interval(1000).pipe(\n" +
      "  take(5) // Only 5 emissions\n" +
      ").subscribe(val => console.log(val));\n" +
      "// Output: 0, 1, 2, 3, 4 (one per second)\n\n" +
      "// Use case: Polling\n" +
      "interval(5000).pipe(\n" +
      "  switchMap(() => this.http.get('/api/status'))\n" +
      ").subscribe(status => this.status = status);\n" +
      "```\n\n" +
      "**fromEvent - DOM Events:**\n\n" +
      "```typescript\n" +
      "import { fromEvent } from 'rxjs';\n" +
      "import { debounceTime, map } from 'rxjs/operators';\n\n" +
      "@Component({...})\n" +
      "export class Component implements OnInit, OnDestroy {\n" +
      "  private subscription: Subscription;\n\n" +
      "  ngOnInit() {\n" +
      "    // Window resize\n" +
      "    this.subscription = fromEvent(window, 'resize').pipe(\n" +
      "      debounceTime(300),\n" +
      "      map(() => window.innerWidth)\n" +
      "    ).subscribe(width => {\n" +
      "      console.log('Window width:', width);\n" +
      "    });\n\n" +
      "    // Scroll events\n" +
      "    fromEvent(window, 'scroll').pipe(\n" +
      "      debounceTime(100)\n" +
      "    ).subscribe(() => {\n" +
      "      this.onScroll();\n" +
      "    });\n" +
      "  }\n\n" +
      "  ngOnDestroy() {\n" +
      "    this.subscription.unsubscribe();\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "RxJS",
    difficulty: "intermediate",
    tags: ["rxjs", "creation-operators", "of", "from", "interval", "fromevent"],
  },
  {
    id: 43,
    question:
      "What are RxJS combination operators? Explain combineLatest, forkJoin, merge, concat with use cases.",
    answer:
      "Combination operators combine multiple observables into one.\n\n" +
      "**combineLatest - Latest from All:**\n\n" +
      "```typescript\n" +
      "import { combineLatest } from 'rxjs';\n\n" +
      "// Wait for all to emit at least once, then emit whenever ANY emits\n" +
      "const age$ = of(25);\n" +
      "const name$ = of('John');\n" +
      "const city$ = of('NYC');\n\n" +
      "combineLatest([age$, name$, city$]).subscribe(([age, name, city]) => {\n" +
      "  console.log(`${name}, ${age}, from ${city}`);\n" +
      "});\n\n" +
      "// Use case: Form with multiple dropdowns\n" +
      "combineLatest([\n" +
      "  this.countryControl.valueChanges,\n" +
      "  this.stateControl.valueChanges,\n" +
      "  this.cityControl.valueChanges\n" +
      "]).subscribe(([country, state, city]) => {\n" +
      "  this.updateAddress(country, state, city);\n" +
      "});\n" +
      "```\n\n" +
      "**forkJoin - Wait for All to Complete:**\n\n" +
      "```typescript\n" +
      "import { forkJoin } from 'rxjs';\n\n" +
      "// Like Promise.all - waits for all to complete\n" +
      "forkJoin({\n" +
      "  user: this.http.get('/api/user'),\n" +
      "  posts: this.http.get('/api/posts'),\n" +
      "  comments: this.http.get('/api/comments')\n" +
      "}).subscribe(({ user, posts, comments }) => {\n" +
      "  console.log('All loaded:', user, posts, comments);\n" +
      "});\n\n" +
      "// Use case: Load multiple resources before showing page\n" +
      "ngOnInit() {\n" +
      "  forkJoin([\n" +
      "    this.userService.getUser(id),\n" +
      "    this.postService.getPosts(id),\n" +
      "    this.settingsService.getSettings()\n" +
      "  ]).subscribe(([user, posts, settings]) => {\n" +
      "    this.user = user;\n" +
      "    this.posts = posts;\n" +
      "    this.settings = settings;\n" +
      "    this.loading = false;\n" +
      "  });\n" +
      "}\n" +
      "```\n\n" +
      "**merge - Merge Multiple Streams:**\n\n" +
      "```typescript\n" +
      "import { merge } from 'rxjs';\n\n" +
      "// Emit from any source as soon as it emits\n" +
      "const click$ = fromEvent(button, 'click');\n" +
      "const keypress$ = fromEvent(document, 'keypress');\n\n" +
      "merge(click$, keypress$).subscribe(() => {\n" +
      "  console.log('User interaction!');\n" +
      "});\n" +
      "```\n\n" +
      "**concat - Sequential:**\n\n" +
      "```typescript\n" +
      "import { concat } from 'rxjs';\n\n" +
      "// Subscribe to each in order, wait for complete\n" +
      "concat(\n" +
      "  this.http.post('/api/user', user),\n" +
      "  this.http.post('/api/profile', profile),\n" +
      "  this.http.post('/api/settings', settings)\n" +
      ").subscribe(result => console.log(result));\n" +
      "// Creates user, THEN profile, THEN settings\n" +
      "```",
    category: "RxJS",
    difficulty: "hard",
    tags: ["rxjs", "combinelatest", "forkjoin", "merge", "concat", "combination-operators"],
  },
  {
    id: 44,
    question:
      "What is the difference between providedIn: 'root' vs 'any' vs 'platform'? Explain service scoping.",
    answer:
      "**providedIn Strategies:**\n\n" +
      "**1. 'root' (Singleton):**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class UserService {}\n\n" +
      "// Single instance across entire app\n" +
      "// Tree-shakeable (removed if not used)\n" +
      "// Best for most services\n" +
      "```\n\n" +
      "**2. 'any' (Multiple Instances):**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'any' })\n" +
      "export class LoggerService {}\n\n" +
      "// New instance for each lazy-loaded module\n" +
      "// Each module gets its own instance\n" +
      "// Use for: isolated module state\n" +
      "```\n\n" +
      "**3. 'platform' (Cross-App Singleton):**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'platform' })\n" +
      "export class ConfigService {}\n\n" +
      "// Shared across multiple Angular apps\n" +
      "// Rare use case\n" +
      "```\n\n" +
      "**Component-Level Provider:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-user',\n" +
      "  providers: [UserService] // New instance per component\n" +
      "})\n" +
      "export class UserComponent {}\n\n" +
      "// Each component instance gets new service instance\n" +
      "// Use for: component-specific state\n" +
      "```\n\n" +
      "**When to Use:**\n" +
      "- root: Most services (auth, http, state)\n" +
      "- any: Module-specific services\n" +
      "- platform: Shared across apps (rare)\n" +
      "- Component: Isolated component state",
    category: "Dependency Injection",
    difficulty: "intermediate",
    tags: ["di", "providers", "scoping", "singleton", "services"],
  },
  {
    id: 45,
    question:
      "What are Advanced RxJS operators? Explain switchMap, mergeMap, concatMap, exhaustMap with real-world scenarios.",
    answer:
      "These higher-order operators flatten inner observables differently.\n\n" +
      "**switchMap - Cancel Previous:**\n\n" +
      "```typescript\n" +
      "// Use case: Search (cancel previous search on new input)\n" +
      "this.searchControl.valueChanges.pipe(\n" +
      "  debounceTime(300),\n" +
      "  switchMap(query => this.searchService.search(query))\n" +
      ").subscribe(results => this.results = results);\n\n" +
      '// User types: "ang" -> request1 starts\n' +
      '// User types: "angular" -> request1 CANCELLED, request2 starts\n' +
      "// Only latest request matters\n" +
      "```\n\n" +
      "**mergeMap - Run All Concurrently:**\n\n" +
      "```typescript\n" +
      "// Use case: Load details for multiple items\n" +
      "from([1, 2, 3]).pipe(\n" +
      "  mergeMap(id => this.http.get(`/api/user/${id}`))\n" +
      ").subscribe(user => console.log(user));\n\n" +
      "// All 3 requests run simultaneously\n" +
      "// Results come back in any order\n" +
      "// Good for: parallel operations\n" +
      "```\n\n" +
      "**concatMap - Sequential (Wait for Each):**\n\n" +
      "```typescript\n" +
      "// Use case: Sequential operations (order matters)\n" +
      "from([1, 2, 3]).pipe(\n" +
      "  concatMap(id => this.http.post(`/api/process/${id}`))\n" +
      ").subscribe(result => console.log(result));\n\n" +
      "// Request 1 completes, THEN request 2, THEN request 3\n" +
      "// Maintains order\n" +
      "// Good for: dependent operations, rate limiting\n" +
      "```\n\n" +
      "**exhaustMap - Ignore While Busy:**\n\n" +
      "```typescript\n" +
      "// Use case: Prevent double-submit\n" +
      "@Component({\n" +
      "  template: '<button (click)=\"save$.next()\">Save</button>'\n" +
      "})\n" +
      "export class Component {\n" +
      "  save$ = new Subject<void>();\n\n" +
      "  ngOnInit() {\n" +
      "    this.save$.pipe(\n" +
      "      exhaustMap(() => this.http.post('/api/save', this.data))\n" +
      "    ).subscribe(() => console.log('Saved!'));\n" +
      "  }\n" +
      "}\n\n" +
      "// User clicks 5 times rapidly\n" +
      "// Only first click triggers request\n" +
      "// Other clicks ignored until first completes\n" +
      "```\n\n" +
      "**Decision Matrix:**\n" +
      "- switchMap: Cancel previous (search, autocomplete)\n" +
      "- mergeMap: Run all (independent operations)\n" +
      "- concatMap: Sequential (order matters)\n" +
      "- exhaustMap: Ignore while busy (prevent double-submit)",
    category: "RxJS",
    difficulty: "hard",
    tags: ["rxjs", "switchmap", "mergemap", "concatmap", "exhaustmap", "higher-order"],
  },
  {
    id: 46,
    question: "What is Angular Module Federation? How do you implement micro-frontends in Angular?",
    answer:
      "Module Federation allows loading remote modules at runtime, enabling micro-frontends.\n\n" +
      "**Setup (webpack.config.js):**\n\n" +
      "```javascript\n" +
      "// Host App (Shell)\n" +
      "const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');\n\n" +
      "module.exports = {\n" +
      "  plugins: [\n" +
      "    new ModuleFederationPlugin({\n" +
      "      name: 'host',\n" +
      "      remotes: {\n" +
      "        mfe1: 'mfe1@http://localhost:4201/remoteEntry.js',\n" +
      "        mfe2: 'mfe2@http://localhost:4202/remoteEntry.js'\n" +
      "      },\n" +
      "      shared: {\n" +
      "        '@angular/core': { singleton: true, strictVersion: true },\n" +
      "        '@angular/common': { singleton: true, strictVersion: true },\n" +
      "        '@angular/router': { singleton: true, strictVersion: true }\n" +
      "      }\n" +
      "    })\n" +
      "  ]\n" +
      "};\n\n" +
      "// Remote App (Micro-frontend)\n" +
      "module.exports = {\n" +
      "  plugins: [\n" +
      "    new ModuleFederationPlugin({\n" +
      "      name: 'mfe1',\n" +
      "      filename: 'remoteEntry.js',\n" +
      "      exposes: {\n" +
      "        './Module': './src/app/feature/feature.module.ts'\n" +
      "      },\n" +
      "      shared: {\n" +
      "        '@angular/core': { singleton: true },\n" +
      "        '@angular/common': { singleton: true }\n" +
      "      }\n" +
      "    })\n" +
      "  ]\n" +
      "};\n" +
      "```\n\n" +
      "**Loading Remote Module:**\n\n" +
      "```typescript\n" +
      "// Host routing\n" +
      "const routes: Routes = [\n" +
      "  {\n" +
      "    path: 'mfe1',\n" +
      "    loadChildren: () =>\n" +
      "      import('mfe1/Module').then(m => m.FeatureModule)\n" +
      "  }\n" +
      "];\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Independent deployment\n" +
      "- Team autonomy\n" +
      "- Technology diversity\n" +
      "- Faster builds\n\n" +
      "**Challenges:**\n" +
      "- Shared state management\n" +
      "- Version conflicts\n" +
      "- Routing coordination\n" +
      "- Testing complexity",
    category: "Architecture",
    difficulty: "hard",
    tags: ["module-federation", "micro-frontends", "webpack", "architecture"],
  },
  {
    id: 47,
    question:
      "How do you optimize Angular bundle size? Explain tree-shaking, lazy loading, and build optimizations.",
    answer:
      "**1. Lazy Loading:**\n\n" +
      "```typescript\n" +
      "// Instead of eager loading:\n" +
      "import { FeatureModule } from './feature/feature.module';\n\n" +
      "// Use lazy loading:\n" +
      "const routes: Routes = [\n" +
      "  {\n" +
      "    path: 'feature',\n" +
      "    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)\n" +
      "  }\n" +
      "];\n" +
      "// Reduces initial bundle size\n" +
      "```\n\n" +
      "**2. Tree-Shaking (Remove Unused Code):**\n\n" +
      "```typescript\n" +
      "// ❌ Bad - imports entire library\n" +
      "import * as _ from 'lodash';\n" +
      "_.debounce(fn, 300);\n\n" +
      "// ✅ Good - imports only needed function\n" +
      "import { debounce } from 'lodash-es';\n" +
      "debounce(fn, 300);\n\n" +
      "// Use standalone components (Angular 14+)\n" +
      "@Component({\n" +
      "  standalone: true,\n" +
      "  imports: [CommonModule] // Only what's needed\n" +
      "})\n" +
      "```\n\n" +
      "**3. Production Build Optimizations:**\n\n" +
      "```bash\n" +
      "ng build --configuration production\n" +
      "\n" +
      "# Enables:\n" +
      "# - AOT compilation\n" +
      "# - Minification\n" +
      "# - Tree-shaking\n" +
      "# - Dead code elimination\n" +
      "# - Bundle compression\n" +
      "```\n\n" +
      "**4. Analyze Bundle:**\n\n" +
      "```bash\n" +
      "npm install -D webpack-bundle-analyzer\n" +
      "ng build --stats-json\n" +
      "npx webpack-bundle-analyzer dist/stats.json\n" +
      "```\n\n" +
      "**5. Optimize Dependencies:**\n\n" +
      "```typescript\n" +
      "// Use CDN for large libs\n" +
      "// Replace moment.js (large) with date-fns (small)\n" +
      "import { format } from 'date-fns'; // 2KB vs 70KB\n\n" +
      "// Remove unused Angular modules\n" +
      "// Use providedIn: 'root' for tree-shakeable services\n" +
      "```\n\n" +
      "**6. Budget Configuration:**\n\n" +
      "```json\n" +
      "// angular.json\n" +
      '"budgets": [\n' +
      "  {\n" +
      '    "type": "initial",\n' +
      '    "maximumWarning": "500kb",\n' +
      '    "maximumError": "1mb"\n' +
      "  }\n" +
      "]\n" +
      "```",
    category: "Performance",
    difficulty: "hard",
    tags: ["bundle-size", "tree-shaking", "lazy-loading", "optimization", "performance"],
  },
  {
    id: 48,
    question: "What are Custom Validators in Angular? How do you create async validators?",
    answer:
      "Custom validators enforce business-specific validation rules.\n\n" +
      "**Sync Custom Validator:**\n\n" +
      "```typescript\n" +
      "import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';\n\n" +
      "// Function validator\n" +
      "export function passwordStrengthValidator(): ValidatorFn {\n" +
      "  return (control: AbstractControl): ValidationErrors | null => {\n" +
      "    const value = control.value;\n" +
      "    if (!value) return null;\n\n" +
      "    const hasNumber = /[0-9]/.test(value);\n" +
      "    const hasUpper = /[A-Z]/.test(value);\n" +
      "    const hasLower = /[a-z]/.test(value);\n" +
      "    const hasSpecial = /[!@#$%^&*]/.test(value);\n\n" +
      "    const valid = hasNumber && hasUpper && hasLower && hasSpecial;\n\n" +
      "    return valid ? null : {\n" +
      "      passwordStrength: {\n" +
      "        hasNumber,\n" +
      "        hasUpper,\n" +
      "        hasLower,\n" +
      "        hasSpecial\n" +
      "      }\n" +
      "    };\n" +
      "  };\n" +
      "}\n\n" +
      "// Usage\n" +
      "this.form = this.fb.group({\n" +
      "  password: ['', [Validators.required, passwordStrengthValidator()]]\n" +
      "});\n" +
      "```\n\n" +
      "**Cross-Field Validator:**\n\n" +
      "```typescript\n" +
      "export function passwordMatchValidator(): ValidatorFn {\n" +
      "  return (formGroup: AbstractControl): ValidationErrors | null => {\n" +
      "    const password = formGroup.get('password')?.value;\n" +
      "    const confirmPassword = formGroup.get('confirmPassword')?.value;\n\n" +
      "    return password === confirmPassword ? null : { passwordMismatch: true };\n" +
      "  };\n" +
      "}\n\n" +
      "// Usage\n" +
      "this.form = this.fb.group({\n" +
      "  password: ['', Validators.required],\n" +
      "  confirmPassword: ['', Validators.required]\n" +
      "}, { validators: passwordMatchValidator() });\n" +
      "```\n\n" +
      "**Async Validator (Backend Check):**\n\n" +
      "```typescript\n" +
      "import { AsyncValidatorFn } from '@angular/forms';\n" +
      "import { map, catchError } from 'rxjs/operators';\n" +
      "import { of } from 'rxjs';\n\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class UsernameValidator {\n" +
      "  constructor(private http: HttpClient) {}\n\n" +
      "  usernameExists(): AsyncValidatorFn {\n" +
      "    return (control: AbstractControl): Observable<ValidationErrors | null> => {\n" +
      "      if (!control.value) {\n" +
      "        return of(null);\n" +
      "      }\n\n" +
      "      return this.http.get(`/api/check-username/${control.value}`).pipe(\n" +
      "        map((exists: boolean) => exists ? { usernameTaken: true } : null),\n" +
      "        catchError(() => of(null))\n" +
      "      );\n" +
      "    };\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage\n" +
      "constructor(private usernameValidator: UsernameValidator) {}\n\n" +
      "this.form = this.fb.group({\n" +
      "  username: ['',\n" +
      "    [Validators.required],\n" +
      "    [this.usernameValidator.usernameExists()] // Async validator\n" +
      "  ]\n" +
      "});\n\n" +
      "// Check status\n" +
      "if (control.pending) console.log('Validating...');\n" +
      "if (control.hasError('usernameTaken')) console.log('Username taken');\n" +
      "```",
    category: "Forms",
    difficulty: "hard",
    tags: ["validators", "custom-validators", "async-validators", "forms"],
  },
  {
    id: 49,
    question:
      "What are Angular Animations? Implement complex animation sequences with state transitions.",
    answer:
      "Angular animations use the Web Animations API for declarative animations.\n\n" +
      "**Basic Animation:**\n\n" +
      "```typescript\n" +
      "import { trigger, state, style, transition, animate } from '@angular/animations';\n\n" +
      "@Component({\n" +
      "  animations: [\n" +
      "    trigger('openClose', [\n" +
      "      state('open', style({\n" +
      "        height: '200px',\n" +
      "        opacity: 1,\n" +
      "        backgroundColor: 'yellow'\n" +
      "      })),\n" +
      "      state('closed', style({\n" +
      "        height: '50px',\n" +
      "        opacity: 0.5,\n" +
      "        backgroundColor: 'green'\n" +
      "      })),\n" +
      "      transition('open => closed', [\n" +
      "        animate('0.3s')\n" +
      "      ]),\n" +
      "      transition('closed => open', [\n" +
      "        animate('0.5s')\n" +
      "      ])\n" +
      "    ])\n" +
      "  ],\n" +
      "  template: `\n" +
      "    <div [@openClose]=\"isOpen ? 'open' : 'closed'\">Content</div>\n" +
      '    <button (click)="toggle()">Toggle</button>\n' +
      "  `\n" +
      "})\n" +
      "export class Component {\n" +
      "  isOpen = true;\n" +
      "  toggle() { this.isOpen = !this.isOpen; }\n" +
      "}\n" +
      "```\n\n" +
      "**Enter/Leave Animations:**\n\n" +
      "```typescript\n" +
      "trigger('fadeIn', [\n" +
      "  transition(':enter', [\n" +
      "    style({ opacity: 0 }),\n" +
      "    animate('300ms', style({ opacity: 1 }))\n" +
      "  ]),\n" +
      "  transition(':leave', [\n" +
      "    animate('300ms', style({ opacity: 0 }))\n" +
      "  ])\n" +
      "])\n\n" +
      "// Template\n" +
      '<div *ngIf="show" @fadeIn>Fading in/out</div>\n' +
      "```\n\n" +
      "**List Animations:**\n\n" +
      "```typescript\n" +
      "import { query, stagger } from '@angular/animations';\n\n" +
      "trigger('listAnimation', [\n" +
      "  transition('* => *', [\n" +
      "    query(':enter', [\n" +
      "      style({ opacity: 0, transform: 'translateY(-20px)' }),\n" +
      "      stagger(100, [\n" +
      "        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' }))\n" +
      "      ])\n" +
      "    ], { optional: true })\n" +
      "  ])\n" +
      "])\n\n" +
      "// Template\n" +
      '<div [@listAnimation]="items.length">\n' +
      '  <div *ngFor="let item of items">{{ item }}</div>\n' +
      "</div>\n" +
      "```\n\n" +
      "**Route Animations:**\n\n" +
      "```typescript\n" +
      "// app.component.ts\n" +
      "prepareRoute(outlet: RouterOutlet) {\n" +
      "  return outlet?.activatedRouteData?.['animation'];\n" +
      "}\n\n" +
      "// Template\n" +
      '<div [@routeAnimations]="prepareRoute(outlet)">\n' +
      '  <router-outlet #outlet="outlet"></router-outlet>\n' +
      "</div>\n" +
      "```",
    category: "Animations",
    difficulty: "hard",
    tags: ["animations", "transitions", "web-animations-api", "ui"],
  },
  {
    id: 50,
    question: "What is Lazy Loading Strategy in Angular? Implement custom preloading strategies.",
    answer:
      "Lazy loading loads modules on-demand. Preloading strategies control when to load them.\n\n" +
      "**Built-in Strategies:**\n\n" +
      "```typescript\n" +
      "import { PreloadAllModules, NoPreloading } from '@angular/router';\n\n" +
      "// Option 1: No preloading (default)\n" +
      "RouterModule.forRoot(routes, {\n" +
      "  preloadingStrategy: NoPreloading\n" +
      "});\n\n" +
      "// Option 2: Preload all lazy modules\n" +
      "RouterModule.forRoot(routes, {\n" +
      "  preloadingStrategy: PreloadAllModules\n" +
      "});\n" +
      "```\n\n" +
      "**Custom Preloading Strategy:**\n\n" +
      "```typescript\n" +
      "import { PreloadingStrategy, Route } from '@angular/router';\n" +
      "import { Observable, of, timer } from 'rxjs';\n" +
      "import { mergeMap } from 'rxjs/operators';\n\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class SelectivePreloadingStrategy implements PreloadingStrategy {\n" +
      "  preload(route: Route, load: () => Observable<any>): Observable<any> {\n" +
      "    // Preload if route data has preload: true\n" +
      "    if (route.data && route.data['preload']) {\n" +
      "      console.log('Preloading:', route.path);\n" +
      "      return load();\n" +
      "    }\n" +
      "    return of(null);\n" +
      "  }\n" +
      "}\n\n" +
      "// Routes configuration\n" +
      "const routes: Routes = [\n" +
      "  {\n" +
      "    path: 'admin',\n" +
      "    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),\n" +
      "    data: { preload: false } // Don't preload\n" +
      "  },\n" +
      "  {\n" +
      "    path: 'dashboard',\n" +
      "    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),\n" +
      "    data: { preload: true } // Preload this\n" +
      "  }\n" +
      "];\n\n" +
      "// App module\n" +
      "RouterModule.forRoot(routes, {\n" +
      "  preloadingStrategy: SelectivePreloadingStrategy\n" +
      "});\n" +
      "```\n\n" +
      "**Network-Aware Preloading:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class NetworkAwarePreloadingStrategy implements PreloadingStrategy {\n" +
      "  preload(route: Route, load: () => Observable<any>): Observable<any> {\n" +
      "    const connection = (navigator as any).connection;\n" +
      "    \n" +
      "    // Only preload on fast connections\n" +
      "    if (connection && connection.effectiveType === '4g') {\n" +
      "      return load();\n" +
      "    }\n" +
      "    \n" +
      "    return of(null);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Delayed Preloading:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class DelayedPreloadingStrategy implements PreloadingStrategy {\n" +
      "  preload(route: Route, load: () => Observable<any>): Observable<any> {\n" +
      "    const delay = route.data?.['preloadDelay'] || 5000;\n" +
      "    \n" +
      "    return timer(delay).pipe(\n" +
      "      mergeMap(() => load())\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "Routing",
    difficulty: "hard",
    tags: ["lazy-loading", "preloading", "routing", "performance"],
  },
  {
    id: 51,
    question:
      "How do you implement state management without NgRx? Explain service-based state pattern.",
    answer:
      "Service-based state management uses RxJS BehaviorSubject for simple state needs.\n\n" +
      "**State Service Pattern:**\n\n" +
      "```typescript\n" +
      "import { Injectable } from '@angular/core';\n" +
      "import { BehaviorSubject, Observable } from 'rxjs';\n" +
      "import { map } from 'rxjs/operators';\n\n" +
      "export interface AppState {\n" +
      "  user: User | null;\n" +
      "  cart: CartItem[];\n" +
      "  loading: boolean;\n" +
      "}\n\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class StateService {\n" +
      "  private state = new BehaviorSubject<AppState>({\n" +
      "    user: null,\n" +
      "    cart: [],\n" +
      "    loading: false\n" +
      "  });\n\n" +
      "  // Public observable (read-only)\n" +
      "  state$ = this.state.asObservable();\n\n" +
      "  // Selectors\n" +
      "  user$ = this.state$.pipe(map(state => state.user));\n" +
      "  cart$ = this.state$.pipe(map(state => state.cart));\n" +
      "  cartItemCount$ = this.cart$.pipe(\n" +
      "    map(cart => cart.reduce((sum, item) => sum + item.quantity, 0))\n" +
      "  );\n\n" +
      "  // Actions (update state)\n" +
      "  setUser(user: User) {\n" +
      "    this.state.next({\n" +
      "      ...this.state.value,\n" +
      "      user\n" +
      "    });\n" +
      "  }\n\n" +
      "  addToCart(item: CartItem) {\n" +
      "    const currentCart = this.state.value.cart;\n" +
      "    const existingItem = currentCart.find(i => i.id === item.id);\n\n" +
      "    if (existingItem) {\n" +
      "      existingItem.quantity += item.quantity;\n" +
      "      this.state.next({\n" +
      "        ...this.state.value,\n" +
      "        cart: [...currentCart]\n" +
      "      });\n" +
      "    } else {\n" +
      "      this.state.next({\n" +
      "        ...this.state.value,\n" +
      "        cart: [...currentCart, item]\n" +
      "      });\n" +
      "    }\n" +
      "  }\n\n" +
      "  clearCart() {\n" +
      "    this.state.next({\n" +
      "      ...this.state.value,\n" +
      "      cart: []\n" +
      "    });\n" +
      "  }\n\n" +
      "  // Get current snapshot\n" +
      "  getState(): AppState {\n" +
      "    return this.state.value;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Usage in Component:**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  user$ = this.stateService.user$;\n" +
      "  cartCount$ = this.stateService.cartItemCount$;\n\n" +
      "  constructor(private stateService: StateService) {}\n\n" +
      "  addItem(item: CartItem) {\n" +
      "    this.stateService.addToCart(item);\n" +
      "  }\n" +
      "}\n\n" +
      "// Template\n" +
      '<div *ngIf="user$ | async as user">\n' +
      "  Welcome, {{ user.name }}\n" +
      "</div>\n" +
      "<span>Cart: {{ cartCount$ | async }}</span>\n" +
      "```",
    category: "State Management",
    difficulty: "intermediate",
    tags: ["state-management", "rxjs", "behaviorsubject", "patterns"],
  },
  {
    id: 52,
    question:
      "What is Content Projection in Angular? Explain ng-content, ng-template, and ng-container.",
    answer:
      "Content projection (transclusion) allows passing content into components.\n\n" +
      "**Basic ng-content:**\n\n" +
      "```typescript\n" +
      "// card.component.ts\n" +
      "@Component({\n" +
      "  selector: 'app-card',\n" +
      "  template: `\n" +
      '    <div class="card">\n' +
      '      <div class="card-header">\n' +
      '        <ng-content select="[header]"></ng-content>\n' +
      "      </div>\n" +
      '      <div class="card-body">\n' +
      "        <ng-content></ng-content> <!-- Default slot -->\n" +
      "      </div>\n" +
      '      <div class="card-footer">\n' +
      '        <ng-content select="[footer]"></ng-content>\n' +
      "      </div>\n" +
      "    </div>\n" +
      "  `\n" +
      "})\n\n" +
      "// Usage\n" +
      "<app-card>\n" +
      "  <h2 header>Card Title</h2>\n" +
      "  <p>Card body content goes here.</p>\n" +
      "  <button footer>Action</button>\n" +
      "</app-card>\n" +
      "```\n\n" +
      "**ng-template (Template Reference):**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-tabs',\n" +
      "  template: `\n" +
      '    <div class="tabs">\n' +
      '      <button *ngFor="let tab of tabs" (click)="selectTab(tab)">\n' +
      "        {{ tab.title }}\n" +
      "      </button>\n" +
      "    </div>\n" +
      '    <div class="tab-content">\n' +
      '      <ng-container *ngTemplateOutlet="selectedTab?.content"></ng-container>\n' +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "export class TabsComponent {\n" +
      "  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;\n" +
      "  selectedTab: TabComponent;\n" +
      "}\n\n" +
      "// Usage\n" +
      "<app-tabs>\n" +
      '  <app-tab title="Tab 1">\n' +
      "    <ng-template>\n" +
      "      Content for tab 1\n" +
      "    </ng-template>\n" +
      "  </app-tab>\n" +
      '  <app-tab title="Tab 2">\n' +
      "    <ng-template>\n" +
      "      Content for tab 2\n" +
      "    </ng-template>\n" +
      "  </app-tab>\n" +
      "</app-tabs>\n" +
      "```\n\n" +
      "**ng-container (No DOM Element):**\n\n" +
      "```typescript\n" +
      "// Grouping without adding DOM element\n" +
      '<ng-container *ngIf="user">\n' +
      "  <h1>{{ user.name }}</h1>\n" +
      "  <p>{{ user.email }}</p>\n" +
      "</ng-container>\n" +
      "// No wrapper div created!\n\n" +
      "// Multiple structural directives\n" +
      '<ng-container *ngIf="show">\n' +
      '  <div *ngFor="let item of items">{{ item }}</div>\n' +
      "</ng-container>\n" +
      "```",
    category: "Templates",
    difficulty: "intermediate",
    tags: ["ng-content", "projection", "templates", "ng-template"],
  },
  {
    id: 53,
    question:
      "What is Zone.js and how does Angular use it? Explain NgZone and running outside Angular zone.",
    answer:
      "Zone.js monkey-patches async operations to trigger change detection.\n\n" +
      "**How Zone.js Works:**\n\n" +
      "```typescript\n" +
      "// Zone.js patches:\n" +
      "// - setTimeout/setInterval\n" +
      "// - Promise.then\n" +
      "// - addEventListener\n" +
      "// - XMLHttpRequest\n\n" +
      "// When any runs, Angular knows to run change detection\n" +
      "setTimeout(() => {\n" +
      "  this.data = 'updated'; // Change detection runs automatically\n" +
      "}, 1000);\n" +
      "```\n\n" +
      "**NgZone API:**\n\n" +
      "```typescript\n" +
      "import { NgZone } from '@angular/core';\n\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  constructor(private ngZone: NgZone) {}\n\n" +
      "  // Run outside Angular zone (skip change detection)\n" +
      "  setupHeavyAnimation() {\n" +
      "    this.ngZone.runOutsideAngular(() => {\n" +
      "      // This code won't trigger change detection\n" +
      "      setInterval(() => {\n" +
      "        // Update canvas, heavy calculations, etc.\n" +
      "        this.updateCanvas();\n" +
      "      }, 16); // 60fps\n" +
      "    });\n" +
      "  }\n\n" +
      "  // Re-enter Angular zone when needed\n" +
      "  updateData() {\n" +
      "    this.ngZone.run(() => {\n" +
      "      this.data = 'updated'; // Change detection runs\n" +
      "    });\n" +
      "  }\n\n" +
      "  // Check if inside Angular zone\n" +
      "  checkZone() {\n" +
      "    console.log(NgZone.isInAngularZone()); // true or false\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Use Cases for runOutsideAngular:**\n\n" +
      "```typescript\n" +
      "// 1. High-frequency events (scroll, mousemove)\n" +
      "ngOnInit() {\n" +
      "  this.ngZone.runOutsideAngular(() => {\n" +
      "    fromEvent(window, 'scroll').pipe(\n" +
      "      throttleTime(100)\n" +
      "    ).subscribe(() => {\n" +
      "      // Update non-Angular stuff\n" +
      "      this.updateScrollPosition();\n" +
      "    });\n" +
      "  });\n" +
      "}\n\n" +
      "// 2. Third-party libraries\n" +
      "initChart() {\n" +
      "  this.ngZone.runOutsideAngular(() => {\n" +
      "    this.chart = new Chart(this.canvas, config);\n" +
      "  });\n" +
      "}\n" +
      "```\n\n" +
      "**Zoneless Angular (Future):**\n\n" +
      "```typescript\n" +
      "// Angular 16+ experimental\n" +
      "bootstrapApplication(AppComponent, {\n" +
      "  providers: [\n" +
      "    provideExperimentalZonelessChangeDetection()\n" +
      "  ]\n" +
      "});\n" +
      "// Uses Signals instead of Zone.js\n" +
      "```",
    category: "Change Detection",
    difficulty: "hard",
    tags: ["zone.js", "ngzone", "change-detection", "performance"],
  },
  {
    id: 54,
    question: "What are Angular Elements? How do you create and use Web Components from Angular?",
    answer:
      "Angular Elements packages Angular components as custom Web Components.\n\n" +
      "**Setup:**\n\n" +
      "```bash\n" +
      "ng add @angular/elements\n" +
      "```\n\n" +
      "**Create Angular Element:**\n\n" +
      "```typescript\n" +
      "import { createCustomElement } from '@angular/elements';\n" +
      "import { Injector } from '@angular/core';\n\n" +
      "// Widget component\n" +
      "@Component({\n" +
      "  selector: 'app-widget',\n" +
      "  template: `\n" +
      '    <div class="widget">\n' +
      "      <h3>{{ title }}</h3>\n" +
      "      <p>{{ content }}</p>\n" +
      '      <button (click)="handleClick()">{{ buttonText }}</button>\n' +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "export class WidgetComponent {\n" +
      "  @Input() title = '';\n" +
      "  @Input() content = '';\n" +
      "  @Input() buttonText = 'Click';\n" +
      "  @Output() clicked = new EventEmitter();\n\n" +
      "  handleClick() {\n" +
      "    this.clicked.emit({ timestamp: Date.now() });\n" +
      "  }\n" +
      "}\n\n" +
      "// Register as custom element\n" +
      "@NgModule({\n" +
      "  declarations: [WidgetComponent],\n" +
      "  imports: [BrowserModule],\n" +
      "  entryComponents: [WidgetComponent] // Important!\n" +
      "})\n" +
      "export class AppModule {\n" +
      "  constructor(private injector: Injector) {\n" +
      "    const widgetElement = createCustomElement(WidgetComponent, { injector });\n" +
      "    customElements.define('my-widget', widgetElement);\n" +
      "  }\n\n" +
      "  ngDoBootstrap() {} // Skip normal bootstrap\n" +
      "}\n" +
      "```\n\n" +
      "**Use in Any HTML:**\n\n" +
      "```html\n" +
      "<!-- Can use in vanilla HTML, React, Vue, etc. -->\n" +
      "<!DOCTYPE html>\n" +
      "<html>\n" +
      "<head>\n" +
      '  <script src="widget.js"></script>\n' +
      "</head>\n" +
      "<body>\n" +
      "  <my-widget\n" +
      '    title="Hello"\n' +
      '    content="This is an Angular Element!"\n' +
      '    button-text="Click Me"\n' +
      "  ></my-widget>\n\n" +
      "  <script>\n" +
      "    const widget = document.querySelector('my-widget');\n" +
      "    widget.addEventListener('clicked', (e) => {\n" +
      "      console.log('Clicked at:', e.detail.timestamp);\n" +
      "    });\n" +
      "  </script>\n" +
      "</body>\n" +
      "</html>\n" +
      "```\n\n" +
      "**Build for Production:**\n\n" +
      "```bash\n" +
      "ng build --configuration production --output-hashing=none\n" +
      "\n" +
      "# Concatenate files\n" +
      "cat dist/widget/{runtime,polyfills,main}.js > widget.js\n" +
      "```\n\n" +
      "**Use Cases:**\n" +
      "- Micro-frontends\n" +
      "- Widget libraries\n" +
      "- CMS integrations\n" +
      "- Framework-agnostic components",
    category: "Web Components",
    difficulty: "hard",
    tags: ["angular-elements", "web-components", "custom-elements", "micro-frontends"],
  },
  {
    id: 55,
    question:
      "What are RxJS error handling operators? Explain catchError, retry, retryWhen with practical examples.",
    answer:
      "Error handling operators gracefully manage errors in observable streams.\n\n" +
      "**catchError - Handle and Recover:**\n\n" +
      "```typescript\n" +
      "import { catchError } from 'rxjs/operators';\n" +
      "import { of, throwError } from 'rxjs';\n\n" +
      "// Return fallback value\n" +
      "this.http.get('/api/data').pipe(\n" +
      "  catchError(error => {\n" +
      "    console.error('Error:', error);\n" +
      "    return of({ data: 'fallback' }); // Continue with fallback\n" +
      "  })\n" +
      ").subscribe(data => console.log(data));\n\n" +
      "// Re-throw error\n" +
      "this.http.get('/api/data').pipe(\n" +
      "  catchError(error => {\n" +
      "    this.logError(error);\n" +
      "    return throwError(() => new Error('Custom error'));\n" +
      "  })\n" +
      ").subscribe({\n" +
      "  next: data => console.log(data),\n" +
      "  error: err => console.error('Handled:', err)\n" +
      "});\n" +
      "```\n\n" +
      "**retry - Retry on Error:**\n\n" +
      "```typescript\n" +
      "import { retry, delay } from 'rxjs/operators';\n\n" +
      "// Simple retry (3 times)\n" +
      "this.http.get('/api/data').pipe(\n" +
      "  retry(3), // Retry up to 3 times\n" +
      "  catchError(error => {\n" +
      "    console.error('Failed after 3 retries');\n" +
      "    return of(null);\n" +
      "  })\n" +
      ").subscribe(data => console.log(data));\n\n" +
      "// With delay\n" +
      "this.http.get('/api/data').pipe(\n" +
      "  retry({ count: 3, delay: 1000 }), // Wait 1s between retries\n" +
      "  catchError(error => of(null))\n" +
      ").subscribe();\n" +
      "```\n\n" +
      "**retryWhen - Conditional Retry:**\n\n" +
      "```typescript\n" +
      "import { retryWhen, scan, delay, tap } from 'rxjs/operators';\n\n" +
      "// Exponential backoff\n" +
      "this.http.get('/api/data').pipe(\n" +
      "  retryWhen(errors => errors.pipe(\n" +
      "    scan((acc, error) => {\n" +
      "      if (acc >= 5) {\n" +
      "        throw error; // Stop after 5 attempts\n" +
      "      }\n" +
      "      return acc + 1;\n" +
      "    }, 0),\n" +
      "    tap(retryCount => console.log(`Retry attempt ${retryCount}`)),\n" +
      "    delay(retryCount => retryCount * 1000) // 1s, 2s, 3s, 4s, 5s\n" +
      "  ))\n" +
      ").subscribe();\n\n" +
      "// Retry only specific errors\n" +
      "this.http.get('/api/data').pipe(\n" +
      "  retryWhen(errors => errors.pipe(\n" +
      "    tap(error => {\n" +
      "      if (error.status === 500) {\n" +
      "        console.log('Server error, retrying...');\n" +
      "      } else {\n" +
      "        throw error; // Don't retry client errors\n" +
      "      }\n" +
      "    }),\n" +
      "    delay(1000)\n" +
      "  ))\n" +
      ").subscribe();\n" +
      "```",
    category: "RxJS",
    difficulty: "hard",
    tags: ["rxjs", "error-handling", "catcherror", "retry", "retrywhen"],
  },
  {
    id: 56,
    question:
      "How do you implement Memory Leak Prevention in Angular? Explain subscription management strategies.",
    answer:
      "Memory leaks occur when subscriptions aren't properly cleaned up.\n\n" +
      "**Problem:**\n\n" +
      "```typescript\n" +
      "// ❌ BAD - Memory leak!\n" +
      "@Component({...})\n" +
      "export class BadComponent implements OnInit {\n" +
      "  ngOnInit() {\n" +
      "    this.dataService.getData().subscribe(data => {\n" +
      "      this.data = data;\n" +
      "    });\n" +
      "    // Subscription never cleaned up!\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Solution 1: Manual Unsubscribe:**\n\n" +
      "```typescript\n" +
      "import { Subscription } from 'rxjs';\n\n" +
      "@Component({...})\n" +
      "export class Component implements OnInit, OnDestroy {\n" +
      "  private subscription = new Subscription();\n\n" +
      "  ngOnInit() {\n" +
      "    this.subscription.add(\n" +
      "      this.dataService.getData().subscribe(data => this.data = data)\n" +
      "    );\n\n" +
      "    this.subscription.add(\n" +
      "      this.userService.getUser().subscribe(user => this.user = user)\n" +
      "    );\n" +
      "  }\n\n" +
      "  ngOnDestroy() {\n" +
      "    this.subscription.unsubscribe(); // Cleans up all\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Solution 2: takeUntil Pattern:**\n\n" +
      "```typescript\n" +
      "import { Subject } from 'rxjs';\n" +
      "import { takeUntil } from 'rxjs/operators';\n\n" +
      "@Component({...})\n" +
      "export class Component implements OnInit, OnDestroy {\n" +
      "  private destroy$ = new Subject<void>();\n\n" +
      "  ngOnInit() {\n" +
      "    this.dataService.getData().pipe(\n" +
      "      takeUntil(this.destroy$)\n" +
      "    ).subscribe(data => this.data = data);\n\n" +
      "    this.userService.getUser().pipe(\n" +
      "      takeUntil(this.destroy$)\n" +
      "    ).subscribe(user => this.user = user);\n" +
      "  }\n\n" +
      "  ngOnDestroy() {\n" +
      "    this.destroy$.next();\n" +
      "    this.destroy$.complete();\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Solution 3: Async Pipe (Best):**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  template: `\n" +
      '    <div *ngIf="data$ | async as data">{{ data.name }}</div>\n' +
      '    <div *ngIf="user$ | async as user">{{ user.name }}</div>\n' +
      "  `\n" +
      "})\n" +
      "export class Component {\n" +
      "  data$ = this.dataService.getData();\n" +
      "  user$ = this.userService.getUser();\n" +
      "  // async pipe auto-unsubscribes!\n" +
      "}\n" +
      "```\n\n" +
      "**Solution 4: take(1) for Single Emission:**\n\n" +
      "```typescript\n" +
      "import { take } from 'rxjs/operators';\n\n" +
      "ngOnInit() {\n" +
      "  this.http.get('/api/data').pipe(\n" +
      "    take(1) // Auto-completes after 1 emission\n" +
      "  ).subscribe(data => this.data = data);\n" +
      "}\n" +
      "```",
    category: "Performance",
    difficulty: "hard",
    tags: ["memory-leaks", "subscriptions", "rxjs", "cleanup", "best-practices"],
  },
  {
    id: 57,
    question:
      "What is AOT (Ahead-of-Time) vs JIT (Just-in-Time) compilation? What are the trade-offs?",
    answer:
      "**JIT (Just-in-Time) Compilation:**\n\n" +
      "```typescript\n" +
      "// Development mode (ng serve)\n" +
      "// - Compiles in browser at runtime\n" +
      "// - Slower startup\n" +
      "// - Larger bundle (includes compiler)\n" +
      "// - Better error messages\n" +
      "// - Faster build time\n" +
      "```\n\n" +
      "**AOT (Ahead-of-Time) Compilation:**\n\n" +
      "```typescript\n" +
      "// Production mode (ng build --prod)\n" +
      "// - Pre-compiled during build\n" +
      "// - Faster startup (no compilation in browser)\n" +
      "// - Smaller bundle (no compiler needed)\n" +
      "// - Template errors caught at build time\n" +
      "// - Better security (no eval)\n" +
      "```\n\n" +
      "**Build Commands:**\n\n" +
      "```bash\n" +
      "# JIT (development)\n" +
      "ng serve\n" +
      "ng build\n\n" +
      "# AOT (production)\n" +
      "ng build --configuration production  # AOT by default\n" +
      "```\n\n" +
      "**Benefits of AOT:**\n\n" +
      "```typescript\n" +
      "1. **Faster rendering**: Pre-compiled, no browser compilation\n" +
      "2. **Smaller bundles**: ~40% smaller (no compiler)\n" +
      "3. **Early error detection**: Template errors at build time\n" +
      "4. **Better security**: No eval() or new Function()\n" +
      "5. **Better tree-shaking**: Unused code removed\n" +
      "```\n\n" +
      "**Trade-offs:**\n\n" +
      "```typescript\n" +
      "// JIT\n" +
      "+ Faster development builds\n" +
      "+ Better error messages\n" +
      "- Slower app startup\n" +
      "- Larger bundles\n" +
      "- Runtime errors in templates\n\n" +
      "// AOT\n" +
      "+ Production-ready\n" +
      "+ Faster runtime\n" +
      "+ Smaller bundles\n" +
      "- Slower builds\n" +
      "- Less detailed errors\n" +
      "```",
    category: "Build & Compilation",
    difficulty: "intermediate",
    tags: ["aot", "jit", "compilation", "build", "performance"],
  },
  {
    id: 58,
    question:
      "How do you implement Progressive Web App (PWA) features in Angular? Explain Service Workers.",
    answer:
      "**Setup Angular PWA:**\n\n" +
      "```bash\n" +
      "ng add @angular/pwa\n" +
      "```\n\n" +
      "**Generates:**\n" +
      "- `ngsw-config.json` - Service worker configuration\n" +
      "- `manifest.webmanifest` - App manifest\n" +
      "- Icons in various sizes\n\n" +
      "**Service Worker Configuration:**\n\n" +
      "```json\n" +
      "// ngsw-config.json\n" +
      "{\n" +
      '  "index": "/index.html",\n' +
      '  "assetGroups": [\n' +
      "    {\n" +
      '      "name": "app",\n' +
      '      "installMode": "prefetch",\n' +
      '      "resources": {\n' +
      '        "files": ["/favicon.ico", "/index.html", "/*.css", "/*.js"]\n' +
      "      }\n" +
      "    },\n" +
      "    {\n" +
      '      "name": "assets",\n' +
      '      "installMode": "lazy",\n' +
      '      "updateMode": "prefetch",\n' +
      '      "resources": {\n' +
      '        "files": ["/assets/**"]\n' +
      "      }\n" +
      "    }\n" +
      "  ],\n" +
      '  "dataGroups": [\n' +
      "    {\n" +
      '      "name": "api",\n' +
      '      "urls": ["/api/**"],\n' +
      '      "cacheConfig": {\n' +
      '        "maxSize": 100,\n' +
      '        "maxAge": "1h",\n' +
      '        "strategy": "freshness" // or "performance"\n' +
      "      }\n" +
      "    }\n" +
      "  ]\n" +
      "}\n" +
      "```\n\n" +
      "**Service Worker API:**\n\n" +
      "```typescript\n" +
      "import { SwUpdate, SwPush } from '@angular/service-worker';\n\n" +
      "@Component({...})\n" +
      "export class AppComponent implements OnInit {\n" +
      "  constructor(\n" +
      "    private swUpdate: SwUpdate,\n" +
      "    private swPush: SwPush\n" +
      "  ) {}\n\n" +
      "  ngOnInit() {\n" +
      "    // Check for updates\n" +
      "    if (this.swUpdate.isEnabled) {\n" +
      "      this.swUpdate.versionUpdates.subscribe(event => {\n" +
      "        if (event.type === 'VERSION_READY') {\n" +
      "          if (confirm('New version available. Load?')) {\n" +
      "            window.location.reload();\n" +
      "          }\n" +
      "        }\n" +
      "      });\n\n" +
      "      // Check every 6 hours\n" +
      "      interval(6 * 60 * 60 * 1000).subscribe(() => {\n" +
      "        this.swUpdate.checkForUpdate();\n" +
      "      });\n" +
      "    }\n\n" +
      "    // Push notifications\n" +
      "    if (this.swPush.isEnabled) {\n" +
      "      this.swPush.requestSubscription({\n" +
      "        serverPublicKey: 'YOUR_VAPID_PUBLIC_KEY'\n" +
      "      }).then(sub => {\n" +
      "        console.log('Subscribed:', sub);\n" +
      "      });\n\n" +
      "      this.swPush.messages.subscribe(message => {\n" +
      "        console.log('Push notification:', message);\n" +
      "      });\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Manifest Configuration:**\n\n" +
      "```json\n" +
      "// manifest.webmanifest\n" +
      "{\n" +
      '  "name": "My Angular PWA",\n' +
      '  "short_name": "AngularPWA",\n' +
      '  "theme_color": "#1976d2",\n' +
      '  "background_color": "#fafafa",\n' +
      '  "display": "standalone",\n' +
      '  "scope": "./",\n' +
      '  "start_url": "./",\n' +
      '  "icons": [\n' +
      "    {\n" +
      '      "src": "assets/icons/icon-72x72.png",\n' +
      '      "sizes": "72x72",\n' +
      '      "type": "image/png"\n' +
      "    }\n" +
      "  ]\n" +
      "}\n" +
      "```",
    category: "PWA",
    difficulty: "hard",
    tags: ["pwa", "service-workers", "offline", "push-notifications"],
  },
  {
    id: 59,
    question: "What is the Angular Compiler? Explain Ivy vs View Engine.",
    answer:
      "**Ivy (Angular 9+):**\n\n" +
      "Modern compiler and runtime, enabled by default.\n\n" +
      "```typescript\n" +
      "**Ivy Benefits:**\n\n" +
      "1. **Smaller bundles**: ~40% smaller\n" +
      "2. **Faster compilation**: Incremental compilation\n" +
      "3. **Better debugging**: More readable generated code\n" +
      "4. **Tree-shakeable**: Removes unused Angular code\n" +
      "5. **Backward compatible**: Works with View Engine libs\n" +
      "6. **Locality**: Compiles components independently\n" +
      "```\n\n" +
      "**Ivy Compilation:**\n\n" +
      "```typescript\n" +
      "// Before (View Engine)\n" +
      "@Component({\n" +
      "  template: '<h1>{{ title }}</h1>'\n" +
      "})\n" +
      "// Generated: Large, complex factory functions\n\n" +
      "// After (Ivy)\n" +
      "@Component({\n" +
      "  template: '<h1>{{ title }}</h1>'\n" +
      "})\n" +
      "// Generated: Instruction set (more efficient)\n" +
      "// ɵɵelementStart(0, 'h1');\n" +
      "// ɵɵtext(1, title);\n" +
      "// ɵɵelementEnd();\n" +
      "```\n\n" +
      "**Key Differences:**\n\n" +
      "```typescript\n" +
      "// View Engine (Legacy)\n" +
      "- Global compilation\n" +
      "- Larger bundles\n" +
      "- Complex metadata\n" +
      "- Slower builds\n\n" +
      "// Ivy (Modern)\n" +
      "- Component-level compilation\n" +
      "- Smaller bundles\n" +
      "- Simpler metadata\n" +
      "- Faster builds\n" +
      "- Better tree-shaking\n" +
      "```\n\n" +
      "**Migration:**\n\n" +
      "```bash\n" +
      "# Angular 9+ uses Ivy by default\n" +
      "# Check angular.json\n" +
      "{\n" +
      '  "projects": {\n' +
      '    "app": {\n' +
      '      "architect": {\n' +
      '        "build": {\n' +
      '          "options": {\n' +
      '            "aot": true // Ivy enabled\n' +
      "          }\n" +
      "        }\n" +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "Compiler",
    difficulty: "hard",
    tags: ["ivy", "compiler", "view-engine", "angular-internals"],
  },
  {
    id: 60,
    question: "How do you implement Standalone Components? What are the benefits over NgModules?",
    answer:
      "Standalone components (Angular 14+) don't require NgModules.\n\n" +
      "**Basic Standalone Component:**\n\n" +
      "```typescript\n" +
      "import { Component } from '@angular/core';\n" +
      "import { CommonModule } from '@angular/common';\n" +
      "import { FormsModule } from '@angular/forms';\n\n" +
      "@Component({\n" +
      "  selector: 'app-user',\n" +
      "  standalone: true,\n" +
      "  imports: [CommonModule, FormsModule], // Import directly!\n" +
      "  template: `\n" +
      '    <div *ngIf="user">\n' +
      '      <input [(ngModel)]="user.name" />\n' +
      "      <p>{{ user.name }}</p>\n" +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "export class UserComponent {\n" +
      "  user = { name: 'John' };\n" +
      "}\n" +
      "```\n\n" +
      "**Bootstrap Standalone App:**\n\n" +
      "```typescript\n" +
      "// main.ts\n" +
      "import { bootstrapApplication } from '@angular/platform-browser';\n" +
      "import { provideRouter } from '@angular/router';\n" +
      "import { provideHttpClient } from '@angular/common/http';\n\n" +
      "bootstrapApplication(AppComponent, {\n" +
      "  providers: [\n" +
      "    provideRouter(routes),\n" +
      "    provideHttpClient(),\n" +
      "    provideAnimations()\n" +
      "  ]\n" +
      "});\n" +
      "```\n\n" +
      "**Routing with Standalone:**\n\n" +
      "```typescript\n" +
      "// routes.ts\n" +
      "import { Routes } from '@angular/router';\n\n" +
      "export const routes: Routes = [\n" +
      "  {\n" +
      "    path: 'home',\n" +
      "    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)\n" +
      "  },\n" +
      "  {\n" +
      "    path: 'users',\n" +
      "    loadChildren: () => import('./users/routes').then(m => m.USER_ROUTES)\n" +
      "  }\n" +
      "];\n" +
      "```\n\n" +
      "**Benefits:**\n\n" +
      "```typescript\n" +
      "1. **Simpler**: No NgModule boilerplate\n" +
      "2. **Better tree-shaking**: Only import what you use\n" +
      "3. **Easier lazy loading**: Direct component imports\n" +
      "4. **Less coupling**: Self-contained components\n" +
      "5. **Easier testing**: No module configuration\n" +
      "```\n\n" +
      "**Migration:**\n\n" +
      "```bash\n" +
      "# Angular CLI can migrate automatically\n" +
      "ng generate @angular/core:standalone\n" +
      "```",
    category: "Architecture",
    difficulty: "intermediate",
    tags: ["standalone-components", "angular-14", "modules", "simplification"],
  },
  {
    id: 61,
    question:
      "What is the difference between ViewChild and ContentChild? Explain @ViewChildren vs @ContentChildren.",
    answer:
      "ViewChild/ContentChild query different parts of the component tree.\n\n" +
      "**@ViewChild - Query Own Template:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-parent',\n" +
      "  template: `\n" +
      "    <h1 #title>Title</h1>\n" +
      "    <input #nameInput />\n" +
      "    <app-child #childComp></app-child>\n" +
      "  `\n" +
      "})\n" +
      "export class ParentComponent implements AfterViewInit {\n" +
      "  @ViewChild('title') titleRef: ElementRef;\n" +
      "  @ViewChild('nameInput') inputRef: ElementRef;\n" +
      "  @ViewChild(ChildComponent) child: ChildComponent;\n\n" +
      "  ngAfterViewInit() {\n" +
      "    console.log(this.titleRef.nativeElement.textContent); // 'Title'\n" +
      "    this.inputRef.nativeElement.focus();\n" +
      "    this.child.someMethod();\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**@ContentChild - Query Projected Content:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-card',\n" +
      "  template: `\n" +
      '    <div class="card">\n' +
      "      <ng-content></ng-content>\n" +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "export class CardComponent implements AfterContentInit {\n" +
      "  @ContentChild('cardTitle') title: ElementRef;\n\n" +
      "  ngAfterContentInit() {\n" +
      "    console.log(this.title.nativeElement.textContent);\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage\n" +
      "<app-card>\n" +
      "  <h2 #cardTitle>My Title</h2>\n" +
      "  <p>Content here</p>\n" +
      "</app-card>\n" +
      "```\n\n" +
      "**@ViewChildren vs @ContentChildren:**\n\n" +
      "```typescript\n" +
      "import { QueryList } from '@angular/core';\n\n" +
      "@Component({\n" +
      "  template: `\n" +
      '    <app-item *ngFor="let item of items">{{ item }}</app-item>\n' +
      "  `\n" +
      "})\n" +
      "export class ParentComponent implements AfterViewInit {\n" +
      "  // Query ALL in template\n" +
      "  @ViewChildren(ItemComponent) viewItems: QueryList<ItemComponent>;\n\n" +
      "  ngAfterViewInit() {\n" +
      "    console.log(this.viewItems.length); // Number of items\n" +
      "    this.viewItems.forEach(item => item.highlight());\n\n" +
      "    // Listen to changes\n" +
      "    this.viewItems.changes.subscribe(items => {\n" +
      "      console.log('Items changed:', items.length);\n" +
      "    });\n" +
      "  }\n" +
      "}\n\n" +
      "// @ContentChildren - query ALL projected content\n" +
      "@Component({\n" +
      "  selector: 'app-tabs',\n" +
      "  template: '<ng-content></ng-content>'\n" +
      "})\n" +
      "export class TabsComponent implements AfterContentInit {\n" +
      "  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;\n\n" +
      "  ngAfterContentInit() {\n" +
      "    this.tabs.first.activate(); // Activate first tab\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage\n" +
      "<app-tabs>\n" +
      "  <app-tab>Tab 1</app-tab>\n" +
      "  <app-tab>Tab 2</app-tab>\n" +
      "  <app-tab>Tab 3</app-tab>\n" +
      "</app-tabs>\n" +
      "```\n\n" +
      "**Key Differences:**\n" +
      "- ViewChild: Component's own template\n" +
      "- ContentChild: Projected content (ng-content)\n" +
      "- Timing: AfterViewInit vs AfterContentInit",
    category: "Component Queries",
    difficulty: "intermediate",
    tags: ["viewchild", "contentchild", "queries", "lifecycle"],
  },
  {
    id: 62,
    question: "How do you implement Custom Directives? Create a structural directive example.",
    answer:
      "**Attribute Directive (Modify Element):**\n\n" +
      "```typescript\n" +
      "import { Directive, ElementRef, HostListener, Input } from '@angular/core';\n\n" +
      "@Directive({\n" +
      "  selector: '[appHighlight]',\n" +
      "  standalone: true\n" +
      "})\n" +
      "export class HighlightDirective {\n" +
      "  @Input() appHighlight = 'yellow';\n" +
      "  @Input() defaultColor = 'transparent';\n\n" +
      "  constructor(private el: ElementRef) {\n" +
      "    this.el.nativeElement.style.backgroundColor = this.defaultColor;\n" +
      "  }\n\n" +
      "  @HostListener('mouseenter') onMouseEnter() {\n" +
      "    this.highlight(this.appHighlight);\n" +
      "  }\n\n" +
      "  @HostListener('mouseleave') onMouseLeave() {\n" +
      "    this.highlight(this.defaultColor);\n" +
      "  }\n\n" +
      "  private highlight(color: string) {\n" +
      "    this.el.nativeElement.style.backgroundColor = color;\n" +
      "  }\n" +
      "}\n\n" +
      '// Usage: <p appHighlight="lightblue">Hover me</p>\n' +
      "```\n\n" +
      "**Structural Directive (Modify DOM Structure):**\n\n" +
      "```typescript\n" +
      "import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';\n\n" +
      "// Custom *ngIf\n" +
      "@Directive({\n" +
      "  selector: '[appIf]',\n" +
      "  standalone: true\n" +
      "})\n" +
      "export class IfDirective {\n" +
      "  private hasView = false;\n\n" +
      "  constructor(\n" +
      "    private templateRef: TemplateRef<any>,\n" +
      "    private viewContainer: ViewContainerRef\n" +
      "  ) {}\n\n" +
      "  @Input() set appIf(condition: boolean) {\n" +
      "    if (condition && !this.hasView) {\n" +
      "      this.viewContainer.createEmbeddedView(this.templateRef);\n" +
      "      this.hasView = true;\n" +
      "    } else if (!condition && this.hasView) {\n" +
      "      this.viewContainer.clear();\n" +
      "      this.hasView = false;\n" +
      "    }\n" +
      "  }\n" +
      "}\n\n" +
      '// Usage: <div *appIf="show">Content</div>\n' +
      "```\n\n" +
      "**Advanced: Custom *ngFor:**\n\n" +
      "```typescript\n" +
      "@Directive({\n" +
      "  selector: '[appRepeat]',\n" +
      "  standalone: true\n" +
      "})\n" +
      "export class RepeatDirective {\n" +
      "  constructor(\n" +
      "    private templateRef: TemplateRef<any>,\n" +
      "    private viewContainer: ViewContainerRef\n" +
      "  ) {}\n\n" +
      "  @Input() set appRepeat(times: number) {\n" +
      "    this.viewContainer.clear();\n" +
      "    for (let i = 0; i < times; i++) {\n" +
      "      this.viewContainer.createEmbeddedView(this.templateRef, {\n" +
      "        $implicit: i,\n" +
      "        index: i\n" +
      "      });\n" +
      "    }\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage:\n" +
      '<div *appRepeat="5; let i = index">\n' +
      "  Item {{ i }}\n" +
      "</div>\n" +
      "// Renders: Item 0, Item 1, Item 2, Item 3, Item 4\n" +
      "```\n\n" +
      "**Permission Directive:**\n\n" +
      "```typescript\n" +
      "@Directive({\n" +
      "  selector: '[appHasPermission]',\n" +
      "  standalone: true\n" +
      "})\n" +
      "export class HasPermissionDirective {\n" +
      "  constructor(\n" +
      "    private templateRef: TemplateRef<any>,\n" +
      "    private viewContainer: ViewContainerRef,\n" +
      "    private authService: AuthService\n" +
      "  ) {}\n\n" +
      "  @Input() set appHasPermission(permission: string) {\n" +
      "    if (this.authService.hasPermission(permission)) {\n" +
      "      this.viewContainer.createEmbeddedView(this.templateRef);\n" +
      "    } else {\n" +
      "      this.viewContainer.clear();\n" +
      "    }\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage:\n" +
      "<button *appHasPermission=\"'ADMIN'\">Delete User</button>\n" +
      "```",
    category: "Directives",
    difficulty: "hard",
    tags: ["directives", "structural-directives", "attribute-directives", "advanced"],
  },
  {
    id: 63,
    question:
      "What is the Angular HttpInterceptor chain? How do you implement multiple interceptors?",
    answer:
      "Interceptors form a chain to process HTTP requests/responses.\n\n" +
      "**Basic Interceptor:**\n\n" +
      "```typescript\n" +
      "import { HttpInterceptorFn } from '@angular/common/http';\n\n" +
      "// Functional interceptor (Angular 15+)\n" +
      "export const loggingInterceptor: HttpInterceptorFn = (req, next) => {\n" +
      "  console.log('Request:', req.url);\n" +
      "  return next(req).pipe(\n" +
      "    tap(event => {\n" +
      "      if (event.type === HttpEventType.Response) {\n" +
      "        console.log('Response:', event.status);\n" +
      "      }\n" +
      "    })\n" +
      "  );\n" +
      "};\n" +
      "```\n\n" +
      "**Class-Based Interceptor:**\n\n" +
      "```typescript\n" +
      "import { Injectable } from '@angular/core';\n" +
      "import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';\n\n" +
      "@Injectable()\n" +
      "export class AuthInterceptor implements HttpInterceptor {\n" +
      "  constructor(private authService: AuthService) {}\n\n" +
      "  intercept(req: HttpRequest<any>, next: HttpHandler) {\n" +
      "    // Clone and add auth header\n" +
      "    const token = this.authService.getToken();\n" +
      "    if (token) {\n" +
      "      req = req.clone({\n" +
      "        setHeaders: {\n" +
      "          Authorization: `Bearer ${token}`\n" +
      "        }\n" +
      "      });\n" +
      "    }\n" +
      "    return next.handle(req);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Error Handling Interceptor:**\n\n" +
      "```typescript\n" +
      "export const errorInterceptor: HttpInterceptorFn = (req, next) => {\n" +
      "  return next(req).pipe(\n" +
      "    catchError((error: HttpErrorResponse) => {\n" +
      "      if (error.status === 401) {\n" +
      "        // Redirect to login\n" +
      "        this.router.navigate(['/login']);\n" +
      "      } else if (error.status === 500) {\n" +
      "        // Show error message\n" +
      "        this.toastService.error('Server error');\n" +
      "      }\n" +
      "      return throwError(() => error);\n" +
      "    })\n" +
      "  );\n" +
      "};\n" +
      "```\n\n" +
      "**Loading Interceptor:**\n\n" +
      "```typescript\n" +
      "export const loadingInterceptor: HttpInterceptorFn = (req, next) => {\n" +
      "  const loadingService = inject(LoadingService);\n" +
      "  loadingService.show();\n\n" +
      "  return next(req).pipe(\n" +
      "    finalize(() => loadingService.hide())\n" +
      "  );\n" +
      "};\n" +
      "```\n\n" +
      "**Register Interceptors (Order Matters!):**\n\n" +
      "```typescript\n" +
      "// main.ts or app.config.ts\n" +
      "import { provideHttpClient, withInterceptors } from '@angular/common/http';\n\n" +
      "bootstrapApplication(AppComponent, {\n" +
      "  providers: [\n" +
      "    provideHttpClient(\n" +
      "      withInterceptors([\n" +
      "        loggingInterceptor,  // 1st\n" +
      "        authInterceptor,     // 2nd\n" +
      "        loadingInterceptor,  // 3rd\n" +
      "        errorInterceptor     // 4th (last)\n" +
      "      ])\n" +
      "    )\n" +
      "  ]\n" +
      "});\n\n" +
      "// Execution order:\n" +
      "// Request: 1 → 2 → 3 → 4 → Server\n" +
      "// Response: Server → 4 → 3 → 2 → 1\n" +
      "```\n\n" +
      "**Conditional Interceptor:**\n\n" +
      "```typescript\n" +
      "export const cacheInterceptor: HttpInterceptorFn = (req, next) => {\n" +
      "  // Only cache GET requests\n" +
      "  if (req.method !== 'GET') {\n" +
      "    return next(req);\n" +
      "  }\n\n" +
      "  const cached = cache.get(req.url);\n" +
      "  if (cached) {\n" +
      "    return of(cached); // Return cached response\n" +
      "  }\n\n" +
      "  return next(req).pipe(\n" +
      "    tap(response => cache.set(req.url, response))\n" +
      "  );\n" +
      "};\n" +
      "```",
    category: "HTTP",
    difficulty: "hard",
    tags: ["interceptors", "http", "middleware", "request-response"],
  },
  {
    id: 64,
    question:
      "How do you implement Performance Profiling in Angular? Explain Angular DevTools and profiling strategies.",
    answer:
      "**Angular DevTools (Chrome Extension):**\n\n" +
      "```typescript\n" +
      "// Install Angular DevTools extension\n" +
      "// Features:\n" +
      "// 1. Component Explorer - inspect component tree\n" +
      "// 2. Profiler - record performance\n" +
      "// 3. Change Detection - visualize CD cycles\n" +
      "```\n\n" +
      "**Profiling Change Detection:**\n\n" +
      "```typescript\n" +
      "import { enableDebugTools } from '@angular/platform-browser';\n" +
      "import { ApplicationRef } from '@angular/core';\n\n" +
      "// main.ts (development only)\n" +
      "platformBrowserDynamic()\n" +
      "  .bootstrapModule(AppModule)\n" +
      "  .then(moduleRef => {\n" +
      "    const appRef = moduleRef.injector.get(ApplicationRef);\n" +
      "    const comp = appRef.components[0];\n" +
      "    enableDebugTools(comp);\n" +
      "  });\n\n" +
      "// In browser console:\n" +
      "// ng.profiler.timeChangeDetection()\n" +
      "```\n\n" +
      "**Performance Measurement:**\n\n" +
      "```typescript\n" +
      "// Using Performance API\n" +
      "@Component({...})\n" +
      "export class Component implements OnInit {\n" +
      "  ngOnInit() {\n" +
      "    performance.mark('init-start');\n" +
      "    this.heavyOperation();\n" +
      "    performance.mark('init-end');\n" +
      "    performance.measure('init', 'init-start', 'init-end');\n\n" +
      "    const measure = performance.getEntriesByName('init')[0];\n" +
      "    console.log(`Init took ${measure.duration}ms`);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**OnPush Change Detection:**\n\n" +
      "```typescript\n" +
      "import { ChangeDetectionStrategy } from '@angular/core';\n\n" +
      "@Component({\n" +
      "  changeDetection: ChangeDetectionStrategy.OnPush // Optimize!\n" +
      "})\n" +
      "export class Component {\n" +
      "  // Only checks when:\n" +
      "  // 1. @Input() changes (reference)\n" +
      "  // 2. Event fires\n" +
      "  // 3. Observable emits (async pipe)\n" +
      "  // 4. Manual: changeDetectorRef.markForCheck()\n" +
      "}\n" +
      "```\n\n" +
      "**TrackBy for *ngFor:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  template: `\n" +
      '    <div *ngFor="let item of items; trackBy: trackById">\n' +
      "      {{ item.name }}\n" +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "export class Component {\n" +
      "  items = [...];\n\n" +
      "  // Prevents re-rendering unchanged items\n" +
      "  trackById(index: number, item: any) {\n" +
      "    return item.id; // Unique identifier\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Bundle Analysis:**\n\n" +
      "```bash\n" +
      "# Analyze bundle size\n" +
      "ng build --stats-json\n" +
      "npx webpack-bundle-analyzer dist/stats.json\n\n" +
      "# Or use source-map-explorer\n" +
      "npm install -g source-map-explorer\n" +
      "ng build --source-map\n" +
      "source-map-explorer dist/**/*.js\n" +
      "```",
    category: "Performance",
    difficulty: "hard",
    tags: ["performance", "profiling", "devtools", "optimization", "debugging"],
  },
  {
    id: 65,
    question: "What is Differential Loading in Angular? How does it work?",
    answer:
      "Differential loading serves modern ES2015+ code to modern browsers and ES5 to legacy browsers.\n\n" +
      "**How It Works:**\n\n" +
      "```typescript\n" +
      "// Angular CLI automatically generates two bundles:\n\n" +
      "// 1. Modern bundle (ES2015+):\n" +
      "// - main-es2015.js (smaller, faster)\n" +
      "// - For Chrome, Firefox, Safari, Edge\n\n" +
      "// 2. Legacy bundle (ES5):\n" +
      "// - main-es5.js (larger, includes polyfills)\n" +
      "// - For IE11, older browsers\n" +
      "```\n\n" +
      "**index.html Output:**\n\n" +
      "```html\n" +
      "<!-- Modern browsers load ES2015 -->\n" +
      '<script src="main-es2015.js" type="module"></script>\n\n' +
      "<!-- Legacy browsers load ES5 -->\n" +
      '<script src="main-es5.js" nomodule defer></script>\n\n' +
      '<!-- type="module" = modern browsers only -->\n' +
      "<!-- nomodule = legacy browsers only -->\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Smaller bundles for 95% of users\n" +
      "- Better performance on modern browsers\n" +
      "- Still supports legacy browsers\n\n" +
      "**Configuration (tsconfig.json):**\n\n" +
      "```json\n" +
      "{\n" +
      '  "compilerOptions": {\n' +
      '    "target": "ES2015",\n' +
      '    "module": "ES2015"\n' +
      "  }\n" +
      "}\n" +
      "```",
    category: "Build & Optimization",
    difficulty: "intermediate",
    tags: ["differential-loading", "build", "es5", "es2015", "performance"],
  },
  {
    id: 66,
    question:
      "How do you implement Testing strategies in Angular? Explain unit vs integration vs e2e testing.",
    answer:
      "**Unit Testing (Jasmine + Karma):**\n\n" +
      "```typescript\n" +
      "import { ComponentFixture, TestBed } from '@angular/core/testing';\n\n" +
      "describe('UserComponent', () => {\n" +
      "  let component: UserComponent;\n" +
      "  let fixture: ComponentFixture<UserComponent>;\n\n" +
      "  beforeEach(async () => {\n" +
      "    await TestBed.configureTestingModule({\n" +
      "      declarations: [UserComponent],\n" +
      "      providers: [UserService]\n" +
      "    }).compileComponents();\n\n" +
      "    fixture = TestBed.createComponent(UserComponent);\n" +
      "    component = fixture.componentInstance;\n" +
      "  });\n\n" +
      "  it('should create', () => {\n" +
      "    expect(component).toBeTruthy();\n" +
      "  });\n\n" +
      "  it('should display user name', () => {\n" +
      "    component.user = { name: 'John' };\n" +
      "    fixture.detectChanges();\n" +
      "    \n" +
      "    const compiled = fixture.nativeElement;\n" +
      "    expect(compiled.querySelector('h1').textContent).toContain('John');\n" +
      "  });\n\n" +
      "  it('should call service on save', () => {\n" +
      "    const service = TestBed.inject(UserService);\n" +
      "    spyOn(service, 'save');\n" +
      "    \n" +
      "    component.save();\n" +
      "    expect(service.save).toHaveBeenCalled();\n" +
      "  });\n" +
      "});\n" +
      "```\n\n" +
      "**Integration Testing:**\n\n" +
      "```typescript\n" +
      "import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';\n\n" +
      "describe('UserService', () => {\n" +
      "  let service: UserService;\n" +
      "  let httpMock: HttpTestingController;\n\n" +
      "  beforeEach(() => {\n" +
      "    TestBed.configureTestingModule({\n" +
      "      imports: [HttpClientTestingModule],\n" +
      "      providers: [UserService]\n" +
      "    });\n\n" +
      "    service = TestBed.inject(UserService);\n" +
      "    httpMock = TestBed.inject(HttpTestingController);\n" +
      "  });\n\n" +
      "  it('should fetch users', () => {\n" +
      "    const mockUsers = [{ id: 1, name: 'John' }];\n\n" +
      "    service.getUsers().subscribe(users => {\n" +
      "      expect(users).toEqual(mockUsers);\n" +
      "    });\n\n" +
      "    const req = httpMock.expectOne('/api/users');\n" +
      "    expect(req.request.method).toBe('GET');\n" +
      "    req.flush(mockUsers);\n" +
      "  });\n\n" +
      "  afterEach(() => {\n" +
      "    httpMock.verify(); // Ensure no outstanding requests\n" +
      "  });\n" +
      "});\n" +
      "```\n\n" +
      "**E2E Testing (Cypress):**\n\n" +
      "```typescript\n" +
      "describe('User Flow', () => {\n" +
      "  beforeEach(() => {\n" +
      "    cy.visit('/users');\n" +
      "  });\n\n" +
      "  it('should add new user', () => {\n" +
      "    cy.get('[data-cy=add-user]').click();\n" +
      "    cy.get('[data-cy=name-input]').type('John Doe');\n" +
      "    cy.get('[data-cy=email-input]').type('john@example.com');\n" +
      "    cy.get('[data-cy=submit]').click();\n\n" +
      "    cy.get('[data-cy=user-list]').should('contain', 'John Doe');\n" +
      "  });\n\n" +
      "  it('should validate form', () => {\n" +
      "    cy.get('[data-cy=add-user]').click();\n" +
      "    cy.get('[data-cy=submit]').click();\n" +
      "    cy.get('[data-cy=error]').should('be.visible');\n" +
      "  });\n" +
      "});\n" +
      "```",
    category: "Testing",
    difficulty: "hard",
    tags: ["testing", "jasmine", "karma", "cypress", "unit-tests", "e2e"],
  },
  {
    id: 67,
    question:
      "What are the differences between Constructor, ngOnInit, and ngAfterViewInit? When to use each?",
    answer:
      "**Constructor - Dependency Injection:**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  // ✅ Use constructor for:\n" +
      "  // - Dependency injection\n" +
      "  // - Simple initialization\n" +
      "  // - No DOM access\n" +
      "  // - No @Input() data yet\n\n" +
      "  private userId: number;\n\n" +
      "  constructor(\n" +
      "    private userService: UserService,\n" +
      "    private route: ActivatedRoute\n" +
      "  ) {\n" +
      "    // ❌ BAD - @Input not available yet\n" +
      "    // console.log(this.userId);\n\n" +
      "    // ✅ GOOD - Simple setup\n" +
      "    this.userId = 0;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**ngOnInit - Component Initialization:**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class Component implements OnInit {\n" +
      "  @Input() userId: number;\n" +
      "  user: User;\n\n" +
      "  // ✅ Use ngOnInit for:\n" +
      "  // - @Input() values available\n" +
      "  // - HTTP requests\n" +
      "  // - Complex initialization\n" +
      "  // - Setup subscriptions\n\n" +
      "  ngOnInit() {\n" +
      "    // ✅ GOOD - @Input available\n" +
      "    if (this.userId) {\n" +
      "      this.loadUser(this.userId);\n" +
      "    }\n\n" +
      "    // ✅ GOOD - HTTP calls\n" +
      "    this.userService.getUsers().subscribe(users => {\n" +
      "      this.users = users;\n" +
      "    });\n\n" +
      "    // ❌ BAD - ViewChild not available\n" +
      "    // this.inputElement.nativeElement.focus();\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**ngAfterViewInit - View Initialization:**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class Component implements AfterViewInit {\n" +
      "  @ViewChild('nameInput') inputRef: ElementRef;\n" +
      "  @ViewChild(ChildComponent) child: ChildComponent;\n\n" +
      "  // ✅ Use ngAfterViewInit for:\n" +
      "  // - DOM manipulation\n" +
      "  // - @ViewChild queries\n" +
      "  // - Third-party lib initialization (charts, maps)\n" +
      "  // - Canvas operations\n\n" +
      "  ngAfterViewInit() {\n" +
      "    // ✅ GOOD - ViewChild available\n" +
      "    this.inputRef.nativeElement.focus();\n\n" +
      "    // ✅ GOOD - Access child component\n" +
      "    this.child.initialize();\n\n" +
      "    // ✅ GOOD - Init charts\n" +
      "    this.initChart();\n\n" +
      "    // ⚠️ Avoid change detection in same cycle\n" +
      "    // Use setTimeout or Promise for state changes\n" +
      "  }\n\n" +
      "  private initChart() {\n" +
      "    // Initialize chart library\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Lifecycle Sequence:**\n\n" +
      "```typescript\n" +
      "1. constructor()           // DI, no DOM\n" +
      "2. ngOnChanges()          // @Input changes\n" +
      "3. ngOnInit()             // Initialization\n" +
      "4. ngDoCheck()            // Change detection\n" +
      "5. ngAfterContentInit()   // Projected content\n" +
      "6. ngAfterContentChecked()// After content checked\n" +
      "7. ngAfterViewInit()      // View initialized ✅ DOM ready\n" +
      "8. ngAfterViewChecked()   // After view checked\n" +
      "9. ngOnDestroy()          // Cleanup\n" +
      "```",
    category: "Lifecycle Hooks",
    difficulty: "intermediate",
    tags: ["lifecycle", "constructor", "ngoninit", "ngafterviewinit", "hooks"],
  },
  {
    id: 68,
    question: "What is the Decorator Pattern in Angular? Explain all built-in decorators.",
    answer:
      "Decorators add metadata to classes, properties, methods, and parameters.\n\n" +
      "**Class Decorators:**\n\n" +
      "```typescript\n" +
      "// @Component\n" +
      "@Component({\n" +
      "  selector: 'app-user',\n" +
      "  template: '<h1>User</h1>',\n" +
      "  styles: ['h1 { color: blue; }']\n" +
      "})\n\n" +
      "// @Directive\n" +
      "@Directive({\n" +
      "  selector: '[appHighlight]'\n" +
      "})\n\n" +
      "// @Injectable\n" +
      "@Injectable({\n" +
      "  providedIn: 'root'\n" +
      "})\n\n" +
      "// @Pipe\n" +
      "@Pipe({\n" +
      "  name: 'capitalize'\n" +
      "})\n\n" +
      "// @NgModule (deprecated with standalone)\n" +
      "@NgModule({\n" +
      "  declarations: [AppComponent],\n" +
      "  imports: [BrowserModule],\n" +
      "  bootstrap: [AppComponent]\n" +
      "})\n" +
      "```\n\n" +
      "**Property Decorators:**\n\n" +
      "```typescript\n" +
      "export class Component {\n" +
      "  // Input/Output\n" +
      "  @Input() userId: number;\n" +
      "  @Output() userChanged = new EventEmitter<User>();\n\n" +
      "  // View Queries\n" +
      "  @ViewChild('nameInput') input: ElementRef;\n" +
      "  @ViewChildren(ChildComponent) children: QueryList<ChildComponent>;\n\n" +
      "  // Content Queries\n" +
      "  @ContentChild('header') header: ElementRef;\n" +
      "  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;\n\n" +
      "  // Host Binding\n" +
      "  @HostBinding('class.active') isActive = true;\n" +
      "  @HostBinding('attr.role') role = 'button';\n" +
      "}\n" +
      "```\n\n" +
      "**Method Decorators:**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  // Host Listener\n" +
      "  @HostListener('click', ['$event'])\n" +
      "  onClick(event: MouseEvent) {\n" +
      "    console.log('Clicked:', event);\n" +
      "  }\n\n" +
      "  @HostListener('window:resize', ['$event'])\n" +
      "  onResize(event: Event) {\n" +
      "    console.log('Window resized');\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Parameter Decorators:**\n\n" +
      "```typescript\n" +
      "import { Optional, Self, SkipSelf, Host, Inject } from '@angular/core';\n\n" +
      "export class Component {\n" +
      "  constructor(\n" +
      "    // @Optional - Service might not exist\n" +
      "    @Optional() private logger: LoggerService,\n\n" +
      "    // @Self - Only from this component's injector\n" +
      "    @Self() private localService: LocalService,\n\n" +
      "    // @SkipSelf - Skip this component, look in parent\n" +
      "    @SkipSelf() private parentService: ParentService,\n\n" +
      "    // @Host - Only look in host component\n" +
      "    @Host() private hostService: HostService,\n\n" +
      "    // @Inject - Inject token\n" +
      "    @Inject(CONFIG_TOKEN) private config: AppConfig\n" +
      "  ) {}\n" +
      "}\n" +
      "```\n\n" +
      "**Custom Decorator Example:**\n\n" +
      "```typescript\n" +
      "// Simple method decorator\n" +
      "export function Log() {\n" +
      "  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {\n" +
      "    const original = descriptor.value;\n" +
      "    \n" +
      "    descriptor.value = function(...args: any[]) {\n" +
      "      console.log(`Calling ${propertyKey} with`, args);\n" +
      "      const result = original.apply(this, args);\n" +
      "      console.log(`Result:`, result);\n" +
      "      return result;\n" +
      "    };\n" +
      "    \n" +
      "    return descriptor;\n" +
      "  };\n" +
      "}\n\n" +
      "// Usage\n" +
      "export class Component {\n" +
      "  @Log()\n" +
      "  saveUser(user: User) {\n" +
      "    return this.http.post('/api/users', user);\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "Decorators",
    difficulty: "hard",
    tags: ["decorators", "metadata", "typescript", "advanced"],
  },
  {
    id: 69,
    question: "How do you implement Multi-Provider Pattern in Angular? Explain use cases.",
    answer:
      "Multi-providers allow multiple values for a single token.\n\n" +
      "**HTTP Interceptors (Built-in Multi-Provider):**\n\n" +
      "```typescript\n" +
      "// Each interceptor adds to the array\n" +
      "providers: [\n" +
      "  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },\n" +
      "  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },\n" +
      "  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }\n" +
      "]\n" +
      "// Angular calls all interceptors in order\n" +
      "```\n\n" +
      "**Custom Multi-Provider - Plugin System:**\n\n" +
      "```typescript\n" +
      "// Define interface\n" +
      "export interface Plugin {\n" +
      "  name: string;\n" +
      "  execute(): void;\n" +
      "}\n\n" +
      "// Create token\n" +
      "export const PLUGINS = new InjectionToken<Plugin[]>('plugins');\n\n" +
      "// Implement plugins\n" +
      "@Injectable()\n" +
      "export class LoggingPlugin implements Plugin {\n" +
      "  name = 'Logging';\n" +
      "  execute() {\n" +
      "    console.log('Logging plugin executed');\n" +
      "  }\n" +
      "}\n\n" +
      "@Injectable()\n" +
      "export class AnalyticsPlugin implements Plugin {\n" +
      "  name = 'Analytics';\n" +
      "  execute() {\n" +
      "    console.log('Analytics plugin executed');\n" +
      "  }\n" +
      "}\n\n" +
      "// Register plugins\n" +
      "providers: [\n" +
      "  { provide: PLUGINS, useClass: LoggingPlugin, multi: true },\n" +
      "  { provide: PLUGINS, useClass: AnalyticsPlugin, multi: true }\n" +
      "]\n\n" +
      "// Use plugins\n" +
      "@Component({...})\n" +
      "export class AppComponent implements OnInit {\n" +
      "  constructor(@Inject(PLUGINS) private plugins: Plugin[]) {}\n\n" +
      "  ngOnInit() {\n" +
      "    // Execute all plugins\n" +
      "    this.plugins.forEach(plugin => {\n" +
      "      console.log(`Running ${plugin.name}`);\n" +
      "      plugin.execute();\n" +
      "    });\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Validation Rules Example:**\n\n" +
      "```typescript\n" +
      "export interface ValidationRule {\n" +
      "  validate(value: any): boolean;\n" +
      "  message: string;\n" +
      "}\n\n" +
      "export const VALIDATION_RULES = new InjectionToken<ValidationRule[]>('validation-rules');\n\n" +
      "@Injectable()\n" +
      "export class RequiredRule implements ValidationRule {\n" +
      "  message = 'This field is required';\n" +
      "  validate(value: any) {\n" +
      "    return !!value;\n" +
      "  }\n" +
      "}\n\n" +
      "@Injectable()\n" +
      "export class EmailRule implements ValidationRule {\n" +
      "  message = 'Invalid email format';\n" +
      "  validate(value: string) {\n" +
      "    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);\n" +
      "  }\n" +
      "}\n\n" +
      "// Register\n" +
      "providers: [\n" +
      "  { provide: VALIDATION_RULES, useClass: RequiredRule, multi: true },\n" +
      "  { provide: VALIDATION_RULES, useClass: EmailRule, multi: true }\n" +
      "]\n\n" +
      "// Validator Service\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class ValidatorService {\n" +
      "  constructor(@Inject(VALIDATION_RULES) private rules: ValidationRule[]) {}\n\n" +
      "  validate(value: any): string[] {\n" +
      "    const errors: string[] = [];\n" +
      "    this.rules.forEach(rule => {\n" +
      "      if (!rule.validate(value)) {\n" +
      "        errors.push(rule.message);\n" +
      "      }\n" +
      "    });\n" +
      "    return errors;\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "Dependency Injection",
    difficulty: "hard",
    tags: ["multi-provider", "di", "injection-token", "patterns", "advanced"],
  },
  {
    id: 70,
    question: "What is the RxJS shareReplay operator? How does it differ from share?",
    answer:
      "shareReplay caches and replays emissions to late subscribers.\n\n" +
      "**Problem (Without shareReplay):**\n\n" +
      "```typescript\n" +
      "// ❌ Each subscription triggers new HTTP request\n" +
      "const user$ = this.http.get('/api/user');\n\n" +
      "user$.subscribe(u => console.log('Sub 1:', u)); // Request 1\n" +
      "user$.subscribe(u => console.log('Sub 2:', u)); // Request 2 (duplicate!)\n" +
      "```\n\n" +
      "**Solution: shareReplay:**\n\n" +
      "```typescript\n" +
      "import { shareReplay } from 'rxjs/operators';\n\n" +
      "// ✅ Single request, cached result\n" +
      "const user$ = this.http.get('/api/user').pipe(\n" +
      "  shareReplay({ bufferSize: 1, refCount: true })\n" +
      ");\n\n" +
      "user$.subscribe(u => console.log('Sub 1:', u)); // Request\n" +
      "user$.subscribe(u => console.log('Sub 2:', u)); // From cache!\n" +
      "```\n\n" +
      "**shareReplay Options:**\n\n" +
      "```typescript\n" +
      "shareReplay({\n" +
      "  bufferSize: 1,     // How many values to cache\n" +
      "  refCount: true,    // Unsubscribe when no subscribers (cleanup)\n" +
      "  windowTime: 5000   // Cache expiration (ms)\n" +
      "})\n\n" +
      "// Common patterns:\n\n" +
      "// Cache forever\n" +
      "shareReplay(1)\n\n" +
      "// Cache with cleanup\n" +
      "shareReplay({ bufferSize: 1, refCount: true })\n\n" +
      "// Cache with expiration\n" +
      "shareReplay({ bufferSize: 1, windowTime: 5000 })\n" +
      "```\n\n" +
      "**vs share() operator:**\n\n" +
      "```typescript\n" +
      "// share() - No replay to late subscribers\n" +
      "const data$ = this.http.get('/api/data').pipe(share());\n\n" +
      "data$.subscribe(d => console.log('Sub 1:', d)); // Gets data\n" +
      "// ... time passes, request completes ...\n" +
      "data$.subscribe(d => console.log('Sub 2:', d)); // Gets nothing!\n\n" +
      "// shareReplay() - Replays to late subscribers\n" +
      "const data$ = this.http.get('/api/data').pipe(shareReplay(1));\n\n" +
      "data$.subscribe(d => console.log('Sub 1:', d)); // Gets data\n" +
      "// ... time passes, request completes ...\n" +
      "data$.subscribe(d => console.log('Sub 2:', d)); // Gets cached data!\n" +
      "```\n\n" +
      "**Service Example:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class UserService {\n" +
      "  private currentUser$ = this.http.get<User>('/api/user').pipe(\n" +
      "    shareReplay({ bufferSize: 1, refCount: true })\n" +
      "  );\n\n" +
      "  constructor(private http: HttpClient) {}\n\n" +
      "  getCurrentUser(): Observable<User> {\n" +
      "    return this.currentUser$;\n" +
      "  }\n\n" +
      "  // Multiple components can subscribe without duplicate requests\n" +
      "}\n" +
      "```",
    category: "RxJS",
    difficulty: "hard",
    tags: ["rxjs", "sharereplay", "share", "caching", "multicasting"],
  },
  {
    id: 71,
    question: "What is Micro-frontend Architecture? How do you implement it with Angular?",
    answer:
      "Micro-frontends break monolithic frontends into smaller, independent apps.\n\n" +
      "**Architecture:**\n\n" +
      "```typescript\n" +
      "// Shell App (Container)\n" +
      "// - Routing\n" +
      "// - Navigation\n" +
      "// - Authentication\n\n" +
      "// Micro-frontend 1 (Products)\n" +
      "// - Product list\n" +
      "// - Product details\n\n" +
      "// Micro-frontend 2 (Cart)\n" +
      "// - Shopping cart\n" +
      "// - Checkout\n\n" +
      "// Micro-frontend 3 (User)\n" +
      "// - Profile\n" +
      "// - Settings\n" +
      "```\n\n" +
      "**Module Federation Setup:**\n\n" +
      "```javascript\n" +
      "// webpack.config.js (Micro-frontend)\n" +
      "const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');\n\n" +
      "module.exports = {\n" +
      "  plugins: [\n" +
      "    new ModuleFederationPlugin({\n" +
      "      name: 'products',\n" +
      "      filename: 'remoteEntry.js',\n" +
      "      exposes: {\n" +
      "        './ProductsModule': './src/app/products/products.module.ts'\n" +
      "      },\n" +
      "      shared: {\n" +
      "        '@angular/core': { singleton: true, strictVersion: true },\n" +
      "        '@angular/common': { singleton: true, strictVersion: true }\n" +
      "      }\n" +
      "    })\n" +
      "  ]\n" +
      "};\n\n" +
      "// webpack.config.js (Shell)\n" +
      "module.exports = {\n" +
      "  plugins: [\n" +
      "    new ModuleFederationPlugin({\n" +
      "      name: 'shell',\n" +
      "      remotes: {\n" +
      "        products: 'products@http://localhost:4201/remoteEntry.js',\n" +
      "        cart: 'cart@http://localhost:4202/remoteEntry.js'\n" +
      "      },\n" +
      "      shared: {\n" +
      "        '@angular/core': { singleton: true },\n" +
      "        '@angular/common': { singleton: true }\n" +
      "      }\n" +
      "    })\n" +
      "  ]\n" +
      "};\n" +
      "```\n\n" +
      "**Shell Routing:**\n\n" +
      "```typescript\n" +
      "const routes: Routes = [\n" +
      "  {\n" +
      "    path: 'products',\n" +
      "    loadChildren: () =>\n" +
      "      import('products/ProductsModule').then(m => m.ProductsModule)\n" +
      "  },\n" +
      "  {\n" +
      "    path: 'cart',\n" +
      "    loadChildren: () =>\n" +
      "      import('cart/CartModule').then(m => m.CartModule)\n" +
      "  }\n" +
      "];\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Independent deployment\n" +
      "- Team autonomy\n" +
      "- Technology diversity\n" +
      "- Faster builds\n" +
      "- Scalability\n\n" +
      "**Challenges:**\n" +
      "- Shared state\n" +
      "- Cross-app communication\n" +
      "- Version management\n" +
      "- Testing complexity\n" +
      "- Performance overhead",
    category: "Architecture",
    difficulty: "hard",
    tags: ["micro-frontends", "module-federation", "architecture", "scalability"],
  },
  {
    id: 72,
    question:
      "How do you implement Real-time Communication in Angular? Compare WebSockets, SSE, and Polling.",
    answer:
      "**1. WebSockets (Full-Duplex):**\n\n" +
      "```typescript\n" +
      "import { webSocket, WebSocketSubject } from 'rxjs/webSocket';\n\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class WebSocketService {\n" +
      "  private socket$: WebSocketSubject<any>;\n\n" +
      "  connect(): Observable<any> {\n" +
      "    if (!this.socket$ || this.socket$.closed) {\n" +
      "      this.socket$ = webSocket({\n" +
      "        url: 'ws://localhost:8080',\n" +
      "        openObserver: {\n" +
      "          next: () => console.log('Connected')\n" +
      "        },\n" +
      "        closeObserver: {\n" +
      "          next: () => console.log('Disconnected')\n" +
      "        }\n" +
      "      });\n" +
      "    }\n" +
      "    return this.socket$;\n" +
      "  }\n\n" +
      "  send(message: any) {\n" +
      "    this.socket$.next(message);\n" +
      "  }\n\n" +
      "  close() {\n" +
      "    this.socket$.complete();\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage\n" +
      "ngOnInit() {\n" +
      "  this.wsService.connect().subscribe(message => {\n" +
      "    console.log('Received:', message);\n" +
      "  });\n\n" +
      "  this.wsService.send({ type: 'subscribe', channel: 'chat' });\n" +
      "}\n" +
      "```\n\n" +
      "**2. Server-Sent Events (SSE) (Server → Client):**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class SSEService {\n" +
      "  getServerEvents(url: string): Observable<any> {\n" +
      "    return new Observable(observer => {\n" +
      "      const eventSource = new EventSource(url);\n\n" +
      "      eventSource.onmessage = (event) => {\n" +
      "        observer.next(JSON.parse(event.data));\n" +
      "      };\n\n" +
      "      eventSource.onerror = (error) => {\n" +
      "        observer.error(error);\n" +
      "      };\n\n" +
      "      // Cleanup\n" +
      "      return () => eventSource.close();\n" +
      "    });\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage\n" +
      "ngOnInit() {\n" +
      "  this.sseService.getServerEvents('/api/events').subscribe(event => {\n" +
      "    console.log('Event:', event);\n" +
      "  });\n" +
      "}\n" +
      "```\n\n" +
      "**3. Long Polling:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class PollingService {\n" +
      "  poll(url: string, interval: number = 5000): Observable<any> {\n" +
      "    return timer(0, interval).pipe(\n" +
      "      switchMap(() => this.http.get(url)),\n" +
      "      retry({ delay: 1000 })\n" +
      "    );\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage\n" +
      "ngOnInit() {\n" +
      "  this.pollingService.poll('/api/notifications', 5000)\n" +
      "    .subscribe(data => console.log('Polled data:', data));\n" +
      "}\n" +
      "```\n\n" +
      "**4. SignalR (Microsoft):**\n\n" +
      "```typescript\n" +
      "import * as signalR from '@microsoft/signalr';\n\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class SignalRService {\n" +
      "  private connection: signalR.HubConnection;\n\n" +
      "  startConnection() {\n" +
      "    this.connection = new signalR.HubConnectionBuilder()\n" +
      "      .withUrl('/chathub')\n" +
      "      .withAutomaticReconnect()\n" +
      "      .build();\n\n" +
      "    this.connection.start()\n" +
      "      .then(() => console.log('Connected'))\n" +
      "      .catch(err => console.error('Error:', err));\n" +
      "  }\n\n" +
      "  onMessage(callback: (user: string, message: string) => void) {\n" +
      "    this.connection.on('ReceiveMessage', callback);\n" +
      "  }\n\n" +
      "  sendMessage(user: string, message: string) {\n" +
      "    this.connection.invoke('SendMessage', user, message);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Comparison:**\n\n" +
      "| Feature | WebSocket | SSE | Polling |\n" +
      "|---------|-----------|-----|----------|\n" +
      "| Direction | Bi-directional | Server→Client | Client→Server |\n" +
      "| Overhead | Low | Medium | High |\n" +
      "| Browser Support | Modern | Good | All |\n" +
      "| Use Case | Chat, Gaming | Notifications | Simple updates |",
    category: "Real-time",
    difficulty: "hard",
    tags: ["websockets", "sse", "polling", "signalr", "real-time"],
  },
  {
    id: 73,
    question: "What is Angular Schematics? How do you create custom schematics?",
    answer:
      "Schematics are code generators for Angular projects.\n\n" +
      "**Built-in Schematics:**\n\n" +
      "```bash\n" +
      "# Generate component\n" +
      "ng generate component user\n\n" +
      "# Generate service\n" +
      "ng generate service api\n\n" +
      "# Add library\n" +
      "ng add @angular/material\n" +
      "```\n\n" +
      "**Create Custom Schematic:**\n\n" +
      "```bash\n" +
      "# Install schematics CLI\n" +
      "npm install -g @angular-devkit/schematics-cli\n\n" +
      "# Create schematic\n" +
      "schematics blank my-schematic\n" +
      "cd my-schematic\n" +
      "```\n\n" +
      "**Schematic Definition:**\n\n" +
      "```typescript\n" +
      "// src/my-component/index.ts\n" +
      "import {\n" +
      "  Rule,\n" +
      "  SchematicContext,\n" +
      "  Tree,\n" +
      "  apply,\n" +
      "  url,\n" +
      "  template,\n" +
      "  move,\n" +
      "  mergeWith\n" +
      "} from '@angular-devkit/schematics';\n" +
      "import { strings } from '@angular-devkit/core';\n\n" +
      "interface Schema {\n" +
      "  name: string;\n" +
      "  path?: string;\n" +
      "}\n\n" +
      "export function myComponent(options: Schema): Rule {\n" +
      "  return (tree: Tree, context: SchematicContext) => {\n" +
      "    // Create template files\n" +
      "    const templateSource = apply(url('./files'), [\n" +
      "      template({\n" +
      "        ...strings,\n" +
      "        ...options,\n" +
      "        name: strings.dasherize(options.name)\n" +
      "      }),\n" +
      "      move(options.path || '')\n" +
      "    ]);\n\n" +
      "    return mergeWith(templateSource)(tree, context);\n" +
      "  };\n" +
      "}\n" +
      "```\n\n" +
      "**Template Files:**\n\n" +
      "```typescript\n" +
      "// src/my-component/files/__name@dasherize__.component.ts.template\n" +
      "import { Component } from '@angular/core';\n\n" +
      "@Component({\n" +
      "  selector: 'app-<%= dasherize(name) %>',\n" +
      "  templateUrl: './<%= dasherize(name) %>.component.html',\n" +
      "  styleUrls: ['./<%= dasherize(name) %>.component.css']\n" +
      "})\n" +
      "export class <%= classify(name) %>Component {\n" +
      "  constructor() { }\n" +
      "}\n" +
      "```\n\n" +
      "**Schema (collection.json):**\n\n" +
      "```json\n" +
      "{\n" +
      '  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",\n' +
      '  "schematics": {\n' +
      '    "my-component": {\n' +
      '      "description": "Generate a custom component",\n' +
      '      "factory": "./my-component/index#myComponent",\n' +
      '      "schema": "./my-component/schema.json"\n' +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Build & Use:**\n\n" +
      "```bash\n" +
      "# Build schematic\n" +
      "npm run build\n\n" +
      "# Test locally\n" +
      "schematics .:my-component --name=user\n\n" +
      "# Publish\n" +
      "npm publish\n\n" +
      "# Use in project\n" +
      "ng generate my-schematic:my-component user\n" +
      "```",
    category: "Tooling",
    difficulty: "hard",
    tags: ["schematics", "code-generation", "cli", "tooling"],
  },
  {
    id: 74,
    question:
      "What are Angular Workspace Configurations? Explain projects, libraries, and applications.",
    answer:
      "Angular workspace can contain multiple projects (apps & libraries).\n\n" +
      "**Workspace Structure:**\n\n" +
      "```typescript\n" +
      "my-workspace/\n" +
      "├── angular.json        # Workspace config\n" +
      "├── package.json\n" +
      "├── projects/\n" +
      "│   ├── app1/           # Application 1\n" +
      "│   ├── app2/           # Application 2\n" +
      "│   ├── shared-lib/     # Shared library\n" +
      "│   └── ui-components/  # Component library\n" +
      "└── tsconfig.json\n" +
      "```\n\n" +
      "**Create Library:**\n\n" +
      "```bash\n" +
      "# Generate library\n" +
      "ng generate library shared-lib\n\n" +
      "# Generate component in library\n" +
      "ng generate component button --project=shared-lib\n" +
      "```\n\n" +
      "**Library Structure:**\n\n" +
      "```typescript\n" +
      "projects/shared-lib/\n" +
      "├── src/\n" +
      "│   ├── lib/\n" +
      "│   │   ├── shared-lib.module.ts\n" +
      "│   │   ├── components/\n" +
      "│   │   ├── services/\n" +
      "│   │   └── utils/\n" +
      "│   └── public-api.ts        # Public exports\n" +
      "├── ng-package.json\n" +
      "└── package.json\n" +
      "```\n\n" +
      "**Public API (Exports):**\n\n" +
      "```typescript\n" +
      "// projects/shared-lib/src/public-api.ts\n" +
      "export * from './lib/shared-lib.module';\n" +
      "export * from './lib/components/button/button.component';\n" +
      "export * from './lib/services/logger.service';\n" +
      "```\n\n" +
      "**Use Library in App:**\n\n" +
      "```typescript\n" +
      "// Import from library\n" +
      "import { SharedLibModule, LoggerService } from 'shared-lib';\n\n" +
      "@Component({\n" +
      "  imports: [SharedLibModule]\n" +
      "})\n" +
      "export class AppComponent {\n" +
      "  constructor(private logger: LoggerService) {}\n" +
      "}\n" +
      "```\n\n" +
      "**Build Library:**\n\n" +
      "```bash\n" +
      "# Build library\n" +
      "ng build shared-lib\n\n" +
      "# Output: dist/shared-lib/\n\n" +
      "# Publish to npm\n" +
      "cd dist/shared-lib\n" +
      "npm publish\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Code reusability\n" +
      "- Modular architecture\n" +
      "- Separate versioning\n" +
      "- Easier testing\n" +
      "- Team collaboration",
    category: "Workspace",
    difficulty: "intermediate",
    tags: ["workspace", "libraries", "monorepo", "architecture"],
  },
  {
    id: 75,
    question:
      "How do you implement Error Tracking and Monitoring in Angular? Explain Sentry integration.",
    answer:
      "**Global Error Handler:**\n\n" +
      "```typescript\n" +
      "import { ErrorHandler, Injectable } from '@angular/core';\n\n" +
      "@Injectable()\n" +
      "export class GlobalErrorHandler implements ErrorHandler {\n" +
      "  constructor(private loggingService: LoggingService) {}\n\n" +
      "  handleError(error: Error) {\n" +
      "    // Log to console\n" +
      "    console.error('Global error:', error);\n\n" +
      "    // Log to service\n" +
      "    this.loggingService.logError({\n" +
      "      message: error.message,\n" +
      "      stack: error.stack,\n" +
      "      timestamp: new Date(),\n" +
      "      userAgent: navigator.userAgent\n" +
      "    });\n\n" +
      "    // Show user-friendly message\n" +
      "    this.showErrorToast('Something went wrong. Please try again.');\n" +
      "  }\n" +
      "}\n\n" +
      "// Register\n" +
      "providers: [\n" +
      "  { provide: ErrorHandler, useClass: GlobalErrorHandler }\n" +
      "]\n" +
      "```\n\n" +
      "**Sentry Integration:**\n\n" +
      "```bash\n" +
      "npm install @sentry/angular @sentry/tracing\n" +
      "```\n\n" +
      "```typescript\n" +
      "// main.ts\n" +
      "import * as Sentry from '@sentry/angular';\n" +
      "import { BrowserTracing } from '@sentry/tracing';\n\n" +
      "Sentry.init({\n" +
      "  dsn: 'YOUR_SENTRY_DSN',\n" +
      "  integrations: [\n" +
      "    new BrowserTracing({\n" +
      "      tracingOrigins: ['localhost', 'https://yourserver.com'],\n" +
      "      routingInstrumentation: Sentry.routingInstrumentation\n" +
      "    })\n" +
      "  ],\n" +
      "  tracesSampleRate: 1.0,\n" +
      "  environment: environment.production ? 'production' : 'development'\n" +
      "});\n\n" +
      "// App config\n" +
      "import { APP_INITIALIZER, ErrorHandler } from '@angular/core';\n" +
      "import { Router } from '@angular/router';\n\n" +
      "providers: [\n" +
      "  {\n" +
      "    provide: ErrorHandler,\n" +
      "    useValue: Sentry.createErrorHandler({\n" +
      "      showDialog: false\n" +
      "    })\n" +
      "  },\n" +
      "  {\n" +
      "    provide: Sentry.TraceService,\n" +
      "    deps: [Router]\n" +
      "  },\n" +
      "  {\n" +
      "    provide: APP_INITIALIZER,\n" +
      "    useFactory: () => () => {},\n" +
      "    deps: [Sentry.TraceService],\n" +
      "    multi: true\n" +
      "  }\n" +
      "]\n" +
      "```\n\n" +
      "**Custom Logging:**\n\n" +
      "```typescript\n" +
      "import * as Sentry from '@sentry/angular';\n\n" +
      "// Capture exception\n" +
      "try {\n" +
      "  riskyOperation();\n" +
      "} catch (error) {\n" +
      "  Sentry.captureException(error);\n" +
      "}\n\n" +
      "// Log message\n" +
      "Sentry.captureMessage('User completed checkout', 'info');\n\n" +
      "// Add context\n" +
      "Sentry.setUser({ id: '123', email: 'user@example.com' });\n" +
      "Sentry.setContext('order', { orderId: '456', total: 99.99 });\n\n" +
      "// Breadcrumbs\n" +
      "Sentry.addBreadcrumb({\n" +
      "  category: 'navigation',\n" +
      "  message: 'User navigated to checkout',\n" +
      "  level: 'info'\n" +
      "});\n" +
      "```",
    category: "Monitoring",
    difficulty: "hard",
    tags: ["error-tracking", "sentry", "monitoring", "logging"],
  },
  {
    id: 76,
    question: "What is the Angular Compiler API? How do you use it programmatically?",
    answer:
      "The Compiler API allows programmatic compilation of Angular code.\n\n" +
      "**Use Cases:**\n" +
      "- Custom build tools\n" +
      "- Code generation\n" +
      "- Template compilation\n" +
      "- Dynamic module loading\n\n" +
      "**Basic Example:**\n\n" +
      "```typescript\n" +
      "import { Compiler, Component, NgModule } from '@angular/core';\n\n" +
      "@Component({\n" +
      "  selector: 'dynamic-comp',\n" +
      "  template: '<h1>{{ title }}</h1>'\n" +
      "})\n" +
      "class DynamicComponent {\n" +
      "  title = 'Dynamic!';\n" +
      "}\n\n" +
      "@NgModule({\n" +
      "  declarations: [DynamicComponent]\n" +
      "})\n" +
      "class DynamicModule {}\n\n" +
      "// Compile and load dynamically\n" +
      "export class AppComponent {\n" +
      "  constructor(\n" +
      "    private compiler: Compiler,\n" +
      "    private viewContainerRef: ViewContainerRef\n" +
      "  ) {}\n\n" +
      "  async loadDynamic() {\n" +
      "    const module = await this.compiler.compileModuleAsync(DynamicModule);\n" +
      "    const moduleRef = module.create(this.viewContainerRef.injector);\n" +
      "    const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(DynamicComponent);\n" +
      "    this.viewContainerRef.createComponent(factory);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Note:** With Ivy, dynamic compilation is less common. Use Angular Elements or Module Federation instead.",
    category: "Compiler",
    difficulty: "hard",
    tags: ["compiler", "api", "dynamic", "advanced"],
  },
  {
    id: 77,
    question: "How do you implement Feature Flags in Angular?",
    answer:
      "Feature flags enable/disable features without redeployment.\n\n" +
      "**Service Implementation:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class FeatureFlagService {\n" +
      "  private flags: Record<string, boolean> = {};\n\n" +
      "  constructor(private http: HttpClient) {}\n\n" +
      "  loadFlags(): Observable<void> {\n" +
      "    return this.http.get<Record<string, boolean>>('/api/feature-flags').pipe(\n" +
      "      tap(flags => this.flags = flags),\n" +
      "      map(() => undefined)\n" +
      "    );\n" +
      "  }\n\n" +
      "  isEnabled(flag: string): boolean {\n" +
      "    return this.flags[flag] === true;\n" +
      "  }\n" +
      "}\n\n" +
      "// Initialize in app\n" +
      "export const appInitializer = (featureService: FeatureFlagService) => {\n" +
      "  return () => featureService.loadFlags().toPromise();\n" +
      "};\n\n" +
      "providers: [\n" +
      "  {\n" +
      "    provide: APP_INITIALIZER,\n" +
      "    useFactory: appInitializer,\n" +
      "    deps: [FeatureFlagService],\n" +
      "    multi: true\n" +
      "  }\n" +
      "]\n" +
      "```\n\n" +
      "**Directive:**\n\n" +
      "```typescript\n" +
      "@Directive({\n" +
      "  selector: '[featureFlag]',\n" +
      "  standalone: true\n" +
      "})\n" +
      "export class FeatureFlagDirective implements OnInit {\n" +
      "  @Input() featureFlag: string;\n\n" +
      "  constructor(\n" +
      "    private templateRef: TemplateRef<any>,\n" +
      "    private viewContainer: ViewContainerRef,\n" +
      "    private featureService: FeatureFlagService\n" +
      "  ) {}\n\n" +
      "  ngOnInit() {\n" +
      "    if (this.featureService.isEnabled(this.featureFlag)) {\n" +
      "      this.viewContainer.createEmbeddedView(this.templateRef);\n" +
      "    } else {\n" +
      "      this.viewContainer.clear();\n" +
      "    }\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage\n" +
      "<div *featureFlag=\"'new-checkout'\">New checkout flow</div>\n" +
      "```\n\n" +
      "**Route Guard:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class FeatureFlagGuard implements CanActivate {\n" +
      "  constructor(private featureService: FeatureFlagService) {}\n\n" +
      "  canActivate(route: ActivatedRouteSnapshot): boolean {\n" +
      "    const flag = route.data['featureFlag'];\n" +
      "    return this.featureService.isEnabled(flag);\n" +
      "  }\n" +
      "}\n\n" +
      "// Route\n" +
      "{\n" +
      "  path: 'beta',\n" +
      "  component: BetaComponent,\n" +
      "  canActivate: [FeatureFlagGuard],\n" +
      "  data: { featureFlag: 'beta-features' }\n" +
      "}\n" +
      "```",
    category: "Patterns",
    difficulty: "intermediate",
    tags: ["feature-flags", "patterns", "deployment"],
  },
  {
    id: 78,
    question: "What is Angular's Hydration? How does it improve SSR performance?",
    answer:
      "Hydration reuses server-rendered DOM instead of re-rendering on client.\n\n" +
      "**Problem (Without Hydration):**\n\n" +
      "```typescript\n" +
      "// 1. Server renders HTML\n" +
      "// 2. Client receives HTML (displayed immediately)\n" +
      "// 3. Angular loads and RE-RENDERS everything (flicker!)\n" +
      "// 4. Event listeners attached\n" +
      "```\n\n" +
      "**Solution (With Hydration):**\n\n" +
      "```typescript\n" +
      "// 1. Server renders HTML + state\n" +
      "// 2. Client receives HTML (displayed)\n" +
      "// 3. Angular REUSES existing DOM (no re-render!)\n" +
      "// 4. Event listeners attached\n" +
      "```\n\n" +
      "**Enable Hydration:**\n\n" +
      "```typescript\n" +
      "// main.ts\n" +
      "import { provideClientHydration } from '@angular/platform-browser';\n\n" +
      "bootstrapApplication(AppComponent, {\n" +
      "  providers: [\n" +
      "    provideClientHydration() // Enable hydration!\n" +
      "  ]\n" +
      "});\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- No flicker on load\n" +
      "- Faster Time to Interactive (TTI)\n" +
      "- Better user experience\n" +
      "- Reduced bandwidth\n\n" +
      "**Available since:** Angular 16+",
    category: "SSR",
    difficulty: "hard",
    tags: ["hydration", "ssr", "performance", "angular-16"],
  },
  {
    id: 79,
    question: "What are Input/Output Transforms in Angular? How do you use them?",
    answer:
      "Input/Output transforms automatically convert values.\n\n" +
      "**Input Transforms (Angular 16+):**\n\n" +
      "```typescript\n" +
      "import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';\n\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  // Transform string to boolean\n" +
      "  @Input({ transform: booleanAttribute }) disabled: boolean = false;\n" +
      "  // <comp disabled></comp> → disabled = true\n" +
      "  // <comp></comp> → disabled = false\n\n" +
      "  // Transform string to number\n" +
      "  @Input({ transform: numberAttribute }) count: number = 0;\n" +
      '  // <comp count="5"></comp> → count = 5 (number)\n\n' +
      "  // Custom transform\n" +
      "  @Input({ transform: trimString }) name: string = '';\n" +
      "}\n\n" +
      "// Custom transform function\n" +
      "function trimString(value: string | undefined): string {\n" +
      "  return value?.trim() ?? '';\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Type safety\n" +
      "- Cleaner code\n" +
      "- Automatic conversion\n" +
      "- Less boilerplate",
    category: "Components",
    difficulty: "intermediate",
    tags: ["inputs", "transforms", "angular-16", "type-safety"],
  },
  {
    id: 80,
    question: "What is the Self-Documenting Code principle? How do you apply it in Angular?",
    answer:
      "Self-documenting code is clear without extensive comments.\n\n" +
      "**Naming Conventions:**\n\n" +
      "```typescript\n" +
      "// ❌ BAD\n" +
      "getUserData(id) {}\n" +
      "const d = new Date();\n\n" +
      "// ✅ GOOD\n" +
      "async fetchUserProfileById(userId: number): Promise<UserProfile> {}\n" +
      "const currentDate = new Date();\n" +
      "```\n\n" +
      "**Component Organization:**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class UserProfileComponent {\n" +
      "  // 1. Inputs/Outputs\n" +
      "  @Input() userId: number;\n" +
      "  @Output() profileUpdated = new EventEmitter<User>();\n\n" +
      "  // 2. Public properties\n" +
      "  user$: Observable<User>;\n" +
      "  isLoading = false;\n\n" +
      "  // 3. Private properties\n" +
      "  private destroy$ = new Subject<void>();\n\n" +
      "  // 4. Constructor\n" +
      "  constructor(private userService: UserService) {}\n\n" +
      "  // 5. Lifecycle hooks\n" +
      "  ngOnInit() {}\n" +
      "  ngOnDestroy() {}\n\n" +
      "  // 6. Public methods\n" +
      "  async saveProfile() {}\n\n" +
      "  // 7. Private methods\n" +
      "  private validateProfile() {}\n" +
      "}\n" +
      "```\n\n" +
      "**Use RxJS Declaratively:**\n\n" +
      "```typescript\n" +
      "// ✅ GOOD - Intent is clear\n" +
      "activeUsers$ = this.users$.pipe(\n" +
      "  map(users => users.filter(user => user.isActive)),\n" +
      "  shareReplay(1)\n" +
      ");\n" +
      "```",
    category: "Best Practices",
    difficulty: "intermediate",
    tags: ["clean-code", "best-practices", "naming", "organization"],
  },
  {
    id: 81,
    question:
      "What is NgRx Store Architecture? Explain the complete data flow from component to store and back.",
    answer:
      "NgRx implements Redux pattern with RxJS for Angular.\n\n" +
      "**Store Architecture Diagram:**\n\n" +
      "```typescript\n" +
      "Component → dispatch(Action) → Reducer → New State → Store → Selector → Component\n" +
      "                    ↓\n" +
      "                 Effect (side effects like HTTP)\n" +
      "                    ↓\n" +
      "             New Action → Reducer\n" +
      "```\n\n" +
      "**Complete Flow Example:**\n\n" +
      "```typescript\n" +
      "// 1. Component dispatches action\n" +
      "@Component({...})\n" +
      "export class UsersComponent {\n" +
      "  users$ = this.store.select(selectAllUsers);\n\n" +
      "  constructor(private store: Store) {}\n\n" +
      "  ngOnInit() {\n" +
      "    // Dispatch: Component → Store\n" +
      "    this.store.dispatch(loadUsers());\n" +
      "  }\n" +
      "}\n\n" +
      "// 2. Effect catches action, performs side effect\n" +
      "@Injectable()\n" +
      "export class UsersEffects {\n" +
      "  loadUsers$ = createEffect(() =>\n" +
      "    this.actions$.pipe(\n" +
      "      ofType(loadUsers),\n" +
      "      switchMap(() =>\n" +
      "        this.http.get<User[]>('/api/users').pipe(\n" +
      "          // Success: dispatch new action\n" +
      "          map(users => loadUsersSuccess({ users })),\n" +
      "          // Error: dispatch error action\n" +
      "          catchError(error => of(loadUsersFailure({ error })))\n" +
      "        )\n" +
      "      )\n" +
      "    )\n" +
      "  );\n\n" +
      "  constructor(private actions$: Actions, private http: HttpClient) {}\n" +
      "}\n\n" +
      "// 3. Reducer updates state\n" +
      "export const usersReducer = createReducer(\n" +
      "  initialState,\n" +
      "  on(loadUsers, state => ({ ...state, loading: true })),\n" +
      "  on(loadUsersSuccess, (state, { users }) => ({\n" +
      "    ...state,\n" +
      "    users,\n" +
      "    loading: false,\n" +
      "    error: null\n" +
      "  }))\n" +
      ");\n\n" +
      "// 4. Selector retrieves data\n" +
      "export const selectAllUsers = createSelector(\n" +
      "  selectUsersState,\n" +
      "  state => state.users\n" +
      ");\n\n" +
      "// 5. Component receives update via observable\n" +
      "// users$ automatically updates when store changes\n" +
      "```\n\n" +
      "**Key Principles:**\n" +
      "1. Single source of truth (Store)\n" +
      "2. State is read-only (immutable)\n" +
      "3. Changes via pure functions (Reducers)\n" +
      "4. Side effects isolated (Effects)\n" +
      "5. Predictable state updates",
    category: "NgRx Architecture",
    difficulty: "hard",
    tags: ["ngrx", "store", "architecture", "redux", "state-management"],
  },
  {
    id: 82,
    question:
      "What are NgRx Actions and Action Creators? Explain props, createAction, and action groups.",
    answer:
      "Actions are events that trigger state changes.\n\n" +
      "**Basic Actions:**\n\n" +
      "```typescript\n" +
      "import { createAction, props } from '@ngrx/store';\n\n" +
      "// Simple action (no payload)\n" +
      "export const increment = createAction('[Counter] Increment');\n" +
      "export const decrement = createAction('[Counter] Decrement');\n" +
      "export const reset = createAction('[Counter] Reset');\n\n" +
      "// Action with payload\n" +
      "export const setCount = createAction(\n" +
      "  '[Counter] Set Count',\n" +
      "  props<{ count: number }>()\n" +
      ");\n\n" +
      "// Dispatch\n" +
      "this.store.dispatch(increment());\n" +
      "this.store.dispatch(setCount({ count: 10 }));\n" +
      "```\n\n" +
      "**Action Groups (Organized):**\n\n" +
      "```typescript\n" +
      "import { createActionGroup, props, emptyProps } from '@ngrx/store';\n\n" +
      "// Group related actions\n" +
      "export const UsersActions = createActionGroup({\n" +
      "  source: 'Users',\n" +
      "  events: {\n" +
      "    // Auto-generates: [Users] Load Users\n" +
      "    'Load Users': emptyProps(),\n" +
      "    \n" +
      "    // Auto-generates: [Users] Load Users Success\n" +
      "    'Load Users Success': props<{ users: User[] }>(),\n" +
      "    \n" +
      "    'Load Users Failure': props<{ error: string }>(),\n" +
      "    'Add User': props<{ user: User }>(),\n" +
      "    'Update User': props<{ id: number; changes: Partial<User> }>(),\n" +
      "    'Delete User': props<{ id: number }>()\n" +
      "  }\n" +
      "});\n\n" +
      "// Usage\n" +
      "this.store.dispatch(UsersActions.loadUsers());\n" +
      "this.store.dispatch(UsersActions.addUser({ user: newUser }));\n" +
      "```\n\n" +
      "**Action Naming Convention:**\n\n" +
      "```typescript\n" +
      "// Pattern: [Source] Event\n" +
      "[Users Page] Load Users\n" +
      "[Users API] Load Users Success\n" +
      "[Users API] Load Users Failure\n" +
      "[Login Page] Login\n" +
      "[Auth API] Login Success\n" +
      "[Auth Guard] Logout\n\n" +
      "// Good naming:\n" +
      "export const loginSuccess = createAction(\n" +
      "  '[Auth API] Login Success',\n" +
      "  props<{ user: User; token: string }>()\n" +
      ");\n\n" +
      "// Bad naming:\n" +
      "export const login = createAction('login'); // No source!\n" +
      "```\n\n" +
      "**Multiple Props:**\n\n" +
      "```typescript\n" +
      "export const updateUser = createAction(\n" +
      "  '[Users] Update User',\n" +
      "  props<{ id: number; name: string; email: string }>()\n" +
      ");\n\n" +
      "// Or use interface\n" +
      "export interface UpdateUserProps {\n" +
      "  id: number;\n" +
      "  changes: Partial<User>;\n" +
      "}\n\n" +
      "export const updateUser = createAction(\n" +
      "  '[Users] Update User',\n" +
      "  props<UpdateUserProps>()\n" +
      ");\n" +
      "```",
    category: "NgRx Actions",
    difficulty: "hard",
    tags: ["ngrx", "actions", "action-creators", "action-groups"],
  },
  {
    id: 83,
    question: "What are NgRx Reducers? Explain pure functions, immutability, and on() handlers.",
    answer:
      "Reducers are pure functions that transform state based on actions.\n\n" +
      "**Basic Reducer:**\n\n" +
      "```typescript\n" +
      "import { createReducer, on } from '@ngrx/store';\n\n" +
      "export interface CounterState {\n" +
      "  count: number;\n" +
      "  lastUpdated: Date | null;\n" +
      "}\n\n" +
      "const initialState: CounterState = {\n" +
      "  count: 0,\n" +
      "  lastUpdated: null\n" +
      "};\n\n" +
      "export const counterReducer = createReducer(\n" +
      "  initialState,\n" +
      "  // Handle increment\n" +
      "  on(increment, state => ({\n" +
      "    ...state,\n" +
      "    count: state.count + 1,\n" +
      "    lastUpdated: new Date()\n" +
      "  })),\n" +
      "  // Handle decrement\n" +
      "  on(decrement, state => ({\n" +
      "    ...state,\n" +
      "    count: state.count - 1,\n" +
      "    lastUpdated: new Date()\n" +
      "  })),\n" +
      "  // Handle set with payload\n" +
      "  on(setCount, (state, { count }) => ({\n" +
      "    ...state,\n" +
      "    count,\n" +
      "    lastUpdated: new Date()\n" +
      "  })),\n" +
      "  // Handle reset\n" +
      "  on(reset, state => initialState)\n" +
      ");\n" +
      "```\n\n" +
      "**Multiple Actions, Same Handler:**\n\n" +
      "```typescript\n" +
      "// Handle multiple actions with same logic\n" +
      "on(\n" +
      "  loadUsers,\n" +
      "  refreshUsers,\n" +
      "  state => ({ ...state, loading: true })\n" +
      ")\n" +
      "```\n\n" +
      "**Complex State Update:**\n\n" +
      "```typescript\n" +
      "export interface UsersState {\n" +
      "  entities: { [id: number]: User };\n" +
      "  ids: number[];\n" +
      "  selectedUserId: number | null;\n" +
      "  loading: boolean;\n" +
      "  error: string | null;\n" +
      "}\n\n" +
      "export const usersReducer = createReducer(\n" +
      "  initialState,\n" +
      "  // Load users success\n" +
      "  on(loadUsersSuccess, (state, { users }) => {\n" +
      "    const entities = users.reduce((acc, user) => ({\n" +
      "      ...acc,\n" +
      "      [user.id]: user\n" +
      "    }), {});\n" +
      "    const ids = users.map(u => u.id);\n\n" +
      "    return {\n" +
      "      ...state,\n" +
      "      entities,\n" +
      "      ids,\n" +
      "      loading: false,\n" +
      "      error: null\n" +
      "    };\n" +
      "  }),\n" +
      "  // Update user\n" +
      "  on(updateUserSuccess, (state, { user }) => ({\n" +
      "    ...state,\n" +
      "    entities: {\n" +
      "      ...state.entities,\n" +
      "      [user.id]: user\n" +
      "    }\n" +
      "  })),\n" +
      "  // Delete user\n" +
      "  on(deleteUserSuccess, (state, { id }) => {\n" +
      "    const { [id]: removed, ...entities } = state.entities;\n" +
      "    return {\n" +
      "      ...state,\n" +
      "      entities,\n" +
      "      ids: state.ids.filter(i => i !== id)\n" +
      "    };\n" +
      "  })\n" +
      ");\n" +
      "```\n\n" +
      "**Reducer Rules:**\n" +
      "1. Pure functions (no side effects)\n" +
      "2. Immutable updates (spread operator)\n" +
      "3. Return new state object\n" +
      "4. No API calls, no mutations\n" +
      "5. Synchronous only",
    category: "NgRx Reducers",
    difficulty: "hard",
    tags: ["ngrx", "reducers", "pure-functions", "immutability"],
  },
  {
    id: 84,
    question:
      "What are NgRx Effects? Explain how to handle HTTP calls, errors, and chained effects.",
    answer:
      "Effects handle side effects (HTTP, localStorage, etc.) outside reducers.\n\n" +
      "**Basic Effect:**\n\n" +
      "```typescript\n" +
      "import { Injectable } from '@angular/core';\n" +
      "import { Actions, createEffect, ofType } from '@ngrx/effects';\n" +
      "import { of } from 'rxjs';\n" +
      "import { map, catchError, switchMap, tap } from 'rxjs/operators';\n\n" +
      "@Injectable()\n" +
      "export class UsersEffects {\n" +
      "  // Load users effect\n" +
      "  loadUsers$ = createEffect(() =>\n" +
      "    this.actions$.pipe(\n" +
      "      ofType(UsersActions.loadUsers),\n" +
      "      switchMap(() =>\n" +
      "        this.http.get<User[]>('/api/users').pipe(\n" +
      "          map(users => UsersActions.loadUsersSuccess({ users })),\n" +
      "          catchError(error =>\n" +
      "            of(UsersActions.loadUsersFailure({ error: error.message }))\n" +
      "          )\n" +
      "        )\n" +
      "      )\n" +
      "    )\n" +
      "  );\n\n" +
      "  constructor(\n" +
      "    private actions$: Actions,\n" +
      "    private http: HttpClient\n" +
      "  ) {}\n" +
      "}\n" +
      "```\n\n" +
      "**Create/Update/Delete Effects:**\n\n" +
      "```typescript\n" +
      "@Injectable()\n" +
      "export class UsersEffects {\n" +
      "  // Create\n" +
      "  createUser$ = createEffect(() =>\n" +
      "    this.actions$.pipe(\n" +
      "      ofType(UsersActions.addUser),\n" +
      "      switchMap(({ user }) =>\n" +
      "        this.http.post<User>('/api/users', user).pipe(\n" +
      "          map(newUser => UsersActions.addUserSuccess({ user: newUser })),\n" +
      "          catchError(error => of(UsersActions.addUserFailure({ error })))\n" +
      "        )\n" +
      "      )\n" +
      "    )\n" +
      "  );\n\n" +
      "  // Update\n" +
      "  updateUser$ = createEffect(() =>\n" +
      "    this.actions$.pipe(\n" +
      "      ofType(UsersActions.updateUser),\n" +
      "      switchMap(({ id, changes }) =>\n" +
      "        this.http.put<User>(`/api/users/${id}`, changes).pipe(\n" +
      "          map(user => UsersActions.updateUserSuccess({ user })),\n" +
      "          catchError(error => of(UsersActions.updateUserFailure({ error })))\n" +
      "        )\n" +
      "      )\n" +
      "    )\n" +
      "  );\n\n" +
      "  // Delete\n" +
      "  deleteUser$ = createEffect(() =>\n" +
      "    this.actions$.pipe(\n" +
      "      ofType(UsersActions.deleteUser),\n" +
      "      switchMap(({ id }) =>\n" +
      "        this.http.delete(`/api/users/${id}`).pipe(\n" +
      "          map(() => UsersActions.deleteUserSuccess({ id })),\n" +
      "          catchError(error => of(UsersActions.deleteUserFailure({ error })))\n" +
      "        )\n" +
      "      )\n" +
      "    )\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Non-Dispatching Effect (Side Effects Only):**\n\n" +
      "```typescript\n" +
      "// Show toast on success\n" +
      "showSuccessToast$ = createEffect(\n" +
      "  () =>\n" +
      "    this.actions$.pipe(\n" +
      "      ofType(UsersActions.addUserSuccess),\n" +
      "      tap(() => this.toastService.success('User added!'))\n" +
      "    ),\n" +
      "  { dispatch: false } // Don't dispatch new action\n" +
      ");\n\n" +
      "// Save to localStorage\n" +
      "saveToLocalStorage$ = createEffect(\n" +
      "  () =>\n" +
      "    this.actions$.pipe(\n" +
      "      ofType(UsersActions.loadUsersSuccess),\n" +
      "      tap(({ users }) => localStorage.setItem('users', JSON.stringify(users)))\n" +
      "    ),\n" +
      "  { dispatch: false }\n" +
      ");\n" +
      "```\n\n" +
      "**Chained Effects:**\n\n" +
      "```typescript\n" +
      "// After login success, load user profile\n" +
      "loadProfileAfterLogin$ = createEffect(() =>\n" +
      "  this.actions$.pipe(\n" +
      "    ofType(AuthActions.loginSuccess),\n" +
      "    map(({ userId }) => ProfileActions.loadProfile({ userId }))\n" +
      "  )\n" +
      ");\n" +
      "```",
    category: "NgRx Effects",
    difficulty: "hard",
    tags: ["ngrx", "effects", "side-effects", "http", "rxjs"],
  },
  {
    id: 85,
    question:
      "What are NgRx Selectors? Explain createSelector, memoization, and selector composition.",
    answer:
      "Selectors efficiently retrieve and derive data from the store.\n\n" +
      "**Basic Selectors:**\n\n" +
      "```typescript\n" +
      "import { createFeatureSelector, createSelector } from '@ngrx/store';\n\n" +
      "// Feature selector\n" +
      "export const selectUsersState = createFeatureSelector<UsersState>('users');\n\n" +
      "// Property selectors\n" +
      "export const selectAllUsers = createSelector(\n" +
      "  selectUsersState,\n" +
      "  state => state.users\n" +
      ");\n\n" +
      "export const selectLoading = createSelector(\n" +
      "  selectUsersState,\n" +
      "  state => state.loading\n" +
      ");\n\n" +
      "export const selectError = createSelector(\n" +
      "  selectUsersState,\n" +
      "  state => state.error\n" +
      ");\n" +
      "```\n\n" +
      "**Composed Selectors (Memoized):**\n\n" +
      "```typescript\n" +
      "// Derive data from other selectors\n" +
      "export const selectActiveUsers = createSelector(\n" +
      "  selectAllUsers,\n" +
      "  users => users.filter(u => u.active)\n" +
      ");\n\n" +
      "export const selectUserCount = createSelector(\n" +
      "  selectAllUsers,\n" +
      "  users => users.length\n" +
      ");\n\n" +
      "export const selectActiveUserCount = createSelector(\n" +
      "  selectActiveUsers,\n" +
      "  activeUsers => activeUsers.length\n" +
      ");\n\n" +
      "// Multi-selector composition\n" +
      "export const selectUserStats = createSelector(\n" +
      "  selectUserCount,\n" +
      "  selectActiveUserCount,\n" +
      "  (total, active) => ({\n" +
      "    total,\n" +
      "    active,\n" +
      "    inactive: total - active\n" +
      "  })\n" +
      ");\n" +
      "```\n\n" +
      "**Selectors with Parameters:**\n\n" +
      "```typescript\n" +
      "// Select user by ID\n" +
      "export const selectUserById = (id: number) => createSelector(\n" +
      "  selectAllUsers,\n" +
      "  users => users.find(u => u.id === id)\n" +
      ");\n\n" +
      "// Usage in component\n" +
      "user$ = this.store.select(selectUserById(5));\n\n" +
      "// Or dynamically\n" +
      "this.route.params.pipe(\n" +
      "  switchMap(params => this.store.select(selectUserById(+params.id)))\n" +
      ").subscribe(user => this.user = user);\n" +
      "```\n\n" +
      "**Memoization (Performance):**\n\n" +
      "```typescript\n" +
      "// Selector only recalculates if input changes\n" +
      "export const selectExpensiveComputation = createSelector(\n" +
      "  selectAllUsers,\n" +
      "  users => {\n" +
      "    console.log('Computing...'); // Only runs when users change\n" +
      "    return users.map(u => expensiveTransform(u));\n" +
      "  }\n" +
      ");\n\n" +
      "// Multiple subscriptions share same computation\n" +
      "this.data1$ = this.store.select(selectExpensiveComputation);\n" +
      "this.data2$ = this.store.select(selectExpensiveComputation);\n" +
      "// Computation runs ONCE, both get same result\n" +
      "```",
    category: "NgRx Selectors",
    difficulty: "hard",
    tags: ["ngrx", "selectors", "memoization", "performance"],
  },
  {
    id: 86,
    question:
      "How do you implement Authentication with NgRx? Show complete auth flow with JWT, guards, and interceptors.",
    answer:
      "**Complete NgRx Auth Implementation:**\n\n" +
      "**1. Auth State:**\n\n" +
      "```typescript\n" +
      "// auth.state.ts\n" +
      "export interface AuthState {\n" +
      "  user: User | null;\n" +
      "  token: string | null;\n" +
      "  loading: boolean;\n" +
      "  error: string | null;\n" +
      "}\n" +
      "```\n\n" +
      "**2. Auth Actions:**\n\n" +
      "```typescript\n" +
      "// auth.actions.ts\n" +
      "export const AuthActions = createActionGroup({\n" +
      "  source: 'Auth',\n" +
      "  events: {\n" +
      "    Login: props<{ email: string; password: string }>(),\n" +
      "    'Login Success': props<{ user: User; token: string }>(),\n" +
      "    'Login Failure': props<{ error: string }>(),\n" +
      "    Logout: emptyProps(),\n" +
      "    'Check Auth': emptyProps()\n" +
      "  }\n" +
      "});\n" +
      "```\n\n" +
      "**3. Auth Reducer:**\n\n" +
      "```typescript\n" +
      "// auth.reducer.ts\n" +
      "export const authReducer = createReducer(\n" +
      "  initialState,\n" +
      "  on(AuthActions.login, state => ({\n" +
      "    ...state,\n" +
      "    loading: true,\n" +
      "    error: null\n" +
      "  })),\n" +
      "  on(AuthActions.loginSuccess, (state, { user, token }) => ({\n" +
      "    ...state,\n" +
      "    user,\n" +
      "    token,\n" +
      "    loading: false,\n" +
      "    error: null\n" +
      "  })),\n" +
      "  on(AuthActions.logout, () => initialState)\n" +
      ");\n" +
      "```\n\n" +
      "**4. Auth Effects:**\n\n" +
      "```typescript\n" +
      "// auth.effects.ts\n" +
      "@Injectable()\n" +
      "export class AuthEffects {\n" +
      "  login$ = createEffect(() =>\n" +
      "    this.actions$.pipe(\n" +
      "      ofType(AuthActions.login),\n" +
      "      switchMap(({ email, password }) =>\n" +
      "        this.http.post<{ user: User; token: string }>('/api/login', { email, password }).pipe(\n" +
      "          map(response => AuthActions.loginSuccess(response)),\n" +
      "          catchError(error => of(AuthActions.loginFailure({ error: error.message })))\n" +
      "        )\n" +
      "      )\n" +
      "    )\n" +
      "  );\n\n" +
      "  // Save token to localStorage\n" +
      "  saveToken$ = createEffect(\n" +
      "    () =>\n" +
      "      this.actions$.pipe(\n" +
      "        ofType(AuthActions.loginSuccess),\n" +
      "        tap(({ token }) => localStorage.setItem('token', token))\n" +
      "      ),\n" +
      "    { dispatch: false }\n" +
      "  );\n\n" +
      "  // Navigate after login\n" +
      "  navigateAfterLogin$ = createEffect(\n" +
      "    () =>\n" +
      "      this.actions$.pipe(\n" +
      "        ofType(AuthActions.loginSuccess),\n" +
      "        tap(() => this.router.navigate(['/dashboard']))\n" +
      "      ),\n" +
      "    { dispatch: false }\n" +
      "  );\n\n" +
      "  // Clear token on logout\n" +
      "  logout$ = createEffect(\n" +
      "    () =>\n" +
      "      this.actions$.pipe(\n" +
      "        ofType(AuthActions.logout),\n" +
      "        tap(() => {\n" +
      "          localStorage.removeItem('token');\n" +
      "          this.router.navigate(['/login']);\n" +
      "        })\n" +
      "      ),\n" +
      "    { dispatch: false }\n" +
      "  );\n\n" +
      "  constructor(\n" +
      "    private actions$: Actions,\n" +
      "    private http: HttpClient,\n" +
      "    private router: Router\n" +
      "  ) {}\n" +
      "}\n" +
      "```\n\n" +
      "**5. Auth Selectors:**\n\n" +
      "```typescript\n" +
      "// auth.selectors.ts\n" +
      "export const selectAuthState = createFeatureSelector<AuthState>('auth');\n\n" +
      "export const selectUser = createSelector(\n" +
      "  selectAuthState,\n" +
      "  state => state.user\n" +
      ");\n\n" +
      "export const selectToken = createSelector(\n" +
      "  selectAuthState,\n" +
      "  state => state.token\n" +
      ");\n\n" +
      "export const selectIsAuthenticated = createSelector(\n" +
      "  selectUser,\n" +
      "  user => !!user\n" +
      ");\n\n" +
      "export const selectIsAdmin = createSelector(\n" +
      "  selectUser,\n" +
      "  user => user?.role === 'admin'\n" +
      ");\n" +
      "```\n\n" +
      "**6. Auth Guard:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class AuthGuard implements CanActivate {\n" +
      "  constructor(private store: Store, private router: Router) {}\n\n" +
      "  canActivate(): Observable<boolean> {\n" +
      "    return this.store.select(selectIsAuthenticated).pipe(\n" +
      "      take(1),\n" +
      "      map(isAuth => {\n" +
      "        if (!isAuth) {\n" +
      "          this.router.navigate(['/login']);\n" +
      "          return false;\n" +
      "        }\n" +
      "        return true;\n" +
      "      })\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**7. Auth Interceptor:**\n\n" +
      "```typescript\n" +
      "export const authInterceptor: HttpInterceptorFn = (req, next) => {\n" +
      "  const store = inject(Store);\n" +
      "  let token: string | null = null;\n\n" +
      "  store.select(selectToken).pipe(take(1)).subscribe(t => token = t);\n\n" +
      "  if (token) {\n" +
      "    req = req.clone({\n" +
      "      setHeaders: { Authorization: `Bearer ${token}` }\n" +
      "    });\n" +
      "  }\n\n" +
      "  return next(req);\n" +
      "};\n" +
      "```",
    category: "NgRx Authentication",
    difficulty: "hard",
    tags: ["ngrx", "authentication", "jwt", "guards", "interceptors"],
  },
  {
    id: 87,
    question: "What is NgRx Entity? Explain EntityAdapter and how it simplifies entity management.",
    answer:
      "NgRx Entity provides utilities for managing entity collections.\n\n" +
      "**Setup with Entity:**\n\n" +
      "```typescript\n" +
      "import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';\n\n" +
      "export interface User {\n" +
      "  id: number;\n" +
      "  name: string;\n" +
      "  email: string;\n" +
      "}\n\n" +
      "// Entity state includes: ids[], entities{}\n" +
      "export interface UsersState extends EntityState<User> {\n" +
      "  selectedUserId: number | null;\n" +
      "  loading: boolean;\n" +
      "  error: string | null;\n" +
      "}\n\n" +
      "// Create adapter\n" +
      "export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({\n" +
      "  selectId: (user: User) => user.id, // Default: entity.id\n" +
      "  sortComparer: (a, b) => a.name.localeCompare(b.name) // Optional sorting\n" +
      "});\n\n" +
      "// Initial state\n" +
      "export const initialState: UsersState = usersAdapter.getInitialState({\n" +
      "  selectedUserId: null,\n" +
      "  loading: false,\n" +
      "  error: null\n" +
      "});\n" +
      "```\n\n" +
      "**Reducer with Entity Methods:**\n\n" +
      "```typescript\n" +
      "export const usersReducer = createReducer(\n" +
      "  initialState,\n" +
      "  // Load all users\n" +
      "  on(UsersActions.loadUsersSuccess, (state, { users }) =>\n" +
      "    usersAdapter.setAll(users, { ...state, loading: false })\n" +
      "  ),\n" +
      "  // Add one\n" +
      "  on(UsersActions.addUserSuccess, (state, { user }) =>\n" +
      "    usersAdapter.addOne(user, state)\n" +
      "  ),\n" +
      "  // Add many\n" +
      "  on(UsersActions.addUsersSuccess, (state, { users }) =>\n" +
      "    usersAdapter.addMany(users, state)\n" +
      "  ),\n" +
      "  // Update one\n" +
      "  on(UsersActions.updateUserSuccess, (state, { user }) =>\n" +
      "    usersAdapter.updateOne({ id: user.id, changes: user }, state)\n" +
      "  ),\n" +
      "  // Update many\n" +
      "  on(UsersActions.updateUsersSuccess, (state, { users }) =>\n" +
      "    usersAdapter.updateMany(\n" +
      "      users.map(u => ({ id: u.id, changes: u })),\n" +
      "      state\n" +
      "    )\n" +
      "  ),\n" +
      "  // Upsert (update if exists, add if not)\n" +
      "  on(UsersActions.upsertUser, (state, { user }) =>\n" +
      "    usersAdapter.upsertOne(user, state)\n" +
      "  ),\n" +
      "  // Delete one\n" +
      "  on(UsersActions.deleteUserSuccess, (state, { id }) =>\n" +
      "    usersAdapter.removeOne(id, state)\n" +
      "  ),\n" +
      "  // Delete many\n" +
      "  on(UsersActions.deleteUsersSuccess, (state, { ids }) =>\n" +
      "    usersAdapter.removeMany(ids, state)\n" +
      "  ),\n" +
      "  // Clear all\n" +
      "  on(UsersActions.clearUsers, state =>\n" +
      "    usersAdapter.removeAll({ ...state, selectedUserId: null })\n" +
      "  )\n" +
      ");\n" +
      "```\n\n" +
      "**Entity Selectors:**\n\n" +
      "```typescript\n" +
      "// Get entity selectors from adapter\n" +
      "const { selectIds, selectEntities, selectAll, selectTotal } = usersAdapter.getSelectors();\n\n" +
      "export const selectUsersState = createFeatureSelector<UsersState>('users');\n\n" +
      "// Apply selectors to feature state\n" +
      "export const selectAllUsers = createSelector(selectUsersState, selectAll);\n" +
      "export const selectUserEntities = createSelector(selectUsersState, selectEntities);\n" +
      "export const selectUserIds = createSelector(selectUsersState, selectIds);\n" +
      "export const selectUserTotal = createSelector(selectUsersState, selectTotal);\n\n" +
      "// Custom selector\n" +
      "export const selectUserById = (id: number) => createSelector(\n" +
      "  selectUserEntities,\n" +
      "  entities => entities[id]\n" +
      ");\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Less boilerplate\n" +
      "- Built-in CRUD operations\n" +
      "- Optimized performance\n" +
      "- Normalized state structure",
    category: "NgRx Entity",
    difficulty: "hard",
    tags: ["ngrx", "entity", "entity-adapter", "crud", "normalization"],
  },
  {
    id: 88,
    question: "What are NgRx DevTools? Explain Time-Travelling Debugger and how to use it.",
    answer:
      "NgRx DevTools provide powerful debugging capabilities.\n\n" +
      "**Setup:**\n\n" +
      "```bash\n" +
      "npm install @ngrx/store-devtools\n" +
      "```\n\n" +
      "**Configuration:**\n\n" +
      "```typescript\n" +
      "import { provideStoreDevtools } from '@ngrx/store-devtools';\n\n" +
      "bootstrapApplication(AppComponent, {\n" +
      "  providers: [\n" +
      "    provideStore({ users: usersReducer }),\n" +
      "    provideStoreDevtools({\n" +
      "      maxAge: 25, // Retain last 25 states\n" +
      "      logOnly: environment.production, // Restrict in prod\n" +
      "      autoPause: true, // Pause when window loses focus\n" +
      "      trace: true, // Include stack trace\n" +
      "      traceLimit: 75 // Max stack trace frames\n" +
      "    })\n" +
      "  ]\n" +
      "});\n" +
      "```\n\n" +
      "**Time-Travelling Debugger Features:**\n\n" +
      "```typescript\n" +
      "// Chrome DevTools → Redux tab\n\n" +
      "1. **Action History**\n" +
      "   - See all dispatched actions\n" +
      "   - View action payloads\n" +
      "   - Jump to any action\n\n" +
      "2. **State Inspection**\n" +
      "   - View current state\n" +
      "   - See state at any point in time\n" +
      "   - Diff between states\n\n" +
      "3. **Time Travel**\n" +
      "   - Jump to previous state\n" +
      "   - Skip actions\n" +
      "   - Replay actions\n\n" +
      "4. **Export/Import**\n" +
      "   - Export state snapshot\n" +
      "   - Import saved state\n" +
      "   - Share debugging scenarios\n\n" +
      "5. **Action Filtering**\n" +
      "   - Filter by action type\n" +
      "   - Search actions\n" +
      "   - Ignore specific actions\n" +
      "```\n\n" +
      "**Custom Action Sanitization:**\n\n" +
      "```typescript\n" +
      "provideStoreDevtools({\n" +
      "  actionSanitizer: (action, id) => {\n" +
      "    // Hide sensitive data\n" +
      "    if (action.type === '[Auth] Login') {\n" +
      "      return {\n" +
      "        ...action,\n" +
      "        password: '***HIDDEN***'\n" +
      "      };\n" +
      "    }\n" +
      "    return action;\n" +
      "  },\n" +
      "  stateSanitizer: (state, index) => {\n" +
      "    // Hide sensitive state\n" +
      "    return {\n" +
      "      ...state,\n" +
      "      auth: {\n" +
      "        ...state.auth,\n" +
      "        token: state.auth.token ? '***TOKEN***' : null\n" +
      "      }\n" +
      "    };\n" +
      "  }\n" +
      "})\n" +
      "```\n\n" +
      "**Debugging Workflow:**\n\n" +
      "```typescript\n" +
      "1. Open Redux DevTools in Chrome\n" +
      "2. Dispatch actions in your app\n" +
      "3. See actions appear in timeline\n" +
      "4. Click action to see:\n" +
      "   - Action payload\n" +
      "   - State before\n" +
      "   - State after\n" +
      "   - Diff\n" +
      "5. Use slider to time-travel through states\n" +
      "6. Export state to reproduce bugs\n" +
      "```",
    category: "NgRx DevTools",
    difficulty: "intermediate",
    tags: ["ngrx", "devtools", "debugging", "time-travel"],
  },
  {
    id: 89,
    question:
      "What are NgRx Runtime Checks? Explain store immutability, action serializability, and strict action checks.",
    answer:
      "Runtime checks enforce NgRx best practices during development.\n\n" +
      "**Enable Runtime Checks:**\n\n" +
      "```typescript\n" +
      "import { provideStore } from '@ngrx/store';\n\n" +
      "bootstrapApplication(AppComponent, {\n" +
      "  providers: [\n" +
      "    provideStore(\n" +
      "      { users: usersReducer },\n" +
      "      {\n" +
      "        runtimeChecks: {\n" +
      "          strictStateImmutability: true,\n" +
      "          strictActionImmutability: true,\n" +
      "          strictStateSerializability: true,\n" +
      "          strictActionSerializability: true,\n" +
      "          strictActionWithinNgZone: true,\n" +
      "          strictActionTypeUniqueness: true\n" +
      "        }\n" +
      "      }\n" +
      "    )\n" +
      "  ]\n" +
      "});\n" +
      "```\n\n" +
      "**1. State Immutability Check:**\n\n" +
      "```typescript\n" +
      "// ❌ BAD - Mutation detected!\n" +
      "on(updateUser, (state, { user }) => {\n" +
      "  state.users.push(user); // ERROR: Mutating state!\n" +
      "  return state;\n" +
      "})\n\n" +
      "// ✅ GOOD - Immutable update\n" +
      "on(updateUser, (state, { user }) => ({\n" +
      "  ...state,\n" +
      "  users: [...state.users, user]\n" +
      "}))\n" +
      "```\n\n" +
      "**2. Action Immutability Check:**\n\n" +
      "```typescript\n" +
      "// ❌ BAD - Modifying action\n" +
      "myEffect$ = createEffect(() =>\n" +
      "  this.actions$.pipe(\n" +
      "    ofType(someAction),\n" +
      "    tap(action => {\n" +
      "      action.timestamp = Date.now(); // ERROR: Mutating action!\n" +
      "    })\n" +
      "  )\n" +
      ");\n\n" +
      "// ✅ GOOD - Create new action\n" +
      "myEffect$ = createEffect(() =>\n" +
      "  this.actions$.pipe(\n" +
      "    ofType(someAction),\n" +
      "    map(action => newAction({ ...action.payload, timestamp: Date.now() }))\n" +
      "  )\n" +
      ");\n" +
      "```\n\n" +
      "**3. Serializability Check:**\n\n" +
      "```typescript\n" +
      "// ❌ BAD - Non-serializable in state\n" +
      "export interface AppState {\n" +
      "  date: Date; // ERROR: Dates not serializable\n" +
      "  callback: Function; // ERROR: Functions not serializable\n" +
      "  component: ComponentRef; // ERROR: Complex objects\n" +
      "}\n\n" +
      "// ✅ GOOD - Serializable types only\n" +
      "export interface AppState {\n" +
      "  dateString: string; // Use ISO string\n" +
      "  userId: number; // Primitive types\n" +
      "  settings: { theme: string }; // Plain objects\n" +
      "}\n" +
      "```\n\n" +
      "**4. Action Type Uniqueness:**\n\n" +
      "```typescript\n" +
      "// ❌ BAD - Duplicate action types\n" +
      "export const load = createAction('[Users] Load');\n" +
      "export const load2 = createAction('[Users] Load'); // ERROR: Duplicate!\n\n" +
      "// ✅ GOOD - Unique types\n" +
      "export const loadUsers = createAction('[Users Page] Load');\n" +
      "export const loadUsersFromCache = createAction('[Users Cache] Load');\n" +
      "```\n\n" +
      "**Disable Checks in Production:**\n\n" +
      "```typescript\n" +
      "provideStore(\n" +
      "  reducers,\n" +
      "  {\n" +
      "    runtimeChecks: {\n" +
      "      strictStateImmutability: !environment.production,\n" +
      "      strictActionImmutability: !environment.production\n" +
      "    }\n" +
      "  }\n" +
      ")\n" +
      "```",
    category: "NgRx Runtime Checks",
    difficulty: "hard",
    tags: ["ngrx", "runtime-checks", "immutability", "serializability"],
  },
  {
    id: 90,
    question: "What is NgRx Router Store? How do you connect routing to NgRx state?",
    answer:
      "Router Store syncs Angular Router state with NgRx Store.\n\n" +
      "**Setup:**\n\n" +
      "```bash\n" +
      "npm install @ngrx/router-store\n" +
      "```\n\n" +
      "**Configuration:**\n\n" +
      "```typescript\n" +
      "import { provideRouterStore, routerReducer } from '@ngrx/router-store';\n\n" +
      "bootstrapApplication(AppComponent, {\n" +
      "  providers: [\n" +
      "    provideStore({\n" +
      "      router: routerReducer // Add router reducer\n" +
      "    }),\n" +
      "    provideRouterStore() // Connect router to store\n" +
      "  ]\n" +
      "});\n" +
      "```\n\n" +
      "**Custom Router State Serializer:**\n\n" +
      "```typescript\n" +
      "import { RouterStateSerializer } from '@ngrx/router-store';\n" +
      "import { RouterStateSnapshot } from '@angular/router';\n\n" +
      "export interface RouterStateUrl {\n" +
      "  url: string;\n" +
      "  params: any;\n" +
      "  queryParams: any;\n" +
      "}\n\n" +
      "export class CustomRouterStateSerializer\n" +
      "  implements RouterStateSerializer<RouterStateUrl> {\n" +
      "  \n" +
      "  serialize(routerState: RouterStateSnapshot): RouterStateUrl {\n" +
      "    let route = routerState.root;\n\n" +
      "    while (route.firstChild) {\n" +
      "      route = route.firstChild;\n" +
      "    }\n\n" +
      "    const { url } = routerState;\n" +
      "    const { queryParams } = routerState.root;\n" +
      "    const { params } = route;\n\n" +
      "    return { url, params, queryParams };\n" +
      "  }\n" +
      "}\n\n" +
      "// Register\n" +
      "providers: [\n" +
      "  provideRouterStore({\n" +
      "    serializer: CustomRouterStateSerializer\n" +
      "  })\n" +
      "]\n" +
      "```\n\n" +
      "**Router Selectors:**\n\n" +
      "```typescript\n" +
      "import { getRouterSelectors } from '@ngrx/router-store';\n\n" +
      "export const {\n" +
      "  selectCurrentRoute,\n" +
      "  selectQueryParams,\n" +
      "  selectQueryParam,\n" +
      "  selectRouteParams,\n" +
      "  selectRouteParam,\n" +
      "  selectRouteData,\n" +
      "  selectUrl\n" +
      "} = getRouterSelectors();\n\n" +
      "// Usage in component\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  url$ = this.store.select(selectUrl);\n" +
      "  userId$ = this.store.select(selectRouteParam('id'));\n" +
      "  searchQuery$ = this.store.select(selectQueryParam('q'));\n" +
      "}\n" +
      "```\n\n" +
      "**Navigate from Effect:**\n\n" +
      "```typescript\n" +
      "import { ROUTER_NAVIGATION } from '@ngrx/router-store';\n\n" +
      "@Injectable()\n" +
      "export class RouterEffects {\n" +
      "  // Listen to navigation\n" +
      "  logNavigation$ = createEffect(\n" +
      "    () =>\n" +
      "      this.actions$.pipe(\n" +
      "        ofType(ROUTER_NAVIGATION),\n" +
      "        tap(action => console.log('Navigated to:', action.payload.routerState.url))\n" +
      "      ),\n" +
      "    { dispatch: false }\n" +
      "  );\n\n" +
      "  // Navigate on action\n" +
      "  navigateToUser$ = createEffect(\n" +
      "    () =>\n" +
      "      this.actions$.pipe(\n" +
      "        ofType(UsersActions.selectUser),\n" +
      "        tap(({ userId }) => this.router.navigate(['/users', userId]))\n" +
      "      ),\n" +
      "    { dispatch: false }\n" +
      "  );\n\n" +
      "  constructor(private actions$: Actions, private router: Router) {}\n" +
      "}\n" +
      "```",
    category: "NgRx Router Store",
    difficulty: "hard",
    tags: ["ngrx", "router-store", "routing", "navigation"],
  },
  {
    id: 91,
    question: "What is NgRx ComponentStore? How does it differ from global Store?",
    answer:
      "ComponentStore manages local component state with NgRx patterns.\n\n" +
      "**When to Use:**\n" +
      "- Local component state (not global)\n" +
      "- Temporary UI state\n" +
      "- Form state\n" +
      "- Component-specific data\n\n" +
      "**Setup:**\n\n" +
      "```bash\n" +
      "npm install @ngrx/component-store\n" +
      "```\n\n" +
      "**Create Component Store:**\n\n" +
      "```typescript\n" +
      "import { Injectable } from '@angular/core';\n" +
      "import { ComponentStore } from '@ngrx/component-store';\n\n" +
      "interface UsersState {\n" +
      "  users: User[];\n" +
      "  loading: boolean;\n" +
      "  filter: string;\n" +
      "}\n\n" +
      "@Injectable()\n" +
      "export class UsersComponentStore extends ComponentStore<UsersState> {\n" +
      "  constructor(private http: HttpClient) {\n" +
      "    super({ users: [], loading: false, filter: '' });\n" +
      "  }\n\n" +
      "  // Selectors\n" +
      "  readonly users$ = this.select(state => state.users);\n" +
      "  readonly loading$ = this.select(state => state.loading);\n" +
      "  readonly filter$ = this.select(state => state.filter);\n\n" +
      "  // Composed selector\n" +
      "  readonly filteredUsers$ = this.select(\n" +
      "    this.users$,\n" +
      "    this.filter$,\n" +
      "    (users, filter) => users.filter(u => u.name.includes(filter))\n" +
      "  );\n\n" +
      "  // Updaters (sync state updates)\n" +
      "  readonly setLoading = this.updater((state, loading: boolean) => ({\n" +
      "    ...state,\n" +
      "    loading\n" +
      "  }));\n\n" +
      "  readonly setFilter = this.updater((state, filter: string) => ({\n" +
      "    ...state,\n" +
      "    filter\n" +
      "  }));\n\n" +
      "  readonly addUser = this.updater((state, user: User) => ({\n" +
      "    ...state,\n" +
      "    users: [...state.users, user]\n" +
      "  }));\n\n" +
      "  // Effects (async operations)\n" +
      "  readonly loadUsers = this.effect((trigger$: Observable<void>) =>\n" +
      "    trigger$.pipe(\n" +
      "      tap(() => this.setLoading(true)),\n" +
      "      switchMap(() =>\n" +
      "        this.http.get<User[]>('/api/users').pipe(\n" +
      "          tapResponse(\n" +
      "            users => this.patchState({ users, loading: false }),\n" +
      "            error => this.patchState({ loading: false })\n" +
      "          )\n" +
      "        )\n" +
      "      )\n" +
      "    )\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Use in Component:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  providers: [UsersComponentStore], // Scoped to component\n" +
      "  template: `\n" +
      '    <input (input)="store.setFilter($event.target.value)" />\n\n' +
      "    @if (store.loading$ | async) {\n" +
      "      <p>Loading...</p>\n" +
      "    }\n\n" +
      "    @for (user of store.filteredUsers$ | async; track user.id) {\n" +
      "      <div>{{ user.name }}</div>\n" +
      "    }\n" +
      "  `\n" +
      "})\n" +
      "export class UsersComponent implements OnInit {\n" +
      "  constructor(public store: UsersComponentStore) {}\n\n" +
      "  ngOnInit() {\n" +
      "    this.store.loadUsers(); // Trigger effect\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**ComponentStore vs Global Store:**\n\n" +
      "| Feature | ComponentStore | Global Store |\n" +
      "|---------|----------------|-------------|\n" +
      "| Scope | Component | Application |\n" +
      "| Lifecycle | Component lifetime | App lifetime |\n" +
      "| Boilerplate | Less | More (actions, reducers) |\n" +
      "| DevTools | Limited | Full support |\n" +
      "| Use Case | Local UI state | Shared state |",
    category: "NgRx ComponentStore",
    difficulty: "hard",
    tags: ["ngrx", "component-store", "local-state", "scoped-state"],
  },
  {
    id: 92,
    question:
      "What are NgRx Best Practices? Explain folder structure, naming conventions, and patterns.",
    answer:
      "**Folder Structure:**\n\n" +
      "```typescript\n" +
      "src/app/\n" +
      "├── state/\n" +
      "│   ├── index.ts              // Root state, reducers\n" +
      "│   ├── users/\n" +
      "│   │   ├── users.actions.ts\n" +
      "│   │   ├── users.reducer.ts\n" +
      "│   │   ├── users.effects.ts\n" +
      "│   │   ├── users.selectors.ts\n" +
      "│   │   ├── users.models.ts\n" +
      "│   │   └── index.ts          // Public API\n" +
      "│   ├── auth/\n" +
      "│   └── products/\n" +
      "```\n\n" +
      "**Naming Conventions:**\n\n" +
      "```typescript\n" +
      "// Actions: [Source] Event\n" +
      "[Users Page] Load Users\n" +
      "[Users API] Load Users Success\n" +
      "[Users API] Load Users Failure\n" +
      "[Users Page] Search Users\n" +
      "[Users Page] Select User\n\n" +
      "// Selectors: select + Feature + Property\n" +
      "selectUsersState\n" +
      "selectAllUsers\n" +
      "selectUsersLoading\n" +
      "selectUserById\n\n" +
      "// Effects: action + $\n" +
      "loadUsers$\n" +
      "createUser$\n" +
      "deleteUser$\n\n" +
      "// Reducers: feature + Reducer\n" +
      "usersReducer\n" +
      "authReducer\n" +
      "```\n\n" +
      "**Best Practices:**\n\n" +
      "```typescript\n" +
      "1. **One Feature, One Folder**\n" +
      "   - Keep related code together\n" +
      "   - Clear boundaries\n\n" +
      "2. **Use Action Groups**\n" +
      "   export const UsersActions = createActionGroup({ ... });\n\n" +
      "3. **Use Entity Adapter**\n" +
      "   - For collections (users, products)\n" +
      "   - Less boilerplate\n\n" +
      "4. **Compose Selectors**\n" +
      "   - Memoization benefits\n" +
      "   - Reusable logic\n\n" +
      "5. **Handle Errors in Effects**\n" +
      "   loadUsers$ = createEffect(() =>\n" +
      "     this.actions$.pipe(\n" +
      "       ofType(load),\n" +
      "       switchMap(() =>\n" +
      "         this.http.get('/api').pipe(\n" +
      "           map(success),\n" +
      "           catchError(err => of(failure({ err }))) // Always catch!\n" +
      "         )\n" +
      "       )\n" +
      "     )\n" +
      "   );\n\n" +
      "6. **Avoid Nested State**\n" +
      "   // ❌ Bad\n" +
      "   { users: { data: { items: [] } } }\n" +
      "   \n" +
      "   // ✅ Good (flat)\n" +
      "   { users: [] }\n\n" +
      "7. **Use Strongly-Typed Actions**\n" +
      "   props<{ userId: number }>()\n\n" +
      "8. **Loading/Error Pattern**\n" +
      "   interface FeatureState {\n" +
      "     data: Data[];\n" +
      "     loading: boolean;\n" +
      "     error: string | null;\n" +
      "   }\n\n" +
      "9. **Don't Put Everything in Store**\n" +
      "   - Only shared state\n" +
      "   - Not form state (unless shared)\n" +
      "   - Not transient UI state\n\n" +
      "10. **Use Effects for Side Effects**\n" +
      "    - HTTP calls\n" +
      "    - localStorage\n" +
      "    - Navigation\n" +
      "    - Logging\n" +
      "```\n\n" +
      "**Anti-Patterns to Avoid:**\n\n" +
      "```typescript\n" +
      "// ❌ Dispatching in Reducer\n" +
      "on(someAction, state => {\n" +
      "  this.store.dispatch(anotherAction()); // NO!\n" +
      "  return state;\n" +
      "})\n\n" +
      "// ❌ Side Effects in Reducer\n" +
      "on(saveUser, state => {\n" +
      "  localStorage.setItem('user', state.user); // NO!\n" +
      "  return state;\n" +
      "})\n\n" +
      "// ❌ Async in Reducer\n" +
      "on(loadUser, state => {\n" +
      "  this.http.get('/api/user').subscribe(); // NO!\n" +
      "  return state;\n" +
      "})\n" +
      "```",
    category: "NgRx Best Practices",
    difficulty: "hard",
    tags: ["ngrx", "best-practices", "patterns", "architecture"],
  },
  {
    id: 93,
    question: "What is NgRx Data (Entity Data Service)? How does it simplify CRUD operations?",
    answer:
      "NgRx Data automates entity CRUD operations without writing actions/reducers/effects.\n\n" +
      "**Setup:**\n\n" +
      "```bash\n" +
      "npm install @ngrx/data\n" +
      "```\n\n" +
      "**Define Entity Metadata:**\n\n" +
      "```typescript\n" +
      "import { EntityMetadataMap } from '@ngrx/data';\n\n" +
      "const entityMetadata: EntityMetadataMap = {\n" +
      "  User: {\n" +
      "    sortComparer: (a, b) => a.name.localeCompare(b.name)\n" +
      "  },\n" +
      "  Product: {},\n" +
      "  Order: {}\n" +
      "};\n\n" +
      "export const entityConfig = {\n" +
      "  entityMetadata\n" +
      "};\n" +
      "```\n\n" +
      "**Register:**\n\n" +
      "```typescript\n" +
      "import { provideEntityData, withEffects } from '@ngrx/data';\n\n" +
      "bootstrapApplication(AppComponent, {\n" +
      "  providers: [\n" +
      "    provideStore(),\n" +
      "    provideEffects(),\n" +
      "    provideEntityData(entityConfig, withEffects())\n" +
      "  ]\n" +
      "});\n" +
      "```\n\n" +
      "**Create Entity Service:**\n\n" +
      "```typescript\n" +
      "import { Injectable } from '@angular/core';\n" +
      "import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';\n\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class UserService extends EntityCollectionServiceBase<User> {\n" +
      "  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {\n" +
      "    super('User', serviceElementsFactory);\n" +
      "  }\n\n" +
      "  // Automatic methods available:\n" +
      "  // - getAll()\n" +
      "  // - getByKey(id)\n" +
      "  // - add(user)\n" +
      "  // - update(user)\n" +
      "  // - delete(id)\n" +
      "  // - upsert(user)\n" +
      "}\n" +
      "```\n\n" +
      "**Use in Component:**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class UsersComponent implements OnInit {\n" +
      "  users$ = this.userService.entities$;\n" +
      "  loading$ = this.userService.loading$;\n\n" +
      "  constructor(private userService: UserService) {}\n\n" +
      "  ngOnInit() {\n" +
      "    this.userService.getAll(); // Auto HTTP GET /api/users\n" +
      "  }\n\n" +
      "  addUser(user: User) {\n" +
      "    this.userService.add(user); // Auto HTTP POST /api/users\n" +
      "  }\n\n" +
      "  updateUser(user: User) {\n" +
      "    this.userService.update(user); // Auto HTTP PUT /api/users/:id\n" +
      "  }\n\n" +
      "  deleteUser(id: number) {\n" +
      "    this.userService.delete(id); // Auto HTTP DELETE /api/users/:id\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Custom Data Service:**\n\n" +
      "```typescript\n" +
      "import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';\n\n" +
      "@Injectable()\n" +
      "export class CustomUserDataService extends DefaultDataService<User> {\n" +
      "  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {\n" +
      "    super('User', http, httpUrlGenerator);\n" +
      "  }\n\n" +
      "  // Override getAll to use different endpoint\n" +
      "  override getAll(): Observable<User[]> {\n" +
      "    return this.http.get<User[]>('/custom/api/users');\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- No actions/reducers/effects boilerplate\n" +
      "- Automatic CRUD operations\n" +
      "- Optimistic updates\n" +
      "- Cache management\n" +
      "- Perfect for standard REST APIs",
    category: "NgRx Data",
    difficulty: "hard",
    tags: ["ngrx", "ngrx-data", "entity-services", "crud", "automation"],
  },
  {
    id: 94,
    question: "What are Meta-Reducers in NgRx? Provide logging and undo/redo examples.",
    answer:
      "Meta-reducers intercept actions before they reach regular reducers.\n\n" +
      "**Logging Meta-Reducer:**\n\n" +
      "```typescript\n" +
      "import { ActionReducer, MetaReducer } from '@ngrx/store';\n\n" +
      "export function logger(reducer: ActionReducer<any>): ActionReducer<any> {\n" +
      "  return (state, action) => {\n" +
      "    console.log('State before:', state);\n" +
      "    console.log('Action:', action);\n\n" +
      "    const nextState = reducer(state, action);\n\n" +
      "    console.log('State after:', nextState);\n" +
      "    return nextState;\n" +
      "  };\n" +
      "}\n\n" +
      "// Register\n" +
      "export const metaReducers: MetaReducer<AppState>[] = [\n" +
      "  logger\n" +
      "];\n\n" +
      "provideStore(\n" +
      "  reducers,\n" +
      "  { metaReducers }\n" +
      ");\n" +
      "```\n\n" +
      "**LocalStorage Sync Meta-Reducer:**\n\n" +
      "```typescript\n" +
      "export function localStorageSync(reducer: ActionReducer<AppState>): ActionReducer<AppState> {\n" +
      "  return (state, action) => {\n" +
      "    // Run reducer\n" +
      "    const nextState = reducer(state, action);\n\n" +
      "    // Save to localStorage\n" +
      "    if (action.type !== '@ngrx/store/init') {\n" +
      "      localStorage.setItem('appState', JSON.stringify(nextState));\n" +
      "    }\n\n" +
      "    return nextState;\n" +
      "  };\n" +
      "}\n\n" +
      "// Load from localStorage on init\n" +
      "export function getInitialState(): AppState {\n" +
      "  const saved = localStorage.getItem('appState');\n" +
      "  return saved ? JSON.parse(saved) : undefined;\n" +
      "}\n\n" +
      "provideStore(\n" +
      "  reducers,\n" +
      "  {\n" +
      "    metaReducers: [localStorageSync],\n" +
      "    initialState: getInitialState()\n" +
      "  }\n" +
      ");\n" +
      "```\n\n" +
      "**Undo/Redo Meta-Reducer:**\n\n" +
      "```typescript\n" +
      "interface UndoableState<T> {\n" +
      "  past: T[];\n" +
      "  present: T;\n" +
      "  future: T[];\n" +
      "}\n\n" +
      "export function undoable<T>(reducer: ActionReducer<T>): ActionReducer<UndoableState<T>> {\n" +
      "  const initialState: UndoableState<T> = {\n" +
      "    past: [],\n" +
      "    present: reducer(undefined, { type: '@ngrx/store/init' }),\n" +
      "    future: []\n" +
      "  };\n\n" +
      "  return (state = initialState, action) => {\n" +
      "    const { past, present, future } = state;\n\n" +
      "    switch (action.type) {\n" +
      "      case 'UNDO':\n" +
      "        if (past.length === 0) return state;\n" +
      "        return {\n" +
      "          past: past.slice(0, past.length - 1),\n" +
      "          present: past[past.length - 1],\n" +
      "          future: [present, ...future]\n" +
      "        };\n\n" +
      "      case 'REDO':\n" +
      "        if (future.length === 0) return state;\n" +
      "        return {\n" +
      "          past: [...past, present],\n" +
      "          present: future[0],\n" +
      "          future: future.slice(1)\n" +
      "        };\n\n" +
      "      default:\n" +
      "        const nextPresent = reducer(present, action);\n" +
      "        if (present === nextPresent) return state;\n\n" +
      "        return {\n" +
      "          past: [...past, present],\n" +
      "          present: nextPresent,\n" +
      "          future: []\n" +
      "        };\n" +
      "    }\n" +
      "  };\n" +
      "}\n" +
      "```",
    category: "NgRx Meta-Reducers",
    difficulty: "hard",
    tags: ["ngrx", "meta-reducers", "undo-redo", "middleware"],
  },
  {
    id: 95,
    question:
      "How do you test NgRx? Provide examples for Actions, Reducers, Effects, and Selectors.",
    answer:
      "**Testing Reducers:**\n\n" +
      "```typescript\n" +
      "import { usersReducer, initialState } from './users.reducer';\n" +
      "import { UsersActions } from './users.actions';\n\n" +
      "describe('UsersReducer', () => {\n" +
      "  it('should return initial state', () => {\n" +
      "    const state = usersReducer(undefined, { type: 'Unknown' });\n" +
      "    expect(state).toEqual(initialState);\n" +
      "  });\n\n" +
      "  it('should set loading on loadUsers', () => {\n" +
      "    const action = UsersActions.loadUsers();\n" +
      "    const state = usersReducer(initialState, action);\n\n" +
      "    expect(state.loading).toBe(true);\n" +
      "    expect(state.error).toBeNull();\n" +
      "  });\n\n" +
      "  it('should add users on loadUsersSuccess', () => {\n" +
      "    const users = [{ id: 1, name: 'John' }];\n" +
      "    const action = UsersActions.loadUsersSuccess({ users });\n" +
      "    const state = usersReducer(initialState, action);\n\n" +
      "    expect(state.users).toEqual(users);\n" +
      "    expect(state.loading).toBe(false);\n" +
      "  });\n" +
      "});\n" +
      "```\n\n" +
      "**Testing Selectors:**\n\n" +
      "```typescript\n" +
      "import { selectAllUsers, selectActiveUsers } from './users.selectors';\n\n" +
      "describe('Users Selectors', () => {\n" +
      "  const state = {\n" +
      "    users: {\n" +
      "      users: [\n" +
      "        { id: 1, name: 'John', active: true },\n" +
      "        { id: 2, name: 'Jane', active: false }\n" +
      "      ]\n" +
      "    }\n" +
      "  };\n\n" +
      "  it('should select all users', () => {\n" +
      "    const result = selectAllUsers(state);\n" +
      "    expect(result.length).toBe(2);\n" +
      "  });\n\n" +
      "  it('should select active users', () => {\n" +
      "    const result = selectActiveUsers(state);\n" +
      "    expect(result.length).toBe(1);\n" +
      "    expect(result[0].name).toBe('John');\n" +
      "  });\n" +
      "});\n" +
      "```\n\n" +
      "**Testing Effects:**\n\n" +
      "```typescript\n" +
      "import { TestBed } from '@angular/core/testing';\n" +
      "import { provideMockActions } from '@ngrx/effects/testing';\n" +
      "import { Observable, of, throwError } from 'rxjs';\n" +
      "import { UsersEffects } from './users.effects';\n\n" +
      "describe('UsersEffects', () => {\n" +
      "  let actions$: Observable<any>;\n" +
      "  let effects: UsersEffects;\n" +
      "  let httpMock: jasmine.SpyObj<HttpClient>;\n\n" +
      "  beforeEach(() => {\n" +
      "    httpMock = jasmine.createSpyObj('HttpClient', ['get', 'post']);\n\n" +
      "    TestBed.configureTestingModule({\n" +
      "      providers: [\n" +
      "        UsersEffects,\n" +
      "        provideMockActions(() => actions$),\n" +
      "        { provide: HttpClient, useValue: httpMock }\n" +
      "      ]\n" +
      "    });\n\n" +
      "    effects = TestBed.inject(UsersEffects);\n" +
      "  });\n\n" +
      "  it('should return loadUsersSuccess on success', (done) => {\n" +
      "    const users = [{ id: 1, name: 'John' }];\n" +
      "    httpMock.get.and.returnValue(of(users));\n\n" +
      "    actions$ = of(UsersActions.loadUsers());\n\n" +
      "    effects.loadUsers$.subscribe(action => {\n" +
      "      expect(action).toEqual(UsersActions.loadUsersSuccess({ users }));\n" +
      "      done();\n" +
      "    });\n" +
      "  });\n\n" +
      "  it('should return loadUsersFailure on error', (done) => {\n" +
      "    const error = new Error('Failed');\n" +
      "    httpMock.get.and.returnValue(throwError(() => error));\n\n" +
      "    actions$ = of(UsersActions.loadUsers());\n\n" +
      "    effects.loadUsers$.subscribe(action => {\n" +
      "      expect(action.type).toBe('[Users API] Load Users Failure');\n" +
      "      done();\n" +
      "    });\n" +
      "  });\n" +
      "});\n" +
      "```\n\n" +
      "**Testing with MockStore:**\n\n" +
      "```typescript\n" +
      "import { provideMockStore, MockStore } from '@ngrx/store/testing';\n\n" +
      "describe('UsersComponent', () => {\n" +
      "  let store: MockStore;\n" +
      "  const initialState = { users: [] };\n\n" +
      "  beforeEach(() => {\n" +
      "    TestBed.configureTestingModule({\n" +
      "      providers: [provideMockStore({ initialState })]\n" +
      "    });\n\n" +
      "    store = TestBed.inject(MockStore);\n" +
      "  });\n\n" +
      "  it('should dispatch loadUsers on init', () => {\n" +
      "    spyOn(store, 'dispatch');\n" +
      "    const component = new UsersComponent(store);\n" +
      "    component.ngOnInit();\n\n" +
      "    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.loadUsers());\n" +
      "  });\n" +
      "});\n" +
      "```",
    category: "NgRx Testing",
    difficulty: "hard",
    tags: ["ngrx", "testing", "unit-tests", "jasmine"],
  },
  {
    id: 96,
    question:
      "What are Angular Signals? Explain signal(), computed(), and effect() with signal-based change detection.",
    answer:
      "Signals are Angular's new reactive primitives for fine-grained reactivity.\n\n" +
      "**Basic Signals:**\n\n" +
      "```typescript\n" +
      "import { Component, signal, computed, effect } from '@angular/core';\n\n" +
      "@Component({\n" +
      "  template: `\n" +
      "    <p>Count: {{ count() }}</p>\n" +
      "    <p>Double: {{ doubleCount() }}</p>\n" +
      '    <button (click)="increment()">+1</button>\n' +
      '    <button (click)="reset()">Reset</button>\n' +
      "  `\n" +
      "})\n" +
      "export class CounterComponent {\n" +
      "  // Writable signal\n" +
      "  count = signal(0);\n\n" +
      "  // Computed signal (derived, read-only)\n" +
      "  doubleCount = computed(() => this.count() * 2);\n" +
      "  isEven = computed(() => this.count() % 2 === 0);\n\n" +
      "  // Effect (side effects)\n" +
      "  constructor() {\n" +
      "    effect(() => {\n" +
      "      console.log('Count changed to:', this.count());\n" +
      "      // Runs automatically when count changes\n" +
      "    });\n" +
      "  }\n\n" +
      "  // Update signal\n" +
      "  increment() {\n" +
      "    this.count.update(value => value + 1);\n" +
      "  }\n\n" +
      "  // Set signal\n" +
      "  reset() {\n" +
      "    this.count.set(0);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Signal-Based Change Detection:**\n\n" +
      "```typescript\n" +
      "// Traditional (Zone.js)\n" +
      "- Checks entire component tree on every event\n" +
      "- Uses monkey-patched async operations\n" +
      "- Can be inefficient\n\n" +
      "// Signal-Based (Angular 16+)\n" +
      "- Only updates dependent components\n" +
      "- Fine-grained reactivity\n" +
      "- No Zone.js needed\n" +
      "- Better performance\n" +
      "```\n\n" +
      "**Complex Computed Signals:**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  firstName = signal('John');\n" +
      "  lastName = signal('Doe');\n" +
      "  age = signal(25);\n\n" +
      "  // Computed from multiple signals\n" +
      "  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);\n\n" +
      "  // Conditional computed\n" +
      "  canVote = computed(() => this.age() >= 18);\n" +
      "  status = computed(() => \n" +
      "    this.age() < 18 ? 'Minor' : \n" +
      "    this.age() < 65 ? 'Adult' : 'Senior'\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Effects with Cleanup:**\n\n" +
      "```typescript\n" +
      "import { effect } from '@angular/core';\n\n" +
      "constructor() {\n" +
      "  effect((onCleanup) => {\n" +
      "    const count = this.count();\n" +
      "    \n" +
      "    // Set up side effect\n" +
      "    const timer = setInterval(() => {\n" +
      "      console.log('Current count:', count);\n" +
      "    }, 1000);\n\n" +
      "    // Cleanup\n" +
      "    onCleanup(() => clearInterval(timer));\n" +
      "  });\n" +
      "}\n" +
      "```",
    category: "Signals Basics",
    difficulty: "hard",
    tags: ["signals", "computed", "effect", "angular-16", "reactivity"],
  },
  {
    id: 97,
    question:
      "What are Signal Inputs and Outputs? Explain input(), input.required(), and output().",
    answer:
      "Signal inputs/outputs provide type-safe, signal-based component communication.\n\n" +
      "**Signal Inputs (Angular 17.1+):**\n\n" +
      "```typescript\n" +
      "import { Component, input, computed } from '@angular/core';\n\n" +
      "@Component({\n" +
      "  selector: 'app-user-card',\n" +
      "  template: `\n" +
      '    <div class="card">\n' +
      "      <h2>{{ fullName() }}</h2>\n" +
      "      <p>{{ email() }}</p>\n" +
      '      <span [class.active]="isActive()">Status</span>\n' +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "export class UserCardComponent {\n" +
      "  // Required input\n" +
      "  userId = input.required<number>();\n" +
      "  firstName = input.required<string>();\n" +
      "  lastName = input.required<string>();\n\n" +
      "  // Optional input with default\n" +
      "  email = input('no-email@example.com');\n" +
      "  isActive = input(false);\n\n" +
      "  // Computed from inputs\n" +
      "  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);\n" +
      "  displayName = computed(() => \n" +
      "    `${this.fullName()} (ID: ${this.userId()})`\n" +
      "  );\n" +
      "}\n\n" +
      "// Parent usage\n" +
      "<app-user-card\n" +
      '  [userId]="123"\n' +
      "  [firstName]=\"'John'\"\n" +
      "  [lastName]=\"'Doe'\"\n" +
      "  [email]=\"'john@example.com'\"\n" +
      '  [isActive]="true" />\n' +
      "```\n\n" +
      "**Signal Outputs:**\n\n" +
      "```typescript\n" +
      "import { Component, input, output } from '@angular/core';\n\n" +
      "@Component({\n" +
      "  selector: 'app-delete-button',\n" +
      "  template: `\n" +
      '    <button (click)="handleClick()">\n' +
      "      Delete {{ itemName() }}\n" +
      "    </button>\n" +
      "  `\n" +
      "})\n" +
      "export class DeleteButtonComponent {\n" +
      "  // Input\n" +
      "  itemId = input.required<number>();\n" +
      "  itemName = input('item');\n\n" +
      "  // Output (type-safe event emitter)\n" +
      "  deleted = output<number>();\n" +
      "  cancelled = output<void>();\n\n" +
      "  handleClick() {\n" +
      "    if (confirm(`Delete ${this.itemName()}?`)) {\n" +
      "      this.deleted.emit(this.itemId());\n" +
      "    } else {\n" +
      "      this.cancelled.emit();\n" +
      "    }\n" +
      "  }\n" +
      "}\n\n" +
      "// Usage\n" +
      "<app-delete-button\n" +
      '  [itemId]="user.id"\n' +
      '  [itemName]="user.name"\n' +
      '  (deleted)="deleteUser($event)"\n' +
      '  (cancelled)="onCancel()" />\n' +
      "```\n\n" +
      "**Input Transforms:**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  // Transform input automatically\n" +
      "  count = input(0, {\n" +
      "    transform: (value: string | number) => +value\n" +
      "  });\n" +
      '  // <comp count="5" /> → count() = 5 (number)\n\n' +
      "  // Alias\n" +
      "  userName = input('', { alias: 'name' });\n" +
      "  // <comp name=\"John\" /> → userName() = 'John'\n" +
      "}\n" +
      "```",
    category: "Signal Inputs/Outputs",
    difficulty: "hard",
    tags: ["signals", "inputs", "outputs", "angular-17", "component-api"],
  },
  {
    id: 98,
    question: "What is the model() API? Explain bi-directional binding with signals.",
    answer:
      "model() creates two-way bindable signals for forms and components.\n\n" +
      "**Basic model() Usage:**\n\n" +
      "```typescript\n" +
      "import { Component, model } from '@angular/core';\n\n" +
      "@Component({\n" +
      "  selector: 'app-counter',\n" +
      "  template: `\n" +
      '    <button (click)="decrement()">-</button>\n' +
      "    <span>{{ value() }}</span>\n" +
      '    <button (click)="increment()">+</button>\n' +
      "  `\n" +
      "})\n" +
      "export class CounterComponent {\n" +
      "  // Two-way bindable signal\n" +
      "  value = model(0);\n\n" +
      "  increment() {\n" +
      "    this.value.update(v => v + 1);\n" +
      "    // Automatically emits valueChange event\n" +
      "  }\n\n" +
      "  decrement() {\n" +
      "    this.value.update(v => v - 1);\n" +
      "  }\n" +
      "}\n\n" +
      "// Parent component\n" +
      "@Component({\n" +
      "  template: `\n" +
      "    <p>Parent count: {{ count() }}</p>\n" +
      '    <app-counter [(value)]="count" />\n' +
      "    <!-- Equivalent to: -->\n" +
      '    <app-counter [value]="count()" (valueChange)="count.set($event)" />\n' +
      "  `\n" +
      "})\n" +
      "export class ParentComponent {\n" +
      "  count = signal(5);\n" +
      "}\n" +
      "```\n\n" +
      "**Form Control with model():**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-search',\n" +
      "  template: `\n" +
      '    <input [value]="query()" (input)="query.set($any($event.target).value)" />\n' +
      "    <p>Searching for: {{ query() }}</p>\n" +
      "    <p>Results: {{ results().length }}</p>\n" +
      "  `\n" +
      "})\n" +
      "export class SearchComponent {\n" +
      "  // Two-way bound query\n" +
      "  query = model('');\n\n" +
      "  // Computed results (auto-updates when query changes)\n" +
      "  results = computed(() => {\n" +
      "    const q = this.query().toLowerCase();\n" +
      "    return this.items.filter(item => item.name.toLowerCase().includes(q));\n" +
      "  });\n\n" +
      "  items = [{ name: 'Angular' }, { name: 'React' }, { name: 'Vue' }];\n" +
      "}\n\n" +
      "// Parent can bind\n" +
      '<app-search [(query)]="searchQuery" />\n' +
      "```\n\n" +
      "**Complex Two-Way Binding:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-user-form',\n" +
      "  template: `\n" +
      "    <input \n" +
      '      [value]="user().name" \n' +
      '      (input)="updateName($any($event.target).value)" />\n' +
      "    <input \n" +
      '      [value]="user().email" \n' +
      '      (input)="updateEmail($any($event.target).value)" />\n' +
      "  `\n" +
      "})\n" +
      "export class UserFormComponent {\n" +
      "  user = model<User>({ name: '', email: '' });\n\n" +
      "  updateName(name: string) {\n" +
      "    this.user.update(u => ({ ...u, name }));\n" +
      "  }\n\n" +
      "  updateEmail(email: string) {\n" +
      "    this.user.update(u => ({ ...u, email }));\n" +
      "  }\n" +
      "}\n\n" +
      "// Parent\n" +
      '<app-user-form [(user)]="currentUser" />\n' +
      "```",
    category: "Signal Model API",
    difficulty: "hard",
    tags: ["signals", "model", "two-way-binding", "forms", "angular-17"],
  },
  {
    id: 99,
    question:
      "What are Signal-based View Queries? Explain viewChild(), viewChildren(), contentChild(), contentChildren().",
    answer:
      "Signal-based queries return signals instead of requiring lifecycle hooks.\n\n" +
      "**viewChild() - Single Element:**\n\n" +
      "```typescript\n" +
      "import { Component, viewChild, ElementRef, AfterViewInit } from '@angular/core';\n\n" +
      "@Component({\n" +
      "  template: `\n" +
      '    <input #nameInput placeholder="Name" />\n' +
      "    <app-child-component />\n" +
      '    <button (click)="focusInput()">Focus</button>\n' +
      "  `\n" +
      "})\n" +
      "export class Component implements AfterViewInit {\n" +
      "  // Query returns Signal<ElementRef | undefined>\n" +
      "  nameInput = viewChild<ElementRef>('nameInput');\n\n" +
      "  // Query component\n" +
      "  childComponent = viewChild(ChildComponent);\n\n" +
      "  ngAfterViewInit() {\n" +
      "    // Signal is available, no undefined checks needed!\n" +
      "    this.nameInput()?.nativeElement.focus();\n" +
      "  }\n\n" +
      "  focusInput() {\n" +
      "    this.nameInput()?.nativeElement.focus();\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**viewChildren() - Multiple Elements:**\n\n" +
      "```typescript\n" +
      "import { viewChildren, QueryList } from '@angular/core';\n\n" +
      "@Component({\n" +
      "  template: `\n" +
      "    @for (item of items; track item.id) {\n" +
      '      <app-item [data]="item" />\n' +
      "    }\n" +
      '    <button (click)="highlightAll()">Highlight All</button>\n' +
      "  `\n" +
      "})\n" +
      "export class Component {\n" +
      "  items = [{ id: 1 }, { id: 2 }, { id: 3 }];\n\n" +
      "  // Returns Signal<ReadonlyArray<ItemComponent>>\n" +
      "  itemComponents = viewChildren(ItemComponent);\n\n" +
      "  highlightAll() {\n" +
      "    this.itemComponents().forEach(item => item.highlight());\n" +
      "  }\n\n" +
      "  // Computed from query\n" +
      "  itemCount = computed(() => this.itemComponents().length);\n" +
      "}\n" +
      "```\n\n" +
      "**contentChild() / contentChildren() - Projected Content:**\n\n" +
      "```typescript\n" +
      "import { contentChild, contentChildren } from '@angular/core';\n\n" +
      "@Component({\n" +
      "  selector: 'app-tabs',\n" +
      "  template: `\n" +
      '    <div class="tabs">\n' +
      "      @for (tab of tabs(); track tab; let i = $index) {\n" +
      '        <button (click)="selectTab(i)">{{ tab.title }}</button>\n' +
      "      }\n" +
      "    </div>\n" +
      '    <div class="content">\n' +
      "      <ng-content></ng-content>\n" +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "export class TabsComponent {\n" +
      "  // Query projected content\n" +
      "  tabs = contentChildren(TabComponent);\n" +
      "  firstTab = contentChild(TabComponent);\n\n" +
      "  selectedIndex = signal(0);\n\n" +
      "  selectTab(index: number) {\n" +
      "    this.selectedIndex.set(index);\n" +
      "    this.tabs()[index].activate();\n" +
      "  }\n\n" +
      "  // Computed\n" +
      "  tabCount = computed(() => this.tabs().length);\n" +
      "}\n\n" +
      "// Usage\n" +
      "<app-tabs>\n" +
      '  <app-tab title="Tab 1">Content 1</app-tab>\n' +
      '  <app-tab title="Tab 2">Content 2</app-tab>\n' +
      "</app-tabs>\n" +
      "```\n\n" +
      "**Benefits vs Old API:**\n" +
      "- Always defined (returns Signal)\n" +
      "- No @ViewChild decorator\n" +
      "- Can use in computed signals\n" +
      "- Type-safe\n" +
      "- No lifecycle timing issues",
    category: "Signal View Queries",
    difficulty: "hard",
    tags: ["signals", "viewchild", "contentchild", "queries", "angular-17"],
  },
  {
    id: 100,
    question:
      "How do you implement complete CRUD with Signals? Show service and component integration.",
    answer:
      "**Signal-based CRUD Service:**\n\n" +
      "```typescript\n" +
      "import { Injectable, signal, computed } from '@angular/core';\n" +
      "import { HttpClient } from '@angular/common/http';\n" +
      "import { catchError, finalize } from 'rxjs/operators';\n" +
      "import { of } from 'rxjs';\n\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class UserSignalService {\n" +
      "  private http = inject(HttpClient);\n\n" +
      "  // State signals\n" +
      "  private usersState = signal<User[]>([]);\n" +
      "  private loadingState = signal(false);\n" +
      "  private errorState = signal<string | null>(null);\n" +
      "  private selectedIdState = signal<number | null>(null);\n\n" +
      "  // Public read-only\n" +
      "  users = this.usersState.asReadonly();\n" +
      "  loading = this.loadingState.asReadonly();\n" +
      "  error = this.errorState.asReadonly();\n\n" +
      "  // Computed\n" +
      "  userCount = computed(() => this.users().length);\n" +
      "  hasUsers = computed(() => this.users().length > 0);\n" +
      "  selectedUser = computed(() => {\n" +
      "    const id = this.selectedIdState();\n" +
      "    return this.users().find(u => u.id === id);\n" +
      "  });\n\n" +
      "  // CREATE\n" +
      "  createUser(user: Partial<User>) {\n" +
      "    this.loadingState.set(true);\n" +
      "    this.errorState.set(null);\n\n" +
      "    this.http.post<User>('/api/users', user)\n" +
      "      .pipe(\n" +
      "        catchError(error => {\n" +
      "          this.errorState.set(error.message);\n" +
      "          return of(null);\n" +
      "        }),\n" +
      "        finalize(() => this.loadingState.set(false))\n" +
      "      )\n" +
      "      .subscribe(newUser => {\n" +
      "        if (newUser) {\n" +
      "          this.usersState.update(users => [...users, newUser]);\n" +
      "        }\n" +
      "      });\n" +
      "  }\n\n" +
      "  // READ\n" +
      "  loadUsers() {\n" +
      "    this.loadingState.set(true);\n" +
      "    this.errorState.set(null);\n\n" +
      "    this.http.get<User[]>('/api/users')\n" +
      "      .pipe(\n" +
      "        catchError(error => {\n" +
      "          this.errorState.set(error.message);\n" +
      "          return of([]);\n" +
      "        }),\n" +
      "        finalize(() => this.loadingState.set(false))\n" +
      "      )\n" +
      "      .subscribe(users => this.usersState.set(users));\n" +
      "  }\n\n" +
      "  // UPDATE\n" +
      "  updateUser(id: number, changes: Partial<User>) {\n" +
      "    this.http.put<User>(`/api/users/${id}`, changes)\n" +
      "      .pipe(catchError(error => {\n" +
      "        this.errorState.set(error.message);\n" +
      "        return of(null);\n" +
      "      }))\n" +
      "      .subscribe(updated => {\n" +
      "        if (updated) {\n" +
      "          this.usersState.update(users =>\n" +
      "            users.map(u => u.id === id ? updated : u)\n" +
      "          );\n" +
      "        }\n" +
      "      });\n" +
      "  }\n\n" +
      "  // DELETE\n" +
      "  deleteUser(id: number) {\n" +
      "    this.http.delete(`/api/users/${id}`)\n" +
      "      .pipe(catchError(error => {\n" +
      "        this.errorState.set(error.message);\n" +
      "        return of(null);\n" +
      "      }))\n" +
      "      .subscribe(() => {\n" +
      "        this.usersState.update(users => users.filter(u => u.id !== id));\n" +
      "      });\n" +
      "  }\n\n" +
      "  selectUser(id: number) {\n" +
      "    this.selectedIdState.set(id);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Component Usage:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  template: `\n" +
      "    @if (service.loading()) {\n" +
      '      <div class="spinner">Loading...</div>\n' +
      "    }\n\n" +
      "    @if (service.error(); as error) {\n" +
      '      <div class="error">{{ error }}</div>\n' +
      "    }\n\n" +
      "    <p>Total: {{ service.userCount() }}</p>\n\n" +
      "    @for (user of service.users(); track user.id) {\n" +
      '      <div class="user-card">\n' +
      "        <h3>{{ user.name }}</h3>\n" +
      "        <button (click)=\"service.updateUser(user.id, { name: 'Updated' })\">Edit</button>\n" +
      '        <button (click)="service.deleteUser(user.id)">Delete</button>\n' +
      "      </div>\n" +
      "    } @empty {\n" +
      "      <p>No users found</p>\n" +
      "    }\n\n" +
      "    <button (click)=\"service.createUser({ name: 'New User' })\">Add User</button>\n" +
      "  `\n" +
      "})\n" +
      "export class UsersComponent {\n" +
      "  service = inject(UserSignalService);\n\n" +
      "  ngOnInit() {\n" +
      "    this.service.loadUsers();\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "Signals CRUD",
    difficulty: "hard",
    tags: ["signals", "crud", "http", "state-management"],
  },
  {
    id: 101,
    question: "How do you handle HTTP with Signals? Show both RxJS and pure Signal approaches.",
    answer:
      "**Approach 1: RxJS with toSignal():**\n\n" +
      "```typescript\n" +
      "import { toSignal } from '@angular/core/rxjs-interop';\n" +
      "import { inject, Component } from '@angular/core';\n\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  private http = inject(HttpClient);\n\n" +
      "  // Convert Observable to Signal\n" +
      "  users = toSignal(\n" +
      "    this.http.get<User[]>('/api/users'),\n" +
      "    { initialValue: [] }\n" +
      "  );\n\n" +
      "  // With retry\n" +
      "  products = toSignal(\n" +
      "    this.http.get<Product[]>('/api/products').pipe(\n" +
      "      retry(3),\n" +
      "      catchError(() => of([]))\n" +
      "    ),\n" +
      "    { initialValue: [] }\n" +
      "  );\n\n" +
      "  // Template\n" +
      "  // @for (user of users(); track user.id) { ... }\n" +
      "}\n" +
      "```\n\n" +
      "**Approach 2: Pure Signals (Manual):**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  private http = inject(HttpClient);\n\n" +
      "  // State signals\n" +
      "  users = signal<User[]>([]);\n" +
      "  loading = signal(false);\n" +
      "  error = signal<string | null>(null);\n\n" +
      "  // Computed\n" +
      "  hasData = computed(() => this.users().length > 0);\n\n" +
      "  loadUsers() {\n" +
      "    this.loading.set(true);\n" +
      "    this.error.set(null);\n\n" +
      "    this.http.get<User[]>('/api/users')\n" +
      "      .pipe(\n" +
      "        catchError(err => {\n" +
      "          this.error.set(err.message);\n" +
      "          return of([]);\n" +
      "        }),\n" +
      "        finalize(() => this.loading.set(false))\n" +
      "      )\n" +
      "      .subscribe(users => this.users.set(users));\n" +
      "  }\n\n" +
      "  ngOnInit() {\n" +
      "    this.loadUsers();\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Approach 3: Resource API (Angular 19+):**\n\n" +
      "```typescript\n" +
      "import { resource } from '@angular/core';\n\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  userId = signal(1);\n\n" +
      "  // Automatic refetch when userId changes\n" +
      "  userResource = resource({\n" +
      "    request: () => ({ id: this.userId() }),\n" +
      "    loader: ({ request }) => \n" +
      "      this.http.get<User>(`/api/users/${request.id}`)\n" +
      "  });\n\n" +
      "  // Access data, loading, error\n" +
      "  user = this.userResource.value;\n" +
      "  loading = this.userResource.isLoading;\n" +
      "  error = this.userResource.error;\n\n" +
      "  // Change userId triggers auto-reload\n" +
      "  loadUser(id: number) {\n" +
      "    this.userId.set(id);\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "Signals HTTP",
    difficulty: "hard",
    tags: ["signals", "http", "rxjs", "tosignal", "resource"],
  },
  {
    id: 102,
    question: "How do you handle errors and loading states with Signals?",
    answer:
      "**Comprehensive Error & Loading Management:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class DataService {\n" +
      "  private http = inject(HttpClient);\n\n" +
      "  // Loading states\n" +
      "  private loadingState = signal(false);\n" +
      "  private savingState = signal(false);\n" +
      "  private deletingState = signal<number | null>(null);\n\n" +
      "  loading = this.loadingState.asReadonly();\n" +
      "  saving = this.savingState.asReadonly();\n" +
      "  deleting = this.deletingState.asReadonly();\n\n" +
      "  // Error states\n" +
      "  private errorState = signal<string | null>(null);\n" +
      "  private fieldErrors = signal<Record<string, string>>({});\n\n" +
      "  error = this.errorState.asReadonly();\n" +
      "  fieldError = this.fieldErrors.asReadonly();\n\n" +
      "  // Data\n" +
      "  private dataState = signal<User[]>([]);\n" +
      "  data = this.dataState.asReadonly();\n\n" +
      "  // Computed\n" +
      "  isLoading = computed(() => this.loading() || this.saving());\n" +
      "  hasError = computed(() => !!this.error());\n\n" +
      "  loadData() {\n" +
      "    this.loadingState.set(true);\n" +
      "    this.errorState.set(null);\n\n" +
      "    this.http.get<User[]>('/api/users')\n" +
      "      .pipe(\n" +
      "        catchError(error => {\n" +
      "          this.handleError(error);\n" +
      "          return of([]);\n" +
      "        }),\n" +
      "        finalize(() => this.loadingState.set(false))\n" +
      "      )\n" +
      "      .subscribe(users => this.dataState.set(users));\n" +
      "  }\n\n" +
      "  saveData(user: User) {\n" +
      "    this.savingState.set(true);\n" +
      "    this.errorState.set(null);\n" +
      "    this.fieldErrors.set({});\n\n" +
      "    this.http.post<User>('/api/users', user)\n" +
      "      .pipe(\n" +
      "        catchError(error => {\n" +
      "          if (error.status === 400 && error.error.errors) {\n" +
      "            // Field-specific errors\n" +
      "            this.fieldErrors.set(error.error.errors);\n" +
      "          } else {\n" +
      "            this.errorState.set(error.message);\n" +
      "          }\n" +
      "          return of(null);\n" +
      "        }),\n" +
      "        finalize(() => this.savingState.set(false))\n" +
      "      )\n" +
      "      .subscribe(saved => {\n" +
      "        if (saved) {\n" +
      "          this.dataState.update(users => [...users, saved]);\n" +
      "        }\n" +
      "      });\n" +
      "  }\n\n" +
      "  deleteData(id: number) {\n" +
      "    this.deletingState.set(id);\n\n" +
      "    this.http.delete(`/api/users/${id}`)\n" +
      "      .pipe(\n" +
      "        catchError(error => {\n" +
      "          this.errorState.set(`Failed to delete user ${id}`);\n" +
      "          return of(null);\n" +
      "        }),\n" +
      "        finalize(() => this.deletingState.set(null))\n" +
      "      )\n" +
      "      .subscribe(success => {\n" +
      "        if (success !== null) {\n" +
      "          this.dataState.update(users => users.filter(u => u.id !== id));\n" +
      "        }\n" +
      "      });\n" +
      "  }\n\n" +
      "  clearError() {\n" +
      "    this.errorState.set(null);\n" +
      "    this.fieldErrors.set({});\n" +
      "  }\n\n" +
      "  private handleError(error: any) {\n" +
      "    const message = error.error?.message || error.message || 'Unknown error';\n" +
      "    this.errorState.set(message);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Component with Loading/Error UI:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  template: `\n" +
      "    <!-- Global error toast -->\n" +
      "    @if (service.error(); as error) {\n" +
      '      <div class="toast error">\n' +
      "        {{ error }}\n" +
      '        <button (click)="service.clearError()">✕</button>\n' +
      "      </div>\n" +
      "    }\n\n" +
      "    <!-- Loading overlay -->\n" +
      "    @if (service.isLoading()) {\n" +
      '      <div class="loading-overlay">\n' +
      '        <div class="spinner"></div>\n' +
      "      </div>\n" +
      "    }\n\n" +
      "    <!-- Data list -->\n" +
      "    @for (user of service.data(); track user.id) {\n" +
      '      <div class="user-card" [class.deleting]="service.deleting() === user.id">\n' +
      "        <h3>{{ user.name }}</h3>\n" +
      "        <button \n" +
      '          (click)="service.deleteUser(user.id)"\n' +
      '          [disabled]="service.deleting() === user.id">\n' +
      "          @if (service.deleting() === user.id) {\n" +
      "            Deleting...\n" +
      "          } @else {\n" +
      "            Delete\n" +
      "          }\n" +
      "        </button>\n" +
      "      </div>\n" +
      "    }\n\n" +
      "    <!-- Field errors -->\n" +
      "    @if (service.fieldError().name) {\n" +
      '      <span class="field-error">{{ service.fieldError().name }}</span>\n' +
      "    }\n" +
      "  `\n" +
      "})\n" +
      "export class Component {\n" +
      "  service = inject(DataService);\n" +
      "}\n" +
      "```",
    category: "Signals Error Handling",
    difficulty: "hard",
    tags: ["signals", "error-handling", "loading", "state-management"],
  },
  {
    id: 103,
    question:
      "How do you create Stateful Signal-based Services? Show complete example with loading/error/data pattern.",
    answer:
      "**Generic Signal Service Pattern:**\n\n" +
      "```typescript\n" +
      "// Base class for reusable pattern\n" +
      "export abstract class SignalService<T> {\n" +
      "  protected http = inject(HttpClient);\n\n" +
      "  // State signals\n" +
      "  protected dataState = signal<T[]>([]);\n" +
      "  protected loadingState = signal(false);\n" +
      "  protected errorState = signal<string | null>(null);\n" +
      "  protected selectedState = signal<T | null>(null);\n\n" +
      "  // Public API\n" +
      "  readonly data = this.dataState.asReadonly();\n" +
      "  readonly loading = this.loadingState.asReadonly();\n" +
      "  readonly error = this.errorState.asReadonly();\n" +
      "  readonly selected = this.selectedState.asReadonly();\n\n" +
      "  // Computed\n" +
      "  readonly count = computed(() => this.data().length);\n" +
      "  readonly hasData = computed(() => this.data().length > 0);\n" +
      "  readonly hasError = computed(() => !!this.error());\n\n" +
      "  abstract getEndpoint(): string;\n\n" +
      "  load() {\n" +
      "    this.loadingState.set(true);\n" +
      "    this.errorState.set(null);\n\n" +
      "    this.http.get<T[]>(this.getEndpoint())\n" +
      "      .pipe(\n" +
      "        catchError(error => {\n" +
      "          this.errorState.set(error.message);\n" +
      "          return of([]);\n" +
      "        }),\n" +
      "        finalize(() => this.loadingState.set(false))\n" +
      "      )\n" +
      "      .subscribe(data => this.dataState.set(data));\n" +
      "  }\n\n" +
      "  select(item: T) {\n" +
      "    this.selectedState.set(item);\n" +
      "  }\n\n" +
      "  clearError() {\n" +
      "    this.errorState.set(null);\n" +
      "  }\n" +
      "}\n\n" +
      "// Concrete implementation\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class UsersService extends SignalService<User> {\n" +
      "  getEndpoint() {\n" +
      "    return '/api/users';\n" +
      "  }\n\n" +
      "  // Add custom methods\n" +
      "  activeUsers = computed(() => \n" +
      "    this.data().filter(u => u.active)\n" +
      "  );\n\n" +
      "  searchUsers = signal('');\n" +
      "  filteredUsers = computed(() => {\n" +
      "    const query = this.searchUsers().toLowerCase();\n" +
      "    return this.data().filter(u => \n" +
      "      u.name.toLowerCase().includes(query)\n" +
      "    );\n" +
      "  });\n" +
      "}\n\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class ProductsService extends SignalService<Product> {\n" +
      "  getEndpoint() {\n" +
      "    return '/api/products';\n" +
      "  }\n\n" +
      "  // Product-specific\n" +
      "  totalValue = computed(() => \n" +
      "    this.data().reduce((sum, p) => sum + p.price, 0)\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Usage:**\n\n" +
      "```typescript\n" +
      "@Component({...})\n" +
      "export class UsersComponent {\n" +
      "  service = inject(UsersService);\n\n" +
      "  ngOnInit() {\n" +
      "    this.service.load();\n" +
      "  }\n" +
      "}\n\n" +
      "@Component({...})\n" +
      "export class ProductsComponent {\n" +
      "  service = inject(ProductsService);\n\n" +
      "  ngOnInit() {\n" +
      "    this.service.load();\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "Signal Services",
    difficulty: "hard",
    tags: ["signals", "services", "state-management", "patterns"],
  },
  {
    id: 104,
    question: "How do you implement Authentication with Signals? Show complete auth flow.",
    answer:
      "**Complete Signal-based Authentication:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class SignalAuthService {\n" +
      "  private http = inject(HttpClient);\n" +
      "  private router = inject(Router);\n\n" +
      "  // State\n" +
      "  private userState = signal<User | null>(null);\n" +
      "  private tokenState = signal<string | null>(null);\n" +
      "  private loadingState = signal(false);\n" +
      "  private errorState = signal<string | null>(null);\n\n" +
      "  // Public signals\n" +
      "  user = this.userState.asReadonly();\n" +
      "  token = this.tokenState.asReadonly();\n" +
      "  loading = this.loadingState.asReadonly();\n" +
      "  error = this.errorState.asReadonly();\n\n" +
      "  // Computed\n" +
      "  isAuthenticated = computed(() => !!this.user());\n" +
      "  isAdmin = computed(() => this.user()?.role === 'admin');\n" +
      "  userName = computed(() => this.user()?.name ?? 'Guest');\n" +
      "  userEmail = computed(() => this.user()?.email ?? '');\n\n" +
      "  constructor() {\n" +
      "    this.loadStoredAuth();\n" +
      "    this.setupTokenExpiration();\n" +
      "  }\n\n" +
      "  login(email: string, password: string) {\n" +
      "    this.loadingState.set(true);\n" +
      "    this.errorState.set(null);\n\n" +
      "    this.http.post<{ user: User; token: string; expiresIn: number }>(\n" +
      "      '/api/login',\n" +
      "      { email, password }\n" +
      "    )\n" +
      "      .pipe(\n" +
      "        tap(response => {\n" +
      "          this.setAuthData(response);\n" +
      "          this.router.navigate(['/dashboard']);\n" +
      "        }),\n" +
      "        catchError(error => {\n" +
      "          this.errorState.set(error.error?.message || 'Login failed');\n" +
      "          return of(null);\n" +
      "        }),\n" +
      "        finalize(() => this.loadingState.set(false))\n" +
      "      )\n" +
      "      .subscribe();\n" +
      "  }\n\n" +
      "  logout() {\n" +
      "    this.userState.set(null);\n" +
      "    this.tokenState.set(null);\n" +
      "    localStorage.removeItem('token');\n" +
      "    localStorage.removeItem('user');\n" +
      "    this.router.navigate(['/login']);\n" +
      "  }\n\n" +
      "  refreshToken() {\n" +
      "    return this.http.post<{ token: string }>('/api/refresh', {}).pipe(\n" +
      "      tap(({ token }) => {\n" +
      "        this.tokenState.set(token);\n" +
      "        localStorage.setItem('token', token);\n" +
      "      })\n" +
      "    );\n" +
      "  }\n\n" +
      "  private setAuthData(response: { user: User; token: string; expiresIn: number }) {\n" +
      "    this.userState.set(response.user);\n" +
      "    this.tokenState.set(response.token);\n" +
      "    localStorage.setItem('token', response.token);\n" +
      "    localStorage.setItem('user', JSON.stringify(response.user));\n" +
      "    localStorage.setItem('tokenExpires', String(Date.now() + response.expiresIn * 1000));\n" +
      "  }\n\n" +
      "  private loadStoredAuth() {\n" +
      "    const token = localStorage.getItem('token');\n" +
      "    const user = localStorage.getItem('user');\n" +
      "    const expires = localStorage.getItem('tokenExpires');\n\n" +
      "    if (token && user && expires && Date.now() < +expires) {\n" +
      "      this.tokenState.set(token);\n" +
      "      this.userState.set(JSON.parse(user));\n" +
      "    } else {\n" +
      "      this.logout();\n" +
      "    }\n" +
      "  }\n\n" +
      "  private setupTokenExpiration() {\n" +
      "    effect(() => {\n" +
      "      const expires = localStorage.getItem('tokenExpires');\n" +
      "      if (expires && this.isAuthenticated()) {\n" +
      "        const timeLeft = +expires - Date.now();\n" +
      "        if (timeLeft > 0) {\n" +
      "          setTimeout(() => this.refreshToken().subscribe(), timeLeft - 60000);\n" +
      "        }\n" +
      "      }\n" +
      "    });\n" +
      "  }\n" +
      "}\n\n" +
      "// Guard\n" +
      "export const authGuard: CanActivateFn = () => {\n" +
      "  const auth = inject(SignalAuthService);\n" +
      "  const router = inject(Router);\n\n" +
      "  if (auth.isAuthenticated()) {\n" +
      "    return true;\n" +
      "  }\n\n" +
      "  return router.createUrlTree(['/login']);\n" +
      "};\n\n" +
      "// Interceptor\n" +
      "export const authInterceptor: HttpInterceptorFn = (req, next) => {\n" +
      "  const auth = inject(SignalAuthService);\n" +
      "  const token = auth.token();\n\n" +
      "  if (token) {\n" +
      "    req = req.clone({\n" +
      "      setHeaders: { Authorization: `Bearer ${token}` }\n" +
      "    });\n" +
      "  }\n\n" +
      "  return next(req).pipe(\n" +
      "    catchError(error => {\n" +
      "      if (error.status === 401) {\n" +
      "        auth.logout();\n" +
      "      }\n" +
      "      return throwError(() => error);\n" +
      "    })\n" +
      "  );\n" +
      "};\n" +
      "```",
    category: "Signals Authentication",
    difficulty: "hard",
    tags: ["signals", "authentication", "jwt", "security"],
  },
  {
    id: 105,
    question:
      "How do you handle user-facing error messages with Signals? Show toast/notification system.",
    answer:
      "**Toast Service with Signals:**\n\n" +
      "```typescript\n" +
      "export interface Toast {\n" +
      "  id: number;\n" +
      "  message: string;\n" +
      "  type: 'success' | 'error' | 'warning' | 'info';\n" +
      "  duration?: number;\n" +
      "}\n\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class ToastService {\n" +
      "  private toastsState = signal<Toast[]>([]);\n" +
      "  private nextId = 0;\n\n" +
      "  toasts = this.toastsState.asReadonly();\n" +
      "  hasToasts = computed(() => this.toasts().length > 0);\n\n" +
      "  show(message: string, type: Toast['type'] = 'info', duration = 3000) {\n" +
      "    const toast: Toast = {\n" +
      "      id: this.nextId++,\n" +
      "      message,\n" +
      "      type,\n" +
      "      duration\n" +
      "    };\n\n" +
      "    this.toastsState.update(toasts => [...toasts, toast]);\n\n" +
      "    if (duration > 0) {\n" +
      "      setTimeout(() => this.remove(toast.id), duration);\n" +
      "    }\n" +
      "  }\n\n" +
      "  success(message: string) {\n" +
      "    this.show(message, 'success');\n" +
      "  }\n\n" +
      "  error(message: string) {\n" +
      "    this.show(message, 'error', 5000);\n" +
      "  }\n\n" +
      "  warning(message: string) {\n" +
      "    this.show(message, 'warning');\n" +
      "  }\n\n" +
      "  remove(id: number) {\n" +
      "    this.toastsState.update(toasts => toasts.filter(t => t.id !== id));\n" +
      "  }\n\n" +
      "  clear() {\n" +
      "    this.toastsState.set([]);\n" +
      "  }\n" +
      "}\n\n" +
      "// Toast Container Component\n" +
      "@Component({\n" +
      "  selector: 'app-toast-container',\n" +
      "  standalone: true,\n" +
      "  template: `\n" +
      '    <div class="toast-container">\n' +
      "      @for (toast of toastService.toasts(); track toast.id) {\n" +
      '        <div class="toast" [class]="toast.type">\n' +
      "          <span>{{ toast.message }}</span>\n" +
      '          <button (click)="toastService.remove(toast.id)">✕</button>\n' +
      "        </div>\n" +
      "      }\n" +
      "    </div>\n" +
      "  `,\n" +
      "  styles: [`\n" +
      "    .toast-container {\n" +
      "      position: fixed;\n" +
      "      top: 20px;\n" +
      "      right: 20px;\n" +
      "      z-index: 9999;\n" +
      "    }\n" +
      "    .toast {\n" +
      "      padding: 12px 16px;\n" +
      "      margin-bottom: 8px;\n" +
      "      border-radius: 4px;\n" +
      "      box-shadow: 0 2px 8px rgba(0,0,0,0.15);\n" +
      "    }\n" +
      "    .success { background: #4caf50; color: white; }\n" +
      "    .error { background: #f44336; color: white; }\n" +
      "    .warning { background: #ff9800; color: white; }\n" +
      "    .info { background: #2196f3; color: white; }\n" +
      "  `]\n" +
      "})\n" +
      "export class ToastContainerComponent {\n" +
      "  toastService = inject(ToastService);\n" +
      "}\n\n" +
      "// Usage in other components\n" +
      "@Component({...})\n" +
      "export class DataComponent {\n" +
      "  toast = inject(ToastService);\n" +
      "  http = inject(HttpClient);\n\n" +
      "  saveData(data: any) {\n" +
      "    this.http.post('/api/data', data)\n" +
      "      .pipe(\n" +
      "        tap(() => this.toast.success('Data saved successfully!')),\n" +
      "        catchError(error => {\n" +
      "          this.toast.error(error.message);\n" +
      "          return of(null);\n" +
      "        })\n" +
      "      )\n" +
      "      .subscribe();\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Form Validation Errors:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  template: `\n" +
      "    <form>\n" +
      '      <input [(ngModel)]="name" name="name" />\n' +
      "      @if (errors().name) {\n" +
      '        <span class="error">{{ errors().name }}</span>\n' +
      "      }\n\n" +
      '      <input [(ngModel)]="email" name="email" />\n' +
      "      @if (errors().email) {\n" +
      '        <span class="error">{{ errors().email }}</span>\n' +
      "      }\n\n" +
      '      <button (click)="submit()">Submit</button>\n' +
      "    </form>\n" +
      "  `\n" +
      "})\n" +
      "export class FormComponent {\n" +
      "  name = '';\n" +
      "  email = '';\n" +
      "  errors = signal<Record<string, string>>({});\n\n" +
      "  submit() {\n" +
      "    this.http.post('/api/users', { name: this.name, email: this.email })\n" +
      "      .pipe(\n" +
      "        catchError(error => {\n" +
      "          if (error.status === 400) {\n" +
      "            this.errors.set(error.error.errors);\n" +
      "          }\n" +
      "          return of(null);\n" +
      "        })\n" +
      "      )\n" +
      "      .subscribe();\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "Signals User Messages",
    difficulty: "hard",
    tags: ["signals", "toast", "notifications", "ux"],
  },
  {
    id: 105,
    question: "How do you implement Reactive Search with Signals?",
    answer:
      "**Signal-based Search with Debounce:**\n\n" +
      "```typescript\n" +
      "@Component({\n" +
      "  selector: 'app-user-search',\n" +
      "  standalone: true,\n" +
      "  imports: [FormsModule],\n" +
      "  template: `\n" +
      "    <input \n" +
      '      [value]="searchQuery()" \n' +
      '      (input)="searchQuery.set($any($event.target).value)" \n' +
      '      placeholder="Search users..." />\n\n' +
      "    @if (loading()) {\n" +
      "      <p>Searching...</p>\n" +
      "    }\n\n" +
      "    @if (error(); as err) {\n" +
      '      <p class="error">{{ err }}</p>\n' +
      "    }\n\n" +
      "    <p>Found: {{ results().length }} users</p>\n\n" +
      "    @for (user of results(); track user.id) {\n" +
      '      <div class="user-card">{{ user.name }}</div>\n' +
      "    } @empty {\n" +
      "      <p>No results</p>\n" +
      "    }\n" +
      "  `\n" +
      "})\n" +
      "export class UserSearchComponent {\n" +
      "  private http = inject(HttpClient);\n\n" +
      "  searchQuery = signal('');\n" +
      "  results = signal<User[]>([]);\n" +
      "  loading = signal(false);\n" +
      "  error = signal<string | null>(null);\n\n" +
      "  constructor() {\n" +
      "    // Auto-search when query changes (with debounce using RxJS)\n" +
      "    toObservable(this.searchQuery)\n" +
      "      .pipe(\n" +
      "        debounceTime(300),\n" +
      "        distinctUntilChanged(),\n" +
      "        tap(() => {\n" +
      "          this.loading.set(true);\n" +
      "          this.error.set(null);\n" +
      "        }),\n" +
      "        switchMap(query => {\n" +
      "          if (!query) {\n" +
      "            this.results.set([]);\n" +
      "            this.loading.set(false);\n" +
      "            return of([]);\n" +
      "          }\n\n" +
      "          return this.http.get<User[]>(`/api/users/search?q=${query}`).pipe(\n" +
      "            catchError(error => {\n" +
      "              this.error.set(error.message);\n" +
      "              return of([]);\n" +
      "            }),\n" +
      "            finalize(() => this.loading.set(false))\n" +
      "          );\n" +
      "        })\n" +
      "      )\n" +
      "      .subscribe(users => this.results.set(users));\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Alternative: Pure Signal Approach (No RxJS):**\n\n" +
      "```typescript\n" +
      "// Client-side filtering\n" +
      "@Component({...})\n" +
      "export class Component {\n" +
      "  allUsers = signal<User[]>([]);\n" +
      "  searchQuery = signal('');\n\n" +
      "  // Computed filtered results\n" +
      "  filteredUsers = computed(() => {\n" +
      "    const query = this.searchQuery().toLowerCase();\n" +
      "    if (!query) return this.allUsers();\n\n" +
      "    return this.allUsers().filter(user =>\n" +
      "      user.name.toLowerCase().includes(query) ||\n" +
      "      user.email.toLowerCase().includes(query)\n" +
      "    );\n" +
      "  });\n\n" +
      "  resultCount = computed(() => this.filteredUsers().length);\n" +
      "}\n" +
      "```",
    category: "Signals Reactive Search",
    difficulty: "hard",
    tags: ["signals", "search", "debounce", "reactive"],
  },
  {
    id: 106,
    question: "How do you implement Pagination with Signals?",
    answer:
      "**Complete Pagination System:**\n\n" +
      "```typescript\n" +
      "@Injectable({ providedIn: 'root' })\n" +
      "export class PaginatedDataService {\n" +
      "  private http = inject(HttpClient);\n\n" +
      "  // State\n" +
      "  private dataState = signal<User[]>([]);\n" +
      "  private totalState = signal(0);\n" +
      "  private pageState = signal(1);\n" +
      "  private pageSizeState = signal(10);\n" +
      "  private loadingState = signal(false);\n\n" +
      "  // Public\n" +
      "  data = this.dataState.asReadonly();\n" +
      "  total = this.totalState.asReadonly();\n" +
      "  page = this.pageState.asReadonly();\n" +
      "  pageSize = this.pageSizeState.asReadonly();\n" +
      "  loading = this.loadingState.asReadonly();\n\n" +
      "  // Computed\n" +
      "  totalPages = computed(() => Math.ceil(this.total() / this.pageSize()));\n" +
      "  hasNext = computed(() => this.page() < this.totalPages());\n" +
      "  hasPrev = computed(() => this.page() > 1);\n" +
      "  startIndex = computed(() => (this.page() - 1) * this.pageSize() + 1);\n" +
      "  endIndex = computed(() => Math.min(this.page() * this.pageSize(), this.total()));\n\n" +
      "  constructor() {\n" +
      "    // Auto-load when page/pageSize changes\n" +
      "    effect(() => {\n" +
      "      const page = this.page();\n" +
      "      const pageSize = this.pageSize();\n" +
      "      this.load(page, pageSize);\n" +
      "    });\n" +
      "  }\n\n" +
      "  private load(page: number, pageSize: number) {\n" +
      "    this.loadingState.set(true);\n\n" +
      "    this.http.get<{ data: User[]; total: number }>(\n" +
      "      `/api/users?page=${page}&pageSize=${pageSize}`\n" +
      "    )\n" +
      "      .pipe(finalize(() => this.loadingState.set(false)))\n" +
      "      .subscribe(response => {\n" +
      "        this.dataState.set(response.data);\n" +
      "        this.totalState.set(response.total);\n" +
      "      });\n" +
      "  }\n\n" +
      "  nextPage() {\n" +
      "    if (this.hasNext()) {\n" +
      "      this.pageState.update(p => p + 1);\n" +
      "    }\n" +
      "  }\n\n" +
      "  prevPage() {\n" +
      "    if (this.hasPrev()) {\n" +
      "      this.pageState.update(p => p - 1);\n" +
      "    }\n" +
      "  }\n\n" +
      "  goToPage(page: number) {\n" +
      "    if (page >= 1 && page <= this.totalPages()) {\n" +
      "      this.pageState.set(page);\n" +
      "    }\n" +
      "  }\n\n" +
      "  setPageSize(size: number) {\n" +
      "    this.pageSizeState.set(size);\n" +
      "    this.pageState.set(1); // Reset to first page\n" +
      "  }\n" +
      "}\n\n" +
      "// Component\n" +
      "@Component({\n" +
      "  template: `\n" +
      "    @for (user of service.data(); track user.id) {\n" +
      "      <div>{{ user.name }}</div>\n" +
      "    }\n\n" +
      '    <div class="pagination">\n' +
      '      <button (click)="service.prevPage()" [disabled]="!service.hasPrev()">\n' +
      "        Previous\n" +
      "      </button>\n\n" +
      "      <span>Page {{ service.page() }} of {{ service.totalPages() }}</span>\n" +
      "      <span>({{ service.startIndex() }}-{{ service.endIndex() }} of {{ service.total() }})</span>\n\n" +
      '      <button (click)="service.nextPage()" [disabled]="!service.hasNext()">\n' +
      "        Next\n" +
      "      </button>\n\n" +
      '      <select [value]="service.pageSize()" (change)="service.setPageSize(+$any($event.target).value)">\n' +
      '        <option value="10">10</option>\n' +
      '        <option value="25">25</option>\n' +
      '        <option value="50">50</option>\n' +
      "      </select>\n" +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "export class UsersComponent {\n" +
      "  service = inject(PaginatedDataService);\n" +
      "}\n" +
      "```",
    category: "Signals Pagination",
    difficulty: "hard",
    tags: ["signals", "pagination", "data-tables", "ux"],
  },
];

export default ANGULAR_ENHANCED_QUESTIONS;
