sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], (Controller, Filter, FilterOperator, MessageBox) => {
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
            this._getData();
        },
        _getData: function () {
            let enititySet = "/ZMD_MININGSet"
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
            oRouter.navTo("RouteCrudView");
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
        onSearch: function(){
            
        }
    });
});