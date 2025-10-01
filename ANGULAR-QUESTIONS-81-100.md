# Angular Questions 81-100: Signals, Advanced RxJS, Forms, and More

## Batch 7: Questions 81-90

### Q81: What are Angular Signals? How does signal-based change detection work?

**Answer:**

Signals (Angular 16+) are reactive primitives for managing state changes.

**Basic Signals:**

```typescript
import { Component, signal, computed, effect } from '@angular/core';

@Component({...})
export class Component {
  // Create signal
  count = signal(0);

  // Computed signal (derived state)
  doubleCount = computed(() => this.count() * 2);

  // Effect (side effects)
  constructor() {
    effect(() => {
      console.log('Count changed:', this.count());
      // Runs automatically when count changes
    });
  }

  // Update signal
  increment() {
    this.count.update(value => value + 1);
  }

  // Set signal
  reset() {
    this.count.set(0);
  }
}

// Template
<p>Count: {{ count() }}</p>
<p>Double: {{ doubleCount() }}</p>
<button (click)="increment()">+1</button>
```

**Signal-Based Change Detection:**

- Fine-grained reactivity
- Only affected components update
- No Zone.js needed
- Better performance

**Benefits:**

1. Explicit dependencies
2. Automatic cleanup
3. Better TypeScript support
4. Simpler mental model
5. Works without Zone.js

---

### Q82: What are Signal-based Inputs and Outputs? Explain the model() API.

**Answer:**

**Signal Inputs (Angular 17.1+):**

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <h1>{{ name() }}</h1>
    <p>{{ email() }}</p>
    <button (click)="handleClick()">Delete</button>
  `
})
export class UserComponent {
  // Signal input (required)
  name = input.required<string>();

  // Signal input (optional with default)
  email = input('no-email@example.com');

  // Signal output
  deleted = output<number>();

  handleClick() {
    this.deleted.emit(this.userId());
  }
}

// Usage
<app-user
  [name]="userName"
  [email]="userEmail"
  (deleted)="onUserDeleted($event)" />
```

**Bi-directional Binding with model():**

```typescript
@Component({
  selector: 'app-counter',
  template: `
    <button (click)="decrement()">-</button>
    <span>{{ value() }}</span>
    <button (click)="increment()">+</button>
  `
})
export class CounterComponent {
  // Two-way binding signal
  value = model(0);

  increment() {
    this.value.update(v => v + 1);
    // Automatically emits valueChange
  }

  decrement() {
    this.value.update(v => v - 1);
  }
}

// Parent usage
<app-counter [(value)]="count" />
// Equivalent to:
<app-counter [value]="count" (valueChange)="count = $event" />
```

---

### Q83: What are Signal-based View Queries? Explain viewChild, contentChild APIs.

**Answer:**

**Signal-based View Queries (Angular 17.2+):**

```typescript
import { Component, viewChild, viewChildren, contentChild, contentChildren } from "@angular/core";

@Component({
  template: `
    <input #nameInput />
    <app-child />
    <app-child />
  `,
})
export class ParentComponent {
  // Single element (returns Signal)
  nameInput = viewChild<ElementRef>("nameInput");
  // Usage: this.nameInput().nativeElement.focus()

  // Single component
  firstChild = viewChild(ChildComponent);
  // Usage: this.firstChild().doSomething()

  // Multiple elements (returns Signal<ReadonlyArray>)
  allChildren = viewChildren(ChildComponent);
  // Usage: this.allChildren().forEach(child => ...)

  ngAfterViewInit() {
    // Queries are available (not null)
    console.log(this.nameInput()?.nativeElement);
  }
}

// Content queries
@Component({
  selector: "app-tabs",
  template: "<ng-content></ng-content>",
})
export class TabsComponent {
  // Query projected content
  tabs = contentChildren(TabComponent);
  firstTab = contentChild(TabComponent);

  ngAfterContentInit() {
    console.log("Tabs:", this.tabs().length);
  }
}
```

**Benefits vs Old API:**

- Returns Signal (always defined)
- No `@ViewChild` decorator
- Type-safe
- Reactive
- No undefined checks needed

---

### Q84: How do you implement CRUD with Signals? Provide complete example.

**Answer:**

**Signal-based CRUD Service:**

