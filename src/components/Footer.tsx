import Logo from "./../assets/images/MoovieTime-Logo.svg";

const Footer = () => {
  return (
    <div className="bg-black/60 container py-16 flex justify-between">
      <div className="text-gray">
        &copy; {new Date().getFullYear()} MoovieTime. All rights reserved
      </div>
      <img
        src={Logo}
        className="opacity-30"
        style={{ filter: "saturate(0)" }}
        alt=""
      />
      <div className="text-gray">{`Made with {React, Ts and Tailwind}`}</div>
    </div>
  );
};

export default Footer;
