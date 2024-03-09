import LogoImage from "@/assets/logo.png";

const Logo = () => {
  return (
    <div className="logo flex items-center bg-slate-700 pr-4 pl-1 mb-3 rounded-[0.5rem]">
      <img src={LogoImage} className="h-10 w-10" alt="logo" />
      <p>medimind</p>
    </div>
  );
};

export default Logo;
