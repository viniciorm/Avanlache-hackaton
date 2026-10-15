import { 
  RwaAsset, 
  AvalancheTransaction, 
  AvalancheBlock, 
  Investor, 
  NetworkType, 
  NetworkConfig 
} from '../types/rwa';

export const NETWORKS: Record<NetworkType, NetworkConfig> = {
  avalanche_mainnet: {
    id: 'avalanche_mainnet',
    name: 'Avalanche C-Chain',
    chainId: 43114,
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerUrl: 'https://snowtrace.io',
    symbol: 'AVAX',
    isTestnet: false
  },
  avalanche_fuji: {
    id: 'avalanche_fuji',
    name: 'Avalanche Fuji Testnet',
    chainId: 43113,
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorerUrl: 'https://testnet.snowtrace.io',
    symbol: 'AVAX',
    isTestnet: true
  },
  local_sandbox: {
    id: 'local_sandbox',
    name: 'Avalanche Sandbox Local',
    chainId: 43112,
    rpcUrl: 'http://127.0.0.1:9650/ext/bc/C/rpc',
    explorerUrl: 'https://subnets.avax.network',
    symbol: 'AVAX',
    isTestnet: true
  }
};

const INITIAL_INVESTORS: Investor[] = [
  {
    id: 'inv-1',
    name: 'Swiss Alps Digital Capital (Tú)',
    address: '0x8b321F5A67C46a7848eDbE592358fAcF56cA66A9',
    kycTier: 'Nivel 3 - Institucional',
    country: 'Suiza',
    isWhitelisted: true,
    isSanctioned: false,
    avaxBalance: 428.5,
    holdings: {
      'APLF': 45000,
      'ASPC': 20000,
      'ASTY': 1200000,
      'ALGM': 15000
    }
  },
  {
    id: 'inv-2',
    name: 'Geneva Horizon Hedge Fund',
    address: '0x34C681b94F868f0D418FE27e0Eb66679bF46eB4D',
    kycTier: 'Nivel 3 - Institucional',
    country: 'Suiza',
    isWhitelisted: true,
    isSanctioned: false,
    avaxBalance: 154.2,
    holdings: {
      'APLF': 30000,
      'ASPC': 50000,
      'ASTY': 800000
    }
  },
  {
    id: 'inv-3',
    name: 'Zurich Family Office Alpha',
    address: '0x9A0E1389D347781b1E13E424905fB0aFc0e9D545',
    kycTier: 'Nivel 2 - Acreditado',
    country: 'Alemania',
    isWhitelisted: true,
    isSanctioned: false,
    avaxBalance: 980.0,
    holdings: {
      'APLF': 25000,
      'ALGM': 80000
    }
  },
  {
    id: 'inv-4',
    name: 'Valais Private Wealth Trust',
    address: '0x51EaE6fEb358f2Eb713dC2346743A9A65E68C61c',
    kycTier: 'Nivel 2 - Acreditado',
    country: 'Liechtenstein',
    isWhitelisted: true,
    isSanctioned: false,
    avaxBalance: 320.0,
    holdings: {
      'ASTY': 500000,
      'ASPC': 15000
    }
  }
];

