import logo from '../../../public/lla-min.svg';


const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-black w-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-violet-500 border-solid border-t-blue-500"></div>
      <img src={logo} alt="Logo Loader" className="absolute h-16 w-16" />
    </div>
  );
};

export default Loader;
