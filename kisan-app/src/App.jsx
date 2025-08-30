import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Routes, Route, Link } from "react-router-dom";
import CameraUpload from "./CameraUpload";
// import diseaseRoutes from "./routes/disease.js";
// app.use("/api/disease", diseaseRoutes);
import {
  Leaf,
  Droplets,
  LineChart as LineChartIcon,
  Bell,
  Mic,
  Image as ImageIcon,
  BarChart2,
  Settings as SettingsIcon,
  Sprout,
  CloudRain,
  IndianRupee,
} from "lucide-react";
import {
  LineChart as RLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// ------------------------------------------------------------
// KISAN AI – SINGLE-FILE REACT FRONTEND (HACKATHON STARTER)
// ------------------------------------------------------------
// ✓ Tailwind UI, minimal state, no backend required for demo
// ✓ Replace the placeholder "TODO"s with real API calls later
// ------------------------------------------------------------

// ---- Shared UI primitives ----
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white shadow-sm border border-gray-100 p-4 ${className}`}>{children}</div>
);

const Pill = ({ color = "bg-[#C6F6D5] text-[#22543D]", children }) => (
  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${color}`}>{children}</span>
);

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-4">
    <div className="p-2 rounded-xl bg-[#C6F6D5] text-[#22543D]"><Icon size={18} /></div>
    <div>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

// ---- Mock Data & Helpers ----
const crops = ["Wheat", "Rice", "Maize", "Cotton", "Tomato", "Potato"];
const soils = ["Sandy", "Loamy", "Clay"];

const samplePriceSeries = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  price: 1800 + Math.round(Math.sin(i/2) * 180) + Math.round(Math.random() * 120),
}));

const sampleYieldSeries = Array.from({ length: 10 }, (_, i) => ({
  week: `W${i+1}`,
  predicted: 20 + i * 5 + Math.round(Math.sin(i) * 2),
  actual: 20 + i * 5 + (i > 5 ? Math.round(Math.sin(i)*3) - 6 : -2),
}));

