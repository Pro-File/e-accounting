import React from "react";
import { Button, Image } from "antd";
import styles from "./index.module.less";

export const SimpleButton = ({
  size,
  type,
  shape,
  text,
  onClick,
  disabled,
  hType,
  loading,
  icon,
  className,
  href,
  target,
  imageSource,
}) => (
  <Button
    className={`${className} ${styles.ButtonHeight}`}
    block
    type={type}
    shape={shape}
    size={size}
    disabled={disabled}
    onClick={onClick}
    htmlType={hType}
    loading={loading}
    icon={icon}
    href={href}
    target={target}
  >
    {text}
    {imageSource && (
      <Image
        src={imageSource}
        preview={false}
        alt='icon'
        style={{ paddingLeft: "10px" }}
      />
    )}
  </Button>
);
SimpleButton.defaultProps = {
  size: "default",
  type: "primary",
  text: "Button",
  hType: "button",
};
export const LinkButton = ({
  text,
  size,
  block,
  cssClass,
  click,
  icon,
  iconName,
}) =>
  !icon ? (
    <Button
      block={block}
      size={size}
      className={cssClass}
      type='link'
      onClick={click}
    >
      {text}
    </Button>
  ) : (
    <Button
      block={block}
      size={size}
      className={cssClass}
      type='link'
      onClick={click}
    >
      <span> {iconName}</span>
      <span>{text}</span>
    </Button>
  );
LinkButton.defaultProps = {
  size: "middle",
  text: "Button",
  icon: false,
};
export const RoundButton = ({ icon, hType, type, onClick }) => (
  <Button
    className={styles.roundButton}
    type={type}
    htmlType={hType}
    icon={<Image src={icon} preview={false} alt='icon' />}
    onClick={onClick}
  />
);
export const OutlineButton = ({
  size,
  type,
  shape,
  text,
  onClick,
  hType,
  loading,
  icon,
  height,
  cssClass,
}) => (
  <Button
    className={`${cssClass} ${styles.ctaButton}`}
    block
    type={type}
    shape={shape}
    size={size}
    onClick={onClick}
    htmlType={hType}
    loading={loading}
    // icon={icon}
    style={{ height: `${height}` }}
  >
    {text}
    {icon}
  </Button>
);

OutlineButton.defaultProps = {
  size: "default",
  text: "Button",
  hType: "button",
};
