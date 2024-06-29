export interface EditableField {
    name: string;
    subname: string;
    size: 'single' | 'multiple' | 'reduced-link' | 'text-area';
    type: 'text' | 'number' | 'email' | 'url';
    key: string;
}

export const initialapprobalTx = {
    phase: 'Propuesta',
    state: 'Aprobado',
    associatedLink: 'Se debe subir un documento a ipfs'
};

export const approbalTxFields: EditableField[] = [
    { name: 'Fase', subname: "", size: 'single', type: 'text', key: 'phase' },
    { name: 'Estado', subname: "", size: 'single', type: 'text', key: 'state' },
    { name: 'Link del documento', subname: "", size: 'reduced-link', type: 'url', key: 'associatedLink' },
    { name: 'Comentarios', subname: "", size: 'text-area', type: 'text', key: 'comments' }
];

export const initialProcess = {
    code: "0001",
    name: "Grado en Ingeniería Electrónica y Telecomunicaciones",
    phases: ["Propuesta", "Anteproyecto", "Sustentación"],
};

export const processFields: EditableField[] = [
    { name: 'Codigo', subname: "", size: 'single', type: 'text', key: 'code' },
    { name: 'Nombre', subname: "", size: 'single', type: 'text', key: 'name' },
    { name: 'Fases', subname: "Fase", size: 'multiple', type: 'text', key: 'phases' },
];

export const initialAsignation = {
    owners: [""],
    contractTo: "0x00000000000000",
    state: "undefined"
};

export const asignationFields: EditableField[] = [
    { name: 'Firmantes', subname: "Firmante", size: 'multiple', type: 'email', key: 'owners' },
];

export const assignationFieldsHard: EditableField[] = [
    { name: 'Cual contrato', subname: "", size: 'single', type: 'text', key: 'contractTo' },
    { name: 'Estado', subname: "", size: 'single', type: 'text', key: 'state' },
]

export const initialParticipants = {
    students: [""],
    director: "",
    codirector: ""
};

export const participantsFields: EditableField[] = [
    { name: 'Estudiantes', subname: "Estudiante", size: 'multiple', type: 'email', key: 'students' },
    { name: 'Director', subname: "", size: 'single', type: 'text', key: 'director' },
    { name: 'Codirector', subname: "", size: 'single', type: 'text', key: 'codirector' },
];

export const initialMyProcess = {
    address: "0x00",
    process: "0001",
    state: "Initialized"
};

export const myProcessesFields: EditableField[] = [
    { name: 'Dirección', subname: "", size: 'single', type: 'text', key: 'address' },
    { name: 'Proceso', subname: "", size: 'single', type: 'text', key: 'process' },
    { name: 'Estado', subname: "", size: 'single', type: 'text', key: 'state' },
];