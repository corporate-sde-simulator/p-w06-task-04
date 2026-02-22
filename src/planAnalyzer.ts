/**
 * Plan Analyzer — analyzes query execution plans and suggests optimizations.
 *
 * YOU MUST IMPLEMENT the methods marked with TODO.
 * CostEstimator is working — use it to compute costs.
 */

import { CostEstimator, OperationCost, PlanNode } from './costEstimator';

interface AnalysisResult {
  totalCost: OperationCost;
  nodeCount: number;
  bottleneck: PlanNode | null;
  bottleneckCost: OperationCost | null;
  suggestions: string[];
}

interface IndexSuggestion {
  table: string;
  column: string;
  reason: string;
  estimatedCostReduction: number;
}

class PlanAnalyzer {
  private estimator: CostEstimator;

  constructor() {
    this.estimator = new CostEstimator();
  }

  /**
   * Analyze a full query plan tree and compute total cost.
   *
   * 1. Walk the plan tree recursively (DFS)
   * 2. For each node, compute cost using this.estimator.estimateCost(node)
   * 3. Sum all costs (ioCost, cpuCost, networkCost)
   * 4. Count total number of nodes
   * 5. Find the node with highest totalCost (bottleneck)
   * 6. Call suggestOptimizations() to get suggestions
   * 7. Return AnalysisResult
   */
  analyzePlan(root: PlanNode): AnalysisResult {
    return {
      totalCost: { ioCost: 0, cpuCost: 0, networkCost: 0, totalCost: 0 },
      nodeCount: 0,
      bottleneck: null,
      bottleneckCost: null,
      suggestions: [],
    };
  }

  /**
   * Find the most expensive node in the plan tree.
   *
   * 1. Walk tree recursively
   * 2. Compute cost for each node
   * 3. Return the node with the highest totalCost
   */
  findBottleneck(root: PlanNode): { node: PlanNode; cost: OperationCost } | null {
    return null;
  }

  /**
   * Suggest indexes for any sequential scans in the plan.
   *
   * 1. Walk tree to find all nodes with operation === 'seq_scan'
   * 2. For each, suggest an index on the table/column
   * 3. Estimate cost reduction: compare seq_scan cost vs index_scan cost
   * 4. Return list of IndexSuggestion
   */
  suggestIndexes(root: PlanNode): IndexSuggestion[] {
    return [];
  }

  /**
   * Estimate total cost improvement if all suggestions are applied.
   *
   * 1. Compute current total cost with analyzePlan()
   * 2. Sum all estimatedCostReduction from suggestIndexes()
   * 3. Return { currentCost, projectedCost, savingsPercent }
   */
  estimateImprovement(root: PlanNode): {
    currentCost: number;
    projectedCost: number;
    savingsPercent: number;
  } {
    return { currentCost: 0, projectedCost: 0, savingsPercent: 0 };
  }
}

export { PlanAnalyzer, AnalysisResult, IndexSuggestion };