const tipsByCrop = {
  Wheat: [
    "Irrigate at crown root initiation stage (20–25 days after sowing).",
    "Avoid late nitrogen application to reduce lodging risk.",
  ],
  Rice: [
    "Maintain 2–5 cm water depth during tillering stage.",
    "Use seed treatment to reduce bacterial leaf blight.",
  ],
  Tomato: [
    "Scout weekly for early blight; remove infected leaves.",
    "Mulch to retain moisture and reduce weed pressure.",
  ],
};
function Home() {
  const [plant, setPlant] = useState("");
  const [disease, setDisease] = useState("");
  const [solution, setSolution] = useState("");
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("plant", plant);
    formData.append("disease", disease);
    formData.append("solution", solution);
    if (image) formData.append("image", image);

    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-700 mb-4">🌱 Kisan App</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Plant Name"
            value={plant}
            onChange={(e) => setPlant(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Solution"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Submit
          </button>
        </form>

        <Link
          to="/camera"
          className="block text-center mt-4 text-green-600 hover:underline"
        >
          📷 Use Camera Upload
        </Link>

        {response && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <h2 className="text-lg font-semibold text-green-800">Saved:</h2>
            <p><strong>Plant:</strong> {response.data.plant}</p>
            <p><strong>Disease:</strong> {response.data.disease}</p>
            <p><strong>Solution:</strong> {response.data.solution}</p>
            {response.data.imageUrl && (
              <img
                src={`http://localhost:5000${response.data.imageUrl}`}
                alt="Uploaded"
                className="mt-2 rounded-lg"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}



// ---- Placeholder AI/Logic Functions (replace with real APIs) ----
function predictDiseaseMock(file) {
  // Very naive mock – swap for real model call
  return new Promise((resolve) => {
    setTimeout(() => {
      const diseases = [
        { name: "Early Blight", remedy: "Apply copper-based fungicide; remove infected leaves.", severity: "Medium" },
        { name: "Leaf Rust", remedy: "Use triazole fungicide; improve air flow.", severity: "Low" },
        { name: "Mosaic Virus", remedy: "Remove and destroy infected plants; control aphids.", severity: "High" },
        { name: "Healthy", remedy: "No action needed. Keep monitoring.", severity: "None" },
      ];
      resolve(diseases[Math.floor(Math.random() * diseases.length)]);
    }, 900);
  });
}

function computeIrrigation({ area, soil, rainTomorrow = false, humidity = 55 }) {
  // Simple heuristics per soil (mm/day), then area scaling; 1 mm over 1 hectare ~= 10,000 L
  const baseBySoil = { Sandy: 6.5, Loamy: 5, Clay: 3.5 };
  const base = baseBySoil[soil] ?? 5;
  const humidityAdj = humidity > 70 ? -0.8 : humidity < 35 ? +0.8 : 0;
  const rainAdj = rainTomorrow ? -1.2 : 0;
  const mmPerDay = Math.max(0, base + humidityAdj + rainAdj);
  const litersPerHectare = mmPerDay * 10000;
  const hectares = area.unit === "ac" ? area.value * 0.404686 : area.value; // ac → ha
  const liters = Math.round(litersPerHectare * hectares);
  const nextIrrigationInDays = mmPerDay < 2 ? 3 : mmPerDay < 4 ? 2 : 1;
  return { mmPerDay, liters, nextIrrigationInDays };
}

function forecastYieldMock(crop) {
  return sampleYieldSeries.map(p => ({ ...p }));
}

// ---- Main App ----
export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [language, setLanguage] = useState("English");
  const [unit, setUnit] = useState("ha");
  const [profile, setProfile] = useState({ name: "Farmer", location: "Rajkot, Gujarat", crop: "Wheat" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FAFC] to-white">
      <TopNav active={active} onChange={setActive} />
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <aside className="lg:w-64">
            <ProfileCard profile={profile} />
            <SettingsPanel language={language} setLanguage={setLanguage} unit={unit} setUnit={setUnit} />
            <NotificationsPanel />
          </aside>
          <main className="flex-1">
            {active === "Dashboard" && <Dashboard profile={profile} unit={unit} />}
            {active === "Crop Health" && <CropHealth />}
            {active === "Irrigation" && <Irrigation unit={unit} />}
            {active === "Yield" && <Yield crop={profile.crop} />}
            {active === "Market" && <MarketPrices crop={profile.crop} />}
            {active === "Optimizer" && <Optimizer unit={unit} />}
            {active === "Knowledge" && <KnowledgeHub crop={profile.crop} />}
            {active === "Chatbot" && <Chatbot />}
            {active === "Login" && <AuthDemo />}
          </main>
        </div>
      </div>
    </div>
  );
}

// ---- Top Navigation ----
function TopNav({ active, onChange }) {
  const tabs = [
    { name: "Dashboard", icon: BarChart2 },
    { name: "Crop Health", icon: Leaf },
    { name: "Irrigation", icon: Droplets },
    { name: "Yield", icon: LineChartIcon },
    { name: "Market", icon: IndianRupee },
    { name: "Optimizer", icon: Sprout },
    { name: "Knowledge", icon: CloudRain },
    { name: "Chatbot", icon: Mic },
    { name: "Login", icon: SettingsIcon },
  ];
  return (
    <div className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#2F855A] text-white font-bold">KA</span>
          <div>
            <div className="text-sm text-gray-500 leading-none">Project</div>
            <h1 className="text-lg font-semibold -mt-0.5">Kisan AI</h1>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {tabs.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => onChange(name)}
              className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F855A] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                active === name
                  ? "bg-[#2F855A] text-white hover:bg-[#22543D] hover:text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#010302]"
              }`}
            >
              <Icon size={16} /> {name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ---- Sidebar Panels ----
function ProfileCard({ profile }) {
  return (
    <Card className="">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#2F855A] text-white flex items-center justify-center font-semibold">{profile.name[0]}</div>
        <div>
          <div className="font-semibold text-gray-900">{profile.name}</div>
          <div className="text-sm text-gray-500">{profile.location}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <Pill><Leaf size={14}/> {profile.crop}</Pill>
        <Pill color="bg-[#F6AD55] text-[#3D2A10]"><CloudRain size={14}/> Monsoon</Pill>
      </div>
    </Card>
  );
}

function SettingsPanel({ language, setLanguage, unit, setUnit }) {
  return (
    <Card className="mt-4">
      <SectionTitle icon={SettingsIcon} title="Quick Settings" />
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Language</span>
          <select className="border rounded-lg px-2 py-1" value={language} onChange={e=>setLanguage(e.target.value)}>
            <option>English</option>
            <option>हिंदी</option>
            <option>ગુજરાતી</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Units</span>
          <select className="border rounded-lg px-2 py-1" value={unit} onChange={e=>setUnit(e.target.value)}>
            <option value="ha">Hectares</option>
            <option value="ac">Acres</option>
          </select>
        </div>
      </div>
    </Card>
  );
}

function NotificationsPanel() {
  const alerts = [
    { label: "Pest risk in your area", type: "warning" },
    { label: "Rain expected tomorrow", type: "info" },
    { label: "Wheat price rising in Rajkot mandi", type: "success" },
  ];
  return (
    <Card className="mt-4">
      <SectionTitle icon={Bell} title="Alerts" subtitle="Recent updates" />
      <div className="space-y-2">
        {alerts.map((a, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className={`w-2.5 h-2.5 rounded-full ${a.type === "warning" ? "bg-amber-500" : a.type === "success" ? "bg-emerald-500" : "bg-sky-500"}`}></span>
            <span className="text-gray-700">{a.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---- Pages ----
function Dashboard({ profile, unit }) {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <SectionTitle icon={Leaf} title="Crop Health" subtitle="AI scan status" />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[#22543D] font-semibold">Healthy</div>
                <div className="text-sm text-gray-500">Last scan: 2 days ago</div>
              </div>
              <div className="p-3 rounded-xl bg-[#2F855A] text-white"><Leaf /></div>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <SectionTitle icon={Droplets} title="Irrigation" subtitle="Today" />
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">No watering needed</div>
                <div className="text-sm text-gray-500">Next in 2 days</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F6AD55] text-[#3D2A10]"><Droplets /></div>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <SectionTitle icon={LineChartIcon} title="Yield Forecast" subtitle={profile.crop} />
            <div className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <RLineChart data={sampleYieldSeries} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="predicted" />
                  <Line type="monotone" dataKey="actual" />
                </RLineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Card>
          <SectionTitle icon={IndianRupee} title="Market Prices" subtitle="12‑month trend" />
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <RLineChart data={samplePriceSeries} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="price" />
              </RLineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionTitle icon={CloudRain} title="Weather" subtitle="Rajkot, next 3 days (demo)" />
          <div className="grid grid-cols-3 gap-3 text-sm">
            {[{d:"Mon", t:"34°/26°", r:"40%"},{d:"Tue", t:"33°/25°", r:"70%"},{d:"Wed", t:"32°/25°", r:"60%"}].map((w, i)=> (
              <div key={i} className="rounded-xl bg-[#F6AD55] text-[#3D2A10] border border-amber-300 p-3">
                <div className="font-medium text-gray-700">{w.d}</div>
                <div className="text-2xl font-semibold">{w.t}</div>
                <div className="text-xs">Rain: {w.r}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function CropHealth() {
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFile = (f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    const url = URL.createObjectURL(f);
    setImgUrl(url);
  };

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    const res = await predictDiseaseMock(file); // TODO: swap with real model API
    setResult(res);
    setLoading(false);
  };

  return (
    <div>
      <SectionTitle icon={Leaf} title="AI Doctor for Crops" subtitle="Upload a leaf/plant photo for instant analysis" />
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="border-2 border-dashed rounded-2xl p-6 text-center">
            {imgUrl ? (
              <img src={imgUrl} alt="preview" className="mx-auto max-h-64 rounded-xl object-cover" />
            ) : (
              <div className="text-gray-500">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-2"><ImageIcon /></div>
                <div className="font-medium">Drop an image here</div>
                <div className="text-sm">or click to browse</div>
              </div>
            )}
            <input type="file" accept="image/*" className="mt-4" onChange={(e)=>onFile(e.target.files?.[0])} />
          </div>
          <button onClick={analyze} disabled={!file || loading} className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 font-medium disabled:opacity-50">
            {loading ? "Analyzing…" : "Analyze Image"}
          </button>
        </Card>
        <Card>
          <div className="min-h-64 flex flex-col justify-center items-start">
            {!result && <div className="text-gray-500">Result will appear here…</div>}
            {result && (
              <div className="space-y-3">
                <Pill color={`${result.severity === "High" ? "bg-rose-100 text-rose-700" : result.severity === "Medium" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{result.severity || "Info"}</Pill>
                <div className="text-2xl font-semibold">{result.name}</div>
                <div className="text-gray-700">{result.remedy}</div>
                <ul className="list-disc pl-5 text-gray-600 text-sm">
                  <li>Isolate affected area and sanitize tools.</li>
                  <li>Monitor for spread; rescan after 3 days.</li>
                  <li>Follow label doses; wear protection.</li>
                </ul>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Irrigation({ unit }) {
  const [areaValue, setAreaValue] = useState(1);
  const [soil, setSoil] = useState("Loamy");
  const [humidity, setHumidity] = useState(55);
  const [rain, setRain] = useState(false);
  const res = useMemo(() => computeIrrigation({ area: { value: Number(areaValue) || 0, unit }, soil, humidity, rainTomorrow: rain }), [areaValue, soil, humidity, rain, unit]);

  return (
    <div>
      <SectionTitle icon={Droplets} title="Irrigation Planner" subtitle="Daily water needs & schedule" />
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              <div className="text-gray-600 mb-1">Field Area ({unit})</div>
              <input className="w-full border rounded-xl px-3 py-2" type="number" min="0" value={areaValue} onChange={(e)=>setAreaValue(e.target.value)} />
            </label>
            <label className="text-sm">
              <div className="text-gray-600 mb-1">Soil Type</div>
              <select className="w-full border rounded-xl px-3 py-2" value={soil} onChange={(e)=>setSoil(e.target.value)}>
                {soils.map(s=> <option key={s}>{s}</option>)}
              </select>
            </label>
            <label className="text-sm">
              <div className="text-gray-600 mb-1">Humidity (%)</div>
              <input className="w-full border rounded-xl px-3 py-2" type="number" min="0" max="100" value={humidity} onChange={(e)=>setHumidity(e.target.value)} />
            </label>
            <label className="text-sm flex items-end gap-2">
              <input type="checkbox" checked={rain} onChange={(e)=>setRain(e.target.checked)} />
              <span className="text-gray-600">Rain expected tomorrow</span>
            </label>
          </div>
        </Card>
        <Card>
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Recommended</div>
            <div className="text-2xl font-semibold">{res.liters.toLocaleString()} L / day</div>
            <div className="text-gray-600">(~{res.mmPerDay.toFixed(1)} mm/day)</div>
            <div className="text-sm text-gray-500">Next irrigation in <span className="font-medium text-gray-700">{res.nextIrrigationInDays} day(s)</span></div>
            <div className="border rounded-xl p-3 text-sm text-[#1A202C] bg-white">Tip: Irrigate in early morning or late evening to reduce evaporation.</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Yield({ crop }) {
  const data = forecastYieldMock(crop);
  return (
    <div>
      <SectionTitle icon={LineChartIcon} title="Yield Forecast" subtitle={`Predicted vs Actual – ${crop}`} />
      <Card>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RLineChart data={data} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="predicted" />
              <Line type="monotone" dataKey="actual" />
            </RLineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function MarketPrices({ crop }) {
  const [region, setRegion] = useState("Rajkot");
  return (
    <div>
      <SectionTitle icon={IndianRupee} title="Market Prices & Trends" subtitle="Demo data – connect Agmarknet later" />
      <Card>
        <div className="flex flex-wrap gap-3 items-center text-sm mb-3">
          <label className="flex items-center gap-2">Crop
            <select className="border rounded-xl px-2 py-1 ml-2">{crops.map(c=> <option key={c} selected={c===crop}>{c}</option>)}</select>
          </label>
          <label className="flex items-center gap-2">Region
            <input className="border rounded-xl px-2 py-1 ml-2" value={region} onChange={(e)=>setRegion(e.target.value)} />
          </label>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RLineChart data={samplePriceSeries} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" />
            </RLineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-sm text-gray-700">
          Best mandi nearby: <span className="font-medium">Rajkot APMC</span> • Average price last month: <span className="font-medium">₹{Math.round(samplePriceSeries.reduce((a,b)=>a+b.price,0)/samplePriceSeries.length)}</span>
        </div>
      </Card>
    </div>
  );
}

function Optimizer({ unit }) {
  const [crop, setCrop] = useState("Wheat");
  const [soil, setSoil] = useState("Loamy");
  const [area, setArea] = useState(1);

  const npkByCrop = {
    Wheat: { N: 120, P: 60, K: 40 },
    Rice: { N: 100, P: 50, K: 50 },
    Maize: { N: 120, P: 60, K: 60 },
    Tomato: { N: 150, P: 75, K: 75 },
  };
  const npk = npkByCrop[crop] || { N: 100, P: 50, K: 50 };
  const hectares = unit === "ac" ? area * 0.404686 : area;
  const dose = Object.fromEntries(Object.entries(npk).map(([k,v]) => [k, Math.round(v * hectares)]));

  return (
    <div>
      <SectionTitle icon={Sprout} title="Water & Fertilizer Optimizer" subtitle="Right input, right amount" />
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <label>
              <div className="text-gray-600 mb-1">Crop</div>
              <select className="w-full border rounded-xl px-3 py-2" value={crop} onChange={(e)=>setCrop(e.target.value)}>
                {crops.map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>
              <div className="text-gray-600 mb-1">Soil</div>
              <select className="w-full border rounded-xl px-3 py-2" value={soil} onChange={(e)=>setSoil(e.target.value)}>
                {soils.map(s => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label className="col-span-2">
              <div className="text-gray-600 mb-1">Area ({unit})</div>
              <input className="w-full border rounded-xl px-3 py-2" type="number" min="0" value={area} onChange={(e)=>setArea(Number(e.target.value))} />
            </label>
          </div>
        </Card>
        <Card>
          <div className="space-y-3">
            <div className="text-sm text-gray-500">Recommended NPK (kg total)</div>
            <div className="grid grid-cols-3 gap-3">
              {(["N","P","K"]).map(k => (
                <div key={k} className="rounded-xl bg-white border border-emerald-200 p-3">
                  <div className="text-xs text-[#22543D] font-medium">{k}</div>
                  <div className="text-2xl font-semibold text-[#22543D]">{dose[k]}</div>
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">Split nitrogen into 2–3 applications; apply P&K at planting.</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function KnowledgeHub({ crop }) {
  const tips = tipsByCrop[crop] || ["No tips available yet."];
  return (
    <div>
      <SectionTitle icon={CloudRain} title="Knowledge Hub" subtitle="Short, actionable tips" />
      <div className="grid md:grid-cols-2 gap-4">
        {tips.map((t, i) => (
          <Card key={i}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2F855A] text-white flex items-center justify-center"><Sprout /></div>
              <div className="text-gray-700">{t}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Chatbot() {
  const [messages, setMessages] = useState([{ from: "bot", text: "Namaste! Ask me about crops, irrigation, or prices." }]);
  const [input, setInput] = useState("");
  const recRef = useRef(null);

  const send = (text) => {
    if (!text.trim()) return;
    const userMsg = { from: "user", text };
    const reply = simpleReply(text);
    setMessages((m) => [...m, userMsg, { from: "bot", text: reply }]);
    setInput("");
  };

  const startMic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Speech Recognition not supported in this browser."); return; }
    const rec = new SR();
    rec.lang = "en-IN"; // TODO: switch based on selected language
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput(text);
      send(text);
    };
    rec.start();
    recRef.current = rec;
  };

  return (
    <div>
      <SectionTitle icon={Mic} title="Voice & Chat Assistant" subtitle="Type or use the mic (demo)" />
      <Card>
        <div className="h-72 overflow-y-auto space-y-2">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.from === "user" ? "ml-auto bg-[#22543D] text-white" : "bg-gray-100 text-gray-800"}`}>{m.text}</div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input className="flex-1 border rounded-xl px-3 py-2" placeholder="Ask about irrigation…" value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter') send(input) }} />
          <button onClick={()=>send(input)} className="bg-[#22543D] hover:bg-[#1C4532] text-white rounded-xl px-4 py-2 font-medium">Send</button>
          <button onClick={startMic} className="p-2 rounded-xl border"><Mic size={18} /></button>
        </div>
      </Card>
    </div>
  );
}

function simpleReply(text) {
  const t = text.toLowerCase();
  if (t.includes("price") || t.includes("daam")) return "Wheat avg ₹2100/q last month in Rajkot. Consider selling this week.";
  if (t.includes("water") || t.includes("sichai") || t.includes("irrigation")) return "No watering today; humidity is high. Next irrigation in 2 days.";
  if (t.includes("disease") || t.includes("patto par daag")) return "Upload a leaf photo in Crop Health to diagnose and get remedy steps.";
  return "Here to help with crop health, irrigation, yield, and prices!";
}

function AuthDemo() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  return (
    <div>
      <SectionTitle icon={SettingsIcon} title="Login / Signup (Demo)" subtitle="Phone + OTP flow" />
      <Card>
        {step === 1 && (
          <div className="space-y-3">
            <label className="text-sm">
              <div className="text-gray-600 mb-1">Phone Number</div>
              <input className="w-full border rounded-xl px-3 py-2" placeholder="+91 9XXXXXXXXX" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            </label>
            <button onClick={()=>setStep(2)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 font-medium">Send OTP</button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            <label className="text-sm">
              <div className="text-gray-600 mb-1">Enter OTP</div>
              <input className="w-full border rounded-xl px-3 py-2" value={otp} onChange={(e)=>setOtp(e.target.value)} />
            </label>
            <button onClick={()=>alert("Logged in (demo)")} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 font-medium">Verify & Login</button>
          </div>
        )}
      </Card>
    </div>
  );
}

// ------------------------------------------------------------
// END OF FILE – Hook points for real integrations
// - Crop Health: replace predictDiseaseMock with your API/model call
// - Irrigation/Weather: fetch weather forecast to adjust schedule
// - Market Prices: replace samplePriceSeries with Agmarknet/FCI data
// - Chatbot: call your NLU/LLM endpoint in simpleReply()
// ------------------------------------------------------------
