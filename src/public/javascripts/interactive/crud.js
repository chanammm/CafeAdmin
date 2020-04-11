import { regionData, CodeToText, TextToCode } from 'element-china-area-data';
if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    window.onload = function (params) {
        for (let i = 0; i < document.getElementsByClassName('w400').length; i++) {
            document.getElementsByClassName('w400')[i].style.width = '100%'; //限定的表单宽度
        }
        document.getElementById('cityg') ? document.getElementById('cityg').style.display = 'none' : null;
    }
}
var [
    token,
    uri,
    assetUri,
    callBackHtml,
    dataHref
] = [
        parent.all.json,
        document.getElementById('c-container-list').getAttribute('data-uri'),
        document.getElementById('c-container-list').getAttribute('data-asset'),
        document.getElementById('c-container-list').getAttribute('data-goback'),
        parent.document.getElementById('tagHref').getAttribute('src')
    ];
const _data = {
    id: ym.init.COMPILESTR.decrypt(token.id),
    token: ym.init.COMPILESTR.decrypt(token.asset),
    url: assetUri
}
new Vue({
    el: '#c-container-list',
    data() {
        const querySearchAsyncMachineNumber = _ => {
            const data = []
            _data['machineType'] = 2;   //小机器map
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + 'get_machine_number_arr',
                async: true,
                xmldata: _data,
                done: function (res) {
                    res.list.forEach(element => {
                        data.push({
                            value: element,
                            desc: element
                        })
                    });
                }
            });

            this.searchAMap();
            return data;
        }
        return {
            fileUpdata: (process.env.NODE_ENV == "development" ? parent.all.json._j.URLS.Development_Files_ : parent.all.json._j.URLS.ForMal_Files_) + 'upload_file',
            loading: false,
            boxshow: false,
            boxmachineshow: false,
            boxvipshow: false,
            tagshow: false,
            select: '',
            formData: {
                formulaMakeList: [{
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }],
                formulaName: ''
            },
            formDataSmall: {
                formulaMakeList: [{
                    coffeeFlow: '',
                    coffeeTemporature: '',
                    coffeeWeight: '',
                    playMilkTime: '',
                    pumpPressure: '',
                    americanHotWaterWeight: '',
                    milkFlow: '',
                    formulaType: '',
                    formulaName: ''
                }],
                formulaName: ''
            },
            recipeOutOrder: [{
                value: '0',
                label: '不出料'
            },
            {
                value: '1',
                label: '第一次出料'
            },
            {
                value: '2',
                label: '第二次出料'
            },
            {
                value: '3',
                label: '第三次出料'
            },
            {
                value: '4',
                label: '第四次出料'
            },
            {
                value: '5',
                label: '第五次出料'
            },
            {
                value: '6',
                label: '第六次出料'
            },
            {
                value: '7',
                label: '第七次出料'
            }],
            flavorCanChange: '',
            ruleForm: {
                formulaId: '',
                productName: '',
                productPrice: '',
                originPrice: '',
                productMachinePicurl: '',
                productPicurl: '',
                productMachineDetailPicurl: '',
                productRank: '',
                operateType: 0,
                productStatus: 1,
                productTemperature: 1,
                productComment: '',
                bunkerNumberArr: [],
                machineType: 1,
                province: [],   //地址数组
                machineLatitude: '',  //纬度
                machineLongitude: '',  //经度
                machineScenePicUrl: '', //场景图片
                mapMarkerIcon: '', //地图图标
                planePicUrl: '', //楼层平面图
                machineUrl: '', //大楼外景图
                machineAddrDesc: '', //设备详情地址
                orderEffectTime: '', // 订单生效日期
                machineNumber: [],
                machineNumberToString: '',
                addr: '',
                hide: 1,
                poiId: '', //修改得时候
                memberRuleName: '', //会员编辑实例
                memberLevel: '',
                duration: '',
                memberPicUrl: '',
                memberHeadPic: '',
                payMoney: '',
                discount: '',
                milliliter: '',
                memberType: 0,
                timeLim: '',
                timeLim1: '',
                discountsStartTime: '',
                discountsEndTime: '',
                couponType: 1,  //新增优惠券
                productId: [],  //产品ID
                couponName: '', //优惠券名称
                couponUrl: '', //优惠券图片
                couponTime: '', //优惠券时间
                couponDesc: '', //优惠券说明
                couponMoney: '', //优惠券金额
                couponRange: '', //优惠券产品
                all_product: false, //优惠券的全选
                all_machine: false, //优惠券 机器选择全选
                all_vip: false, //优惠券 机器选择全选
                all_product_id: [], //优惠券搜索 暂存产品数组
                all_machine_id: [], //优惠券搜索 暂时机器编号数组
                all_vip_id: [], // 优惠券搜索 暂时的会员数组
                shareNum: '', //优惠券分享次数
                timeUnit: 3, //营销活动-时间单位
                itemName: '',  //营销活动-奖品名称
                itemType: 1,   //营销活动-奖品类型
                objectId: '',  //营销活动-类型为2、3的对象ID
                isMember: 0,  //营销活动-奖品首中
                probability: '',  //营销活动-奖品概率
                status: 1, // 营销活动-活动状态
                raffleType: 1, // 营销活动-活动状态
                startTime: [], //活动时间
                inputArray: '', //输入的详细说明
                isSecret: false, //会员 -- 是否是营销会员
            },
            rules: {
                productName: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 3, max: 15, message: '中英文结合以,分隔', trigger: 'blur' }
                ],
                formulaId: [
                    { required: true, message: '请选择配方', trigger: 'change' }
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            dialogVisibleData: false,
            num: 1,
            fileData: _data,
            samllfileUpdata: false,
            formulaIds: [],
            productFlavorList: [],
            radioclod: false,
            imageList: {
                machine: [],
                product: [],
                detail: [],
                machineScenePicUrl: [],
                mapMarkerIcon: [],
                planePicUrl: [],
                machineUrl: [],
                memberPicUrl: [],
                memberHeadPic: [],
                couponUrl: [],
                turntablePrize: []
            },
            address: regionData,   // 地址选择
            percentage: 90,   //进度条数值0-100
            customColors: [
                { color: '#f56c6c', percentage: 20 },
                { color: '#e6a23c', percentage: 40 },
                { color: '#5cb87a', percentage: 60 },
                { color: '#1989fa', percentage: 80 },
                { color: '#6f7ad3', percentage: 100 }
            ],
            longStatus: [],  //大机器状态
            longStatusSm: [], //小机器状态
            SearchAsyncMachineNumber: (uri == 'manage_poi' ? querySearchAsyncMachineNumber() : []),
            timeLimShow: false,   //会员添加
            numLength: 1,
            cTypeShow: true,
            tableData: [],
            tableDataMachine: [],  //机器编号 tableData 数组
            UnFormData: [],  //已选择的产品 临时列表数组
            search_product: '',   //优惠券 table 产品的搜索
            search_machine: '', //优惠券 tbale 机器的搜索
            search_vip: '', //优惠券 table 会员的搜索
            SearchProduct: dataHref.split('*').length > 1 ? false : true,
            bigAndsmall: true,
            pickerOptions: {  //时间节点
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
            formDataObject: {
                objectId: '',
                itemPicUrl: '',
                itemName: '',
                itemType: '',
                objectId: '',
                sort: '',
                isMember: '',
                probability: '',
                itemPicUrl: '',
                itemContent: ''
            }, // 大转盘活动对象
            dialogVisibleTable: false,  //会员views
            dialogVisibleTables: false,  //礼券views
            objectIdShow: false,  //是否显示ID
            tableDataVip: [],
            inputArray: [{
                value: '',
                name: ''
            }], //优惠券的输入说明 数组
            changeInputValues: [], //详细说明的数组
            poiIds: [], //小机器地址配置数组
        }
    },
    created: function () {
        const it = this;
        if (dataHref.split('*').length > 1) {  //编辑的基础操作
            this.Ienit(decodeURI(dataHref.split('*')[1]));
            this.tagshow = true;
        };
        if (uri == 'manage_coupon' && dataHref.split('*').length == 1) {  //优惠券添加 
            this.manageCoupon();  //查看 可选择的产品
        }
        switch (document.getElementById('c-container-list').getAttribute('data-search')) {
            case 'manage_product':  //  回显所有的配方选项
                _data['type'] = 2;
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + uri,
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        let _arr_ = [];
                        res.formulaInfoList.forEach(e => {
                            _arr_.push({
                                value: e.formulaId,
                                label: e.formulaName,
                                machineType: e.machineType,
                                formulaTemperature: e.formulaTemperature
                            })
                        });
                        it.formulaIds = _arr_;
                    }
                })
                break;
            default:
                break;
        };
    },
    methods: {
        IError(err) {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            this.$message.error('错了哦，' + err);
        },
        ISuccessfull(e) {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            this.$message({
                message: '成功！,' + e,
                type: 'success'
            });
        },
        Ichange(e) {
            const it = this;
            switch (e.options) {
                case 'machineType':
                    e.value != "big" && e.value != '' ? it.boxshow = true : it.boxshow = false;
                    break;
                default:
                    break;
            }
        },
        Ipush(e) {
            const it = this, type = [
                'manage_formula:2'
            ];
            it.loading = true;
            _data['formulaName'] = e.formulaName;
            _data['machineType'] = e.machineType;
            _data['type'] = e.type;
            if (dataHref.split('*').length > 1) {
                _data['type'] = 3;
                _data['formulaId'] = JSON.parse(decodeURI(dataHref.split('*')[1])).formulaId
            }
            if (e.machineType == 2) {  //小机器
                _data['officeFormulaMakeList[0].coffeeFlow'] = e.formulaMakeList[0].coffeeFlow || '';
                _data['officeFormulaMakeList[0].coffeeTemporature'] = e.formulaMakeList[0].coffeeTemporature || '';
                _data['officeFormulaMakeList[0].coffeeWeight'] = e.formulaMakeList[0].coffeeWeight || '';
                _data['officeFormulaMakeList[0].playMilkTime'] = e.formulaMakeList[0].playMilkTime || '';
                _data['officeFormulaMakeList[0].pumpPressure'] = e.formulaMakeList[0].pumpPressure || '';
                _data['officeFormulaMakeList[0].americanHotWaterWeight'] = e.formulaMakeList[0].americanHotWaterWeight || '';
                _data['officeFormulaMakeList[0].formulaType'] = e.formulaMakeList[0].formulaType || '';
                _data['officeFormulaMakeList[0].milkFlow'] = e.formulaMakeList[0].milkFlow || '';
            } else {
                for (let i = 0; i < e.formulaMakeList.length; i++) {  //大机器
                    _data['formulaMakeList[' + i + '].canisterId'] = e.formulaMakeList[i].canisterId || '';
                    _data['formulaMakeList[' + i + '].delayTime'] = e.formulaMakeList[i].delayTime || '';
                    _data['formulaMakeList[' + i + '].flavorCanChange'] = e.formulaMakeList[i].flavorCanChange || '';
                    _data['formulaMakeList[' + i + '].flavorName'] = e.formulaMakeList[i].flavorName || '';
                    _data['formulaMakeList[' + i + '].gradientWeight'] = e.formulaMakeList[i].gradientWeight || '';
                    _data['formulaMakeList[' + i + '].mixSpeed'] = e.formulaMakeList[i].mixSpeed || '';
                    _data['formulaMakeList[' + i + '].recipeOutOrder'] = e.formulaMakeList[i].recipeOutOrder || '';
                    _data['formulaMakeList[' + i + '].recipeOutSpeed'] = e.formulaMakeList[i].recipeOutSpeed || '';
                    _data['formulaMakeList[' + i + '].waterVolume'] = e.formulaMakeList[i].waterVolume || '';
                }
            }

            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                        it.ISuccessfull(res.statusCode.msg);
                        setTimeout(() => {
                            parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                        }, 500);
                    })() : (() => {
                        it.IError(res.statusCode.msg);
                        throw "收集到错误：\n\n" + res.statusCode.status;
                    })();
                }
            })
        },
        Ienit(e) {
            const it = this;
            switch (uri) {
                case 'manage_formula':   //formula edit
                    _data['type'] = 1;
                    _data['formulaId'] = JSON.parse(e).formulaId;
                    break;
                case 'manage_product':  //product edit
                    _data['type'] = 1;
                    _data['productId'] = JSON.parse(e).productId;
                    break;
                case 'manage_machine':   //machine edit
                    _data['type'] = 3;
                    _data['machineNumber'] = JSON.parse(e).machineNumber;
                    break;
                case 'remote_operation':
                    _data['type'] = 1;
                    _data['machineNumber'] = JSON.parse(e).machineNumber;
                    break;
                case 'manage_poi':  //small machine map edit
                    _data['type'] = 1;
                    delete _data['machineType']
                    _data['poiIds'] = JSON.parse(e).poiId;
                    break;
                case 'add_or_update_member':   //查找会员详情
                    _data['memberId'] = JSON.parse(e).memberRuleId;
                    uri = 'get_member_detail'
                    break;
                case 'manage_coupon':  //coupon edit
                    _data['type'] = 0;
                    _data['couponId'] = JSON.parse(e).couponId;
                    break;
                case 'add_or_update_draw_raffle':  //draw_raffle_info edit
                    uri = "get_draw_raffle_info";
                    _data['drawId'] = JSON.parse(e).drawId;
                    break;
                case 'add_or_update_sys_draw_item_info': //add_or_update_sys_draw_item_info
                    uri = "sys_draw_item_info";
                    _data['itemId'] = JSON.parse(e).itemId;
                    break;
                default:
                    break;
            }
            it.loading = true;
            ym.init.XML({
                method: uri != 'get_draw_raffle_info' && uri != 'sys_draw_item_info' ? 'POST' : 'GET',
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                        switch (uri) {
                            case 'manage_formula':   //配方设置
                                if (res.formulaInfo.machineType == 1) {
                                    try {
                                        res.formulaInfo.formulaMakeList.forEach(e => {
                                            if (e.canisterId != 170) {
                                                it.formData.formulaMakeList[e.canisterId - 1].delayTime = e.delayTime;
                                                it.formData.formulaMakeList[e.canisterId - 1].waterVolume = e.waterVolume;
                                                it.formData.formulaMakeList[e.canisterId - 1].gradientWeight = e.gradientWeight;
                                                it.formData.formulaMakeList[e.canisterId - 1].mixSpeed = e.mixSpeed;
                                                it.formData.formulaMakeList[e.canisterId - 1].recipeOutSpeed = e.recipeOutSpeed;
                                                it.formData.formulaMakeList[e.canisterId - 1].recipeOutOrder = it.recipeOutOrder[e.recipeOutOrder].value;
                                                it.formData.formulaMakeList[e.canisterId - 1].flavorName = e.flavorName;
                                            } else {
                                                it.formData.formulaMakeList[e.canisterId - 164].delayTime = e.delayTime;
                                                it.formData.formulaMakeList[e.canisterId - 164].waterVolume = e.waterVolume;
                                                it.formData.formulaMakeList[e.canisterId - 164].gradientWeight = e.gradientWeight;
                                                it.formData.formulaMakeList[e.canisterId - 164].mixSpeed = e.mixSpeed;
                                                it.formData.formulaMakeList[e.canisterId - 164].recipeOutSpeed = e.recipeOutSpeed;
                                                it.formData.formulaMakeList[e.canisterId - 164].recipeOutOrder = it.recipeOutOrder[e.recipeOutOrder].value;
                                                it.formData.formulaMakeList[e.canisterId - 164].flavorName = e.flavorName;
                                            }
                                        });
                                        it.formData.formulaName = res.formulaInfo.formulaName;
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                } else {  //小机器
                                    document.getElementsByClassName('offFormulaMakeList')[0].style.display = 'block';  //方法待定
                                    document.getElementsByClassName('formulaMakeList')[0].style.display = 'none';  //方法待定
                                    try {
                                        // it.$set(it, it.formDataSmall.formulaMakeList[0].coffeeFlow, res.formulaInfo.officeFormulaMakeList[0].coffeeFlow)
                                        it.formDataSmall.formulaMakeList[0].coffeeFlow = res.formulaInfo.officeFormulaMakeList[0].coffeeFlow;
                                        it.formDataSmall.formulaMakeList[0].coffeeTemporature = res.formulaInfo.officeFormulaMakeList[0].coffeeTemporature;
                                        it.formDataSmall.formulaMakeList[0].coffeeWeight = res.formulaInfo.officeFormulaMakeList[0].coffeeWeight;
                                        it.formDataSmall.formulaMakeList[0].playMilkTime = res.formulaInfo.officeFormulaMakeList[0].playMilkTime;
                                        it.formDataSmall.formulaMakeList[0].pumpPressure = res.formulaInfo.officeFormulaMakeList[0].pumpPressure;
                                        it.formDataSmall.formulaMakeList[0].americanHotWaterWeight = res.formulaInfo.officeFormulaMakeList[0].americanHotWaterWeight;
                                        it.formDataSmall.formulaMakeList[0].milkFlow = res.formulaInfo.officeFormulaMakeList[0].milkFlow;
                                        it.formDataSmall.formulaMakeList[0].formulaType = res.formulaInfo.officeFormulaMakeList[0].formulaType;
                                        it.formDataSmall.formulaName = res.formulaInfo.formulaName;
                                    } catch (error) {
                                        it.IError(error);
                                        throw error
                                    }
                                }
                                break;
                            case 'manage_product':
                                try {
                                    setTimeout(function () {
                                        it.formulaIds.forEach(ex => {
                                            if (ex.value == res.productInfo.formulaId) {
                                                it.ruleForm.formulaId = ex.value;  //配方 id
                                            }
                                        });
                                    },1000)
                                    it.ruleForm.productName = res.productInfo.productName;  //产品名称
                                    it.ruleForm.productPrice = parseFloat(res.productInfo.productPrice / 100).toFixed(2);  //产品价格
                                    it.ruleForm.originPrice = parseFloat(res.productInfo.originPrice / 100).toFixed(2);  //产品原价
                                    it.imageList.machine.push({ name: 'machinePic', url: res.productInfo.productMachinePicurl }); //机器产品图片
                                    it.imageList.product.push({ name: 'product', url: res.productInfo.productPicurl }); //手机产品图片
                                    it.imageList.detail.push({ name: 'detail', url: res.productInfo.productMachineDetailPicurl }); //小机器详情图片

                                    it.ruleForm.productMachinePicurl = res.productInfo.productMachinePicurl; //机器产品图片
                                    it.ruleForm.productPicurl = res.productInfo.productPicurl; //手机产品图片
                                    it.ruleForm.productMachineDetailPicurl = res.productInfo.productMachineDetailPicurl; //小机器详情图片

                                    it.ruleForm.productRank = res.productInfo.productRank;  //排序
                                    it.ruleForm.operateType = res.productInfo.operateType;  //产品属性
                                    it.ruleForm.productStatus = res.productInfo.productStatus;  //是否上架
                                    it.ruleForm.productTemperature = res.productInfo.productTemperature;  //冷热状态
                                    it.ruleForm.machineType = res.productInfo.machineType;  //设备类型
                                    if (res.productInfo.productTemperature == 1) { //冷热锁定
                                        it.radioclod = true;  //1 的时候只能热
                                    }
                                    if (res.productInfo.machineType == 1) {  //大机器才有
                                        res.productFlavorList.forEach(e => { //口味信息
                                            it.productFlavorList.push({
                                                value: e.bunkerNumber,
                                                label: e.flavorName,
                                                hide: e.hide
                                            });
                                        });
                                    } else {
                                        it.samllfileUpdata = true;  //详情图片开启
                                    }

                                    it.ruleForm.productComment = res.productInfo.productComment;  //冷热状态
                                } catch (error) {
                                    it.IError(error);
                                    throw error;
                                }
                                break;
                            case 'manage_machine':  //
                                it.ruleForm.adminId = res.machineInfo.adminId;  //管理员id
                                it.ruleForm.adminName = res.machineInfo.adminName;  //管理员名称
                                it.ruleForm.machineNumber = res.machineInfo.machineNumber;  //设备编号
                                it.ruleForm.machineNumberToString = it.ruleForm.machineNumber;  //渲染类型不能是编号数组
                                it.ruleForm.orderEffectTime = new Date(res.machineInfo.orderEffectTime);  //订单生效日期

                                it.ruleForm.machineLatitude = res.machineInfo.machineLatitude;  //纬度
                                it.ruleForm.machineLongitude = res.machineInfo.machineLongitude;  //经度
                                it.ruleForm.machineAddrDesc = res.machineInfo.machineAddrDesc;  //详细地址
                                it.ruleForm.machineScenePicUrl = res.machineInfo.machineScenePicUrl;  //场景图片
                                it.ruleForm.mapMarkerIcon = res.machineInfo.mapMarkerIcon;  //地图图标
                                it.ruleForm.planePicUrl = res.machineInfo.planePicUrl;  //楼层平面图
                                it.ruleForm.machineUrl = res.machineInfo.machineUrl;  //大楼外景图

                                it.ruleForm.machineType = res.machineInfo.machineType; //设备类型
                                if (it.ruleForm.machineType == 2) {
                                    it.poiIds = res.poiList; //配置地址ID 数组
                                    it.ruleForm.poiId = res.machineInfo.poiId;
                                    it.ruleForm.floor = res.machineInfo.floor;
                                }

                                it.imageList.machineScenePicUrl.push({ name: 'machineScenePicUrl', url: res.machineInfo.machineScenePicUrl }); //场景图片
                                it.imageList.mapMarkerIcon.push({ name: 'mapMarkerIcon', url: res.machineInfo.mapMarkerIcon }); //地图图标
                                it.imageList.planePicUrl.push({ name: 'planePicUrl', url: res.machineInfo.planePicUrl }); //楼层平面图
                                it.imageList.machineUrl.push({ name: 'machineUrl', url: res.machineInfo.machineUrl }); //大楼外景图

                                it.$nextTick(function () {
                                    let _arr_ = [];
                                    TextToCode[res.machineInfo.province] ? _arr_.push(TextToCode[res.machineInfo.province].code) : null;
                                    TextToCode[res.machineInfo.province] ? _arr_.push(TextToCode[res.machineInfo.province][res.machineInfo.city].code) : null;
                                    TextToCode[res.machineInfo.province] ? _arr_.push(TextToCode[res.machineInfo.province][res.machineInfo.city][res.machineInfo.district].code) : null;
                                    it.ruleForm.province = _arr_
                                })

                                var map = new AMap.Map('cityg', {
                                    resizeEnable: true, //是否监控地图容器尺寸变化
                                    zoom: 12 //初始化地图层级
                                });
                                map.on('click', function (e) {
                                    it.ruleForm.machineLatitude = e.lnglat.lat;  //纬度
                                    it.ruleForm.machineLongitude = e.lnglat.lng; //经度
                                });
                                AMap.plugin('AMap.PlaceSearch', function () {
                                    var placeSearch = new AMap.PlaceSearch({
                                        city: '020'
                                    });
                                    placeSearch.search(res.machineInfo.machineAddrDesc, function (status, result) {
                                        // 查询成功时，result即对应匹配的POI信息
                                        if (typeof result.poiList === "undefined") {
                                            it.IError('Impact error! wrong keywords?');
                                            return false;
                                        }
                                        map.setFitView();
                                    })
                                })
                                //加载云图层插件
                                jQuery.ajax({
                                    url: 'https://yuntuapi.amap.com/datasearch/local?tableid=5bebc2507bbf195c079c50d6&city=全国&keywords=' + res.machineInfo.machineNumber + '&filter=machineNumber:' + res.machineInfo.machineNumber + '&limit=50&page=1&key=8d7d4594c6fdff4624696ba71f9e4c8a',
                                    type: 'post',
                                    dataType: 'jsonp'
                                }).done(function (res) {
                                    for (var i = 0; i < res.datas.length; i++) {
                                        // 创建点覆盖物
                                        var marker = new AMap.Marker({
                                            position: new AMap.LngLat(res.datas[i]._location.split(',')[0], res.datas[i]._location.split(',')[1]),
                                            icon: res.datas[i].marker,
                                            offset: new AMap.Pixel(-13, -30)
                                        });
                                        map.add(marker);
                                    }
                                });

                                break;
                            case 'remote_operation':   //远程操作
                                try {
                                    if (JSON.parse(e).machineNumber[0] == '2') {  //小机器
                                        it.bigAndsmall = false;
                                        it.longStatusSm.push({
                                            machineStatus: res.machineStatus,
                                            faultTime: res.faultTime,
                                            canisterSm: {
                                                at: [+parseFloat(res.canisterList[0].residue / res.canisterList[0].sum * 100).toFixed(2), res.canisterList[0].sum, res.canisterList[0].bunkerName],
                                                bt: [+parseFloat(res.canisterList[1].residue / res.canisterList[1].sum * 100).toFixed(2), res.canisterList[1].sum, res.canisterList[1].bunkerName],
                                                ct: [+parseFloat(res.canisterList[2].residue / res.canisterList[2].sum * 100).toFixed(2), res.canisterList[2].sum, res.canisterList[2].bunkerName],
                                                version: res.version,
                                                machineNumber: JSON.parse(e).machineNumber,
                                                machinePwd: res.machinePwd
                                            }
                                        })
                                    } else {
                                        // res = `{"machineStatus":{"boilerTemperature":"89.8度","boilerPressure":"2804mbar","traffic":"0.0","machineStatus":"正常待机","failureStatus":"App运行崩溃","bootTime":"19天2时40分","cumulativeTime":"0秒","systemSwitchboardRevisionNumber":"0","systemSwitchboardHardwareNumber":"0","burstBubbleBoardRevisionNumber":"0","burstBubbleBoardHardwareNumber":"0","productAllowedStatus":"00C0","sensorStatus":"67FF1800","version":"20","faultTime":"无故障","iofirmwareRevisionNumber":"66","iohardwareNumber":"20","cpufirmwareRevisionNumber":"37","cpuhardwareNumber":"20"},"machineConfig":{"hotWaterTemperature":"90.0度","coffeeBrewPressure":"100mbpa","automaticCleanTimeInterval":"9000分钟","bubbleTemperature":"0.0度","bubbleCrowdedCakeForce":"800","bubbleCrowdedCakeTime":"7.0秒","bubbleReturnTime":"2.0秒","bubbleReCrowdedTime":"0.2秒","trayValue":"15","cupKispensor":"96","reCupNum":"96","gearPumpTime":"0.6秒","gearPumpMaxPower":"16","valveOpenAfterBlenderDelayTime":"12.7秒","freshWaterAfterBlenderDelayTime":"0.4秒","fanSpeed":"35","teaInfuserAirPumpSpeed":"127","teaInfuserBetweenTime":"8.0秒","airPumpGassingTime":"2.0秒","coffeeWaterRatio":"250","coffeeBrewTime":"0.0秒","startUpWash":"否","uvlampOpenTime":"80分钟","uvlampCloseTime":"50分钟"},"canister":[92.0,1500.0,640.0,1000.0,1004.3,1500.0,717.8,1000.0,595.3,800.0,146.6,400.0,274.0,857.0,60.0,100.0,600.0,35000.0],"statusCode":{"status":6666,"msg":"查询成功"}}`;
                                        // res = JSON.parse(res);
                                        it.longStatus.push({
                                            boilerTemperature: res.machineStatus.boilerTemperature,
                                            machineStatus: res.machineStatus.machineStatus,
                                            failureStatus: res.machineStatus.failureStatus,
                                            bootTime: res.machineStatus.bootTime,
                                            canister: {
                                                at: [+parseFloat(res.canisterList[0].residue / res.canisterList[0].sum * 100).toFixed(2), res.canisterList[0].sum, res.canisterList[0].bunkerName],
                                                bt: [+parseFloat(res.canisterList[1].residue / res.canisterList[1].sum * 100).toFixed(2), res.canisterList[1].sum, res.canisterList[1].bunkerName],
                                                ct: [+parseFloat(res.canisterList[2].residue / res.canisterList[2].sum * 100).toFixed(2), res.canisterList[2].sum, res.canisterList[2].bunkerName],
                                                dt: [+parseFloat(res.canisterList[3].residue / res.canisterList[3].sum * 100).toFixed(2), res.canisterList[3].sum, res.canisterList[3].bunkerName],
                                                et: [+parseFloat(res.canisterList[4].residue / res.canisterList[4].sum * 100).toFixed(2), res.canisterList[4].sum, res.canisterList[4].bunkerName],
                                                ft: [+parseFloat(res.canisterList[5].residue / res.canisterList[5].sum * 100).toFixed(2), res.canisterList[5].sum, res.canisterList[5].bunkerName],
                                                gt: [+parseFloat(res.canisterList[6].residue / res.canisterList[6].sum * 100).toFixed(2), res.canisterList[6].sum, res.canisterList[6].bunkerName],
                                                ht: [+parseFloat(res.canisterList[7].residue / res.canisterList[7].sum * 100).toFixed(2), res.canisterList[7].sum, res.canisterList[7].bunkerName],
                                                it: [+parseFloat(res.canisterList[8].residue / res.canisterList[8].sum * 100).toFixed(2), res.canisterList[8].sum, res.canisterList[8].bunkerName],
                                                version: res.machineStatus.version,
                                                machineNumber: JSON.parse(e).machineNumber,
                                                machinePwd: res.machinePwd
                                            }
                                        })
                                    }
                                } catch (error) {
                                    error = `${error}。收集到可能的错误源：机器离线`;
                                    it.IError('解码异常：' + error);
                                    return false;
                                }
                                break;
                            case 'manage_poi':
                                it.ruleForm.machineLongitude = res.poi.longitude;
                                it.ruleForm.machineLatitude = res.poi.latitude;
                                it.ruleForm.addr = res.poi.addr;
                                it.ruleForm.hide = res.poi.hide;
                                it.ruleForm.mapMarkerIcon = res.poi.mapMarkerIcon;  //地图图标
                                it.ruleForm.machineUrl = res.poi.machineUrl;  //大楼外景图
                                it.ruleForm.poiId = res.poi.poiId;

                                if (res.poi.machineList) {
                                    res.poi.numberList.split(',').forEach(el => {  //执行已选择设备回显
                                        it.ruleForm.machineNumber.push(el)
                                    });
                                }

                                it.ruleForm.province.push(TextToCode[res.poi.province].code);
                                it.ruleForm.province.push(TextToCode[res.poi.province][res.poi.city].code);
                                it.ruleForm.province.push(TextToCode[res.poi.province][res.poi.city][res.poi.district].code);

                                it.imageList.mapMarkerIcon.push({ name: 'mapMarkerIcon', url: res.poi.mapMarkerIcon }); //楼层平面图
                                it.imageList.machineUrl.push({ name: 'machineUrl', url: res.poi.machineUrl }); //大楼外景图

                                break;
                            case 'get_member_detail':  //会员详情
                                it.ruleForm.memberRuleName = res.member.memberRuleName;
                                it.ruleForm.memberLevel = res.member.memberLevel;
                                it.ruleForm.duration = res.member.duration;

                                it.ruleForm.memberPicUrl = res.member.memberPicUrl;
                                it.ruleForm.memberHeadPic = res.member.memberHeadPic;
                                it.imageList.memberPicUrl.push({ name: 'memberPicUrl', url: res.member.memberPicUrl }); //会员列表
                                it.imageList.memberHeadPic.push({ name: 'memberHeadPic', url: res.member.memberHeadPic }); //TAG 图片

                                it.ruleForm.payMoney = parseFloat(res.member.payMoney / 100).toFixed(2);
                                it.ruleForm.discount = parseFloat(res.member.discount / 100).toFixed(2);
                                it.ruleForm.milliliter = res.member.milliliter;
                                if (res.member.memberType == 2) {
                                    it.ruleForm.memberType = true;
                                    it.timeLimShow = true;
                                }
                                it.ruleForm.timeLim = new Date(2019, 7, 11, res.member.timeLimit.split('-')[0].split(':')[0], res.member.timeLimit.split('-')[0].split(':')[1], res.member.timeLimit.split('-')[0].split(':')[2]);
                                it.ruleForm.timeLim1 = new Date(2019, 7, 11, res.member.timeLimit.split('-')[1].split(':')[0], res.member.timeLimit.split('-')[1].split(':')[1], res.member.timeLimit.split('-')[1].split(':')[2]);;
                                it.ruleForm.discountsEndTime = [ym.init.getDateTime(res.member.discountsStartTime), ym.init.getDateTime(res.member.discountsEndTime)];

                                res.member.secretKey != -1 ? it.ruleForm.secretKey = res.member.secretKey : null;

                                if (res.member.detailContent != -1) {  //回显 所有的文本信息
                                    let _arr_ = [], _arrs_ = [];
                                    JSON.parse(res.member.detailContent).forEach((element, index) => {
                                        _arrs_.push(element);
                                        element['name'] = element.value;
                                        _arr_.push(element)
                                    })
                                    it.inputArray = _arrs_;
                                    it.changeInputValues = _arr_;
                                }
                                it.ruleForm.isSecret = res.member.isSecret != 0 ? true : false;  //是否是营销会员
                                it.ruleForm.timeUnit = res.member.timeUnit;  //时间单位 


                                uri = 'add_or_update_member'  //完成后重新把uri 复原
                                break;
                            case 'manage_coupon':
                                it.ruleForm.couponType = res.coupon.couponType; //优惠券类型
                                res.coupon.couponType == 3 ? it.cTypeShow = false : it.cTypeShow = true; // 是否出现优惠金额
                                it.ruleForm.couponName = res.coupon.couponName; //优惠券名称
                                it.ruleForm.couponUrl = res.coupon.couponUrl; //优惠券图片
                                it.ruleForm.couponTime = res.coupon.couponTime; //优惠券时间
                                it.ruleForm.couponMoney = res.coupon.couponType != 5 ? parseFloat(res.coupon.couponMoney / 100).toFixed(2) : res.coupon.couponMoney; //优惠券类型
                                it.ruleForm.shareNum = res.coupon.shareNum; //优惠券类型
                                it.ruleForm.couponType = res.coupon.couponType; //优惠券类型
                                it.ruleForm.couponDesc = res.coupon.couponDesc; //优惠券类型
                                it.ruleForm.productId = res.coupon.productId; //优惠券类型

                                it.ruleForm.timeUnit = res.coupon.timeUnit;//时间节点
                                it.imageList.couponUrl.push({ name: 'couponUrl', url: res.coupon.couponUrl }); //优惠券图片
                                it.manageCoupon(res);

                                res.coupon.couponRangeName.split(';').forEach((element, index) => {  //回显产品
                                    it.ruleForm.all_product_id.push({
                                        productId: res.coupon.couponRange.split(',')[index],
                                        productName: element,
                                        index: res.coupon.couponRange.split(',')[index]
                                    });
                                    setTimeout(function () {
                                        it.tableData.forEach((el, i) => {  //操作删除 回显列表重复的数据
                                            if (res.coupon.couponRange.split(',')[index] == el.productId) {
                                                it.tableData.splice(i, 1);
                                            }
                                        })
                                    }, 500)
                                })
                                res.coupon.machineRange != '全机器可用' ? res.coupon.machineRange.split(',').forEach((element, index) => {  //机器编号
                                    it.ruleForm.all_machine_id.push({
                                        machineNumber: element,
                                        index: element
                                    });
                                    setTimeout(function () {
                                        it.tableDataMachine.forEach((el, i) => {  //操作删除 回显列表重复的数据
                                            if (res.coupon.machineRange.split(',')[index] == el.machineNumber) {
                                                it.tableDataMachine.splice(i, 1);
                                            }
                                        })
                                    }, 500)
                                }) : it.ruleForm.all_machine = true;

                                if (res.coupon.couponContent != -1) {  //回显 所有的文本信息
                                    let _arr_ = [], _arrs_ = [];
                                    JSON.parse(res.coupon.couponContent).forEach((element, index) => {
                                        _arrs_.push(element);
                                        element['name'] = element.value;
                                        _arr_.push(element)
                                    })
                                    it.inputArray = _arrs_;
                                    it.changeInputValues = _arr_;
                                }

                                if (res.coupon.couponType == 4) {  //会员优惠券 选择
                                    it.getobjectId(3);  //查看 会员
                                    it.$nextTick(function () {
                                        setTimeout(function () {
                                            let _data_ = it.tableDataVip;
                                            _data_.forEach((element) => {
                                                element.index = element.memberRuleId
                                            })
                                            it.tableDataVip = _data_;  //添加一个 index 的数据
                                            res.coupon.couponRangeName != '全会员卡通用' ? res.coupon.couponRangeName.split(';').forEach((element, index) => {  //会员Id
                                                it.ruleForm.all_vip_id.push({
                                                    memberRuleId: res.coupon.couponRange.split(',')[index],
                                                    memberRuleName: element,
                                                    index: res.coupon.couponRange.split(',')[index]
                                                });
                                                it.tableDataVip.forEach((el, i) => {  //操作删除 回显列表重复的数据
                                                    if (res.coupon.couponRange.split(',')[index] == el.memberRuleId) {
                                                        it.tableDataVip.splice(i, 1);
                                                    }
                                                })
                                            }): it.ruleForm.all_vip = true;
                                        }, 1000);
                                    })
                                }


                                break;
                            case 'get_draw_raffle_info':  //抽奖配置 
                                it.ruleForm.title = res.data.title;
                                if (res.data.startTime) {
                                    it.ruleForm.startTime.push(ym.init.getDateTime(res.data.startTime).split(' ')[0]);
                                    it.ruleForm.startTime.push(ym.init.getDateTime(res.data.endTime).split(' ')[0]);
                                }
                                it.ruleForm.raffleType = res.data.raffleType;
                                it.ruleForm.limitCount = res.data.limitCount;
                                it.ruleForm.status = res.data.status;
                                it.tableData = res.data.items;
                                uri = 'add_or_update_draw_raffle'  //完成后重新把uri 复原
                                break;
                            case 'sys_draw_item_info':  //奖品编辑
                                it.formDataObject.itemName = res.data.itemName;
                                it.formDataObject.itemType = res.data.itemType;
                                it.formDataObject.objectId = res.data.objectId;
                                it.formDataObject.sort = res.data.sort;
                                it.formDataObject.isMember = res.data.isMember;
                                it.formDataObject.probability = res.data.probability;
                                it.formDataObject.itemPicUrl = res.data.itemPicUrl;
                                it.imageList.turntablePrize.push({ name: 'turntablePrize', url: res.data.itemPicUrl })
                                it.formDataObject.itemContent = res.data.itemContent;
                                uri = 'add_or_update_sys_draw_item_info'  //完成后重新把uri 复原
                                break;
                            default:
                                break;
                        }

                        it.ISuccessfull(res.statusCode.msg);
                    })() : (() => {
                        it.IError(res.statusCode.msg);
                        throw "收集到错误：\n\n" + res.statusCode.status;
                    })();
                }
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        fileExceed() {
            this.IError('只允许一张图片')
        },
        fileChange() {
            this.fileData['type'] = 3;  //动态配置
        },
        filePicChange() {
            this.fileData['type'] = 2;  //动态配置
        },
        filememberPicUrlChange() {
            this.fileData['type'] = 3;  //动态配置
        },
        filememberHeadPicChange() {  //上传会员地图
            this.fileData['type'] = 16;  //动态配置
        },
        filecouponUrlChange() {
            this.fileData['type'] = 6;  //动态配置
        },
        fileChangeTurntablePrize() {
            this.fileData['type'] = 17;  //动态配置
        },
        filememberPicUrlSuccess(e) {
            this.ruleForm.memberPicUrl = e.realPath;
        },
        filecouponUrlSuccess(e) {
            this.ruleForm.couponUrl = e.realPath;
        },
        filememberHeadPicSuccess(e) {
            this.ruleForm.memberHeadPic = e.realPath;
        },
        TurntablePrizeSuccess(e) {
            this.formDataObject.itemPicUrl = e.realPath;  //小程序大转盘配置图片
        },
        fileMachineSuccess(e) {
            this.ruleForm.productMachinePicurl = e.realPath;
        },
        filePicSuccess(e) {
            this.ruleForm.productPicurl = e.realPath;
        },
        fileDateilSuccess(e) {
            this.ruleForm.productMachineDetailPicurl = e.realPath;
        },
        machineSceneSuccess(e) {
            this.ruleForm.machineScenePicUrl = e.realPath; //..
        },
        mapMarkerSuccess(e) {
            this.ruleForm.mapMarkerIcon = e.realPath;
        },
        planeSuccess(e) {
            this.ruleForm.planePicUrl = e.realPath;
        },
        machineUrlSuccess(e) {
            this.ruleForm.machineUrl = e.realPath;
        },
        submitForm(formName) {
            const it = this;
            switch (uri) {
                case 'manage_machine':
                    _data['type'] = 4;
                    _data['adminId'] = formName.adminId;
                    _data['adminName'] = formName.adminName;
                    _data['machineNumber'] = formName.machineNumber;
                    _data['machineLongitude'] = formName.machineLongitude;
                    _data['machineLatitude'] = formName.machineLatitude;
                    _data['orderEffectTime'] = ym.init.getDateTime(formName.orderEffectTime);  //订单生效日期

                    _data['province'] = CodeToText[formName.province[0]] || '';
                    _data['city'] = CodeToText[formName.province[1]] || '';
                    _data['district'] = CodeToText[formName.province[2]] || '';

                    _data['machineAddrDesc'] = formName.machineAddrDesc || '';

                    _data['machineScenePicUrl'] = formName.machineScenePicUrl || '';
                    _data['mapMarkerIcon'] = formName.mapMarkerIcon || '';
                    _data['planePicUrl'] = formName.planePicUrl || '';
                    _data['machineUrl'] = formName.machineUrl || '';
                    if (formName.machineType == 2) {
                        _data['poiId'] = formName.poiId || '';
                        _data['floor'] = formName.floor || 0;
                    }
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + uri,
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    setTimeout(() => {
                                        parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                                    }, 500);
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.statusCode.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    })
                    break;
                case 'manage_poi':
                    if (dataHref.split('*').length > 1) {
                        _data['type'] = 3;
                        _data['poiId'] = it.ruleForm.poiId;
                    }
                    _data['machineNumbers'] = formName.machineNumber;
                    _data['hide'] = formName.hide;
                    _data['province'] = CodeToText[formName.province[0]] || '';
                    _data['city'] = CodeToText[formName.province[1]] || '';
                    _data['district'] = CodeToText[formName.province[2]] || '';
                    _data['mapMarkerIcon'] = it.ruleForm.mapMarkerIcon || '';
                    _data['machineUrl'] = it.ruleForm.machineUrl || '';
                    _data['addr'] = formName.addr || '';
                    _data['latitude'] = it.ruleForm.machineLatitude || '';
                    _data['longitude'] = formName.machineLongitude || '';
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + uri,
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    setTimeout(() => {
                                        parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                                    }, 500);
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.statusCode.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    })
                    break;
                case 'add_or_update_member':  //添加会员信息
                    if (dataHref.split('*').length > 1) {
                        _data['memberRuleId'] = JSON.parse(decodeURI(dataHref.split('*')[1])).memberRuleId;
                        uri = 'add_or_update_member';
                    }
                    delete _data['type']
                    _data['memberRuleName'] = formName.memberRuleName;
                    _data['memberLevel'] = formName.memberLevel;
                    _data['duration'] = formName.duration || '';

                    _data['memberPicUrl'] = it.ruleForm.memberPicUrl || '';
                    _data['memberHeadPic'] = it.ruleForm.memberHeadPic || '';

                    _data['payMoney'] = parseInt(formName.payMoney * 100);
                    _data['discount'] = parseInt(formName.discount * 100);
                    _data['milliliter'] = formName.milliliter || '';
                    _data['discountsStartTime'] = formName.discountsEndTime ? ym.init.getDateTime(formName.discountsEndTime[0]) : [];
                    _data['discountsEndTime'] = formName.discountsEndTime ? ym.init.getDateTime(formName.discountsEndTime[1]) : [];

                    //新字段
                    let detailContent = [];
                    this.changeInputValues.forEach(element => {
                        detailContent.push(element)
                    })
                    _data['detailContent'] = JSON.stringify(detailContent);  //详细说明
                    _data['isActivity'] = 0;  //是否开启活动
                    _data['timeUnit'] = formName.timeUnit;  //时间单位
                    _data['isSecret'] = formName.isSecret ? 1 : 0;  //是否营销会员

                    _data['isSecret'] == 1 ? _data['secretKey'] = formName.secretKey || '' : null;  //营销会员key

                    //是否限时会员
                    _data['timeLimit'] = !formName.memberType ? -1 : ym.init.getDateTime(formName.timeLim).split(' ')[1] + "-" + ym.init.getDateTime(formName.timeLim1).split(' ')[1];  //待定

                    _data['memberType'] = (+formName.memberType) + 1;  //会员类型
                    _data['milliliter'] = formName.milliliter || '';  //毫升数

                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + uri,
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    setTimeout(() => {
                                        parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                                    }, 500);
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.statusCode.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    })
                    break;
                case 'manage_coupon':  //添加优惠券信息
                    _data['type'] = 2;  //选择的产品ID
                    if (dataHref.split('*').length > 1) {
                        _data['type'] = 6;
                    }
                    _data['couponType'] = formName.couponType || ''; //优惠券类型
                    _data['couponName'] = formName.couponName || '';  //优惠券名称
                    _data['couponUrl'] = formName.couponUrl || ''; //优惠券图片
                    _data['couponTime'] = formName.couponTime || ''; //优惠券时间
                    if (formName.couponType != 3) {
                        _data['couponMoney'] = parseFloat(formName.couponMoney * 100).toFixed(0) || '';  //优惠券金额
                        _data['shareNum'] = formName.shareNum; //优惠券分享次数
                    }
                    if (formName.couponType == 5) {  //饮品折扣券
                        if (formName.couponMoney > 100 || formName.couponMoney < 0) {
                            it.IError('数值不符合规定【1-100】');
                            return false;
                        }
                        _data['couponMoney'] = Math.ceil(formName.couponMoney);  //优惠券折扣比例
                    }
                    _data['couponDesc'] = formName.couponDesc || '';  //优惠券说明
                    _data['couponRange'] = it.ruleForm.all_product ? -1 : (() => {
                        let code = [];
                        this.ruleForm.all_product_id.forEach(element => {
                            code.push(element.productId);
                        })
                        return code
                    })();  //选择的产品ID

                    if (formName.couponType == 4) { //选择的是优惠券 会员
                        _data['couponRange'] = it.ruleForm.all_vip ? -1 : (() => {
                            let code = [];
                            this.ruleForm.all_vip_id.forEach(element => {
                                code.push(element.memberRuleId);
                            })
                            return code
                        })();  //选择的 会员 ID
                    }

                    _data['machineRange'] = it.ruleForm.all_machine ? -1 : (() => {
                        let code = [];
                        this.ruleForm.all_machine_id.forEach(element => {
                            code.push(element.machineNumber);
                        })
                        return code
                    })();  //选择的机器编号
                    _data['timeUnit'] = it.ruleForm.timeUnit;  //时间单位
                    let couponContent = [];
                    this.changeInputValues.forEach(element => {
                        couponContent.push(element)
                    })
                    _data['couponContent'] = JSON.stringify(couponContent);  //优惠券的详细说明

                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + uri,
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            delete _data['couponType']
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    setTimeout(() => {
                                        parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                                    }, 500);
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.statusCode.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    })
                    break;
                default:   //添加/修改产品
                    _data['type'] = 3;
                    if (dataHref.split('*').length > 1) {
                        _data['type'] = 4;
                        _data['productCreateTime'] = ym.init.getDateTime(JSON.parse(decodeURI(dataHref.split('*')[1])).createTime)
                    }
                    if(formName.bunkerNumberArr.length > 3){  // 选中的口味不能超过 【3】 个
                        it.IError('口味信息选中项目不能超过3个！');
                        return false;
                    }
                    _data['formulaId'] = formName.formulaId || '';
                    _data['productName'] = formName.productName || '';
                    _data['productPrice'] = parseInt(formName.productPrice * 100) || 0;
                    _data['originPrice'] = parseInt(formName.originPrice * 100) || 0;
                    _data['productMachinePicurl'] = formName.productMachinePicurl || '';
                    _data['productPicurl'] = formName.productPicurl || '';
                    _data['productMachineDetailPicurl'] = formName.productMachineDetailPicurl || '';
                    _data['productRank'] = formName.productRank || '';
                    _data['operateType'] = formName.operateType || 0;
                    _data['productStatus'] = formName.productStatus || '';
                    _data['productTemperature'] = formName.productTemperature;
                    _data['productComment'] = formName.productComment || '';
                    _data['bunkerNumberArr'] = formName.bunkerNumberArr;
                    _data['machineType'] = this.ruleForm.machineType;
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + uri,
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    setTimeout(() => {
                                        parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                                    }, 500);
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.statusCode.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    })
                    break;
            }

        },
        tagChange(e) {  //操作产品的时候 处理select 的机器类型
            try {
                const it = this;
                e.ID != "" ? (() => {
                    e._arr.forEach((element) => {
                        if (e.ID == element.value) {
                            this.ruleForm.machineType = element.machineType;
                            this.productFlavorList = [];  //清空 口味列表
                            this.ruleForm.bunkerNumberArr = [];  //清空原来的 bunker 编号数组

                            element.machineType != 1 ? this.samllfileUpdata = true : (() => {
                                _data['formulaId'] = e.ID;
                                ym.init.XML({
                                    method: 'POST',
                                    uri: token._j.URLS.Development_Server_ + 'find_product_flavor',
                                    async: false,
                                    xmldata: _data,
                                    done: function (res) {
                                        let __arr__ = [];
                                        res.productFlavorList.forEach(e => {
                                            __arr__.push({
                                                value: e.bunkerNumber,
                                                label: e.flavorName,
                                                hide: e.hide
                                            });
                                        });
                                        it.productFlavorList = __arr__;
                                    }
                                });
                                this.samllfileUpdata = false;
                                //this.dialogVisibleData = true;   //第三张图片显示模态背景问题i
                            })(); //判断是否显示小设备的详情图片
                            // 1 的时候可冷热，0 的时候只能热
                            element.formulaTemperature != 1 ? this.radioclod = true : this.radioclod = false; //判断是否可以冷热切换
                        }
                    });
                })() : null;
            } catch (error) {
                this.IError(error);
            }
        },
        handleChange(e) {
            //地区选项 CodeToText 
            this.ruleForm.province = e;
            this.newAMap();
        },
        newAMap() {
            const it = this;
            var map = new AMap.Map('cityg', {
                resizeEnable: true, //是否监控地图容器尺寸变化
                zoom: 12 //初始化地图层级
            });
            map.on('click', function (e) {
                it.ruleForm.machineLatitude = e.lnglat.lat;  //纬度
                it.ruleForm.machineLongitude = e.lnglat.lng; //经度
            });
            map.clearMap();
            it.ruleForm.province.push(CodeToText[it.ruleForm.province[0]] + CodeToText[it.ruleForm.province[1]] + CodeToText[it.ruleForm.province[2]]);
            AMap.plugin('AMap.PlaceSearch', function () {
                var placeSearch = new AMap.PlaceSearch();
                placeSearch.search(it.ruleForm.province, function (status, result) {
                    // 查询成功时，result即对应匹配的POI信息
                    if (typeof result.poiList === "undefined") {
                        it.IError('Impact error! wrong keywords?');
                        return false;
                    }
                    var pois = result.poiList.pois;
                    for (var i = 0; i < pois.length; i++) {
                        var poi = pois[i];
                        var marker = [];
                        marker[i] = new AMap.Marker({
                            position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                            title: poi.name
                        });
                        // 将创建的点标记添加到已有的地图实例：
                        map.add(marker[i]);
                    }
                    map.setFitView();
                })
            })
        },
        sendMachine(_) {  //发送控制指令
            const it = this;
            if (_._operationType == 12) {  //发送运维状态指令 machineSn
                _data['machineSn'] = JSON.parse(decodeURI(dataHref.split('*')[1])).machineSn;
                if (JSON.parse(decodeURI(dataHref.split('*')[1])).runTimeStatus == 5) {
                    _data['status'] = 6;
                } else {
                    _data['status'] = 5;
                }; // 状态判定
                // add_runtime_log
                ym.init.XML({  //发送更改运维状态
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'add_runtime_log',
                    async: true,
                    xmldata: _data,
                    done: function (res) {
                        it.ISuccessfull(res.statusCode.msg);
                    }
                });

                return false;
            }
            _data['type'] = 2;
            _data['operationType'] = _._operationType;
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + uri,
                async: true,
                xmldata: _data,
                done: function (res) {
                    it.ISuccessfull(res.statusCode.msg);
                }
            });
        },
        autoTransfers(value, direction, movedKeys) {
            this.ruleForm.machineNumber = [];
            value.forEach(element => {
                this.ruleForm.machineNumber.push(element)
            });
        },
        searchAMap() {
            const it = this;
            setTimeout(() => {
                var map = new AMap.Map('cityg', {
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    zoom: 11, //初始化地图层级
                    center: [113.264385, 23.129112] //初始化地图中心点
                });
                map.on('click', function (e) {
                    it.ruleForm.machineLatitude = e.lnglat.lat;  //纬度
                    it.ruleForm.machineLongitude = e.lnglat.lng; //经度
                });
            }, 500)

        },
        manageCoupon(e) {
            const it = this;
            it.loading = true;
            it.searchMachines(e || '');
            _data['type'] = 1;
            ym.init.XML({  //查询产品
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                            it.tableData = [];
                            res.productList.forEach((key, index) => {
                                it.tableData.push({
                                    productId: key.productId,
                                    productName: key.productName,
                                    _name_: 1
                                })
                                if (e) {
                                    if (e.coupon.couponRange == -1) { it.ruleForm.all_product = true; return false; }
                                    e.coupon.couponRange.split(',').forEach(e => {
                                        if (e == key.productId) {
                                            it.$nextTick(function () {
                                                it.tableChecked(index);  //每次更新了数据，触发这个函数即可。
                                            });
                                        }
                                    })
                                }
                            })
                            it.loading = false;
                        })() : (() => {
                            it.loading = false;
                            throw "收集到错误：\n\n" + res.statusCode.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            })
        },
        searchMachines(params) {  //查看 机器
            let it = this;
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + 'get_machine_number_arr',
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                            it.tableDataMachine = [];
                            res.list.forEach((key, index) => {
                                it.tableDataMachine.push({
                                    machineNumber: key,
                                    _name_: 2
                                })
                                if (params) {
                                    if (params.coupon.machineRange == -1) { it.ruleForm.all_machine = true; return false; }
                                    params.coupon.machineRange.split(',').forEach(e => {
                                        if (params == key.productId) {
                                            it.$nextTick(function () {
                                                it.tableChecked(index, 'machineMultipleTable');  //每次更新了数据，触发这个函数即可。
                                            });
                                        }
                                    })
                                }
                            })
                        })() : (() => {
                            throw "收集到错误：\n\n" + res.statusCode.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            })
        },
        handleSelectionChange(val) { //下拉选项
            this.ruleForm.productId = [];  //优惠券产品相关
            this.formDataObject.objectId = '';  //营销活动会员ID
            if (val.length < 1) return false;
            if (val[0].memberRuleId) {
                this.formDataObject.objectId = val[0].memberRuleId;  //会员
            }
            if (val[0].couponId) {
                this.formDataObject.objectId = val[0].couponId;  //礼券
            }
            val.forEach(e => {
                this.ruleForm.productId.push(e.productId);  //批量操作优惠券产品
            });
        },
        handleSelectionChangeClick(params) {  //产品的选中
            this.ruleForm.all_product = false;  //强制当前的全选变成 自主选择
            this.tableData.forEach((element, index) => {  //处理 清除选中项目
                if (element.productId == params.index) {
                    this.tableData.splice(index, 1);
                }
            })
            if (this.ruleForm.all_product_id.length > 0) {  //选中的优惠券产品
                let _arr_ = [], bool = true;
                _arr_ = this.ruleForm.all_product_id;
                for (let i = 0; i < _arr_.length; i++) {
                    if (_arr_[i].productId == params.productId) {
                        bool = false
                    };
                }
                bool ? _arr_.push(params) : null;
                this.ruleForm.all_product_id = _arr_;  //批量操作优惠券产品
                return;
            }
            this.ruleForm.all_product_id.push(params);  //批量操作优惠券产品
        },
        MachineHandleSelectionChange(params) {  //选中的机器操作
            this.ruleForm.all_machine = false;  //强制当前的全选变成 自主选择

            this.tableDataMachine.forEach((element, index) => {  //处理 清除选中项目
                if (element.machineNumber == params.index) {
                    this.tableDataMachine.splice(index, 1);
                }
            })
            if (this.ruleForm.all_machine_id.length > 0) {  //选中的优惠券产品
                let _arr_ = [], bool = true;
                _arr_ = this.ruleForm.all_machine_id;
                for (let i = 0; i < _arr_.length; i++) {
                    if (_arr_[i].machineNumber == params.machineNumber) {
                        bool = false
                    };
                }
                bool ? _arr_.push(params) : null;
                this.ruleForm.all_machine_id = _arr_;  //批量操作优惠券产品
                return;
            }
            this.ruleForm.all_machine_id.push(params);  //批量操作优惠券产品
        },
        vipHandleSelectionChange(params, row) {  //选中的会员操作
            this.ruleForm.all_vip = false;  //强制当前的全选变成 自主选择

            this.tableDataVip.forEach((element, index) => {  //处理 清除选中项目
                if (element.memberRuleId == params.index) {
                    this.tableDataVip.splice(index, 1);
                }
            })
            if (this.ruleForm.all_vip_id.length > 0) {  //选中的优惠券产品
                let _arr_ = [], bool = true;
                _arr_ = this.ruleForm.all_vip_id;
                for (let i = 0; i < _arr_.length; i++) {
                    if (_arr_[i].memberRuleId == params.memberRuleId) {
                        bool = false
                    };
                }
                bool ? _arr_.push(params) : null;
                this.ruleForm.all_vip_id = _arr_;  //批量操作优惠券产品
                return;
            }
            this.ruleForm.all_vip_id.push(params);  //批量操作优惠券产品
        },

        tableRowClassName({ row, rowIndex }) {  //赋值行号 是当前选中的产品信息
            row.index = row.productId;
        },

        tableRowMachineClassName({ row, rowIndex }) {  //赋值行号 是当前选中的机器编号信息
            row.index = row.machineNumber;
        },

        tableRowVipClassName({ row, rowIndex }) {  //赋值行号 是当前选中的会员信息
            row.index = row.memberRuleId;
        },

        deleteAllPlue(params, name) {   //删除选中的产品列表
            if (name == 'product') {  //删除产品
                this.ruleForm.all_product_id.forEach((element, index) => {
                    if (params.index == element.index) {
                        this.ruleForm.all_product_id.splice(index, 1);
                        this.tableData.push(element);
                        this.tableData.sort((a, b) => {
                            return a.index - b.index;
                        })
                    }
                })
            } else if(name == 'machine') {  //删除机器编号
                this.ruleForm.all_machine_id.forEach((element, index) => {
                    if (params.index == element.index) {
                        this.ruleForm.all_machine_id.splice(index, 1);
                        this.tableDataMachine.push(element);
                        this.tableDataMachine.sort((a, b) => {
                            return a.index - b.index;
                        })
                    }
                })
            }else{  //删除vip id
                this.ruleForm.all_vip_id.forEach(( element, index ) => {
                    if(params.index == element.index){
                        this.ruleForm.all_vip_id.splice(index, 1);
                        this.tableDataVip.push(element);
                        this.tableDataVip.sort((a, b) => {
                            return a.index - b.index;  //重新排序
                        })
                    }
                })
            }
        },

        inputArrayChange(params) {  //优惠券 添加行
            let _array_ = this.inputArray;
            _array_.push({
                value: '',
                name: ''
            })
            this.$nextTick(function () {
                this.inputArray = _array_;
            })
        },
        inputArrayChangeDelete(params) {  //删除列表以及内容
            this.inputArray.splice(params, 1);  //删除列表
            this.changeInputValues.splice(params, 1); //删除已经填写的内容
        },
        changeInputValue(params, index) {   //添加的表单 value
            let _arr_ = [];
            if (this.changeInputValues.length > 0) {
                this.changeInputValues.forEach((element, i) => {
                    _arr_.push(element);
                    if (element.index == index) {
                        _arr_.splice(i, 1, {
                            value: params,
                            index: index
                        });
                    };  //先清除掉之前的内容稍后执行添加 
                })
                if (this.changeInputValues.length == index) {
                    _arr_.push({
                        value: params,
                        index: index
                    })
                }
                this.changeInputValues = _arr_;
                return false;
            }
            this.changeInputValues.push({
                value: params,
                index: index
            })

        },

        tableChecked(e, name) {  //表格打勾已选择回显  
            if (name == 'machineMultipleTable') {
                this.$refs.machineMultipleTable.toggleRowSelection(this.tableData[e], true);
                return false;
            }
            this.$refs.multipleTable.toggleRowSelection(this.tableData[e], true);
        },
        // setCurrent(tableData){ //添加活动列 奖品
        //     this.tableData.push({
        //         itemName: '未中奖',
        //         itemType: '无奖品',
        //         objectId: 'null',
        //         isMember: 'not',
        //         probability: '0.5'
        //     })
        // },
        getobjectId: function (params) {
            let xml = [], it = this;
            switch (params) {
                case 2:
                    this.dialogVisibleTables = true; //礼券明细
                    this.objectIdShow = true;
                    _data['page'] = 1;
                    let __time = new Map([
                        [1, '年'],
                        [2, '月'],
                        [3, '日'],
                        [4, '周']
                    ]);
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + 'find_coupon_list',
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    setTimeout(() => {
                                        it.tableDataVip = [];
                                        res.couponInfoList.forEach((key, index) => {
                                            it.tableDataVip.push({
                                                couponId: key.couponId,
                                                couponName: key.couponName,
                                                couponMoney: key.couponMoney,
                                                couponTime: key.couponTime + __time.get(key.timeUnit),
                                                couponType: key.couponType
                                            })
                                        })
                                    }, 500);
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.statusCode.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    })
                    break;
                case 3:
                    this.dialogVisibleTable = true;  //会员明细
                    this.objectIdShow = true;
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + 'get_member_list',
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    setTimeout(() => {
                                        it.tableDataVip = [];
                                        res.memberRuleList.forEach((key, index) => {
                                            it.tableDataVip.push({
                                                memberRuleId: key.memberRuleId,
                                                memberRuleName: key.memberRuleName
                                            })
                                        })
                                    }, 500);
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.statusCode.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    })
                    break;
                default:
                    this.objectIdShow = false;
                    break;
            }
        },
        setVipAndCon() {
            //this.formDataObject.objectId = this.formDataObject.objectId;
            this.dialogVisibleTable = false;  //礼券明细
            this.dialogVisibleTables = false;  //会员明细
        },
        formDataObjectProduct(params) {
            if (!params.itemName) this.IError('请填写完整！');
            if (params.probability >= 1) {
                this.IError('概率不能大于1');
                return false;
            }
            if (!params._index_) params._index_ = this.tableData.length + 1;
            this.tableData.splice(params._index_ - +true, +true, {
                itemName: params.itemName,
                itemType: params.itemType,
                objectId: params.objectId,
                isMember: params.isMember,
                sort: params.sort,
                probability: params.probability
            });
            this.dialogVisible = false; //添加奖品
            this.dialogVisibleTable = false;  //礼券明细
            this.dialogVisibleTables = false;  //会员明细
        },
        submitFormTruntable(params, tables) {
            const it = this;
            if (dataHref.split('*').length > 1) {
                _data['drawId'] = JSON.parse(decodeURI(dataHref.split('*')[1])).drawId
            }
            try {
                _data['title'] = params.title;
                // if(params.startTime.length > 0){
                //     _data['startTime'] = ym.init.getDateTime(params.startTime[0]);
                //     _data['endTime'] = ym.init.getDateTime(params.startTime[1]);
                // }
                // _data['raffleType'] = params.raffleType;
                // _data['timeUnit'] = params.timeUnit;
                // _data['limitCount'] = params.limitCount;
                _data['status'] = params.status;
                _data['raffleVersion'] = params.raffleVersion || '';
                _data['sort'] = params.sort || 0;
                //_data['items'] = JSON.stringify(tables);  //服务端不支持该结构

                tables.forEach((element, index) => {
                    _data['items[' + index + '].itemName'] = element.itemName;
                    _data['items[' + index + '].itemType'] = element.itemType;
                    _data['items[' + index + '].objectId'] = element.objectId || '';
                    _data['items[' + index + '].isMember'] = element.isMember;
                    _data['items[' + index + '].sort'] = element.sort;
                    _data['items[' + index + '].probability'] = element.probability;
                });

                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + uri,
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                setTimeout(() => {
                                    parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                                }, 300);
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            } catch (error) {
                it.IError(error);
            }
        },
        enitTableData(params, _index) {
            this.formDataObject = {
                itemName: params.itemName,
                itemType: params.itemType,
                objectId: params.objectId,
                isMember: params.isMember,
                sort: params.sort,
                probability: params.probability,
                _index_: _index + +true
            }
        },
        deleteTableData(_index_) {
            this.tableData.splice(_index_, +true);
        },

        submitFormMiniTurntable(params) {  //小程序大转盘提交
            const it = this;
            if (params.probability > 1) {
                it.IError('【概率】溢出了');
                return false;
            }
            Object.keys(params).forEach((ele, index) => {
                _data[ele] = Object.values(params)[index];
            })
            if (params.itemType != 2 && params.itemType != 3) {
                delete _data['objectId']
            }
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                            it.ISuccessfull(res.statusCode.msg);
                            setTimeout(() => {
                                parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                            }, 500);
                        })() : (() => {
                            throw "收集到错误：\n\n" + res.statusCode.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            })
        },

    }
})