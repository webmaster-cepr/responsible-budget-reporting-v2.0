var key = "17hEnXRnsizBBNIFEt1YuASIgeT6hqtnowirXt_mkQuk",
    url = "https://spreadsheets.google.com/feeds/list/" + key + "/ooec1sa/public/values?alt=json",
    total_percent, total_percap, total = 0, entries, option, budget_year, budget_amount, budget_span, budget_end;

function find_checked(){for(var x=0;x<=budget_options.length;x++){if(budget_options[x].type=='radio'&&budget_options[x].checked){value=budget_options[x].value;return value;}}}

$(document).ready(function(){
  
  // hide plot and per-capita divs on load
  $('#plot,#percapita').hide();
  
  // grab data from Google Sheet, convert into Object
  $.getJSON(url, { format: "json" }).done(function(data){
   entries = data.feed.entry;
  });
  
  // hide advanced calc options
  $('#budget_options').hide();

  // toggle for advanced
  $('#advanced').click(function(){
    $('#budget_options').slideToggle();
  });

  // basically when any of the values change the calculator runs
  $(".target").change(function(){
    
    budget_year = Number($('#budget_year').val());
    budget_amount = Number($('#budget_amount').val()) * Number($('#add_amount').val());
    budget_span = Number($('#budget_span').val());
    budget_end = budget_year + budget_span;
    
    if(total > 0) {total = 0;}
    
    option = find_checked();
    option_sheet = 'gsx$' + option;

   for(var i in entries) {
     if(budget_year == entries[i].gsx$year.$t && budget_year <= budget_end) {
      total = total + Number(entries[i][option_sheet].$t.replace(/,/g,""));
      budget_year++;
     }
   }

  if (option != "population") {

    $('#percapita').hide();

    total_percent = budget_amount/total * 100;

    var data = [{
      values: [1-(total_percent/100),(total_percent/100)],
      labels: ['Everything Else','Program/Cut/Etc'],
      type: 'pie',
      marker: {
        colors: ['rgba(31,73,122,1)','rgba(100,158,212,1)']
      },
      insidetextfont: { color:'#FFFFFF', size: 14 },
      outsidetextfont: { size: 14 }
    }];
    
    label = $("#"+option).prop("labels");
  
    var layout = {
      title: "Program/Cut/Etc as " + $(label).text().replace(/^\s*/,""),
      height: 380,
      width: 480,
      font: {
        family: 'Verdana,sans-serif'
      }
    };
    
    Plotly.newPlot('plot', data, layout);
    $('#plot').show();
  
  } else {
    $('#plot').hide();
    
    total_percap = budget_amount/total;
    
    $('#percapita_num h3').html("$" + total_percap.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Per Capita");
    
    $('#percapita').show();
  }

    
  });
  
});