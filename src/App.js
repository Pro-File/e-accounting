import React, { useEffect, useState } from "react";
import "./App.less";
import { Route, Switch } from "react-router-dom";
import LayoutWrapper from "./Layout/LayoutWrapper";
import GeneralEntries from "./Features/GeneralJournal";
import { FinancialStatementMainComponent } from "./Features/FinancialStatement";

const App = () => {
  return (
    <Switch>
      <LayoutWrapper>
        <Route path="/" exact component={GeneralEntries} />
        <Route
          path="/financial-statement"
          component={FinancialStatementMainComponent}
          exact
        />
        {/* <Route path="/ledger" component={Ledger} exact /> */}
      </LayoutWrapper>
    </Switch>
  );
};

export default App;
