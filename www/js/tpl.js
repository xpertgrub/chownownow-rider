function callAjax2(action,params)
{
	dump("action=>"+action);	
	
	if ( !hasConnection() ){
		toastMsg( getTrans("Not connected to internet",'no_connection') );		
		return;
	}
	
	/*params+="&lang_id="+getStorage("kr_lang_id");
	if(!empty(krms_driver_config.APIHasKey)){
		params+="&api_key="+krms_driver_config.APIHasKey;
	}		
	if ( !empty( getStorage("kr_token") )){		
		params+="&token="+  getStorage("kr_token");
	}*/
	
	params+=getParams();
	
	dump(ajax_url+"/"+action+"?"+params);
	
	ajax_request2 = $.ajax({
		url: ajax_url+"/"+action, 
		data: params,
		type: 'post',                  
		async: false,
		dataType: 'jsonp',
		timeout: 6000,
		crossDomain: true,
		 beforeSend: function() {
			if(ajax_request2 != null) {			 	
			   /*abort ajax*/
			   hideAllModal();	
	           ajax_request2.abort();
			} else {    
				/*show modal*/			   
				//loader.show();			    
			}
		},
		complete: function(data) {					
			//ajax_request2=null;   	     				
			ajax_request= (function () { return; })();
			hideAllModal();		
		},
		success: function (data) {	
			if (data.code==1){
				switch (action)
				{
					//silent
					case "updateDriverLocation":
					break;
					
					default:
					break;
				}
			}
		},
		error: function (request,error) {	        
		    hideAllModal();					
			switch (action)
			{
				case "GetAppSettings":
				case "getLanguageSettings":
				case "registerMobile":
				case "updateDriverLocation":
				break;
												
				default:
				onsenAlert( getTrans("Network error has occurred please try again!",'network_error') );		
				break;
			}
		}
	});
}

function formatTask(data)
{	
	var html='';
	if ( data.length>0){	
		html+='<ons-list>';	
		
		$.each( data, function( key, val ) {     
			
			html+='<ons-list-item  modifier="task-list" tappable ripple onclick="showTask('+val.task_id+')" >';
			       html+='<ons-row>';
			           html+='<ons-col >';
			              html+='<div class="table">';
			                 html+='<div class="col a">';
			                 html+='<ons-icon icon="ion-android-time" size="20px"></ons-icon>';
			                 html+='</div>';
			                 html+='<div class="col">';
html+='<b>'+val.delivery_time+'</b> <span class="tag '+val.trans_type_raw+'">'+val.trans_type+'</span>';
			                 html+='</div>';
			                 
			                 if (val.order_id>0){
			                 	html+='<div class="col text-right">';
			                 	html+="<b>"+val.order_total_amount+"</b>";
			                    html+='</div>';
			                 }
			                 
			              html+='</div>';
			              
			              html+='<div class="table">';
			                 html+='<div class="col a">';
			                 html+='<ons-icon icon="ion-ios-list-outline" size="20px"></ons-icon>';
			                 html+='</div>';
			                 html+='<div class="col">';			                 
			                 html+='<p><b>'+ getTrans("Task ID","task_id") +". "+val.task_id+'</b></p>';
			                 html+='</div>';
			              html+='</div>';
			              
			              if ( val.order_id>0){
			              	 html+='<div class="table">';
			                 html+='<div class="col a">';
			                 html+='<ons-icon icon="ion-android-document" size="20px"></ons-icon>';
			                 html+='</div>';
			                 html+='<div class="col">';
			                 html+='<p><b>'+ getTrans("Order No","order_no") +". "+val.order_id+'</b></p>';
			                 html+='</div>';
			                 html+='</div>';
			                 
			                 html+='<div class="table">';
			                 html+='<div class="col a">';
			                 html+='<ons-icon icon="ion-android-document" size="20px"></ons-icon>';
			                 html+='</div>';
			                 html+='<div class="col">';
			                 html+='<p><b>'+ getTrans("Order status","order_status") +": "+val.order_status+'</b></p>';
			                 html+='</div>';
			                 html+='</div>';
			                 
			                 html+='<div class="table">';
			                 html+='<div class="col a">';
			                 html+='<ons-icon icon="ion-android-document" size="20px"></ons-icon>';
			                 html+='</div>';
			                 html+='<div class="col">';
			                 html+='<p><b>'+ getTrans("Payment Type","payment_type") +": "+val.payment_type+'</b></p>';
			                 html+='</div>';
			                 html+='</div>';
			              }
			              
			              if ( val.merchant_id>=1){
			              	   html+='<div class="table">';
				                 html+='<div class="col a">';
				                 html+='<ons-icon icon="ion-android-restaurant" size="20px"></ons-icon>';
				                 html+='</div>';
				                 html+='<div class="col">';
				                 html+='<p><b>'+val.merchant_name+'</b></p>';
				                 html+='</div>';
				              html+='</div>';
			              }
			              
			              html+='<div class="table">';
			                 html+='<div class="col a">';
			                 html+='<ons-icon icon="ion-android-contact" size="20px"></ons-icon>';
			                 html+='</div>';
			                 html+='<div class="col">';
			                 html+='<p>'+val.customer_name+'</p>';
			                 html+='</div>';
			              html+='</div>';
			              
			              html+='<div class="table">';
			                 html+='<div class="col a">';
			                 html+='<ons-icon icon="ion-location" size="20px"></ons-icon>';
			                 html+='</div>';
			                 html+='<div class="col">';
			                 html+='<p>';
			                 html+= val.delivery_address;
			                 html+='</p>';
			                 html+='</div>';
			              html+='</div>';
			              
			              html+='<div class="tag-status '+val.status_raw+' ">'+val.status+'</div>';
			              
			           html+='</ons-col>';
			           /*html+='<ons-col>';
			             html+='<div class="tag-status '+val.status_raw+' ">'+val.status+'</div>';
			           html+='</ons-col>';*/
			       html+='</ons-row>';
			  html+='</ons-list-item>';			  					  
			
			
		});
		html+='</ons-list>';
		
	}
	return html;
}