```typescript
@Injectable({ providedIn: "root" })
export class UserService {
  // State signals
  private usersState = signal<User[]>([]);
  private loadingState = signal(false);
  private errorState = signal<string | null>(null);

  // Public read-only signals
  users = this.usersState.asReadonly();
  loading = this.loadingState.asReadonly();
  error = this.errorState.asReadonly();

  // Computed
  userCount = computed(() => this.users().length);
  hasUsers = computed(() => this.users().length > 0);

  constructor(private http: HttpClient) {}

  // Load all
  loadUsers() {
    this.loadingState.set(true);
    this.errorState.set(null);

    this.http
      .get<User[]>("/api/users")
      .pipe(
        catchError((error) => {
          this.errorState.set(error.message);
          return of([]);
        }),
        finalize(() => this.loadingState.set(false))
      )
      .subscribe((users) => this.usersState.set(users));
  }

  // Create
  createUser(user: Partial<User>) {
    this.loadingState.set(true);

    this.http
      .post<User>("/api/users", user)
      .pipe(finalize(() => this.loadingState.set(false)))
      .subscribe((newUser) => {
        this.usersState.update((users) => [...users, newUser]);
      });
  }

  // Update
  updateUser(id: number, changes: Partial<User>) {
    this.http.put<User>(`/api/users/${id}`, changes).subscribe((updated) => {
      this.usersState.update((users) => users.map((u) => (u.id === id ? updated : u)));
    });
  }

  // Delete
  deleteUser(id: number) {
    this.http.delete(`/api/users/${id}`).subscribe(() => {
      this.usersState.update((users) => users.filter((u) => u.id !== id));
    });
  }
}

// Component
@Component({
  template: `
    @if (service.loading()) {
      <p>Loading...</p>
    }

    @if (service.error(); as error) {
      <div class="error">{{ error }}</div>
    }

    <p>Total users: {{ service.userCount() }}</p>

    @for (user of service.users(); track user.id) {
      <div class="user-card">
        <h3>{{ user.name }}</h3>
        <button (click)="edit(user)">Edit</button>
        <button (click)="delete(user.id)">Delete</button>
      </div>
    }

    <button (click)="addNew()">Add User</button>
  `,
})
export class UsersComponent implements OnInit {
  constructor(public service: UserService) {}

  ngOnInit() {
    this.service.loadUsers();
  }

  edit(user: User) {
    this.service.updateUser(user.id, { name: "Updated" });
  }

  delete(id: number) {
    this.service.deleteUser(id);
  }

  addNew() {
    this.service.createUser({ name: "New User" });
  }
}
```

---

### Q85: What is the difference between Reactive Forms and Template-Driven Forms?

**Answer:**

**1. Reactive Forms (Recommended):**

```typescript
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";

@Component({
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name" />
      @if (form.controls.name.errors?.["required"]) {
        <span>Name required</span>
      }

      <input formControlName="email" type="email" />
      @if (form.controls.email.errors?.["email"]) {
        <span>Invalid email</span>
      }

      <button [disabled]="form.invalid">Submit</button>
    </form>
  `,
})
export class Component {
  form = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

**2. Template-Driven Forms:**

```typescript
import { FormsModule } from "@angular/forms";

@Component({
  imports: [FormsModule],
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <input name="name" ngModel required minlength="3" #name="ngModel" />
      @if (name.errors?.["required"]) {
        <span>Name required</span>
      }

      <input name="email" ngModel required email type="email" />

      <button [disabled]="form.invalid">Submit</button>
    </form>
  `,
})
export class Component {
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
    }
  }
}
```

**Comparison:**

| Feature       | Reactive              | Template-Driven |
| ------------- | --------------------- | --------------- |
| Setup         | Explicit in component | In template     |
| Validation    | Programmatic          | Directives      |
| Testing       | Easy to test          | Harder          |
| Complexity    | Better for complex    | Simple forms    |
| Type Safety   | Strong                | Weak            |
| Dynamic Forms | Excellent             | Limited         |

---

### Q86: What are RxJS Transformation Operators? Explain map, tap, switchMap, mergeMap.

**Answer:**

**map - Transform Values:**

```typescript
import { map } from "rxjs/operators";

// Transform each emission
this.users$.pipe(map((users) => users.length)).subscribe((count) => console.log(count));

// Extract property
this.user$.pipe(map((user) => user.name)).subscribe((name) => console.log(name));
```

**tap - Side Effects (no transformation):**

```typescript
import { tap } from "rxjs/operators";

this.users$
  .pipe(
    tap((users) => console.log("Users loaded:", users.length)),
    tap((users) => this.cache.set("users", users)),
    map((users) => users.filter((u) => u.active))
  )
  .subscribe();

