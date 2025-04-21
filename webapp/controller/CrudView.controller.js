sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], (Controller, Filter, FilterOperator, MessageBox) => {
    "use strict";

    return Controller.extend("app.mayank55.controller.CrudView", {
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
        onCreate: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteCreateView");
        },
        onSearch: function () {
            let aFilter = []
            let sLid = this.getView().byId("idLID").getValue()
            let sLdesc = this.getView().byId("idLDesc").getValue()

            if (sLid) {
                let filterName = new Filter("LocationId", FilterOperator.Contains, sLid)
                aFilter.push(filterName)
            }
            if (sLdesc) {
                let filterName = new Filter("LocationDescription", FilterOperator.Contains, sLdesc)
                aFilter.push(filterName)
            }

            let oTable = this.getView().byId("idTab")
            let bindingInfo = oTable.getBinding("items")
            if (bindingInfo) {
                bindingInfo.filter(aFilter);
            }
        },
        onDelete: function (oEvent) {
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

            oModel.remove(entity, {
                success: (resp) => {
                    MessageBox.success("Deleted Successfully", {
                        onClose: function () {
                            this._getData()
                        }.bind(this)
                    })
                },
                error: (error) => {
                    MessageBox.error("Deletion Failed")
                }
            })

        },

        onUpdate: function (oEvent) {
            var oButton = oEvent.getSource(); // Get the button that was clicked
            var oContext = oButton.getBindingContext("MiningDataSet"); // Get the binding context of the button
            var sPath = oContext.getPath(); // Get the path of the context
            let aItems = sPath.split("/");
            let id = aItems[aItems.length - 1];

            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteUpdateView", {
                index: id
            });

        },
        onRevert: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteMasterView");
        },
        onDetailCrud: function (oEvent) {
            var oList = oEvent.getParameter("listItem");
            var sPath = oList.getBindingContextPath();
            let aItems = sPath.split("/")
            let id = aItems[aItems.length - 1]

            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetailView", {
                index: id
            })
        }
    });
});