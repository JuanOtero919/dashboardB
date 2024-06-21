'use client';

import { PreparedTransaction, prepareContractCall } from "thirdweb";
import { useActiveAccount, useSendTransaction, useSendBatchTransaction } from "thirdweb/react";
import { useEffect, useState } from "react";
import { approbalTxFields, initialapprobalTx, } from "@/utils/requiredFields";
import { EditForm } from "@/components/editableForm";
import { getDocumentContract, getMultisignContract, mainContract } from "@/utils/contracts";
import { getCurrentDate } from "../utils/dateManagement";
import { getPendingEvaluations } from "./contractInteract";
import { DocumentTxProps } from "@/utils/types";

export default function DocumentTx({ user, contractTo, changeVisibilityEdit,
    phases, setPhases, setIsSuccess }: DocumentTxProps) {

    const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPhase(event.target.value);
        console.log(selectedPhase);
    };

    const activeWallet = useActiveAccount();// as Account;
    const wAddress = activeWallet ? activeWallet?.address as string : '';

    const documentContract = getDocumentContract(contractTo);

    //SEND TRANSACTIONS
    const { mutate: sendTransaction, data: transactionResult, isSuccess } = useSendTransaction();
    const { mutate: sendBatchTransaction, } = useSendBatchTransaction();

    useEffect(() => { setIsSuccess(isSuccess); }, [isSuccess]);

    const signConfirmation = async (tx1: PreparedTransaction) => {
        console.log("Sección de aprobación multifirma");
        const multiSignAddress = await getPendingEvaluations(wAddress, contractTo);
        console.log("LA MULTISIGN ADDRRES ES:", multiSignAddress);

        if (multiSignAddress.length > 10) {
            console.log("La direccion se ha validado y se procede a firmar la aprobacion");
            const multiSignContract = getMultisignContract(multiSignAddress);
            const transactionSign = prepareContractCall({
                contract: multiSignContract,
                method: "confirmTransaction",
                params: [],
            });

            const txSign = transactionSign as PreparedTransaction;
            console.log("msigncontract.....", multiSignContract);
            console.log("txsign.....", txSign);

            sendBatchTransaction([tx1, txSign]);
        };
    }

    const requestAssignation = async (tx1: PreparedTransaction) => {
        console.log("Usted ha entrado a la seccion de requestEvaluation");

        const transaction = prepareContractCall({
            contract: mainContract,
            method: "addProcessToAsign",
            params: [contractTo],
        });

        const tx = transaction as PreparedTransaction;
        sendBatchTransaction([tx1, tx]);
    }

    const addTransaction = async (newJson: Record<string, any>) => {
        const { state, associatedLink } = newJson;
        console.log(selectedPhase);
        const phase = selectedPhase as string;
        const date = getCurrentDate();
        const transaction = prepareContractCall({
            contract: documentContract,
            method: "addTransaction",
            params: [phase, state, associatedLink, date],
        });

        const tx = transaction as PreparedTransaction;
        console.log("Transacción efectuada", tx);

        if (user == "student") {
            console.log("entro a user student");
            if (state == "Aprobado") {
                requestAssignation(tx);
            };
        } else {
            if (user == "evaluator" && state == "Aprobado") {
                console.log("entro a user evaluator + aprobado");
                signConfirmation(tx);
            } else {
                sendTransaction(tx);
            }
        }
        changeVisibilityEdit();
    };

    return (

        <div className="p-4 bg-gray-100 rounded-lg mb-4">
            {user == "student" && <h2 className="text-xl font-semibold mb-4 text-center">
                Añadir documento al proceso de Grado
            </h2>}
            {user == "evaluator" && <h2 className="text-xl font-semibold mb-4 text-center">
                Evaluar proceso de Grado
            </h2>}
            <div className="bg-white px-6 pt-6 rounded-t-lg shadow-md flex flex-col space-y-2" >
                <label className="block text-gray-700 font-medium">
                    Fase:
                    <select value={selectedPhase || ''} onChange={handleOptionChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Selecciona una opción</option>
                        {phases.map((phase, index) => (
                            <option key={index} value={phase}>{phase}</option>
                        ))}
                    </select>
                </label>
            </div>

            <EditForm json={initialapprobalTx}
                editableFields={approbalTxFields}
                onSaveChanges={addTransaction}
                onExit={() => changeVisibilityEdit()} />
        </div>
    );
}