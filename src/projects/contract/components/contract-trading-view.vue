<template>
  <div class="tv-wrap">
    <div id="tv_chart_container" />
    <div class="mask" :class="{show: !tvReady}">
      <v-loading />
    </div>
    <i class="k-line-logo icon"></i>
  </div>
</template>

<script>
import utils from "@/modules/utils";
import configIniter from "@/libs/tradingview/contract-config";
import datafeeder from "@/libs/tradingview/contract-datafeeder";
import { local, state } from "@/modules/store";
// preload
const tvlib = utils.getExtModule("TradingView");
export default {
  name: "ContractTradingView",
  data() {
    return {
      state,
      local,
      widget: null,
      layoutOk: false,
      tvReady: false,
      entryId: "",
      hasIndicator: false
    };
  },
  methods: {
    layout() {
      this.layoutOk = true;
      this.init();
    },
    configure() {
      const config = configIniter();
      config.symbol = this.pair;
      config.interval = local.interval;
      config.datafeed = datafeeder;
      config.locale = this.getLanguage(this.state.locale);
      return config;
    },
    getLanguage(locale) {
      switch (locale) {
        case "zh-CN":
          return "zh";
        case "zh-HK":
          return "zh_TW";
        case "ko":
          return "ko";
        case "en":
        default:
          return "en";
      }
    },
    async init(pair) {
      if (!this.pair || !this.layoutOk || this._isDestroyed) {
        return false;
      }
      const vm = this;
      const config = this.configure();

      const TradingView = await tvlib;
      const Widget = TradingView.widget;
      this.widget = new Widget(config);

      this.widget.onChartReady(function() {
        if (vm._isDestroyed) {
          return false;
        }
        let widget = vm.widget;
        vm.tvReady = true;
        vm.$emit("chartReady");

        // 7 日均线
        let ida = 0;
        widget.chart().createStudy(
          "Moving Average",
          !1,
          !1,
          [7],
          entryId => {
            ida = entryId;
          },
          {
            "Plot.color": "#ff9500",
            "Plot.linewidth": 3,
            precision: 1
          }
        );
        // 30 日均线
        let idb = 0;
        widget.chart().createStudy(
          "Moving Average",
          !1,
          !1,
          [30],
          entryId => {
            idb = entryId;
          },
          {
            "Plot.color": "#107efa",
            "Plot.linewidth": 3,
            precision: 1
          }
        );
        // 60 日均线
        let idc = 0;
        widget.chart().createStudy(
          "Moving Average",
          !1,
          !1,
          [60],
          entryId => {
            idb = entryId;
          },
          {
            "Plot.color": "#92d5f7",
            "Plot.linewidth": 3,
            precision: 1
          }
        );
        // MACD
        widget
          .chart()
          .onIntervalChanged()
          .subscribe(null, function(interval) {
            local.interval = interval;
            if (interval != "1") {
              widget.chart().setChartType(local.lineType);
              widget.chart().setEntityVisibility(ida, true); //显示7 日平均线
              widget.chart().setEntityVisibility(idb, true); //显示30 日平均线
              widget.chart().setEntityVisibility(idc, true); //显示60 日平均线

              //移除分时线高亮
              if (widget.btnFS[0].classList.contains("selected")) {
                widget.btnFS[0].classList.remove("selected");
              }
            }
          });
        let indicators = [
          {
            name: "MACD"
            // args: [14, 30, 'close', 9]
          },
          {
            name: "StochRSI",
            fullname: "Stochastic RSI"
            // args: [10]
          },
          {
            name: "BOLL",
            fullname: "Bollinger Bands"
            // args: [20]
          }
        ];
        indicators.forEach(indicat => {
          let btn = widget
            .createButton()
            .on("click", e => {
              let element = e.srcElement || e.target;
              let cls = element.classList;
              if (!cls.contains("selected")) {
                if (this.hasIndicator) {
                  widget.chart().removeEntity(this.entryId);
                  element.parentElement.parentElement
                    .querySelector(".space-single .selected")
                    .classList.remove("selected");
                }
                widget.chart().createStudy(
                  indicat.fullname || indicat.name,
                  !1,
                  !1,
                  indicat.args,
                  entryId => {
                    this.entryId = entryId;
                  },
                  {
                    precision: 1
                  }
                );
                element.classList.add("selected");
                this.hasIndicator = true;
              } else {
                if (!this.entryId) return;
                widget.chart().removeEntity(this.entryId);
                this.entryId = "";
                this.hasIndicator = false;
                element.classList.remove("selected");
              }
            })
            .append(indicat.name);
          if (indicat.name === "MACD") {
            btn.trigger("click");
          }
        });


        let resolutions = document.createElement('div') //时间周期菜单
        //分时线
        widget.btnFS = widget.createButton().on("click", (e, vm) => {
          let element = e.srcElement || e.target;
          let cls = element.classList;
          if (!cls.contains("selected")) {
            element.classList.add("selected");
            local.lineType = widget.chart().chartType(); //记录当前的K线样式
            widget.chart().setChartType(2); //K线样式切換到线形图
            widget.chart().setResolution("1", null); //周期切换到一分钟
            widget.chart().setEntityVisibility(ida, false); //隐藏7 日平均线
            widget.chart().setEntityVisibility(idb, false); //隐藏30 日平均线
            widget.chart().setEntityVisibility(idc, false); //隐藏60 日平均线
          } else {
            element.classList.remove("selected");
            widget.chart().setChartType(local.lineType);
            widget.chart().setEntityVisibility(ida, true); //显示7 日平均线
            widget.chart().setEntityVisibility(idb, true); //显示30 日平均线
            widget.chart().setEntityVisibility(idc, true); //显示60 日平均线
          }
        })
        //.append(resolutions)
        // resolutions.innerHTML = ''
        // // .append(e2) 
        // .append(`<div class='el-dropdown' :hide-on-click="false">
        //               <span class="el-dropdown-link">
        //                 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        //               </span>
        //               <ul class="el-dropdown-menu" slot="dropdown">
        //                 <li class="el-dropdown-item">黄金糕</li>
        //                 <li class="el-dropdown-item">狮子头</li>
        //                 <li class="el-dropdown-item">螺蛳粉</li>
        //                 <li class="el-dropdown-item" >双皮奶</li>
        //                 <li class="el-dropdown-item" >蚵仔煎</li>
        //               </ul>
        //             </div>`);

        .append(utils.$i18n.t("tradingview_line"))

        var button = widget.createButton();
        button.attr("title", '"My	custom	button	tooltip"');
        //button.addEventListener.on('click',	function(e){ alert("My custom button pr essed!"); });
        // button.append('My	custom	button	caption');
        button.textContent = `<span>My custom button caption'</span>`;

        

        //widget.chart().executeActionById('drawingToolbarAction')
      });
    }
  },
  computed: {
    pair() {
      return this.state.ct.pair;
    }
  },
  watch: {
    pair: {
      handler(pair, oldPair) {
        if (pair && !oldPair) {
          this.init(pair);
        }
        if (pair && oldPair) {
          if (this.tvReady) {
            return this.widget.chart().setSymbol(pair);
          }
          this.$once("chartReady", () => {
            return this.widget.chart().setSymbol(this.pair);
          });
        }
      },
      immediate: true
    },
    "local.upDown"() {
      if (this.tvReady) {
        this.widget.remove();
      }
      datafeeder.destroy();
      this.tvReady = false;
      this.$nextTick(() => {
        this.init(this.pair);
      });
    },
    "state.locale"(locale) {
      // SetLanguage is bugy
      // this.widget.setLanguage(this.getLanguage(this.state.locale))
      // Reload widget
      if (this.tvReady) {
        this.widget.remove();
      }
      datafeeder.destroy();
      this.tvReady = false;
      this.$nextTick(() => {
        this.init(this.pair);
      });
    }
  },
  async created() {
    this.$eh.$on("protrade:layout:init", this.layout);
  },
  beforeDestroy() {
    this.$eh.$off("protrade:layout:init", this.layout);
  },
  destroyed() {
    if (this.tvReady) {
      this.widget.remove();
    }
    datafeeder.destroy();
  }
};
</script>

<style lang="scss">
#tv_chart_container {
  width: 100%;
  height: 100%;
}
.tv-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .mask {
    @include ix-mask();
  }
  .icon {
    position: absolute;
    bottom: 57px;
    left: 250px;
    width: 85px;
    height: 22px;
    background-image: url("~@/assets/ixx-k.png");
    background-position: 0 0;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
