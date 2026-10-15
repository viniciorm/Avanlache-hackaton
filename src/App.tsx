/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { avalancheEngine } from './services/avalancheEngine';
import { 
  RwaAsset, 
  AvalancheTransaction, 
  AvalancheBlock, 
  Investor, 
  NetworkConfig, 
  NetworkType 
} from './types/rwa';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { AssetCatalogView } from './components/AssetCatalogView';
import { LiveMonitorView } from './components/LiveMonitorView';
import { ComplianceView } from './components/ComplianceView';
import { RwaWizardModal } from './components/RwaWizardModal';
import { TransferModal } from './components/TransferModal';
import { NetworkModal } from './components/NetworkModal';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  
  // Engine State
  const [assets, setAssets] = useState<RwaAsset[]>([]);
  const [transactions, setTransactions] = useState<AvalancheTransaction[]>([]);
  const [blocks, setBlocks] = useState<AvalancheBlock[]>([]);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [network, setNetwork] = useState<NetworkConfig>(avalancheEngine.getCurrentNetwork());
  const [account, setAccount] = useState<Investor>(avalancheEngine.getCurrentAccount());
  const [baseFee, setBaseFee] = useState<number>(avalancheEngine.getBaseFee());
  const [isWeb3Connected, setIsWeb3Connected] = useState<boolean>(avalancheEngine.isConnectedWithWeb3());

  // Modals state
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [transferAsset, setTransferAsset] = useState<RwaAsset | undefined>(undefined);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const [selectedTxForDetail, setSelectedTxForDetail] = useState<AvalancheTransaction | null>(null);

  // Notification Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Subscribe to Avalanche Engine
  useEffect(() => {
    const sync = () => {
      setAssets(avalancheEngine.getAssets());
      setTransactions(avalancheEngine.getTransactions());
      setBlocks(avalancheEngine.getBlocks());
      setInvestors(avalancheEngine.getInvestors());
      setNetwork(avalancheEngine.getCurrentNetwork());
      setAccount(avalancheEngine.getCurrentAccount());
      setBaseFee(avalancheEngine.getBaseFee());
      setIsWeb3Connected(avalancheEngine.isConnectedWithWeb3());
    };

    sync();
    const unsubscribe = avalancheEngine.subscribe(sync);
    return () => unsubscribe();
  }, []);

  // Handlers
  const handleDeployRwa = (data: any) => {
    const res = avalancheEngine.deployRwaAsset(data);
    showToast(`¡Activo ${res.asset.name} (${res.asset.symbol}) desplegado en Avalanche C-Chain!`, 'success');
  };

  const handleMintTokens = (assetId: string, recipientAddress: string, amount: number) => {
    const res = avalancheEngine.mintTokens(assetId, recipientAddress, amount);
    if (res.success) {
      showToast(`Emisión exitosa: ${amount.toLocaleString()} títulos emitidos.`, 'success');
    } else {
      showToast(res.error || 'Error al emitir títulos.', 'error');
    }
  };

  const handleTransferTokens = (assetId: string, fromAddress: string, toAddress: string, amount: number) => {
    const res = avalancheEngine.transferTokens(assetId, fromAddress, toAddress, amount);
    if (res.success) {
      showToast(`Transferencia de ${amount.toLocaleString()} títulos completada con finalidad sub-segundo.`, 'success');
    }
    return res;
  };

  const handleDisburseDividends = (assetId: string, totalAvax: number) => {
    const res = avalancheEngine.disburseDividends(assetId, totalAvax);
    if (res.success) {
      showToast(`Distribución de dividendos: ${totalAvax} AVAX pagados a los titulares.`, 'success');
    } else {
      showToast(res.error || 'Error al dispersar dividendos.', 'error');
    }
  };

  const handleToggleFreeze = (assetId: string) => {
    const res = avalancheEngine.toggleFreezeAsset(assetId);
    if (res.success) {
      showToast(
        res.isFrozen 
          ? 'Activo pausado temporalmente por disposición de cumplimiento.' 
          : 'Operaciones y transferencias reanudadas exitosamente.',
        'info'
      );
    }
  };

  const handleToggleWhitelist = (investorId: string) => {
    const ok = avalancheEngine.toggleInvestorWhitelist(investorId);
    if (ok) {
      showToast('Estado de Whitelist KYC actualizado en el registro on-chain.', 'info');
    }
  };

  const handleRequestFaucet = () => {
    avalancheEngine.requestFaucet(account.address, 100);
    showToast('¡100 AVAX acreditados a tu billetera desde el grifo oficial!', 'success');
  };

  const handleOpenTransfer = (asset?: RwaAsset) => {
    setTransferAsset(asset);
    setIsTransferOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-[#E84142]/30 selection:text-white">
      {/* Top Bar Contract (1 row, 3 zones) */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        network={network}
        account={account}
        onOpenNetworkModal={() => setIsNetworkModalOpen(true)}
        onOpenWizard={() => setIsWizardOpen(true)}
        onOpenFaucet={handleRequestFaucet}
        isWeb3Connected={isWeb3Connected}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {currentTab === 'dashboard' && (
          <DashboardView
            assets={assets}
            transactions={transactions}
            blocks={blocks}
            baseFee={baseFee}
            onOpenWizard={() => setIsWizardOpen(true)}
            onOpenTransfer={handleOpenTransfer}
            onSelectTab={setCurrentTab}
            onSelectTx={(tx) => {
              setSelectedTxForDetail(tx);
              setCurrentTab('monitor');
            }}
          />
        )}

        {currentTab === 'assets' && (
          <AssetCatalogView
            assets={assets}
            investors={investors}
            onOpenWizard={() => setIsWizardOpen(true)}
            onOpenTransfer={handleOpenTransfer}
            onMintTokens={handleMintTokens}
            onDisburseDividends={handleDisburseDividends}
            onToggleFreeze={handleToggleFreeze}
          />
        )}

        {currentTab === 'monitor' && (
          <LiveMonitorView
            transactions={transactions}
            blocks={blocks}
            baseFee={baseFee}
            selectedTx={selectedTxForDetail}
            onSelectTx={setSelectedTxForDetail}
          />
        )}

        {currentTab === 'compliance' && (
          <ComplianceView
            investors={investors}
            assets={assets}
            onToggleWhitelist={handleToggleWhitelist}
          />
        )}
      </main>

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl shadow-2xl bg-slate-900 border border-slate-700/80 text-xs font-sans text-white flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {toast.type === 'info' && <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />}
            <span className="leading-relaxed">{toast.message}</span>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* RWA Tokenization Wizard Modal */}
      <RwaWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        baseFee={baseFee}
        onDeploy={handleDeployRwa}
      />

      {/* Transfer Modal */}
      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        assets={assets}
        investors={investors}
        currentAccount={account}
        preselectedAsset={transferAsset}
        baseFee={baseFee}
        onTransfer={handleTransferTokens}
      />

      {/* Network & Account Selector Modal */}
      <NetworkModal
        isOpen={isNetworkModalOpen}
        onClose={() => setIsNetworkModalOpen(false)}
        currentNetwork={network}
        currentAccount={account}
        investors={investors}
        isWeb3Connected={isWeb3Connected}
        onSelectNetwork={(net: NetworkType) => avalancheEngine.setNetwork(net)}
        onSelectAccount={(addr: string) => avalancheEngine.setAccount(addr)}
        onConnectRealWeb3={() => avalancheEngine.connectRealWeb3()}
        onRequestFaucet={handleRequestFaucet}
      />

      {/* Quiet Institutional Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060910] py-6 px-4 sm:px-6 mt-12 text-xs text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">Avalanche RWA Studio</span>
            <span aria-hidden="true">·</span>
            <span>Infraestructura de Activos del Mundo Real</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px] text-slate-400">{network.name}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="https://avax.network" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-slate-300 transition-colors"
            >
              Avalanche Network
            </a>
            <span aria-hidden="true">·</span>
            <a 
              href="https://snowtrace.io" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-slate-300 transition-colors"
            >
              Snowtrace Explorer
            </a>
            <span aria-hidden="true">·</span>
            <span>Finalidad Snowman sub-segundo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
