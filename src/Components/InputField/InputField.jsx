import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  className,
  options,
  ...rest
}) => {
  const handleSelectChange = (e) => {
    const updatedValue = Array.isArray(e.target.value)
      ? e.target.value.join(',') 
      : e.target.value;
    onChange({ target: { name, value: updatedValue } }); 
  };

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={name} className="form-label">{label}</label>}
      {type === 'select' || type === 'select-checkbox' ? (
        <select
          id={name}
          name={name}
          className="form-select"
          value={Array.isArray(value) ? value : [value]}
          onChange={handleSelectChange}
          multiple={type === 'select-checkbox'}
          disabled={disabled}
          {...rest}
        >
          <option value="" disabled>{placeholder || 'Select an option'}</option>
          {Array.isArray(value) && value.length === 0 && (
            <option value="" disabled>{placeholder || 'Select an option'}</option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          {...rest}
        />
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'date', 'select', 'select-checkbox', 'checkbox', 'radio']).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default InputField;