function formatTaskDetails(data)
{
	if(empty(data)){
		return '';
	}
	var html='';
	
	html+='<ons-list-item>';
	     html+='<ons-row>';
	        html+='<ons-col style="text-align:left;">';
	        html+='<b>'+ getTrans('Customer Details','customer_details') +'</b>';	        
	        html+='</ons-col>';  
	      html+='</ons-row>';           
	    html+='</ons-list-item>';   
	
	html+='<ons-list-item>';
     html+='<ons-row>';
        html+='<ons-col width="70%" >';
         html+='<div class="table">';
             html+='<div class="col a">';
             html+='<ons-icon icon="ion-android-time" size="20px"></ons-icon>';
             html+='</div>';
             html+='<div class="col">';
             html+='<b>'+ data.delivery_time +'</b>';
             html+='</div>';
          html+='</div>';    
          
          html+='<div class="table">';
             html+='<div class="col a">';
             html+='<ons-icon icon="ion-android-contact" size="20px"></ons-icon>';
             html+='</div>';
             html+='<div class="col">';
             html+='<p>'+ data.customer_name +'</p>';
             html+='</div>';
          html+='</div>     ';    
          
          if (!empty(data.contact_number)){
	          html+='<div class="table">';
	             html+='<div class="col a">';
	             html+='<ons-icon icon="ion-ios-telephone" size="20px"></ons-icon>';
	             html+='</div>';
	             html+='<div class="col">';
	             html+='<p><a class="tel" href="tel:'+data.contact_number+'">'+data.contact_number+'</a></p>';
	             html+='</div>';
	          html+='</div>     ';   
          } 
                    
         html+='</ons-col>';
         html+='<ons-col>';
	        html+='<span class="tag '+ data.trans_type_raw+' ">'+ data.trans_type +'</span>';
	     html+='</ons-col>';
         
     html+='</ons-row>';
   html+='</ons-list-item>';
 
   return html;
}

/*task  map*/
function TaskDetailsChevron_1(data )
{
	if(empty(data)){
		return '';
	}
	var html='';
	html+='<ons-list-item tappable onclick="viewTaskMap('+data.task_id+', '+ "'" +data.task_lat +"'" +', '+ "'" +data.task_lng +"'" +', '+ "'" + data.delivery_address + "'" + ' )"  >';
     html+='<ons-col width="90%" >     ';            
         html+='<div class="table">';
             html+='<div class="col a">';
             html+='<ons-icon icon="ion-location" size="20px"></ons-icon>';
             html+='</div>';
             html+='<div class="col">';
             html+='<p>'+data.delivery_address+'</p>';
             html+='</div>';
          html+='</div> ';
    html+='</ons-col>';

    html+='<ons-col width="10%">';
	    html+='<ons-icon icon="ion-ios-arrow-right" size="20px"></ons-icon>';
	html+='</ons-col> 	        ';
   html+='</ons-list-item>';
   return html;
}
/*task  description*/
function TaskDetailsChevron_2(data )
{
	if(empty(data)){
		return '';
	}
	var html='';
	html+='<ons-list-item tappable onclick="viewTaskDescription('+data.task_id+')"  >';
     html+='<ons-col width="90%" >     ';            
         html+='<div class="table">';
             html+='<div class="col a">';
             html+='<ons-icon icon="ion-ios-list-outline" size="20px"></ons-icon>';
             html+='</div>';
             html+='<div class="col">';
             html+='<b>' + getTrans("Task Description","task_description") + '</b>';
             html+='<p class="concat-text">'+data.task_description+'</p>';
             html+='</div>';
          html+='</div> ';
    html+='</ons-col>';

    html+='<ons-col width="10%">';
	    html+='<ons-icon icon="ion-ios-arrow-right" size="20px"></ons-icon>';
	html+='</ons-col> 	        ';
   html+='</ons-list-item>';
   return html;
}

