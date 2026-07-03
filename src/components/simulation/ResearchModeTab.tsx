"use client";

import { useSimulationStore } from "@/lib/store";
import { Info, BarChart3, TrendingUp, Download, Settings2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { SNI_THRESHOLDS } from "@/lib/simulation/constants";
import { computeStrength, computeDensity, computeWaterAbsorption } from "@/lib/simulation/massBalance";
import { useState, useEffect } from "react";

export function ResearchModeTab() {
    const { ecoBrickResult } = useSimulationStore();
    const r = ecoBrickResult;

    if (!r) {
        return (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center text-eco-500">
                <BarChart3 className="mb-4 h-16 w-16 text-eco-300" />
                <h3 className="text-lg font-bold text-eco-800">Menunggu Data Simulasi</h3>
                <p className="mt-2 max-w-md text-sm">Jalankan simulasi terlebih dahulu untuk melihat hasil penelitian dan analisis sensitivitas.</p>
            </div>
        );
    }

    const { tailingKg, cementKg, sandKg, waterKg, admixtureKg } = r.inputComposition;
    const totalSolid = tailingKg + cementKg + sandKg;
    const initialTailingPct = (tailingKg / totalSolid) * 100;
    const initialCementPct = (cementKg / totalSolid) * 100;
    const initialWaterRatio = waterKg / totalSolid;
    const initialAdmixturePct = (admixtureKg / totalSolid) * 100;

    const [currentTailingPct, setCurrentTailingPct] = useState(initialTailingPct);
    const [currentCementPct, setCurrentCementPct] = useState(initialCementPct);
    const [currentWaterRatio, setCurrentWaterRatio] = useState(initialWaterRatio);
    const [currentAdmixturePct, setCurrentAdmixturePct] = useState(initialAdmixturePct);

    // Update state if simulation changes
    useEffect(() => {
        setCurrentTailingPct(initialTailingPct);
        setCurrentCementPct(initialCementPct);
        setCurrentWaterRatio(initialWaterRatio);
        setCurrentAdmixturePct(initialAdmixturePct);
    }, [initialTailingPct, initialCementPct, initialWaterRatio, initialAdmixturePct]);

    const solidVol = r.dimensions.solidVolumeM3;
    const dailySolidKg = 100000; // 100 tons

    const calcProfit = (tPct: number, cPct: number, sPct: number, admixPct: number, str: number, den: number) => {
        const cKg = (dailySolidKg * cPct) / 100;
        const sKg = (dailySolidKg * sPct) / 100;
        const tKg = (dailySolidKg * tPct) / 100;
        const admixKg = (dailySolidKg * admixPct) / 100;

        const weightKg = den * solidVol;
        const bricks = Math.floor(dailySolidKg / weightKg);

        const isSni = str >= SNI_THRESHOLDS.MIN_COMPRESSIVE_STRENGTH_MPA;
        const hargaJual = isSni ? (str >= 15 ? 8500 : 6500) : 2500;
        const rev = bricks * hargaJual;
        
        const opex = (cKg * 1200) + (sKg * 150) + (admixKg * 15000) + 1500000;
        const tip = tKg * 1500;
        
        return rev + tip - opex;
    };

    // Generate Data Variasi Tailing (30% - 70%)
    const tailingVariationData = [];
    for (let t = 30; t <= 70; t += 5) {
        const adjSand = Math.max(0, 100 - currentCementPct - t);
        const str = computeStrength(t, currentCementPct, adjSand, currentWaterRatio, currentAdmixturePct);
        const den = computeDensity(t, currentCementPct, adjSand, currentWaterRatio, currentAdmixturePct);
        const profit = calcProfit(t, currentCementPct, adjSand, currentAdmixturePct, str, den);
        tailingVariationData.push({
            parameterValue: t,
            compressiveStrengthMPa: str,
            waterAbsorptionPercent: computeWaterAbsorption(t, currentCementPct, currentWaterRatio, currentAdmixturePct),
            densityKgM3: den,
            isSNICompliant: str >= SNI_THRESHOLDS.MIN_COMPRESSIVE_STRENGTH_MPA,
            profitHarian: profit
        });
    }

    // Generate Data Variasi Rasio Air (0.35 - 0.60)
    const waterVariationData = [];
    for (let w = 0.35; w <= 0.60; w += 0.05) {
        const wr = Math.round(w * 100) / 100;
        const sandP = 100 - currentTailingPct - currentCementPct;
        const str = computeStrength(currentTailingPct, currentCementPct, sandP, wr, currentAdmixturePct);
        const den = computeDensity(currentTailingPct, currentCementPct, sandP, wr, currentAdmixturePct);
        const profit = calcProfit(currentTailingPct, currentCementPct, sandP, currentAdmixturePct, str, den);
        waterVariationData.push({
            parameterValue: wr,
            compressiveStrengthMPa: str,
            waterAbsorptionPercent: computeWaterAbsorption(currentTailingPct, currentCementPct, wr, currentAdmixturePct),
            densityKgM3: den,
            isSNICompliant: str >= SNI_THRESHOLDS.MIN_COMPRESSIVE_STRENGTH_MPA,
            profitHarian: profit
        });
    }

    // Existing Data Variasi Semen from massBalance (r.sensitivityData)
    const cementVariationData = r.sensitivityData.map(d => {
        const sandP = 100 - currentTailingPct - d.cementPercent;
        const profit = calcProfit(currentTailingPct, d.cementPercent, sandP, currentAdmixturePct, d.compressiveStrengthMPa, d.densityKgM3);
        return {
            parameterValue: d.cementPercent,
            ...d,
            profitHarian: profit
        };
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-xl font-bold text-eco-900">
                        <TrendingUp className="h-6 w-6 text-eco-600" />
                        Mode Penelitian: Analisis Sensitivitas
                    </h3>
                    <p className="text-sm text-eco-600">Analisis pengaruh perubahan variabel independen terhadap mutu produk batako.</p>
                </div>
            </div>

            {/* Panel Variabel Kontrol */}
            <div className="rounded-xl border border-eco-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                    <Settings2 className="h-5 w-5 text-eco-600" />
                    <h4 className="font-bold text-eco-800">Variabel Kontrol (Parameter Tetap)</h4>
                </div>
                <p className="mb-4 text-xs text-eco-600">Nilai default diambil dari hasil simulasi 3D. Anda dapat mengubahnya untuk melihat bagaimana grafik variasi merespon kondisi *baseline* yang berbeda.</p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label className="mb-1 block text-xs font-bold text-eco-700">Tailing (%)</label>
                        <input type="range" min="0" max="80" step="1" value={currentTailingPct} onChange={(e) => setCurrentTailingPct(Number(e.target.value))} className="w-full accent-eco-600" />
                        <div className="mt-1 text-right text-xs font-mono">{currentTailingPct.toFixed(1)}%</div>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-bold text-eco-700">Semen Portland (%)</label>
                        <input type="range" min="5" max="30" step="1" value={currentCementPct} onChange={(e) => setCurrentCementPct(Number(e.target.value))} className="w-full accent-eco-600" />
                        <div className="mt-1 text-right text-xs font-mono">{currentCementPct.toFixed(1)}%</div>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-bold text-eco-700">Rasio Air (w/c)</label>
                        <input type="range" min="0.3" max="0.7" step="0.01" value={currentWaterRatio} onChange={(e) => setCurrentWaterRatio(Number(e.target.value))} className="w-full accent-blue-600" />
                        <div className="mt-1 text-right text-xs font-mono">{currentWaterRatio.toFixed(2)}</div>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-bold text-eco-700">Eco-Admixture (%)</label>
                        <input type="range" min="0" max="5" step="0.1" value={currentAdmixturePct} onChange={(e) => setCurrentAdmixturePct(Number(e.target.value))} className="w-full accent-purple-600" />
                        <div className="mt-1 text-right text-xs font-mono">{currentAdmixturePct.toFixed(1)}%</div>
                    </div>
                </div>
            </div>

            {/* VARIATION 1: SEMEN */}
            <VariationSection 
                title="Variasi 1: Pengaruh Persentase Semen (Binder)" 
                xAxisLabel="% Semen" 
                data={cementVariationData} 
            />

            {/* VARIATION 2: TAILING */}
            <VariationSection 
                title="Variasi 2: Pengaruh Persentase Tailing" 
                xAxisLabel="% Tailing" 
                data={tailingVariationData} 
            />

            {/* VARIATION 3: RASIO AIR */}
            <VariationSection 
                title="Variasi 3: Pengaruh Rasio Air (Water/Solid Ratio)" 
                xAxisLabel="Rasio Air" 
                data={waterVariationData} 
            />
        </div>
    );
}

function VariationSection({ title, xAxisLabel, data }: { title: string, xAxisLabel: string, data: any[] }) {
    const handleDownloadCSV = () => {
        const headers = [xAxisLabel, "Kuat Tekan (MPa)", "Porositas (%)", "Densitas (kg/m3)", "Profit Harian (Rp)", "Status SNI"];
        const rows = data.map(row => [
            row.parameterValue,
            row.compressiveStrengthMPa,
            row.waterAbsorptionPercent,
            row.densityKgM3,
            row.profitHarian,
            row.isSNICompliant ? "Memenuhi" : "Gagal"
        ]);
        
        const csvContent = [
            headers.join(","),
            ...rows.map(e => e.join(","))
        ].join("\n");
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Data_Penelitian_${xAxisLabel.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="rounded-xl border border-eco-200 bg-white p-5 shadow-sm overflow-hidden">
            <div className="mb-6 flex items-center gap-2">
                <h4 className="text-lg font-bold text-eco-800">{title}</h4>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">Untuk Hasil Paper LKTI</span>
                <button
                    onClick={handleDownloadCSV}
                    className="ml-auto flex items-center gap-2 rounded-lg bg-eco-100 px-3 py-1.5 text-xs font-bold text-eco-700 hover:bg-eco-200 transition-colors"
                >
                    <Download className="h-4 w-4" /> Download CSV
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
                {/* Chart: Kuat Tekan */}
                <div className="rounded-lg border border-eco-100 p-4">
                    <h5 className="mb-2 text-center text-sm font-bold text-eco-700">Kuat Tekan vs {xAxisLabel}</h5>
                    <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="parameterValue" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                                <ReferenceLine y={SNI_THRESHOLDS.MIN_COMPRESSIVE_STRENGTH_MPA} stroke="#ef4444" strokeDasharray="3 3" />
                                <Line type="monotone" dataKey="compressiveStrengthMPa" name="Kuat Tekan (MPa)" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart: Porositas */}
                <div className="rounded-lg border border-eco-100 p-4">
                    <h5 className="mb-2 text-center text-sm font-bold text-eco-700">Porositas vs {xAxisLabel}</h5>
                    <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="parameterValue" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                                <ReferenceLine y={SNI_THRESHOLDS.MAX_WATER_ABSORPTION_PERCENT} stroke="#ef4444" strokeDasharray="3 3" />
                                <Line type="monotone" dataKey="waterAbsorptionPercent" name="Porositas (%)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart: Profit Harian */}
                <div className="rounded-lg border border-eco-100 p-4">
                    <h5 className="mb-2 text-center text-sm font-bold text-eco-700">Profit Harian vs {xAxisLabel}</h5>
                    <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="parameterValue" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} tickFormatter={(val) => `Rp${(val/1000000).toFixed(0)}M`} />
                                <Tooltip formatter={(value: any) => `Rp ${Number(value).toLocaleString('id-ID')}`} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                                <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" />
                                <Line type="monotone" dataKey="profitHarian" name="Profit Harian" stroke="#eab308" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-eco-200 rounded-lg">
                <table className="w-full text-left text-sm">
                    <thead className="bg-eco-50 text-xs uppercase text-eco-600">
                        <tr>
                            <th className="px-5 py-3 border-b border-eco-200">{xAxisLabel}</th>
                            <th className="px-5 py-3 border-b border-eco-200">Kuat Tekan (MPa)</th>
                            <th className="px-5 py-3 border-b border-eco-200">Porositas (%)</th>
                            <th className="px-5 py-3 border-b border-eco-200">Densitas (kg/m³)</th>
                            <th className="px-5 py-3 border-b border-eco-200">Profit Harian</th>
                            <th className="px-5 py-3 border-b border-eco-200">Status SNI</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-eco-100">
                        {data.map((row, idx) => (
                            <tr key={idx} className="transition-colors hover:bg-eco-50/50">
                                <td className="px-5 py-2 font-mono font-bold text-eco-900">{row.parameterValue}</td>
                                <td className="px-5 py-2 font-mono text-eco-800">{row.compressiveStrengthMPa}</td>
                                <td className="px-5 py-2 font-mono text-eco-800">{row.waterAbsorptionPercent}</td>
                                <td className="px-5 py-2 font-mono text-eco-800">{row.densityKgM3}</td>
                                <td className={`px-5 py-2 font-mono font-bold ${row.profitHarian >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    Rp {(row.profitHarian / 1000000).toFixed(1)} Jt
                                </td>
                                <td className="px-5 py-2">
                                    {row.isSNICompliant
                                        ? <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">Memenuhi</span>
                                        : <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">Gagal</span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