const INITIAL_ASSETS: RwaAsset[] = [
  {
    id: 'rwa-1',
    name: 'Avalanche Prime Logistics Fund',
    symbol: 'APLF',
    category: 'real_estate',
    contractAddress: '0x49a37c02b3952f4a47e0dc53844f2d79a293ce14',
    totalSupply: 125000,
    circulatingSupply: 100000,
    nominalValueUsd: 100,
    navPerToken: 104.25,
    targetApy: 9.4,
    complianceLevel: 'RegD_Accredited',
    isFrozen: false,
    createdAt: Date.now() - 86400000 * 42,
    issuerName: 'Swiss Alps Digital Capital',
    issuerAddress: '0x8b321F5A67C46a7848eDbE592358fAcF56cA66A9',
    underlyingAssetDescription: 'Parque logístico automatizado de 48,000 m² con arrendatarios de grado de inversión AAA en Zurich y Basilea.',
    jurisdiction: 'Suiza / Unión Europea',
    distributionFrequency: 'Mensual',
    dividendReserveAvax: 145.8,
    collateralDocs: [
      { title: 'Escritura Notarial de Propiedad', hash: 'QmZ4tDuvesjWP1378...avxDoc', type: 'PDF Notarizado' },
      { title: 'Tasación Independiente CBRE 2026', hash: 'QmXo8hK28994a3bc...avxAudit', type: 'Auditoría NAV' }
    ]
  },
  {
    id: 'rwa-2',
    name: 'Alpine Structured Private Credit',
    symbol: 'ASPC',
    category: 'private_credit',
    contractAddress: '0x712a83e054cf17d29d89953284f185c7d294821a',
    totalSupply: 200000,
    circulatingSupply: 168000,
    nominalValueUsd: 50,
    navPerToken: 51.10,
    targetApy: 12.6,
    complianceLevel: 'Institutional_KYC',
    isFrozen: false,
    createdAt: Date.now() - 86400000 * 24,
    issuerName: 'Swiss Alps Digital Capital',
    issuerAddress: '0x8b321F5A67C46a7848eDbE592358fAcF56cA66A9',
    underlyingAssetDescription: 'Facilidad de crédito puente con sobrecolateralización 140% para empresas de tecnología limpias en Europa Central.',
    jurisdiction: 'Suiza',
    distributionFrequency: 'Trimestral',
    dividendReserveAvax: 92.4,
    collateralDocs: [
      { title: 'Acuerdo Marco de Crédito Privado', hash: 'Qm98aZ54aEbb1c...avxCredit', type: 'Contrato Jurídico' },
      { title: 'Custodia Bancaria Pledged Collateral', hash: 'QmFa3290bC18...avxCustody', type: 'Certificado de Reserva' }
    ]
  },
  {
    id: 'rwa-3',
    name: 'Avalanche Short-Duration Treasury Yield',
    symbol: 'ASTY',
    category: 'treasury',
    contractAddress: '0x18dbce2994cba349e10283c749a18d9482c38472',
    totalSupply: 25000000,
    circulatingSupply: 25000000,
    nominalValueUsd: 1.00,
    navPerToken: 1.00,
    targetApy: 4.85,
    complianceLevel: 'RegS_International',
    isFrozen: false,
    createdAt: Date.now() - 86400000 * 60,
    issuerName: 'Avalanche Institutional Reserve Corp',
    issuerAddress: '0x9A0E1389D347781b1E13E424905fB0aFc0e9D545',
    underlyingAssetDescription: 'Letras del Tesoro de EE.UU. a 0-90 días custodiadas en bancos regulados de nivel 1 con liquidación T+0 en Avalanche.',
    jurisdiction: 'Bermudas / Global',
    distributionFrequency: 'Mensual',
    dividendReserveAvax: 380.0,
    collateralDocs: [
      { title: 'Prueba de Reservas BNY Mellon T-Bills', hash: 'QmPoR3991823...avxPoR', type: 'Prueba en Cadena (PoR)' }
    ]
  },
  {
    id: 'rwa-4',
    name: 'Andean Lithium Extraction Royalty',
    symbol: 'ALGM',
    category: 'commodity',
    contractAddress: '0x539c3e9a71db294829910d84f9382b9a741029c4',
    totalSupply: 150000,
    circulatingSupply: 95000,
    nominalValueUsd: 25,
    navPerToken: 26.80,
    targetApy: 14.2,
    complianceLevel: 'RegD_Accredited',
    isFrozen: false,
    createdAt: Date.now() - 86400000 * 12,
    issuerName: 'Lithium Future Metals SA',
    issuerAddress: '0x34C681b94F868f0D418FE27e0Eb66679bF46eB4D',
    underlyingAssetDescription: 'Contrato perpetuo de regalías del 3.5% sobre la producción de carbonato de litio grado batería en el Salar de Atacama.',
    jurisdiction: 'Chile / Delaware',
    distributionFrequency: 'Trimestral',
    dividendReserveAvax: 65.0,
    collateralDocs: [
      { title: 'Concesión Minera Registrada', hash: 'QmMining8721...avxReg', type: 'Título de Regalías' }
    ]
  }
];

