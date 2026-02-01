"use client";

import React, { useState, useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, Cell, LineChart, Line, ComposedChart, ReferenceArea, PieChart, Pie
} from 'recharts';
import {
    Radio, Users, TrendingUp, Activity, Timer, Shield, Info, Globe, Zap, Cpu,
    Download, Eye, EyeOff, HelpCircle, AlertTriangle, CheckCircle, Clock,
    Smartphone, Monitor, Tablet, Server, Database, Wifi, BarChart3, PieChart as PieChartIcon,
    Target, Crosshair, Layers, GitBranch, RefreshCw, Lock, Unlock, Play, Pause
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Tooltip } from '@/components/shared/Tooltip';
import { InfoPanel } from '@/components/shared/InfoPanel';
import { StatCard } from '@/components/shared/StatCard';

// --- Enhanced Tooltip Component ---
const EnhancedTooltip: React.FC<{
    content: string;
    details?: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}> = ({ content, details, children, position = 'top' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
        left: 'right-full top-1/2 -translate-y-1/2 mr-3',
        right: 'left-full top-1/2 -translate-y-1/2 ml-3'
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {children}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 10 : -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`absolute z-[200] ${positionClasses[position]} w-72 p-4 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl pointer-events-none`}
                    >
                        <div className="flex items-start gap-3 mb-2">
                            <Info size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                            <p className="text-[11px] font-bold text-white leading-relaxed">{content}</p>
                        </div>
                        {details && (
                            <p className="text-[10px] text-zinc-500 leading-relaxed pl-6 border-l border-zinc-800 ml-1">{details}</p>
                        )}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-950 border-r border-b border-zinc-800 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Interactive Section Header ---
const SectionHeader: React.FC<{
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    tooltip: string;
    tooltipDetails?: string;
    status?: 'active' | 'stable' | 'warning';
    onInfoClick?: () => void;
}> = ({ title, subtitle, icon, tooltip, tooltipDetails, status = 'active', onInfoClick }) => {
    const statusColors = {
        active: 'bg-emerald-500',
        stable: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };

    return (
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <EnhancedTooltip content={tooltip} details={tooltipDetails}>
                    <div className="p-3 bg-white/5 rounded-xl cursor-help hover:bg-white/10 transition-colors">
                        {icon}
                    </div>
                </EnhancedTooltip>
                <div>
                    <h4 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                        {title}
                        <div className={`w-1.5 h-1.5 rounded-full ${statusColors[status]} animate-pulse`} />
                    </h4>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{subtitle}</p>
                </div>
            </div>
            {onInfoClick && (
                <button
                    onClick={onInfoClick}
                    className="p-2 rounded-lg border border-zinc-800 hover:border-yellow-400/50 hover:bg-yellow-400/5 transition-all group"
                >
                    <HelpCircle size={16} className="text-zinc-600 group-hover:text-yellow-400 transition-colors" />
                </button>
            )}
        </div>
    );
};

// --- Expandable Info Card ---
const ExpandableInfoCard: React.FC<{
    title: string;
    summary: string;
    details: {
        what: string;
        why: string;
        how: string;
        value: string;
    };
    icon: React.ReactNode;
    color: string;
    children: React.ReactNode;
}> = ({ title, summary, details, icon, color, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            className="tactical-panel rounded-2xl border border-white/5 overflow-hidden group"
        >
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
                            {icon}
                        </div>
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-wider" style={{ color }}>{title}</h4>
                            <p className="text-[9px] text-zinc-600 uppercase tracking-widest">{summary}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-2 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors"
                    >
                        <Info size={14} className={`transition-colors ${isExpanded ? 'text-yellow-400' : 'text-zinc-600'}`} />
                    </button>
                </div>

                {children}

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-zinc-800/50"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-[8px] font-black text-yellow-400 uppercase tracking-widest">What It Is</span>
                                    <p className="text-[10px] text-zinc-400 leading-relaxed">{details.what}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Why It Matters</span>
                                    <p className="text-[10px] text-zinc-400 leading-relaxed">{details.why}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">How It Works</span>
                                    <p className="text-[10px] text-zinc-400 leading-relaxed">{details.how}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">Business Value</span>
                                    <p className="text-[10px] text-zinc-400 leading-relaxed">{details.value}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

// --- Mock Data Generators ---
const LIVE_DATA = Array.from({ length: 60 }, (_, i) => ({
    time: i,
    Conversions: i > 25 && i < 45
        ? 60 + Math.sin(i * 0.5) * 40 + Math.random() * 20
        : 15 + Math.random() * 10,
    Baseline: 15 + Math.random() * 5,
    Confidence: 92 + Math.random() * 4
}));

const CHANNEL_DATA = [
    { name: 'TV Broadcast', value: 40, color: '#facc15', desc: 'Primary ad spot during live event' },
    { name: 'Social Organic', value: 25, color: '#3b82f6', desc: 'Viral mentions and shares' },
    { name: 'Paid Social', value: 20, color: '#a855f7', desc: 'Retargeting and lookalike campaigns' },
    { name: 'Direct Traffic', value: 15, color: '#10b981', desc: 'Brand recall and word-of-mouth' }
];

const LOGS = [
    { time: '20:41:02', event: 'TV_DETECTION', msg: 'Ad Spot: WWE_HALFTIME_PRIME', status: 'ACTIVE', desc: 'Detected live TV advertisement fingerprint in broadcast stream' },
    { time: '20:41:08', event: 'INGEST_SPIKE', msg: 'Mobile Traffic Ingest +240% in US-East', status: 'SYNCD', desc: 'Massive surge in mobile app opens correlating with ad exposure' },
    { time: '20:41:45', event: 'ATTR_LINK', msg: 'Resolved 4.2k causal links via Time-Decay', status: 'LOCKED', desc: 'Attribution model linked conversions to specific touchpoints' },
    { time: '20:42:15', event: 'MODEL_UPDATE', msg: 'mSPRT boundaries stable (p=0.002)', status: 'HEALTHY', desc: 'Statistical test confirms significant lift above baseline' }
];

const DEVICE_DATA = [
    { device: 'Mobile', pct: 82, icon: Smartphone, color: '#facc15' },
    { device: 'Desktop', pct: 12, icon: Monitor, color: '#3b82f6' },
    { device: 'Tablet', pct: 6, icon: Tablet, color: '#a855f7' }
];

export default function LiveEventDashboard() {
    const [mounted, setMounted] = useState(false);
    const [countdown, setCountdown] = useState(245);
    const [surveillanceMode, setSurveillanceMode] = useState(false);
    const [activeLogIndex, setActiveLogIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [showGlobalInfo, setShowGlobalInfo] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            if (!isPaused) {
                setCountdown(c => (c > 0 ? c - 1 : 300));
            }
        }, 1000);
        const logTimer = setInterval(() => {
            if (!isPaused) {
                setActiveLogIndex(prev => (prev + 1) % LOGS.length);
            }
        }, 3000);
        return () => {
            clearInterval(timer);
            clearInterval(logTimer);
        };
    }, [isPaused]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const rs = s % 60;
        return `${m}:${rs.toString().padStart(2, '0')}`;
    };

    if (!mounted) return <div className="min-h-screen bg-[#0a0a0b]" />;

    return (
        <div className={`min-h-screen bg-[#050506] text-white font-mono selection:bg-yellow-500/30 transition-all duration-1000 ${surveillanceMode ? 'saturate-150' : ''}`}>
            {/* Ambient Background Grid */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />
            <div className="scan-line" />

            {/* ==================== HEADER ==================== */}
            <header className="p-8 border-b border-white/5 bg-zinc-900/20 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex items-center gap-8">
                        <EnhancedTooltip
                            content="Live Attribution Engine V4"
                            details="The core real-time attribution system that synchronizes TV broadcast signals with digital conversion events. Processes 14K+ events per second with sub-100ms latency."
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-4 bg-yellow-400 text-black rounded-sm shadow-[0_0_30px_rgba(250,204,21,0.2)] cursor-pointer"
                            >
                                <Zap size={24} fill="black" />
                            </motion.div>
                        </EnhancedTooltip>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <EnhancedTooltip
                                    content="Engine Version 4.0"
                                    details="Fourth-generation attribution engine featuring mSPRT statistical testing, non-linear time-decay kernels, and distributed event processing."
                                >
                                    <span className="px-3 py-0.5 bg-yellow-400 text-black text-[9px] font-black uppercase tracking-[0.2em] cursor-help">Live_Engine_V4</span>
                                </EnhancedTooltip>
                                <EnhancedTooltip
                                    content="Stream Synchronization Latency"
                                    details="Time between TV signal detection and digital event correlation. 87ms is optimal - under 100ms ensures accurate causal attribution without false positives from delayed responses."
                                >
                                    <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest cursor-help">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                        Stream_Sync: 87ms
                                    </span>
                                </EnhancedTooltip>
                            </div>
                            <EnhancedTooltip
                                content="Netflix Event Command Center"
                                details="Real-time monitoring dashboard for the WWE Raw live event on Netflix. Tracks incremental conversions, causal attribution, and ROI measurement during broadcast."
                            >
                                <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none cursor-help">
                                    NETFLIX <span className="text-yellow-400">EVENT_COMMAND</span>
                                </h1>
                            </EnhancedTooltip>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* High Fidelity Mode Toggle */}
                        <EnhancedTooltip
                            content={surveillanceMode ? "High-Fidelity Mode Active" : "Enable High-Fidelity Analysis"}
                            details={surveillanceMode
                                ? "Currently showing granular user-level packet inspection with enhanced visual saturation. Click to return to standard aggregate view."
                                : "Switch to detailed real-time analysis mode for packet-level inspection. Increases visual saturation to highlight active data flows."
                            }
                        >
                            <button
                                onClick={() => setSurveillanceMode(!surveillanceMode)}
                                className={`flex items-center gap-3 px-6 py-4 border text-[10px] font-black uppercase tracking-widest transition-all ${surveillanceMode ? 'border-yellow-400 text-yellow-400 bg-yellow-400/5 shadow-[0_0_25px_rgba(250,204,21,0.15)]' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                            >
                                {surveillanceMode ? <Eye size={14} className="animate-pulse" /> : <EyeOff size={14} />}
                                {surveillanceMode ? 'HIGH_FIDELITY_ON' : 'STANDARD_VIEW'}
                            </button>
                        </EnhancedTooltip>

                        {/* Pause/Play Control */}
                        <EnhancedTooltip
                            content={isPaused ? "Resume Live Updates" : "Pause Live Updates"}
                            details="Temporarily freeze all real-time data streams for detailed analysis. Does not affect actual data collection - only the UI refresh."
                        >
                            <button
                                onClick={() => setIsPaused(!isPaused)}
                                className={`p-4 border rounded-lg transition-all ${isPaused ? 'border-red-500 bg-red-500/10' : 'border-zinc-800 hover:border-zinc-600'}`}
                            >
                                {isPaused ? <Play size={14} className="text-red-500" /> : <Pause size={14} className="text-zinc-500" />}
                            </button>
                        </EnhancedTooltip>

                        <div className="h-14 w-px bg-white/5 hidden lg:block" />

                        {/* Countdown Timer */}
                        <EnhancedTooltip
                            content="Next Commercial Spike Prediction"
                            details="AI-predicted time until next TV commercial break. Prepare for conversion spike - historical data shows 240% traffic increase within 15 seconds of ad exposure."
                        >
                            <div className="flex flex-col items-center px-8 border-x border-white/5 cursor-help">
                                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Next_Commercial_Spike</span>
                                <div className="flex items-center gap-3 text-3xl font-black italic text-yellow-400 tabular-nums leading-none">
                                    <Timer size={24} />
                                    {formatTime(countdown)}
                                </div>
                            </div>
                        </EnhancedTooltip>

                        {/* Export Button */}
                        <EnhancedTooltip
                            content="Export Attribution Report"
                            details="Generate comprehensive PDF/CSV report including: causal attribution breakdown, incremental lift analysis, confidence intervals, and ROI calculations. Suitable for executive presentations and financial reconciliation."
                        >
                            <button className="flex items-center gap-3 bg-white text-black px-8 py-5 font-black uppercase text-xs tracking-widest hover:bg-yellow-400 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95">
                                <Download size={16} />
                                EXPORT_REPORT
                            </button>
                        </EnhancedTooltip>
                    </div>
                </div>
            </header>

            <main className="p-10 max-w-[1700px] mx-auto space-y-10">
                {/* ==================== PROTOCOL INFO ==================== */}
                <section>
                    <InfoPanel
                        title="Live Correlation Protocol"
                        description="Real-time attribution synchronization for high-volume broadcast events. This system answers: 'Did this TV ad actually cause these conversions?'"
                        details="The system employs a non-linear time-decay kernel to resolve 'Second Screen' spikes. It assumes a 15-second primary window for TV-to-Mobile intent transfer, based on Nielsen research showing peak mobile activity 8-12 seconds post-exposure."
                        useCase="Measures the TRUE incremental lift of live halftime spots versus organic social trending. Separates correlation from causation - not all traffic during an ad is caused by the ad."
                        technical="Proprietary mSPRT (Mixture Sequential Probability Ratio Test) running on a distributed event loop with sub-100ms lag ingestion. Bayesian inference with Dirichlet priors for uncertainty quantification."
                    />
                </section>

                {/* ==================== TOP METRICS GRID ==================== */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <EnhancedTooltip
                        content="Current Live Audience Size"
                        details="Number of unique viewers currently watching the WWE Raw live event on Netflix. This is the total addressable audience for TV attribution - not all viewers will see your ad or convert."
                        position="bottom"
                    >
                        <div className="w-full">
                            <StatCard label="Live Audience" value="18.4M" trend="+12.2%" trendType="up" color="#fbbf24" icon={Users} />
                        </div>
                    </EnhancedTooltip>

                    <EnhancedTooltip
                        content="Incremental Return on Investment"
                        details="For every $1 spent on this broadcast ad, you're generating $3.14 in incremental revenue. 'Incremental' means revenue that would NOT have occurred without the ad - excludes organic conversions."
                        position="bottom"
                    >
                        <div className="w-full">
                            <StatCard label="Incremental ROI" value="3.14x" trend="OPTIMAL" trendType="up" color="#10b981" icon={TrendingUp} />
                        </div>
                    </EnhancedTooltip>

                    <EnhancedTooltip
                        content="Causal Attribution Gap"
                        details="Average time between TV exposure and attributed conversion action. 4.2 seconds indicates strong 'immediate intent' - users are acting on the ad quickly, suggesting high relevance and clear call-to-action."
                        position="bottom"
                    >
                        <div className="w-full">
                            <StatCard label="Causal Gap" value="4.2s" trend="STABLE" trendType="neutral" color="#3b82f6" icon={Activity} />
                        </div>
                    </EnhancedTooltip>

                    <EnhancedTooltip
                        content="Attribution Model Health Score"
                        details="Confidence in the model's statistical validity. 98.2% indicates: sufficient sample size, stable baseline, no data quality issues, and mSPRT convergence. Below 90% would trigger automated alerts."
                        position="bottom"
                    >
                        <div className="w-full">
                            <StatCard label="Model Health" value="98.2%" trend="ACTIVE" trendType="up" color="#a855f7" icon={Shield} />
                        </div>
                    </EnhancedTooltip>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* ==================== MAIN VELOCITY CHART ==================== */}
                    <section className="col-span-12 lg:col-span-8 tactical-panel p-10 rounded-3xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-10 transition-opacity">
                            <Activity size={240} />
                        </div>

                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <EnhancedTooltip
                                    content="Conversion Velocity Chart"
                                    details="Real-time visualization of conversion events per second. The yellow area shows actual conversions; the dashed line shows expected baseline. The gap between them is your incremental lift."
                                >
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white cursor-help">Conversion Velocity</h3>
                                </EnhancedTooltip>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">Causal_Analysis::Active</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <EnhancedTooltip content="Impact Spike Zone" details="Highlighted area where conversions significantly exceed baseline - this is attributed to your TV ad.">
                                    <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-lg flex items-center gap-3 cursor-help">
                                        <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15]" />
                                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">IMPACT_SPIKE</span>
                                    </div>
                                </EnhancedTooltip>
                                <EnhancedTooltip content="Baseline Noise" details="Expected conversion rate without any TV ad exposure - organic traffic from SEO, direct, social, etc.">
                                    <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-lg flex items-center gap-3 cursor-help">
                                        <div className="w-2 h-2 rounded-full bg-zinc-700" />
                                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">BASELINE_NOISE</span>
                                    </div>
                                </EnhancedTooltip>
                            </div>
                        </div>

                        <div className="h-[400px] relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={LIVE_DATA}>
                                    <defs>
                                        <linearGradient id="spikeGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                    <XAxis dataKey="time" hide />
                                    <YAxis hide domain={[0, 120]} />
                                    <RechartsTooltip
                                        cursor={{ stroke: '#facc15', strokeWidth: 2 }}
                                        contentStyle={{ backgroundColor: '#050505', border: '1px solid #222', borderRadius: '8px', padding: '12px' }}
                                        labelFormatter={(value) => `T+${value}s`}
                                        formatter={(value: number, name: string) => [
                                            `${value.toFixed(1)} ${name === 'Conversions' ? 'conv/sec' : 'expected'}`,
                                            name
                                        ]}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="Conversions"
                                        stroke="#facc15"
                                        strokeWidth={4}
                                        fill="url(#spikeGrad)"
                                        animationDuration={2000}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="Baseline"
                                        stroke="#27272a"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        dot={false}
                                    />
                                    <ReferenceArea x1={25} x2={45} fill="rgba(250, 204, 21, 0.05)" label={{ value: 'AD_BREAK_SPIKE', position: 'top', fill: '#facc15', fontSize: 10, fontWeight: 900, dy: 30 }} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/50">
                            <div className="text-center">
                                <EnhancedTooltip content="Peak Conversion Rate" details="Maximum conversions per second during the ad break spike - 4.2x higher than baseline.">
                                    <div className="cursor-help">
                                        <div className="text-2xl font-black text-yellow-400">94.2</div>
                                        <div className="text-[9px] text-zinc-600 uppercase tracking-widest">Peak Conv/Sec</div>
                                    </div>
                                </EnhancedTooltip>
                            </div>
                            <div className="text-center">
                                <EnhancedTooltip content="Total Incremental Conversions" details="Total conversions attributed to this ad break that would not have occurred organically.">
                                    <div className="cursor-help">
                                        <div className="text-2xl font-black text-emerald-400">4,247</div>
                                        <div className="text-[9px] text-zinc-600 uppercase tracking-widest">Incremental Conv</div>
                                    </div>
                                </EnhancedTooltip>
                            </div>
                            <div className="text-center">
                                <EnhancedTooltip content="Statistical Confidence" details="Probability that observed lift is real and not due to random chance. 99.8% = extremely confident.">
                                    <div className="cursor-help">
                                        <div className="text-2xl font-black text-blue-400">99.8%</div>
                                        <div className="text-[9px] text-zinc-600 uppercase tracking-widest">Confidence</div>
                                    </div>
                                </EnhancedTooltip>
                            </div>
                        </div>

                        <div className="mt-8">
                            <InfoPanel
                                title="Understanding This Chart"
                                description="This chart separates 'correlation' from 'causation' - the fundamental challenge in TV attribution."
                                details="The yellow area shows real conversion events. The dashed baseline shows what would have happened WITHOUT the TV ad. The shaded 'AD_BREAK_SPIKE' region is where we attribute conversions TO the TV ad."
                                useCase="When conversions spike above baseline during/after your ad, that's incremental lift. The area BETWEEN the yellow line and baseline = money your ad actually generated."
                                technical="Uses Dynamic Poisson modeling with adaptive latent parameters. Baseline calculated via 5-min rolling average with outlier rejection. Spike detection via 3-sigma threshold."
                            />
                        </div>
                    </section>

                    {/* ==================== ENHANCED SIDEBAR ==================== */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">

                        {/* Stream Integrity Panel - Enhanced */}
                        <section className="sidebar-panel p-6 relative overflow-hidden group">
                            {/* Gradient accent line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500" />

                            {/* Animated background glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-700" />

                            <SectionHeader
                                title="Stream_Integrity"
                                subtitle="Ingest_Cluster_09"
                                icon={<Cpu size={20} className="text-yellow-400" />}
                                tooltip="Data Pipeline Health Monitor"
                                tooltipDetails="Real-time monitoring of the event ingestion pipeline. Ensures all conversion events are captured, processed, and attributed without data loss or latency issues."
                                status="active"
                            />

                            {/* Performance Gauge */}
                            <div className="mb-6 p-4 glass-amber rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[9px] font-black text-amber-400/80 uppercase tracking-widest">System Load</span>
                                    <span className="text-lg font-black text-white">67%</span>
                                </div>
                                <div className="h-3 bg-black/40 rounded-full overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '67%' }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full rounded-full relative overflow-hidden"
                                        style={{ background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)' }}
                                    >
                                        <div className="absolute inset-0 animate-shimmer" />
                                    </motion.div>
                                    {/* Threshold markers */}
                                    <div className="absolute top-0 bottom-0 left-[80%] w-px bg-red-500/50" />
                                    <div className="absolute top-0 bottom-0 left-[90%] w-px bg-red-500" />
                                </div>
                                <div className="flex justify-between mt-2 text-[8px] text-zinc-600">
                                    <span>0%</span>
                                    <span className="text-amber-500/60">Warning: 80%</span>
                                    <span className="text-red-500/60">Critical: 90%</span>
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {[
                                    { label: 'Throughput', value: '14.2K', unit: 'eps', color: 'amber', icon: Zap },
                                    { label: 'Latency', value: '12', unit: 'ms', color: 'cyan', icon: Clock },
                                    { label: 'Accuracy', value: '99.9', unit: '%', color: 'emerald', icon: Target },
                                    { label: 'Uptime', value: '99.99', unit: '%', color: 'purple', icon: Shield }
                                ].map((metric, i) => (
                                    <EnhancedTooltip key={i} content={metric.label} details={`Current ${metric.label.toLowerCase()}: ${metric.value}${metric.unit}`}>
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            className={`p-3 rounded-xl cursor-help transition-all glass-${metric.color}`}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <metric.icon size={12} className={`text-${metric.color}-400`} />
                                                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider">{metric.label}</span>
                                            </div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-black text-white">{metric.value}</span>
                                                <span className="text-[10px] text-zinc-500">{metric.unit}</span>
                                            </div>
                                        </motion.div>
                                    </EnhancedTooltip>
                                ))}
                            </div>

                            {/* Progress Bars */}
                            <div className="space-y-4">
                                {[
                                    { label: 'Ingest Load', val: '14.2K eps', pct: 65, gradient: 'from-yellow-500 to-amber-600' },
                                    { label: 'Cluster Sync', val: '99.9%', pct: 99, gradient: 'from-emerald-500 to-teal-600' },
                                    { label: 'Buffer Depth', val: '12ms', pct: 15, gradient: 'from-blue-500 to-cyan-600' }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{item.label}</span>
                                            <span className="text-[11px] font-black text-zinc-300">{item.val}</span>
                                        </div>
                                        <div className="h-2 bg-zinc-900/80 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.pct}%` }}
                                                transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                                                className={`h-full rounded-full bg-gradient-to-r ${item.gradient}`}
                                                style={{ boxShadow: '0 0 12px currentColor' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Info Footer */}
                            <div className="mt-5 p-3 bg-gradient-to-r from-amber-500/5 to-transparent rounded-lg border-l-2 border-amber-500/50">
                                <p className="text-[9px] text-zinc-500 leading-relaxed">
                                    <span className="text-amber-400 font-bold">Why this matters:</span> Pipeline health = attribution accuracy. Dropped events mean understated ROI.
                                </p>
                            </div>
                        </section>

                        {/* Regional Performance Panel - NEW */}
                        <section className="sidebar-panel p-6 relative overflow-hidden group">
                            {/* Gradient accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/15 transition-all duration-700" />

                            <SectionHeader
                                title="Regional_Matrix"
                                subtitle="Geographic Distribution"
                                icon={<Globe size={20} className="text-cyan-400" />}
                                tooltip="Regional Performance Breakdown"
                                tooltipDetails="Real-time view of attribution performance across geographic regions. Shows traffic distribution, latency, and conversion rates by location."
                                status="active"
                            />

                            {/* Region Cards */}
                            <div className="space-y-3">
                                {[
                                    { region: 'US-East', traffic: '42%', latency: '23ms', status: 'optimal', color: 'emerald' },
                                    { region: 'US-West', traffic: '28%', latency: '45ms', status: 'optimal', color: 'emerald' },
                                    { region: 'EU-West', traffic: '18%', latency: '89ms', status: 'good', color: 'blue' },
                                    { region: 'APAC', traffic: '12%', latency: '142ms', status: 'elevated', color: 'amber' }
                                ].map((region, i) => (
                                    <EnhancedTooltip key={i} content={`${region.region} Region`} details={`Handling ${region.traffic} of traffic with ${region.latency} average latency. Status: ${region.status}`}>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ x: 4 }}
                                            className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-zinc-900/80 to-transparent border border-white/5 cursor-help group/item hover:border-white/10 transition-all"
                                        >
                                            <div className={`w-2 h-2 rounded-full bg-${region.color}-500 shadow-lg animate-pulse`} style={{ boxShadow: `0 0 10px var(--tw-shadow-color)` }} />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] font-black text-white uppercase tracking-wide">{region.region}</span>
                                                    <span className={`text-[9px] font-bold text-${region.color}-400 uppercase`}>{region.status}</span>
                                                </div>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className="text-[9px] text-zinc-500"><span className="text-zinc-300 font-bold">{region.traffic}</span> traffic</span>
                                                    <span className="text-[9px] text-zinc-500"><span className="text-zinc-300 font-bold">{region.latency}</span> latency</span>
                                                </div>
                                            </div>
                                            <Wifi size={14} className={`text-${region.color}-500/50 group-hover/item:text-${region.color}-400 transition-colors`} />
                                        </motion.div>
                                    </EnhancedTooltip>
                                ))}
                            </div>

                            {/* Mini World Map Indicator */}
                            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-zinc-900/60 to-zinc-950/80 border border-white/5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Global Coverage</div>
                                        <div className="text-lg font-black text-white">4 Regions</div>
                                    </div>
                                    <div className="flex gap-1">
                                        {['emerald', 'emerald', 'blue', 'amber'].map((c, i) => (
                                            <div key={i} className={`w-3 h-8 rounded-sm bg-${c}-500/30`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Telemetry Stream Panel - Enhanced */}
                        <section className="sidebar-panel p-6 relative overflow-hidden group">
                            {/* Gradient accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500" />
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-all duration-700" />

                            <SectionHeader
                                title="Telemetry_Stream"
                                subtitle="Real-Time Event Log"
                                icon={<Database size={20} className="text-purple-400" />}
                                tooltip="Live System Events"
                                tooltipDetails="Real-time feed of significant system events including TV ad detection, traffic spikes, attribution calculations, and model health updates."
                                status="active"
                            />

                            {/* Event Timeline */}
                            <div className="space-y-3 mb-4">
                                {LOGS.map((log, i) => (
                                    <EnhancedTooltip key={i} content={log.event} details={log.desc}>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className={`relative flex gap-3 p-3 rounded-xl cursor-help transition-all duration-300 ${
                                                i === activeLogIndex
                                                    ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/30 shadow-lg shadow-yellow-500/5'
                                                    : 'bg-zinc-900/40 border border-white/5 hover:border-white/10'
                                            }`}
                                        >
                                            {/* Timeline connector */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-2.5 h-2.5 rounded-full ${i === activeLogIndex ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 'bg-zinc-700'}`} />
                                                {i < LOGS.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-zinc-700 to-transparent mt-1" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[9px] font-mono text-zinc-600 tracking-wider">{log.time}</span>
                                                    <span className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-tight ${
                                                        i === activeLogIndex ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-500'
                                                    }`}>
                                                        {log.event}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] font-semibold text-zinc-400 truncate">{log.msg}</p>
                                            </div>
                                        </motion.div>
                                    </EnhancedTooltip>
                                ))}
                            </div>

                            {/* System Status Footer */}
                            <div className="grid grid-cols-2 gap-3">
                                <EnhancedTooltip content="System Integrity" details="All automated diagnostics passing. Model convergence confirmed.">
                                    <div className="p-3 glass-emerald rounded-xl cursor-help">
                                        <div className="flex items-center gap-2">
                                            <Lock size={14} className="text-emerald-400" />
                                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-wider">Locked</span>
                                        </div>
                                    </div>
                                </EnhancedTooltip>
                                <EnhancedTooltip content="Alert Status" details="No active alerts. All thresholds within normal range.">
                                    <div className="p-3 glass-surface rounded-xl cursor-help">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle size={14} className="text-zinc-400" />
                                            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">0 Alerts</span>
                                        </div>
                                    </div>
                                </EnhancedTooltip>
                            </div>
                        </section>

                        {/* Quick Actions Panel - NEW */}
                        <section className="sidebar-panel p-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

                            <div className="flex items-center gap-3 mb-4">
                                <RefreshCw size={18} className="text-emerald-400" />
                                <h4 className="text-sm font-black uppercase tracking-wider text-white">Quick Actions</h4>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { label: 'Refresh Data', icon: RefreshCw, color: 'emerald' },
                                    { label: 'Export CSV', icon: Download, color: 'blue' },
                                    { label: 'View Logs', icon: Database, color: 'purple' },
                                    { label: 'Alerts', icon: AlertTriangle, color: 'amber' }
                                ].map((action, i) => (
                                    <EnhancedTooltip key={i} content={action.label} details={`Click to ${action.label.toLowerCase()}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.02, y: -1 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 hover:border-${action.color}-500/30 transition-all group/btn`}
                                        >
                                            <action.icon size={14} className={`text-${action.color}-500 group-hover/btn:scale-110 transition-transform`} />
                                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide group-hover/btn:text-white transition-colors">{action.label}</span>
                                        </motion.button>
                                    </EnhancedTooltip>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* ==================== BOTTOM ANALYTICS GRID ==================== */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Channel Distribution */}
                    <ExpandableInfoCard
                        title="Channel Distribution"
                        summary="Attribution by Source"
                        icon={<BarChart3 size={16} className="text-blue-400" />}
                        color="#3b82f6"
                        details={{
                            what: "Breakdown of how credit is distributed across marketing channels for this live event.",
                            why: "Understand which channels drive incremental conversions vs. which just capture existing demand.",
                            how: "Uses Shapley value calculations to fairly distribute credit based on marginal contribution of each channel.",
                            value: "Optimize budget allocation - shift spend from low-impact to high-impact channels."
                        }}
                    >
                        <div className="h-32 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={CHANNEL_DATA} layout="vertical">
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" hide />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#050505', border: '1px solid #222', borderRadius: '8px' }}
                                        formatter={(value: number, name: string, props: any) => [`${value}%`, props.payload.desc]}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                        {CHANNEL_DATA.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                                opacity={selectedChannel === null || selectedChannel === index ? 1 : 0.3}
                                                cursor="pointer"
                                                onClick={() => setSelectedChannel(selectedChannel === index ? null : index)}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {CHANNEL_DATA.map((ch, i) => (
                                <EnhancedTooltip key={i} content={ch.name} details={ch.desc}>
                                    <button
                                        onClick={() => setSelectedChannel(selectedChannel === i ? null : i)}
                                        className={`flex items-center gap-1.5 px-2 py-1 rounded text-[8px] font-bold uppercase transition-all ${selectedChannel === i ? 'bg-white/10 border border-white/20' : 'border border-transparent hover:border-zinc-700'}`}
                                    >
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.color }} />
                                        <span className="text-zinc-400">{ch.value}%</span>
                                    </button>
                                </EnhancedTooltip>
                            ))}
                        </div>
                    </ExpandableInfoCard>

                    {/* mSPRT Convergence */}
                    <ExpandableInfoCard
                        title="mSPRT Convergence"
                        summary="Statistical Validity"
                        icon={<Target size={16} className="text-emerald-400" />}
                        color="#10b981"
                        details={{
                            what: "Mixture Sequential Probability Ratio Test - a statistical method for continuous hypothesis testing.",
                            why: "Tells you if your observed lift is statistically significant or just random noise. Critical for confident decision-making.",
                            how: "Continuously calculates likelihood ratio as data streams in. R-Hat near 1.0 indicates model chains have converged.",
                            value: "Avoid false positives - don't celebrate (or optimize for) 'lift' that's actually just variance."
                        }}
                    >
                        <div className="text-center py-4">
                            <EnhancedTooltip
                                content="R-Hat Convergence Statistic"
                                details="Gelman-Rubin diagnostic. Values between 1.0-1.05 indicate excellent convergence. Your 1.02 means the model is stable and trustworthy."
                            >
                                <div className="cursor-help">
                                    <div className="text-5xl font-black italic text-white tracking-widest group-hover:scale-110 transition-transform">1.02</div>
                                    <span className="text-[9px] font-bold text-emerald-500 mt-2 uppercase tracking-widest flex items-center justify-center gap-2">
                                        <CheckCircle size={12} />
                                        R-Hat Optimal
                                    </span>
                                </div>
                            </EnhancedTooltip>
                        </div>
                        <div className="flex justify-center gap-6 mt-2 text-[9px] text-zinc-600">
                            <span>p-value: 0.002</span>
                            <span>|</span>
                            <span>Power: 94%</span>
                        </div>
                    </ExpandableInfoCard>

                    {/* Device Composition */}
                    <ExpandableInfoCard
                        title="Device Composition"
                        summary="Platform Breakdown"
                        icon={<Smartphone size={16} className="text-yellow-400" />}
                        color="#facc15"
                        details={{
                            what: "Distribution of converting users by device type - Mobile, Desktop, or Tablet.",
                            why: "82% mobile indicates 'second screen' behavior - users watching TV while browsing on phone. Classic live event pattern.",
                            how: "Device fingerprinting from user-agent strings and screen resolution data at conversion time.",
                            value: "Optimize landing pages for mobile-first. Consider mobile-specific CTAs for live event campaigns."
                        }}
                    >
                        <div className="space-y-3 py-2">
                            {DEVICE_DATA.map((device, i) => (
                                <EnhancedTooltip
                                    key={i}
                                    content={`${device.device}: ${device.pct}%`}
                                    details={device.device === 'Mobile' ? 'Primary conversion device - users watching TV on one screen, converting on their phone.' : `Secondary device contributing ${device.pct}% of conversions.`}
                                >
                                    <div className="flex items-center gap-3 cursor-help group">
                                        <device.icon size={14} className="text-zinc-600 group-hover:text-white transition-colors" style={{ color: device.color }} />
                                        <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${device.pct}%` }}
                                                transition={{ duration: 1, delay: i * 0.2 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: device.color }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-zinc-400 w-10 text-right">{device.pct}%</span>
                                    </div>
                                </EnhancedTooltip>
                            ))}
                        </div>
                    </ExpandableInfoCard>

                    {/* Global Deployment */}
                    <ExpandableInfoCard
                        title="Global Deployment"
                        summary="Infrastructure Status"
                        icon={<Globe size={16} className="text-purple-400" />}
                        color="#a855f7"
                        details={{
                            what: "Geographic distribution of processing infrastructure and current regional status.",
                            why: "Edge processing ensures low-latency attribution regardless of user location. Critical for real-time accuracy.",
                            how: "Distributed Kubernetes clusters across AWS regions with automatic failover and load balancing.",
                            value: "Global reach = no blind spots. Every conversion captured regardless of user geography."
                        }}
                    >
                        <div className="py-4 text-center">
                            <EnhancedTooltip
                                content="Click to view regional status"
                                details="Opens detailed view of all processing regions, their health status, and current load distribution."
                            >
                                <button
                                    onClick={() => setShowGlobalInfo(!showGlobalInfo)}
                                    className="group"
                                >
                                    <Globe size={48} className="text-zinc-800 mx-auto mb-4 group-hover:text-purple-400 group-hover:rotate-180 transition-all duration-[2s]" />
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                        {showGlobalInfo ? 'Hide Details' : 'View Regions'}
                                    </span>
                                </button>
                            </EnhancedTooltip>
                        </div>
                        <AnimatePresence>
                            {showGlobalInfo && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="grid grid-cols-2 gap-2 text-[9px]"
                                >
                                    {['US-East', 'US-West', 'EU-West', 'APAC'].map((region, i) => (
                                        <div key={i} className="flex items-center gap-2 p-2 bg-zinc-900/50 rounded">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <span className="text-zinc-400">{region}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </ExpandableInfoCard>
                </div>
            </main>

            {/* ==================== FOOTER ==================== */}
            <footer className="mt-20 p-12 border-t border-white/5 bg-zinc-900/20">
                <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-12">
                        <EnhancedTooltip content="System Status" details="All systems operational. Real-time synchronization active with no detected issues.">
                            <div className="flex items-center gap-3 cursor-help">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15]" />
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">SYSTEM_SYNC_ACTIVE</span>
                            </div>
                        </EnhancedTooltip>
                        <EnhancedTooltip content="Build Version" details="Current deployment version. Format: Major.Minor.Commit">
                            <div className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] font-mono cursor-help">BUILD::4A.19.FC</div>
                        </EnhancedTooltip>
                    </div>
                    <div className="flex gap-10 text-[10px] font-black text-zinc-700 uppercase tracking-[0.2em]">
                        <EnhancedTooltip content="Netflix Metrics Integration" details="Connected to Netflix's internal metrics API for audience size and viewing data.">
                            <span className="cursor-help hover:text-white transition-colors tracking-widest">NETFLIX_METRICS_SERVER</span>
                        </EnhancedTooltip>
                        <EnhancedTooltip content="WWE Broadcast Hub" details="Real-time feed from WWE's broadcast truck for ad break timing and content detection.">
                            <span className="cursor-help hover:text-white transition-colors tracking-widest">WWE_BROADCAST_HUB</span>
                        </EnhancedTooltip>
                    </div>
                    <EnhancedTooltip content="Marketing Science Engineering" details="Built by the Marketing Science team for premium attribution use cases.">
                        <div className="text-[10px] font-black text-zinc-900 uppercase tracking-[0.5em] italic cursor-help">MAR_SCI_ENGINEERING_PRM</div>
                    </EnhancedTooltip>
                </div>
            </footer>
        </div>
    );
}
