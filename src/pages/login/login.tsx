import { Button } from '@nextui-org/react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { ILoginProps } from './types';


export const LoginPage = () => {
  const validationSchema = yup.object({
    email: yup.string().email('Email inválido').required('Campo requerido'),
    password: yup.string().required('Campo requerido'),
  });

  const initialValues: ILoginProps = {
    email: '',
    password: '',
    isPasswordVisible: false,
  };

  const onLogin = () => {
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log('Formulario enviado:');
     // Importante para indicar que la operación ha terminado
  };

  return (
    <div className="px-4 mx-auto flex flex-col items-center max-w-md bg-black">
      <img
        src="../../../public/fenix-new.svg"
        alt="fenix"
        className="object-cover h-auto w-28 mb-10 mt-24 pt-12"
      />
      <h1 className="text-[32px] font-light text-center whitespace-pre-line">
        Entre todos, <br />
        <strong className="text-violet-brand font-semibold break-words">
          evitemos el fraude.
        </strong>
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onLogin}
      >
        <Form className="w-full mt-16 flex flex-col gap-8">
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-sm font-medium text-gray-400">
              Correo Electrónico
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 border rounded-md"
            />
            <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="text-sm font-medium text-gray-400">
              Contraseña
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 border rounded-md"
            />
            <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
          </div>
          <Button type="submit" className="bg-[#646cff]">
            Ingresar
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
