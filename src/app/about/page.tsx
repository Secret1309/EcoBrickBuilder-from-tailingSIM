
import { Header } from "@/components/layout/Header";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

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

                        <div className="mt-8 flex flex-col items-center">
                            <img src="/assets/gambar3-1.png" alt="Gambar 3.1 Diagram Alir Penelitian" className="max-w-full h-auto rounded-lg shadow-md border bg-white p-2" />
                            <p className="mt-3 text-sm text-center text-gray-500 italic max-w-3xl">
                                Gambar 3.1 Diagram Alir Penelitian Eco-Brick Simulator sebagai Decision Support System.
                            </p>
                        </div>
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
                                    menurunkan kuat tekan. Dalam simulasi, kuat tekan teoretis <em>f&#39;c</em> dikalkulasi melalui persamaan berikut:
                                </p>
                                <div className="bg-eco-100/60 p-5 rounded-xl font-mono text-center text-base overflow-x-auto border border-eco-200 my-4">
                                    <em>f&#39;c</em> = k &middot; (m<sub>semen</sub> + m<sub>aditif</sub>) / (m<sub>tailing</sub> + m<sub>pasir</sub>) &minus; &alpha;(FAS)
                                </div>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                                    <li><strong>k</strong> = konstanta reaktivitas binder (bergantung pada jenis aktivator)</li>
                                    <li><strong>m</strong> = massa bahan dalam persentase campuran (%)</li>
                                    <li><strong>&alpha;</strong> = koefisien reduksi akibat kelebihan Faktor Air Semen (FAS)</li>
                                    <li>Sistem memicu peringatan <span className="text-red-600 font-semibold">"Gagal SNI"</span> jika tailing melebihi 70% atau semen kurang dari 10%</li>
                                </ul>
                            </div>

                            <div className="mt-8 flex flex-col items-center">
                                <img src="/assets/gambar3-2.png" alt="Gambar 3.2" className="max-w-full h-auto rounded-lg shadow-md border bg-white p-2" />
                                <p className="mt-3 text-sm text-center text-gray-500 italic max-w-3xl">
                                    Gambar 3.2 Pengaruh Komposisi Prekursor Nikel Laterit Terhadap Kuat Tekan (Longos dkk., 2020).
                                </p>
                            </div>
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
                                    Hasil komputasi ini dievaluasi secara otomatis berdasarkan <strong>standar SNI 03-0349-1989</strong>:
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
                                            <td className="px-4 py-3 text-eco-800 font-semibold">Batas Simulasi</td>
                                            <td className="px-4 py-3 font-mono text-eco-700 font-bold">&gt; 10,0</td>
                                            <td className="px-4 py-3 font-mono text-eco-700 font-bold">&lt; 20</td>
                                            <td className="px-4 py-3 text-eco-700 font-medium">Struktural &amp; Eksterior</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 flex flex-col items-center">
                                <img src="/assets/gambar3-3.png" alt="Gambar 3.3" className="max-w-full h-auto rounded-lg shadow-md border bg-white p-4" />
                                <p className="mt-3 text-sm text-center text-gray-500 italic max-w-3xl">
                                    Gambar 3.3 Penyerapan Air pada Batako Geopolimer (Ahmari &amp; Zhang, 2013).
                                </p>
                            </div>
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

                            <div className="mt-8 flex flex-col items-center">
                                <img src="/assets/gambar3-4.png" alt="Gambar 3.4 Arsitektur Web-Based DSS" className="max-w-full h-auto rounded-lg shadow-md border bg-white p-4" />
                                <p className="mt-3 text-sm text-center text-gray-500 italic max-w-3xl">
                                    Gambar 3.4 Arsitektur Web-Based DSS Seleksi Material yang diadaptasi untuk Eco-Brick Simulator (Jadid, 2013).
                                </p>
                            </div>
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

                            <div className="mt-8 flex flex-col items-center">
                                <img src="/assets/gambar3-5.png" alt="Gambar 3.5 Batasan Sistem LCA" className="max-w-full h-auto rounded-lg shadow-md border bg-white p-4" />
                                <p className="mt-3 text-sm text-center text-gray-500 italic max-w-3xl">
                                    Gambar 3.5 Batasan Sistem LCA Produksi Batako Geopolimer (Zhang dkk., 2023).
                                </p>
                            </div>
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

                    {/* Referensi paper */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">📚</span>
                            Referensi Ilmiah BAB 3
                        </h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p>
                                <strong>Longos, A., Tigue, A.A., Dollente, I.J. et al.</strong> (2020). Optimization of the mix formulation of geopolymer using nickel-laterite mine waste and coal fly ash. <em>Minerals</em>, 10(12), 1144.
                            </p>
                            <p>
                                <strong>Ahmari, S. &amp; Zhang, L.</strong> (2013). Durability and leaching behavior of mine tailings-based geopolymer bricks. <em>Construction and Building Materials</em>, 44, 743–750.
                            </p>
                            <p>
                                <strong>Jadid, M.N.</strong> (2013). Development of a web-based decision support system for materials selection in construction engineering. <em>International Journal of Civil Engineering and Technology</em>, 4(2), 177–188.
                            </p>
                            <p>
                                <strong>Zhang, J. et al.</strong> (2023). Life cycle assessment for geopolymer concrete bricks using brown coal fly ash. <em>Sustainability</em>, 15(9), 7718.
                            </p>
                            <p>
                                <strong>Mubarok, M.Z., Minwal, W.P. &amp; Tanlega, Z.</strong> (2026). Handout Kuliah MG-3215 Hidro-elektrometalurgi: Proses Ekstraksi Nikel dari Bijih Laterit dengan Jalur Hidrometalurgi. ITB.
                            </p>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}
