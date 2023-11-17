import { Key, ReactNode, createContext, useContext, useState } from 'react';
import { ElectoralSection, Section, Circuit, Establishment } from '../entities/ElectoralData';

type FiscalContextType = {
  district: KeyOrNull;
  setDistrict: React.Dispatch<React.SetStateAction<KeyOrNull>>;

  electoralSections: ElectoralSection[];
  setElectoralSections: React.Dispatch<React.SetStateAction<ElectoralSection[]>>;

  electoralSection: KeyOrNull;
  setElectoralSection: React.Dispatch<React.SetStateAction<KeyOrNull>>;

  section: KeyOrNull;
  setSection: React.Dispatch<React.SetStateAction<KeyOrNull>>;

  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;

  circuit: KeyOrNull;
  setCircuit: React.Dispatch<React.SetStateAction<KeyOrNull>>;

  circuits: Circuit[];
  setCircuits: React.Dispatch<React.SetStateAction<Circuit[]>>;

  establishment: KeyOrNull;
  setEstablishment: React.Dispatch<React.SetStateAction<KeyOrNull>>;

  establishments: Establishment[];
  setEstablishments: React.Dispatch<React.SetStateAction<Establishment[]>>;
};

type KeyOrNull = Key | null;

interface FiscalProviderProps {
  children: ReactNode;
}

const FiscalContext = createContext<FiscalContextType | undefined>(undefined);

export const FiscalProvider: React.FC<FiscalProviderProps> = ({ children }: any) => {
  const [district, setDistrict] = useState<KeyOrNull>(null);
  const [electoralSections, setElectoralSections] = useState<ElectoralSection[]>([]);
  const [electoralSection, setElectoralSection] = useState<KeyOrNull>(null);
  const [section, setSection] = useState<KeyOrNull>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [circuit, setCircuit] = useState<KeyOrNull>(null);
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [establishment, setEstablishment] = useState<KeyOrNull>(null);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);

  return (
    <FiscalContext.Provider
      value={{
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
