(window.webpackJsonpShaadiOnChain=window.webpackJsonpShaadiOnChain||[]).push([[34],{1036:function(a,e,t){"use strict";t.r(e),t.d(e,"ChartJs",(function(){return o}));var r=t(11),c=t(12),s=t(14),l=t(13),i=t(0),n=t.n(i),d=t(909),o=function(a){Object(s.a)(t,a);var e=Object(l.a)(t);function t(){var a;Object(r.a)(this,t);for(var c=arguments.length,s=new Array(c),l=0;l<c;l++)s[l]=arguments[l];return(a=e.call.apply(e,[this].concat(s))).data={labels:["2013","2014","2014","2015","2016","2017"],datasets:[{label:"# of Votes",data:[10,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1,fill:!1}]},a.options={scales:{yAxes:[{ticks:{beginAtZero:!0},gridLines:{color:"rgba(204, 204, 204,0.1)"}}],xAxes:[{gridLines:{color:"rgba(204, 204, 204,0.1)"}}]},legend:{display:!1},elements:{point:{radius:0}}},a.areaData={labels:["2013","2014","2015","2016","2017"],datasets:[{label:"# of Votes",data:[12,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1,fill:!0}]},a.areaOptions={plugins:{filler:{propagate:!0}},scales:{yAxes:[{gridLines:{color:"rgba(204, 204, 204,0.1)"}}],xAxes:[{gridLines:{color:"rgba(204, 204, 204,0.1)"}}]}},a.doughnutPieData={datasets:[{data:[30,40,30],backgroundColor:["rgba(255, 99, 132, 0.5)","rgba(54, 162, 235, 0.5)","rgba(255, 206, 86, 0.5)","rgba(75, 192, 192, 0.5)","rgba(153, 102, 255, 0.5)","rgba(255, 159, 64, 0.5)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"]}],labels:["Pink","Blue","Yellow"]},a.doughnutPieOptions={responsive:!0,animation:{animateScale:!0,animateRotate:!0}},a.scatterChartData={datasets:[{label:"First Dataset",data:[{x:-10,y:0},{x:0,y:3},{x:-25,y:5},{x:40,y:5}],backgroundColor:["rgba(255, 99, 132, 0.2)"],borderColor:["rgba(255,99,132,1)"],borderWidth:1},{label:"Second Dataset",data:[{x:10,y:5},{x:20,y:-30},{x:-25,y:15},{x:-10,y:5}],backgroundColor:["rgba(54, 162, 235, 0.2)"],borderColor:["rgba(54, 162, 235, 1)"],borderWidth:1}]},a.scatterChartOptions={scales:{xAxes:[{type:"linear",position:"bottom",gridLines:{color:"rgba(204, 204, 204,0.1)"}}],yAxes:[{gridLines:{color:"rgba(204, 204, 204,0.1)"}}]}},a}return Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",{className:"page-header"},n.a.createElement("h3",{className:"page-title"},"Chart-js"),n.a.createElement("nav",{"aria-label":"breadcrumb"},n.a.createElement("ol",{className:"breadcrumb"},n.a.createElement("li",{className:"breadcrumb-item"},n.a.createElement("a",{href:"!#",onClick:function(a){return a.preventDefault()}},"Charts")),n.a.createElement("li",{className:"breadcrumb-item active","aria-current":"page"},"Chart-js")))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-6 grid-margin stretch-card"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"card-body"},n.a.createElement("h4",{className:"card-title"},"Line Chart"),n.a.createElement(d.Line,{data:this.data,options:this.options})))),n.a.createElement("div",{className:"col-md-6 grid-margin stretch-card"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"card-body"},n.a.createElement("h4",{className:"card-title"},"Bar Chart"),n.a.createElement(d.Bar,{data:this.data,options:this.options}))))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-6 grid-margin stretch-card"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"card-body"},n.a.createElement("h4",{className:"card-title"},"Area Chart"),n.a.createElement(d.Line,{data:this.areaData,options:this.areaOptions})))),n.a.createElement("div",{className:"col-md-6 grid-margin stretch-card"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"card-body"},n.a.createElement("h4",{className:"card-title"},"Doughnut Chart"),n.a.createElement(d.Doughnut,{data:this.doughnutPieData,options:this.doughnutPieOptions}))))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-6 grid-margin stretch-card"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"card-body"},n.a.createElement("h4",{className:"card-title"},"Pie Chart"),n.a.createElement(d.Pie,{data:this.doughnutPieData,options:this.doughnutPieOptions})))),n.a.createElement("div",{className:"col-md-6 grid-margin stretch-card"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"card-body"},n.a.createElement("h4",{className:"card-title"},"Scatter Chart"),n.a.createElement(d.Scatter,{data:this.scatterChartData,options:this.scatterChartOptions}))))))}}]),t}(i.Component);e.default=o}}]);
//# sourceMappingURL=34.acc96610.chunk.js.map