import { Key, ReactNode, createContext, useContext, useState } from 'react';
import { CircuitoResponse, DistritoResponse } from '../services/mesas';

type FiscalContextType = {
  district: KeyOrNull;
  setDistrict: React.Dispatch<React.SetStateAction<KeyOrNull>>;

  electoralSections: IdValueNumber[];
  setElectoralSections: React.Dispatch<React.SetStateAction<IdValueNumber[]>>;

  electoralSection: KeyOrNull;
  setElectoralSection: React.Dispatch<React.SetStateAction<KeyOrNull>>;

  section: KeyOrNull;
  setSection: React.Dispatch<React.SetStateAction<KeyOrNull>>;

  sections: IdValueNumber[];
  setSections: React.Dispatch<React.SetStateAction<IdValueNumber[]>>;

  circuit: KeyOrNull;
  setCircuit: React.Dispatch<React.SetStateAction<KeyOrNull>>;

  circuits: IdvalueString[];
  setCircuits: React.Dispatch<React.SetStateAction<IdvalueString[]>>;

  establishment: KeyOrNull;
  setEstablishment: React.Dispatch<React.SetStateAction<KeyOrNull>>;

  establishments: IdvalueString[];
  setEstablishments: React.Dispatch<React.SetStateAction<IdvalueString[]>>;

  distritoCompleteObject: DistritoResponse | null;
  setDistritoCompleteObject: React.Dispatch<React.SetStateAction<DistritoResponse | null>>;

  circuitCompleteObject: CircuitoResponse | null;
  setCircuitCompleteObject: React.Dispatch<React.SetStateAction<CircuitoResponse | null>>;

  tables: IdvalueString[];
  setTables: React.Dispatch<React.SetStateAction<IdvalueString[]>>;
};

type KeyOrNull = Key | null;
type IdValueNumber = { id: number; value: string };
type IdvalueString = { id: string; value: string };

interface FiscalProviderProps {
  children: ReactNode;
}

const FiscalContext = createContext<FiscalContextType | undefined>(undefined);

export const FiscalProvider: React.FC<FiscalProviderProps> = ({ children }: any) => {
  const [district, setDistrict] = useState<KeyOrNull>(null);

  const [electoralSections, setElectoralSections] = useState<IdValueNumber[]>([]);
  const [electoralSection, setElectoralSection] = useState<KeyOrNull>(null);
  const [section, setSection] = useState<KeyOrNull>(null);
  const [sections, setSections] = useState<IdValueNumber[]>([]);
  const [circuit, setCircuit] = useState<KeyOrNull>(null);
  const [circuits, setCircuits] = useState<IdvalueString[]>([]);
  const [establishment, setEstablishment] = useState<KeyOrNull>(null);
  const [establishments, setEstablishments] = useState<IdvalueString[]>([]);

  const [distritoCompleteObject, setDistritoCompleteObject] = useState<DistritoResponse | null>(null);
  const [circuitCompleteObject, setCircuitCompleteObject] = useState<CircuitoResponse | null>(null);

  const [tables, setTables] = useState<IdvalueString[]>([]);

  return (
    <FiscalContext.Provider
      value={{
        distritoCompleteObject,
        setDistritoCompleteObject,
        district,
        setDistrict,
        electoralSections,
        setElectoralSections,
        electoralSection,
        setElectoralSection,
        section,
        setSection,
        sections,
        setSections,
        circuit,
        setCircuit,
        circuits,
        setCircuits,
        establishment,
        setEstablishment,
        establishments,
        setEstablishments,
        circuitCompleteObject,
        setCircuitCompleteObject,
        tables,
        setTables,
      }}
    >
      {children}
    </FiscalContext.Provider>
  );
};

export const useFiscal = () => {
  const context = useContext(FiscalContext);
  if (!context) {
    throw new Error('useFiscal debe ser usado dentro de un FiscalProvider');
  }
  return context;
};
