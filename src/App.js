import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const App = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>가계부</Tab>
        <Tab>주식</Tab>
      </TabList>

      <TabPanel>
        {/* TODO: 가계부 화면 */}
        <h2>Any content 1</h2>
      </TabPanel>
      <TabPanel>
        {/* TODO: 주식 화면 */}
        <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
  );
};

export default App;
