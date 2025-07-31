
import React, { Component } from 'react';
import '../../css/common/Footer.css';

class Footer extends Component {

    constructor(props){
        super(props);
        this.state={
            
        }
    }

    render(){
        return(  
            <footer id="footer">
            <div id="footer-left">
                <ul>
                    <li><a href="#">개인정보처리방침</a></li>
                    <li><a href="#">이용약관</a></li>
                    <li><a href="#">대구시홈페이지 바로가기</a></li>
                </ul>
                <div id="address">
                    <span>(41911) 대구광역시 중구 공평로 88</span>
                    <span>대표번호 : 053)120</span>
                </div>
                <div id="copyright">
                    Copyright(C) 2017 Daegu Metropolitan City. All rights reserved
                </div>
            </div>
            <div id="footer-right">
                <img src="/images/logo_f.png" alt="로고"></img>
                <img src="/images/good_cs2018.png" alt="로고"></img>
            </div>
            </footer>
        );
    }
}

export default Footer;
