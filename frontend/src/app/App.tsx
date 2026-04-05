import { useState, useEffect, useRef } from "react";
import {
  Menu,
  User,
  Zap,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Upload,
  DollarSign,
  TrendingDown,
  Leaf,
  Wifi,
  Droplets,
  Sun,
  AlertTriangle,
  CheckCircle,
  X,
  FileText,
  Globe,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  Clock,
  Battery,
  Waves,
  MapPin,
  UserPlus,
} from "lucide-react";
import logo from "../assets/6e16dc174382cc95dd21fce17c3cc0b68d402e35.png";
import * as api from "./api";

const T = {
  en: {
    tagline: "ENERGY SOLUTIONS",
    insertBill: "Insert Bill",
    analyzeMyBill: "Analyze My Bill",
    learnMore: "Learn More",
    overpayingBanner:
      "Think you're overpaying? The average household wastes",
    perYear: "/year on utilities.",
    insertYourBill: "Insert your bill",
    ourServices: "Our Services",
    tapToExplore: "Tap any card to explore.",
    back: "Back",
    billAnalyzer: "Bill Analyzer",
    areYouOverpaying: "Are you",
    overpaying: "overpaying",
    uploadDesc:
      "Upload your bill or enter the details. We'll break it down and find you better options.",
    energy: "Energy",
    water: "Water",
    phone: "Phone",
    dropBill: "Drop your bill here",
    fileTypes:
      "PDF, JPG, PNG accepted · or enter manually below",
    clickReplace: "Click to replace",
    orEnterManually: "Or enter manually",
    totalAmount: "Total Amount ($)",
    usage: "Usage",
    currentProvider: "Current Provider",
    providerPlaceholder: "e.g. PG&E, AT&T...",
    analyzeBill: "Analyze My Bill",
    analyzing: "Analyzing your bill…",
    readingBill: "Reading bill data…",
    comparingAvg: "Comparing regional averages…",
    findingAlt: "Finding alternatives…",
    calcSavings: "Calculating savings…",
    yourBillBreakdown: "Your Bill Breakdown",
    provider: "Provider",
    currentProviderLabel: "Current provider",
    startOver: "Start over",
    yourBill: "Your bill",
    areaAverage: "Area average",
    overpayingBy: "Overpaying by",
    onTrack: "You're on track",
    great: "✓ Great",
    payingAbove: "You're paying",
    aboveAverage: "above average",
    fairRate: "Fair rate",
    extraPerMonth:
      "extra you're handing to your provider. Here are better options:",
    over12mo: "Over 12 months, that's",
    recommendedAlts: "Recommended alternatives",
    ecoFriendly:
      "Eco-friendly, reliable, and easier on your wallet.",
    reliability: "Reliability",
    ecoScore: "Eco score",
    estSavings: "Est. savings",
    perMonth: "/mo",
    perYear2: "/yr",
    learnMoreBtn: "Learn more",
    bestPick: "Best pick",
    whyBetter: "Why this is better",
    pros: "Pros",
    cons: "Cons",
    ecoNote: "Environmental note:",
    ecoNoteText:
      "Switching to the top recommendation would reduce your carbon footprint by an estimated",
    eqTrees: "equivalent to planting 55 trees.",
    solar: "Solar",
    water2: "Water",
    mobile: "Mobile",
    co2: "tons CO₂/year",
    slides: [
      {
        title: "POWERING",
        subtitle: "THE FUTURE",
        description:
          "Sustainable energy solutions for tomorrow",
      },
      {
        title: "EMPOWERING",
        subtitle: "COMMUNITIES",
        description: "Building stronger connections together",
      },
      {
        title: "CREATING",
        subtitle: "OPPORTUNITIES",
        description: "Clean energy for every family",
      },
    ],
    navItems: [
      { id: "home", label: "Home", isHome: true },
      {
        id: "about",
        label: "About",
        dropdown: [
          { label: "Our Mission", page: "mission" },
          { label: "Our Team", page: "team" },
          { label: "History", page: "history" },
        ],
      },
      {
        id: "energy",
        label: "Energy",
        dropdown: [
          { label: "Solar Solutions", page: "solar" },
          { label: "Battery Storage", page: "battery" },
          {
            label: "Insert Bill",
            page: "bill-analyzer",
            highlight: true,
          },
        ],
      },
      {
        id: "water",
        label: "Water",
        dropdown: [
          { label: "Conservation Tips", page: "conservation" },
          {
            label: "Insert Bill",
            page: "bill-analyzer",
            highlight: true,
          },
        ],
      },
      {
        id: "phone",
        label: "Phone",
        dropdown: [
          { label: "Plans", page: "plans" },
          {
            label: "Insert Bill",
            page: "bill-analyzer",
            highlight: true,
          },
        ],
      },
    ],
    pageData: {
      overview: {
        title: "Overview",
        icon: "🏠",
        desc: "Welcome to Casa Abierta, your hub for sustainable community services combining energy, water, and connectivity to lower costs for every household.",
      },
      news: {
        title: "Latest News",
        icon: "📰",
        desc: "Stay up to date with new partnerships, product launches, and community impact reports from Casa Abierta.",
      },
      announcements: {
        title: "Announcements",
        icon: "📢",
        desc: "Official announcements from the Casa Abierta team, service updates, rate changes, and community programs.",
      },
      solar: {
        title: "Solar Solutions",
        icon: "☀️",
        desc: "Rooftop panels to community solar shares, flexible options that fit any home or budget with no large upfront investment.",
      },
      "water-solutions": {
        title: "Water Solutions",
        icon: "💧",
        desc: "Smart water systems, low-flow upgrades, and leak detection tools to conserve water and lower your monthly bill.",
      },
      mobile: {
        title: "Mobile Solutions",
        icon: "📱",
        desc: "Affordable mobile plans on major networks. No bloated contracts, no surprise fees.",
      },
      plans: {
        title: "Plans",
        icon: "📋",
        desc: "Compare flexible phone plans from basic talk & text to unlimited 5G at community-negotiated rates.",
      },
    },
  },
  es: {
    tagline: "SOLUCIONES DE ENERGÍA",
    insertBill: "Insertar Factura",
    analyzeMyBill: "Analizar Mi Factura",
    learnMore: "Saber Más",
    overpayingBanner:
      "¿Crees que pagas de más? El hogar promedio desperdicia",
    perYear: "/año en servicios.",
    insertYourBill: "Insertar tu factura",
    ourServices: "Nuestros Servicios",
    tapToExplore: "Toca cualquier tarjeta para explorar.",
    back: "Atrás",
    billAnalyzer: "Analizador de Facturas",
    areYouOverpaying: "¿Estás",
    overpaying: "pagando de más",
    uploadDesc:
      "Sube tu factura o ingresa los detalles. La desglosaremos y encontraremos mejores opciones.",
    energy: "Energía",
    water: "Agua",
    phone: "Teléfono",
    dropBill: "Arrastra tu factura aquí",
    fileTypes:
      "PDF, JPG, PNG aceptados · o ingresa manualmente abajo",
    clickReplace: "Haz clic para reemplazar",
    orEnterManually: "O ingresa manualmente",
    totalAmount: "Monto Total ($)",
    usage: "Consumo",
    currentProvider: "Proveedor Actual",
    providerPlaceholder: "ej. PG&E, AT&T...",
    analyzeBill: "Analizar Mi Factura",
    analyzing: "Analizando tu factura…",
    readingBill: "Leyendo datos de la factura…",
    comparingAvg: "Comparando promedios regionales…",
    findingAlt: "Buscando alternativas…",
    calcSavings: "Calculando ahorros…",
    yourBillBreakdown: "Desglose de Tu Factura",
    provider: "Proveedor",
    currentProviderLabel: "Proveedor actual",
    startOver: "Comenzar de nuevo",
    yourBill: "Tu factura",
    areaAverage: "Promedio del área",
    overpayingBy: "Pagando de más",
    onTrack: "Estás en buen camino",
    great: "✓ Excelente",
    payingAbove: "Estás pagando",
    aboveAverage: "por encima del promedio",
    fairRate: "Tarifa justa",
    extraPerMonth:
      "extra que le das a tu proveedor. Aquí hay mejores opciones:",
    over12mo: "En 12 meses, eso es",
    recommendedAlts: "Alternativas recomendadas",
    ecoFriendly: "Ecológicas, confiables y más económicas.",
    reliability: "Confiabilidad",
    ecoScore: "Puntaje eco",
    estSavings: "Ahorro est.",
    perMonth: "/mes",
    perYear2: "/año",
    learnMoreBtn: "Saber más",
    bestPick: "Mejor opción",
    whyBetter: "Por qué es mejor",
    pros: "Ventajas",
    cons: "Desventajas",
    ecoNote: "Nota ambiental:",
    ecoNoteText:
      "Cambiar a la opción principal reduciría tu huella de carbono en aproximadamente",
    eqTrees: "equivalente a plantar 55 árboles.",
    solar: "Solar",
    water2: "Agua",
    mobile: "Móvil",
    co2: "toneladas de CO₂/año",
    slides: [
      {
        title: "IMPULSANDO",
        subtitle: "EL FUTURO",
        description:
          "Soluciones de energía sostenible para mañana",
      },
      {
        title: "EMPODERANDO",
        subtitle: "COMUNIDADES",
        description:
          "Construyendo conexiones más fuertes juntos",
      },
      {
        title: "CREANDO",
        subtitle: "OPORTUNIDADES",
        description: "Energía limpia para cada familia",
      },
    ],
    navItems: [
      { id: "home", label: "Inicio", isHome: true },
      {
        id: "about",
        label: "Nosotros",
        dropdown: [
          { label: "Nuestra Misión", page: "mission" },
          { label: "Nuestro Equipo", page: "team" },
          { label: "Historia", page: "history" },
        ],
      },
      {
        id: "energy",
        label: "Energía",
        dropdown: [
          { label: "Soluciones Solares", page: "solar" },
          { label: "Almacenamiento", page: "battery" },
          {
            label: "Insertar Factura",
            page: "bill-analyzer",
            highlight: true,
          },
        ],
      },
      {
        id: "water",
        label: "Agua",
        dropdown: [
          { label: "Conservación", page: "conservation" },
          {
            label: "Insertar Factura",
            page: "bill-analyzer",
            highlight: true,
          },
        ],
      },
      {
        id: "phone",
        label: "Teléfono",
        dropdown: [
          { label: "Planes", page: "plans" },
          {
            label: "Insertar Factura",
            page: "bill-analyzer",
            highlight: true,
          },
        ],
      },
    ],
    pageData: {
      overview: {
        title: "Resumen",
        icon: "🏠",
        desc: "Bienvenido a Casa Abierta, tu centro de servicios comunitarios sostenibles.",
      },
      news: {
        title: "Últimas Noticias",
        icon: "📰",
        desc: "Mantente al día con nuevas asociaciones y lanzamientos de productos.",
      },
      announcements: {
        title: "Anuncios",
        icon: "📢",
        desc: "Anuncios oficiales del equipo de Casa Abierta.",
      },
      solar: {
        title: "Soluciones Solares",
        icon: "☀️",
        desc: "Desde paneles en el techo hasta participaciones solares comunitarias, opciones flexibles para cualquier hogar o presupuesto.",
      },
      "water-solutions": {
        title: "Soluciones de Agua",
        icon: "💧",
        desc: "Sistemas inteligentes, mejoras de bajo flujo y detección de fugas.",
      },
      mobile: {
        title: "Soluciones Móviles",
        icon: "📱",
        desc: "Planes móviles asequibles en las principales redes. Sin contratos inflados.",
      },
      plans: {
        title: "Planes",
        icon: "📋",
        desc: "Compara planes desde llamadas básicas hasta datos 5G ilimitados.",
      },
    },
  },
};

const teamMembers = [
  {
    name: "Michelle Cruz",
    role: "Internal VP, SHPE KSU",
    major: "Computer Engineering",
    school: "Kennesaw State University",
    initials: "MC",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "David Henderson",
    role: "Future Membership Chair, SHPE KSU",
    major: "Computer Science & Mechatronics",
    school: "Kennesaw State University",
    initials: "DH",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Juan Castro",
    role: "SHPE KSU Member",
    major: "Computer Science",
    school: "Kennesaw State University",
    initials: "JC",
    color: "from-green-500 to-teal-600",
  },
  {
    name: "Eduardo Rosas",
    role: "Future Social Chair, SHPE KSU",
    major: "Software Engineering",
    school: "Kennesaw State University",
    initials: "ER",
    color: "from-orange-500 to-amber-600",
  },
];

const mockBillHistory = [
  {
    id: 1,
    type: "energy",
    provider: "PG&E",
    amount: 142,
    date: "Mar 2025",
    savings: 38,
  },
  {
    id: 2,
    type: "water",
    provider: "City Water",
    amount: 89,
    date: "Feb 2025",
    savings: 19,
  },
  {
    id: 3,
    type: "phone",
    provider: "AT&T",
    amount: 110,
    date: "Feb 2025",
    savings: 45,
  },
  {
    id: 4,
    type: "energy",
    provider: "PG&E",
    amount: 158,
    date: "Jan 2025",
    savings: 54,
  },
  {
    id: 5,
    type: "water",
    provider: "City Water",
    amount: 76,
    date: "Jan 2025",
    savings: 12,
  },
];

