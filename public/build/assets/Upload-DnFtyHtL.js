import{P as y,j as e}from"./app-BuCMyanA.js";import{A as N}from"./AuthenticatedLayout-D7HQ-uKH.js";import{I as g}from"./InputError-DU0QmmqT.js";import{P as v}from"./PrimaryButton-B1PUcY9c.js";import{S as i}from"./SecondaryButton-9GHVJaw0.js";import{T as P}from"./TopMenu-CQNFmiSk.js";import{b as C}from"./Utilities-DdOD6L56.js";import"./ApplicationLogo-BD28DYL4.js";import"./transition-Dr13lc3M.js";import"./index-CFaBWNVv.js";import"./index-Dz8Z05yA.js";import"./index-BrvuDZD_.js";const U=({auth:t,lesson:s,chapter:l,course:p})=>{console.log(s,l);const{data:r,setData:a,errors:n,post:c,processing:I}=y({problem:""}),d=o=>{o.preventDefault(),c(route("lesson.uploadProblem",s.id))},u=()=>{let o={...r};o.problem=`texto del problema, ejemplo 3 + 3
tipo de respuesta(s=opción multiple sencillo, m=opción multiple, o=abierto, n=numérico )

respuesta1, 1 o 0 (1 significa correcto)
respuesta2
...

pista1
pista2
...`,a(o)},x=()=>{let o={...r};o.problem="",a(o)},b=o=>{let m={...r};m.problem=o.target.value,a(m)},f=C({course:p,chapter:l,lesson:s},4);let j=["home","prob-set","prob-add"],h=e.jsx(P,{auth:t,title:"Subir Problema",lessonId:s.id,show:j,breadcrumbs:f});return e.jsx(N,{auth:t,user:t.user,header:!1,topMenu:h,children:e.jsx("div",{className:"py-2",children:e.jsxs("div",{className:"mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8",children:[e.jsx("textarea",{value:r.problem,onChange:b,className:"w-full h-96",placeholder:"tecla el problema"}),e.jsx(g,{message:n.problem,className:"mt-2"}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx(v,{className:"mx-1",type:"submit",onClick:d,children:"subir"}),e.jsx(i,{className:"mx-1",onClick:u,children:"ayuda"}),e.jsx(i,{className:"mx-1",onClick:x,children:"limpiar"})]})]})})})};export{U as default};
