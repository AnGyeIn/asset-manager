import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Account from "./components/Account";
import Stock from "./components/Stock";

const App = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>가계부</Tab>
        <Tab>주식</Tab>
      </TabList>

      <TabPanel>
        <Account />
      </TabPanel>
      <TabPanel>
        <Stock />
      </TabPanel>
    </Tabs>
  );
};

export default App;
