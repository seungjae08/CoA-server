const { Comment, Content, Like_User, User } = require("../models")
const jwt = require("jsonwebtoken");
const cheerio = require("cheerio");
const axios = require('axios');
const baseURL = 'https://kr.coinness.com/';

let verifyToken;
let token = "";

module.exports = async (req, res) => {
    try {
        if (req.cookies.accessToken) {
            let token = req.cookies.accessToken;
            
            verifyToken = jwt.verify(token, "TokenSecret");
        } else {
            verifyToken = {
                userId : null,
                name: null
            };
        }

        let ulList = [];
        let html = await axios.get(baseURL);
        let $ = await cheerio.load(html.data);
        let $language =await $('div.el-dropdown').children("span").text();
        let $bodyList = await $('div.content-wrap ul.newscontainer').children('li');
        let langState =true;
        while(langState){
            html = await axios.get(baseURL);
            $ = await cheerio.load(html.data);
            $language =await $('div.el-dropdown').children("span").text();
            $bodyList = await $('div.content-wrap ul.newscontainer').children('li');
            if($language.indexOf("한국어")!==-1){
                await $bodyList.each(async function (i, elem) {
                    const titleObj = $(this).find('h3').text();
                    const body = $(this).find('div.h63').text();
                    const titleArr = titleObj.split('\n');
                    const title = titleArr[3];
                    const time = titleArr[1];
                    if (title !== undefined || comment !== "") {
                        ulList.push({
                            title: title,
                            body: body,
                            time: time
                        })
                    }
                })
                langState =false;
            }
        }
        
        
        // titleObj ="\n14:02\n\n유니스왑 상승폭/하락폭 TOP3 토큰\n공유하기"
        // title Arr["", "14:02", "", "유니스왑 상승폭/하락폭 TOP3 토큰", "공유하기"]
        // title = titleArr[3] => "유니스왑 상승폭/하락폭 TOP3 토큰"
        // time = title Arr[1] => "14:02"
        
        // 오래된 기사를 위로 새로운 기사를 밑으로 보낸다.
        // 크롤링시에 새로운 기사가 ulList[0] 번째로 오기 때문에 
        // 데이터베이스에서 기사를 관리하기가 불편하다.
        // 데이터베이스에서 어느 정도의 기사가 쌓이면 이전 데이터는 지울 계획이다.
        // 그렇게 진행했을 때 데이터베이스에서 가장 효율적으로 지우는 것은 맨 위 데이터
        // 부터 지워가기 시작하는 것이다.
        ulList.reverse();
        // title이 다른 것은 추가하고 같은것은 추가하지 않는다.
        let contentDb = await Content.findAll({
            raw:true
        })
        const contentInsertArr = [];
        ulList.reduce((acc,ele)=>{
            const findState = contentDb.find(eleDb => eleDb.title==ele.title&&eleDb.time==ele.time&&eleDb.body==ele.body)
            if(findState === undefined){
                contentInsertArr.push({...ele,likeCount:0})
            }
        },[])
        await Content.bulkCreate(contentInsertArr)
        
    
        // Contents 테이블 삭제 (너무 많은 데이터가 쌓이면 예전 데이터 삭제)
        // urlist를 데이터베이스에 저장한 뒤 다시 데이터들을 불러온다.
        // 이렇게 진행하는 이유는 데이터베이스 내에서 기사들을 구별하기 위해선 id가 필요하다.
        // 데이터가 db에 있어야 저장이 가능하다.
        
        if(contentDb.length>100){
            for(let i = 0 ; i<contentDb.length-100;i++){
                await Content.destroy({
                    where:{
                        id:contentDb[i].id,
                }})
            }
        }
        contentDb = await Content.findAll({
            raw:true
        })
        const likeUser = await Like_User.findAll({
            where:{userID:verifyToken.userId}
        })
        contentDb.reverse();
        const likeArr = likeUser.reduce((acc,ele)=>([...acc,ele.contentID]),[])
        res.status(200).send({
            result:contentDb,
            like:likeArr,
            name:verifyToken.name,
            // language:$language
        })
    } catch (err) {
        console.log(err)
        res.status(404).send(err)
    }
}


