# Angular Questions 8-15 - Ready to Add

## Instructions

Copy these questions and add them to `src/data/angular-enhanced.ts` before the closing `];`

---

## Question 8: Component Lifecycle Hooks

````typescript
{
  id: 8,
  question: "Explain Angular component lifecycle hooks in detail. What is ngOnDestroy used for and why is it critical?",
  answer:
    "Angular components go through a lifecycle managed by Angular, with hooks that let you tap into key moments.\n\n" +
    "**Complete Lifecycle Order:**\n\n" +
    "1. **constructor()** - Class instantiation, basic initialization\n" +
    "2. **ngOnChanges()** - When @Input properties change\n" +
    "3. **ngOnInit()** - After first ngOnChanges, component initialized\n" +
    "4. **ngDoCheck()** - Custom change detection\n" +
    "5. **ngAfterContentInit()** - After content projection initialized\n" +
    "6. **ngAfterContentChecked()** - After content checked\n" +
    "7. **ngAfterViewInit()** - After view initialized\n" +
    "8. **ngAfterViewChecked()** - After view checked\n" +
    "9. **ngOnDestroy()** - Before component destruction\n\n" +
    "**Detailed Explanations:**\n\n" +
    "**constructor:**\n" +
    "```typescript\n" +
    "export class MyComponent {\n" +
    "  constructor(\n" +
    "    private userService: UserService,\n" +
    "    private router: Router\n" +
    "  ) {\n" +
    "    // ✅ Dependency injection\n" +
    "    // ✅ Initialize properties\n" +
    "    console.log('Constructor called');\n" +
    "    \n" +
    "    // ❌ Don't access @Input() here (not set yet!)\n" +
    "    // ❌ Don't access ViewChild/ContentChild (not available)\n" +
    "    // ❌ Avoid heavy logic\n" +
    "  }\n" +
    "}\n" +
    "```\n\n" +
    "**ngOnChanges:**\n" +
    "```typescript\n" +
    "import { OnChanges, SimpleChanges } from '@angular/core';\n\n" +
    "export class UserComponent implements OnChanges {\n" +
    "  @Input() user: User;\n" +
    "  @Input() config: Config;\n\n" +
    "  ngOnChanges(changes: SimpleChanges) {\n" +
    "    // Called before ngOnInit and whenever @Input changes\n" +
    "    \n" +
    "    if (changes['user']) {\n" +
    "      console.log('Previous:', changes['user'].previousValue);\n" +
    "      console.log('Current:', changes['user'].currentValue);\n" +
    "      console.log('First change?', changes['user'].firstChange);\n" +
    "      \n" +
    "      if (!changes['user'].firstChange) {\n" +
    "        // Not first change - reload data\n" +
    "        this.loadUserData(changes['user'].currentValue);\n" +
    "      }\n" +
    "    }\n" +
    "  }\n" +
    "}\n" +
    "```\n\n" +
    "**ngOnInit:**\n" +
    "```typescript\n" +
    "import { OnInit } from '@angular/core';\n\n" +
    "export class Component implements OnInit {\n" +
    "  @Input() userId: number;\n\n" +
    "  ngOnInit() {\n" +
    "    // ✅ Component fully initialized\n" +
    "    // ✅ @Input values available\n" +
    "    // ✅ Best place for initialization logic\n" +
    "    \n" +
    "    // Fetch data\n" +
    "    this.userService.getUser(this.userId).subscribe(...);\n" +
    "    \n" +
    "    // Setup subscriptions\n" +
    "    this.setupWebSocket();\n" +
    "    \n" +
    "    // Initialize form\n" +
    "    this.createForm();\n" +
    "  }\n" +
    "}\n" +
    "```\n\n" +
    "**ngOnDestroy (CRITICAL for Cleanup):**\n\n" +
    "```typescript\n" +
    "import { OnDestroy } from '@angular/core';\n" +
    "import { Subscription } from 'rxjs';\n\n" +
    "export class Component implements OnInit, OnDestroy {\n" +
    "  private subscriptions = new Subscription();\n" +
    "  private intervalId: any;\n\n" +
    "  ngOnInit() {\n" +
    "    // ❌ Without cleanup - memory leak!\n" +
    "    this.userService.getUsers().subscribe(users => {...});\n" +
    "    \n" +
    "    // ✅ Add to subscription collection\n" +
    "    this.subscriptions.add(\n" +
    "      this.userService.getUsers().subscribe(users => {...})\n" +
    "    );\n" +
    "    \n" +
    "    this.subscriptions.add(\n" +
    "      this.route.params.subscribe(params => {...})\n" +
    "    );\n\n" +
    "    // Timer\n" +
    "    this.intervalId = setInterval(() => this.tick(), 1000);\n" +
    "  }\n\n" +
    "  ngOnDestroy() {\n" +
    "    // ✅ Unsubscribe from all observables\n" +
    "    this.subscriptions.unsubscribe();\n" +
    "    \n" +
    "    // ✅ Clear timers\n" +
    "    if (this.intervalId) {\n" +
    "      clearInterval(this.intervalId);\n" +
    "    }\n" +
    "    \n" +
    "    // ✅ Complete subjects\n" +
    "    this.destroy$.next();\n" +
    "    this.destroy$.complete();\n" +
    "    \n" +
    "    // ✅ Remove event listeners\n" +
    "    document.removeEventListener('click', this.handleClick);\n" +
    "    \n" +
    "    // ✅ Close WebSocket connections\n" +
    "    this.webSocket?.close();\n" +
    "  }\n" +
    "}\n" +
    "```\n\n" +
    "**Alternative: takeUntil Pattern:**\n\n" +
    "```typescript\n" +
    "import { Subject } from 'rxjs';\n" +
    "import { takeUntil } from 'rxjs/operators';\n\n" +
    "export class Component implements OnInit, OnDestroy {\n" +
    "  private destroy$ = new Subject<void>();\n\n" +
    "  ngOnInit() {\n" +
    "    // Automatically unsubscribes when destroy$ emits\n" +
    "    this.userService.getUsers()\n" +
    "      .pipe(takeUntil(this.destroy$))\n" +
    "      .subscribe(users => this.users = users);\n\n" +
    "    this.route.params\n" +
    "      .pipe(takeUntil(this.destroy$))\n" +
    "      .subscribe(params => this.loadData(params));\n" +
    "  }\n\n" +
    "  ngOnDestroy() {\n" +
    "    this.destroy$.next();\n" +
    "    this.destroy$.complete();\n" +
    "  }\n" +
    "}\n" +
    "```\n\n" +
    "**ngAfterViewInit:**\n\n" +
    "```typescript\n" +
    "import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';\n\n" +
    "export class Component implements AfterViewInit {\n" +
    "  @ViewChild('input') inputEl: ElementRef;\n\n" +
    "  ngAfterViewInit() {\n" +
    "    // ✅ View is fully initialized\n" +
    "    // ✅ @ViewChild available\n" +
    "    this.inputEl.nativeElement.focus();\n" +
    "    \n" +
    "    // Initialize third-party libraries that need DOM\n" +
    "    $(this.inputEl.nativeElement).datepicker();\n" +
    "  }\n" +
    "}\n" +
    "```\n\n" +
    "**Common Pitfalls:**\n\n" +
    "```typescript\n" +
    "// ❌ Accessing @Input in constructor\n" +
    "constructor() {\n" +
    "  console.log(this.userId); // undefined!\n" +
    "}\n\n" +
    "// ✅ Access in ngOnInit\n" +
    "ngOnInit() {\n" +
    "  console.log(this.userId); // Available\n" +
    "}\n\n" +
    "// ❌ Forgetting to unsubscribe\n" +
    "ngOnInit() {\n" +
    "  this.observable$.subscribe(...); // Memory leak!\n" +
    "}\n\n" +
    "// ✅ Use async pipe (no unsubscribe needed)\n" +
    "data$ = this.service.getData();\n" +
    "// Template: {{ data$ | async }}\n" +
    "```",
  category: "Core Concepts",
  difficulty: "intermediate",
  tags: ["lifecycle", "hooks", "ngOnDestroy", "cleanup", "memory-leaks"],
},
````

