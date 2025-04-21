sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";
 
    return Controller.extend("app.mayank55.controller.CreateView", {
        onInit() {
        },
 
        onSubmit: function () {
            //get model
            //need entity
            //method(entity,payload())
 
            //Payload
            var oLocID = this.getView().byId("id1")
            var oLocDes = this.getView().byId("id2")
            var oMR = this.getView().byId("id3")
            var oTC = this.getView().byId("id4")
            var oRP = this.getView().byId("id5")
            var oND = this.getView().byId("id6")
            var oTM = this.getView().byId("id7")
 
            var sLocID = oLocID.getValue()
            var sLocDes = oLocDes.getValue()
            var sMR = oMR.getValue()
            var sTC = oTC.getValue()
            sTC="$"+sTC
            var sRP = oRP.getValue()
            var sND = oND.getValue()
            sND=parseInt(sND)
            var sTM = oTM.getValue()
 
            let payLoad = {
                "LocationId": sLocID,
                "LocationDescription": sLocDes,
                "MiningResourceAllocated": sMR,
                "TotalCost": sTC,
                "ReportOfPossibleMineral": sRP,
                "NumberOfDrills":sND,
                "TypeOfMineral":sTM
            }
 
            let oModel = this.getOwnerComponent().getModel()
            let entity = "/ZMD_MININGSet"
            let that=this
 
            oModel.create(entity, payLoad, {
                success: function (resp) {
                    MessageBox.success("Successfully created a entry",{
                        onClose:function(){
                            let oRouter = that.getOwnerComponent().getRouter()
                            oRouter.navTo("RouteMiningView")
                        }
                    })
                },
                error: function (error) {
                    MessageBox.error("Error")
                }
            })
 
        },
        onPressButton: function(){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteCrudView");
        }
    });
});