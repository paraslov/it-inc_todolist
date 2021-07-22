import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {useDispatch, useSelector} from 'react-redux'
import {setAppError} from '../../app/app_reducer'
import {appSelectors} from '../../app'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}))

export function ErrorSnackbar() {
    const classes = useStyles()

    const dispatch = useDispatch()
    const error = useSelector(appSelectors.selectAppError)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError({error: null}))
    }

    return (
        <div className={classes.root}>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}