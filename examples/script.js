$(function () {
  var video = document.querySelector('video')
  var v2g = new CoreVideoToGif({
    el: video,
    parentEl: document.querySelector('.video-container'),
    width: 640,
    height: 360,
    workerScript: './gif.worker.js',
    onGifProcess: function () {
      $('.loading-area').show()
    },
    onGifFinished: function () {
      $('.loading-area').hide()
    }
  })

  $('.js-crop').on('click', () => {
    const startTime = Math.floor(180 * Math.random())
    v2g.shot({
      start: startTime,
      end: startTime + 5,
    },(image) => {
      $('#screenshot')[0].src = image
    })
  })
  $('.js-crop-current').on('click', () => {
    v2g.shot((image) => {
      $('#screenshot')[0].src = image
    })
  })
  $('.js-download').on('click', () => {
    const src = $('#screenshot')[0].src
    if (src) {
      window.open(URL.createObjectURL(src))
    }
  })
})
