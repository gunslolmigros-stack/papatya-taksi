"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Car, Shield, Star, Menu, X, MessageCircle, ThumbsUp, User, Navigation, Camera } from "lucide-react";
import Image from "next/image";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

// Reviews data
const reviews = [
  {
    name: "Ahmet Y.",
    rating: 5,
    text: "Çok hızlı geldiler, sürücü çok kibardı. Kesinlikle tavsiye ederim!",
    date: "2 hafta önce"
  },
  {
    name: "Fatma K.",
    rating: 5,
    text: "Gece vakti bile 10 dakika içinde geldiler. Güvenilir hizmet.",
    date: "1 ay önce"
  },
  {
    name: "Mehmet S.",
    rating: 5,
    text: "Araçlar temiz ve konforluydu. Fiyatlar da çok uygun.",
    date: "3 hafta önce"
  },
  {
    name: "Ayşe B.",
    rating: 5,
    text: "Düzenli olarak kullanıyorum, hiçbir sorun yaşamadım. Teşekkürler!",
    date: "1 hafta önce"
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phoneNumbers = [
    { number: "0507 117 35 00", label: "Telefon 1" },
    { number: "0507 127 35 00", label: "Telefon 2" },
    { number: "0262 641 35 00", label: "Sabit Hat" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const renderStars = (rating: number) => {
    return Array(rating).fill(null).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`text-2xl md:text-3xl font-bold transition-colors ${scrolled ? "text-gray-900" : "text-gray-900"}`}>
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Papatya</span>
                <span className="text-gray-900"> Taksi</span>
              </span>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {["Ana Sayfa", "Konum", "Hizmetler", "Galeri", "Yorumlar", "İletişim"].map((item, index) => {
                const sectionId = ["home", "konum", "hizmetler", "galeri", "yorumlar", "iletisim"][index];
                return (
                  <motion.button 
                    key={item}
                    onClick={() => scrollToSection(sectionId)}
                    className={`font-medium transition-colors relative group ${
                      scrolled ? "text-gray-700 hover:text-amber-600" : "text-gray-700 hover:text-amber-600"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full" />
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div 
          initial={false}
          animate={{ height: mobileMenuOpen ? "auto" : 0, opacity: mobileMenuOpen ? 1 : 0 }}
          className="md:hidden bg-white border-t overflow-hidden"
        >
          <div className="px-4 py-3 space-y-1">
            {["Ana Sayfa", "Konum", "Hizmetler", "Galeri", "Yorumlar", "İletişim"].map((item, index) => {
              const sectionId = ["home", "konum", "hizmetler", "galeri", "yorumlar", "iletisim"][index];
              return (
                <motion.button 
                  key={item}
                  onClick={() => scrollToSection(sectionId)}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium"
                  whileTap={{ scale: 0.98 }}
                >
                  {item}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Clock className="w-4 h-4" />
                <span>7/24 Hizmetinizdeyiz</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Papatya</span>
                <br />Taksi
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Çayırova ve çevresinde güvenli, konforlu ve hızlı taksi hizmeti. 
                Profesyonel sürücülerimizle yanınızdayız.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.a 
                  href={`tel:${phoneNumbers[0].number.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-amber-500/25"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                  Hemen Ara
                </motion.a>
                <motion.button 
                  onClick={() => scrollToSection("konum")}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-2xl border-2 border-gray-200 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Navigation className="w-5 h-5" />
                  Konum
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial="hidden"
              animate="visible"
              variants={scaleIn}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl transform rotate-3 opacity-20"
                animate={{ rotate: [3, 6, 3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative bg-white/80 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-2xl border border-white/50">
                <div className="text-center">
                  <motion.div 
                    className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Car className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Hızlı ve Güvenli</h3>
                  <p className="text-gray-600 mb-8">7/24 kesintisiz hizmet</p>
                  <div className="space-y-3">
                    {phoneNumbers.map((phone, index) => (
                      <motion.a 
                        key={index}
                        href={`tel:${phone.number.replace(/\s/g, "")}`}
                        className="flex items-center justify-center gap-3 bg-gray-50 hover:bg-amber-50 p-4 rounded-2xl transition-colors group"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Phone className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                        <span className="text-lg md:text-xl font-semibold text-gray-900">{phone.number}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section - Moved Up */}
      <section id="konum" className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-white to-orange-50 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-10 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="inline-flex items-center gap-2 text-amber-600 font-semibold mb-4">
              <MapPin className="w-5 h-5" />
              Konum
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bizi Nerede Bulabilirsiniz?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Emek Mahallesi'ndeki durağımıza gelin veya haritadan yol tarifi alın
            </p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            {/* Google Maps Embed */}
            <div className="w-full h-80 md:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6018.718664058679!2d29.412!3d40.8222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cadf003389b7dd%3A0x7c77ad6d9e260f45!2sPapatya%20taksi!5e0!3m2!1str!2str!4v1708531200000!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Çayırova Papatya Taksi</h3>
                  <p className="text-gray-600">
                    Emek, 62/6. Sk., 41420 Çayırova/Kocaeli
                  </p>
                </div>
                <motion.a 
                  href="https://www.google.com/maps/place/Papatya+taksi/@40.8218297,29.4115074,19z/data=!4m6!3m5!1s0x14cadf003389b7dd:0x7c77ad6d9e260f45!8m2!3d40.8221571!4d29.4118746!16s%2Fg%2F11ybzmh5qk?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Navigation className="w-5 h-5" />
                  Yol Tarifi Al
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="hizmetler" className="py-20 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="inline-block text-amber-600 font-semibold mb-4">Hizmetlerimiz</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Neden Çayırova Papatya Taksi?</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Müşteri memnuniyeti odaklı hizmet anlayışımızla fark yaratıyoruz
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { icon: Clock, title: "7/24 Hizmet", desc: "Günün her saati, haftanın her günü hizmetinizdeyiz. Gece veya gündüz fark etmeksizin yanınızdayız." },
              { icon: Shield, title: "Güvenli Yolculuk", desc: "Deneyimli ve profesyonel sürücülerimizle güvenli bir yolculuk deneyimi sunuyoruz." },
              { icon: Star, title: "Konforlu Araçlar", desc: "Modern ve bakımlı araçlarımızla konforlu bir yolculuk garantisi veriyoruz." }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeri" className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-amber-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="inline-flex items-center gap-2 text-amber-600 font-semibold mb-4">
              <Camera className="w-5 h-5" />
              Galeri
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">İş Yerimiz</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Çayırova Papatya Taksi durağımızdan görüntüler
            </p>
          </motion.div>

          {/* Mobile: Single column, Desktop: Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { src: "/images/papatya-taksi-1.jpg", alt: "Çayırova Papatya Taksi Durağı - Gece Görünümü" },
              { src: "/images/papatya-taksi-2.jpg", alt: "Çayırova Papatya Taksi Durağı - Yan Açı" },
              { src: "/images/papatya-taksi-3.jpg", alt: "Çayırova Papatya Taksi Durağı - Gündüz Görünümü" },
              { src: "/images/kart.jpg", alt: "Çayırova Papatya Taksi - Kartvizit" },
              { src: "/images/galeri-eklenecek.jpg", alt: "Çayırova Papatya Taksi - Galeri" }
            ].map((image, index) => (
              <motion.div 
                key={index}
                className="relative group overflow-hidden rounded-2xl md:rounded-3xl shadow-lg aspect-[4/3] md:aspect-square"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-medium text-sm md:text-base">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="yorumlar" className="py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="inline-flex items-center gap-2 text-amber-400 font-semibold mb-4">
              <MessageCircle className="w-5 h-5" />
              Müşteri Yorumları
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Müşterilerimiz Ne Diyor?</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Google Maps üzerinden bize ulaşan değerli yorumlarınız
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {reviews.map((review, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500"
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">&ldquo;{review.text}&rdquo;</p>
                <p className="text-gray-500 text-xs">{review.date}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <a 
              href="https://www.google.com/maps/place/Papatya+taksi/@40.8218297,29.4115074,19z/data=!4m6!3m5!1s0x14cadf003389b7dd:0x7c77ad6d9e260f45!8m2!3d40.8221571!4d29.4118746!16s%2Fg%2F11ybzmh5qk?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl transition-all"
            >
              <ThumbsUp className="w-5 h-5" />
              Siz de Yorum Yapın
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletisim" className="py-20 md:py-32 bg-gradient-to-br from-amber-50 via-white to-orange-50 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="inline-block text-amber-600 font-semibold mb-4">İletişim</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Bize Ulaşın</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Bize ulaşmak çok kolay! Hemen arayın veya konumumuza gelin.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
            >
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  Telefon Numaraları
                </h3>
                <div className="space-y-4">
                  {phoneNumbers.map((phone, index) => (
                    <motion.a 
                      key={index}
                      href={`tel:${phone.number.replace(/\s/g, "")}`}
                      className="flex items-center gap-4 bg-gray-50 hover:bg-amber-50 p-4 rounded-2xl transition-all group"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{phone.label}</p>
                        <p className="text-xl font-bold text-gray-900">{phone.number}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  E-posta
                </h3>
                <motion.a 
                  href="mailto:taksipapatya@gmail.com"
                  className="flex items-center gap-4 bg-gray-50 hover:bg-amber-50 p-4 rounded-2xl transition-all"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">E-posta</p>
                    <p className="text-lg md:text-xl font-bold text-gray-900">taksipapatya@gmail.com</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                Adres
              </h3>
              <div className="bg-gray-50 p-6 rounded-2xl mb-6">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                  Emek, 62/6. Sk.,<br />
                  41420 Çayırova/Kocaeli
                </p>
              </div>

              <motion.a 
                href="https://www.google.com/maps/place/Papatya+taksi/@40.8218297,29.4115074,19z/data=!4m6!3m5!1s0x14cadf003389b7dd:0x7c77ad6d9e260f45!8m2!3d40.8221571!4d29.4118746!16s%2Fg%2F11ybzmh5qk?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-6 py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Navigation className="w-5 h-5" />
                Google Maps'te Aç
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Çayırova Papatya Taksi</span>
            </motion.div>
            <p className="text-sm text-center">
              © 2026 Çayırova Papatya Taksi. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-4">
              <motion.a 
                href={`tel:${phoneNumbers[0].number.replace(/\s/g, "")}`} 
                className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="mailto:taksipapatya@gmail.com" 
                className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

