import React, { useState } from "react";
import style from "./index.module.less";
import Modal from "../../../../Components/Modal";
import { SimpleHeading } from "../../../../Components/Heading";
import { SimpleButton } from "../../../../Components/Buttons";
import { TextBox } from "../../../../Components/Forms/TextBox";
import { Selector } from "../../../../Components/Forms/Select";
import { Row, Col, Form, Divider, message } from "antd";
// from hooks
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useFirestore } from "../../../../hooks/useFirestore";
import { accountTypes } from "../../../../constants";

function FormModal() {
  const { dispatch, generalEntry } = useAuthContext();
  const [form] = Form.useForm();
  const { addDocument, response } = useFirestore("generalEntry");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debitType, setDebitType] = useState();
  const [creditType, setCreditType] = useState();

  const onFinish = async(values) => {
    console.log("submitted: ", values);
    setLoading(true);
    if (Number(values.credit) === Number(values.debit)) {
      try {
        const debitData = {
          debitInfo: values.debitInfo,
          debit: values.debit,
          typeA: values.typeA
        }
        const creditData = {
          creditInfo: values.creditInfo,
          credit: values.credit,
          typeB: values.typeB
        }
        const entriesToPost = {
          debitData: debitData,
          creditData: creditData
        }
        dispatch({ type: "General_Entry", payload: entriesToPost });
        await addDocument(entriesToPost);
        form.resetFields();
        setLoading(false);
        closeModal();
      } catch (error) {
        message.error(error.message);
        setLoading(false);
      }
    }
    else{
      message.error("Debit Ammount must be equal to Credit Ammount!");
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
    form.resetFields();
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Modal
        form={form}
        cssClass={style.modal}
        closable="false"
        okText={"Add New General Entry"}
        body={
          <div>
            <Form
              scrollToFirstError={true}
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row gutter={[24, 12]}>
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
                <Divider className={style.divider} />
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
            heading="Add General Entry"
            size="24"
            margin="0px 0px"
          />
        }
      />
      <Row className={style.end}>
        <SimpleButton
          text={"Add New"}
          onClick={showModal}
          size={"small"}
          loading={loading}
          shape="round"
          className={style.btnStyle}
          type={"primary"}
        />
      </Row>
    </>
  );
}

export default FormModal;
