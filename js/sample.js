//클로저 샘플
function dateListHtmlTagSet(year) {
	var sisangsafebox = document.createElement("div");
	sisangsafebox.className = "card-ty-sisangsafebox";
	var cardInfo = document.createElement("div");
	cardInfo.className = "card-info";
	var accWrap = document.createElement("dl");
	accWrap.className = "acc-wrap";
	var yeartitle = document.createElement("dt");
	yeartitle.className = "btn-acc resetbtn yeartitle";
	yeartitle.appendChild(document.createTextNode(year+'년'));
	var resetform = document.createElement("dd");
	resetform.className = "acc-form resetform";
	
	
	sisangsafebox.appendChild(cardInfo);
	cardInfo.appendChild(accWrap);
	accWrap.appendChild(yeartitle);
	accWrap.appendChild(resetform);
	
	return function(setDate, vo) {
		let cardEachbox = document.createElement("div");
		cardEachbox.className = "card-ty-eachbox";
		let strongTag = document.createElement("strong");
		strongTag.appendChild(document.createTextNode(numberInit(setDate.toString().substr(4,2)) + '월 지급 예정'));
		let cardEachInfo = document.createElement("div");
		cardEachInfo.className = "card-eachinfo";
		let listEachInfo = document.createElement("div");
		listEachInfo.className = "list-eachinfo";
		let dataDl = document.createElement("dl");
		let dataFirstDt = document.createElement("dt");
		let dataFirstDd = document.createElement("dd");
		let dataSecondDt = document.createElement("dt");
		let dataSecondDd = document.createElement("dd");
		let dataThirdDt = document.createElement("dt");
		let dataThirdDd = document.createElement("dd");
		
		resetform.appendChild(cardEachbox);
		cardEachbox.appendChild(strongTag);
		cardEachbox.appendChild(cardEachInfo);
		cardEachInfo.appendChild(listEachInfo);
		dataDl.appendChild(dataFirstDt);
		dataDl.appendChild(dataFirstDd);
		dataDl.appendChild(dataSecondDt);
		dataDl.appendChild(dataSecondDd);
		dataDl.appendChild(dataThirdDt);
		dataDl.appendChild(dataThirdDd);
		listEachInfo.appendChild(dataDl);
		
		let toYearMoney = 0;
		let beginYearMoney = 0;
		let sumMoney = 0;
		
		if(vo) {
			toYearMoney = vo.toYearMoney;
			beginYearMoney = vo.beginYearMoney;
			sumMoney = vo.sumMoney;
		}
		
		setDate = numberInit(setDate)-1;
		if(setDate.toString().substr(4,2) == '00') {
			setDate = numberInit((Number(setDate.toString().substr(0,4))-1)+'12');
		}
		let toYear = numberInit(setDate.toString().substr(2,2));
		let beginYear = '00';
		if(toYear == 0) {
			toYear = '00';
			beginYear = '99';
		}
		else if(toYear < 10) {
			toYear = '0' + toYear;
			beginYear = '0' + (toYear-1);
		}
		else {
			beginYear = toYear-1;
		}
		
		dataFirstDt.appendChild(document.createTextNode('익월('+toYear+'.'+numberInit(setDate.toString().substr(4,2))+'월 실적분)'));
		dataFirstDd.appendChild(document.createTextNode(numberInit(toYearMoney).toLocaleString("ko-KR") + '원'));
		dataSecondDt.appendChild(document.createTextNode('전년('+beginYear+'.'+numberInit(setDate.toString().substr(4,2))+'월 실적분)'));
		dataSecondDd.appendChild(document.createTextNode(numberInit(beginYearMoney).toLocaleString("ko-KR") + '원'));
		let thirdDtStrong = document.createElement("strong");
		thirdDtStrong.appendChild(document.createTextNode('당월 총 지급액'));
		dataThirdDt.appendChild(thirdDtStrong);
		let thirdDdStrong = document.createElement("strong");
		thirdDdStrong.style.color = '#003070';
		thirdDdStrong.style.fontSize = '14px';
		thirdDdStrong.appendChild(document.createTextNode(numberInit(sumMoney).toLocaleString("ko-KR") + '원'));
		dataThirdDd.appendChild(thirdDdStrong);
		
		return sisangsafebox;
	}
}

function addTagInHtml()  {
    let htmlTagFnc = new dateListHtmlTagSet('2022');
    let voList = [{
        toYearMoney : 10000
        ,beginYearMoney : 20000
        ,sumMoney : 30000
    } 
    ,{
        toYearMoney : 40000
        ,beginYearMoney : 50000
        ,sumMoney : 90000
    }];
    let tagData;
    let setDate = 202212;
    voList.forEach(vo => {
        tagData = htmlTagFnc(setDate--, vo);
    });
    return tagData;
}
  
function numberInit(num) {
    if(isNaN(Number(num))) num = 0;
    return Number(num);
}
