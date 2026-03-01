import{P as y,j as e}from"./app-CwrJcfHf.js";import{A as N}from"./AuthenticatedLayout-A9PGo4H4.js";import{I as g}from"./InputError-BPGYLZQO.js";import{P as v}from"./PrimaryButton-Dy3tZFYc.js";import{S as i}from"./SecondaryButton-DpU5AQl9.js";import{T as P}from"./TopMenu-B0gwbzjH.js";import{b as C}from"./Utilities-DdOD6L56.js";import"./ApplicationLogo-D7a2NHAH.js";import"./transition-Bw8EfAqk.js";import"./index-DklO7UAZ.js";import"./index-u1m-Swvh.js";const R=({auth:t,lesson:s,chapter:l,course:p})=>{console.log(s,l);const{data:r,setData:a,errors:n,post:c,processing:I}=y({problem:""}),d=o=>{o.preventDefault(),c(route("lesson.uploadProblem",s.id))},u=()=>{let o={...r};o.problem=`texto del problema, ejemplo 3 + 3
tipo de respuesta(s=opción multiple sencillo, m=opción multiple, o=abierto, n=numérico )

respuesta1, 1 o 0 (1 significa correcto)
respuesta2
...

pista1
pista2
...`,a(o)},x=()=>{let o={...r};o.problem="",a(o)},b=o=>{let m={...r};m.problem=o.target.value,a(m)},f=C({course:p,chapter:l,lesson:s},4);let j=["home","prob-set","prob-add"],h=e.jsx(P,{auth:t,title:"Subir Problema",lessonId:s.id,show:j,breadcrumbs:f});return e.jsx(N,{auth:t,user:t.user,header:!1,topMenu:h,children:e.jsx("div",{className:"py-2",children:e.jsxs("div",{className:"mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8",children:[e.jsx("textarea",{value:r.problem,onChange:b,className:"w-full h-96",placeholder:"tecla el problema"}),e.jsx(g,{message:n.problem,className:"mt-2"}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx(v,{className:"mx-1",type:"submit",onClick:d,children:"subir"}),e.jsx(i,{className:"mx-1",onClick:u,children:"ayuda"}),e.jsx(i,{className:"mx-1",onClick:x,children:"limpiar"})]})]})})})};export{R as default};
