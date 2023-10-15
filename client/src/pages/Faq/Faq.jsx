import React, { useState, useEffect } from "react";
import "../Faq/Faq.scss";
import Faq_image from "../../img/faq/Faq.png";
import Arrow_down from "../../img/faq/arrow-down.png";
import Arrow_Expand from "../../img/faq/arrow-expand.png";
import axios from "axios";
import e from "cors";

function Faq() {
  //useState for the faqs
  const [faqs, setFaqs] = useState([
    {
      question: "How many programmers does it take to screw a lightbulb?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.",
      expand: true,
    },
    {
      question: "Who is the most awesome person?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.",
      expand: false,
    },
    {
      question:
        "How many questions does it take to makes a succesful FAQ Page?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.",
      expand: false,
    },
    {
      question: "Who is the most awesome person?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.",
      expand: false,
    },
    {
      question:
        "How many questions does it take to makes a succesful FAQ Page?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.",
      expand: false,
    },
  ]);

  //state for fetching the faq data
  const [faq1, setFaq1] = useState([]);
  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/faq");
        setFaq1(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFaqData();
  }, []);
  console.log("faq data ", faq1);

  //expand the faqs to display the answer
  const toggleFAQ = (index) => {
    setFaqs(
      faq1?.map((faq, i) => {
        if (i === index) {
          faq.expand = !faq.expand;
        } else {
          faq.expand = false;
        }

        return faq;
      })
    );
  };

  return (
    <div className="faq">
      <div className="faq-header">
        <h2>Help centre</h2>
      </div>
      <div className="faq-para">
        <p>
          Frequently Asked <strong>Questions</strong>
        </p>
      </div>

      <div className="faq-container">
        <div className="left-container">
          <img src={Faq_image} alt="" />
          <div className="right-container">
            {faq1?.map((faq, faq_id) => (
              <div className="faq-item" key={faq_id}>
                <div className="faq-question" onClick={() => toggleFAQ(faq_id)}>
                  <h4>
                    {faq.faq_question}
                    {faq.expand ? (
                      <img src={Arrow_Expand} alt="Arrow" />
                    ) : (
                      <img src={Arrow_down} alt="Arrow Down" />
                    )}
                  </h4>
                </div>
                {faq.expand && <p className="faq-answer">{faq.faq_answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
