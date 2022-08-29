import React, { useState } from "react";
// Components
import FormModal from "../../Components/FormModal/index";
import style from "./index.module.less";
import GeneralEntries from "./GeneralEntries/index";
import { Row } from "antd";
import { SimpleButton } from "../../Components/Buttons";

const GeneralEntriesContainer = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div>
      <Row className={style.end}>
        <SimpleButton
          text={"Add New"}
          onClick={showModal}
          size={"small"}
          shape="round"
          className={style.btnStyle}
          type={"primary"}
        />
      </Row>
      <FormModal
        isModalVisible={isModalVisible}
        showModal={showModal}
        setIsModalVisible={setIsModalVisible}
      />
      <GeneralEntries />
    </div>
  );
};

export default GeneralEntriesContainer;