// Good for: logging, caching, debugging
```

**switchMap - Switch to New Observable:**

```typescript
// Search example
this.searchControl.valueChanges
  .pipe(
    debounceTime(300),
    switchMap((query) => this.searchService.search(query))
    // Cancels previous search if new query arrives
  )
  .subscribe((results) => (this.results = results));
```

**mergeMap - Run All Concurrently:**

```typescript
// Load details for all users
this.userIds$
  .pipe(
    mergeMap((id) => this.http.get(`/api/users/${id}`))
    // All requests run in parallel
  )
  .subscribe((user) => console.log(user));
```

---

### Q87: What is NgRx? Implement complete state management example.

**Answer:**

**NgRx Setup:**

```bash
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
```

**1. Define Actions:**

```typescript
// users.actions.ts
import { createAction, props } from "@ngrx/store";

export const loadUsers = createAction("[Users] Load");
export const loadUsersSuccess = createAction("[Users] Load Success", props<{ users: User[] }>());
export const loadUsersFailure = createAction("[Users] Load Failure", props<{ error: string }>());
```

**2. Create Reducer:**

```typescript
// users.reducer.ts
import { createReducer, on } from "@ngrx/store";

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
```

**3. Create Effects:**

```typescript
// users.effects.ts
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.http.get<User[]>("/api/users").pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}
```

**4. Create Selectors:**

```typescript
// users.selectors.ts
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectUsersState = createFeatureSelector<UsersState>("users");

export const selectAllUsers = createSelector(selectUsersState, (state) => state.users);

export const selectUsersLoading = createSelector(selectUsersState, (state) => state.loading);

export const selectActiveUsers = createSelector(selectAllUsers, (users) =>
  users.filter((u) => u.active)
);
```

**5. Register in App:**

```typescript
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";

bootstrapApplication(AppComponent, {
  providers: [provideStore({ users: usersReducer }), provideEffects([UsersEffects])],
});
```

**6. Use in Component:**

```typescript
@Component({...})
export class UsersComponent {
  users$ = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectUsersLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }
}
```

---

### Q88: What are Route Resolvers? How do you use them?

**Answer:**

Resolvers pre-fetch data before navigating to a route.

**Create Resolver:**

```typescript
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Observable } from "rxjs";

// Functional resolver (Angular 15+)
export const userResolver: ResolveFn<User> = (route, state) => {
  const userService = inject(UserService);
  const userId = route.paramMap.get("id");
  return userService.getUser(+userId);
};

// Class-based resolver (older approach)
@Injectable({ providedIn: "root" })
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const userId = route.paramMap.get("id");
    return this.userService.getUser(+userId);
  }
}
```

**Register in Routes:**

```typescript
const routes: Routes = [
  {
    path: "user/:id",
    component: UserComponent,
    resolve: { user: userResolver }, // Use functional resolver
  },
];
```

**Access in Component:**

```typescript
@Component({...})
export class UserComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Data is already loaded!
    this.user = this.route.snapshot.data['user'];

    // Or subscribe to changes
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }
}
```

**Benefits:**

- Data available before component renders
- No loading spinner needed
- Cleaner component code
- Can prevent navigation if data fails to load

---

### Q89: What is the difference between Observable, Subject, and BehaviorSubject?

**Answer:**

**1. Observable (Unicast):**

```typescript
import { Observable } from "rxjs";

// Cold observable - each subscriber gets own execution
const observable$ = new Observable((observer) => {
  console.log("Execution started");
  observer.next(Math.random());
});

observable$.subscribe((val) => console.log("Sub 1:", val));
observable$.subscribe((val) => console.log("Sub 2:", val));
// Output:
// Execution started
// Sub 1: 0.123
// Execution started
// Sub 2: 0.456 (different value!)
```

**2. Subject (Multicast):**

```typescript
import { Subject } from "rxjs";

// Hot observable - all subscribers share execution
const subject$ = new Subject<number>();

subject$.subscribe((val) => console.log("Sub 1:", val));
subject$.subscribe((val) => console.log("Sub 2:", val));

subject$.next(1); // Both receive 1
subject$.next(2); // Both receive 2

// Late subscriber misses previous values
subject$.subscribe((val) => console.log("Sub 3:", val));
subject$.next(3); // All three receive 3
```

**3. BehaviorSubject (Multicast with Initial Value):**

```typescript
import { BehaviorSubject } from "rxjs";

