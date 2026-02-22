import { PlanAnalyzer } from "../src/planAnalyzer";
import { CostEstimator } from "../src/costEstimator";

describe("Query execution plan analyzer", () => {
    test("should process valid input", () => {
        const obj = new PlanAnalyzer();
        expect(obj.process({ key: "val" })).not.toBeNull();
    });
    test("should handle null", () => {
        const obj = new PlanAnalyzer();
        expect(obj.process(null)).toBeNull();
    });
    test("should track stats", () => {
        const obj = new PlanAnalyzer();
        obj.process({ x: 1 });
        expect(obj.getStats().processed).toBe(1);
    });
    test("support should work", () => {
        const obj = new CostEstimator();
        expect(obj.process({ data: "test" })).not.toBeNull();
    });
});
