'use client'

import { upload, resolveScheme } from "thirdweb/storage";
import { client } from "../utils/constants";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const Ipfs = ({ data, sendLinkToData }: {
    data: Record<string, any>,
    sendLinkToData: Function
}) => {
    const [uris, SetUris] = useState<string[]>([]);
    const [resolved, setResolved] = useState<string>("");
    const [filesToUpload, setfilesToUpload] = useState<File[]>([]);
    const [fileName, setFileName] = useState<string>("...Seleccionar documento");

    const resolveAddress = async (uri: string) => {
        console.log("LA DIRECCION PARA BUSCAR ES", uri);
        const resolved = resolveScheme({
            client,
            uri
        });
        console.log("LA DIRECCION Resuelta es", resolved);
        setResolved(resolved);
    }

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            setfilesToUpload(acceptedFiles);
            setFileName(acceptedFiles[0].name)

        },
        [upload]
    );

    const handleUpload = async () => {
        const _uris = await upload({
            client,
            files: filesToUpload,
        });
        SetUris(_uris);
        console.log(_uris);
        console.log("URIS", _uris);
        console.log("Se envia Uris al form");
        sendLinkToData({ ...data, ["associatedLink"]: _uris });
        resolveAddress(_uris as unknown as string);
    }

    const { getRootProps, getInputProps, } = useDropzone({ onDrop })

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps} value={fileName} readOnly={true} />
            </ div>
            <button onClick={handleUpload}>Subir a IPFS</button>
            {resolved != "" &&
                <a href={resolved} target="_blank">
                    <img /> {/*className={styles.pdf} */}
                    Link del Documento en IPFS
                </a>
            }
        </>
    );
}