(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),r=t(14),o=t.n(r),c=t(4),l=t(2),i=function(e){return u.a.createElement(u.a.Fragment,null,u.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},u.a.createElement("div",null,"filter shown with ",u.a.createElement("input",{onChange:e.onChange,value:e.value}))))},m=function(e){return u.a.createElement(u.a.Fragment,null,u.a.createElement("form",{onSubmit:e.submit},u.a.createElement("div",null,"name: ",u.a.createElement("input",{onChange:e.nameChange,value:e.nameValue})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{onChange:e.numberChange,value:e.numberValue})),u.a.createElement("button",{type:"submit"},"add")))},s=function(e){var n=""===e.filter?e.personsList:e.personsList.filter((function(n){return n.name.toLowerCase().includes(e.filter.toLowerCase())}));return u.a.createElement("div",null,n.map((function(n){return u.a.createElement("div",{key:n.id}," ",n.name," ",n.number,u.a.createElement("button",{onClick:function(){return e.deleteEntry(n)}},"delete"),u.a.createElement("br",null))})))},f=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"successfulCommand"},n)},d=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"error"},n)},b=t(3),h=t.n(b),v="/api/persons",E=function(){return h.a.get(v).then((function(e){return e.data}))},p=function(e){return h.a.post(v,e).then((function(e){return e.data}))},g=function(e){return h.a.delete("".concat(v,"/").concat(e)).then((function(e){return e.data}))},j=function(e){return h.a.put("".concat(v,"/").concat(e.id),e).then((function(e){return e.data}))},O=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],r=n[1],o=Object(a.useState)(""),b=Object(l.a)(o,2),h=b[0],v=b[1],O=Object(a.useState)(""),w=Object(l.a)(O,2),C=w[0],S=w[1],k=Object(a.useState)(""),y=Object(l.a)(k,2),L=y[0],T=y[1],V=Object(a.useState)(null),D=Object(l.a)(V,2),N=D[0],F=D[1],I=Object(a.useState)(null),J=Object(l.a)(I,2),x=J[0],A=J[1];Object(a.useEffect)((function(){E().then((function(e){console.log("data fetch success, ",e),r(e)}))}),[]);var B=function(e){if(window.confirm("".concat(e.name," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(n){return n.name===e.name})),a=Object(c.a)(Object(c.a)({},n),{},{number:e.number});j(a).then((function(e){r(t.map((function(n){return n.id!==e.id?n:e}))),F("".concat(a.name,"'s number has been changed.")),setTimeout((function(){F(null)}),3e3)})).catch((function(e){409===e.response.status?A(e.response.data):(r(t.filter((function(e){return e.id!==a.id}))),A("Information of ".concat(a.name," has already been removed from the server"))),setTimeout((function(){A(null)}),3e3)}))}P()},M=function(e){console.log(e.response.data),A(e.response.data),setTimeout((function(){A(null)}),3e3)},P=function(){v(""),S("")};return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(f,{message:N}),u.a.createElement(d,{message:x}),u.a.createElement(i,{onChange:function(e){console.log(e.target.value),T(e.target.value)},value:L}),u.a.createElement("h2",null,"add a new"),u.a.createElement(m,{nameChange:function(e){console.log(e.target.value),v(e.target.value)},nameValue:h,numberChange:function(e){console.log(e.target.value),S(e.target.value)},numberValue:C,submit:function(e){e.preventDefault();var n={name:h,number:C};t.some((function(e){return e.name===n.name}))?B(n):(p(n).then((function(e){r(t.concat(e)),F(" Added ".concat(n.name)),setTimeout((function(){F(null)}),3e3)})).catch((function(e){M(e)})),P())}}),u.a.createElement("h2",null,"Numbers"),u.a.createElement(s,{personsList:t,filter:L,deleteEntry:function(e){window.confirm("Delete ".concat(e.name," ?"))&&(g(e.id).catch((function(n){404===n.response.status?(A("".concat(e.name," is not in the server anymore")),setTimeout((function(){A(null)}),3e3)):(console.log(n.response.data),M(n))})),r(t.filter((function(n){return n.id!==e.id}))))}}))};t(37);o.a.render(u.a.createElement(u.a.StrictMode,null,u.a.createElement(O,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.6695c639.chunk.js.map