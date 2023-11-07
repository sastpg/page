var bodyEle = document.body;
var inputSearch = document.getElementById("inputSearch");
var suggestList = document.getElementById("searchSuggestionContainer");
var timeText = document.getElementById("timeText");
var dayText = document.getElementById("dayText");
var searchMenu = document.getElementById("menuSearchEng");
var setMenu = document.getElementById("setMenu");

// bodyEle.style.background = 'linear-gradient(-225deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%)';
inputSearch.focus();
function add() {
    bodyEle.classList.add('search');
};

function remove() {
    bodyEle.classList.remove('search');
    searchMenu.classList.remove("on");
    inputSearch.value = ""; //失去焦点清除内容
    //suggestList.style.display = 'none';//隐藏联想词
    window.onclick = function (event) {
      if (event.target.id == suggestList) {
        suggestList.style.display = 'block';
      } else {
        suggestList.style.display = 'none';
      }
  }
};

function padZero(n) {
  return n > 9 ? n : '0' + n
};

setInterval(function () {
  var date = new Date();
  let month = date.getMonth()+1;
  let dd = date.getDate();
  let day = date.getDay();
  let hh = date.getHours();
  let mm = padZero(date.getMinutes());
  var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  //let ss = padZero(date.getSeconds())
  timeText.innerText = hh + ':' + mm; /* + ':' + ss */
  dayText.innerHTML = month + "&nbsp;月&nbsp;" + dd + "&nbsp;日&nbsp;" + weekday[day];
}, 1000);

$(function () {
  $(".mark .tab .tab-item").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
      $(".products .mainCont").eq($(this).index()).css("display", "flex").siblings().css("display", "none");
  })

  $(".bgGroup .bgPreviewBox").click(function() {
      $(this).addClass("selected").siblings().removeClass("selected");
      console.log($(this).children().css('background'));
      bodyEle.style.background = $(this).children().css('background');
  })
})

let searchEngine = 1;
let suggestNum;

inputSearch.onkeydown = function (event) {
    let code = event.keyCode;
    // 按回车搜索
    if (code == 13) {
      let suggest = suggestList.getElementsByTagName("div");
      //如果选中第一项就翻译
      if (suggestNum % suggest.length === 0 && searchEngine < 4) {
        let str = inputSearch.value;
        // str = str.replace("翻译：", "");
        if (searchEngine === 1) {
          let url = `https://www.bing.com/dict/search?q=${str}`;
          window.open(url);
        } else if (searchEngine === 2) {
          let url = `https://fanyi.baidu.com/#en/zh/${str}`;
          window.open(url);
        } else if (searchEngine === 3) {
          let url = `https://translate.google.cn/?sl=en&tl=zh-CN&text=${str}`;
          window.open(url);
        }
      } else {
        doSearch(event);
      }
      //input失去焦点
      // input.blur();
      //mao.classList.remove("on");
      suggestList.innerHTML = "";
      inputSearch.value = "";
    //按上下键选择
    } else if (code === 40) {
      let suggest = suggestList.getElementsByTagName("div");
      suggestNum += 1;
      let lisx = suggest[suggestNum % suggest.length];
      inputSearch.value = lisx.innerHTML.slice(25);
      if (suggestNum === 0) {
        lisx.classList.add("focus");
      } else {
        suggest[(suggestNum - 1) % suggest.length].classList.remove("focus");
        lisx.classList.add("focus");
      }
    } else if (code === 38) {
      let suggest = suggestList.getElementsByTagName("div");
      suggestNum -= 1;
      if (suggestNum < 0) {
        suggestNum = 0;
      } else {
        let lisx = suggest[suggestNum % suggest.length];
        inputSearch.value = lisx.innerHTML.slice(25);
        console.log(inputSearch.value);
        suggest[(suggestNum + 1) % suggest.length].classList.remove("focus");
        lisx.classList.add("focus");
      }
    }
};

function doSearch(event) {
  event.preventDefault();
  let query = inputSearch.value;
  if (query.length != 0 && searchEngine === 1) {
    let url = `https://cn.bing.com/search?q=${query}`;
    window.open(url);
  } else if (query.length != 0 && searchEngine === 2) {
    let url = `https://www.baidu.com/s?word=${query}`;
    window.open(url);
  } else if (query.length != 0 && searchEngine === 3) {
    let url = `https://www.google.com/search?q=${query}`;
    window.open(url);
  } else if (query.length != 0 && searchEngine === 4) {
    let url = `https://search.bilibili.com/all?keyword=${query}`;
    window.open(url);
  } else if (query.length != 0 && searchEngine === 5) {
    let url = `https://github.com/search?q=${query}`;
    window.open(url);
  } else if (query.length != 0 && searchEngine === 6) {
    let url = `https://wikizh.zjutop.asia/wiki/${query}`;
    window.open(url);
  } else {
    log("请输入信息");
  }
};