/*task  add signature*/
function TaskAddSignature( data )
{
	if(empty(data)){
		return '';
	}
		
	if(data.driver_enabled_signature!=1){
	   return '';
	}
	
	dump( data.status_raw );
	
	var html='';
	html+='<ons-list-item tappable onclick="ShowSignaturePage('+data.task_id+','+ "'"+ data.customer_signature_url + "'" +', '+ "'" + data.status_raw + "',"+ "'"+ data.recipient_name + "'"  +'  )"  >';
     html+='<ons-col width="90%" >     ';            
         html+='<div class="table">';
             html+='<div class="col a">';
             html+='<ons-icon icon="ion-edit" size="20px"></ons-icon>';
             html+='</div>';
             html+='<div class="col">';
             if (data.status_raw=="inprogress"){
                 html+='<b>'+ getTrans("Add Signature",'add_signature') +'</b>';  
             } else {
             	 html+='<b>'+ getTrans("View Signature",'view_signature') +'</b>';  
             }           
             html+='</div>';
          html+='</div> ';
    html+='</ons-col>';

    html+='<ons-col width="10%">';
	    html+='<ons-icon icon="ion-ios-arrow-right" size="20px"></ons-icon>';
	html+='</ons-col> 	        ';
   html+='</ons-list-item>';
   
   if (data.status_raw=="inprogress" || data.status_raw=="successful"){
       return html;
   } else return '';
}

/*task history*/
function TaskDetailsChevron_3( data )
{
	if(empty(data)){		
		return '';
	}
	dump(data);
	var html='';
	html+='<ons-list-item class="with-bottom-100">';
     html+='<ons-col>';            
         html+='<div class="table">';
             html+='<div class="col a">';
             html+='<ons-icon icon="ion-ios-albums-outline" size="20px"></ons-icon>';
             html+='</div>';
             html+='<div class="col">';
             html+='<b>'+ getTrans("Task History",'task_history') +'</b>';
             html+='<div class="top10"></div>';
             
             $.each( data, function( key, val ) { 
                html+='<div class="table  equal-col">';
                
                   html+='<div class="col col-1">';
                   html+=val.status + " " + getTrans("at",'at') ;
                   html+='</div>';
                   
                   html+='<div class="col col-2">';
                   html+=val.date;
                   html+='</div>';
                   
                   html+='<div class="col col-3">';
                   html+=val.time;
                   html+='</div>';
                   
                html+='</div>';
             }); 
                
             html+='</div>';
          html+='</div> ';
    html+='</ons-col>';    
   html+='</ons-list-item>';
   return html;
}

function taskDescription(data)
{
	if(empty(data)){
		return;
	}
	var html='';
	html+='<ons-list> ';
	   html+='<ons-list-item  modifier="task-list"  >  ';
	     html+='<ons-row>';
	       html+='<ons-col>';
	         html+='<p>'+ data.task_description +'</p>';
	       html+='</ons-col>';
	     html+='</ons-row>';
	   html+='</ons-list-item>';
	html+='</ons-list>';
	return html;
}

function OptionListTransport(fname, key, val, id )
{
	var html='';
	html+='<ons-list-item  modifier="task-list" tappable ripple onclick="setTransportType('+ "'" +  key + "'"  +', '+ "'"+ val + "'" +' ) ">';
	  html+='<label class="left">';
	    html+='<ons-input name="'+fname+'" value="'+key+'" type="radio" input-id="radio-'+id+'"></ons-input>';
	  html+='</label>';
	  html+='<label for="radio-'+id+'" class="center">';
	    html+= val;
	  html+='</label>';
	html+='</ons-list-item>';                            
	return html;
}


