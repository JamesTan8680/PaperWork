import React, { useState } from "react";
import "../Faq/Faq.scss";
import Faq_image from "../../img/faq/Faq.png";
import Arrow_down from "../../img/faq/arrow-down.png";
import Arrow_Expand from "../../img/faq/arrow-expand.png";

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

  //expand the faqs to display the answer
  const toggleFAQ = (index) => {
    setFaqs(
      faqs?.map((faq, i) => {
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
            {faqs?.map((faq, index) => (
              <div className="faq-item" key={index}>
                <div className="faq-question" onClick={() => toggleFAQ(index)}>
                  <h4>
                    {faq.question}
                    {faq.expand ? (
                      <img src={Arrow_Expand} alt="Arrow" />
                    ) : (
                      <img src={Arrow_down} alt="Arrow Down" />
                    )}
                  </h4>
                </div>
                {faq.expand && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
