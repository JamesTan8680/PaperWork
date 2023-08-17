import React from "react";
import Review from "../../img/createDoc/review.svg";
import "./ReviewTemplate.scss";

function ReviewTemplate({ type }) {
  return (
    <>
      {type === "default" ? (
        <>
          <div className="header-createDoc">
            <img src={Review} alt="" />
            Review template
          </div>
          <div className="preview-container">
            <div className="preview-title">
              NON-DISCLOSURE AGREEMENT (ONE WAY)
            </div>
            <div className="body-container">
              <div className="preview-party">
                Party
                <div className="content">
                  this is the for the party that exist in the document and every
                  documents will have different type of party
                </div>
              </div>
              <div className="preview-content">
                <span>Content</span>
                <div className="content">
                  <span>Purpose:</span>
                  <p>
                    Aqius would like to share sensitive copyright materials
                    regarding a proposed application known as ‘Clockwork’ for
                    the purposes of the recipient exploring the provision of
                    services.
                  </p>
                  <span>Term:</span>
                  <p>
                    10 (Ten) Years with all options reserved to extend this time
                    frame. *Proposed commencement date: 01/03/2023 (Australian
                    Eastern Standard Time) *Please ensure any starting date of
                    this agreement is suitable.
                    <p>Operative provision:</p>
                    <ol>
                      <li>
                        The consideration for each party entering into this
                        Agreement is the provision of Confidential Information
                        by the Discloser and the Recipient's agreement to keep
                        the Confidential Information confidential. Each party
                        acknowledges that this is valuable consideration.
                      </li>
                      <li>
                        The Recipient must keep all Confidential Information in
                        strict confidence and use it solely for the Purpose. The
                        Recipient must ensure that only its officers with a need
                        to know the Confidential Information for the Purpose
                        have access to the Confidential Information. The
                        Recipient must ensure that all such officers who have
                        access to the Confidential Information keep the
                        Confidential Information in strict confidence.
                      </li>
                      <li>
                        It is not a breach of this Agreement for the Recipient
                        to disclose Confidential Information which it is obliged
                        to disclose by law or court order. If the Recipient is
                        required or anticipates that it may be required to do
                        so, it must immediately notify the Discloser and use
                        reasonable endeavours to delay and withhold disclosure
                        until the Discloser has had a reasonable opportunity to
                        oppose disclosure by lawful means.
                      </li>
                      <li>
                        The Recipient must destroy or return to the Discloser
                        all of the Discloser's Confidential Information
                        immediately upon request by the Discloser.
                      </li>
                      <li>
                        The Discloser does not make any representation or
                        warranty that the Confidential Information does not
                        infringe the rights of another person or as to the
                        accuracy of the Confidential Information. Neither party
                        is liable to the other for any infringement or
                        inaccuracy in the Confidential Information.
                      </li>
                      <li>
                        Each Party acknowledges that, in addition, to any other
                        remedy that may be available in law or equity, the other
                        Party is entitled to interim, interlocutory and
                        permanent injunctions to prevent breach of this
                        Agreement and to ensure specific performance of the
                        Agreement.
                      </li>
                      <li>The laws of Victoria govern this Agreement.</li>
                    </ol>
                    <span>Definitions</span>
                    <p>
                      <b>"Confidential Information"</b> means this Agreement
                      (including the existence of this Agreement, the Purpose
                      (including the existence of the Purpose) and all
                      information concerning the Discloser or which is the
                      property of the Discloser and which is disclosed in
                      writing, orally or by any other means to the Recipient or
                      its representatives. It includes any notes, copies or
                      extracts made by the Recipient or its officers in relation
                      to this information but does not include information which
                      the Recipient can prove to the reasonable satisfaction of
                      the Discloser:
                      <ul>
                        <li>
                          was publicly available, other than as a result of a
                          breach of this Agreement;
                        </li>
                        <li>
                          that the Recipient obtained it from a third party
                          without breach by that third party of any obligation
                          of confidence concerning that Confidential
                          Information; or
                        </li>
                        <li>
                          was already in the possession of the Recipient before
                          being provided by the Discloser.
                        </li>
                      </ul>
                    </p>
                  </p>
                </div>
              </div>
              <div className="preview-signature">
                Signature and date
                <div className="content">Signature for Chingsien Ly</div>
                <div className="content">Email:</div>
                <div className="content">Address:</div>
                <div className="content">Date:</div>
              </div>
              <button>CUSTOMISE</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="header-createDoc">
            <img src={Review} alt="" />
            Review template
          </div>
          <div className="preview-container">
            <div className="preview-title">
              NON-DISCLOSURE AGREEMENT (ONE WAY)
            </div>
            <div className="body-container">
              <div className="preview-party">Party</div>
              <div className="preview-content">
                <span>Content</span>
              </div>
              <div className="preview-signature">
                <span>Signature and date</span>
              </div>
              <button>CUSTOMISE</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ReviewTemplate;