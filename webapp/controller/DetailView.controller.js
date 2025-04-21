sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",

], (Controller, JSONModel,Fragment) => {
    "use strict";
 
    return Controller.extend("app.mayank55.controller.DetailView", {
        onInit() {
           
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
            let oRoute = oRouter.getRoute("RouteDetailView");
           oRoute.attachPatternMatched(this._onPatternMatched, this);
 
         },
 
         onRouteMatched: function(oEvent){
            let index=oEvent.getParameter("arguments").index;
            let sPath= "MiningDataSet>/" + index;
            let oView=this.getView();
            oView.bindElement(sPath);
 
         },
         _onPatternMatched: function() {
            this._getData();
        },
 
 
         _getData:function(){
            let enititySet = `/MiningDataSet`;
            let oModel = this.getOwnerComponent().getModel();
            oModel.read(enititySet, {
                success: (oData, response) => {
                    var oModelData = new sap.ui.model.json.JSONModel(oData.results);
                    this.getView().setModel(oModelData, "MiningDataSet");
                },
                error: () => {}
            })
        },
        onListView: function(){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteMasterView");
        },
        onF4Help: function (oEvent) {
            // let myInputField where the popup actually popped up
            this.inputField = oEvent.getSource().getId();
            let enititySet = `/ZMD_MININGSet`;
            let oModel = this.getOwnerComponent().getModel();
       
            // Fetch data from OData model
            oModel.read(enititySet, {
              success: (oData) => {
                let deepcopy = JSON.parse(JSON.stringify(oData.results));
                let oModelFrag = new JSONModel({ newSupp: deepcopy });
       
                if (!this.oDialog) {
                  this.oDialog = sap.ui.core.Fragment.load({
                    fragmentName: "app.mayank55.fragments.popUp",
                    controller: this
                  }).then((dialog) => {
                    this.oDialog = dialog;
                    this.getView().addDependent(this.oDialog);
                    this.getView().setModel(oModelFrag, "FragModel");
                    this.oDialog.open();
                  });
                } else {
                  this.oDialog.open();
                }
              },
              error: (oError) => {
                // Handle error
                sap.m.MessageToast.show("Error fetching data");
              }

            });
        },
        onConfirmSupp: function (oEvent) {
 
            let oSelectedItems = oEvent.getParameter("selectedItem");
            let sValue = oSelectedItems.getProperty("info");
            let onInput = sap.ui.getCore().byId(this.inputField);
            onInput.setValue(sValue);
        }
          
    });
});