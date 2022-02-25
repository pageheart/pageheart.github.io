var app = new Vue({ 
    el: '#app',
    data: {
        message: '메세지 출력'
    }
});

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString()
  }
})

var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
})

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: '리버스?'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

var app6 = new Vue({
  el: '#app-6',
  data: {
    message: '텍스트 연동'
  }
})

var insuranceContractNo = new Vue({
    el: '#insuranceContractNo',
    data: {
        insNo: '',
        inputDate: (new Date()).getFullYear() + '' + (((new Date()).getMonth()+1) < 10 ? '0'+((new Date()).getMonth()+1) : ((new Date()).getMonth()+1)) + ((new Date()).getMonth() < 10 ? '0'+(new Date()).getMonth() : (new Date()).getMonth())
    },
    methods: {
        sendScan: function () {
            if(this.insNo == '') {
                alert("계약번호를 입력 해주세요.");
                this.$refs.insNo.focus();
            }
            else if(this.inputDate == '') {
                alert("날짜를 입력 해주세요.");
                this.$refs.inputDate.focus();
            }
            else {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        insNo: this.insNo,
                        inputDate : this.inputDate
                     })
                };
                //fetch('https://jsonplaceholder.typicode.com/posts/1', requestOptions) //POST로 보내면 404에러남...
                fetch('https://jsonplaceholder.typicode.com/posts/1')
                    .then((response) => {
                        if(response.ok){
                            return response.json();
                        }
                        throw new Error('Network response was not ok');
                    })
                    .then((json) => {
                        console.log(json);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
    }
})
