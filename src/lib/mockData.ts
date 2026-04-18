export interface Agent {
  id: string;
  name: string;
  /** Guarded ERC-4337 smart account — the only spend address (`from`) for this agent. */
  walletAddress: string;
  chainLabel?: string;
  status: 'Active' | 'Frozen' | 'Escalation Pending';
  kyaScore: number;
  reputationScore: number;
  dailySpend: number;
  dailyLimit: number;
  transactionsToday: number;
  riskScore: number;
  riskTrend: number;
  policyModule: string;
  erc8004Id: string;
}

export interface Transaction {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  destination: string;
  token: string;
  amount: number;
  riskScore: number;
  decision: 'APPROVED' | 'BLOCKED' | 'ESCALATED';
  blockNumber: number;
  txHash: string;
  policyLayer: string;
  reason?: string;
  policyChecks?: { rule: string; passed: boolean }[];
}

export interface PolicyConfig {
  dailyLimit: number;
  singleTxMax: number;
  hourlyLimit: number;
  allowedTokens: { symbol: string; address: string }[];
  allowedRecipients: { label: string; address: string }[];
  tradingHoursStart: string;
  tradingHoursEnd: string;
  weekdayOnly: boolean;
  circuitBreakerThreshold: number;
}

export const agents: Agent[] = [
  { id: '1', name: 'Treasury Alpha', walletAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', chainLabel: 'Base', status: 'Active', kyaScore: 92, reputationScore: 88, dailySpend: 45000, dailyLimit: 100000, transactionsToday: 34, riskScore: 23, riskTrend: -3, policyModule: '0x1111111254EEB25477B68fb85Ed929f73A960582', erc8004Id: 'ERC8004-001' },
  { id: '2', name: 'Yield Optimizer', walletAddress: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45', chainLabel: 'Base', status: 'Active', kyaScore: 87, reputationScore: 91, dailySpend: 78000, dailyLimit: 100000, transactionsToday: 56, riskScore: 45, riskTrend: 8, policyModule: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD', erc8004Id: 'ERC8004-002' },
  { id: '3', name: 'Liquidity Guard', walletAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', chainLabel: 'Base', status: 'Frozen', kyaScore: 64, reputationScore: 72, dailySpend: 0, dailyLimit: 50000, transactionsToday: 0, riskScore: 78, riskTrend: 15, policyModule: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', erc8004Id: 'ERC8004-003' },
  { id: '4', name: 'DeFi Sentinel', walletAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', chainLabel: 'Base', status: 'Active', kyaScore: 95, reputationScore: 94, dailySpend: 12000, dailyLimit: 200000, transactionsToday: 12, riskScore: 11, riskTrend: -7, policyModule: '0xdAC17F958D2ee523a2206206994597C13D831ec7', erc8004Id: 'ERC8004-004' },
  { id: '5', name: 'Bridge Monitor', walletAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA', chainLabel: 'Base', status: 'Escalation Pending', kyaScore: 71, reputationScore: 68, dailySpend: 33000, dailyLimit: 75000, transactionsToday: 28, riskScore: 62, riskTrend: 12, policyModule: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', erc8004Id: 'ERC8004-005' },
  { id: '6', name: 'Staking Manager', walletAddress: '0xD533a949740bb3306d119CC777fa900bA034cd52', chainLabel: 'Base', status: 'Active', kyaScore: 83, reputationScore: 85, dailySpend: 56000, dailyLimit: 150000, transactionsToday: 41, riskScore: 35, riskTrend: -1, policyModule: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE', erc8004Id: 'ERC8004-006' },
];

export const transactions: Transaction[] = [
  { id: '1', timestamp: '2026-03-27T14:32:00Z', agentId: '1', agentName: 'Treasury Alpha', destination: '0xDef1C0ded9bec7F1a1670819833240f027b25EfF', token: 'USDC', amount: 5200, riskScore: 12, decision: 'APPROVED', blockNumber: 18234567, txHash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456', policyLayer: 'L1', policyChecks: [{ rule: 'Daily Limit', passed: true }, { rule: 'Single TX Max', passed: true }, { rule: 'Token Whitelist', passed: true }, { rule: 'Recipient Whitelist', passed: true }, { rule: 'Trading Hours', passed: true }, { rule: 'Circuit Breaker', passed: true }, { rule: 'HITL Threshold', passed: true }] },
  { id: '2', timestamp: '2026-03-27T14:28:00Z', agentId: '2', agentName: 'Yield Optimizer', destination: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45', token: 'WETH', amount: 15000, riskScore: 67, decision: 'ESCALATED', blockNumber: 18234565, txHash: '0xb2c3d4e5f67890123456789012345678901234567890abcdef1234567890abcd', policyLayer: 'L4', reason: 'Value exceeds $10k HITL threshold', policyChecks: [{ rule: 'Daily Limit', passed: true }, { rule: 'Single TX Max', passed: true }, { rule: 'Token Whitelist', passed: true }, { rule: 'Recipient Whitelist', passed: true }, { rule: 'Trading Hours', passed: true }, { rule: 'Circuit Breaker', passed: true }, { rule: 'HITL Threshold', passed: false }] },
  { id: '3', timestamp: '2026-03-27T14:25:00Z', agentId: '3', agentName: 'Liquidity Guard', destination: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', token: 'DAI', amount: 120000, riskScore: 89, decision: 'BLOCKED', blockNumber: 18234563, txHash: '0xc3d4e5f678901234567890123456789012345678901234567890abcdef123456', policyLayer: 'L2', reason: 'DAILY_LIMIT_EXCEEDED', policyChecks: [{ rule: 'Daily Limit', passed: false }, { rule: 'Single TX Max', passed: false }, { rule: 'Token Whitelist', passed: true }, { rule: 'Recipient Whitelist', passed: false }, { rule: 'Trading Hours', passed: true }, { rule: 'Circuit Breaker', passed: false }, { rule: 'HITL Threshold', passed: false }] },
  { id: '4', timestamp: '2026-03-27T14:20:00Z', agentId: '1', agentName: 'Treasury Alpha', destination: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', token: 'USDC', amount: 3400, riskScore: 8, decision: 'APPROVED', blockNumber: 18234560, txHash: '0xd4e5f6789012345678901234567890123456789012345678901234567890abcd', policyLayer: 'L1', policyChecks: [{ rule: 'Daily Limit', passed: true }, { rule: 'Single TX Max', passed: true }, { rule: 'Token Whitelist', passed: true }, { rule: 'Recipient Whitelist', passed: true }, { rule: 'Trading Hours', passed: true }, { rule: 'Circuit Breaker', passed: true }, { rule: 'HITL Threshold', passed: true }] },
  { id: '5', timestamp: '2026-03-27T14:15:00Z', agentId: '5', agentName: 'Bridge Monitor', destination: '0x514910771AF9Ca656af840dff83E8264EcF986CA', token: 'LINK', amount: 8900, riskScore: 55, decision: 'APPROVED', blockNumber: 18234558, txHash: '0xe5f67890123456789012345678901234567890123456789012345678901234ab', policyLayer: 'L3', policyChecks: [{ rule: 'Daily Limit', passed: true }, { rule: 'Single TX Max', passed: true }, { rule: 'Token Whitelist', passed: true }, { rule: 'Recipient Whitelist', passed: true }, { rule: 'Trading Hours', passed: true }, { rule: 'Circuit Breaker', passed: true }, { rule: 'HITL Threshold', passed: true }] },
  { id: '6', timestamp: '2026-03-27T14:10:00Z', agentId: '4', agentName: 'DeFi Sentinel', destination: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', token: 'USDC', amount: 2100, riskScore: 5, decision: 'APPROVED', blockNumber: 18234555, txHash: '0xf6789012345678901234567890123456789012345678901234567890123456cd', policyLayer: 'L1', policyChecks: [{ rule: 'Daily Limit', passed: true }, { rule: 'Single TX Max', passed: true }, { rule: 'Token Whitelist', passed: true }, { rule: 'Recipient Whitelist', passed: true }, { rule: 'Trading Hours', passed: true }, { rule: 'Circuit Breaker', passed: true }, { rule: 'HITL Threshold', passed: true }] },
  { id: '7', timestamp: '2026-03-27T14:05:00Z', agentId: '2', agentName: 'Yield Optimizer', destination: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45', token: 'USDT', amount: 45000, riskScore: 72, decision: 'BLOCKED', blockNumber: 18234550, txHash: '0x07890123456789012345678901234567890123456789012345678901234567ef', policyLayer: 'L5', reason: 'CIRCUIT_BREAKER_TRIPPED', policyChecks: [{ rule: 'Daily Limit', passed: true }, { rule: 'Single TX Max', passed: false }, { rule: 'Token Whitelist', passed: true }, { rule: 'Recipient Whitelist', passed: true }, { rule: 'Trading Hours', passed: true }, { rule: 'Circuit Breaker', passed: false }, { rule: 'HITL Threshold', passed: false }] },
  { id: '8', timestamp: '2026-03-27T13:58:00Z', agentId: '6', agentName: 'Staking Manager', destination: '0xD533a949740bb3306d119CC777fa900bA034cd52', token: 'CRV', amount: 7600, riskScore: 31, decision: 'APPROVED', blockNumber: 18234548, txHash: '0x18901234567890123456789012345678901234567890123456789012345678ab', policyLayer: 'L1', policyChecks: [{ rule: 'Daily Limit', passed: true }, { rule: 'Single TX Max', passed: true }, { rule: 'Token Whitelist', passed: true }, { rule: 'Recipient Whitelist', passed: true }, { rule: 'Trading Hours', passed: true }, { rule: 'Circuit Breaker', passed: true }, { rule: 'HITL Threshold', passed: true }] },
];

export const defaultPolicy: PolicyConfig = {
  dailyLimit: 100000,
  singleTxMax: 25000,
  hourlyLimit: 50000,
  allowedTokens: [
    { symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
    { symbol: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
    { symbol: 'WETH', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
    { symbol: 'DAI', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' },
  ],
  allowedRecipients: [
    { label: 'Uniswap Router', address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' },
    { label: '1inch Router', address: '0x1111111254EEB25477B68fb85Ed929f73A960582' },
  ],
  tradingHoursStart: '08:00',
  tradingHoursEnd: '20:00',
  weekdayOnly: true,
  circuitBreakerThreshold: 5,
};

export const dailyVolumeData = Array.from({ length: 30 }, (_, i) => ({
  date: `Mar ${i + 1}`,
  approved: Math.floor(Math.random() * 500000) + 200000,
  blocked: Math.floor(Math.random() * 50000) + 5000,
}));

export const blockedReasonsData = [
  { name: 'DAILY_LIMIT_EXCEEDED', value: 35 },
  { name: 'TOKEN_NOT_ALLOWED', value: 22 },
  { name: 'CIRCUIT_BREAKER_TRIPPED', value: 18 },
  { name: 'RECIPIENT_NOT_WHITELISTED', value: 15 },
  { name: 'OUTSIDE_TRADING_HOURS', value: 10 },
];

export const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export const formatUSDC = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount).replace('$', '') + ' USDC';
