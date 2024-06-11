'use client';

import { PreparedTransaction, prepareContractCall } from "thirdweb";
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { useEffect, useState } from "react";
import { Account } from "thirdweb/wallets";
import { participantsFields, initialParticipants, myProcessesFields } from "@/utils/requiredFields";
import { getDocumentContract, mainContract } from "@/utils/contracts";
import { parseJsonString } from "@/utils/json";
import { getProcessPhasesByAddress, getWalletAddress } from "../../contractInteract";
import DocumentTx from "../../documentTransaction";
import { EditForm } from "@/components/editableForm";
import { DataCard } from "@/components/dataVisualization";
import { useGetDocDataMyProcesses } from "../../getDocumentData";
import { EventsHistory } from "@/app/eventsHistory";
import { useAuth } from "@/context/context";

export default function Home() {

    const { isAuthenticated } = useAuth();

    const activeWallet = useActiveAccount() as Account;
    const wAddress = activeWallet?.address as string;

    const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);

    const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
    const [phases, setPhases] = useState<string[]>([]);

    const [processList, setProcessList] = useState<string[]>([""]);
    const [processIds, setProcessIds] = useState<string[]>([""]);

    const [selectedDocumentContract, setSelectedDocumentContract] = useState<string>("");
    const [selectedDocumentContractEvents, setSelectedDocumentContractEvents] = useState<string>("");

    const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
    const { data: myProcesses, loading, error } = useGetDocDataMyProcesses(wAddress, shouldUpdate);

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

    //READ
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
    const { mutate: sendTransaction, data: transactionResult, isPending, isSuccess } = useSendTransaction();

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

    const setParticipants = async (newJson: Record<string, any>):
        Promise<[string[], string[], string[]]> => {

        const { students, director, codirector } = newJson;

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
                mainContract.address, studentsArray, directorArray, codirectorArray],
        });
        sendTransaction(transaction as PreparedTransaction);
        console.log(transactionResult);

        setShouldUpdate(!shouldUpdate);
        changeVisibilityAddProcess();
    };

    const handleShowEvents = async (process: string) => {
        if (selectedDocumentContractEvents == process) {
            setSelectedDocumentContractEvents("null");
        }
        else {
            setSelectedDocumentContractEvents(process);
        }
    };


    return isAuthenticated ? (
        // <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">Mis Procesos Activos</h2>
            {!showAddProcess && !showEditionMode &&
                <>
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={changeVisibilityAddProcess}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Añadir un Proceso nuevo
                        </button>
                    </div>
                    {loading && <p>Cargando procesos...</p>}
                    {error && <p>Error al obtener los procesos...</p>}
                    {!loading && !error && myProcesses &&
                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4
                            w-full max-w-screen-lg grid-flow-row auto-rows-max">
                            {myProcesses.map((process, index) => (
                                <div key={index} className="p-4 bg-gray-100 rounded-lg mb-4">
                                    <DataCard
                                        json={process}
                                        editableFields={myProcessesFields} />
                                    <div className="flex justify-center mt-2">
                                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                            onClick={() => handleaddTx(process.address)}>
                                            Añadir documento
                                        </button>
                                    </div>
                                    <EventsHistory contractTo={process.address} />

                                    {/* {process.address != selectedDocumentContractEvents &&
                                        <button onClick={() => handleShowEvents(process.address)}>
                                            Mostrar historial</button>}
                                    {process.address == selectedDocumentContractEvents &&
                                        <div>
                                            <button onClick={() => handleShowEvents(process.address)}>
                                                Ocultar historial</button>
                                            <EventsHistory contractTo={process.address} />
                                        </div>
                                    } */}
                                </ div>
                            ))
                            }
                        </ div>
                    }
                </>
            }

            <div className="p-4 bg-gray-100 rounded-lg mb-4">
                {showAddProcess && (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Añadir nuevo proceso de Grado</h2>
                        <div className="mb-4">
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
                            {selectedProcessId && (
                                <p className="mt-2">Has seleccionado: {selectedProcessId}</p>
                            )}
                        </div>
                        <EditForm
                            json={initialParticipants}
                            editableFields={participantsFields}
                            onSaveChanges={createDocumentProcess}
                        />
                        <div className="flex justify-center mt-4 space-x-2">
                            <button
                                onClick={changeVisibilityAddProcess}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                            >
                                Cerrar
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="p-4 bg-gray-100 rounded-lg mb-4">
                {showEditionMode && !loadingPhases &&
                    <DocumentTx contractTo={selectedDocumentContract}
                        changeVisibilityEdit={changeVisibilityEdit}
                        user="student"
                        selectedPhase={selectedPhase}
                        setPhases={setSelectedPhase}
                        phases={phases}
                        setIsSuccess={setShouldUpdate}
                    />
                }
            </div>
        </div>
        // </div>
    ) : (
        <p>No esta logueado</p>
    );
}