function OptionListLanguage(fname, key, val, id )
{
	dump( getStorage("kr_lang_id") );
	ischeck='';
	if ( getStorage("kr_lang_id") == key ){
		ischeck='checked';
	}
	var html='';
	/*html+='<ons-list-item  modifier="task-list" tappable ripple onclick="SetLanguage('+ "'" +  key + "'"  +', '+ "'"+ val + "'" +' ) ">';
	  html+='<label class="left">';
	    html+='<ons-input name="'+fname+'" '+ ischeck +'  value="'+key+'" type="radio" input-id="radio-'+id+'"></ons-input>';
	  html+='</label>';
	  html+='<label for="radio-'+id+'" class="center">';
	    html+= val;
	  html+='</label>';
	html+='</ons-list-item>'; */  

	
    html+='<ons-list-item tappable onclick="SetLanguage('+ "'" +  key + "'"  +', '+ "'"+ val + "'" +' ) " >';
      html+='<label class="left">';
        html+='<ons-radio name="'+fname+'" '+ ischeck +' input-id="lang-'+x+'" ></ons-radio>';
      html+='</label>';
      html+='<label for="lang-'+x+'" class="center">';
        html+=val;
      html+='</label>';
    html+='</ons-list-item>';
    
	return html;
}

function OrderDetails(data)
{
	if(empty(data)){
		return '';
	}
	if (data.order_id<=0){
		return '';
	}
	var html='';
	html+='<ons-list-item tappable onclick="ShowOrderDetails('+data.order_id+')"  >';
     html+='<ons-col width="90%" >     ';            
         html+='<div class="table">';
             html+='<div class="col a">';
             html+='<ons-icon icon="ion-coffee" size="20px"></ons-icon>';
             html+='</div>';
             html+='<div class="col">';
             html+='<b>' + getTrans("View Order Details","view_order_details") + '</b>';             
             html+='</div>';
          html+='</div> ';
    html+='</ons-col>';

    /*html+='<ons-col width="10%">';
	    html+='<ons-icon icon="ion-ios-arrow" size="20px"></ons-icon>';
	html+='</ons-col> 	        ';
   html+='</ons-list-item>';*/
    
    html+='<ons-col width="10%">';
	    html+='<ons-icon icon="ion-ios-arrow-right" size="20px"></ons-icon>';
	html+='</ons-col>';
   html+='</ons-list-item>';
   return html;
}

