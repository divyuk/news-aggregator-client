import { useState } from "react";
import styles from "./SelectionList.module.css";

function SelectionList({ items, maxSelection, title, selected, onSelect }) {
  const [searchTerm, setSearchTerm] = useState(""); // State to track the search term

  const isItemSelected = (item) => selected.includes(item);
  const canSelectMore = selected.length < maxSelection;

  const toggleItem = (item) => {
    if (isItemSelected(item)) {
      const updatedSelection = selected.filter(
        (selectedItem) => selectedItem !== item
      );
      onSelect(updatedSelection);
    } else if (canSelectMore) {
      onSelect([...selected, item]);
    }
  };

  // Filter items based on the search term
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>{title}</h2>
      <input
        type="text"
        placeholder={`Search ${title}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.container}>
        {filteredItems.map((item, index) => (
          <button
            key={index}
            className={`${styles.button} ${
              isItemSelected(item) ? styles.selected : ""
            }`}
            onClick={() => toggleItem(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className={styles.selectedItems}>
        Selected {title}: {selected.join(", ")}
      </p>
    </div>
  );
}

export default SelectionList;
