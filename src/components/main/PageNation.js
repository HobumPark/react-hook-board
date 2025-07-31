
import React, { Component } from 'react';
import '../../css/main/PageNation.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft,faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft,faAnglesRight } from "@fortawesome/free-solid-svg-icons";

class PageNation extends Component {

    constructor(props){
        super(props);
        this.state={
            firstPage:0,
            lastPage:0
        }
    }

    pageClick=(page)=>{
        this.props.setCurrentPage(page);
    }

    prevFunc=()=>{
        const {currentPage,totalPosts,postsPerPage}=this.props;
        const totalLastPage=Math.ceil(totalPosts / postsPerPage);
        let curFistPage = Math.floor(currentPage/10)*10 
        let curLastPage = 10*(1+Math.floor(currentPage/10))-1

        if(curFistPage < currentPage){
            if(1 == currentPage){
                alert('이동불가!')
                return
            }
        }

        this.props.setCurrentPage(currentPage-1)
        window.scrollTo({bottom:"0px", behavior: 'smooth'});
    }

    nextFunc=()=>{
        const {currentPage,totalPosts,postsPerPage}=this.props;
        const totalLastPage=Math.ceil(totalPosts / postsPerPage);
        let curFistPage = Math.floor(currentPage/10)*10 
        let curLastPage = 10*(1+Math.floor(currentPage/10))-1

        if(totalLastPage == currentPage){
            alert('이동불가!')
            return
        }

        this.props.setCurrentPage(currentPage+1)
        window.scrollTo({bottom:"0px", behavior: 'smooth'});
    }

    firstPage=()=>{
        this.props.setCurrentPage(1)
    }
    lastPage=()=>{
        const {currentPage,totalPosts,postsPerPage}=this.props;
        const totalLastPage=Math.ceil(totalPosts / postsPerPage);
        this.props.setCurrentPage(totalLastPage)
    }
    moreNextPage=()=>{
        this.nextFunc()
    }

    render(){
        const {totalPosts,postsPerPage,currentPage}=this.props;
        /*페이지 배열 추가*/
        let pageNumbers = [];
        console.log(totalPosts);
        console.log(postsPerPage);
        // 1~9 (10-1)   , (1+10*0)~(10*(1+0)-1)
        // 10~19 (20-1) , (0+10*1)~(10*(1+1)-1)
        // 20~29 (30-1) , (0+10*2)~(10*(1+2)-1) 
        //[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        //
        let totalLastPage = Math.ceil(totalPosts / postsPerPage)
        let curFistPage = Math.floor(currentPage/10)*10 
        let curLastPage = 10*(1+Math.floor(currentPage/10))-1
        let lastDiff = totalLastPage%10//5
        let curDiff = Math.abs(currentPage-totalLastPage)
        let morePage = true
        if( curDiff <= lastDiff){
            morePage=false
        }

        if(curFistPage<10){
            curFistPage=curFistPage+1
        }
        if(curLastPage>totalLastPage){
            curLastPage=totalLastPage
        }

        for (let i = curFistPage; i <= curLastPage; i++) {
            pageNumbers.push(i);
        }
        console.log(pageNumbers);

        var i=1;
        const pageList=pageNumbers.map(page=>(
            <span id="page" 
            className={currentPage===page? "active":""}
            key={page} onClick={()=>this.pageClick(page)}>
                {page}
            </span>
                )
            );

        return (
    <div className="pagenation">
        <div className="pageList">
            <a className="page" onClick={this.firstPage}>
                <FontAwesomeIcon icon={faAnglesLeft} />
            </a>
            <a className="page" onClick={this.prevFunc}>
                <FontAwesomeIcon icon={faAngleLeft} /> 
            </a>
            {pageList}
            {
                morePage===true?
                <span id="page" onClick={this.moreNextPage}>...</span>:''
            }
            <a className="page" onClick={this.nextFunc}>
                <FontAwesomeIcon icon={faAngleRight} />
            </a>
            <a className="page" onClick={this.lastPage}>
                <FontAwesomeIcon icon={faAnglesRight} />
            </a>
        </div>
    </div>
        );
    }
  
}

export default PageNation;
