import{Q as c,as as n,aw as V,S as p,ax as f,bm as L,U as i,q as l,c6 as P}from"./entry.c8cb6bef.js";import{b as g,c as k}from"./layout.fd25a13a.js";const C=c({...n(),...g({fullHeight:!0}),...V()},"VApp"),S=p()({name:"VApp",props:C(),setup(e,o){let{slots:a}=o;const s=f(e),{layoutClasses:t,layoutStyles:u,getLayoutItem:m,items:v,layoutRef:d}=k(e),{rtlClasses:y}=L();return i(()=>{var r;return l("div",{ref:d,class:["v-application",s.themeClasses.value,t.value,y.value,e.class],style:[u.value,e.style]},[l("div",{class:"v-application__wrap"},[(r=a.default)==null?void 0:r.call(a)])])}),{getLayoutItem:m,items:v,theme:s}}});const h=c({locale:String,fallbackLocale:String,messages:Object,rtl:{type:Boolean,default:void 0},...n()},"VLocaleProvider"),R=p()({name:"VLocaleProvider",props:h(),setup(e,o){let{slots:a}=o;const{rtlClasses:s}=P(e);return i(()=>{var t;return l("div",{class:["v-locale-provider",s.value,e.class],style:e.style},[(t=a.default)==null?void 0:t.call(a)])}),{}}});export{S as V,R as a};