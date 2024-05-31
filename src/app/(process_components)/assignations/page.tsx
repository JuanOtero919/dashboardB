'use client'

import { PreparedTransaction, prepareContractCall, sendTransaction as send } from "thirdweb";
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import {
    asignationFields, assignationFieldsHard, initialAsignation,
    initialProcess, myProcessesFields,
} from "../../../utils/requiredFields";
import { EditForm } from "../../../components/editableForm";
import { DataCard } from "../../../components/dataVisualization";
import { useEffect, useState } from "react";
import { mainContract } from "../../../utils/contracts";
import { getWalletAddress } from "../../contractInteract";
import { useGetDocDataAsignations } from "../../getDocumentData";
import { Account } from "thirdweb/wallets";

export default function Home() {
    const account = useActiveAccount() as Account;

    const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
    const { data: pendingProcesses, loading, error } = useGetDocDataAsignations(shouldUpdate);

    const [jsonData, setJsonData] = useState<Record<string, any>>(initialProcess);

    const [showEditionMode, setShowEditionMode] = useState(false);
    const changeVisibilityEdit = () => {
        setShowEditionMode(!showEditionMode);
        setJsonData(initialAsignation);
    };

    //READ
    const { data: pendingAsignations, } = useReadContract({
        contract: mainContract,
        method: "getAllPendingProcesses",
        params: []
    });
    //SEND TRANSACTIONS
    const { mutate: sendTransaction, isSuccess } = useSendTransaction();

    useEffect(() => {
        setShouldUpdate(!shouldUpdate);
    }, [pendingAsignations, isSuccess]);

    const createAsignationRequest = async (newJson: Record<string, any>) => {
        const { owners } = newJson;
        const { contractTo, state } = jsonData;
        const signers = owners as string[];


        const signersArrayToSend = await Promise.all(
            signers.map(async (signer) => {
                const address = await getWalletAddress(signer);
                return address;//signersArrayToSend.push(address);
            }));
        console.log("Owners resueltos", signersArrayToSend);

        console.log("Parametros para la asignacion: ", contractTo,
            mainContract.address, signersArrayToSend, owners.length, state)

        const transaction = prepareContractCall({
            contract: mainContract,
            method: "createAsignationRequest",
            params: [contractTo, mainContract.address, signersArrayToSend, owners.length, state],
        });

        const tx = transaction as PreparedTransaction;
        console.log("TX DE ASSIGN", tx);
        //const result = await send({ account, transaction: tx });
        //console.log(result);
        sendTransaction(tx);
    };

    const handleAsignProcess = (contractTo: string, state: string): void => {
        setJsonData({ ...initialAsignation, contractTo, state });
        console.log("JSON DE CAMBIAR", jsonData);
        //changeVisibilityEdit();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-4 text-center">Lista de Asignaciones pendientes</h2>
                {loading && <p>Cargando procesos...</p>}
                {error && <p>Error al obtener los procesos...</p>}
                {!loading && !error && pendingProcesses
                    && <div>
                        {pendingProcesses.map((process, index) => (
                            <div key={index} className="p-4 bg-gray-100 rounded-lg mb-4">
                                <DataCard
                                    json={process}
                                    editableFields={myProcessesFields} />
                                {jsonData.contractTo != process.address &&
                                    <div className="flex justify-center mt-2">
                                        <button
                                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                            onClick={() => handleAsignProcess(process.address, process.state)}>
                                            Asignar
                                        </button>
                                    </div>
                                }
                                {jsonData.contractTo == process.address &&
                                    <div className="p-4 bg-gray-100 rounded-lg mb-4">
                                        <h4 className="text-xl font-semibold mb-4 text-center">Asignar proceso de Grado</h4>
                                        <EditForm json={jsonData}
                                            editableFields={asignationFields}
                                            onSaveChanges={createAsignationRequest} />
                                        <div className="flex justify-center mt-4">
                                            <button
                                                onClick={changeVisibilityEdit}
                                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                            >
                                                Cerrar
                                            </button>
                                        </div>
                                    </div>
                                }
                            </ div>
                        ))
                        }
                    </div>
                }
            </div>
        </div>
    );
}