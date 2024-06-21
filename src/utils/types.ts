import { EditableField } from "@/utils/requiredFields";

export interface RowData {
    address: string;
    process: string;
    state: string;
}

export interface Column<T> {
    key: keyof T;
    title: string;
}

export interface Button<T> {
    icon: JSX.Element;
    onClick: Function;
    hoverText: string;
}

export interface AddButton {
    icon: JSX.Element;
    onClick: () => void;
    hoverText: string;
}

export interface TableProps<T> {
    title: string;
    columns: EditableField[];
    data: Record<string, any>[];
    buttons?: Button<T>[];
    addButton?: Button<T>;
}

export interface FormProps {
    json: Record<string, any>;
    editableFields: EditableField[];
    onSaveChanges: (updatedJson: Record<string, any>) => void;
    onExit: Function;
}

export interface DocumentTxProps {
    user: string,
    contractTo: string,
    changeVisibilityEdit: Function,
    selectedPhase: string | null,
    phases: string[],
    setPhases: Function,
    setIsSuccess: Function
}

export interface IpfsProps {
    data: Record<string, any>,
    sendLinkToData: Function
}