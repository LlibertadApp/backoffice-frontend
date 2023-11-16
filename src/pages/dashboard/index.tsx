import {
    Accordion,
    AccordionItem,
    Button,
    Chip,
    Snippet,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    useDisclosure,
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import DeleteFiscalModal from './deleteFiscalModal';
import { useCallback, useState } from 'react';
import EditIcon from '../../assets/EditIcon';
import DeleteIcon from '../../assets/DeleteIcon';

const columns = [
    { name: 'Nombre Completo', uid: 'fullName' },
    { name: 'Email', uid: 'email' },
    { name: 'Telefono', uid: 'phone' },
    { name: 'Estado', uid: 'status' },
    { name: 'Acciones', uid: 'actions' },
];

interface Fiscal {
    fullName: string;
    magicLink: string;
    id: string;
    status: string;
    email: string;
    phone: string;
}

const dummyFiscales = [
    {
        fullName: 'Ignacio Vazquez',
        magicLink:
            'https://app.dev.libertapp.net/?authToken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTcwMDExMDgzOSwiZXhwIjoxNzAwMTE0NDM5LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1rNW5jdUBsaWJlcnRhcHAtZGV2LTRlYzhmLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstazVuY3VAbGliZXJ0YXBwLWRldi00ZWM4Zi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6ImI0NmY5MDRkLWFjNjgtNDVkMi1hMGM5LTc2MWFmMGZhY2Y5ZCIsImNsYWltcyI6eyJtZXNhcyI6W3sibWVzYUlkIjoiMDAwMDEifSx7Im1lc2FJZCI6IjAwMDAyIn0seyJtZXNhSWQiOiIwMDAwMyJ9LHsibWVzYUlkIjoiMDAwMDQifSx7Im1lc2FJZCI6IjAwMDA1In1dfX0.E75bnM2hIfrleNZUtK-GShln38O1TXgxpb60-LV2mcEsM0pxMk9p7xNWZdeblyQ12opL6zAlU9dCouWhGPVS0gej9JfliPrUeJ9LlcRJyvCkUnxL8OyHtFmFLSGzej0WdD-YLWWv2MuSYNA9XARFZgmI3r7eKTfwRWAewZPZCRRxAI0kzI4uF24pa3XIK6p5hDjBnJG00QAu2L_DtVTiVL1eUsg31jQAYOl4SLcIzV1kxJy5HWHDebUVwn-jlKiMTS1pNV6zO4A2Id_1nP28xARu8V2xxwBbA6UouYkB_6uWiVHQwtmQ3WNcyIhmDKBf_L4aqJWBziTIiUCeIQFAYw',
        id: '0323-12343-1234-00123B',
        status: 'registered',
        email: 'ignasave39@gmail.com',
        phone: '1203120312',
    },
    {
        fullName: 'Leila Gonzalez',
        magicLink:
            'https://app.dev.libertapp.net/?authToken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTcwMDExMDgzOSwiZXhwIjoxNzAwMTE0NDM5LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1rNW5jdUBsaWJlcnRhcHAtZGV2LTRlYzhmLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstazVuY3VAbGliZXJ0YXBwLWRldi00ZWM4Zi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6ImI0NmY5MDRkLWFjNjgtNDVkMi1hMGM5LTc2MWFmMGZhY2Y5ZCIsImNsYWltcyI6eyJtZXNhcyI6W3sibWVzYUlkIjoiMDAwMDEifSx7Im1lc2FJZCI6IjAwMDAyIn0seyJtZXNhSWQiOiIwMDAwMyJ9LHsibWVzYUlkIjoiMDAwMDQifSx7Im1lc2FJZCI6IjAwMDA1In1dfX0.E75bnM2hIfrleNZUtK-GShln38O1TXgxpb60-LV2mcEsM0pxMk9p7xNWZdeblyQ12opL6zAlU9dCouWhGPVS0gej9JfliPrUeJ9LlcRJyvCkUnxL8OyHtFmFLSGzej0WdD-YLWWv2MuSYNA9XARFZgmI3r7eKTfwRWAewZPZCRRxAI0kzI4uF24pa3XIK6p5hDjBnJG00QAu2L_DtVTiVL1eUsg31jQAYOl4SLcIzV1kxJy5HWHDebUVwn-jlKiMTS1pNV6zO4A2Id_1nP28xARu8V2xxwBbA6UouYkB_6uWiVHQwtmQ3WNcyIhmDKBf_L4aqJWBziTIiUCeIQFAYw',
        id: '0323-12343-1234-00123A',
        status: 'registered',
        email: 'leilagonzalez@gmail.com',
        phone: '1203120312',
    },
    {
        fullName: 'Laura Rodriguez',
        magicLink:
            'https://app.dev.libertapp.net/?authToken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTcwMDExMDgzOSwiZXhwIjoxNzAwMTE0NDM5LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1rNW5jdUBsaWJlcnRhcHAtZGV2LTRlYzhmLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstazVuY3VAbGliZXJ0YXBwLWRldi00ZWM4Zi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6ImI0NmY5MDRkLWFjNjgtNDVkMi1hMGM5LTc2MWFmMGZhY2Y5ZCIsImNsYWltcyI6eyJtZXNhcyI6W3sibWVzYUlkIjoiMDAwMDEifSx7Im1lc2FJZCI6IjAwMDAyIn0seyJtZXNhSWQiOiIwMDAwMyJ9LHsibWVzYUlkIjoiMDAwMDQifSx7Im1lc2FJZCI6IjAwMDA1In1dfX0.E75bnM2hIfrleNZUtK-GShln38O1TXgxpb60-LV2mcEsM0pxMk9p7xNWZdeblyQ12opL6zAlU9dCouWhGPVS0gej9JfliPrUeJ9LlcRJyvCkUnxL8OyHtFmFLSGzej0WdD-YLWWv2MuSYNA9XARFZgmI3r7eKTfwRWAewZPZCRRxAI0kzI4uF24pa3XIK6p5hDjBnJG00QAu2L_DtVTiVL1eUsg31jQAYOl4SLcIzV1kxJy5HWHDebUVwn-jlKiMTS1pNV6zO4A2Id_1nP28xARu8V2xxwBbA6UouYkB_6uWiVHQwtmQ3WNcyIhmDKBf_L4aqJWBziTIiUCeIQFAYw',
        id: '0323-12343-1234-00123C',
        status: 'pending',
        email: 'laverodriguez@gmail.com',
        phone: '1203120312',
    },
];

const statusColorMap = {
    registered: 'success',
    pending: 'danger',
};

const Dashboard = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [deleteFiscalID, setDeleteFiscalID] = useState<string>('');
    const openDeleteFiscal = (fiscalID: string) => {
        setDeleteFiscalID(fiscalID);
        onOpen();
    };
    //TODO: inferir el tipo de key de fiscal
    const renderCell = useCallback((fiscal: Fiscal, columnKey: string) => {
        const cellValue = fiscal[columnKey];

        switch (columnKey) {
            case 'name':
                return <span>{fiscal.fullName}</span>;
            case 'status':
                return (
                    <Chip className="capitalize" color={statusColorMap[fiscal.status]} variant="flat">
                        {cellValue}
                    </Chip>
                );
            case 'actions':
                return (
                    <div className="relative flex items-center gap-2">
                        <Snippet symbol="" codeString={fiscal.magicLink}>
                            Copiar Link
                        </Snippet>
                        <Tooltip content="Editar Fiscal">
                            <Link to={'/edit-fiscal'}>
                                <span className="text-xl text-default-400 cursor-pointer active:opacity-50">
                                    <EditIcon />
                                </span>{' '}
                            </Link>
                        </Tooltip>
                        <Tooltip color="danger" content="Eliminar Fiscal">
                            <span className="text-xl text-danger cursor-pointer active:opacity-50" onClick={() => openDeleteFiscal(fiscal.id)}>
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="flex items-center justify-center flex-col">
            <span>Dashboard</span>
            <Link to={'/new-fiscal'}>
                <Button color="primary">+ Añadir Fiscal</Button>
            </Link>
            <div>
                Fiscales
                <Table aria-label="Example table with custom cells">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={dummyFiscales}>
                        {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
                    </TableBody>
                </Table>
            </div>
            <DeleteFiscalModal onOpenChange={onOpenChange} isOpen={isOpen} fiscalID={deleteFiscalID} />
        </div>
    );
};

export default Dashboard;
