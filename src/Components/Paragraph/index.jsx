import React from "react";
import styles from "./index.module.less";

export const SimpleParagraph = ({ paragraph, size, bold, margin, css }) => (
    <h1
      className={`${styles.simpleParagraph} ${css}`}
      style={{
        margin,
        fontSize: `${size}px`,
        fontWeight: bold && "bold",
      }}
    >{`${paragraph} `}</h1>
);
