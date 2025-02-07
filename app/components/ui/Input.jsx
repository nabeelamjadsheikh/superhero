export function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  max,
  required = true,
  className = "",
  icon,
  showValue = false,
}) {
  return (
    <div>
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1 capitalize flex items-center gap-2"
      >
        {icon && <span className="flex items-center">{icon}</span>}
        {label}
        {showValue && type === "range" && (
          <span className="ml-auto text-sm text-gray-500">
            {value || min}
          </span>
        )}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        required={required}
        className={`
          border rounded-md p-2 w-full 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${type === "range" ? "range-input" : ""}
          ${className}
        `}
        placeholder={placeholder}
      />
    </div>
  );
} 