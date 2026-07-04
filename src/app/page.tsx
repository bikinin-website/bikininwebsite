"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import {
  Percent, Palette, Database, Zap, CreditCard, MessageCircle,
  TrendingUp, Shield, Clock, Star, ArrowRight, Check,
  Store, Award, PhoneCall, BarChart3, Package, Globe, Headphones,
  ChevronRight, MapPin
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.6, delay },
});

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return { count, ref };
}

function StatItem({ value, suffix, label, icon }: {
  value: number; suffix: string; label: string; icon: React.ReactNode;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <motion.div ref={ref} className="text-center" {...fadeUp()}>
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-4xl font-black text-white mb-1">{count}{suffix}</p>
      <p className="text-indigo-300 text-sm">{label}</p>
    </motion.div>
  );
}

const avatars = ["V", "R", "B", "M", "A"];
const heroWords = ["Toko", "Kamu,", "Aturan", "Kamu."];

export default function Home() {
  const [billingType, setBillingType] = useState<"onetime" | "subscription">("onetime");
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const dotY = useTransform(heroProgress, [0, 1], [0, -150]);
  const blob1Y = useTransform(heroProgress, [0, 1], [0, -80]);
  const blob2Y = useTransform(heroProgress, [0, 1], [0, -120]);
  const textY = useTransform(heroProgress, [0, 1], [0, -60]);
  const mockupY = useTransform(heroProgress, [0, 1], [0, 80]);

  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes floatAnim {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-card { animation: floatAnim 4s ease-in-out infinite; }
      `}</style>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF5F4B] origin-left z-[100] shadow-[0_0_8px_#FF5F4B]"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-[#F5F0E8]/80 border-b border-black/5">
        <a href="#" className="text-[#3B3F9E] font-black text-xl tracking-tight">bikininwebsite.id</a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <a href="#kenapa" className="hover:text-[#3B3F9E] transition-colors">Fitur</a>
          <a href="#cara-kerja" className="hover:text-[#3B3F9E] transition-colors">Cara Kerja</a>
          <a href="#harga" className="hover:text-[#3B3F9E] transition-colors">Harga</a>
          <a href="#testimoni" className="hover:text-[#3B3F9E] transition-colors">Testimoni</a>
        </div>
        <button onClick={() => document.getElementById('harga')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#FF5F4B] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#e54e3a] hover:shadow-lg hover:shadow-[#FF5F4B]/30 hover:-translate-y-0.5 transition-all">
          Mulai Sekarang
        </button>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[calc(100vh-64px)] flex items-center px-8 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, #3B3F9E22 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            y: dotY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8] via-[#F5F0E8]/90 to-transparent pointer-events-none" />
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[#3B3F9E]/5 blur-3xl pointer-events-none"
          style={{ y: blob1Y }}
        />
        <motion.div
          className="absolute bottom-20 right-40 w-64 h-64 rounded-full bg-[#FF5F4B]/5 blur-3xl pointer-events-none"
          style={{ y: blob2Y }}
        />

        <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ y: textY }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-[#3B3F9E]/15 rounded-full px-4 py-2 text-sm text-[#3B3F9E] font-medium mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF5F4B] animate-pulse" />
              Platform toko online untuk penjual Indonesia
            </div>
            <h1 className="text-[5rem] font-black text-[#3B3F9E] leading-[0.9] mb-8 tracking-tight overflow-hidden">
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  className={`block ${i >= 2 ? "text-[#FF5F4B]" : ""}`}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="text-xl text-gray-500 max-w-md mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Udah berapa lama hasilmu dipotong komisi? Saatnya punya toko sendiri — yang beneran punya kamu.
            </motion.p>
            <motion.div
              className="flex items-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <button onClick={() => document.getElementById('harga')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#FF5F4B] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#e54e3a] hover:shadow-xl hover:shadow-[#FF5F4B]/25 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                Mulai Sekarang <ArrowRight size={16} />
              </button>
            </motion.div>
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex -space-x-2">
                {avatars.map((letter, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-[#3B3F9E] border-2 border-[#F5F0E8] flex items-center justify-center text-xs font-bold text-white shadow-sm">{letter}</div>
                ))}
              </div>
              <p className="text-sm text-gray-500"><span className="font-bold text-gray-700">500+</span> penjual sudah punya toko sendiri</p>
            </motion.div>
          </motion.div>

          {/* Right - mockup without conflicting transforms */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            style={{ y: mockupY }}
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 ring-1 ring-black/5 float-card">
              <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-100">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 bg-white rounded-full px-3 py-1 text-xs text-gray-400 ml-2 border border-gray-100 flex items-center gap-1">
                  <Shield size={10} className="text-green-500" /> tokoku.bikininwebsite.id
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-bold text-[#3B3F9E] text-sm flex items-center gap-1.5">
                    <Store size={14} /> KopiGayo
                  </span>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span>Katalog</span><span>Tentang</span><span>Kontak</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-32 h-32 bg-amber-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-amber-100">
                    <Package size={40} className="text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-sm mb-1">Kopi Arabica Premium</p>
                    <p className="text-[#FF5F4B] font-black text-xl mb-1">Rp 85.000</p>
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">100% biji kopi arabica pilihan dari petani lokal Gayo.</p>
                    <button className="bg-[#FF5F4B] text-white text-xs px-4 py-2.5 rounded-full font-bold w-full">Tambah ke Keranjang</button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Star size={10} className="text-yellow-400 fill-yellow-400" /> 4.9 (128 ulasan)</span>
                  <span className="flex items-center gap-1"><Zap size={10} /> Gratis ongkir min. 100rb</span>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-800">+Rp 2.400.000</p>
                <p className="text-xs text-gray-400">pendapatan hari ini</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 bg-[#3B3F9E] text-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <Percent size={18} className="text-indigo-300" />
              <div>
                <p className="text-xl font-black leading-none">0%</p>
                <p className="text-xs text-indigo-300">komisi platform</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-[#3B3F9E] py-14 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value={500} suffix="+" label="Toko aktif" icon={<Store size={20} className="text-indigo-400" />} />
          <StatItem value={0} suffix="%" label="Biaya komisi" icon={<Percent size={20} className="text-indigo-400" />} />
          <StatItem value={7} suffix=" hari" label="Rata-rata waktu live" icon={<Clock size={20} className="text-indigo-400" />} />
          <StatItem value={98} suffix="%" label="Klien puas" icon={<Award size={20} className="text-indigo-400" />} />
        </div>
      </div>
      {/* Problem Framing */}
      <section className="py-28 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" {...fadeUp()}>
            <p className="text-[#FF5F4B] text-xs uppercase tracking-[0.2em] font-bold mb-4">Masalahnya</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#3B3F9E] mb-5 leading-tight">
              Jualan di marketplace itu capek.<br />Kamu yang kerja, platform yang untung.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Kamu bukan yang pertama ngerasain ini. Dan ini bukan salah kamu.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "Komisi terus jalan, untungmu tipis.", desc: "Tiap transaksi, platform ambil bagian. Makin besar omzetmu, makin besar yang dipotong. Kerja keras kamu, hasilnya dibagi duluan." },
              { num: "02", title: "Pembeli kamu, tapi datanya bukan milikmu.", desc: "Sudah beli di tokomu, tapi kamu nggak tahu siapa mereka. Nggak bisa dihubungi lagi. Nggak bisa diajak balik. Data itu disimpan platform." },
              { num: "03", title: "Brand kamu nggak keliatan.", desc: "Yang keliatan cuma nama marketplace. Susah payah bangun reputasi, tapi yang diingat pembeli bukan tokomu — tapi platformnya." },
              { num: "04", title: "Algoritma berubah, toko kamu tenggelam.", desc: "Tiba-tiba traffic turun. Tiba-tiba produkmu nggak muncul. Kamu nggak salah apa-apa — tapi aturan mainnya berubah tanpa pemberitahuan." },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="flex gap-6 p-8 rounded-2xl border border-gray-100 hover:border-[#3B3F9E]/20 hover:shadow-lg transition-all bg-[#F5F0E8]/50 group"
                {...fadeUp(i * 0.1)}
              >
                <span className="text-4xl font-black text-[#3B3F9E]/10 group-hover:text-[#3B3F9E]/20 transition-colors flex-shrink-0 leading-none">{p.num}</span>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="text-center mt-16" {...fadeUp(0.3)}>
            <p className="text-gray-400 text-sm mb-6">Kedengarannya familiar? Kamu nggak sendirian.</p>
            <button className="bg-[#FF5F4B] text-white px-8 py-4 rounded-full font-bold hover:bg-[#e54e3a] hover:shadow-lg hover:shadow-[#FF5F4B]/25 hover:-translate-y-0.5 transition-all flex items-center gap-2 mx-auto">
              Udah, saatnya pindah <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>
      {/* Features */}
      <section id="kenapa" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" {...fadeUp()}>
            <p className="text-[#FF5F4B] text-xs uppercase tracking-[0.2em] font-bold mb-4">Kenapa bikininwebsite.id</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#3B3F9E] mb-5 leading-tight">
              Kenapa penjual yang<br />pindah, nggak mau balik lagi.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Ini bukan cuma soal website. Ini soal kamu yang akhirnya punya kendali penuh atas bisnis sendiri.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Percent size={22} className="text-[#3B3F9E]" />, title: "0% Komisi", desc: "Semua yang masuk, masuk ke kamu. Nggak kemana-mana." },
              { icon: <Palette size={22} className="text-[#3B3F9E]" />, title: "Nama dan Tampilan Sendiri", desc: "Domain sendiri, desain sendiri. Nggak numpang di lapak orang lagi." },
              { icon: <Database size={22} className="text-[#3B3F9E]" />, title: "Data Pembeli Milik Kamu", desc: "Kamu tahu persis siapa yang beli. Bisa dihubungi lagi, kapanpun, tanpa izin siapapun." },
              { icon: <Zap size={22} className="text-[#3B3F9E]" />, title: "Live dalam 7 Hari", desc: "7 hari dari pertama ngobrol sama kami, tokomu udah bisa nerima order." },
              { icon: <CreditCard size={22} className="text-[#3B3F9E]" />, title: "Semua Metode Pembayaran", desc: "QRIS, transfer bank, GoPay, OVO, ShopeePay — pembeli nggak perlu ribet milih cara bayar." },
              { icon: <Headphones size={22} className="text-[#3B3F9E]" />, title: "Ada yang Bisa Dihubungi", desc: "Ada yang bingung? Chat kami. Yang bales manusia beneran, bukan bot." },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#3B3F9E]/20 hover:shadow-lg hover:-translate-y-1 transition-all group cursor-default"
                {...fadeUp(i * 0.1)}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F5F0E8] flex items-center justify-center mb-5 group-hover:bg-[#3B3F9E]/10 transition-colors">{f.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="cara-kerja" className="py-28 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-20" {...fadeUp()}>
            <p className="text-[#FF5F4B] text-xs uppercase tracking-[0.2em] font-bold mb-4">Cara Kerja</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#3B3F9E] mb-5 leading-tight">
              Nggak ribet.<br />Serius.
            </h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">Kamu nggak perlu ngerti soal hosting, domain, atau coding. Biar kami yang urus.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <PhoneCall size={24} className="text-white" />, title: "Ngobrol dulu, gratis.", desc: "Ceritain tokomu mau kayak apa, produkmu apa, siapa pembelimu. Kami dengerin dan bantu rencanain." },
              { icon: <Globe size={24} className="text-white" />, title: "Kami yang ngerjain.", desc: "Desain, produk, payment, domain — semua kami handle. Kamu nggak perlu ngerti teknis sama sekali." },
              { icon: <BarChart3 size={24} className="text-white" />, title: "Kamu tinggal jualan.", desc: "7 hari kemudian, tokomu live. Kamu fokus jualan, kami standby kalau ada apa-apa." },
            ].map((s, i) => (
              <motion.div key={i} className="text-center" {...fadeUp(i * 0.15)}>
                <div className="w-16 h-16 rounded-full bg-[#3B3F9E] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#3B3F9E]/20">{s.icon}</div>
                <h3 className="font-bold text-gray-800 text-xl mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimoni" className="py-28 px-8 bg-[#3B3F9E] relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, #ffffff08 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />
        <div className="relative max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp()}>
            <p className="text-[#FF5F4B] text-xs uppercase tracking-[0.2em] font-bold mb-4">Testimoni</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Apa kata mereka?</h2>
            <p className="text-indigo-400/60 text-xs mt-4">* Nama dan nama toko diubah atas permintaan klien.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Rina S.", location: "Bandung", store: "Toko Hijab", text: "Udah capek kena komisi terus di Shopee. Sekarang hasilnya masuk semua ke kantong sendiri. 7 hari udah langsung bisa jualan, nggak nyangka secepet itu.", initial: "R", revenue: "+Rp 8jt/bulan" },
              { name: "Budi S.", location: "Surabaya", store: "Kedai Kopi", text: "Saya nggak ngerti teknologi sama sekali. Tapi semua diurus sama bikininwebsite.id, tinggal terima beres. Pelanggan sekarang langsung order dari website.", initial: "B", revenue: "+Rp 12jt/bulan" },
              { name: "Mega W.", location: "Jakarta", store: "Toko Skincare", text: "Yang paling kerasa, saya sekarang tahu siapa aja yang beli. Bisa langsung saya hubungi lagi. Repeat order naik banyak banget.", initial: "M", revenue: "+Rp 15jt/bulan" },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all"
                {...fadeUp(i * 0.1)}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}</div>
                  <span className="text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp size={10} /> {t.revenue}
                  </span>
                </div>
                <p className="text-indigo-100 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF5F4B] flex items-center justify-center text-white font-black text-sm">{t.initial}</div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-indigo-300">{t.store} · {t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="harga" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp()}>
            <p className="text-[#FF5F4B] text-xs uppercase tracking-[0.2em] font-bold mb-4">Harga</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#3B3F9E] mb-4">Pilih yang pas buat kebutuhan kamu.</h2>
            <p className="text-gray-500 text-lg mb-10">Bayar sekali, atau berlangganan per bulan, pilihan ada di tangan kamu.</p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm">
              <button
                onClick={() => setBillingType("onetime")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${billingType === "onetime"
                  ? "bg-[#3B3F9E] text-white shadow-md"
                  : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                Bayar Sekali
              </button>
              <button
                onClick={() => setBillingType("subscription")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${billingType === "subscription"
                  ? "bg-[#3B3F9E] text-white shadow-md"
                  : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                Berlangganan
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {[
              {
                name: "Starter",
                onetime: { price: "Rp 3jt", sub: "sekali bayar" },
                subscription: { price: "Rp 2,5jt", sub: "setup + biaya maintenance per bulan" },
                desc: "Landing page + katalog produk.",
                features: billingType === "onetime"
                  ? ["Landing page + katalog produk", "Tombol order WhatsApp", "Domain gratis 1 tahun*", "SSL & hosting setup", "Support via WhatsApp"]
                  : ["Landing page + katalog produk", "Tombol order WhatsApp", "Domain gratis 1 tahun*", "SSL & hosting setup", "Support via WhatsApp", "Maintenance bulanan", "Konsultasi ongoing"],
                highlight: false, cta: billingType === "onetime" ? "Mulai dengan Starter" : "Langganan Starter", ctaStyle: "border"
              },
              {
                name: "Pro",
                onetime: { price: "Rp 7,5jt", sub: "sekali bayar" },
                subscription: { price: "Rp 6,5jt", sub: "setup + biaya maintenance per bulan" },
                desc: "Toko online yang bisa langsung terima order dan pembayaran.",
                features: billingType === "onetime"
                  ? ["Semua fitur Starter", "Toko online siap pakai", "Payment gateway", "Desain custom", "Integrasi sosmed & WhatsApp", "Dashboard penjualan"]
                  : ["Semua fitur Starter", "Toko online siap pakai", "Payment gateway", "Desain custom", "Integrasi sosmed & WhatsApp", "Dashboard penjualan", "Update konten bulanan", "Support prioritas"],
                highlight: true, cta: billingType === "onetime" ? "Mulai dengan Pro" : "Langganan Pro", ctaStyle: "coral"
              },
              {
                name: "Custom",
                onetime: { price: "Hubungi Kami", sub: "harga menyesuaikan" },
                subscription: { price: "Hubungi Kami", sub: "harga menyesuaikan" },
                desc: "Untuk kebutuhan yang lebih kompleks.",
                features: ["Semua fitur Pro", "Dibangun dari nol", "Desain 100% unik", "Fitur khusus sesuai kebutuhan", "Prioritas support", "Konsultasi ongoing"],
                highlight: false, cta: "Ngobrol Dulu →", ctaStyle: "dark"
              },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                className={`rounded-2xl p-8 relative ${p.highlight ? "bg-[#3B3F9E] shadow-2xl shadow-[#3B3F9E]/30 scale-105" : "bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"}`}
                {...fadeUp(i * 0.1)}
              >
                {p.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF5F4B] text-white text-xs font-bold px-5 py-1.5 rounded-full tracking-wide uppercase whitespace-nowrap">Paling Banyak Dipilih</div>
                )}
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${p.highlight ? "text-indigo-300" : "text-gray-400"}`}>{p.name}</p>
                <p className={`text-3xl font-black mb-0.5 ${p.highlight ? "text-white" : "text-gray-800"}`}>
                  {billingType === "onetime" ? p.onetime.price : p.subscription.price}
                </p>
                <p className={`text-xs mb-2 ${p.highlight ? "text-indigo-300" : "text-gray-400"}`}>
                  {billingType === "onetime" ? p.onetime.sub : p.subscription.sub}
                </p>
                <p className={`text-sm mb-6 font-medium ${p.highlight ? "text-indigo-200" : "text-gray-500"}`}>{p.desc}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${p.highlight ? "text-indigo-100" : "text-gray-600"}`}>
                      <Check size={15} className="text-[#FF5F4B] mt-0.5 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3.5 rounded-full font-bold transition-all ${p.ctaStyle === "coral" ? "bg-[#FF5F4B] text-white hover:bg-[#e54e3a]" :
                  p.ctaStyle === "dark" ? "bg-[#1a1d4e] text-white hover:bg-[#0f1133]" :
                    "border-2 border-[#3B3F9E] text-[#3B3F9E] hover:bg-[#3B3F9E] hover:text-white"
                  }`}>
                  {p.cta}
                </button>
              </motion.div>
            ))}
          </div>
          <motion.p className="text-center text-sm text-gray-400 mt-12" {...fadeUp(0.3)}>
            Masih bingung mau pilih yang mana?{" "}
            <a href="https://wa.me/6281803693888" className="text-[#3B3F9E] font-semibold hover:underline">Konsultasi Gratis→</a>
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-8 bg-[#FF5F4B] relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, #ffffff18 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">Tunggu apa lagi?</h2>
            <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Tiap hari nunda, komisimu terus jalan. Yuk, mulai sekarang.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button className="bg-white text-[#FF5F4B] px-10 py-4 rounded-full font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2">
                Bikin Toko Sekarang <ArrowRight size={18} />
              </button>
              <button className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold hover:border-white hover:bg-white/10 transition-all flex items-center gap-2">
                <MessageCircle size={16} /> Tanya via WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-white/50 border-t border-gray-100 py-6 overflow-hidden">
        <p className="text-center text-xs text-gray-400 uppercase tracking-[0.2em] font-medium mb-4">Dipercaya penjual dari berbagai kota di Indonesia</p>
        <div className="flex">
          <div className="flex items-center gap-12 whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
            {["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Medan", "Makassar", "Semarang", "Balikpapan", "Malang", "Palembang",
              "Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Medan", "Makassar", "Semarang", "Balikpapan", "Malang", "Palembang"].map((city, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <MapPin size={12} className="text-[#FF5F4B]" />{city}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1d4e] text-white py-20 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <p className="font-black text-2xl mb-4">bikininwebsite.id</p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
              Kami bantu penjual Indonesia punya toko sendiri — yang beneran punya sendiri.
            </p>
            <a href="https://wa.me/6281803693888" className="inline-flex items-center gap-2 bg-[#FF5F4B] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#e54e3a] transition-colors">
              <MessageCircle size={16} /> Ngobrol Sama Kami
            </a>
          </div>
          <div>
            <p className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-5">Layanan</p>
            <ul className="space-y-3 text-sm text-gray-400">
              {["Paket Starter", "Paket Pro", "Paket Custom", "Contoh Toko"].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-5">Perusahaan</p>
            <ul className="space-y-3 text-sm text-gray-400">
              {["Tentang Kami", "FAQ", "Blog", "Karir"].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">© 2026 bikininwebsite.id. All rights reserved.</p>
          <p className="text-gray-500 text-xs">Dibuat dengan sepenuh hati untuk penjual Indonesia</p>
        </div>
      </footer>
    </main>
  );
}