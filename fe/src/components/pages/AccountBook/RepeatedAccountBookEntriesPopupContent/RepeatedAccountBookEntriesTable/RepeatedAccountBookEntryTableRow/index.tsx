import { memo, useState } from "react";
import { RepeatedAccountBookEntry } from "../../../../../../models/repeatedAccountBookEntry";

type Props = {
  isNew?: boolean;
  repeatedAccountBookEntry: RepeatedAccountBookEntry;
  reload: () => void;
}
const RepeatedAccountBookEntryTableRow = ({
  isNew = false,
  repeatedAccountBookEntry: { date, dayOfWeek, amount, title, description },
  reload,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    date,
    dayOfWeek,
    amount,
    title,
    description,
  });

  return <></>;
};

export default memo(RepeatedAccountBookEntryTableRow);
