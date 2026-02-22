/**
 * Cost Estimator — estimates I/O and CPU cost for individual DB operations.
 *
 * This module is COMPLETE and WORKING. Do NOT modify.
 * Your task is in planAnalyzer.ts.
 *
 * Author: Kavitha Rajan (Performance team)
 * Last Modified: 2026-03-12
 */

interface OperationCost {
  ioCost: number;       // Disk reads estimated
  cpuCost: number;      // CPU time units
  networkCost: number;  // Cross-partition fetches
  totalCost: number;
}

interface PlanNode {
  id: string;
  operation: string;    // 'seq_scan', 'index_scan', 'hash_join', 'sort', 'filter', 'aggregate'
  table?: string;
  column?: string;
  estimatedRows: number;
  children: PlanNode[];
}

class CostEstimator {
  private readonly IO_COST_PER_PAGE = 1.0;
  private readonly CPU_COST_PER_ROW = 0.01;
  private readonly NETWORK_COST_PER_PARTITION = 10.0;
  private readonly PAGE_SIZE = 8192;  // bytes
  private readonly AVG_ROW_SIZE = 128; // bytes

  estimateCost(node: PlanNode): OperationCost {
    const rowsPerPage = Math.floor(this.PAGE_SIZE / this.AVG_ROW_SIZE);
    const pages = Math.ceil(node.estimatedRows / rowsPerPage);

    let ioCost = 0;
    let cpuCost = node.estimatedRows * this.CPU_COST_PER_ROW;
    let networkCost = 0;

    switch (node.operation) {
      case 'seq_scan':
        ioCost = pages * this.IO_COST_PER_PAGE;
        break;
      case 'index_scan':
        ioCost = Math.ceil(Math.log2(node.estimatedRows + 1)) * this.IO_COST_PER_PAGE;
        break;
      case 'hash_join':
        ioCost = pages * 2.5 * this.IO_COST_PER_PAGE;
        cpuCost *= 1.5;
        break;
      case 'sort':
        const sortPages = pages * Math.ceil(Math.log2(pages + 1));
        ioCost = sortPages * this.IO_COST_PER_PAGE;
        break;
      case 'filter':
        ioCost = pages * 0.5 * this.IO_COST_PER_PAGE;
        break;
      case 'aggregate':
        ioCost = pages * this.IO_COST_PER_PAGE;
        cpuCost *= 2;
        break;
      default:
        ioCost = pages * this.IO_COST_PER_PAGE;
    }

    return {
      ioCost: Math.round(ioCost * 100) / 100,
      cpuCost: Math.round(cpuCost * 100) / 100,
      networkCost: Math.round(networkCost * 100) / 100,
      totalCost: Math.round((ioCost + cpuCost + networkCost) * 100) / 100,
    };
  }

  getRowsPerPage(): number {
    return Math.floor(this.PAGE_SIZE / this.AVG_ROW_SIZE);
  }
}

export { CostEstimator, OperationCost, PlanNode };
