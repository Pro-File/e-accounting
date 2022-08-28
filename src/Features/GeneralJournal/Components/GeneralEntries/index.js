import React, { useEffect, useState } from "react";
// import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import { useCollection } from "../../../../hooks/useCollection";
import style from "./index.module.less";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../../../Components/Table/CustomTable";
import { message, Row, Space } from "antd";
import { SimpleHeading } from "../../../../Components/Heading";
import { useFirestore } from "../../../../hooks/useFirestore";

function GeneralEntries() {
  const { documents, error } = useCollection("generalEntry");
  const { deleteDocument, response } = useFirestore("generalEntry");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("documents: ", documents);
    documents && documents.length > 0 && setLoading(false);
    setData(documents);
    console.log("doc: ", documents);
  }, [documents]);

  const handleDeleteRecord = async (record) => {
    try {
      await deleteDocument(record.id);
      message.success("Record Deleted Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: 0,
      render: (val) => {
        return (
          <div>
            {moment(val?.createdAt?.toDate()?.toString()).format("MMM Do YYYY")}
          </div>
        );
      },
    },
    {
      title: "Debit Account",
      dataIndex: "debitData",
      key: 1,
      render: (val) => {
        return <div>{val?.debitInfo}</div>;
      },
    },
    {
      title: "Credit Account",
      dataIndex: "creditData",
      key: 2,
      render: (val) => {
        return <div>{val?.creditInfo}</div>;
      },
    },
    {
      title: "Debit",
      dataIndex: "debitData",
      key: 3,
      render: (val) => {
        return <div>{val?.debit}</div>;
      },
    },
    {
      title: "Credit",
      dataIndex: "creditData",
      key: 4,
      render: (val) => {
        return <div>{val?.credit}</div>;
      },
    },
    {
      title: "Action",
      key: 5,
      render: (text, record) => (
        <Space size="middle" className="action">
          <DeleteOutlined onClick={() => handleDeleteRecord(record)} />
        </Space>
      ),
    },
  ];
  return (
    <div className={style.mainContainer}>
      <Row className={style.mainHead}>
        <SimpleHeading heading="General Journal" size="35" margin="0px 0px" />
      </Row>
      <hr />
      <CustomTable loading={loading} columns={columns} data={data} />
    </div>
  );
}

export default GeneralEntries;
