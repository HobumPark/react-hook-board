
import React, { Component } from 'react';
import '../../css/view/PostDetail.css';
import axios from 'axios';
import download from 'downloadjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class PostDetail extends Component {

    constructor(props){
        super(props);
        this.state={
            edit:false,
            title:this.props.title,
            contents:this.props.contents,
            prevOnly:false,
            nextOnly:false,
            prevAndNext:false,
            prevAndNextPost:[]
        }
    }

    deletePost=async()=>{
        //alert("삭제")
        const no=this.props.no

        if(this.props.fileName !==''){

        const file={fileName:this.props.fileName}
            await axios.delete('/api/delete/post'+no,{
            data: {
                file: file
            },
            withCredentials:true
        })
        window.location.href="/"
        }else{
            await axios.delete('/api/delete/post'+no)
            
            window.location.href="/"
        }
    }

    UpdatePost=async()=>{
        //alert("수정")
        const no=this.props.no
        const {edit}=this.state
        const {title,contents}=this.state
        const res=null
        //alert(edit)
        if(edit===true){
            //alert("수정 요청 전송")
            //alert("수정할 제목:"+title)
            //alert("수정할 내용:"+contents)
            const updatePost = {'title':title,'contents':contents}
            this.setState({
            edit:!edit
            })

            await axios.patch('/api/update/post'+no,
                updatePost
                ).then( res => {
                console.log(res)
            }
        ).catch( ( error ) => {
        console.log( error );
        } )
        }else if(edit===false){
             this.setState({
            edit:!edit
        })
        }

    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    goBoardList=()=>{
        window.location.href="/"
    }

    componentDidMount(){
        this.getPrevNextViewList()
    }

    getPrevNextViewList=async()=>{
        const no=this.props.no
        const res = await axios.get('/api/get/prevAndNext'+no)
        console.log('res',res)
        console.log('res.data.board_res',res.data.board_res)
        this.setState({
            prevAndNextPost:res.data.board_res
        })
        console.log('res.data.board_res',res.data.board_res.length)
        const length=res.data.board_res.length//길이 저장
        if(length==2){//길이가 2일때는, 이전,다음 번호 둘다 있는 상황
            //alert('이전,다음 둘다 있습니다.')
            this.setState({
                prevAndNext:true
            })
        }else if(length==1){//길이가 1일때는, 이전,다음 둘중 하나만 있는 상황
            //이전만있는 상황인지? 다음만 있는 상황인지 또 구분해야함
            //alert(res.data.board_res[0].no)
            const db_no=res.data.board_res[0].no
            //쿼리에서 가져온 결과가 현재 상세보기한 글 번호보다 작으면?
            //23(끝)에서 다음 22번이 되는 경우

            //쿼리에서 가져온 결과가 현재 상세보기한 글 번호보다 크면?
            //1번(끝)에서 이전 2번이 되는경우
            if(db_no<no){
                //alert("다음만 있는 형태")
                this.setState({
                    nextOnly:true
                })
            }else{
                //alert("이전만 있는 형태")
                this.setState({
                    prevOnly:true
                })
            }
        }
    }

    fileDownLoad=async()=>{
        alert("파일 다운로드!")
        const result=await axios.get(`/download/${this.props.stored_file_name}`,{responseType: 'blob' })
        download(result.data, this.props.stored_file_name);
    }

    setContents=(value)=>{
        this.setState({
            contents:value
        })
    }

    render(){

        const {edit}=this.state
        let tempRegDate=this.props.regDate
        let myDate=new Date(tempRegDate)
        let year=myDate.getFullYear()
        let month=myDate.getMonth()+1
        let day=myDate.getDate()
        if(month<10){
            month="0"+month
        }
        if(day<10){
            day="0"+day
        }
        const editRegDate=year+"-"+month+"-"+day

        if(edit===false){
            return(
        <div id="post-detail">
            <ul>
                <li>
                <span>{this.props.no}</span>
                <span>
                <button onClick={this.deletePost}>삭제</button>
                <button onClick={this.UpdatePost}>수정</button>
                </span>
                </li>
                <li>{this.state.title}</li>
                <li>
                    <ul id="sub-ul">
                        <li><span>작성자:{this.props.author}</span></li>
                        <li><span>등록일:{editRegDate}</span></li>
                        <li><span>조회수:{this.props.hits}</span></li>
                    </ul>
                </li>
                <li>
                    <span>첨부:{this.props.attach}</span>
                    <br></br>
                    <span>파일:<b id="file-down" onClick={this.fileDownLoad}>{this.props.original_file_name}</b></span>
                </li>
                <li>
                    {this.state.contents}
                    
                </li>
                <li>
                    <button>
                        <div>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <h1 onClick={this.goBoardList}>목록</h1>
                    </button>
                </li>
                <li>
                    {this.state.prevAndNext? 
                    <div id="prev-next-wrap">
                        <div id="prev-post">
                        <button>
                            이전
                        </button>
                        <span>
                                {this.state.prevAndNextPost[0].title}
                        </span>
                        </div>
                        <div id="next-post">
                        <button>
                            다음 
                        </button>
                        <span>
                                {this.state.prevAndNextPost[1].title}
                        </span>
                        </div>
                    </div>:''}

                    {this.state.prevOnly? 
                    <div id="prev-next-wrap">
                        <div id="prev-post">
                        <button>
                            이전
                        </button>
                        <span>
                                {this.state.prevAndNextPost[0].title}
                        </span>
                        </div>
                        <div id="next-post">
                            다음글은 없습니다.
                        </div>
                    </div>:''}
                      
                    {this.state.nextOnly? 
                    <div>
                        <div id="prev-post">
                            이전글은 없습니다.
                        </div>
                        <div id="next-post">
                        <button>
                            다음
                        </button>
                        <span>
                                {this.state.prevAndNextPost[0].title}
                        </span>
                        </div>
                    </div>:''}
                </li>
            </ul>
        </div>
        )
        }else if(edit===true){
            return(
                <div id="post-detail">
                <ul>
                    <li>
                    <span>{this.props.no}</span>
                    <span>
                    <button onClick={this.deletePost}>삭제</button>
                    <button onClick={this.UpdatePost}>수정</button>
                    </span>
                    </li>
                    <li><input type="text" defaultValue={this.state.title} id="edit-title"
                    name="title" onChange={this.handleChange}/></li>
                    <li>
                        <ul id="sub-ul">
                            <li><span>작성자:{this.props.author}</span></li>
                            <li><span>등록일:{this.props.reg_date}</span></li>
                            <li><span>조회수:{this.props.hits}</span></li>
                        </ul>
                    </li>
                    <li>첨부:{this.props.attach}</li>
                    <li>
                        <ReactQuill theme="snow" value={this.state.contents} 
                                        onChange={this.setContents} name="contents"/>
  
                    </li>
                    <li>
                        <button>
                            <div>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <h1 onClick={this.goBoardList}>목록</h1>
                        </button>
                    </li>
                </ul>
            </div>
            )
        }

    }
}

export default PostDetail;
