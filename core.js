const $=s=>document.querySelector(s),R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,pick=a=>a[R(0,a.length-1)],
shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]),die=()=>R(1,6),
PL=[['Rojo','#d13438'],['Azul','#2f6fe4'],['Verde','#12804a'],['Amarillo','#f6b800']],
chips=(n,t)=>PL.slice(0,n).map((p,i)=>`<span class="chip${i==t?' on':''}" style="--c:${p[1]}"><i></i>${p[0]}</span>`).join('');
// Operación aleatoria. k: 0 +, 1 −, 2 ×, 3 ÷, 4 √, 5 a+b×c, 6 (a+b)×c. m: tamaño máximo de los números.
function opk(k,m){let a=R(2,m),b=R(2,Math.min(m,12)),c=R(2,5),s=R(2,12);if(k==1&&a<b)[a,b]=[b,a];
 return[{t:`${a} + ${b}`,a:a+b},{t:`${a} − ${b}`,a:a-b},{t:`${a} × ${b}`,a:a*b},{t:`${a*b} ÷ ${b}`,a:a},{t:`√${s*s}`,a:s},{t:`${a} + ${b} × ${c}`,a:a+b*c},{t:`(${a} + ${b}) × ${c}`,a:(a+b)*c}][k]}
// Por nivel 1-12: más niveles = más difícil.
const op=l=>opk(R(...[[0,1],[0,2],[2,3],[3,6]][Math.min(3,(l-1)/3|0)]),4+l*2);
function dlg(h,f){let d=$('#dlg');if(!d){d=document.body.appendChild(document.createElement('dialog'));d.id='dlg';d.oncancel=e=>e.preventDefault()}
 d.innerHTML=h;d.showModal();f(d)}
const say=(h,cb,b='Seguir')=>dlg(`<p>${h}</p><button class=btn>${b}</button>`,d=>d.querySelector('button').onclick=()=>{d.close();cb&&cb()}),
ask=(q,cb,h='')=>dlg(`<p>${h}</p><h2${q.w?' class=s':''}>${q.t}${q.w?'':' = ?'}</h2><input type=number inputmode=numeric autocomplete=off aria-label="Tu respuesta"><button class=btn>¡Listo!</button>`,d=>{
 const i=d.querySelector('input'),go=()=>{if(i.value==='')return i.focus();d.close();cb(+i.value===q.a)};
 d.querySelector('button').onclick=go;i.onkeydown=e=>e.key=='Enter'&&go();i.focus()});
// Autocomprobación: abre cualquier página con ?test y mira la consola.
if(location.search=='?test')for(let i=0;i<999;i++){const q=op(R(1,12));console.assert(Number.isInteger(q.a)&&q.a>=0,q)}
