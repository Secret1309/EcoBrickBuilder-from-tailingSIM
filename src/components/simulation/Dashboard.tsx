"use client";

import { useState } from "react";
import { useSimulationStore } from "@/lib/store";
import { ReactorScene } from "./ReactorScene";
import { ResearchTab } from "./ResearchTab";
import { ResearchModeTab } from "./ResearchModeTab";
import { EconomyTab } from "./EconomyTab";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Package, Building2, Leaf, Recycle, Ruler, Weight, Gauge, Droplets, CircleDollarSign, FlaskConical } from "lucide-react";

export function Dashboard() {
    const [activeTab, setActiveTab] = useState<'visual' | 'dashboard' | 'sni' | 'research' | 'economy'>('dashboard');
    const { ecoBrickResult } = useSimulationStore();

    const r = ecoBrickResult;

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-eco-50">
            {/* Tab Navigation */}
            <div className="flex overflow-x-auto border-b border-eco-200 bg-white px-2 lg:px-6 no-scrollbar">
                <button
                    onClick={() => setActiveTab('visual')}
                    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors lg:px-6 lg:py-4 ${
                        activeTab === 'visual'
                            ? 'border-eco-600 text-eco-800'
                            : 'border-transparent text-eco-400 hover:text-eco-600'
                    }`}
                    id="tab-visual"
                >
                    🧊 Visualisasi 3D
                </button>
                <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors lg:px-6 lg:py-4 ${
                        activeTab === 'dashboard'
                            ? 'border-eco-600 text-eco-800'
                            : 'border-transparent text-eco-400 hover:text-eco-600'
                    }`}
                    id="tab-dashboard"
                >
                    📊 Dashboard
                </button>
                <button
                    onClick={() => setActiveTab('sni')}
                    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors lg:px-6 lg:py-4 ${
                        activeTab === 'sni'
                            ? 'border-eco-600 text-eco-800'
                            : 'border-transparent text-eco-400 hover:text-eco-600'
                    }`}
                    id="tab-sni"
                >
                    🔬 Analisis SNI
                </button>
                <button
                    onClick={() => setActiveTab('research')}
                    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors lg:px-6 lg:py-4 ${
                        activeTab === 'research'
                            ? 'border-eco-600 text-eco-800'
                            : 'border-transparent text-eco-400 hover:text-eco-600'
                    }`}
                    id="tab-research"
                >
                    <FlaskConical className="inline-block h-4 w-4 mr-1" /> Mode Penelitian
                </button>
                <button
                    onClick={() => setActiveTab('economy')}
                    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors lg:px-6 lg:py-4 ${
                        activeTab === 'economy'
                            ? 'border-eco-600 text-eco-800'
                            : 'border-transparent text-eco-400 hover:text-eco-600'
                    }`}
                    id="tab-economy"
                >
                    <CircleDollarSign className="inline-block h-4 w-4 mr-1" /> Ekonomi
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">

                {/* ====== 3D VISUALIZATION TAB ====== */}
                {activeTab === 'visual' && (
                    <div className="h-full w-full rounded-xl border border-eco-200 shadow-sm overflow-hidden">
                        <ReactorScene />
                    </div>
                )}

                {/* ====== DASHBOARD TAB ====== */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        {/* No result state */}
                        {!r && (
                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-eco-300 bg-white p-16 text-center">
                                <div className="mb-4 text-5xl">🧱</div>
                                <h3 className="text-xl font-bold text-eco-800">Belum Ada Hasil Simulasi</h3>
                                <p className="mt-2 max-w-md text-sm text-eco-500">
                                    Atur komposisi material di panel kiri, lalu tekan &quot;Jalankan Simulasi&quot; untuk melihat spesifikasi eco-brick.
                                </p>
                            </div>
                        )}

                        {r && (
                            <>
                                {/* ===== SECTION 1: METRIK APLIKATIF & SDGs ===== */}
                                <div>
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-eco-900">
                                        <Leaf className="h-5 w-5 text-eco-500" />
                                        Metrik Aplikatif & SDGs
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                        {/* Total Produksi */}
                                        <MetricCard
                                            icon={<Package className="h-5 w-5" />}
                                            iconBg="bg-eco-100 text-eco-700"
                                            label="Total Produksi Harian"
                                            value={r.totalBricksProduced.toLocaleString('id-ID')}
                                            unit="pcs/hari"
                                        />
                                        {/* Luas Infrastruktur */}
                                        <MetricCard
                                            icon={<Building2 className="h-5 w-5" />}
                                            iconBg="bg-blue-100 text-blue-700"
                                            label="Potensi Luas Dinding"
                                            value={r.applicableInfrastructureArea.wallSqm.toLocaleString('id-ID')}
                                            unit="m²"
                                            sub={`Trotoar: ${r.applicableInfrastructureArea.sidewalkSqm.toLocaleString('id-ID')} m²`}
                                        />
                                        {/* Reduksi Karbon */}
                                        <MetricCard
                                            icon={<Leaf className="h-5 w-5" />}
                                            iconBg="bg-emerald-100 text-emerald-700"
                                            label="Reduksi Jejak Karbon"
                                            value={r.carbonReductionKg.toLocaleString('id-ID')}
                                            unit="kg CO₂e/hari"
                                        />
                                        {/* Limbah Terdaur Ulang */}
                                        <MetricCard
                                            icon={<Recycle className="h-5 w-5" />}
                                            iconBg="bg-amber-100 text-amber-700"
                                            label="Limbah Terdaur Ulang"
                                            value={r.recycledWasteTons.toFixed(1)}
                                            unit="ton/hari"
                                        />
                                    </div>
                                </div>

                                {/* ===== SECTION 2: MATERIAL SPECIFICATION SHEET ===== */}
                                <div>
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-eco-900">
                                        <Gauge className="h-5 w-5 text-concrete-500" />
                                        Spesifikasi Material Eco-Brick
                                        <span className="ml-auto text-xs font-normal text-eco-400">SNI 03-0349-1989</span>
                                    </h3>

                                    {/* SNI Badge */}
                                    <div className={`mb-4 flex items-center gap-3 rounded-xl border-2 p-4 ${
                                        r.isSNICompliant
                                            ? 'border-eco-400 bg-eco-50'
                                            : 'border-red-300 bg-red-50'
                                    }`}>
                                        <span className="text-3xl">{r.isSNICompliant ? '✅' : '❌'}</span>
                                        <div>
                                            <div className={`text-sm font-bold ${r.isSNICompliant ? 'text-eco-800' : 'text-red-800'}`}>
                                                {r.isSNICompliant
                                                    ? 'MEMENUHI STANDAR SNI 03-0349-1989'
                                                    : 'TIDAK MEMENUHI STANDAR SNI — Kuat Tekan di Bawah 10 MPa'}
                                            </div>
                                            <div className="text-xs text-eco-600">
                                                Kuat Tekan Simulasi: <strong>{r.compressiveStrengthMPa} MPa</strong> | Minimum SNI: <strong>10 MPa</strong>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spec Table */}
                                    <div className="overflow-hidden rounded-xl border border-eco-200 bg-white shadow-sm">
                                        <table className="w-full text-left text-sm" id="material-spec-table">
                                            <thead className="bg-eco-800 text-xs uppercase text-eco-100">
                                                <tr>
                                                    <th className="px-5 py-3">Parameter</th>
                                                    <th className="px-5 py-3 text-right">Nilai</th>
                                                    <th className="px-5 py-3 text-right">Satuan</th>
                                                    <th className="px-5 py-3 text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-eco-100">
                                                <SpecRow
                                                    icon={<Ruler className="h-4 w-4 text-eco-500" />}
                                                    label="Dimensi (P × L × T)"
                                                    value={`${r.dimensions.lengthCm} × ${r.dimensions.widthCm} × ${r.dimensions.heightCm}`}
                                                    unit="cm"
                                                />
                                                <SpecRow
                                                    icon={<Weight className="h-4 w-4 text-concrete-500" />}
                                                    label="Berat per Unit"
                                                    value={r.dimensions.weightKg.toFixed(2)}
                                                    unit="kg"
                                                />
                                                <SpecRow
                                                    icon={<Gauge className="h-4 w-4 text-blue-500" />}
                                                    label="Kepadatan / Densitas"
                                                    value={r.densityKgM3.toLocaleString('id-ID')}
                                                    unit="kg/m³"
                                                    status={r.densityKgM3 >= 1500 ? 'pass' : 'fail'}
                                                />
                                                <SpecRow
                                                    icon={<Gauge className="h-4 w-4 text-eco-600" />}
                                                    label="Kuat Tekan"
                                                    value={r.compressiveStrengthMPa.toString()}
                                                    unit="MPa"
                                                    status={r.isSNICompliant ? 'pass' : 'fail'}
                                                    highlight
                                                />
                                                <SpecRow
                                                    icon={<Droplets className="h-4 w-4 text-blue-400" />}
                                                    label="Daya Serap Air / Porositas"
                                                    value={r.waterAbsorptionPercent.toString()}
                                                    unit="%"
                                                    status={r.waterAbsorptionPercent <= 25 ? 'pass' : 'fail'}
                                                />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* ===== Komposisi Input Summary ===== */}
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                                    <div className="col-span-1 lg:col-span-2 rounded-xl border border-eco-200 bg-white p-5 shadow-sm">
                                        <h4 className="mb-3 font-semibold text-eco-800">Komposisi Input Harian (kg)</h4>
                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 h-full content-center">
                                            <CompositionChip label="Tailing" value={r.inputComposition.tailingKg} color="bg-concrete-100 text-concrete-700" />
                                            <CompositionChip label="Semen" value={r.inputComposition.cementKg} color="bg-eco-100 text-eco-700" />
                                            <CompositionChip label="Pasir" value={r.inputComposition.sandKg} color="bg-yellow-100 text-yellow-700" />
                                            <CompositionChip label="Air" value={r.inputComposition.waterKg} color="bg-blue-100 text-blue-700" />
                                            <CompositionChip label="Admixture" value={r.inputComposition.admixtureKg} color="bg-purple-100 text-purple-700" />
                                        </div>
                                    </div>
                                    <div className="col-span-1 rounded-xl border border-eco-200 bg-white p-5 shadow-sm">
                                        <h4 className="mb-3 font-semibold text-eco-800 text-center">Distribusi Material</h4>
                                        <div className="h-[150px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={[
                                                            { name: 'Tailing', value: r.inputComposition.tailingKg },
                                                            { name: 'Semen', value: r.inputComposition.cementKg },
                                                            { name: 'Pasir', value: r.inputComposition.sandKg },
                                                        ]}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={40}
                                                        outerRadius={60}
                                                        paddingAngle={2}
                                                        dataKey="value"
                                                    >
                                                        <Cell fill="#6b7280" /> {/* Tailing */}
                                                        <Cell fill="#16a34a" /> {/* Semen */}
                                                        <Cell fill="#eab308" /> {/* Pasir */}
                                                    </Pie>
                                                    <Tooltip formatter={(val: any) => `${Number(val).toLocaleString('id-ID')} kg`} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>

                                {/* ===== Volume & Infrastructure Detail ===== */}
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <div className="rounded-xl border border-eco-200 bg-white p-5 shadow-sm">
                                        <h4 className="mb-3 font-semibold text-eco-800">Geometri Batako</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between text-eco-700">
                                                <span>Volume Total</span>
                                                <span className="font-mono font-bold">{(r.dimensions.volumeM3 * 1e6).toFixed(0)} cm³</span>
                                            </div>
                                            <div className="flex justify-between text-eco-700">
                                                <span>Volume Solid</span>
                                                <span className="font-mono font-bold">{(r.dimensions.solidVolumeM3 * 1e6).toFixed(0)} cm³</span>
                                            </div>
                                            <div className="flex justify-between text-eco-700">
                                                <span>Volume Rongga</span>
                                                <span className="font-mono font-bold">{((r.dimensions.volumeM3 - r.dimensions.solidVolumeM3) * 1e6).toFixed(0)} cm³</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-eco-200 bg-white p-5 shadow-sm">
                                        <h4 className="mb-3 font-semibold text-eco-800">Potensi Infrastruktur Harian</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between text-eco-700">
                                                <span>🏗️ Luas Dinding</span>
                                                <span className="font-mono font-bold">{r.applicableInfrastructureArea.wallSqm.toLocaleString('id-ID')} m²</span>
                                            </div>
                                            <div className="flex justify-between text-eco-700">
                                                <span>🚶 Luas Trotoar</span>
                                                <span className="font-mono font-bold">{r.applicableInfrastructureArea.sidewalkSqm.toLocaleString('id-ID')} m²</span>
                                            </div>
                                            <div className="flex justify-between text-eco-700">
                                                <span>🌱 CO₂ Tereduksi</span>
                                                <span className="font-mono font-bold text-eco-600">{r.carbonReductionKg.toLocaleString('id-ID')} kg</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* ====== RESEARCH / SNI TAB ====== */}
                {activeTab === 'sni' && (
                    <div className="w-full">
                        <ResearchTab />
                    </div>
                )}

                {/* ====== MODE PENELITIAN TAB ====== */}
                {activeTab === 'research' && (
                    <div className="w-full">
                        <ResearchModeTab />
                    </div>
                )}

                {/* ====== ECONOMY TAB ====== */}
                {activeTab === 'economy' && (
                    <div className="w-full">
                        <EconomyTab />
                    </div>
                )}
            </div>
        </div>
    );
}

// ========== Sub-Components ==========

function MetricCard({ icon, iconBg, label, value, unit, sub }: {
    icon: React.ReactNode;
    iconBg: string;
    label: string;
    value: string;
    unit: string;
    sub?: string;
}) {
    return (
        <div className="rounded-xl border border-eco-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>
                {icon}
            </div>
            <p className="text-xs font-medium text-eco-500">{label}</p>
            <p className="mt-1 text-2xl font-bold text-eco-900 font-mono">
                {value} <span className="text-sm font-sans font-normal text-eco-400">{unit}</span>
            </p>
            {sub && <p className="mt-1 text-[11px] text-eco-400">{sub}</p>}
        </div>
    );
}

function SpecRow({ icon, label, value, unit, status, highlight }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    unit: string;
    status?: 'pass' | 'fail';
    highlight?: boolean;
}) {
    return (
        <tr className={`transition-colors hover:bg-eco-50 ${highlight ? 'bg-eco-50/50' : ''}`}>
            <td className="flex items-center gap-2 px-5 py-3 font-medium text-eco-800">
                {icon} {label}
            </td>
            <td className="px-5 py-3 text-right font-mono font-bold text-eco-900">{value}</td>
            <td className="px-5 py-3 text-right text-eco-500">{unit}</td>
            <td className="px-5 py-3 text-center">
                {status === 'pass' && <span className="rounded-full bg-eco-100 px-2 py-0.5 text-xs font-bold text-eco-700">✓ Lulus</span>}
                {status === 'fail' && <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">✗ Gagal</span>}
                {!status && <span className="text-xs text-eco-300">—</span>}
            </td>
        </tr>
    );
}

function CompositionChip({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className={`rounded-lg p-3 text-center ${color}`}>
            <div className="text-[10px] font-medium uppercase tracking-wide opacity-70">{label}</div>
            <div className="mt-0.5 font-mono text-lg font-bold">{value.toLocaleString('id-ID')}</div>
            <div className="text-[10px]">kg</div>
        </div>
    );
}
