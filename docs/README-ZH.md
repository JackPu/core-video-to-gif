# core-video-to-gif

一款支持将视频截取为 gif 的前端 JavaSCript 类库。

<img width="240" src="./core-video-to-gif.png">

## Get Started

### NPM

``` bash
$ npm install core-video-to-gif --save
```

### CDN

``` bash
<script src="./dist/core-video-to-gif.min.js"></script>
```

在页面中代码：

``` js
const v2g = new CoreVideoToGif({
    // specify the video element
    el: document.querySelector('video')
})
v2g.shot({
    // options,
    start: 5, // ms
    end: 8
}, (result) => {
    // ...
    image.src = result
})
```

## Params

<table width="100%">
    <tr>
        <th>key</th>
        <th>Type</th>
        <th>Details</th>
        <th>Value</th>
    </tr>
    <tr>
        <th> * el</th>
        <th>Element</th>
        <th>需要截取的视频元素</th>
        <th>&lt;video ... &gt;</th>
    </tr>
    <tr>
        <th> workerScript</th>
        <th>Element</th>
        <th>启用 WebWorker 的 gif 脚本</th>
        <th>在本地保留这段脚本[文件](https://github.com/JackPu/core-video-to-gif/blob/master/examples/gif.worker.js), 然后指定路径</th>
    </tr>
    <tr>
        <td>width</td>
        <td>Number</td>
        <td>输出 gif 的宽度</td>
        <td>600(default: the video original height)</td>
    </tr>
    <tr>
        <td>height</td>
        <td>Number</td>
        <td>输出 gif 的高度</td>
        <td>600(default: the video original height)</td>
    </tr>
    <tr>
        <td>maxTime</td>
        <td>Number</td>
        <td>限制 gif 的最长时间</td>
        <td>5(default: 10)</td>
    </tr>
    <tr>
        <td>fps</td>
        <td>Number</td>
        <td>每秒多少帧</td>
        <td>12(default: 6)</td>
    </tr>
    <tr>
        <td>quality</td>
        <td>Number</td>
        <td>输出图片你的质量</td>
        <td>(1-10) The best is 10</td>
    </tr>
    <tr>
        <td>onStartShot</td>
        <td>Function</td>
        <td>当开始截图的时候触发</td>
        <td></td>
    </tr>
    <tr>
        <td>onGifProcess</td>
        <td>Function</td>
        <td>当开始制作 Gif 的时候触发</td>
        <td></td>
    </tr>
    <tr>
        <td>onGifFinished</td>
        <td>Function</td>
        <td>当完成 Gif 的时候触发 </td>
        <td></td>
    </tr>
</table>

 “*” means it is required.

##  API

### shot(params, callback)

 截取某个片段的截图

 ``` js
 // get current screenshot
v2g.shot( (result) => {
    // ...
    image.src = result
})
// get screenshot from 5s - 8s
v2g.shot({
    // options,
    start: 5, // ms
    end: 8
}, (result) => {
    // ...
    image.src = result
})
 ```

 #### params 

 <table width="100%">
    <tr>
        <th>key</th>
        <th>Type</th>
        <th>Details</th>
        <th>Value</th>
    </tr>
    <tr>
        <td>start</td>
        <td>Number</td>
        <td>开始的时间</td>
        <td>6(s)</td>
    </tr>
    <tr>
        <td>end</td>
        <td>Number</td>
        <td>结束的时间</td>
        <td>7(s)</td>
    </tr>
</table>

### upload(params, callback)

The api is still in draft. Not work!!!


## Contributions

Your contributions and suggestions are welcome 😄😄😄

## MIT License











