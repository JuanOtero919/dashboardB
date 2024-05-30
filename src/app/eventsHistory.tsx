// 'use client'

// import { useActiveWallet, useContractEvents } from "thirdweb/react";
// import { approbalTxFields } from "../utils/requiredFields";
// import { useState } from "react";
// import styles from "./styles.module.css";
// import { getDocumentContract, mainContract } from "../utils/contracts";
// import { Wallet } from "thirdweb/wallets";
// import { DataCard } from "../components/dataVisualization";

// export function EventsHistory({ contractTo }:
//     { contractTo: string }) {

//     const activeWallet = useActiveWallet() as Wallet;
//     const wAddress = activeWallet.getAccount()?.address;

//     const [buttonName, setbuttonName] = useState<string>("Mostrar historial");

//     const [showEvents, setShowEvents] = useState(false);
//     const changeVisibilityEvents = () => {
//         setShowEvents(!setShowEvents);
//         const newButtonName = buttonName === "Mostrar historial" ?
//             "Ocultar historial" : "Mostrar historial";
//         setbuttonName(newButtonName);
//     };

//     const documentContract = getDocumentContract(contractTo);
//     //READ
//     const contractEvents = useContractEvents({ contract: documentContract, blockRange: 0 });//5806228
//     //https://portal.thirdweb.com/typescript/v4/interact

//     const [datos, setDatos] = useState<Record<string, any>[]>([]);

//     //SEND TRANSACTIONS

//     const mostrarCosasContrato = async () => {
//         console.log("DOCUMEMT CONTRACT", documentContract);
//         const datosVector: Record<string, any>[] = [];
//         const datosMap = contractEvents.data;
//         datosMap?.map((event) => {
//             try {
//                 if ("signer" in event.args) {
//                     if (event.args.signer == wAddress) {
//                         console.log("Signer usando la cuenta");
//                         datosVector.push(event.args as Record<string, any>);
//                     }
//                 }
//             } catch {
//                 console.log("error");
//             }
//         });
//         console.log(datosVector);
//         setDatos(datosVector);
//         console.log(datos);
//         changeVisibilityEvents();
//     }

//     return (
//         <div className={styles.loginCard}>
//             <button onClick={mostrarCosasContrato}>{buttonName}</button>
//             {showEvents && <div>
//                 {datos.map((event, index) => (
//                     <div key={index} className={styles.loginCard}>
//                         <DataCard
//                             json={event}
//                             editableFields={approbalTxFields} />
//                     </ div>
//                 ))}
//             </ div>
//             }
//         </div>

//     );
// }