
"use client";

import { useSimulationStore } from "@/lib/store";
import { Play, RotateCcw, Beaker } from "lucide-react";
import { useState } from "react";

export function ControlPanel() {
    const {
        tailingPercentage, cementPercentage, sandPercentage,
        waterRatio, ecoAdmixtureAmount, isSimulating,
        setParams, runSimulation, resetParams, ecoBrickResult,
    } = useSimulationStore();

    const [isOpen, setIsOpen] = useState(false);

    // Validasi: total solid = 100%
    const solidTotal = tailingPercentage + cementPercentage + sandPercentage;
    const isValidTotal = Math.abs(solidTotal - 100) < 0.01;

    return (
        <>
            {/* Mobile Toggle */}
            <div className="border-b border-eco-200 bg-eco-50 p-4 lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex w-full items-center justify-between rounded-lg border border-eco-300 bg-white px-4 py-2.5 text-sm font-medium text-eco-800"
                    id="control-panel-toggle"
                >
                    <span className="flex items-center gap-2">
                        <Beaker className="h-4 w-4 text-eco-600" />
                        {isOpen ? 'Sembunyikan Parameter' : 'Atur Komposisi Material'}
                    </span>
                    <Play className={`h-4 w-4 transition-transform text-eco-600 ${isOpen ? 'rotate-90' : ''}`} />
                </button>
            </div>

            {/* Panel Content */}
            <div className={`${isOpen ? 'flex' : 'hidden'} h-full w-full flex-col gap-5 overflow-y-auto border-r border-eco-200 bg-white p-5 shadow-sm lg:flex lg:w-80`}>
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="mb-0.5 text-lg font-bold text-eco-900 flex items-center gap-2">
                            <Beaker className="h-5 w-5 text-eco-600" />
                            Komposisi Material
                        </h2>
                        <p className="text-xs text-eco-500">Atur campuran bahan eco-brick</p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="rounded-md p-1 hover:bg-eco-50 lg:hidden">
                        <RotateCcw className="h-4 w-4 rotate-45 text-eco-600" />
                    </button>
                </div>

                {/* Solid Total Validation Bar */}
                <div className={`rounded-lg p-3 text-xs font-medium ${isValidTotal ? 'bg-eco-50 text-eco-700 border border-eco-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    <div className="flex items-center justify-between mb-1.5">
                        <span>Total Komposisi Padat</span>
                        <span className="font-bold font-mono">{solidTotal.toFixed(0)}% / 100%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-eco-200">
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${isValidTotal ? 'bg-eco-500' : solidTotal > 100 ? 'bg-red-500' : 'bg-yellow-500'}`}
                            style={{ width: `${Math.min(solidTotal, 100)}%` }}
                        />
                    </div>
                    {!isValidTotal && (
                        <p className="mt-1 text-[10px] text-red-600">
                            ⚠️ Total harus = 100%. {solidTotal > 100 ? `Kurangi ${(solidTotal - 100).toFixed(0)}%` : `Tambah ${(100 - solidTotal).toFixed(0)}%`}
                        </p>
                    )}
                </div>

                {/* 1. Komposisi Padat */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-eco-500">
                        Komposisi Padat (Total = 100%)
                    </h3>

                    {/* Tailing */}
                    <SliderInput
                        label="Limbah Tailing"
                        value={tailingPercentage}
                        min={0} max={80} step={1}
                        unit="%"
                        color="text-concrete-600"
                        onChange={(v) => setParams({ tailingPercentage: v })}
                    />

                    {/* Semen */}
                    <SliderInput
                        label="Semen Portland"
                        value={cementPercentage}
                        min={5} max={30} step={1}
                        unit="%"
                        color="text-eco-700"
                        onChange={(v) => setParams({ cementPercentage: v })}
                    />

                    {/* Pasir */}
                    <SliderInput
                        label="Pasir Silika"
                        value={sandPercentage}
                        min={10} max={50} step={1}
                        unit="%"
                        color="text-yellow-700"
                        onChange={(v) => setParams({ sandPercentage: v })}
                    />
                </div>

                {/* 2. Rasio Tambahan */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-eco-500">
                        Rasio Tambahan (terhadap berat padat)
                    </h3>

                    {/* Rasio Air */}
                    <SliderInput
                        label="Rasio Air (w/c)"
                        value={waterRatio}
                        min={0.3} max={0.7} step={0.01}
                        unit=""
                        color="text-blue-700"
                        onChange={(v) => setParams({ waterRatio: v })}
                        displayValue={waterRatio.toFixed(2)}
                    />

                    {/* Eco Admixture */}
                    <SliderInput
                        label="Eco-Admixture"
                        value={ecoAdmixtureAmount}
                        min={0} max={5} step={0.1}
                        unit="%"
                        color="text-eco-600"
                        onChange={(v) => setParams({ ecoAdmixtureAmount: v })}
                        displayValue={ecoAdmixtureAmount.toFixed(1)}
                    />
                </div>

                {/* Actions */}
                <div className="mt-auto space-y-3 pt-4">
                    <button
                        onClick={() => {
                            runSimulation();
                            setIsOpen(false);
                        }}
                        disabled={isSimulating || !isValidTotal}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-eco-600 px-4 py-3.5 font-bold text-white shadow-md shadow-eco-600/20 transition-all hover:bg-eco-500 hover:shadow-eco-500/30 disabled:bg-concrete-300 disabled:shadow-none"
                        id="run-simulation-btn"
                    >
                        {isSimulating ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Memproses...
                            </>
                        ) : (
                            <>
                                <Play className="h-4 w-4" /> Jalankan Simulasi
                            </>
                        )}
                    </button>

                    <button
                        onClick={resetParams}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-eco-300 px-4 py-2.5 text-sm font-medium text-eco-700 transition-colors hover:bg-eco-50"
                        id="reset-params-btn"
                    >
                        <RotateCcw className="h-3 w-3" /> Reset Default
                    </button>

                    {/* Quick SNI Check */}
                    {ecoBrickResult && (
                        <div className={`rounded-lg p-3 text-xs font-medium ${ecoBrickResult.isSNICompliant ? 'bg-eco-50 text-eco-700 border border-eco-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                            <div className="flex items-center gap-2">
                                <span className="text-base">{ecoBrickResult.isSNICompliant ? '✅' : '❌'}</span>
                                <div>
                                    <div className="font-bold">
                                        {ecoBrickResult.isSNICompliant ? 'Memenuhi SNI' : 'Gagal SNI'}
                                    </div>
                                    <div className="text-[10px] opacity-80">
                                        Kuat tekan: {ecoBrickResult.compressiveStrengthMPa} MPa (min. 10 MPa)
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// === Reusable Slider Component ===
function SliderInput({
    label, value, min, max, step, unit, color, onChange, displayValue,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    color: string;
    onChange: (v: number) => void;
    displayValue?: string;
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-eco-800">{label}</label>
                <div className="flex items-center gap-1">
                    <input
                        type="number"
                        min={min} max={max} step={step}
                        value={displayValue ?? value}
                        onChange={(e) => onChange(Number(e.target.value) || min)}
                        className={`w-16 rounded-md border border-eco-200 bg-eco-50 p-1 text-right text-sm font-bold ${color} focus:border-eco-500 focus:outline-none`}
                    />
                    {unit && <span className={`text-sm font-bold ${color}`}>{unit}</span>}
                </div>
            </div>
            <input
                type="range" min={min} max={max} step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-eco-100 accent-eco-600"
            />
            <div className="flex justify-between text-[10px] text-eco-400">
                <span>{min}{unit}</span>
                <span>{max}{unit}</span>
            </div>
        </div>
    );
}
