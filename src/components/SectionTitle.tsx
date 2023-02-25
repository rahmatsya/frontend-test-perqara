import { BasicProps } from "../definitions";

const SectionTitle = (p: BasicProps): JSX.Element => {
  return (
    <div className={`relative ${p.className}`}>
        <div className="border-2 border-red w-20 mb-3"></div>
      <h2 className="text-3xl font-semibold">{p.children}</h2>
    </div>
  );
};

export default SectionTitle;
