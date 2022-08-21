import React from "react";
import { Select, Form } from "antd";
import style from "./index.module.less";

const validation = {
  typeA: {
    required: true,
    message: "Please select debit account type",
  },
  typeB: {
    required: true,
    message: "Please select credit account type",
  },
};
export const Selector = ({
  label,
  options,
  placeholder,
  validationKey,
  name,
  size,
  setState,
  cssClass,
  defaultVal,
  value,
  optionName,
  optionKey,
  handleChange,
  ...props
}) => {
  const validator = validation[validationKey];

  return (
    <Form.Item label={label} rules={[validator]} name={name} {...props}>
      <Select
        allowClear
        onChange={(val) => handleChange(val)}
        value={value}
        className={`${style.Select} ${cssClass}`}
        dropdownClassName={style.Select}
        placeholder={placeholder}
        size={size}
      >
        {options?.map((option, i) => (
          // TODO dynamic value's key from calling side
          <Select.Option
            key={option?.[optionKey] || option.key}
            value={option?.[optionKey] || option.value}
          >
            {option?.[optionName] || option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
Selector.defaultProps = {
  size: "medium",
};
