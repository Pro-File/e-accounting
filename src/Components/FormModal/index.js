import React, { useState } from "react";
import style from "./index.module.less";
import Modal from "../Modal";
import { SimpleHeading } from "../Heading";
import { SimpleButton } from "../Buttons";
import { TextBox } from "../Forms/TextBox";
import { Selector } from "../Forms/Select";
import { Row, Col, Form, Divider, message } from "antd";
// from hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { accountTypes } from "../../constants";
import { useEffect } from "react";
import { timestamp } from "../../firebase/config";

function FormModal({
  isModalVisible,
  setIsModalVisible,
  isEdit,
  setIsEdit,
  setEditData,
  editData,
}) {
  const { dispatch, generalEntry } = useAuthContext();
  const [form] = Form.useForm();
  const { addDocument, response, updateDocument } =
    useFirestore("generalEntry");
  const [loading, setLoading] = useState(false);
  const [debitType, setDebitType] = useState();
  const [creditType, setCreditType] = useState();

  const onFinish = async (values) => {
    if (isEdit) {
      if (Number(values.credit) === Number(values.debit)) {
        try {
          const debitData = {
            debitInfo: values.debitInfo,
            debit: values.debit,
            typeA: values.typeA,
          };
          const creditData = {
            creditInfo: values.creditInfo,
            credit: values.credit,
            typeB: values.typeB,
          };
          const entriesToPost = {
            debitData: debitData,
            creditData: creditData,
            createdAt: timestamp.fromDate(new Date()),
          };
          await updateDocument(editData.id, entriesToPost);
          form.resetFields();
          setLoading(false);
          closeModal();
        } catch (error) {
          message.error(error.message);
          setLoading(false);
        }
      } else {
        message.error("Debit Ammount must be equal to Credit Ammount!");
        setLoading(false);
      }
    } else {
      setLoading(true);
      if (Number(values.credit) === Number(values.debit)) {
        try {
          const debitData = {
            debitInfo: values.debitInfo,
            debit: values.debit,
            typeA: values.typeA,
          };
          const creditData = {
            creditInfo: values.creditInfo,
            credit: values.credit,
            typeB: values.typeB,
          };
          const entriesToPost = {
            debitData: debitData,
            creditData: creditData,
          };
          dispatch({ type: "General_Entry", payload: entriesToPost });
          await addDocument(entriesToPost);
          form.resetFields();
          setLoading(false);
          closeModal();
        } catch (error) {
          message.error(error.message);
          setLoading(false);
        }
      } else {
        message.error("Debit Ammount must be equal to Credit Ammount!");
        setLoading(false);
      }
    }
  };

  const onFinishFailed = () => {
    console.log("Form Error!");
  };

  const handleDebitTypeChange = (e) => {
    setDebitType(e);
  };

  const handleCreditTypeChange = (e) => {
    setCreditType(e);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    isEdit && setIsEdit(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        form={form}
        cssClass={style.modal}
        closable="false"
        buttonLoader={loading}
        okText={isEdit ? "Edit General Entry" : "Add New General Entry"}
        body={
          <div>
            <Form
              scrollToFirstError={true}
              form={form}
              layout="vertical"
              initialValues={editData}
              autoComplete="off"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row gutter={[24, 6]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <TextBox
                    type="text"
                    name="debitInfo"
                    placeholder="Enter Debit Info (Account)"
                    label="Debit Info"
                    validationKey="debitInfo"
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <TextBox
                    type="number"
                    name="debit"
                    placeholder="Enter Debit Ammount"
                    label="Debit Ammount"
                    validationKey="debit"
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Selector
                    handleChange={handleDebitTypeChange}
                    name="typeA"
                    options={accountTypes}
                    placeholder="Select Account Type"
                    optionName="label"
                    label={"Debit Account Type"}
                    optionKey="value"
                    validationKey="typeA"
                    cssClass={style.selectorWrapper}
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <TextBox
                    type="text"
                    name="creditInfo"
                    placeholder="Enter Credit Info (Account)"
                    label="Credit Info"
                    validationKey="creditInfo"
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <TextBox
                    type="number"
                    name="credit"
                    placeholder="Enter Credit Ammount"
                    label="Credit Ammount"
                    validationKey="credit"
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Selector
                    handleChange={handleCreditTypeChange}
                    name="typeB"
                    options={accountTypes}
                    placeholder="Select Account Type"
                    optionName="label"
                    label={"Credit Account Type"}
                    optionKey="value"
                    validationKey="typeB"
                    cssClass={style.selectorWrapper}
                  />
                </Col>
              </Row>
            </Form>
          </div>
        }
        width={600}
        visible={isModalVisible}
        handleOk={closeModal}
        handleCancel={closeModal}
        title={
          <SimpleHeading
            heading={isEdit ? "Edit General Entry" : "Add General Entry"}
            size="24"
            margin="0px 0px"
          />
        }
      />
    </>
  );
}

export default FormModal;
