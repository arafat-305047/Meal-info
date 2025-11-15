# MI7 Meal Manager - Data Flow & Architecture

## Core Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                   Add Meal Form (addMealForm)                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Date: [2025-11-12]                                       │  │
│  │ Uday:    [2]   Abrar:   [1]   Muntasir: [3]             │  │
│  │ Arafat:  [0]   Jobayer: [0]   Abid:     [0]             │  │
│  │ Ankon:   [0]                                             │  │
│  │                      [Save Meals]                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              handleAddMeal(e) Validation & Processing            │
│                                                                  │
│  1. Validate date is selected                                  │
│  2. Read all 7 member inputs (with fallback to 0)             │
│  3. Build mealData object:                                     │
│     {                                                           │
│       date: "2025-11-12",                                      │
│       addedBy: "user123",                                      │
│       uday: 2,      abrar: 1,   muntasir: 3,                 │
│       arafat: 0,    jobayer: 0, abid: 0,    ankon: 0         │
│     }                                                           │
│  4. Validate at least one meal entered (sum > 0)              │
│  5. Log to console: "Saving meal data: {...}"                │
│  6. Save to Firestore: /artifacts/default-meal-app/           │
│     public/data/meals/[docId]                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  Firestore Database                              │
│                                                                  │
│  Collection: artifacts/{appId}/public/data/meals               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Document 1: 2025-11-12                                   │  │
│  │  ├─ date: "2025-11-12"                                   │  │
│  │  ├─ addedBy: "user123"                                   │  │
│  │  ├─ uday: 2                                              │  │
│  │  ├─ abrar: 1                                             │  │
│  │  ├─ muntasir: 3                                          │  │
│  │  ├─ arafat: 0                                            │  │
│  │  ├─ jobayer: 0                                           │  │
│  │  ├─ abid: 0                                              │  │
│  │  └─ ankon: 0                                             │  │
│  │                                                           │  │
│  │ Document 2: 2025-11-11                                   │  │
│  │  └─ ... (previous meal entries)                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Collection: artifacts/{appId}/public/data/expenses             │
│  Collection: artifacts/{appId}/public/data/contributions        │
└─────────────────────────────────────────────────────────────────┘
                              ↓ (via snapshot listener)