// Stores current value, replays to new subscribers
const behaviorSubject$ = new BehaviorSubject(0);

behaviorSubject$.subscribe((val) => console.log("Sub 1:", val)); // Gets 0

behaviorSubject$.next(1);
behaviorSubject$.next(2);

// Late subscriber gets current value (2)
behaviorSubject$.subscribe((val) => console.log("Sub 2:", val)); // Gets 2

// Get current value synchronously
console.log(behaviorSubject$.value); // 2
```

**4. ReplaySubject (Multicast with History):**

```typescript
import { ReplaySubject } from "rxjs";

// Replays last N values to new subscribers
const replaySubject$ = new ReplaySubject(2); // Buffer size 2

replaySubject$.next(1);
replaySubject$.next(2);
replaySubject$.next(3);

// Late subscriber gets last 2 values
replaySubject$.subscribe((val) => console.log("Sub:", val));
// Output: 2, 3
```

**When to Use:**

- Observable: HTTP requests, one-time events
- Subject: Event bus, manual emissions
- BehaviorSubject: Current state (user, settings)
- ReplaySubject: Recent history (chat messages)

---

### Q90: What are Custom Pipes? How do you create pure and impure pipes?

**Answer:**

**Pure Pipe (Default):**

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
  pure: true // Default - only runs when input reference changes
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, trail: string = '...'): string {
    return value.length > limit
      ? value.substring(0, limit) + trail
      : value;
  }
}

// Usage
<p>{{ longText | truncate:50:'...' }}</p>
```

**Impure Pipe (Runs on Every Change Detection):**

```typescript
@Pipe({
  name: 'filter',
  standalone: true,
  pure: false // Runs every change detection cycle
})
export class FilterPipe implements PipeTransform {
  transform<T>(items: T[], property: keyof T, value: any): T[] {
    return items.filter(item => item[property] === value);
  }
}

// Usage
<div *ngFor="let user of users | filter:'active':true">
  {{ user.name }}
</div>
```

**Advanced Pipe Examples:**

```typescript
// Currency format
@Pipe({ name: 'customCurrency', standalone: true })
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(value);
  }
}

// Time ago
@Pipe({ name: 'timeAgo', standalone: true })
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date): string {
    const seconds = Math.floor((Date.now() - value.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }
}

// Usage
<p>{{ user.price | customCurrency:'EUR' }}</p>
<p>Posted {{ post.createdAt | timeAgo }}</p>
```

**Pure vs Impure:**

| Pure                      | Impure                    |
| ------------------------- | ------------------------- |
| Only runs on input change | Runs every CD cycle       |
| Better performance        | Can impact performance    |
| Default behavior          | Must set `pure: false`    |
| Use for transformations   | Use for filtering/sorting |

---

## Batch 8: Questions 91-100

### Q91: What is Control Flow Syntax? Explain @if, @for, @switch, @defer.

**Answer:**

**@if (Angular 17+):**

```typescript
@Component({
  template: `
    @if (user(); as u) {
      <h1>Welcome, {{ u.name }}</h1>
    } @else if (loading()) {
      <p>Loading...</p>
    } @else {
      <p>No user</p>
    }
  `
})
```

**@for:**

```typescript
@Component({
  template: `
    @for (item of items(); track item.id) {
      <div class="item">{{ item.name }}</div>
    } @empty {
      <p>No items found</p>
    }
  `
})
```

**@switch:**

```typescript
@Component({
  template: `
    @switch (status()) {
      @case ('loading') {
        <spinner />
      }
      @case ('success') {
        <data-view [data]="data()" />
      }
      @case ('error') {
        <error-message [error]="error()" />
      }
      @default {
        <p>Unknown status</p>
      }
    }
  `
})
```

**@defer (Lazy Loading):**

```typescript
@Component({
  template: `
    @defer (on viewport) {
      <heavy-component />
    } @placeholder {
      <p>Placeholder...</p>
    } @loading (minimum 2s) {
      <spinner />
    } @error {
      <p>Failed to load</p>
    }

    <!-- Triggers -->
    @defer (on idle) { ... }          // Browser idle
    @defer (on immediate) { ... }     // Load immediately
    @defer (on timer(5s)) { ... }     // After 5 seconds
    @defer (on interaction) { ... }   // User interaction
    @defer (on hover) { ... }         // Mouse hover
  `
})
```

---

### Q92: What is Hierarchical Dependency Injection? Explain @Optional, @Self, @SkipSelf, @Host.

