import {
    Button,
    Chip,
    Input,
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
import { PlusIcon } from '../../assets/PlusIcon';
import { SearchIcon } from '../../assets/SearchIcon';

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
    const [filterValue, setFilterValue] = useState('');
    const hasSearchFilter = Boolean(filterValue);

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

                        <Link to={'/edit-fiscal'} className="text-black">
                            <Tooltip color="secondary" content="Editar Fiscal">
                                <span className="text-xl text-default-400 cursor-pointer active:opacity-50">
                                    <EditIcon />
                                </span>
                            </Tooltip>
                        </Link>

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

    const filteredItems = useMemo(() => {
        let filteredUsers = [...dummyFiscales];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((fiscal) => fiscal.fullName.toLowerCase().includes(filterValue.toLowerCase()));
        }

        return filteredUsers;
    }, [dummyFiscales, filterValue]);

    const onSearchChange = useCallback((value: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue('');
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue('');
        setPage(1);
    }, []);

    const [page, setPage] = useState(1);
    const rowsPerPage = 4;
    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems]);

    const topContent = useMemo(() => {
        return (
            <div className="flex justify-between gap-3 items-end ">
                <Input
                    size="sm"
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Buscar por nombre"
                    startContent={<SearchIcon />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />
                <Link to={'/new-fiscal'}>
                    <Button color="primary" size="lg" endContent={<PlusIcon />}>
                        Añadir Fiscal
                    </Button>
                </Link>
            </div>
        );
    }, [filterValue, dummyFiscales.length, onSearchChange, hasSearchFilter]);

    return (
        <div className="w-screen h-screen p-8 flex items-start justify-center">
            <Table
                aria-label="Example table with custom cells"
                topContent={topContent}
                topContentPlacement="outside"
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

            <DeleteFiscalModal onOpenChange={onOpenChange} isOpen={isOpen} fiscalID={deleteFiscalID} />
        </div>
    );
};

export default Dashboard;
