Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el, binding) {
        // 聚焦元素
        el.focus()
    }
})
const list=JSON.parse(localStorage.getItem("listStorage"))||[]
const vm = new Vue({
    el: ".todoapp",
    data: {
        list: list,
        addName: "",
        // 编辑li，（排它），记录当前id
        nowId: -1,
        // 底部状态的切换（排它）记录当前状态
        current: "All"
    },
    methods: {
        // 删除功能
        del(id) {
            this.list = this.list.filter(item => item.id != id)
        },
        // 添加
        add() {
            let obj = { id: +new Date(), name: this.addName, flag: false }
            this.list.unshift(obj)
            this.addName = ""
        },
        // 编辑
        editAdd(id) {
            this.nowId = id
            // console.log(this.nowId);
        },
        ok(){
            this.nowId=-1
        },
        clear() {
            this.list = this.list.filter(item => !item.flag)
        },
        // 底部状态的切换（排它）记录当前状态
        tabChange(value) {
            this.current = value

        }
    },
    computed: {
        // 全选 反选
        change: {
            get() {
                return this.list.every(item => item.flag)
            },
            set(value) {
                this.list.forEach(item => item.flag = value)
            }
        },
        // 遍历的实际数组，不在原数组上进行操作，无法恢复原数组
        showList() {
            if (this.current == "All") {
                return this.list
            }
            else if (this.current == "active") {
                return this.list.filter(item => !item.flag)
            }
            else if (this.current == "completed") {
                return this.list.filter(item => item.flag)
            }
        },
        isShow() {
            return this.list.length > 0
        },
        //    计数
        isCount() {
            return this.list.filter(item => !item.flag).length
        },
        //    只要有一个已完成（true）的就显示
        isFooterShow() {
            return this.list.some(item => item.flag)
        }
    },
    watch:{
        list:{
            handler(newValue){
                deep:true,
                localStorage.setItem("listStorage",JSON.stringify(newValue))
            }
        }
    }

})
// 注册一个全局自定义指令 `v-focus`
