import { toast, ToastOptions } from "react-toastify";

const getToastOptions = (onClose?: () => void): ToastOptions => ({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  theme: "colored",
  pauseOnFocusLoss: false,
  onClose,
});

interface Props {
  message: string;
}
const DivFromMessage = ({ message }: Props) => {
  const lines = message.split("\n");
  return (
    <>
      {lines.map((line) => (
        <div key={Math.random()}>{line}</div>
      ))}
    </>
  );
};

type Id = number | string;
type ToastFunction = (message: string, onClose?: () => void) => Id;

export const toastError: ToastFunction = (message, onClose) =>
  toast.error(<DivFromMessage message={message} />, getToastOptions(onClose));

export const toastWarn: ToastFunction = (message, onClose) =>
  toast.warn(<DivFromMessage message={message} />, getToastOptions(onClose));

export const toastInfo: ToastFunction = (message, onClose) =>
  toast.info(<DivFromMessage message={message} />, getToastOptions(onClose));

export const dismissAllToast = () => toast.dismiss();
