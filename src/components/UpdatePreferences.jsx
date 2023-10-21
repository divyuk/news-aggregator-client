import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import SelectionList from "./SelectionList";
import {
  categoriesList,
  languagesList,
  countriesList,
} from "../utility/preferencesList";

import { categoryDeMapper } from "../utility/categoryDemapper";
import { useNavigate } from "react-router-dom";

function UpdatePreferences() {
  const {
    getMyPreferences,
    updateCategory,
    updateLanguage,
    updateCountry,
    categories,
    languages,
    countries,
    updatePreferences,
  } = useAuth();
  const [preferences, setPreferences] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const data = await getMyPreferences();
        setPreferences(data);
      } catch (error) {
        console.log("Error Recieved : ", error);
      }
    };
    fetchPreferences();
  }, []);

  useEffect(() => {
    if (Object.keys(preferences).length > 0) {
      const {
        categories: selectedCategories,
        languages: selectedLanguages,
        countries: selectedCountries,
      } = preferences;
      const { categoriesLowercase, languageNames, countryNames } =
        categoryDeMapper(
          selectedCategories,
          selectedLanguages,
          selectedCountries
        );
      // Update categories using updateCategory
      updateCategory(categoriesLowercase);
      updateLanguage(languageNames);
      updateCountry(countryNames);

      // You can also set other demapped data here if needed
    }
  }, [preferences]);

  const handleDone = () => {
    updatePreferences();
    navigate("/app/news");
  };
  return (
    <div>
      <h1>Update Preferences</h1>
      {preferences.length == 0 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <SelectionList
            items={categoriesList}
            maxSelection={5}
            title="Categories"
            selected={categories}
            onSelect={updateCategory}
          />

          <SelectionList
            items={languagesList}
            maxSelection={5}
            title="Languages"
            selected={languages}
            onSelect={updateLanguage}
          />

          <SelectionList
            items={countriesList}
            maxSelection={5}
            title="Countries"
            selected={countries}
            onSelect={updateCountry}
          />
        </>
      )}
      <button onClick={handleDone}>Done</button>
    </div>
  );
}
export default UpdatePreferences;