---

## Question 9: Storage (localStorage, sessionStorage, Cookies)

````typescript
{
  id: 9,
  question: "Compare localStorage, sessionStorage, and Cookies in Angular. When to use each and how to implement securely?",
  answer:
    "Angular applications can use three browser storage mechanisms, each with different characteristics and security implications.\n\n" +
    "**Comparison Table:**\n\n" +
    "| Feature | localStorage | sessionStorage | Cookies |\n" +
    "|---------|-------------|----------------|--------|\n" +
    "| Capacity | ~10MB | ~10MB | ~4KB |\n" +
    "| Lifetime | Forever (until cleared) | Tab/window session | Set expiration or session |\n" +
    "| Scope | All tabs, same origin | Single tab | All tabs (can be restricted) |\n" +
    "| Sent to server | No | No | Yes (every request) |\n" +
    "| Access | JavaScript only | JavaScript only | JavaScript (unless HttpOnly) |\n" +
    "| Security | XSS vulnerable | XSS vulnerable | Can be HttpOnly + Secure |\n\n" +
    "**localStorage:**\n\n" +
    "```typescript\n" +
    "// Store data permanently\n" +
    "@Injectable({ providedIn: 'root' })\n" +
    "export class StorageService {\n" +
    "  // Save\n" +
    "  setItem(key: string, value: any): void {\n" +
    "    try {\n" +
    "      localStorage.setItem(key, JSON.stringify(value));\n" +
    "    } catch (error) {\n" +
    "      console.error('Storage quota exceeded', error);\n" +
    "    }\n" +
    "  }\n\n" +
    "  // Retrieve\n" +
    "  getItem<T>(key: string): T | null {\n" +
    "    try {\n" +
    "      const item = localStorage.getItem(key);\n" +
    "      return item ? JSON.parse(item) : null;\n" +
    "    } catch (error) {\n" +
    "      console.error('Error reading from storage', error);\n" +
    "      return null;\n" +
    "    }\n" +
    "  }\n\n" +
    "  // Remove\n" +
    "  removeItem(key: string): void {\n" +
    "    localStorage.removeItem(key);\n" +
    "  }\n\n" +
    "  // Clear all\n" +
    "  clear(): void {\n" +
    "    localStorage.clear();\n" +
    "  }\n" +
    "}\n\n" +
    "// Usage\n" +
    "this.storage.setItem('theme', 'dark');\n" +
    "const theme = this.storage.getItem<string>('theme');\n" +
    "```\n\n" +
    "**Use Cases for localStorage:**\n" +
    "- User preferences (theme, language)\n" +
    "- Draft content (auto-save)\n" +
    "- Shopping cart (persists across sessions)\n" +
    "- Recently viewed items\n" +
    "- ❌ NOT for sensitive data (access tokens, passwords)\n\n" +
    "**sessionStorage:**\n\n" +
    "```typescript\n" +
    "// Same API as localStorage\n" +
    "sessionStorage.setItem('key', 'value');\n" +
    "sessionStorage.getItem('key');\n" +
    "sessionStorage.removeItem('key');\n" +
    "sessionStorage.clear();\n" +
    "```\n\n" +
    "**Use Cases for sessionStorage:**\n" +
    "- Form data during multi-step process\n" +
    "- Temporary filters\n" +
    "- Single-session state\n" +
    "- Tab-specific data\n\n" +
    "**Cookies:**\n\n" +
    "```typescript\n" +
    "// Manual cookie service\n" +
    "@Injectable({ providedIn: 'root' })\n" +
    "export class CookieService {\n" +
    "  setCookie(name: string, value: string, days: number = 7): void {\n" +
    "    const expires = new Date();\n" +
    "    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);\n" +
    "    \n" +
    "    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;\n" +
    "  }\n\n" +
    "  getCookie(name: string): string | null {\n" +
    "    const nameEQ = name + '=';\n" +
    "    const cookies = document.cookie.split(';');\n" +
    "    \n" +
    "    for (let cookie of cookies) {\n" +
    "      cookie = cookie.trim();\n" +
    "      if (cookie.indexOf(nameEQ) === 0) {\n" +
    "        return cookie.substring(nameEQ.length);\n" +
    "      }\n" +
    "    }\n" +
    "    return null;\n" +
    "  }\n\n" +
    "  deleteCookie(name: string): void {\n" +
    "    this.setCookie(name, '', -1);\n" +
    "  }\n" +
    "}\n" +
    "```\n\n" +
    "**Security Best Practices:**\n\n" +
    "**JWT Token Storage:**\n\n" +
    "```typescript\n" +
    "// ❌ INSECURE - Vulnerable to XSS\n" +
    "localStorage.setItem('accessToken', token);\n\n" +
    "// ✅ BETTER - HttpOnly cookie (set by server)\n" +
    "// Server response:\n" +
    "Set-Cookie: accessToken=xyz; HttpOnly; Secure; SameSite=Strict\n\n" +
    "// HttpOnly = JavaScript can't access (protects from XSS)\n" +
    "// Secure = HTTPS only\n" +
    "// SameSite = CSRF protection\n" +
    "```\n\n" +
    "**Hybrid Approach:**\n\n" +
    "```typescript\n" +
    "@Injectable({ providedIn: 'root' })\n" +
    "export class AuthService {\n" +
    "  // Store access token in memory (most secure)\n" +
    "  private accessToken: string | null = null;\n\n" +
    "  // Store refresh token in HttpOnly cookie (server-side)\n" +
    "  // Store non-sensitive data in localStorage\n" +
    "  \n" +
    "  login(credentials: Credentials) {\n" +
    "    return this.http.post('/api/login', credentials, { withCredentials: true })\n" +
    "      .pipe(\n" +
    "        tap(response => {\n" +
    "          this.accessToken = response.accessToken; // Memory only\n" +
    "          localStorage.setItem('user', JSON.stringify(response.user)); // Non-sensitive\n" +
    "        })\n" +
    "      );\n" +
    "  }\n\n" +
    "  getToken(): string | null {\n" +
    "    return this.accessToken;\n" +
    "  }\n" +
    "}\n" +
    "```\n\n" +
    "**Best Practices:**\n" +
    "1. Never store sensitive data (tokens, passwords) in localStorage\n" +
    "2. Use HttpOnly cookies for auth tokens\n" +
    "3. Always set Secure flag on cookies (HTTPS only)\n" +
    "4. Use SameSite=Strict for CSRF protection\n" +
    "5. Encrypt sensitive data before storing\n" +
    "6. Clear storage on logout\n" +
    "7. Handle storage quota exceeded errors",
  category: "Security & Storage",
  difficulty: "intermediate",
  tags: ["storage", "localStorage", "cookies", "security", "auth"],
},
````

