'use client';

import { useActiveAccount, useReadContract } from "thirdweb/react";
import { useEffect, useState } from "react";
import { mainContract } from "@/utils/contracts";
import { myProcessesFields } from "@/utils/requiredFields";
import { getProcessPhasesByAddress } from "../../contractInteract";
import { useGetDocDataEvaluations } from "../../getDocumentData";
import DocumentTx from "../../documentTransaction";
import { Button, RowData } from "@/utils/types";
import { Edit } from "lucide-react";
import Table from "@/components/Table";
import { useAuth } from "@/context/context";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Home() {
    const { isAuthenticated } = useAuth();

    const activeWallet = useActiveAccount();
    const wAddress = activeWallet ? activeWallet?.address as string : '';

    const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
    const [phases, setPhases] = useState<string[]>([]);

    const [processToEvaluate, setProcessToEvaluate] = useState<string>("");

    const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const { data: pendingEvaluationsList, loading, error }
        = useGetDocDataEvaluations(wAddress, shouldUpdate);

    const [showEditionMode, setShowEditionMode] = useState(false);
    const changeVisibilityEdit = () => {
        setShowEditionMode(!showEditionMode);
    };

    //READ
    const { data: pendingEvaluations, } = useReadContract({
        contract: mainContract,
        method: "getAllPendingEvaluations",
        params: [wAddress]
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

    const buttons: Button<RowData>[] = [
        {
            icon: <Edit />,
            onClick: handleEvaluate,
            hoverText: 'Evaluar documento',
        }]

    return isAuthenticated ? (
        <div className="w-full">
            {!showEditionMode && <>
                {loading && <p>Cargando procesos...</p>}
                {error && <p>Error al obtener los procesos...</p>}
                {!loading && !error && pendingEvaluationsList &&
                    <div className="p-4">
                        <Table
                            title="Lista de Evaluaciones Pendientes"
                            columns={myProcessesFields}
                            data={pendingEvaluationsList}
                            buttons={buttons} />
                    </div>
                }
            </>
            }

            {showEditionMode &&
                <div className="p-4 bg-gray-100 rounded-lg mb-4">
                    <DocumentTx contractTo={processToEvaluate}
                        changeVisibilityEdit={changeVisibilityEdit}
                        user="evaluator"
                        selectedPhase={selectedPhase}
                        setPhases={setSelectedPhase}
                        phases={phases}
                        setIsSuccess={setIsSuccess}
                    />
                </div>}
        </div >
    ) : (
        <FullScreenLoader />
    );
}