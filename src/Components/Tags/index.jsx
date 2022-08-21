import React from "react";
import { Tag } from "antd";
import style from "./index.module.less";

const Tags = ({ cssColor, bgColor, text, cssClass }) => (
  <Tag
    color={bgColor}
    className={`${cssClass} ${cssColor} ${style.tagWrapper}`}
  >
    {text}
  </Tag>
);

export default Tags;