function formatOrderDetails(data , data2 )
{	
	if(empty(data)){
		return;
	}
	
	/*loop tru item*/
	/*settings*/
	dump(data.settings);
	if(!empty(data.settings)){
		setStorage('currency_position',data.settings.currency_position);
		setStorage('decimal_place',data.settings.decimal_place);
		setStorage('decimal_separator',data.settings.decimal_separator);
		setStorage('thousand_separator',data.settings.thousand_separator);
		setStorage('currency_set',data.settings.currency_set);
	}
	
	var item='';
	
	item+='<p><b>'+ getTrans("Order No","order_no") + " :" + data.order_info.order_id+'</b></p>'
	if (data.order_info.order_change>0){
	item+='<p>'+ getTrans("Change","change") + " :" + prettyPrice(data.order_info.order_change)+'</p>'
	}
		
	if (data2.length>0){
		$.each( data2, function( key_1, val_1 ) { 			
			item+= '<div class="table">';	   	      
	   	      item+= '<div class="col b" style="width:35%;">'+ val_1.label + '</div>';	   	     
	   	      item+= '<div class="col c">'+  val_1.value  +'</div>';
	   	   item+= '</div>';
		});
	}
		
	
	
	//alert(data.item.length);	
	//if (data.item.length>0){	
	var is_array = 2;
	
	if ( !empty(data.html)){
		item+= data.html;
	} else {
		if ( !empty(data.item)){
		   $.each( data.item, function( key, val ) {     
		   	   size='';
		   	   if( !empty(val.size_words)){
		   	   	  size = ' ('+val.size_words+')';
		   	   }
		   	   var item_total_price = parseFloat(val.qty)* parseFloat(val.discounted_price);
		   	   item+= '<div class="table">';
		   	      item+= '<div class="col a">'+ val.qty +' x</div>';
		   	      if ( !empty(val.order_notes)){
		   	      	 notes='<br/><span class="order-notes">'+val.order_notes+'</span>';
		   	         item+= '<div class="col b"><b>'+ val.item_name + size + '</b>'+ notes +'</div>';	   	     
		   	      } else {
		   	      	 item+= '<div class="col b"><b>'+ val.item_name + size + '</b></div>';	   	     
		   	      }
		   	      item+= '<div class="col c">'+  prettyPrice(item_total_price)  +'</div>';
		   	   item+= '</div>';
		   	   
		   	   if (!empty(val.cooking_ref)){
		   	   	   item+= '<p class="indent">'+val.cooking_ref+'</p>';
		   	   }
		   	   
		   	   /*ingredients*/
		   	   if (val.ingredients.length>0){	
		   	   	   item+= '<p class="indent top10"><b>'+ getTrans("Ingredients","ingredients")  +'</b></p>';
		   	   	   $.each( val.ingredients, function( key_ing, val_ing ) {     
		   	   	   	    item+= '<p class="indent">'+val_ing+'</p>';
		   	   	   });
		   	   }
	
		   	   // sub item
		   	   if ( !empty(val.new_sub_item) ){
		   	   	   $.each( val.new_sub_item, function( key_sub, val_sub ) {     	   	   	   	    
		   	   	   	    item+= '<p class="indent top10"><b>'+ key_sub  +'</b></p>';
		   	   	   	    if ( val_sub.length>0){	
		   	   	   	    $.each( val_sub, function( key_sub1, val_sub1 ) {   
		   	   	   	    	var sub_item_total_price = parseFloat(val_sub1.addon_qty)* parseFloat(val_sub1.addon_price); 
	                        item+= '<div class="table">';
					   	      item+= '<div class="col a">'+ val_sub1.addon_qty +' x</div>';
					   	      item+= '<div class="col b">'+ val_sub1.addon_name + '</div>';	   	     
					   	      item+= '<div class="col c">'+ prettyPrice(sub_item_total_price) +'</div>';
					   	   item+= '</div>';
		   	   	   	    });	
		   	   	   	    }
		   	   	   });
		   	   }	   	      	  
		   	   
		   	   item+='<div class="sep"></div>';
		   	   
		   });	
		}	
	
	
	//Total
	//item+='<div class="sep"></div>';
	
	if ( !empty(data.total) ){	
		total=data.total;		
		if (total.discounted_amount>0){
   	   	   item+= ReceiptFooter( getTrans('Discount','discount') , '('+prettyPrice(total.discounted_amount)+')' ); 
   	    }
   	    if (total.less_voucher>0){
   	   	   item+= ReceiptFooter( getTrans('Less Voucher','less_voucher') , '('+prettyPrice(total.less_voucher)+')' ); 
   	    }
   	    
   	    if (total.pts_redeem_amt>0){
   	   	   item+= ReceiptFooter( getTrans('Redeem points','redeem_points') , '('+prettyPrice(total.pts_redeem_amt)+')' ); 
   	    }
   	    
   	    item+= ReceiptFooter( getTrans('Sub Total','sub_total') , prettyPrice(total.subtotal) );   
   	    	   
   	    if (total.delivery_charges>0){
   	   	   item+= ReceiptFooter( getTrans('Delivery Fee','delivery_fee') , prettyPrice(total.delivery_charges) ); 
   	    }
   	    if (total.merchant_packaging_charge>0){
   	   	   item+= ReceiptFooter( getTrans('Packaging','packaging') , prettyPrice(total.merchant_packaging_charge) ); 
   	    }
   	    if (total.delivery_charges>0){
   	   	   item+= ReceiptFooter( getTrans('Tax','tax')+' '+total.tax_amt+'%', prettyPrice(total.taxable_total) ); 
   	    }
   	    
   	    if(!empty(total.tips)){
   	      if (total.tips>0){
   	   	     item+= ReceiptFooter( getTrans('Tips','tips')+' '+total.tips_percent+'', prettyPrice(total.tips) ); 
   	      }
   	    }
   	    
   	    if (total.total>0){
   	   	   item+= ReceiptFooter( '<b>'+ getTrans('Total','total')+'</b>', prettyPrice(total.total) ); 
   	    }
	}	
	
	} /*end html value*/
	
	
	var html='';
	html+='<ons-list>';
	   html+='<ons-list-item  modifier="task-list"  >  ';
	     html+='<ons-row>';
	       html+='<ons-col>';
	         html+= item ;
	       html+='</ons-col>';
	     html+='</ons-row>';
	   html+='</ons-list-item>';
	html+='</ons-list>';
	return html;
}

function ReceiptFooter( label , value )
{
	item='';
    item+= '<div class="table">';
      item+= '<div class="col a"></div>';
      item+= '<div class="col b">'+label+'</div>';	   	     
      item+= '<div class="col c">'+ value  +'</div>';
    item+= '</div>';
   	return item;   
}

