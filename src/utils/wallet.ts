import { ACCOUNT_FACTORY_ADDRESS, USERS_DIRECTORY_ADDRESS, CHAIN, client } from "./constants";
import { prepareContractCall, resolveMethod, sendTransaction } from "thirdweb";
import { Account, inAppWallet, smartWallet } from "thirdweb/wallets";
import { isContractDeployed } from "thirdweb/utils";
import { getContract } from "thirdweb/contract";
import { cyph } from "./cypher";

export const connectInAppWallet = async (personalAccount: Account, setWallet: Function) => {
    try {
        const wallet = smartWallet({
            factoryAddress: ACCOUNT_FACTORY_ADDRESS,
            chain: CHAIN,
            gasless: true,
        });

        console.log("Smart Wallet", wallet);

        const account = await wallet.connect({
            client,
            personalAccount,
        });
        setWallet(wallet);
        return account;
    } catch (error) {
        console.error(error);
    }
}

export const createSmartWallet = async (setWallet: Function) => {
    try {
        const personalWallet = inAppWallet();
        const personalAccount = await personalWallet.connect({
            client,
            chain: CHAIN,
            strategy: "google",
        });

        console.log("Personal Embedded Wallet Account", personalAccount);

        return [await connectInAppWallet(personalAccount, setWallet), personalAccount];
    } catch (error) {
        console.error(error);
        return [undefined, undefined];
    }
}

export const connectSmartWallet = async (
    account: Account,
    email: string,
    statusCallback: (status: string) => void
) => {
    console.log("Account for wallet connected", account);
    console.log(account.address);

    const contract = getContract({
        client,
        chain: CHAIN,
        address: account.address
    });

    console.log("Contract for Smart Wallet", contract);

    const isDeployed = await isContractDeployed(contract);

    if (!isDeployed) {
        statusCallback("New account detected...");
        const UsersContract = getContract({
            client,
            chain: CHAIN,
            address: USERS_DIRECTORY_ADDRESS
        });

        const transaction = prepareContractCall({
            contract: UsersContract,
            method: resolveMethod("addUser"),
            params: [account.address, cyph(email)],
        });

        statusCallback("Creating new account...");

        statusCallback("Sending starter registry initial funds...");
        const transactionResult = await sendTransaction({ account, transaction });

        console.log(UsersContract);
        console.log(transaction);
        console.log(transactionResult);

    } else {
        statusCallback("Account registered! Loading Process...");
    }
    return account;
}