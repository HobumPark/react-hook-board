
import React, { Component } from 'react';
import '../../css/write/PostWrite.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

let textAreaStyle = {
    paddingTop:'20px',
    paddingLeft:'20px',
    boxSizing:'border-box',
    resize:'none',
    width:'90%',
    height:'500px',
    borderRadius: '10px',
    color:'#666',
    fontSize:'20px'
};

class PostWrite extends Component {

    constructor(props){
        super(props);
        this.state={
            title:'',
            contents:'',
            author:''
        }
      
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    enrollPost=()=>{
        //alert("글 등록!(PostWrite)")
        const {title,contents,author}=this.state
        this.props.enrollPost(title,contents,author)
        window.location.href="/"
    }

    componentDidMount(){

    }

    render(){
        return(
            
        <div id="post-write">
            <h1>게시판 글쓰기</h1>
            <span id="title-area">
                <div id="title-div">
                    <label id="title">제목</label>
                    <input type="text" id="title-input" 
                    maxlength="40" name="title" placeholder="제목을 입력해주세요"
                    onChange={this.handleChange}/> 
                </div>
                <div id="author-div">
                    <label id="author">글쓴이</label>
                    <input type="text" id="author-input" placeholder="글쓴이를 입력해주세요"
                     onChange={this.handleChange}/>
                </div>
                <button onClick={this.enrollPost}>등록</button>
            </span>
            <span id="cont-area">
                <label id="cont">내용</label><br/>
                <textarea name="contents" style={textAreaStyle}
                placeholder="내용을 입력해주세요"
                onChange={this.handleChange}></textarea> 
            </span>
            
        </div>
        )
    }
}

export default PostWrite;
