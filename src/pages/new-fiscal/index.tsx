import { Input, Button, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { useElectoralData } from '../../hooks/useElectoralData';
import { Link } from 'react-router-dom';

const NewFiscal = () => {
    const {
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
    } = useElectoralData();

    console.log('district', district);
    console.log('electoralSection', electoralSection);
    console.log('section', section);
    console.log('circuit', circuit);
    console.log('establishment', establishment);

    return (
        <div className="w-full flex flex-row  ">
            <div className="w-1/2 flex flex-col gap-4 ">
                <span>Datos Electorales</span>
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

            <div className=" w-1/2 flex flex-col gap-4 ">
                <span>Datos del Fiscal</span>
                <Input type="text" label="Nombre Completo" className="max-w-sm " />
                <Input type="email" label="Email" className="max-w-sm" />
                <Input type="text" label="Telefono" className="max-w-sm" />
                <Link to="/dashboard" className="max-w-sm">
                    <Button type="button" color="primary">
                        Crear Fiscal
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NewFiscal;
