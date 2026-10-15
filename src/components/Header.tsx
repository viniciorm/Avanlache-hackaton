import React from 'react';
import { NetworkConfig, Investor } from '../types/rwa';
import { ShieldCheck, Plus, Sparkles, Layers } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  network: NetworkConfig;
  account: Investor;
  onOpenNetworkModal: () => void;
  onOpenWizard: () => void;
  onOpenFaucet: () => void;
  isWeb3Connected: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  network,
  account,
  onOpenNetworkModal,
  onOpenWizard,
  onOpenFaucet,
  isWeb3Connected
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080c14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <div 
          onClick={() => onSelectTab('dashboard')} 
          className="flex items-center gap-3 cursor-pointer whitespace-nowrap shrink-0 group"
        >
          {/* Avalanche Red Hexagon Icon */}
          <div className="w-8 h-8 rounded-lg bg-[#E84142] flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="M12 3L2 19h20L12 3z" fill="currentColor" fillOpacity="0.2" />
              <path d="M12 9l-4 8h8l-4-8z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white group-hover:text-red-400 transition-colors">
              AVALANCHE <span className="text-slate-400 font-normal">/</span> RWA STUDIO
            </span>
          </div>
        </div>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 ${
              currentTab === 'dashboard'
                ? 'text-white border-b-2 border-[#E84142] font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Resumen Ejecutivo
          </button>
          <button
            onClick={() => onSelectTab('assets')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 ${
              currentTab === 'assets'
                ? 'text-white border-b-2 border-[#E84142] font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Portafolio RWA
          </button>
          <button
            onClick={() => onSelectTab('monitor')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 flex items-center gap-1.5 ${
              currentTab === 'monitor'
                ? 'text-white border-b-2 border-[#E84142] font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-red-400" />
            <span>Monitor en Vivo</span>
          </button>
          <button
            onClick={() => onSelectTab('compliance')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 flex items-center gap-1.5 ${
              currentTab === 'compliance'
                ? 'text-white border-b-2 border-[#E84142] font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cumplimiento & Inversores</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Network Switcher button */}
          <button
            onClick={onOpenNetworkModal}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all whitespace-nowrap shrink-0"
            title="Cambiar red de Avalanche"
          >
            <span className={`w-2 h-2 rounded-full ${network.isTestnet ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            <span>{network.name.replace('Avalanche ', '')}</span>
          </button>

          {/* Account Balance & Address pill */}
          <div 
            onClick={onOpenNetworkModal}
            className="cursor-pointer hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 hover:border-slate-700 transition-all whitespace-nowrap shrink-0"
          >
            <span className="font-mono text-white font-semibold tabular-nums">
              {account.avaxBalance.toFixed(2)} AVAX
            </span>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-slate-400">
              {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </span>
            {isWeb3Connected && (
              <span className="text-[10px] bg-red-950/80 text-red-300 border border-red-800/60 rounded px-1">
                Web3
              </span>
            )}
          </div>

          {/* Faucet button for quick testing */}
          <button
            onClick={onOpenFaucet}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-amber-300 bg-amber-950/40 border border-amber-800/50 rounded-lg hover:bg-amber-900/40 transition-colors whitespace-nowrap shrink-0"
            title="Obtener AVAX de prueba"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grifo +100 AVAX</span>
          </button>

          {/* Primary Action Button: Tokenizar Activo */}
          <button
            onClick={onOpenWizard}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#E84142] hover:bg-[#d63435] rounded-lg shadow-sm shadow-red-600/30 transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tokenizar RWA</span>
          </button>
        </div>
      </div>
    </header>
  );
};
