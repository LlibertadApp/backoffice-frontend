import { Key, ReactNode, createContext, useContext, useState } from 'react';
import { CircuitoResponse, DistritoResponse } from '../services/mesas';

type FiscalContextType = {
  district: KeyValueOrNull;
  setDistrict: React.Dispatch<React.SetStateAction<KeyValueOrNull>>;

  electoralSections: IdValueNumber[];
  setElectoralSections: React.Dispatch<React.SetStateAction<IdValueNumber[]>>;

  electoralSection: KeyValueOrNull;
  setElectoralSection: React.Dispatch<React.SetStateAction<KeyValueOrNull>>;

  section: KeyValueOrNull;
  setSection: React.Dispatch<React.SetStateAction<KeyValueOrNull>>;

  sections: IdValueNumber[];
  setSections: React.Dispatch<React.SetStateAction<IdValueNumber[]>>;

  circuit: KeyValueOrNull;
  setCircuit: React.Dispatch<React.SetStateAction<KeyValueOrNull>>;

  circuits: IdvalueString[];
  setCircuits: React.Dispatch<React.SetStateAction<IdvalueString[]>>;

  establishment: KeyValueOrNull;
  setEstablishment: React.Dispatch<React.SetStateAction<KeyValueOrNull>>;

  establishments: IdvalueString[];
  setEstablishments: React.Dispatch<React.SetStateAction<IdvalueString[]>>;

  distritoCompleteObject: DistritoResponse | null;
  setDistritoCompleteObject: React.Dispatch<React.SetStateAction<DistritoResponse | null>>;

  circuitCompleteObject: CircuitoResponse | null;
  setCircuitCompleteObject: React.Dispatch<React.SetStateAction<CircuitoResponse | null>>;

  tables: IdvalueString[];
  setTables: React.Dispatch<React.SetStateAction<IdvalueString[]>>;
};
type KeyValueOrNull = { id: Key; value: string } | null;
type IdValueNumber = { id: number; value: string };
type IdvalueString = { id: string; value: string };

interface FiscalProviderProps {
  children: ReactNode;
}

const FiscalContext = createContext<FiscalContextType | undefined>(undefined);

export const FiscalProvider: React.FC<FiscalProviderProps> = ({ children }: any) => {
  const [district, setDistrict] = useState<KeyValueOrNull>(null);

  const [electoralSections, setElectoralSections] = useState<IdValueNumber[]>([]);
  const [electoralSection, setElectoralSection] = useState<KeyValueOrNull>(null);
  const [section, setSection] = useState<KeyValueOrNull>(null);
  const [sections, setSections] = useState<IdValueNumber[]>([]);
  const [circuit, setCircuit] = useState<KeyValueOrNull>(null);
  const [circuits, setCircuits] = useState<IdvalueString[]>([]);
  const [establishment, setEstablishment] = useState<KeyValueOrNull>(null);
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
