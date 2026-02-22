# PR Review - Query execution plan analyzer (by Kiran)

## Reviewer: Priya Menon
---

**Overall:** Good foundation but critical bugs need fixing before merge.

### `planAnalyzer.ts`

> **Bug #1:** Join cost estimation multiplies row counts instead of using min and overestimates hash joins
> This is the higher priority fix. Check the logic carefully and compare against the design doc.

### `costEstimator.ts`

> **Bug #2:** Index scan detection does not recognize composite indexes and always recommends sequential scan
> This is more subtle but will cause issues in production. Make sure to add a test case for this.

---

**Kiran**
> Acknowledged. I have documented the issues for whoever picks this up.
