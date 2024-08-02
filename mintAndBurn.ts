import axios from "axios";
import {
  createPublicClient,
  createWalletClient,
  encodeFunctionData,
  getAddress,
  http,
  parseAbi,
  parseEther,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sei } from "viem/chains";
import { BOND_CONTRACT_ABI } from "./abi";

type SortType = "order-by-bump" | "order-by-created" | "order-by-marketcap";
const BOND_CONTRACT_ADDRESS = getAddress(
  "0x613cb5B7A8ffD4304161f30fba46cE4284C25e21"
);

async function getTokens(sortType: SortType) {
  const baseUrl = "https://seiyan.fun/api/public/v1/tokens/";
  const url = baseUrl + sortType;

  try {
    const response = await axios.get<string[]>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
}

async function mint(
  creatorPrivateKey: `0x${string}`,
  tokenContractAddress: `0x${string}`,
  seiAmount: bigint,
  slippage: bigint
) {
  const account = privateKeyToAccount(creatorPrivateKey);
  const publicClient = createPublicClient({
    chain: sei,
    transport: http(),
  });
  const walletClient = createWalletClient({
    account,
    chain: sei,
    transport: http(),
  });

  const [estimatedAmountOut] = await publicClient.readContract({
    address: BOND_CONTRACT_ADDRESS,
    abi: BOND_CONTRACT_ABI,
    functionName: "getMintAmountOut",
    args: [tokenContractAddress, account.address, seiAmount],
  });
  const minimumTokenAmount = (estimatedAmountOut * (100n - slippage)) / 100n;

  const tx = {
    to: BOND_CONTRACT_ADDRESS,
    value: seiAmount,
    data: encodeFunctionData({
      abi: BOND_CONTRACT_ABI,
      functionName: "mint",
      args: [tokenContractAddress, minimumTokenAmount, account.address],
    }),
  };

  const txHash = await walletClient.sendTransaction({
    ...tx,
    type: "legacy",
    gas: 5_000_000n, // expected gas limit
    gasPrice: parseEther("1", "gwei"),
    nonce: await publicClient.getTransactionCount({
      address: account.address,
    }),
    account,
  });
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
    timeout: 30000,
  });
  console.log(`Mint transactionHash: ${txHash}, Status: ${receipt.status}`);
}

async function getERC20Balance(
  tokenAddress: `0x${string}`,
  accountAddress: `0x${string}`
) {
  const publicClient = createPublicClient({
    chain: sei,
    transport: http(),
  });

  const balance = await publicClient.readContract({
    address: tokenAddress,
    abi: parseAbi([
      "function balanceOf(address account) view returns (uint256)",
    ]),
    functionName: "balanceOf",
    args: [accountAddress],
  });

  return balance;
}

async function burn(
  creatorPrivateKey: `0x${string}`,
  tokenContractAddress: `0x${string}`,
  tokenAmount: bigint,
  slippage: bigint
) {
  const account = privateKeyToAccount(creatorPrivateKey);
  const publicClient = createPublicClient({
    chain: sei,
    transport: http(),
  });
  const walletClient = createWalletClient({
    account,
    chain: sei,
    transport: http(),
  });

  const [estimatedAmountOut] = await publicClient.readContract({
    address: BOND_CONTRACT_ADDRESS,
    abi: BOND_CONTRACT_ABI,
    functionName: "getBurnAmountOut",
    args: [tokenContractAddress, account.address, tokenAmount],
  });
  const minimumSeiAmount = (estimatedAmountOut * (100n - slippage)) / 100n;

  const tx = {
    to: BOND_CONTRACT_ADDRESS,
    value: 0n,
    data: encodeFunctionData({
      abi: BOND_CONTRACT_ABI,
      functionName: "burn",
      args: [
        tokenContractAddress,
        tokenAmount,
        minimumSeiAmount,
        account.address,
      ],
    }),
  };

  const txHash = await walletClient.sendTransaction({
    ...tx,
    type: "legacy",
    gas: 5_000_000n, // expected gas limit
    gasPrice: parseEther("1", "gwei"),
    nonce: await publicClient.getTransactionCount({
      address: account.address,
    }),
    account,
  });
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
    timeout: 30000,
  });
  console.log(`Burn transactionHash: ${txHash}, Status: ${receipt.status}`);
}

const tokens = await getTokens("order-by-created");
const token = tokens[0];
console.log("Token Address: ", token);

await mint("0xYOUR_PRIVATE_KEY", getAddress(token), parseEther("0.1"), 1n);

const account = privateKeyToAccount("0xYOUR_PRIVATE_KEY");
const balance = await getERC20Balance(getAddress(token), account.address);
await burn("0xYOUR_PRIVATE_KEY", getAddress(token), balance, 1n);
