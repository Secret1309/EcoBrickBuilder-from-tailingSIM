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

  // Compaction efficiency — FAS optimal 0.45 (sesuai hasil PPT)
  const optimalWC = 0.45;
  const wcDeviation = Math.abs(waterRatio - optimalWC);
  const compactionFactor = 1.0 - 0.22 * Math.pow(wcDeviation / 0.225, 2);

  // Admixture mengisi micropore → densitas naik sedikit
  const admixtureDensityBoost = 1 + admixturePct * 0.004;

  // Faktor koreksi: void, hidrasi tidak sempurna
  return Math.round(rawDensity * compactionFactor * admixtureDensityBoost * 0.88);
}

/** Hitung kuat tekan (MPa) dari komposisi campuran
 *
 *  Kalibrasi target (Longos dkk., 2020 — divalidasi PPT GSC 2026):
 *  Tailing=47.5%, Semen=12.5%, Pasir=40%, FAS=0.45, Admixture=0%
 *  → f'c ≈ 24 MPa (kuat tekan ekuilibrium terbaik)
 *
 *  Model f'c = k⋅(m_semen + m_aditif)/(m_tailing + m_pasir) − α⋅Δ(FAS)
 */
export function computeStrength(
  tailingPct: number,
  cementPct: number,
  sandPct: number,
  waterRatio: number,
  admixturePct: number,
): number {
  // FAS optimal = 0.45 (dari PPT: komposisi optimal menghasilkan 24 MPa)
  const optimalWC = 0.45;

  // Base dari semen (binder utama) — dikalibrasi: 12.5% semen → kontribusi ~17.5 MPa
  let strength = cementPct * 1.40;

  // Efek tailing (Longos 2020): ≤40% filler membantu, 40-60% netral, >60% melemahkan
  if (tailingPct <= 40) {
    strength += tailingPct * 0.05;
  } else if (tailingPct <= 60) {
    strength += 40 * 0.05 + (tailingPct - 40) * (-0.05);
  } else {
    strength += 40 * 0.05 - 20 * 0.05 - (tailingPct - 60) * 0.25;
  }

  // Efek pasir: agregat skeleton meningkat hingga 35%
  strength += Math.min(sandPct, 35) * 0.04;

  // Penalti FAS: deviasi dari optimal menurunkan kuat tekan (α = 22)
  strength -= 22 * Math.pow(waterRatio - optimalWC, 2);

  // Eco-admixture: efek pozzolan / superplasticizer
  strength += admixturePct * 1.8;

  // Clamp ke range fisik yang realistis (2 – 45 MPa)
  return Math.round(Math.max(2, Math.min(45, strength)) * 10) / 10;
}

/** Hitung daya serap air / porositas (%) — Ahmari & Zhang (2013)
 *
 *  Pada komposisi optimal (Tailing 45-50%, Semen 10-15%, FAS 0.45):
 *  daya serap air target ≈ 8-12% (di bawah batas SNI 25%)
 */
export function computeWaterAbsorption(
  tailingPct: number,
  cementPct: number,
  waterRatio: number,
  admixturePct: number,
): number {
  let absorption = 18; // Base porositas % (geopolimer tanpa optimasi)
  absorption -= cementPct * 0.40;  // Semen ↑ → densitas ↑ → porositas ↓
  absorption += (waterRatio - 0.45) * 22; // FAS berlebih → pori meningkat
  absorption -= admixturePct * 0.9;       // Admixture mengurangi porositas

  // Tailing Fe₂O₃ mengisi pori di kadar rendah; excess → ikatan lemah
  if (tailingPct > 55) {
    absorption += (tailingPct - 55) * 0.12;
  } else if (tailingPct < 30) {
    absorption += (30 - tailingPct) * 0.08; // Kurang tailing → pori dari void semen
  } else {
    absorption -= (tailingPct - 30) * 0.04; // Rentang optimal 30-55%
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
