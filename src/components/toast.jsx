import { toast } from "sonner";

export const TOAST_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
  DEFAULT: "default",
};

export const Toast = {
  show: ({ message, type = TOAST_TYPE.DEFAULT, description, duration = 3000, action }) => {
    const config = {
      description,
      duration,
      action,
    };

    switch (type) {
      case 'success':
        toast.success(message, config);
        break;
      case 'error':
        toast.error(message, config);
        break;
      case 'info':
        toast.info(message, config);
        break;
      case 'warning':
        toast.warning(message, config);
        break;
      default:
        toast(message, config);
    }
  },
};
