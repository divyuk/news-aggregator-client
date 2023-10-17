import { useAuth } from "../contexts/AuthenticationContext";

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

  const { dispatch } = useAuth();

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    // Dispatch the action to update the user's category
    dispatch({
      type: "updateCategory",
      payload: { category: selectedCategory },
    });
  };

  return (
    <>
      <select name="category" onChange={handleCategoryChange}>
        <option value="Category">Category</option>
        {categories.map((category, index) => (
          <option key={index}>{category}</option>
        ))}
      </select>
    </>
  );
}

export default Preferences;
