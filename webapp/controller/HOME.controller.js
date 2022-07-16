sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/routing/Router",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"COM/PLANTMAINTENACEPORTALPLANTMAINTENACEPORTAL/model/formatter"
], function(Controller,MessageBox,MessageToast,Router,Filter,FilterOperator,formatter) {
	"use strict";
	/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-console: "error" */
/* "parser": "@babel/eslint-parser" */
    
    var userWorkorder=[];
     var notification ; 
     var userId;
     var selectedNotifNo; 
     var selectedWorkOrderNo;
     var selectedEquipNo;
     var selectedNotifHeader ;
     var selectedWOHeader; 
     var selectedEquipHeader; 
     var WOHeaderFlag=0,NotifHeaderFlag=0,EquipHeaderFlag=0; 
     var userNotifObject;
	return Controller.extend("COM.PLANTMAINTENACEPORTALPLANTMAINTENACEPORTAL.controller.HOME", {   
		formatter:formatter,
		onInit:function(){
			console.log("this is from notify button"); 
			this.getRouter().getRoute("home").attachMatched(this.onRouteMatched,this); 
			
		  var arr=[] ; 
	 	  var page = this.getView().byId("detailDetail");
	 	  var oModel = new sap.ui.model.json.JSONModel(); 
	 	  oModel.setData(arr);
	 	  page.setModel(oModel); 
	 	  this.getView().addStyleClass("sapUiSizeCompact");
			
		// var notification;
	   
		//   var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_PM_INTERNPROJECT_SRV/", true);   
			
		// 	  	oModel.read("NOTIFICATIONHEADERSet?$filter=(Userid eq '100')&$format=json",{
		// 	 	                                         context: null, 
		// 	                                        	urlParameters : null, 
		// 	                                         	async : false, 
			 	
		// 	 	success : function(oData,oResponse){
			 		
		// 	 	              	console.log(oData);  
		// 	 	             	notification = oData.results;  
			 	                 
		// 	 	              	console.log("notification  is "); 
		// 	 	              	console.log(notification); 
			 		
		// 	 	                 },  // end of success call back , 
			 	                 
			 	                 
		// 	 	    error : function(oData,oResponse){ 
			 	    	
		// 	 	    	MessageBox.error("error");
			 	  
		// 	 	    }// end of error call back 
		// 	 });  // end of oModel.read 
	 //   var NotificationModel = new sap.ui.model.json.JSONModel();  
	    
	 //   NotificationModel.setData({
	 //   	"results":notification
	 //   });// end of set data function  
	    
	 //   this.getView().byId("idNotificationTable").setModel(NotificationModel);
	    
	    
		// console.log(notification);
	},// end of onInit function 
		
		getRouter:function(){
		    return sap.ui.core.UIComponent.getRouterFor(this); 
		    
		},
		onRouteMatched:function(oEvent){
		  
		  var oArguments = oEvent.getParameter("arguments"); 
		  var view = this.getView(); 
		  var data = oArguments.value;   
		  userNotifObject = JSON.parse(data);
	      console.log(data)
		  
		  userId = userNotifObject["Kunum"];
		  console.log("UserId is "+userId); 
		   var FirstPage = this.getView().byId("detail")
	 	    var FPModel = new sap.ui.model.json.JSONModel(); 
	 	    FPModel.setData(userNotifObject); 
	 	    FirstPage.setModel(FPModel,"usermodel"); 
		  
		  
		  
		  // start of odata fetching through userid 
		 
		  var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_PM_INTERNPROJECT_SRV/", true);   
		 // var URL = "NOTIFICATIONHEADERSet?$filter=(Userid eq '"+data+"')&$format=json"; 
		 //var URL = "USERNOTIFCATIONSet?$filter=Kunum eq '900375_101'&$format=json";
		 var URL = "USERNOTIFCATIONSet?$filter=Kunum eq '"+userId+"'&$format=json";
			  	oModel.read(URL,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			 	success : function(oData,oResponse){
			 		
			 	              	console.log(oData);  
			 	             	notification = oData.results;  
			 	                 
			 	              	console.log("notification  is "); 
			 	              	console.log(notification); 
			 		
			 	                 },  // end of success call back , 
			 	                 
			 	                 
			 	    error : function(oData,oResponse){ 
			 	    	
			 	    	MessageBox.error("error");
			 	  
			 	    }// end of error call back 
			 });  // end of oModel.read 
		  console.log("hello from notifications"); 
		  console.log(notification)
		   var NotificationModel = new sap.ui.model.json.JSONModel();  
	    
	    NotificationModel.setData({
	    	"results":notification
	    });// end of set data function  
	    
	    this.getView().byId("idNotificationTable").setModel(NotificationModel);
	    console.log(this.getView().byId("idNotificationTable").getModel()); 
	    
	    
	 	    
	 	   
	 	  
	 	    
	 	    
	    
		}, // end of omodel
		
		onPressNavToDetail: function () {
			this.getSplitContObj().to(this.createId("detailDetail"));
		},

		onPressDetailBack: function () {
			this.getSplitContObj().backDetail();
		},

		onPressMasterBack: function () {
			this.getSplitContObj().backMaster();
		},

		onPressGoToMaster: function () {
			this.getSplitContObj().toMaster(this.createId("master2"));
		},

		onListItemPress: function (oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
            console.log("sToPageId is "+sToPageId)
            if(sToPageId === "detail2"){
            var ProfilePage = this.getView().byId("detail2")
	 	    var ProfileModel = new sap.ui.model.json.JSONModel(); 
	 	    ProfileModel.setData(userNotifObject); 
	 	    ProfilePage.setModel(ProfileModel,"profilemodel"); 
            }
			this.getSplitContObj().toDetail(this.createId(sToPageId));
		},

		onPressModeBtn: function (oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

			this.getSplitContObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, { duration: 5000 });
		},

		getSplitContObj: function () {
			var result = this.byId("SplitContDemo");
			if (!result) {
				Log.error("SplitApp object can't be found");
			}
			return result;
		},
			
		notify:function(){
		MessageBox.success("Button was pressed");
	},// end of notify function 
	
	onAdd:function(){
			MessageBox.success("Add function was pressed");
	},//end of onAdd function
	
	onSort:function(){
			MessageBox.success("Sort was pressed");
	}, // end of onSort function 
	
	onSearch:function(oEvent){
		//	MessageBox.success("search was pressed"); 
		
		   
		    var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			console.log(sQuery);
			if (sQuery && sQuery.length>0) {
			    aFilter.push(  new Filter({
			    	path:"Qmnum",
			    	operator:FilterOperator.Contains, 
			    	value1:sQuery,
			    }) 
			    ); 
				console.log(sQuery);
			}
			   var oNotificationList = this.getView().byId("idNotificationList");
			   var bindingItems = oNotificationList.getBindingContext("items");
			   bindingItems.filter(aFilter);
			// var oTableSearchState = [],
			// 	sQuery = oEvent.getParameter("query");
			// 	console.log(sQuery);
				

			// if (sQuery && sQuery.length > 0) {
			// 	oTableSearchState = [new Filter("Notifid", FilterOperator.Contains, sQuery)];
			// }

	
			
	
	},// end of onSearch functions  
	 onTablePress:function(evt){
	 		MessageBox.success("Item Pressed");
	 	    var obj = evt.getSource().getCells()[0];
	 	    var index = parseInt(obj.sId.split("-").slice(-1)[0]); 
	 	    var selectedNotifID = evt.getSource().getCells()[0].getText();
	 	    var notificationData = this.getView().byId("idNotificationTable").getModel().getData()["results"]; 
	 	    var selectedRowData = notificationData[index]; 
	 	    
	 	    selectedNotifNo = selectedRowData["Qmnum"];
	 	    selectedWorkOrderNo = selectedRowData["Aufnr"];  
	 	    selectedEquipNo = selectedRowData["Equnr"];
	 	    
	 	    
	 	    
	 	    
	 	  var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_PM_INTERNPROJECT_SRV/", true);   
		  var URL = "NOTIFHEADERSet('"+selectedNotifNo+"')?$format=json";
	
			  	oModel.read(URL,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			 	success : function(oData,oResponse){
			 		
			 	              	console.log(oData);  
			 	             	 selectedNotifHeader = oData;  
			 	                 NotifHeaderFlag=1; 
			 	              	console.log("notification  is "); 
			 	              	console.log(selectedNotifHeader); 
			 		
			 	                 },  // end of success call back , 
			 	                 
			 	                 
			 	    error : function(oData,oResponse){ 
			 	    	
			 	    	MessageBox.error("error");
			 	  
			 	    }// end of error call back 
			 });  // end of oModel.read 
	 	    
	 	    
	 	    
	 	    //var data = "helo";
	 	    console.log(selectedNotifHeader);
	 	   
	 
	 	    var oPage = this.getView().byId("detailDetail")
	 	    var oModel = new sap.ui.model.json.JSONModel(); 
	 	    oModel.setData(selectedNotifHeader); 
	 	    oPage.setModel(oModel,"notifymodel"); 
	 	    
	 	    console.log(this.getView().byId("detailDetail").getModel("notifymodel").getData()); 
	 	    this.getSplitContObj().to(this.createId("detailDetail"));
	 	  
	 	  //working code 
	 	  
	 	  //var page = this.getView().byId("detailDetail");
	 	  //var page = this.getView();
	 	  //var oModel = new sap.ui.model.json.JSONModel(); 
	 	  //var data = {
	 	  //	"results":selectedRowData
	 	  //}
	 	  //oModel.setData(data);
	 	  //this.getView().setModel(oModel,"notifymodel"); 
	 	  //console.log("below")
	 	  
	 	  //console.log(this.getView().byId("detailDetail").getModel().getProperty("/")) 
	 	//  console.log(this.getView().getModel("notifymodel").getData());
	 	  
	 	    
	 	   // console.log("__identifier0-__component0---home--idNotificationTable-212".split("-").slice(-1)[0]) 
	 	  //console.log(this.getView().byId("idNotificationTable").getModel().getData());// working fine  
	 	  
	 	  
	 	  
	 	  
	 	
	   
	 	
	 	
	 }, // end of on table press  
	 
	 	onFilterSelect: function (oEvent) { 
	 		 var oBinding = this.byId("idNotificationTable").getBinding("items") ; 
	 		  var aFilters = [];
	 		  var sKey = oEvent.getParameter("key"); 
	 		  	if (sKey === "NotifHead" || sKey === "NotifProb" || sKey === "Plant") {
	 		  	     var oPage = this.getView().byId("detailDetail")
	 	             var oModel = new sap.ui.model.json.JSONModel(); 
	 	             oModel.setData(selectedNotifHeader); 
	 	             oPage.setModel(oModel,"notifymodel"); 
	 		  		
	 		  	}
	 		  else if (sKey === "Work" || sKey === "WorkMaint"){
	 		  	   if(WOHeaderFlag === 0){
	 		  	   	        
	 		  	   	         var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_PM_INTERNPROJECT_SRV/", true);   
		                     var URL = "WORKORDERSet('"+selectedWorkOrderNo+"')?$format=json";
		                   
	
			        	oModel.read(URL,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			      	success : function(oData,oResponse){
			 		            
			 		            console.log("Work order details");
			 	              	console.log(oData);  
			 	             	 selectedWOHeader = oData;  
			 	                 WOHeaderFlag = 1
			 	              	console.log("work order header is "); 
			 	              	console.log(selectedWOHeader); 
			 		
			 	                 },  // end of success call back , 
			 	                 
			 	                 
			 	    error : function(oData,oResponse){ 
			 	    	
			 	    	MessageBox.error("error");
			 	  
			 	    }// end of error call back 
			 });  // end of oModel.read  
			 
			 console.log("Finall Work order"); 
			 console.log(selectedWOHeader);
	 	    
	 	             var oPage = this.getView().byId("detailDetail")
	 	             var oModel = new sap.ui.model.json.JSONModel(); 
	 	             oModel.setData(selectedWOHeader); 
	 	             oPage.setModel(oModel,"notifymodel"); 
	 	    
	 		  }// end of WoHeaderFlag if  
	 	  else{
	 	  	         var oPage = this.getView().byId("detailDetail")
	 	             var oModel = new sap.ui.model.json.JSONModel(); 
	 	             oModel.setData(selectedWOHeader); 
	 	             oPage.setModel(oModel,"notifymodel"); 
	 	  } // end of WoHeaderFlag else  
	 	  
	 	}// end of else if Skey workorder
	 	
	 	 else if (sKey === "Equip"){
	 		  	   if(EquipHeaderFlag === 0){
	 		  	   	        
	 		  	   	         var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_PM_INTERNPROJECT_SRV/", true);   
		                     var URL = "EQUIPHEADERSet('"+selectedEquipNo+"')?$format=json";
		                   
	
			        	oModel.read(URL,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			      	success : function(oData,oResponse){
			 		            
			 		            console.log("Work order details");
			 	              	console.log(oData);  
			 	             	 selectedEquipHeader = oData;  
			 	                 EquipHeaderFlag = 1
			 	              	console.log("Equip header is "); 
			 	              	console.log(selectedEquipHeader); 
			 		
			 	                 },  // end of success call back , 
			 	                 
			 	                 
			 	    error : function(oData,oResponse){ 
			 	    	
			 	    	MessageBox.error("error");
			 	  
			 	    }// end of error call back 
			 });  // end of oModel.read  
			 
			 console.log("Finall equip order"); 
			 console.log(selectedEquipHeader);
	 	    
	 	             var oPage = this.getView().byId("detailDetail")
	 	             var oModel = new sap.ui.model.json.JSONModel(); 
	 	             oModel.setData(selectedEquipHeader); 
	 	             oPage.setModel(oModel,"notifymodel"); 
	 	    
	 		  }// end of EquipFlag if  
	 	  else{
	 	  	         var oPage = this.getView().byId("detailDetail")
	 	             var oModel = new sap.ui.model.json.JSONModel(); 
	 	             oModel.setData(selectedEquipHeader); 
	 	             oPage.setModel(oModel,"notifymodel"); 
	 	  } // end of EquipHeaderFlag else  
	 	  
	 	}// end of else if Skey Equip 
	 	
	 	else if(sKey === "HighNotif"){
	 	   aFilters.push(   new Filter("Priok","EQ","1")  );
	 	    aFilters.push(   new Filter("Priok","EQ","2") );
	 	   
	 	   	

			 
	 	  
	 	}// end of else if 
	 	
	 	else if(sKey === "Profile"){
	 		this.getSplitContObj().to(this.createId("detail2"));
	 	}
	 	
	 	else if(sKey === "dashboard"){
	 			var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
			   oRouter.navTo("dashboard",{"value":userId});
	 	}
	 	
	 	else if (sKey === "Logout"){
	 		var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
			oRouter.navTo("");
	 	}//end of else if 
	 	
	 	  
	   oBinding.filter(aFilters);
	 		
	 	} // end of onFilterSelect 
	
	}); 
	
});