
import React, { Component } from 'react';
import '../../css/main/Post.css';
import {Link} from 'react-router-dom';

class Post extends Component {

    constructor(props){
        super(props);
        this.state={
            
        }
    }
    //번호,제목,작성자,등록일,첨부,조회
    render(){
        return(
        <div id="post">
            <ul>
                <li>{this.props.id}</li>
                <li><Link to={`/postView?no=${this.props.id}`}><a href="#">{this.props.title}</a></Link></li>
                <li>{this.props.author}</li>
                <li>{this.props.regDate}</li>
                <li>{this.props.attach}</li>
                <li>{this.props.hits}</li>
            </ul>
        </div>
        )
        
    }
}

export default Post;
