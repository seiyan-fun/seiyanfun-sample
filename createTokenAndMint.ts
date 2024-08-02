import axios from "axios";
import * as fs from "fs";
import FormData from "form-data";
import {
  createWalletClient,
  http,
  parseEther,
  encodeFunctionData,
  createPublicClient,
  getAddress,
} from "viem";
import { sei } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { BOND_CONTRACT_ABI } from "./abi";

async function uploadImage(imagePath: string) {
  const formData = new FormData();
  formData.append("image", fs.createReadStream(imagePath));

  try {
    const response = await axios.post(
      "https://seiyan.fun/api/public/v1/upload-image",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );
    console.log("Image uploaded successfully:", response.data);
    console.log(
      `Copy this ImageId: "${response.data.imageId}" for a createToken transaction.`
    );

    return response.data.imageId;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}

async function createTokenAndMint(
  creatorPrivateKey: `0x${string}`,
  name: string,
  symbol: string,
  imageId: string,
  description: string,
  seiAmount: bigint
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

  const tokenCreationFee = parseEther("0.99");
  const tx = {
    to: getAddress("0x613cb5B7A8ffD4304161f30fba46cE4284C25e21"),
    value: tokenCreationFee + seiAmount,
    data: encodeFunctionData({
      abi: BOND_CONTRACT_ABI,
      functionName: "createTokenAndMint",
      args: [
        {
          name,
          symbol,
        },
        imageId,
        description,
        account.address,
        account.address,
      ],
    }),
  };

  const txHash = await walletClient.sendTransaction({
    ...tx,
    type: "legacy",
    gas: 3_500_000n, // expected gas limit
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
  console.log(`TransactionHash: ${txHash}, Status: ${receipt.status}`);
}

const imageId = await uploadImage("./wif.jpeg");
await createTokenAndMint(
  "0xYOUR_PRIVATE_KEY",
  "dogwifhat",
  "WIF",
  imageId,
  "Popular meme Dogwifhat vibes wif frens onchain",
  parseEther("0.1")
);
