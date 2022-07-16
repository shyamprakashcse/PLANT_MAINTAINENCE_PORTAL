sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/routing/Router"
], function(Controller,MessageBox,MessageToast,Router) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/

    var VeryHigh = 0,High = 0,Critical = 0,Fornotif; 
    var URL,userHeader,data,userId;
   
    
	return Controller.extend("COM.PLANTMAINTENACEPORTALPLANTMAINTENACEPORTAL.controller.DASHBOARD", {

	  onInit:function(){
	  		this.getRouter().getRoute("dashboard").attachMatched(this.onRouteMatched,this);  
	  		
	  },//end of oninit function
	  
      getRouter:function(){
		    return sap.ui.core.UIComponent.getRouterFor(this); 
		    
		},// END OF GETROUTER 
		
	  	onRouteMatched:function(oEvent){
		  
		  var oArguments = oEvent.getParameter("arguments"); 
		  var view = this.getView(); 
		  userId  = oArguments.value;   
		  
		 
		   var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_PM_INTERNPROJECT_SRV/", true);   
		 
		 //URL = "USERNOTIFCATIONSet?$filter=Kunum eq '"+userId+"' and Priok eq '1'&$format=json"; 
		 
		 URL = "CREDENTIALSSet?$filter=Kunum eq '"+userId+"'&$format=json";
			  	oModel.read(URL,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			 	success : function(oData,oResponse){
			 		
			 	              	console.log(oData);  
			 	             	userHeader = oData.results[0];  
			 	                 
			 	              	console.log("user header  is "); 
			 	              	console.log(userHeader); 
			 		
			 	                 },  // end of success call back , 
			 	                 
			 	                 
			 	    error : function(oData,oResponse){ 
			 	    	
			 	    	MessageBox.error("error");
			 	  
			 	    }// end of error call back 
			 });  // end of oModel.read  
			 
			 URL = "USERNOTIFCATIONSet?$filter=Kunum eq '"+userId+"'&$format=json";
			  	oModel.read(URL,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			 	success : function(oData,oResponse){
			 		
			 	              	console.log(oData);  
			 	             	Fornotif = oData.results;  
			 	                 
			 	              	console.log("notification  is "); 
			 	              	console.log(Fornotif); 
			 		
			 	                 },  // end of success call back , 
			 	                 
			 	                 
			 	    error : function(oData,oResponse){ 
			 	    	
			 	    	MessageBox.error("error");
			 	  
			 	    }// end of error call back 
			 });  // end of oModel.read  
			 VeryHigh = 0 ; 
			 Critical = 0 ; 
			Fornotif.forEach(function (Item) {
                       if(Item.Priok === "1" || Item.Priok === "2"){
                       	VeryHigh+=1;
                       }
                       else if(Item.Priok === "3"){
                       	Critical+=1;
                       }
                       
                        });
			 
			 
			 data = {
				"sample" : "hey there",
				"VeryHigh" : VeryHigh ,
				"Critical" : Critical ,
				"Total" : Fornotif.length, 
				"Kunum" : userHeader["Kunum"], 
				"Usnam" : userHeader["Usnam"], 
				"Designation" : userHeader["Designation"]
			}
		    var oPage = this.getView().byId("TileBoard")
	 	    var oModel = new sap.ui.model.json.JSONModel(); 
	 	    oModel.setData(data); 
	 	    oPage.setModel(oModel,"notifymodel"); 	
		    //console.log(this.getView().byId("detailDetail").getModel("notifymodel").getData()); 
			 
	  	},// end of onRouteMatched function 
		 
		
	  NotifBoard:function(){ 
	  	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);  
	  	console.log("From NotifBoard home navigator"); 
	  	var compressor = JSON.stringify(data); 
	  	console.log("Compressed Data is "+compressor)   
			oRouter.navTo("home",{"value":compressor});
	  }, 
	  
	 onFilterSelect:function(oEvent){
	  		var sKey = oEvent.getParameter("key"); 
	  		if(sKey === 'Logout'){
	  			console.log(sKey);
	  			var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
			   oRouter.navTo("");
	  		}
	  		else if(sKey === 'NotifAll'){
	  			var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
	  			var compressor = JSON.stringify(data); 
	  			oRouter.navTo("home",{"value":compressor}); 
	  		}
	  }
		
	});

});