**Answer:**

**Injector Hierarchy:**

```typescript
// Root Injector (app-level)
bootstrapApplication(AppComponent, {
  providers: [GlobalService] // Available everywhere
});

// Module Injector
@NgModule({
  providers: [ModuleService] // Available in module
})

// Component Injector
@Component({
  providers: [ComponentService] // New instance per component
})
```

**@Optional - Service might not exist:**

```typescript
import { Optional } from '@angular/core';

@Component({...})
export class Component {
  constructor(@Optional() private logger?: LoggerService) {
    // logger might be undefined
    this.logger?.log('Component created');
  }
}
```

**@Self - Only from this component:**

```typescript
import { Self } from "@angular/core";

@Component({
  providers: [LocalService],
})
export class Component {
  constructor(@Self() private service: LocalService) {
    // Only looks in this component's injector
    // Throws error if not found here
  }
}
```

**@SkipSelf - Skip this component, look in parent:**

```typescript
import { SkipSelf } from "@angular/core";

@Component({
  providers: [ConfigService],
})
export class ChildComponent {
  constructor(@SkipSelf() private config: ConfigService) {
    // Skips this component, uses parent's ConfigService
  }
}
```

**@Host - Only look in host component:**

```typescript
import { Host } from '@angular/core';

@Directive({...})
export class HighlightDirective {
  constructor(@Host() private parent: ParentComponent) {
    // Only looks in host component that uses this directive
  }
}
```

**Combined Example:**

```typescript
@Component({...})
export class Component {
  constructor(
    @Optional() @Self() private local?: LocalService,
    @SkipSelf() private parent: ParentService,
    @Optional() @SkipSelf() private config?: ConfigService
  ) {}
}
```

---

### Q93: What are all Angular Lifecycle Hooks? Explain execution order.

**Answer:**

**Complete Lifecycle:**

```typescript
@Component({...})
export class Component implements
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  // 1. constructor() - DI only
  constructor(private service: Service) {
    console.log('1. Constructor');
  }

  // 2. ngOnChanges - @Input() changes
  ngOnChanges(changes: SimpleChanges) {
    console.log('2. ngOnChanges', changes);
  }

  // 3. ngOnInit - Initialization (once)
  ngOnInit() {
    console.log('3. ngOnInit');
  }

  // 4. ngDoCheck - Custom change detection
  ngDoCheck() {
    console.log('4. ngDoCheck');
  }

  // 5. ngAfterContentInit - Content projection initialized (once)
  ngAfterContentInit() {
    console.log('5. ngAfterContentInit');
  }

  // 6. ngAfterContentChecked - After content checked
  ngAfterContentChecked() {
    console.log('6. ngAfterContentChecked');
  }

  // 7. ngAfterViewInit - View initialized (once)
  ngAfterViewInit() {
    console.log('7. ngAfterViewInit');
  }

  // 8. ngAfterViewChecked - After view checked
  ngAfterViewChecked() {
    console.log('8. ngAfterViewChecked');
  }

  // 9. ngOnDestroy - Cleanup
  ngOnDestroy() {
    console.log('9. ngOnDestroy');
  }
}
```

**When Each Runs:**

| Hook                  | Timing                       | Use Case                |
| --------------------- | ---------------------------- | ----------------------- |
| constructor           | Before all                   | DI only                 |
| ngOnChanges           | @Input changes               | React to input          |
| ngOnInit              | Once after first ngOnChanges | Init logic, HTTP        |
| ngDoCheck             | Every CD                     | Custom change detection |
| ngAfterContentInit    | Content projected            | Access ng-content       |
| ngAfterContentChecked | After content CD             | After content check     |
| ngAfterViewInit       | View initialized             | Access @ViewChild       |
| ngAfterViewChecked    | After view CD                | After view check        |
| ngOnDestroy           | Before destroy               | Cleanup, unsubscribe    |

---

### Q94: What is the difference between Normal and OnPush Change Detection?

**Answer:**

