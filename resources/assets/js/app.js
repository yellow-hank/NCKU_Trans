import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route,Switch} from 'react-router-dom';
import Home from './home';
import Comment from './comment';
import Layout from './layout';
import Post from './post';
import Admin from './admin';
import EditMajor from './editMajor';
import EditComment from './editComment';
import EditQA from './editQA';
import EditStandard from './editStandard';
import QA from './major_QA';
import error from './error';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

class App extends Component{
    constructor(props) {
        super(props);
        this.state={
            token:"",
            fliter:""
        }
        this.setToken=this.setToken.bind(this);
    }

    setToken( token ){
        const set=new Promise((resolve)=>{
            this.setState({token:token});
            resolve();
        })
        set.then((resolve)=>{
            location.href="/#/admin/comment"
        })
    }

    render(){
        return(
        <HashRouter>    
            <Switch>
                <Route exact path="/" component={Home}/>
                <Layout onChange={(fliter)=>{this.setState({fliter:fliter})}}>
                    <Route path="/comment" component={Comment}/>
                    <Route path="/post" component={Post}/>
                    <Route path="/QA/:id" render={(props)=><QA {...props} fliter={this.state.fliter}/>}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/admin/login" render={(props)=><Admin {...props} setToken={this.setToken}/>}/>
                    <Route path="/admin/comment" render={(props)=><EditComment {...props} token={this.state.token}/>}/>
                    <Route path="/admin/QA" render={(props)=><EditQA {...props} token={this.state.token}/>}/>
                    <Route path="/admin/major" render={(props)=><EditMajor {...props} token={this.state.token}/>}/>
                    <Route path="/admin/standard" render={(props)=><EditStandard {...props} token={this.state.token}/>}/>
                </Layout>
                <Route path="" component={error}/>         
            </Switch>
        </HashRouter>
        );
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );
