'use client';

import { PreparedTransaction, prepareContractCall } from "thirdweb";
import { useReadContract, useSendTransaction } from "thirdweb/react";
import { useEffect, useState } from "react";
import { mainContract } from "@/utils/contracts";
import { myProcessesFields } from "@/utils/requiredFields";
import { getWalletAddress } from "@/app/contractInteract";
import { useGetDocDataAsignations } from "@/app/getDocumentData";
import { ClipboardPen } from "lucide-react";
import { RowData, Button } from "@/utils/types";
import { useAuth } from "@/context/context";
import Table from "@/components/Table";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Home() {

    const { isAuthenticated } = useAuth();
    const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
    const { data: pendingProcesses, loading, error } = useGetDocDataAsignations(shouldUpdate);

    //READ BLOCKCHAIN
    const { data: pendingAsignations, } = useReadContract({
        contract: mainContract,
        method: "getAllPendingProcesses",
        params: []
    });
    //SEND TRANSACTIONS
    const { mutate: sendTransaction, isSuccess, isError, isPaused, isPending, isIdle } = useSendTransaction();

    useEffect(() => {
        console.log("isSuccess, isError, isPaused, isPending, isIdle", isSuccess, isError, isPaused, isPending, isIdle);
    },
        [isSuccess, isError, isPaused, isPending, isIdle]
    )

    useEffect(() => {
        setShouldUpdate(!shouldUpdate);
    }, [pendingAsignations, isSuccess]);

    const createAsignationRequest = async (json: Record<string, any>) => {
        const { contractTo, state, owners } = json;
        const signers = owners as string[];

        const signersArrayToSend = await Promise.all(
            signers.map(async (signer) => {
                const address = await getWalletAddress(signer);
                return address;
            }));

        console.log("Parametros para la asignacion: ", contractTo,
            mainContract.address, signersArrayToSend, owners.length, state);

        const transaction = prepareContractCall({
            contract: mainContract,
            method: "createAsignationRequest",
            params: [contractTo, mainContract.address, signersArrayToSend, owners.length, state],
        });

        const tx = transaction as PreparedTransaction;
        console.log("Transacción de asignación", tx);
        sendTransaction(tx);
    };

    const buttons: Button<RowData>[] = [
        {
            icon: <ClipboardPen />,
            onClick: createAsignationRequest,
            hoverText: 'Expand',
        },
    ];

    return isAuthenticated ? (
        <div className="w-full">
            {loading && <p>Cargando procesos...</p>}
            {error && <p>Error al obtener los procesos...</p>}
            {!loading && !error && pendingProcesses &&
                <div className="p-4">
                    <Table
                        title="Lista de Asignaciones Pendientes"
                        columns={myProcessesFields}
                        data={pendingProcesses}
                        buttons={buttons}
                    />
                </div>
            }
        </div>
    ) : (
        <FullScreenLoader />
    );
}