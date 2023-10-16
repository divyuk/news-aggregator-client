import { useState } from "react";

function Preferences() {
  const categories = [
    "business",
    "entertainment",
    "environment",
    "food",
    "health",
    "politics",
    "science",
    "sports",
    "technology",
    "top",
    "tourism",
    "world",
  ];
  const [category, selectCategory] = useState("");
  return (
    <>
      <select name="category" onChange={(e) => selectCategory(e.target.value)}>
        <option value="Category">Category</option>
        {categories.map((category, index) => (
          <option key={index}>{category}</option>
        ))}
      </select>
    </>
  );
}

export default Preferences;
