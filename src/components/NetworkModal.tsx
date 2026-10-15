import React, { useState } from 'react';
import { NetworkConfig, NetworkType, Investor } from '../types/rwa';
import { NETWORKS } from '../services/avalancheEngine';
import { 
  X, 
  Check, 
  Wallet, 
  Sparkles, 
  ExternalLink, 
  AlertCircle,
  Shield,
  Layers
} from 'lucide-react';

interface NetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentNetwork: NetworkConfig;
  currentAccount: Investor;
  investors: Investor[];
  isWeb3Connected: boolean;
  onSelectNetwork: (network: NetworkType) => void;
  onSelectAccount: (address: string) => void;
  onConnectRealWeb3: () => Promise<{ success: boolean; address?: string; error?: string }>;
  onRequestFaucet: () => void;
}

export const NetworkModal: React.FC<NetworkModalProps> = ({
  isOpen,
  onClose,
  currentNetwork,
  currentAccount,
  investors,
  isWeb3Connected,
  onSelectNetwork,
  onSelectAccount,
  onConnectRealWeb3,
  onRequestFaucet
}) => {
  const [web3Status, setWeb3Status] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  if (!isOpen) return null;

  const handleConnectWeb3 = async () => {
    setConnecting(true);
    setWeb3Status(null);
    const res = await onConnectRealWeb3();
    setConnecting(false);
    if (!res.success) {
      setWeb3Status(res.error || 'No se pudo conectar el monedero Web3.');
    } else {
      setWeb3Status(`¡Conectado exitosamente con ${res.address?.slice(0, 8)}...!`);
      setTimeout(() => onClose(), 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#E84142]" />
              <span>Red Avalanche & Conectividad de Billetera</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Conexión dual: Web3 real (Core/MetaMask) o Sandbox determinista institucional
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {web3Status && (
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
            {web3Status}
          </div>
        )}

        {/* Section 1: Network Selection */}
        <div className="space-y-2.5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
            1. Seleccionar Red Avalanche
          </label>
          <div className="grid grid-cols-1 gap-2">
            {Object.values(NETWORKS).map((net) => {
              const isSelected = currentNetwork.id === net.id;
              return (
                <div
                  key={net.id}
                  onClick={() => onSelectNetwork(net.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-red-950/30 border-[#E84142] shadow-sm'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${net.isTestnet ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-2">
                        <span>{net.name}</span>
                        <span className="font-mono text-[10px] text-slate-400">Chain ID: {net.chainId}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {net.rpcUrl}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#E84142] shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Real Web3 Wallet Connect */}
        <div className="space-y-2.5 pt-2 border-t border-slate-800">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
            2. Monedero Web3 Real
          </label>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#E84142]" />
                <span>Core Wallet / MetaMask</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isWeb3Connected
                  ? `Conectado como ${currentAccount.address.slice(0, 10)}...`
                  : 'Detecta proveedor EIP-1193 inyectado en el navegador'}
              </p>
            </div>

            <button
              onClick={handleConnectWeb3}
              disabled={connecting}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors whitespace-nowrap shrink-0"
            >
              {connecting ? 'Conectando...' : isWeb3Connected ? 'Reconectar' : 'Conectar Web3'}
            </button>
          </div>
        </div>

        {/* Section 3: Switch Institutional Demo Accounts */}
        <div className="space-y-2.5 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              3. Cuentas Pre-cargadas de Sandbox
            </label>
            <button
              onClick={onRequestFaucet}
              className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grifo +100 AVAX</span>
            </button>
          </div>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {investors.map((inv) => {
              const isCurrent = inv.address.toLowerCase() === currentAccount.address.toLowerCase();
              return (
                <div
                  key={inv.id}
                  onClick={() => onSelectAccount(inv.address)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isCurrent
                      ? 'bg-slate-800/90 border-slate-600'
                      : 'bg-slate-950 border-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-slate-200">{inv.name}</div>
                    <div className="font-mono text-[11px] text-slate-500">{inv.address}</div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-emerald-400 font-bold tabular-nums">
                      {inv.avaxBalance.toFixed(2)} AVAX
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#E84142] hover:bg-[#d63435] text-white transition-all shadow-sm shadow-red-600/30"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
