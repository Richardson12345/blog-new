<template>
  <div class="hello">
  <br>
  <br>
    <div class="row">
       <div class="tokyo jumbotron">
       <h1>++ HAVE A GREAT TIME EJONYING THIS FOOD BLOG ++ <br> special thanks to Richardson for making this blog happen</h1>
            <hr>
            客ナ日70装るなぴ詳人毎い長集だ四朝ヌ交社リ戦冷ぜ正内コオイス防強芸べ関2那ろレトン認調へ共1青冒み。賀カルエコ美小チツ指座フ宝変き回足ナホメロ張禁ぜぶけ競北ンさ零話ひふ権働マニ覧長覧館にらわ受東テセ夜教ネ保長ソコ阪旧りこふ良今予5岡ーすよほ握孝じすてン。

            東クヤト立守ナワ者環を画報ゅイスし高沢チルモリ変朝ヘタニ保投る持経不ー無洗ドす化54来よざンぴ谷図断社ずへり。80季表ヲ代重ッとゅ川競長に陶沢ご施本露ニオヲ景貸ネカユサ死回げておめ意9進ンこち。値発ワラツア城西ぶス堀脇イだ海大ヤミア工管卒リル界空れ微手タホ事少く無意ふゆこ作要ホテヤツ考当自枚ちフけど。

            17報ぼ報演隊ぎょし減8的生んふと率力むたっと口法ハラ告米出ち比混不エワ締投サ権出じぽめま科加タ子億ムネ師争効段ろ。紹ヘ国集キ変13降ツシ止見ヒ染前イまふリ用失博移でス満第東しさっ罪約ぽぎしず県治テミソ役辰締伐唄庵もむレあ。議リぱへ通9応ク罪手るござふ返員ヲシ張毎タナケル進襲テケユ天単ぜラず文道フク育家平ヤ略情びドで丈課や文5困ね元人てすど月付欺茶をぱ。

            長どじ併米ラしば竹6日人とあす報紙チヲルツ株手シミ田時っりま線譜スヱシカ入葉ルカケ就中ヒニ静警深水ヨ也徳消北査ルっ。言ぜひイ野記12紙ルム変作ル流別用まそ必能をわッ堀勝整ユ理原しドぶろ要海ぱこレい生会べ表処で婚15玉ッうは。刊ムワ重対サラモフ第人判せ福特ホステア出9最ヒマヤ核子ヱマアツ豪75物うね製構奪サト途静うぽ傾産ざトぜえ黒法う掲広ミ写教し質学但なつぎー。

            渡む化8住ハウ強47国ロオ間人くぞ行更モネカ付権ばうず面子フヱコ能汚ロカモ浮載み辛保む理境防津装つわ。和ニヘ設階ユオ和日サヘソ品出ネヘ吐労がけわた看香ど保強ノケワリ官書ょびけ開功1旬済図ぞ多棋可人ヒ著公レぱ物強健台水たね。猛離順びだおせ記査モミヲイ個拓負たしぴ未丁すれ掲阜ナ女地ぼトざの唯94意会ずつえす仕政ぽふぐ可解い菜5祝シウソ置査ソヤナ惑能たじぐれ異俣妃きばり。

       </div> 
      <div class="col col-xs-4 col-sm-4 col-md-4 ">
        <div class="card my-4">
         <h5 class="card-header">Search</h5>
         <div class="card-body">
           <div class="input-group">
             <input type="text" class="form-control" placeholder="this is just a dummy hehe....">
             <span class="input-group-btn">
               <button class="btn btn-secondary" type="button">Go!</button>
             </span>
           </div>
         </div>
        </div>
        <div class="card w-100" v-for="(blog, index) in blogArr" v-bind:key="index">
          <div class="card-header">
            <strong>
              {{blog.title}}
            </strong>
             by {{blog.user.username}} 
            <span 
            v-if="user == blog.user._id" class="tilt"
            >
            <i @click="updateBlog(blog._id)" class="far fa-edit"></i>
            &nbsp;
            <i @click="deleteBlog(blog._id)" class="fas fa-trash-alt"></i>
            </span>
          </div>
          <img  @click.prevent="display(blog._id)" @mouseout="toggle" @mouseover="toggle" :class="{ activate: isActive }" class="card-img-top" :src="blog.imgUrl" alt="Card image cap">
          <div class="card-footer text-muted" @click.prevent="display(blog._id)">
            <span>created at: {{blog.createdAt}} updated at: {{blog.updatedAt}}</span>
          </div>    
        </div>
      </div>
      <div class="col col-xs-8 col-sm-8 col-md 8 ">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      blogArr: [],
      isActive: false,
      user: localStorage.getItem('id')
    }
  },
  props: {
    msg: String
  },
  methods: {
    display (id) {
      this.$router.push(`/${id}/blog`)
    },
    toggle () {
      if ( this.isActive == true) {
        this.isActive = false
      } else {
        this.isActive = true
      }
    },
    updateBlog ( id ) {
      this.$router.push(`/update/${id}`)
    },
    deleteBlog ( id ) {
      axios.delete(`http://localhost:3000/blog/${id}`, { headers: { token: localStorage.getItem("token") } })
      .then(( result => {
        swal('item has been deleted', 'this post no longer exist', 'info')
        axios.get('http://localhost:3000/blog')
        .then((result => {
          this.blogArr = result.data
        }))
        .catch((err => {
          console.log(err)
        }))
      }))
      .catch(( err => {
        swal('oops', 'something went wrong on the deletion of this blog', 'warning')
      }))
    }
  },
  mounted () {
    axios.get('http://localhost:3000/blog')
    .then((result => {
      this.blogArr = result.data
    }))
    .catch((err => {
      console.log(err)
    }))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tokyo{
  padding: 50px;
  font-family: 'Kosugi Maru', sans-serif;
  margin-left:  20px;
  margin-right: 20px;
}

.tilt {
  float: right;
}

.activate {
  opacity: 0.85;
}


.container {
  margin: 0 auto;
}

.row {
  margin-left: 200px;
  margin-right: 200px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.jumbotron {
  margin-bottom: 0;
}

.card {
  margin-bottom: 20px;
}

.hello {
   background: #ECE9E6;  /* fallback for old browsers */
   background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
   background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
   min-height: 1000px 
 }
</style>
