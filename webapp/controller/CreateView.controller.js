sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "app/mayank55/validator/Validator"
], (Controller, MessageBox, Validator) => {
    "use strict";

    return Controller.extend("app.mayank55.controller.CreateView", {
        onInit() {
            // Add event listeners to reset ValueState on input change
            this.getView().byId("id1").attachChange(this.resetValueState, this);
            this.getView().byId("id2").attachChange(this.resetValueState, this);
            this.getView().byId("id3").attachChange(this.resetValueState, this);
            this.getView().byId("id4").attachChange(this.resetValueState, this);
            this.getView().byId("id5").attachChange(this.resetValueState, this);
            this.getView().byId("id6").attachChange(this.resetValueState, this);
            this.getView().byId("id7").attachChange(this.resetValueState, this);
        },

        resetValueState: function (oEvent) {
            oEvent.getSource().setValueState("None");
        },

        resetAllValueStates: function () {
            this.getView().byId("id1").setValueState("None");
            this.getView().byId("id2").setValueState("None");
            this.getView().byId("id3").setValueState("None");
            this.getView().byId("id4").setValueState("None");
            this.getView().byId("id5").setValueState("None");
            this.getView().byId("id6").setValueState("None");
            this.getView().byId("id7").setValueState("None");
        },

        clearAllFields: function () {
            this.getView().byId("id1").setValue("");
            this.getView().byId("id2").setValue("");
            this.getView().byId("id3").setValue("");
            this.getView().byId("id4").setValue("");
            this.getView().byId("id5").setValue("");
            this.getView().byId("id6").setValue("");
            this.getView().byId("id7").setValue("");
        },

        onSubmit: function () {
            // Get values from input fields
            var sLocID = this.getView().byId("id1");
            var sLocDes = this.getView().byId("id2");
            var sMR = this.getView().byId("id3");
            var sTC = this.getView().byId("id4");
            var sRP = this.getView().byId("id5");
            var sND = this.getView().byId("id6");
            var sTM = this.getView().byId("id7");

            let fields = [
                { id: "id1", value: sLocID.getValue() },
                { id: "id2", value: sLocDes.getValue() },
                { id: "id3", value: sMR.getValue() },
                { id: "id4", value: sTC.getValue() },
                { id: "id5", value: sRP.getValue() },
                { id: "id6", value: sND.getValue() },
                { id: "id7", value: sTM.getValue() }
            ];

            let invalidFields = Validator.validateFields(fields);
            if (invalidFields !== true) {
                invalidFields.forEach(function (fieldId) {
                    this.getView().byId(fieldId).setValueState("Error");
                }.bind(this));
                return;
            }

            // Format values
            sTC.setValue("$" + sTC.getValue());
            sND.setValue(parseInt(sND.getValue()));

            // Create payload
            let payLoad = {
                "LocationId": sLocID.getValue(),
                "LocationDescription": sLocDes.getValue(),
                "MiningResourceAllocated": sMR.getValue(),
                "TotalCost": sTC.getValue(),
                "ReportOfPossibleMineral": sRP.getValue(),
                "NumberOfDrills": sND.getValue(),
                "TypeOfMineral": sTM.getValue()
            };

            // Get model and entity
            let oModel = this.getOwnerComponent().getModel();
            let entity = "/ZMD_MININGSet";
            let that = this;

            // Submit data
            oModel.create(entity, payLoad, {
                success: function (resp) {
                    MessageBox.success("Successfully created an entry", {
                        onClose: ()=>{
                            this.clearAllFields();
                            let oRouter = that.getOwnerComponent().getRouter();
                            oRouter.navTo("RouteMasterView");
                        }
                    });
                },
                error: function (error) {
                    MessageBox.error("Error");
                }
            });
        },

        onPressButton: function() {
            // Reset all ValueStates and clear all fields when the create button is pressed
            this.resetAllValueStates();
            this.clearAllFields();
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteMasterView");
        }
    });
});