---

## Question 10: Reactive Forms vs Template-Driven Forms

````typescript
{
  id: 10,
  question: "What is the difference between Reactive Forms and Template-Driven Forms in Angular? When should you use each?",
  answer:
    "Angular provides two approaches to building forms, each with different philosophies and use cases.\n\n" +
    "**Template-Driven Forms:**\n\n" +
    "Form logic defined in template using directives.\n\n" +
    "```typescript\n" +
    "import { FormsModule } from '@angular/forms';\n\n" +
    "@Component({\n" +
    "  standalone: true,\n" +
    "  imports: [FormsModule],\n" +
    "  template: `\n" +
    "    <form #form=\"ngForm\" (ngSubmit)=\"onSubmit(form)\">\n" +
    "      <input \n" +
    "        name=\"email\"\n" +
    "        [(ngModel)]=\"user.email\"\n" +
    "        required\n" +
    "        email\n" +
    "        #email=\"ngModel\"\n" +
    "      />\n" +
    "      <div *ngIf=\"email.invalid && email.touched\">\n" +
    "        <span *ngIf=\"email.errors?.['required']\">Email required</span>\n" +
    "        <span *ngIf=\"email.errors?.['email']\">Invalid email</span>\n" +
    "      </div>\n\n" +
    "      <input \n" +
    "        name=\"password\"\n" +
    "        [(ngModel)]=\"user.password\"\n" +
    "        required\n" +
    "        minlength=\"8\"\n" +
    "      />\n\n" +
    "      <button [disabled]=\"form.invalid\">Submit</button>\n" +
    "    </form>\n" +
    "  `\n" +
    "})\n" +
    "export class LoginComponent {\n" +
    "  user = { email: '', password: '' };\n\n" +
    "  onSubmit(form: NgForm) {\n" +
    "    if (form.valid) {\n" +
    "      console.log(form.value);\n" +
    "    }\n" +
    "  }\n" +
    "}\n" +
    "```\n\n" +
    "**Reactive Forms:**\n\n" +
    "Form logic defined in component class.\n\n" +
    "```typescript\n" +
    "import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';\n\n" +
    "@Component({\n" +
    "  standalone: true,\n" +
    "  imports: [ReactiveFormsModule],\n" +
    "  template: `\n" +
    "    <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n" +
    "      <input formControlName=\"email\" />\n" +
    "      <div *ngIf=\"email.invalid && email.touched\">\n" +
    "        <span *ngIf=\"email.errors?.['required']\">Email required</span>\n" +
    "        <span *ngIf=\"email.errors?.['email']\">Invalid email</span>\n" +
    "      </div>\n\n" +
    "      <input formControlName=\"password\" type=\"password\" />\n\n" +
    "      <button [disabled]=\"loginForm.invalid\">Submit</button>\n" +
    "    </form>\n" +
    "  `\n" +
    "})\n" +
    "export class LoginComponent {\n" +
    "  loginForm: FormGroup;\n\n" +
    "  constructor(private fb: FormBuilder) {\n" +
    "    this.loginForm = this.fb.group({\n" +
    "      email: ['', [Validators.required, Validators.email]],\n" +
    "      password: ['', [Validators.required, Validators.minLength(8)]]\n" +
    "    });\n" +
    "  }\n\n" +
    "  get email() {\n" +
    "    return this.loginForm.get('email')!;\n" +
    "  }\n\n" +
    "  onSubmit() {\n" +
    "    if (this.loginForm.valid) {\n" +
    "      console.log(this.loginForm.value);\n" +
    "    }\n" +
    "  }\n" +
    "}\n" +
    "```\n\n" +
    "**Advanced Reactive Forms:**\n\n" +
    "**Custom Validators:**\n\n" +
    "```typescript\n" +
    "// Synchronous validator\n" +
    "export function passwordStrength(control: AbstractControl): ValidationErrors | null {\n" +
    "  const value = control.value;\n" +
    "  if (!value) return null;\n\n" +
    "  const hasNumber = /[0-9]/.test(value);\n" +
    "  const hasUpper = /[A-Z]/.test(value);\n" +
    "  const hasLower = /[a-z]/.test(value);\n" +
    "  const hasSpecial = /[!@#$%^&*]/.test(value);\n\n" +
    "  const valid = hasNumber && hasUpper && hasLower && hasSpecial;\n" +
    "  return valid ? null : { passwordStrength: true };\n" +
    "}\n\n" +
    "// Usage\n" +
    "this.fb.group({\n" +
    "  password: ['', [Validators.required, passwordStrength]]\n" +
    "});\n" +
    "```\n\n" +
    "**Async Validators:**\n\n" +
    "```typescript\n" +
    "// Check if email exists\n" +
    "export class EmailValidator {\n" +
    "  static createValidator(userService: UserService): AsyncValidatorFn {\n" +
    "    return (control: AbstractControl): Observable<ValidationErrors | null> => {\n" +
    "      if (!control.value) {\n" +
    "        return of(null);\n" +
    "      }\n\n" +
    "      return userService.checkEmailExists(control.value).pipe(\n" +
    "        map(exists => exists ? { emailTaken: true } : null),\n" +
    "        catchError(() => of(null))\n" +
    "      );\n" +
    "    };\n" +
    "  }\n" +
    "}\n\n" +
    "// Usage\n" +
    "this.fb.group({\n" +
    "  email: [\n" +
    "    '',\n" +
    "    [Validators.required, Validators.email], // Sync validators\n" +
    "    [EmailValidator.createValidator(this.userService)] // Async validators\n" +
    "  ]\n" +
    "});\n" +
    "```\n\n" +
    "**Cross-Field Validation:**\n\n" +
    "```typescript\n" +
    "// Password confirmation validator\n" +
    "export function passwordMatch(control: AbstractControl): ValidationErrors | null {\n" +
    "  const password = control.get('password');\n" +
    "  const confirmPassword = control.get('confirmPassword');\n\n" +
    "  if (!password || !confirmPassword) return null;\n\n" +
    "  return password.value === confirmPassword.value \n" +
    "    ? null \n" +
    "    : { passwordMismatch: true };\n" +
    "}\n\n" +
    "// Apply to FormGroup\n" +
    "this.signupForm = this.fb.group({\n" +
    "  password: ['', Validators.required],\n" +
    "  confirmPassword: ['', Validators.required]\n" +
    "}, { validators: passwordMatch });\n" +
    "```\n\n" +
    "**Dynamic Forms (FormArray):**\n\n" +
    "```typescript\n" +
    "export class DynamicFormComponent {\n" +
    "  form = this.fb.group({\n" +
    "    name: [''],\n" +
    "    skills: this.fb.array([]) // Dynamic array\n" +
    "  });\n\n" +
    "  get skills() {\n" +
    "    return this.form.get('skills') as FormArray;\n" +
    "  }\n\n" +
    "  addSkill() {\n" +
    "    const skillForm = this.fb.group({\n" +
    "      name: ['', Validators.required],\n" +
    "      level: ['beginner']\n" +
    "    });\n" +
    "    this.skills.push(skillForm);\n" +
    "  }\n\n" +
    "  removeSkill(index: number) {\n" +
    "    this.skills.removeAt(index);\n" +
    "  }\n" +
    "}\n\n" +
    "// Template\n" +
    "<div formArrayName=\"skills\">\n" +
    "  <div *ngFor=\"let skill of skills.controls; let i = index\" [formGroupName]=\"i\">\n" +
    "    <input formControlName=\"name\" />\n" +
    "    <select formControlName=\"level\">\n" +
    "      <option value=\"beginner\">Beginner</option>\n" +
    "      <option value=\"advanced\">Advanced</option>\n" +
    "    </select>\n" +
    "    <button (click)=\"removeSkill(i)\">Remove</button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<button (click)=\"addSkill()\">Add Skill</button>\n" +
    "```\n\n" +
    "**When to Use Each:**\n\n" +
    "**Template-Driven:**\n" +
    "- Simple forms (login, contact)\n" +
    "- Rapid prototyping\n" +
    "- Similar to AngularJS ng-model\n" +
    "- Less TypeScript code\n\n" +
    "**Reactive:**\n" +
    "- Complex validation\n" +
    "- Dynamic forms\n" +
    "- Testable form logic\n" +
    "- Reusable validators\n" +
    "- Unit testing required\n" +
    "- Need full programmatic control",
  category: "Forms",
  difficulty: "hard",
  tags: ["forms", "reactive-forms", "template-driven", "validation", "formbuilder"],
},
````

