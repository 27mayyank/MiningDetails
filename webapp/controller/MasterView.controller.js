sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/model/Sorter"
], (Controller, Filter, FilterOperator, MessageBox, Sorter) => {
    "use strict";
 
    return Controller.extend("app.mayank55.controller.MasterView", {
        // onInit() {
        //     let enititySet="/MiningDataSet"
        //     let oModel = this.getOwnerComponent().getModel();
        //     oModel.read(enititySet, {
        //         success: (oData, response) => {
        //             var oModelData = new sap.ui.model.json.JSONModel(oData.results);
        //             this.getView().setModel(oModelData, "MiningSet");
        //         },
        //         error: () => {}
        //     })
        // }
        onInit() {
            let oRouter = this.getOwnerComponent().getRouter();
            let oRoute = oRouter.getRoute("RouteMasterView");
            oRoute.attachPatternMatched(this._onPatternMatched, this);
           
        },
 
        _onPatternMatched: function () {
            this._getData();
           
        },
 
        _getData: function () {
            let enititySet = '/ZMD_MININGSet';
            let oModel = this.getOwnerComponent().getModel();
            oModel.read(enititySet, {
                success: (oData, response) => {
                    var oModelData = new sap.ui.model.json.JSONModel(oData.results);
                    this.getView().setModel(oModelData, "MiningDataSet");
                },
                error: () => { }
            })
        },
        onFormView: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteCreateView");
        },
        onItemSelect: function(oEvent){
            var oList=oEvent.getParameter("listItem");
            var sPath=oList.getBindingContextPath();
            let aItems=sPath.split("/")
                let id=aItems[aItems.length-1]
 
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetailView", {
                index:id
            })
        },
        onSearch: function(oControlEvent){
            var oSearchStr = oControlEvent.getParameter("query") || oControlEvent.getParameter("newValue");
            var oName = new Filter("LocationId", FilterOperator.Contains, oSearchStr);
            var oAvail = new Filter("LocationDescription", FilterOperator.Contains, oSearchStr);
            var aFilter = [oName, oAvail];
            var oMainFilter = new Filter({
                filters: aFilter,
                and: false
            });
            var oList = this.getView().byId("list");
            var oBindList = oList.getBinding("items");
            oBindList.filter(oMainFilter);
        },
        onFilter: function(){
            if (!this.bDescending) {
                this.bDescending = false;
            }
 
            var oSorter = new Sorter("LocationId", this.bDescending);
            var oList = this.getView().byId("list");
            var oBinding = oList.getBinding("items");
            oBinding.sort(oSorter);
            this.bDescending = !this.bDescending;
        },
        onDeleteItem: function(oEvent){

            let oContext = oEvent.getSource().getBindingContext("MiningDataSet").getObject()
            let that = this
            MessageBox.confirm("Are you sure about deleting this Entry", {
                onClose: function (choice) {
                    if (choice === 'OK') {
                        this._onDeleteCall(oContext)
                    }
                }.bind(that)
            })
        },
        _onDeleteCall: function (parm) {
            let key1 = parm.LocationId
            var key2 = parm.LocationDescription
            let key3 = parm.MiningResourceAllocated
            key2 = key2.replace(/ /g, "%20")

            let oModel = this.getOwnerComponent().getModel()
            let entity = "/ZMD_MININGSet(LocationId='" + key1 + "',LocationDescription='" + key2 + "',MiningResourceAllocated='" + key3 + "')"
            //"http://zin-blr-srv1:8001/sap/opu/odata/sap/ZAAKA_MININGDETAILS_SRV/MiningDataSet(LocationId='203',LocationDescription='RUBY%20HILLS',MineralResource='SILVER')"
            let that=this
            oModel.remove(entity, {
                success: (resp) => {
                    MessageBox.success("Deleted Successfully", {
                        onClose: function () {
                            let oRouter = that.getOwnerComponent().getRouter();
                            oRouter.navTo("RouteMasterView", {}, true);
                        }.bind(this)
                    })
                },
                error: (error) => {
                    MessageBox.error("Deletion Failed")
                }
            })

        },
        onTableView: function(){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteCrudView");
        }
    });
});