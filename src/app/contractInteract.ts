import { readContract } from "thirdweb";
import { mainContract, usersContract } from "../utils/contracts";
import { cyph } from "../utils/cypher";

export const getWalletAddress = async (email: string): Promise<string> => {
    const walletAddress = await readContract({
        contract: usersContract,
        method: "getUserByEmail",
        params: [cyph(email)],
    });
    return walletAddress;
};

export const getProcessbyId = async (id: string): Promise<string> => {
    const process = await readContract({
        contract: mainContract,
        method: "getProcess",
        params: [id],
    });
    return process;
};

export const getAllPendingProcesses = async (): Promise<string[]> => {
    const allPendingProcesses = await readContract({
        contract: mainContract,
        method: "getAllPendingProcesses",
        params: [],
    });
    return allPendingProcesses as string[];
};

export const getPendingEvaluations = async (account: string, contractTo: string): Promise<string> => {
    const pendingEvaluations = await readContract({
        contract: mainContract,
        method: "getPendingEvaluations",
        params: [account, contractTo],
    });
    return pendingEvaluations as string;
};
