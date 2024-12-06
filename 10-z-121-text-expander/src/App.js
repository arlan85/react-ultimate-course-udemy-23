import PropTypes from "prop-types";
import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

TextExpander.propTypes = {
  collapsedNumWords: PropTypes.number,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  buttonColor: PropTypes.string,
  expanded: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.object.isRequired,
};

function TextExpander({
  children,
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "#1f09cd",
  expanded = false,
  className = "",
}) {
  const [expand, setExpand] = useState(expanded);

  const displayText =
    expand || children.split(" ").length <= collapsedNumWords
      ? children
      : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  function handleExpand() {
    setExpand((prev) => !prev);
  }

  const buttonStyle = {
    color: buttonColor,
    border: "none",
    background: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
  };

  return (
    <div className={className}>
      <span> {displayText}</span>
      <button onClick={handleExpand} style={buttonStyle}>
        {expand || children.split(" ").length <= collapsedNumWords
          ? collapseButtonText
          : expandButtonText}
      </button>
    </div>
  );
}
