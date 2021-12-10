import ClickAndEditBtn from "components/Ui/ClickAndEditBtn";
import DecoratedText from "components/Ui/DecoratedText";
import MinimalUserCard from "components/Ui/MinimalUserCard";
import React from "react";

function FacilityItem({
  title,
  description,
  coverImageUri,
  users,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex overflow-hidden bg-white border-transparent rounded-lg shadow-lg">
      <div className="flex flex-col flex-grow p-5 text-gray-700 bg-teal-50">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="flex-grow">
          <p className="text-sm">{description}</p>
        </div>
        {coverImageUri && <div className="flex-grow-0">
          <DecoratedText title="Cover Image Link" text={coverImageUri} />
        </div>}
        <div className="flex">
          <div className="flex flex-wrap flex-grow text-xs">
            {/* USER Card  */}
            {users.map((user) => (
              <MinimalUserCard
                key={user.name}
                name={user.name}
                description={user.description}
              />
            ))}
          </div>
          <div className="flex-shrink-0 mt-auto">
            <ClickAndEditBtn onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilityItem;
