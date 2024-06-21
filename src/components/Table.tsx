import React, { useState } from 'react';
import { TableProps } from '../utils/types';
import { EventsHistory } from '@/app/eventsHistory';
import { ClipboardPen } from 'lucide-react';
import { EditForm } from './editableForm';
import { asignationFields, initialAsignation } from '@/utils/requiredFields';
import { resolveAddress } from './Ipfs';
import { FaFilePdf } from "react-icons/fa6";

const Table = <T,>({ title, columns, data, buttons, addButton }: TableProps<T>) => {

    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleExpandClick = (rowIndex: number) => {
        setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter((row) =>
        columns.some((column) =>
            String(row[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="overflow-x-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-bold">{title}</h2>
                    {addButton && <button
                        onClick={() => addButton.onClick()}
                        className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                        title={addButton.hoverText}
                    >
                        {addButton.icon}
                    </button>}
                </div>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="py-1 px-2 border border-gray-300 rounded"
                />
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr className="rounded-t-lg">
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left"
                            >
                                {column.name}
                            </th>
                        ))}
                        {buttons && buttons.length > 0 && (
                            <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left">
                                Opciones
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            <tr className={`border-b border-gray-200 ${rowIndex === filteredData.length - 1 ? 'rounded-b-lg' : ''}`}>
                                {columns.map((column) => (
                                    <React.Fragment key={String(column.key)}>
                                        {column.size != "reduced-link" &&
                                            <td className="py-2 px-4">
                                                {String(row[column.key])}
                                            </td>}
                                        {column.size == "reduced-link" &&
                                            <td>
                                                <a target="_blank"
                                                    href={resolveAddress(row[column.key])}>
                                                    <FaFilePdf size={24} />
                                                </a>
                                            </td>
                                        }
                                    </React.Fragment>

                                ))}
                                {buttons && buttons.length > 0 && (
                                    <td className="py-2 px-4 flex space-x-2">
                                        {buttons.map((button, buttonIndex) => (
                                            <button
                                                key={buttonIndex}
                                                onClick={() => {
                                                    if (button.hoverText === 'Expand') {
                                                        handleExpandClick(rowIndex);
                                                    } else {
                                                        button.onClick(row.address);
                                                    }
                                                }}
                                                className="flex items-center space-x-1 hover:text-blue-500"
                                                title={button.hoverText}
                                            >
                                                {button.icon}
                                            </button>
                                        ))}
                                    </td>
                                )}
                            </tr>
                            {expandedRow === rowIndex && buttons &&
                                buttons[0].icon.type != ClipboardPen && (
                                    <tr className="border-b border-gray-200">
                                        <td colSpan={columns.length + 1} className="py-2 px-4 bg-gray-50">
                                            <EventsHistory contractTo={row.address} />
                                        </td>
                                    </tr>
                                )}

                            {expandedRow === rowIndex && buttons &&
                                buttons[0].icon.type == ClipboardPen && (
                                    <tr className="border-b border-gray-200">
                                        <td colSpan={columns.length + 1} className="py-2 px-4 bg-gray-50">
                                            {buttons[0].icon}
                                            <div className="p-4 bg-gray-100 rounded-lg mb-4">
                                                <h4 className="text-xl font-semibold mb-4 text-center">Asignar proceso de Grado</h4>
                                                <EditForm json={{
                                                    ...initialAsignation,
                                                    contractTo: row.address,
                                                    state: row.state
                                                }}
                                                    editableFields={asignationFields}
                                                    onSaveChanges={buttons[0].onClick as (updatedJson: Record<string, any>) => void}
                                                    onExit={handleExpandClick} />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;