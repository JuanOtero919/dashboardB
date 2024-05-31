import { EditableField } from "../utils/requiredFields"

interface Props {
    json: Record<string, any>;
    editableFields: EditableField[];
}

export const DataCard: React.FC<Props> = ({ json, editableFields }) => {
    return (
        <>
            {
                editableFields.map((field, index) => (
                    <div key={index}>
                        {field.size != "multiple" && <label className="mb-2">
                            <label className="block font-medium text-gray-700">
                                {field.name}:
                            </label>
                            <span className="block text-gray-900">
                                {json[field.key]}
                            </span>
                        </label>}
                        {field.size == "multiple" && <>
                            <label className="block font-medium text-gray-700">
                                {field.name}:
                            </label>
                            {(json[field.key] as string[]).map((fase, index) => (
                                <label key={index} className="block text-gray-900">
                                    {field.subname} {index}: {fase}
                                </label>
                            ))}
                        </>
                        }
                    </div>
                ))
            }
        </>
    );
};