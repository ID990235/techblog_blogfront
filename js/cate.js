; (function () {
  let reg = /\?cate_id=(\d+)/
  let [, cate_id] = location.search.match(reg)

  async function getCateArt(cate_id) {
    let result = await $.get('http://127.0.0.1:3200/api/fetchCateArt', { cate_id })
    $("#crumbs").html(`当前位置：<a href="/">首页</a> / ${result[0].cate_name}`)
    let articleHtmls = ''
    result.forEach((item) => {
      const { id, cate_id, cate_name, username, title, add_date, pic } = item
      let imgSrc = pic ? `http://127.0.0.1:3200${pic}` : './image/logo.png';
      articleHtmls += `<div class='item row'>
                            <div class="col-md-2">
                              <a href="/detail.html?id=${id}"><img src="${imgSrc}" alt=""></a>
                            </div>
                            <div class="col-md-10">
                              <div class="date ">作者：${username} 、 ${add_date} 、分类：<a href="/cate.html?cate_id=${cate_id}">${cate_name}</a></div>
                              <a href="/detail.html?id=${id}"><div class="title">${title}...</div></a>
                              <div class="intro">${title}</div>
                            </div>
                            <hr>
                          </div>`
    })
    $("#artlist").html(articleHtmls)
  }

  getCateArt(cate_id)
  // 文章分类
  async function initCateData() {
    let result = await $.get('http://127.0.0.1:3200/api/cate')
    let cateHtmls = '';
    result.forEach((item) => {
      const { cate_id, cate_name, orderBy } = item
      cateHtmls += `<li><a href="/cate.html?cate_id=${cate_id}">${cate_name}</a></li>`
    })
    $("#dropdown-menu").html(cateHtmls);
  }

  initCateData()
})()