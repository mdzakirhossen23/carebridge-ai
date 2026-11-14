(()=>{
'use strict';
const active=location.pathname.endsWith('/public-demo.html');
const prefix='bahar-public-demo:v1:';
let callback,ready=false,loaded=document.readyState==='complete',started=false;
window.BaharPublicDemo={active,register(fn){callback=fn;launch()},ready(){ready=true;launch()},ignoreWorker(){return Promise.resolve({update:()=>Promise.resolve()})}};
if(active){
 navigator.serviceWorker?.getRegistration().then(reg=>reg?.update()).catch(()=>{});
 const proto=Storage.prototype,get=proto.getItem,set=proto.setItem,remove=proto.removeItem,key=proto.key,clear=proto.clear;
 proto.getItem=function(k){return get.call(this,prefix+String(k))};
 proto.setItem=function(k,v){return set.call(this,prefix+String(k),v)};
 proto.removeItem=function(k){return remove.call(this,prefix+String(k))};
 proto.key=function(i){const list=[];for(let j=0;j<this.length;j++){const k=key.call(this,j);if(k?.startsWith(prefix))list.push(k.slice(prefix.length))}return list[i]??null};
 proto.clear=function(){const list=[];for(let j=0;j<this.length;j++){const k=key.call(this,j);if(k?.startsWith(prefix))list.push(k)}list.forEach(k=>remove.call(this,k))};
 const factory=IDBFactory.prototype,open=factory.open,del=factory.deleteDatabase;
 factory.open=function(name,version){return version===undefined?open.call(this,prefix+name):open.call(this,prefix+name,version)};
 factory.deleteDatabase=function(name){return del.call(this,prefix+name)};
}
function launch(){if(!active||!ready||!loaded||!callback||started)return;started=true;Promise.resolve().then(callback).then(()=>{document.documentElement.dataset.publicDemo='ready'}).catch(error=>{console.error('Public demo:',error);document.documentElement.dataset.publicDemo='error';const e=document.getElementById('baharPublicDemoControl');if(e)e.textContent='ডেমো খুলতে সমস্যা হয়েছে — আবার চেষ্টা করুন';});}
window.addEventListener('load',()=>{loaded=true;launch()},{once:true});
if(loaded)launch()
})();
