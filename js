Page({
  data: {
    playerHand: [],
    opponents: [],
    discards: [],
    remainingTiles: 0,
    selectedIndex: -1,
    isDealer: false,
    hasTing: false,
    houKouDisplay: ''
  },

  onLoad() {
    this.initGame();
  },

  initGame() {
    const tiles = this.generateTiles();
    let shuffled = this.shuffle(tiles);
    
    const dealerHand = shuffled.slice(0, 14).map(t => ({ id: t, src: `/images/tiles/${t}.png` }));
    const p2 = shuffled.slice(14, 27).map(() => ({ id: 'back', src: '/images/back.png' }));
    const p3 = shuffled.slice(27, 40).map(() => ({ id: 'back', src: '/images/back.png' }));
    const p4 = shuffled.slice(40, 53).map(() => ({ id: 'back', src: '/images/back.png' }));
    
    const houKouTile = shuffled[shuffled.length - 2];
    
    this.setData({
      playerHand: dealerHand,
      opponents: [p2, p3, p4],
      discards: [],
      remainingTiles: shuffled.length - 53,
      isDealer: true,
      houKouDisplay: this.getTileDisplay(houKouTile)
    });
  },

  generateTiles() {
    let tiles = [];
    ['t','b','w'].forEach(suit => {
      for (let n=1; n<=9; n++) for (let i=0; i<4; i++) tiles.push(suit + n);
    });
    for (let i=0; i<4; i++) tiles.push('zhong');
    return tiles;
  },

  shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  },

  getTileDisplay(t) {
    if (t === 'zhong') return '红中';
    const m = {t:'条', b:'筒', w:'万'};
    return m[t[0]] + t.slice(1);
  },

  selectTile(e) {
    this.setData({ selectedIndex: e.currentTarget.dataset.index });
  },

  drawTile() {
    // 简化摸牌
    wx.showToast({title: '摸牌成功'});
  },

  declareTing() {
    wx.showToast({title: '报听成功！'});
    this.setData({ hasTing: true });
  },

  discardSelected() {
    wx.showToast({title: '已打牌'});
  },

  hu() {
    wx.showToast({title: '胡牌！恭喜', icon: 'success'});
  }
});