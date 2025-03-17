let seaweeds = [];

function setup() { //初始設定函數，只會執行一次
  //產生一個為視窗寬與高的畫布，並設置背景透明
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id('animation-canvas');
  // 設定混合模式
  blendMode(BLEND);

  // 設定海草的數量
  let numSeaweeds = 40;
  // 設定海草的顏色
  let colors = ["rgba(88, 129, 87, 0.5)", "rgba(58, 90, 64, 0.5)", "rgba(173, 193, 120, 0.5)", "rgba(49, 87, 44, 0.5)"];

  // 生成並記錄每條海草的屬性
  for (let j = 0; j < numSeaweeds; j++) {
    let x = (j / numSeaweeds) * windowWidth;
    let totalHeight = random(windowHeight / 6, windowHeight / 3); // 隨機高度，但不超過畫面的三分之一
    let seaweedWidth = random(30, 60); // 隨機寬度
    let seaweedColor = colors[j % colors.length]; // 使用固定的四種半透明顏色
    let swayRange = random(2, 5); // 隨機左右搖擺的範圍
    let swayFrequency = random(0.01, 0.05); // 隨機搖晃頻率

    seaweeds.push({ x, totalHeight, seaweedWidth, seaweedColor, swayRange, swayFrequency });
  }
}

function draw() { //畫圖函數，會一直執行
  // 設置背景透明
  clear();

  for (let j = 0; j < seaweeds.length; j++) {
    let seaweed = seaweeds[j];
    let x = seaweed.x;
    let y = windowHeight;
    let segmentLength = seaweed.totalHeight / 20; // 每段的長度
    let numSegments = 20; // 固定段數

    // 設定線條粗細
    strokeWeight(seaweed.seaweedWidth);

    // 設定線條顏色
    stroke(seaweed.seaweedColor);

    // 繪製連續的曲線
    beginShape();
    for (let i = 0; i < numSegments; i++) {
      // 計算每個段的搖晃幅度
      let offsetX = sin(frameCount * seaweed.swayFrequency + i * 0.5) * seaweed.swayRange; // 使用隨機搖晃頻率
      let nextX = x + offsetX;
      let nextY = y - segmentLength;

      // 添加頂點到形狀
      vertex(nextX, nextY);

      // 更新座標
      x = nextX;
      y = nextY;
    }
    endShape();
  }
}
