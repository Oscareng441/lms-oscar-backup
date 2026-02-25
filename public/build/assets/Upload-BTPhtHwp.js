import{P as y,j as e}from"./app-Dj-WSTqh.js";import{A as N}from"./AuthenticatedLayout-DAe5xmF8.js";import{I as g}from"./InputError-D3Kf9Qy0.js";import{P as v}from"./PrimaryButton-BOZsfa8T.js";import{S as i}from"./SecondaryButton-Ceu1Tu1N.js";import{T as P}from"./TopMenu-B4s_6Z2g.js";import{b as C}from"./Utilities-DdOD6L56.js";import"./ApplicationLogo-BZ_AV8Md.js";import"./transition-NOEThzc5.js";import"./index-B8D7gOEQ.js";import"./index-VK_PQwkh.js";import"./index-DATM_pEw.js";const U=({auth:t,lesson:s,chapter:l,course:p})=>{console.log(s,l);const{data:r,setData:a,errors:n,post:c,processing:I}=y({problem:""}),d=o=>{o.preventDefault(),c(route("lesson.uploadProblem",s.id))},u=()=>{let o={...r};o.problem=`texto del problema, ejemplo 3 + 3
tipo de respuesta(s=opción multiple sencillo, m=opción multiple, o=abierto, n=numérico )

respuesta1, 1 o 0 (1 significa correcto)
respuesta2
...

pista1
pista2
...`,a(o)},x=()=>{let o={...r};o.problem="",a(o)},b=o=>{let m={...r};m.problem=o.target.value,a(m)},f=C({course:p,chapter:l,lesson:s},4);let j=["home","prob-set","prob-add"],h=e.jsx(P,{auth:t,title:"Subir Problema",lessonId:s.id,show:j,breadcrumbs:f});return e.jsx(N,{auth:t,user:t.user,header:!1,topMenu:h,children:e.jsx("div",{className:"py-2",children:e.jsxs("div",{className:"mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8",children:[e.jsx("textarea",{value:r.problem,onChange:b,className:"w-full h-96",placeholder:"tecla el problema"}),e.jsx(g,{message:n.problem,className:"mt-2"}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx(v,{className:"mx-1",type:"submit",onClick:d,children:"subir"}),e.jsx(i,{className:"mx-1",onClick:u,children:"ayuda"}),e.jsx(i,{className:"mx-1",onClick:x,children:"limpiar"})]})]})})})};export{U as default};