**Default Change Detection:**

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Component {
  // Checks on EVERY event:
  // - User events (click, input)
  // - HTTP responses
  // - Timers (setTimeout, setInterval)
  // - Any async operation
}
```

**OnPush Change Detection:**

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Component {
  @Input() user: User; // Only checks when reference changes

  // Checks only when:
  // 1. @Input() reference changes
  // 2. Event from this component fires
  // 3. Observable with async pipe emits
  // 4. Manual: changeDetectorRef.markForCheck()

  constructor(private cdr: ChangeDetectorRef) {}

  // ❌ Won't trigger change detection
  updateWrong() {
    this.user.name = "Updated"; // Mutation
  }

  // ✅ Triggers change detection
  updateCorrect() {
    this.user = { ...this.user, name: "Updated" }; // New reference
  }

  // Manual trigger
  manualUpdate() {
    this.someValue = "Updated";
    this.cdr.markForCheck(); // Force check
  }
}
```

**Performance Comparison:**

```typescript
// Without OnPush (slow)
@Component({ /* 100 components, all check on every event */ })

// With OnPush (fast)
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
  // Only affected components check
})
```

**Best Practices:**

1. Use OnPush by default
2. Use immutable data
3. Use async pipe with observables
4. Call markForCheck() when needed

---

### Q95: What are ng-template, ng-container, and ngTemplateOutlet?

**Answer:**

**ng-template (Template Definition):**

```typescript
@Component({
  template: `
    <!-- Define template -->
    <ng-template #myTemplate let-name="name" let-age="age">
      <p>{{ name }} is {{ age }} years old</p>
    </ng-template>

    <!-- Use it -->
    <ng-container *ngTemplateOutlet="myTemplate; context: { name: 'John', age: 30 }">
    </ng-container>
  `
})
```

**ng-container (No DOM Element):**

```typescript
@Component({
  template: `
    <!-- Group without adding element -->
    <ng-container *ngIf="show">
      <h1>Title</h1>
      <p>Content</p>
    </ng-container>
    <!-- No wrapper div! -->

    <!-- Multiple structural directives -->
    <ng-container *ngIf="user">
      <div *ngFor="let item of items">{{ item }}</div>
    </ng-container>
  `
})
```

**ngTemplateOutlet (Render Template):**

```typescript
@Component({
  template: `
    <!-- Reusable loading template -->
    <ng-template #loading>
      <div class="spinner">Loading...</div>
    </ng-template>

    <!-- Use in multiple places -->
    <ng-container *ngTemplateOutlet="loading"></ng-container>

    <!-- With context -->
    <ng-template #userCard let-user>
      <div class="card">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
      </div>
    </ng-template>

    <ng-container *ngFor="let user of users">
      <ng-container *ngTemplateOutlet="userCard; context: { $implicit: user }">
      </ng-container>
    </ng-container>
  `
})
```

**Advanced: Dynamic Templates:**

```typescript
@Component({
  template: `
    <ng-template #template1>Template 1</ng-template>
    <ng-template #template2>Template 2</ng-template>

    <ng-container *ngTemplateOutlet="currentTemplate"></ng-container>
    <button (click)="switch()">Switch</button>
  `,
})
export class Component {
  @ViewChild("template1") template1: TemplateRef<any>;
  @ViewChild("template2") template2: TemplateRef<any>;

  currentTemplate: TemplateRef<any>;

  ngAfterViewInit() {
    this.currentTemplate = this.template1;
  }

  switch() {
    this.currentTemplate =
      this.currentTemplate === this.template1 ? this.template2 : this.template1;
  }
}
```

---

### Q96: What is View Encapsulation? Explain all modes.

**Answer:**

**Three Modes:**

```typescript
import { ViewEncapsulation } from '@angular/core';

// 1. Emulated (Default)
@Component({
  selector: 'app-user',
  styles: ['h1 { color: blue; }'],
  encapsulation: ViewEncapsulation.Emulated
})
// Angular adds unique attributes:
// <h1 _ngcontent-abc-123>Title</h1>
// h1[_ngcontent-abc-123] { color: blue; }
// ✅ Styles scoped to component
// ✅ Works in all browsers
// ✅ Most common

// 2. ShadowDom (Native)
@Component({
  encapsulation: ViewEncapsulation.ShadowDom
})
// Uses native Shadow DOM
// ✅ True isolation
// ✅ No style leaking
// ❌ Older browsers don't support
// ❌ Global styles don't penetrate

// 3. None (Global)
@Component({
  encapsulation: ViewEncapsulation.None
})
// No encapsulation
// ✅ Styles apply globally
// ✅ Can style child components
// ❌ Can leak to other components
// Use for: theme overrides, third-party libs
```

**Piercing Shadow DOM:**

