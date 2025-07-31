
import React, { Component } from 'react';
import '../../css/main/PostMain.css';
import '../../css/main/Post.css';
import PostMainHeader from '../common/PostMainHeader';
import PostList from './PostList';
import PageNation from './PageNation';
import InputComp from '../search/InputComp';
import axios from 'axios';

class PostMain extends Component {
    //번호,제목,내용,작성자,등록일,첨부,조회
  constructor(props){
    super(props);

    this.state={
            postList:[],
            loading:false,
            currentPage:1,
            postsPerPage:10,
            total:0
        }
  }

  setCurrentPage=async(page)=>{
    this.setState({
      currentPage:page
    })

    

    const res = await axios.get(`/api/get/page/${page}`)
    console.log(res.data.board_res)
    var boardList=res.data.board_res
    var date;
    var fullDate='';
    for(var i=0; i<boardList.length; i++){
      console.log(boardList[i].regDate)
      date=new Date(boardList[i].regDate)
      fullDate
      =this.transDate(date)
      boardList[i].regDate=fullDate
    }

    this.setState({
      postList:boardList
    })
  }

  currentPosts=(totalPosts)=> {
    const {currentPage,postsPerPage}=this.state;
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const slicePosts = totalPosts.slice(indexOfFirst, indexOfLast);
    return slicePosts;
  }

  getBoarList = async() => {
    //alert("요청!")
    const res = await axios.get('/api/get/board');
    console.log(res);
    console.log(res.data.board_res);
    var boardList=res.data.board_res
    var date;
    var fullDate='';
    for(var i=0; i<boardList.length; i++){
      console.log(boardList[i].regDate)
      date=new Date(boardList[i].regDate)
      fullDate
      =this.transDate(date)
      boardList[i].regDate=fullDate
    }

    this.setState({
      postList:boardList
    })
  }

  getBoardCount=async()=>{
    const result = await axios.get('/api/count/board')
    console.log(result.data.board_res[0])
    const count = result.data.board_res[0].cnt
    this.setState({
      total:count
    })
  }

  transDate=(date)=>{
      var result=date.getFullYear()
      result += "-"
      if( date.getMonth()+1 < 10 ){
        result += ("0"+(date.getMonth()+1))
      }else{
        result += (date.getMonth()+1)
      }

      result += "-"
      if(date.getDay() < 10){
        result += ("0"+date.getDay())
      }else{
        result += (date.getDay())
      }
      return result;
    }

  setBoardListBySearch=(boardList)=>{
    console.log('setBoardListBySearch')
    this.setState({
      postList:boardList
    })
    this.setState({
      total:boardList.length
    })
  }  

  componentDidMount() {
    console.log('componentDidMount')
    this.getBoarList();
    this.getBoardCount();
  }

    render(){
      const {postList,postsPerPage,currentPage,total}=this.state;
      if(postList.length != 0){
        console.log('PostMain render!')
        return(
        <div id="post-main">  
            <PostMainHeader/>
            <InputComp posts={postList} currentPage={currentPage} 
            postsPerPage={postsPerPage} totalPosts={total}
            setBoardListBySearch={this.setBoardListBySearch}/>
            <PostList postList={postList}/>
            <PageNation postsPerPage={postsPerPage} totalPosts={total}
            setCurrentPage={this.setCurrentPage} currentPage={currentPage}/>
        </div>
        )
      }   
    }
}

export default PostMain;
