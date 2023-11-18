import { Input, Button, Autocomplete, AutocompleteItem, Chip } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import {
  getCircuitsBySectionId,
  getElectoralSectionsFromDistritoObject,
  getEstablishmentsByCircuitObject,
  getMesasByEstablishmentId,
  getSectionsByElectoralSectionId,
} from './helpers';

import { Navbar } from '../../components/Navbar/Navbar';

import { distritos, getCircuitoById, getDistritoById } from '../../services/mesas';
import { Key, useCallback, useEffect, useState } from 'react';

import { useFiscal } from '../../context/FiscalContext';

const NewFiscal = () => {
  const {
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
    setDistritoCompleteObject,
    distritoCompleteObject,
    circuitCompleteObject,
    setCircuitCompleteObject,
    tables,
    setTables,
  } = useFiscal();

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  const districtOnSelectionChange = (distrito_id: Key) => {
    setDistrict((prev) => {
      if (prev !== distrito_id) {
        setDistritoCompleteObject(null);
        setElectoralSection(null);
        setSection(null);
        setCircuit(null);
        setCircuitCompleteObject(null);
        setEstablishment(null);
      }
      return distrito_id;
    });
  };

  const getDistrictData = useCallback(async (districtID: Key) => {
    try {
      const distritoCompleteObject = await getDistritoById(districtID);
      setDistritoCompleteObject(distritoCompleteObject);
      setElectoralSections(getElectoralSectionsFromDistritoObject(distritoCompleteObject));
    } catch (error) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    if (district) {
      getDistrictData(district);
    } else {
      setElectoralSections([]);
    }
  }, [district, getDistrictData]);

  const electoralSectionOnSelectionChange = (seccionprovincial_id: Key) => {
    setElectoralSection((prev) => {
      if (prev !== seccionprovincial_id) {
        setSection(null);
        setCircuit(null);
        setCircuitCompleteObject(null);
        setEstablishment(null);
      }
      return seccionprovincial_id;
    });
  };

  useEffect(() => {
    if (distritoCompleteObject && electoralSection) {
      setSections(getSectionsByElectoralSectionId(distritoCompleteObject, electoralSection));
    } else {
      setSections([]);
    }
  }, [electoralSection, distritoCompleteObject]);

  const sectionOnSelectionChange = (seccion_id: Key) => {
    setSection((prev) => {
      if (prev !== seccion_id) {
        setCircuit(null);
        setCircuitCompleteObject(null);
        setEstablishment(null);
      }
      return seccion_id;
    });
  };

  useEffect(() => {
    if (section && distritoCompleteObject && electoralSection) {
      setCircuits(getCircuitsBySectionId(distritoCompleteObject, electoralSection, section));
    } else {
      setCircuits([]);
    }
  }, [section, electoralSection, distritoCompleteObject]);

  const circuitOnSelectionChange = (circuito_id: Key) => {
    setCircuit((prev) => {
      if (prev !== circuito_id) {
        setCircuitCompleteObject(null);
        setEstablishment(null);
      }
      return circuito_id;
    });
  };

  const getCircuitData = useCallback(async (district: Key, electoralSection: Key, section: Key, circuit: Key) => {
    try {
      const circuitData = await getCircuitoById(district, electoralSection, section, circuit);
      setCircuitCompleteObject(circuitData);
      setEstablishments(getEstablishmentsByCircuitObject(circuitData));
    } catch (error) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    if (circuit && district && electoralSection && section && circuit) {
      getCircuitData(district, electoralSection, section, circuit);
    } else {
      setEstablishments([]);
    }
  }, [circuit, section, electoralSection, district]);

  const establishmentOnSelectionChange = (id_colegio: Key) => {
    setEstablishment(id_colegio);
  };

  useEffect(() => {
    if (establishment && circuitCompleteObject) {
      setTables(getMesasByEstablishmentId(circuitCompleteObject, establishment));
    } else {
      setTables([]);
    }
  }, [establishment]);

  return (
    <div>
      <Navbar />
      <div className="px-20 container mx-auto flex flex-row gap-5 justify-center align-items-start pt-4">
        <div className="w-150 flex flex-col gap-4 items-center">
          <span className="text-lg font-bold">Datos Electorales</span>
          <Autocomplete
            onSelectionChange={districtOnSelectionChange}
            defaultItems={Object.entries(distritos).map(([key, value]) => ({ id: key, value }))}
            label="Distrito"
            placeholder="Busca un Distrito"
            className="max-w-sm"
          >
            {(district) => <AutocompleteItem key={district.id}>{district.value}</AutocompleteItem>}
          </Autocomplete>
          <Autocomplete
            onSelectionChange={electoralSectionOnSelectionChange}
            defaultItems={electoralSections}
            label="Seccion Electoral"
            placeholder="Busca una SeccionElectoral"
            className="max-w-sm"
          >
            {(electoralSection) => <AutocompleteItem key={electoralSection.id}>{electoralSection.value ?? 'Primera'}</AutocompleteItem>}
          </Autocomplete>
          <Autocomplete
            onSelectionChange={sectionOnSelectionChange}
            defaultItems={sections}
            label="Seccion "
            placeholder="Busca una Seccion"
            className="max-w-sm"
          >
            {(section) => <AutocompleteItem key={section.id}>{section.value ?? 'Primera'}</AutocompleteItem>}
          </Autocomplete>
          <Autocomplete
            onSelectionChange={circuitOnSelectionChange}
            defaultItems={circuits}
            label="Circuito "
            placeholder="Busca un Circuito"
            className="max-w-sm"
          >
            {(circuit) => <AutocompleteItem key={circuit.id}>{circuit.value ?? 'Primera'}</AutocompleteItem>}
          </Autocomplete>
          <Autocomplete
            onSelectionChange={establishmentOnSelectionChange}
            defaultItems={establishments}
            label="Establecimiento"
            placeholder="Busca un Establecimiento"
            className="max-w-sm"
          >
            {(establishment) => <AutocompleteItem key={establishment.id}>{establishment.value ?? 'Primera'}</AutocompleteItem>}
          </Autocomplete>

          {tables.length ? (
            <div className="w-150 flex flex-col gap-4 items-center">
              <span className="text-lg font-bold pt-4">Mesas Asignadas</span>
              <div className="max-w-sm flex flex-row gap-4 items-center flex-wrap">
                {tables.map((table) => (
                  <Chip key={table.id}>{table.value}</Chip>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="w-120 flex flex-col gap-4 items-center">
          <span className="text-lg font-bold">Datos del Fiscal</span>
          <Input isRequired color="secondary" type="text" label="Nombre Completo" className="max-w-sm" />
          <Input isRequired color="secondary" type="email" label="Email" className="max-w-sm" />
          <Input isRequired color="secondary" type="text" label="Telefono" className="max-w-sm" />
          <div className="max-w-sm w-full">
            <Button type="submit" color="secondary" className="w-full" onClick={handleSubmit}>
              Crear Fiscal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFiscal;
