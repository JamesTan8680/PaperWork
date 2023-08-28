import React, { useState } from "react";
import "./SignatureConfig.scss";
function SignatureConfig({ savedItem, setSaveItem }) {
  //create the dummy data for the signature
  const data = [
    {
      id: 1,
      name: "firstname",
    },
    {
      id: 2,
      name: "lastname",
    },
    {
      id: 3,
      name: "student_id",
    },
    {
      id: 4,
      name: "address",
    },
    {
      id: 5,
      name: "title",
    },
    {
      id: 6,
      name: "date",
    },
    {
      id: 7,
      name: "age",
    },
    {
      id: 8,
      name: "signature",
    },
    {
      id: 9,
      name: "email",
    },
  ];
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  // useEffect(() => {
  //   if (localStorage.getItem("subCat") !== null) {
  //     setSaveItem(JSON.parse(localStorage.getItem("subCat")));
  //   }
  // }, []);

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

    setSaveItem(
      isChecked
        ? [...savedItem, value]
        : savedItem.filter((item) => item !== value)
    );
  };

  //function to handle on blur
  const handleBlur = (e) => {
    // localStorage.setItem("subCat", JSON.stringify(savedItem));
    //localStorage.setItem("subCat", JSON.stringify(selectedSubCats));
  };

  //handle click
  const handleClick = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setSaveItem(
      isChecked
        ? [...savedItem, value]
        : savedItem.filter((item) => item !== value)
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
                {console.log(item.name)}
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
                      : savedItem?.find((items) => items === item.name)
                  }
                  id={item.id}
                  value={item.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onClick={handleClick}
                />
                <label htmlFor={item.id}>{item.name}</label>
              </div>
            );
          })}
        </div>
      </div>
      {savedItem}
    </div>
  );
}

export default SignatureConfig;
