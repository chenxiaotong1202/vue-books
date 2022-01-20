Vue.directive('focus',{
    inserted: function(el){
        el.focus()
    }
})

var vm = new Vue({
    el: '#app',
    //定义焦点触发事件
    data: {
        id:'',
        name:'',
        idFlag: false,
        books: [{
                id: 1,
                name: '西游记'
            },{
                id: 2,
                name: '红楼梦'
            },{
                id: 3,
                name: '水浒传'
            },{
                id: 4,
                name: '三国演义'
            }
        ]
    },
    methods: {
        BooksHandle: function(){
            //区分添加 或 编辑 
            if(this.idFlag){
                //编辑操作
                // this.books.some(function(item){
                //     if(item.id == this.id){ //此处的this.id  this指向的是window,而不是函数的调用者;所以拿不到data中id的值,故要用箭头函数,改变this指向
                //         console.log(this.id);
                //     }
                // })
                //改进如下: ——————————————————————————————
                this.books.some(item => {
                    if(item.id == this.id){
                        item.name = this.name //将文本框中name的值赋值给 当前的遍历项
                        //完成操作后,终止循环
                        return true
                    }
                })
                this.idFlag = false
            }else{
                //添加操作
                //添加图书
                var book = {}
                book.id = this.id
                book.name = this.name
                this.books.push(book)
                }
                //清空表单
                this.id = this.name = ''
            
        },
        edit: function(id){
            var book = this.books.filter(function(item){
                //比对点击了的id 跟数据中的id
                return item.id == id
            })
            //把信息填充到表单中
            this.id = book[0].id
            this.name = book[0].name
            //禁用修改id
            this.idFlag = true
        }
    }
})