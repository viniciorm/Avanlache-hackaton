import React, { useState } from 'react';
import { RwaAsset, AvalancheTransaction } from '../types/rwa';
import { 
  Building2, 
  Coins, 
  ShieldCheck, 
  FileCheck2, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Flame, 
  Sparkles 
} from 'lucide-react';

interface RwaWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseFee: number;
  onDeploy: (data: {
    name: string;
    symbol: string;
    category: RwaAsset['category'];
    totalSupply: number;
    nominalValueUsd: number;
    targetApy: number;
    complianceLevel: RwaAsset['complianceLevel'];
    underlyingDescription: string;
    jurisdiction: string;
    distributionFrequency: 'Mensual' | 'Trimestral' | 'Anual';
  }) => void;
}

export const RwaWizardModal: React.FC<RwaWizardModalProps> = ({
  isOpen,
  onClose,
  baseFee,
  onDeploy
}) => {
  const [step, setStep] = useState<number>(1);

  // Form states
  const [name, setName] = useState('Zurich Commercial Real Estate Trust');
  const [symbol, setSymbol] = useState('ZRET');
  const [category, setCategory] = useState<RwaAsset['category']>('real_estate');
  const [underlyingDescription, setUnderlyingDescription] = useState(
    'Torre de oficinas corporativas de 16 plantas en distrito financiero de Zurich con contratos de alquiler a 10 años indexados al IPC.'
  );

  const [totalSupply, setTotalSupply] = useState('100000');
  const [nominalValueUsd, setNominalValueUsd] = useState('100');
  const [targetApy, setTargetApy] = useState('8.5');
  const [distributionFrequency, setDistributionFrequency] = useState<'Mensual' | 'Trimestral' | 'Anual'>('Mensual');

  const [complianceLevel, setComplianceLevel] = useState<RwaAsset['complianceLevel']>('RegD_Accredited');
  const [jurisdiction, setJurisdiction] = useState('Suiza / Unión Europea');

  if (!isOpen) return null;

  const totalValuation = parseFloat(totalSupply || '0') * parseFloat(nominalValueUsd || '0');
  const estimatedGasAvax = ((1845200 * baseFee) / 1000000000).toFixed(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    onDeploy({
      name,
      symbol: symbol.toUpperCase(),
      category,
      totalSupply: parseFloat(totalSupply),
      nominalValueUsd: parseFloat(nominalValueUsd),
      targetApy: parseFloat(targetApy),
      complianceLevel,
      underlyingDescription,
      jurisdiction,
      distributionFrequency
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E84142]" />
              <span>Asistente de Tokenización RWA</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Emisión de activos tangibles bajo estándar regulado en Avalanche C-Chain
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="grid grid-cols-4 gap-2 text-xs font-mono">
          {[
            { num: 1, label: 'Datos Básicos' },
            { num: 2, label: 'Economía' },
            { num: 3, label: 'Cumplimiento' },
            { num: 4, label: 'Despliegue' }
          ].map(s => (
            <div
              key={s.num}
              className={`p-2 rounded-lg border text-center transition-all ${
                step === s.num
                  ? 'bg-red-950/40 border-[#E84142] text-white font-semibold'
                  : step > s.num
                    ? 'bg-slate-950 border-emerald-800/60 text-emerald-400'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}
            >
              <div className="text-[10px] uppercase">Paso 0{s.num}</div>
              <div className="truncate mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nombre del Activo Digital RWA
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ej. Fondo Inmobiliario Madrid Prime"
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#E84142]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Símbolo de Ticker
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="ej. FIMP"
                    className="w-full px-3.5 py-2 text-xs font-mono uppercase bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#E84142]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Categoría de Activo
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-[#E84142]"
                  >
                    <option value="real_estate">Bienes Raíces / Inmobiliario</option>
                    <option value="private_credit">Crédito Privado / Deuda Directa</option>
                    <option value="treasury">Bonos Soberanos / T-Bills</option>
                    <option value="commodity">Materias Primas / Regalías</option>
                    <option value="equity">Acciones Corporativas Tokenizadas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Descripción del Colateral Subyacente
                </label>
                <textarea
                  rows={3}
                  required
                  value={underlyingDescription}
                  onChange={(e) => setUnderlyingDescription(e.target.value)}
                  placeholder="Describa el activo físico o financiero que respalda esta emisión..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#E84142]"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Economics and Offering */}
          {step === 2 && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Suministro Total (Tokens)
                  </label>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    required
                    value={totalSupply}
                    onChange={(e) => setTotalSupply(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-[#E84142]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Valor Nominal Unitario (USD)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={nominalValueUsd}
                    onChange={(e) => setNominalValueUsd(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-[#E84142]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Rendimiento Estimado (APY %)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="0.1"
                    required
                    value={targetApy}
                    onChange={(e) => setTargetApy(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-[#E84142]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Frecuencia de Rendimiento
                  </label>
                  <select
                    value={distributionFrequency}
                    onChange={(e) => setDistributionFrequency(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-[#E84142]"
                  >
                    <option value="Mensual">Mensual (en AVAX/USDC)</option>
                    <option value="Trimestral">Trimestral</option>
                    <option value="Anual">Anual</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Valuación Total de la Emisión:</span>
                  <span className="text-white font-bold text-sm">
                    ${totalValuation.toLocaleString()} USD
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-slate-500 text-[11px]">
                  <span>Circulante inicial asignado:</span>
                  <span>75% al Emisor (Tesorería institucional)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Regulatory & Whitelist Rules */}
          {step === 3 && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nivel de Cumplimiento Regulatorio
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'RegD_Accredited', label: 'Reg D / Inversores Acreditados', desc: 'Restringido a inversores con patrimonio >$1M o instituciones.' },
                    { id: 'Institutional_KYC', label: 'Institucional Nivel 3 (KYC / AML Total)', desc: 'Due diligence completa con verificación de beneficiario final (UBO).' },
                    { id: 'RegS_International', label: 'Reg S / Extracomunitario Global', desc: 'Emisiones internacionales fuera de EE.UU. con pasaporte de oferta.' }
                  ].map(tier => (
                    <div
                      key={tier.id}
                      onClick={() => setComplianceLevel(tier.id as any)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        complianceLevel === tier.id
                          ? 'bg-red-950/30 border-[#E84142]'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-semibold text-white flex items-center justify-between">
                        <span>{tier.label}</span>
                        {complianceLevel === tier.id && <Check className="w-4 h-4 text-red-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 font-sans">{tier.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Jurisdicción Jurídica & Notarial
                </label>
                <input
                  type="text"
                  required
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  placeholder="ej. Suiza / Unión Europea"
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-[#E84142]"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Deployment & Review */}
          {step === 4 && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-sans font-semibold text-sm text-white mb-2 pb-2 border-b border-slate-800">
                  Resumen de la Transacción en Avalanche C-Chain
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Activo:</span>
                  <span className="text-white font-bold">{name} ({symbol})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Categoría:</span>
                  <span className="text-slate-200 capitalize">{category.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Suministro / NAV:</span>
                  <span className="text-slate-200">{parseFloat(totalSupply).toLocaleString()} tokens @ ${nominalValueUsd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Valuación Total:</span>
                  <span className="text-emerald-400 font-bold">${totalValuation.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estándar de Contrato:</span>
                  <span className="text-red-400">ERC-3643 Permissioned Token</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Costo de Gas Estimado:</span>
                  <span className="text-amber-400 font-bold">{estimatedGasAvax} AVAX (~{baseFee} nAVAX)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300">
                <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  Todos los contratos pasan por Snowman consensus en &lt;1s con finalidad inmediata.
                </span>
              </div>
            </div>
          )}

          {/* Buttons Navigation */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-medium rounded-lg text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Atrás</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium rounded-lg text-slate-400 hover:text-white"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#E84142] hover:bg-[#d63435] text-white flex items-center gap-1.5 transition-all shadow-sm shadow-red-600/30"
              >
                <span>{step === 4 ? 'Firmar y Desplegar en Avalanche' : 'Siguiente Paso'}</span>
                {step < 4 && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
