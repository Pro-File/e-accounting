import React from "react";
import styles from "./index.module.less";

export const Heading = ({ heading, spanText, cssClass }) => (
  <div className={styles.secHead}>
    <h1 className={`${styles.heading} ${cssClass}`}>
      {`${heading} `}
      <span>{spanText}</span>
    </h1>
  </div>
);

export const SimpleHeading = ({
  heading,
  margin,
  width,
  size,
  weight,
  cssClass,
}) => (
    <h1
      className={`${cssClass} ${styles.simpleHeading} `}
      style={{
        margin,
        width,
        fontSize: `${size}px`,
        fontWeight: weight,
      }}
    >{`${heading} `}</h1>
);
