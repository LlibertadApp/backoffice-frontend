import {
    Button,
    Chip,
    Pagination,
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
import { Key, useCallback, useMemo, useState } from 'react';
import EditIcon from '../../assets/EditIcon';
import DeleteIcon from '../../assets/DeleteIcon';
import { dummyFiscales } from './data';
import { Fiscal } from '../../entities/Fiscal';

const columns = [
    { name: 'Nombre Completo', uid: 'fullName' },
    { name: 'Email', uid: 'email' },
    { name: 'Telefono', uid: 'phone' },
    { name: 'Estado', uid: 'status' },
    { name: 'Acciones', uid: 'actions' },
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

    const renderCell = useCallback((fiscal: Fiscal, columnKey: Key) => {
        const cellValue = fiscal[columnKey as keyof typeof fiscal];

        switch (columnKey) {
            case 'name':
                return <span>{fiscal.fullName}</span>;
            case 'email':
                return <span>{fiscal.email}</span>;
            case 'phone':
                return <span>{fiscal.phone}</span>;
            case 'status':
                return (
                    <Chip className="capitalize" color={statusColorMap[fiscal.status] as 'success' | 'danger'} variant="flat">
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
                                </span>
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

    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(dummyFiscales.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return dummyFiscales.slice(start, end);
    }, [page]);

    return (
        <div className="flex items-center justify-center flex-col">
            <span>Dashboard</span>
            <Link to={'/new-fiscal'}>
                <Button color="primary">+ Añadir Fiscal</Button>
            </Link>
            <div>
                Fiscales
                <Table
                    aria-label="Example table with custom cells"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={items}>
                        {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
                    </TableBody>
                </Table>
            </div>
            <DeleteFiscalModal onOpenChange={onOpenChange} isOpen={isOpen} fiscalID={deleteFiscalID} />
        </div>
    );
};

export default Dashboard;
