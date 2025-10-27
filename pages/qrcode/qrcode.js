import drawQrcode from 'weapp-qrcode';

Page({
  data: { name:'', company:'', jsonData:'' },

  onLoad(options) {
    const data = JSON.parse(decodeURIComponent(options.data));
    const jsonStr = JSON.stringify(data);

    this.setData({ name: data.name, company: data.company, jsonData: jsonStr });

    drawQrcode({ width:200, height:200, canvasId:'myQrcode', text: jsonStr });
  },

  saveImage() {
    wx.canvasToTempFilePath({
      canvasId:'myQrcode',
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success() { wx.showToast({title:'保存成功',icon:'success'}); },
          fail() { wx.showToast({title:'保存失败',icon:'error'}); }
        })
      }
    })
  },

  onShareAppMessage() {
    return { title:`${this.data.name} 的电子名片`, path:`/pages/cardDetail/cardDetail?data=${encodeURIComponent(this.data.jsonData)}` }
  }
});
