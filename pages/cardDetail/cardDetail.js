Page({
  data: { name: "", company: "", title: "", tel_cell: "", tel_work: "", email: "", addr: "" },

  onLoad(options) {
    const jsonData = JSON.parse(decodeURIComponent(options.data));
    this.setData({
      name: jsonData.name || "",
      company: jsonData.company?.[0] || "",
      title: jsonData.title?.[0] || "",
      tel_cell: jsonData.tel_cell?.[0] || "",
      tel_work: jsonData.tel_work?.[0] || "",
      email: jsonData.email?.join(" / ") || "",
      addr: jsonData.addr?.[0] || ""
    });
  },

  saveToContacts() {
    wx.addPhoneContact({
      firstName: this.data.name,
      mobilePhoneNumber: this.data.tel_cell,
      organization: this.data.company,
      title: this.data.title,
      workPhoneNumber: this.data.tel_work,
      email: this.data.email,
      address: this.data.addr,
      success() { wx.showToast({ title: "保存成功", icon: "success" }); },
      fail() { wx.showToast({ title: "保存失败", icon: "error" }); }
    });
  },

  generateQRCode() {
    wx.navigateTo({
      url: `/pages/qrcode/qrcode?data=${encodeURIComponent(JSON.stringify(this.data))}`
    });
  }
});
