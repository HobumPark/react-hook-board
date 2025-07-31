
import React, { Component } from 'react';
import '../../css/write/PostWriteQuill.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import moment from 'moment';

class PostWrite extends Component {

    constructor(props){
        super(props);
        this.state={
            title:'',
            contents:'',
            author:'',
            savefileName:'',
            selectedFile:null
        }      
    }

    handleChange=(e)=>{
        console.log('handleChange!')
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    setContents=(value)=>{
        this.setState({
            contents:value
        })
    }

    handleFileInput=(e)=>{
        this.setState({
          selectedFile : e.target.files[0],
        })
    }

    enrollPost=async()=>{
        alert("글 등록!(PostWrite)")
        const {title,contents,author}=this.state
        if(title===''){
            alert('제목을 입력하세요!')
            return
        }

        alert('제목:'+title)
        alert('이름:'+author)
        alert('내용:'+contents)
        //this.props.enrollPost(title,contents,author)
        
        const formData = new FormData();
        
        console.log('this.state.selectedFile')
        console.log(this.state.selectedFile)
        console.log(this.state.selectedFile.name)

        console.log('moment')
        console.log(moment().format('YYYYMMDDHHmmss'))
        console.log('formData')
        console.log(formData);

        formData.append('file', this.state.selectedFile);
        formData.append('addtime', moment().format('YYYYMMDDHHmmss'));

        await axios.post("/api/upload", formData).then(res => {
            alert('성공')
            console.log(res)
            console.log(res.data.savefile)
            const originalFileName=this.state.selectedFile.name
            const saveFileName=res.data.savefile
            alert('originalFileName:'+originalFileName)
            alert('saveFileName:'+saveFileName)
            this.props.enrollPost(title,contents,author,originalFileName,saveFileName)
        }).catch(err => {
            alert('실패')
        })
        
        //window.location.href="/"

    }

    componentDidMount(){

    }

    render(){
        return(
            
        <div id="post-write">
            <h1>게시판 글쓰기</h1>
            <span id="title-area">
                <div id='title-div'>
                    <label id="title">제목:</label>
                    <input type="text" id="title" 
                    maxlength="40" name="title" placeholder="제목을 입력해주세요"
                    onChange={this.handleChange}/> 
                </div>
               
                <div id='author-div'>
                    <label id="name">이름:</label>
                    <input type="text" placeholder="이름 입력"
                    onChange={this.handleChange} name="author"/>    
                </div>
                

                <button onClick={this.enrollPost}>등록</button>
            </span>
            <span id="cont-area">
                <ReactQuill theme="snow" value={this.state.contents} 
                onChange={this.setContents} name="contents"
                />
            </span>
            <span id="file-attach-area">
                <input type="file" name="file" onChange={e => this.handleFileInput(e)}/>
            </span>
            
        </div>
        )
    }
}

export default PostWrite;
