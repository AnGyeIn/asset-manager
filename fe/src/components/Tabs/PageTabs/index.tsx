import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useCallback, useState } from "react";
import AccountBook from "../../pages/AccountBook";
import Administration from "../../pages/Administration";
import Stocks from "../../pages/Stocks";
import TabPanel from "../TabPanel";
import { PageTabKey, pageTabs } from "./constants";

const PageTabs = () => {
  const [selectedTabKey, setSelectedTabKey] = useState(PageTabKey.ACCOUNT_BOOK);

  const onTabChange = useCallback(
    (_: SyntheticEvent, tabKey: PageTabKey) => setSelectedTabKey(tabKey),
    []
  );

  return (
    <>
      <Tabs value={selectedTabKey} onChange={onTabChange}>
        {pageTabs.map(({ tabKey, label }) => (
          <Tab key={`page-tab-${tabKey}`} value={tabKey} label={label} />
        ))}
      </Tabs>
      <TabPanel
        tabKey={PageTabKey.ACCOUNT_BOOK}
        selectedTabKey={selectedTabKey}
        component={<AccountBook />}
      />
      <TabPanel
        tabKey={PageTabKey.STOCKS}
        selectedTabKey={selectedTabKey}
        component={<Stocks />}
      />
      <TabPanel
        tabKey={PageTabKey.ADMINISTRATION}
        selectedTabKey={selectedTabKey}
        component={<Administration />}
      />
    </>
  );
};

export default PageTabs;
