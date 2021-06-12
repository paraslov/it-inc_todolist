import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodoLists} from '../features/TodoLists/TodoLists';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {selectAppStatus} from '../utils/selectors/selectors';

type PropsType = {
    demo?: boolean
}
function App({demo = false}: PropsType) {
    console.log('APP R')
    const appStatus = useSelector(selectAppStatus)
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {appStatus === 'loading' && <div>
                <LinearProgress color="secondary"/>
            </div>}
            <Container fixed>
                <TodoLists demo = {demo}/>
            </Container>
            <ErrorSnackbar />
        </div>
    )
}

export default App;
