<template>
  <div
    id="container"
    v-loading="isLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  />
</template>
<script>
// import Highcharts from 'highcharts/highcharts'
import HighMap from 'highcharts/modules/map.js'
import Annotations from 'highcharts/modules/annotations.js'
import websoketMixin from '../soket'
import CountUp from 'countup/dist/countUp.min'
HighMap(Highcharts)
Annotations(Highcharts)
export default {
  // props: {
  //   'isReflow': Boolean
  // },
  mixins: [websoketMixin],
  data() {
    return {
      isLoading: false,
      isNoScroll: true,
      times:0
    }
  },
  mounted() {
    this.isLoading = true
    this.openWebSocket('wss://fota.com/apioption/wsoption?brokerId=1', res => {
      if (res.spotIndexDTOList) {
        const data = res.spotIndexDTOList.map((item, index) => ({ x: item.time, y: Number(item.price) }))
        this.initCharts(data)
        this.handlePlotLinesByCountUp(data)
        this.creatTwoLineByTime(res.timeStamp)

        this.orderTimeElement = document.querySelector('#orderTime')
        this.finishTimeElement = document.querySelector('#finishTime')
        this.rippleElement = document.querySelector('#ripple')

        this.initOrderLineByCountUp(res.timeStamp)

        this.chart.pointer.onContainerMouseWheel = this.handleScroll

        this.isLoading = false
      } else if (res.lineBinaryOptionPriceIndex) {
        const { min } = this.chart.xAxis[0].getExtremes()
        const price = Number(res.lineBinaryOptionPriceIndex.price)

        this.chart.yAxis[0].plotLinesAndBands[0].options.value = price

        this.countUp.update(price)
        this.countUp.isUp = this.countUp.endVal - this.countUp.startVal > 0

        const resTime = res.lineBinaryOptionPriceIndex.time
        const { orderPixels, finishPixels } = this.handleLinePixelsByTime(resTime)
        
        if(!(this.times++ % 2)){
          this.orderTimeElement.style.transform = `translate(${orderPixels}px, 0px)`
          this.finishTimeElement.style.transform = `translate(${finishPixels}px, 0px)`
        }

        this.rippleElement.style.right = this.chart.containerWidth - this.chart.xAxis[0].toPixels(resTime, true) - 20 + 'px'

        const markElement = this.orderTimeElement.querySelector('.mask')
        const orderBoxElement = this.orderTimeElement.querySelector('.box')
        const finishBoxElement = this.finishTimeElement.querySelector('.box')
        if (resTime >= new Date(resTime).setSeconds(40)) {
          if (orderBoxElement.innerText !== '下一轮') {
            const yetTime = (new Date(resTime).setSeconds(60) - resTime) / 1000
            const finishCountUp = new CountUp(finishBoxElement, yetTime, 0, 0, yetTime, { useEasing: false, prefix: '00 ：' })
            finishCountUp.start()
          }
          orderBoxElement.innerText = '下一轮'
        } else {
          finishBoxElement.innerText = ''
          if (orderBoxElement.innerText === '下一轮') {
            // this.orderBoxCountUp.reset()
            this.orderBoxCountUp = new CountUp(orderBoxElement, 40, 0, 0, 40, { useEasing: false, prefix: '00 ：' })
            this.orderBoxCountUp.start()
            const userOptions = { ...this.chart.annotations[0].userOptions }
            this.chart.annotations[0].remove()
            this.chart.addAnnotation(userOptions)
            // this.chart.annotations[0] = new Annotations(Highcharts)
          }
        }
        markElement.style.width = resTime >= new Date(resTime).setSeconds(40) ? '50vw' : 0
        this.lastPoint = {
          x: resTime,
          y: price,
          xAxis: 0,
          yAxis: 0
        }
        this.chart.series[0].addPoint([resTime, price])

        // this.chart.addAnnotation({ labels: [{ point: { x: resTime, y: price }}] })
        
        const dataCout = this.chart.series[0].data.filter(item => item.x > min).length

        if (dataCout > 400 && this.isNoScroll) this.initxAxis()
      } else {
        // console.log(res)
      }
    }).then(websocket => {
      websocket.send(`{"reqType":9,"param":{"id":1,"period":1,"optionType":1}}`)
      websocket.send(`{"reqType":1,"param":{"assetCode":1,"optionType":1}}`)
    })
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    handleLinePixelsByTime(time) {
      const orderTime = new Date(time).setSeconds(40)
      const finishTime = orderTime + 20000
      const orderPixels = this.chart.xAxis[0].toPixels(orderTime, true)
      const finishPixels = this.chart.xAxis[0].toPixels(finishTime, true)
      return { orderPixels, finishPixels }
    },
    initxAxis() {
      const dataArr = this.chart.series[0].data
      this.chart.xAxis[0].update({ min: dataArr[dataArr.length - 200].x })
    },
    initCharts(dataArr) {
      Highcharts.setOptions({
        global: { useUTC: false }
      })
      // function activeLastPointToolip(chart) {
      //   var points = chart.series[0].points
      //   chart.tooltip.refresh(points[points.length - 1])
      // }
      const that = this
      this.chart = Highcharts.chart('container', {
        rangeSelector: { selected: 1
        },
        title: {
          text: ''
        },
        animation: {
          duration: 1000
        },
        chart: {
          className: 'myChart',
          marginRight: 10,
          // marginBottom: 20,
          spacingRight: 100,
          // spacing: 60,
          // panning: !1,
          // panning: true,
          // panKey: 'shift',
          backgroundColor: 'transparent',
          // animation: Fl.animation,
          resetZoomButton: {
            position: {
              align: 'left', // by default
              x: 10
            }
          },
          events: {
            load: function() {
              // var n = C()(this.series, 1)
              // jl = n[0]
            },
            redraw: function() {
              // fs(Fl.ws1time)
            },
            selection: function() {
              that.initxAxis()
              that.isNoScroll = true
              // this.resetZoomButton
              // console.dir(this.resetZoomButton.element)
              // this.resetZoomButton.element.style.display = 'none'
              // this.resetZoomButton.element.innerHTML = ''
              this.resetZoomButton.fadeOut()

              // this.resetZoomButton.opacity = 0
              // this.resetZoomButton.destroy()
            }
          }
        },
        annotations: [{
          points: []
        }],
        credits: {
          enabled: !1
        },
        navigation: {
          menuStyle: {
            display: 'none'
          }
        },
        plotOptions: {
          series: {
            lineColor: '#fff',
            lineWidth: 2,
            fillOpacity: 0.05,
            stickyTracking: !1,
            dataLabels: {
              enabled: !1
            },
            marker: {
              enabled: !1
            }
          },
          cursor: 'pointer'
        },
        scrollbar: {
          enabled: !1
        },
        tooltip: {
          useHTML: !0,
          xDateFormat: '%H:%M:%S',
          backgroundColor: 'rgba(79,89,109,0.8)',
          formatter: function(a, b) {
            return `<div>
              <p style="color:#fff; margin-bottom:5px;"><span style="color:#A8ACBB; margin-right:5px;">：${this.x}</span></p>
              <p style="color:#fff; margin-bottom:0px;"><span style="color:#A8ACBB;margin-right:5px;">${this.y}</p>
              </div>`
          },
          borderColor: 'transparent',
          borderRadius: 8
        },
        mapNavigation: {
          enabled: true,
          enableButtons: false,
          enableMouseWheelZoom: true,
          enableDoubleClickZoomTo: false
        },
        xAxis: {
          type: 'datetime',
          lineWidth: 0,
          tickColor: 'transparent',
          tickPixelInterval: 200,
          // tickInterval: 60 * 1000,
          title: null,
          // min: dataArr[dataArr.length - 43].x,
          dateTimeLabelFormats: {
            second: '%H:%M:%S'
          },
          maxPadding: 0.55,
          crosshair: {
            snap: !1,
            color: 'rgba(167, 174, 196, 0.3)',
            dashStyle: 'Solid'
          },
          labels: {
            style: {
              color: 'rgba(167, 174, 196, 0.5)'
            }
          },
          gridLineColor: 'rgba(167, 174, 196, 0.1)',
          gridLineWidth: 2
        },
        legend: {
          enabled: !1
        },
        showCheckBox: !0,
        yAxis: {
          offset: -60,
          opposite: !0,
          tickPixelInterval: 200,
          tickPositioner: function() {
            // console.log(this.max, this.min)

            // return []
          },
          labels: {
            useHTML: true,
            formatter: function() {
              return `
                  <div class="priceTag">${this.value}</div>
                  <div class="line up"></div>
                  <div class="line down"></div> `
            },
            x: -20
            // step: 2
            // reserveSpace: false
          },
          allowDecimals: !0,
          title: null,
          snap: !1,
          crosshair: {
            snap: !1,
            color: 'rgba(167, 174, 196, 0.3)',
            dashStyle: 'Solid'
          },
          // labels: {
          //   style: {
          //     color: 'rgba(167, 174, 196, 0.5)'
          //   }
          // },
          gridLineColor: 'rgba(167, 174, 196, 0.1)',
          gridLineWidth: 2,
          plotLines: [{
            color: '#cccccc',
            width: 1,
            dashStyle: 'Dash',
            value: dataArr[dataArr.length - 1].y,
            label: {
              align: 'right',
              x: -0,
              useHTML: true,
              formatter: function() {
                return `
                  <div class="priceTag plotline">${this.options.value}</div>
                  <div class="line up" style="height:300px" id="plotline-danger"></div>
                  <div class="line down" style="height:300px" id="plotline-success"></div> 
                  <div id="ripple" class="ripple"></div>`
              }
            }
          }]
        },
        series: [{
          type: 'area',
          data: dataArr,
          animation: !0,
          threshold: null,
          turboThreshold: 0,
          allowPointSelect: !0,
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [[0, 'rgba(117,122,136,0.5)'], [1, 'rgba(88,91,114,0)']]
          }
        }],
        defs: {
          marker0: {
            tagName: 'marker',
            render: false, // if false it does not render the element to the dom
            id: 'custom-shape',
            children: [{
              tagName: 'path',
              d: 'M 10,0 C 0,0 0,10 10,10 C 12.5,7.5 12.5,7.5 20,5 C 12.5,2.5 12.5,2.5 10,0 Z'
            }],
            markerWidth: 40,
            markerHeight: 40,
            refX: 20,
            refY: 5
          },
          marker1: {
            children: [{
              tagName: 'circle',
              r: 4,
              cx: 10,
              cy: 10,
              fill: 'rgba(42, 172, 62, 0.6)'
            }],
            tagName: 'marker',
            id: 'green',
            markerWidth: 25,
            markerHeight: 25,
            refX: 10,
            refY: 10
          },
          marker2: {
            children: [{
              tagName: 'circle',
              r: 4,
              cx: 10,
              cy: 10,
              fill: 'rgba(232, 79, 67, 0.6)'
            }],
            tagName: 'marker',
            id: 'red',
            markerWidth: 25,
            markerHeight: 25,
            refX: 10,
            refY: 10
          }
        }

      })
    },
    afterInitChartsCharts() {
      // 临时变量

    },
    handlePlotLinesByCountUp(data) {
      this.countUp = new CountUp(this.chart.yAxis[0].plotLinesAndBands[0].label.element.children[0], data[data.length - 1].y, data[data.length - 1].y, 4, 0.5, {
        formattingFn(res) {
          if (!res) return res
          const arr = String(res).split('.')
          return `<span>${arr[0]}.<span style="font-size:16px;position:absolute;margin-left:-5px;color:${this.isUp ? 'green' : 'red'}">${arr[1]}</span></span>`
        }
      })
    },
    creatTwoLineByTime(timeStamp) {
      const { orderPixels, finishPixels } = this.handleLinePixelsByTime(timeStamp)
      
      this.chart.renderer.label(`<div id="orderTime" class="time-line white  opacity" style="transform: translate(${orderPixels}px, 0px);">
          <div class="time-line-main">
            <div class="box"></div>
            <div class="time-lineL" />
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-flag" />
            </svg>
            <div class="mask" style="width:0" />
          </div>
        </div>`, 0, 0, 'rect', 0, 0, true).add()
      // this.chart.renderer.label(`<div id="ripple" class="ripple"></div>`, 0, 0, 'rect', 0, 0, true).add()
      this.chart.renderer.label(`<div id="finishTime" class="time-line  opacity" style="transform: translate(${finishPixels}px, 0px);">
          <div class="time-line-main">
            <div class="box" style="background:none;color:red"></div>
            <div class="time-lineL yellow" />
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-time" />
            </svg></div>
        </div>`, 0, 0, 'rect', 0, 0, true).add()
    },
    initOrderLineByCountUp(timeStamp) {
      const orderBoxElement = this.orderTimeElement.querySelector('.box')
      const yetTime = (new Date(timeStamp).setSeconds(40) - timeStamp) / 1000 - 1
      this.orderBoxCountUp = new CountUp(orderBoxElement, yetTime, 0, 0, yetTime, {
        useEasing: false,
        prefix: '00 ：'
      })
      this.orderBoxCountUp.start()
    },
    handleScroll(e) {
      const { min, max } = this.chart.xAxis[0].getExtremes()
      this.chart.xAxis[0].update({ min: Math.min(min - 60 * e.deltaY, max) })
      this.isNoScroll && this.chart.showResetZoom()
      this.isNoScroll = false
    },
    activeHover(stateName) {
      const element = document.querySelector(`#plotline-${stateName}`)
      if (!element) return
      element.style.display = 'block'
    },
    disableHover(stateName) {
      const element = document.querySelector(`#plotline-${stateName}`)
      if (!element) return
      element.style.display = 'none'
    },
    addLabels(color, value = 1) {
      this.chart.annotations[0].initLabel({
        point: this.lastPoint,
        // text: '1',
        // shape: 'circle',
        shape: 'connector',
        backgroundColor: 'white',
        useHTML: true,
        formatter() {
          return `
            <div class="annotations-box ${color}">
              <svg class="icon" aria-hidden="true" width="10px" height="10px">
                <use xlink:href="#icon-time" />
              </svg>
              <span>${value}</span>
            </div>
          `
        }
      })
      this.chart.annotations[0].initShape({
        fill: 'none',
        stroke: color,
        strokeWidth: 1,
        type: 'path',
        markerStart: color,
        points: [this.lastPoint, {
          x: this.lastPoint.x + 1000 * 60 * 60,
          y: this.lastPoint.y,
          xAxis: 0,
          yAxis: 0
        }] })
    }
  }
}
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
#container{
  .myChart .highcharts-range-selector-group {
  display: none; }

  .myChart .highcharts-exporting-group {
    display: none; }
  .priceTag{
    position: relative;
    z-index: 3;
    width: 78px;
    height: 26px;
    line-height: 26px;
    border: 1px solid #4F596D;
    border-radius: 13px;
    background-color: #171C29;
    text-align: center;
    font-size: 12px;
    color: #8F97AE;
    cursor: pointer;
    opacity: 0.6;
    &:hover{
      // color: #fff;
      opacity: 1;
      & ~ div{
        display: block
      }
    }
    &.plotline{
      background: #ccc;
      border-radius: 2px 0 0 2px;
      color: #171C29;
      opacity: 1;
      line-height: 30px;
      height: 30px;
      width: 100px;
      text-align: left;
      text-indent: 5px;
      &:before {
          content: '';
          width: 0;
          height: 0;
          border-width: 15px;
          border-style: solid;
          border-color:transparent #ccc transparent transparent;
          position: absolute;
          left: -30px;
          top: 0px;
          z-index: -1;
      }
    }
  }
  .line{
    width: 100vw;
    z-index: 1;
    height: 100px;
    right: 0;
    // background: #000;
    position: absolute;
    display: none;
    &.up{
      top: 50%;
      background: linear-gradient(to bottom, rgba(202,38,38,0.3), transparent);
    }
    &.down{
      bottom: 50%;
      background: linear-gradient(to top, rgba(30,139,33,0.3), transparent);
    }
  }

  .time-line {
    position: absolute;
    top: 20px;
    // bottom: 78px;
    // left: 65px;
    z-index: 9;
    height: calc(100vh - 150px);
    // height: 500;
    transition: transform .5s linear;
    will-change: transform, opacity;
    pointer-events: none;
    &.yellow{
      left: 20px;
    }
    .time-line-main {
      position: relative;
      z-index: 11;
      height: 100%;
      &>.txt {
        font-size: 14px;
        transform: translateX(-50%);
        will-change: contents;
      };
      &>.box {
        position: relative;
        z-index: 12;
        min-width: 60px;
        line-height: 2;
        border-radius: 4px;
        background: #fff;
        opacity: .8;
        font-size: 12px;
        color: #000;
        text-align: center;
        transform: translateX(-50%);
      }
      .icon {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 11;
        width: 20px;
        height: 20px;
        font-size: 30px;
        transform: translateX(-50%);
        border:2px solid #fff;
        border-radius: 50%;
        padding: 5px;
        background: #000;
      }
    };
    .time-lineL {
      position: absolute;
      top: 0;
      bottom: 0;
      // left: -1px;
      width: 2px;
      background: linear-gradient(to top, rgba(30,139,33,1), transparent);
    }
    .time-lineL.yellow {
      position: absolute;
      top: 0;
      bottom: 0;
      // left: -1px;
      width: 2px;
      background: linear-gradient(to top, red, transparent);
    }
    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50vw;
      z-index: -1;
      opacity: .3;
      transition: width .4s, opacity .5s;
      background-image: linear-gradient(to right, #28677A, transparent);
      // animation: maskIn .25s linear;
      animation-fill-mode: forwards;
    }
  }
  .ripple{
    display: block;
    width: 4px;
    height: 4px;
    // margin: 160px auto;
    animation: ripple 0.6s linear infinite;
    border-radius: 50px;
    background-color: red;
    position: absolute;
    top: 13px;
    // transform: translateY(-50%);
    right: 500px;
  }
  .annotations-box{
    position: absolute;
    // margin-left: -5px;
    margin-top: 10px;
    height: 20px;
    line-height: 18px;
    border-radius: 10px 10px 10px 1px;
    font-size: 12px;
    color: #fff;
    padding: 0 8px 0 6px;
    &.green{
      background: rgba(42, 172, 62, 0.6)
    }
    &.red{
      background: rgba(232, 79, 67, 0.6)
    }
  }
}
@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 128, 0, 0.1), 0 0 0 20px rgba(0, 128, 0, 0.1), 0 0 0 40px rgba(0, 128, 0, 0.1), 0 0 0 60px rgba(0, 128, 0, 0.1);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(0, 128, 0, 0.1), 0 0 0 40px rgba(0, 128, 0, 0.1), 0 0 0 60px rgba(0, 128, 0, 0.1), 0 0 0 80px rgba(0, 128, 0, 0);
  }
}
</style>
