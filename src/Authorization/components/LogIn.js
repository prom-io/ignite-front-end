import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import { LoginForm } from './LoginForm';
import CustomDialogTitle from './CustomDialogTitle';

const useStyles = makeStyles(theme => ({
    dialogSecondaryAction: {
        maxWidth: 374,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '15px',
        lineHeight: '18px',
        textAlign: 'center',
        color: theme.palette.primary.main,
        marginTop: '24px',
    },
}));

export const logIn = ({ setLoginDialogOpen, setSignUpDialogOpen }) => (
    <>
        <CustomDialogTitle title="Log in" />
        <DialogContent>
            <LoginForm
                hideSignUpButton
                disableCard
            />
            <Button
                variant="text"
                className={classes.dialogSecondaryAction}
                onClick={() => {
                    setSignUpDialogOpen(true);
                    setLoginDialogOpen(false);
                }}
            >
                Sign up
            </Button>
            <Button
                variant="text"
                className={classes.dialogSecondaryAction}
                onClick={() => setLoginDialogOpen(false)}
            >
                Close
            </Button>
        </DialogContent>
    </>
);
