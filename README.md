# core-video-to-gif

A JavaScript Library To Convert Video Fragments To Gif.

<img width="240" src="./docs/core-video-to-gif.png">

[中文文档](./docs/README-ZH.md)

## Get Started

### NPM

``` bash
$ npm install core-video-to-gif --save
```

### CDN

``` bash
<script src="./dist/core-video-to-gif.min.js"></script>
```

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
        <th>The video element</th>
        <th>&lt;video ... &gt;</th>
    </tr>
    <tr>
        <th> workerScript</th>
        <th>String</th>
        <th>enable Web Worker</th>
        <th>Please inclued the [script](https://github.com/JackPu/core-video-to-gif/blob/master/examples/gif.worker.js), and specify the path</th>
    </tr>
    <tr>
        <td>width</td>
        <td>Number</td>
        <td>The output git width</td>
        <td>600(default: the video original height)</td>
    </tr>
    <tr>
        <td>height</td>
        <td>Number</td>
        <td>The output gif image height</td>
        <td>600(default: the video original height)</td>
    </tr>
    <tr>
        <td>maxTime</td>
        <td>Number</td>
        <td>limit the time of gif animation</td>
        <td>5(default: 10)</td>
    </tr>
    <tr>
        <td>fps</td>
        <td>Number</td>
        <td>the frame per second</td>
        <td>12(default: 6)</td>
    </tr>
    <tr>
        <td>quality</td>
        <td>Number</td>
        <td>the quality of gif</td>
        <td>(1-10) The best is 10</td>
    </tr>
    <tr>
        <td>onStartShot</td>
        <td>Function</td>
        <td>call when start shoting</td>
        <td></td>
    </tr>
    <tr>
        <td>onGifProcess</td>
        <td>Function</td>
        <td>call when making gif</td>
        <td></td>
    </tr>
    <tr>
        <td>onGifFinished</td>
        <td>Function</td>
        <td>call when gif output</td>
        <td></td>
    </tr>
</table>

 “*” means it is required.

##  API

### shot(params, callback)

 You could use the method to get the video screenshots.

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
        <td>the screenshot start time</td>
        <td>6(s)</td>
    </tr>
    <tr>
        <td>end</td>
        <td>Number</td>
        <td>the screenshot end time</td>
        <td>7(s)</td>
    </tr>
</table>

### upload(params, callback)

The api is still in draft. Not work!!!


## Contributions

Your contributions and suggestions are welcome 😄😄😄

## MIT License











