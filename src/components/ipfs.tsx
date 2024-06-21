'use client';

import { upload, resolveScheme } from "thirdweb/storage";
import { client } from "../utils/constants";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileUp } from "lucide-react";
import Popup from "./Popup";
import { IpfsProps } from "@/utils/types";

export const resolveAddress = (uri: string) => {
    try {
        console.log("La dirección para buscar es:", uri);
        const resolved = resolveScheme({
            client,
            uri
        });
        console.log("La dirección resuelta es", resolved);
        return resolved;
    }
    catch {
        return "";
    }
};

export const Ipfs = ({ data, sendLinkToData }: IpfsProps) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [uris, SetUris] = useState<string[]>([]);
    const [resolved, setResolved] = useState<string>("");
    const [filesToUpload, setfilesToUpload] = useState<File[]>([]);
    const [fileName, setFileName] = useState<string | null>(null);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            try {
                setfilesToUpload(acceptedFiles);
                setFileName(acceptedFiles[0].name);
            } catch (error) { }
            finally {
                setIsPopupOpen(true);
            }
        },
        [upload]
    );

    const handleUpload = async () => {
        try {
            const _uris = await upload({
                client,
                files: filesToUpload,
            });
            SetUris(_uris);
            console.log(_uris);
            console.log("URIS", _uris);
            console.log("Se envia Uris al form");
            sendLinkToData({ ...data, ["associatedLink"]: _uris });
            setResolved(resolveAddress(_uris as unknown as string));
        } catch (error) { }
        finally {
            setIsPopupOpen(false);
        }
    }

    const handleCancel = () => {
        setIsPopupOpen(false);
    }

    const { getRootProps, getInputProps, } = useDropzone({ onDrop });

    return (
        <>
            {isPopupOpen && <div className="fixed flex justify-center items-center h-screen">
                <Popup
                    isOpen={isPopupOpen}
                    message={`¿Desea adjuntar el archivo ${fileName}?`}
                    onConfirm={handleUpload}
                    onCancel={handleCancel}
                />
            </div>}

            <div {...getRootProps()}>
                <button {...getInputProps}
                    type="button"
                    className="flex items-center space-x-1 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                    <FileUp />
                    Adjuntar documento
                </button>
            </ div>

            {/* {resolved != "" &&
                <a href={resolved} target="_blank">
                    <img /> {/*className={styles.pdf} }
            Link del Documento en IPFS
        </a >
            } */}
        </>
    );
}