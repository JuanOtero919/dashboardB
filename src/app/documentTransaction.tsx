'use client'

import { PreparedTransaction, prepareContractCall, sendTransaction as send } from "thirdweb";
import { useActiveAccount, useSendTransaction, useSendBatchTransaction } from "thirdweb/react";
import { approbalTxFields, initialapprobalTx, } from "../utils/requiredFields";
import { EditForm } from "../components/editableForm";
import styles from "../app/styles.module.css";
import { getDocumentContract, getMultisignContract, mainContract } from "../utils/contracts";
import { Account } from "thirdweb/wallets";
import { getCurrentDate } from "../utils/dateManagement";
import { useEffect, useState } from "react";
import { getPendingEvaluations } from "./contractInteract";

export default function DocumentTx({ user, contractTo, changeVisibilityEdit,
    selectedPhase, phases, setPhases, setIsSuccess }:
    {
        user: string, contractTo: string, changeVisibilityEdit: Function,
        selectedPhase: string | null, phases: string[], setPhases: Function, setIsSuccess: Function
    }) {

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPhases(event.target.value);
    };

    const wallet = useActiveAccount() as Account;
    const account = wallet.address;

    const documentContract = getDocumentContract(contractTo);

    //READ
    const cuenta = useActiveAccount() as Account;

    //SEND TRANSACTIONS
    const { mutate: sendTransaction, data: transactionResult, isSuccess } = useSendTransaction();
    const { mutate: sendBatchTransaction, } = useSendBatchTransaction();

    useEffect(() => {
        setIsSuccess(isSuccess);
    }, [isSuccess]);

    const signConfirmation = async (tx1: PreparedTransaction) => {
        console.log("Usted ha entrado a la seccion de aprobacion multifirma");
        const multiSignAddress = await getPendingEvaluations(account, contractTo);
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
        const { phase, state, associatedLink } = newJson;
        const date = getCurrentDate();
        const transaction = prepareContractCall({
            contract: documentContract,
            method: "addTransaction",
            params: [phase, state, associatedLink, date],
        });

        const tx = transaction as PreparedTransaction;
        //const result = await send({ account: cuenta, transaction: tx });

        console.log("Transacción efectuada", tx);
        //console.log("Resultado de la transacción", result);

        if (user == "student") {
            console.log("entro a user student");
            if (state == "Aprobado") {
                requestAssignation(tx);
            };
        };

        if (user == "evaluator" && state == "Aprobado") {
            console.log("entro a user evaluator + aprobado");
            signConfirmation(tx);
        };
        changeVisibilityEdit();
    };

    return (
        <>
            <h2>Añadir doc al proceso de Grado</h2>
            <label> Fase:
                <select value={selectedPhase || ''} onChange={handleOptionChange}>
                    <option value="">Selecciona una opción</option>
                    {phases.map((phase, index) => (
                        <option key={index} value={phase}>{phase}</option>
                    ))}
                </select>
            </label>

            <EditForm json={initialapprobalTx}
                editableFields={approbalTxFields}
                onSaveChanges={addTransaction} />
            <button
                onClick={() => changeVisibilityEdit()}>
                Cerrar
            </button>
        </>
    );
}