import { Input, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate('dashboard');
    };

    return (
        <div className="flex items-center justify-center flex-col max-w-md">
            <span>Iniciar Sesion</span>
            <Input type="email" label="Email" className="mt-4 mb-2" />
            <Input type="password" label="Contraseña" className="mt-2 mb-2" />
            <Button onClick={onClick} color="primary" className="mt-2">
                Enviar
            </Button>
        </div>
    );
};

export default Login;
