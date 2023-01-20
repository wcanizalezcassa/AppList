sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("applist.controller.View1", {
            onInit: function () {
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("./test/localService/mockdata/ListData.json");
                this.getView().setModel(oJSONModel);
            },
            getGroupHeader : function (oGroup) {
                var groupHeaderListItem = new sap.m.GroupHeaderListItem({
                    title : oGroup.key,
                    upperCase : true
                });
                return groupHeaderListItem
            },
            onShowSelectedRow : function () {
                var standarList = this.getView().byId("standarList");
                var selectedItems = standarList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {
                    var textMessage = i18nModel.getText("Selection")
                    for (var item in selectedItems) {
                        var context =selectedItems[item].getBindingContext();
                        var oContext = context.getObject();

                        textMessage = textMessage + "-" + oContext.Material;
                        sap.m.MessageToast.show(textMessage);
                    }
                }
            },
            onDeletedSelectedRow : function () {
                var standarList = this.getView().byId("standarList");
                var selectedItems = standarList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {
                    var textMessage = i18nModel.getText("Selection");
                    var model = this.getView().getModel();
                    var products = model.getProperty("/Products");

                    var arrayID = [] ;

                    for (var i in selectedItems){
                        var context =selectedItems[i].getBindingContext();
                        var oContext = context.getObject();
                        arrayID.push(oContext.Id);
                        textMessage = textMessage + "-" + oContext.Material;
                    }

                    products = products.filter(function(p){
                        return !arrayID.includes(p.Id);
                    });
                    model.setProperty("/Products", products);
                    standarList.removeSelections();
                        sap.m.MessageToast.show(textMessage);
                    }
                },
                onDeleteRow : function (oEvent) {
                    var selectedRow = oEvent.getParameter("listItem");
                    var context = selectedRow.getBindingContext();
                    var splitPath = context.getPath().split("/");
                    var indexSelectedRow = splitPath[splitPath.length-1];
                    var model = this.getView().getModel();
                    var products = model.getProperty("/Products");
                    products.splice(indexSelectedRow,1);
                    model.refresh();


                }
        });
    });
