import React, { useState } from "react";
import "./SignatureConfig.scss";
function SignatureConfig() {
  //create the dummy data for the signature
  const data = [
    {
      id: 1,
      name: "Firstname",
    },
    {
      id: 2,
      name: "Lastname",
    },
    {
      id: 3,
      name: "student ID",
    },
    {
      id: 4,
      name: "Address",
    },
    {
      id: 5,
      name: "Title",
    },
    {
      id: 6,
      name: "Date",
    },
    {
      id: 7,
      name: "Age",
    },
    {
      id: 8,
      name: "Signature",
    },
  ];

  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    //setSelectedSubCats(isChecked && ((prev) => ({ ...prev, value })))
    //array can use the ...selectedSubCats, but not for object. object
    //need to use the previos state since it will override the value
    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };
  return (
    <div className="signature">
      <div className="header">Signature Configuration</div>
      <div className="container">
        <div className="box-list">
          {data?.map((item) => {
            return (
              <div className="inputItem" key={item.id}>
                <input
                  type="checkbox"
                  disabled={
                    item.id === 1 ||
                    item.id === 2 ||
                    item.id === 8 ||
                    item.id === 6
                      ? true
                      : false
                  }
                  defaultChecked={
                    item.id === 1 ||
                    item.id === 2 ||
                    item.id === 8 ||
                    item.id === 6
                      ? true
                      : false
                  }
                  id={item.id}
                  value={item.name}
                  onChange={handleChange}
                />
                <label htmlFor={item.id}>{item.name}</label>
              </div>
            );
          })}
        </div>
      </div>

      {selectedSubCats}
    </div>
  );
}

export default SignatureConfig;
