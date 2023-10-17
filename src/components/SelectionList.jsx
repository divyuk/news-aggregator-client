import { useState } from "react";
import styles from "./SelectionList.module.css"; // Import the CSS Module

function SelectionList({ items, maxSelection, title }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else if (selectedItems.length < maxSelection) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const isItemSelected = (item) => selectedItems.includes(item);

  return (
    <div>
      <h2>{title}</h2>
      <div className={styles.container}>
        {items.map((item, index) => (
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
        Selected {title}: {selectedItems.join(", ")}
      </p>
    </div>
  );
}

export default SelectionList;
