import { Input, Button, Autocomplete, AutocompleteItem } from '@nextui-org/react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  getDistritos,
  getElectoralSectionsByDistritoId,
  getSectionsByElectoralSectionId,
  getCircuitBySectionId,
  getEstablishmentByCircuitId,
} from './helpers';

import { Navbar } from '../../components/Navbar/Navbar';

// import { ElectoralSection, Section, Circuit, Establishment } from '../../entities/ElectoralData';
// import { Key, useEffect, useMemo, useState } from 'react';
// type KeyOrNull = Key | null;

import { Key, useEffect, useMemo } from 'react';

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
  } = useFiscal();
  
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/dashboard');
  };

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

  console.log('district', district);
  console.log('electoralSection', electoralSection);
  console.log('section', section);
  console.log('circuit', circuit);
  console.log('establishment', establishment);

  return (
    <div>
      <Navbar />
      <div className="px-20 container mx-auto">
        <div className="w-150 flex flex-col gap-4 items-center">
          <span className="text-lg font-bold pt-4">Datos Electorales</span>
          <Autocomplete
            selectedKey={String(district)}
            onSelectionChange={districtOnSelectionChange}
            defaultItems={districts}
            label="Distrito"
            placeholder="Busca un Distrito"
            className="max-w-sm"
          >
            {(district) => <AutocompleteItem key={district.distrito_id}>{district.distrito_nombre}</AutocompleteItem>}
          </Autocomplete>
          <Autocomplete
            onSelectionChange={electoralSectionOnSelectionChange}
            defaultItems={electoralSections}
            label="Seccion Electoral"
            placeholder="Busca una SeccionElectoral"
            className="max-w-sm"
          >
            {(electoralSection) => (
              <AutocompleteItem key={electoralSection.seccionprovincial_id}>
                {electoralSection.seccionprovincial_nombre ?? 'Primera'}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            onSelectionChange={sectionOnSelectionChange}
            defaultItems={sections}
            label="Seccion "
            placeholder="Busca una Seccion"
            className="max-w-sm"
          >
            {(section) => <AutocompleteItem key={section.seccion_id}>{section.seccion_nombre ?? 'Primera'}</AutocompleteItem>}
          </Autocomplete>
          <Autocomplete
            onSelectionChange={circuitOnSelectionChange}
            defaultItems={circuits}
            label="Circuito "
            placeholder="Busca un Circuito"
            className="max-w-sm"
          >
            {(circuit) => <AutocompleteItem key={circuit.circuito_id}>{circuit.circuito_nombre ?? 'Primera'}</AutocompleteItem>}
          </Autocomplete>
          <Autocomplete
            onSelectionChange={establishmentOnSelectionChange}
            defaultItems={establishments}
            label="Establecimiento"
            placeholder="Busca un Establecimiento"
            className="max-w-sm"
          >
            {(establishment) => <AutocompleteItem key={establishment.id_colegio}>{establishment.colegio ?? 'Primera'}</AutocompleteItem>}
          </Autocomplete>
        </div>

        <div className="w-120 flex flex-col gap-4 pt-8 items-center">
          <span className="text-lg font-bold">Datos del Fiscal</span>
          <Input isRequired color="secondary" type="text" label="Nombre Completo" className="max-w-sm" />
          <Input isRequired color="secondary" type="email" label="Email" className="max-w-sm" />
          <Input isRequired color="secondary" type='text' label="Telefono" className="max-w-sm" />
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
