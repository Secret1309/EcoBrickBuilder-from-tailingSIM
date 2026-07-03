"use client";

import { useSimulationStore } from "@/lib/store";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, ReferenceLine, Cell, LineChart, Line
} from 'recharts';
import { exportEcoBrickData } from "@/lib/export";
import { Download, ShieldCheck, Info } from "lucide-react";
import { SNI_THRESHOLDS } from "@/lib/simulation/constants";

export function ResearchTab() {
    const { ecoBrickResult } = useSimulationStore();
    const r = ecoBrickResult;

    if (!r) {
        return (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center text-eco-500">
                <ShieldCheck className="mb-4 h-16 w-16 text-eco-300" />
                <h3 className="text-lg font-bold text-eco-800">Menunggu Data Simulasi</h3>
                <p className="mt-2 max-w-md text-sm">Jalankan simulasi terlebih dahulu untuk melihat analisis kepatuhan SNI.</p>
            </div>
        );
    }

    // Format data for Recharts (Kuat Tekan)
    const strengthData = [
        {
            name: 'Kuat Tekan',
            Simulasi: r.compressiveStrengthMPa,
            'SNI Min': SNI_THRESHOLDS.MIN_COMPRESSIVE_STRENGTH_MPA,
        }
    ];

    // Format data for Recharts (Porositas)
    const porosityData = [
        {
            name: 'Daya Serap Air (%)',
            Simulasi: r.waterAbsorptionPercent,
            'SNI Max': SNI_THRESHOLDS.MAX_WATER_ABSORPTION_PERCENT,
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-xl font-bold text-eco-900">
                        <ShieldCheck className="h-6 w-6 text-eco-600" />
                        Analisis Kepatuhan SNI 03-0349-1989
                    </h3>
                    <p className="text-sm text-eco-600">Validasi sifat mekanik eco-brick terhadap Standar Nasional Indonesia untuk batako berongga.</p>
                </div>
                <button
                    onClick={() => exportEcoBrickData(r)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-eco-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-eco-700"
                >
                    <Download className="h-4 w-4" /> Unduh Laporan CSV
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Chart 1: Kuat Tekan */}
                <div className="rounded-xl border border-eco-200 bg-white p-5 shadow-sm">
                    <h4 className="mb-4 text-center font-bold text-eco-800">Kuat Tekan (MPa) vs Standar SNI</h4>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={strengthData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} domain={[0, Math.max(30, r.compressiveStrengthMPa + 5)]} />
                                <Tooltip
                                    cursor={{ fill: '#f0fdf4' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <ReferenceLine y={SNI_THRESHOLDS.MIN_COMPRESSIVE_STRENGTH_MPA} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Batas Min. SNI (10 MPa)', fill: '#ef4444', fontSize: 12 }} />
                                <Bar dataKey="Simulasi" radius={[6, 6, 0, 0]} maxBarSize={80}>
                                    {
                                        strengthData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.Simulasi >= SNI_THRESHOLDS.MIN_COMPRESSIVE_STRENGTH_MPA ? '#22c55e' : '#f59e0b'} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 2: Porositas */}
                <div className="rounded-xl border border-eco-200 bg-white p-5 shadow-sm">
                    <h4 className="mb-4 text-center font-bold text-eco-800">Daya Serap Air (%) vs Standar SNI</h4>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={porosityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} domain={[0, Math.max(40, r.waterAbsorptionPercent + 10)]} />
                                <Tooltip
                                    cursor={{ fill: '#f0fdf4' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <ReferenceLine y={SNI_THRESHOLDS.MAX_WATER_ABSORPTION_PERCENT} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Batas Maks. SNI (25%)', fill: '#ef4444', fontSize: 12 }} />
                                <Bar dataKey="Simulasi" radius={[6, 6, 0, 0]} maxBarSize={80}>
                                    {
                                        porosityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.Simulasi <= SNI_THRESHOLDS.MAX_WATER_ABSORPTION_PERCENT ? '#3b82f6' : '#ef4444'} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>


        </div>
    );
}
