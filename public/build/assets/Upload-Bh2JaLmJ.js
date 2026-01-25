import{P as y,j as e}from"./app-0fzPtwYh.js";import{A as N}from"./AuthenticatedLayout-D-bPrbJV.js";import{I as g}from"./InputError-DcW6PJat.js";import{P as v}from"./PrimaryButton-VEeo_M96.js";import{S as i}from"./SecondaryButton-NqFb25Y1.js";import{T as P}from"./TopMenu-DV1t7k63.js";import{b as C}from"./Utilities-BvA2Fnuk.js";import"./ApplicationLogo-B81D2uOT.js";import"./transition-Bxt2d29g.js";import"./index-BBBWgDHf.js";const L=({auth:t,lesson:o,chapter:l,course:p})=>{console.log(o,l);const{data:r,setData:a,errors:n,post:c,processing:I}=y({problem:""}),d=s=>{s.preventDefault(),c(route("lesson.uploadProblem",o.id))},u=()=>{let s={...r};s.problem=`texto del problema, ejemplo 3 + 3
tipo de respuesta(s=opción multiple sencillo, m=opción multiple, o=abierto, n=numérico )

respuesta1, 1 o 0 (1 significa correcto)
respuesta2
...

pista1
pista2
...`,a(s)},x=()=>{let s={...r};s.problem="",a(s)},b=s=>{let m={...r};m.problem=s.target.value,a(m)},f=C({course:p,chapter:l,lesson:o},4);let j=["home","prob-set","prob-add"],h=e.jsx(P,{auth:t,title:"Subir Problema",lessonId:o.id,show:j,breadcrumbs:f});return e.jsx(N,{auth:t,user:t.user,header:!1,topMenu:h,children:e.jsx("div",{className:"py-2",children:e.jsxs("div",{className:"mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8",children:[e.jsx("textarea",{value:r.problem,onChange:b,className:"w-full h-96",placeholder:"tecla el problema"}),e.jsx(g,{message:n.problem,className:"mt-2"}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx(v,{className:"mx-1",type:"submit",onClick:d,children:"subir"}),e.jsx(i,{className:"mx-1",onClick:u,children:"ayuda"}),e.jsx(i,{className:"mx-1",onClick:x,children:"limpiar"})]})]})})})};export{L as default};