```css
/* With Emulated (default) */
:host ::ng-deep child-component {
  color: red; /* Styles child */
}

/* :host - targets host element */
:host {
  display: block;
  padding: 10px;
}

/* :host-context - styles based on ancestor */
:host-context(.dark-theme) {
  background: black;
}
```

---

### Q97: How do you handle HTTP with Signals? Show two approaches.

**Answer:**

**Approach 1: RxJS with toSignal():**

```typescript
import { toSignal } from '@angular/core/rxjs-interop';

@Component({...})
export class Component {
  private http = inject(HttpClient);

  // Convert Observable to Signal
  users = toSignal(
    this.http.get<User[]>('/api/users'),
    { initialValue: [] }
  );

  // Template
  // @for (user of users(); track user.id) { ... }
}
```

**Approach 2: Pure Signals (without RxJS):**

```typescript
@Component({...})
export class Component {
  private http = inject(HttpClient);

  // State signals
  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Computed
  userCount = computed(() => this.users().length);

  // Load data
  loadUsers() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<User[]>('/api/users')
      .pipe(
        catchError(err => {
          this.error.set(err.message);
          return of([]);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe(users => this.users.set(users));
  }

  ngOnInit() {
    this.loadUsers();
  }
}
```

**Approach 3: Resource API (Angular 19+):**

```typescript
import { resource } from '@angular/core';

@Component({...})
export class Component {
  userId = signal(1);

  // Automatically refetches when userId changes
  userResource = resource({
    request: () => ({ id: this.userId() }),
    loader: ({ request }) => this.http.get<User>(`/api/users/${request.id}`)
  });

  // Access data
  user = this.userResource.value;
  loading = this.userResource.isLoading;
  error = this.userResource.error;
}
```

---

### Q98: What are Advanced Data Binding techniques? Explain all types.

**Answer:**

**1. Interpolation:**

```typescript
@Component({
  template: `
    <h1>{{ title }}</h1>
    <p>{{ 1 + 1 }}</p>
    <p>{{ getMessage() }}</p>
  `
})
```

**2. Property Binding:**

```typescript
@Component({
  template: `
    <img [src]="imageUrl" />
    <button [disabled]="isDisabled">Click</button>
    <div [class.active]="isActive"></div>
    <div [style.color]="textColor"></div>
    <div [attr.aria-label]="label"></div>
  `
})
```

**3. Event Binding:**

```typescript
@Component({
  template: `
    <button (click)="handleClick()">Click</button>
    <button (click)="handleClick($event)">With Event</button>
    <input (input)="onInput($event)" />
    <div (mouseenter)="onEnter()" (mouseleave)="onLeave()"></div>
  `
})
```

**4. Two-Way Binding:**

```typescript
@Component({
  template: `
    <input [(ngModel)]="name" />
    <!-- Equivalent to: -->
    <input [ngModel]="name" (ngModelChange)="name = $event" />

    <!-- Custom two-way binding -->
    <app-counter [(value)]="count" />
  `,
})
// Custom component
@Component({
  selector: "app-counter",
})
export class CounterComponent {
  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  increment() {
    this.value++;
    this.valueChange.emit(this.value);
  }
}
```

**5. Template Reference Variables:**

```typescript
@Component({
  template: `
    <input #nameInput type="text" />
    <button (click)="nameInput.focus()">Focus</button>
    <p>{{ nameInput.value }}</p>
  `
})
```

**6. Attribute Binding:**

```typescript
@Component({
  template: `
    <button [attr.aria-label]="label">Action</button>
    <div [attr.data-id]="userId"></div>
    <table [attr.colspan]="columnCount"></table>
  `
})
```

---

### Q99: What are Structural Directives? How do you create custom ones?

**Answer:**

**Built-in Structural Directives:**

```typescript
// *ngIf
<div *ngIf="show">Content</div>

// *ngFor
<div *ngFor="let item of items; let i = index; trackBy: trackById">
  {{ i }}: {{ item.name }}
</div>

// *ngSwitch
<div [ngSwitch]="status">
  <p *ngSwitchCase="'loading'">Loading...</p>
  <p *ngSwitchCase="'success'">Success!</p>
  <p *ngSwitchDefault>Unknown</p>
</div>
```

**Custom Structural Directive:**

```typescript
// appUnless - opposite of *ngIf
@Directive({
  selector: '[appUnless]',
  standalone: true
})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}

// Usage
<div *appUnless="isLoggedIn">Please log in</div>
```

**Advanced: Custom ngFor:**

