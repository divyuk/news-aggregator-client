import styles from "./SelectionList.module.css";

function SelectionList({ items, maxSelection, title, selected, onSelect }) {
  const isItemSelected = (item) => selected.includes(item);
  const canSelectMore = selected.length < maxSelection;

  const toggleItem = (item) => {
    if (isItemSelected(item)) {
      // Remove the item from the selection
      const updatedSelection = selected.filter(
        (selectedItem) => selectedItem !== item
      );
      onSelect(updatedSelection);
    } else if (canSelectMore) {
      // Add the item to the selection if not at the maximum selection limit
      onSelect([...selected, item]);
    }
  };

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
        Selected {title}: {selected.join(", ")}
      </p>
    </div>
  );
}

export default SelectionList;
