# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the Agent Architect codebase.

## Project Overview

**Agent Architect** is an educational card game that teaches AI/Agent system design best practices through puzzle-based gameplay. Players design AI agent architectures by placing cards (Context, Model, Tools, Framework, Guardrails) into slots, then receive immediate feedback through simulated test cases.

**Key Characteristics:**
- Entirely client-side - runs in browser with no backend
- Educational focus - teaches real AI/Agent design concepts
- 12 levels across 4 learning paths
- Built with React 19 + TypeScript + Vite

---

## MANDATORY WORKFLOW FOR EVERY TASK

**CRITICAL:** Before making ANY changes to the codebase, you MUST follow this workflow for EVERY task, no matter how small:

### 1. ANALYZE - Understand the request and current state
- Read relevant files to understand the current implementation
- Identify what needs to change and potential impacts
- Consider dependencies, side effects, and edge cases
- **IMPORTANT:** Determine if this is a UI/UX task (modifying components, screens, styles, user-facing features)

### 2. PLAN - Create a comprehensive plan
- Break down the task into specific, actionable steps
- Identify all files that need to be modified
- Consider the order of operations and dependencies
- **IF UI/UX TASK:** Include design-review steps in the plan (see UI/UX Workflow section below)

### 3. DESCRIBE - Clearly communicate the plan to the user
- Explain what you're going to do in clear, concise language
- Highlight any risks, trade-offs, or decisions that need user input
- **IF UI/UX TASK:** Explicitly state that you will run design-review agent first
- Wait for user confirmation if the changes are significant or risky

### 4. CREATE TODO LIST - Use the TodoWrite tool
- Create a detailed TODO list with all steps identified in the plan
- All tasks should start as `pending`
- **IF UI/UX TASK:** First TODO must be "Run design-review agent on current implementation"
- Present the TODO list clearly to the user

### 5. WAIT FOR APPROVAL - Get explicit human confirmation
- **MANDATORY:** STOP and wait for user approval before executing
- Do NOT proceed to implementation without explicit user confirmation
- User must review the plan and TODO list before any changes are made

### 6. EXECUTE - Implement the changes (only after approval)
- **IF UI/UX TASK:** Start by running design-review agent BEFORE making any changes
- Follow the plan and TODO list systematically
- Mark tasks as `in_progress` when starting, `completed` immediately after finishing
- Update the TODO list if new tasks are discovered during implementation
- **IF UI/UX TASK:** Run design-review agent AGAIN after implementation to verify fixes

**This workflow is NON-NEGOTIABLE and applies to:**
- Bug fixes
- Feature additions
- Refactoring
- Configuration changes
- Documentation updates
- ANY code or infrastructure modifications
- **ESPECIALLY UI/UX changes** (see detailed UI/UX workflow below)

---

## UI/UX Development Workflow

**CRITICAL: This workflow is PART OF the mandatory workflow above. For ANY UI/UX related changes, you MUST follow this integrated approach:**

### What Qualifies as a UI/UX Task?
- Modifying or creating React components (screens, UI components)
- Changing styles, colors, typography, spacing, layouts
- Adding animations or transitions
- Modifying user-facing features or interactions
- Any change that affects what users see or interact with

### UI/UX Workflow Steps (Integrated with Mandatory Workflow)

**STEP 0 (Before Implementation): Design Review**
- **ALWAYS** run `design-review` agent BEFORE making any UI/UX changes
- Use Task tool with subagent_type="design-review"
- Review current implementation to understand baseline
- Identify existing issues and opportunities for improvement

**STEP 1: Implementation**
- Make changes based on design review feedback
- Follow the mandatory workflow (ANALYZE → PLAN → DESCRIBE → TODO → WAIT → EXECUTE)
- Use inline styles for text shadows and glows (game-specific styling)
- Use Tailwind classes for everything else
- Maintain consistency with existing components (MainMenuScreen, etc.)

**STEP 2 (After Implementation): Verification Review**
- **ALWAYS** run `design-review` agent AGAIN after implementation
- Verify all [Blocker] and [High-Priority] issues are fixed
- Get confirmation that changes meet design standards
- Address any remaining issues before considering task complete

### Design Review Agent Details

The `design-review` agent performs comprehensive testing:
- Phase 0: Analyze changes and set up live preview
- Phase 1: Test interaction flows and user experience
- Phase 2: Verify visual polish (spacing, typography, colors) and use of libraries
- Phase 3: Robustness (edge cases, error states, content overflow)
- Phase 4: Code health (design tokens, component reuse)
- Phase 5: Content review and console errors

**Feedback Categories:**
- **[Blocker]**: Must fix before merging (breaks functionality or severely degrades UX)
- **[High-Priority]**: Should fix before merging (significant issues)
- **[Medium-Priority]**: Nice to fix (quality improvements)
- **[Nitpick]**: Optional polish (minor improvements)

### Complete UI/UX Task Example

