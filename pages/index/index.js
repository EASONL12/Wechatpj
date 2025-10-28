Page({
  data: {
    imagePath: '',
    loading: false
  },

  // 选择图片或拍照
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sourceType: ['camera', 'album'],
      success: (res) => this.setData({ imagePath: res.tempFilePaths[0] }),
    });
  },

  // 上传图片 → 使用模拟数据（前端测试用）
  uploadImage() {
    if (!this.data.imagePath) return;
    this.setData({ loading: true });

    // 模拟 OCR 识别结果
    const data = {
      tel_cell: ["18601130863"],
      success: true,
      name: "雷军",
      company: ["小米科技有限责任公司"],
      addr: ["北京市海淀区清河中街68号华润五彩城写字楼"],
      department: [],
      title: ["董事长"],
      request_id: "4B57639A-E914-4F2A-86EE-908ACABF7E57",
      email: ["leijun@gmail.com","leijunoxinomi.com"],
      tel_work: ["01060606666-8008"]
    };

    this.setData({ loading: false });

    // 跳转到名片详情页
    wx.navigateTo({
      url: `/pages/cardDetail/cardDetail?data=${encodeURIComponent(JSON.stringify(data))}`,
    });
  },

  // 扫描二维码
  scanQRCode() {
    wx.scanCode({
      onlyFromCamera: false, // 允许相册或摄像头扫描
      success: (res) => {
        let data;
        try {
          data = JSON.parse(res.result); // 假设二维码存的是 JSON 格式名片
        } catch (err) {
          wx.showToast({ title: '二维码不是名片信息', icon: 'error' });
          return;
        }

        wx.navigateTo({
          url: `/pages/cardDetail/cardDetail?data=${encodeURIComponent(JSON.stringify(data))}`
        });
      },
      fail: () => {
        wx.showToast({ title: '扫描失败', icon: 'error' });
      }
    });
  }
});
