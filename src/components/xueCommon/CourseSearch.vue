<template>
  <div
    class="course-search"
    :class="{'course-search--select': showSelectList && hasSelectVal}">
    <input
      @keyup.enter="search"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      class="search-input"
      type="text"
      ref="searchInput"/>
    <div class="search-btn" @click="search">
      <i class="iconfont1 icon-fangdajing"></i>
    </div>
    <div class="hot-words" v-if="showSelectAndHotWords">
      <a
        v-for="(item, index) in hotwords"
        :key="index"
        :href="`https://www.xueersi.com/search?keyword=${item}`"
        class="hot-words__item">{{item}}</a>
    </div>
    <div class="select-list" v-if="hasSelectVal" :style="{ visibility: isFocus ? 'visible' : 'hidden'}">
      <div class="select-list-container" :class="{'select-list-container--hide': !showSelectList}">
        <div class="border"></div>
        <div class="query-list" v-if="querySugList.length > 0">
          <a
            class="query-list__item"
            v-for="(item, index) in querySugList"
            :key="index"
            :href="`https://www.xueersi.com/search?keyword=${item}`"
            v-html="formatQueryItem(item)">
          </a>
        </div>
        <template v-else>
          <div class="search-hot-words" v-if="searchHotWords&&searchHotWords.length > 0">
            <div class="search-hot-words__header">热门搜索</div>
            <a
              class="hot-words-item"
              v-for="(item, index) in searchHotWords"
              :key="index"
              :href="`https://www.xueersi.com/search?keyword=${item}`">
              <span class="hot-words-item__tag" :class="`hot-words-item__tag--${index + 1}`">{{index + 1}}</span>{{item}}
            </a>
          </div>
          <div class="history clear" v-if="searchHistory&&searchHistory.length > 0">
            <div class="history-header">
              <span class="history-header__title">搜索历史</span>
              <span class="history-header__delete" @click="deleteHistory">全部删除</span>
            </div>
            <a
              class="history__item"
              v-for="(item, index) in searchHistory"
              :key="index"
              :href="`https://www.xueersi.com/search?keyword=${item}`">{{item}}</a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import xss from 'xss'
import { Search } from '@/networks/api'
import { localStorage } from '@/util/storage'

