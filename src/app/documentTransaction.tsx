'use client'

import { PreparedTransaction, prepareContractCall } from "thirdweb";
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { approbalTxFields, initialapprobalTx, } from "../utils/requiredFields";
import { EditForm } from "../components/editableForm";
import styles from "./styles.module.css";
import { getDocumentContract, getMultisignContract } from "../utils/contracts";
import { Account } from "thirdweb/wallets";
import { getCurrentDate } from "../utils/dateManagement";
import { getPendingEvaluations } from "./contractInteract";

export default function DocumentTx({ contractTo, changeVisibilityEdit }:
    { contractTo: string, changeVisibilityEdit: Function }) {

    const wallet = useActiveAccount() as Account;
    const account = wallet.address;

    const documentContract = getDocumentContract(contractTo);

    //READ

    //SEND TRANSACTIONS
    const { mutate: sendTransaction, data: transactionResult, isPending } = useSendTransaction();

    const signConfirmation = async () => {
        console.log("Usted ha entrado a la seccion de aprobacion multifirma");
        //const multiSignAddress = await getPendingEvaluations(account, contractTo);
        //console.log("LA MULTISIGN ADDRRES ES:", multiSignAddress);

        const multiSignAddress = "0xF22b8608686CD39B85A5086f6C36E7e330cEC95d"; //Hardcode de prueba

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

            sendTransaction(txSign);
        };

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

        sendTransaction(tx);
        console.log("Transacción efectuada", tx);
        console.log("Resultado de la transacción", transactionResult);

        if (state == "Aprobado") {
            signConfirmation();
        };
        changeVisibilityEdit();
    };

    return (
        <>
            <div className={styles.loginCard}>
                <>
                    <h2>Añadir doc al proceso de Grado</h2>
                    <EditForm json={initialapprobalTx}
                        editableFields={approbalTxFields}
                        onSaveChanges={addTransaction} />
                    <button
                        onClick={() => changeVisibilityEdit()}>
                        Cerrar
                    </button>
                </>
            </div>
        </>
    );
}