import React, { useRef, useState } from "react";
import "./ReviewDoc.scss";
import HTMLReactParser from "html-react-parser";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Link } from "react-router-dom";
import { PDFExport } from "@progress/kendo-react-pdf";

function ReviewDoc() {
  const pdfExportComponent = useRef(null);
  //state for the blur the signature
  const [blurry, setBlur] = useState(true);
  //handle the export pdf
  const handleExportWithComponent = (event) => {
    // setBlur(false);
    pdfExportComponent.current.save();
  };

  //dummy data for the title
  const title =
    "<h1><center>Non-Disclosure Agreement (One-Way)</center></strong></h1>";
  //dummy data for the version
  const version = "<h2><strong>Version 1.5</strong></h2>";
  //dummy data for the recipient
  const recipients = `
  <div>
    <select>
      <option value="alex">Alex</option>
      <option value="dave">Dave</option>
      <option value="david">David</option>
      <option value="james">James</option>
    </select>
  </div>
`;
  //dummy data for the parties
  const parties = [
    {
      name: "chingsien",
      company: "ABC company",
      address: "234 gal Rd, VIC, 3122",
    },
    {
      name: "Thang",
      company: "ABB company",
      address: "122 wakedfield, VIC, 3122",
    },
    {
      name: "JunDa",
      company: "ABD company",
      address: "123 wakedfield, VIC, 3122",
    },
  ];

  //dummy data for the content
  const content =
    '<p>This Non-Disclosure Agreement (the "Agreement") is made and entered into by and between:</p><h2>Disclosing Party:</h2><p><strong>[Name of Disclosing Party]</strong>, with an address at [Address of Disclosing Party]</p><h2>Receiving Party:</h2><p><strong>[Name of Receiving Party]</strong>, with an address at [Address of Receiving Party]</p><p>Collectively, the "Parties."</p><h2>Definition of Confidential Information:</h2><p>"Confidential Information" shall mean any information or data that is disclosed by the Disclosing Party to the Receiving Party, whether orally or in writing, and is marked as "Confidential" or is otherwise clearly identified as confidential at the time of disclosure.</p><h2>Obligations:</h2><p>The Receiving Party agrees to:</p><ul><li>Use the Confidential Information solely for the purpose of [Purpose of NDA]</li><li>Not disclose the Confidential Information to any third party without the prior written consent of the Disclosing Party</li><li>Take reasonable measures to protect the Confidential Information from unauthorized access or use</li></ul><h2>Term:</h2><p>This Agreement shall remain in effect for [Duration of NDA] from the date of signing.</p><h2>Governing Law:</h2><p>This Agreement shall be governed by and construed in accordance with the laws of [Applicable Jurisdiction].</p><h2>Entire Agreement:</h2><p>This Agreement contains the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior agreements, representations, and understandings.</p><p>IN WITNESS WHEREOF, the Parties hereto have executed this Non-Disclosure Agreement as of the date first above written.</p>';
  //dummy data for the signature config

  return (
    <div className="reviewDoc">
      <div className="review-container">
        <PDFExport
          ref={pdfExportComponent}
          paperSize="A4"
          margin={{ left: "15mm", top: "20mm", right: "15mm", bottom: "20mm" }}
          scale={0.6}
        >
          <div className="recipient">
            <div className="recipient-dropdown">
              {HTMLReactParser(recipients)}
            </div>
            <div className="version">{HTMLReactParser(version)}</div>
          </div>
          <div className="header">{HTMLReactParser(title)}</div>

          <div className="parties">
            <h3>Party</h3>

            {parties?.map((item) => {
              return (
                <div key={item.address} className="party">
                  <b>Name:</b> {item.name} <b>Company:</b> {item.company}{" "}
                  <b>Address:</b> {item.address}
                </div>
              );
            })}
          </div>
          <div className="reciew-content">{HTMLReactParser(content)}</div>

          <div className="review-signature">
            <h3>ENTER INTO AS AN AGREEMENT BY THE PARTIES</h3>
            <div className="parties_sign_container">
              <div className="parties_side">
                {parties?.map((item) => {
                  return (
                    <div key={item.name} className="party_sign">
                      <div className="Dname">Discloser Name: {item.name}</div>
                      <div className="Sname">Signature: {item.name}</div>
                      <div className="Sdate">Date: 8/31/2023</div>
                    </div>
                  );
                })}
              </div>
              <div className="recipient_side">
                <div>Name: Ching</div>
                <div>Address: 234 wakedfield, hawthorn, VIC 3122</div>
                <div>Email: Chingsien@gmail.com</div>
                <div>student_ID: 102890973</div>
                <div
                  style={{
                    color: blurry ? "black" : "none",
                    display: blurry ? "" : "none",
                  }}
                >
                  signature: Ching
                </div>
              </div>
            </div>
          </div>
        </PDFExport>
      </div>
      <div className="review-button">
        <Link
          to="/viewDoc/1"
          onClick={() => {
            setBlur(false);
          }}
        >
          <button className="cancel">Cancel</button>
        </Link>

        {blurry ? (
          <VisibilityIcon
            className="visibilityIcon"
            onClick={() => setBlur(false)} //setBlur to false
          />
        ) : (
          <VisibilityOffIcon
            className="visibilityOffIcon"
            onClick={() => setBlur(true)} //setBlur to true
          />
        )}

        <button className="export-pdf" onClick={handleExportWithComponent}>
          Export PDF
        </button>
      </div>
    </div>
  );
}

export default ReviewDoc;
