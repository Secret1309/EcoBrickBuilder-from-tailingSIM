
// ============================================================
// ECO-BRICK SIMULATOR — Economics (Legacy Stub)
// Diperlukan agar import lama tidak crash
// ============================================================

export interface EconomicResult {
  capexTotal: number;
  capexBreakdown: { mixer: number; molder: number; curingChamber: number; siloConveyor: number; neutralizationUnit: number; installation: number; };
  annualOpex: number;
  opexBreakdown: { binderCost: number; limeCost: number; energyCost: number; laborCost: number; maintenance: number; preTreatmentCost: number; };
  annualRevenue: number;
  revenueBreakdown: { productSales: number; tippingFee: number; };
  grossProfit: number;
  netProfit: number;
  metrics: { capex: number; npv: number; irr: number; paybackPeriod: number; cashFlows: number[]; cumulativeCashFlows: number[]; };
  productPricePerTon: number;
  costPerTonProduct: number;
}

/** @deprecated Economics module is not used in Eco-Brick Simulator */
export function calculateEconomics(): EconomicResult {
  return {
    capexTotal: 0,
    capexBreakdown: { mixer: 0, molder: 0, curingChamber: 0, siloConveyor: 0, neutralizationUnit: 0, installation: 0 },
    annualOpex: 0,
    opexBreakdown: { binderCost: 0, limeCost: 0, energyCost: 0, laborCost: 0, maintenance: 0, preTreatmentCost: 0 },
    annualRevenue: 0, revenueBreakdown: { productSales: 0, tippingFee: 0 },
    grossProfit: 0, netProfit: 0,
    metrics: { capex: 0, npv: 0, irr: 0, paybackPeriod: 0, cashFlows: [], cumulativeCashFlows: [] },
    productPricePerTon: 0, costPerTonProduct: 0,
  };
}
