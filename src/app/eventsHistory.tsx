'use client';

import { useActiveWallet, useContractEvents } from "thirdweb/react";
import { approbalTxFields } from "../utils/requiredFields";
import { useEffect, useState } from "react";
import { getDocumentContract } from "../utils/contracts";
import { Wallet } from "thirdweb/wallets";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";

export function EventsHistory({ contractTo }:
    { contractTo: string }) {

    const activeWallet = useActiveWallet() as Wallet;
    // const wAddress = activeWallet.getAccount()?.address;

    const [buttonName, setbuttonName] = useState<string>("Mostrar documentos");
    const [showEvents, setShowEvents] = useState(true);

    const changeVisibilityEvents = () => {
        const newButtonName = buttonName === "Mostrar documentos" ?
            "Ocultar documentos" : "Mostrar documentos";
        setbuttonName(newButtonName);
        const newShowEvents = newButtonName === "Ocultar documentos";
        setShowEvents(newShowEvents);
    };

    const documentContract = getDocumentContract(contractTo);
    //READ
    const contractEvents = useContractEvents({ contract: documentContract, blockRange: 500000 }); //5806228
    //https://portal.thirdweb.com/typescript/v4/interact

    const [datos, setDatos] = useState<Record<string, any>[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        console.log("DOCUMEMT CONTRACT", documentContract);
        const datosVector: Record<string, any>[] = [];
        const datosMap = contractEvents.data;

        try {
            datosMap?.map((event) => {
                if ("signer" in event.args) {
                    if (true) { //event.args.signer == wAddress
                        console.log("Signer usando la cuenta");
                        datosVector.push(event.args as Record<string, any>);
                    }
                }
            });
        } catch (error) {
            console.log("error");
        }
        finally {
            console.log(datosVector);
            setDatos(datosVector);
            console.log(datos);
            setLoading(false);
        }
    }, [])

    const mostrarCosasContrato = () => {
        changeVisibilityEvents();
    }

    return (
        <div>
            {/* <div className="flex justify-center mt-2">
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    onClick={mostrarCosasContrato}>{buttonName}</button>
            </div> */}
            {showEvents && loading &&
                <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-2xl">
                    <p>Loading....</p>
                </div>}
            {showEvents && !loading &&
                <Table title='' columns={approbalTxFields} data={datos} buttons={[]} />
            }
        </div>
    )
}

//Previamente usaba un useeffect, pero no es muy viable en terminos de memoria