// ============================================================
// ECO-BRICK SIMULATOR — Constants & Configuration
// Green Scientific Competition (GSC) 2026 — EneRC FT ITB
// ============================================================

// === DIMENSI BATAKO BERONGGA (SNI 03-0349-1989) ===
export const BRICK_DIMENSIONS = {
  LENGTH_CM: 40,
  WIDTH_CM: 20,
  HEIGHT_CM: 10,
  /** Volume total batako (m³): 40 × 20 × 10 cm = 8000 cm³ */
  TOTAL_VOLUME_M3: 0.008,
  /** Volume rongga: 2 lubang @ ~14 × 7 × 8 cm = 1568 cm³ */
  VOID_VOLUME_M3: 0.001568,
  /** Volume solid = total - rongga (m³) */
  SOLID_VOLUME_M3: 0.006432,
  /** Rasio rongga (~19.6%) */
  VOID_RATIO: 0.196,
} as const;

// === KONVERSI INFRASTRUKTUR ===
export const INFRASTRUCTURE = {
  /** 1 m² dinding: batako sisi 40×20 cm (termasuk nat) → ~12.5 pcs/m² */
  BRICKS_PER_SQM_WALL: 12.5,
  /** 1 m² paving/trotoar: batako sisi 40×20 cm → ~12.5 pcs/m² */
  BRICKS_PER_SQM_SIDEWALK: 12.5,
} as const;

// === DENSITAS MATERIAL KONSTITUEN (kg/m³) ===
export const MATERIAL_DENSITY = {
  TAILING: 3000,    // Tailing nikel laterit (tinggi Fe₂O₃ ~40%)
  CEMENT: 2300,     // Semen Portland tipe I
  SAND: 2650,       // Pasir silika standar
  WATER: 1000,      // Air
} as const;

// === KAPASITAS PRODUKSI DEFAULT ===
export const PRODUCTION = {
  /** Asumsi input total material padat per hari (ton) */
  DAILY_SOLID_INPUT_TONS: 100,
  /** Hari operasi per tahun */
  OPERATING_DAYS_PER_YEAR: 300,
} as const;

// === STANDAR SNI 03-0349-1989 ===
export const SNI_THRESHOLDS = {
  /** Minimum kuat tekan untuk struktural ringan (MPa) */
  MIN_COMPRESSIVE_STRENGTH_MPA: 10,
  /** Maksimum daya serap air (%) */
  MAX_WATER_ABSORPTION_PERCENT: 25,
  /** Minimum densitas yang diharapkan (kg/m³) */
  MIN_DENSITY_KGM3: 1500,
  /** Kuat tekan Mutu A — struktural berat */
  GRADE_A_MIN_MPA: 20,
  /** Kuat tekan Mutu B — struktural ringan */
  GRADE_B_MIN_MPA: 15,
  /** Kuat tekan Mutu C — non-struktural */
  GRADE_C_MIN_MPA: 10,
} as const;

// === EMISI KARBON & SDGs ===
export const CARBON = {
  /** Emisi CO₂ per bata konvensional yang dibakar (kg CO₂/pcs) */
  CONVENTIONAL_BRICK_CO2_KG: 0.45,
  /** Emisi CO₂ eco-brick tanpa pembakaran (kg CO₂/pcs — hanya dari produksi semen) */
  ECO_BRICK_CO2_KG: 0.08,
  /** Reduksi bersih per brick (kg CO₂) */
  NET_REDUCTION_KG: 0.37,
} as const;


// ============================================================
// LEGACY EXPORTS — Backward Compatibility
// Dipertahankan agar halaman lama (/empowerment dll) tidak crash
// ============================================================

export const TAILING_TYPES = {
  HPAL_RAW: 'Tailing HPAL Mentah (High Free Acid ±30 gpl)',
  HPAL_NEUTRALIZED: 'Tailing HPAL Pra-Netralisasi (Low Free Acid)',
} as const;

export type TailingType = typeof TAILING_TYPES[keyof typeof TAILING_TYPES];

export interface TailingComposition {
  Fe2O3: number;
  SiO2: number;
  MgO: number;
  Al2O3: number;
  others: number;
  H2SO4_gpl: number;
  qualityGrade: 'standard' | 'premium';
  productName: string;
  chemicalProfile: string;
  biogeopolymerProductionImpact: string;
  preTreatmentCostPerTon: number;
}

