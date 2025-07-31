
import React, { Component } from 'react';
import '../../css/main/PostList.css';
import Post from './Post';
import {Link} from 'react-router-dom';

class PostList extends Component {

    constructor(props){
        super(props);
        this.state={
            posts:this.props.posts,
        }
    }

    postWrite=()=>{
      //alert("글쓰기 버튼!")
    }

    render(){
    
    const {postList}=this.props;
    const result=postList.map(post=>(
      <Post key={post.no} id={post.no} title={post.title} 
      author={post.author} regDate={post.regDate}
      attach={post.attach} hits={post.hits}></Post>)
      )
        return (
    <div className="Posts">
  
      <ul id="post-list">
      <div id="post">
            <ul>
            <li>번호</li>
            <li>제목</li>
            <li>작성자</li>
            <li>등록일</li>
            <li>첨부</li>
            <li>조회</li>
            </ul>
      </div>
      {result}
      </ul>
      <div id="write-area">
        <button id="write-btn" onClick={this.postWrite}>
          <Link to={'/postWrite_quill'} id="write-btn-text">
              글쓰기
          </Link>
        </button>
        {
          /*
          <button id="write-btn" onClick={this.postWrite}><Link to={'/postWrite_quill'} id="write-btn-text">글쓰기(Quill)</Link></button>
          */
        }
      </div>
      
    </div>
  );
    }

}

export default PostList;
