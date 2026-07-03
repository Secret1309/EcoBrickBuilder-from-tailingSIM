// ============================================================
// ECO-BRICK SIMULATOR — Core Simulation Engine
// Kalkulasi properti material eco-brick dari campuran tailing
// Green Scientific Competition (GSC) 2026 — EneRC FT ITB
// ============================================================

import { EcoBrickInput, EcoBrickOutput } from './types';
import {
  BRICK_DIMENSIONS,
  INFRASTRUCTURE,
  MATERIAL_DENSITY,
  PRODUCTION,
  CARBON,
  SNI_THRESHOLDS,
} from './constants';

// =========================================================
// INTERNAL: Model sifat mekanik dari komposisi campuran
// =========================================================

/** Hitung densitas efektif campuran (kg/m³) */
export function computeDensity(
  tailingPct: number,
  cementPct: number,
  sandPct: number,
  waterRatio: number,
  admixturePct: number,
): number {
  // Weighted average densitas material konstituen (% solid)
  const rawDensity =
    (tailingPct * MATERIAL_DENSITY.TAILING +
      cementPct * MATERIAL_DENSITY.CEMENT +
      sandPct * MATERIAL_DENSITY.SAND) /
    100;

  // Compaction efficiency — optimal w/c ratio ~ 0.475
  const optimalWC = 0.475;
  const wcDeviation = Math.abs(waterRatio - optimalWC);
  const compactionFactor = 1.0 - 0.25 * Math.pow(wcDeviation / 0.225, 2);

  // Admixture sedikit meningkatkan densitas (mengisi micropore)
  const admixtureDensityBoost = 1 + admixturePct * 0.004;

  // Faktor koreksi: air void, hidrasi tidak sempurna, dll.
  return Math.round(rawDensity * compactionFactor * admixtureDensityBoost * 0.88);
}

/** Hitung kuat tekan (MPa) dari komposisi campuran */
export function computeStrength(
  tailingPct: number,
  cementPct: number,
  sandPct: number,
  waterRatio: number,
  admixturePct: number,
): number {
  const optimalWC = 0.475;

  // Base dari semen (binder utama)
  let strength = cementPct * 0.85;

  // Efek tailing: filler ≤40% membantu, >60% melemahkan
  if (tailingPct <= 40) {
    strength += tailingPct * 0.06;
  } else if (tailingPct <= 60) {
    strength += 40 * 0.06;
  } else {
    strength += 40 * 0.06 - (tailingPct - 60) * 0.2;
  }

  // Efek pasir (aggregate skeleton)
  strength += Math.min(sandPct, 35) * 0.08;

  // Efek rasio air (penalti deviasi dari optimal)
  strength -= 18 * Math.pow(waterRatio - optimalWC, 2);

  // Eco-admixture boost (superplasticizer / pozzolanic effect)
  strength += admixturePct * 1.8;

  return Math.round(Math.max(2, Math.min(45, strength)) * 10) / 10;
}

/** Hitung daya serap air / porositas (%) */
export function computeWaterAbsorption(
  tailingPct: number,
  cementPct: number,
  waterRatio: number,
  admixturePct: number,
): number {
  let absorption = 14; // Base porositas %
  absorption -= cementPct * 0.25; // Semen ↑ → densitas ↑ → porositas ↓
  absorption += (waterRatio - 0.4) * 18; // Air berlebih → pori ↑
  absorption -= admixturePct * 0.8; // Admixture mengurangi porositas

  // Tailing: Fe₂O₃ mengisi pori di level rendah, tapi excess membuat bonding lemah
  if (tailingPct > 50) {
    absorption += (tailingPct - 50) * 0.15;
  } else {
    absorption -= tailingPct * 0.03;
  }

  return Math.round(Math.max(3, Math.min(30, absorption)) * 10) / 10;
}

// =========================================================
// MAIN EXPORT: calculateEcoBrick
// =========================================================

