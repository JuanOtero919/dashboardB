import { useState, useEffect } from 'react'; //useCallback
import { getAllPendingEvaluations, getAllPendingProcesses, getContractProcessId, getContractState, getCurrentProcesses } from './contractInteract';

interface AsyncData {
    data: Record<string, any>[] | null;
    loading: boolean;
    error: string | null;
}

export function useGetDocDataMyProcesses(wAddress: string, shouldUpdate: boolean): AsyncData {
    const [data, setData] = useState<Record<string, any>[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Se ha registrado un cambio en mis procesos");

        const loadMyProcessses = async () => {
            setLoading(true);
            setError(null);
            try {
                const processesArray = await getCurrentProcesses(wAddress);
                console.log("procesos obtenidos:", processesArray);
                console.log("entro al load")
                if (processesArray) {
                    const myProcessesRecordArray = await Promise.all(
                        processesArray.map(async (process) => {
                            const processRecord: Record<string, any> = {
                                address: process,
                                state: await getContractState(process),
                                process: await getContractProcessId(process)
                            };
                            return processRecord;
                        })
                    );
                    setData(myProcessesRecordArray);
                }
            } catch (error) {
                setError("Error obteniendo los procesos");
            }
            finally {
                setLoading(false);
            }
        };

        loadMyProcessses();
        //Cleanup function
        //return () => {
        //Cleanup tasks
        //};

    }, [wAddress, shouldUpdate]);
    return { data, loading, error };
}

export function useGetDocDataEvaluations(wAddress: string, shouldUpdate: boolean): AsyncData {
    const [data, setData] = useState<Record<string, any>[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Se solicita obtener detalles de evaluaciones pendientes");

        const loadEvaluations = async () => {
            setLoading(true);
            setError(null);
            console.log("entro al load evaluations");

            try {
                const processesArray = await getAllPendingEvaluations(wAddress);
                console.log("procesos obtenidos:", processesArray);
                if (processesArray) {
                    const myProcessesRecordArray = await Promise.all(
                        processesArray.map(async (process) => {
                            const processRecord: Record<string, any> = {
                                address: process,
                                state: await getContractState(process),
                                process: await getContractProcessId(process)
                            };
                            return processRecord;
                        })
                    );
                    setData(myProcessesRecordArray);
                }
            } catch (error) {
                setError("Error obteniendo los procesos");
            }
            finally {
                setLoading(false);
            }
        };

        loadEvaluations();

        //Cleanup function
        //return () => {
        //Cleanup tasks
        //};

    }, [wAddress, shouldUpdate]);
    return { data, loading, error };
}

export function useGetDocDataAsignations(shouldUpdate: boolean): AsyncData {
    const [data, setData] = useState<Record<string, any>[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Se solicita obtener detalles de asignaciones pendientes");

        const loadEvaluations = async () => {
            setLoading(true);
            setError(null);
            console.log("entro al load evaluations");

            try {
                const processesArray = await getAllPendingProcesses();
                console.log("procesos obtenidos:", processesArray);
                if (processesArray) {
                    const myProcessesRecordArray = await Promise.all(
                        processesArray.map(async (process) => {
                            const processRecord: Record<string, any> = {
                                address: process,
                                state: await getContractState(process),
                                process: await getContractProcessId(process)
                            };
                            return processRecord;
                        })
                    );
                    setData(myProcessesRecordArray);
                }
            } catch (error) {
                setError("Error obteniendo los procesos");
            }
            finally {
                setLoading(false);
            }
        };

        loadEvaluations();

        //Cleanup function
        //return () => {
        //Cleanup tasks
        //};

    }, [shouldUpdate]);
    return { data, loading, error };
}