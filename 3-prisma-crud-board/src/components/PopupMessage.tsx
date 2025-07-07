import { Dialog, DialogContent, DialogContentText, Zoom } from "@mui/material";
import { forwardRef, useEffect, Ref, ReactElement } from "react";
import { TransitionProps } from "@mui/material/transitions";

const BubbleTransition = forwardRef(function BubbleTransition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return (
    <Zoom ref={ref} {...props}>
      {props.children}
    </Zoom>
  );
});

type PopupMessageProps = {
  open: boolean;
  message: string;
  type: string;
  onClose: () => void;
};

export const PopupMessage = ({
  open,
  message,
  type,
  onClose,
}: PopupMessageProps) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  return (
    <Dialog
      fullWidth
      slots={{ transition: BubbleTransition }}
      open={open}
      onClose={onClose}
    >
      <DialogContent>
        <DialogContentText color={type}>{message}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default PopupMessage;
