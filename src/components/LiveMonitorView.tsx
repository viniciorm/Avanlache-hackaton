import React, { useState } from 'react';
import { AvalancheTransaction, AvalancheBlock } from '../types/rwa';
import { 
  Zap, 
  Flame, 
  Search, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  Filter, 
  Layers, 
  Activity, 
  Server,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface LiveMonitorViewProps {
  transactions: AvalancheTransaction[];
  blocks: AvalancheBlock[];
  baseFee: number;
  selectedTx: AvalancheTransaction | null;
  onSelectTx: (tx: AvalancheTransaction | null) => void;
}

export const LiveMonitorView: React.FC<LiveMonitorViewProps> = ({
  transactions,
  blocks,
  baseFee,
  selectedTx,
  onSelectTx
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBlockNumber, setSelectedBlockNumber] = useState<number | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const pendingCount = transactions.filter(t => t.status === 'pending').length;
  const latestBlock = blocks[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const filteredTxs = transactions.filter(tx => {
    const matchesSearch = tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (tx.assetSymbol && tx.assetSymbol.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBlock = selectedBlockNumber === null || tx.blockNumber === selectedBlockNumber;

    if (!matchesSearch || !matchesBlock) return false;

    if (filterType === 'all') return true;
    if (filterType === 'pending') return tx.status === 'pending';
    if (filterType === 'finalized') return tx.status === 'finalized' || tx.status === 'accepted';
    if (filterType === 'rwa') return tx.type === 'DEPLOY_RWA' || tx.type === 'MINT';
    if (filterType === 'transfers') return tx.type === 'TRANSFER';
    if (filterType === 'dividends') return tx.type === 'DIVIDEND_PAYOUT';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-[#E84142] animate-pulse" />
            <span>Observatorio de Transacciones & Bloques Avalanche</span>
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Seguimiento de mempool en tiempo real, finalidad Snowman sub-segundo y telemetría de gas en C-Chain.
          </p>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs font-mono text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Reactor Snowman: ACTIVO</span>
          </div>
          {pendingCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-xs font-mono text-amber-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>{pendingCount} en Mempool</span>
            </div>
          )}
        </div>
      </div>

      {/* Gas Tracker and Avalanche Telemetry Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gas Meter */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <Flame className="w-4 h-4 text-red-400" />
              <span>Tarifas de Gas Avalanche C-Chain</span>
            </span>
            <span className="font-mono text-slate-400">EIP-1559</span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white tabular-nums">{baseFee}</span>
            <span className="text-xs text-slate-400 font-mono">nAVAX Base Fee</span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-1.5 rounded bg-slate-950/70 border border-slate-800/80">
              <div className="text-[10px] text-slate-500">Estándar</div>
              <div className="text-slate-200 font-bold mt-0.5">{baseFee}</div>
            </div>
            <div className="p-1.5 rounded bg-slate-950/70 border border-slate-800/80">
              <div className="text-[10px] text-slate-500">Rápido</div>
              <div className="text-emerald-400 font-bold mt-0.5">{(baseFee * 1.08).toFixed(1)}</div>
            </div>
            <div className="p-1.5 rounded bg-slate-950/70 border border-slate-800/80">
              <div className="text-[10px] text-slate-500">Prioridad</div>
              <div className="text-amber-400 font-bold mt-0.5">{(baseFee * 1.25).toFixed(1)}</div>
            </div>
          </div>
        </div>

        {/* Snowman Consensus Stats */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Consenso Snowman Finality</span>
            </span>
            <span className="text-emerald-400 font-mono text-[11px]">Sub-segundo</span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              {latestBlock?.finalizedTimeSec || 0.72}s
            </span>
            <span className="text-xs text-slate-400 font-mono">Tiempo de Aceptación</span>
          </div>

          <div className="mt-3 text-xs text-slate-300 space-y-1">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-slate-500">Muestreo probabilístico:</span>
              <span className="text-slate-200">k=20, α=14</span>
            </div>
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-slate-500">Rondas de confirmación:</span>
              <span className="text-slate-200">β=1 (Finalidad Inmediata)</span>
            </div>
          </div>
        </div>

        {/* Node & Block Health */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <Server className="w-4 h-4 text-sky-400" />
              <span>Último Bloque Minado</span>
            </span>
            <span className="font-mono text-slate-400">#{latestBlock?.number}</span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              {latestBlock?.txCount || 0}
            </span>
            <span className="text-xs text-slate-400 font-mono">Txs en el bloque</span>
          </div>

          <div className="mt-3 text-xs text-slate-400 truncate font-mono text-[11px]">
            <span>Validador: {latestBlock?.validator}</span>
          </div>
        </div>
      </div>

      {/* Visual Live Avalanche Block Pipeline */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-red-400" />
            <h2 className="text-sm font-semibold text-white">Flujo Visual de Bloques Avalanche</h2>
            <span className="text-xs text-slate-500">· Haga clic en un bloque para filtrar transacciones</span>
          </div>
          {selectedBlockNumber && (
            <button
              onClick={() => setSelectedBlockNumber(null)}
              className="text-xs text-red-400 hover:text-red-300 font-mono flex items-center gap-1"
            >
              <span>Quitar filtro de bloque #{selectedBlockNumber}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Horizontal Scrolling Blocks List */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
          {blocks.slice(0, 8).map((block, idx) => {
            const isSelected = selectedBlockNumber === block.number;
            const isLatest = idx === 0;

            return (
              <div
                key={block.number}
                onClick={() => setSelectedBlockNumber(isSelected ? null : block.number)}
                className={`min-w-[190px] p-3 rounded-lg border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-red-950/40 border-[#E84142] shadow-md shadow-red-600/20' 
                    : isLatest 
                      ? 'bg-slate-900/90 border-slate-700 hover:border-slate-600' 
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-white flex items-center gap-1">
                    {isLatest && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                    <span>#{block.number}</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {block.finalizedTimeSec}s
                  </span>
                </div>

                <div className="mt-2 text-[11px] font-mono text-slate-400 truncate">
                  {block.hash.slice(0, 10)}...{block.hash.slice(-6)}
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{block.txCount} txs</span>
                  <span>{block.baseFeeGwei} nAVAX</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction Feed and Filter Strip */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filterType === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Todas ({transactions.length})
            </button>
            <button
              onClick={() => setFilterType('pending')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                filterType === 'pending' ? 'bg-slate-800 text-amber-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Mempool ({pendingCount})</span>
            </button>
            <button
              onClick={() => setFilterType('finalized')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filterType === 'finalized' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Finalizadas
            </button>
            <button
              onClick={() => setFilterType('rwa')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filterType === 'rwa' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Emisiones RWA
            </button>
            <button
              onClick={() => setFilterType('transfers')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filterType === 'transfers' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Transferencias
            </button>
            <button
              onClick={() => setFilterType('dividends')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filterType === 'dividends' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dividendos
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar hash, dirección o símbolo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#E84142] transition-colors"
            />
          </div>
        </div>

        {/* Real-Time Transaction Table */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 text-slate-400 border-b border-slate-800 font-medium font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">Estado / Hash</th>
                  <th className="py-3 px-4">Método / Tipo</th>
                  <th className="py-3 px-4">Bloque</th>
                  <th className="py-3 px-4">De → Para</th>
                  <th className="py-3 px-4 text-right">Volumen / Activo</th>
                  <th className="py-3 px-4 text-right">Gas Consumido</th>
                  <th className="py-3 px-4 text-right">Latencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredTxs.map((tx) => (
                  <tr
                    key={tx.hash}
                    onClick={() => onSelectTx(tx)}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    {/* Hash & Status */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {tx.status === 'pending' ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" title="En Mempool" />
                        ) : (
                          <span title="Finalizada Snowman" className="inline-flex shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          </span>
                        )}
                        <span className="font-mono text-xs font-semibold text-white group-hover:text-red-400 transition-colors">
                          {tx.hash.slice(0, 10)}...{tx.hash.slice(-6)}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5 pl-5">
                        {new Date(tx.timestamp).toLocaleTimeString()}
                      </div>
                    </td>

                    {/* Method & Type */}
                    <td className="py-3 px-4">
                      <div className="font-mono text-xs text-slate-200">
                        {tx.method.split('(')[0]}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {tx.type.replace('_', ' ')}
                      </div>
                    </td>

                    {/* Block */}
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {tx.status === 'pending' ? (
                        <span className="text-amber-400 text-xs font-medium">Mempool</span>
                      ) : (
                        <span>#{tx.blockNumber}</span>
                      )}
                    </td>

                    {/* From -> To */}
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      <div className="truncate max-w-[160px]">
                        De: {tx.from.slice(0, 8)}...{tx.from.slice(-4)}
                      </div>
                      <div className="truncate max-w-[160px] text-slate-500">
                        Para: {tx.to.slice(0, 8)}...{tx.to.slice(-4)}
                      </div>
                    </td>

                    {/* Amount & Asset */}
                    <td className="py-3 px-4 text-right font-mono text-xs">
                      {tx.amount ? (
                        <div>
                          <span className="text-white font-semibold tabular-nums">
                            {tx.amount.toLocaleString()}
                          </span>{' '}
                          <span className="text-slate-400">{tx.assetSymbol || 'AVAX'}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                      {tx.nominalValueTotalUsd && (
                        <div className="text-[10px] text-slate-500 tabular-nums">
                          ${tx.nominalValueTotalUsd.toLocaleString()} USD
                        </div>
                      )}
                    </td>

                    {/* Gas Consumed */}
                    <td className="py-3 px-4 text-right font-mono text-slate-300 tabular-nums text-xs">
                      <div>{tx.gasUsed.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-500">{tx.gasPriceGwei} nAVAX</div>
                    </td>

                    {/* Latency */}
                    <td className="py-3 px-4 text-right font-mono text-xs">
                      <span className="text-emerald-400 font-semibold tabular-nums">
                        {tx.consensusTimeMs}ms
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal Drawer */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-800/60 flex items-center justify-center text-red-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Detalle de Transacción Avalanche</h3>
                  <span className="text-xs text-slate-400 font-mono">Consenso Snowman Validado</span>
                </div>
              </div>
              <button
                onClick={() => onSelectTx(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-sans">Estado</span>
                <div className="mt-0.5 text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="capitalize">{selectedTx.status}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] uppercase font-sans">Bloque</span>
                <div className="mt-0.5 text-white font-bold">#{selectedTx.blockNumber}</div>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] uppercase font-sans">Tiempo de Consenso</span>
                <div className="mt-0.5 text-amber-400 font-bold">{selectedTx.consensusTimeMs} ms</div>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] uppercase font-sans">Gas Usado</span>
                <div className="mt-0.5 text-slate-200 font-bold">{selectedTx.gasUsed.toLocaleString()}</div>
              </div>
            </div>

            {/* Field breakdown */}
            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-slate-500 block mb-1">Hash de la Transacción:</span>
                <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-200 break-all">
                  <span>{selectedTx.hash}</span>
                  <button
                    onClick={() => handleCopy(selectedTx.hash)}
                    className="ml-2 hover:text-white transition-colors shrink-0"
                    title="Copiar Hash"
                  >
                    {copiedHash === selectedTx.hash ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 block mb-1">Remitente (From):</span>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-300 truncate">
                    {selectedTx.from}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">Destinatario / Contrato (To):</span>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-300 truncate">
                    {selectedTx.to}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block mb-1">Método Decodificado:</span>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-emerald-300 font-mono">
                  {selectedTx.method}
                </div>
              </div>

              {selectedTx.details && (
                <div>
                  <span className="text-slate-500 block mb-1">Descripción / Event Logs:</span>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-sans">
                    {selectedTx.details}
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Snowtrace link */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <a
                href={`https://snowtrace.io/tx/${selectedTx.hash}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium"
              >
                <span>Inspeccionar en Snowtrace Explorer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => onSelectTx(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