export function calculateEcoBrick(input: EcoBrickInput): EcoBrickOutput {
  const {
    tailingPercentage,
    cementPercentage,
    sandPercentage,
    waterRatio,
    ecoAdmixtureAmount,
  } = input;

  // === STEP 1: SIFAT MATERIAL ===
  const densityKgM3 = computeDensity(
    tailingPercentage, cementPercentage, sandPercentage, waterRatio, ecoAdmixtureAmount,
  );

  const compressiveStrengthMPa = computeStrength(
    tailingPercentage, cementPercentage, sandPercentage, waterRatio, ecoAdmixtureAmount,
  );

  const waterAbsorptionPercent = computeWaterAbsorption(
    tailingPercentage, cementPercentage, waterRatio, ecoAdmixtureAmount,
  );

  // === STEP 2: DIMENSI & BERAT ===
  const solidVolumeM3 = BRICK_DIMENSIONS.SOLID_VOLUME_M3;
  const weightKg = Math.round(densityKgM3 * solidVolumeM3 * 100) / 100;

  const dimensions = {
    lengthCm: BRICK_DIMENSIONS.LENGTH_CM,
    widthCm: BRICK_DIMENSIONS.WIDTH_CM,
    heightCm: BRICK_DIMENSIONS.HEIGHT_CM,
    volumeM3: BRICK_DIMENSIONS.TOTAL_VOLUME_M3,
    solidVolumeM3,
    weightKg,
  };

  // === STEP 3: SNI COMPLIANCE ===
  const isSNICompliant =
    compressiveStrengthMPa >= SNI_THRESHOLDS.MIN_COMPRESSIVE_STRENGTH_MPA;

  // === STEP 4: PRODUKSI ===
  const dailySolidKg = PRODUCTION.DAILY_SOLID_INPUT_TONS * 1000;
  const totalBricksProduced = weightKg > 0 ? Math.floor(dailySolidKg / weightKg) : 0;

  // === STEP 5: LIMBAH TERDAUR ULANG ===
  const recycledWasteTons =
    Math.round(
      (PRODUCTION.DAILY_SOLID_INPUT_TONS * tailingPercentage) / 100 * 10,
    ) / 10;

  // === STEP 6: REDUKSI KARBON ===
  const carbonReductionKg = Math.round(totalBricksProduced * CARBON.NET_REDUCTION_KG);

  // === STEP 7: POTENSI INFRASTRUKTUR ===
  const wallSqm =
    Math.round((totalBricksProduced / INFRASTRUCTURE.BRICKS_PER_SQM_WALL) * 10) / 10;
  const sidewalkSqm =
    Math.round(
      (totalBricksProduced / INFRASTRUCTURE.BRICKS_PER_SQM_SIDEWALK) * 10,
    ) / 10;

  // === STEP 8: KOMPOSISI INPUT (kg) ===
  const inputComposition = {
    tailingKg: Math.round((dailySolidKg * tailingPercentage) / 100),
    cementKg: Math.round((dailySolidKg * cementPercentage) / 100),
    sandKg: Math.round((dailySolidKg * sandPercentage) / 100),
    waterKg: Math.round(dailySolidKg * waterRatio),
    admixtureKg: Math.round((dailySolidKg * ecoAdmixtureAmount) / 100),
  };

  // === STEP 9: SENSITIVITY ANALYSIS (Variasi % Semen) ===
  const sensitivityData: EcoBrickOutput['sensitivityData'] = [];
  for (let cp = 5; cp <= 30; cp += 1) {
    // Pertahankan tailing%, sesuaikan pasir agar total = 100
    const adjSand = 100 - tailingPercentage - cp;
    if (adjSand < 0) continue;

    const simDensity = computeDensity(
      tailingPercentage, cp, adjSand, waterRatio, ecoAdmixtureAmount,
    );
    const simStrength = computeStrength(
      tailingPercentage, cp, adjSand, waterRatio, ecoAdmixtureAmount,
    );
    const simAbsorption = computeWaterAbsorption(
      tailingPercentage, cp, waterRatio, ecoAdmixtureAmount,
    );

    sensitivityData.push({
      cementPercent: cp,
      compressiveStrengthMPa: simStrength,
      waterAbsorptionPercent: simAbsorption,
      densityKgM3: simDensity,
      isSNICompliant: simStrength >= SNI_THRESHOLDS.MIN_COMPRESSIVE_STRENGTH_MPA,
    });
  }

  return {
    totalBricksProduced,
    recycledWasteTons,
    carbonReductionKg,
    compressiveStrengthMPa,
    waterAbsorptionPercent,
    densityKgM3,
    isSNICompliant,
    dimensions,
    applicableInfrastructureArea: { sidewalkSqm, wallSqm },
    inputComposition,
    sensitivityData,
  };
}

// =========================================================
// LEGACY EXPORTS — Backward Compatibility
// =========================================================
export interface MassBalanceResult {
  dailyTailingInput: number; dailyBinderInput: number; dailyLimeInput: number;
  dailyGypsumByProduct: number; dailyTotalInput: number; dailyProductOutput: number;
  dailyLoss: number; productYield: number; annualTailingInput: number;
  annualBinderInput: number; annualLimeInput: number; annualProductOutput: number;
  h2so4ContentGpl: number; limeRequirementKgPerTonTailing: number;
  gypsumProducedKgPerTonTailing: number; qualityGrade: 'standard' | 'premium';
  productName: string; compressiveStrength: number; dailyEnergyKWh: number;
  annualEnergyKWh: number; processData: MassBalanceState[];
  sensitivityData: { limeRatio: number; dailyOpexProxy: number; compressiveStrengthMPa: number; gypsumByproductTon: number; }[];
}

export interface MassBalanceState {
  time: number; tailingMass: number; binderMass: number; limeMass: number;
  gypsumMass: number; totalMass: number; productMass: number; lossMass: number;
}

/** @deprecated Use calculateEcoBrick instead */
export function runMassBalance(): MassBalanceResult {
  return {
    dailyTailingInput: 0, dailyBinderInput: 0, dailyLimeInput: 0,
    dailyGypsumByProduct: 0, dailyTotalInput: 0, dailyProductOutput: 0,
    dailyLoss: 0, productYield: 0, annualTailingInput: 0, annualBinderInput: 0,
    annualLimeInput: 0, annualProductOutput: 0, h2so4ContentGpl: 0,
    limeRequirementKgPerTonTailing: 0, gypsumProducedKgPerTonTailing: 0,
    qualityGrade: 'standard', productName: '', compressiveStrength: 0,
    dailyEnergyKWh: 0, annualEnergyKWh: 0, processData: [], sensitivityData: [],
  };
}