const INITIAL_BLOCKS: AvalancheBlock[] = [
  {
    number: 48921840,
    hash: '0x38fa82b94c81029e8471b0293847c2938491028374928192384729183948a2bc',
    parentHash: '0x19fa74c291827401928374928173849201928374910293847192837491029384',
    validator: 'NodeID-ProValAvaxZurich91',
    txCount: 42,
    gasUsed: 4218930,
    gasLimit: 15000000,
    baseFeeGwei: 26.8,
    timestamp: Date.now() - 5000,
    finalizedTimeSec: 0.72,
    transactions: ['0x8f...1a', '0x4c...9d', '0x1b...22']
  },
  {
    number: 48921839,
    hash: '0x19fa74c291827401928374928173849201928374910293847192837491029384',
    parentHash: '0x99fe831029384719283749102938471928374910293847192837491029384719',
    validator: 'NodeID-AvalancheStakingBern44',
    txCount: 38,
    gasUsed: 3891020,
    gasLimit: 15000000,
    baseFeeGwei: 27.2,
    timestamp: Date.now() - 7500,
    finalizedTimeSec: 0.69,
    transactions: ['0x3e...77', '0x9a...b1']
  },
  {
    number: 48921838,
    hash: '0x99fe831029384719283749102938471928374910293847192837491029384719',
    parentHash: '0x44aa192837491029384719283749102938471928374910293847192837491029',
    validator: 'NodeID-CoreGlobalValidator01',
    txCount: 56,
    gasUsed: 5910230,
    gasLimit: 15000000,
    baseFeeGwei: 26.5,
    timestamp: Date.now() - 10000,
    finalizedTimeSec: 0.81,
    transactions: ['0xaa...12', '0xbb...34']
  }
];

const INITIAL_TRANSACTIONS: AvalancheTransaction[] = [
  {
    hash: '0xa4f198b2c4819d0e827103984729184710293847192837491029384719283749',
    blockNumber: 48921840,
    from: '0x8b321F5A67C46a7848eDbE592358fAcF56cA66A9',
    to: '0x49a37c02b3952f4a47e0dc53844f2d79a293ce14',
    assetSymbol: 'APLF',
    assetName: 'Avalanche Prime Logistics Fund',
    type: 'DIVIDEND_PAYOUT',
    amount: 145.8,
    nominalValueTotalUsd: 4811.4,
    gasUsed: 142800,
    gasPriceGwei: 26.8,
    status: 'finalized',
    timestamp: Date.now() - 5000,
    consensusTimeMs: 720,
    method: 'disburseYield(uint256 trancheId)',
    details: 'Distribución mensual de dividendos a 4 holders verificados.'
  },
  {
    hash: '0x8f3c710293847192837491029384719283749102938471928374910293847192',
    blockNumber: 48921839,
    from: '0x8b321F5A67C46a7848eDbE592358fAcF56cA66A9',
    to: '0x34C681b94F868f0D418FE27e0Eb66679bF46eB4D',
    assetSymbol: 'APLF',
    assetName: 'Avalanche Prime Logistics Fund',
    type: 'TRANSFER',
    amount: 5000,
    nominalValueTotalUsd: 500000,
    gasUsed: 65200,
    gasPriceGwei: 27.2,
    status: 'finalized',
    timestamp: Date.now() - 7500,
    consensusTimeMs: 690,
    method: 'transferCompliance(address to, uint256 val)',
    details: 'Transferencia secundaria P2P entre inversores calificados Reg D.'
  },
  {
    hash: '0x5b92019283749102938471928374910293847192837491029384719283749102',
    blockNumber: 48921838,
    from: '0x8b321F5A67C46a7848eDbE592358fAcF56cA66A9',
    to: '0x712a83e054cf17d29d89953284f185c7d294821a',
    assetSymbol: 'ASPC',
    assetName: 'Alpine Structured Private Credit',
    type: 'MINT',
    amount: 25000,
    nominalValueTotalUsd: 1250000,
    gasUsed: 89400,
    gasPriceGwei: 26.5,
    status: 'finalized',
    timestamp: Date.now() - 10000,
    consensusTimeMs: 810,
    method: 'mintSecurities(address to, uint256 qty)',
    details: 'Nueva emisión de notas de crédito institucional respaldadas.'
  }
];