function prettyPrice( price )
{
	var decimal_place = getStorage("decimal_place");		
	var currency_position= getStorage("currency_position");
	var currency_symbol = getStorage("currency_set");
	var thousand_separator = getStorage("thousand_separator");
	var decimal_separator = getStorage("decimal_separator");	
	
	if(empty(currency_position)){
		currency_position='';
	}
	if(empty(decimal_place)){
		decimal_place=2;
	}
	if(empty(decimal_separator)){
		decimal_separator='.';
	}
	if(empty(thousand_separator)){
		thousand_separator='';
	}
	if(empty(currency_symbol)){
		currency_symbol='';
	}
	
	price = number_format(price,decimal_place, decimal_separator ,  thousand_separator ) ;	
	if ( currency_position =="left"){
		return currency_symbol+" "+price;
	} else {
		return price+" "+currency_symbol;
	}
}

function number_format(number, decimals, dec_point, thousands_sep) 
{
  number = (number + '')
    .replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}

function formatNotifications(data)
{	
	if(empty(data)){
		return;
	}		
	var item='';
	var html='';
	
	if (data.length>0){	
	   html+='<ons-list>';
	   $.each( data, function( key, val ) {     
	   	   dump(val);
	   	   item='';
	   	   item+= '<p><b>'+val.push_title+'</b></p>';
	   	   item+= '<p class="top10">'+val.push_message+'</p>';
	   	   item+= '<date class="tag-status acknowledged ">'+val.date_created+'</date>';
	   	   
	   	   link="";
	   	   if (val.actions!="CANCEL_TASK"){
	   	   	   link='onclick="showTask('+val.task_id+')"';
	   	   }
	   	   if (val.actions=="private" || val.actions=="bulk"){
	   	   	   link="";
	   	   }
	   	   
	   	   html+='<ons-list-item '+ link +' tappable  modifier="task-list"  >  ';
		     html+='<ons-row>';
		       html+='<ons-col>';
		         html+= item ;
		       html+='</ons-col>';
		     html+='</ons-row>';
		   html+='</ons-list-item>';
	   	   
	   });
	   html+='</ons-list>';
	   return html;
	}
	return '';	
}

function TaskDetailsChevron_4(data )
{
	if(empty(data)){
		return '';
	}
	
	if (!empty(data.drop_address)){
		resp = pickupDetails(data);
		return resp;
	}
	
	if(empty(data.merchant_id)){
		return '';
	}
	
	if(data.merchant_id<=0){
		return '';
	}	
	
	var html='';
	html+='<ons-list-item tappable onclick="viewTaskMap('+data.task_id+', '+ "'" +data.merchant_lat +"'" +', '+ "'" +data.merchant_lng +"'" +', '+ "'" + data.merchant_address + "'" + ' )"  >';
     html+='<ons-col width="90%" >     ';            
         html+='<div class="table">';
             html+='<div class="col a">';
             html+='<ons-icon icon="ion-location" size="20px"></ons-icon>';
             html+='</div>';
             html+='<div class="col">';
             html+='<p>'+data.merchant_name+" - "+data.merchant_address+'</p>';
             html+='</div>';
          html+='</div> ';
    html+='</ons-col>';
		
    html+='<ons-col width="10%">';
	    html+='<ons-icon icon="ion-ios-arrow-right" size="20px"></ons-icon>';
	html+='</ons-col> 	        ';
   html+='</ons-list-item>';
    
   return html;
}