```
User: "Improve the PathSelectScreen styling"

Claude:
1. ANALYZE: This is a UI/UX task (modifying screen component and styles)
2. PLAN: Will run design-review first, then implement improvements, then verify
3. DESCRIBE: Explains plan including design-review steps
4. TODO LIST:
   - Run design-review agent on current PathSelectScreen ← MUST BE FIRST
   - Implement improvements based on feedback
   - Run design-review agent again to verify ← MUST BE LAST
5. WAIT: Get user approval
6. EXECUTE:
   a. Run design-review agent (finds issues)
   b. Implement fixes (following feedback)
   c. Run design-review agent again (verify fixes)
   d. Address any remaining [Blocker] or [High-Priority] issues
```

### Common Mistakes to Avoid

❌ **NEVER skip design-review for UI/UX changes**
❌ **NEVER implement UI changes without running design-review first**
❌ **NEVER consider a UI task complete without verification review**
✅ **ALWAYS run design-review BEFORE and AFTER UI/UX changes**
✅ **ALWAYS fix [Blocker] and [High-Priority] issues**
✅ **ALWAYS include design-review steps in TODO list for UI tasks**

---

## Development Commands

```bash
# Development server with hot reload
npm run dev              # Starts at http://localhost:5173

# Production build
npm run build            # Compiles TypeScript and builds to dist/

# Preview production build
npm run preview          # Test production build locally

# Code quality
npm run lint             # Run ESLint on TypeScript/TSX files
```

---

## High-Level Architecture

### Application Flow
```
MainMenuScreen → PathSelectScreen → LevelSelectScreen → GameScreen → ExecutionScreen → ResultsScreen
```

### Core Game Loop
1. **Design Phase (GameScreen)**: Player selects and drags cards to board slots (context, model, tools, framework, guardrails)
2. **Execution Phase (ExecutionScreen)**: Agent.evaluate() simulates responses based on card combinations against test cases
3. **Results Phase (ResultsScreen)**: Display scores (accuracy, efficiency, best practices, robustness) and award 1-3 stars

### Key Architectural Components

**Game Logic (`src/game/`)**
- `Agent.ts` - Core agent evaluation logic; simulates how card combinations perform on test cases
- `GameSimulator.ts` - Orchestrates test case execution and multi-dimensional scoring
- `cards.ts` - Card data repository
- `types.ts` - Type definitions for cards, boards, test cases, levels

**State Management (`src/store/`)**
- `gameStore.ts` - Zustand store with localStorage persistence
  - Tracks progress (unlocked levels, completed levels, stars earned)
  - Manages settings (sound, music)
  - Handles navigation state (current path/level)

**Content (`src/content/`)**
- `levels/` - 12 level definitions (level-01.ts through level-12.ts)
- `cards/` - Card definitions organized by type (context, model, tool, framework, guardrail)
- Level schema: scenario, learning objectives, available cards, test cases, energy budget, success criteria

**UI Components (`src/components/`)**
- `Board.tsx` - Main game board with 5 card slots
- `Card.tsx` - Draggable card component using Framer Motion
- `Hand.tsx` - Player's hand of available cards
- `TestCaseResult.tsx` - Displays individual test case outcomes
- `Tutorial.tsx` - In-game tutorial system
- `PixiBackground.tsx` - PixiJS particle effects for backgrounds

**Screens (`src/screens/`)**
- Navigation screens: MainMenuScreen, PathSelectScreen, LevelSelectScreen, SettingsScreen, AboutScreen
- Gameplay screens: GameScreen (drag-and-drop design), ExecutionScreen (test simulation), ResultsScreen (scores)

### Data Flow

```
gameStore (Zustand)
    ↓ (provides state)
Screens (navigation, UI orchestration)
    ↓ (uses)
Components (Card, Board, Hand)
    ↓ (triggers)
Game Logic (Agent, GameSimulator)
    ↓ (evaluates)
Content (levels, cards, test cases)
    ↓ (persists to)
localStorage (progress, settings)
```

### Scoring Algorithm

Each level awards 0-100 points across 4 dimensions:
- **Accuracy (0-30 pts)**: Test case pass rate
- **Efficiency (0-20 pts)**: Latency and cost constraints
- **Best Practices (0-30 pts)**: Appropriate card choices for scenario
- **Robustness (0-20 pts)**: Handling edge cases and different difficulty levels

Star ratings: 1⭐ (33-66), 2⭐ (67-84), 3⭐ (85-100)

---

## Key Design Decisions

**No Backend Required**
- All game logic runs in browser
- Test case evaluation is simulated, not actual LLM calls
- Progress saved to localStorage
- Enables offline play and zero hosting costs

**Content-Driven Design**
- Levels and cards defined in structured TypeScript files
- Easy to add new content without changing game logic
- Type-safe content schema enforced at compile time

