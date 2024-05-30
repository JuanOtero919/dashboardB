'use client'

import { useActiveAccount } from "thirdweb/react";
import { useReadContract } from "thirdweb/react";
import { parseJsonString } from "../../utils/json";
import { asignationFields, initialAsignation, initialProcess, processFields } from "../../utils/requiredFields";
import { DataCard } from "../../components/dataVisualization";



import styles from "../styles.module.css";
import { mainContract } from "../../utils/contracts";
import { Account } from "thirdweb/wallets";
import DocumentTx from "../documentTransaction";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export default function Evaluation() {

    // const wallet = useActiveAccount() as Account;
    // const account = wallet.address;

    const [processToEvaluate, setProcessToEvaluate] = useState<string>("");
    const [pendingEvaluationsList, setPendingEvaluationsList] = useState<string[]>([""]);

    const [jsonData, setJsonData] = useState<Record<string, any>>(initialProcess);

    const [showEditionMode, setShowEditionMode] = useState(false);
    const changeVisibilityEdit = () => {
        setShowEditionMode(!showEditionMode);
    };

    // //READ
    // const { data: pendingEvaluations, } = useReadContract({
    //     contract: mainContract,
    //     method: "getAllPendingEvaluations",
    //     params: [account]
    // });

    // useEffect(() => {
    //     try {
    //         if (pendingEvaluations) {
    //             if ((pendingEvaluations as string[]).length > 0) {
    //                 setPendingEvaluationsList(pendingEvaluations as string[]);
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error obtaining processes:', error);
    //     }
    // }, [pendingEvaluations])


    // const handleEvaluate = (contractTo: string): void => {
    //     setProcessToEvaluate(contractTo);
    //     changeVisibilityEdit();
    // };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <Card className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4">Lista de Evaluaciones pendientes</h2>
                    {!showEditionMode && (
                        <>
                            {pendingEvaluationsList.map((process, index) => (
                                <div key={index} className="mb-4 w-full">
                                    <p className="font-medium text-gray-700">Evaluación: {process}</p>
                                    <p className="text-gray-600 mb-2">
                                        En esta parte deberíamos mostrar
                                        más datos que se agreguen al contrato con la data Card
                                    </p>
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                                        onClick={() => {
                                            // setProcessToEvaluate(process);
                                            // changeVisibilityEdit();
                                        }}
                                    >
                                        Evaluar
                                    </button>
                                </div>
                            ))}
                        </>
                    )}
                    {showEditionMode && (
                        <div className="w-full">
                            <h2 className="text-xl font-semibold mb-4">Evaluar proceso de Grado</h2>
                            <DocumentTx
                                contractTo={processToEvaluate}
                                changeVisibilityEdit={changeVisibilityEdit}
                            />
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}