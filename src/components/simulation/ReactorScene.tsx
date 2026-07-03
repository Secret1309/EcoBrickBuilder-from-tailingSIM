"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useProgress, PerspectiveCamera, Environment, Text, Sparkles, Billboard, RoundedBox, Edges } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useSimulationStore } from "@/lib/store";

// ========== LOADER ==========
function Loader() {
    const { progress } = useProgress();
    return (
        <Html center zIndexRange={[100, 0]}>
            <div className="flex w-56 flex-col items-center justify-center rounded-xl border border-eco-400/20 bg-eco-900/90 p-5 shadow-xl backdrop-blur-md">
                <div className="mb-2 text-sm font-bold text-eco-200">Loading 3D Scene...</div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-eco-800">
                    <motion.div
                        className="h-full rounded-full bg-eco-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                </div>
                <div className="mt-1 text-xs text-eco-400">{progress.toFixed(0)}%</div>
            </div>
        </Html>
    );
}

// ========== SLURRY PARTICLES ==========
function SlurryParticles({ active }: { active: boolean }) {
    const particlesRef = useRef<THREE.Points>(null);
    const count = 120;

    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * 1.4;
            pos[i * 3] = Math.cos(angle) * r;
            pos[i * 3 + 1] = 3.0 + Math.random() * 0.5;
            pos[i * 3 + 2] = Math.sin(angle) * r;
            vel[i * 3] = (Math.random() - 0.5) * 0.04;
            vel[i * 3 + 1] = -(0.015 + Math.random() * 0.035);
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
        }
        return [pos, vel];
    }, []);

    const positionRef = useRef(positions.slice());

    useFrame(() => {
        if (!particlesRef.current || !active) return;
        const attr = particlesRef.current.geometry.attributes.position;
        const arr = attr.array as Float32Array;
        for (let i = 0; i < count; i++) {
            arr[i * 3] += velocities[i * 3];
            arr[i * 3 + 1] += velocities[i * 3 + 1];
            arr[i * 3 + 2] += velocities[i * 3 + 2];
            if (arr[i * 3 + 1] < -0.2) {
                const angle = Math.random() * Math.PI * 2;
                const r = Math.random() * 1.4;
                arr[i * 3] = Math.cos(angle) * r;
                arr[i * 3 + 1] = 3.0 + Math.random() * 0.5;
                arr[i * 3 + 2] = Math.sin(angle) * r;
            }
        }
        attr.needsUpdate = true;
    });

    if (!active) return null;

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.10}
                color="#b45309"
                opacity={0.82}
                transparent
                sizeAttenuation
            />
        </points>
    );
}

