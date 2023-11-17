import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl tracking-widest leading-10 my-2">Error 404</h1>
      <p className="text-xl">La página que estás buscando no existe.</p>
      <Button type="button" color="default" size="lg" className="my-4 max-w-xs" onClick={handleClick}>
        Volver a inicio
      </Button>
    </div>
  );
};

export default NotFoundPage;
