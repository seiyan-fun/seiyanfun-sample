export const BOND_CONTRACT_ABI = [
  {
    type: "function",
    name: "burn",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokensToBurn",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "minRefund",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createTokenAndMint",
    inputs: [
      {
        name: "tp",
        type: "tuple",
        internalType: "struct IBondV1.TokenParams",
        components: [
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "symbol",
            type: "string",
            internalType: "string",
          },
        ],
      },
      {
        name: "imageId",
        type: "string",
        internalType: "string",
      },
      {
        name: "description",
        type: "string",
        internalType: "string",
      },
      {
        name: "creator",
        type: "address",
        internalType: "address",
      },
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "tokenAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "amountOut",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getBurnAmountOut",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokensToBurn",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "refundAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "feeAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMintAmountOut",
    inputs: [
      {
        name: "mintToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
      {
        name: "amountIn",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "estimatedAmountOut",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "amountInLeft",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "effectedFee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
      {
        name: "minAmountOut",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "BurnEvent",
    inputs: [
      {
        name: "tokenAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenAmountIn",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "coinAmountOut",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "fee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "currentBondingCurveReserve",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "currentTotalSupply",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokenPriceAfterBurn",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "blockTimestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MintEvent",
    inputs: [
      {
        name: "tokenAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "coinAmountIn",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokenAmountOut",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "coinAmountOut",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "fee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "currentBondingCurveReserve",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "currentTotalSupply",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokenPriceAfterMint",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "blockTimestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenCreated",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "creator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "name",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "symbol",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "blockTimestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenListed",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "lpAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "coinAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokenAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "fee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenMetadataReceived",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "imageId",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "description",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
] as const;
