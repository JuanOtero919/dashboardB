'use client'

import { useActiveAccount } from "thirdweb/react";
import { useReadContract } from "thirdweb/react";
import { myProcessesFields } from "../../../utils/requiredFields";
import { DataCard } from "../../../components/dataVisualization";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { mainContract } from "../../../utils/contracts";
import { Account } from "thirdweb/wallets";
import DocumentTx from "../../documentTransaction";
import { getProcessPhasesByAddress } from "../../contractInteract";
import { useGetDocDataEvaluations } from "../../getDocumentData";

export default function Home() {
    const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
    const [phases, setPhases] = useState<string[]>([]);

    const wallet = useActiveAccount() as Account;
    const account = wallet.address;

    const [processToEvaluate, setProcessToEvaluate] = useState<string>("");

    const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const { data: pendingEvaluationsList, loading, error }
        = useGetDocDataEvaluations(account, shouldUpdate);

    const [showEditionMode, setShowEditionMode] = useState(false);
    const changeVisibilityEdit = () => {
        setShowEditionMode(!showEditionMode);
    };

    //READ
    const { data: pendingEvaluations, } = useReadContract({
        contract: mainContract,
        method: "getAllPendingEvaluations",
        params: [account]
    });

    useEffect(() => {
        setShouldUpdate(!shouldUpdate);
    }, [pendingEvaluations, isSuccess]);

    const handleEvaluate = async (contractTo: string) => {
        setProcessToEvaluate(contractTo);
        const processPhases = await getProcessPhasesByAddress(contractTo);
        setPhases(processPhases);
        console.log("las process phases son:", processPhases);
        changeVisibilityEdit();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <Card className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex flex-col items-center">
                    {!showEditionMode && <>
                        <h2 className="text-xl font-semibold mb-4">Lista de Evaluaciones pendientes</h2>
                        {loading && <p>Cargando procesos...</p>}
                        {error && <p>Error al obtener los procesos...</p>}
                        {!loading && !error && pendingEvaluationsList
                            && <div>
                                {pendingEvaluationsList.map((process, index) => (
                                    <div key={index} className="mb-4 w-full">
                                        <DataCard
                                            json={process}
                                            editableFields={myProcessesFields} />
                                        <button
                                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                                            onClick={() => handleEvaluate(process.address)}>
                                            Evaluar
                                        </button>
                                    </ div>
                                ))
                                }
                            </div>
                        }
                    </>
                    }

                    {showEditionMode &&
                        <div className="w-full">
                            <h2 className="text-xl font-semibold mb-4">Evaluar proceso de Grado</h2>
                            <DocumentTx contractTo={processToEvaluate}
                                changeVisibilityEdit={changeVisibilityEdit}
                                user="evaluator"
                                selectedPhase={selectedPhase}
                                setPhases={setSelectedPhase}
                                phases={phases}
                                setIsSuccess={setIsSuccess}
                            />
                        </div>}
                </div>
            </Card>
        </div>
    );
}