import { Checkbox, Form } from "antd";
import React, { useEffect, useState } from "react";

export const CheckBox = ({ text, change, name }) => (
  <Form.Item name={name}>
    <Checkbox onChange={change} valuePropName='checked'>
      {text}
    </Checkbox>
  </Form.Item>
);
