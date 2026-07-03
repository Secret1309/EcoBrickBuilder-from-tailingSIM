// ============================================================
// ECO-BRICK SIMULATOR — TypeScript Type Definitions
// Green Scientific Competition (GSC) 2026 — EneRC FT ITB
// ============================================================

/** Input campuran material eco-brick dari ControlPanel */
export interface EcoBrickInput {
  tailingPercentage: number;       // % limbah tailing (0–80) — bagian dari solid 100%
  cementPercentage: number;        // % semen Portland (5–30) — bagian dari solid 100%
  sandPercentage: number;          // % pasir silika (10–50) — bagian dari solid 100%
  waterRatio: number;              // Faktor Air Semen / w/c ratio (0.3–0.7) — rasio thd total solid
  ecoAdmixtureAmount: number;      // % bahan aditif ramah lingkungan (0–5) — rasio thd total solid
}

/** Output simulasi eco-brick — semua nilai kalkulasi */
export interface EcoBrickOutput {
  // === Metrik Produksi & SDGs ===
  totalBricksProduced: number;     // pcs (jumlah batako yang dihasilkan per hari)
  recycledWasteTons: number;       // ton limbah tailing yang terdaur ulang per hari
  carbonReductionKg: number;       // kg CO₂e yang tereduksi vs bata konvensional

  // === Sifat Mekanik & Fisik Material (Data Paper LKTI) ===
  compressiveStrengthMPa: number;  // Kekuatan tekan (MPa)
  waterAbsorptionPercent: number;  // Daya serap air / Porositas (%)
  densityKgM3: number;            // Kepadatan batako (kg/m³)
  isSNICompliant: boolean;        // Harus ≥ 10 MPa untuk struktural ringan

  // === Dimensi Geometri Produk (SNI 03-0349-1989 Batako Berongga) ===
  dimensions: {
    lengthCm: number;              // Standar: 40 cm
    widthCm: number;               // Standar: 20 cm
    heightCm: number;              // Standar: 10 cm
    volumeM3: number;              // Volume total (P × L × T)
    solidVolumeM3: number;         // Volume solid (setelah dikurangi rongga)
    weightKg: number;              // Berat per unit (densitas × volume solid)
  };

  // === Potensi Aplikatif (Konversi ke infrastruktur nyata) ===
  applicableInfrastructureArea: {
    sidewalkSqm: number;           // Luas trotoar yang bisa dibangun (m²)
    wallSqm: number;               // Luas dinding yang bisa dibangun (m²)
  };

  // === Data Komposisi Input (untuk visualisasi dashboard) ===
  inputComposition: {
    tailingKg: number;
    cementKg: number;
    sandKg: number;
    waterKg: number;
    admixtureKg: number;
  };

  // === Sensitivity Data (untuk grafik Research Tab) ===
  sensitivityData: {
    cementPercent: number;
    compressiveStrengthMPa: number;
    waterAbsorptionPercent: number;
    densityKgM3: number;
    isSNICompliant: boolean;
  }[];
}

/** Phase animasi 3D scene */
export type SimulationPhase = 'idle' | 'mixing' | 'completed' | 'result';
