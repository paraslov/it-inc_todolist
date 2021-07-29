import React, {useEffect} from 'react'
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
import {TodoLists} from '../TodoLists'
import {ErrorSnackbar} from '../../components'
import {useSelector} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import {authActions, Login} from '../Login'
import {selectAppStatus, selectIsAppInitialized} from './selectors'
import {appActions} from './index'
import {useActions} from '../../utils/redux-utils'

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    console.log('APP R')
    const appStatus = useSelector(selectAppStatus)
    const isAppInitialized = useSelector(selectIsAppInitialized)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        if(!isAppInitialized) initializeApp()
        console.log('shoot')
    }, [])

    if(!isAppInitialized) return <div style={{position: 'fixed', top: '40%', left: '40%'}}>
        <CircularProgress style={{width: '100px'}} />
    </div>

    return (
        <div className="App">
                <AppBar position="static" style={{height: '50px'}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit" onClick={() => logout()}>Log out</Button>
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
