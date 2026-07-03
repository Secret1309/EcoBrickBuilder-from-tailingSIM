
import Link from 'next/link';
import { Header } from "@/components/layout/Header";
import { ArrowRight, Leaf, Box, ShieldCheck, Users, Building2, TrendingUp } from "lucide-react";


export default function Home() {
  return (
    <div className="min-h-screen bg-eco-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-eco-900 via-eco-800 to-eco-700 py-20 lg:py-28">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e15_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]"></div>

        <div className="container relative mx-auto px-4 min-h-[60vh] flex flex-col justify-end pb-12 pt-32">
          <div className="max-w-3xl space-y-6 text-left">
            <span className="inline-block rounded-full border border-eco-500/30 bg-eco-500/20 px-5 py-2 text-sm font-semibold text-eco-300 backdrop-blur-sm">
              🌿 Green Scientific Competition (GSC) 2026 LKTI
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl leading-tight">
              Eco-Brick Simulator:{' '}
              <span className="bg-gradient-to-r from-eco-400 to-eco-200 bg-clip-text text-transparent">
                Green Infrastructure
              </span>
            </h2>

            <p className="max-w-2xl text-lg text-eco-200/80 leading-relaxed">
              Platform simulasi web interaktif untuk merancang <strong className="text-eco-300">eco-brick</strong> dari
              limbah tailing industri nikel. Hitung sifat mekanik material, visualisasikan batako 3D secara
              real-time, dan ukur dampak reduksi karbon untuk <strong className="text-eco-300">infrastruktur hijau berkelanjutan</strong> sesuai
              standar SNI 03-0349-1989.
            </p>

            <div className="flex w-full flex-col items-start gap-4 pt-6">
              <Link
                href="/simulation"
                className="group flex w-max items-center justify-center gap-2 rounded-full bg-eco-500 py-4 px-8 text-lg font-bold text-white shadow-lg shadow-eco-500/30 transition-all hover:bg-eco-400 hover:shadow-eco-400/40 hover:scale-[1.02]"
                id="hero-simulate-btn"
              >
                Mulai Simulasi <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-eco-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold text-eco-900 lg:text-3xl">Fitur Utama</h3>
            <p className="mt-2 text-eco-600">Simulasi material, visualisasi 3D, dan analisis SDGs dalam satu platform</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-2xl border border-eco-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-eco-400 hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-eco-100 text-eco-700 transition-colors group-hover:bg-eco-500 group-hover:text-white">
                <Box className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-xl font-bold text-eco-900">Simulasi Material</h4>
              <p className="text-eco-600">Hitung kuat tekan, densitas, dan porositas eco-brick dari campuran tailing, semen, dan pasir silika.</p>
            </div>

            <div className="group rounded-2xl border border-eco-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-eco-400 hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-eco-100 text-eco-700 transition-colors group-hover:bg-eco-500 group-hover:text-white">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </div>
              <h4 className="mb-2 text-xl font-bold text-eco-900">Visualisasi 3D</h4>
              <p className="text-eco-600">Lihat model batako berongga 3D interaktif dengan dimensi SNI, transisi animasi mixer-ke-brick yang memukau.</p>
            </div>

            <div className="group rounded-2xl border border-eco-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-eco-400 hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-eco-100 text-eco-700 transition-colors group-hover:bg-eco-500 group-hover:text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-xl font-bold text-eco-900">Kepatuhan SNI</h4>
              <p className="text-eco-600">Validasi otomatis terhadap SNI 03-0349-1989 dengan grafik perbandingan kuat tekan vs standar minimum.</p>
            </div>

            <div className="group rounded-2xl border border-eco-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-eco-400 hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-eco-100 text-eco-700 transition-colors group-hover:bg-eco-500 group-hover:text-white">
                <Leaf className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-xl font-bold text-eco-900">Dampak SDGs</h4>
              <p className="text-eco-600">Ukur reduksi jejak karbon CO₂e, volume limbah terdaur ulang, dan potensi luas infrastruktur hijau yang terbangun.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BUMDes Integration Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full border border-eco-300 bg-eco-100 px-4 py-1.5 text-sm font-semibold text-eco-700 mb-4">
              🏘️ Pemberdayaan Masyarakat
            </span>
            <h3 className="text-2xl font-bold text-eco-900 lg:text-3xl">
              Strategi Implementasi <span className="text-eco-600">BUMDes</span>
            </h3>
            <p className="mt-3 max-w-2xl mx-auto text-eco-600">
              Eco-Brick Simulator dirancang untuk mendukung <strong>Badan Usaha Milik Desa (BUMDes)</strong>, koperasi,
              dan UMKM lokal di sekitar kawasan industri nikel sebagai agen produksi batako geopolimer berbasis tailing HPAL.
            </p>
          </div>

          {/* BUMDes Value Chain */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
            <div className="relative rounded-2xl border border-eco-200 bg-eco-50 p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-eco-200 text-eco-700">
                <Building2 className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-eco-900">1. Penerimaan Tailing</h4>
              <p className="text-sm text-eco-700">
                BUMDes bermitra dengan kawasan industri nikel untuk menerima tailing HPAL pra-netralisasi
                secara gratis — bahkan mendapat <strong>Tipping Fee</strong> sebagai kompensasi jasa pengelolaan limbah.
              </p>
              <div className="mt-4 rounded-lg bg-white border border-eco-200 px-3 py-2 text-xs text-eco-800 font-mono">
                💰 Tipping Fee: Rp 75.000/ton tailing
              </div>
            </div>

            <div className="relative rounded-2xl border border-eco-200 bg-eco-50 p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-eco-200 text-eco-700">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h4 className="mb-2 text-lg font-bold text-eco-900">2. Produksi Eco-Brick</h4>
              <p className="text-sm text-eco-700">
                Menggunakan formula optimum dari <strong>Eco-Brick Simulator DSS</strong>: tailing 45–50%, semen 10–15%,
                rasio air 0,45. Menghasilkan Batako Berongga (SNI 03-0349-1989) dengan kuat tekan ≈ 24 MPa.
              </p>
              <div className="mt-4 rounded-lg bg-white border border-eco-200 px-3 py-2 text-xs text-eco-800 font-mono">
                🧱 Output: ~24 MPa · Porositas &lt;9%
              </div>
            </div>

            <div className="relative rounded-2xl border border-eco-200 bg-eco-50 p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-eco-200 text-eco-700">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-eco-900">3. Distribusi &amp; Profit</h4>
              <p className="text-sm text-eco-700">
                Batako dipasarkan untuk kebutuhan infrastruktur lokal — perumahan, jalan desa, fasilitas publik.
                Margin profit kompetitif untuk skala produksi BUMDes.
              </p>
              <div className="mt-4 rounded-lg bg-white border border-eco-200 px-3 py-2 text-xs text-eco-800 font-mono">
                📈 Profit: Rp 73–84 juta/hari (skala industrial)
              </div>
            </div>
          </div>

          {/* BUMDes Impact Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-eco-800 to-eco-700 p-8 text-white">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-eco-300" />
                  <h4 className="text-xl font-bold text-white">Dampak Pemberdayaan BUMDes</h4>
                </div>
                <p className="text-eco-200/90 leading-relaxed mb-4">
                  Eco-Brick Simulator hadir sebagai <strong className="text-eco-300">Decision Support System</strong> digital
                  yang memungkinkan operator BUMDes tanpa latar belakang teknik untuk menjalankan formulasi campuran
                  material secara presisi — menghilangkan proses <em>trial and error</em> yang mahal.
                </p>
                <ul className="space-y-2 text-sm text-eco-200/90">
                  <li className="flex items-start gap-2">
                    <span className="text-eco-400 mt-0.5">✓</span>
                    <span>Menyerap tenaga kerja lokal di daerah sekitar industri nikel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-eco-400 mt-0.5">✓</span>
                    <span>Mengurangi ketergantungan material alam (pasir, batu) untuk konstruksi lokal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-eco-400 mt-0.5">✓</span>
                    <span>Mengubah tailing dari <em>pusat beban biaya</em> menjadi <em>sumber nilai tambah ekonomi sirkular</em></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-eco-400 mt-0.5">✓</span>
                    <span>Mendukung SDGs 1 (Tanpa Kemiskinan), SDGs 8 (Pekerjaan Layak), SDGs 11 (Kota Berkelanjutan)</span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 border border-white/20 p-5 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold text-eco-300">Rp 0</div>
                  <div className="mt-1 text-xs text-eco-200">Biaya Bahan Baku Tailing</div>
                  <div className="text-[10px] text-eco-400 mt-0.5">(+ Tipping Fee dari Industri Nikel)</div>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/20 p-5 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold text-eco-300">70%</div>
                  <div className="mt-1 text-xs text-eco-200">Maks. Substitusi Tailing</div>
                  <div className="text-[10px] text-eco-400 mt-0.5">Tetap memenuhi SNI</div>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/20 p-5 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold text-eco-300">24 MPa</div>
                  <div className="mt-1 text-xs text-eco-200">Kuat Tekan Optimal</div>
                  <div className="text-[10px] text-eco-400 mt-0.5">Formula tailing 45-50%</div>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/20 p-5 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold text-eco-300">SDG 8</div>
                  <div className="mt-1 text-xs text-eco-200">Pekerjaan Layak</div>
                  <div className="text-[10px] text-eco-400 mt-0.5">Via pemberdayaan BUMDes</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/simulation"
              className="group inline-flex items-center gap-2 rounded-full bg-eco-600 py-3 px-7 text-base font-bold text-white shadow-md transition-all hover:bg-eco-500 hover:scale-[1.02]"
              id="bumdes-simulate-btn"
            >
              Coba Kalkulator BUMDes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="eco-gradient py-6 text-center text-sm text-eco-300/70">
        <p>© 2026 Eco-Brick Simulator · Tim Think3rs · Institut Teknologi Bandung (ITB) × Green Scientific Competition 2026</p>
        <p className="mt-1 text-eco-400/60 text-xs">
          Kata Kunci: BUMDes · Ekonomi Sirkular · Nikel Laterit · Tailing HPAL · Infrastruktur Hijau · Geopolimer · Zero Waste
        </p>
      </footer>
    </div>
  );
}


