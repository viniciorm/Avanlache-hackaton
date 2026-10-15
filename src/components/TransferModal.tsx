import React, { useState } from 'react';
import { RwaAsset, Investor } from '../types/rwa';
import { Send, X, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: RwaAsset[];
  investors: Investor[];
  currentAccount: Investor;
  preselectedAsset?: RwaAsset;
  baseFee: number;
  onTransfer: (assetId: string, fromAddress: string, toAddress: string, amount: number) => { success: boolean; error?: string };
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  assets,
  investors,
  currentAccount,
  preselectedAsset,
  baseFee,
  onTransfer
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>(preselectedAsset?.id || assets[0]?.id || '');
  const [recipientAddress, setRecipientAddress] = useState<string>(
    investors.find(i => i.address.toLowerCase() !== currentAccount.address.toLowerCase())?.address || ''
  );
  const [amount, setAmount] = useState<string>('500');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const asset = assets.find(a => a.id === selectedAssetId) || assets[0];
  const userBalance = currentAccount.holdings[asset?.symbol || ''] || 0;
  const recipient = investors.find(i => i.address.toLowerCase() === recipientAddress.toLowerCase());

  const numAmount = parseFloat(amount || '0');
  const valuationUsd = numAmount * (asset?.navPerToken || 0);
  const estimatedGasAvax = ((62400 * baseFee) / 1000000000).toFixed(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!asset) return;
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMessage('Por favor ingrese una cantidad válida mayor a cero.');
      return;
    }

    if (numAmount > userBalance) {
      setErrorMessage(`Saldo insuficiente. Usted posee ${userBalance.toLocaleString()} ${asset.symbol}.`);
      return;
    }

    if (recipient && !recipient.isWhitelisted) {
      setErrorMessage('Transferencia rechazada: El destinatario no cumple con el KYC/Whitelisting requerido.');
      return;
    }

    const result = onTransfer(asset.id, currentAccount.address, recipientAddress, numAmount);
    if (!result.success) {
      setErrorMessage(result.error || 'Error al procesar la transferencia.');
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-950/60 border border-sky-800/60 flex items-center justify-center text-sky-400">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Transferencia Conforme de RWA</h2>
              <p className="text-xs text-slate-400">Liquidación P2P entre billeteras acreditadas en Avalanche</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Asset Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Activo Digital a Transferir
            </label>
            <select
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-[#E84142] focus:outline-none"
            >
              {assets.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.symbol}) · NAV ${a.navPerToken.toFixed(2)} USD
                </option>
              ))}
            </select>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
              <span>Tu saldo disponible:</span>
              <span className="text-white font-bold">{userBalance.toLocaleString()} {asset?.symbol}</span>
            </div>
          </div>

          {/* Recipient Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Billetera Destinataria Acreditada
            </label>
            <select
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-[#E84142] focus:outline-none"
            >
              {investors.map(inv => (
                <option key={inv.id} value={inv.address}>
                  {inv.name} - {inv.kycTier} ({inv.address.slice(0, 6)}...{inv.address.slice(-4)})
                </option>
              ))}
            </select>

            {recipient && (
              <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>KYC Verificado ({recipient.kycTier}) · Whitelist Aprobado</span>
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Cantidad de Tokens
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                step="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-[#E84142] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setAmount(userBalance.toString())}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800"
              >
                MÁX
              </button>
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
              <span>Valor estimado de la transacción:</span>
              <span className="text-emerald-400 font-bold">${valuationUsd.toLocaleString()} USD</span>
            </div>
          </div>

          {/* Gas & Settlement Details */}
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1 text-slate-400">
            <div className="flex justify-between">
              <span>Tarifa de Gas Estimada:</span>
              <span className="text-white font-bold">{estimatedGasAvax} AVAX</span>
            </div>
            <div className="flex justify-between">
              <span>Finalidad de Consenso:</span>
              <span className="text-emerald-400">&lt; 1.0 segundo (Snowman)</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
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
              <span>Ejecutar Transferencia</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
