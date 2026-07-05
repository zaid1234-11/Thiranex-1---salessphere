export type KPIStatus = 'excellent' | 'good' | 'warning' | 'danger';

export class BusinessRules {
  /**
   * Evaluates revenue growth to determine health status.
   */
  static evaluateGrowthStatus(growthPercentage: number): KPIStatus {
    if (growthPercentage >= 15) return 'excellent';
    if (growthPercentage >= 5) return 'good';
    if (growthPercentage >= 0) return 'warning';
    return 'danger';
  }

  /**
   * Evaluates profit margin health.
   */
  static evaluateMarginStatus(marginPercentage: number): KPIStatus {
    if (marginPercentage >= 30) return 'excellent';
    if (marginPercentage >= 20) return 'good';
    if (marginPercentage >= 10) return 'warning';
    return 'danger';
  }

  /**
   * Determines if a region is high-risk based on growth.
   */
  static isHighRiskRegion(growthPercentage: number): boolean {
    return growthPercentage < -5;
  }
}