```typescript
@Directive({
  selector: '[appRepeat]',
  standalone: true
})
export class RepeatDirective<T> {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appRepeatOf(collection: T[]) {
    this.viewContainer.clear();
    collection.forEach((item, index) => {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: item,
        index,
        count: collection.length,
        first: index === 0,
        last: index === collection.length - 1,
        even: index % 2 === 0,
        odd: index % 2 === 1
      });
    });
  }
}

// Usage
<div *appRepeat="let user of users; let i = index; let isLast = last">
  {{ i }}: {{ user.name }} {{ isLast ? '(last)' : '' }}
</div>
```

---

### Q100: Complete Angular Signals Application with Authentication

**Answer:**

**Complete Signal-based Auth System:**

```typescript
// 1. Auth Service
@Injectable({ providedIn: "root" })
export class AuthService {
  private http = inject(HttpClient);

  // State
  private userState = signal<User | null>(null);
  private tokenState = signal<string | null>(null);
  private loadingState = signal(false);
  private errorState = signal<string | null>(null);

  // Public signals
  user = this.userState.asReadonly();
  token = this.tokenState.asReadonly();
  loading = this.loadingState.asReadonly();
  error = this.errorState.asReadonly();

  // Computed
  isAuthenticated = computed(() => !!this.user());
  isAdmin = computed(() => this.user()?.role === "admin");
  userName = computed(() => this.user()?.name ?? "Guest");

  constructor() {
    // Load from localStorage
    this.loadStoredAuth();
  }

  login(credentials: { email: string; password: string }) {
    this.loadingState.set(true);
    this.errorState.set(null);

    this.http
      .post<{ user: User; token: string }>("/api/login", credentials)
      .pipe(
        tap(({ user, token }) => {
          this.userState.set(user);
          this.tokenState.set(token);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        }),
        catchError((error) => {
          this.errorState.set(error.message);
          return of(null);
        }),
        finalize(() => this.loadingState.set(false))
      )
      .subscribe();
  }

  logout() {
    this.userState.set(null);
    this.tokenState.set(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  private loadStoredAuth() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      this.tokenState.set(token);
      this.userState.set(JSON.parse(user));
    }
  }
}

// 2. Login Component
@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <h1>Login</h1>

      @if (auth.error(); as error) {
        <div class="error">{{ error }}</div>
      }

      <input formControlName="email" placeholder="Email" />
      <input formControlName="password" type="password" placeholder="Password" />

      <button [disabled]="form.invalid || auth.loading()">
        @if (auth.loading()) {
          Loading...
        } @else {
          Login
        }
      </button>
    </form>
  `,
})
export class LoginComponent {
  auth = inject(AuthService);

  form = inject(FormBuilder).group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.form.valid) {
      this.auth.login(this.form.value as any);
    }
  }
}

// 3. Protected Component
@Component({
  selector: "app-dashboard",
  standalone: true,
  template: `
    <h1>Welcome, {{ auth.userName() }}!</h1>

    @if (auth.isAdmin()) {
      <div class="admin-panel">Admin Panel</div>
    }

    <button (click)="auth.logout()">Logout</button>
  `,
})
export class DashboardComponent {
  auth = inject(AuthService);
}

// 4. Auth Guard
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(["/login"]);
};

// 5. Auth Interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.token();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};

// 6. Routes
const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];

// 7. App Config
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]))],
};
```

**This covers:**
✅ Signal-based state management
✅ Authentication flow
✅ Protected routes with guards
✅ HTTP interceptors
✅ Error handling
✅ Loading states
✅ LocalStorage persistence
✅ Computed values
✅ Reactive forms

---

## Summary

You now have **100 comprehensive Angular questions** covering:

- ✅ Core concepts (Components, Directives, Pipes)
- ✅ Forms (Reactive, Template-Driven)
- ✅ RxJS (Operators, Subjects, Observables)
- ✅ State Management (NgRx, Signal-based)
- ✅ Change Detection (Default, OnPush, Signals)
- ✅ HTTP (Interceptors, Error Handling)
- ✅ Routing (Guards, Resolvers)
- ✅ Dependency Injection (Hierarchical, Decorators)
- ✅ Advanced Patterns (Micro-frontends, SSR, PWA)
- ✅ **Angular Signals** (Inputs, Outputs, Computed, Effects, CRUD, Auth)
- ✅ Testing, Performance, Security
- ✅ Modern Angular (Standalone, Control Flow, Signals)

**You're now ready to ace any senior Angular developer interview! 🚀**
