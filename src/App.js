
import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import PostView from './components/view/PostView';
import PostWrite from './components/write/PostWrite';
import PostWriteQuill from './components/write/PostWriteQuill';
import PostMain from './components/main/PostMain';
import Footer from './components/common/Footer';

class App extends Component {

  //번호,제목,내용,작성자,등록일,첨부,조회
  constructor(props){
    super(props);

    this.state={
            posts:[
              {no:1,title:'시스템 장애신고 전화번호는 070-8823-6974 입니다.',contents:'내용1',author:'관리자',regDate:'2017-12-16',attach:'Y',hits:285},
            ]
            ,startIdx:0
            ,endIdx:0
    }
  
  }

  enrollPost=(title,contents,author,saveFileName)=>{
        alert("글 등록!(App)")
        alert("title:"+title)
        alert("contents:"+contents)
        alert("author:"+author)
        alert("saveFileName:"+saveFileName)
        
        //글번호는 지정안해도됨
        let myDate=new Date()
        let year=myDate.getFullYear()
        let month=myDate.getMonth()+1
        let day=myDate.getDate()
        
        if(month<10){
          month="0"+month
        }
        if(day<10){
          day="0"+day
        }

        let regDate=year+"-"+month+"-"+day
      const post ={title:title,contents:contents,author:author,regDate:regDate,attach:'Y',hits:0,saveFileName:saveFileName}
      this.axiosEnrollPost(post)
  }

   axiosEnrollPost = async (writePost) => {
  try {
      const res = await axios.post('/api/write/post/', writePost);
      console.log('추가결과', res);

      // 성공 시 홈으로 이동
      window.location.href='/'
    } catch (err) {
      console.error('게시글 등록 실패', err);
      // 실패 시 에러 핸들링 로직 추가 가능
    }
  };

  render(){
    const {posts}=this.state;

    return (
    <div className="App">
    <BrowserRouter>
       <Routes>
          <Route path='/postWrite' element={<PostWrite enrollPost={this.enrollPost}/>} />
          <Route path='/postWrite_quill' element={<PostWriteQuill enrollPost={this.enrollPost} />} />
          <Route path='/postView' element={<PostView/>} />
          <Route path='/' element={<PostMain posts={posts}/>}/> 
      </Routes>    
    </BrowserRouter>
    <Footer></Footer>
    </div>
  );
  }
  
}

export default App;
