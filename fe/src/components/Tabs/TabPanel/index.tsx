import { memo } from "react";

interface Props<K> {
  tabKey: K;
  selectedTabKey: K;
  component: JSX.Element;
}
const TabPanel = <K extends unknown>({
  tabKey,
  selectedTabKey,
  component,
}: Props<K>) => {
  return tabKey === selectedTabKey ? component : <></>;
};

export default memo(TabPanel);
