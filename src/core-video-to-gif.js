// core-video-to-gif: https://github.com/JackPu/core-video-to-gif
import GIF from 'gif.js'
// import './gif-worker'
import daycaca from 'daycaca'
import { isFunction, isNumber, htmlToEl } from './util'
import { camera } from './icon'

import './style.less'

const DEFAULT_OPTIONS = {
  skip: false, // weather seek video
  shotAnimation: true,
  maxTime: 10,
  fps: 6, // how many frame per second
  quality: 10,
  worker: 2,
  workerScript: 'http://s1.vued.vanthink.cn/6b20b2cd4809/gif-worker.js',
  // some events
  onGifProcess () {},
  onGifFinished () {},
  onStartShot () {}
}

let i = 0

class CoreVideoToGif {

  constructor (args) {
    if (!this._checkLimits()) {
      console.error('Browser not support!')
      console.info('Please view: https://caniuse.com/#search=worker')
    }
    if (!args.el || args.el.tagName !== 'VIDEO') {
      return this._error('Must set video element!')
    }
    this.video = this._el = args.el
    this._bindVideoEvents()
    this.options = Object.assign(DEFAULT_OPTIONS, args)
    if (this.options.parentEl) {
      this._buildShotAnim()
    }
    this._gif = new GIF(this.options);
    this.getVideoInfo()
  }

  _bindVideoEvents () {
    this.video.addEventListener('ended', () => {
      this._stopScreentshot()
    })
  }

  _buildShotAnim () {
    let html = '<div class="cvg-preset-container"><div class="icon-camera">'
      html += camera
      html += '</div></div>'
    this._loadinglayer = htmlToEl(html)
    this.options.parentEl.appendChild(this._loadinglayer)
  }

  _startShotAnimation () {
    this.options.shotAnimation && this._loadinglayer.classList.add('fadein')
  }

  _stopShotAnimation () {
    this.options.shotAnimation && this._loadinglayer.classList.remove('fadein')
  }

  shot (options, callback) {
    if (this.video.paused) {
      this.video.play()
    }
    if (isFunction(options)) {
      return daycaca.base64(this.video, (image) => {
        options(image)
      })
    }
    if (isNumber(options.start) && isNumber(options.end) &&
      (options.end - options.start) < this.options.maxTime) {
      this._seek(options.start)
      if (isNumber(options.fps)) {
        this.options.fps = parseInt(options.fps)
      }
      options._duration = options.end - options.start
      options.callback = callback
      this._startScreenshot(options)
    } else {
      this._error('crop(params) params ... error')
    }
  }

  _startScreenshot (options) {
    const intvalTime = Math.ceil(1000 / this.options.fps)
    if (!this._startShotTime) {
      this._startShotTime = (new Date).getTime()
    }
    this._intval = window.setInterval(() => {
      // 待优化
      this._startShotAnimation()
      daycaca.base64(this.video, (source, canvas) => {
        const time = (new Date).getTime()
        if (time - this._startShotTime > options._duration * 1000) {
          this._stopScreentshot(options)
          return
        }
        this._gif.addFrame(canvas, {delay: intvalTime})
      })
    }, intvalTime)
  }

  _startGifEvent (options) {
    this._gif.on('finished', function (blob) {
      daycaca.base64(blob, (image) => {
        this.options.onGifFinished(image)
        options.callback(image)
      })
    })
  }

  _stopScreentshot (options) {
    this._startGifEvent(options)
    this._stopShotAnimation()
    // gif start render
    this._gif.render()
    this.options.onGifProcess()
    this._startShotTime = null
    window.clearInterval(this._intval)
  }

  _error (msg) {
    console.error(msg)
  }

  _checkLimits () {
    return window.Worker && window.FileReader
  }

  getVideoInfo () {
    this.video.onloadedmetadata = (e) => {
      this.width = e.target.videoWidth
      this.height = e.target.videoHieght
      if (!this.options.width) {
        this.options.width = this.width
      }
      if (!this.options.height) {
        this.options.height = this.height
      }
      this.duration = e.target.duration
    }
    if (this.video.paused) {
      this.video.play()
    }
  }

  _seek (time) {
    this.video.currentTime = time
  }
}
// alias name
window._coreVideoToGif = CoreVideoToGif
window.CoreVideo2Gif = CoreVideoToGif
window.CoreVideoToGif = CoreVideoToGif

module.exports = CoreVideoToGif
