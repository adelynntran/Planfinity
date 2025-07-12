//warning pop up component
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function WarningBox({title, message, open, onConfirm, onCancel}) {

    //debugging console.log:

    //track "open" true/false state:
    React.useEffect(() => {
        console.log('WarningBox: Dialog open state changed to:', open);
    }, [open]);
    const handleConfirm = () => {
        console.log("WarningBox: User clicked YES");
        onConfirm(); //call the function
    };

    const handleCancel = () => {
        console.log("WarningBox: User clicked CANCEL");
        onCancel(); //call the function
    };

  return (
    <React.Fragment>
      <Dialog
        open={open} //open prop: true -> dialog app appear, else otherwise
        onClose={handleCancel} //use the wrapper function
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} autoFocus>Yes</Button>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
