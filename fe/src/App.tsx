import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTabs from "./components/Tabs/PageTabs";

const App = () => {
  return (
    <>
      <ToastContainer />
      <PageTabs />
    </>
  );
};

export default App;
