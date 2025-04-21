sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("app.mayank55.controller.App", {
      onInit() {
          this._getData();
      },
      _getData: function () {
          let entitySet = "/ZMD_MININGSet";
          let oModel = this.getOwnerComponent().getModel();
          oModel.read(entitySet, {
              success: (oData, response) => {
                  var oModelData = new sap.ui.model.json.JSONModel(oData.results);
                  this.getView().setModel(oModelData, "MiningDataSet");
              },
              error: () => { }
          });
      }
  });
});
