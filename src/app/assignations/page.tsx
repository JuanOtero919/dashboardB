'use client'

import { PreparedTransaction, prepareContractCall } from "thirdweb";
import { useReadContract, useSendTransaction } from "thirdweb/react";
import {
    asignationFields, initialAsignation,
    initialProcess, processFields
} from "../../utils/requiredFields";
import { EditForm } from "../../components/editableForm";
import { DataCard } from "../../components/dataVisualization";
import { useEffect, useState } from "react";
import styles from "../styles.module.css"
import { mainContract } from "../../utils/contracts";
import { getAllPendingProcesses } from "../contractInteract";

export default function Home() {
    const [pendingProcesses, setPendingProcesses] = useState<string[]>([""]);

    useEffect(() => {
        const initializePendingProcesses = async (): Promise<void> => {
            try {
                const response = await getAllPendingProcesses();
                if ((response).length > 0) {
                    setPendingProcesses(response);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        initializePendingProcesses();
    }, []);

    const [jsonData, setJsonData] = useState<Record<string, any>>(initialProcess);

    const [showAddProcess, setShowAddProcess] = useState(false);

    const [showEditionMode, setShowEditionMode] = useState(false);
    const changeVisibilityEdit = () => {
        setShowEditionMode(!showEditionMode);
    };

    console.log(pendingProcesses);

    // //SEND TRANSACTIONS
    // const { mutate: sendTransaction, data: transactionResult, isPending } = useSendTransaction();

    // const createAsignationRequest = (newJson: Record<string, any>): void => {
    //     const { contractTo, owners, state } = newJson;
    //     console.log("JSON DE TX", newJson);
    //     const transaction = prepareContractCall({
    //         contract: mainContract,
    //         method: "createAsignationRequest",
    //         params: [contractTo, mainContract.address, owners, owners.length, state],
    //     });
    //     const tx = transaction as PreparedTransaction;

    //     sendTransaction(tx);
    // };

    // const handleAsignProcess = (contractTo: string): void => {
    //     setJsonData({ ...initialAsignation, contractTo });
    //     console.log("JSON DE CAMBIAR", jsonData);
    //     changeVisibilityEdit();
    // };

    // Función vacía para onSaveChanges
    const handleSaveChanges = (newJson: Record<string, any>): void => {
        console.log("Save changes:", newJson);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-4 text-center">Lista de Asignaciones pendientes</h2>
                {!showAddProcess && !showEditionMode && (
                    <>
                        {pendingProcesses.map((process, index) => (
                            <div key={index} className="p-4 bg-gray-100 rounded-lg mb-4">
                                <p className="text-gray-700 text-center">Direccion: {process}</p>
                                <div className="flex justify-center mt-2">
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                        //onClick={() => handleAsignProcess(process)}
                                    >
                                        Asignar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
    
                {showEditionMode && (
                    <div className="p-4 bg-gray-100 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-4 text-center">Asignar proceso de Grado</h2>
                        <EditForm
                            json={jsonData}
                            editableFields={asignationFields}
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
                    </div>
                )}
            </div>
        </div>
    );
    
}