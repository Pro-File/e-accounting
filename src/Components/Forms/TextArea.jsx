import { Form, Input } from "antd";
import React from "react";
import style from "./index.module.less";

const { TextArea } = Input;

export const Textarea = ({
  name,
  maxLength,
  placeholder,
  className,
  label,
}) => (
  <Form.Item
    name={name}
    className={className}
    label={label}
    rules={[
      {
        required: true,
        message: "Please add description",
      },
    ]}
  >
    <TextArea
      className={style.textArea}
      rows={4}
      placeholder={placeholder}
      maxLength={maxLength}
      name={name}
    />
  </Form.Item>
);
