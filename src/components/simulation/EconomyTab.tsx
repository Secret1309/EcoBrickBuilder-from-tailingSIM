"use client";

import { useSimulationStore } from "@/lib/store";
import { CircleDollarSign, TrendingUp, Wallet, Coins } from "lucide-react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function EconomyTab() {
    const { ecoBrickResult } = useSimulationStore();
    const r = ecoBrickResult;

    if (!r) {
        return (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center text-eco-500">
                <CircleDollarSign className="mb-4 h-16 w-16 text-eco-300" />
                <h3 className="text-lg font-bold text-eco-800">Menunggu Data Simulasi</h3>
                <p className="mt-2 max-w-md text-sm">Jalankan simulasi terlebih dahulu untuk melihat analisis tekno-ekonomi.</p>
            </div>
        );
    }

    // Perhitungan Ekonomi Dasar
    const hariKerjaSetahun = 300;
    const { tailingKg, cementKg, sandKg, admixtureKg } = r.inputComposition;
    const totalBricksDaily = r.totalBricksProduced;
    
    // Asumsi Biaya (OPEX)
    const hargaSemen = 1200; // Rp 1.200 / kg (Harga semen curah industri)
    const hargaPasir = 150; // Rp 150 / kg
    const hargaAdmixture = 15000; // Rp 15.000 / kg
    const tippingFeeTailing = 1500; // Pendapatan Rp 1.500 / kg (Rp 1.500.000/ton) dari pabrik pengolahan limbah B3
    const biayaListrikTenagaKerjaHarian = 1500000; // Rp 1.500.000 / hari

    const opexSemen = cementKg * hargaSemen;
    const opexPasir = sandKg * hargaPasir;
    const opexAdmixture = admixtureKg * hargaAdmixture;
    const pendapatanTippingFee = tailingKg * tippingFeeTailing;
    
    const totalOpexHarian = opexSemen + opexPasir + opexAdmixture + biayaListrikTenagaKerjaHarian;
    
    // Revenue Batako
    const hargaJualBatako = r.isSNICompliant ? (r.compressiveStrengthMPa >= 15 ? 8500 : 6500) : 2500;
    const revenueBatakoHarian = totalBricksDaily * hargaJualBatako;
    
    const profitHarian = revenueBatakoHarian + pendapatanTippingFee - totalOpexHarian;
    const profitTahunan = profitHarian * hariKerjaSetahun;
    
    // CAPEX
    const capexMesin = 350000000; // Mesin cetak & mixer
    const capexInfrastruktur = 250000000; // Bangunan & lahan
    const totalCapex = capexMesin + capexInfrastruktur;

    // ROI / Payback Period
    const paybackPeriodBulan = totalCapex / (profitHarian * 25); // Asumsi 25 hari kerja/bulan

    // Chart Data Cash Flow
    const chartData = [
        { name: 'Pendapatan Batako', nominal: revenueBatakoHarian },
        { name: 'Pendapatan Tailing', nominal: pendapatanTippingFee },
        { name: 'Biaya Semen', nominal: -opexSemen },
        { name: 'Biaya Admixture', nominal: -opexAdmixture },
        { name: 'Biaya Operasional Lain', nominal: -(opexPasir + biayaListrikTenagaKerjaHarian) },
        { name: 'Profit Bersih Harian', nominal: profitHarian }
    ];

    const formatRp = (num: number) => {
        return "Rp " + Math.round(num).toLocaleString('id-ID');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-xl font-bold text-eco-900">
                        <CircleDollarSign className="h-6 w-6 text-eco-600" />
                        Analisis Tekno-Ekonomi (TEA)
                    </h3>
                    <p className="text-sm text-eco-600">Estimasi CAPEX, OPEX, dan Profitabilitas pabrik Eco-Brick berdasarkan data simulasi harian.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard icon={<Wallet />} label="Profit Tahunan Bersih" value={formatRp(profitTahunan)} color="text-green-700" bg="bg-green-100" />
                <MetricCard icon={<TrendingUp />} label="Payback Period (PBP)" value={`${paybackPeriodBulan.toFixed(1)} Bulan`} color="text-blue-700" bg="bg-blue-100" />
                <MetricCard icon={<Coins />} label="Harga Jual Batako" value={`${formatRp(hargaJualBatako)} / pcs`} color="text-amber-700" bg="bg-amber-100" />
                <MetricCard icon={<CircleDollarSign />} label="Modal Awal (CAPEX)" value={formatRp(totalCapex)} color="text-purple-700" bg="bg-purple-100" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Tabel Rincian */}
                <div className="rounded-xl border border-eco-200 bg-white p-5 shadow-sm">
                    <h4 className="mb-4 font-bold text-eco-800">Rincian Cash Flow Harian</h4>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-eco-50 text-eco-600">
                            <tr>
                                <th className="px-4 py-2">Komponen</th>
                                <th className="px-4 py-2 text-right">Debit / Kredit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-eco-100">
                            <tr>
                                <td className="px-4 py-3 font-medium">Penjualan Batako ({totalBricksDaily.toLocaleString('id-ID')} pcs)</td>
                                <td className="px-4 py-3 text-right font-mono text-green-600 font-bold">{formatRp(revenueBatakoHarian)}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-medium">Tipping Fee Limbah Tailing</td>
                                <td className="px-4 py-3 text-right font-mono text-green-600 font-bold">{formatRp(pendapatanTippingFee)}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-medium">Biaya Semen ({cementKg.toLocaleString('id-ID')} kg)</td>
                                <td className="px-4 py-3 text-right font-mono text-red-500">{formatRp(-opexSemen)}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-medium">Biaya Pasir ({sandKg.toLocaleString('id-ID')} kg)</td>
                                <td className="px-4 py-3 text-right font-mono text-red-500">{formatRp(-opexPasir)}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-medium">Biaya Eco-Admixture ({admixtureKg.toLocaleString('id-ID')} kg)</td>
                                <td className="px-4 py-3 text-right font-mono text-red-500">{formatRp(-opexAdmixture)}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-medium">Operasional & Tenaga Kerja</td>
                                <td className="px-4 py-3 text-right font-mono text-red-500">{formatRp(-biayaListrikTenagaKerjaHarian)}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="bg-eco-50 font-bold">
                                <td className="px-4 py-3 text-eco-900">PROFIT BERSIH HARIAN</td>
                                <td className={`px-4 py-3 text-right font-mono text-lg ${profitHarian >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                    {formatRp(profitHarian)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Grafik Waterfall Cash Flow */}
                <div className="rounded-xl border border-eco-200 bg-white p-5 shadow-sm">
                    <h4 className="mb-4 font-bold text-eco-800">Distribusi Cash Flow (Rp)</h4>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" tickFormatter={(val) => `Rp${val/1000}k`} />
                                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11 }} />
                                <Tooltip formatter={(value: any) => formatRp(Number(value))} cursor={{ fill: '#f0fdf4' }} />
                                <Bar dataKey="nominal">
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.nominal > 0 ? '#22c55e' : '#ef4444'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ icon, label, value, color, bg }: { icon: any, label: string, value: string, color: string, bg: string }) {
    return (
        <div className="rounded-xl border border-eco-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${bg} ${color}`}>
                {icon}
            </div>
            <p className="text-xs font-medium text-eco-600">{label}</p>
            <p className={`mt-1 text-xl font-bold font-mono ${color}`}>{value}</p>
        </div>
    );
}
