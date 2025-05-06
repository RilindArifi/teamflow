import{_ as u,c as l,o as a,e as s,n as t,a as d,t as r,q as o,v as c,F as n}from"./index-DDNgua1v.js";const m={name:"Card",props:{className:{type:String,default:""},title:{type:String,default:""},titleClass:{type:String,default:""},subtitle:{type:String,default:""},subtitleClass:{type:String,default:""},img:{type:String,default:""},imaClass:{type:String,default:""},imgTop:{type:Boolean,default:!1},imgBottom:{type:Boolean,default:!1},gapNull:{type:Boolean,default:!1},overlay:{type:Boolean,default:!1},noborder:{type:Boolean,default:!1},bodyClass:{type:String,default:"p-6"}}},f={class:"flex-1"},b={key:0,class:"flex-0"},g=["src"],y={class:"mb-5"},h={class:"card-text h-full"};function v(i,k,e,_,x,C){return a(),l(n,null,[e.overlay?s("",!0):(a(),l("div",{key:0,class:t(`card rounded-md bg-white dark:bg-slate-800 lg:h-full  ${this.$store.themeSettingsStore.skin==="bordered"?" border border-gray-5002 dark:border-slate-700":"shadow-base"}
   
    ${e.className}
    
    `)},[d("div",{class:t(["card-body flex flex-col",e.bodyClass])},[e.title||e.subtitle?(a(),l("header",{key:0,class:t(["flex mb-5 items-center",`
      ${e.imgTop?"order-1":""}
      ${e.noborder?"":"border-b border-slate-100 dark:border-slate-700 pb-5  -mx-6 px-6"}
      
      `])},[d("div",f,[e.title?(a(),l("div",{key:0,class:t(["card-title text-slate-900 dark:text-white",e.titleClass])},r(e.title),3)):s("",!0),e.subtitle?(a(),l("div",{key:1,class:t(["card-subtitle",e.subtitleClass])},r(e.subtitle),3)):s("",!0)]),i.$slots.header?(a(),l("div",b,[o(i.$slots,"header",{},void 0,!0)])):s("",!0)],2)):s("",!0),e.img?(a(),l("div",{key:1,class:t(["image-box",`
        ${e.imgTop?"order-0":""}
        ${e.gapNull?"-mx-6 ":""}
        ${e.gapNull&&e.imgTop?"-mt-6 ":""}
        ${e.gapNull&&e.imgBottom?"-mb-6 ":""}
        
        ${e.imgBottom?"order-3 mt-6":" mb-6"}
        
        
        `])},[d("img",{src:e.img,alt:"",class:t(["block w-full h-full object-cover",e.imaClass])},null,10,g)],2)):s("",!0),d("div",{class:t([e.imgTop?"order-2":"","card-text h-full"])},[o(i.$slots,"default",{},void 0,!0)],2)],2)],2)),e.overlay?(a(),l("div",{key:1,class:t(["rounded-md overlay bg-no-repeat bg-center bg-cover card",e.className]),style:c({backgroundImage:`url(${e.img})`})},[d("div",{class:t(["card-body h-full flex flex-col justify-center",e.bodyClass])},[d("header",y,[e.title?(a(),l("div",{key:0,class:t(["card-title text-slate-900 dark:text-white",e.titleClass])},r(e.title),3)):s("",!0),e.subtitle?(a(),l("div",{key:1,class:t(["card-subtitle",e.subtitleClass])},r(e.subtitle),3)):s("",!0)]),d("div",h,[o(i.$slots,"default",{},void 0,!0)])],2)],6)):s("",!0)],64)}const B=u(m,[["render",v],["__scopeId","data-v-cda99232"]]);export{B as C};
