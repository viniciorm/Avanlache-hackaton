import React, { useState } from 'react';
import { Investor, RwaAsset } from '../types/rwa';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Search, 
  UserCheck, 
  Globe, 
  FileCheck,
  AlertTriangle
} from 'lucide-react';

interface ComplianceViewProps {
  investors: Investor[];
  assets: RwaAsset[];
  onToggleWhitelist: (investorId: string) => void;
}

export const ComplianceView: React.FC<ComplianceViewProps> = ({
  investors,
  assets,
  onToggleWhitelist
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkAddress, setCheckAddress] = useState('');
  const [screeningResult, setScreeningResult] = useState<{ screened: boolean; safe: boolean; details: string } | null>(null);

  const filteredInvestors = investors.filter(inv => 
    inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScreenAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkAddress.trim()) return;

    const lower = checkAddress.toLowerCase();
    const isMockSanctioned = lower.includes('sanction') || lower.endsWith('0000');
    
    setScreeningResult({
      screened: true,
      safe: !isMockSanctioned,
      details: !isMockSanctioned
        ? 'Dirección limpia: Sin coincidencias en listas de sanciones internacionales (OFAC SDN, ONU, SECO Suiza).'
        : 'ALERTA: Dirección vinculada a entidades sancionadas o de alto riesgo regulatorio. Transferencias bloqueadas.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span>Módulo de Cumplimiento & Identidad On-Chain</span>
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Registro de inversores acreditados, reglas de Whitelist y control de sanciones bajo estándar ERC-3643.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{investors.filter(i => i.isWhitelisted).length} Inversores Habilitados</span>
        </div>
      </div>

      {/* AML / Sanctions Screener Card */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-red-400" />
            <h2 className="text-sm font-semibold text-white">Verificación Rápida de Dirección AML / OFAC</h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">Chainalysis / Elliptic Mock Prober</span>
        </div>

        <form onSubmit={handleScreenAddress} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Ingrese cualquier dirección Avalanche (0x...)"
            value={checkAddress}
            onChange={(e) => setCheckAddress(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#E84142]"
          />
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors shrink-0"
          >
            Examinar Dirección
          </button>
        </form>

        {screeningResult && (
          <div className={`p-3 rounded-lg border text-xs flex items-center gap-2.5 font-mono ${
            screeningResult.safe
              ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
              : 'bg-red-950/40 border-red-800/60 text-red-300'
          }`}>
            {screeningResult.safe ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{screeningResult.details}</span>
          </div>
        )}
      </div>

      {/* Accredited Investors Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-white">Registro de Inversores Acreditados (Whitelist)</h2>
            <p className="text-xs text-slate-400">Control de acceso y balances de valores tokenizados</p>
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, dirección o país..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#E84142] transition-colors"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">Entidad / Inversor</th>
                  <th className="py-3 px-4">Nivel KYC</th>
                  <th className="py-3 px-4">Jurisdicción</th>
                  <th className="py-3 px-4 text-right">Saldo AVAX</th>
                  <th className="py-3 px-4">Tenencias RWA</th>
                  <th className="py-3 px-4 text-center">Estado Whitelist</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredInvestors.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Entity */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        <span>{inv.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {inv.address}
                      </div>
                    </td>

                    {/* KYC Tier */}
                    <td className="py-3 px-4 font-mono text-slate-300 text-xs">
                      {inv.kycTier}
                    </td>

                    {/* Country */}
                    <td className="py-3 px-4 text-slate-300">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-slate-500" />
                        <span>{inv.country}</span>
                      </span>
                    </td>

                    {/* AVAX Balance */}
                    <td className="py-3 px-4 text-right font-mono font-medium text-slate-200 tabular-nums">
                      {inv.avaxBalance.toFixed(2)} AVAX
                    </td>

                    {/* Holdings */}
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-300">
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(inv.holdings).map(([sym, qty]) => (
                          qty > 0 && (
                            <span key={sym} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {qty.toLocaleString()} {sym}
                            </span>
                          )
                        ))}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      {inv.isWhitelisted ? (
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Habilitado</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-red-400 font-semibold inline-flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Revocado</span>
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onToggleWhitelist(inv.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                          inv.isWhitelisted
                            ? 'bg-red-950/40 text-red-300 hover:bg-red-900/50 border border-red-900/40'
                            : 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 border border-emerald-900/40'
                        }`}
                      >
                        {inv.isWhitelisted ? 'Revocar Acceso' : 'Habilitar Whitelist'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
