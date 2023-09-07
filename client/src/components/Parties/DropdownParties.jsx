import React, { useState, useEffect } from "react";
import "./DropdownParties.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import uuid from "react-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import TooltipDropdownParties from "./TooltipDropdownParties";
import axios from "axios";
import { useFetcher } from "react-router-dom";
export default function DropdownParties({
  parties, setParties
}) {
  
  const [isActive, setIsActive] = useState(false);
  const [showAdditionalDropdown, setShowAdditionalDropdown] = useState(false);
  const [id, setId] = useState(null); // Declare the id use state and initialize it NULL
  // Dummy Data
  // const tooltipMessages = {
  //   JunDa: "Name: JunDa\nCompany: H&M\nEmail: junda8680@gmail.com",
  //   Ching: "Name: Ching\nCompany: Md\nEmail: ching@gmail.com",
  //   Thang: "Name: Thang\nCompany: ABC Pty Ltd Company\nEmail: thang@abc.com",
  // };
  const [partiesData, setPartiesData] = useState([]);
  const [partyList, setPartyList] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [selectedList, setSelectedList] = useState([]);

  const fetchParties = async() => {
    // Fetch data from database
    axios
      .get("http://localhost:8800/parties")
      .then((response) => {
        setPartiesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // const savedData = localStorage.getItem("items");
    // if (savedData) {
    //   setPartyList(JSON.parse(savedData));
    // }

    localStorage.removeItem("items");
  };


  useEffect(()=>{
    setPartyList(parties.map((item)=>{
      let item2 = {...item};
      item2.id = uuid();
      item2.selectedOption = item.parties_name;
      return item2;
    }))
  },[parties, partiesData]);

  useEffect(()=>{
    fetchParties();
  },[]);

  useEffect(()=>{
    if (partyList.length == 0) handleAddButtonClick();
  },[partyList])



  const availableOptions = partiesData?.filter((party) => {
    return !partyList.some(
      (item) => item.selectedOption === party.parties_name
    );
  });

  const handleAddButtonClick = () => {
    setShowAdditionalDropdown(!showAdditionalDropdown);
    const obj = { id: uuid(), selectedOption: "Select Parties Name" };
    setPartyList([...partyList, obj]);
  };

  const handleDropdownButtonClick = (id) => {
    setIsActive(!isActive);
    setId(id); // Update the id state when a dropdown is clicked
  };

  //Responsible for updating the selected option for specific dropdown item
  const handleOptionClick = (option, parties_id, parties_email, id) => {
    const updatedData = partyList?.map((item) =>
      item.id === id
        ? {
            ...item,
            selectedOption: option,
            parties_email: parties_email,
            parties_id: parties_id,
          }
        : item
    );
    setPartyList(updatedData);
    setSelected(option);
    setIsActive(false);
    console.log(parties_id);
    console.log(parties_email);

    // Update local storage with the updated data
    localStorage.setItem("items", JSON.stringify(updatedData));
    setSelected(option);
    console.log(id);

    setSelectedList((prevParties) => {
      // Check if the party is already added to avoid duplicates
      if (!prevParties.includes(option)) {
        return [...prevParties, option];
      }
      return prevParties;
    });
  };
  //console.log(partyList);
  const handleRemoveButtonClick = (remove_id) => {

    if (partyList?.length === 1) return; //only one dropdown left, don't allow removal
    const updatedData = partyList?.filter((item) => item.id !== remove_id);
    setPartyList(updatedData);

    //Update local storage with updated data after removal
    localStorage.setItem("items", JSON.stringify(updatedData));

    // If the removed dropdown's id matches the active dropdown's id, reset isActive and id state
    if (id === remove_id) {
      setIsActive(false);
      setId(null);
    }

    const partyToRemove = partyList?.find(
      (item) => item.parties_id === remove_id
    );

    if (partyToRemove)
    setPartyList((prevParties) =>
      prevParties.filter((party) => {
        console.log(partyToRemove != party);
        return party != partyToRemove
      })
    );
  };

  return (
    <div className="dropdown">
      {partyList?.map((item) => {
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
                {availableOptions.map((party) => (
                  <TooltipDropdownParties
                    text={`ABN: ${party.abn}\nAddress: ${party.parties_address}\nEmail: ${party.parties_email}`}
                    key={party.parties_id}
                  >
                    <div
                      onClick={(e) =>
                        handleOptionClick(
                          party.parties_name,
                          party.parties_id,
                          party.parties_email,
                          item.id
                        )
                      }
                      className="dropdown-item"
                    >
                      {party.parties_name}
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        style={{ color: "#4CC9CF", marginLeft: "1em" }}
                      />
                    </div>
                  </TooltipDropdownParties>
                ))}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
