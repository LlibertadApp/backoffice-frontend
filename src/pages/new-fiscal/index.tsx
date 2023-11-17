import { Input, Button } from '@nextui-org/react';
import { Navbar}  from '../../components/Navbar/Navbar';


const NewFiscal = () => {
    return (
        <div className='bg-black'>

            <div className=''>
            <Navbar />

            </div>
            <div className='container p-8 gap-4 '>

            Datos Electorales
            <div className='pt-4'>
            <Input type="" label="Distrito" />
            </div>
            <div className='pt-4'>
            <Input type="" label="Sección Electoral" />
            </div>
            <div className='pt-4'>

            <Input type="" label="Seccion" />
            </div>
            <div className='pt-4'>

            <Input type="" label="Municipio" />
            </div>
            <div className='pt-4'>

            <Input type="" label="Circuito" />
            </div>
            <div className='pt-4'>

            <Input type="" label="Establecimiento" />
            </div>
            <div className='pt-4'>
            <Input type="" label="Mesa" />
            </div>

            <div className='pt-4'>

            Datos del Fiscal
            </div>

            <div className='pt-4'>

            <Input type="" label="Nombre Completo" />
            </div>
            <div className='pt-4'>

            <Input type="" label="Email" />
            </div>
            <div className='pt-4 pb-4'>

            <Input type="" label="Telefono" />
            </div>
            <div>
            
            <Button type="submit" className="bg-[#646cff] w-full">
                <p className=''>
            Ingresar
                </p>
            </Button>
            </div>
            </div>
        </div>
    );
};

export default NewFiscal;
