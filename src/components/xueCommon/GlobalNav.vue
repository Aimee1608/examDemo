<template>
  <nav class="global-nav">
    <div class="container">
      <h1 class="logo">
        <a target="_blank" href="https://www.xueersi.com/" data-xeslog-params="key=xeslog-headAndSidebar-www&click_url=https://www.xueersi.com&click_id=1.8.1&target_id=1.1&api_id=1.2.0" class="logo__link">学而思网校</a>
        <span>学而思网校</span>
      </h1>
      <div class="nav-list">
        <a target="_blank" href="https://www.xueersi.com/" data-xeslog-params="key=xeslog-headAndSidebar-www&click_url=https://www.xueersi.com&click_id=1.8.1&target_id=1.1&api_id=1.2.0" class="nav-list__item">首页</a>
        <a target="_blank" href="https://www.xueersi.com/chu1-0-4" data-xeslog-params="key=xeslog-headAndSidebar-www&click_url=https://www.xueersi.com/chu1-0-4&click_id=1.8.2&target_id=1.2&api_id=1.2.0" class="nav-list__item">选课中心</a>
        <a target="_blank" href="https://www.xueersi.com/zhibo/" data-xeslog-params="key=xeslog-headAndSidebar-www&click_url=https://www.xueersi.com/zhibo/&click_id=1.8.3&target_id=1.6&api_id=1.5.20" class="nav-list__item">免费讲座</a>
        <a target="_blank" href="https://i.xueersi.com" data-xeslog-params="key=xeslog-headAndSidebar-www&click_url=https://i.xueersi.com&click_id=1.8.4&target_id=''&api_id=1.1.0" class="nav-list__item" style="color:#f13232;">学习中心</a>
        <!-- <a target="_blank" href="https://fudao.dahai.com/wx/" data-xeslog-params="key=xeslog-headAndSidebar-www&click_url=https://fudao.dahai.com/wx/&click_id=1.8.10&target_id=''&api_id=1.1.0" class="nav-list__item">1对1</a> -->
        <!-- <div class="nav-list__item nav-list__find-more">
          <span class="find-more">发现更多</span><i class="drop-down-icon"></i>
          <div class="nav-list__find-more__box">
            <div class="find-more-list dropdown">
              <a class="find-more-list__item" href="https://code.xueersi.com" target="_blank" data-xeslog-params="key=xeslog-headAndSidebar-www&click_url=https://code.xueersi.com&click_id=1.8.26target_id=&api_id=1.1.0">编程社区</a>
              <a class="find-more-list__item" href="https://www.xueersi.com/chu1-0-1/" target="_blank" data-xeslog-params="key=xeslog-headAndSidebar-www&click_url=https://www.xueersi.com/chu1-0-1/&click_id=1.8.5&target_id=1.7&api_id=1.7.0">免费课</a>
              <a class="find-more-list__item" href="https://zt.xueersi.com/books/kaixueji/" target="_blank" data-xeslog-params="key=xeslog-headAndSidebar-www&click_url=https://zt.xueersi.com/books/kaixueji/&click_id=1.8.8&target_id=''&api_id=1.1.0">逛书城</a>
              <a class="find-more-list__item" href="https://club.xueersi.com" target="_blank" data-xeslog-params="key=xeslog-headAndSidebar-www&click_url=https://club.xueersi.com&click_id=1.8.9&target_id=''&api_id=1.1.0">学社团</a>
            </div>
          </div>
        </div> -->
      </div>
      <div class="search">
        <courseSearch/>
      </div>
    </div>
  </nav>
</template>

<script>
import courseSearch from './CourseSearch'

export default {
  name: 'global-nav',
  components: {
    courseSearch
  },
  computed: {
    
  }
}
</script>

<style lang="less" scoped>
.global-nav{
  width: 100%;
  min-width: 1300px;
  height: 100px;
  line-height: 100px;
  background: #FFF;
  color: #afafaf;
  font-size: 12px;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
  .container{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
}
.logo{
  float: left;
  height: 100px;
  line-height: 100px;
  font-size: 0;
  margin-right: 15px;
  span{
    display: inline-block;
    vertical-align: middle;    
  }
  .logo__link{
    width: 170px;
    height: 51px;
    display: inline-block;
    vertical-align: middle;
    background-image: url('https://res15.xesimg.com/www/img/logo.svg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.nav-list{
  height: 100px;
  float: left;
  .nav-list__find-more{
    position: relative;
    &:hover{
      .drop-down-icon{
        transform: rotate(180deg);
      }
      .nav-list__find-more__box{
        display: block;
      }
    }
    .find-more{
      padding-right: 10px;
    }
    .drop-down-icon{
      transition: transform .3s;
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #333333;
      vertical-align: middle;
    }
    .nav-list__find-more__box{
      display: none;
      width: 100%;
      position: absolute;
      left: 50%;
      top: 46px;
      z-index: 999;
      transform: translateX(-50%);
      &:hover{
        display: block;
      }
    }
    .find-more-list{
      background: #ffffff;
      box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.05);
      border-top: none;
      border: 1px solid #f1f1f1;
      border-radius: 4px;
      .find-more-list__item{
        display: block;
        width: 100%;
        line-height: 44px;
        color: #333;
        font-size: 14px;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
        &:last-child{
          border-bottom: none;
        }
        &:hover{
          border-bottom: none;
          background: #f5f5f5;
        }
      }
    }
  }
  .nav-list__item{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    color: #333333;
    padding: 0 15px;
    margin: 0 6px;
    line-height: 50px;
    &:hover{
      color: #f13232;
    }
  }
  & > .router-link-active{
    &::before{
      width: 20px;
      height: 2px;
      display: inline-block;
      background-color: #f13232;
      content: ' ';
      position: absolute;
      margin-left: 50%;
      left: -10px;
      bottom: 1px;
      border-radius: 15px;
    }
  }
}
.search{
  float: right;
  width: 400px;
  height: 30px;
  padding: 35px 0;
}
</style>
