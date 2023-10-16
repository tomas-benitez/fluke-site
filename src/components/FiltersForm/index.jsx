import { useEffect, useRef } from "react";
import { useFiltersForm } from "./hooks";

const FiltersForm = ({ form, filterAttributes }) => {
  // useEffect(() => {
  //   if (isValid && !isValidating) {
  //     let formDataSubscription = watch((formData) => {
  //       // if (wasReset.current) {
  //       //   wasReset.current = false;
  //       //   return;
  //       // } else {
  //       // onChange(formData);
  //       // }
  //       let selectedFilters = Object.keys(formData).reduce((acc, attrName) => {
  //         acc[attrName] = formData[attrName].filter((value) => value !== false);
  //         return acc;
  //       }, {});
  //       onFiltersSelected?.(selectedFilters);
  //     });
  //     return () => formDataSubscription.unsubscribe();
  //   }
  // }, [
  //   form.formState.isValid,
  //   form.formState.isValidating,
  //   onFiltersSelected,
  //   watch,
  //   onChange,
  // ]);

  return (
    filterAttributes && (
      <form className="space-y-6">
        {Object.keys(filterAttributes).map((attrName, i) => (
          <div key={i}>
            <h6 className="mb-1 pl-7 text-lg font-semibold">{attrName}</h6>
            <div>
              {filterAttributes[attrName].map((attrValue, i) => (
                <label className="w-full" key={`${attrName}${attrValue}`}>
                  <input
                    type="checkbox"
                    value={attrValue}
                    {...form.register(`${attrName}.${i}`)}
                    className="mr-4"
                  />
                  {attrValue}
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>
    )
  );
};

export default FiltersForm;
