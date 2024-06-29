'use client';

import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { PreparedTransaction, prepareContractCall } from "thirdweb";
import { useEffect, useState } from "react";
import { participantsFields, initialParticipants, myProcessesFields } from "@/utils/requiredFields";
import { getDocumentContract, mainContract } from "@/utils/contracts";
import { parseJsonString } from "@/utils/json";
import { getProcessPhasesByAddress, getWalletAddress } from "../../contractInteract";
import { useGetDocDataMyProcesses } from "../../getDocumentData";
import { ArrowDownFromLine, FilePlus } from "lucide-react";
import { useAuth } from "@/context/context";
import { EditForm } from "@/components/editableForm";
import { Button } from '@/utils/types';
import { RowData } from "@/utils/types";
import DocumentTx from "../../documentTransaction";
import FullScreenLoader from "@/components/FullScreenLoader";
import Table from '@/components/Table';

export default function Home() {
    const { isAuthenticated } = useAuth();

    const activeWallet = useActiveAccount();
    const wAddress = activeWallet ? activeWallet?.address as string : '';

    const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);

    const [processList, setProcessList] = useState<string[]>([""]);
    const [processIds, setProcessIds] = useState<string[]>([""]);

    const [selectedDocumentContract, setSelectedDocumentContract] = useState<string>("");

    const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
    const { data: myProcesses, loading, error } = useGetDocDataMyProcesses(wAddress, shouldUpdate);

    const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
    const [phases, setPhases] = useState<string[]>([]);
    const [loadingPhases, setLoadingPhases] = useState<boolean>(true);

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProcessId(event.target.value);
    };

    const [showAddProcess, setShowAddProcess] = useState(false);
    const changeVisibilityAddProcess = () => {
        setShowAddProcess(!showAddProcess);
    };

    const [showEditionMode, setShowEditionMode] = useState(false);
    const changeVisibilityEdit = () => {
        setShowEditionMode(!showEditionMode);
    };

    //READ BLOCKCHAIN
    const { data: processes } = useReadContract({
        contract: mainContract,
        method: "getAllProcesses",
        params: []
    });

    const { data: myCurrentProcesses } = useReadContract({
        contract: mainContract,
        method: "getCurrentProcesses",
        params: [wAddress]
    });

    useEffect(() => {
        console.log("Se ha registrado un cambio en los procesos (structures)");
        try {
            const processArray = processes as unknown as Array<Array<string>>;
            if (processArray) {
                setProcessIds(processArray[0]);
                setProcessList(processArray[1]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }, [processes]);

    //SEND TRANSACTIONS
    const { mutate: sendTransaction, data: transactionResult, isSuccess } = useSendTransaction();

    useEffect(() => {
        setShouldUpdate(!shouldUpdate);
    }, [myCurrentProcesses, isSuccess]);

    const addParticipant = (participant: string, name: string): void => {
        const documentContract = getDocumentContract(selectedDocumentContract);
        const transaction = prepareContractCall({
            contract: documentContract,
            method: "addParticipant",
            params: [participant, name, mainContract.address],
        });

        const tx = transaction as PreparedTransaction;
        sendTransaction(tx);
    };

    const setParticipants = async (json: Record<string, any>):
        Promise<[string[], string[], string[]]> => {

        const { students, director, codirector } = json;

        const studentsArray = students as string[];
        const studentsArrayToSend: string[] = [];
        const directorArrayToSend: string[] = [];
        const codirectorArrayToSend: string[] = [];

        studentsArray.map(async (student) => {
            const address = await getWalletAddress(student);
            studentsArrayToSend.push(address);
        });

        const addressDirector = await getWalletAddress(director);
        if (addressDirector && addressDirector != "") {
            directorArrayToSend.push(addressDirector);
        }

        const addressCodirector = await getWalletAddress(codirector);
        if (addressCodirector && addressCodirector != "") {
            codirectorArrayToSend.push(addressCodirector);
        }

        return [studentsArrayToSend, directorArrayToSend, codirectorArrayToSend]
    }

    const handleaddTx = async (process: string) => {
        setLoadingPhases(true);
        setSelectedDocumentContract(process);
        try {
            const processPhases = await getProcessPhasesByAddress(process);
            if (processPhases) setPhases(processPhases);
            console.log("las process phases son:", processPhases);
            phases.map((phase, index) => {
                console.log("phase", index, ":", phase);
            })
        } catch (error) {

        }
        finally {
            setLoadingPhases(false);
            changeVisibilityEdit();
        }
    };

    const createDocumentProcess = async (newJson: Record<string, any>) => {
        const [studentsArray, directorArray, codirectorArray] = await setParticipants(newJson);
        console.log(selectedProcessId, "Initialized", mainContract.address,
            studentsArray, directorArray, codirectorArray);

        const transaction = prepareContractCall({
            contract: mainContract,
            method: "createDocumentProcess",
            params: ["Initialized", selectedProcessId as string,
                studentsArray, directorArray, codirectorArray],
        });
        sendTransaction(transaction as PreparedTransaction);
        console.log(transactionResult);

        setShouldUpdate(!shouldUpdate);
        changeVisibilityAddProcess();
    };

    const buttons: Button<RowData>[] = [
        {
            icon: <FilePlus />,
            onClick: handleaddTx,
            hoverText: 'Añadir documento',
        },
        {
            icon: <ArrowDownFromLine />,
            onClick: () => { },
            hoverText: 'Expand',
        },
    ];

    const addButton: Button<RowData> =
    {
        icon: <FilePlus />,
        onClick: () => changeVisibilityAddProcess(),
        hoverText: 'Añadir un Proceso nuevo',
    };

    return isAuthenticated ? (
        <div className="w-full">
            {!showAddProcess && !showEditionMode &&
                <>
                    {loading && <p>Cargando procesos...</p>}
                    {error && <p>Error al obtener los procesos...</p>}
                    {!loading && !error && myProcesses &&
                        <div className="p-4">
                            <Table
                                title="Mis procesos Activos"
                                columns={myProcessesFields}
                                data={myProcesses}
                                buttons={buttons}
                                addButton={addButton} />
                        </div>
                    }
                </>
            }
            {showAddProcess && (
                <div className="p-4 bg-gray-100 rounded-lg mb-4">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        Añadir nuevo proceso de Grado
                    </h2>
                    <div className="bg-white p-6 rounded-b-lg mb-4 space-y-2">
                        <label>Programa</label>
                        <select
                            value={selectedProcessId || ''}
                            onChange={handleOptionChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        >
                            <option value="">Selecciona una opción</option>
                            {processIds.map((processId, index) => (
                                <option key={index} value={processId}>
                                    {`${processId} - ${parseJsonString(processList[index]).name}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <EditForm
                        json={initialParticipants}
                        editableFields={participantsFields}
                        onSaveChanges={createDocumentProcess}
                        onExit={changeVisibilityAddProcess}
                    />
                </div>
            )}

            {showEditionMode && !loadingPhases &&
                <div className="p-4 bg-gray-100 rounded-lg mb-4">
                    <DocumentTx contractTo={selectedDocumentContract}
                        changeVisibilityEdit={changeVisibilityEdit}
                        user="student"
                        selectedPhase={selectedPhase}
                        setPhases={setSelectedPhase}
                        phases={phases}
                        setIsSuccess={setShouldUpdate}
                    />
                </div>
            }
        </div>
    ) : (
        <FullScreenLoader />
    );
}