// ========== MIXER ==========
function Mixer({ visible, showLabels }: { visible: boolean; showLabels: boolean }) {
    const bladeRef = useRef<THREE.Group>(null);
    const phase = useSimulationStore((s) => s.simulationPhase);
    const isMixing = phase === "mixing";

    const spring = useSpring({
        scale: visible ? 1 : 0,
        config: { tension: 100, friction: 18 },
    });

    useFrame(({ clock }) => {
        if (!bladeRef.current) return;
        bladeRef.current.rotation.y = clock.getElapsedTime() * (isMixing ? 8 : 1.2);
    });

    return (
        <animated.group scale={spring.scale} position={[0, 0, 0]}>
            {/* Support frame / base platform */}
            <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[4.5, 0.18, 3.2]} />
                <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.4} />
            </mesh>
            {/* Legs */}
            {([[-1.6, 0, -1.2], [1.6, 0, -1.2], [-1.6, 0, 1.2], [1.6, 0, 1.2]] as [number, number, number][]).map((pos, i) => (
                <mesh key={i} position={pos}>
                    <cylinderGeometry args={[0.10, 0.10, 0.55, 8]} />
                    <meshStandardMaterial color="#1f2937" metalness={0.8} />
                </mesh>
            ))}

            {/* Drum body */}
            <mesh position={[0, 1.7, 0]}>
                <cylinderGeometry args={[1.85, 1.55, 3.1, 32, 1, true]} />
                <meshStandardMaterial color="#4b5563" metalness={0.72} roughness={0.28} side={THREE.FrontSide} />
            </mesh>
            {/* Drum bottom cap */}
            <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[1.55, 1.55, 0.08, 32]} />
                <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Drum top rim */}
            <mesh position={[0, 3.26, 0]}>
                <cylinderGeometry args={[1.95, 1.95, 0.16, 32]} />
                <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Slurry fill */}
            <mesh position={[0, 1.0, 0]}>
                <cylinderGeometry args={[1.50, 1.48, 1.65, 32]} />
                <meshStandardMaterial
                    color={isMixing ? "#92400e" : "#78350f"}
                    roughness={0.95}
                    metalness={0.0}
                    transparent
                    opacity={0.88}
                />
            </mesh>
            {/* Slurry surface */}
            <mesh position={[0, 1.83, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.50, 32]} />
                <meshStandardMaterial
                    color={isMixing ? "#b45309" : "#92400e"}
                    roughness={1}
                    metalness={0}
                />
            </mesh>

            {/* Motor housing */}
            <mesh position={[0, 3.9, 0]}>
                <cylinderGeometry args={[0.48, 0.48, 1.05, 16]} />
                <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Motor cooling fins */}
            {[0, 1, 2, 3].map((i) => (
                <mesh key={i} position={[0, 3.9, 0]} rotation={[0, (Math.PI / 4) * i, 0]}>
                    <boxGeometry args={[1.05, 0.9, 0.07]} />
                    <meshStandardMaterial color="#111827" metalness={0.85} roughness={0.15} />
                </mesh>
            ))}
            {/* Drive shaft */}
            <mesh position={[0, 2.4, 0]}>
                <cylinderGeometry args={[0.10, 0.10, 2.5, 12]} />
                <meshStandardMaterial color="#15803d" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Rotating blades */}
            <group ref={bladeRef} position={[0, 1.4, 0]}>
                {[0, 1, 2, 3].map((i) => (
                    <group key={i} rotation={[0, (Math.PI / 2) * i, 0]}>
                        <mesh position={[0.75, 0, 0]} rotation={[0, 0, -0.15]}>
                            <boxGeometry args={[1.45, 0.09, 0.18]} />
                            <meshStandardMaterial color="#15803d" metalness={0.55} roughness={0.38} />
                        </mesh>
                        <mesh position={[1.50, -0.15, 0]}>
                            <boxGeometry args={[0.22, 0.22, 0.18]} />
                            <meshStandardMaterial color="#166534" metalness={0.6} roughness={0.3} />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Outlet pipe */}
            <mesh position={[1.65, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.22, 0.22, 0.6, 12]} />
                <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Outlet valve */}
            <mesh position={[2.05, 0.6, 0]}>
                <boxGeometry args={[0.32, 0.40, 0.40]} />
                <meshStandardMaterial color="#15803d" metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Mixer Label — shown in 3D above mixer */}
            {showLabels && visible && (
                <Html position={[0, 5.5, 0]} center distanceFactor={14} zIndexRange={[50, 0]}>
                    <div className="pointer-events-none select-none rounded-lg border border-eco-500/30 bg-eco-900/80 px-3 py-2 text-center shadow-lg backdrop-blur-sm">
                        <div className="text-[10px] font-bold text-eco-300">
                            🏭 Industrial Paddle Mixer
                        </div>
                        <div className="text-xs font-bold text-eco-400 mt-0.5">
                            {isMixing ? "⚡ MIXING SLURRY..." : "🔧 READY"}
                        </div>
                        {isMixing && (
                            <div className="text-[9px] text-eco-500 mt-0.5">Tailing HPAL + Semen + Air</div>
                        )}
                    </div>
                </Html>
            )}

            {/* Slurry particles when mixing */}
            <SlurryParticles active={isMixing} />

            {/* Sparkles when mixing */}
            {isMixing && (
                <Sparkles
                    count={40}
                    scale={[3.8, 4.5, 3.8]}
                    size={2.5}
                    speed={2.5}
                    color="#4ade80"
                    position={[0, 2.2, 0]}
                />
            )}
        </animated.group>
    );
}

