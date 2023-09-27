import { useState } from "react";
import "./InputTags.css";

const InputTags = ({ updateTags, currentTags, setCurrentTags }) => {
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const handleTagChange = (e) => {
    setInput(e.target.value);
  };

  const inputKeyDown = (e) => {
    const trimmedInput = input.trim();

    if (
      e.code === "Space" &&
      trimmedInput.length &&
      !currentTags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setCurrentTags([...currentTags, input]);
      setInput("");
    }

    if (
      e.key === "Backspace" &&
      !input.length &&
      currentTags.length &&
      isKeyReleased
    ) {
      const currentTagsCopy = [...currentTags];
      const poppedTag = currentTagsCopy.pop();
      e.preventDefault();
      setCurrentTags([...currentTags, currentTagsCopy]);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const inputKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index) => {
    setCurrentTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const addTags = () => {
    updateTags(currentTags);
  };

  return (
    <div className="input-tag-container">
      {currentTags.map((tag, index) => (
        <div key={tag} className="input-tag">
          {tag}
          <button onClick={() => deleteTag(index)}>x</button>
        </div>
      ))}
      <input
        value={input}
        onKeyDown={inputKeyDown}
        onKeyUp={inputKeyUp}
        onChange={handleTagChange}
        placeholder="enter each tag separated by a space"
      />
      <button
        type="button"
        onClick={addTags}
        className={currentTags?.length > 0 ? "tag-button-active" : ""}
      >
        done editing tags
      </button>
    </div>
  );
};

export default InputTags;
