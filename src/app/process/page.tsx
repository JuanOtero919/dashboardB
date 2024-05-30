'use client'

import { PreparedTransaction, prepareContractCall, } from "thirdweb";
import { useActiveWallet, useReadContract, useSendTransaction } from "thirdweb/react";
import {
    approbalTxFields, initialapprobalTx,
    participantsFields, initialParticipants
} from "../../utils/requiredFields";
import { parseJsonString } from "../../utils/json";
import { EditForm } from "../../components/editableForm";
import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { getDocumentContract, mainContract } from "../../utils/contracts";
import { Wallet } from "thirdweb/wallets";
import { DataCard } from "../../components/dataVisualization";
import { getWalletAddress } from "../contractInteract";
//import { EventsHistory } from "../eventsHistory";
import { getCurrentDate } from "../../utils/dateManagement";
import { Card } from "@/components/ui/card";

export default function Process() {

    // const activeWallet = useActiveWallet() as Wallet;
    // const wAddress = activeWallet.getAccount()?.address as string;

    const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);

    const [processList, setProcessList] = useState<string[]>([""]);
    const [processIds, setProcessIds] = useState<string[]>([""]);

    const [myProcesses, setMyProcesses] = useState<string[]>([""]);

    const [selectedDocumentContract, setSelectedDocumentContract] = useState<string>("");

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

    // //READ
    // const { data: processes } = useReadContract({
    //     contract: mainContract,
    //     method: "getAllProcesses",
    //     params: []
    // });


    // const { data: myCurrentProcesses } = useReadContract({
    //     contract: mainContract,
    //     method: "getCurrentProcesses",
    //     params: [wAddress]
    // });

    // useEffect(() => {
    //     console.log("Se ha registrado un cambio en los procesos (structures)");
    //     try {
    //         const processArray = processes as unknown as Array<Array<string>>;
    //         if (processArray) {
    //             setProcessIds(processArray[0]);
    //             setProcessList(processArray[1]);
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // }, [processes]);


    // useEffect(() => {
    //     console.log("Se ha registrado un cambio en mis procesos");
    //     try {
    //         const myProcessesArray = myCurrentProcesses as unknown as string[];
    //         if (myProcessesArray) {
    //             setMyProcesses(myProcessesArray);
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // }, [myCurrentProcesses]);

    // //SEND TRANSACTIONS
    // const { mutate: sendTransaction, data: transactionResult, isPending } = useSendTransaction();



    // const addParticipant = (participant: string, name: string): void => {
    //     const documentContract = getDocumentContract(selectedDocumentContract);
    //     const transaction = prepareContractCall({
    //         contract: documentContract,
    //         method: "addParticipant",
    //         params: [participant, name, mainContract.address],
    //     });

    //     const tx = transaction as PreparedTransaction;
    //     sendTransaction(tx);
    //     // changeVisibilityEdit();
    // };

    // const setParticipants = async (newJson: Record<string, any>) => {
    //     const { students, director, codirector } = newJson;

    //     const studentsArray = students as string[];
    //     studentsArray.map(async (student, index) => {
    //         const address = await getWalletAddress(student);
    //         addParticipant(address, "student");
    //     });


    //     const addressDirector = await getWalletAddress(director);
    //     if (addressDirector && addressDirector != "") {
    //         addParticipant(addressDirector, "director");
    //     }

    //     const addressCodirector = await getWalletAddress(codirector);
    //     if (addressCodirector && addressCodirector != "") {
    //         addParticipant(addressCodirector, "codirector")
    //     }
    // }

    // const addTransaction = (newJson: Record<string, any>): void => {
    //     const documentContract = getDocumentContract(selectedDocumentContract);
    //     const { phase, state, associatedLink } = newJson;
    //     const date = getCurrentDate();
    //     const transaction = prepareContractCall({
    //         contract: documentContract,
    //         method: "addTransaction",
    //         params: [phase, state, associatedLink, date],
    //     });

    //     const tx = transaction as PreparedTransaction;

    //     sendTransaction(tx);
    //     console.log("Transacción efectuada", tx);
    //     console.log("Resultado de la transacción", transactionResult);
    //     changeVisibilityEdit();
    // };


    // const handleaddTx = (process: string): void => {
    //     setSelectedDocumentContract(process);
    //     changeVisibilityEdit();
    // };

    // const createDocumentProcess = (processId: string): void => {
    //     const transaction = prepareContractCall({
    //         contract: mainContract,
    //         method: "createDocumentProcess",
    //         params: [processId],
    //     });
    //     sendTransaction(transaction as PreparedTransaction);
    //     console.log(transactionResult);
    // };

    // Función vacía para onSaveChanges
    const handleSaveChanges = (newJson: Record<string, any>): void => {
        console.log("Save changes:", newJson);
    };

    return (
        <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4 text-center">Mis Procesos Activos</h2>
            {!showAddProcess && !showEditionMode && (
                <>
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={changeVisibilityAddProcess}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Añadir un Proceso nuevo
                        </button>
                    </div>
                    {myProcesses.map((process, index) => (
                        <div key={index} className="p-4 bg-gray-100 rounded-lg mb-4">
                            <p className="text-gray-700 text-center">{process}</p>
                            <div className="flex justify-center mt-2">
                                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                                    Añadir documento
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}

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
                            onSaveChanges={handleSaveChanges}
                        />
                        <div className="flex justify-center mt-4 space-x-2">
                            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                                Crear el Proceso de: string
                            </button>
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
                {showEditionMode && (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Añadir doc al proceso de Grado</h2>
                        <EditForm
                            json={initialapprobalTx}
                            editableFields={approbalTxFields}
                            onSaveChanges={handleSaveChanges}
                        />
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={changeVisibilityEdit}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                            >
                                Cerrar
                            </button>
                        </div>
                    </>
                )}
            </div>
            {/* <EventsHistory contractTo={selectedDocumentContract} /> */}
        </div>
    </div>
</>

    );
}