Page({
  data: {
    chickIndex: -1,
    ConTenttest: [
      {
        "summary": "阿里云举办了通义千问发布会，宣布开源了Qwen-72B、Qwen-1.8B和Qwen-Audio三种大语言模型。阿里云CTO表示，开源对于促进大模型的技术进步和应用落地很重要，将继续投入开源，希望成为最开放的大模型。在开源和闭源两种路线之争中，阿里云选择了开源，与腾讯云、百度智能云等不同。开源支持者认为开源能加速模型迭代升级，带动生态繁荣；而闭源支持者认为闭源能提供更成熟稳定的产品和更好的技术支持。牛透社认为，开源和闭源两种模式将长期存在相互补充，大模型需要不同探索和尝试。阿里云选择开源是因为其开放策略、丰富的云服务经验和算力资源，以及业绩压力等原因。",
        "url": "https://www.36kr.com/p/2549962187413896"
      },
      {
        "summary": "《2023年中国三维CAD国产化研究报告》发布，深入探讨了三维CAD的国产化发展动力、难点和可行路径。报告指出，国产化有助于中国企业摆脱对外部技术的依赖，同时国产三维CAD更贴近中国制造业的需求。然而，国产三维CAD在功能和性能上仍存在差距，仅占市场份额的5%。国产厂商应加强二次开发生态建设，提高与上下游软件的兼容适配。云CAD和移动端产品也具有发展潜力。此外，国内三维CAD缺乏自有标准，应注重中国标准的建设。最后，国产化需考虑与国产操作系统适配，以提升自主可控能力和信息安全。",
        "url": "https://www.36kr.com/p/2549943283275912"
      },
      {
        "summary": "AMD在旧金山的发布会上公布了新一代AI芯片MI 300X，它具有强大的带宽和内存。CEO Lisa Su乐观预测MI 300X在2024年之前的销售额将超过10亿美元。在今天的演讲中，她提高了对全球数据中心AI加速器市场的预测，认为到2027年市场规模将达到4000亿美元。AMD还公布了MI 300A和RCom 6的更多信息。MI 300X采用了8个XCD和4个IO die，拥有256MB的AMD Infinity Cache和3.5D封装设计。MI 300A是全球首款适用于HPC和AI的数据中心APU，结合了CDNA 3 GPU内核、Zen 4 CPU内核和128GB HBM3内存。AMD还在软件方面加强实力，推出了最新版本的ROCm 6。该产品已获得客户的高度认可，并与多家合作伙伴合作推广。 AMD在GPU市场上表现出色，将继续努力成为另一个AI加速器供应商的最优选择。",
        "url": "https://www.36kr.com/p/2549995236923777"
      },
      {
        "summary": "微软宣布了Copilot的三个重磅更新，包括新模型、新搜索和代码解释器。Copilot几乎可以完成ChatGPT Plus能够做的一切，并且是免费的。更新后的Copilot支持OpenAI的GPT-4 Turbo模型，提供更高质量和准确的图像，以及增强的搜索能力，包括多模态搜索和深度搜索。代码解释器可以生成代码并在沙盒环境中运行。微软还推出了笔记本功能界面。微软与OpenAI保持紧密合作，同时与竞争对手谷歌展开竞争。谷歌将在本周公开预览大模型Gemini。",
        "url": "https://www.36kr.com/p/2549245355792774"
      },
      {
        "summary": "微软宣布了Copilot的三个重磅更新，包括新模型、新搜索和代码解释器。Copilot几乎可以完成ChatGPT Plus能够做的一切，并且是免费的。更新后的Copilot支持OpenAI的GPT-4 Turbo模型，提供更高质量和准确的图像，以及增强的搜索能力，包括多模态搜索和深度搜索。代码解释器可以生成代码并在沙盒环境中运行。微软还推出了笔记本功能界面。微软与OpenAI保持紧密合作，同时与竞争对手谷歌展开竞争。谷歌将在本周公开预览大模型Gemini。",
        "url": "https://www.36kr.com/p/2549245355792774"
      },
      {
        "summary": "微软宣布了Copilot的三个重磅更新，包括新模型、新搜索和代码解释器。Copilot几乎可以完成ChatGPT Plus能够做的一切，并且是免费的。更新后的Copilot支持OpenAI的GPT-4 Turbo模型，提供更高质量和准确的图像，以及增强的搜索能力，包括多模态搜索和深度搜索。代码解释器可以生成代码并在沙盒环境中运行。微软还推出了笔记本功能界面。微软与OpenAI保持紧密合作，同时与竞争对手谷歌展开竞争。谷歌将在本周公开预览大模型Gemini。",
        "url": "https://www.36kr.com/p/2549245355792774"
      }]
  },
  onLoad() {
  },
  onShow() {
    // 自定义的bar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
      });
    }
    //获取热榜数据
    my.showLoading({
      content: '加载中...',
    }
    );
    var that = this;
    // 使用my.request发送请求
    my.request({
      timeout: 120000,
      url: 'http://112.74.176.236:9300/newsnova/get-hot-point',
      method: 'POST',
      // 设置请求头部
      headers :{
        'Content-Type': 'application/json', // 通常对于POST请求需要设置此内容类型
        'Cookie': 'JSESSIONID=70BA9FACA4A839A62AD40E40288EC7ED'
      },
      success: function (res) {
        that.setData({
          ConTenttest: res.data
        })
        // 给数组每个对象加个liked&&id 属性
        var list = that.data.ConTenttest;
        list.forEach(item => {
          item.liked = false;
          item.id = 0
        });
        this.setData({
          reslist: list,
          listlen: list.length //是否需要？
        })
      },
      fail: function (error) {
        my.alert({
          content: "加载失败"
        })
        console.error('fail: ', JSON.stringify(error));
      },
      complete: function (res) {
        my.hideLoading();
      },
    });
  },
  cathchConfirm(e) {
    var index = e.currentTarget.dataset.index;
    var cathchConTenttest = this.data.ConTenttest[index];
    // console.log(this.data.ConTenttest[e.currentTarget.dataset.index]);
    var that = this;
    //浏览接口
    my.request({
      url: 'http://112.74.176.236:9300/newsnova/browse',
      method: 'POST',
      data: {
        "uid": null,
        "title": cathchConTenttest.title,
        "abstractText": cathchConTenttest.summary,
        "url": cathchConTenttest.url,
        "engine": cathchConTenttest.engine,
        "id": cathchConTenttest.id
      },
      // 更新浏览状态
      success: function (res) {
        var _ConTenttest = that.data.ConTenttest;
        _ConTenttest[index].id = res.data;
        that.setData({
          ConTenttest: _ConTenttest
        })
      },
    })
    my.navigateTo({
      url: '/pages/summer/summer',
      success: function (res) {
        that.setData({
          chickIndex: index
        })
        // 通过 eventChannel 向 B 页面传送数据
        res.eventChannel.emit('seachres', {
          summary: cathchConTenttest.summary,
          title: cathchConTenttest.title,
          url: cathchConTenttest.url,
          id: cathchConTenttest.id,
          index: index,
          liked: cathchConTenttest.liked
        })
      }
    })
  },
  changeColl(_liked) {
    var _ConTenttest = this.data.ConTenttest;
    _ConTenttest[this.data.chickIndex].liked = _liked;
    this.setData({
      ConTenttest: _ConTenttest
    })
    console.log("更改上一页参数：", this.data.ConTenttest);
  }
});