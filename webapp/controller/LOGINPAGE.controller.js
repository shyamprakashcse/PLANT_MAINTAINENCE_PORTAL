// sap.ui.define([
// 	"sap/ui/core/mvc/Controller"
// ], function(Controller) {
// 	"use strict";
// 	/*eslint linebreak-style: ["error", "windows"]*/

// 	return Controller.extend("COM.PLANTMAINTENACEPORTALPLANTMAINTENACEPORTAL.controller.LOGINPAGE", {

// 		/**
// 		 * Called when a controller is instantiated and its View controls (if available) are already created.
// 		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
// 		 * @memberOf COM.PLANTMAINTENACEPORTALPLANTMAINTENACEPORTAL.view.LOGINPAGE
// 		 */
// 		//	onInit: function() {
// 		//
// 		//	},

// 		/**
// 		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
// 		 * (NOT before the first rendering! onInit() is used for that one!).
// 		 * @memberOf COM.PLANTMAINTENACEPORTALPLANTMAINTENACEPORTAL.view.LOGINPAGE
// 		 */
// 		//	onBeforeRendering: function() {
// 		//
// 		//	},

// 		/**
// 		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
// 		 * This hook is the same one that SAPUI5 controls get after being rendered.
// 		 * @memberOf COM.PLANTMAINTENACEPORTALPLANTMAINTENACEPORTAL.view.LOGINPAGE
// 		 */
// 		//	onAfterRendering: function() {
// 		//
// 		//	},

// 		/**
// 		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
// 		 * @memberOf COM.PLANTMAINTENACEPORTALPLANTMAINTENACEPORTAL.view.LOGINPAGE
// 		 */
// 		//	onExit: function() {
// 		//
// 		//	}

// 	});

// });




sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/routing/Router",

], function(Controller,MessageBox,MessageToast,Router) {
	"use strict";
	/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-console: "error" */
/* "parser": "@babel/eslint-parser" */

	return Controller.extend("COM.PLANTMAINTENACEPORTALPLANTMAINTENACEPORTAL.controller.LOGINPAGE", { 
		
		// onInit:function(){ 
		
		// 	  var user; 
		// 	  var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_PM_INTERNPROJECT_SRV/", true);   
			
		// 	  	oModel.read("USERSet('100')?format=json",{
		// 	 	                                         context: null, 
		// 	                                        	urlParameters : null, 
		// 	                                         	async : false, 
			 	
		// 	 	success : function(oData,oResponse){
			 		
		// 	 	              	console.log(oData);  
		// 	 	              	user = oData.results ;  
		// 	 	              	console.log("User is "); 
		// 	 	              	console.log(user); 
			 		
		// 	 	                 }, 
			 	                 
			 	                 
		// 	 	    error : function(oData,oResponse){
			 	  
  //                           	MessageBox.error("Login Process failed .Invalid Process");
  //                           return ; 
		// 	 	    }
		// 	 }); 
			 
			 
              
		// },
		
		validateInput: function(oEvent){
			var userid = this.byId("empid").getValue().trim(); 
			if(userid===""){
				this.byId("empid").setValueState("Error"); 
				this.byId("empid").setValueStateText("Employee ID cannot be empty")
			     	MessageBox.error("Maintenance Employee ID cannot be empty",{details:"Please enter valid Maintenace employee ID"});
			} 
			else{
					this.byId("empid").setValueState("Success"); 
			}
		}, 
		
		validatePassword:function(oEvent){
				var password = this.byId("emppass").getValue().trim(); 
				if(password==="")
				{
						this.byId("empid").setValueState("Error"); 
			        	this.byId("empid").setValueStateText("Password cannot be empty")
			     	MessageBox.error("Maintenance Employee Password cannot be empty");
				}
					else{
					this.byId("empid").setValueState("Success"); 
			}
		},
		
		
	  go:function(oEvent){
	  	console.log("hello from go function")
           var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
			oRouter.navTo("dashboard",{"value":"900375_101"});
       
       },
		
		login:function(oEvent){ 
			        var userid = this.byId("empid").getValue().trim(); 
		    		var password = this.byId("emppass").getValue().trim();  
		    		var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
		    		
		    	// MessageBox.success("USERSet('"+userid+"')?format=json"); 
		    		
			        var user; 
			        var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_PM_INTERNPROJECT_SRV", true);  
			         //var url="USERSet('100')?format=json" 
			         //CREDENTIALSSet(Kunum='900375_101',Passkey='Shyam@123')?$format=json
			        // var url = "USERSet('"+userid+"')?format=json"; 
			         
			         // var url = "/NOTIFHEADERSet('10000094')?$format=json" 
			         
			         //var url = "/CREDENTIALSSet(Kunum='900375_101',Passkey='Shyam@123')?$format=json" 
			         
			         var url = "/CREDENTIALSSet(Kunum='"+userid+"',Passkey='"+password+"')?$format=json"       
			       
		    		if(userid==="" || password === "")
		    		{
		    				MessageBox.error("Login Process failed .field cannot be empty");
		    		} 
		    		else{ 
		    			
		    			oModel.read(url,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			 	success : function(oData,oResponse){
			 		         
			 		          console.log("successfully ")
			 	              var fetchedUser = oData.Kunum; 
			 	              var fetchedPassword =oData.Passkey; 
			 	              console.log("hey user id is "+userid);
			 	              //var demo = {
			 	              //	username:"shyam",
			 	              //	password :"hello"
			 	              //};
			 	              
			 	              console.log(oData);
			 	              
			 	              if(fetchedUser === userid && fetchedPassword === password)
			 	              {     
			 	              	 
			 	              		 MessageBox.success("Login Process success."); 
			 	              		 console.log("hello from success function"); 
			 	              	     console.log(oResponse);
			 	              		 oRouter.navTo("dashboard",{"value":userid});
			 	              		//oRouter.navTo("dashboard");
			 	              		 
			 	              	 
			 	              }
			 	              else{
			 	              		MessageBox.error("Login Process failed .Invalid credentials");
			 	              }
			 
			       	},
			 	                 
			 	    error : function(oData,oResponse){
			 	  
                             	MessageBox.error("Login Process failed .Invalid Process");
                             return ; 
			 	    }
			 }); // odata end 
			 
		    			
		    		}// else end
		}// login function end 
       
      
       
	}); 
	
	
});