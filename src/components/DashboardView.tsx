import React from 'react';
import { RwaAsset, AvalancheTransaction, AvalancheBlock } from '../types/rwa';
import { 
  Building2, 
  Coins, 
  Zap, 
  ArrowUpRight, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Send,
  Plus,
  Flame,
  FileText
} from 'lucide-react';

interface DashboardViewProps {
  assets: RwaAsset[];
  transactions: AvalancheTransaction[];
  blocks: AvalancheBlock[];
  baseFee: number;
  onOpenWizard: () => void;
  onOpenTransfer: (asset?: RwaAsset) => void;
  onSelectTab: (tab: string) => void;
  onSelectTx: (tx: AvalancheTransaction) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  assets,
  transactions,
  blocks,
  baseFee,
  onOpenWizard,
  onOpenTransfer,
  onSelectTab,
  onSelectTx
}) => {
  // Aggregate Metrics
  const totalTvlUsd = assets.reduce((sum, a) => sum + (a.circulatingSupply * a.navPerToken), 0);
  const totalHoldersCount = 18; // aggregated verified institutional wallets
  const latestBlock = blocks[0];
  const recentTxs = transactions.slice(0, 6);

  const getCategoryLabel = (category: RwaAsset['category']) => {
    switch (category) {
      case 'real_estate': return 'Bienes Raíces';
      case 'private_credit': return 'Crédito Privado';
      case 'treasury': return 'Bonos del Tesoro';
      case 'commodity': return 'Materias Primas';
      case 'equity': return 'Acciones Tokenizadas';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Metric Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Centro de Activos del Mundo Real</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60">
              AVALANCHE C-CHAIN
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Emisión regulada, custodia digital y liquidación instantánea sub-segundo con consenso Snowman.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onOpenTransfer()}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-slate-400" />
            <span>Transferencia P2P</span>
          </button>
          <button
            onClick={onOpenWizard}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#E84142] hover:bg-[#d63435] text-white shadow-sm shadow-red-600/30 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tokenizar Nuevo Activo</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Value Locked */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Valor Total Tokenizado (TVL)</span>
            <Building2 className="w-4 h-4 text-slate-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-white tabular-nums">
            ${totalTvlUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% este trimestre</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">{assets.length} activos activos</span>
          </div>
        </div>

        {/* KPI 2: Snowman Consensus Finality */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Finalidad de Consenso Snowman</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-white tabular-nums flex items-baseline gap-2">
            <span>{latestBlock?.finalizedTimeSec ? `${latestBlock.finalizedTimeSec}s` : '0.74s'}</span>
            <span className="text-xs font-normal text-slate-400 font-sans">T+0 instantáneo</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono tabular-nums text-slate-300">Bloque #{latestBlock?.number || '48,921,840'}</span>
            <span className="text-slate-500">·</span>
            <span>Sub-segundo</span>
          </div>
        </div>

        {/* KPI 3: Avalanche Gas Tracker */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Tarifa de Gas C-Chain</span>
            <Flame className="w-4 h-4 text-red-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-white tabular-nums flex items-baseline gap-2">
            <span>{baseFee}</span>
            <span className="text-xs font-normal text-slate-400 font-sans">nAVAX (Gwei)</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-emerald-400">Normal</span>
            <span className="text-slate-500">·</span>
            <span>Transferencia ~0.0016 AVAX</span>
          </div>
        </div>

        {/* KPI 4: Compliance & Yield */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Rendimiento Ponderado (APY)</span>
            <Coins className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-white tabular-nums">
            7.94%
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <span>Liquidación mensual en AVAX</span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400 font-medium">100% KYC</span>
          </div>
        </div>
      </div>

      {/* Live Avalanche Block Strip (Interactive Real-time ticker) */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-800/50 flex items-center justify-center text-red-400 shrink-0">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="text-slate-200 font-semibold">Flujo de Bloques en Vivo</span>
              <span>·</span>
              <span className="font-mono text-emerald-400">Consenso Activo</span>
            </div>
            <div className="text-sm text-slate-300 font-mono flex items-center gap-3 mt-0.5">
              <span>Altura: <strong className="text-white">#{latestBlock?.number}</strong></span>
              <span className="text-slate-600">|</span>
              <span className="hidden sm:inline">Validador: {latestBlock?.validator}</span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span>{latestBlock?.txCount} transacciones</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onSelectTab('monitor')}
          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-medium px-3 py-1.5 rounded-lg bg-red-950/30 border border-red-900/40 transition-colors whitespace-nowrap"
        >
          <span>Abrir Monitor Completo</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Content 2-Column Split: Active Assets Catalog + Real-Time Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Active Tokenized RWA Assets Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Activos RWA en Circulación</h2>
              <p className="text-xs text-slate-400">Valores respaldados con contratos inteligentes en Avalanche C-Chain</p>
            </div>
            <button
              onClick={() => onSelectTab('assets')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Ver todos ({assets.length}) →
            </button>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 font-medium">
                  <tr>
                    <th className="py-3 px-4">Activo / Subyacente</th>
                    <th className="py-3 px-4">Categoría</th>
                    <th className="py-3 px-4 text-right">NAV Unitario</th>
                    <th className="py-3 px-4 text-right">Circulante</th>
                    <th className="py-3 px-4 text-right">APY Est.</th>
                    <th className="py-3 px-4 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {assets.map((asset) => {
                    const marketCap = asset.circulatingSupply * asset.navPerToken;
                    return (
                      <tr 
                        key={asset.id} 
                        className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                        onClick={() => onSelectTab('assets')}
                      >
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-100 flex items-center gap-2">
                            <span>{asset.name}</span>
                            <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                              {asset.symbol}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {asset.contractAddress.slice(0, 10)}...{asset.contractAddress.slice(-6)}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          {getCategoryLabel(asset.category)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-medium text-slate-200 tabular-nums">
                          ${asset.navPerToken.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-300 tabular-nums">
                          <div>{asset.circulatingSupply.toLocaleString()} {asset.symbol}</div>
                          <div className="text-[11px] text-slate-500">${marketCap.toLocaleString()}</div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-400 tabular-nums">
                          {asset.targetApy}%
                        </td>
                        <td className="py-3 px-4 text-center">
                          {asset.isFrozen ? (
                            <span className="text-[11px] text-red-400 font-medium">Pausado</span>
                          ) : (
                            <span className="text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Activo</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (1 span): Real-Time Transaction Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Últimas Transacciones</h2>
              <p className="text-xs text-slate-400">Mempool y confirmaciones en vivo</p>
            </div>
            <button
              onClick={() => onSelectTab('monitor')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Monitor completo →
            </button>
          </div>

          <div className="space-y-2.5">
            {recentTxs.map((tx) => (
              <div
                key={tx.hash}
                onClick={() => onSelectTx(tx)}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-medium">
                    {tx.status === 'pending' ? (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    <span className="text-white font-mono text-[11px] uppercase">
                      {tx.type.replace('_', ' ')}
                    </span>
                    {tx.assetSymbol && (
                      <span className="text-slate-400 text-[11px]">· {tx.assetSymbol}</span>
                    )}
                  </div>
                  <span className="text-slate-500 font-mono text-[11px] tabular-nums">
                    {tx.consensusTimeMs}ms
                  </span>
                </div>

                <div className="mt-1 text-xs text-slate-300 font-mono truncate">
                  {tx.details || tx.method}
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Tx: {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}</span>
                  <span>Gas: {tx.gasUsed.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