function pickupDetails(data)
{
	var html='';
	
		html+='<ons-list-item>';
	     html+='<ons-row>';
	        html+='<ons-col style="text-align:left;">';
	        
	        if ( data.trans_type_raw=="delivery"){	        
	           html+='<b>'+ getTrans('Pickup Details','pickup_details') +'</b>';
	        } else {
	           html+='<b>'+ getTrans('Drop Details','drop_details') +'</b>';
	        }
	        
	        html+='</ons-col>';  
	      html+='</ons-row>';           
	    html+='</ons-list-item>';   
	    
	    html+='<ons-list-item>';
	     html+='<ons-row>';
	        html+='<ons-col width="70%" >';
	        
	         if (!empty(data.merchant_name)){
		         html+='<div class="table">';
		             html+='<div class="col a">';
		             html+='<ons-icon icon="ion-home" size="20px"></ons-icon>';
		             html+='</div>';
		             html+='<div class="col">';
		             html+='<p>'+ data.merchant_name +'</p>';
		             html+='</div>';
		          html+='</div>';   
	         }
	          
	         if (!empty(data.dropoff_contact_name)){
	          html+='<div class="table">';
	             html+='<div class="col a">';
	             html+='<ons-icon icon="ion-android-contact" size="20px"></ons-icon>';
	             html+='</div>';
	             html+='<div class="col">';
	             html+='<p>'+ data.dropoff_contact_name +'</p>';
	             html+='</div>';
	          html+='</div>';   
	         }
	          
	         if (!empty(data.dropoff_contact_number)){
	         html+='<div class="table">';
	             html+='<div class="col a">';
	             html+='<ons-icon icon="ion-ios-telephone" size="20px"></ons-icon>';
	             html+='</div>';
	             html+='<div class="col">';
	             html+='<p><a class="tel" href="tel:'+data.dropoff_contact_number+'">'+data.dropoff_contact_number+'</a></p>';
	             html+='</div>';
	         html+='</div>';     
	         }
	        
	        
	        html+='</ons-col>';
	       html+='</ons-row>';
	   html+='</ons-list-item>';    
	   
	   
		html+='<ons-list-item tappable onclick="viewDropOffMap()"  >';
	     html+='<ons-col width="90%" >     ';            
	         html+='<div class="table">';
	             html+='<div class="col a">';
	             html+='<ons-icon icon="ion-location" size="20px"></ons-icon>';
	             html+='</div>';
	             html+='<div class="col">';
	                          
	             html+='<p>'+data.drop_address+'</p>';
	             
	             html+='</div>';
	          html+='</div> ';
	    html+='</ons-col>';

    html+='<ons-col width="10%">';
	    html+='<ons-icon icon="ion-ios-arrow-right" size="20px"></ons-icon>';
	html+='</ons-col> 	        ';
   html+='</ons-list-item>';
   
   return html;
}

function DriverNotes( notes, data)
{	
	if(empty(data)){
		return '';
	}
	
	if ( data.driver_enabled_notes!=1){
		return '';
	}
	
	var html='';
	html+='<ons-list-item tappable onclick="showAddNote('+data.task_id+','+ "'" + data.status_raw + "'"  + ')"  >';
     html+='<ons-col width="90%" >     ';            
         html+='<div class="table">';
             html+='<div class="col a">';
             html+='<ons-icon icon="ion-compose" size="20px"></ons-icon>';
             html+='</div>';
             html+='<div class="col">';      
             
             if ( data.status_raw=="cancelled" || data.status_raw=="successful" || data.status_raw=="failed"){	  	  	  
             	html+='<b>'+ getTrans("View Notes",'view_notes') +'</b>';               
             	if ( data.history_notes!=2){
             	html+='<span style="margin-left:10px;" class="notification">'+data.history_notes.total+'</span>'; 
             	}
             } else {
             	html+='<b>'+ getTrans("Add Notes",'add_notes') +'</b>';   
             	if ( data.history_notes!=2){
             	html+='<span style="margin-left:10px;" class="notification">'+data.history_notes.total+'</span>'; 
             	}
             }                    
             
             html+='</div>';
          html+='</div> ';
    html+='</ons-col>';

    html+='<ons-col width="10%">';
	    html+='<ons-icon icon="ion-ios-arrow-right" size="20px"></ons-icon>';
	html+='</ons-col> 	        ';
   html+='</ons-list-item>';
      
   switch(data.status_raw)
   {
   	  case "assigned":   	  
   	    return "";
   	  break;
   	  
   	  default:
   	    return html;
   	  break;
   }
}

function fillNotes(data)
{
	if(empty(data)){
		return '';
	}
	
	var html='';
	html+='<ons-list modifier="knotes">';
	$.each( data.details, function( key, val ) {     
		  dump(val);
		  
		  html+='<ons-list-item>';

			 html+='<ons-row>';
			   html+='<ons-col width="85%">';
				 html+= val.notes;
				 
				 html+='<div class="top10"></div>';
				 html+='<div class="table  equal-col">';
				   html+='<div class="col col-1">'+val.date_created+'</div>';
				 html+='</div>';
				 
			   html+='</ons-col>';
			   html+='<ons-col class="popnotes_col">';
				  html+='<ons-button modifier="quiet" onclick="showNotesPopover(this,'+val.id+','+ "'" + val.notes + "'" +' )">';
					html+='<ons-icon icon="ion-android-more-vertical" style="color:grey;" size="20px"></ons-icon>';
				  html+='</ons-button>';
			   html+='</ons-col>';
			 html+='</ons-row>';
		  
		html+='</ons-list-item>';

	});
	html+='</ons-list>'; 
	
	$("#list-notes").html(html);
		
	if ( data.msg=="cancelled" || data.msg=="successful" || data.msg=="failed"){
		$(".popnotes_col").hide();
	}
	
}

