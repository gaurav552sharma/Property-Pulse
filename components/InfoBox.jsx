import Link from "next/link";

const InfoBox = ({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundColor,
}) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">{description}</p>
      <Link
        href={`${buttonLink}`}
        className={`inline-block text-white rounded-lg px-4 py-2 ${backgroundColor}`}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default InfoBox;