class AvalancheEngine {
  private assets: RwaAsset[] = [];
  private transactions: AvalancheTransaction[] = [];
  private blocks: AvalancheBlock[] = [];
  private investors: Investor[] = [];
  private currentNetwork: NetworkType = 'local_sandbox';
  private currentAccountAddress: string = '0x8b321F5A67C46a7848eDbE592358fAcF56cA66A9';
  private isWeb3Connected: boolean = false;
  private currentBaseFeeGwei: number = 26.5;
  private subscribers: Set<() => void> = new Set();
  private blockInterval: any = null;

  constructor() {
    this.loadState();
    this.startBlockMining();
  }

  private loadState() {
    try {
      const savedAssets = localStorage.getItem('avax_rwa_assets');
      const savedTxs = localStorage.getItem('avax_rwa_txs');
      const savedBlocks = localStorage.getItem('avax_rwa_blocks');
      const savedInvestors = localStorage.getItem('avax_rwa_investors');
      const savedNetwork = localStorage.getItem('avax_rwa_network');
      const savedAccount = localStorage.getItem('avax_rwa_account');

      this.assets = savedAssets ? JSON.parse(savedAssets) : INITIAL_ASSETS;
      this.transactions = savedTxs ? JSON.parse(savedTxs) : INITIAL_TRANSACTIONS;
      this.blocks = savedBlocks ? JSON.parse(savedBlocks) : INITIAL_BLOCKS;
      this.investors = savedInvestors ? JSON.parse(savedInvestors) : INITIAL_INVESTORS;
      this.currentNetwork = (savedNetwork as NetworkType) || 'local_sandbox';
      this.currentAccountAddress = savedAccount || '0x8b321F5A67C46a7848eDbE592358fAcF56cA66A9';
    } catch {
      this.assets = INITIAL_ASSETS;
      this.transactions = INITIAL_TRANSACTIONS;
      this.blocks = INITIAL_BLOCKS;
      this.investors = INITIAL_INVESTORS;
    }
  }

  private saveState() {
    try {
      localStorage.setItem('avax_rwa_assets', JSON.stringify(this.assets));
      localStorage.setItem('avax_rwa_txs', JSON.stringify(this.transactions.slice(0, 100)));
      localStorage.setItem('avax_rwa_blocks', JSON.stringify(this.blocks.slice(0, 50)));
      localStorage.setItem('avax_rwa_investors', JSON.stringify(this.investors));
      localStorage.setItem('avax_rwa_network', this.currentNetwork);
      localStorage.setItem('avax_rwa_account', this.currentAccountAddress);
    } catch (e) {
      console.warn('Local storage write warning', e);
    }
  }

