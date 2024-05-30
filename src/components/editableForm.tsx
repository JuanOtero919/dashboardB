import React, { useEffect, useState } from 'react';
import { EditableField } from "../utils/requiredFields"
//import styles from "../styles.module.css";
//import { Ipfs } from './ipfs';

interface Props {
    json: Record<string, any>;
    editableFields: EditableField[];
    onSaveChanges: (updatedJson: Record<string, any>) => void;
}

export const EditForm: React.FC<Props> = ({ json, editableFields, onSaveChanges }) => {
    const [editableData, setEditableData] = useState<Record<string, any>>(json);

    // Este efecto se ejecuta cuando el componente se monta o cuando el parametro cambia
    useEffect(() => { setEditableData(json); }, [json]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setEditableData({ ...editableData, [name]: value });
    };

    const handleMultiInputChange = (name: string, index: number, value: string): void => {
        const newFases = [...editableData[name]];
        newFases[index] = value;
        setEditableData({ ...editableData, [name]: newFases });
    };

    const handleAddField = (name: string, index: number) => {
        const newFases = [...editableData[name]];
        newFases.splice(index + 1, 0, '');
        setEditableData({ ...editableData, [name]: newFases });
    };

    const handleRemoveField = (name: string, index: number) => {
        const newFases = [...editableData[name]];
        newFases.splice(index, 1);
        setEditableData({ ...editableData, [name]: newFases });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        onSaveChanges(editableData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                {editableFields.map((field, index) => (
                    <div key={index} className="flex flex-col space-y-2" >
                        <label className="block text-gray-700 font-medium">
                            {field.name}:
                            <input type={field.type}
                                name={field.key}
                                value={editableData[field.key]}
                                onChange={handleInputChange} 
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                            {field.type == "url" //&&
                                //<Ipfs data={editableData} sendLinkToData={setEditableData} />
                            }
                        </label>
                        <div>
                            {field.type == "multiple" &&
                                <div className="space-y-2">
                                    {(editableData[field.key] as string[]).map((multi_field, idx) => (
                                        <div key={idx} className="flex items-center space-x-2">
                                            <label className="block text-gray-700 font-medium">
                                                {field.subname} {idx + 1}:
                                                <input
                                                    type="text"
                                                    value={multi_field}
                                                    onChange={(e) =>
                                                        handleMultiInputChange(field.key,
                                                            idx, e.target.value)}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                />
                                                <button type="button" onClick={() =>
                                                    handleRemoveField(field.key, idx)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded">
                                                    -
                                                </button>

                                                <button type="button" onClick={() =>
                                                    handleAddField(field.key, idx)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded">
                                                    +
                                                </button>
                                            </label>
                                        </div>
                                    ))}

                                </div>
                            }
                        </div>
                    </div>
                ))}
                < div  className="text-center">
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Save Changes</button>
                </div>
            </form >
        </div >
    );
};