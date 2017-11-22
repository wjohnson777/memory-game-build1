var Timer; 
			var TotalSeconds; 
			var Timeout; 
			function CreateTimer(TimerID, Time) { 
				Timer = document.getElementById(TimerID); 
				TotalSeconds = Time; 
				UpdateTimer(); 
				Timeout = window.setTimeout("Tick()", 1000); 
			} 
 
			function Tick() { 
				TotalSeconds -= 1; 
				if (TotalSeconds == 0) { 
					document.location.href="${pageContext.request.contextPath}/EnotAlarmEvents"; 
				} else { 
					UpdateTimer(); 
				} 
				Timeout = window.setTimeout("Tick()", 1000); 
			} 
 
			function UpdateTimer() { 
				$("#spanRefreshCount").html(TotalSeconds); 
			}
			
			$(document).ready(function() { 
				$( "#divContentContainer" ).dialog({ 
	 		 				autoOpen: false, 
	 		 				width: 575, 
	 		 				modal: true, 
	 		 				resizable: false, 
	 		 				close: function(){ 
	 		 					CreateTimer("timer", "${alarmBean.refreshRate}"); 
	 		 				}, 
	 		 				open: function(){ 
	 		 					window.clearTimeout(Timeout); 
	 		 				} 
				});