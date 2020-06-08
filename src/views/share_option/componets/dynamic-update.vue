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
import Highcharts from 'highcharts/highcharts'
import HighMap from 'highcharts/modules/map.js'
import Annotations from 'highcharts/modules/annotations.js'
import websoketMixin from '@/mixins/soket'
import CountUp from 'countup/dist/countUp.min'
import { bigRound } from '@/utils/handleNum'
import { debounce, parseTime, timestampToDate } from '@/utils'
import { rangeArr } from '@/const'
import utils from '@/modules/utils'

import config from '@/libs/config'
HighMap(Highcharts)
Annotations(Highcharts)
export default {
  mixins: [websoketMixin],
  props: {
    incomeObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isLoading: false,
      isNoScroll: true,
      yetHandle: false
    }
  },
  mounted() {
    document.addEventListener('visibilitychange',()=>{
      if(this.websockets[0].readyState !== 1)this.startWebSocket()
  });
    this.startWebSocket()
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    startWebSocket(){
      this.isLoading = true

      this.openWebSocket( config.wssUrl, res => {
      // this.openWebSocket('wss://wss.ixex.io/v1', res => {
      // console.log(res)
      if (res.spotIndexDTOList) {
          if (!res.spotIndexDTOList.length) return
          const data = res.spotIndexDTOList.map((dataString, index) => {
            const item = JSON.parse(dataString)
            return { x: item.time, y: Number(item.price) }
          })
          if (!data.length) return
          this.initCharts(data)
          this.handlePlotLinesByCountUp(data)
          this.creatTwoLineByTime(res.timeStamp)

          this.orderTimeElement = document.querySelector('#orderTime')
          this.finishTimeElement = document.querySelector('#finishTime')
          this.rippleElement = document.querySelector('#ripple')

          // this.initOrderLineByCountUp(res.timeStamp)
          this.chart.pointer.onContainerMouseWheel = debounce(this.handleScroll, 100, true)

          this.isLoading = false
        } else if (res.data) {
          this.addUserAnnotations(res.data)
        } else {
          if (!this.chart) return
          const { min } = this.chart.xAxis[0].getExtremes()
          const price = Number(res.price)
          this.chart.yAxis[0].plotLinesAndBands[0].options.value = price

          this.countUp.update(price)
          this.countUp.isUp = this.countUp.endVal - this.countUp.startVal > 0

          const resTime = res.time

          const markElement = this.orderTimeElement.querySelector('.mask')
          const xData = this.chart.series[0].xData
          this.isLoading = xData[xData.length - 5] === resTime
          this.lastPoint = {
            x: resTime,
            y: price,
            xAxis: 0,
            yAxis: 0
          }
          // console.log(new Date(resTime).getTime())

          this.chart.series[0].addPoint([new Date(resTime).getTime(), price])
          const dataCout = this.chart.series[0].data.filter(item => item.x > min).length
          if (dataCout > 50 && this.isNoScroll) this.initxAxis()

          const { orderPixels, finishPixels, orderTime, finishTime } = this.handleLinePixelsByTime(resTime)
          markElement.style.width = resTime >= orderTime ? '50vw' : 0
          res.orderTime = orderTime
          this.$emit('pushData', res)

          this.handleTwoLineTips(resTime, orderTime, finishTime)

          this.orderTimeElement.style.transform = `translate(${orderPixels + 5}px, 0px)`
          this.finishTimeElement.style.transform = `translate(${finishPixels + 5}px, 0px)`
          // this.chart.addAnnotation({ labels: [{ point: { x: resTime, y: price }}] })
          this.rippleElement.style.right = this.chart.containerWidth - this.chart.xAxis[0].toPixels(resTime, true) - 22 + 'px'

          // if (dataCout > 200 && this.isNoScroll)
          // let dataArr = this.chart.series[0].data
          // this.chart.xAxis[0].update({ min: dataArr[dataArr.length - 200].x })

        }
      }).then(websocket => {
        // websocket.send(`{"reqType":9,"param":{"id":1,"period":1,"optionType":1}}`)
        // websocket.send(`{"reqType":1,"param":{"assetCode":1,"optionType":1}}`)
      })
    },
    handleTwoLineTips(resTime, orderTime, finishTime) {
      // const innerText = this.$t('shareOption.next')
      const innerText = utils.$i18n.t('shareOption.next')
      const orderBoxElement = this.orderTimeElement.querySelector('.box')
      const finishBoxElement = this.finishTimeElement.querySelector('.box')
      if (resTime >= orderTime) {
        orderBoxElement.innerText = innerText
        const yetTime = (finishTime - resTime) / 1000
        finishBoxElement.innerText = timestampToDate(yetTime)
        if (yetTime === 1) {
          this.$emit('settleOrder', incomeObj => {
            const points = this.chart.series[0].points
            this.chart.tooltip.iscustom = true
            this.chart.tooltip.incomeObj = incomeObj
            this.chart.tooltip.refresh(points[points.length - 1])
            setTimeout(() => {
              this.chart.tooltip.hide()
              this.chart.tooltip.iscustom = false
              this.chart.tooltip.incomeObj = {}
            }, 2000)
          })
          this.cleanAnnotations(orderTime)
        }
      } else {
        const yetTime = (orderTime - resTime) / 1000
        orderBoxElement.innerText = timestampToDate(yetTime)
        finishBoxElement.innerText = ''
      }
    },
    addUserAnnotations(data) {
      data = JSON.parse(data)
      this.addLabels(!data.tradeType ? 'green' : 'red', data.amount, data)
    },
    cleanAnnotations(orderTime) {
      // const labels = this.chart.annotations[0].labels.filter(item => item.options.point.x <= orderTime)
      const shapes = this.chart.annotations[0].shapes.filter(item => item.options.points[0].x <= orderTime && item.options.customPeriod === this.websocketArgs[0])
      shapes.forEach((item, index) => {
        this.chart.annotations[0].destroyItem(item)
        // this.chart.annotations[0].destroyItem(item)
      })
      localStorage.removeItem('annotations')
    },
    handleLinePixelsByTime(time) {
      const [period, , settleTime] = rangeArr[this.websocketArgs[0] - 1]
      const num = (period - new Date(time).getMinutes() % period) || 1
      const orderTime = new Date(time).setSeconds(num * 60 - settleTime)
      const finishTime = new Date(time).setSeconds(num * 60)
      // console.log(new Date(orderTime), new Date(finishTime), period * 60 - settleTime, period)
      const orderPixels = this.chart.xAxis[0].toPixels(orderTime, true)
      const finishPixels = this.chart.xAxis[0].toPixels(finishTime, true)
      return { orderPixels, finishPixels, orderTime, finishTime }
    },
    initxAxis() {
      const dataArr = this.chart.series[0].data
      dataArr.length > 50 && this.chart.xAxis[0].update({ min: dataArr[dataArr.length - 50].x })
    },
    initCharts(dataArr) {
      Highcharts.setOptions({
        global: { useUTC: false }
      })

      let annotations = localStorage.getItem(`annotations`)
      annotations = annotations ? JSON.parse(annotations) : {}

      const that = this
      this.chart = Highcharts.chart('container', {
        rangeSelector: { selected: 1
        },
        title: {
          text: ''
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
              align: 'right', // by default
              x: -40
            },
            theme: {
              fill: 'rgba(255,255,255,0.5)'
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
          labels: (annotations || {}).labels || [],
          shapes: (annotations || {}).shapes || [],
          draggable: false
        }],
        // annotations: [{
        //   points: [],
        //   draggable: false
        // }, {
        //   points: [],
        //   draggable: false
        // }],
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
            },
            animation: {
              duration: 500,
              easing: 'easeOutBounce'
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
          formatter: function(instance) {
            const transformHtml = obj => Object.keys(obj).map(key => `<p style="color:#A8ACBB;">${key}：<span style="color:${+obj[key] >= 0 ? 'green' : 'red'}">${obj[key]}</span></p>`)
            return !instance.iscustom ? `<div>
              <p style="color:#fff; margin-bottom:5px;"><span style="color:#A8ACBB; margin-right:5px;">${that.$t('shareOption.time')}：${parseTime(this.x)}</span></p>
              <p style="color:#fff; margin-bottom:0px;"><span style="color:#A8ACBB;margin-right:5px;">${that.$t('shareOption.price')}：${bigRound(this.y, 4)}</p>
              </div>` : transformHtml(instance.incomeObj || {})
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
          tickPixelInterval: 120,
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
          maxPadding: 0.2,
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
      // <svg-icon icon-class="" />
      const { orderPixels, finishPixels } = this.handleLinePixelsByTime(timeStamp)
      this.chart.renderer.label(`<div id="orderTime" class="time-line white  opacity" style="transform: translate(${orderPixels}px, 0px);">
          <div class="time-line-main">
            <div class="box"></div>
            <div class="time-lineL" />
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#qizhi" />
            </svg>
            <div class="mask" style="width:0" />
          </div>
        </div>`, 0, 0, 'rect', 0, 0, true).add()
      // this.chart.renderer.label(`<div id="ripple" class="ripple"></div>`, 0, 0, 'rect', 0, 0, true).add()
      this.chart.renderer.label(`<div id="finishTime" class="time-line  opacity" style="transform: translate(${finishPixels}px, 0px);">
          <div class="time-line-main">
            <div class="box" style="background:none;color:red"></div>
            <div class="time-lineL yellow" />
            <svg class="icon" aria-hidden="true" width="20px">
              <use xlink:href="#qizhi_hongse" />
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
    handleScroll(e, n) {
      const xAxis = this.chart.xAxis[0]
      // if (Math.ceil(xAxis.tickInterval) <= 2000) return
      const { min, max, dataMin } = xAxis.getExtremes()

      const newMin = min - 60 * rangeArr[this.websocketArgs[0] - 1][1] * e.deltaY

      if (newMin > max - 60000) return
      if (rangeArr[this.websocketArgs[0] - 1][0] >= 180 && e.deltaY < 0 && newMin > max - 60000 * rangeArr[this.websocketArgs[0] - 1][0]) return
      xAxis.update({ min: Math.min(newMin, max) })
      this.isNoScroll && this.chart.showResetZoom()
      this.isNoScroll = false
      const tickTime = +((max - min) / 60000).toFixed(0)
      if (xAxis.toPixels(dataMin) > 30) this.$emit('loadingData', xAxis.toPixels(dataMin) - 30)

      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (xAxis.toPixels(dataMin) > 120) {
          // this.$emit('loadingData', xAxis.toPixels(dataMin) - 30)
          setTimeout(() => {
            this.websockets[0].send(`{"reqType": 1, "args":${JSON.stringify([8, this.websocketArgs[1], newMin, this.websocketArgs[0]])}}`)
            this.$emit('loadingData', 0)
            this.isNoScroll = true
          }, 500)
        }
        const index = rangeArr.findIndex(item => tickTime >= item[0] && tickTime < item[1])
        if (+this.websocketArgs[0] === index) {
          this.$emit('handleTimeTabClick', this.websocketArgs[0])
          this.$emit('loadingData', 0)
          this.isNoScroll = true
        } else {
          console.log(this.chart.xAxis[0])
        }
      }, 1000)
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
    addLabels(color, value = 1, data) {
      const xAxis = this.chart.xAxis[0]
      // if (Math.ceil(xAxis.tickInterval) <= 2000) return
      const { max} = xAxis.getExtremes()

      const obj = {
        green: {
          borderColor: 'rgba(42, 172, 62, 0.8)',
          backgroundColor: 'rgba(42, 172, 62, 0.6)'
        },
        red: {
          borderColor: 'rgba(232, 79, 67, 0.8)',
          backgroundColor: 'rgba(232, 79, 67, 0.6)'
        }
      }
      let annotation = localStorage.getItem(`annotations`)
      annotation = annotation ? JSON.parse(annotation) : {}
      const { labels = [], shapes = [] } = annotation
      if(data){
        const labelOption = {
          point: {
            x:data.createTime,
            y:data.strike,
            xAxis: 0,
            yAxis: 0
          },
          text: value + ' ' + data.currency,
          borderRadius: 6,
          shape: 'rect',
          y: -6,
          allowOverlap: true,
          ...obj[color]
        }
        this.chart.annotations[0].initLabel(labelOption)
        labels.push(labelOption)
      }else {
        // const {finishTime} = this.handleLinePixelsByTime(this.lastPoint.x)
        const shapeOption = {
        fill: 'none',
        stroke: color,
        strokeWidth: 1,
        type: 'path',
        markerStart: color,
        customPeriod:this.websocketArgs[0],
        points: [this.lastPoint, {
          x: max+24*60*60*1000,
          y: this.lastPoint.y,
          xAxis: 0,
          yAxis: 0
        }] }
        this.chart.annotations[0].initShape(shapeOption)
        shapes.push(shapeOption)
      }
      localStorage.setItem(`annotations`, JSON.stringify({ labels, shapes }))
    },
    initChartsByReqType(reqType) {
      // this.websocketArgs[0] = +reqType + 1
      this.isLoading = true
      this.websockets[0].send(`{"reqType": 1, "args":["${+reqType + 1}","${this.websocketArgs[1]}"]}`)
    },
    switchProduct(product) {
      this.isLoading = true
      product[1] !== this.websocketArgs[1] && this.websockets[0].send(`{"reqType": 3, "args":["${this.websocketArgs[1]}"]}`)
      this.websocketArgs = product
      this.websockets[0].send(`{"reqType": 2, "args":["${this.websocketArgs[1]}"]}`)
      this.websockets[0].send(`{"reqType": 1, "args":${JSON.stringify(this.websocketArgs)}}`)
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
    transition: transform .8s ease;
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
    animation: ripple 0.3s linear infinite;
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
    overflow: hidden;
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
