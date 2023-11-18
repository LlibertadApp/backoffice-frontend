import { Button, Input, Pagination, Snippet, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import { Key, useCallback, useEffect, useMemo, useState } from 'react';
import EditIcon from '../../assets/EditIcon';
import { dummyFiscales } from './data';
import { PlusIcon } from '../../assets/PlusIcon';
import { SearchIcon } from '../../assets/SearchIcon';
import { Fiscal, generateFiscalToken, getFiscales } from '../../services/fiscales';

const columns = [
  { name: 'Nombre', uid: 'fullName' },
  { name: 'Acciones', uid: 'actions' },
];

interface FiscalWithLink extends Fiscal {
  magicLink?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();

  const [fiscals, setFiscals] = useState<FiscalWithLink[]>([]);
  const [error, setError] = useState(false);

  const fetchFiscals = useCallback(async () => {
    try {
      console.log('fechando');
      const fiscales = await getFiscales();
      setFiscals(fiscales);
    } catch (error) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchFiscals();
  }, [fetchFiscals]);

  const onGenerateLink = useCallback(
    async (fiscalID: string) => {
      try {
        const generatedLink = await generateFiscalToken(/*fiscalID*/);
        setFiscals((prev) => prev.map((f) => (f.id === fiscalID ? { ...f, magicLink: generatedLink } : f)));
      } catch (error) {
        console.log(error);
        setError(true);
      }
    },
    [setFiscals]
  );

  const [filterValue, setFilterValue] = useState('');
  const hasSearchFilter = Boolean(filterValue);

  const renderCell = useCallback(
    (fiscal: FiscalWithLink, columnKey: Key) => {
      switch (columnKey) {
        case 'fullName':
          return <span>{fiscal.fullName}</span>;
        case 'actions':
          return (
            <div className="relative flex items-center gap-6">
              {fiscal.magicLink ? (
                <Snippet symbol="" codeString={fiscal.magicLink}>
                  Link
                </Snippet>
              ) : (
                <Button onClick={() => onGenerateLink(fiscal.id)}>Generar Link</Button>
              )}

              <Link to={'/edit-fiscal'} className="text-black">
                <Tooltip color="secondary" content="Editar Fiscal">
                  <span className="text-xl text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Tooltip>
              </Link>
            </div>
          );
      }
    },
    [onGenerateLink]
  );

  const filteredItems = useMemo(() => {
    let filteredUsers = [...fiscals];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((fiscal) => fiscal.fullName.toLowerCase().includes(filterValue.toLowerCase()));
    }

    return filteredUsers;
  }, [fiscals, filterValue]);

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
  const rowsPerPage = 9;
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

        <Button onClick={() => navigate('/new-fiscal')} type="button" color="secondary" size="lg" endContent={<PlusIcon />}>
          Añadir Fiscal
        </Button>
      </div>
    );
  }, [filterValue, dummyFiscales.length, onSearchChange, hasSearchFilter]);

  return (
    <div>
      <div className="bg-neutral-950 text-white">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <a href="/dashboard" className="px-4 text-xs-lg font-semibold tracking-widest p-4">
              LibertApp
            </a>

            <div className="flex items-center">
              <svg width="50" height="54" viewBox="0 0 50 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.892 40.0004C17.3607 38.3463 18.6186 37.3614 19.161 36.9847C17.8652 39.1176 17.7346 40.7527 
                                17.979 41.962C18.7486 45.7713 23.6567 47.4242 23.0881 49.6877C22.8989 50.4405 22.1846 50.9389 21.593 51.2469C21.963 50.8741 22.3955 50.3099 22.4173 49.6152C22.4775 47.6809 19.1392 47.259 17.5019 44.1468C17.1838 43.5418 16.3529 41.9028 16.892 39.9998V40.0004ZM32.2134 22.223C26.3516 18.1988 23.8096 11.9664 25.5535 7.32732C25.8979 6.41155 26.8806 4.30377 29.7423 2.54812C24.7678 4.18267 21.2956 7.53882 21.0657 11.2186C21.0188 11.9748 21.0936 12.9838 21.5668 14.1786C21.1594 14.0798 20.6488 13.88 20.2063 13.4626C19.2447 12.5563 18.9897 10.9904 19.5042 9.45072C18.4065 11.0842 18.2692 12.3755 18.3206 13.2003C18.5734 17.2563 24.0903 21.1733 32.2134 22.2235V22.223ZM28.7345 51.1548C27.7383 51.2564 27.0201 50.4009 26.8254 49.7095C26.5374 48.6877 27.2729 47.6586 28.076 47.172C29.0046 46.61 29.9923 46.792 30.2273 46.8416C28.9348 46.11 26.7126 46.8712 26.1306 48.0253C26.8326 44.9833 23.8453 44.7165 22.1103 42.2516C20.0076 39.5244 22.2437 37.2447 24.8733 36.2341C18.8691 37.0594 18.7508 41.5406 22.2526 45.0318C24.5083 46.9237 25.6674 48.2608 24.4598 50.8864C24.5262 50.8356 25.4336 50.1559 25.9955 50.4305C26.5385 50.6956 26.7489 51.8474 26.0307 53.1371C26.5134 53.079 27.2032 52.9719 28.014 52.7581C29.2228 52.4395 29.8344 52.2704 30.1988 51.7977C30.8093 51.0058 30.4617 49.8802 30.345 49.5465C30.2161 50.4165 29.5258 51.0745 28.7339 51.1554L28.7345 51.1548ZM45.8026 26.7616C45.6324 26.6735 45.3389 26.4932 45.0928 26.1645C44.7686 25.732 44.7144 25.2934 44.7027 25.1036C44.0235 25.3196 43.5765 25.9876 44.1106 26.7538C44.6748 26.7566 45.239 26.7594 45.8026 26.7616ZM49.1722 28.4944C48.9406 27.9235 48.3708 27.3945 48.1833 27.0647C47.5968 26.3431 47.7145 25.0713 47.7207 24.8849C47.7475 24.0567 46.2865 22.5952 39.5864 19.8205C39.8342 20.2569 40.0826 20.6933 40.3303 21.1292C38.7655 20.5516 36.732 19.6269 34.6036 18.1346C32.729 16.8204 31.3289 15.4493 30.3288 14.3164C31.0605 15.6033 32.2653 17.3584 34.1822 19.0404C37.0277 21.5377 40.0212 22.6264 41.7444 23.1131C41.7031 22.7341 41.6613 22.3547 41.62 21.9757C44.0364 22.9244 47.4255 24.2219 46.4215 26.8487C48.2 27.6467 48.9188 29.567 47.6559 30.7473C46.7976 27.5256 41.8488 27.5792 39.914 28.6992C43.4309 27.9553 46.5119 28.8739 46.9433 32.1703C47.8875 31.9856 49.8591 30.389 49.1722 28.495V28.4944ZM31.3557 47.2512C32.2117 47.1887 33.2519 48.3216 32.5912 49.3741C34.2933 48.5722 32.9489 46.2635 31.3557 47.2512ZM29.4527 47.6285C30.2608 47.624 31.7893 48.6386 31.6676 49.969C32.9338 48.5063 31.3211 46.8332 29.4527 47.6285ZM14.749 45.5235C14.4806 44.3092 14.1229 41.9218 14.8578 39.0707C15.5258 36.4802 16.7921 34.6855 17.5644 33.7435C16.6927 34.4505 13.9303 36.5042 9.8783 36.5901C4.71628 36.6995 1.3551 33.5325 0.721152 32.912C1.56772 33.9779 4.06893 36.8306 8.299 37.7821C10.2288 38.2163 11.9119 38.1181 13.0855 37.9395C13.0274 38.497 13.0023 39.1086 13.033 39.7649C13.1502 42.2739 14.0263 44.2578 14.749 45.524V45.5235ZM11.3226 14.9386C10.9375 17.3952 11.3393 19.4455 11.697 20.6911C11.2528 20.5923 10.7115 20.4031 10.1808 20.0337C8.32077 18.739 8.20301 16.3544 8.19018 15.98C8.12265 16.6563 7.67342 21.9663 11.3549 25.2677C15.2027 28.7176 22.0529 28.6205 27.0726 24.2208C26.0134 24.1092 19.358 23.3056 16.0298 17.9806C15.902 17.7764 15.7234 17.48 15.5309 17.0978C15.1028 16.2456 14.5989 14.9677 14.4454 13.3566C14.134 10.0919 15.4628 7.60299 16.0359 6.65709C15.0582 7.49808 12.0491 10.3062 11.3231 14.9381L11.3226 14.9386ZM24.3682 34.6961C26.7104 34.0504 28.6491 33.8958 30.0437 33.8858C32.3049 33.8696 33.5979 34.2301 34.5059 33.3495C35.3915 32.4906 34.8787 31.4515 35.6812 30.0413C36.4736 28.6484 37.9329 27.9765 39.0557 27.6255C36.2694 27.9966 34.9775 29.0234 34.315 29.9297C33.5644 30.956 33.7715 31.624 32.9132 32.3333C31.7452 33.2993 30.5275 32.7512 28.2707 33.1642C27.346 33.3333 25.9732 33.7133 24.3682 34.6966V34.6961ZM2.87413 24.8073C2.82335 25.9458 2.89534 26.9815 3.02369 27.8889C2.75359 27.8649 2.33282 27.7929 1.878 27.558C1.20889 27.212 0.840018 26.7069 0.679856 26.4541C0.673717 27.4575 0.831647 28.9994 1.80601 30.3661C4.16938 33.6804 9.35652 33.1904 11.0279 33.0325C14.0258 32.749 16.3936 31.5849 17.9936 30.5386C17.6492 30.6072 11.8929 31.6463 7.79284 27.2683C3.75475 22.9568 5.0673 17.3874 5.16217 17.0129C4.23412 18.6508 3.02704 21.3485 2.87358 24.8073H2.87413ZM19.4211 3.99739C19.8145 4.28702 20.1616 4.93716 19.9908 6.50418C20.3374 5.74802 21.1276 4.29651 22.7259 3.08553C24.7187 1.57543 26.7852 1.33491 27.6144 1.28356C25.7957 0.878973 23.4413 0.643473 20.8173 1.14851C11.6959 2.9036 7.47085 12.0345 6.91781 13.279C7.62208 12.1428 8.72201 10.573 10.3337 8.95405C13.0358 6.23966 17.7759 2.78529 19.4216 3.99739H19.4211Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 lg:p-8 flex flex-col items-start justify-center">
        <Table aria-label="Example table with custom cells" topContent={topContent} topContentPlacement="outside">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={items} loadingState={error ? 'error' : 'idle'}>
            {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full justify-center pt-4">
        <Pagination isCompact showControls showShadow color="secondary" page={page} total={pages} onChange={(page) => setPage(page)} />
      </div>
    </div>
  );
};

export default Dashboard;
