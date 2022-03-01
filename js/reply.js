let getTime = function(time) {
    let date = new Date(time * 1000);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second;
};
let up = [
    {name: "asoul", uid: "703007996", img: "https://i2.hdslb.com/bfs/face/48d65a10a2c643dddc4a51e0a60fae892393417a.jpg@96w_96h_100Q_1c.webp"},
    {name: "嘉然", uid: "672328094", img: "https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg@96w_96h_100Q_1c.webp"},
    {name: "贝拉", uid: "672353429", img: "https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg@96w_96h_100Q_1c.webp"},
    {name: "向晚", uid: "672346917", img: "https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg@96w_96h_100Q_1c.webp"},
    {name: "乃琳", uid: "672342685", img: "https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg@96w_96h_100Q_1c.webp"},
    {name: "珈乐", uid: "351609538", img: "https://i1.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg@96w_96h_100Q_1c.webp"},
    {name: "小粒q", uid: "482480476", img: "https://i1.hdslb.com/bfs/face/f63093bc32327fe79faf75570ef405c60b40941a.jpg@128w_128h_1o.webp"},
    {name: "星瞳", uid: "401315430", img: "https://i0.hdslb.com/bfs/face/0d99e9ce3d812e9e846355f25feef6b9474bf3eb.jpg@128w_128h_1o.webp"},
    {name: "七海", uid: "434334701", img: "https://i2.hdslb.com/bfs/face/b9c8e5d37d1d053c001149a5f7a56d28c89f0a1e.jpg@128w_128h_1o.webp"},
    {name: "文静", uid: "667526012", img: "https://i2.hdslb.com/bfs/face/ac7482ed1b9a7f203dc68c0c4a77c488a27b108a.jpg@256w_256h_1o.webp"},
    {name: "阿梓", uid: "7706705", img: "https://i2.hdslb.com/bfs/face/96724d4de1d2338ac02b9ec9a6356f8883632144.jpg@128w_128h_1o.webp"},
    {name: "塔菲", uid: "1265680561", img: "https://i1.hdslb.com/bfs/face/4907464999fbf2f2a6f9cc8b7352fceb6b3bfec3.jpg@240w_240h_1c_1s.webp"},
    {name: "狗妈", uid: "386900246", img: "https://i2.hdslb.com/bfs/face/bd053f7423d7f9155be11049c3441d3a63eb55a5.jpg@128w_128h_1o.webp"},
    {name: "贵物", uid: "271887040", img: "https://i1.hdslb.com/bfs/face/abe68f64695bb98466f67df2b3bf6e066ff018f2.jpg@128w_128h_1o.webp"},
    {name: "罕见", uid: "1437582453", img: "https://i0.hdslb.com/bfs/face/0b6ed6593b10f3a9e3c0932db1f0a661d463a68b.jpg@128w_128h_1o.webp"},
    {name: "阿夸", uid: "375504219", img: "https://i0.hdslb.com/bfs/face/a7195c09c6ba4722966d745d6f692035d3fe4d95.jpg@128w_128h_1o.webp"}];

new Vue({
    el:"#app",
    data:{
        datas: [],
        state: '',
        time: 0,
        loading: false,
        message: ''
    },
    methods: {
        search() {
            let uid = this.$refs.uid.value;
            let searchType = this.$refs.searchType.value;
            this.loading = true;
            axios.get('/reply/get?searchType='+searchType+'&uid='+uid, ).then(e => {
                if (e.data.code == 200) {
                    this.state = 'fail';
                    this.message = e.data.errorMessage
                } else {
                    this.time = e.data.time / 1000;
                    let datas = e.data.data;
                    let newdata = [];
                    for (let i = 0; i < datas.length; i++) {
                        let datum = datas[i];
                        let u = 'unknown'
                        let img = "https://i0.hdslb.com/bfs/face/071b4c1a8cbcc4465de092686253d19a18e83440.jpg@96w_96h_100Q_1c.webp"
                        if (datum.upper !== '') {
                            let t = up.find(u => u.uid === datum.upper)
                            if (t) {
                                u = t.name;
                                img = t.img;
                            }
                        }
                        newdata.push({
                            "ctime": getTime(datum.ctime),
                            "uid": datum.mid,
                            "dynamicIdStr": datum.dynamicIdStr,
                            "oid": datum.oid,
                            "content": datum.content,
                            "like":datum.like1,
                            "upper": u,
                            "typeId": datum.typeId,
                            "mname": datum.mname,
                            "rpid": datum.rpid,
                            "img": img
                        });
                    }
                    this.datas=newdata;
                    this.state = 'success'
                }
                this.loading = false
            }).catch(e => {
                this.loading = false;
                this.state = 'fail'
                this.message = e
            })
        },
        lookReply(e) {
            window.open(this.geturl(e))
        },
        geturl(e) {
            if (e.type === 1) {
                return "https://www.bilibili.com/video/av"+ e.oid +"/#reply"+e.rpid
            } else {
                return "https://t.bilibili.com/"+ e.dynamicIdStr +"/#reply"+e.rpid
            }
        }
    }
})