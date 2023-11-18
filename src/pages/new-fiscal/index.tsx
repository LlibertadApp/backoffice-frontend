import { Input, Button, Autocomplete, AutocompleteItem, Chip, CircularProgress } from '@nextui-org/react';
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
type distrito = keyof typeof distritos;
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
  const [loadingDistritoObject, setLoadingDistritoObject] = useState(false);
  const [loadingCircuitObject, setLoadingCircuitObject] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  const districtOnSelectionChange = (distrito_id: Key) => {
    const selectedDistrictValue = distritos[distrito_id as distrito];
    setDistrict((prev) => {
      if (prev?.id !== distrito_id) {
        setDistritoCompleteObject(null);
        setElectoralSection(null);
        setSection(null);
        setCircuit(null);
        setCircuitCompleteObject(null);
        setEstablishment(null);
      }
      return { id: distrito_id, value: selectedDistrictValue };
    });
  };

  const getDistrictData = useCallback(async () => {
    if (district) {
      setLoadingDistritoObject(true);
      try {
        const distritoCompleteObject = await getDistritoById(district.id);
        setDistritoCompleteObject(distritoCompleteObject);
        setElectoralSections(getElectoralSectionsFromDistritoObject(distritoCompleteObject));
      } catch (error) {
        setError(true);
      } finally {
        setLoadingDistritoObject(false);
      }
    } else {
      setElectoralSections([]);
    }
  }, [district]);

  useEffect(() => {
    getDistrictData();
  }, [getDistrictData]);

  const electoralSectionOnSelectionChange = useCallback(
    (electoralSectionID: Key) => {
      setElectoralSection((prev) => {
        const selectedElectoralSection = electoralSections.find((es) => es.id == electoralSectionID);

        if (selectedElectoralSection) {
          if (prev?.id !== electoralSectionID) {
            setSection(null);
            setCircuit(null);
            setCircuitCompleteObject(null);
            setEstablishment(null);
          }
          return { id: electoralSectionID, value: selectedElectoralSection?.value };
        } else {
          setSection(null);
          setCircuit(null);
          setCircuitCompleteObject(null);
          setEstablishment(null);
          return null;
        }
      });
    },
    [electoralSections]
  );

  useEffect(() => {
    if (distritoCompleteObject && electoralSection) {
      setSections(getSectionsByElectoralSectionId(distritoCompleteObject, electoralSection.id));
    } else {
      setSections([]);
    }
  }, [electoralSection, distritoCompleteObject]);

  const sectionOnSelectionChange = useCallback(
    (sectionID: Key) => {
      setSection((prev) => {
        const selectedSection = sections.find((sc) => sc.id == sectionID);
        if (selectedSection) {
          if (prev?.id !== sectionID) {
            setCircuit(null);
            setCircuitCompleteObject(null);
            setEstablishment(null);
          }
          return { id: sectionID, value: selectedSection?.value };
        } else {
          setCircuit(null);
          setCircuitCompleteObject(null);
          setEstablishment(null);
          return null;
        }
      });
    },
    [sections]
  );

  useEffect(() => {
    if (section && distritoCompleteObject && electoralSection) {
      setCircuits(getCircuitsBySectionId(distritoCompleteObject, electoralSection.id, section.id));
    } else {
      setCircuits([]);
    }
  }, [section, electoralSection, distritoCompleteObject]);

  const circuitOnSelectionChange = (circuitID: Key) => {
    setCircuit((prev) => {
      const selectedCircuit = circuits.find((ci) => ci.id == circuitID);
      if (selectedCircuit) {
        if (prev?.id !== circuitID) {
          setCircuitCompleteObject(null);
          setEstablishment(null);
        }
        return { id: circuitID, value: selectedCircuit.value };
      } else {
        setCircuitCompleteObject(null);
        setEstablishment(null);
        return null;
      }
    });
  };

  const getCircuitData = useCallback(async (district: Key, electoralSection: Key, section: Key, circuit: Key) => {
    setLoadingCircuitObject(true);
    try {
      const circuitData = await getCircuitoById(district, electoralSection, section, circuit);
      setCircuitCompleteObject(circuitData);
      setEstablishments(getEstablishmentsByCircuitObject(circuitData));
    } catch (error) {
      setError(true);
    } finally {
      setLoadingCircuitObject(false);
    }
  }, []);

  useEffect(() => {
    if (circuit && district && electoralSection && section && circuit) {
      getCircuitData(district.id, electoralSection.id, section.id, circuit.id);
    } else {
      setEstablishments([]);
    }
  }, [circuit, section, electoralSection, district]);

  const establishmentOnSelectionChange = useCallback(
    (establishmentID: Key) => {
      const selectedEstablishment = establishments.find((es) => es.id == establishmentID);
      if (selectedEstablishment) {
        setEstablishment({ id: establishmentID, value: selectedEstablishment.value });
      } else {
        setEstablishment(null);
      }
    },
    [establishments]
  );

  useEffect(() => {
    if (establishment && circuitCompleteObject) {
      setTables(getMesasByEstablishmentId(circuitCompleteObject, establishment.id));
    } else {
      setTables([]);
    }
  }, [establishment]);

  if (error) {
    return <div>Hubo un error, vuelve atras por favor</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="px-20 container mx-auto">
        <div className="w-150 flex flex-col gap-4 items-center">
          <span className="text-lg font-bold pt-4">Datos Electorales</span>

          <Autocomplete
            value={district?.value ?? ''}
            selectedKey={String(district?.id)}
            onSelectionChange={districtOnSelectionChange}
            defaultItems={Object.entries(distritos).map(([key, value]) => ({ id: key, value }))}
            label="Distrito"
            placeholder="Busca un Distrito"
            className="max-w-sm"
          >
            {(district) => <AutocompleteItem key={district.id}>{district.value}</AutocompleteItem>}
          </Autocomplete>
          {!loadingDistritoObject ? (
            <>
              <Autocomplete
                defaultInputValue={electoralSection?.value}
                defaultSelectedKey={String(electoralSection?.id)}
                onSelectionChange={electoralSectionOnSelectionChange}
                defaultItems={electoralSections}
                label="Seccion Electoral"
                placeholder="Busca una SeccionElectoral"
                className="max-w-sm"
              >
                {(electoralSection) => <AutocompleteItem key={electoralSection.id}>{electoralSection.value ?? 'Primera'}</AutocompleteItem>}
              </Autocomplete>
              <Autocomplete
                defaultInputValue={section?.value}
                defaultSelectedKey={String(section?.id)}
                onSelectionChange={sectionOnSelectionChange}
                defaultItems={sections}
                label="Seccion "
                placeholder="Busca una Seccion"
                className="max-w-sm"
              >
                {(section) => <AutocompleteItem key={section.id}>{section.value ?? 'Primera'}</AutocompleteItem>}
              </Autocomplete>
              <Autocomplete
                defaultInputValue={circuit?.value}
                defaultSelectedKey={String(circuit?.id)}
                onSelectionChange={circuitOnSelectionChange}
                defaultItems={circuits}
                label="Circuito "
                placeholder="Busca un Circuito"
                className="max-w-sm"
              >
                {(circuit) => <AutocompleteItem key={circuit.id}>{circuit.value ?? 'Primera'}</AutocompleteItem>}
              </Autocomplete>
              {!loadingCircuitObject ? (
                <Autocomplete
                  defaultInputValue={establishment?.value}
                  defaultSelectedKey={String(establishment?.id)}
                  onSelectionChange={establishmentOnSelectionChange}
                  defaultItems={establishments}
                  label="Establecimiento"
                  placeholder="Busca un Establecimiento"
                  className="max-w-sm"
                >
                  {(establishment) => <AutocompleteItem key={establishment.id}>{establishment.value ?? 'Primera'}</AutocompleteItem>}
                </Autocomplete>
              ) : (
                <CircularProgress aria-label="Loading..." />
              )}
            </>
          ) : (
            <CircularProgress aria-label="Loading..." />
          )}

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

        <div className="w-120 flex flex-col gap-4 pt-8 items-center">
          <span className="text-lg font-bold">Datos del Fiscal</span>
          <Input isRequired color="default" type="text" label="Nombre Completo" className="max-w-sm" />
          <div className="max-w-sm w-full pt-24">
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
