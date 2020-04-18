import { regionData, CodeToText, TextToCode } from 'element-china-area-data';
import QRCode from 'qrcodejs2';


if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    window.onload = function (params) {
        for (let i = 0; i < document.getElementsByClassName('el-dialog').length; i++) {
            document.getElementsByClassName('el-dialog')[i].style.width = '100%';  //iframe 里面的class 
        }
        for (let i = 0; i < document.getElementsByClassName('w400').length; i++) {
            document.getElementsByClassName('w400')[i].style.width = '100%'; //限定的表单宽度
        }
    }
}

window.addEventListener('pageshow', function (params) {
    let par = params.target.URL.split('*').length > 1 ? params.target.URL.split('*')[0] : params.target.URL;
    const [
        $,
        token,
        u,
        uri
    ] = [
            parent.all.jq,
            parent.all.json,
            // parent.document.getElementById('tagHref').getAttribute('src').replace('..', '/manage').split('?')[0],
            '/manage' + par.substring(par.lastIndexOf('/'), par.lastIndexOf('?') == -1 ? par.length : par.lastIndexOf('?')),
            document.getElementById('c-container-list').getAttribute('data-uri'),
        ];
    new Vue({
        el: '#c-container-list',
        data: () => {
            return {
                fileUpdata: (process.env.NODE_ENV == "development" ? parent.all.json._j.URLS.Development_Files_ : parent.all.json._j.URLS.ForMal_Files_) + 'picture_file_upload',
                fileUpdataExc: (process.env.NODE_ENV == "development" ? parent.all.json._j.URLS.Development_Server_ : parent.all.json._j.URLS.Development_Server_) + 'import_machine_instance_by_csv',
                asfileUpdataExc: (process.env.NODE_ENV == "development" ? parent.all.json._j.URLS.Development_Server_ : parent.all.json._j.URLS.Development_Server_) + 'import_machine_by_csv',
                fileUpdataExcData: {
                    Authorization: JSON.parse(sessionStorage.getItem('token')).asset.secret
                },
                loading: false,
                more: false,
                tableData: [],
                tableDatas: [],
                tableDatass: [],
                UnFormData: [],
                UnTableFormData: [],
                currentPage: 1,
                pageSize: 20,
                page: 1,
                total: 0,
                machineId: [],
                addressId: [],
                address: regionData,   // 地址选择
                roleId: [],
                formData: {
                    machineId: [],
                    addressId: []
                },
                changeInputValueData: [], //详细说明的数组
                inputArrays: [{
                    // name: '',
                    // value: '',
                    inputArray: [{
                        name: '',
                        value: '',
                    }], //优惠券的输入说明 数组
                }], //优惠券的输入说明 数组
                changeInputValueDatas: [], //详细说明的数组
                formDataTree: {
                },
                formDataTrees: {},
                formDatas: {
                    machineId: [],
                    addressId: []
                },
                DataVisible: {},
                options: [],
                option: [],
                optiones: [],
                SearchTableAndVisible: false,
                UpdateTableAndVisible: false,
                detailTableAndVisible: false,
                UpdateVisible: false,
                TableAndVisible: false,
                dialogVisible: false,
                adoptModule: false,
                errorExe: false,
                pawstate: false,
                dialogImageUrl: '',
                fileList: [],
                data: {},
                num: 1,
                search_address: '',
                props: {
                    label: 'name',
                    ids: 'id',
                    values: 'value',
                    children: 'zones'
                },
                tableRadio: [],   //单选选择
                tableRadios: [],
                count: 1,
                listSearch: {
                },  //新的列表查询对象
                SearchTableFormData: {
                    realName: '',
                    workCount: '',
                    auditCount: '',
                    indexCount: '',
                    income: '',
                    loginTime: '',
                    loginIp: '',
                    registerIp: '',
                    classifyName: '',  //零件
                    parentId: '',
                    parentName: '',
                    sort: '',
                    level: '',
                    remark: '',
                    id: '',
                    repairsTypeId: []
                },
                SearchTableFormDatas: {},
                imageList: {
                    machinePic: [],
                    machinePics: []
                },
                fileData: {

                },
                errorImage: ['../images/error.png'],
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
                StatusName: new Map([
                    ['free', {
                        user: new Map([
                            [1, '超级管理员'],
                            [2, '系统管理员'],
                            [3, '商户管理员']
                        ]),
                        statues: new Map([
                            [0, '冻结'],
                            [1, '正常']
                        ]),
                        machineType: new Map([
                            [1, '大型柜式机'],
                            [2, '小型桌面机'],
                            [3, '无网单机']
                        ])
                    }],
                    ['time', {
                        machineRun: new Map([
                            [1, '正常'],
                            [2, '故障'],
                            [3, '离线'],
                            [4, '维护'],
                            [5, '维修'],
                            [6, '维修完成']
                        ]),
                        couponTime: new Map([
                            [1, '年'],
                            [2, '月'],
                            [3, '日'],
                            [4, '周'],
                            [5, '小时']
                        ])
                    }]
                ]),
                pageparams: {},  // 预存的页面搜索参数
            }
        },
        created: function () {
            this.list();
            window.is = this;
        },
        methods: {
            IError(err) {
                setTimeout(() => {
                    this.loading = false;
                    if (err == `未登录或身份验证过时`) {
                        // window.top.location.href = `../login.htm?hash:[]`;
                        parent.location.href = `../login.htm?hash:[nK6t7a]`;
                    }
                }, 1000);
                this.$message.error('事务提醒：' + err);
            },
            ISuccessfull(e) {
                setTimeout(() => {
                    this.loading = false;
                }, 1000);
                this.$message({
                    message: '事务提醒：,' + e,
                    type: 'success'
                });
            },
            handleSizeChange(e) {
                this.pageSize = e;
                this.list(this.pageparams ? this.pageparams : null, true);
            },
            handleCurrentChange(e) {
                this.page = e;
                this.list(this.pageparams ? this.pageparams : null, true);
            },
            list(params = {}, bool) {
                console.log(params)
                let _data_ = {}, it = this, xml = [];
                if (params) {
                    it.pageparams = params; //保存搜索条件
                    params._name_ ? params[params._name_] = params._value_ : null;
                }
                if (uri == 'sys_user_login_index_list') params['loginType'] = 1; //默认管理端

                /**
                 * 工单的校验
                 * complete_work_list  已完成工单
                 * * underway_work_list  进行中工单
                 * * cancel_work_list  已取消工单
                 * **/
                // if(uri == 'sys_work_order_list'){
                //     params.uri ? _yri_ = params.uri : null;
                // }

                it.loading = true;
                params['page'] = !bool ? (() => {
                    it.currentPage = 1;
                    return it.currentPage
                })() : it.page;
                params['pageSize'] = 20;
                _data_ = qs.stringify(params);
                axios.post(uri, _data_).then(params => {
                    let data = params.data;
                    // data.page.pages ? it.currentPage= parseInt(data.page.pages) : null;
                    if (data.state == 200) {
                        if (uri == 'page_permission_tree') {
                            data.list.forEach((element, index) => {
                                if (element.lowers) {
                                    element['hasChildren'] = true;
                                    element['children'] = element.lowers;
                                }
                                if (element.permissionWeight == 1) {
                                    xml.push(element);
                                }
                            })
                        } else {
                            if (uri == "sys_machine_offer_explain_list") {
                                // data.page.records[]
                                data.page.records.forEach((element, index) => {
                                    data.page.records[index].offerExplain = ym.init.COMPILESTR.decrypt(element.offerExplain)
                                })
                            }
                            data.page.total ? it.total = parseInt(data.page.total) : null;
                            xml = data.page.records;
                        }
                    } else {
                        is.IError(data.msg);
                        is.loading = false;
                    }

                    it.tableData = xml;
                    setTimeout(() => {
                        it.loading = false;
                    }, 100);
                })
            },
            crud(arg) {
                window.parent.document.getElementById('tagHref').setAttribute('src', `../${arg.uri}.html?[hash]${arg.enitId ? '*' + encodeURI(JSON.stringify(arg.enitId)) : ''}`); // 编辑带参数
            },
            loadTree(tree, treeNode, resolve) {   //树结构表格
                setTimeout(() => {
                    resolve(tree.children);
                }, 500)
            },
            //新增 权限
            assets(params) {
                is.loading = true;
                params.parentId ? params.parentId : params['parentId'] = -1;
                params.permissionWeight == 1 ? params.requestUri = -1 : null;
                axios.post('create_permission', qs.stringify(params)).then(params => {
                    is.data = params.data;
                    if (is.data.state == 200) {
                        is.ISuccessfull(is.data.msg);
                        is.list();
                        is.UpdateTableAndVisible = false;
                    } else {
                        is.IError(is.data.msg);
                    }
                    setTimeout(() => {
                        is.loading = false;
                    }, 1000);
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            //权限详情
            assetsdetails(params) {
                axios.get('sys_permission_detail', {
                    params: {
                        permissionId: params
                    }
                }).then(params => {
                    if (params.data.state == 200) {
                        is.SearchTableAndVisible = true;
                        params.data.data['requestUri'] == -1 ? params.data.data['requestUri'] = "无" : null;
                        this.SearchTableFormData = params.data.data;
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //提交更新权限
            assertsUpdate(params) {
                axios.post('update_permission', qs.stringify(params)).then(res => {
                    if (res.data.state == 200) {
                        is.ISuccessfull(res.data.msg);
                        is.SearchTableAndVisible = false;
                        is.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //查看 角色已赋予 页面权限
            serchAssetes(params) {
                axios.post('role_page_permission', qs.stringify({
                    roleId: params
                })).then(res => {
                    this.data['roleId'] = params;
                    if (res.data.state == 200) {
                        // is.detailTableAndVisible = true;
                        // this.data['tree'] = res.data.list;
                        // is.UnFormData = res.data.list;
                        let arr = [];
                        res.data.list.forEach((element, index) => {
                            if (element.permissionWeight == 1) {
                                // 全部权限
                                // arr.push({ id: element.permissionId, name: element.permissionName, value: element.lowers })
                                element.lowers.forEach(e => {
                                    arr.push({ id: e.permissionId, name: e.permissionName })
                                })
                            }
                        })
                        console.log(arr)
                        setTimeout(() => {
                            this.$nextTick(() => {
                                this.$refs.tree.setCheckedNodes(arr);
                            })
                        }, 1000)

                    } else {
                        console.log(res.data.msg);
                        setTimeout(() => {
                            this.$nextTick(() => {
                                this.$refs.tree.setCheckedNodes([]);
                            })
                        }, 1000)
                        // is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            //查看 所有 权限 树结构
            serchAssetesAll(params) {
                axios.post('page_permission_tree').then(res => {
                    if (res.data.state == 200) {
                        is.TableAndVisible = true;
                        is.data['tree'] = res.data.list;
                        // res.data.list.forEach((element, index) => {
                        //     params.forEach((els) => {
                        //         if (els.permissionId == element.permissionId) {
                        //             it.$nextTick(function () {
                        //                 is.tableChecked(index);  //每次更新了数据，触发这个函数即可。
                        //             });
                        //         }
                        //     })

                        // })
                    } else {
                        // is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            //查看 所有 资源权限  角色已赋予资源权限
            rosSerchAssetesAll(params) {
                axios.post('resource_permission_list').then(res => {
                    if (res.data.state == 200) {
                        is.detailTableAndVisible = true;
                        is.tableDatas = res.data.list;  //**********************/
                        axios.post('role_resource_permission', qs.stringify({
                            roleId: params,
                            page: 1,
                            pageSize: 1000
                        })).then(response => {
                            this.data['roleId'] = params;
                            if (response.data.state == 200) {
                                res.data.list.forEach((element, index) => {
                                    response.data.page.records.forEach((els) => {
                                        if (els.permissionId == element.permissionId) {
                                            is.$nextTick(function () {
                                                is.tableChecked(index);  //每次更新了数据，触发这个函数即可。
                                            });
                                        }
                                    })
                                })

                            } else {
                                console.log(response.data.msg);
                            }
                        })
                            .catch(function (error) {
                                is.IError(error);
                            })
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //查看 角色数据 权限
            dataSerchAssetes(params) {
                axios.post('sys_data_permission_list').then(res => {
                    if (res.data.state == 200) {
                        is.SearchTableAndVisible = true;
                        is.tableDatass = res.data.list;  //**********************/
                        axios.get('role_data_permission?roleId=' + params).then(response => {
                            this.data['roleId'] = params;
                            if (response.data.state == 200) {
                                res.data.list.forEach((element, index) => {
                                    if (response.data.data.dataPermissionId == element.dataPermissionId) {
                                        is.$nextTick(function () {
                                            is.tableCheckeds(index);  //每次更新了数据，触发这个函数即可。
                                        });
                                    }
                                })
                            } else {
                                console.log(response.data.msg);
                            }
                        })
                            .catch(function (error) {
                                is.IError(error);
                            })
                    } else {
                        is.IError(error);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },


            tableRowVipClassName({ row, rowIndex }) {  //赋值行号 是当前选中的会员信息
                row.index = row.memberRuleId;
            },

            //提交 权限页面 绑定
            bindingAction(params) {
                axios.get('set_permission_role', {
                    params: {
                        permissionId: params.permissionId, roleId: params.adminId
                    }
                }).then(params => {
                    is.data = params.data;
                    if (is.data.state == 200) {
                        is.ISuccessfull(is.data.msg);
                        is.detailTableAndVisible = false;
                    } else {
                        is.IError(is.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            tableChecked(e) {  //表格打勾已选择回显 
                this.$refs.multipleTable.toggleRowSelection(this.tableDatas[e], true);
            },
            tableCheckeds(e) {  //表格打勾已选择回显 
                this.$refs.multipleTables.toggleRowSelection(this.tableDatass[e], true);
            },
            //客户端用户地址
            clientaddress(params) {
                this.detailTableAndVisible = true;
                axios.get('sys_client_address_list', {
                    params: {
                        clientId: params,
                        page: 1,
                        pageSize: 100
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        this.UnFormData = res.data.page.records;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //新增 设备类型
            machine(params, xml = {}) {
                try {
                    xml = params;
                    xml['_emjoy_'] = [];
                    xml['_emjoy_'] = JSON.stringify(this.data.repairsTypeIds).split('[')[1];
                    xml['_emjoy_'] = xml['_emjoy_'].split(']')[0];
                    xml['repairsTypeIds'] = xml['_emjoy_'].replace(/\"/g, "");
                    delete xml['_emjoy_'];
                    xml['machinePic'] = this.data.machinePic;  //类型图片
                    axios.post('create_machine', qs.stringify(params)).then(res => {
                        if (res.data.state == 200) {
                            is.UpdateTableAndVisible = false;
                            is.ISuccessfull(res.data.msg);
                            is.data = {};
                            is.list();
                        } else {
                            is.IError(res.data.msg);
                        }
                    })
                        .catch(function (error) {
                            is.IError(error);
                        })
                } catch (error) {
                    is.IError(error);
                }
            },

            //新增/编辑 报修分类 
            devicemachine(params, bool = false) {
                if (params.machineId) bool = true;
                params['demandIds'] = !JSON.stringify(this.data['repairsTypeIds']) ? null : JSON.stringify(this.data['repairsTypeIds']).replace(/\[|]/g, ""); //费用项数组 demandChargeIds 
                params['machineId'] = this.tableRadio.machineId; //设备分类
                params['machineOfferExplainId'] = this.tableRadios.machineOfferExplainId; //报价参考
                axios.post(bool ? 'update_repairs_type' : 'create_repairs_type', qs.stringify(params)).then(res => {
                    if (res.data.state == 200) {
                        is.UpdateTableAndVisible = false;
                        is.ISuccessfull(res.data.msg);
                        is.data = {};
                        is.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //新增/编辑 需求分类 
            demandsubmit(params, bool = false) {
                if (params.demandId) bool = true;
                console.log(this.tableRadio)
                params['demandChargeIds'] = !JSON.stringify(this.data['repairsTypeIds']) ? null : JSON.stringify(this.data['repairsTypeIds']).replace(/\[|]/g, ""); //费用项数组 demandChargeIds 
                params['repairsId'] = this.tableRadio.repairsTypeId; //报修分类
                axios.post(bool ? 'update_demand' : 'create_demand', qs.stringify(params)).then(res => {
                    if (res.data.state == 200) {
                        is.UpdateTableAndVisible = false;
                        is.ISuccessfull(res.data.msg);
                        is.data = {};
                        is.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            getTemplateRow(item) {
                this.tableRadio = item
            },

            getTemplateRows(item) {
                this.tableRadios = item
            },

            //查看设备分类详细
            machineDest(params, timer = null) {
                is.imageList.machinePics = [];
                axios.get('sys_machine_detail', {
                    params: {
                        machineId: params.machineId
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        is.SearchTableAndVisible = true;
                        if (res.data.data.status == 1) {
                            is.adoptModule = true;
                            this.$nextTick(() => {
                                this.search({ url: "sys_repairs_type_list", machineId: params.machineId });  //查询当前的 已经绑定的项目
                                setTimeout(() => {
                                    this.options.forEach((ele, index) => {
                                        if (ele.machineId == params.machineId) {
                                            this.$refs.multipleTable.toggleRowSelection(this.options[index], true);
                                        }
                                    })
                                }, 1000)
                            })
                        } else {
                            is.adoptModule = false;
                        }
                        is.imageList.machinePics.push({ name: 'machinePics', url: res.data.data.machinePic }); // 图片
                        is.SearchTableFormData = res.data.data;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //查看/新增 报修分类详细
            devicemachineDest(params) {
                this.UpdateTableAndVisible = true;
                this.$nextTick(() => {
                    this.search({ url: "sys_machine_list" });  //设备分类列表
                    setTimeout(() => {
                        this.tableDatass = this.options;
                        this.tableDatass.forEach((ele, index) => {
                            if (!params) return;
                            if (ele.machineId == params.machineId) {
                                this.getTemplateRow(ele);
                            }
                        })
                        setTimeout(() => {
                            this.search({ url: "sys_demand_list" });  //设备需求分类列表
                            setTimeout(() => {
                                this.option = this.options;
                                this.option.forEach((ele, index) => {
                                    this.$nextTick(() => {
                                        if (!params) return;
                                        if (params.repairsTypeId == ele.repairsId) {
                                            this.$refs.multipleTable.toggleRowSelection(this.option[index], true);
                                        }
                                    })
                                })
                                setTimeout(() => {
                                    this.search({ url: "sys_machine_offer_explain_list" });  //设备收费参考
                                    setTimeout(() => {
                                        this.tableDatas = this.options;
                                        this.tableDatas.forEach((ele, index) => {
                                            if (!params) return;
                                            if (ele.repairsId == params.repairsTypeId) {
                                                this.getTemplateRows(ele);
                                            }
                                        })
                                    }, 700)
                                }, 600)
                            }, 500)
                        }, 400)
                    }, 300)
                })
                if (!params) return;
                axios.get('sys_repairs_type_detail', {
                    params: {
                        repairsTypeId: params.repairsTypeId
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        this.formData = res.data.data;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //查看需求类型
            demandDest(params) {
                this.UpdateTableAndVisible = true;
                this.$nextTick(() => {
                    this.search({ url: "sys_repairs_type_list" });  //报修分类列表
                    setTimeout(() => {
                        this.tableDatass = this.options;
                        this.tableDatass.forEach((ele, index) => {
                            if (!params) return;
                            if (ele.repairsTypeId == params.repairsId) {
                                this.getTemplateRow(ele);
                            }
                        })
                        setTimeout(() => {
                            this.search({ url: "sys_demand_charge_list" });  //设备收费项目列表
                            setTimeout(() => {
                                this.option = this.options;
                                this.option.forEach((ele, index) => {
                                    this.$nextTick(() => {
                                        if (!params) return;
                                        if (params.demandId == ele.demandId) {
                                            this.$refs.multipleTable.toggleRowSelection(this.option[index], true);
                                        }
                                    })
                                })
                            }, 500)
                        }, 400)
                    }, 300)
                })
                if (!params) return;
                axios.get('sys_demand_detail', {
                    params: {
                        demandId: params.demandId
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        this.formData = res.data.data;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //审核 工单
            adopt(params, bool) {
                axios.get('audit_machine_instance', {
                    params: {
                        auditResult: +bool + 1,
                        machineInstanceId: params.machineInstanceId
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        is.SearchTableAndVisible = false;
                        is.ISuccessfull(res.data.msg);
                        is.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            //上传EX
            ExecSceneSuccess(file) {
                if (file.state == 200) {
                    this.data['Execfile'] = file.data.failFilePath;
                    if (file.data.fail > 0) {
                        is.errorExe = true;
                        is.fileList = [];
                        is.$nextTick(function () {
                            document.getElementById('ahrefDownload').onclick = function () {
                                parent.window.open(file.data.failFilePath, '_blank');
                            };
                        });
                        return false;
                    }
                    this.ISuccessfull('上传成功！');
                    this.list();
                } else {
                    is.fileList = [];
                    is.IError(file.msg);
                }
            },
            exeLength(error) {
                // is.IError('文件上传超出处理限制个数');
                this.fileList = [];
            },
            DeleteInstance(params = {}) {
                params[Object.keys(params)[1]] = Object.values(params)[1];
                axios.get(params.url, {
                    params: params
                }).then(res => {
                    if (res.data.state == 200) {
                        is.ISuccessfull(res.data.msg);
                        is.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            // 查询 /角色ID/报修分类ID
            search(params) {
                let data = {};
                data['page'] = 1;
                data['pageSize'] = 1000;
                data['url'] = params.url;
                if (params.url == "sys_work_order_list") data['workId'] = params.workId;
                axios.post(data.url, qs.stringify(data)).then(params => {
                    this.options = [];
                    this.roleId = [];
                    if (params.data.state == 200) {
                        // if (this.data.url == 'sys_repairs_type_list') {}
                        if (data.url == 'sys_role_list') {
                            this.roleId = params.data.page.records.map(item => {
                                return { value: `${item.roleId}`, label: `${item.roleName}` };
                            });
                        } else {
                            //查询报修分类ID
                            this.options = params.data.page.records.map(item => {
                                // return { machineId: `${item.machineId}`, value: `${item.repairsTypeId}`, label: `${(item.machineName == -1 ? '无' : item.machineName )+"---" +item.repairsTypeName}` };
                                return item
                            });
                        }
                        // this.data = {};
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            // select 检索
            remoteMethod(query) {
                if (query !== '') {
                    setTimeout(() => {
                        this.options = this.machineId.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.options = [];
                }
            },
            //选择区域地址ID
            remoteMethods(query) {
                if (query !== '') {
                    setTimeout(() => {
                        this.option = this.addressId.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.option = [];
                }
            },
            //选择角色ID
            remoteMethodes(query) {
                if (query !== '') {
                    setTimeout(() => {
                        this.options = this.roleId.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.options = [];
                }
            },
            //管理员详情
            admindetail(params) {
                axios.get('sys_admin_detail', {
                    params: params
                }).then(res => {
                    if (res.data.state == 200) {
                        this.UpdateTableAndVisible = true;
                        this.search({ url: 'sys_role_list' });
                        this.data['roleId'] = res.data.data.roleId;  //缓存起来 地址ID
                        res.data.data.roleId = res.data.data.roleName;
                        this.formData = res.data.data;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //管理员修改
            admindenit(params) {
                let xml = {};
                if (isNaN(params.addressId)) {  //不修改 区域地址
                    xml['addressId'] = this.data.addressId;
                }
                if (isNaN(params.roleId)) {  //不修改角色
                    xml['roleId'] = this.data.roleId;
                }
                xml = Object.assign({}, params, xml, {
                    token: JSON.parse(sessionStorage.getItem('token')).asset.secret
                });
                axios.post('update_admin', qs.stringify(xml)).then(params => {
                    if (params.data.state == 200) {
                        is.dialogVisible = true;
                        this.$nextTick(function () {
                            document.querySelector('#qrcode').innerHTML = "";  //清空原先的 二维码
                            new QRCode(this.$refs.qrcode, {
                                text: 'http://zgksx.com/wechat/?_data_=' + encodeURI(JSON.stringify(xml)),
                                width: 200,
                                height: 200,
                                colorDark: "#333333", //二维码颜色
                                colorLight: "#ffffff", //二维码背景色
                                correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
                            })
                        })
                        is.formData = {};

                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //管理员添加
            adminmanage(params) {
                params['workPush'] = 0;  //是否执行工单推送(0-否,1-是)
                params['wechatId'] = -1;  //绑定微信用户id 默认创建 -1 无
                let data = params;

                axios.post('create_admin', qs.stringify(params)).then(params => {
                    if (params.data.state == 200) {
                        is.dialogVisible = true;

                        data['token'] = JSON.parse(sessionStorage.getItem('token')).asset.secret; // 当前执行修改的用户 token 

                        data['adminId'] = params.data.data.id;

                        // if(!data.adminId){
                        //     axios.post('sys_admin_list', qs.stringify({
                        //         page : 1,
                        //         pageSize : 20,
                        //         adminName : data.adminName
                        //     })).then(params => {
                        //         if (params.data.state == 200) {
                        //             console.log(params)
                        //             // data['adminId'] = 
                        //         } else {
                        //             is.IError(params.data.msg);
                        //         }
                        //     })
                        // }

                        this.$nextTick(function () {
                            document.querySelector('#qrcode').innerHTML = "";  //清空原先的 二维码
                            new QRCode(this.$refs.qrcode, {
                                text: 'http://zgksx.com/wechat/?_data_=' + encodeURI(JSON.stringify(data)),
                                width: 200,
                                height: 200,
                                colorDark: "#333333", //二维码颜色
                                colorLight: "#ffffff", //二维码背景色
                                correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
                            })
                        })
                        is.formDatas = {};
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //选择地址
            handleChange(e) {
                //地区选项 CodeToText 
                this.formData.province = e;
            },

            //区域地址添加
            addressmanage(params) {
                params['city'] = CodeToText[params.province[1]] || '';
                params['district'] = CodeToText[params.province[2]] || '';
                params['province'] = CodeToText[params.province[0]] || '';
                axios.post('create_address', qs.stringify(params)).then(params => {
                    if (params.data.state == 200) {
                        is.ISuccessfull(params.data.msg);
                        is.UpdateTableAndVisible = false;
                        is.formDatas = {};
                        is.list();
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            // 角色添加
            role(params) {
                axios.post('create_role', qs.stringify(params)).then(params => {
                    if (params.data.state == 200) {
                        is.ISuccessfull(params.data.msg);
                        is.UpdateTableAndVisible = false;
                        is.formDatas = {};
                        is.list();
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            loadNode(node, resolve, tmer = null) {
                tmer = setInterval(() => {
                    if (this.data.hasOwnProperty('tree')) {
                        console.info('this tmer out');
                        clearInterval(tmer);
                        if (node.level === 0) {
                            let _array_ = [];
                            this.data['tree'].forEach((element, index) => {
                                if (element.permissionWeight == 1) {
                                    _array_.push({ name: element.permissionName, id: element.permissionId, value: element.lowers });
                                }
                            });
                            return resolve(_array_);
                        }
                        let __arr__ = [];
                        if (node.data.value != null) {
                            node.data.value.forEach((element, index) => {
                                __arr__.push({ name: element.permissionName, id: element.permissionId, parentId: element.parentId, value: element.lowers })
                            })
                        }
                        setTimeout(function () {
                            resolve(__arr__);
                        }, 500)
                    }
                }, 0)
            },
            loadNodes(node, resolve, tmer = null) {
                tmer = setInterval(() => {
                    if (this.data.hasOwnProperty('trees')) {
                        console.info('this tmer out');
                        clearInterval(tmer);
                        if (node.level === 0) {
                            let _array_ = [];
                            this.data['trees'].forEach((element, index) => {
                                _array_.push({ name: element.permissionName, id: element.permissionId });
                            });
                            return resolve(_array_);
                        }
                        setTimeout(function () {
                            resolve(__arr__);
                        }, 500)
                    }
                }, 0)
            },

            //选择的 权限树 
            handleCheckChange(data, checked, indeterminate, array = []) {
                return false;
                if (!data.parentId && checked) {  //处理根节点全选的时候 ID
                    array.push(data.id);
                    data.value.forEach((element, index) => {
                        array.push(element.permissionId);
                    });
                    this.data['permissionId'] != null ? this.data['permissionId'] = this.data.permissionId.concat(array) : this.data['permissionId'] = array;
                } else {  //处理 子节点的点击事件
                    if (checked) {
                        if (data.parentId) {
                            array.push(data.id); array.push(data.parentId);
                            this.data['permissionId'] != null ? this.data['permissionId'] = this.data.permissionId.concat(array) : this.data['permissionId'] = array;
                        }
                    } else {
                        if (this.data['permissionId'] != null) {
                            let arr = Array.from(new Set(this.data['permissionId']));
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] == data.id) {
                                    arr.splice(i, 1);
                                }
                            }
                            // this.data['permissionId'] = arr;
                        }
                    }
                }
                // console.log(this.data['permissionId']);
                // console.log(Array.from(new Set(this.data['permissionId'])));
            },
            // 编辑 物料信息
            checkChang(params) {
                console.log(params);
                params['machinePic'] = this.data['machinePic'];
                axios.post('update_machine', qs.stringify(params)).then(params => {
                    if (params.data.state == 200) {
                        is.ISuccessfull(params.data.msg);
                        is.SearchTableAndVisible = false;
                        is.formDatas = {};
                        is.list();
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            roleformDataTree(params) {
                let xml = [], setup = {}, arr = [];
                this.$refs.tree.getCheckedNodes().forEach((element, index) => {  // 二级 权限
                    xml.push(element.id);
                    if (element.value != null) {  //选择 父类下全部子类
                        element.value.forEach((e, i) => {
                            xml.push(e.permissionId);
                        })
                    } else if (element.parentId != -1) {  //单选一个父集合的其中一个子类
                        xml.push(element.parentId);
                    }
                })
                // .replace(/^(\s|[])+|(\s|[])+$/g, '')
                // xml = Array.from(new Set(xml));
                arr = JSON.stringify(Array.from(new Set(xml))).split('[')[1];
                arr = arr.split(']')[0];
                params['roleId'] = this.data.roleId;
                params['permissionIds'] = arr;
                params['setupType'] = 1;

                setup['roleId'] = this.data.roleId;
                setup['setupType'] = 2;

                axios.post('setup_role_permission', qs.stringify(params)).then(params => {
                    if (params.data.state == 200) {
                        //资源权限赋予
                        axios.post('resource_permission_list', {}).then(params => {
                            arr = [];
                            if (params.data.state == 200) {
                                let __arr__ = [];
                                params.data.list.forEach(element => {
                                    __arr__.push(element.permissionId)
                                })
                                arr = JSON.stringify(Array.from(new Set(__arr__))).split('[')[1];
                                arr = arr.split(']')[0];
                                setup['permissionIds'] = arr;
                                axios.post('setup_role_permission', qs.stringify(setup));
                            }
                        })
                        is.ISuccessfull(params.data.msg);
                        is.TableAndVisible = false;
                        is.formDatas = {};
                        is.data = {};
                        is.list();
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            //更新 设备信息
            updateMachine(params, xml = {}) {
                xml = params;
                xml['_emjoy_'] = [];
                xml['_emjoy_'] = JSON.stringify(this.data.repairsTypeIds).split('[')[1];
                xml['_emjoy_'] = xml['_emjoy_'].split(']')[0];
                xml['repairsTypeIds'] = xml['_emjoy_'].replace(/\"/g, "");
                delete xml['_emjoy_'];
                xml['machinePic'] = this.data.machinePic || xml.machinePic;  //类型图片

                axios.post('update_machine', qs.stringify(xml)).then(params => {
                    if (params.data.state == 200) {
                        is.ISuccessfull(params.data.msg);
                        is.SearchTableAndVisible = false;
                        is.SearchTableFormData = {};
                        is.data = {};
                        is.list();
                    } else {
                        is.IError(params.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            // 资源权限提交
            rosRoleformDataTree(params) {
                let permissionId = this.data['rosPermissionId'], arr = [], datas = {};
                arr = JSON.stringify(permissionId).split('[')[1];
                arr = arr.split(']')[0];

                datas['roleId'] = this.data.roleId;
                datas['setupType'] = 2;
                datas['permissionIds'] = arr;

                axios.post('setup_role_permission', qs.stringify(datas)).then(params => {
                    this.data = {};
                    if (params.data.state === 200) {
                        this.detailTableAndVisible = false;
                        is.ISuccessfull(params.data.msg);
                    } else {
                        is.IError(params.data.msg);
                    }
                }).catch(function (error) {
                    is.IError(error);
                });
            },
            // 数据权限提交
            dataRoleformDataTree(params) {
                axios.get('setup_role_data_permission', {
                    params: {
                        roleId: this.data.roleId,
                        dataPermissionId: this.data['dataPermissionId']
                    }
                }).then(params => {
                    this.data = {};
                    if (params.data.state === 200) {
                        this.SearchTableAndVisible = false;
                        is.ISuccessfull(params.data.msg);
                    } else {
                        is.IError(params.data.msg);
                    }
                }).catch(function (error) {
                    is.IError(error);
                });
            },


            machineSceneSuccess(e) {
                if (e.state != 200) {
                    this.IError(e.msg);
                    return false;
                }
                this.data['machinePic'] = e.data.path;
            },

            handlePictureCardPreview(file) {  //点击查看放大的时候
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            fileExceed() {
                this.IError('单图上传');
            },
            fileChange() {

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },

            handleSelectionChange(params) {
                this.data['rosPermissionId'] = [];
                this.data['repairsTypeIds'] = [];
                params.forEach(element => {
                    this.data['repairsTypeIds'].push(element.repairsTypeId || element.demandChargeId || element.demandId);
                    this.data['rosPermissionId'].push(element.permissionId);
                })
            },

            handleSelectionChanges(params) {
                this.data['dataPermissionId'] = '';
                this.data['dataPermissionId'] = params[0].dataPermissionId;
            },

            //模板下载文件
            hrefDown(params) {
                if (params) {
                    parent.window.open('../file/template.csv', '_blank');
                } else {
                    parent.window.open('../file/templates.csv', '_blank');
                }
            },

            repair(params) {  //报修 信息 详情
                axios.get('repairs_detail', {
                    params: {
                        repairsId: params
                    }
                }).then(params => {
                    if (params.data.state === 200) {
                        this.UpdateTableAndVisible = true;
                        this.formData = params.data.data;
                    } else {
                        is.IError(params.data.msg);
                    }
                }).catch(function (error) {
                    is.IError(error);
                });
            },

            // 订单推送
            workpush(params) {
                axios.post('admin_work_push', qs.stringify({
                    adminId: params
                })).then(params => {
                    if (params.data.state === 200) {
                        is.ISuccessfull(params.data.msg);
                        is.list();
                    } else {
                        is.IError(params.data.msg);
                    }
                }).catch(function (error) {
                    is.IError(error);
                });
            },

            /**
             * machineOfferExplain  报价参考详情
             * **/
            machineOfferExplain(params) {
                this.SearchTableAndVisible = true;
                this.SearchTableFormData = {};
                this.search({ url: "sys_repairs_type_list" })
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.options.forEach((ele, index) => {
                            if (!params) return;
                            if (ele.repairsTypeId == params.repairsId) {
                                this.getTemplateRow(ele);
                            }
                        })
                    }, 1000)
                })
                // 以上是打开 视图，更新保修类型列表
                // 以下是回来的文本
                if (!params) return;
                axios.get("sys_machine_offer_explain_detail", {
                    params: {
                        machineOfferExplainId: params.machineOfferExplainId
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        res.data.data['offerExplain'] == -1 ? res.data.data['offerExplain'] = "无" :
                            (() => {
                                this.changeInputValueDatas = JSON.parse(decodeURI(ym.init.COMPILESTR.decrypt(res.data.data.offerExplain)));
                                let arr = []; this.inputArrays = [];
                                this.sortArr(this.changeInputValueDatas, 'parentIndex').forEach((element, index) => {
                                    arr.push({
                                        inputArray: element
                                    });
                                })
                                this.$nextTick(() => {
                                    this.inputArrays = arr;
                                })
                                // console.log(this.inputArrays)
                            })()

                        res.data.data['offerContent'] == -1 ? res.data.data['offerContent'] = "无" : null;
                        this.SearchTableFormData = res.data.data;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            /**
             * demandChargeId  收费详情
             * **/
            payserverdetails(params) {
                this.SearchTableAndVisible = true;
                this.SearchTableFormData = {};
                this.search({ url: "sys_demand_list" })
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.option = this.options;
                        this.option.forEach((ele, index) => {
                            this.$nextTick(() => {
                                if (!params) return;
                                if (params.demandId == ele.demandId) {
                                    this.getTemplateRows(ele);
                                }
                            })
                        })
                    }, 700)
                })
                if (!params) return;
                axios.get("sys_demand_charge_detail", {
                    params: {
                        demandChargeId: params.demandChargeId
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        res.data.data['price'] = parseFloat(res.data.data['price'] / 100).toFixed(2);
                        res.data.data['prices'] = res.data.data['price'];
                        res.data.data['contenta'] = res.data.data['content'].split('|')[0];
                        if (res.data.data['content'].split('|').length > 1) {
                            res.data.data['contents'] = res.data.data['content'].split('|')[1];
                        }
                        this.SearchTableFormData = res.data.data;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            /**
             * 更新 / 新增收费
             * **/
            paysubmit(params) {
                params['repairsId'] = this.tableRadio.repairsTypeId; // 设备报修id
                params['demandId'] = this.tableRadios.demandId; // 设备报修id
                params['content'] = params.contenta + '|' + params.contents;  //组个参考价
                this.data = params;
                this.data['price'] = parseFloat(this.data['prices'] * 100).toFixed(0);
                this.data['status'] = 1; //暂定
                axios.post(params.demandChargeId ? "update_demand_charge" : "create_demand_charge", qs.stringify(this.data)).then(res => {
                    if (res.data.state == 200) {
                        this.data = {};
                        this.SearchTableAndVisible = false;
                        this.ISuccessfull(res.data.msg);
                        this.list()
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            /**
             * 更新 / 新增 报价参考
             * **/
            reference(params) {
                // console.log(params);
                params['offerExplain'] = encodeURI(ym.init.COMPILESTR.encryption(JSON.stringify(this.changeInputValueDatas)));
                params['repairsId'] = this.tableRadio.repairsTypeId; // 设备报修id
                this.data = params;
                this.data['status'] = 1; //暂定
                axios.post(params.machineOfferExplainId ? "update_machine_offer_explain" : "create_machine_offer_explain", qs.stringify(this.data)).then(res => {
                    if (res.data.state == 200) {
                        this.data = {};
                        this.SearchTableAndVisible = false;
                        this.ISuccessfull(res.data.msg);
                        this.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            sortArr(arr, str) {
                var _arr = [],
                    _t = [],
                    // 临时的变量
                    _tmp;

                // 按照特定的参数将数组排序将具有相同值得排在一起
                arr = arr.sort(function (a, b) {
                    var s = a[str],
                        t = b[str];
                    return s < t ? -1 : 1;
                });
                if (arr.length) {
                    _tmp = arr[0][str];
                }
                // 将相同类别的对象添加到统一个数组
                for (var i in arr) {
                    if (arr[i][str] === _tmp) {
                        _t.push(arr[i]);
                    } else {
                        _tmp = arr[i][str];
                        _arr.push(_t);
                        _t = [arr[i]];
                    }
                }
                // 将最后的内容推出新数组
                _arr.push(_t);
                return _arr;
            },

            inputArrayChange(params) {  //优惠券 添加行数
                let _array_ = this.inputArrays[params].inputArray;
                _array_.push({
                    value: '',
                    name: ''
                })
                //  this.inputArrays.inputArray;
                this.$nextTick(function () {
                    this.inputArray = _array_;
                })
            },
            inputArrayChanges(params) {  //优惠券 添加行
                let _array_ = this.inputArrays;
                _array_.push({
                    value: '',
                    name: '',
                    inputArray: [
                        {
                            value: '',
                            name: '',
                        }
                    ]
                })
                this.$nextTick(function () {
                    this.inputArrays = _array_;
                })
            },
            changeInputValues(params, index, parentIndex) {   //添加的表单 value
                let _arr_ = [], bool = true;
                if (this.changeInputValueDatas.length > 0) {
                    this.changeInputValueDatas.forEach((element, i) => {
                        _arr_.push(element);
                        if (element.parentIndex == parentIndex) {
                            if (element.index == index) {
                                _arr_.splice(i, 1, {
                                    value: params,
                                    index: index,
                                    parentIndex: parentIndex
                                });
                                bool = false;
                            };
                        };  //先清除掉之前的内容稍后执行添加 

                    })
                    // console.log(this.changeInputValueDatas.length == index)
                    if (bool) {
                        _arr_.push({
                            value: params,
                            index: index,
                            parentIndex: parentIndex
                        })
                    }
                    this.changeInputValueDatas = _arr_;
                    return false;
                }
                this.changeInputValueDatas.push({
                    value: params,
                    index: index,
                    parentIndex: parentIndex
                })

            },

            inputArrayChangeDelete(params, index) {  //删除列表以及内容
                this.inputArrays[params].inputArray.splice(index, 1);  //删除列表
                this.changeInputValueDatas.forEach((element, eq) => {
                    if (element.parentIndex == params) {
                        if (element.index == index) {
                            this.changeInputValueDatas.splice(eq, 1); //删除已经填写的内容
                        }
                    }
                });
            },

            inputArrayChangeDeletes(params) {  //删除列表以及内容
                this.inputArrays.splice(params, 1);  //删除列表
                this.changeInputValueDatas.forEach((element, eq) => {
                    if (element.parentIndex == params) {
                        this.changeInputValueDatas.splice(eq, 1); //删除已经填写的内容
                    }
                });
            },



            /**
             *  首页广告详情
             * **/
            advdetails(params) {
                console.log(params)
                axios.get("sys_advertising_detail", {
                    params: {
                        advertisingId: params.id
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        this.SearchTableAndVisible = true;
                        this.imageList.machinePic.push({ name: 'machinePic', url: res.data.data.advertisingUrl }); //TAG 图片
                        this.SearchTableFormData = res.data.data;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            /**
             * 更新 / 新增 首页广告
             * **/
            advsubmit(params) {
                params['advertisingUrl'] = this.data.machinePic || params.advertisingUrl;
                this.data = params;
                params.id ? this.data['advertisingId'] = params.id : null;
                axios.post(params.id ? "update_advertising" : "create_advertising", qs.stringify(this.data)).then(res => {
                    if (res.data.state == 200) {
                        this.data = {};
                        this.SearchTableAndVisible = false;
                        this.ISuccessfull(res.data.msg);
                        this.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            /**
             *  师傅详情
             * **/
            masterdetails(params) {
                axios.get("sys_maintainer_detail", {
                    params: {
                        maintainerId: params.id
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        this.SearchTableAndVisible = true;
                        this.SearchTableFormData = res.data.data;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },
            /**
            * 更新 / 新增 维修师傅
            * **/
            mastersubmit(params) {
                this.data = params;
                params.id ? this.data['maintainerId'] = params.id : null;
                axios.post(params.id ? "update_maintainer" : "create_maintainer", qs.stringify(this.data)).then(res => {
                    if (res.data.state == 200) {
                        this.data = {};
                        this.SearchTableAndVisible = false;
                        this.ISuccessfull(res.data.msg);
                        this.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            /**
             * 工单退款
             * **/
            refundorder: function (params) {
                console.log(params)
                if (params.workId) {
                    this.UpdateVisible = true;
                    params['refund'] = params['paymentStr'];
                    this.SearchTableFormData = params;
                    return
                }
                params['refund'] = parseFloat(params['refund'] * 100).toFixed(0);
                axios.post("order_refund", qs.stringify(params)).then(res => {
                    if (res.data.state == 200) {
                        this.UpdateVisible = false;
                        this.ISuccessfull(res.data.msg);
                        this.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            /**
             * 工单沟通
             * **/
            contactorder(params) {
                if (!params.contactContent) {
                    this.adoptModule = true;
                    this.DataVisible['workId'] = params.workId;
                    return false;
                }
                axios.get("contact_work", {
                    params: {
                        workId: params.workId,
                        contactContent: params.contactContent
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        this.ISuccessfull(res.data.msg);
                        this.adoptModule = false;
                        this.UpdateTableAndVisible = false;
                        this.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            /**
             * 工单派单
             * **/
            goorder(params) {
                if (!params.work) {
                    this.SearchTableAndVisible = true;
                    this.SearchTableFormData = {};
                    this.SearchTableFormData['workId'] = params.workId;
                    this.search({ url: 'sys_maintainer_list' })
                    return false;
                }
                axios.get("send_work", {
                    params: {
                        workId: params.work,
                        maintainerId: this.tableRadio.id || null
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        this.ISuccessfull(res.data.msg);
                        this.SearchTableAndVisible = false;
                        this.UpdateTableAndVisible = false;
                        this.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            /**
             * 工单完成
             * **/
            denorder(params) {
                if (!params.payments) {
                    this.TableAndVisible = true;
                    this.SearchTableFormDatas.workId = params.workId
                    return false;
                }
                params['payment'] = parseFloat(params.payments * 100).toFixed(0);
                delete params.payments;
                axios.get("complete_work", {
                    params: {
                        workId: params.workId,
                        payment: params.payment
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        this.ISuccessfull(res.data.msg);
                        this.TableAndVisible = false;
                        this.UpdateTableAndVisible = false;
                        this.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            /**
             * 工单取消
             * **/
            celorder(params) {
                if (!params.work) {
                    this.detailTableAndVisible = true;
                    params['work'] = params.workId;
                    this.DataVisible = params
                    if (params.orderCount < 1) return;
                    this.search({ url: "sys_work_order_list", workId: params.workId });
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.optiones = this.options;
                        }, 1000)
                    })
                    return false;
                }
                axios.post("cancel_work", qs.stringify({
                    workId: params.workId,
                    cancelContent: params.cancelContent,
                    needRefund: params.needRefund,
                    orderId: params.needRefund == 0 ? -1 : this.tableRadio.orderId,
                    refund: params.needRefund == 0 ? 0 : parseFloat(params.refund * 100).toFixed(0)
                })).then(res => {
                    if (res.data.state == 200) {
                        this.ISuccessfull(res.data.msg);
                        this.detailTableAndVisible = false;
                        this.UpdateTableAndVisible = false;
                        this.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            /**
             * 工单详情
             * **/
            orderdest(params) {
                this.UpdateTableAndVisible = true;
                axios.get("sys_work_detail", {
                    params: {
                        workId: params.workId
                    }
                }).then(res => {
                    if (res.data.state == 200) {
                        let __arr__ = [];
                        if (res.data.data.faultPartPic != -1) {
                            res.data.data.faultPartPic = res.data.data.faultPartPic.split(',')
                            __arr__ = res.data.data.faultPartPic;
                        }
                        if (res.data.data.machineBrandPic != -1) {
                            res.data.data.machineBrandPic = res.data.data.machineBrandPic.split(',')
                            __arr__.concat(__arr__, res.data.data.machineBrandPic)
                        }
                        if (res.data.data.machineOverallPic != -1) {
                            res.data.data.machineOverallPic = res.data.data.machineOverallPic.split(',')
                            __arr__.concat(__arr__, res.data.data.machineOverallPic)
                        }
                        res.data.data['srcList'] = __arr__;
                        this.formData = res.data.data;
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            /**
             * 工单订单
             * **/
            order(params) {
                this.dialogVisible = true;
                this.search({ url: "sys_work_order_list", workId: params.workId });
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.option = this.options;
                    }, 1000)
                })
            },

            /**
             * 冻结操作统一操作
             * URL  : https://  冻结作用域地址
             * TAG ID Number MIT : 冻结参数名称
             * **/
            pullblack(params, dataBlock = {}) {
                dataBlock[params.TAG] = params.NUMBER;
                axios.get(params.URL, {
                    params: dataBlock
                }).then(res => {
                    if (res.data.state == 200) {
                        is.ISuccessfull = true;
                        is.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },

            /**
             * 删除统一操作
             * URL  : https://  删除作用域地址
             * TAG ID Number MIT : 删除参数名称
             * **/
            deletedata(params, dataBlock = {}) {
                dataBlock[params.TAG] = params.NUMBER;
                axios.get(params.URL, {
                    params: dataBlock
                }).then(res => {
                    if (res.data.state == 200) {
                        is.ISuccessfull = true;
                        is.list();
                    } else {
                        is.IError(res.data.msg);
                    }
                })
                    .catch(function (error) {
                        is.IError(error);
                    })
            },


            /**
             * 关闭统一操作
             * **/
            handleClose(deno) {
                delete this.formData.work;
                delete this.DataVisible.contactContent;
                deno();
            },


        }
    });
}, false)


window.onload = () => {
    document.querySelector('#c-container-list').style.display = 'block';
};