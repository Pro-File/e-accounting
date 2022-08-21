import React from "react";
import { Modal } from "antd";

const ModalWrapper = ({
  visible,
  handleCancel,
  body,
  handleOk,
  handleOkSubmit,
  okText,
  width,
  footer,
  closable,
  cssClass,
  title,
  form,
  buttonLoader,
}) => (
  <Modal
    confirmLoading={buttonLoader}
    onOk={form ? form.submit : handleOkSubmit}
    okText={okText ? okText : "Send Request"}
    className={cssClass}
    title={title}
    footer={footer && null}
    closable={closable && false}
    centered
    visible={visible}
    onCancel={handleCancel}
    width={width}
  >
    {body}
  </Modal>
);

export default ModalWrapper;
