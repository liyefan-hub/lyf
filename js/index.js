class Problem {
  // 实例化类自动调用
  constructor() {
    // 获取保存按钮,绑定点击事件
    this.$('.save-data').addEventListener('click', this.saveData)
    this.getData();
  }
  /********保存数据的方法*******/
  saveData() {
    // console.log(this, 111);
    // 1  获取添加表单
    let form = document.forms[0].elements;
    // console.log(form);
    // trim 去除空格
    let title = form.title.value.trim();
    let pos = form.pos.value.trim();
    let idea = form.idea.value.trim();
    // console.log(title, pos, idea);
    // 2 判断表单中每一项是否有值,如果为空,则提示
    if (!title || !pos || !idea) {
      throw new Error('表单不能为空');
    }
    // 3 将数据通过ajax,发送给json-server 服务器,进行保存
    // json-server 中,post请求,是添加数据的
    axios.post('http://localhost:3000/problem', {
      title,
      pos,
      idea
    }).then(res => {
      // console.log(res);
      // 如果添加成功则刷新页面
      if (res.status == 201) {
        location.reload();
      }
    })


  }

  /*******获取数据的方法******/
  getData() {
    // console.log('这是数据获取');
    // 获取tbody,页面中只有一个符合条件的,返回单个节点对象
    // let tbody = this.$('tbody');
    // console.log(tbody);
    // 页面中有多个div,返回节点集合
    // let div = this.$('div');
    // console.log(div);
    // 1 发送ajax请求,获取数据
    axios.get('http://localhost:3000/problem').then(res => {
      // console.log(data);
      // 2 获取返回值中的data和status
      //console.log(res);
      let { data, status } = res;
      // console.log(data, status);
      // 3 当状态为200 时,表示请求成功
      if (status == 200) {
        // console.log(data);
        // 4 将获取的数据,渲染到页面中 
        let html = '';
        data.forEach(ele => {
          // console.log(ele);
          html += `<tr>
          <th scope="row">${ele.id}</th>
          <td>${ele.title}</td>
          <td>${ele.pos}</td>
          <td>${ele.idea}</td>
          <td>删除/修改</td>
        </tr>`;
        });
        // console.log(html);
        // 5 将拼接的tr追加到页面
        this.$('.table tbody').innerHTML = html;
      }

    })

  }

  /*******获取节点的方法******/
  $(ele) {
    let res = document.querySelectorAll(ele);
    // 判断当前页面只有一个符合条件的,就返回单个节点对象,否则返回节点集合
    return res.length == 1 ? res[0] : res;
  }
}

new Problem;