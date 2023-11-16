import { Input, Button } from '@nextui-org/react';

const NewFiscal = () => {
    return (
        <div>
            Datos Electorales
            <Input type="" label="Distrito" />
            <Input type="" label="Sección Electoral" />
            <Input type="" label="Seccion" />
            <Input type="" label="Municipio" />
            <Input type="" label="Circuito" />
            <Input type="" label="Establecimiento" />
            <Input type="" label="Mesa" />
            Datos del Fiscal
            <Input type="" label="Nombre Completo" />
            <Input type="" label="Email" />
            <Input type="" label="Telefono" />
            <Button color="primary">Crear Fiscal </Button>
        </div>
    );
};

export default NewFiscal;
