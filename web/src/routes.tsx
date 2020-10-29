import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Landing from './pages/Landing'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/Create-Orphanage'
import OrphanagesMap from './pages/OrphanagesMap'

function Routes(){
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing}/>
            <Route path="/app" exact component={OrphanagesMap}/>
            <Route path="/orphanage/create" exact component={CreateOrphanage}/>
            <Route path="/orphanage/:id" exact component={Orphanage}/>
        </BrowserRouter> 
    );
}


export default Routes;