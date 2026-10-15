import React, { useState } from 'react';
import { RwaAsset, Investor } from '../types/rwa';
import { 
  Building2, 
  Coins, 
  Search, 
  Plus, 
  Send, 
  Lock, 
  Unlock, 
  FileText, 
  DollarSign, 
  ExternalLink, 
  Copy, 
  Check, 
  AlertCircle,
  TrendingUp,
  X
} from 'lucide-react';

interface AssetCatalogViewProps {
  assets: RwaAsset[];
  investors: Investor[];
  onOpenWizard: () => void;
  onOpenTransfer: (asset: RwaAsset) => void;
  onMintTokens: (assetId: string, recipientAddress: string, amount: number) => void;
  onDisburseDividends: (assetId: string, totalAvax: number) => void;
  onToggleFreeze: (assetId: string) => void;
}

export const AssetCatalogView: React.FC<AssetCatalogViewProps> = ({
  assets,
  investors,
  onOpenWizard,
  onOpenTransfer,
  onMintTokens,
  onDisburseDividends,
  onToggleFreeze
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Modals state
  const [mintAsset, setMintAsset] = useState<RwaAsset | null>(null);
  const [mintRecipient, setMintRecipient] = useState<string>(investors[0]?.address || '');
  const [mintAmount, setMintAmount] = useState<string>('1000');

  const [dividendAsset, setDividendAsset] = useState<RwaAsset | null>(null);
  const [dividendAmount, setDividendAmount] = useState<string>('50');

  const [docModalAsset, setDocModalAsset] = useState<RwaAsset | null>(null);

  const categories = [
    { id: 'all', label: 'Todos los Activos' },
    { id: 'real_estate', label: 'Bienes Raíces' },
    { id: 'private_credit', label: 'Crédito Privado' },
    { id: 'treasury', label: 'Bonos del Tesoro' },
    { id: 'commodity', label: 'Materias Primas' }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.contractAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const executeMint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mintAsset || !mintAmount) return;
    const amountNum = parseFloat(mintAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;
    onMintTokens(mintAsset.id, mintRecipient, amountNum);
    setMintAsset(null);
  };

  const executeDividend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dividendAsset || !dividendAmount) return;
    const amountNum = parseFloat(dividendAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;
    onDisburseDividends(dividendAsset.id, amountNum);
    setDividendAsset(null);
  };

  return (
    <div className="space-y-6">
      {/* Header and Search Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Portafolio de Activos RWA
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Gestión de valores tokenizados, emisión institucional, dividendos y gobernanza de contratos en Avalanche.
          </p>
        </div>

        <button
          onClick={onOpenWizard}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#E84142] hover:bg-[#d63435] text-white shadow-sm shadow-red-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tokenizar Nuevo RWA</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filter Tabs (Interactive filter buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, símbolo o contrato..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900/90 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#E84142] transition-colors"
          />
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredAssets.map(asset => {
          const totalValuationUsd = asset.circulatingSupply * asset.navPerToken;

          return (
            <div
              key={asset.id}
              className={`p-5 rounded-xl border transition-all ${
                asset.isFrozen 
                  ? 'bg-red-950/20 border-red-900/40' 
                  : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Asset Header Row */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{asset.name}</h3>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-red-400 border border-slate-700">
                      {asset.symbol}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span>{asset.jurisdiction}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300 font-mono text-[11px]">
                      {asset.complianceLevel.replace('_', ' ')}
                    </span>
                    {asset.isFrozen && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-red-400 font-semibold flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Congelado
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setDocModalAsset(asset)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 transition-colors whitespace-nowrap"
                  title="Ver documentación legal y prueba de reservas"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Docs ({asset.collateralDocs.length})</span>
                </button>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {asset.underlyingAssetDescription}
              </p>

              {/* Financial Metrics Strip */}
              <div className="mt-4 grid grid-cols-3 gap-2.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 font-mono text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-sans">NAV / Token</span>
                  <div className="text-white font-bold text-sm tabular-nums mt-0.5">
                    ${asset.navPerToken.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400">Nominal: ${asset.nominalValueUsd}</div>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-sans">Rendimiento (APY)</span>
                  <div className="text-emerald-400 font-bold text-sm tabular-nums mt-0.5 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{asset.targetApy}%</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{asset.distributionFrequency}</div>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-sans">Valuación Total</span>
                  <div className="text-white font-bold text-sm tabular-nums mt-0.5">
                    ${(totalValuationUsd / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-[10px] text-slate-400">{asset.circulatingSupply.toLocaleString()} {asset.symbol}</div>
                </div>
              </div>

              {/* Contract Address & Snowtrace Link */}
              <div className="mt-3.5 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800/40">
                <span className="truncate mr-2">Contrato: {asset.contractAddress}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(asset.contractAddress)}
                    className="hover:text-white transition-colors"
                    title="Copiar dirección"
                  >
                    {copiedAddress === asset.contractAddress ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={`https://snowtrace.io/token/${asset.contractAddress}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                    title="Ver en Snowtrace Explorer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMintAsset(asset)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Emitir (Mint)</span>
                  </button>

                  <button
                    onClick={() => setDividendAsset(asset)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium flex items-center gap-1.5"
                  >
                    <Coins className="w-3.5 h-3.5 text-purple-400" />
                    <span>Pagar Dividendo</span>
                  </button>

                  <button
                    onClick={() => onOpenTransfer(asset)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-sky-400" />
                    <span>Transferir</span>
                  </button>
                </div>

                <button
                  onClick={() => onToggleFreeze(asset.id)}
                  className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors flex items-center gap-1 ${
                    asset.isFrozen
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/50'
                      : 'bg-red-950/30 border-red-900/40 text-red-300 hover:bg-red-900/40'
                  }`}
                  title="Control de congelamiento por regulación AML/OFAC"
                >
                  {asset.isFrozen ? (
                    <>
                      <Unlock className="w-3 h-3" />
                      <span>Reanudar</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3" />
                      <span>Congelar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="p-12 text-center rounded-xl border border-dashed border-slate-800 bg-slate-900/40">
          <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-white">No se encontraron activos RWA</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            No hay ningún activo que coincida con los criterios de búsqueda. Puede registrar una nueva emisión en Avalanche.
          </p>
          <button
            onClick={onOpenWizard}
            className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-[#E84142] hover:bg-[#d63435] text-white transition-all inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tokenizar Primer RWA</span>
          </button>
        </div>
      )}

      {/* Modal: Mint Additional Securities */}
      {mintAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Emitir Títulos Adicionales ({mintAsset.symbol})
              </h3>
              <button 
                onClick={() => setMintAsset(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Emisión de nuevos títulos respaldados en el contrato ERC-3643 de Avalanche C-Chain. Requiere billetera acreditada en Whitelist.
            </p>

            <form onSubmit={executeMint} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Inversor Destinatario (Acreditado)
                </label>
                <select
                  value={mintRecipient}
                  onChange={(e) => setMintRecipient(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-[#E84142] focus:outline-none"
                >
                  {investors.map(inv => (
                    <option key={inv.id} value={inv.address}>
                      {inv.name} - {inv.kycTier} ({inv.address.slice(0, 8)}...)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Cantidad a Emitir ({mintAsset.symbol})
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-[#E84142] focus:outline-none"
                />
                <span className="text-[11px] text-slate-500 font-mono mt-1 block">
                  Valoración Nominal: ${(parseFloat(mintAmount || '0') * mintAsset.nominalValueUsd).toLocaleString()} USD
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setMintAsset(null)}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#E84142] hover:bg-[#d63435] text-white transition-all shadow-sm shadow-red-600/30"
                >
                  Firmar y Emitir en Avalanche
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Dividend Disbursal */}
      {dividendAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Dispersar Dividendos / Cupones ({dividendAsset.symbol})
              </h3>
              <button 
                onClick={() => setDividendAsset(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Los fondos en AVAX se distribuirán en una sola transacción atómica proporcionalmente entre todos los titulares acreditados en función de su porcentaje de tenencia.
            </p>

            <form onSubmit={executeDividend} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Monto Total a Dispersar (AVAX)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    value={dividendAmount}
                    onChange={(e) => setDividendAmount(e.target.value)}
                    className="w-full pl-3 pr-16 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-[#E84142] focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                    AVAX
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono mt-1 block">
                  Aprox. ${(parseFloat(dividendAmount || '0') * 33).toFixed(2)} USD · APY proyectado {dividendAsset.targetApy}%
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDividendAsset(null)}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm shadow-emerald-600/30"
                >
                  Ejecutar Pago Colectivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Legal & Collateral Docs */}
      {docModalAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Expediente Legal & Respaldo
                </h3>
                <span className="text-xs text-slate-400 font-mono">{docModalAsset.name} ({docModalAsset.symbol})</span>
              </div>
              <button 
                onClick={() => setDocModalAsset(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {docModalAsset.collateralDocs.map((doc, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{doc.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Hash IPFS / On-Chain: {doc.hash}</div>
                    <div className="text-[10px] text-emerald-400 mt-1 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{doc.type} · Verificado Notarialmente</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Simulando apertura de documento autenticado: ${doc.title}`)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
                  >
                    Ver Hash
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setDocModalAsset(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                Cerrar Expediente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