export const DEFAULT_TAILING: Record<TailingType, TailingComposition> = {
  [TAILING_TYPES.HPAL_RAW]: {
    Fe2O3: 42.5, SiO2: 35.2, MgO: 8.3, Al2O3: 6.1, others: 7.9, H2SO4_gpl: 30,
    qualityGrade: 'standard',
    productName: 'Batako Berongga (Hollow Block) SNI 03-0349-1989',
    chemicalProfile: 'Didominasi hematit (Fe₂O₃ ~42%) dan silika (SiO₂ ~35%).',
    biogeopolymerProductionImpact: 'Tantangan utama: netralisasi H₂SO₄ sisa.',
    preTreatmentCostPerTon: 35_000,
  },
  [TAILING_TYPES.HPAL_NEUTRALIZED]: {
    Fe2O3: 40.1, SiO2: 33.8, MgO: 7.9, Al2O3: 5.8, others: 12.4, H2SO4_gpl: 2,
    qualityGrade: 'premium',
    productName: 'Paving Block (Bata Beton) SNI 03-0691-1996',
    chemicalProfile: 'Profil kimia pasca-netralisasi dua tahap.',
    biogeopolymerProductionImpact: 'Kondisi ideal untuk produksi paving block premium.',
    preTreatmentCostPerTon: 22_000,
  },
};

export const ENERGY_CONSTANTS = {
  MIXING_ENERGY_KWH_PER_TON: 30,
  MOLDING_ENERGY_KWH_PER_TON: 18,
  CONVEYOR_ENERGY_KWH_PER_TON: 6,
  NEUTRALIZATION_ENERGY_KWH_PER_TON: 8,
  CURING_BASE_KWH_PER_TON_PER_DEG: 1.0,
  OPERATING_DAYS: 300,
};

export const ECONOMIC_DEFAULTS = {
  CAPEX_MIXER_REF: 2_800_000_000, CAPEX_MOLDER_REF: 3_200_000_000,
  CAPEX_CURING_CHAMBER_REF: 1_800_000_000, CAPEX_SILO_CONVEYOR_REF: 1_200_000_000,
  CAPEX_NEUTRALIZATION_UNIT_REF: 1_500_000_000, CAPEX_REF_CAPACITY: 50,
  SCALING_FACTOR: 0.6,
  LANG_FACTORS: { INSTALLATION: 0.18, CIVIL: 0.14, ENGINEERING: 0.10, CONTINGENCY: 0.10 },
  LABOR_COST_REF_YEAR: 432_000_000, LABOR_REF_CAPACITY: 50, LABOR_SCALING_FACTOR: 0.25,
  OPEX_FIXED_PERCENT: 0.04, ELECTRICITY_COST_KWH: 1_444,
  LIME_COST_PER_KG: 2_000, BINDER_COST_PER_KG: 2_200,
  PRODUCT_PRICE_STANDARD: 550_000, PRODUCT_PRICE_PREMIUM: 850_000,
  TIPPING_FEE_PER_TON: 150_000,
  DISCOUNT_RATE: 0.12, TAX_RATE: 0.22, PROJECT_YEARS: 10,
};

export const COMMUNITY_CONSTANTS = {
  LIME_CaO_PRICE_PER_KG: 2_200,
  LIME_Ca_OH_2_PRICE_PER_KG: 1_800,
  CEMENT_PRICE_PER_SAK: 95_000,
  CEMENT_ADDITIVE_PRICE_PER_KG: 2_375,
  SAND_PRICE_PER_M3: 250_000,
  TAILING_BULK_DENSITY: 1.7, LIME_BULK_DENSITY: 0.9, CEMENT_BULK_DENSITY: 1.35,
  TCLP_LIMITS: { Ni: 5.0, Co: 1.0, Cr6: 0.5, As: 0.5 },
  PRODUCT_SPECS: {
    PAVING_BLOCK: { name: 'Paving Block (Bata Beton)', sni: 'SNI 03-0691-1996', dimensions: '21 cm × 10,5 cm × 6 cm', weightKg: 3.1, minStrengthMPa: 20 },
    BATAKO_BERONGGA: { name: 'Batako Berongga (Hollow Block)', sni: 'SNI 03-0349-1989', dimensions: '40 cm × 20 cm × 10 cm', weightKg: 9.0, minStrengthMPa: 2.5 },
  },
  RECIPE_RATIOS: {
    RAW: { LIME_KG_PER_KG_TAILING: 0.085, CEMENT_KG_PER_KG_TAILING: 0.15, WATER_LITER_PER_KG_TAILING: 0.12 },
    NEUTRALIZED: { LIME_KG_PER_KG_TAILING: 0.02, CEMENT_KG_PER_KG_TAILING: 0.12, WATER_LITER_PER_KG_TAILING: 0.10 },
  },
  BUFFER_STORAGE: {
    HPAL_RAW: { locationName: 'Tailing Storage Pond - HPAL Plant, Kawasan Industri Nikel Block C', availableTons: 15_000, lastValidated: '2026-05-10', tclpResults: { Ni: 3.2, Co: 0.45, Cr6: 0.28, As: 0.15 } },
    HPAL_NEUTRALIZED: { locationName: 'Intermediate Buffer Storage - Post-Neutralization Tank, Industri Nikel', availableTons: 8_500, lastValidated: '2026-05-12', tclpResults: { Ni: 0.8, Co: 0.12, Cr6: 0.05, As: 0.04 } },
  },
};
