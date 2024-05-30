export interface EditableField {
    name: string;
    subname: string,
    type: 'text' | 'number' | 'email' | 'url' | "multiple";
    key: string;
}

export const initialapprobalTx = {
    state: 'Aprobado',
    phase: 'Propuesta',
    associatedLink: 'Se debe subir un documento a ipfs'
};

export const approbalTxFields: EditableField[] = [
    { name: 'Estado', subname: "", type: 'text', key: 'state' },
    { name: 'Fase', subname: "", type: 'text', key: 'phase' },
    { name: 'Link del documento', subname: "", type: 'url', key: 'associatedLink' }
];

export const initialProcess = {
    code: "0001",
    name: "Grado en Ingeniería Electrónica y Telecomunicaciones",
    phases: ["Propuesta", "Anteproyecto", "Sustentación"],
};

export const processFields: EditableField[] = [
    { name: 'Codigo', subname: "", type: 'text', key: 'code' },
    { name: 'Nombre', subname: "", type: 'text', key: 'name' },
    { name: 'Fases', subname: "Fase", type: 'multiple', key: 'phases' },
];

export const initialAsignation = {
    owners: ["0x00000000000000000"],
    contractTo: "0x00000000000000",
    state: "undeined"
};

export const asignationFields: EditableField[] = [
    { name: 'Firmantes', subname: "Firmante", type: 'multiple', key: 'owners' },
    { name: 'Cual contrato', subname: "", type: 'text', key: 'contractTo' },
    { name: 'Estado', subname: "", type: 'text', key: 'state' },
];

export const initialParticipants = {
    students: ["0x00"],
    director: "",
    codirector: ""
};

export const participantsFields: EditableField[] = [
    { name: 'Estudiantes', subname: "Estudiante", type: 'multiple', key: 'students' },
    { name: 'Director', subname: "", type: 'text', key: 'director' },
    { name: 'Codirector', subname: "", type: 'text', key: 'codirector' },
];