**Educational Pedagogy**
- 4 learning paths with overlapping levels allow multiple entry points
- Difficulty progression: Easy → Medium → Hard
- Immediate feedback loop reinforces learning
- Success criteria make tradeoffs explicit (accuracy vs cost vs latency)

---

## Important Documentation

**Master Reference**: `../project definition/agent_architect_master_spec.md`
- 100+ page complete game specification
- Canonical source for all game design decisions
- Contains all 12 level specifications
- Detailed scoring algorithms and learning objectives

**Developer Reference**: `../project definition/DEVELOPER_CHECKLIST.md`
- Practical coding reference
- Iteration-by-iteration tasks
- Common implementation patterns

**Content Schema**: `../project definition/CONTENT_SCHEMA.md`
- Guide for authoring new levels and cards
- TypeScript type definitions

---

## Technology Stack Specifics

**React 19.2.0**: Latest React with new compiler and performance improvements
**TypeScript 5.9.3**: Strict type checking enabled
**Vite 7.2.2**: Build tool with instant HMR
**Zustand 5.0.8**: Lightweight state management with persist middleware
**Framer Motion 12.23.24**: Drag-and-drop and animation library
**Tailwind CSS 4.1.17**: Utility-first CSS framework
**PixiJS 8.14.1**: 2D WebGL renderer for particle effects and game visuals

---

## Development Workflow

**Iterative Development Pattern**
- Currently between Iterations 1-9 (core features complete)
- Next: Iterations 10-15 (polish, optimization, launch prep)
- Each iteration has specific deliverables in DEVELOPER_CHECKLIST.md

**Adding New Levels**
1. Create level definition in `src/content/levels/level-XX.ts`
2. Define scenario, learning objectives, test cases, success criteria
3. Specify available cards and energy budget
4. Export from `src/content/index.ts`
5. Update learning paths in PathSelectScreen if needed

**Adding New Cards**
1. Add card definition to appropriate file in `src/content/cards/`
2. Update Card type in `src/game/types.ts` if new card type
3. Update Agent.evaluate() logic if card affects scoring
4. Add card to relevant level's availableCards array

---

## Common Patterns

**State Updates**: Always use Zustand actions, never mutate state directly
**Component Structure**: Screens orchestrate, Components present
**Styling**: Tailwind utilities preferred over custom CSS
**Animations**: Use Framer Motion for all animations and drag interactions
**Type Safety**: Leverage TypeScript - avoid `any`, use discriminated unions for card types

---

## Testing Strategy

Currently no automated tests. When adding tests:
- Focus on game logic (Agent.ts, GameSimulator.ts)
- Test scoring calculations
- Validate level configurations
- Test state persistence

---

## MCP Server Configuration

The project uses MCP servers for enhanced development capabilities:
- **Context7 MCP**: Context management (@upstash/context7-mcp)
- **Playwright MCP**: Browser automation (@executeautomation/playwright-mcp-server)

Configuration in `.mcp.json` at project root.

---

## Claude Agent Configuration

This project uses specialized agents for different development tasks:

**design-review** (`.claude/agents/design-review-agent.md`)
- Comprehensive UI/UX design review using Playwright automation
- Tests interaction flows, responsiveness, visual polish, accessibility
- Provides categorized feedback: [Blocker], [High-Priority], [Medium-Priority], [Nitpick]

**frontend-developer** (`.claude/agents/frontend-developer.md`)
- React/TypeScript component development specialist
- Focus on responsive design, state management, performance, accessibility
- Component-first, mobile-first approach

---

## File Locations Quick Reference

- Game logic: `src/game/`
- UI components: `src/components/`
- Screens: `src/screens/`
- State: `src/store/gameStore.ts`
- Content: `src/content/`
- Types: `src/game/types.ts` and `src/content/types.ts`
- Specifications: `../project definition/`
- Config: Root directory (vite.config.ts, tailwind.config.js, tsconfig.json, etc.)

---

## Visual Design Guidelines

**AWS Card Clash Inspired Aesthetic:**
- Dark backgrounds (#1a1a2e) with bright saturated colors
- Bold typography with text strokes and glow effects
- Animated particle effects using PixiJS
- Gradient buttons with hover glows
- Two-layer rendering: PixiJS canvas + React DOM

**Color Palette:**
- Orange: #FFA726 (primary brand color - "AGENT")
- Blue: #42A5F5 (secondary brand color - "ARCHITECT")
- Purple: #667eea
- Pink: #f5576c
- Teal: #00bcd4
- White: #FFFFFF (text on dark backgrounds)

**Typography:**
- Use `font-black` for titles and important text
- Text shadows for readability on dark backgrounds
- Uppercase for game-like aesthetic
- Responsive text sizes (text-7xl → text-9xl on larger screens)

**Animation Principles:**
- Spring physics for bouncy, game-like feel (stiffness: 260, damping: 20)
- Framer Motion for all UI animations
- PixiJS for particle effects and background animations
- Hover effects with scale and glow
