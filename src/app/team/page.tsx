"use client";

import { Header } from "@/components/layout/Header";
import { ArrowLeft, GraduationCap, MapPin } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";

export default function TeamPage() {
    const researchers = [
        {
            name: "Dzaky Zahy Rabbani",
            role: "Numerical Modelling & Developer",
            uni: "Institut Teknologi Bandung (ITB)",
            major: "Oceanography - FITB",
            img: "/assets/pp_dzaky.jpg"
        },
        {
            name: "Muhammad Ilham Saripul Milah",
            role: "Lead Researcher & Full-Stack Developer",
            uni: "Institut Teknologi Bandung (ITB)",
            major: "Metallurgical Engineering - FTTM",
            img: "/assets/pp_ilham.jpg"
        },
        {
            name: "Gabriela Deangela Sitanggang",
            role: "Chemical Engineering Lead Researcher",
            uni: "Institut Teknologi Bandung (ITB)",
            major: "Chemical Engineering - FTI",
            img: "/assets/pp_dean.jpg"
        },
    ];

    return (
        <div className="min-h-screen bg-eco-50">
            <Header />

            <main className="container mx-auto max-w-6xl px-4 py-12">
                <Link href="/" className="mb-8 inline-flex items-center text-sm font-medium text-eco-500 hover:text-eco-800">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
                </Link>

                <div className="mb-12 text-center">
                    <span className="mb-2 block text-sm font-semibold uppercase tracking-widest text-eco-600">Green Scientific Competition (GSC) 2026</span>
                    <h1 className="text-4xl font-bold text-eco-900">Tim Pengembang Eco-Brick (Think3rs)</h1>
                    <p className="mt-4 text-eco-600">Riset dan pengembangan platform simulasi eco-brick berbasis SDGs untuk kompetisi LKTI GSC 2026.</p>
                </div>

                <div className="flex justify-center">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {researchers.map((res, i) => (
                            <div key={i} className="group w-full max-w-sm overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                                <div className="relative h-72 w-full bg-gray-200">
                                    <Image
                                        src={res.img}
                                        alt={res.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">{res.name}</h3>
                                    <p className="mb-4 text-sm font-medium text-green-700">{res.role}</p>

                                    <div className="space-y-2 text-sm text-gray-500">
                                        <div className="flex items-start gap-2">
                                            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0" />
                                            <span>{res.uni}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 shrink-0" />
                                            <span>{res.major}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logos */}
                <div className="mt-20 flex flex-col items-center justify-center space-y-6">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-eco-500">Supported By</h3>
                    <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-80 transition-all hover:opacity-100">
                        <div className="relative h-20 w-20 lg:h-24 lg:w-24">
                            <Image src="/assets/Logo_ITB.png" alt="ITB" fill className="object-contain" />
                        </div>
                        <div className="relative h-20 w-20 lg:h-24 lg:w-24">
                            <Image src="/assets/Logo_EneRC.png" alt="EneRC" fill className="object-contain" />
                        </div>
                        <div className="relative h-20 w-20 lg:h-24 lg:w-24">
                            <Image src="/assets/Logo_UNNES.png" alt="UNNES" fill className="object-contain" />
                        </div>
                        <div className="relative h-20 w-20 lg:h-24 lg:w-24">
                            <Image src="/assets/Logo_GSC_2026.png" alt="GSC 2026" fill className="object-contain" />
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
