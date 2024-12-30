import { useState, useEffect } from 'react'; 
import PropTypes from 'prop-types'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const SelectField = ({ 
  name, 
  value, 
  onChange = () => {}, 
  onApplyChange = () => {}, 
  options, 
  placeholder, 
  disabled, 
  multiSelect, 
}) => { 
  const [selectedOptions, setSelectedOptions] = useState(value || []); 
  const [isOpen, setIsOpen] = useState(false); 
  const [isApplied, setIsApplied] = useState(false); 

  const toggleDropdown = (e) => { 
    e.preventDefault(); 
    setIsOpen(!isOpen); 
  }; 

  const handleCheckboxChange = (optionValue) => { 
    const updatedOptions = selectedOptions.includes(optionValue) 
      ? selectedOptions.filter((val) => val !== optionValue) 
      : [...selectedOptions, optionValue]; 
    setSelectedOptions(updatedOptions); 
  }; 

  const selectAll = (e) => { 
    e.preventDefault(); 
    const allSelected = options.map((option) => option.value); 
    setSelectedOptions(allSelected); 
  }; 

  const handleApplySelections = (selectedValues) => { 
    setIsApplied(true); 
    onApplyChange(selectedValues); 
  }; 

  const applySelection = (e) => { 
    e.preventDefault(); 
    setIsApplied(true); 
    onChange({ target: { name, value: selectedOptions } }); 
    handleApplySelections(selectedOptions); 
    setIsOpen(false); 
  }; 

  // Effect to update parent state only when applied 
  useEffect(() => { 
    if (isApplied) { 
      onApplyChange(selectedOptions); // Call onApplyChange with selected options 
      setIsApplied(false); 
    } 
  }, [isApplied, onApplyChange, selectedOptions]); 

  if (multiSelect) { 
    return ( 
      <div className="dropdown"> 
        <label htmlFor={name} className="form-label"> 
          {placeholder || 'Select options'} 
        </label> 
        <button 
          className="btn btn-secondary dropdown-toggle" 
          type="button" 
          id={`${name}-dropdown`} 
          onClick={toggleDropdown} 
          aria-expanded={isOpen} 
          disabled={disabled} 
        > 
          {placeholder || 'Select options'} 
        </button> 

        {isOpen && ( 
          <div className="dropdown-menu show" aria-labelledby={`${name}-dropdown`}> 
            <div className="dropdown-item d-flex justify-content-between"> 
              <button 
                className="btn btn-link p-0" 
                onClick={selectAll} 
                type="button" 
              > 
                Select All 
              </button> 
              <button 
                className="btn btn-primary" 
                onClick={applySelection} 
                type="button" 
              > 
                Apply 
              </button> 
            </div> 
            <div className="dropdown-divider"></div> 
            <div className="d-flex flex-wrap"> 
              {options.map((option, index) => ( 
                <div key={index} className="form-check form-check-inline w-50"> 
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    value={option.value} 
                    id={`${name}-${index}`} 
                    checked={selectedOptions.includes(option.value)} 
                    onChange={() => handleCheckboxChange(option.value)} 
                    disabled={disabled} 
                  /> 
                  <label 
                    className="form-check-label" 
                    htmlFor={`${name}-${index}`} 
                  > 
                    {option.label} 
                  </label> 
                </div> 
              ))} 
            </div> 
          </div> 
        )} 
      </div> 
    ); 
  } 

  return ( 
    <div> 
      <label htmlFor={name} className="form-label"> 
        {placeholder || 'Select an option'} 
      </label> 
      <select 
        id={name} 
        name={name} 
        className="form-select" 
        value={value} 
        onChange={(e) => onChange(e)} 
        disabled={disabled} 
        multiple
      > 
        <option value="" disabled> 
          {placeholder || 'Select an option'} 
        </option> 
        {options.map((option, index) => ( 
          <option key={index} value={option.value}> 
            {option.label} 
          </option> 
        ))} 
      </select> 
    </div> 
  ); 
}; 

SelectField.propTypes = { 
  name: PropTypes.string.isRequired, 
  value: PropTypes.oneOfType([ 
    PropTypes.string, 
    PropTypes.number, 
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])), 
  ]), 
  onChange: PropTypes.func, 
  onApplyChange: PropTypes.func, 
  options: PropTypes.arrayOf( 
    PropTypes.shape({ 
      label: PropTypes.string.isRequired, 
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
    }) 
  ), 
  placeholder: PropTypes.string, 
  disabled: PropTypes.bool, 
  multiSelect: PropTypes.bool, 
}; 

export default SelectField; 
