/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Divider, Row } from "antd";
import style from "./index.module.less";
import moment from "moment";
import Tags from "../../Components/Tags";
import { createPdfFromHtml } from "./logic";
import { useCollection } from "../../hooks/useCollection";
import { SimpleHeading } from "../../Components/Heading";
import { SimpleButton } from "../../Components/Buttons";
import { SimpleParagraph } from "../../Components/Paragraph";

export class FinancialStatementMainComponent extends React.Component {
  printContent;
  render() {
    return (
      <>
         <Row className={style.end}>
        <SimpleButton
          text={"Download Receipt"}
          onClick={this.handleClick}
          size={"small"}
          shape="round"
          className={style.btnStyle}
          type={"primary"}
        />
      </Row>
        <div id="print" className="A4">
          <Sheet />
          <div style={{ position: "fixed", top: "200vh" }}>
            <div
              ref={(el) => {
                this.printContent = el;
              }}
            >
              <Sheet />
            </div>
          </div>
        </div>
      </>
    );
  }

  handleClick = () => {
    createPdfFromHtml(this.printContent);
  };
}

const Sheet = () => {
  const { documents, error } = useCollection("generalEntry");
  // const { dispatch, rev, exp, netInc } = useAuthContext();
  console.log("documents: ", documents);

  const allTypesData = () => {
    let prevCapital = 10000;
    let revTotal = 0;
    let expTotal = 0;
    let netTotal = 0;
    let ownerWithDraw = 0;
    let assetsTotal = 0;
    let liabTotal = 0;
    let ownerEquity = 0;
    let endingOwnerEquity = 0;

    documents &&
      documents.map((arr, index) => {
        const { typeA, debit } = arr.debitData; //type and amount
        const { typeB, credit } = arr.creditData;
        // console.log(typeB,credit);

        console.log(typeB);

        if (typeB == "Revenue") {
          revTotal += Number(credit);
        }
        if (typeB == "Owner Equity") {
          ownerEquity += Number(credit);
        }
        if (typeA == "Expense") {
          expTotal += Number(debit);
        }
        if (typeA == "Owner withdraw") {
          ownerWithDraw += Number(debit);
        }
        if (typeA == "Asset") {
          assetsTotal += Number(debit);
        }
        if (typeB == "Asset") {
          assetsTotal -= Number(credit);
        }
        if (typeA == "Liability") {
          console.log("yes");
          liabTotal += Number(debit);
        }
        if (typeB == "Liability") {
          console.log("yes");
          liabTotal -= Number(credit);
        }
      });
    netTotal = revTotal - expTotal;
    endingOwnerEquity = netTotal + prevCapital - ownerWithDraw;

    console.log(assetsTotal, liabTotal);
    return {
      revTotal,
      expTotal,
      netTotal,
      ownerWithDraw,
      assetsTotal,
      liabTotal,
      ownerEquity,
      endingOwnerEquity,
    };
  };

  const generateIncomeStatement = () => {
    const { revTotal, expTotal, netTotal } = allTypesData();

    return (
      <div className={style.incomeStatement}>
        <div className={style.headContainer}>
          <SimpleHeading heading="Income Statement" size="25" margin="0px" />
          <SimpleHeading
            heading="for the year ended, December 31, 2022"
            size="20"
            margin="0px"
          />
          <div className={style.tagContainer}>
            {revTotal - expTotal > 0 ? (
              <Tags cssColor={style.tag} bgColor={"green"} text={"PROFIT"} />
            ) : (
              <Tags cssColor={style.tag} bgColor={"red"} text={"LOSS"} />
            )}
          </div>
        </div>
        <div className={style.flex}>
          <SimpleParagraph
            paragraph={`Revenue - Expense `}
            css={style.para}
            margin={"5px 0px"}
          />
          <SimpleParagraph
            paragraph={`= Net Icome (Profit/Loss)`}
            css={style.para}
            margin={"5px 0px"}
          />
        </div>
        <div className={style.flex}>
          <SimpleParagraph
            paragraph={`${revTotal} - ${expTotal}`}
            css={style.para}
            margin={"5px 0px"}
          />
          <SimpleParagraph
            paragraph={`${netTotal}`}
            css={style.para}
            margin={"5px 0px"}
          />
        </div>
        <div className={style.flex}>
          <Divider className={style.divider} />
        </div>
        <div className={style.flex}>
          <SimpleParagraph
            paragraph={`${
              revTotal - expTotal > 0 ? "Profit [ + ]" : "Loss [ - ]"
            }`}
            css={style.para}
            margin={"5px 0px"}
          />
          <SimpleParagraph
            paragraph={`$ ${netTotal}`}
            css={style.para}
            margin={"5px 0px"}
          />
        </div>
      </div>
    );
  };

  const generateOwnerEquityStatement = () => {
    const { netTotal, ownerWithDraw, ownerEquity } = allTypesData();
    let prevCapital = 10000;
    const balance = netTotal - ownerWithDraw;

    return (
      <div className={style.ownerEquityStatement}>
        <div className={style.headContainer}>
          <SimpleHeading
            heading="Statement of Owner's Equity"
            size="25"
            margin="0px"
          />
          <SimpleHeading
            heading="for the year ended, December 31, 2022"
            size="20"
            margin="0px"
          />
        </div>
        <div className={style.flex}>
          <SimpleParagraph
            paragraph={`UBIT Capital at Start of Year : `}
            css={style.para}
            margin={"5px 0px"}
          />
          <SimpleParagraph
            paragraph={`$ ${prevCapital} `}
            css={style.para}
            margin={"5px 0px"}
          />
        </div>
        <div className={style.flex}>
          <SimpleParagraph
            paragraph={`Add Net Income : `}
            css={style.para}
            margin={"5px 0px"}
          />
          <SimpleParagraph
            paragraph={`+ $ ${netTotal} `}
            css={style.para}
            margin={"5px 0px"}
          />
        </div>
        <div className={style.flex}>
          <Divider className={style.divider} />
        </div>
        <div className={style.flex}>
          <SimpleParagraph paragraph={``} css={style.para} margin={"5px 0px"} />
          <SimpleParagraph
            paragraph={`$ ${prevCapital + netTotal} `}
            css={style.para}
            margin={"5px 0px"}
          />
        </div>
        <div className={style.flex}>
          <SimpleParagraph
            paragraph={`Less Drawing : `}
            css={style.para}
            margin={"5px 0px"}
          />
          <SimpleParagraph
            paragraph={`- $ ${ownerWithDraw} `}
            css={style.para}
            margin={"5px 0px"}
          />
        </div>
        <div className={style.flex}>
          <Divider className={style.divider} />
        </div>
        <div className={style.flex}>
          <SimpleParagraph
            paragraph={`UBIT Capital at the End of Year : `}
            css={style.para}
            margin={"5px 0px"}
          />
          <SimpleParagraph
            paragraph={` ${
              prevCapital + netTotal - ownerWithDraw > 0 ? "+" : "-"
            } $${prevCapital + netTotal - ownerWithDraw} `}
            css={style.para}
            margin={"5px 0px"}
          />
        </div>
      </div>
    );
  };

  const balanceSheetStatement = () => {
    const { assetsTotal, liabTotal, ownerEquity, endingOwnerEquity } =
      allTypesData();
    let flag = 0;
    if (assetsTotal == liabTotal + ownerEquity) {
      //if balance is equal
      flag = 1;
    }

    return (
      <>
        <div className={style.balanceSheet}>
          <div className={style.headContainer}>
            <SimpleHeading heading="Balance Sheet" size="25" margin="0px" />
            <SimpleHeading
              heading={`as at ${moment(Date.now()).format("MMMM, DD YYYY")}`}
              size="20"
              margin="0px"
            />
            <div className={style.tagContainer}>
              {flag == 1 && (
                <Tags
                  cssColor={style.tag}
                  bgColor={"green"}
                  text={"BALANCED"}
                />
              )}
              {flag == 0 && (
                <Tags
                  cssColor={style.tag}
                  bgColor={"red"}
                  text={"UNBALANCED"}
                />
              )}
            </div>
          </div>
          <div className={style.flex}>
            <SimpleParagraph
              paragraph={`Assets = `}
              css={style.para}
              margin={"5px 0px"}
            />
            <SimpleParagraph
              paragraph={`Liabilities + Capital`}
              css={style.para}
              margin={"5px 0px"}
            />
          </div>
          <div className={style.flex}>
            <SimpleParagraph
              paragraph={`${assetsTotal}`}
              css={style.para}
              margin={"5px 0px"}
            />
            <SimpleParagraph
              paragraph={`${liabTotal} + ${ownerEquity}`}
              css={style.para}
              margin={"5px 0px"}
            />
          </div>
          <div className={style.flex}>
            <Divider className={style.divider} />
          </div>
          <div className={style.flex}>
            <SimpleParagraph
              paragraph={`$ ${assetsTotal}`}
              css={style.para}
              margin={"5px 0px"}
            />
            <SimpleParagraph
              paragraph={`$ ${liabTotal + ownerEquity}`}
              css={style.para}
              margin={"5px 0px"}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={style.financialStatements}>
      {generateIncomeStatement()}
      {generateOwnerEquityStatement()}
      {balanceSheetStatement()}
    </div>
  );
};

