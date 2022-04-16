; (function () {
  let page = 1;
  let pagesize = 5;
  let isDone = false
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

  // 文章分页
  async function initArticle(page, pagesize) {
    let result = await $.get(`http://127.0.0.1:3200/api/article?page=${page}&pagesize=${pagesize}`)
    if (result.length === 0) {
      layer.msg('数据已经加载完毕了', { icon: 1 })
      $("#loadMore").css({ display: 'none' })
      isDone = true;
      return false;
    }
    let newArticleHtmls = ''
    result.forEach((item) => {
      const { id, cate_id, cate_name, username, title, add_date, pic } = item
      let imgSrc = pic ? `http://127.0.0.1:3200${pic}` : './image/logo.png';
      newArticleHtmls += `<div class='item row'>
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
    let oldArticleHtmls = $("#artlist").html()
    $("#artlist").html(oldArticleHtmls + newArticleHtmls)
  }

  initCateData()
  initArticle(page, pagesize)

  $("#loadMore").click(function () {
    isDone ? layer.msg('数据已加载完毕。', { icon: 1 }) : (page++, initArticle(page, pagesize))
  })
})()