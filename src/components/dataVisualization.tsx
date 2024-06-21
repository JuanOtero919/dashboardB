import { resolveScheme } from "thirdweb/storage";
import { EditableField } from "../utils/requiredFields"
import { client } from "@/utils/constants";

interface Props {
    json: Record<string, any>;
    editableFields: EditableField[];
}

export const DataCard: React.FC<Props> = ({ json, editableFields }) => {

    const resolveAddress = (uri: string): string => {
        try {
            console.log("LA DIRECCION PARA BUSCAR ES", uri);
            const resolved = resolveScheme({
                client,
                uri
            });
            console.log("LA DIRECCION Resuelta es", resolved);
            return resolved;
        }
        catch {
            return "";
        }
    }

    return (
        <>
            {
                editableFields.map((field, index) => (
                    <div key={index}>
                        {field.size != "multiple" && field.size != "reduced-link" &&
                            <label className="mb-2">
                                <label className="block text-base font-medium text-gray-700">
                                    {field.name}:
                                </label>
                                <span className="text-base text-gray-900">
                                    {json[field.key]}
                                </span>
                            </label>}
                        {field.size == "multiple" && <>
                            <label className="block text-[13px] font-medium text-gray-700">
                                {field.name}:
                            </label>
                            {(json[field.key] as string[]).map((fase, index) => (
                                <label key={index} className="block text-[13px] text-gray-900">
                                    {field.subname} {index}: {fase}
                                </label>
                            ))}
                        </>
                        }
                        {field.size == "reduced-link" && <>
                            <a className="block text-[13px] font-medium text-gray-700"
                                href={resolveAddress(json[field.key])}
                                target="_blank">{field.name}</a>
                        </>
                        }
                    </div>
                ))
            }
        </>
    );
};