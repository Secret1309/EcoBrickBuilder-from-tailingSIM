"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Leaf } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full shadow-lg">
            {/* Main Header Bar */}
            <div className="eco-gradient border-b border-eco-600/30">
                <div className="container relative mx-auto flex h-14 items-center justify-between px-3 lg:h-20 lg:px-4">

                    {/* Logos Section - Left */}
                    {/* Mobile (sm): hidden | Tablet (md): 2 logos small | Desktop (lg): 4 logos full size */}
                    <div className="hidden items-center gap-1.5 md:flex md:gap-1.5 lg:gap-2.5">
                        {/* ITB Logo — always visible on md+ */}
                        <div className="relative h-[30px] w-[30px] overflow-hidden rounded-full border border-eco-400/30 bg-white/10 shadow-sm backdrop-blur-sm lg:h-[40px] lg:w-[40px]">
                            <Image
                                src="/assets/Logo_ITB.png"
                                alt="Logo ITB"
                                fill
                                className="object-contain p-0.5"
                            />
                        </div>
                        {/* EneRC Logo — always visible on md+ */}
                        <div className="relative h-[30px] w-[30px] overflow-hidden rounded-full border border-eco-400/30 bg-white/10 shadow-sm backdrop-blur-sm lg:h-[40px] lg:w-[40px]">
                            <Image
                                src="/assets/Logo_EneRC.png"
                                alt="Logo EneRC"
                                fill
                                className="object-contain p-0.5"
                            />
                        </div>
                        {/* UNNES Logo — only on lg+ */}
                        <div className="relative hidden h-[40px] w-[40px] overflow-hidden rounded-full border border-eco-400/30 bg-white/10 shadow-sm backdrop-blur-sm lg:block">
                            <Image
                                src="/assets/Logo_UNNES.png"
                                alt="Logo UNNES"
                                fill
                                className="object-contain p-0.5"
                            />
                        </div>
                        {/* GSC Logo — only on lg+ */}
                        <div className="relative hidden h-[40px] w-[40px] overflow-hidden rounded-full border border-eco-400/30 bg-white/10 shadow-sm backdrop-blur-sm lg:block">
                            <Image
                                src="/assets/Logo_GSC_2026.png"
                                alt="Logo GSC 2026"
                                fill
                                className="object-contain p-0.5"
                            />
                        </div>
                    </div>

                    {/* Center Title */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div>
                                <h1 className="bg-gradient-to-r from-eco-300 via-eco-100 to-eco-400 bg-clip-text text-xl font-extrabold tracking-wider text-transparent sm:text-2xl lg:text-4xl">
                                    ECO-BRICK SIMULATOR
                                </h1>
                            </div>
                        </Link>
                    </div>

                    {/* Right Section - Navigation Menu */}
                    <div className="relative ml-auto flex items-center lg:ml-0">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="rounded-lg p-2 text-eco-300 transition-colors hover:bg-eco-700/50 hover:text-white focus:outline-none"
                            id="header-menu-toggle"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-eco-600/30 bg-eco-900/95 py-2 shadow-2xl backdrop-blur-xl">
                                <Link
                                    href="/simulation"
                                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-eco-100 transition-colors hover:bg-eco-700/50 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    🧪 Simulasi Eco-Brick
                                </Link>
                                <Link
                                    href="/about"
                                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-eco-100 transition-colors hover:bg-eco-700/50 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    📋 Metodologi
                                </Link>
                                <Link
                                    href="/documentation"
                                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-eco-100 transition-colors hover:bg-eco-700/50 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    📚 Dokumentasi
                                </Link>
                                <Link
                                    href="/empowerment"
                                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-eco-100 transition-colors hover:bg-eco-700/50 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    🏘️ Kalkulator BUMDes
                                </Link>
                                <Link
                                    href="/team"
                                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-eco-100 transition-colors hover:bg-eco-700/50 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    👥 Pengembang
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* SDGs Marquee Sub-header - Only show on landing page */}
            {pathname === "/" && (
                <div className="overflow-hidden bg-eco-950/80 py-1">
                    <div className="animate-marquee whitespace-nowrap text-[10px] font-medium text-eco-300/90">
                        🌿 Green Scientific Competition 2026 "Inovasi Generasi Muda dalam Mendorong Transformasi Pembangunan Berbasis SDGs Menuju Indonesia Hijau dan Berkelanjutan" oleh Kelompok Think3rs Institut Teknologi Bandung (ITB) 🌍
                    </div>
                </div>
            )}
        </header>
    );
}
