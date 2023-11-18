import { Input, Button, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import {
  getDistritos,
  getElectoralSectionsByDistritoId,
  getSectionsByElectoralSectionId,
  getCircuitBySectionId,
  getEstablishmentByCircuitId,
} from './helpers';
import { Navbar } from '../../components/Navbar/Navbar';
import { ElectoralSection, Section, Circuit, Establishment } from '../../entities/ElectoralData';
import { Key, useEffect, useMemo, useState } from 'react';
import { getDistritoById } from '../../services/mesas';

type KeyOrNull = Key | null;

const EditarFiscal = () => {
  const [district, setDistrict] = useState<KeyOrNull>(null);
  const [electoralSections, setElectoralSections] = useState<ElectoralSection[]>([]);
  const [electoralSection, setElectoralSection] = useState<KeyOrNull>(null);
  const [section, setSection] = useState<KeyOrNull>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [circuit, setCircuit] = useState<KeyOrNull>(null);
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [establishment, setEstablishment] = useState<KeyOrNull>(null);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);

  useEffect(() => {
    getDistritoById(1);
  }, []);

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

  const EditFiscal = () => {
    console.log('fiscal editadoo');
  };

  return (
    <div className="justify-center">
      <Navbar />

      <div className="text-xl items-center px-20 pt-2">
        <p className="text-bold text-3xl">Editando Fiscal</p>
      </div>

      <div className="px-8 container pt-4">
        <div className="w-150 flex flex-col gap-4  ">
          <span className="text-lg font-bold pt-4">Datos Electorales</span>
          <Autocomplete
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

        <div className="w-120 flex flex-col gap-4 pt-4">
          <span className="text-lg font-bold">Datos del Fiscal</span>
          <Input type="text" label="Nombre Completo" className="max-w-sm " />
          <Input type="email" label="Email" className="max-w-sm" />
          <Input type="text" label="Telefono" className="max-w-sm" />
          <Link to="/dashboard" className="max-w-sm">
            <Button type="button" color="secondary" className="w-full" onClick={() => EditFiscal}>
              Editar Fiscal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditarFiscal;
