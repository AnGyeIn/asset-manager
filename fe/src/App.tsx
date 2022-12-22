import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTabs from "./components/Tabs/PageTabs";
import { store } from "./store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <PageTabs />
      </Provider>
    </>
  );
};

export default App;
