var key = "17hEnXRnsizBBNIFEt1YuASIgeT6hqtnowirXt_mkQuk",
    url = "https://crossorigin.me/https://spreadsheets.google.com/feeds/list/" + key + "/od6/public/values?alt=json",
    total_percent, total_outlay = 0, entries, budget_year, budget_amount, budget_span, budget_end;

$(document).ready(function(){

  $.getJSON(url, { format: "json" }).done(function(data){
   entries = data.feed.entry;
  });

  $(".target").change(function(){
    
    budget_year = Number($('#budget_year').val());
    budget_amount = Number($('#budget_amount').val()) * Number($('#add_amount').val());
    budget_span = Number($('#budget_span').val());
    budget_end = budget_year + budget_span;
    
    if(total_outlay > 0) {total_outlay = 0;}

   for(var i in entries) {
     if(budget_year == entries[i]['gsx$year']['$t'] && budget_year <= budget_end) {
      total_outlay = total_outlay + Number(entries[i]['gsx$outlays']['$t'].replace(/,/g,""));
      budget_year++;
     }
     total_percent = budget_amount/total_outlay * 100;
   }

  var data = [{
    values: [1-(total_percent/100),(total_percent/100)],
    labels: ['Everything Else','Program/Cut/Etc'],
    type: 'pie'
  }];

  var layout = {
    title: "Program/Cut/Etc as Percent of the Unified Budget",
    height: 380,
    width: 480
  };
  
  Plotly.newPlot('myDiv', data, layout);
    
  });
  
});


// function calculate_budget_percent(){
    // var budget_year=document.getElementById("budget_year").value;
    // var budget_percent=document.getElementById("budget_percent");
    // var budget_description=document.getElementById("budget_description");
    // var budget_amount=document.getElementById("budget_amount");
    // var add_amount=document.getElementById("add_amount").value;
    // var budget_span=document.getElementById("budget_span").value;
    // var total_outlay=0;
    // var total_percent;
    // Tabletop.init({key:public_spreadsheet_url,callback:showInfo,simpleSheet:true});
    // function showInfo(data){
    //   var budget_end=parseFloat(budget_year) + parseFloat(budget_span);
    //   var budget_options=document.getElementById("budget_options");
    //   for(var i=0;i<=data.length;i++) {
    //     find_checked();
    //     if(budget_year==data[i].year&&budget_year<=budget_end){
    //       switch(value){
    //         case"outlays":total_outlay=total_outlay+ parseFloat(data[i].outlays.replace(/\,/g,''));
    //         budget_description.innerHTML="Percent of Budget";
    //         break;
    //         case"revenue":total_outlay=total_outlay+ parseFloat(data[i].revenue.replace(/\,/g,''));
    //         budget_description.innerHTML="Percent of Revenues";
    //         break;
    //         case"population":total_outlay=total_outlay+ parseFloat(data[i].population.replace(/\,/g,''));
    //         budget_description.innerHTML="Per Capita";
    //         break;
    //         case"discretionary":total_outlay=total_outlay+ parseFloat(data[i].discretionary.replace(/\,/g,''));
    //         budget_description.innerHTML="Percent of Discretionary";
    //         break;
    //       }
    //   budget_year++;
    //   console.log(total_outlay);
          
    //     }
// if(value!="population"){total_percent=((budget_amount.value.replace(/\,/g,'')*add_amount)/total_outlay) * 100;
// if(total_percent>0.00009){budget_percent.innerHTML=total_percent.toFixed(4)+"%";}
// else{budget_percent.innerHTML="<span>less than</span> 0.0001%";}}
// else{total_percent=((budget_amount.value.replace(/\,/g,'')*add_amount)/total_outlay);
// if(total_percent>0.009){budget_percent.innerHTML="$"+ total_percent.toFixed(2);}
// else{budget_percent.innerHTML="<span>less than</span> $0.01";}}}}}
// function find_checked(){for(var x=0;x<=budget_options.length;x++){if(budget_options[x].type=='radio'&&budget_options[x].checked){value=budget_options[x].value;return value;}}}
// function show_advanced(){var advanced=document.getElementById("advanced");var calc_space=document.getElementById("calc_space");if(advanced.style.display=="block"){advanced.style.display="none";calc_space.style.height="100px";}
// else{advanced.style.display="block";calc_space.style.height="150px";}}