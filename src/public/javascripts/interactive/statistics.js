// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入柱状图
require('echarts/lib/chart/line');
//引入饼状图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/title');
require('echarts/lib/component/markPoint');
require('echarts/lib/component/markLine');
require("echarts/lib/component/legend");

const [
    token,
    u,
    uri,
    perent
] = [
        parent.all.json,
        parent.document.getElementById('tagHref').getAttribute('src').replace('..', '/manage').split('?')[0],
        document.getElementById('c-container-list').getAttribute('data-uri'),
        document.getElementById('c-container-list').getAttribute('data-child-uri')
    ];
const _data = {
    id: ym.init.COMPILESTR.decrypt(token.id),
    token: ym.init.COMPILESTR.decrypt(token.asset),
    url: u
};
new Vue({
    el: '#c-container-list',
    data: () => {
        return {
            loading: false,
            more: false,
            listSearch: {},
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近半年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            tableData: [],
            userCharts: [ym.init.getDateTime(new Date().setDate(new Date().getDate() - 6)).split(' ')[0], ym.init.getDateTime(new Date()).split(' ')[0]],
            sum: 0,
            paySum: 0,
            page: 1,
            pageSize: 20,
            currentPage: 1,
            total: 0,
            chartsSearch: {
                _value_: '',
                _name_: '',
                hasTest: 0,  //是否包含测试数据
                timeUnit: 3, //默认启用天的时间单位
                _time_: '',
                _machineNumber: 100033
            },   //新版的统计图表
            data: {}
        }
    },
    created: function () {
        window.it = this;
        this.charts();
    },
    methods: {
        IError(err) {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            this.$message.error('错了哦!' + err);
        },
        ISuccessfull(e) {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            this.$message({
                message: '成功了哦!,' + e,
                type: 'success'
            });
        },
        getTime(e) {
            this.userCharts[0] = this.getDateTime(e[0]);
            this.userCharts[1] = this.getDateTime(e[1]);
            this.charts();
        },
        charts(_params_ = {}) {
            const it = this;
            it.loading = true;
            let _data_ = {}, _DayTime = [], _content = [];

            _params_['start'] = this.userCharts[0] || this.getDateTime(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)).split(' ')[0];  //初始化两个时间
            _params_['end'] = this.userCharts[1] || this.getDateTime(new Date()).split(' ')[0];
            _params_['timeUnit'] = _params_['timeUnit'] || this.chartsSearch.timeUnit;
            it.chartsSearch._time_ = [_params_['start'], _params_['end']];
            _data_ = _params_;

            if (_params_.timeUnit == 2) {
                _params_['start'] = _params_['start'].substring(0, _params_['start'].lastIndexOf('-'));
                _params_['end'] = _params_['end'].substring(0, _params_['end'].lastIndexOf('-'));
            } else if (_params_.timeUnit == 1) {
                _params_['start'] = _params_['start'].split('-')[0];
                _params_['end'] = _params_['end'].split('-')[0];
            }

            axios.get('sys_work_status_count', {
                params: _data_
            }).then(res => {
                this.data = res.data.data;
            })

            axios.get('statistics_work_count', {
                params: _data_
            }).then(res => {  //工单数量
                let _date = this.getAllDate(it.userCharts[0].split(' ')[0], it.userCharts[1].split(' ')[0]);
                if (_params_.timeUnit == 2) {   //这里的处理为待定  去年/月/日的的统计图【X】坐标
                    let code = [];
                    _date.forEach(ele => {
                        code.push(ele.substring(0, ele.lastIndexOf('-')))
                    })
                    _date = Array.from(new Set(code));
                } else if (_params_.timeUnit == 1) {
                    let code = [];
                    _date.forEach(ele => {
                        code.push(ele.split('-')[0])
                    })
                    _date = Array.from(new Set(code));
                }
                for (let i = 0; i < _date.length; i++) {
                    _DayTime.push(_date[i]);  //记录日期
                    _content.push(0); //先赋值 0
                    if (res.data.state == 200) {
                        if (res.data.list.workCount == +false) continue;
                        for (let j of res.data.list) {
                            if (_date[i] == j.workDate) {
                                _content[i] = j.workCount; //对应的数值
                            }
                        }
                    }
                }
                if (res.data.state != 200) {
                    it.IError(res.data.msg);
                }
                setTimeout(() => {
                    let echartsCanvasNumberNew = echarts.init(document.getElementById('echartsCanvasNumberNew')), option =
                    {
                        title: {
                            text: '工单数量'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                magicType: { show: true, type: ['line', 'bar'] },
                                restore: { show: true },
                                saveAsImage: { show: true }
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: _DayTime
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: '工单数量',
                                type: 'line',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                areaStyle: {},
                                data: _content
                            }
                        ]
                    };

                    echartsCanvasNumberNew.setOption(option, true);
                    this.workpay(_params_);
                }, 500)
            })
                .catch(function (error) {
                    it.IError(error);
                })
            it.loading = false;
        },

        workpay(_params_) {
            let _DayTime = [], _content = [];
            axios.get('statistics_work_pay', {
                params: _params_
            }).then(res => {  //工单数量
                let _date = this.getAllDate(it.userCharts[0].split(' ')[0], it.userCharts[1].split(' ')[0]);
                if (_params_.timeUnit == 2) {   //这里的处理为待定  去年/月/日的的统计图【X】坐标
                    let code = [];
                    _date.forEach(ele => {
                        code.push(ele.substring(0, ele.lastIndexOf('-')))
                    })
                    _date = Array.from(new Set(code));
                } else if (_params_.timeUnit == 1) {
                    let code = [];
                    _date.forEach(ele => {
                        code.push(ele.split('-')[0])
                    })
                    _date = Array.from(new Set(code));
                }
                for (let i = 0; i < _date.length; i++) {
                    _DayTime.push(_date[i]);  //记录日期
                    _content.push(0); //先赋值 0
                    if (res.data.state == 200) {
                        if (res.data.list.workCount == +false) continue;
                        for (let j of res.data.list) {
                            if (_date[i] == j.workDate) {
                                _content[i] = j.payStr; //对应的数值
                            }
                        }
                    }
                }
                if (res.data.state != 200) {
                    it.IError(res.data.msg);
                }
                setTimeout(() => {
                    let echartsCanvasNumberNews = echarts.init(document.getElementById('echartsCanvasNumberNews')), options =
                    {
                        title: {
                            text: '金额总数'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                magicType: { show: true, type: ['line', 'bar'] },
                                restore: { show: true },
                                saveAsImage: { show: true }
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: _DayTime
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: '金额总数',
                                type: 'line',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                areaStyle: {},
                                data: _content
                            }
                        ]
                    };

                    echartsCanvasNumberNews.setOption(options, true);
                    // this.autoHeight = (res.package.machineSoldAnalyzeList == null ? 0 : res.package.package.machineSoldAnalyzeList.length * 35 + 200);
                    // usChart.getDom().style.height = this.autoHeight + "px";
                    // usChart.resize();  //重置canvas的高度
                    this.worktime(_params_);
                }, 500)
            })
                .catch(function (error) {
                    it.IError(error);
                })
        },

        worktime(_params_) {
            let _DayTime = [], _content = [], blocks = {};
            axios.get('statistics_work_time_consuming', {
                params: _params_
            }).then(res => {  //工单数量
                let _date = this.getAllDate(it.userCharts[0].split(' ')[0], it.userCharts[1].split(' ')[0]);
                if (_params_.timeUnit == 2) {   //这里的处理为待定  去年/月/日的的统计图【X】坐标
                    let code = [];
                    _date.forEach(ele => {
                        code.push(ele.substring(0, ele.lastIndexOf('-')))
                    })
                    _date = Array.from(new Set(code));
                } else if (_params_.timeUnit == 1) {
                    let code = [];
                    _date.forEach(ele => {
                        code.push(ele.split('-')[0])
                    })
                    _date = Array.from(new Set(code));
                }
                blocks = res.data.list;  //缓存所有的数据
                // blocks = blocks.push(res.data.list);  //缓存所有的数据
                for (let i = 0; i < _date.length; i++) {
                    _DayTime.push(_date[i]);  //记录日期
                    _content.push(0); //先赋值 0
                    if (res.data.state == 200) {
                        if (res.data.list.workCount == +false) continue;
                        for (let j of res.data.list) {
                            if (_date[i] == j.workDate) {
                                _content[i] = parseFloat(j.timeConsuming / 1000).toFixed(3);
                                // _content[i] = j.timeConsumingStr.replace(/\天/g, '.').replace(/\时/g, '0').split('分')[0]; //对应的数值
                            }
                        }
                    }
                }
                if (res.data.state != 200) {
                    it.IError(res.data.msg);
                }
                setTimeout(() => {
                    let echartsCanvasNumberNewss = echarts.init(document.getElementById('echartsCanvasNumberNewss')), optionss =
                    {
                        title: {
                            text: '工单耗时'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            },
                            formatter: function (params) {
                                var color = params[0].color;//图例颜色
                                var htmlStr ='<div>';
                                htmlStr += params[0].name +'<br/>';//x轴的名称
                                
                                //为了保证和原来的效果一样，这里自己实现了一个点的效果
                                blocks.forEach(element => {
                                    if(element.workDate == params[0].name){
                                        htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';
                                        htmlStr += `工单耗时：${ element.timeConsumingStr }`;
                                    }
                                })

                                //添加一个汉字，这里你可以格式你的数字或者自定义文本内容
                                // htmlStr += `工单耗时：${ params[0].value }天${ params[0].value }时${ params[0].value }分${ params[0].value }秒`;
                                
                                htmlStr += '</div>';
                                
                                return htmlStr; 
                            }
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                magicType: { show: true, type: ['line', 'bar'] },
                                restore: { show: true },
                                saveAsImage: { show: true }
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: _DayTime
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: '工单耗时',
                                type: 'line',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                areaStyle: {},
                                data: _content
                            }
                        ]
                    };

                    echartsCanvasNumberNewss.setOption(optionss, true);
                    // this.autoHeight = (res.package.machineSoldAnalyzeList == null ? 0 : res.package.package.machineSoldAnalyzeList.length * 35 + 200);
                    // usChart.getDom().style.height = this.autoHeight + "px";
                    // usChart.resize();  //重置canvas的高度
                }, 500)
            })
                .catch(function (error) {
                    it.IError(error);
                })
        },

        getTimeData() {
            this.charts();
        },
        getAllDate(begin, end) {   //提取指定日期
            var dtemp = [];
            var ab = begin.split("-");
            var ae = end.split("-");
            var db = new Date();
            db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
            var de = new Date();
            de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
            var unixDb = db.getTime();
            var unixDe = de.getTime();
            for (var k = unixDb; k <= unixDe;) {
                dtemp.push((new Date(parseInt(k))).format());
                k = k + 24 * 60 * 60 * 1000;
            }
            return dtemp;
        },
        getDateTime(data) {
            var date = new Date(data);   //如果date为10位不需要乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

            return Y + M + D + h + m + s;
        },

    }
});

Date.prototype.format = function () {  //原型
    var s = '';
    var mouth = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1) : ('0' + (this.getMonth() + 1));
    var day = this.getDate() >= 10 ? this.getDate() : ('0' + this.getDate());
    s += this.getFullYear() + '-'; // 获取年份。
    s += mouth + "-"; // 获取月份。
    s += day; // 获取日。
    return (s); // 返回日期。
};

window.onload = () => {
    document.querySelector('#c-container-list').style.display = 'block';
};