function addPhotoChevron(data)
{
	dump('addPhotoChevron');
	
	if(empty(data)){
		return '';
	}
	
	if ( data.driver_enabled_addphoto!=1){
		return '';
	}
	
	var html='';
	
	if ( data.status_raw=="cancelled" || data.status_raw=="successful" || data.status_raw=="failed"){	
	} else {
		html+='<ons-list-item tappable onclick="javascript:addPhotoSelection();" >';
	     html+='<ons-col width="90%" >     ';            
	         html+='<div class="table">';
	             html+='<div class="col a">';
	             html+='<ons-icon icon="ion-image" size="20px"></ons-icon>';
	             html+='</div>';
	             html+='<div class="col">';      
	             
	             html+='<b>'+ getTrans("Add Photo",'add_photo') +'</b>'; 
	             
	             html+='</div>';
	          html+='</div> ';
	    html+='</ons-col>';
	
	    html+='<ons-col width="10%">';        
		    html+='<ons-icon icon="ion-ios-arrow-right" size="20px"></ons-icon>';
		html+='</ons-col> 	        ';
	   html+='</ons-list-item>';
   }
   
   if (data.task_photo!=2){
   	   html+='<ons-list-item tappable onclick="javascript:showPhotoPage();" >';
	     html+='<ons-col width="90%" >     ';            
	         html+='<div class="table">';
	             html+='<div class="col a">';
	             html+='<ons-icon icon="ion-images" size="20px"></ons-icon>';
	             html+='</div>';
	             html+='<div class="col">';      
	             
	             html+='<b>'+ getTrans("View Photo",'view_photo') +'</b>';  
	             html+='<span style="margin-left:10px;" class="notification">'+data.task_photo.total+'</span>';
	             
	             html+='</div>';
	          html+='</div> ';
	    html+='</ons-col>';
	
	    html+='<ons-col width="10%">';   	         
		     html+='<ons-icon icon="ion-ios-arrow-right" size="20px"></ons-icon>';
		html+='</ons-col> 	        ';
	   html+='</ons-list-item>';
   }
      
   switch(data.status_raw)
   {
   	  case "unassigned":
   	    return "";
   	  break;
   	   
   	  default:
   	    return html;
   	  break;
   }
}

function gridPhoto(data , status_raw)
{
	dump(status_raw);
   var html='';   
   
   if (data.details.length>0){   	  
      $.each( data.details, function( key, val ) {       	        	  
      	           	     
      	     html+='<ons-row>';
      	     
      	     if ( status_raw=="cancelled" || status_raw=="successful" ||status_raw=="failed"){	
      	     	html+='<ons-col height="200" style="background:url('+val.photo_url+') no-repeat center center; background-size:cover;"   >';      	  
      	     } else {
      	      html+='<ons-col height="200" style="background:url('+val.photo_url+') no-repeat center center; background-size:cover;"  onclick="deletePhoto('+val.id+')" >';      	  
      	     }
      	            	      
      	          html+='<div class="img_loader" id="img_loader_wrap">';
      	                  
			        html+='<div class="spinner">';
					  html+='<div class="double-bounce1"></div>';
					  html+='<div class="double-bounce2"></div>';
					html+='</div>';
			      
			         html+='<img class="grid_photos" src="'+ val.photo_url +'"/>';
			      html+='</div>';
      	      
			      			  
      	      html+='</ons-col>';      	        	            	     
      	      
      	     html+='</ons-row>';      	    
      	        
      });            
      $("#list-photos").html(html);    
      imageLoaded('.img_loader'); 
   } else {
   	 dump('no photo');   	 
   }
}

fillTransportList = function(data, selected_key){
	
	var html='<ons-select id="transport_type_id" name="transport_type_id" class="transport_type_id" onchange="switchTransportFields( $(this).val() )" style="width:100%;" >';
	$.each( data, function( key, val ) {
		
		selected = '';			
		if(!empty(selected_key)){
		    if(selected_key==key){
		    	selected="selected";
		    }
	    }
	    
		html+='<option value="'+key+'" '+ selected +'  >'+val+'</option>';
	});
	html+='</ons-select>';
	$(".transport_wrap").html(html);
};