// ========== SUBSTANCE COLORS ==========
const SUBSTANCE_COLORS = [
    { color: "#8b7355", name: "Tailing HPAL Nikel (Filler Utama)" },
    { color: "#a0a0a0", name: "Semen Portland (Perekat Hidrasi)" },
    { color: "#c4b896", name: "Ca(OH)₂ Kapur (Aktivator Alkalis)" },
    { color: "#6b8e6b", name: "Geopolimer Gel C-S-H (Matriks Kuat)" },
    { color: "#b0785a", name: "Pasir Silika (Agregat Halus)" },
    { color: "#7a9cbc", name: "Gipsum CaSO₄ (Byproduct Enkapsulasi)" },
];

function InteriorParticles() {
    const particles = useMemo(() => {
        const result: { pos: [number, number, number]; size: number; colorIdx: number }[] = [];
        const count = 260;
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 4.7;
            const y = (Math.random() - 0.5) * 1.15;
            const z = (Math.random() - 0.5) * 2.3;

            const inLeftHole = Math.abs(x - (-1.45)) < 0.75 && Math.abs(z) < 0.55;
            const inRightHole = Math.abs(x - 1.45) < 0.75 && Math.abs(z) < 0.55;
            if (inLeftHole || inRightHole) continue;

            const size = 0.035 + Math.random() * 0.045;
            const colorIdx = Math.floor(Math.random() * SUBSTANCE_COLORS.length);
            result.push({ pos: [x, y, z], size, colorIdx });
        }
        return result;
    }, []);

    return (
        <group>
            {particles.map((p, i) => (
                <mesh key={i} position={p.pos}>
                    <sphereGeometry args={[p.size, 8, 8]} />
                    <meshStandardMaterial
                        color={SUBSTANCE_COLORS[p.colorIdx].color}
                        roughness={0.75}
                        metalness={0.1}
                    />
                </mesh>
            ))}
        </group>
    );
}