export default {
  name: 'course-search',
  data () {
    return {
      timer: null,
      isFocus: false,
      showSelectList: false,
      showSelectAndHotWords: true,
      hotwords: [],
      searchHotWords: [],
      searchHistory: [],
      querySugList: []
    }
  },
  computed: {
    ...mapState({
      userIsLogin: state => state.userIsLogin
    }),
    hasSelectVal () {
      return this.searchHistory.length > 0 || this.querySugList.length > 0 || this.searchHotWords.length > 0
    }
  },
  watch: {
    userIsLogin (val) {
      const { query } = this.$route
      const { isLogin, isLogout, isRegister } = query
      if (val && !(isLogin || isLogout || isRegister)) {
        this.getSearchHistory()
      }
    }
  },
  async mounted () {
    const { data } = await Search.getHotWords()
    const { hotwords, searchHotWords } = data.data
    this.hotwords = hotwords
    this.searchHotWords = searchHotWords || ['asdasd', 'asd']
    // console.log(hotwords, searchHotWords)
    if (this.userIsLogin) {
      this.getSearchHistory()
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  methods: {
    async getSearchHistory () {
      const { data } = await Search.getSearchHistorys()
      if (data.status) {
        this.searchHistory = data.data[0]
      }
    },
    search () {
      const value = xss(this.$refs.searchInput.value)
      const list = localStorage.getItem('searchHistory').list || []
      list.push(value)
      localStorage.setItem('searchHistory', { list })
      if (value) {
        window.open(`https://www.xueersi.com/search?keyword=${value}`)
      }
    },
    handleInput () {
      this.setTimeoutGetQuery()
    },
    setTimeoutGetQuery () {
      clearTimeout(this.timer)
      const value = xss(this.$refs.searchInput.value)
      if (value) {
        this.timer = setTimeout(async () => {
          clearTimeout(this.timer)
          const { data } = await Search.getQuerySug({ keyword: this.$refs.searchInput.value })
          this.querySugList = data.data.querySugList
        }, 1000)
      } else {
        this.querySugList = []
      }
    },
    async deleteHistory () {
      console.log('删除', '888888')
      this.searchHistory = []
      localStorage.setItem('searchHistory', { list: [] })
      await Search.deleteSearchHistorys()
    },
    handleFocus () {
      this.$nextTick(() => { this.isFocus = true })
      this.searchHistory = localStorage.getItem('searchHistory').list || []
      this.showSelectList = true
      this.showSelectAndHotWords = false
      this.handleInput()
    },
    handleBlur () {
      setTimeout(() => {
        this.showSelectList = false
      }, 100)
      setTimeout(() => {
        this.isFocus = false
      }, 500)
      this.querySugList = []
      this.selectListContainerHeight = 0
      
      if (this.$refs.searchInput.value) {
        this.showSelectAndHotWords = false
        return
      }
      this.showSelectAndHotWords = true
    },
    formatQueryItem (item) {
      const value = xss(this.$refs.searchInput.value)
      const str = item.replace(`${value}`, `<span style="color:#ff0021;">${value}</span>`)
      return str
    }
  }
}
</script>

<style lang="less" scoped>
.course-search{
  height: 30px;
  padding-left: 20px;
  position: relative;
  border-radius: 20px;
  border: 1px solid #e5e5e5;
  transition: all 0.3s ;
  color: #333333;
}
.course-search--select{
  border-radius: 20px 20px 0 0;
  border-bottom-color: transparent;
}
.search-input{
  height: 100%;
  width: 90%;
  font-size: 12px;
  float: left;
  outline: 0;
  border: none;
}
.search-btn{
  float: left;
  height: 30px;
  line-height: 30px;
  width: 10%;
  text-align: center;
  cursor: pointer;
  i{
    height: 100%;
    font-size: 16px;
  }
}
.hot-words{
  position: absolute;
  top: 0;
  right: 10%;
  height: 30px;
  line-height: 30px;
  .hot-words__item{
    display: inline-block;
    font-size: 12px;
    color: #afafaf;
    padding: 0 10px;
    background: #f5f5f5;
    border-radius: 10px;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
    &:hover{
      background: #333333;
      color: #f6f6f6
    }
  }
}
.select-list{
  width: 401px;
  overflow: hidden;
  position: absolute;
  top: 100%;
  left: -1px;
  z-index: 999;
  border-radius: 0 0 20px 20px;
}
.select-list-container{
  width: 400px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-top: none;
  border-radius: 0 0 20px 20px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;  
}
.select-list-container--hide{
  transform: translateY(-100%);
  border: none;
}
.select-list-container .border{
  height: 10px;
  border-bottom: 1px solid #e5e5e5;
}
.select-list-container--hide .border{
  display: none
}
.history{
  .history__item{
    float: left;
    width: 100%;
    padding: 0 20px;
    color: #afafaf;
    height: 36px;
    line-height: 36px;
    &:hover{
      background: #f5f5f5;
    }
  }
}
.history-header{
  padding: 10px 20px;
  min-height: 30px;
  line-height: 30px;
  font-size: 14px;
  .history-header__title{
    float: left;
    color: #333;
  }
  .history-header__delete{
    cursor: pointer;
    float: right;
    color: #afafaf;
    &:hover{
      color: #f13232;
    }
  }
}
.query-list{
  .query-list__item{
    display: block;
    height: 36px;
    line-height: 36px;
    padding: 0 20px;
    color: #afafaf;
    &:hover{
      background: #f5f5f5;
    }
  }
}
.search-hot-words{
  
  .search-hot-words__header{
    min-height: 30px;
    line-height: 30px;
    padding: 10px 20px;
    color: #333;
    font-size: 14px;
  }
  .hot-words-item{
    display: block;
    height: 36px;
    line-height: 36px;
    padding: 0 20px;
    color: #afafaf;
    &:hover{
      background: #f5f5f5;
    }
    .hot-words-item__tag{
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      color: #ffffff;
      text-align: center;
      line-height: 20px;
      margin-right: 5px;
      font-size: 14px;
    }
    .hot-words-item__tag--1{
      background-color: #f13132;
    }
    .hot-words-item__tag--2{
      background-color: #f0773d;
    }
    .hot-words-item__tag--3{
      background-color: #f6a724;
    }
  }
}
</style>
