import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';
import React from 'react';
import {Card} from 'antd';
export default class Gitalks extends React.Component {

    componentDidMount(){
        const gitalk = new Gitalk({
            enable: true,
            clientID: '636922112cbabb01ff12',
            clientSecret: '0bd30a7dcc73d70e7bb9014200376f5a95268db1',
            repo: 'fh-combo.github.io',//hawerblogTalkAbout
            owner: 'fh-combo',
            admin: 'fh-combo',
            id: window.location.pathname,// this.props.path,
            distractionFreeMode: false
        })
        gitalk.render('gitalk-container')
    }

    render(){
        return(
            <Card
                style={{ width: '100%' ,marginTop:20}}
            >
            <div id='gitalk-container'></div>
            </Card>
        )
    }
}