// ========== ECO-BRICK (CLEAN — labels removed from 3D, moved to overlay) ==========
function EcoBrick({ visible, showLabels, showCrossSection, brickType }: { visible: boolean; showLabels: boolean; showCrossSection: boolean; brickType: "hollow" | "solid" }) {
    const brickRef = useRef<THREE.Group>(null);
    const result = useSimulationStore((s) => s.ecoBrickResult);

    const spring = useSpring({
        scale: visible ? 1 : 0,
        config: { tension: 80, friction: 14 },
    });

    useFrame(({ clock }) => {
        if (!brickRef.current || !visible) return;
        brickRef.current.rotation.y = clock.getElapsedTime() * 0.28;
    });

    // SNI 03-0349-1989: 40 × 20 × 10 cm
    const W = 5.0;   // 40 cm
    const H = 2.5;   // 20 cm
    const D = 1.25;  // 10 cm

    const strength = result?.compressiveStrengthMPa ?? 10;
    const hue = 120 + Math.min(strength * 0.5, 20);
    const lightness = 35 + Math.min(strength * 0.55, 20);
    const saturation = Math.max(0, 10 - Math.max(0, strength - 20) * 0.5);
    const brickColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const isSNI = result?.isSNICompliant ?? false;

    const holeW = 1.3;
    const holeD = 0.90;

    return (
        <animated.group scale={spring.scale} position={[0, 0, 0]}>
            <group ref={brickRef} position={[0, 1.5, 0]}>
                {/* Main brick body */}
                {!showCrossSection ? (
                    <RoundedBox args={[W, D, H]} radius={0.08} smoothness={4} castShadow receiveShadow>
                        <meshPhysicalMaterial
                            color={brickColor}
                            roughness={0.93}
                            metalness={0.05}
                            clearcoat={0.02}
                        />
                    </RoundedBox>
                ) : (
                    <group>
                        {/* Wireframe outline */}
                        <mesh>
                            <boxGeometry args={[W, D, H]} />
                            <meshBasicMaterial visible={false} />
                            <Edges threshold={15} color="#6b7280" lineWidth={1} />
                        </mesh>
                        {/* Semi-transparent shell — DoubleSide so interior shows */}
                        <mesh>
                            <boxGeometry args={[W, D, H]} />
                            <meshPhysicalMaterial
                                color={brickColor}
                                transparent
                                opacity={0.12}
                                roughness={0.9}
                                metalness={0.0}
                                side={THREE.DoubleSide}
                                depthWrite={false}
                            />
                        </mesh>
                        {/* Interior micro-particles */}
                        <InteriorParticles />
                    </group>
                )}

                {/* Hollow holes — hidden in cross-section mode OR if brickType is solid */}
                {!showCrossSection && brickType === "hollow" && (
                    <>
                        {/* Left hole */}
                        <mesh position={[-1.45, 0, 0]}>
                            <boxGeometry args={[holeW, D * 1.02, holeD]} />
                            <meshStandardMaterial color="#111827" roughness={1} metalness={0} />
                        </mesh>
                        {/* Right hole */}
                        <mesh position={[1.45, 0, 0]}>
                            <boxGeometry args={[holeW, D * 1.02, holeD]} />
                            <meshStandardMaterial color="#111827" roughness={1} metalness={0} />
                        </mesh>
                    </>
                )}

                {/* Top face texture groove — HIDDEN in cross-section so top is open */}
                {!showCrossSection && (
                    <mesh position={[0, D / 2 + 0.001, 0]}>
                        <boxGeometry args={[W * 0.98, 0.005, H * 0.96]} />
                        <meshStandardMaterial color={brickColor} roughness={1} metalness={0} />
                    </mesh>
                )}

                {/* "ECO-BRICK READY!" Billboard — stays in 3D, always faces camera */}
                {showLabels && visible && (
                    <Billboard position={[0, D / 2 + 2.2, 0]}>
                        <Text
                            fontSize={0.45}
                            color={isSNI ? "#22c55e" : "#ef4444"}
                            anchorX="center"
                            anchorY="middle"
                            outlineWidth={0.02}
                            outlineColor="#000000"
                        >
                            {isSNI ? "✅ ECO-BRICK READY!" : "⚠ BELOW SNI STANDARD"}
                        </Text>
                    </Billboard>
                )}

                {/* Green sparkles */}
                <Sparkles
                    count={isSNI ? 30 : 10}
                    scale={[7, 4, 5]}
                    size={2}
                    speed={0.5}
                    color={isSNI ? "#86efac" : "#fca5a5"}
                />
            </group>
        </animated.group>
    );
}

// ========== FLOOR ==========
function Floor() {
    return (
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[32, 26]} />
            <meshStandardMaterial color="#f0fdf4" />
        </mesh>
    );
}

// ========== MAIN EXPORT ==========
export function ReactorScene() {
    const phase = useSimulationStore((s) => s.simulationPhase);
    const [showLabels, setShowLabels] = useState(true);
    const [showCrossSection, setShowCrossSection] = useState(false);
    const [brickType, setBrickType] = useState<"hollow" | "solid">("hollow");

    const showMixer = phase === "idle" || phase === "mixing";
    const showBrick = phase === "result";
    const result = useSimulationStore((s) => s.ecoBrickResult);
    const isSNI = result?.isSNICompliant ?? false;

    return (
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-eco-50 to-eco-100">
            {/* Controls — Top Left */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                <button
                    onClick={() => setShowLabels((v) => !v)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm transition-all border ${
                        showLabels
                            ? "bg-eco-700/90 text-white border-eco-500"
                            : "bg-white/90 text-eco-700 border-eco-300"
                    }`}
                    id="toggle-labels-btn"
                >
                    {showLabels ? "🏷️ Labels: ON" : "🏷️ Labels: OFF"}
                </button>
                {showBrick && (
                    <>
                        <button
                            onClick={() => setShowCrossSection((v) => !v)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm transition-all border ${
                                showCrossSection
                                    ? "bg-amber-700/90 text-white border-amber-500 animate-pulse"
                                    : "bg-white/90 text-eco-700 border-eco-300"
                            }`}
                            id="toggle-crosssection-btn"
                        >
                            {showCrossSection ? "🔍 Cross-Section: ON" : "🔍 Cross-Section: OFF"}
                        </button>
                        <button
                            onClick={() => setBrickType((v) => v === "hollow" ? "solid" : "hollow")}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm transition-all border bg-white/90 text-eco-700 border-eco-300`}
                            id="toggle-bricktype-btn"
                        >
                            🧱 Tipe: {brickType === "hollow" ? "Berongga" : "Pejal"}
                        </button>
                    </>
                )}
            </div>

            {/* Cross-Section label — top center */}
            {showCrossSection && showBrick && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="rounded-lg bg-gray-900/85 px-4 py-1.5 text-xs font-bold text-white border border-amber-500/50 backdrop-blur-sm whitespace-nowrap shadow-lg animate-in fade-in duration-300">
                        🔬 Mikro-Struktur Internal Geopolimer Batako
                    </div>
                </div>
            )}

            {/* Phase Badge — Top Right */}
            <div className="absolute top-3 right-3 z-10">
                <div
                    className={`rounded-full px-3 py-1 text-xs font-bold shadow-sm transition-all ${
                        phase === "idle"
                            ? "bg-concrete-400/80 text-white"
                            : phase === "mixing"
                            ? "bg-eco-500 text-white animate-pulse"
                            : phase === "completed"
                            ? "bg-yellow-500 text-white"
                            : "bg-eco-600 text-white"
                    }`}
                >
                    {phase === "idle" && "⏸ Idle"}
                    {phase === "mixing" && "⚡ Mixing Slurry..."}
                    {phase === "completed" && "🔄 Forming Brick..."}
                    {phase === "result" && "✅ Complete"}
                </div>
            </div>

            {/* ── RIGHT PANELS (DIMENSI & SPECS) STACKED PROPERLY ── */}
            {showBrick && showLabels && (
                <div className="absolute top-12 bottom-3 right-3 z-10 flex flex-col justify-end gap-3 pointer-events-none w-[185px]">
                    {/* SNI Status badge & Dimension Panel */}
                    <div className="flex flex-col gap-2 shrink-0">
                        <div className={`rounded-lg px-3 py-2 text-center text-[10px] font-bold shadow-lg border ${
                            isSNI
                                ? "bg-eco-900/90 border-eco-400/50 text-eco-300"
                                : "bg-red-900/90 border-red-400/50 text-red-300"
                        }`}>
                            <div className="text-lg mb-0.5">{isSNI ? "✅" : "⚠️"}</div>
                            <div>Batako {brickType === "hollow" ? "Berongga" : "Pejal"}</div>
                            <div className="text-[9px] opacity-80 mt-0.5">SNI 03-0349-1989</div>
                        </div>

                        <div className="rounded-lg bg-white/95 border border-eco-200 shadow-lg px-3 py-2.5 space-y-2">
                            <div className="text-[9px] font-bold text-eco-700 uppercase tracking-wider text-center border-b border-eco-100 pb-1.5 mb-1.5">
                                📐 Dimensi SNI
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-eco-600 w-3 text-center"><span className="text-[9px]">↔</span></div>
                                <div><div className="text-[8px] text-gray-500">Panjang</div><div className="text-[11px] font-bold text-eco-800">40 cm</div></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-eco-600 w-3 text-center"><span className="text-[9px]">↕</span></div>
                                <div><div className="text-[8px] text-gray-500">Tinggi</div><div className="text-[11px] font-bold text-eco-800">20 cm</div></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-eco-600 w-3 text-center"><span className="text-[9px]">⇔</span></div>
                                <div><div className="text-[8px] text-gray-500">Lebar</div><div className="text-[11px] font-bold text-eco-800">10 cm</div></div>
                            </div>
                            <div className="border-t border-eco-100 pt-1.5">
                                <div className="text-[8px] text-gray-500">Volume Solid</div>
                                <div className="text-[10px] font-semibold text-eco-700">
                                    {brickType === "hollow" ? "6.432 cm³" : "8.000 cm³"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Spec Overlay */}
                    {result && (
                        <div className="shrink-0 rounded-xl border border-eco-500/30 bg-eco-900/90 p-3 shadow-xl backdrop-blur-md">
                            <div className="mb-1.5 border-b border-eco-600/30 pb-1 text-center text-[9px] font-bold uppercase tracking-wider text-eco-400">
                                Spesifikasi Material
                            </div>
                            <div className="space-y-0.5 font-mono text-[10px] text-eco-100">
                                <div className="flex justify-between gap-4"><span>Kuat Tekan</span><span className="font-bold text-eco-300">{result.compressiveStrengthMPa} MPa</span></div>
                                <div className="flex justify-between gap-4"><span>Densitas</span><span className="font-bold text-eco-300">{result.densityKgM3} kg/m³</span></div>
                                <div className="flex justify-between gap-4"><span>Berat</span><span className="font-bold text-eco-300">{result.dimensions.weightKg} kg</span></div>
                                <div className="flex justify-between gap-4"><span>Porositas</span><span className="font-bold text-eco-300">{result.waterAbsorptionPercent}%</span></div>
                                <div className="mt-1 border-t border-eco-700/30 pt-1 text-center text-[9px] text-eco-400">
                                    40 × 20 × 10 cm — SNI
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 3D Canvas */}
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 5, 16]} fov={42} />

                <ambientLight intensity={0.65} />
                <directionalLight position={[5, 10, 5]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
                <pointLight position={[0, 8, 0]} intensity={0.25} color="#4ade80" />
                {showCrossSection && <pointLight position={[0, 2, 3]} intensity={0.6} color="#fef3c7" />}

                <Environment preset="city" />

                <React.Suspense fallback={<Loader />}>
                    <Floor />
                    <Mixer visible={showMixer} showLabels={showLabels} />
                    <EcoBrick visible={showBrick} showLabels={showLabels} showCrossSection={showCrossSection} brickType={brickType} />
                </React.Suspense>

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.1}
                    maxDistance={30}
                    minDistance={5}
                />
            </Canvas>

            {/* Substance Legend (Cross-Section mode) */}
            {showCrossSection && showBrick && (
                <div className="absolute bottom-10 left-3 z-10 pointer-events-auto rounded-xl border border-gray-300/60 bg-white/95 p-3 shadow-xl backdrop-blur-md text-xs max-w-[210px] animate-in slide-in-from-left duration-300">
                    <div className="mb-2 border-b border-gray-200 pb-1 font-bold text-gray-800 flex items-center gap-1.5">
                        <span>🧪 Komposisi Zat Geopolimer</span>
                    </div>
                    <div className="space-y-1">
                        {SUBSTANCE_COLORS.map((s, i) => (
                            <div key={i} className="flex items-center gap-2 text-[9.5px] text-gray-700 font-medium">
                                <span className="block h-2.5 w-2.5 rounded-full shadow-sm flex-shrink-0 border border-black/10" style={{ backgroundColor: s.color }}></span>
                                <span className="truncate">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer hint */}
            <div className="absolute bottom-3 left-3 rounded-lg bg-white/80 p-2 text-[10px] text-eco-700 backdrop-blur-sm pointer-events-none border border-eco-200">
                Left Click: Rotate • Right Click: Pan • Scroll: Zoom
            </div>
        </div>
    );
}