  public subscribe(callback: () => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notify() {
    this.subscribers.forEach(cb => {
      try { cb(); } catch (err) { console.error(err); }
    });
    this.saveState();
  }

  public getAssets(): RwaAsset[] {
    return [...this.assets];
  }

  public getTransactions(): AvalancheTransaction[] {
    return [...this.transactions];
  }

  public getBlocks(): AvalancheBlock[] {
    return [...this.blocks];
  }

  public getInvestors(): Investor[] {
    return [...this.investors];
  }

  public getCurrentNetwork(): NetworkConfig {
    return NETWORKS[this.currentNetwork];
  }

  public getCurrentNetworkType(): NetworkType {
    return this.currentNetwork;
  }

  public getCurrentAccount(): Investor {
    const found = this.investors.find(i => i.address.toLowerCase() === this.currentAccountAddress.toLowerCase());
    if (found) return found;
    return this.investors[0];
  }

  public getBaseFee(): number {
    return Number(this.currentBaseFeeGwei.toFixed(2));
  }

  public isConnectedWithWeb3(): boolean {
    return this.isWeb3Connected;
  }

  public setNetwork(network: NetworkType) {
    this.currentNetwork = network;
    this.notify();
  }

  public setAccount(address: string) {
    this.currentAccountAddress = address;
    this.isWeb3Connected = false;
    this.notify();
  }

  // Connect Web3 wallet (Core / MetaMask)
  public async connectRealWeb3(): Promise<{ success: boolean; address?: string; error?: string }> {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      return { 
        success: false, 
        error: 'No se detectó un monedero Web3 (Core Wallet o MetaMask). Continuando en Sandbox Avalanche.' 
      };
    }

    try {
      const provider = (window as any).ethereum;
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        this.currentAccountAddress = address;
        this.isWeb3Connected = true;

        // If not already in investors list, add as institutional user
        let existing = this.investors.find(i => i.address.toLowerCase() === address.toLowerCase());
        if (!existing) {
          const newInvestor: Investor = {
            id: `inv-web3-${Date.now()}`,
            name: `Web3 Connected Wallet (${address.slice(0, 6)}...${address.slice(-4)})`,
            address: address,
            kycTier: 'Nivel 3 - Institucional',
            country: 'Internacional',
            isWhitelisted: true,
            isSanctioned: false,
            avaxBalance: 125.0,
            holdings: { 'APLF': 10000, 'ASTY': 250000 }
          };
          this.investors.unshift(newInvestor);
        }

        // Check chainId and offer Fuji or Mainnet
        const chainIdHex = await provider.request({ method: 'eth_chainId' });
        const chainId = parseInt(chainIdHex, 16);
        if (chainId === 43114) {
          this.currentNetwork = 'avalanche_mainnet';
        } else if (chainId === 43113) {
          this.currentNetwork = 'avalanche_fuji';
        }

        this.notify();
        return { success: true, address };
      }
      return { success: false, error: 'No se seleccionaron cuentas en el monedero.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al conectar monedero Web3.' };
    }
  }

  // Request faucet AVAX in testnet/sandbox
  public requestFaucet(targetAddress?: string, amount = 100): AvalancheTransaction {
    const address = targetAddress || this.currentAccountAddress;
    const inv = this.investors.find(i => i.address.toLowerCase() === address.toLowerCase());
    if (inv) {
      inv.avaxBalance += amount;
    }

    const tx: AvalancheTransaction = {
      hash: this.generateTxHash(),
      blockNumber: this.blocks[0] ? this.blocks[0].number + 1 : 48921841,
      from: '0x0000000000000000000000000000000000000000',
      to: address,
      type: 'TRANSFER',
      amount: amount,
      gasUsed: 21000,
      gasPriceGwei: this.currentBaseFeeGwei,
      status: 'pending',
      timestamp: Date.now(),
      consensusTimeMs: 780,
      method: 'fujiFaucetDispense(address recipient, uint256 avax)',
      details: `Recarga oficial de ${amount} AVAX desde el Grifo de Fuji / Avalanche Sandbox.`
    };

    this.transactions.unshift(tx);
    this.notify();
    return tx;
  }

  // Deploy new RWA Asset
  public deployRwaAsset(data: {
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
  }): { asset: RwaAsset; tx: AvalancheTransaction } {
    const currentAcc = this.getCurrentAccount();
    const contractAddress = this.generateContractAddress();
    const assetId = `rwa-${Date.now()}`;

    const newAsset: RwaAsset = {
      id: assetId,
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      category: data.category,
      contractAddress,
      totalSupply: data.totalSupply,
      circulatingSupply: Math.floor(data.totalSupply * 0.75),
      nominalValueUsd: data.nominalValueUsd,
      navPerToken: data.nominalValueUsd,
      targetApy: data.targetApy,
      complianceLevel: data.complianceLevel,
      isFrozen: false,
      createdAt: Date.now(),
      issuerName: currentAcc.name,
      issuerAddress: currentAcc.address,
      underlyingAssetDescription: data.underlyingDescription,
      jurisdiction: data.jurisdiction,
      distributionFrequency: data.distributionFrequency,
      dividendReserveAvax: 50.0,
      collateralDocs: [
        {
          title: `Estatuto de Emisión RWA ${data.symbol}`,
          hash: `Qm${Math.random().toString(36).substring(2, 15)}...avxMaster`,
          type: 'Contrato Marco Tokenizado'
        },
        {
          title: 'Dictamen Jurídico de Custodia y Respaldo',
          hash: `Qm${Math.random().toString(36).substring(2, 15)}...avxLegal`,
          type: 'Auditoría Legal'
        }
      ]
    };

    // Allocate initial holding to the issuer
    currentAcc.holdings[newAsset.symbol] = newAsset.circulatingSupply;
    currentAcc.avaxBalance = Math.max(0, currentAcc.avaxBalance - 0.85); // gas cost for contract deploy

    this.assets.unshift(newAsset);

    const tx: AvalancheTransaction = {
      hash: this.generateTxHash(),
      blockNumber: this.blocks[0] ? this.blocks[0].number + 1 : 48921841,
      from: currentAcc.address,
      to: contractAddress,
      assetSymbol: newAsset.symbol,
      assetName: newAsset.name,
      type: 'DEPLOY_RWA',
      amount: newAsset.totalSupply,
      nominalValueTotalUsd: newAsset.totalSupply * newAsset.nominalValueUsd,
      gasUsed: 1845200,
      gasPriceGwei: this.currentBaseFeeGwei,
      status: 'pending',
      timestamp: Date.now(),
      consensusTimeMs: 820,
      method: `deployRwaSecuritiesToken("${data.name}", "${data.symbol}", ${data.totalSupply})`,
      details: `Despliegue del contrato inteligente ERC-3643 compatible en Avalanche C-Chain.`
    };

    this.transactions.unshift(tx);
    this.notify();
    return { asset: newAsset, tx };
  }

  // Mint new tokens to an investor
  public mintTokens(assetId: string, recipientAddress: string, amount: number): { success: boolean; tx?: AvalancheTransaction; error?: string } {
    const asset = this.assets.find(a => a.id === assetId);
    if (!asset) return { success: false, error: 'Activo no encontrado.' };
    if (asset.isFrozen) return { success: false, error: 'El activo está temporalmente congelado por cumplimiento.' };

    const recipient = this.investors.find(i => i.address.toLowerCase() === recipientAddress.toLowerCase());
    if (!recipient) return { success: false, error: 'El inversor destinatario no está registrado.' };
    if (!recipient.isWhitelisted) return { success: false, error: 'El destinatario no ha completado el KYC/Whitelisting requerido.' };

    // Update balances
    asset.totalSupply += amount;
    asset.circulatingSupply += amount;
    recipient.holdings[asset.symbol] = (recipient.holdings[asset.symbol] || 0) + amount;

    const currentAcc = this.getCurrentAccount();
    currentAcc.avaxBalance = Math.max(0, currentAcc.avaxBalance - 0.05);

    const tx: AvalancheTransaction = {
      hash: this.generateTxHash(),
      blockNumber: this.blocks[0] ? this.blocks[0].number + 1 : 48921841,
      from: currentAcc.address,
      to: recipient.address,
      assetSymbol: asset.symbol,
      assetName: asset.name,
      type: 'MINT',
      amount: amount,
      nominalValueTotalUsd: amount * asset.nominalValueUsd,
      gasUsed: 78500,
      gasPriceGwei: this.currentBaseFeeGwei,
      status: 'pending',
      timestamp: Date.now(),
      consensusTimeMs: 710,
      method: `mintSecurities(address ${recipient.address.slice(0, 8)}..., uint256 ${amount})`,
      details: `Emisión adicional de ${amount.toLocaleString()} títulos a favor de ${recipient.name}.`
    };

    this.transactions.unshift(tx);
    this.notify();
    return { success: true, tx };
  }

  // Transfer tokens between investors
  public transferTokens(
    assetId: string, 
    fromAddress: string, 
    toAddress: string, 
    amount: number
  ): { success: boolean; tx?: AvalancheTransaction; error?: string } {
    const asset = this.assets.find(a => a.id === assetId);
    if (!asset) return { success: false, error: 'Activo no encontrado.' };
    if (asset.isFrozen) return { success: false, error: 'El activo se encuentra congelado para transferencias.' };

    const sender = this.investors.find(i => i.address.toLowerCase() === fromAddress.toLowerCase());
    const recipient = this.investors.find(i => i.address.toLowerCase() === toAddress.toLowerCase());

    if (!sender) return { success: false, error: 'Remitente no registrado.' };
    if (!recipient) return { success: false, error: 'Destinatario no registrado en el sistema.' };

    if (!recipient.isWhitelisted) {
      return { success: false, error: 'Transacción denegada: El destinatario no cumple con el nivel de Whitelist KYC.' };
    }
    if (recipient.isSanctioned) {
      return { success: false, error: 'Transacción bloqueada por lista de sanciones OFAC/SECO.' };
    }

    const currentHolding = sender.holdings[asset.symbol] || 0;
    if (currentHolding < amount) {
      return { success: false, error: `Saldo insuficiente. Posee ${currentHolding.toLocaleString()} ${asset.symbol}.` };
    }

    // Execute transfer
    sender.holdings[asset.symbol] -= amount;
    recipient.holdings[asset.symbol] = (recipient.holdings[asset.symbol] || 0) + amount;
    sender.avaxBalance = Math.max(0, sender.avaxBalance - 0.02);

    const tx: AvalancheTransaction = {
      hash: this.generateTxHash(),
      blockNumber: this.blocks[0] ? this.blocks[0].number + 1 : 48921841,
      from: sender.address,
      to: recipient.address,
      assetSymbol: asset.symbol,
      assetName: asset.name,
      type: 'TRANSFER',
      amount: amount,
      nominalValueTotalUsd: amount * asset.nominalValueUsd,
      gasUsed: 62400,
      gasPriceGwei: this.currentBaseFeeGwei,
      status: 'pending',
      timestamp: Date.now(),
      consensusTimeMs: 650,
      method: `transferCompliance(address to, uint256 val)`,
      details: `Transferencia conforme de ${amount.toLocaleString()} ${asset.symbol} hacia ${recipient.name}.`
    };

    this.transactions.unshift(tx);
    this.notify();
    return { success: true, tx };
  }

  // Disburse dividends in AVAX
  public disburseDividends(assetId: string, totalAvaxAmount: number): { success: boolean; tx?: AvalancheTransaction; error?: string } {
    const asset = this.assets.find(a => a.id === assetId);
    if (!asset) return { success: false, error: 'Activo no encontrado.' };

    const currentAcc = this.getCurrentAccount();
    if (currentAcc.avaxBalance < totalAvaxAmount) {
      return { success: false, error: `Saldo en tesorería insuficiente. Requiere ${totalAvaxAmount} AVAX.` };
    }

    currentAcc.avaxBalance -= totalAvaxAmount;
    asset.dividendReserveAvax += totalAvaxAmount;

    // Distribute proportionally to holders of this asset
    const totalCirc = asset.circulatingSupply;
    this.investors.forEach(inv => {
      const held = inv.holdings[asset.symbol] || 0;
      if (held > 0 && totalCirc > 0) {
        const share = (held / totalCirc) * totalAvaxAmount;
        inv.avaxBalance += share;
      }
    });

    const tx: AvalancheTransaction = {
      hash: this.generateTxHash(),
      blockNumber: this.blocks[0] ? this.blocks[0].number + 1 : 48921841,
      from: currentAcc.address,
      to: asset.contractAddress,
      assetSymbol: asset.symbol,
      assetName: asset.name,
      type: 'DIVIDEND_PAYOUT',
      amount: totalAvaxAmount,
      nominalValueTotalUsd: totalAvaxAmount * 33.0, // approx AVAX rate
      gasUsed: 135000,
      gasPriceGwei: this.currentBaseFeeGwei,
      status: 'pending',
      timestamp: Date.now(),
      consensusTimeMs: 750,
      method: `disburseYield(uint256 totalAvax)`,
      details: `Dispersión de dividendos de ${totalAvaxAmount} AVAX entre todos los tenedores registrados de ${asset.symbol}.`
    };

    this.transactions.unshift(tx);
    this.notify();
    return { success: true, tx };
  }

  // Toggle freeze status for regulatory compliance
  public toggleFreezeAsset(assetId: string): { success: boolean; isFrozen: boolean } {
    const asset = this.assets.find(a => a.id === assetId);
    if (!asset) return { success: false, isFrozen: false };

    asset.isFrozen = !asset.isFrozen;
    const currentAcc = this.getCurrentAccount();

    const tx: AvalancheTransaction = {
      hash: this.generateTxHash(),
      blockNumber: this.blocks[0] ? this.blocks[0].number + 1 : 48921841,
      from: currentAcc.address,
      to: asset.contractAddress,
      assetSymbol: asset.symbol,
      assetName: asset.name,
      type: asset.isFrozen ? 'FREEZE_ASSET' : 'UNFREEZE_ASSET',
      gasUsed: 45000,
      gasPriceGwei: this.currentBaseFeeGwei,
      status: 'pending',
      timestamp: Date.now(),
      consensusTimeMs: 640,
      method: asset.isFrozen ? 'pauseToken()' : 'unpauseToken()',
      details: `Regulación: ${asset.isFrozen ? 'Congelamiento administrativo' : 'Descongelamiento'} de operaciones para ${asset.symbol}.`
    };

    this.transactions.unshift(tx);
    this.notify();
    return { success: true, isFrozen: asset.isFrozen };
  }

  // Toggle whitelist for an investor
  public toggleInvestorWhitelist(investorId: string): boolean {
    const inv = this.investors.find(i => i.id === investorId);
    if (!inv) return false;

    inv.isWhitelisted = !inv.isWhitelisted;
    const currentAcc = this.getCurrentAccount();

    const tx: AvalancheTransaction = {
      hash: this.generateTxHash(),
      blockNumber: this.blocks[0] ? this.blocks[0].number + 1 : 48921841,
      from: currentAcc.address,
      to: inv.address,
      type: 'WHITELIST_INVESTOR',
      gasUsed: 35000,
      gasPriceGwei: this.currentBaseFeeGwei,
      status: 'pending',
      timestamp: Date.now(),
      consensusTimeMs: 600,
      method: `setInvestorWhitelist(address ${inv.address.slice(0, 8)}..., bool ${inv.isWhitelisted})`,
      details: `Actualización de identidad on-chain: ${inv.name} marcado como ${inv.isWhitelisted ? 'Habilitado' : 'Revocado'}.`
    };

    this.transactions.unshift(tx);
    this.notify();
    return true;
  }

  // Real-time block production loop (Snowman Consensus simulation)
  private startBlockMining() {
    if (this.blockInterval) return;

    this.blockInterval = setInterval(() => {
      this.produceNextBlock();
    }, 2800); // Avalanche C-Chain average block time
  }

  private produceNextBlock() {
    const latestBlock = this.blocks[0] || INITIAL_BLOCKS[0];
    const nextNumber = latestBlock.number + 1;

    // Collect pending transactions
    const pendingTxs = this.transactions.filter(t => t.status === 'pending');
    
    // Simulate Snowman consensus: transition pending to accepted, then finalized
    pendingTxs.forEach(t => {
      t.status = 'accepted';
      t.blockNumber = nextNumber;
      setTimeout(() => {
        t.status = 'finalized';
      }, 900);
    });

    // Fluctuate Base Fee slightly within realistic range (25-35 nAVAX)
    const delta = (Math.random() - 0.5) * 1.2;
    this.currentBaseFeeGwei = Math.max(25.0, Math.min(42.0, this.currentBaseFeeGwei + delta));

    const validators = [
      'NodeID-ProValAvaxZurich91',
      'NodeID-AvalancheStakingBern44',
      'NodeID-CoreGlobalValidator01',
      'NodeID-SwissAlpineCChainNode',
      'NodeID-AvalancheEvergreenLab'
    ];
    const randomValidator = validators[Math.floor(Math.random() * validators.length)];

    const txCount = pendingTxs.length + Math.floor(Math.random() * 25) + 12;
    const gasUsed = pendingTxs.reduce((sum, tx) => sum + tx.gasUsed, 0) + (txCount * 65000);
    const finalizedTime = Number((0.65 + Math.random() * 0.28).toFixed(2));

    const newBlock: AvalancheBlock = {
      number: nextNumber,
      hash: this.generateBlockHash(),
      parentHash: latestBlock.hash,
      validator: randomValidator,
      txCount: txCount,
      gasUsed: gasUsed,
      gasLimit: 15000000,
      baseFeeGwei: Number(this.currentBaseFeeGwei.toFixed(2)),
      timestamp: Date.now(),
      finalizedTimeSec: finalizedTime,
      transactions: pendingTxs.map(t => t.hash)
    };

    this.blocks.unshift(newBlock);
    if (this.blocks.length > 50) {
      this.blocks.pop();
    }

    this.notify();
  }

  private generateTxHash(): string {
    const chars = '0123456789abcdef';
    let res = '0x';
    for (let i = 0; i < 64; i++) {
      res += chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
  }

  private generateBlockHash(): string {
    const chars = '0123456789abcdef';
    let res = '0x';
    for (let i = 0; i < 64; i++) {
      res += chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
  }

  private generateContractAddress(): string {
    const chars = '0123456789abcdef';
    let res = '0x';
    for (let i = 0; i < 40; i++) {
      res += chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
  }
}

export const avalancheEngine = new AvalancheEngine();