---

## Question 11: Routing Guards

````typescript
{
  id: 11,
  question: "Explain Angular routing guards: CanActivate, CanActivateChild, CanLoad, CanDeactivate, and Resolve.",
  answer:
    "Route guards control navigation to and from routes, enabling authentication, data pre-loading, and unsaved changes warnings.\n\n" +
    "**1. CanActivate - Protect Routes:**\n\n" +
    "```typescript\n" +
    "import { Injectable } from '@angular/core';\n" +
    "import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';\n\n" +
    "@Injectable({ providedIn: 'root' })\n" +
    "export class AuthGuard implements CanActivate {\n" +
    "  constructor(\n" +
    "    private authService: AuthService,\n" +
    "    private router: Router\n" +
    "  ) {}\n\n" +
    "  canActivate(route: ActivatedRouteSnapshot): boolean {\n" +
    "    if (this.authService.isAuthenticated()) {\n" +
    "      return true; // Allow navigation\n" +
    "    }\n\n" +
    "    // Redirect to login\n" +
    "    this.router.navigate(['/login'], {\n" +
    "      queryParams: { returnUrl: route.url }\n" +
    "    });\n" +
    "    return false; // Block navigation\n" +
    "  }\n" +
    "}\n\n" +
    "// Route configuration\n" +
    "const routes: Routes = [\n" +
    "  {\n" +
    "    path: 'dashboard',\n" +
    "    component: DashboardComponent,\n" +
    "    canActivate: [AuthGuard] // Protected!\n" +
    "  }\n" +
    "];\n" +
    "```\n\n" +
    "**Functional Guard (Angular 15+):**\n\n" +
    "```typescript\n" +
    "import { inject } from '@angular/core';\n" +
    "import { Router } from '@angular/router';\n\n" +
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
    "{ path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }\n" +
    "```\n\n" +
    "**2. CanActivateChild - Protect Child Routes:**\n\n" +
    "```typescript\n" +
    "@Injectable({ providedIn: 'root' })\n" +
    "export class AdminGuard implements CanActivateChild {\n" +
    "  canActivateChild(): boolean {\n" +
    "    return this.authService.hasRole('admin');\n" +
    "  }\n" +
    "}\n\n" +
    "// Route\n" +
    "{\n" +
    "  path: 'admin',\n" +
    "  canActivateChild: [AdminGuard], // Applies to all children\n" +
    "  children: [\n" +
    "    { path: 'users', component: UsersComponent },\n" +
    "    { path: 'settings', component: SettingsComponent }\n" +
    "  ]\n" +
    "}\n" +
    "```\n\n" +
    "**3. CanLoad - Lazy Loading Protection:**\n\n" +
    "```typescript\n" +
    "@Injectable({ providedIn: 'root' })\n" +
    "export class AdminCanLoad implements CanLoad {\n" +
    "  canLoad(): boolean {\n" +
    "    // Prevents loading the module chunk if false\n" +
    "    return this.authService.hasRole('admin');\n" +
    "  }\n" +
    "}\n\n" +
    "// Route - lazy loaded\n" +
    "{\n" +
    "  path: 'admin',\n" +
    "  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),\n" +
    "  canLoad: [AdminCanLoad] // Module won't load if false\n" +
    "}\n\n" +
    "// Difference from CanActivate:\n" +
    "// - CanLoad: Module not loaded at all (smaller bundle)\n" +
    "// - CanActivate: Module loaded, but component not activated\n" +
    "```\n\n" +
    "**4. CanDeactivate - Unsaved Changes Warning:**\n\n" +
    "```typescript\n" +
    "// Component interface\n" +
    "export interface CanComponentDeactivate {\n" +
    "  canDeactivate: () => boolean | Observable<boolean>;\n" +
    "}\n\n" +
    "// Guard\n" +
    "@Injectable({ providedIn: 'root' })\n" +
    "export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {\n" +
    "  canDeactivate(component: CanComponentDeactivate): boolean {\n" +
    "    return component.canDeactivate ? component.canDeactivate() : true;\n" +
    "  }\n" +
    "}\n\n" +
    "// Component\n" +
    "@Component({...})\n" +
    "export class EditFormComponent implements CanComponentDeactivate {\n" +
    "  form: FormGroup;\n" +
    "  saved = false;\n\n" +
    "  canDeactivate(): boolean {\n" +
    "    if (this.form.dirty && !this.saved) {\n" +
    "      return confirm('You have unsaved changes. Leave anyway?');\n" +
    "    }\n" +
    "    return true;\n" +
    "  }\n\n" +
    "  onSubmit() {\n" +
    "    this.save().subscribe(() => {\n" +
    "      this.saved = true;\n" +
    "      this.router.navigate(['/list']);\n" +
    "    });\n" +
    "  }\n" +
    "}\n\n" +
    "// Route\n" +
    "{\n" +
    "  path: 'edit/:id',\n" +
    "  component: EditFormComponent,\n" +
    "  canDeactivate: [UnsavedChangesGuard]\n" +
    "}\n" +
    "```\n\n" +
    "**5. Resolve - Pre-fetch Data:**\n\n" +
    "(See next question for detailed explanation)\n\n" +
    "**Guard Execution Order:**\n\n" +
    "```\n" +
    "1. CanDeactivate (on current route)\n" +
    "2. CanLoad (if lazy loading)\n" +
    "3. CanActivateChild (parent routes)\n" +
    "4. CanActivate (target route)\n" +
    "5. Resolve (if all guards pass)\n" +
    "```\n\n" +
    "**Multiple Guards:**\n\n" +
    "```typescript\n" +
    "{\n" +
    "  path: 'dashboard',\n" +
    "  component: DashboardComponent,\n" +
    "  canActivate: [AuthGuard, RoleGuard, SubscriptionGuard],\n" +
    "  // ALL must return true\n" +
    "}\n" +
    "```\n\n" +
    "**Observable/Promise Guards:**\n\n" +
    "```typescript\n" +
    "canActivate(): Observable<boolean> {\n" +
    "  return this.authService.checkAuth().pipe(\n" +
    "    map(authenticated => {\n" +
    "      if (authenticated) return true;\n" +
    "      this.router.navigate(['/login']);\n" +
    "      return false;\n" +
    "    })\n" +
    "  );\n" +
    "}\n" +
    "```",
  category: "Routing",
  difficulty: "hard",
  tags: ["routing", "guards", "canactivate", "canload", "candeactivate", "auth"],
},
````

Continue in next message due to length...
