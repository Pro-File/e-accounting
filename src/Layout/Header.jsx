import { Col, Image, Row } from "antd";
import React from "react";
import MenuItem from "../Components/MenuItem";
import style from "./index.module.less";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Row>
        <Col lg={1} md={1} sm={1} xs={1}></Col>
        <Col lg={6} md={6} sm={6} xs={6}>
          <Link to="/">
            <Image
              src={logo}
              preview={false}
              width={100}
              height={70}
              className={style.logoContainer}
              alt="e-accounting"
            />
          </Link>
        </Col>
        <Col lg={17} md={17} sm={17} xs={17}>
          <div
            style={{
              display: "flex",
              margin: "0rem 1rem",
              justifyContent: "flex-end",
            }}
          >
            <MenuItem />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
