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
        onF4Help: function(){
            this.inputFiled=oEvent.getSource().getId()
            let oModel=this.getView().getModel("MiningDataSet")
            let aData=oModel.getProperty("/MiningResourceAllocated")
            let deepCopy=JSON.parse(JSON.stringify(aData))
            let oModelFrag=new JSONModel({newSuppSet:deepCopy})
            if(!this.oDiolog){
                this.oDiolog=Fragment.load({
                    fragmentName:"app.mayank55.fragments.popUp",
                    controller:this
                }).then((dialog)=>{
                    this.oDiolog=dialog
                    this.getView().addDependent(this.oDiolog)
                    this.getView().setModel(oModelFrag, "FragmentModel")
                    this.oDiolog.open()
                })
            }else{
                this.oDiolog.open()
            }
        }
 
    });
});