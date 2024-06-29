import { readContract } from "thirdweb";
import { getDocumentContract, mainContract, usersContract } from "../utils/contracts";
import { cyph } from "../utils/cypher";
import { parseJsonString } from "../utils/json";

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

export const getAllProcessesToAssign = async (): Promise<string[]> => {
    const allPendingProcesses = await readContract({
        contract: mainContract,
        method: "getAllProcessesToAssign",
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

export const getAllPendingEvaluations = async (account: string): Promise<string[]> => {
    const pendingEvaluations = await readContract({
        contract: mainContract,
        method: "getAllPendingEvaluations",
        params: [account],
    });
    return pendingEvaluations as string[];
};

export const getCurrentProcesses = async (wAddress: string): Promise<string[]> => {
    const currentProcesses = await readContract({
        contract: mainContract,
        method: "getCurrentProcesses",
        params: [wAddress],
    });
    return currentProcesses as string[];
};

export const getContractState = async (contractTo: string): Promise<string> => {
    const processContract = getDocumentContract(contractTo);
    const contractState = await readContract({
        contract: processContract,
        method: "getContractState",
        params: [],
    });
    return contractState;
};

export const getContractProcessId = async (contractTo: string): Promise<string> => {
    const processContract = getDocumentContract(contractTo);
    const contractProcessId = await readContract({
        contract: processContract,
        method: "getContractProcessId",
        params: [],
    });
    return contractProcessId;
};

export const getProcessPhasesByAddress = async (contractTo: string): Promise<string[]> => {
    const processId = await getContractProcessId(contractTo);
    const process = await getProcessbyId(processId);
    const processPhasesJson = parseJsonString(process);
    return processPhasesJson.phases;
};