inputSearch.onkeyup = function (event) {
    let val = this.value;
    let code = event.keyCode;
    if (val && code !== 40 && code !== 38) {
      let oScript = document.createElement("script");
      // if (searchEngine === 1) {
      //   oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
      // } else if (searchEngine === 2) {
      //   oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
      // } else if (searchEngine === 3) {
      //   oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
      // } else if (searchEngine === 4) {
      //   oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
      // }
      oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
      document.body.appendChild(oScript);
      document.body.removeChild(oScript);
      suggestNum = -1;
    } else if (code === 40 || code === 38) {
    } else {
        suggestList.style.display = "none";
    }
};

function callback(data) {
    suggestList.style.display = "block";
    let str = "";
    if (searchEngine === 1 && data.s.length > 0) {
        str = `<a href="https://www.bing.com/dict/search?q=${inputSearch.value}" target="_blank"><div><i class="iconfont">&#xe65c;</i>${inputSearch.value}</div></a>`;
        data.s.forEach(function (val) {
          str += `<a href="https://cn.bing.com/search?q=${val}" target="_blank"><div><i class="iconfont">&#xe600;</i>${val}</div></a>`;
        });
        suggestList.innerHTML = str;
    } else if (searchEngine === 2 && data.s.length > 0) {
        str = `<a href="https://fanyi.baidu.com/#en/zh/${inputSearch.value}" target="_blank"><div><i class="iconfont">&#xe65c;</i>${inputSearch.value}</div></a>`;
        data.s.forEach(function (val) {
          str += `<a href="https://www.baidu.com/s?wd=${val}" target="_blank"><div><i class="iconfont">&#xe600;</i>${val}</div></a>`;
        });
        suggestList.innerHTML = str;
    } else if (searchEngine === 3 && data.s.length > 0) {
        str = `<a href="https://translate.google.cn/?sl=en&tl=zh-CN&text=${inputSearch.value}" target="_blank"><div><i class="iconfont">&#xe65c;</i>${inputSearch.value}</div></a>`;
        data.s.forEach(function (val) {
          str += `<a href="https://www.google.com/search?q=${val}" target="_blank"><div><i class="iconfont">&#xe600;</i>${val}</div></a>`;
        });
        suggestList.innerHTML = str;
    } else if (searchEngine === 4 && data.s.length > 0) {
        data.s.forEach(function (val) {
          str += `<a href="https://search.bilibili.com/all?keyword=${val}" target="_blank"><div><i class="iconfont">&#xe600;</i>${val}</div></a>`;
        });
        suggestList.innerHTML = str;
    } else if (searchEngine === 5 && data.s.length > 0) {
        data.s.forEach(function (val) {
          str += `<a href="https://github.com/search?q=${val}" target="_blank"><div><i class="iconfont">&#xe600;</i>${val}</div></a>`;
        });
        suggestList.innerHTML = str;
    } else if (searchEngine === 6 && data.s.length > 0) {
      data.s.forEach(function (val) {
        str += `<a href="https://wikizh.zjutop.asia/wiki/${val}" target="_blank"><div><i class="iconfont">&#xe600;</i>${val}</div></a>`;
      });
      suggestList.innerHTML = str;
    } else {
        suggestList.style.display = "none";
    }
};

function selectSearch(event) {
  event.preventDefault();
  searchMenu.classList.toggle("on");
};

function changeSearchEng(e, event) {
    event.preventDefault();
    if (e.dataset.name === "bing") {
      document.getElementById("iconSearchEng").innerHTML = `&#xe69a;`;
      searchEngine = 1;
    } else if (e.dataset.name === "baidu") {
      document.getElementById("iconSearchEng").innerHTML = `&#xe8cb;`;
      searchEngine = 2;
    } else if (e.dataset.name === "google") {
      document.getElementById("iconSearchEng").innerHTML = `&#xe87a;`;
      searchEngine = 3;
    } else if (e.dataset.name === "bilibili") {
      document.getElementById("iconSearchEng").innerHTML = "&#xe75d;";
      searchEngine = 4;
    }
    else if (e.dataset.name === "github") {
      document.getElementById("iconSearchEng").innerHTML = "&#xe885;";
      searchEngine = 5;
    }
    else if (e.dataset.name === "wiki") {
      document.getElementById("iconSearchEng").innerHTML = "&#xe8c4;";
      searchEngine = 6;
    }
    searchMenu.classList.remove("on");
};

function showMenu() {
    setMenu.classList.toggle("on");
};

// btnSearchEng[0].onmousedown = function(event) {
//     event.preventDefault();
//     searchMenu.classList.toggle("on");
// };

// function searchChange(e) {
//   console.log("hh")
// }