import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodoLists} from '../features/TodoLists/TodoLists'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {selectAppStatus, selectIsAppInitialized} from '../utils/selectors/selectors'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Login} from '../features/Login/Login'
import {logout} from '../features/Login/auth_reducer'
import {initializeApp} from './app_reducer'

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    console.log('APP R')
    const appStatus = useSelector(selectAppStatus)
    const dispatch = useDispatch()
    const isAppInitialized = useSelector(selectIsAppInitialized)

    useEffect(() => {
        if(!demo) dispatch(initializeApp())
    }, [])

    const handleLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    if(!isAppInitialized) return <div style={{position: 'fixed', top: '40%', left: '40%'}}>
        <CircularProgress style={{width: '100px'}} />
    </div>

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
                        <Button color="inherit" onClick={() => handleLogout()}>Log out</Button>
                    </Toolbar>
                </AppBar>
                <div style={{height: '5px'}}>
                    {appStatus === 'loading' && <LinearProgress color="secondary"/>}
                </div>
                <Container fixed>
                    <Switch>
                        <Route exact path={'/'} render={() => <TodoLists demo={demo} />} />
                        <Route path={'/login'} render={() => <Login />} />
                        <Route path={'/404'} render={() => <h1>404 NOT FOUND</h1>} />
                        <Redirect from={'*'} to={'/404'} />
                    </Switch>
                </Container>
                <ErrorSnackbar/>
        </div>
    )
}

export default App;