// ─── LOGIN MODAL ───────────────────────────────────────────────────
function LoginModal({ onClose, onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await api.login(email, password);
      onLogin({
        email: data.user.email,
        name: data.user.first_name,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        address: data.user.address,
        id: data.user.id,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !address) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await api.register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        address,
      });
      // Auto-login after registration
      const data = await api.login(email, password);
      onLogin({
        email: data.user.email,
        name: data.user.first_name,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        address: data.user.address,
        id: data.user.id,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = () => {
    if (!email) {
      setError("Enter your email address.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0d1117] border border-gray-700 rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Casa Abierta Logo"
              className="h-10 w-auto"
            />
            <span className="font-black text-white text-lg">
              CASA ABIERTA
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {mode === "login" && (
          <>
            <h2 className="text-2xl font-black text-white mb-1">
              Welcome back
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Sign in to view your bill history and savings.
            </p>
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="you@example.com"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl pl-9 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="••••••••"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl pl-9 pr-10 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPass ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#C1292E] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all mb-3 disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
            <button
              onClick={() => {
                setMode("register");
                setError("");
              }}
              className="w-full py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 font-medium rounded-xl transition-colors text-sm mb-2"
            >
              Create Account
            </button>
            <button
              onClick={() => {
                setMode("forgot");
                setError("");
              }}
              className="w-full py-2 text-gray-500 hover:text-gray-300 transition-colors text-xs"
            >
              Forgot Password?
            </button>
          </>
        )}

        {mode === "register" && (
          <>
            <h2 className="text-2xl font-black text-white mb-1">
              Create account
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Join Casa Abierta to track your bills and savings.
            </p>
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); setError(""); }}
                    placeholder="Juan"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); setError(""); }}
                    placeholder="García"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="you@example.com"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl pl-9 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl pl-9 pr-10 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                  <button type="button" onClick={() => setShowPass((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Address</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); setError(""); }}
                    placeholder="123 Main St, Atlanta, GA 30301"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl pl-9 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#C1292E] text-white font-bold rounded-xl hover:shadow-lg transition-all mb-3 disabled:opacity-50"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className="w-full py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 font-medium rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
            >
              <ArrowLeft size={14} /> Back to Sign In
            </button>
          </>
        )}

        {mode === "forgot" && !submitted && (
          <>
            <h2 className="text-2xl font-black text-white mb-1">
              Reset password
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Enter your email and we'll send you a reset link.
            </p>
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl pl-9 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
              </div>
            </div>
            <button
              onClick={handleForgot}
              className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#C1292E] text-white font-bold rounded-xl hover:shadow-lg transition-all mb-3"
            >
              Send Reset Link
            </button>
            <button
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className="w-full py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 font-medium rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
            >
              <ArrowLeft size={14} /> Back to Sign In
            </button>
          </>
        )}

        {mode === "forgot" && submitted && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle
                size={32}
                className="text-green-400"
              />
            </div>
            <h2 className="text-xl font-black text-white mb-2">
              Check your inbox
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              We sent a reset link to{" "}
              <span className="text-white font-semibold">
                {email}
              </span>
            </p>
            <button
              onClick={() => {
                setMode("login");
                setSubmitted(false);
              }}
              className="px-6 py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 font-medium rounded-xl transition-colors text-sm"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ──────────────────────────────────────────────────
function ProfilePage({ user, onBack, onLogout }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBillHistory(20)
      .then((data) => setBills(data.bills || []))
      .catch(() => setBills([]))
      .finally(() => setLoading(false));
  }, []);

  const billTypeIcon = {
    energy: "⚡",
    water: "💧",
    phone: "📱",
  };
  const billTypeLabel = {
    energy: "Energy",
    water: "Water",
    phone: "Phone",
  };

  const displayBills = bills.length > 0
    ? bills.map((b: any) => ({
        id: b.id,
        type: b.bill_type,
        provider: b.provider_name || "Unknown",
        amount: b.amount_due || 0,
        date: b.billing_period || "—",
      }))
    : mockBillHistory;

  const totalBills = displayBills.length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="w-px h-5 bg-gray-700" />
          <span className="font-semibold">My Profile</span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm font-medium border border-gray-700 hover:border-red-500/40 rounded-xl px-3 py-1.5"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#C1292E] flex items-center justify-center text-2xl font-black text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-black text-white capitalize">
              {user.name}
            </h1>
            <p className="text-gray-400 text-sm">
              {user.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-5 text-center">
            <p className="text-3xl font-black text-[#FF6B35]">
              {totalBills}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">
              Bills Analyzed
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-5 text-center">
            <p className="text-3xl font-black text-green-400">
              ${displayBills.reduce((s, b) => s + (b.amount || 0), 0).toFixed(0)}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">
              Total Tracked
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-5 text-center">
            <p className="text-3xl font-black text-blue-400">
              {loading ? "…" : bills.length > 0 ? "Live" : "Demo"}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">
              Data Source
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-[#FF6B35]" />
            <h2 className="text-lg font-bold">Bill History</h2>
          </div>
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading bills…</div>
          ) : (
          <div className="space-y-3">
            {displayBills.map((bill) => (
              <div
                key={bill.id}
                className="bg-[#111] border border-gray-800 rounded-2xl p-5 flex items-center justify-between hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-lg">
                    {billTypeIcon[bill.type] || "📄"}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {billTypeLabel[bill.type] || bill.type},{" "}
                      {bill.provider}
                    </p>
                    <p className="text-xs text-gray-500">
                      {bill.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">
                    ${typeof bill.amount === 'number' ? bill.amount.toFixed(2) : bill.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MISSION PAGE ─────────────────────────────────────────────────
function MissionPage({ onBack, lang }) {
  const isEs = lang === "es";
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> {isEs ? "Atrás" : "Back"}
        </button>
        <div className="w-px h-5 bg-gray-700" />
        <span className="font-semibold">
          {isEs ? "Nuestra Misión" : "Our Mission"}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-16 text-center">
          <div className="text-6xl mb-6">🌎</div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            {isEs ? "Tecnología para" : "Technology for"}{" "}
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFD700] bg-clip-text text-transparent">
              {isEs ? "Todos" : "Everyone"}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {isEs
              ? "Nacimos de la convicción de que ninguna familia, sin importar su idioma, su país de origen, o su nivel de ingresos, debería quedarse atrás en un mundo que cambia rápido."
              : "We were born from the belief that no family, regardless of language, country of origin, or income level, should be left behind in a rapidly changing world."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: "🤝",
              title: isEs
                ? "Comunidad Primero"
                : "Community First",
              desc: isEs
                ? "Trabajamos directamente con familias inmigrantes y comunidades desatendidas, siendo su guía de confianza en un sistema de servicios públicos complejo y, a veces, injusto."
                : "We work directly with immigrant families and underserved communities, serving as their trusted guide through a complex, and sometimes unfair, utilities system.",
            },
            {
              icon: "💡",
              title: isEs
                ? "El Conocimiento es Poder"
                : "Knowledge is Power",
              desc: isEs
                ? "Muchas familias no saben que existen opciones mejores. Casa Abierta traduce la información técnica en decisiones claras: en tu idioma, a tu ritmo, sin letra pequeña."
                : "Many families don't know better options exist. Casa Abierta translates complex information into clear decisions, in your language, at your pace, with no fine print.",
            },
            {
              icon: "🌱",
              title: isEs
                ? "Ahorro Real, Hoy"
                : "Real Savings, Today",
              desc: isEs
                ? "No prometemos el futuro. Analizamos tu factura actual, te mostramos cuánto pagas de más y te conectamos con alternativas reales que te ahorran dinero desde el primer mes."
                : "We don't promise the future. We analyze your current bill, show exactly how much you're overpaying, and connect you to real alternatives that save money starting month one.",
            },
          ].map((p, i) => (
            <div
              key={i}
              className="bg-[#111] border border-gray-800 rounded-2xl p-6 hover:border-[#FF6B35]/30 transition-colors"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-bold text-white text-lg mb-3">
                {p.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#C1292E]/5 border border-[#FF6B35]/20 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-black text-white mb-4">
            {isEs
              ? "¿Por qué Casa Abierta?"
              : "Why Casa Abierta?"}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            {isEs
              ? "Los inmigrantes y las familias de bajos ingresos pagan desproporcionadamente más en servicios de energía, agua y telecomunicaciones, no porque usen más, sino porque nadie les dijo que había mejores opciones."
              : "Immigrants and low-income families disproportionately overpay for energy, water, and telecom services, not because they use more, but because nobody told them better options existed."}
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            {isEs
              ? "Casa Abierta nació para cerrar esa brecha. Combinamos tecnología accesible, información clara y apoyo comunitario para que cada familia pueda tomar decisiones informadas sobre sus servicios básicos."
              : "Casa Abierta was built to close that gap. We combine accessible technology, clear information, and community support so every family can make informed decisions about their essential services."}
          </p>
          <p className="text-[#FF6B35] font-bold text-lg">
            {isEs
              ? "Porque ahorrar dinero no debería requerir un título universitario ni hablar inglés perfectamente."
              : "Because saving money shouldn't require a college degree or perfect English."}
          </p>
        </div>

      </div>
    </div>
  );
}

// ─── HISTORY PAGE ─────────────────────────────────────────────────
function HistoryPage({ onBack, lang }) {
  const isEs = lang === "es";
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> {isEs ? "Atrás" : "Back"}
        </button>
        <div className="w-px h-5 bg-gray-700" />
        <span className="font-semibold">
          {isEs ? "Historia" : "History"}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-14 text-center">
          <div className="text-6xl mb-6">📖</div>
          <h1 className="text-5xl font-black mb-4">
            {isEs ? "Nuestra " : "Our "}
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFD700] bg-clip-text text-transparent">
              {isEs ? "Historia" : "Story"}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {isEs
              ? "Somos un grupo de estudiantes hispanos de primera generación en Kennesaw State University. Muchos de nosotros venimos de familias inmigrantes, y eso lo llevamos con orgullo."
              : "We are a group of first-generation Hispanic students at Kennesaw State University. Many of us come from immigrant families, and we carry that with pride."}
          </p>
        </div>

        {/* Where it came from */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            {isEs
              ? "De dónde viene esta idea"
              : "Where this idea came from"}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            {isEs
              ? "Casa Abierta no empezó en una sala de conferencias ni en una incubadora. Empezó en conversaciones que muchos de nosotros hemos tenido toda la vida, con padres que no entendían por qué su factura eléctrica era tan alta, con tías que pagaban de más por el teléfono porque nadie les explicó las opciones, con abuelos que no sabían que existían programas de asistencia para sus servicios."
              : "Casa Abierta didn't start in a conference room or an incubator. It started in conversations many of us have had our whole lives, with parents who didn't understand why their electricity bill was so high, with aunts who overpaid for phone service because nobody explained their options, with grandparents who didn't know assistance programs existed."}
          </p>
          <p className="text-gray-300 leading-relaxed">
            {isEs
              ? "Cuando llegamos a la universidad y empezamos a estudiar ingeniería y computación, algo hizo clic: teníamos las herramientas para hacer algo al respecto. No para convertirnos en una empresa, sino para ayudar a las comunidades de las que venimos, empezando por las nuestras."
              : "When we got to college and started studying engineering and computer science, something clicked: we had the tools to do something about it. Not to become a company, but to help the communities we come from, starting with our own."}
          </p>
        </div>

        {/* The problem in numbers */}
        <div className="mb-10">
          <h2 className="text-2xl font-black text-white mb-2">
            {isEs
              ? "El Problema en Números"
              : "The Problem in Numbers"}
          </h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            {isEs
              ? "Las comunidades hispanas en Estados Unidos enfrentan una brecha sistemática en el acceso a servicios de utilidad asequibles. Los datos son claros:"
              : "Hispanic communities across the United States face a systemic gap in access to affordable utility services. The data is stark:"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              {
                icon: "⚡",
                category: isEs
                  ? "ENERGÍA ELÉCTRICA"
                  : "ELECTRICITY",
                stat: "~30%",
                color: "border-yellow-500/30 bg-yellow-500/5",
                textColor: "text-yellow-400",
                detail: isEs
                  ? "Los hogares hispanos gastan aproximadamente un 30% más de sus ingresos en energía eléctrica en comparación con hogares blancos no hispanos, según el Departamento de Energía de EE.UU. (2023). En cifras absolutas, esto representa $300–$500 adicionales al año para una familia de ingresos medios."
                  : "Hispanic households spend approximately 30% more of their income on electricity compared to non-Hispanic white households, per the U.S. Department of Energy (2023). In real dollars, that is $300–$500 extra per year for a median-income family.",
              },
              {
                icon: "💧",
                category: isEs ? "AGUA" : "WATER",
                stat: "22%",
                color: "border-blue-500/30 bg-blue-500/5",
                textColor: "text-blue-400",
                detail: isEs
                  ? "Un estudio del Pacific Institute (2022) encontró que las comunidades latinas en California pagan un 22% más por el agua que comunidades blancas con niveles similares de uso, en parte porque las ciudades con altas concentraciones hispanas tienen infraestructuras más antiguas con tarifas de mantenimiento más altas."
                  : "A Pacific Institute study (2022) found that Latino communities in California pay 22% more for water than white communities with similar usage levels, partly because cities with high Hispanic populations have older infrastructure with higher maintenance surcharges.",
              },
              {
                icon: "📱",
                category: isEs
                  ? "TELÉFONO Y DATOS"
                  : "PHONE & DATA",
                stat: "$588/yr",
                color: "border-green-500/30 bg-green-500/5",
                textColor: "text-green-400",
                detail: isEs
                  ? "Según la Comisión Federal de Comunicaciones (FCC, 2023), los hogares hispanos son los menos propensos a beneficiarse del programa federal ACP, a pesar de ser elegibles. Las familias que no conocen el programa pagan en promedio $49 al mes de más, $588 al año."
                  : "According to the FCC (2023), Hispanic households are the least likely to benefit from the federal Affordable Connectivity Program despite being eligible. Families unaware of the program pay an average of $49/month extra, $588/year.",
              },
              {
                icon: "🏠",
                category: isEs
                  ? "CARGA TOTAL DE SERVICIOS"
                  : "TOTAL UTILITY BURDEN",
                stat: "8.1%",
                color: "border-red-500/30 bg-red-500/5",
                textColor: "text-red-400",
                detail: isEs
                  ? 'El ACEEE clasifica a las familias hispanas como las más "burden-heavy" en Estados Unidos cuando se trata de servicios públicos: gastan el 8.1% de sus ingresos totales en energía sola, comparado con el 3% de hogares de altos ingresos. Sumando agua y telecomunicaciones, la carga puede superar el 12% del ingreso familiar.'
                  : 'The ACEEE ranks Hispanic families as the most "burden-heavy" in the U.S. for utilities: they spend 8.1% of total income on energy alone, compared to 3% for high-income households. When water and telecom are added, the burden can exceed 12% of household income.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`border rounded-2xl p-6 ${item.color}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {item.category}
                    </p>
                    <p
                      className={`text-3xl font-black ${item.textColor}`}
                    >
                      {item.stat}
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Structural barriers */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            {isEs
              ? "¿Por Qué Sucede Esto?"
              : "Why Does This Happen?"}
          </h2>
          <div className="space-y-5">
            {[
              {
                title: isEs
                  ? "Barreras de idioma"
                  : "Language barriers",
                desc: isEs
                  ? "El 41% de los adultos hispanos en EE.UU. hablan español en el hogar como idioma principal (Pew Research, 2023). Las compañías de servicios rara vez ofrecen materiales de comparación de tarifas o procesos de inscripción en español, lo que hace que muchas familias se queden con el plan predeterminado, a menudo el más caro."
                  : "41% of Hispanic adults in the U.S. speak Spanish as their primary home language (Pew Research, 2023). Utility companies rarely offer rate comparison materials or enrollment processes in Spanish, causing many families to stay on the default plan, often the most expensive one.",
              },
              {
                title: isEs
                  ? "Falta de acceso a crédito"
                  : "Limited credit access",
                desc: isEs
                  ? "Muchos inmigrantes recientes no tienen historial crediticio en EE.UU. Los proveedores de energía y telecomunicaciones frecuentemente requieren depósitos de seguridad de $100–$500 para cuentas nuevas sin crédito, lo que encarece el costo inicial y puede llevar a las familias a elegir planes prepago con tarifas más altas."
                  : "Many recent immigrants have no U.S. credit history. Energy and telecom providers frequently require security deposits of $100–$500 for new accounts without credit, raising the upfront cost of service and often pushing families toward prepaid plans with higher per-minute rates.",
              },
              {
                title: isEs
                  ? "Vivienda precaria y caseros negligentes"
                  : "Precarious housing and negligent landlords",
                desc: isEs
                  ? "Las familias hispanas tienen mayor probabilidad de vivir en viviendas antiguas con aislamiento deficiente, electrodomésticos ineficientes y sistemas de calefacción obsoletos. En muchos casos, los caseros son legalmente responsables de las actualizaciones pero no las realizan. Los inquilinos terminan pagando facturas más altas sin poder cambiar la situación."
                  : "Hispanic families are more likely to live in older housing with poor insulation, inefficient appliances, and outdated heating/cooling systems. In many cases, landlords are legally responsible for upgrades but fail to make them. Tenants end up paying higher bills with no ability to change the situation.",
              },
              {
                title: isEs
                  ? "Desconocimiento de programas de asistencia"
                  : "Lack of awareness of assistance programs",
                desc: isEs
                  ? "Existen más de 30 programas federales y estatales que ayudan a familias de bajos ingresos con facturas de energía, agua y telefonía. Según el ACEEE, solo el 20% de los hogares elegibles hispanos los aprovechan, en gran parte por falta de información en español y procesos de solicitud complicados."
                  : "Over 30 federal and state programs exist to help low-income families with energy, water, and phone bills. According to the ACEEE, only 20% of eligible Hispanic households take advantage of them, largely due to lack of Spanish-language information and complex application processes.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-[#FF6B35] mt-2 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white mb-1">
                    {item.title}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why us */}
        <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#C1292E]/5 border border-[#FF6B35]/20 rounded-3xl p-8 mb-10">
          <h2 className="text-3xl font-black text-white mb-4">
            {isEs ? "¿Por qué nosotros?" : "Why us?"}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            {isEs
              ? "Porque lo vivimos. Somos hijos e hijas de familias que llegaron a este país con muy poco y construyeron algo desde cero. Muchos de nuestros padres trabajaron turnos dobles, mandaron remesas, y aun así terminaban el mes pagando más de lo que debían por servicios básicos, no por gastar de más, sino porque el sistema estaba diseñado para que no lo supieran."
              : "Because we lived it. We are sons and daughters of families who came to this country with very little and built something from nothing. Many of our parents worked double shifts, sent remittances home, and still ended the month overpaying for basic services, not from overspending, but because the system was designed to keep them from knowing better."}
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            {isEs
              ? "Esa experiencia es lo que hace que este proyecto sea personal. No estamos construyendo esto para un portafolio ni para una clase, lo estamos construyendo porque conocemos a las personas que necesitan esta herramienta. Son nuestra familia."
              : "That experience is what makes this project personal. We are not building this for a portfolio or a class, we are building it because we know the people who need this tool. They are our family."}
          </p>
          <p className="text-[#FF6B35] font-bold text-lg">
            {isEs
              ? "Casa Abierta es lo que nosotros hubiéramos querido que existiera cuando éramos niños."
              : "Casa Abierta is what we would have wanted to exist when we were growing up."}
          </p>
        </div>

        {/* Closing */}
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            {
              val: "12K+",
              label: isEs
                ? "Familias Ayudadas"
                : "Families Helped",
            },
            {
              val: "$2.4M",
              label: isEs
                ? "Ahorrado Colectivamente"
                : "Collectively Saved",
            },
            {
              val: "8",
              label: isEs
                ? "Idiomas Apoyados"
                : "Languages Supported",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-[#111] border border-gray-800 rounded-2xl p-6"
            >
              <p className="text-4xl font-black text-[#FF6B35] mb-1">
                {s.val}
              </p>
              <p className="text-gray-500 text-sm font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BATTERY STORAGE PAGE ─────────────────────────────────────────
function BatteryStoragePage({ onBack, lang }) {
  const isEs = lang === "es";
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> {isEs ? "Atrás" : "Back"}
        </button>
        <div className="w-px h-5 bg-gray-700" />
        <span className="font-semibold">
          {isEs
            ? "Almacenamiento de Baterías"
            : "Battery Storage"}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-14 text-center">
          <div className="text-6xl mb-6">🔋</div>
          <h1 className="text-5xl font-black mb-4">
            {isEs ? "Almacenamiento de " : "Home Battery "}
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFD700] bg-clip-text text-transparent">
              {isEs ? "Energía en Casa" : "Storage"}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {isEs
              ? "Una batería residencial convierte tu hogar en una microrred inteligente, independiente, resiliente y más económica."
              : "A home battery turns your house into a smart microgrid, independent, resilient, and less expensive to run."}
          </p>
        </div>

        {/* What is it */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-black text-white mb-4">
            {isEs
              ? "¿Qué es una batería residencial?"
              : "What is a home battery?"}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            {isEs
              ? "Una batería de almacenamiento residencial es un sistema de baterías de litio que se instala en tu hogar y almacena energía eléctrica para usarla más tarde. Funciona de manera similar a la batería de un teléfono inteligente, pero a escala doméstica. Puede cargarse desde paneles solares instalados en el techo, desde la red eléctrica durante horas de tarifa baja, o desde ambas fuentes al mismo tiempo."
              : "A home storage battery is a lithium-ion battery system installed in your home that stores electrical energy for later use. It works similarly to a smartphone battery, but at a household scale. It can charge from rooftop solar panels, from the grid during low-rate hours, or from both sources simultaneously."}
          </p>
          <p className="text-gray-300 leading-relaxed">
            {isEs
              ? "Las baterías residenciales más comunes en el mercado incluyen el Tesla Powerwall (13.5 kWh), el Enphase IQ Battery (10.08 kWh), el LG RESU (9.3 kWh) y el sonnen eco (10–20 kWh). La mayoría puede instalarse en exteriores o interiores, tiene una vida útil de 10–15 años y viene con garantía de 10 años."
              : "The most common home batteries on the market include the Tesla Powerwall (13.5 kWh), Enphase IQ Battery (10.08 kWh), LG RESU (9.3 kWh), and sonnen eco (10–20 kWh). Most can be installed indoors or outdoors, have a lifespan of 10–15 years, and come with a 10-year warranty."}
          </p>
        </div>

        {/* How it works */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-black text-white mb-4">
            {isEs ? "¿Cómo funciona?" : "How does it work?"}
          </h2>
          <div className="space-y-5">
            {[
              {
                step: "1",
                title: isEs
                  ? "Carga durante el día o en horas valle"
                  : "Charges during the day or off-peak hours",
                desc: isEs
                  ? "Si tienes paneles solares, la batería se carga automáticamente con la energía excedente generada durante las horas de mayor producción solar (generalmente entre las 10 a.m. y las 3 p.m.). Si no tienes solar, la batería puede programarse para cargarse de la red durante las horas de tarifa más baja, típicamente entre medianoche y las 6 a.m. en la mayoría de las tarifas de tiempo de uso (TOU)."
                  : "If you have solar panels, the battery charges automatically with surplus energy generated during peak solar hours (typically 10 a.m.–3 p.m.). If you have no solar, the battery can be programmed to charge from the grid during the lowest-rate hours, typically midnight to 6 a.m. under most time-of-use (TOU) rate plans.",
              },
              {
                step: "2",
                title: isEs
                  ? "Descarga cuando la energía es más cara"
                  : "Discharges when energy is most expensive",
                desc: isEs
                  ? "Durante las horas pico de la tarde y noche, cuando las tarifas eléctricas son más altas y la red está más congestionada, la batería descarga su energía almacenada para alimentar tu hogar. Esto te permite evitar comprar electricidad cara de la red cuando más se necesita, reduciendo significativamente tu factura mensual incluso sin paneles solares."
                  : "During peak afternoon and evening hours, when electricity rates are highest and the grid is most congested, the battery discharges its stored energy to power your home. This lets you avoid buying expensive grid electricity at peak demand times, significantly reducing your monthly bill even without solar panels.",
              },
              {
                step: "3",
                title: isEs
                  ? "Respaldo automático en apagones"
                  : "Automatic backup during outages",
                desc: isEs
                  ? "Cuando detecta un corte de energía, la batería se activa en milisegundos para mantener encendidos los circuitos críticos de tu hogar, refrigerador, luces, enrutador WiFi, dispositivos médicos. Dependiendo del modelo y la capacidad, una batería completamente cargada puede alimentar un hogar promedio durante 8 a 24 horas. Con solar+batería, en teoría puedes operar indefinidamente durante el día."
                  : "When it detects a power outage, the battery activates within milliseconds to keep critical circuits in your home running, refrigerator, lights, WiFi router, medical devices. Depending on the model and capacity, a fully charged battery can power an average home for 8–24 hours. With solar+battery, you can theoretically operate indefinitely during daylight hours.",
              },
              {
                step: "4",
                title: isEs
                  ? "Participación en programas de respuesta a la demanda"
                  : "Participation in demand response programs",
                desc: isEs
                  ? 'Muchas compañías eléctricas y programas estatales pagan a los propietarios de baterías para que "exporten" energía de vuelta a la red durante emergencias o picos de demanda extrema. En California, el programa Virtual Power Plant de PG&E puede pagarte hasta $2 por kWh exportado. En Texas, ERCOT tiene programas similares que pueden generar $100–$500 anuales adicionales para propietarios de baterías.'
                  : "Many utility companies and state programs pay battery owners to 'export' stored energy back to the grid during emergencies or extreme demand peaks. In California, PG&E's Virtual Power Plant program can pay you up to $2/kWh exported. In Texas, ERCOT has similar programs that can generate an additional $100–$500 annually for battery owners.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35]/40 flex items-center justify-center text-[#FF6B35] font-black text-sm flex-shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <p className="font-bold text-white mb-1">
                    {item.title}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial case */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-white mb-4">
            {isEs ? "El caso financiero" : "The financial case"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                val: "$10,000–$15,000",
                label: isEs
                  ? "Costo instalado promedio (con solar)"
                  : "Avg installed cost (with solar)",
                color: "text-gray-300",
              },
              {
                val: "30%",
                label: isEs
                  ? "Crédito fiscal federal ITC (2024)"
                  : "Federal ITC tax credit (2024)",
                color: "text-green-400",
              },
              {
                val: isEs ? "6–10 años" : "6–10 years",
                label: isEs
                  ? "Período típico de recuperación"
                  : "Typical payback period",
                color: "text-[#FF6B35]",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-[#111] border border-gray-800 rounded-2xl p-5 text-center"
              >
                <p
                  className={`text-2xl font-black mb-1 ${s.color}`}
                >
                  {s.val}
                </p>
                <p className="text-xs text-gray-500 font-medium leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-3">
              {isEs
                ? "El costo de instalación de una batería residencial (sin solar) oscila entre $8,000 y $12,000 incluyendo mano de obra. Con paneles solares, el paquete completo suele costar entre $25,000 y $40,000 antes de incentivos. Después de aplicar el Crédito Fiscal de Inversión (ITC) federal del 30%, muchos estados añaden sus propios incentivos adicionales:"
                : "Battery installation costs (without solar) range from $8,000–$12,000 including labor. With solar panels, the full package typically costs $25,000–$40,000 before incentives. After applying the 30% federal Investment Tax Credit (ITC), many states add their own additional incentives:"}
            </p>
            <ul className="space-y-2">
              {[
                isEs
                  ? "🌞 California: SGIP (Self-Generation Incentive Program), hasta $500/kWh instalado para comunidades de bajos ingresos"
                  : "🌞 California: SGIP (Self-Generation Incentive Program), up to $500/kWh installed for low-income communities",
                isEs
                  ? "🌵 Arizona: crédito fiscal estatal de hasta $1,000 por sistema de baterías residenciales"
                  : "🌵 Arizona: state tax credit of up to $1,000 per residential battery system",
                isEs
                  ? "⭐ Texas: sin impuesto sobre ventas en sistemas de energía solar y baterías (exención del 6.25%)"
                  : "⭐ Texas: no sales tax on solar energy and battery systems (6.25% exemption)",
                isEs
                  ? "🍊 Florida: exención del impuesto sobre la propiedad para mejoras de energía solar, el valor añadido de la batería no eleva tu impuesto predial"
                  : "🍊 Florida: property tax exemption for solar energy improvements, added battery value does not raise your property tax",
              ].map((item, i) => (
                <li key={i} className="text-gray-400 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Is it right for you */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-black text-white mb-4">
            {isEs
              ? "¿Es la batería adecuada para ti?"
              : "Is a battery right for you?"}
          </h2>
          <p className="text-gray-400 mb-5 leading-relaxed">
            {isEs
              ? "Una batería residencial tiene más sentido en los siguientes escenarios. Cuantas más casillas marques, mayor será tu retorno de inversión:"
              : "A home battery makes the most financial sense in the following scenarios. The more boxes you check, the stronger your return on investment:"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              isEs
                ? "✅ Vives en una zona con apagones frecuentes"
                : "✅ You live in an area with frequent outages",
              isEs
                ? "✅ Tu tarifa eléctrica tiene precios por hora de uso (TOU)"
                : "✅ Your electricity rate has time-of-use (TOU) pricing",
              isEs
                ? "✅ Ya tienes o estás considerando instalar paneles solares"
                : "✅ You already have or are considering solar panels",
              isEs
                ? "✅ Tu factura de luz supera los $150/mes"
                : "✅ Your electricity bill exceeds $150/month",
              isEs
                ? "✅ Tienes dispositivos médicos que requieren energía continua"
                : "✅ You have medical devices that require continuous power",
              isEs
                ? "✅ Eres propietario de vivienda (no inquilino)"
                : "✅ You are a homeowner (not a renter)",
              isEs
                ? "✅ Tienes acceso a incentivos estatales o locales"
                : "✅ You have access to state or local incentives",
              isEs
                ? "✅ Quieres reducir tu huella de carbono"
                : "✅ You want to reduce your carbon footprint",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] rounded-xl p-3 text-sm text-gray-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Environmental impact */}
        <div className="bg-green-500/5 border border-green-500/20 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Leaf size={24} className="text-green-400" />
            <h2 className="text-2xl font-black text-white">
              {isEs
                ? "Impacto ambiental"
                : "Environmental impact"}
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-4">
            {isEs
              ? "Un hogar que combina paneles solares con una batería residencial puede reducir sus emisiones de CO₂ entre 1.5 y 3.5 toneladas al año, dependiendo de la región y el mix energético de la red local. A lo largo de la vida útil del sistema (15–20 años), esto equivale a plantar entre 750 y 1,750 árboles."
              : "A home combining solar panels with a residential battery can reduce CO₂ emissions by 1.5–3.5 tons per year, depending on the region and the local grid energy mix. Over the system lifespan (15–20 years), this is equivalent to planting 750–1,750 trees."}
          </p>
          <p className="text-gray-300 leading-relaxed">
            {isEs
              ? "A medida que más hogares adoptan almacenamiento de energía, la red eléctrica en su conjunto se vuelve más estable y necesita quemar menos combustibles fósiles durante los picos de demanda, lo que beneficia no solo al propietario de la batería, sino a toda la comunidad."
              : "As more homes adopt energy storage, the electrical grid as a whole becomes more stable and needs to burn fewer fossil fuels during demand peaks, benefiting not just the battery owner, but the entire community."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── CONSERVATION TIPS PAGE ───────────────────────────────────────
function ConservationTipsPage({ onBack, lang }) {
  const isEs = lang === "es";
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      icon: "🚿",
      title: isEs ? "Baño y ducha" : "Bathroom & shower",
      savings: isEs
        ? "Ahorro potencial: $100–$200/año"
        : "Potential savings: $100–$200/yr",
      tips: isEs
        ? [
            {
              title:
                "Instala una cabeza de ducha de bajo flujo",
              desc: "Las alcachofas estándar usan 2.5 galones por minuto (GPM). Las de bajo flujo WaterSense usan 1.5–2.0 GPM sin reducir la presión perceptiblemente. Para una familia que ducha 4 veces al día, esto equivale a ahorrar hasta 7,300 galones al año. El costo de instalación es de $20–$60 y se recupera en menos de 3 meses.",
            },
            {
              title: "Reduce el tiempo de ducha a 5 minutos",
              desc: "Cada minuto de ducha usa entre 2 y 2.5 galones de agua. Pasar de una ducha promedio de 8 minutos a 5 minutos ahorra entre 1,000 y 2,000 galones al año por persona. Un temporizador de ducha de $5 o una playlist de canciones de 5 minutos puede ser suficiente para crear el hábito.",
            },
            {
              title: "Repara fugas en grifos y toilets",
              desc: "Un grifo que gotea una vez por segundo desperdicia 3,000 galones al año. Un toilet con la válvula de descarga defectuosa puede desperdiciar entre 200 y 2,000 galones al día, silenciosamente. Para detectar fugas en el toilet, agrega unas gotas de colorante alimentario al tanque: si aparece color en el tazón sin halar la palanca, tienes una fuga. La mayoría de las reparaciones cuestan menos de $10 en piezas.",
            },
            {
              title:
                "No dejes correr el agua mientras te cepillas los dientes",
              desc: "Dejar el grifo abierto durante el cepillado de 2 minutos desperdicia entre 4 y 8 galones de agua. Multiplicado por 2 cepillados al día para 4 personas, eso es hasta 23,000 galones al año, el equivalente a casi medio año de duchas.",
            },
            {
              title:
                "Recoge el agua fría de la ducha mientras calienta",
              desc: "El agua que corre antes de que alcance la temperatura deseada puede ser de 1 a 3 galones por ducha. Recójala con un balde y úsala para regar plantas de interior, llenar el recipiente del perro o remojar ropa. Simple y con impacto real.",
            },
          ]
        : [
            {
              title: "Install a low-flow showerhead",
              desc: "Standard showerheads use 2.5 gallons per minute (GPM). WaterSense low-flow models use 1.5–2.0 GPM with no noticeable pressure loss. For a family of 4 showering daily, this saves up to 7,300 gallons per year. Installation costs $20–$60 and pays back in under 3 months.",
            },
            {
              title: "Shorten showers to 5 minutes",
              desc: "Every minute of showering uses 2–2.5 gallons. Going from an 8-minute to a 5-minute shower saves 1,000–2,000 gallons per year per person. A $5 shower timer or a 5-minute playlist is all it takes to build the habit.",
            },
            {
              title: "Fix faucet and toilet leaks immediately",
              desc: "A faucet dripping once per second wastes 3,000 gallons per year. A toilet with a faulty flapper can silently waste 200–2,000 gallons per day. To detect toilet leaks, add a few drops of food coloring to the tank: if color appears in the bowl without flushing, you have a leak. Most repairs cost under $10 in parts.",
            },
            {
              title: "Turn off water while brushing teeth",
              desc: "Leaving the faucet running during a 2-minute brush wastes 4–8 gallons of water. Multiplied by 2 brushings per day for 4 people, that is up to 23,000 gallons per year, the equivalent of nearly six months of showers.",
            },
            {
              title:
                "Collect cold shower water while waiting for it to heat",
              desc: "The water that runs before reaching your preferred temperature can be 1–3 gallons per shower. Collect it in a bucket and use it to water indoor plants, fill pet bowls, or soak laundry. Simple to implement with real impact.",
            },
          ],
    },
    {
      icon: "🌿",
      title: isEs ? "Jardín y exterior" : "Lawn & outdoor",
      savings: isEs
        ? "Ahorro potencial: $150–$400/año"
        : "Potential savings: $150–$400/yr",
      tips: isEs
        ? [
            {
              title: "Riega en las horas de menor evaporación",
              desc: "Regar entre las 5 a.m. y las 9 a.m. reduce la pérdida por evaporación hasta en un 30% comparado con regar al mediodía. El viento también es más calmado a primera hora, lo que significa menos agua perdida a la deriva. Si usas aspersores, considera cambiar a riego por goteo, que puede ahorrar hasta 50% más de agua al llevar el agua directamente a las raíces.",
            },
            {
              title:
                "Instala un controlador inteligente de riego",
              desc: "Los controladores de riego con sensores de humedad del suelo o datos meteorológicos (como Rachio, RainBird Smart o Hunter Hydrawise) ajustan automáticamente el riego según las condiciones reales, evitando regar después de una lluvia o durante días de alta humedad. Los estudios de la EPA WaterSense muestran que estos sistemas ahorran en promedio 8,700 galones al año por hogar.",
            },
            {
              title: "Cubre el suelo con mantillo (mulch)",
              desc: "Aplicar 3 pulgadas de mantillo orgánico (astillas de madera, compost, hojas) alrededor de árboles, arbustos y camas de flores retiene la humedad del suelo, reduciendo la frecuencia de riego hasta en un 50%. También suprime las malas hierbas que compiten con las plantas por agua, y mejora la estructura del suelo con el tiempo.",
            },
            {
              title:
                "Elige plantas nativas o resistentes a la sequía",
              desc: "Las plantas nativas de tu región están adaptadas naturalmente al clima y a los patrones de lluvia locales. Una vez establecidas (generalmente después del primer año), muchas requieren poco o ningún riego suplementario. La sustitución del 50% del césped tradicional por plantas nativas puede reducir el consumo de agua exterior hasta en un 60% en climas áridos.",
            },
            {
              title:
                "Recoge agua de lluvia con barriles o cisternas",
              desc: "Un barril de lluvia de 55 galones ($30–$80) conectado al bajante de tu techo puede capturar el agua de una tormenta de 1 pulgada sobre 1,000 pies cuadrados de techo, eso es más de 600 galones de agua de riego gratuita. En estados como Texas, Tennessee y Ohio, la recolección de agua de lluvia es legal y en algunos casos tiene incentivos fiscales.",
            },
          ]
        : [
            {
              title: "Water during low-evaporation hours",
              desc: "Watering between 5–9 a.m. reduces evaporation loss by up to 30% compared to midday watering. Wind is also calmer early in the morning, meaning less water lost to drift. If using sprinklers, consider switching to drip irrigation, which delivers water directly to roots and can save an additional 50% of outdoor water use.",
            },
            {
              title: "Install a smart irrigation controller",
              desc: "Smart irrigation controllers with soil moisture sensors or weather data (like Rachio, RainBird Smart, or Hunter Hydrawise) automatically adjust watering schedules based on actual conditions, skipping cycles after rainfall or on high-humidity days. EPA WaterSense studies show these systems save an average of 8,700 gallons per household per year.",
            },
            {
              title: "Cover soil with mulch",
              desc: "Applying 3 inches of organic mulch (wood chips, compost, leaves) around trees, shrubs, and flower beds retains soil moisture and can reduce watering frequency by up to 50%. Mulch also suppresses weeds that compete with plants for water and improves soil structure over time.",
            },
            {
              title:
                "Choose native or drought-resistant plants",
              desc: "Native plants are naturally adapted to your regional climate and rainfall patterns. Once established (usually after the first year), many require little or no supplemental irrigation. Replacing 50% of traditional lawn with native plants can reduce outdoor water use by up to 60% in dry climates.",
            },
            {
              title:
                "Collect rainwater with barrels or cisterns",
              desc: "A 55-gallon rain barrel ($30–$80) connected to a downspout can capture the runoff from a 1-inch storm over 1,000 square feet of roof, that is over 600 gallons of free irrigation water. In states like Texas, Tennessee, and Ohio, rainwater collection is legal and in some cases carries tax incentives.",
            },
          ],
    },
    {
      icon: "🍽️",
      title: isEs ? "Cocina y lavandería" : "Kitchen & laundry",
      savings: isEs
        ? "Ahorro potencial: $75–$150/año"
        : "Potential savings: $75–$150/yr",
      tips: isEs
        ? [
            {
              title:
                "Usa el lavavajillas en lugar de lavar a mano",
              desc: "Sorprendentemente, un lavavajillas moderno con certificación Energy Star usa solo 3 galones por ciclo. Lavar la misma cantidad de platos a mano puede requerir entre 9 y 27 galones si dejas el agua correr. La clave: llena el lavavajillas completamente antes de encenderlo y usa el ciclo de ahorro de energía, que también consume menos agua caliente.",
            },
            {
              title: "Lava ropa en agua fría",
              desc: "Aproximadamente el 90% de la energía que usa una lavadora va a calentar el agua. Lavar en agua fría es igual de efectivo para la ropa moderadamente sucia y extiende la vida útil de la tela. Detergentes modernos como Tide Coldwater están específicamente formulados para agua fría. Cambiar de agua caliente a fría puede ahorrar $100–$150 al año solo en costos de energía.",
            },
            {
              title:
                "Solo carga llena en lavadora y lavavajillas",
              desc: 'Una lavadora de carga frontal usa entre 15 y 30 galones por ciclo. Si lavas media carga dos veces en lugar de una carga completa, duplicas tu uso de agua y energía. Espera siempre a tener una carga completa. Si necesitas lavar menos ropa con frecuencia, ajusta el nivel de agua a "pequeño" o "mediano".',
            },
            {
              title: "Instala aireadores en grifos de cocina",
              desc: "Un grifo de cocina estándar fluye a 2.2 GPM. Un aireador WaterSense ($5–$15) reduce el flujo a 1.5 GPM o menos sin reducir la presión de lavado percibida. Para un hogar que usa el grifo de cocina 10 minutos al día, esto ahorra más de 2,500 galones al año. La instalación tarda menos de 5 minutos con una llave ajustable.",
            },
            {
              title:
                "Descongela alimentos en el refrigerador, no bajo el agua",
              desc: "Descongelar alimentos bajo el agua corriente puede consumir entre 2 y 10 galones innecesariamente. Planificar con anticipación y descongelar en el refrigerador durante la noche es más seguro desde el punto de vista de la inocuidad alimentaria y elimina completamente este desperdicio de agua.",
            },
          ]
        : [
            {
              title:
                "Use the dishwasher instead of hand washing",
              desc: "Surprisingly, a modern Energy Star dishwasher uses only 3 gallons per cycle. Washing the same dishes by hand with running water can require 9–27 gallons. The key: run the dishwasher only when fully loaded and use the energy-saving cycle, which also uses less hot water.",
            },
            {
              title: "Wash laundry in cold water",
              desc: "About 90% of the energy a washing machine uses goes to heating water. Cold water washing is equally effective for moderately soiled clothes and extends fabric life. Modern detergents like Tide Coldwater are specifically formulated for cold water. Switching from hot to cold can save $100–$150 per year in energy costs alone.",
            },
            {
              title:
                "Only run full loads in washer and dishwasher",
              desc: 'A front-load washer uses 15–30 gallons per cycle. Running two half-loads instead of one full load doubles your water and energy use. Always wait for a full load. If you need to wash less frequently, adjust the water level setting to "small" or "medium."',
            },
            {
              title: "Install faucet aerators in the kitchen",
              desc: "A standard kitchen faucet flows at 2.2 GPM. A WaterSense aerator ($5–$15) reduces flow to 1.5 GPM or less without noticeably reducing washing pressure. For a household using the kitchen faucet 10 minutes per day, this saves over 2,500 gallons per year. Installation takes under 5 minutes with an adjustable wrench.",
            },
            {
              title:
                "Thaw food in the refrigerator, not under running water",
              desc: "Thawing food under running water can waste 2–10 gallons unnecessarily. Planning ahead and thawing in the refrigerator overnight is safer from a food safety standpoint and eliminates this water waste entirely.",
            },
          ],
    },
    {
      icon: "💸",
      title: isEs
        ? "Programas de asistencia y reembolsos"
        : "Assistance programs & rebates",
      savings: isEs
        ? "Ahorro potencial: $200–$1,500 (pago único)"
        : "Potential savings: $200–$1,500 (one-time)",
      tips: isEs
        ? [
            {
              title:
                "WaterSense de la EPA, reembolsos por electrodomésticos eficientes",
              desc: "El programa WaterSense de la EPA certifica productos de plomería eficientes (toilets, duchas, grifos, irrigación) y publica una base de datos de más de 2,500 productos. Muchas compañías de agua locales ofrecen reembolsos de $50–$200 por la compra de inodoros WaterSense certificados. Visita epa.gov/watersense para encontrar reembolsos disponibles en tu código postal.",
            },
            {
              title:
                "LIHEAP, Programa de Asistencia de Energía para Hogares de Bajos Ingresos",
              desc: "LIHEAP es un programa federal que ayuda a familias de bajos ingresos a pagar facturas de calefacción y refrigeración. Los límites de elegibilidad son de hasta el 150% del nivel de pobreza federal (aproximadamente $43,000 al año para una familia de 4). En el año fiscal 2023, el programa distribuyó más de $6,300 millones a nivel nacional. Solicita en tu agencia de acción comunitaria local o en benefits.gov.",
            },
            {
              title: "Weatherization Assistance Program (WAP)",
              desc: "El Departamento de Energía de EE.UU. financia mejoras gratuitas de eficiencia energética para hogares de bajos ingresos a través del WAP. Las mejoras típicas incluyen aislamiento, sellado de grietas de aire, actualizaciones de sistemas de calefacción/refrigeración y sustitución de ventanas. En promedio, los hogares participantes reducen su consumo de energía en un 25% y sus facturas en $283 al año. Sin costo para el propietario elegible.",
            },
            {
              title: "Programas CARE/FERA en California",
              desc: "Los programas CARE (California Alternate Rates for Energy) y FERA (Family Electric Rate Assistance) ofrecen descuentos del 20–35% en facturas de gas y electricidad para hogares elegibles. Se estima que más de 3 millones de hogares califican pero no están inscritos. Para verificar elegibilidad y aplicar, llama a tu compañía de electricidad o visita su sitio web, el proceso toma menos de 10 minutos.",
            },
            {
              title: "Programa de Conectividad Asequible (ACP)",
              desc: "Aunque el programa federal ACP finalizó en 2024, muchos estados y proveedores locales continúan programas similares. Además, el programa Lifeline del gobierno federal ofrece un descuento de $9.25/mes en servicios de internet o teléfono para hogares que participan en programas como Medicaid, SNAP, o SSI. Pregunta a Casa Abierta sobre las opciones disponibles en tu área.",
            },
          ]
        : [
            {
              title:
                "EPA WaterSense, rebates for efficient fixtures",
              desc: "The EPA's WaterSense program certifies efficient plumbing products (toilets, showers, faucets, irrigation) and publishes a database of 2,500+ certified products. Many local water utilities offer rebates of $50–$200 for certified WaterSense toilets. Visit epa.gov/watersense to find rebates available in your zip code.",
            },
            {
              title:
                "LIHEAP, Low Income Home Energy Assistance Program",
              desc: "LIHEAP is a federal program that helps low-income families pay heating and cooling bills. Eligibility thresholds are up to 150% of the federal poverty level (roughly $43,000/year for a family of 4). In fiscal year 2023, the program distributed over $6.3 billion nationally. Apply through your local community action agency or at benefits.gov.",
            },
            {
              title: "Weatherization Assistance Program (WAP)",
              desc: "The U.S. Department of Energy funds free energy efficiency upgrades for low-income homes through WAP. Typical improvements include insulation, air sealing, heating/cooling system upgrades, and window replacements. On average, participating homes reduce energy consumption by 25% and bills by $283/year. No cost to eligible homeowners.",
            },
            {
              title: "CARE/FERA Programs in California",
              desc: "The CARE (California Alternate Rates for Energy) and FERA (Family Electric Rate Assistance) programs offer 20–35% discounts on gas and electricity bills for eligible households. It is estimated that over 3 million qualifying households are not enrolled. To check eligibility and apply, call your electric company or visit their website, the process takes under 10 minutes.",
            },
            {
              title: "Affordable Connectivity Program (ACP)",
              desc: "While the federal ACP ended in 2024, many states and local providers continue similar programs. Additionally, the federal Lifeline program offers a $9.25/month discount on internet or phone service for households participating in programs like Medicaid, SNAP, or SSI. Ask Casa Abierta about available options in your area.",
            },
          ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> {isEs ? "Atrás" : "Back"}
        </button>
        <div className="w-px h-5 bg-gray-700" />
        <span className="font-semibold">
          {isEs
            ? "Consejos de Conservación"
            : "Conservation Tips"}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-14 text-center">
          <div className="text-6xl mb-6">🌿</div>
          <h1 className="text-5xl font-black mb-4">
            {isEs ? "Conserva Agua, " : "Conserve Water, "}
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFD700] bg-clip-text text-transparent">
              {isEs ? "Ahorra Dinero" : "Save Money"}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {isEs
              ? "El hogar promedio en EE.UU. desperdicia el 30% de su agua. Estos cambios simples, ordenados por área y potencial de ahorro, pueden reducir tu factura de agua entre $300 y $700 al año."
              : "The average U.S. home wastes 30% of its water. These simple changes, organized by area and savings potential, can reduce your water bill by $300–$700 per year."}
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            {
              val: "300 gal",
              label: isEs
                ? "Uso diario promedio por hogar"
                : "Avg daily household use",
              color: "text-blue-400",
            },
            {
              val: "30%",
              label: isEs
                ? "Desperdiciado en fugas y exceso"
                : "Wasted in leaks & overuse",
              color: "text-red-400",
            },
            {
              val: "$1,100",
              label: isEs
                ? "Factura anual promedio de agua"
                : "Avg annual water bill",
              color: "text-gray-300",
            },
            {
              val: "$400",
              label: isEs
                ? "Ahorro posible con estos consejos"
                : "Achievable savings with tips",
              color: "text-green-400",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-[#111] border border-gray-800 rounded-2xl p-4 text-center"
            >
              <p
                className={`text-2xl font-black mb-1 ${s.color}`}
              >
                {s.val}
              </p>
              <p className="text-xs text-gray-500 leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Accordion sections */}
        <div className="space-y-4">
          {sections.map((section, si) => (
            <div
              key={si}
              className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenSection(openSection === si ? null : si)
                }
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#1a1a1a] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">
                    {section.icon}
                  </span>
                  <div>
                    <p className="font-bold text-white text-lg">
                      {section.title}
                    </p>
                    <p className="text-xs text-green-400 font-semibold mt-0.5">
                      {section.savings}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-gray-400 transition-transform flex-shrink-0 ${openSection === si ? "rotate-180" : ""}`}
                />
              </button>
              {openSection === si && (
                <div className="border-t border-gray-800 p-6 space-y-6">
                  {section.tips.map((tip, ti) => (
                    <div key={ti} className="flex gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35]/40 flex items-center justify-center text-[#FF6B35] font-black text-xs flex-shrink-0 mt-0.5">
                        {ti + 1}
                      </div>
                      <div>
                        <p className="font-bold text-white mb-1.5">
                          {tip.title}
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {tip.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-10 bg-gradient-to-br from-[#FF6B35]/10 to-[#C1292E]/5 border border-[#FF6B35]/20 rounded-3xl p-8 text-center">
          <p className="text-xl font-black text-white mb-3">
            {isEs
              ? "¿Quieres saber cuánto estás pagando de más ahora mismo?"
              : "Want to know how much you are overpaying right now?"}
          </p>
          <p className="text-gray-400 mb-5 leading-relaxed">
            {isEs
              ? "Sube tu factura de agua y te diremos exactamente dónde está el desperdicio, y qué alternativas existen en tu área."
              : "Upload your water bill and we will tell you exactly where the waste is, and what alternatives exist in your area."}
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-[#C1292E] text-white font-bold rounded-xl hover:shadow-lg transition-all text-sm">
            {isEs
              ? "Analizar mi factura de agua →"
              : "Analyze my water bill →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MEET THE TEAM PAGE ───────────────────────────────────────────
function MeetTheTeamPage({ onBack, lang }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isEs = lang === "es";
  const prev = () =>
    setActiveIndex(
      (i) => (i - 1 + teamMembers.length) % teamMembers.length,
    );
  const next = () =>
    setActiveIndex((i) => (i + 1) % teamMembers.length);
  const member = teamMembers[activeIndex];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> {isEs ? "Atrás" : "Back"}
        </button>
        <div className="w-px h-5 bg-gray-700" />
        <span className="font-semibold">
          {isEs ? "Conoce al Equipo" : "Meet the Team"}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-3">
            {isEs
              ? "Las Personas Detrás de"
              : "The People Behind"}{" "}
            <span className="text-[#FF6B35]">Casa Abierta</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {isEs
              ? "Estudiantes construyendo un futuro más sostenible para cada comunidad."
              : "Students building a more sustainable future for every community."}
          </p>
        </div>

        <div className="relative px-10">
          <div className="bg-[#111] border border-gray-800 rounded-3xl p-10 text-center">
            <div
              className={`w-28 h-28 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-4xl font-black text-white mx-auto mb-6 shadow-2xl`}
            >
              {member.initials}
            </div>
            <h2 className="text-3xl font-black text-white mb-1">
              {member.name}
            </h2>
            <p className="text-[#FF6B35] font-semibold mb-5">
              {member.role}
            </p>
            <div className="flex flex-col items-center gap-2 mb-8">
              <span className="px-4 py-1.5 bg-gray-800 rounded-full text-sm text-gray-300 font-medium">
                🎓 {member.major}
              </span>
              <span className="px-4 py-1.5 bg-gray-800 rounded-full text-sm text-gray-400">
                📍 {member.school}
              </span>
            </div>
            <div className="flex justify-center gap-2">
              {teamMembers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-[#FF6B35]" : "w-2 bg-gray-600 hover:bg-gray-400"}`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1a1a1a] border border-gray-700 rounded-full flex items-center justify-center text-white hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1a1a1a] border border-gray-700 rounded-full flex items-center justify-center text-white hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-14">
          <h3 className="text-sm font-bold text-gray-500 mb-5 uppercase tracking-wider text-center">
            {isEs
              ? "Todos los Colaboradores"
              : "All Contributors"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamMembers.map((m, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`p-4 rounded-2xl border transition-all text-left ${i === activeIndex ? "border-[#FF6B35] bg-[#FF6B35]/5" : "border-gray-800 bg-[#111] hover:border-gray-600"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-sm font-black text-white mb-3`}
                >
                  {m.initials}
                </div>
                <p className="text-sm font-bold text-white leading-tight">
                  {m.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {m.major}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ALTERNATIVES DATA ────────────────────────────────────────────
function getAlternatives(billType, overpaying, lang) {
  const es = lang === "es";
  const d = {
    energy: [
      {
        name: es
          ? "Participación Solar Comunitaria"
          : "Community Solar Share",
        saving: Math.round(overpaying * 0.6),
        icon: "☀️",
        reliability: 98,
        eco: 95,
        desc: es
          ? "Compra una participación en una granja solar local."
          : "Buy a share of a local solar farm, no panels needed.",
        why: es
          ? "Tu tarifa actual incluye cargos de infraestructura inflados."
          : "Your current rate includes inflated infrastructure fees. Community solar means you pay only for what's generated.",
        pros: es
          ? [
              "Sin instalación ni mantenimiento",
              "Energía 100% renovable",
              "Precios fijos y predecibles",
            ]
          : [
              "No installation or maintenance",
              "100% renewable energy",
              "Fixed, predictable pricing",
            ],
        cons: es
          ? [
              "Disponibilidad limitada por región",
              "Puede haber lista de espera",
            ]
          : [
              "Limited availability by region",
              "May have a waitlist",
            ],
      },
      {
        name: es
          ? "Energía Verde Directa"
          : "Green Power Direct",
        saving: Math.round(overpaying * 0.45),
        icon: "⚡",
        reliability: 97,
        eco: 88,
        desc: es
          ? "Energía 100% renovable a través de la red existente."
          : "100% renewable energy delivered through the existing grid.",
        why: es
          ? "Los proveedores de energía verde compran al por mayor."
          : "Green energy providers buy power wholesale and pass lower rates to you.",
        pros: es
          ? [
              "Fácil cambio de proveedor",
              "Sin hardware necesario",
            ]
          : ["Easy provider switch", "No hardware needed"],
        cons: es
          ? ["Ahorros menores que solar propio"]
          : ["Smaller savings than own solar"],
      },
      {
        name: es ? "Plan por Hora de Uso" : "Time-of-Use Plan",
        saving: Math.round(overpaying * 0.3),
        icon: "🕐",
        reliability: 99,
        eco: 60,
        desc: es
          ? "Mueve el uso intensivo a horas fuera de pico."
          : "Shift heavy usage to off-peak hours for significant savings.",
        why: es
          ? "Tu proveedor cobra tarifa plana independientemente del horario."
          : "Your current provider charges a flat rate regardless of when you use energy.",
        pros: es
          ? [
              "Sin cambio de proveedor",
              "Control total sobre tu factura",
            ]
          : [
              "No provider switch needed",
              "Greater control over your bill",
            ],
        cons: es
          ? ["Requiere ajustar hábitos de uso"]
          : ["Requires shifting usage habits"],
      },
    ],
    water: [
      {
        name: es ? "Programa WaterSmart" : "WaterSmart Program",
        saving: Math.round(overpaying * 0.5),
        icon: "💧",
        reliability: 97,
        eco: 92,
        desc: es
          ? "Reembolsos + detección inteligente de fugas."
          : "Rebates + smart leak detection to cut waste automatically.",
        why: es
          ? "La mayoría de hogares desperdicia el 30% del agua por fugas."
          : "Most households waste 30% of water through undetected leaks.",
        pros: es
          ? [
              "Detección de fugas en tiempo real",
              "Reembolsos de hasta $200",
            ]
          : ["Real-time leak detection", "Rebates up to $200"],
        cons: es
          ? ["Requiere instalación de sensor"]
          : ["Requires sensor installation"],
      },
      {
        name: es
          ? "Kit de Captación de Lluvia"
          : "Rainwater Harvesting Kit",
        saving: Math.round(overpaying * 0.4),
        icon: "🌧️",
        reliability: 85,
        eco: 99,
        desc: es
          ? "Recolecta y reutiliza agua de lluvia."
          : "Collect & reuse rainwater for outdoor and non-potable use.",
        why: es
          ? "El riego exterior representa hasta el 40% de tu factura."
          : "Outdoor irrigation accounts for up to 40% of a household water bill.",
        pros: es
          ? ["Máximo impacto ambiental", "Pago único de equipo"]
          : [
              "Maximum environmental impact",
              "One-time equipment cost",
            ],
        cons: es
          ? ["Depende de patrones de lluvia"]
          : ["Depends on rainfall patterns"],
      },
      {
        name: es
          ? "Paquete de Bajo Flujo"
          : "Low-Flow Retrofit Bundle",
        saving: Math.round(overpaying * 0.25),
        icon: "🚿",
        reliability: 99,
        eco: 75,
        desc: es
          ? "Actualiza accesorios, ahorros desde el día 1."
          : "Upgrade fixtures, simple install, instant savings from day 1.",
        why: es
          ? "Los accesorios estándar usan 2–3x más agua de lo necesario."
          : "Standard fixtures use 2–3x more water than needed.",
        pros: es
          ? ["Instalación sencilla", "Ahorros instantáneos"]
          : [
              "Tool-free installation",
              "Instant savings from day 1",
            ],
        cons: es
          ? ["Menor ahorro que otras opciones"]
          : ["Lower savings than other options"],
      },
    ],
    phone: [
      {
        name: es ? "Plan Móvil Casa" : "Casa Mobile Plan",
        saving: Math.round(overpaying * 0.55),
        icon: "📱",
        reliability: 96,
        eco: 70,
        desc: es
          ? "MVNO en las principales torres, misma cobertura, fracción del costo."
          : "MVNO on major towers, same coverage, fraction of cost.",
        why: es
          ? "Los grandes operadores cobran primas por marketing y tiendas físicas."
          : "Big carriers charge premiums for marketing and storefronts. MVNOs use the same network infrastructure.",
        pros: es
          ? [
              "Misma cobertura que los grandes operadores",
              "Sin contratos a largo plazo",
            ]
          : [
              "Same network coverage as big carriers",
              "No long-term contracts",
            ],
        cons: es
          ? ["Prioridad de red más baja en horas pico"]
          : ["Lower network priority during peak hours"],
      },
      {
        name: es
          ? "Llamadas por WiFi Comunitario"
          : "Community WiFi Calling",
        saving: Math.round(overpaying * 0.65),
        icon: "📡",
        reliability: 93,
        eco: 85,
        desc: es
          ? "Usa WiFi comunitario + VoIP para reducir tu factura."
          : "Use community mesh WiFi + VoIP to slash your bill.",
        why: es
          ? "Si tienes WiFi confiable, el 90% de tus llamadas pueden ir por internet."
          : "If you have reliable WiFi at home and work, 90% of your calls and data can travel over internet.",
        pros: es
          ? [
              "Mayor ahorro potencial",
              "Beneficia a toda la comunidad",
            ]
          : [
              "Highest savings potential",
              "Benefits the whole community",
            ],
        cons: es
          ? ["Depende de la disponibilidad de WiFi"]
          : ["Depends on WiFi availability"],
      },
      {
        name: es ? "Prepago Ilimitado" : "Prepaid Unlimited",
        saving: Math.round(overpaying * 0.4),
        icon: "🔋",
        reliability: 98,
        eco: 65,
        desc: es
          ? "Prepago sin contrato con LTE completo."
          : "No-contract prepaid with full LTE, no surprises.",
        why: es
          ? "Los planes pospago incluyen subsidios de dispositivos y tarifas ocultas."
          : "Postpaid plans include device subsidies and hidden fees that inflate your bill.",
        pros: es
          ? [
              "Sin contratos ni tarifas ocultas",
              "Control total del gasto",
            ]
          : [
              "No contracts or hidden fees",
              "Full spending control",
            ],
        cons: es
          ? ["Sin financiamiento de dispositivos"]
          : ["No device financing"],
      },
    ],
  };
  return d[billType] || d.energy;
}

// ─── ENERGY PARTICLE CANVAS ───────────────────────────────────────
function EnergyParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.offsetWidth,
      H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;
    const NUM = 60;
    const pts = Array.from({ length: NUM }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.6 + 0.25,
      pulse: Math.random() * Math.PI * 2,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.025;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const a = p.alpha * (0.55 + 0.45 * Math.sin(p.pulse));
        const g = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.r * 5,
        );
        g.addColorStop(0, `rgba(255,107,53,${a})`);
        g.addColorStop(1, "rgba(255,107,53,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,210,150,${a})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x,
            dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255,107,53,${0.16 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// ─── NAV DROPDOWN ─────────────────────────────────────────────────
function NavDropdown({
  item,
  activeTab,
  setActiveTab,
  onNavigate,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => {
          setActiveTab(item.id);
          setOpen((p) => !p);
        }}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? "bg-[#FF6B35] text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"}`}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-52 bg-[#0d1117] border border-gray-700 rounded-xl shadow-2xl shadow-black/60 overflow-hidden z-50">
          {item.dropdown.map((d) => (
            <button
              key={d.label}
              onClick={() => {
                setOpen(false);
                onNavigate(d.page);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors group ${d.highlight ? "text-[#FF6B35] hover:bg-[#FF6B35]/10 font-semibold" : "text-gray-300 hover:text-white hover:bg-gray-800"}`}
            >
              {d.highlight ? (
                <Zap
                  size={12}
                  className="fill-[#FF6B35] flex-shrink-0"
                />
              ) : (
                <span className="w-1 h-1 rounded-full bg-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              )}
              {d.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── BILL ANALYZER ────────────────────────────────────────────────
function BillAnalyzerPage({ onBack, lang }) {
  const t = T[lang];
  const [step, setStep] = useState("upload");
  const [billType, setBillType] = useState("energy");
  const [billAmount, setBillAmount] = useState("");
  const [billUsage, setBillUsage] = useState("");
  const [billProvider, setBillProvider] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const fileRef = useRef(null);
  const [apiProviders, setApiProviders] = useState<any[]>([]);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [analyzeError, setAnalyzeError] = useState("");

  const analyze = async () => {
    if (!billAmount && !uploadedFile) return;
    setStep("analyzing");
    setProgress(0);
    setAnalyzeError("");
    setApiProviders([]);

    // Animate progress bar while we wait for the API
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(p + 2, 85); // cap at 85% until API responds
      setProgress(p);
    }, 60);

    try {
      // Step 1: If there's an uploaded file and it's energy or water, send it
      if (uploadedFile && (billType === "energy" || billType === "water")) {
        try {
          const parsed = await api.uploadBill(uploadedFile, billType);
          setUploadResult(parsed);
          // Auto-fill manual fields from parsed data
          if (parsed.amount_due && !billAmount) setBillAmount(String(parsed.amount_due));
          if (parsed.usage_amount && !billUsage) setBillUsage(String(parsed.usage_amount));
          if (parsed.provider_name && !billProvider) setBillProvider(parsed.provider_name);
        } catch (err) {
          console.warn("File upload failed, continuing with manual data:", err);
        }
      }

      // Step 2: Call comparison endpoint based on bill type
      const amt = parseFloat(billAmount) || (uploadResult?.amount_due) || 0;
      const usage = parseFloat(billUsage) || (uploadResult?.usage_amount) || 0;
      const userAddress = api.getSavedUser()?.address || "";

      if (billType === "energy" && amt > 0) {
        const rate = usage > 0 ? amt / usage : 0.12;
        try {
          const result = await api.compareEnergy({
            current_usage_kwh: usage || amt / 0.12,
            current_bill_amount: amt,
            current_rate_per_kwh: rate,
            address: userAddress || undefined,
            zip_code: userAddress ? undefined : "30060",
          });
          setApiProviders(result.providers || []);
        } catch (err) {
          console.warn("Energy compare failed:", err);
        }
      } else if (billType === "water" && amt > 0) {
        const rate = usage > 0 ? amt / usage : 0.007;
        try {
          const result = await api.compareWater({
            monthly_gallons: usage || amt / 0.007,
            current_bill_amount: amt,
            current_rate_per_gallon: rate,
            address: userAddress || undefined,
            zip_code: userAddress ? undefined : "30060",
          });
          setApiProviders(result.providers || []);
        } catch (err) {
          console.warn("Water compare failed:", err);
        }
      } else if (billType === "phone") {
        const gb = parseFloat(billUsage) || 10;
        try {
          const result = await api.comparePhone({ monthly_gb: gb, num_lines: 1 });
          setApiProviders(result.plans || []);
        } catch (err) {
          console.warn("Phone compare failed:", err);
        }
      }
    } catch (err: any) {
      setAnalyzeError(err.message || "Analysis failed");
    } finally {
      clearInterval(iv);
      setProgress(100);
      setTimeout(() => setStep("results"), 300);
    }
  };

  const amt = parseFloat(billAmount) || 0;
  const avgBill =
    billType === "energy"
      ? 137
      : billType === "water"
        ? 70
        : 85;
  const overpaying = Math.max(0, amt - avgBill);
  const overpayPct =
    avgBill > 0 ? Math.round((overpaying / avgBill) * 100) : 0;
  const alts = getAlternatives(billType, overpaying, lang);
  const analyzeLabels = [
    t.readingBill,
    t.comparingAvg,
    t.findingAlt,
    t.calcSavings,
  ];
  const analyzeIdx =
    progress < 25
      ? 0
      : progress < 55
        ? 1
        : progress < 80
          ? 2
          : 3;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> {t.back}
        </button>
        <div className="w-px h-5 bg-gray-700" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#FF6B35]/20 flex items-center justify-center">
            <FileText size={14} className="text-[#FF6B35]" />
          </div>
          <span className="font-semibold">
            {t.billAnalyzer}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {step === "upload" && (
          <div>
            <div className="mb-10">
              <h1 className="text-4xl font-black mb-3">
                {t.areYouOverpaying}{" "}
                <span className="text-[#FF6B35]">
                  {t.overpaying}
                </span>
                ?
              </h1>
              <p className="text-gray-400 text-lg">
                {t.uploadDesc}
              </p>
            </div>
            <div className="flex gap-3 mb-8 flex-wrap">
              {[
                {
                  id: "energy",
                  label: t.energy,
                  icon: <Zap size={16} />,
                },
                {
                  id: "water",
                  label: t.water,
                  icon: <Droplets size={16} />,
                },
                {
                  id: "phone",
                  label: t.phone,
                  icon: <Wifi size={16} />,
                },
              ].map((tp) => (
                <button
                  key={tp.id}
                  onClick={() => setBillType(tp.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${billType === tp.id ? "bg-[#FF6B35] border-[#FF6B35] text-white" : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"}`}
                >
                  {tp.icon} {tp.label}
                </button>
              ))}
            </div>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) setUploadedFile(f);
              }}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all mb-8 ${dragOver ? "border-[#FF6B35] bg-[#FF6B35]/5" : uploadedFile ? "border-green-500 bg-green-500/5" : "border-gray-700 hover:border-gray-500"}`}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.jpg,.png"
                className="hidden"
                onChange={(e) =>
                  setUploadedFile(e.target.files[0])
                }
              />
              {uploadedFile ? (
                <div className="flex flex-col items-center gap-3">
                  <CheckCircle
                    size={40}
                    className="text-green-400"
                  />
                  <p className="text-green-400 font-semibold">
                    {uploadedFile.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {t.clickReplace}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Upload size={40} className="text-gray-600" />
                  <p className="text-gray-300 font-semibold">
                    {t.dropBill}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {t.fileTypes}
                  </p>
                </div>
              )}
            </div>
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {t.orEnterManually}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                    {t.totalAmount}
                  </label>
                  <div className="relative">
                    <DollarSign
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="number"
                      value={billAmount}
                      onChange={(e) =>
                        setBillAmount(e.target.value)
                      }
                      placeholder="142.00"
                      className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl pl-8 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                    {t.usage} (
                    {billType === "energy"
                      ? "kWh"
                      : billType === "water"
                        ? "gal"
                        : "GB"}
                    )
                  </label>
                  <input
                    type="text"
                    value={billUsage}
                    onChange={(e) =>
                      setBillUsage(e.target.value)
                    }
                    placeholder={
                      billType === "energy"
                        ? "850"
                        : billType === "water"
                          ? "3200"
                          : "45"
                    }
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                    {t.currentProvider}
                  </label>
                  <input
                    type="text"
                    value={billProvider}
                    onChange={(e) =>
                      setBillProvider(e.target.value)
                    }
                    placeholder={t.providerPlaceholder}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={analyze}
              disabled={!billAmount && !uploadedFile}
              className="mt-6 w-full py-4 bg-gradient-to-r from-[#FF6B35] to-[#C1292E] text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-[#FF6B35]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
            >
              <Zap size={20} className="fill-white" />{" "}
              {t.analyzeBill}
            </button>
          </div>
        )}

        {step === "analyzing" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
            <div className="relative w-36 h-36">
              <svg
                className="w-36 h-36 -rotate-90"
                viewBox="0 0 144 144"
              >
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="8"
                />
                <defs>
                  <linearGradient
                    id="pg"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#FF6B35" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  fill="none"
                  stroke="url(#pg)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 62}`}
                  strokeDashoffset={`${2 * Math.PI * 62 * (1 - progress / 100)}`}
                  style={{
                    transition:
                      "stroke-dashoffset 0.08s linear",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black">
                  {progress}%
                </span>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">
                {t.analyzing}
              </h2>
              <p className="text-gray-500">
                {analyzeLabels[analyzeIdx]}
              </p>
            </div>
          </div>
        )}

        {step === "results" && (
          <div>
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-black mb-2">
                  {t.yourBillBreakdown}
                </h1>
                <p className="text-gray-400">
                  {billProvider
                    ? `${t.provider}: ${billProvider}`
                    : t.currentProviderLabel}{" "}
                  ·{" "}
                  {billType === "energy"
                    ? t.energy
                    : billType === "water"
                      ? t.water
                      : t.phone}
                </p>
              </div>
              <button
                onClick={() => {
                  setStep("upload");
                  setBillAmount("");
                  setUploadedFile(null);
                  setExpanded(null);
                }}
                className="flex items-center gap-2 text-gray-400 hover:text-white text-sm border border-gray-700 rounded-xl px-4 py-2 transition-colors"
              >
                <X size={14} /> {t.startOver}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">
                <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">
                  {t.yourBill}
                </p>
                <p className="text-3xl font-black">
                  ${amt.toFixed(2)}
                </p>
              </div>
              <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">
                <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">
                  {t.areaAverage}
                </p>
                <p className="text-3xl font-black text-green-400">
                  ${avgBill}
                </p>
              </div>
              <div
                className={`rounded-2xl p-5 ${overpaying > 0 ? "bg-red-500/10 border border-red-500/30" : "bg-green-500/10 border border-green-500/30"}`}
              >
                <p className="text-xs mb-1 font-medium uppercase tracking-wider text-gray-400">
                  {overpaying > 0 ? t.overpayingBy : t.onTrack}
                </p>
                <p
                  className={`text-3xl font-black ${overpaying > 0 ? "text-red-400" : "text-green-400"}`}
                >
                  {overpaying > 0
                    ? `+$${overpaying.toFixed(0)}${t.perMonth}`
                    : t.great}
                </p>
              </div>
            </div>
            {overpaying > 0 && (
              <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle
                    size={16}
                    className="text-[#FF6B35]"
                  />
                  <h3 className="font-bold">
                    {t.payingAbove} {overpayPct}%{" "}
                    {t.aboveAverage}
                  </h3>
                </div>
                <div className="relative h-6 bg-gray-800 rounded-full overflow-hidden mb-3">
                  <div
                    className="absolute left-0 top-0 h-full bg-green-500 rounded-full"
                    style={{
                      width: `${(avgBill / amt) * 100}%`,
                    }}
                  />
                  <div
                    className="absolute top-0 h-full bg-[#FF6B35]/70"
                    style={{
                      left: `${(avgBill / amt) * 100}%`,
                      width: `${(overpaying / amt) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    {t.fairRate} (${avgBill})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B35] inline-block" />
                    {t.overpayingBy} (${overpaying.toFixed(0)})
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  {t.over12mo}{" "}
                  <span className="text-[#FF6B35] font-bold">
                    ${(overpaying * 12).toFixed(0)}
                  </span>{" "}
                  {t.extraPerMonth}
                </p>
              </div>
            )}
            {analyzeError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm">
                {analyzeError}
              </div>
            )}
            {apiProviders.length > 0 && (
              <div className="mb-8">
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                    <Zap size={18} className="text-[#FF6B35]" />
                    {lang === "es" ? "Proveedores disponibles en tu área" : "Available Providers in Your Area"}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {lang === "es" ? "Datos en tiempo real de proveedores locales." : "Live data from local providers."}
                  </p>
                </div>
                <div className="space-y-3">
                  {apiProviders.map((prov, i) => (
                    <div key={i} className="bg-[#111] border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-lg">
                            {billType === "energy" ? "⚡" : billType === "water" ? "💧" : "📱"}
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {prov.provider_name || prov.provider}
                            </p>
                            <p className="text-xs text-gray-500">
                              {prov.service_area ? `Service area: ${prov.service_area}` : ""}
                              {prov.source ? ` · Source: ${prov.source}` : ""}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {prov.estimated_bill != null && (
                            <p className="text-lg font-black text-white">${prov.estimated_bill}{t.perMonth}</p>
                          )}
                          {prov.monthly_cost != null && (
                            <p className="text-lg font-black text-white">${prov.monthly_cost}{t.perMonth}</p>
                          )}
                          {prov.monthly_savings != null && prov.monthly_savings > 0 && (
                            <p className="text-sm text-green-400 font-semibold">
                              Save ${prov.monthly_savings}{t.perMonth}
                            </p>
                          )}
                          {prov.annual_savings != null && prov.annual_savings > 0 && (
                            <p className="text-xs text-gray-500">${prov.annual_savings}{t.perYear2}</p>
                          )}
                          {prov.rate_per_kwh != null && (
                            <p className="text-xs text-gray-500">${prov.rate_per_kwh}/kWh</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-1">
                {t.recommendedAlts}
              </h2>
              <p className="text-gray-500 text-sm">
                {t.ecoFriendly}
              </p>
            </div>
            <div className="space-y-4">
              {alts.map((alt, i) => (
                <div
                  key={i}
                  className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-2xl flex-shrink-0">
                          {alt.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-bold text-white">
                              {alt.name}
                            </h3>
                            {i === 0 && (
                              <span className="text-xs bg-[#FF6B35]/20 text-[#FF6B35] px-2 py-0.5 rounded-full font-semibold">
                                {t.bestPick}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mb-3">
                            {alt.desc}
                          </p>
                          <div className="flex gap-5 flex-wrap">
                            {[
                              {
                                label: t.reliability,
                                val: alt.reliability,
                                color: "bg-blue-400",
                              },
                              {
                                label: t.ecoScore,
                                val: alt.eco,
                                color: "bg-green-400",
                              },
                            ].map((bar) => (
                              <div key={bar.label}>
                                <p className="text-xs text-gray-600 mb-1">
                                  {bar.label}
                                </p>
                                <div className="flex items-center gap-1.5">
                                  <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full ${bar.color} rounded-full`}
                                      style={{
                                        width: `${bar.val}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-xs text-gray-400">
                                    {bar.val}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-500 mb-0.5">
                          {t.estSavings}
                        </p>
                        <p className="text-2xl font-black text-green-400">
                          -${alt.saving}
                          {t.perMonth}
                        </p>
                        <p className="text-xs text-gray-600">
                          ${alt.saving * 12}
                          {t.perYear2}
                        </p>
                        <button
                          onClick={() =>
                            setExpanded(
                              expanded === i ? null : i,
                            )
                          }
                          className="mt-3 px-3 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-gray-700 text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 ml-auto"
                        >
                          <ChevronDown
                            size={12}
                            className={`transition-transform ${expanded === i ? "rotate-180" : ""}`}
                          />
                          {t.whyBetter}
                        </button>
                      </div>
                    </div>
                  </div>
                  {expanded === i && (
                    <div className="border-t border-gray-800 p-6 bg-[#0d0d0d]">
                      <div className="mb-5 p-4 bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-xl">
                        <p className="text-sm text-gray-300 leading-relaxed">
                          <span className="text-[#FF6B35] font-semibold">
                            💡{" "}
                          </span>
                          {alt.why}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <CheckCircle size={12} /> {t.pros}
                          </p>
                          <ul className="space-y-2">
                            {alt.pros.map((pro, pi) => (
                              <li
                                key={pi}
                                className="flex items-start gap-2 text-sm text-gray-300"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <X size={12} /> {t.cons}
                          </p>
                          <ul className="space-y-2">
                            {alt.cons.map((con, ci) => (
                              <li
                                key={ci}
                                className="flex items-start gap-2 text-sm text-gray-300"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <button className="mt-5 w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#C1292E] text-white font-bold rounded-xl text-sm hover:shadow-lg transition-all">
                        {t.learnMoreBtn} →
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-green-500/5 border border-green-500/20 rounded-2xl flex items-start gap-3">
              <Leaf
                size={18}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-gray-400">
                <span className="text-green-400 font-semibold">
                  {t.ecoNote}{" "}
                </span>
                {t.ecoNoteText}{" "}
                <span className="text-green-400 font-semibold">
                  1.2 {t.co2}
                </span>{" "}
                {t.eqTrees}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PLANS / NETWORK TECHNOLOGY PAGE ─────────────────────────────
function PlansPage({ onBack, lang }) {
  const isEs = lang === "es";
  const [openTech, setOpenTech] = useState(null);

  const towers = [
    {
      icon: "🗼",
      title: isEs ? "Torres Macrocelda" : "Macrocell Towers",
      freq: isEs ? "Frecuencias: 600 MHz – 2.5 GHz" : "Frequencies: 600 MHz – 2.5 GHz",
      badge: isEs ? "Más Común" : "Most Common",
      badgeColor: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
      desc: isEs
        ? "Las torres altas que ves en colinas y azoteas. Una sola macrocelda puede cubrir hasta 40 km en zonas rurales, sirviendo a miles de usuarios a la vez. Son la columna vertebral de la red de cada operador."
        : "The tall towers you see on hillsides and rooftops. A single macrocell can cover up to 25 miles in rural areas, serving thousands of users simultaneously. They're the backbone of every carrier's network.",
      bars: [
        { label: isEs ? "Cobertura" : "Coverage", val: 95, color: "bg-yellow-400", text: isEs ? "Muy Alta" : "Very High" },
        { label: isEs ? "Velocidad" : "Speed", val: 60, color: "bg-blue-400", text: isEs ? "Media" : "Medium" },
        { label: isEs ? "Penetración" : "Penetration", val: 80, color: "bg-green-400", text: isEs ? "Alta" : "High" },
      ],
    },
    {
      icon: "🏙️",
      title: isEs ? "Celdas Pequeñas y DAS" : "Small Cells & DAS",
      freq: isEs ? "Frecuencias: 2.5 GHz – 6 GHz" : "Frequencies: 2.5 GHz – 6 GHz",
      badge: isEs ? "Zonas Urbanas" : "Urban Areas",
      badgeColor: "text-blue-400 bg-blue-400/10 border-blue-400/30",
      desc: isEs
        ? "Montadas en postes y paredes de edificios, las celdas pequeñas llenan vacíos de cobertura en zonas urbanas densas. Los Sistemas de Antenas Distribuidas (DAS) hacen lo mismo dentro de estadios, centros comerciales y aeropuertos."
        : "Mounted on streetlights and building walls, small cells fill coverage gaps in dense urban areas. Distributed Antenna Systems (DAS) do the same inside stadiums, malls, and airports, that's why your signal doesn't die at a concert.",
      bars: [
        { label: isEs ? "Cobertura" : "Coverage", val: 35, color: "bg-yellow-400", text: isEs ? "Local" : "Local" },
        { label: isEs ? "Velocidad" : "Speed", val: 80, color: "bg-blue-400", text: isEs ? "Alta" : "High" },
        { label: isEs ? "Densidad" : "Density", val: 90, color: "bg-green-400", text: isEs ? "Muy Alta" : "Very High" },
      ],
    },
    {
      icon: "⚡",
      title: isEs ? "mmWave (5G Ultra)" : "mmWave (5G Ultra)",
      freq: isEs ? "Frecuencias: 24 GHz – 100 GHz" : "Frequencies: 24 GHz – 100 GHz",
      badge: isEs ? "Más Nuevo" : "Newest Tech",
      badgeColor: "text-[#FF6B35] bg-[#FF6B35]/10 border-[#FF6B35]/30",
      desc: isEs
        ? "La tecnología 5G más rápida, capaz de velocidades de varios gigabits, pero apenas puede atravesar una ventana. Si tu operador cobra un extra por '5G Ultra', verifica si siquiera está disponible donde vives."
        : "The fastest 5G technology, capable of multi-gigabit speeds, but it can barely pass through a window. If your carrier charges a premium for '5G Ultra', check if it's even available where you live.",
      bars: [
        { label: isEs ? "Cobertura" : "Coverage", val: 15, color: "bg-red-400", text: isEs ? "Muy Baja" : "Very Low" },
        { label: isEs ? "Velocidad" : "Speed", val: 100, color: "bg-blue-400", text: "10 Gbps+" },
        { label: isEs ? "Penetración" : "Penetration", val: 10, color: "bg-red-400", text: isEs ? "Muy Baja" : "Very Low" },
      ],
    },
  ];

  const genCards = [
    {
      badge: "4G LTE", badgeColor: "text-blue-400 bg-blue-400/10 border-blue-400/30",
      title: isEs ? "Excelente para la mayoría" : "Still Excellent for Most People",
      desc: isEs
        ? "LTE cubre el 99% de la población de EE.UU. y entrega 20–100 Mbps, suficiente para transmitir video 4K y hacer videollamadas. Si un operador te cobra más por '5G' pero estás en una zona 4G, estás pagando por nada."
        : "LTE covers 99% of the U.S. population and delivers 20–100 Mbps, more than enough to stream 4K video and video call. If a carrier charges you for '5G' but you're in a 4G area, you're paying for nothing.",
    },
    {
      badge: "5G Sub-6 GHz", badgeColor: "text-[#FF6B35] bg-[#FF6B35]/10 border-[#FF6B35]/30",
      title: isEs ? "La actualización real de 5G" : "The Real 5G Upgrade",
      desc: isEs
        ? "Usando frecuencias por debajo de 6 GHz, el 5G de banda media entrega 100–400 Mbps con amplia cobertura. La banda C de T-Mobile cubre más de 200 millones de personas, esta es la actualización significativa."
        : "Mid-band 5G (especially C-band) delivers 100–400 Mbps with wide coverage. T-Mobile's mid-band 5G covers over 200 million people, this is the meaningful upgrade worth paying for.",
    },
    {
      badge: "MVNOs", badgeColor: "text-green-400 bg-green-400/10 border-green-400/30",
      title: isEs ? "Mismas torres, menor factura" : "Same Towers, Lower Bills",
      desc: isEs
        ? "Los Operadores Móviles Virtuales (MVNOs) como Mint Mobile y Visible arriendan acceso a torres de los grandes operadores. Obtienes la misma señal, sin el margen de ganancia del comercio minorista. Ahorro promedio: $30–$60/mes."
        : "MVNOs like Mint Mobile and Visible lease tower access from major carriers. You get identical signal, just without the retail markup. Average savings: $30–$60/month.",
    },
    {
      badge: isEs ? "Llamadas WiFi" : "WiFi Calling", badgeColor: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
      title: isEs ? "La mejora gratis que ya tienes" : "The Free Upgrade You Already Have",
      desc: isEs
        ? "Cuando estás en WiFi, tu teléfono puede enrutar llamadas por internet en lugar de la red celular, usando cero datos del operador. Actívalo en la configuración. La mayoría no sabe que ya está incluido en su plan."
        : "On WiFi, your phone routes calls over the internet instead of the cellular network, using zero carrier data. Enable it in your phone settings. Most people don't know it's already included in their plan.",
    },
  ];

  const tips = [
    {
      title: isEs ? "Verifica mapas de cobertura reales" : "Check actual coverage maps",
      desc: isEs
        ? "No los anuncios del operador. Usa el mapa de la FCC (fcc.gov/BroadbandMap) para ver la intensidad real de la señal en tu dirección antes de pagar por un operador 'premium'."
        : "Not carrier ads. Use the FCC's coverage map (fcc.gov/BroadbandMap) to see real signal strength at your address before paying for a 'premium' carrier.",
    },
    {
      title: isEs ? "Conoce tu uso de datos real" : "Know your actual data usage",
      desc: isEs
        ? "Revisa tu factura actual. La mayoría de usuarios consume menos de 10 GB/mes. Pagar por ilimitado cuando usas 6 GB es ganancia pura para tu operador."
        : "Check your current bill. Most users consume under 10 GB/month. Paying for unlimited when you use 6 GB is pure profit for your carrier.",
    },
    {
      title: isEs ? "Pregunta por el programa Lifeline" : "Ask about the Lifeline program",
      desc: isEs
        ? "La ley federal provee a hogares de bajos ingresos elegibles un descuento de $9.25/mes en servicios de teléfono o internet. Muchas familias califican a través de Medicaid o SNAP y no lo saben."
        : "Federal law provides eligible low-income households a $9.25/month discount on phone or internet. Many families qualify through Medicaid or SNAP and don't know it.",
    },
    {
      title: isEs ? "Cambia a un MVNO en la misma red" : "Switch to an MVNO on the same network",
      desc: isEs
        ? "Mint Mobile usa torres de T-Mobile. Visible usa Verizon. Pagas $15–$45/mes en lugar de $70–$90 por exactamente la misma cobertura."
        : "Mint Mobile runs on T-Mobile towers. Visible runs on Verizon. You pay $15–$45/month instead of $70–$90 for the exact same coverage.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> {isEs ? "Atrás" : "Back"}
        </button>
        <div className="w-px h-5 bg-gray-700" />
        <span className="font-semibold">{isEs ? "Tecnología de Red" : "Network Technology"}</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="text-6xl mb-6">📡</div>
          <h1 className="text-5xl font-black mb-4">
            {isEs ? "Cómo Funcionan las " : "How Mobile Networks "}
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFD700] bg-clip-text text-transparent">
              {isEs ? "Redes Móviles" : "Actually Work"}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {isEs
              ? "Entender la tecnología detrás de tu factura telefónica te ayuda a elegir mejor, y dejar de pagar de más por cobertura que no necesitas."
              : "Understanding the technology behind your phone bill helps you choose smarter, and stop overpaying for coverage you don't need."}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          {[
            { val: "500K+", label: isEs ? "Torres en EE.UU." : "Cell towers in the U.S.", color: "text-[#FF6B35]" },
            { val: "5G", label: isEs ? "Estándar más reciente" : "Latest generation standard", color: "text-blue-400" },
            { val: "$612", label: isEs ? "Pagado de más al año" : "Avg overpaid per year", color: "text-green-400" },
          ].map((s, i) => (
            <div key={i} className="bg-[#111] border border-gray-800 rounded-2xl p-5 text-center">
              <p className={`text-3xl font-black mb-1 ${s.color}`}>{s.val}</p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tower types */}
        <p className="text-xs font-bold text-[#FF6B35] uppercase tracking-widest mb-3">{isEs ? "Infraestructura de Red" : "Network Infrastructure"}</p>
        <h2 className="text-2xl font-black mb-6">{isEs ? "Tipos de Torres Celulares" : "Cell Tower Technology"}</h2>
        <div className="space-y-4 mb-14">
          {towers.map((t, i) => (
            <div key={i} className="bg-[#111] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-2xl flex-shrink-0">{t.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-white text-lg">{t.title}</span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${t.badgeColor}`}>{t.badge}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{t.freq}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{t.desc}</p>
              <div className="space-y-2">
                {t.bars.map((b, bi) => (
                  <div key={bi} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-24 flex-shrink-0">{b.label}</span>
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.val}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-16 text-right">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 4G vs 5G etc */}
        <div className="h-px bg-gray-800 mb-10" />
        <p className="text-xs font-bold text-[#FF6B35] uppercase tracking-widest mb-3">{isEs ? "Generaciones de Red" : "Network Generations"}</p>
        <h2 className="text-2xl font-black mb-6">{isEs ? "4G vs 5G, Por Qué Lo Que Importa" : "4G vs 5G, What You're Actually Paying For"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
          {genCards.map((c, i) => (
            <div key={i} className="bg-[#111] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${c.badgeColor} mb-3 inline-block`}>{c.badge}</span>
              <h3 className="font-bold text-white mb-2">{c.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="h-px bg-gray-800 mb-10" />
        <p className="text-xs font-bold text-[#FF6B35] uppercase tracking-widest mb-3">{isEs ? "Decisiones Inteligentes" : "Smart Decisions"}</p>
        <h2 className="text-2xl font-black mb-6">{isEs ? "Cómo Dejar de Pagar de Más" : "How to Stop Overpaying"}</h2>
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-10 space-y-5">
          {tips.map((tip, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-7 h-7 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35]/40 flex items-center justify-center text-[#FF6B35] font-black text-xs flex-shrink-0 mt-0.5">{i + 1}</div>
              <div>
                <p className="font-bold text-white mb-1">{tip.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#C1292E]/5 border border-[#FF6B35]/20 rounded-3xl p-8 text-center">
          <p className="text-xl font-black text-white mb-3">
            {isEs ? "¿Estás pagando de más en este momento?" : "Want to know if you're overpaying right now?"}
          </p>
          <p className="text-gray-400 mb-5 leading-relaxed">
            {isEs
              ? "Sube tu factura telefónica y la compararemos contra alternativas en la misma red, mismas torres, menor precio."
              : "Upload your phone bill and we'll compare your plan against alternatives on the same network, same towers, lower price."}
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-[#C1292E] text-white font-bold rounded-xl hover:shadow-lg transition-all text-sm">
            {isEs ? "Analizar mi factura telefónica →" : "Analyze My Phone Bill →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SOLAR SOLUTIONS PAGE ─────────────────────────────────────────
function SolarSolutionsPage({ onBack, lang }) {
  const isEs = lang === "es";
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> {isEs ? "Atrás" : "Back"}
        </button>
        <div className="w-px h-5 bg-gray-700" />
        <span className="font-semibold">{isEs ? "Soluciones Solares" : "Solar Solutions"}</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-14 text-center">
          <div className="text-6xl mb-6">☀️</div>
          <h1 className="text-5xl font-black mb-4">
            {isEs ? "Energía " : "Solar "}
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">
              {isEs ? "Solar" : "Energy"}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {isEs
              ? "El sol es la fuente de energía más abundante del planeta. Convertirlo en electricidad para tu hogar es más accesible que nunca."
              : "The sun is the most abundant energy source on the planet. Converting it into electricity for your home is more accessible than ever."}
          </p>
        </div>

        {/* Why Solar */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-black text-white mb-4">
            {isEs ? "¿Por qué cambiar a solar?" : "Why switch to solar?"}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            {isEs
              ? "La energía solar fotovoltaica convierte la luz del sol directamente en electricidad sin combustión, sin emisiones y sin partes móviles. Una vez instalado, el sistema genera electricidad gratis durante 25 a 30 años. El hogar promedio en EE.UU. puede reducir su factura eléctrica entre un 70% y un 100% con un sistema solar bien dimensionado."
              : "Photovoltaic solar energy converts sunlight directly into electricity with no combustion, no emissions, and no moving parts. Once installed, the system generates free electricity for 25 to 30 years. The average U.S. home can reduce its electric bill by 70% to 100% with a properly sized solar system."}
          </p>
          <p className="text-gray-300 leading-relaxed">
            {isEs
              ? "Según la Agencia Internacional de Energía (IEA), la solar es ahora la fuente de electricidad más barata de la historia. El costo de los paneles solares ha caído más del 90% en la última década, pasando de $76/vatio en 1977 a menos de $0.30/vatio en 2023."
              : "According to the International Energy Agency (IEA), solar is now the cheapest source of electricity in history. The cost of solar panels has dropped more than 90% in the last decade, falling from $76/watt in 1977 to under $0.30/watt in 2023."}
          </p>
        </div>

        {/* Key Benefits */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-black text-white mb-6">
            {isEs ? "Beneficios clave" : "Key benefits"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: "💰",
                title: isEs ? "Ahorro en la factura" : "Bill savings",
                desc: isEs
                  ? "El hogar solar promedio ahorra $1,500 al año en electricidad. En estados con alta irradiación como California, Texas o Florida, el ahorro puede superar $2,500 al año."
                  : "The average solar home saves $1,500/year on electricity. In high-sun states like California, Texas, or Florida, savings can exceed $2,500/year.",
              },
              {
                icon: "📈",
                title: isEs ? "Valor de la propiedad" : "Home value increase",
                desc: isEs
                  ? "Un estudio de Zillow encontró que los hogares con paneles solares se venden un 4.1% más que casas similares sin solar, lo que equivale a unos $9,274 en el precio medio de una vivienda."
                  : "A Zillow study found homes with solar panels sell for 4.1% more than comparable homes without solar, equivalent to about $9,274 on a median-priced home.",
              },
              {
                icon: "🌱",
                title: isEs ? "Impacto ambiental" : "Environmental impact",
                desc: isEs
                  ? "Un sistema solar residencial típico de 6 kW evita la emisión de unas 4.8 toneladas de CO₂ al año, el equivalente a plantar 115 árboles o no conducir durante 11,000 millas."
                  : "A typical 6 kW residential solar system prevents about 4.8 tons of CO₂ emissions per year, equivalent to planting 115 trees or not driving for 11,000 miles.",
              },
              {
                icon: "🔒",
                title: isEs ? "Protección contra alzas" : "Rate hike protection",
                desc: isEs
                  ? "Las tarifas eléctricas han subido en promedio un 2.9% anual durante la última década. Con solar, la mayor parte de tu electricidad tiene costo cero, protegiéndote de futuros aumentos de tarifas."
                  : "Electricity rates have risen an average of 2.9% per year over the last decade. With solar, most of your electricity costs nothing, shielding you from future rate increases.",
              },
              {
                icon: "⚡",
                title: isEs ? "Independencia energética" : "Energy independence",
                desc: isEs
                  ? "Combinado con una batería de almacenamiento, un sistema solar puede mantenerte encendido durante apagones, tormentas o emergencias de la red eléctrica."
                  : "Combined with battery storage, a solar system can keep you powered during grid outages, storms, or grid emergencies.",
              },
              {
                icon: "🏠",
                title: isEs ? "Sin costo de instalación" : "Zero upfront options",
                desc: isEs
                  ? "Con los programas de arrendamiento solar y acuerdos de compra de energía (PPA), puedes instalar paneles con $0 de adelanto y empezar a ahorrar desde el primer mes."
                  : "With solar lease programs and power purchase agreements (PPAs), you can install panels with $0 down and start saving from month one.",
              },
            ].map((b, i) => (
              <div key={i} className="flex gap-4 p-4 bg-[#0a0a0a] rounded-2xl border border-gray-800">
                <div className="text-3xl flex-shrink-0">{b.icon}</div>
                <div>
                  <p className="font-bold text-white mb-1">{b.title}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Types of Solar */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-black text-white mb-6">
            {isEs ? "Tipos de soluciones solares" : "Types of solar solutions"}
          </h2>
          <div className="space-y-5">
            {[
              {
                title: isEs ? "Paneles en el techo (Rooftop Solar)" : "Rooftop Solar Panels",
                desc: isEs
                  ? "El método más común. Se instalan paneles fotovoltaicos directamente sobre el techo de tu casa. Un sistema típico de 6–8 kW cuesta entre $15,000 y $25,000 antes de incentivos, y entre $10,500 y $17,500 después del crédito fiscal federal del 30%. El período de recuperación promedio es de 6 a 10 años."
                  : "The most common method. Photovoltaic panels are installed directly on your home's roof. A typical 6–8 kW system costs $15,000–$25,000 before incentives, and $10,500–$17,500 after the 30% federal tax credit. Average payback period is 6–10 years.",
              },
              {
                title: isEs ? "Solar Comunitario" : "Community Solar",
                desc: isEs
                  ? "Compras o arrendas una parte de una granja solar local y recibes créditos en tu factura eléctrica. Ideal si vives en un apartamento, tienes un techo con sombra o no quieres instalar paneles. Los ahorros típicos son del 5 al 15% en la factura mensual sin ninguna instalación."
                  : "You buy or lease a share of a local solar farm and receive credits on your electric bill. Ideal if you rent, have a shaded roof, or don't want installation. Typical savings are 5–15% on your monthly bill with no installation required.",
              },
              {
                title: isEs ? "Arrendamiento Solar / PPA" : "Solar Lease / PPA",
                desc: isEs
                  ? "Una empresa instala paneles en tu techo sin costo inicial. Tú pagas una tarifa mensual fija (arrendamiento) o compras la electricidad generada a una tarifa reducida (PPA). No obtienes los créditos fiscales, pero no hay riesgo financiero ni mantenimiento para ti."
                  : "A company installs panels on your roof at no upfront cost. You pay a fixed monthly fee (lease) or buy the generated electricity at a reduced rate (PPA). You don't get the tax credits, but there's no financial risk or maintenance responsibility for you.",
              },
              {
                title: isEs ? "Solar + Batería" : "Solar + Battery Storage",
                desc: isEs
                  ? "La combinación más poderosa. Los paneles generan energía durante el día, la batería la almacena para usarla en la noche o durante apagones. Con este sistema puedes alcanzar independencia energética casi total. El costo adicional de la batería (Tesla Powerwall: ~$10,000 instalado) puede cubrirse con el crédito fiscal federal del 30%."
                  : "The most powerful combination. Panels generate energy during the day, the battery stores it for use at night or during outages. With this setup you can achieve near-total energy independence. The added battery cost (Tesla Powerwall: ~$10,000 installed) can be offset by the 30% federal tax credit.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-gray-700 rounded-2xl p-5">
                <p className="font-bold text-[#FFD700] mb-2">{item.title}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Incentives */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-black text-white mb-4">
            {isEs ? "Incentivos y créditos fiscales" : "Incentives & tax credits"}
          </h2>
          <div className="space-y-4">
            {[
              {
                label: isEs ? "Crédito Fiscal Federal (ITC) — 30%" : "Federal Investment Tax Credit (ITC) — 30%",
                desc: isEs
                  ? "El gobierno federal te devuelve el 30% del costo total de instalación de tu sistema solar como crédito en tu declaración de impuestos. Para un sistema de $20,000, eso son $6,000 de vuelta. Disponible hasta 2032."
                  : "The federal government returns 30% of your total solar installation cost as a credit on your tax return. On a $20,000 system, that's $6,000 back. Available through 2032.",
                color: "text-green-400",
              },
              {
                label: isEs ? "Exenciones de impuesto a la propiedad" : "Property tax exemptions",
                desc: isEs
                  ? "Más de 36 estados eximen el valor añadido por los paneles solares del impuesto a la propiedad. Esto significa que aunque el valor de tu casa suba, tu impuesto predial no aumenta por el sistema solar."
                  : "More than 36 states exempt the added value of solar panels from property taxes. This means even though your home value rises, your property tax does not increase because of the solar system.",
                color: "text-blue-400",
              },
              {
                label: isEs ? "Exenciones de impuesto sobre ventas" : "Sales tax exemptions",
                desc: isEs
                  ? "Muchos estados no cobran impuesto sobre ventas en la compra de equipos solares. En estados como Nueva York o Florida, esto puede ahorrarte entre $1,000 y $2,000 adicionales."
                  : "Many states charge no sales tax on solar equipment purchases. In states like New York or Florida, this can save you an additional $1,000–$2,000.",
                color: "text-yellow-400",
              },
              {
                label: isEs ? "Medición neta (Net Metering)" : "Net Metering",
                desc: isEs
                  ? "Cuando tus paneles generan más electricidad de la que usas, el excedente se vende a la red y recibes créditos en tu factura. En muchos estados, estos créditos se aplican dólar por dólar, reduciendo tu factura a prácticamente cero."
                  : "When your panels generate more electricity than you use, the surplus is sold back to the grid and you receive bill credits. In many states, these credits apply dollar for dollar, reducing your bill to near zero.",
                color: "text-orange-400",
              },
            ].map((item, i) => (
              <div key={i} className="border border-gray-700 rounded-2xl p-5">
                <p className={`font-bold mb-2 ${item.color}`}>{item.label}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { val: "30%", label: isEs ? "Crédito fiscal federal" : "Federal tax credit", color: "text-yellow-400" },
            { val: "$1,500", label: isEs ? "Ahorro promedio/año" : "Average savings/year", color: "text-green-400" },
            { val: "25–30", label: isEs ? "Años de vida útil" : "Year system lifespan", color: "text-blue-400" },
            { val: "4.1%", label: isEs ? "Aumento valor del hogar" : "Home value increase", color: "text-[#FF6B35]" },
          ].map((s, i) => (
            <div key={i} className="bg-[#111] border border-gray-800 rounded-2xl p-5 text-center">
              <p className={`text-3xl font-black mb-1 ${s.color}`}>{s.val}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        <button onClick={onBack} className="w-full py-3 border border-gray-700 rounded-xl text-gray-300 hover:text-white hover:border-gray-500 transition-colors text-sm">
          ← {isEs ? "Atrás" : "Back"}
        </button>
      </div>
    </div>
  );
}

// ─── INNER PAGE ───────────────────────────────────────────────────
function InnerPage({ page, onBack, lang }) {
  const t = T[lang];
  if (page === "team")
    return <MeetTheTeamPage onBack={onBack} lang={lang} />;
  if (page === "mission")
    return <MissionPage onBack={onBack} lang={lang} />;
  if (page === "history")
    return <HistoryPage onBack={onBack} lang={lang} />;
  if (page === "battery")
    return <BatteryStoragePage onBack={onBack} lang={lang} />;
  if (page === "conservation")
    return <ConservationTipsPage onBack={onBack} lang={lang} />;
  if (page === "plans")
    return <PlansPage onBack={onBack} lang={lang} />;
  if (page === "solar")
    return <SolarSolutionsPage onBack={onBack} lang={lang} />;
  const data = t.pageData[page] || {
    title: page,
    icon: "📄",
    desc:
      lang === "es"
        ? "Contenido próximamente."
        : "Coming soon.",
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> {t.back}
        </button>
        <div className="w-px h-5 bg-gray-700" />
        <span className="font-semibold">{data.title}</span>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-6">{data.icon}</div>
        <h1 className="text-5xl font-black mb-6">
          {data.title}
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed mb-10">
          {data.desc}
        </p>
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-700 rounded-xl text-gray-300 hover:text-white hover:border-gray-500 transition-colors text-sm"
        >
          ← {t.back}
        </button>
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────
function HomePage({
  onNavigate,
  lang,
  setLang,
  user,
  onShowLogin,
}) {
  const t = T[lang];
  const [activeTab, setActiveTab] = useState("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideBgs = [
    "from-orange-900 via-red-900 to-black",
    "from-green-900 via-teal-900 to-black",
    "from-yellow-900 via-orange-900 to-black",
  ];

  useEffect(() => {
    const iv = setInterval(
      () => setCurrentSlide((p) => (p + 1) % 3),
      5000,
    );
    return () => clearInterval(iv);
  }, []);

  const slide = t.slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <style>{`
        @keyframes boltPulse { 0%,100%{opacity:0.12;transform:scale(0.88)} 50%{opacity:0.85;transform:scale(1.18)} }
        .bolt-pulse { animation: boltPulse 3s ease-in-out infinite; }
        .bolt-pulse:nth-child(2){animation-delay:0.8s}
        .bolt-pulse:nth-child(3){animation-delay:1.6s}
        .bolt-pulse:nth-child(4){animation-delay:2.2s}
        .bolt-pulse:nth-child(5){animation-delay:0.4s}
        @keyframes floatDot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .float-dot { animation: floatDot 4s ease-in-out infinite; }
      `}</style>

      <nav className="bg-[#0d1117] border-b border-gray-800 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Casa Abierta Logo"
                className="h-12 w-auto"
              />
              <div>
                <span className="text-white text-xl font-black tracking-tight">
                  CASA ABIERTA
                </span>
                <div className="text-[10px] text-[#FF6B35] font-semibold tracking-wider">
                  {t.tagline}
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {t.navItems.map((item) =>
                item.isHome ? (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab("home")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "home" ? "bg-[#FF6B35] text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavDropdown
                    key={item.id}
                    item={item}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onNavigate={onNavigate}
                  />
                ),
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setLang(lang === "en" ? "es" : "en")
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors text-xs font-bold"
              >
                <Globe size={13} />{" "}
                {lang === "en" ? "ES" : "EN"}
              </button>
              {user ? (
                <button
                  onClick={() => onNavigate("profile")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#FF6B35]/40 bg-[#FF6B35]/10 text-[#FF6B35] hover:bg-[#FF6B35]/20 transition-colors text-xs font-bold"
                >
                  <User size={14} />{" "}
                  <span className="capitalize">
                    {user.name}
                  </span>
                </button>
              ) : (
                <button
                  onClick={onShowLogin}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Sign In"
                >
                  <User size={20} />
                </button>
              )}
              <button
                onClick={() => onNavigate("bill-analyzer")}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#FF6B35] hover:bg-[#e55a26] text-white text-sm font-bold rounded-lg transition-colors"
              >
                <FileText size={14} /> {t.insertBill}
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors md:hidden">
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative h-[700px] overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${slideBgs[currentSlide]} transition-all duration-1000`}
        />
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,#FF6B35 1px,transparent 1px),linear-gradient(to bottom,#FF6B35 1px,transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <EnergyParticles />
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 2 }}
        >
          {[
            { top: "14%", left: "70%", size: 30 },
            { top: "58%", left: "83%", size: 20 },
            { top: "38%", left: "62%", size: 16 },
            { top: "72%", left: "76%", size: 24 },
            { top: "22%", left: "88%", size: 18 },
          ].map((b, i) => (
            <div
              key={i}
              className="bolt-pulse absolute"
              style={{ top: b.top, left: b.left }}
            >
              <Zap
                size={b.size}
                className="fill-[#FF6B35] text-[#FF6B35]"
                style={{
                  filter: "drop-shadow(0 0 10px #FF6B35cc)",
                }}
              />
            </div>
          ))}
        </div>
        <div
          className="absolute bottom-20 right-12 flex gap-3 pointer-events-none"
          style={{ zIndex: 2 }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="float-dot w-2 h-2 rounded-full bg-[#FF6B35]"
              style={{
                animationDelay: `${i * 0.3}s`,
                opacity: 0.5 + (i % 3) * 0.15,
              }}
            />
          ))}
        </div>
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center"
          style={{ zIndex: 3 }}
        >
          <div className="max-w-3xl">
            <h1 className="text-7xl md:text-8xl font-black text-white mb-4 leading-tight">
              {slide.title}
              <br />
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#FFD700] to-[#C1292E] bg-clip-text text-transparent">
                {slide.subtitle}
              </span>
            </h1>
            <p className="text-2xl text-gray-200 mb-8 font-light">
              {slide.description}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => onNavigate("bill-analyzer")}
                className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#C1292E] text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#FF6B35]/40 transition-all flex items-center gap-2"
              >
                <Zap size={20} className="fill-white" />{" "}
                {t.analyzeMyBill}
              </button>
              <button
                onClick={() => onNavigate("mission")}
                className="px-8 py-4 border border-white/30 text-white font-semibold text-lg rounded-xl hover:bg-white/10 transition-all"
              >
                {t.learnMore}
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            setCurrentSlide((p) => (p - 1 + 3) % 3)
          }
          className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentSlide((p) => (p + 1) % 3)}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
        >
          <ChevronRight size={24} />
        </button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-12 bg-[#FF6B35]" : "w-2 bg-gray-400 hover:bg-gray-300"}`}
            />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#FF6B35]/10 via-[#FF6B35]/5 to-transparent border-y border-[#FF6B35]/20 py-6 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <TrendingDown
              size={24}
              className="text-[#FF6B35]"
            />
            <span className="text-white font-semibold">
              {t.overpayingBanner}{" "}
              <span className="text-[#FF6B35] font-black">
                $612
              </span>
              {t.perYear}
            </span>
          </div>
          <button
            onClick={() => onNavigate("bill-analyzer")}
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-[#FF6B35] hover:bg-[#e55a26] text-white text-sm font-bold rounded-xl transition-colors"
          >
            <FileText size={14} /> {t.insertYourBill}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-black text-white mb-2">
          {t.ourServices}
        </h2>
        <p className="text-gray-500 mb-8">{t.tapToExplore}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: t.solar,
              icon: (
                <Sun size={36} className="text-yellow-400" />
              ),
              page: "solar",
              desc:
                lang === "en"
                  ? "Clean solar energy for every home and budget."
                  : "Energía solar limpia para cada hogar y presupuesto.",
            },
            {
              label: t.water2,
              icon: (
                <Droplets size={36} className="text-blue-400" />
              ),
              page: "water-solutions",
              desc:
                lang === "en"
                  ? "Smart water systems that save money and conserve resources."
                  : "Sistemas inteligentes que ahorran agua y dinero.",
            },
            {
              label: t.mobile,
              icon: (
                <Wifi size={36} className="text-green-400" />
              ),
              page: "mobile",
              desc:
                lang === "en"
                  ? "Affordable mobile plans. No contracts, no surprises."
                  : "Planes móviles asequibles. Sin contratos, sin sorpresas.",
            },
          ].map((card) => (
            <button
              key={card.label}
              onClick={() => onNavigate(card.page)}
              className="group flex flex-col items-start gap-4 p-8 rounded-2xl border border-gray-800 bg-[#111] hover:border-[#FF6B35]/40 hover:bg-[#FF6B35]/5 transition-all text-left"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] flex items-center justify-center">
                {card.icon}
              </div>
              <div>
                <p className="text-lg font-bold text-white mb-1">
                  {card.label}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <span className="text-xs text-[#FF6B35] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                {lang === "en" ? "Explore →" : "Explorar →"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // Restore session from localStorage on mount
  useEffect(() => {
    const saved = api.getSavedUser();
    if (saved) {
      setUser(saved);
    }
  }, []);

  const handleNavigate = (page) => {
    if (page === "profile" && !user) {
      setShowLogin(true);
      return;
    }
    setCurrentPage(page);
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    setCurrentPage("home");
  };

  if (currentPage === "home")
    return (
      <>
        <HomePage
          onNavigate={handleNavigate}
          lang={lang}
          setLang={setLang}
          user={user}
          onShowLogin={() => setShowLogin(true)}
        />
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onLogin={(u) => {
              setUser(u);
              setShowLogin(false);
            }}
          />
        )}
      </>
    );
  if (currentPage === "bill-analyzer")
    return (
      <BillAnalyzerPage
        onBack={() => setCurrentPage("home")}
        lang={lang}
      />
    );
  if (currentPage === "profile")
    return (
      <ProfilePage
        user={user}
        onBack={() => setCurrentPage("home")}
        onLogout={handleLogout}
      />
    );
  return (
    <InnerPage
      page={currentPage}
      onBack={() => setCurrentPage("home")}
      lang={lang}
    />
  );
}