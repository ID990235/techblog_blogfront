; (function () {
  let reg = /\?id=(\d+)/
  let [, id] = location.search.match(reg)
  // 2. 发请求获取数据并渲染页面（前端渲染）
  async function renderArticle(id) {
    let result = await $.get('http://127.0.0.1:3200/api/fetchOneArt', { id })
    const { cate_id, cate_name, title, add_date, content, username } = result[0]

    // 3. 渲染页面（DOM操作）
    let crumbsHtmls = `当前位置：<a href="/">首页</a> / <a href='/cate.html?cate_id=${cate_id}'>${cate_name}</a> / ${title}`
    $("#crumbs").html(crumbsHtmls)
    $("#content").html(content)
    $("#title").html(title)
    $("#subTitle").text(` ${add_date} / 分类：${cate_name} / 作者：${username}`)
  }

  renderArticle(id)
})()