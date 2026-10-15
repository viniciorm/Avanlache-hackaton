export type RwaCategory = 
  | 'real_estate' 
  | 'private_credit' 
  | 'treasury' 
  | 'equity' 
  | 'commodity';

export type ComplianceTier = 
  | 'RegD_Accredited' 
  | 'RegS_International' 
  | 'Institutional_KYC';

export interface RwaAsset {
  id: string;
  name: string;
  symbol: string;
  category: RwaCategory;
  contractAddress: string;
  totalSupply: number;
  circulatingSupply: number;
  nominalValueUsd: number;
  navPerToken: number;
  targetApy: number;
  complianceLevel: ComplianceTier;
  isFrozen: boolean;
  createdAt: number;
  issuerName: string;
  issuerAddress: string;
  underlyingAssetDescription: string;
  jurisdiction: string;
  collateralDocs: { title: string; hash: string; type: string }[];
  distributionFrequency: 'Mensual' | 'Trimestral' | 'Anual';
  dividendReserveAvax: number;
}

export type TxType = 
  | 'DEPLOY_RWA' 
  | 'MINT' 
  | 'TRANSFER' 
  | 'DIVIDEND_PAYOUT' 
  | 'FREEZE_ASSET' 
  | 'UNFREEZE_ASSET'
  | 'WHITELIST_INVESTOR';

export interface AvalancheTransaction {
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  assetSymbol?: string;
  assetName?: string;
  type: TxType;
  amount?: number;
  nominalValueTotalUsd?: number;
  gasUsed: number;
  gasPriceGwei: number;
  status: 'pending' | 'accepted' | 'finalized';
  timestamp: number;
  consensusTimeMs: number;
  method: string;
  rawEventSignature?: string;
  details?: string;
}

export interface AvalancheBlock {
  number: number;
  hash: string;
  parentHash: string;
  validator: string;
  txCount: number;
  gasUsed: number;
  gasLimit: number;
  baseFeeGwei: number;
  timestamp: number;
  finalizedTimeSec: number;
  transactions: string[];
}

export interface Investor {
  id: string;
  name: string;
  address: string;
  kycTier: 'Nivel 1 - Básico' | 'Nivel 2 - Acreditado' | 'Nivel 3 - Institucional';
  country: string;
  isWhitelisted: boolean;
  isSanctioned: boolean;
  avaxBalance: number;
  holdings: { [assetSymbol: string]: number };
}

export type NetworkType = 'avalanche_mainnet' | 'avalanche_fuji' | 'local_sandbox';

export interface NetworkConfig {
  id: NetworkType;
  name: string;
  chainId: number;
  rpcUrl: string;
  explorerUrl: string;
  symbol: string;
  isTestnet: boolean;
}
