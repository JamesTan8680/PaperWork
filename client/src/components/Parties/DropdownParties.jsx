import React, { useState } from "react";
import "./DropdownParties.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import uuid from "react-uuid";

export default function DropdownParties({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const [showAdditionalDropdown, setShowAdditionalDropdown] = useState(false);
  const [id, setId] = useState(null); // Declare the id use state and initialize it NULL
  const [data, setData] = useState([
    {
      id: uuid(),
      number: 1,
      selectedOption: selected, //Manage the selected option state seperately for each dropdown item
    },
  ]);
  const options = ["JunDa", "Ching", "Thang"];

  const availableOptions = options.filter((option) => {
    return !data.some((item) => item.selectedOption === option);
  });

  const handleAddButtonClick = () => {
    setShowAdditionalDropdown(!showAdditionalDropdown);
    const obj = { id: uuid(), selectedOption: "Select Parties Name" };
    setData([...data, obj]);
  };

  const handleDropdownButtonClick = (id) => {
    setIsActive(!isActive);
    setId(id); // Update the id state when a dropdown is clicked
  };

  //Responsible for updating the selected option for specific dropdown item
  const handleOptionClick = (option, id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, selectedOption: option } : item
    );
    setData(updatedData);
    setSelected(option);
    setIsActive(false);
  };

  const handleRemoveButtonClick = (remove_id) => {
    if (data.length === 1) return; //only one dropdown left, don't allow removal

    const updatedData = data.filter((item) => item.id !== remove_id);
    setData(updatedData);

    // If the removed dropdown's id matches the active dropdown's id, reset isActive and id state
    if (id === remove_id) {
      setIsActive(false);
      setId(null);
    }
  };

  return (
    <div className="dropdown">
      {data?.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <div className="dropdown-container">
              <div
                className="dropdown-btn"
                onClick={(e) => handleDropdownButtonClick(item.id)}
              >
                {item.selectedOption}
                <span
                  className="fas fa-caret-down dropdown-icon"
                  aria-hidden="true"
                ></span>
              </div>

              <button className="add" onClick={handleAddButtonClick}>
                ADD
              </button>
              <button
                className="remove"
                onClick={() => handleRemoveButtonClick(item.id)}
              >
                Remove
              </button>
            </div>

            {isActive && item.id === id && (
              <div className="dropdown-content">
                {availableOptions.map((option) => (
                  <div
                    key={option}
                    onClick={(e) => handleOptionClick(option, item.id)}
                    className="dropdown-item"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
