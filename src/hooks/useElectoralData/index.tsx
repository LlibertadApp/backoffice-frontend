import { Key, ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
    getDistritos,
    getElectoralSectionsByDistritoId,
    getSectionsByElectoralSectionId,
    getCircuitBySectionId,
    getEstablishmentByCircuitId,
} from './helpers';

import { District, ElectoralSection, Section, Circuit, Establishment } from '../../entities/ElectoralData';

type KeyOrNull = Key | null;
type OnChangeKey = (key: Key) => void;

const ElectoralDataContext = createContext<
    | {
          district: KeyOrNull;
          districts: District[];
          districtOnSelectionChange: OnChangeKey;
          section: KeyOrNull;
          sections: Section[];
          sectionOnSelectionChange: OnChangeKey;
          electoralSection: KeyOrNull;
          electoralSections: ElectoralSection[];
          electoralSectionOnSelectionChange: OnChangeKey;
          circuit: KeyOrNull;
          circuits: Circuit[];
          circuitOnSelectionChange: OnChangeKey;
          establishment: KeyOrNull;
          establishments: Establishment[];
          establishmentOnSelectionChange: OnChangeKey;
      }
    | undefined
>(undefined);

export const ElectoralDataContextProvider = ({ children }: { children: ReactNode }) => {
    const [district, setDistrict] = useState<KeyOrNull>(null);
    const [electoralSections, setElectoralSections] = useState<ElectoralSection[]>([]);
    const [electoralSection, setElectoralSection] = useState<KeyOrNull>(null);
    const [section, setSection] = useState<KeyOrNull>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [circuit, setCircuit] = useState<KeyOrNull>(null);
    const [circuits, setCircuits] = useState<Circuit[]>([]);
    const [establishment, setEstablishment] = useState<KeyOrNull>(null);
    const [establishments, setEstablishments] = useState<Establishment[]>([]);

    const districts = useMemo(() => {
        return getDistritos();
    }, []);

    const districtOnSelectionChange = (distrito_id: Key) => {
        setDistrict(distrito_id);
    };

    useEffect(() => {
        if (district) {
            setElectoralSections(getElectoralSectionsByDistritoId(district));
        } else {
            setElectoralSections([]);
        }
    }, [district]);

    const electoralSectionOnSelectionChange = (seccionprovincial_id: Key) => {
        setElectoralSection(seccionprovincial_id);
    };

    useEffect(() => {
        if (electoralSection) {
            setSections(getSectionsByElectoralSectionId(electoralSection));
        } else {
            setSections([]);
        }
    }, [electoralSection]);

    const sectionOnSelectionChange = (seccion_id: Key) => {
        setSection(seccion_id);
    };

    useEffect(() => {
        if (section) {
            setCircuits(getCircuitBySectionId(section));
        } else {
            setCircuits([]);
        }
    }, [section]);

    const circuitOnSelectionChange = (circuito_id: Key) => {
        setCircuit(circuito_id);
    };

    useEffect(() => {
        if (circuit) {
            setEstablishments(getEstablishmentByCircuitId(circuit));
        } else {
            setEstablishments([]);
        }
    }, [circuit]);

    const establishmentOnSelectionChange = (id_colegio: Key) => {
        setEstablishment(id_colegio);
    };
    return (
        <ElectoralDataContext.Provider
            value={{
                district,
                districts,
                districtOnSelectionChange,
                section,
                sections,
                sectionOnSelectionChange,
                electoralSection,
                electoralSections,
                electoralSectionOnSelectionChange,
                circuit,
                circuits,
                circuitOnSelectionChange,
                establishment,
                establishments,
                establishmentOnSelectionChange,
            }}
        >
            {children}
        </ElectoralDataContext.Provider>
    );
};

// Crear un hook personalizado para acceder al contexto
export const useElectoralData = () => {
    const context = useContext(ElectoralDataContext);
    if (!context) {
        throw new Error('useElectoralData must be used within a ElectoralDataContextProvider');
    }
    return context;
};
