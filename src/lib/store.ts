
import { create } from 'zustand';
import { EcoBrickInput, EcoBrickOutput, SimulationPhase } from '@/lib/simulation/types';
import { calculateEcoBrick } from '@/lib/simulation/massBalance';

interface SimulationStore {
  // === Inputs (Komposisi Material) ===
  tailingPercentage: number;
  cementPercentage: number;
  sandPercentage: number;
  waterRatio: number;
  ecoAdmixtureAmount: number;

  // === State ===
  isSimulating: boolean;
  simulationPhase: SimulationPhase;
  ecoBrickResult: EcoBrickOutput | null;

  // === Actions ===
  setParams: (params: Partial<SimulationStore>) => void;
  runSimulation: () => Promise<void>;
  resetParams: () => void;
}

const DEFAULT_PARAMS = {
  tailingPercentage: 40,
  cementPercentage: 20,
  sandPercentage: 40,
  waterRatio: 0.45,
  ecoAdmixtureAmount: 1,
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  ...DEFAULT_PARAMS,

  isSimulating: false,
  simulationPhase: 'idle' as SimulationPhase,
  ecoBrickResult: null,

  setParams: (params) => set((state) => ({ ...state, ...params })),

  runSimulation: async () => {
    set({ isSimulating: true, simulationPhase: 'mixing' });

    // Fase mixing — animasi 3D mixer berputar
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const {
      tailingPercentage, cementPercentage, sandPercentage,
      waterRatio, ecoAdmixtureAmount,
    } = get();

    const input: EcoBrickInput = {
      tailingPercentage,
      cementPercentage,
      sandPercentage,
      waterRatio,
      ecoAdmixtureAmount,
    };

    const result = calculateEcoBrick(input);

    // Fase completed — transisi fade-out mixer
    set({ simulationPhase: 'completed' });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Fase result — eco-brick muncul
    set({
      isSimulating: false,
      simulationPhase: 'result',
      ecoBrickResult: result,
    });
  },

  resetParams: () =>
    set({
      ...DEFAULT_PARAMS,
      ecoBrickResult: null,
      simulationPhase: 'idle' as SimulationPhase,
    }),
}));
