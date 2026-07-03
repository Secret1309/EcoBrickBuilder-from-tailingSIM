
import { Header } from "@/components/layout/Header";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';

// ========== DIAGRAM ALIR PENELITIAN (Gambar 3.1) ==========
function DiagramAlirPenelitian() {
    const steps = [
        { id: "mulai", label: "Mulai", shape: "circle", color: "bg-gray-700 text-white" },
        { id: "studi", label: "Studi literatur\nkarakteristik\ntailing", shape: "rect", color: "bg-white border-2 border-gray-700 text-gray-800" },
        { id: "model", label: "Perumusan\nmodel matematis\nneraca massa", shape: "rect", color: "bg-white border-2 border-gray-700 text-gray-800" },
        { id: "arsitektur", label: "Perancangan\narsitektur web\ndan visualisasi 3D", shape: "rect", color: "bg-white border-2 border-gray-700 text-gray-800" },
        { id: "integrasi", label: "Integrasi metrik\nSDGs berbasis\nLife Cycle Assessment\n(LCA)", shape: "rect", color: "bg-white border-2 border-gray-700 text-gray-800" },
        { id: "selesai", label: "Selesai", shape: "circle", color: "bg-gray-700 text-white" },
    ];

    return (
        <div className="my-6 flex flex-col items-center">
            <div className="w-full overflow-x-auto pb-4">
                <div className="flex min-w-max items-center justify-center gap-0 mx-auto px-4">
                    {steps.map((step, idx) => (
                        <div key={step.id} className="flex items-center">
                            {/* Node */}
                            <div className={`flex items-center justify-center text-center text-xs font-medium leading-snug shadow-sm ${
                                step.shape === "circle"
                                    ? "h-16 w-16 rounded-full " + step.color
                                    : "min-h-[72px] w-28 rounded-sm border px-2 py-2 " + step.color
                            }`}
                                style={{ whiteSpace: "pre-line" }}
                            >
                                {step.label}
                            </div>
                            {/* Arrow */}
                            {idx < steps.length - 1 && (
                                <div className="flex items-center mx-1">
                                    <div className="h-px w-6 bg-gray-700" />
                                    <svg width="10" height="10" viewBox="0 0 10 10" className="text-gray-700 flex-shrink-0">
                                        <polygon points="0,0 10,5 0,10" fill="currentColor" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <p className="mt-4 text-sm text-center text-gray-600 italic">
                <strong>Gambar 3.1</strong> Diagram Alir Penelitian Eco-Brick Simulator sebagai Decision Support System.
            </p>
        </div>
    );
}

// ========== GRAFIK KUAT TEKAN (Gambar 3.2 — Longos 2020) ==========
function GrafikKuatTekan() {
    // Data berdasarkan tren dari Longos dkk. (2020): kuat tekan menurun saat rasio aktivator/prekursor naik
    const dataA = [
        { x: 0.4286, y: 22.5 }, { x: 0.5714, y: 19.8 }, { x: 0.7143, y: 17.2 },
        { x: 0.8571, y: 16.1 }, { x: 1.0, y: 14.8 },
    ];
    const dataB = [
        { x: 50, y: 22.5 }, { x: 60, y: 19.0 }, { x: 70, y: 15.0 },
        { x: 80, y: 14.2 }, { x: 90, y: 10.5 }, { x: 100, y: 7.8 },
    ];
    const dataC = [
        { x: 0.5, y: 22.5 }, { x: 0.8, y: 20.2 }, { x: 1.1, y: 18.1 },
        { x: 1.4, y: 16.5 }, { x: 1.7, y: 15.3 }, { x: 2.0, y: 14.9 },
    ];

    function MiniChart({ data, xLabel, xMin, xMax, xTicks, designPoint }: {
        data: { x: number; y: number }[];
        xLabel: string;
        xMin: number; xMax: number;
        xTicks: number[];
        designPoint: { x: number; y: number };
    }) {
        const W = 160; const H = 120;
        const PAD = { top: 10, right: 10, bottom: 36, left: 38 };
        const iW = W - PAD.left - PAD.right;
        const iH = H - PAD.top - PAD.bottom;
        const yMin = 0; const yMax = 30;

        const toX = (v: number) => PAD.left + ((v - xMin) / (xMax - xMin)) * iW;
        const toY = (v: number) => PAD.top + (1 - (v - yMin) / (yMax - yMin)) * iH;

        const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${toX(d.x)} ${toY(d.y)}`).join(" ");

        // Upper/lower confidence band (approximate)
        const bandUp = data.map((d) => ({ x: d.x, y: Math.min(d.y + 2.2, 29) }));
        const bandDn = data.map((d) => ({ x: d.x, y: Math.max(d.y - 2.8, 1) }));
        const bandPath = [
            ...bandUp.map((d, i) => `${i === 0 ? "M" : "L"} ${toX(d.x)} ${toY(d.y)}`),
            ...bandDn.reverse().map((d, i) => `L ${toX(d.x)} ${toY(d.y)}`),
            "Z"
        ].join(" ");

        return (
            <svg width={W} height={H} className="overflow-visible">
                {/* Y axis labels */}
                {[0, 10, 20, 30].map(v => (
                    <g key={v}>
                        <text x={PAD.left - 5} y={toY(v) + 4} textAnchor="end" fontSize={8} fill="#555">{v}</text>
                        <line x1={PAD.left} y1={toY(v)} x2={PAD.left + iW} y2={toY(v)} stroke="#e5e7eb" strokeWidth={0.5} />
                    </g>
                ))}
                {/* Confidence band */}
                <path d={bandPath} fill="#93c5fd" opacity={0.25} />
                {/* Dashed band borders */}
                <path d={bandUp.map((d, i) => `${i === 0 ? "M" : "L"} ${toX(d.x)} ${toY(d.y)}`).join(" ")} fill="none" stroke="#60a5fa" strokeWidth={1} strokeDasharray="3,2" />
                <path d={bandDn.reverse().map((d, i) => `${i === 0 ? "M" : "L"} ${toX(d.x)} ${toY(d.y)}`).join(" ")} fill="none" stroke="#60a5fa" strokeWidth={1} strokeDasharray="3,2" />
                {/* Main regression line */}
                <path d={linePath} fill="none" stroke="#1f2937" strokeWidth={1.5} />
                {/* Design point (red dot) */}
                <circle cx={toX(designPoint.x)} cy={toY(designPoint.y)} r={4} fill="#dc2626" />
                {/* Axis */}
                <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + iH} stroke="#374151" strokeWidth={1} />
                <line x1={PAD.left} y1={PAD.top + iH} x2={PAD.left + iW} y2={PAD.top + iH} stroke="#374151" strokeWidth={1} />
                {/* X ticks */}
                {xTicks.map(v => (
                    <g key={v}>
                        <line x1={toX(v)} y1={PAD.top + iH} x2={toX(v)} y2={PAD.top + iH + 3} stroke="#374151" strokeWidth={1} />
                        <text x={toX(v)} y={PAD.top + iH + 11} textAnchor="middle" fontSize={7} fill="#555">{v}</text>
                    </g>
                ))}
                {/* X label */}
                <text x={PAD.left + iW / 2} y={H - 2} textAnchor="middle" fontSize={7.5} fill="#374151" fontStyle="italic">{xLabel}</text>
                {/* Y label (rotated) */}
                <text x={10} y={PAD.top + iH / 2} textAnchor="middle" fontSize={7.5} fill="#374151" transform={`rotate(-90, 10, ${PAD.top + iH / 2})`}>Compressive Strength (MPa)</text>
            </svg>
        );
    }

    return (
        <div className="my-6 flex flex-col items-center">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap gap-6 justify-center items-start">
                    <MiniChart data={dataA} xLabel="A: Activator-to-Precursor ratio"
                        xMin={0.4} xMax={1.0} xTicks={[0.4286, 0.5714, 0.7143, 0.8571, 1.0]}
                        designPoint={{ x: 0.4286, y: 22.5 }} />
                    <MiniChart data={dataB} xLabel="B: NMW-CFA Content (% NMW)"
                        xMin={50} xMax={100} xTicks={[50, 60, 70, 80, 90, 100]}
                        designPoint={{ x: 75, y: 15.0 }} />
                    <MiniChart data={dataC} xLabel="C: SH-to-SS ratio"
                        xMin={0.5} xMax={2.0} xTicks={[0.5, 0.8, 1.1, 1.4, 1.7, 2.0]}
                        designPoint={{ x: 0.5, y: 22.5 }} />
                </div>
                <div className="mt-4 border-t border-gray-100 pt-3 flex flex-wrap gap-6 text-xs text-gray-600">
                    <div>
                        <div className="font-bold text-gray-800 mb-1">Design-Expert® Software</div>
                        <div>Factor Coding: Actual</div>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800 mb-1">Compressive Strength (MPa)</div>
                        <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-600 inline-block" /> Design Points</div>
                        <div className="flex items-center gap-1.5"><span className="h-px w-5 border-t-2 border-dashed border-blue-400 inline-block mt-1" /> 95% CI Bands</div>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800 mb-1">Actual Factors</div>
                        <div>A: Activator-to-Precursor ratio = 0.42857</div>
                        <div>B: NMW-CFA Content = 50</div>
                        <div>C: SH-to-SS ratio = 0.5</div>
                    </div>
                </div>
            </div>
            <p className="mt-3 text-sm text-center text-gray-600 italic max-w-3xl">
                <strong>Gambar 3.2</strong> Pengaruh Komposisi Prekursor Nikel Laterit Terhadap Kuat Tekan <em>(Longos dkk., 2020)</em>
            </p>
        </div>
    );
}

// ========== XRD CHART (Gambar 3.3 — Ahmari & Zhang 2013) ==========
function XRDChart() {
    const W = 600; const H = 200;
    const PAD = { top: 12, right: 20, bottom: 30, left: 50 };
    const iW = W - PAD.left - PAD.right;
    const iH = (H - PAD.top - PAD.bottom) / 4;
    const xMin = 10; const xMax = 70;
    const toX = (v: number) => PAD.left + ((v - xMin) / (xMax - xMin)) * iW;

    // Simplified XRD peaks for 4 patterns
    const patterns = [
        {
            label: "After immersion 16/0.5 pH=7",
            color: "#7c3aed",
            peaks: [21, 25.3, 26.7, 27.8, 33.2, 35.8, 40.2, 43, 50.1, 60.5, 67.9],
            intensity: [0.45, 0.7, 0.65, 1.0, 0.5, 0.6, 0.35, 0.4, 0.55, 0.4, 0.42],
        },
        {
            label: "After immersion 16/0.5 pH=4",
            color: "#dc2626",
            peaks: [21, 25.3, 26.7, 27.8, 33.2, 35.8, 40.2, 43, 50.1, 60.5, 67.9],
            intensity: [0.48, 0.72, 0.68, 1.0, 0.52, 0.62, 0.37, 0.41, 0.56, 0.42, 0.44],
        },
        {
            label: "Before Immersion 16/0.5",
            color: "#2563eb",
            peaks: [21, 25.3, 26.7, 27.8, 33.2, 35.8, 40.2, 43, 50.1, 60.5, 67.9],
            intensity: [0.5, 0.75, 0.7, 1.0, 0.55, 0.65, 0.4, 0.43, 0.58, 0.44, 0.46],
        },
        {
            label: "MT powder",
            color: "#1f2937",
            peaks: [20.5, 22.5, 25.1, 25.8, 26.7, 27.5, 28.5, 29.5, 33, 35.5, 36.5, 38, 40, 43, 45, 50, 55, 60, 67.5],
            intensity: [0.3, 0.45, 0.6, 0.7, 0.95, 0.85, 0.65, 0.55, 0.8, 0.6, 0.5, 0.35, 0.3, 0.25, 0.2, 0.7, 0.35, 0.45, 0.55],
        },
    ];

    const lineColors = ["#7c3aed", "#dc2626", "#2563eb", "#1f2937"];
    const xTicks = [10, 20, 30, 40, 50, 60, 70];

    const totalH = PAD.top + iH * 4 + 8 + PAD.bottom;

    return (
        <div className="my-6 flex flex-col items-center">
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm w-full overflow-x-auto">
                <svg width={W} height={totalH} viewBox={`0 0 ${W} ${totalH}`} className="mx-auto">
                    {patterns.map((pat, pi) => {
                        const baseY = PAD.top + pi * iH + pi * 2;
                        const toY = (v: number) => baseY + iH - v * iH * 0.85;

                        // Build waveform path (Gaussian peaks)
                        const pts: string[] = [];
                        for (let x2θ = xMin; x2θ <= xMax; x2θ += 0.15) {
                            let intensity = 0.05;
                            pat.peaks.forEach((pk, ki) => {
                                const sigma = 0.35;
                                intensity += pat.intensity[ki] * Math.exp(-0.5 * Math.pow((x2θ - pk) / sigma, 2));
                            });
                            intensity = Math.min(intensity, 1.0);
                            const px = toX(x2θ);
                            const py = toY(intensity);
                            pts.push(pts.length === 0 ? `M ${px} ${py}` : `L ${px} ${py}`);
                        }

                        return (
                            <g key={pi}>
                                {/* Baseline */}
                                <line x1={PAD.left} y1={baseY + iH} x2={PAD.left + iW} y2={baseY + iH} stroke="#d1d5db" strokeWidth={0.5} strokeDasharray="3,2" />
                                {/* Waveform */}
                                <path d={pts.join(" ")} fill="none" stroke={lineColors[pi]} strokeWidth={1.2} />
                                {/* Label */}
                                <text x={PAD.left + iW + 4} y={baseY + iH / 2 + 4} fontSize={8} fill={lineColors[pi]} fontStyle="italic">{pat.label}</text>
                            </g>
                        );
                    })}
                    {/* X axis */}
                    <line x1={PAD.left} y1={PAD.top + iH * 4 + 6} x2={PAD.left + iW} y2={PAD.top + iH * 4 + 6} stroke="#374151" strokeWidth={1} />
                    {xTicks.map(v => (
                        <g key={v}>
                            <line x1={toX(v)} y1={PAD.top + iH * 4 + 6} x2={toX(v)} y2={PAD.top + iH * 4 + 10} stroke="#374151" strokeWidth={1} />
                            <text x={toX(v)} y={PAD.top + iH * 4 + 20} textAnchor="middle" fontSize={9} fill="#555">{v}</text>
                        </g>
                    ))}
                    <text x={PAD.left + iW / 2} y={totalH - 2} textAnchor="middle" fontSize={10} fill="#374151">2θ</text>
                    {/* Y axis */}
                    <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + iH * 4 + 6} stroke="#374151" strokeWidth={1} />

                    {/* Peak labels for MT powder */}
                    {[
                        { x: 20.5, label: "G" }, { x: 22.5, label: "S" }, { x: 25.1, label: "P" },
                        { x: 25.8, label: "A" }, { x: 26.7, label: "P" }, { x: 28.5, label: "A" },
                        { x: 29.5, label: "R" }, { x: 33, label: "P" }, { x: 36.5, label: "G" },
                        { x: 40, label: "S" }, { x: 43, label: "S" }, { x: 50, label: "S" }, { x: 60, label: "S" }, { x: 67.5, label: "S" },
                    ].map((pk, i) => {
                        const baseY = PAD.top + 3 * iH + 3 * 2;
                        return (
                            <text key={i} x={toX(pk.x)} y={baseY + 10} textAnchor="middle" fontSize={7} fill="#1f2937" fontStyle="italic">{pk.label}</text>
                        );
                    })}
                </svg>
            </div>
            <p className="mt-3 text-sm text-center text-gray-600 italic max-w-3xl">
                <strong>Gambar 3.3</strong> Penyerapan Air pada Batako Geopolimer <em>(Ahmari &amp; Zhang, 2013)</em>
            </p>
        </div>
    );
}

// ========== ARSITEKTUR DSS (Gambar 3.4 — Jadid 2013) ==========
function DiagramDSS() {
    const stages = [
        { label: "Design Stage", info: "Proposed Material Information", team: "Design Team" },
        { label: "Construction Stage", info: "Material Supply Information", team: "Project Management" },
        { label: "Service Stage", info: "Material Evaluation Information", team: "Facility Management" },
    ];

    return (
        <div className="my-6 flex flex-col items-center">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm w-full max-w-3xl overflow-x-auto">
                <div className="flex min-w-max items-stretch gap-0 mx-auto">
                    {/* DSS Circle */}
                    <div className="flex flex-col items-center justify-center mr-3 flex-shrink-0">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-300 border-2 border-orange-400 text-center text-xs font-semibold text-orange-900 shadow-sm leading-snug p-2">
                            Decision<br />Support<br />System
                        </div>
                        <div className="flex items-center mt-1">
                            <svg width="30" height="12"><path d="M 0,6 L 28,6 M 22,2 L 28,6 L 22,10" fill="none" stroke="#16a34a" strokeWidth="2"/></svg>
                        </div>
                    </div>

                    {/* Central Database + Stage Grid */}
                    <div className="flex">
                        {/* Central Database vertical bar */}
                        <div className="flex items-center justify-center w-8 bg-yellow-200 border border-yellow-400 rounded-l-sm mr-0" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
                            <span className="text-[10px] font-bold text-yellow-800 rotate-180 tracking-widest">Central Database</span>
                        </div>
                        {/* Grid */}
                        <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${stages.length}, 140px)` }}>
                            {/* Top arrows */}
                            {stages.map((s, i) => (
                                <div key={i} className="flex justify-center py-2">
                                    <svg width="60" height="16">
                                        <path d="M 30,0 L 30,14 M 24,8 L 30,14 L 36,8" fill="none" stroke="#16a34a" strokeWidth="2"/>
                                    </svg>
                                </div>
                            ))}
                            {/* Stage headers */}
                            {stages.map((s, i) => (
                                <div key={i} className="flex items-center justify-center border border-dashed border-gray-400 bg-green-100 p-2 text-center text-xs font-semibold text-gray-800 mx-0.5 min-h-[44px]">
                                    {s.label}
                                </div>
                            ))}
                            {/* Info row (yellow highlighted) */}
                            {stages.map((s, i) => (
                                <div key={i} className="flex items-center justify-center border border-dashed border-gray-400 bg-red-50 p-2 text-center text-[10px] text-gray-700 mx-0.5 min-h-[48px]">
                                    {s.info}
                                </div>
                            ))}
                            {/* Team row */}
                            {stages.map((s, i) => (
                                <div key={i} className="flex items-center justify-center border border-dashed border-gray-400 bg-green-100 p-2 text-center text-xs font-semibold text-gray-800 mx-0.5 min-h-[44px]">
                                    {s.team}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Yellow horizontal band label */}
                <div className="mt-2 mx-auto max-w-lg">
                    <div className="bg-yellow-100 border border-yellow-300 rounded px-3 py-1 text-center text-[10px] text-yellow-800 font-medium">
                        Central Database — Baris tengah: aliran informasi material antar tahap
                    </div>
                </div>
            </div>
            <p className="mt-3 text-sm text-center text-gray-600 italic max-w-3xl">
                <strong>Gambar 3.4</strong> Arsitektur Web-Based DSS Seleksi Material yang diadaptasi untuk Eco-Brick Simulator <em>(Jadid, 2013)</em>
            </p>
        </div>
    );
}

// ========== LCA STACKED BAR CHART (Gambar 3.5 — Zhang dkk. 2023) ==========
function LCAChart() {
    // Data dari Zhang dkk. (2023): 3 segmen — Raw materials (orange), Manufacturing (blue/hatch), End of life (yellow/dot)
    const categories = [
        "Climate\nchange", "Ozone\ndepletion", "Terrestrial\nacidification", "Human\ntoxicity",
        "Photochemical\noxidant\nformation", "Particulate\nmatter\nformation", "Terrestrial\necotoxicity",
        "Freshwater\necotoxicity", "Marine\necotoxicity", "Water\ndepletion", "Metal\ndepletion", "Fossil\ndepletion",
    ];
    const data = [
        { a: 18, b: 65, c: 17 }, { a: 15, b: 70, c: 15 }, { a: 18, b: 64, c: 18 },
        { a: 16, b: 67, c: 17 }, { a: 19, b: 63, c: 18 }, { a: 17, b: 65, c: 18 },
        { a: 18, b: 66, c: 16 }, { a: 17, b: 67, c: 16 }, { a: 16, b: 69, c: 15 },
        { a: 13, b: 52, c: 35 }, { a: 16, b: 66, c: 18 }, { a: 17, b: 66, c: 17 },
    ];

    const BAR_W = 32;
    const BAR_GAP = 12;
    const CHART_W = categories.length * (BAR_W + BAR_GAP) + 60;
    const CHART_H = 300;
    const PAD = { top: 24, right: 20, bottom: 110, left: 46 };
    const iH = CHART_H - PAD.top - PAD.bottom;
    const toY = (pct: number) => PAD.top + (1 - pct / 100) * iH;

    return (
        <div className="my-6 flex flex-col items-center">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm w-full overflow-x-auto">
                <svg width={CHART_W} height={CHART_H} viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="mx-auto">
                    {/* Legend — top left */}
                    <g transform={`translate(${PAD.left + 4}, 6)`}>
                        <rect x={0} y={0} width={12} height={9} fill="#f97316" opacity={0.9} rx={1}/>
                        <text x={16} y={8.5} fontSize={9} fill="#374151" fontWeight="500">Raw materials</text>
                        <rect x={95} y={0} width={12} height={9} fill="#6b9fd4" opacity={0.85} rx={1}/>
                        <text x={111} y={8.5} fontSize={9} fill="#374151" fontWeight="500">Manufacturing</text>
                        <rect x={195} y={0} width={12} height={9} fill="#fbbf24" opacity={0.85} rx={1}/>
                        <text x={211} y={8.5} fontSize={9} fill="#374151" fontWeight="500">End of life</text>
                    </g>

                    {/* Y gridlines + tick labels */}
                    {[0, 20, 40, 60, 80, 100].map(v => (
                        <g key={v}>
                            <text x={PAD.left - 6} y={toY(v) + 4} textAnchor="end" fontSize={9} fill="#6b7280">{v}%</text>
                            <line x1={PAD.left} y1={toY(v)} x2={CHART_W - PAD.right} y2={toY(v)}
                                stroke={v === 0 ? "#374151" : "#e5e7eb"} strokeWidth={v === 0 ? 1 : 0.7} />
                        </g>
                    ))}
                    {/* Y axis */}
                    <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + iH} stroke="#374151" strokeWidth={1} />

                    {/* Bars */}
                    {data.map((d, i) => {
                        const x = PAD.left + i * (BAR_W + BAR_GAP) + 6;
                        const yA = toY(d.a);
                        const yB = toY(d.a + d.b);
                        const yTop = toY(100);
                        const hA = toY(0) - yA;
                        const hB = yA - yB;
                        const hC = yB - yTop;
                        return (
                            <g key={i}>
                                {/* Segment A — Raw materials (orange) */}
                                <rect x={x} y={yA} width={BAR_W} height={hA} fill="#f97316" opacity={0.9} />
                                {/* Segment B — Manufacturing (blue + hatch) */}
                                <rect x={x} y={yB} width={BAR_W} height={hB} fill="#6b9fd4" opacity={0.88} />
                                {Array.from({ length: Math.ceil(hB / 4.5) }).map((_, hi) => (
                                    <line key={hi} x1={x} y1={yB + hi * 4.5} x2={x + BAR_W} y2={yB + hi * 4.5}
                                        stroke="white" strokeWidth={1} opacity={0.35} />
                                ))}
                                {/* Segment C — End of life (yellow + dots) */}
                                <rect x={x} y={yTop} width={BAR_W} height={hC} fill="#fbbf24" opacity={0.85} />
                                {Array.from({ length: Math.ceil(hC / 5.5) }).map((_, di) =>
                                    Array.from({ length: Math.floor(BAR_W / 7) }).map((_, dj) => (
                                        <circle key={`${di}-${dj}`}
                                            cx={x + 3.5 + dj * 7} cy={yTop + 3 + di * 5.5}
                                            r={1.2} fill="white" opacity={0.55} />
                                    ))
                                )}
                            </g>
                        );
                    })}

                    {/* X axis labels — rotated -55°, enough bottom padding */}
                    {categories.map((cat, i) => {
                        const cx = PAD.left + i * (BAR_W + BAR_GAP) + 6 + BAR_W / 2;
                        const lines = cat.split("\n");
                        return (
                            <g key={i} transform={`translate(${cx}, ${PAD.top + iH + 6})`}>
                                <g transform="rotate(-50)">
                                    {lines.map((ln, li) => (
                                        <text key={li} x={0} y={li * 10}
                                            textAnchor="end" fontSize={8.5} fill="#374151">
                                            {ln}
                                        </text>
                                    ))}
                                </g>
                            </g>
                        );
                    })}
                </svg>
            </div>
            <p className="mt-3 text-sm text-center text-gray-600 italic max-w-3xl">
                <strong>Gambar 3.5</strong> Batasan Sistem LCA Produksi Batako Geopolimer <em>(Zhang dkk., 2023)</em>
            </p>
        </div>
    );
}

// ========== MAIN PAGE ==========
export default function About() {
    return (
        <div className="min-h-screen bg-eco-50">
            <Header />

            <main className="container mx-auto max-w-5xl px-4 py-12">
                <Link href="/" className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-800">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
                </Link>

                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900">BAB 3: Metode Penulisan</h1>
                    <p className="mt-4 text-lg text-eco-600">
                        Pendekatan Research and Development (R&amp;D) yang memadukan rekayasa material geopolimer berbasis tailing HPAL
                        dengan pengembangan perangkat lunak berbasis web — menghasilkan purwarupa <strong>Eco-Brick Simulator</strong> sebagai Decision Support System (DSS).
                    </p>
                </div>

                <div className="space-y-12">

                    {/* 3.1 Kerangka Alur Penelitian */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-eco-100 text-sm font-bold text-eco-700">3.1</span>
                            Kerangka Alur Penelitian
                        </h2>
                        <div className="prose max-w-none text-gray-700 space-y-4">
                            <p>
                                Penelitian ini menggunakan pendekatan <strong>Research and Development (R&amp;D)</strong> yang memadukan rekayasa material geopolimer berbasis
                                tailing High-Pressure Acid Leaching (HPAL) dengan pengembangan perangkat lunak berbasis web. Hasil akhir penelitian berupa purwarupa
                                <strong> Eco-Brick Simulator</strong> (Eco-Brick) sebagai Decision Support System (DSS). Alur penelitian terdiri atas empat tahapan utama:
                            </p>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-6">
                                <div className="rounded-xl bg-eco-50 border border-eco-200 p-5 text-center">
                                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-eco-500 text-white font-bold text-sm">I</div>
                                    <h4 className="font-semibold text-eco-900 mb-2 text-sm">Studi Literatur</h4>
                                    <p className="text-xs text-gray-600">Karakteristik tailing HPAL, geopolimer, dan DSS berbasis web</p>
                                </div>
                                <div className="rounded-xl bg-eco-50 border border-eco-200 p-5 text-center">
                                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-eco-500 text-white font-bold text-sm">II</div>
                                    <h4 className="font-semibold text-eco-900 mb-2 text-sm">Pemodelan Matematis</h4>
                                    <p className="text-xs text-gray-600">Neraca massa, kuat tekan, dan porositas material</p>
                                </div>
                                <div className="rounded-xl bg-eco-50 border border-eco-200 p-5 text-center">
                                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-eco-500 text-white font-bold text-sm">III</div>
                                    <h4 className="font-semibold text-eco-900 mb-2 text-sm">Perancangan DSS</h4>
                                    <p className="text-xs text-gray-600">Arsitektur web Next.js + visualisasi 3D React Three Fiber</p>
                                </div>
                                <div className="rounded-xl bg-eco-50 border border-eco-200 p-5 text-center">
                                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-eco-500 text-white font-bold text-sm">IV</div>
                                    <h4 className="font-semibold text-eco-900 mb-2 text-sm">Analisis LCA &amp; Ekonomi</h4>
                                    <p className="text-xs text-gray-600">Reduksi jejak karbon, profitabilitas, dan dampak SDGs</p>
                                </div>
                            </div>
                        </div>

                        {/* Diagram Alir Penelitian — Gambar 3.1 */}
                        <DiagramAlirPenelitian />
                    </section>

                    {/* 3.2 Pemodelan Matematis */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-eco-100 text-sm font-bold text-eco-700">3.2</span>
                            Pemodelan Matematis &amp; Karakterisasi Material
                        </h2>
                        <p className="mb-6 text-gray-700">
                            Kalkulasi <strong>neraca massa</strong> (diimplementasikan pada skrip <code className="bg-gray-100 px-1 rounded text-sm">massBalance.ts</code>) memproses
                            input pengguna — massa tailing, semen, pasir silika, rasio air, dan eco-admixture — menjadi spesifikasi teknis batako ramah lingkungan (eco-brick).
                        </p>

                        {/* 3.2.1 */}
                        <div className="mb-10">
                            <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-gray-800">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">3.2.1</span>
                                Penentuan Kuat Tekan (Compressive Strength)
                            </h3>
                            <div className="prose max-w-none text-gray-700 space-y-4">
                                <p>
                                    Kuat tekan material disimulasikan berdasarkan studi terkait geopolimer limbah nikel laterit (Longos dkk., 2020).
                                    Proporsi prekursor dan binder sangat memengaruhi kekuatan mekanis. Merujuk Gambar 3.2, substitusi limbah yang berlebih
                                    menurunkan kuat tekan. Komposisi optimal menghasilkan kuat tekan ekuilibrium terbaik <strong>~24 MPa</strong> pada rasio:
                                    Tailing 45–50%, Semen Portland 10–15%, FAS 0,45. Dalam simulasi, kuat tekan teoretis <em>f&apos;c</em> dikalkulasi melalui persamaan berikut:
                                </p>
                                <div className="bg-eco-100/60 p-5 rounded-xl font-mono text-center text-base overflow-x-auto border border-eco-200 my-4">
                                    <em>f&apos;c</em> = k &middot; (m<sub>semen</sub> + m<sub>aditif</sub>) / (m<sub>tailing</sub> + m<sub>pasir</sub>) &minus; &alpha;(FAS)
                                </div>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                                    <li><strong>k</strong> = konstanta reaktivitas binder (dikalibrasi: k ≈ 1,40 untuk semen Portland tipe I)</li>
                                    <li><strong>m</strong> = massa bahan dalam persentase campuran (%)</li>
                                    <li><strong>&alpha;</strong> = koefisien reduksi akibat deviasi FAS dari optimal 0,45 (&alpha; = 22)</li>
                                    <li>Sistem memicu peringatan <span className="text-red-600 font-semibold">&quot;Gagal SNI&quot;</span> jika kuat tekan &lt; 10 MPa (batas SNI 03-0349-1989 Mutu C)</li>
                                </ul>
                            </div>

                            {/* Grafik Kuat Tekan — Gambar 3.2 */}
                            <GrafikKuatTekan />
                        </div>

                        {/* 3.2.2 */}
                        <div className="mb-10">
                            <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-gray-800">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">3.2.2</span>
                                Porositas dan Kepatuhan SNI
                            </h3>
                            <div className="prose max-w-none text-gray-700 space-y-4">
                                <p>
                                    Daya serap air dianalisis berdasarkan studi Ahmari &amp; Zhang (2013). Porositas material cenderung meningkat seiring
                                    tingginya rasio air campuran. Daya serap air (WA) disimulasikan dengan persamaan uji standar:
                                </p>
                                <div className="bg-gray-100 p-5 rounded-xl font-mono text-center text-base overflow-x-auto my-4">
                                    WA = (W<sub>basah</sub> &minus; W<sub>kering</sub>) / W<sub>kering</sub> &times; 100%
                                </div>
                                <p>
                                    Pada komposisi optimal (Tailing 45–50%, Semen 10–15%, FAS 0,45), daya serap air target <strong>≈ 8–12%</strong>,
                                    jauh di bawah batas SNI 25%. Hasil komputasi dievaluasi berdasarkan <strong>standar SNI 03-0349-1989</strong>:
                                </p>
                            </div>

                            <div className="mt-6 overflow-hidden rounded-xl border">
                                <table className="w-full text-sm">
                                    <thead className="bg-eco-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Tingkat Mutu</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Kuat Tekan Min. (MPa)</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Penyerapan Air Maks. (%)</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Penggunaan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr>
                                            <td className="px-4 py-3 text-gray-700 font-medium">Mutu I</td>
                                            <td className="px-4 py-3 font-mono text-gray-900">7,0</td>
                                            <td className="px-4 py-3 font-mono text-gray-900">25</td>
                                            <td className="px-4 py-3 text-gray-600">Terlindung cuaca</td>
                                        </tr>
                                        <tr className="bg-eco-50">
                                            <td className="px-4 py-3 text-eco-800 font-semibold">Batas Simulasi (Optimal)</td>
                                            <td className="px-4 py-3 font-mono text-eco-700 font-bold">&gt; 10,0 (target: 24 MPa)</td>
                                            <td className="px-4 py-3 font-mono text-eco-700 font-bold">&lt; 20 (optimal: 8–12%)</td>
                                            <td className="px-4 py-3 text-eco-700 font-medium">Struktural &amp; Eksterior</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* XRD Chart — Gambar 3.3 */}
                            <XRDChart />
                        </div>
                    </section>

                    {/* 3.3 Arsitektur DSS */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-eco-100 text-sm font-bold text-eco-700">3.3</span>
                            Arsitektur Decision Support System (DSS)
                        </h2>
                        <p className="mb-6 text-gray-700">
                            Eco-Brick Simulator dibangun sebagai DSS untuk meminimalisasi proses <em>trial and error</em> uji material fisik yang mahal dan memakan waktu.
                            Sistem dibangun menggunakan arsitektur <strong>Model-View-Controller (MVC)</strong> dengan tumpukan teknologi modern.
                        </p>

                        {/* 3.3.1 */}
                        <div className="mb-10">
                            <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-gray-800">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">3.3.1</span>
                                Desain Arsitektur Web
                            </h3>
                            <p className="mb-4 text-gray-700">
                                Arsitektur DSS ini mengadaptasi kerangka kerja sistem penunjang keputusan pemilihan material oleh Jadid (2013).
                                Komputasi berjalan secara <em>client-side</em> melalui manajemen state terpusat pada skrip <code className="bg-gray-100 px-1 rounded text-sm">store.ts</code>.
                            </p>

                            <div className="overflow-hidden rounded-xl border">
                                <table className="w-full text-sm">
                                    <thead className="bg-concrete-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Komponen</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Teknologi</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Fungsi Spesifik</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr>
                                            <td className="px-4 py-3 font-medium text-gray-900">Framework</td>
                                            <td className="px-4 py-3 font-mono text-eco-700">Next.js (React)</td>
                                            <td className="px-4 py-3 text-gray-600">Membangun antarmuka (dashboard) simulasi</td>
                                        </tr>
                                        <tr className="bg-eco-50/50">
                                            <td className="px-4 py-3 font-medium text-gray-900">State Manager</td>
                                            <td className="px-4 py-3 font-mono text-eco-700">Zustand</td>
                                            <td className="px-4 py-3 text-gray-600">Menjaga kestabilan data input-output simulasi</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-medium text-gray-900">3D Engine</td>
                                            <td className="px-4 py-3 font-mono text-eco-700">React Three Fiber</td>
                                            <td className="px-4 py-3 text-gray-600">Merender geometri eco-brick dan proses slurry mixer</td>
                                        </tr>
                                        <tr className="bg-eco-50/50">
                                            <td className="px-4 py-3 font-medium text-gray-900">Kalkulator Neraca Massa</td>
                                            <td className="px-4 py-3 font-mono text-eco-700">massBalance.ts</td>
                                            <td className="px-4 py-3 text-gray-600">Komputasi teknis kuat tekan, porositas, densitas</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-medium text-gray-900">Analisis Ekonomi</td>
                                            <td className="px-4 py-3 font-mono text-eco-700">economics.ts</td>
                                            <td className="px-4 py-3 text-gray-600">Kalkulasi profit, LCA, jejak karbon, SDGs</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* DSS Architecture Diagram — Gambar 3.4 */}
                            <DiagramDSS />
                        </div>

                        {/* 3.3.2 */}
                        <div>
                            <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-gray-800">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">3.3.2</span>
                                Visualisasi Material 3D
                            </h3>
                            <div className="prose max-w-none text-gray-700 space-y-4">
                                <p>
                                    Fitur utama DSS ini (pada komponen <code className="bg-gray-100 px-1 rounded text-sm">ReactorScene.tsx</code>) adalah representasi visual 3D.
                                    Menggunakan mesin render <strong>React Three Fiber</strong>, simulasi menampilkan:
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>
                                        <strong>Fase Idle &amp; Mixing:</strong> Mesin pengaduk (mixer drum) dengan animasi rotasi bilah (blade) dan
                                        aliran slurry dari proses pencampuran tailing + semen + air.
                                    </li>
                                    <li>
                                        <strong>Fase Result:</strong> Model <strong>Batako Berongga (Hollow Brick)</strong> 3D yang proporsional
                                        dengan indikator dimensi <span className="font-mono bg-eco-100 px-1 rounded">40 &times; 20 &times; 10 cm</span> sesuai
                                        SNI 03-0349-1989. Warna material berubah dinamis sesuai komposisi dan kuat tekan hasil simulasi.
                                    </li>
                                    <li>
                                        <strong>Interaktivitas:</strong> Rotasi (Left Click), Pan (Right Click), dan Zoom (Scroll) penuh untuk eksplorasi 3D.
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-6 rounded-xl bg-eco-900/5 border border-eco-200 p-5">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🧱</span>
                                    <div>
                                        <h4 className="font-semibold text-eco-900 mb-1">Spesifikasi Model 3D Batako Berongga</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>Panjang: <strong>40 cm</strong> | Tinggi: <strong>20 cm</strong> | Lebar: <strong>10 cm</strong></li>
                                            <li>Lubang rongga: 2 lubang persegi panjang di bagian atas (sesuai SNI)</li>
                                            <li>Warna material: berubah dinamis — abu gelap (lemah) → hijau-abu (SNI-compliant)</li>
                                            <li>Status label: &quot;ECO-BRICK READY!&quot; (hijau) atau &quot;BELOW SNI STANDARD&quot; (merah)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3.4 Modul Analisis Dampak Lingkungan */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-eco-100 text-sm font-bold text-eco-700">3.4</span>
                            Modul Analisis Dampak Lingkungan
                        </h2>
                        <p className="mb-6 text-gray-700">
                            Parameter lingkungan dihitung melalui skrip <code className="bg-gray-100 px-1 rounded text-sm">economics.ts</code> untuk memastikan
                            pemenuhan kriteria infrastruktur hijau dan kontribusi pada Sustainable Development Goals (SDGs).
                        </p>

                        {/* 3.4.1 */}
                        <div className="mb-10">
                            <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-gray-800">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">3.4.1</span>
                                Reduksi Jejak Karbon (Life Cycle Assessment / LCA)
                            </h3>
                            <div className="prose max-w-none text-gray-700 space-y-4">
                                <p>
                                    Perhitungan emisi mengadopsi batasan sistem (<em>system boundary</em>) LCA produksi batako geopolimer
                                    dari studi Zhang dkk. (2023). Reduksi jejak karbon CR dihitung berdasarkan selisih emisi batako semen konvensional
                                    E<sub>konv</sub> dengan eco-brick bersuhu rendah E<sub>eco</sub>:
                                </p>
                                <div className="bg-eco-100/60 p-5 rounded-xl font-mono text-center text-base overflow-x-auto border border-eco-200">
                                    CR = (E<sub>konv</sub> &minus; E<sub>eco</sub>) &times; N<sub>batako</sub>
                                </div>
                                <p className="text-sm text-gray-600">
                                    *(Tailing HPAL diasumsikan memiliki <em>embodied carbon</em> mendekati 0, karena merupakan limbah yang sudah terbentuk
                                    dari proses industri — tidak memerlukan ekstraksi sumber daya baru)*
                                </p>
                            </div>

                            {/* LCA Stacked Bar Chart — Gambar 3.5 */}
                            <LCAChart />
                        </div>

                        {/* 3.4.2 */}
                        <div>
                            <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-gray-800">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">3.4.2</span>
                                Konversi Aplikatif Infrastruktur Hijau
                            </h3>
                            <div className="prose max-w-none text-gray-700 space-y-4">
                                <p>
                                    Untuk menunjukkan aspek aplikatif dan solutif, luaran eco-brick dikonversi ke dimensi fisik infrastruktur (dinding/trotoar)
                                    dengan persamaan berikut:
                                </p>
                                <div className="bg-gray-100 p-5 rounded-xl font-mono text-center text-base overflow-x-auto">
                                    A<sub>infrastruktur</sub> = N<sub>total</sub> / &kappa;
                                </div>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                                    <li><strong>A<sub>infrastruktur</sub></strong>: luas area yang dapat dibangun (m²)</li>
                                    <li><strong>N<sub>total</sub></strong>: total unit batako yang diproduksi</li>
                                    <li><strong>&kappa;</strong>: kebutuhan batako per meter persegi (&asymp; 12,5 unit/m²)</li>
                                </ul>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                <div className="rounded-xl border border-eco-200 bg-eco-50 p-5 text-center">
                                    <div className="text-3xl font-bold text-eco-700">SDG 9</div>
                                    <div className="mt-1 text-sm font-semibold text-eco-900">Infrastruktur &amp; Inovasi</div>
                                    <div className="mt-2 text-xs text-gray-600">Material konstruksi alternatif untuk kawasan industri &amp; permukiman</div>
                                </div>
                                <div className="rounded-xl border border-eco-200 bg-eco-50 p-5 text-center">
                                    <div className="text-3xl font-bold text-eco-700">SDG 11</div>
                                    <div className="mt-1 text-sm font-semibold text-eco-900">Kota Berkelanjutan</div>
                                    <div className="mt-2 text-xs text-gray-600">Paving block &amp; dinding geopolimer untuk kawasan permukiman hijau</div>
                                </div>
                                <div className="rounded-xl border border-eco-200 bg-eco-50 p-5 text-center">
                                    <div className="text-3xl font-bold text-eco-700">SDG 12</div>
                                    <div className="mt-1 text-sm font-semibold text-eco-900">Zero Waste</div>
                                    <div className="mt-2 text-xs text-gray-600">Transformasi limbah tailing dari beban biaya menjadi produk bernilai</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Referensi */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">📚</span>
                            Referensi Ilmiah BAB 3
                        </h2>
                        <div className="space-y-4 text-sm text-gray-700">
                            {/* Ref 3.2.1 */}
                            <div className="flex gap-3">
                                <span className="mt-0.5 flex-shrink-0 rounded bg-eco-100 px-1.5 py-0.5 text-[10px] font-bold text-eco-700">3.2.1</span>
                                <p>
                                    Longos, A., Tigue, A.A., Dollente, I.J., Malenab, R.A., Bernardo-Arugay, I., Hinode, H., Kurniawan, W. and Promentilla, M.A. (2020)
                                    &lsquo;Optimization of the mix formulation of geopolymer using nickel-laterite mine waste and coal fly ash&rsquo;,{" "}
                                    <em>Minerals</em>, 10(12), p. 1144.
                                </p>
                            </div>
                            {/* Ref 3.2.2 */}
                            <div className="flex gap-3">
                                <span className="mt-0.5 flex-shrink-0 rounded bg-eco-100 px-1.5 py-0.5 text-[10px] font-bold text-eco-700">3.2.2</span>
                                <p>
                                    Ahmari, S. and Zhang, L. (2013)
                                    &lsquo;Durability and leaching behavior of mine tailings-based geopolymer bricks&rsquo;,{" "}
                                    <em>Construction and Building Materials</em>, 44, pp. 743&ndash;750.
                                </p>
                            </div>
                            {/* Ref 3.3.1 */}
                            <div className="flex gap-3">
                                <span className="mt-0.5 flex-shrink-0 rounded bg-eco-100 px-1.5 py-0.5 text-[10px] font-bold text-eco-700">3.3.1</span>
                                <p>
                                    Jadid, M.N. (2013)
                                    &lsquo;Development of a web-based decision support system for materials selection in construction engineering&rsquo;,{" "}
                                    <em>International Journal of Civil Engineering and Technology</em>, 4(2), pp. 177&ndash;188.
                                </p>
                            </div>
                            {/* Ref 3.4.1 */}
                            <div className="flex gap-3">
                                <span className="mt-0.5 flex-shrink-0 rounded bg-eco-100 px-1.5 py-0.5 text-[10px] font-bold text-eco-700">3.4.1</span>
                                <p>
                                    Zhang, J., Fernando, S., Law, D.W., Gunasekara, C., Setunge, S., Sandanayake, M. and Zhang, G. (2023)
                                    &lsquo;Life cycle assessment for geopolymer concrete bricks using brown coal fly ash&rsquo;,{" "}
                                    <em>Sustainability</em>, 15(9), p. 7718.
                                </p>
                            </div>
                        </div>
                        <p className="mt-5 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-xs text-gray-500 italic">
                            <strong>Catatan:</strong> Referensi Mubarok, M.Z., Minwal, W.P. and Tanlega, Z. (2026)
                            <em> Handout Kuliah MG-3215 Hidro-elektrometalurgi: Bab VIII Proses Ekstraksi Nikel dari Bijih Laterit dengan Jalur Hidrometalurgi.</em>
                            Bandung: Program Studi Teknik Metalurgi ITB — digunakan pada Bab 1 (Latar Belakang) dan Bab 2 (Landasan Teori).
                        </p>
                    </section>

                </div>
            </main>
        </div>
    );
}
