sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "app/mayank55/validator/Validator"
], (Controller, MessageBox, Validator) => {
    "use strict";

    return Controller.extend("app.mayank55.controller.CreateView", {
        onInit() {
        },

        onSubmit: function () {
            let oView = this.getView();
            let fields = [
                { id: "id1", value: oView.byId("id1").getValue() },
                { id: "id2", value: oView.byId("id2").getValue() },
                { id: "id3", value: oView.byId("id3").getValue() },
                { id: "id4", value: oView.byId("id4").getValue() },
                { id: "id5", value: oView.byId("id5").getValue() },
                { id: "id6", value: oView.byId("id6").getValue(), type: "number" },
                { id: "id7", value: oView.byId("id7").getValue() }
            ];

            let validationResult = Validator.validateFields(fields);

            if (validationResult !== true) {
                validationResult.forEach(fieldId => {
                    oView.byId(fieldId).setValueState("Error");
                });
                return;
            }

            let payLoad = {
                "LocationId": fields[0].value,
                "LocationDescription": fields[1].value,
                "MiningResourceAllocated": fields[2].value,
                "TotalCost": fields[3].value,
                "ReportOfPossibleMineral": fields[4].value,
                "NumberOfDrills": parseInt(fields[5].value),
                "TypeOfMineral": fields[6].value
            };

            let oModel = this.getOwnerComponent().getModel();
            let entity = "/ZMD_MININGSet";
            let that = this;

            oModel.create(entity, payLoad, {
                success: function (resp) {
                    MessageBox.success("Successfully created an entry", {
                        onClose: function () {
                            that._clearFields();
                            let oRouter = that.getOwnerComponent().getRouter();
                            oRouter.navTo("RouteMasterView");
                        }
                    });
                },
                error: function (error) {
                    MessageBox.error("Error creating entry: " + error.message);
                }
            });
        },

        onPressButton: function () {
            this._clearFields();
            let oRoute = this.getOwnerComponent().getRouter();
            oRoute.navTo("RouteMasterView");
        },

        _clearFields: function () {
            let oView = this.getView();
            ["id1", "id2", "id3", "id4", "id5", "id6", "id7"].forEach(fieldId => {
                oView.byId(fieldId).setValue("");
                oView.byId(fieldId).setValueState("None");
            });
        }
    });
});
