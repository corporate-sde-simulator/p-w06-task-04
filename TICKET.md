# PLATFORM-2938: Build query execution plan analyzer

**Status:** In Progress · **Priority:** High
**Sprint:** Sprint 28 · **Story Points:** 5
**Reporter:** Suresh Kumar (Performance Lead) · **Assignee:** You (Intern)
**Due:** End of sprint (Friday)
**Labels:** `backend`, `typescript`, `database`, `performance`
**Task Type:** Feature Ship

---

## Description

We have a `CostEstimator` that computes I/O cost for individual database operations. Build the `PlanAnalyzer` that takes a full query plan (tree of operations), estimates total cost, identifies the most expensive step, and suggests optimizations. Implement the TODOs in `planAnalyzer.ts`.

## Acceptance Criteria

- [ ] `analyzePlan()` computes total cost by walking the plan tree
- [ ] `findBottleneck()` returns the most expensive node in the tree
- [ ] `suggestIndexes()` recommends indexes for full table scans
- [ ] `estimateImprovement()` predicts cost reduction from suggested changes
- [ ] All unit tests pass
