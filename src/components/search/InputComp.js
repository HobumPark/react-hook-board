
import React, { Component } from 'react';
import '../../css/search/InputComp.css';
import axios from 'axios';

class InputComp extends Component {

    constructor(props){
        super(props);
        this.state={
            posts:this.props.posts,
            searchText:''
        }
    }

    searchBoardList=async()=>{
        const {searchText}=this.state
        //alert("게시판 검색 버튼!")
        alert("입력된 검색어:"+searchText)

        let res=null
        if(searchText===''){
            res = await axios.get('/api/get/board');
        }else{
            res = await axios.get(`/api/get/search?query=${searchText}&page=${1}`);
        }
        console.log(res.data.board_res)
        this.props.setBoardListBySearch(res.data.board_res)
    }

    searchAllBoardList=async()=>{
        window.location.href='/'
    }

    inputChange=(e)=>{
        this.setState({
            searchText:e.target.value
        })
    }

    handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            this.searchBoardList(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    render(){
        
        const {postList,currentPage,postsPerPage,totalPosts}=this.props
        const total=totalPosts;
        const totalPage=Math.ceil(total / postsPerPage)

        return(
            
            <div id="input-comp">
                <div id="notice-head">
                    <div>
                        <span></span>
                        <span></span>
                    </div>
                
                <h1>알립니다</h1>
                </div>
                <div id="board-info">
                    <ul>
                        <li>총게시물:</li>
                        <li>{totalPosts}</li>
                        <li>/</li>
                        <li>페이지:</li>
                        <li>{currentPage}</li>
                        <li>/</li>
                        <li>{totalPage}</li>
                    </ul>
                </div>
                <div id="board-search">
                    <select>
                        <option>제목</option>
                        <option>작성자</option>
                        <option>내용</option>
                    </select>
                    <input type="text" placeholder='검색어를 입력하세요' 
                    onChange={this.inputChange} onKeyUp={this.handleOnKeyPress} />
                    <button id="search-btn" onClick={this.searchBoardList}>검색</button>
                    <button id="search-all-btn" onClick={this.searchAllBoardList}>전체보기</button>
                </div>
            </div>
        );
    }
}

export default InputComp;
