'use client';

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { initialProcess, processFields } from "../../utils/requiredFields";
import { EditForm } from "../../components/editableForm"
import { DataCard } from "../../components/dataVisualization"
import { Button } from "@/components/ui/button";

export default function TeamSettings(){
    const [jsonData, setJsonData] = useState<Record<string, any>>(initialProcess);
    // const [processList, setProcessList] = useState<string[]>([]);
    // const [processIds, setProcessIds] = useState<string[]>([]);
    const [showAddProcess, setShowAddProcess] = useState(false);
    const [showEditionMode, setShowEditionMode] = useState(false);
    
    const changeVisibilityAddProcess = () => {
        setShowAddProcess(!showAddProcess);
    };

    const changeVisibilityEdit = () => {
        setShowEditionMode(!showEditionMode);
    };

    // Función vacía para onSaveChanges
    const handleSaveChanges = (newJson: Record<string, any>): void => {
        console.log("Save changes:", newJson);
    };

    ////////////
    
    // //READ
    // //const processById = getProcessbyId("0001");

    // const { data: procesos } = useReadContract({
    //     contract: mainContract,
    //     method: "getAllProcesses",
    //     params: []
    // });

    // useEffect(() => {
    //     console.log("Se ha registrado un cambio en los procesos (structures)");
    //     try {
    //         const processArray = procesos as unknown as Array<Array<string>>;
    //         setProcessIds(processArray[0]);
    //         setProcessList(processArray[1]);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // }, [procesos]);

    // //SEND TRANSACTIONS
    // const { mutate: sendTransaction, data: transactionResult, isPending } = useSendTransaction();

    // const addProcess = (newJson: Record<string, any>): void => {
    //     const { code, ...JsonToSend } = newJson;
    //     const proceso = JSON.stringify(JsonToSend);
    //     console.log("Proceso", proceso);

    //     const transaction = prepareContractCall({
    //         contract: mainContract,
    //         method: "addProcess",
    //         params: [code, proceso],
    //     });
    //     sendTransaction(transaction as PreparedTransaction);
    //     changeVisibilityAddProcess();
    // };

    // const updateProcess = (newJson: Record<string, any>): void => {
    //     const { code, ...jsonToSend } = newJson;
    //     const proceso = JSON.stringify(jsonToSend);
    //     console.log("Proceso", proceso);

    //     const transaction = prepareContractCall({
    //         contract: mainContract,
    //         method: "updateProcess",
    //         params: [code, proceso],
    //     });
    //     sendTransaction(transaction as PreparedTransaction);
    // };

    // const handleUpdateProcess = (index: number): void => {
    //     setJsonData({ ...parseJsonString(processList[index]), code: processIds[index] });
    //     console.log("JSON DE CAMBIAR", jsonData);
    //     changeVisibilityEdit();
    // };

    // const deleteProcess = (id: string): void => {
    //     const transaction = prepareContractCall({
    //         contract: mainContract,
    //         method: "deleteProcess",
    //         params: [id],
    //     });
    //     sendTransaction(transaction as PreparedTransaction);
    //     console.log(transactionResult);
    // };

    // const handleDelete = (processToDelete: string) => {
    //     const confirmed = window.confirm('¿Está seguro que desea eliminar el proceso?');
    //     if (confirmed) {
    //         deleteProcess(processToDelete);
    //         console.log('Elemento eliminado');
    //     } else {
    //         console.log('Eliminación cancelada');
    //     }
    // }
    ////////////

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <Card className="p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-4">
                    
                    <h2 className="text-xl font-semibold">Lista de Procesos existentes</h2>
                </div>
                {!showAddProcess && !showEditionMode && (
                    <div className="text-center">
                        <Button variant="default" onClick={changeVisibilityAddProcess}>
                            Añadir un Proceso nuevo
                        </Button>
                        {/* Lista de procesos existentes */}
                        <div className="mt-4">
                            <DataCard
                                json={jsonData}
                                editableFields={processFields}
                            />
                            <div className="flex justify-between mt-4">
                                <Button variant="secondary" onClick={changeVisibilityEdit}>Editar</Button>
                                <Button variant="destructive">Eliminar</Button>
                            </div>
                        </div>
                    </div>
                )}
                {showAddProcess && (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">Añadir nuevo proceso de Grado</h2>
                        <EditForm
                            json={initialProcess}
                            editableFields={processFields}
                            onSaveChanges={handleSaveChanges} // Pasar la función vacía
                        />
                        <Button variant="secondary" className="mt-4" onClick={changeVisibilityAddProcess}>
                            Cerrar
                        </Button>
                    </div>
                )}
                {showEditionMode && (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">Editar proceso de Grado</h2>
                        <EditForm
                            json={jsonData}
                            editableFields={processFields}
                            onSaveChanges={handleSaveChanges} // Pasar la función vacía
                        />
                        <Button variant="secondary" className="mt-4" onClick={changeVisibilityEdit}>
                            Cerrar
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}