// 清除指定颜色
function clearColor(r, g, b, tolerance = 0) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data; // 像素数据数组

    for (let i = 0; i < data.length; i += 4) {
        const [pixelR, pixelG, pixelB, alpha] = [
            data[i],
            data[i + 1],
            data[i + 2],
            data[i + 3],
        ];

        // 判断像素是否在指定颜色范围内
        if (
            Math.abs(pixelR - r) <= tolerance &&
            Math.abs(pixelG - g) <= tolerance &&
            Math.abs(pixelB - b) <= tolerance &&
            alpha !== 0 // 确保不是已经透明的像素
        ) {
            // 将像素设置为透明
            data[i] = 0; // Red
            data[i + 1] = 0; // Green
            data[i + 2] = 0; // Blue
            data[i + 3] = 0; // Alpha
        }
    }

    // 将修改后的像素数据重新绘制到画布
    ctx.putImageData(imageData, 0, 0);
}
