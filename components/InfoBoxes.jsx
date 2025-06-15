import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            title="For Renters"
            description="Find your dream rental property. Bookmark properties and contact owners."
            buttonText="Browse Properties"
            buttonLink="/properties"
            backgroundColor="bg-black hover:bg-gray-600"
          />
          <InfoBox
            title="For Property Owners"
            description="List your properties and reach potential tenants. Rent as an airbnb or long term."
            buttonText="Add Property"
            buttonLink="/add-property"
            backgroundColor="bg-blue-500 hover:bg-blue-600"
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