┌─────────────────────────────────────────────────────────────────┐
│              setupListeners() & onSnapshot Triggers              │
│                                                                  │
│  When Firestore data changes:                                  │
│    meals[] = [all meal documents sorted by date]              │
│    expenses[] = [all expense documents]                       │
│    contributions[] = [all contribution documents]             │
│                                                                  │
│  Then calls: updateSummary()                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│         updateSummary() - Calculations & Aggregations            │
│                                                                  │
│  Initialize:                                                    │
│    totalExpense = 0                                            │
│    totalContribution = 0                                       │
│    totalMeals = 0                                              │
│    memberMealCounts = {                                        │
│      Uday: 0, Abrar: 0, Muntasir: 0, Arafat: 0,              │
│      Jobayer: 0, Abid: 0, Ankon: 0                           │
│    }                                                            │
│    memberContributions = { ...same... }                       │
│                                                                  │
│  Loop through meals[]:                                         │
│    For each member in [Uday, Abrar, ...]:                     │
│      count = Number(mealDay[member.toLowerCase()])            │
│      if count > 0:                                             │
│        memberMealCounts[member] += count                       │
│        totalMeals += count                                     │
│                                                                  │
│  Loop through contributions[]:                                 │
│    amount = Number(contrib.amount)                            │
│    totalContribution += amount                                 │
│    memberContributions[contrib.name] += amount                │
│                                                                  │
│  Loop through expenses[]:                                      │
│    amount = Number(expense.amount)                            │
│    totalExpense += amount                                      │
│                                                                  │
│  Calculate:                                                     │
│    mealRate = totalMeals > 0                                  │
│               ? (totalExpense / totalMeals)                   │
│               : 0                                              │
│                                                                  │
│    messBalance = totalContribution - totalExpense            │
│                                                                  │
│  Log to console: "Summary Calculation: {...}"                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              UI Update - Summary Metrics                         │
│                                                                  │
│  totalExpenseEl.textContent = "240.00"                         │
│  totalContributionsEl.textContent = "1000.00"                 │
│  totalMealsEl.textContent = "6"                               │
│  mealRateEl.textContent = "40.00"                             │
│  messBalanceEl.textContent = "760.00" → Color: GREEN          │
│                                                                  │
│  Key Metrics Cards:                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │ Total Contrib│ │ Total Expense│ │ Mess Balance │           │
│  │  ৳1000.00   │ │   ৳240.00   │ │  ৳760.00    │           │
│  │ (Green)      │ │  (Red)       │ │  (Green)     │           │
│  └──────────────┘ └──────────────┘ └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              UI Update - Member Balance Sheet Table              │
│                                                                  │
│  For each member in [Uday, Abrar, ...]:                        │
│    contribution = memberContributions[member]                 │
│    mealsEaten = memberMealCounts[member]                      │
│    mealCost = mealsEaten × mealRate                           │
│    balance = contribution - mealCost                          │
│                                                                  │
│  ┌────────┬─────────────┬────────────┬───────────┬────────────┐│
│  │ Name   │ Contribution│ MealsEaten │ MealCost  │  Balance   ││
│  ├────────┼─────────────┼────────────┼───────────┼────────────┤│
│  │ Uday   │   ৳1000.00  │     2      │  ৳80.00   │ +৳920.00 ✓ ││
│  │ Abrar  │    ৳0.00    │     1      │  ৳40.00   │ -৳40.00  ✗ ││
│  │Muntasir│    ৳0.00    │     3      │ ৳120.00   │-৳120.00  ✗ ││
│  │ Arafat │    ৳0.00    │     0      │  ৳0.00    │  ৳0.00   ○ ││
│  │Jobayer │    ৳0.00    │     0      │  ৳0.00    │  ৳0.00   ○ ││
│  │ Abid   │    ৳0.00    │     0      │  ৳0.00    │  ৳0.00   ○ ││
│  │ Ankon  │    ৳0.00    │     0      │  ৳0.00    │  ৳0.00   ○ ││
│  └────────┴─────────────┴────────────┴───────────┴────────────┘│
│  Color Legend:                                                 │
│    ✓ GREEN (positive: gets money back)                        │
│    ✗ RED (negative: owes money)                               │
│    ○ GRAY (zero: balanced)                                    │
└─────────────────────────────────────────────────────────────────┘
```

## Data Validation Pipeline

```
                        User Input
                           ↓
        ┌──────────────────────────────────────┐
        │  Form Validation (handleAddMeal)     │
        ├──────────────────────────────────────┤
        │ ✓ Date selected?                    │
        │ ✓ At least one meal > 0?            │
        │ ✓ All member values are numbers?    │
        └──────────────────────────────────────┘
        ↓ PASS                    ↓ FAIL
    Save to DB              Show Error Alert
        ↓                         ↓
   Firestore          "Please enter at least
        ↓              one meal for someone"
   Snapshot Listener
   triggers
        ↓
   updateSummary()
        ↓
    ┌─────────────────────────────────┐
    │ Numeric Conversion (isNaN checks)│
    ├─────────────────────────────────┤
    │ ✓ All amounts are numbers?      │
    │ ✓ Skip invalid entries          │
    │ ✓ Default missing to 0          │
    └─────────────────────────────────┘
        ↓ ALL VALID
    Calculate Totals & Rates
        ↓
    Format for Display
        ↓
    Update UI
        ↓
    Display Balance Sheet
```

## Member Array Initialization

```
JavaScript Execution Order:
─────────────────────────────

1. Script module loads (<script type="module">)
   ↓
   const members = ['Uday', 'Abrar', 'Muntasir', 'Arafat', 'Jobayer', 'Abid', 'Ankon'];
   window.members = members;  ← Exposed to global scope
   ↓

2. Non-module inline scripts execute
   ↓
   Meal form generator script checks:
   - if (typeof members !== 'undefined' && members.length)
   - YES: Generate inputs immediately
   - NO: Wait for DOMContentLoaded, then generate
   ↓

3. DOMContentLoaded fires
   ↓
   Initialize DOM references
   Set up event listeners
   Call setupListeners() for Firestore
   ↓

4. Firestore snapshot listener fires
   ↓
   updateSummary() uses memberMealCounts & memberContributions
   All 7 members guaranteed to exist in both objects
```

## Error Handling Flow

```
Input Error → Alert User → Continue Operation

Examples:

1. Missing Date:
   "Please select a date."
   ↓ User selects date → Retry

2. No Meals Entered:
   "Please enter at least one meal for someone."
   ↓ User enters meal → Retry

3. Firebase Connection Error:
   "Connection Error - Check Console"
   ↓ User fixes Firebase config → Reload page

4. Invalid Numeric Values:
   Silently default to 0, log warning to console
   ↓ User reviews console, corrects input

5. NaN in Calculations:
   Skip with isNaN() check, default to 0
   ↓ No silent failures, proper aggregation
```

## Key Improvements Implemented

| Aspect | Before | After |
|--------|--------|-------|
| **Member Coverage** | Might be missing | All 7 members guaranteed |
| **Input Validation** | None | Date required, ≥1 meal required |
| **Numeric Safety** | Could produce NaN | isNaN checks, defaults to 0 |
| **Error Messages** | Silent failures | User-friendly alerts |
| **Debugging** | No visibility | Console logs all calculations |
| **Member Init** | Could fail | Window.members exposed globally |
| **Form Generation** | Could fail early | DOMContentLoaded fallback |
| **Balance Calc** | Edge case errors | Robust with explicit checks |

