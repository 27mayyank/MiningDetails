sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";
 
    return Controller.extend("app.mayank55.controller.UpdateView", {
        onInit() {
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
            let oRoute = oRouter.getRoute("RouteUpdateView");
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
        onNavUP: function(){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteMasterView");
        },
        onUpdate: function(oEvent) {
            let oContext = oEvent.getSource().getBindingContext("MiningDataSet").getObject();
            console.log("Context object:", oContext);
            this.onUpdateCall(oContext);
        },
        
        onUpdateCall: function(parm) {
            // Validation check
            if (!parm.LocationId || !parm.LocationDescription || !parm.MiningResourceAllocated || !parm.TotalCost || !parm.ReportOfPossibleMineral || !parm.NumberOfDrills || !parm.TypeOfMineral) {
                MessageBox.error("Please fill all the fields.");
                return;
            }
        
            let key1 = parm.LocationId;
            let key2 = parm.LocationDescription.replace(/ /g, "%20");
            let key3 = parm.MiningResourceAllocated;
            let NumberOfDrills2 = parseInt(parm.NumberOfDrills);
        
            let oModel = this.getOwnerComponent().getModel();
            let entity = `/ZMD_MININGSet(LocationId='${key1}',LocationDescription='${key2}',MiningResourceAllocated='${key3}')`;
        
            let updatedData = {
                TotalCost: parm.TotalCost,
                ReportOfPossibleMineral: parm.ReportOfPossibleMineral,
                NumberOfDrills: NumberOfDrills2,
                TypeOfMineral: parm.TypeOfMineral
            };
            console.log("Payload being sent:", updatedData);
        
            oModel.update(entity, updatedData, {
                method: "PATCH",
                success: (resp) => {
                    MessageBox.success("Record Updated", {
                        onClose: function() {
                            var oRouter = this.getOwnerComponent().getRouter();
                            oRouter.navTo("RouteMasterView", {}, true);
                        }.bind(this)
                    });
                },
                error: (err) => {
                    MessageBox.error("Update failed");
                }
            });
        },
        
        
        
    });
});