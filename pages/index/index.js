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

  // 上传图片 → 调用本地后端
  uploadImage() {
    if (!this.data.imagePath) return;
    this.setData({ loading: true });

    const fs = wx.getFileSystemManager();
    fs.readFile({
      filePath: this.data.imagePath,
      encoding: 'base64',
      success: (res) => {
        const imageBase64 = res.data;

        wx.request({
          url: 'http://192.168.3.41:8000/ocr_card', // 例如 http://192.168.1.100:8000/ocr_card
          method: 'POST',
          header: { 'content-type': 'application/json' },
          data: { image: imageBase64 },
          success: (response) => {
            const result = response.data;
            if (result.success) {
              wx.navigateTo({
                url: `/pages/cardDetail/cardDetail?data=${encodeURIComponent(JSON.stringify(result.data))}`,
              });
            } else {
              wx.showToast({ title: '识别失败', icon: 'error' });
            }
          },
          fail: () => {
            wx.showToast({ title: '请求失败', icon: 'error' });
          },
          complete: () => this.setData({ loading: false }),
        });
      },
      fail: () => {
        wx.showToast({ title: '读取图片失败', icon: 'error' });
        this.setData({ loading: false });
      }
    });
  },

  // 扫描二维码
  scanQRCode() {
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        let data;
        try {
          data = JSON.parse(res.result);
        } catch {
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
