Page({
  data: {
    name: '',
    company: '',
    title: '',
    tel: '',
    email: '',
    addr: ''
  },

  onLoad() {
    // 页面加载时读取本地存储
    const savedData = wx.getStorageSync('mineInfo');
    if (savedData) {
      this.setData(savedData);
    }
  },

  onInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [field]: e.detail.value });

    // ⚡ 每次输入自动保存
    wx.setStorageSync('mineInfo', this.data);
  },

  generateQRCode() {
    const data = {
      name: this.data.name,
      company: this.data.company,
      title: this.data.title,
      tel_cell: this.data.tel,
      email: [this.data.email],
      addr: [this.data.addr]
    };

    wx.navigateTo({
      url: `/pages/qrcode/qrcode?data=${encodeURIComponent(JSON.stringify(data))}`
    });
  }
});
