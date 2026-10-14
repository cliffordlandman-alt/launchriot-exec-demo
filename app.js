// LaunchRiot for Executives: demo dashboard. Fictional sample data. Nothing is sent or connected.
(function(){
var S = window.SAMPLE, con = {}, done = {}, log = [], chat = [], agenda = S.agenda.map(function(a){return Object.assign({},a)}), taskDone = {};
var $ = function(id){return document.getElementById(id)};
var esc = function(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
var ICO = {
  cal:'<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 5L2 7"/>',
  chat:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  check:'<path d="M20 6 9 17l-5-5"/>'
};
function ic(k){return '<svg class="ic" viewBox="0 0 24 24">'+ICO[k]+'</svg>'}
function toast(t){var el=$("toast");el.textContent=t;el.classList.add("on");clearTimeout(toast.h);toast.h=setTimeout(function(){el.classList.remove("on")},2600)}
function anyCon(keys){return keys.some(function(k){return con[k]})}
function srcName(k){return S.sources.filter(function(s){return s.k==k})[0].n}
function aed(k){return "AED "+(k>=1000?(k/1000).toFixed(2).replace(/0$/,"")+"m":k+"k")}
function locked(what,keys){return '<div class="locked">Connect '+keys.map(srcName).join(" or ")+' to see '+what+'.</div>'}
function sample(){return '<span class="tag">Sample</span>'}

$("today").textContent = new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})+" · "+S.company;

function renderConn(){
  $("conn").innerHTML = S.sources.map(function(s){
    return '<button class="conn'+(con[s.k]?' on':'')+'" data-con="'+s.k+'"><span class="ico">'+ic(s.ico)+'</span><span><b>'+s.n+'</b><small>'+(con[s.k]?'Connected (demo)':s.d)+'</small></span><em>'+(con[s.k]?ic("check"):'Connect')+'</em></button>';
  }).join("");
}

function brief(){
  var n=0, lines=[];
  if(anyCon(["gcal","outlook"])){var a=agenda.filter(function(x){return con[x.src]});lines.push(a.length+" meetings today. The one to prepare for: "+(con.outlook?"Harbourline renewal at 10:00.":a[0].title+" at "+a[0].t+"."))}
  if(anyCon(["gmail","outlook"])){var e=S.inbox.filter(function(x){return con[x.src]&&x.pri=="High"&&!done[x.id]});if(e.length)lines.push(e.length+" priority email"+(e.length>1?"s":"")+" with a reply drafted for you to approve.")}
  if(con.wa){var w=S.wa.filter(function(x){return !done[x.id]}).length;if(w)lines.push(w+" WhatsApp message"+(w>1?"s":"")+" waiting for a reply.")}
  lines.push("Sales are at "+Math.round(S.sales.actual[5]/S.sales.target*100)+"% of this month’s target. Cedar Point proposal follow-up is 2 days overdue.");
  lines.push("Daily market brief: 4 new items, including a tender opportunity that matches your pipeline.");
  return '<div class="card span2 brief"><div class="card-h"><h3>Morning brief</h3>'+sample()+'</div><p class="from">From your AI assistant · prepared at 07:00</p><ul>'+lines.map(function(l){return '<li>'+esc(l)+'</li>'}).join("")+'</ul>'+(Object.keys(con).length?'':'<p class="note">Connect an account above to fill in your calendar, inbox and WhatsApp.</p>')+'</div>';
}

function agendaCard(){
  var keys=["gcal","outlook"], body;
  if(!anyCon(keys)) body=locked("today’s agenda",keys);
  else body='<ul class="agenda">'+agenda.filter(function(a){return con[a.src]}).sort(function(x,y){return x.t<y.t?-1:1}).map(function(a){
    return '<li><span class="time">'+a.t+'<small>'+a.end+'</small></span><div><b>'+esc(a.title)+'</b><span>'+esc(a.where)+' · '+srcName(a.src)+'</span>'+(a.note?'<em>'+esc(a.note)+'</em>':'')+'</div></li>'}).join("")+'</ul>';
  return '<div class="card"><div class="card-h"><h3>Today’s agenda</h3>'+sample()+'</div>'+body+'</div>';
}

function draftBlock(id,text,label){
  if(done[id]) return '<div class="sent">'+ic("check")+' '+done[id]+'</div>';
  return '<textarea id="d-'+id+'" rows="3" aria-label="Suggested reply">'+esc(text)+'</textarea><div class="acts"><button class="btn btn-primary btn-xs" data-ok="'+id+'">'+(label||"Approve & send")+'</button><button class="btn btn-ghost btn-xs" data-no="'+id+'">Dismiss</button></div>';
}

function inboxCard(){
  var keys=["gmail","outlook"], body;
  if(!anyCon(keys)) body=locked("your priority inbox",keys);
  else body=S.inbox.filter(function(e){return con[e.src]}).map(function(e){
    return '<div class="item"><div class="item-h"><b>'+esc(e.from)+'</b><span class="pri p-'+e.pri.toLowerCase()+'">'+e.pri+'</span></div><div class="subj">'+esc(e.subj)+' · '+srcName(e.src)+'</div><p class="ai"><span>AI summary</span>'+esc(e.sum)+'</p>'+(e.reply?draftBlock(e.id,e.reply):'')+'</div>'}).join("");
  return '<div class="card"><div class="card-h"><h3>Priority inbox</h3>'+sample()+'</div>'+body+'</div>';
}

function waCard(){
  var body = !con.wa ? locked("WhatsApp messages",["wa"]) : S.wa.map(function(w){
    return '<div class="item"><div class="item-h"><b>'+esc(w.from)+'</b><span class="muted">'+w.time+'</span></div><p class="bubble">'+esc(w.msg)+'</p>'+draftBlock(w.id,w.reply)+'</div>'}).join("");
  return '<div class="card"><div class="card-h"><h3>WhatsApp: needs a reply</h3>'+sample()+'</div>'+body+'</div>';
}

function tasksCard(){
  return '<div class="card"><div class="card-h"><h3>Tasks &amp; follow-ups</h3>'+sample()+'</div><ul class="tasks">'+S.tasks.map(function(t){
    return '<li class="'+(taskDone[t.id]?'td':'')+'"><button class="chk" data-task="'+t.id+'" aria-label="Mark done">'+(taskDone[t.id]?ic("check"):'')+'</button><div><b>'+esc(t.t)+'</b><span class="'+t.st+'">'+esc(t.due)+'</span></div></li>'}).join("")+'</ul><p class="note">Tasks are picked up from your emails and meetings.</p></div>';
}

function salesCard(){
  var s=S.sales, cur=s.actual[5], max=Math.max(s.target,Math.max.apply(null,s.actual))*1.1, W=300, H=120, bw=W/s.actual.length;
  var bars=s.actual.map(function(v,i){var h=v/max*H;return '<rect x="'+(i*bw+8)+'" y="'+(H-h)+'" width="'+(bw-16)+'" height="'+h+'" rx="4" class="'+(i==5?'b-now':'b')+'"/><text x="'+(i*bw+bw/2)+'" y="'+(H+15)+'" text-anchor="middle">'+s.months[i]+'</text>'}).join("");
  var ty=H-s.target/max*H;
  var pct=Math.round(cur/s.target*100), vs=Math.round((cur-s.last)/s.last*100);
  return '<div class="card"><div class="card-h"><h3>Monthly sales</h3>'+sample()+'</div><div class="kpis"><div><small>This month (to day '+s.mtdDay+')</small><b>'+aed(cur)+'</b></div><div><small>Target</small><b>'+aed(s.target)+'</b><span>'+pct+'% reached</span></div><div><small>Last month</small><b>'+aed(s.last)+'</b><span>'+(vs>=0?'+':'')+vs+'% vs last</span></div></div><div class="bar-track"><i style="width:'+Math.min(pct,100)+'%"></i></div><svg class="chart" viewBox="0 0 '+W+' '+(H+20)+'" role="img" aria-label="Sample monthly sales chart">'+bars+'<line x1="0" x2="'+W+'" y1="'+ty+'" y2="'+ty+'" class="tline"/><text x="'+W+'" y="'+(ty-4)+'" text-anchor="end" class="tl">Target</text></svg><p class="note">Fictional figures in AED, for the demo only.</p></div>';
}

function pipeCard(){
  var tot=0;S.pipeline.forEach(function(st){st.deals.forEach(function(d){if(st.stage!="Won")tot+=d.v})});
  return '<div class="card span2"><div class="card-h"><h3>Pipeline</h3>'+sample()+'</div><p class="from">Open pipeline: '+aed(tot)+' across '+S.pipeline.filter(function(s){return s.stage!="Won"}).reduce(function(n,s){return n+s.deals.length},0)+' deals (sample)</p><div class="pipe">'+S.pipeline.map(function(st){
    var v=st.deals.reduce(function(n,d){return n+d.v},0);
    return '<div class="stage"><div class="stage-h"><b>'+st.stage+'</b><span>'+aed(v)+'</span></div>'+st.deals.map(function(d){return '<div class="deal"><b>'+esc(d.n)+'</b><span class="val">'+aed(d.v)+'</span><span class="next">Next: '+esc(d.next)+'</span></div>'}).join("")+'</div>'}).join("")+'</div></div>';
}

function marketCard(){
  return '<div class="card span2"><div class="card-h"><h3>Daily market brief</h3>'+sample()+'</div><p class="from">Researched by your assistant every morning. These are illustrative sample items, not real news.</p><div class="mkt">'+S.market.map(function(m){
    return '<div class="mi"><span class="mt">'+m.type+'</span><b>'+esc(m.title)+'</b><p>'+esc(m.body)+'</p><span class="srcl">Source (sample): '+esc(m.src)+'</span></div>'}).join("")+'</div></div>';
}

function chatCard(){
  return '<div class="card span2 ask"><div class="card-h"><h3>Ask your assistant</h3>'+sample()+'</div><div class="msgs" id="msgs">'+(chat.length?chat.map(msgHtml).join(""):'<div class="msg bot">Hi Alex. Ask me about your day, or tap a suggestion. I’ll draft things, and nothing goes out until you approve.</div>')+'</div><div class="sugg">'+["What’s my day?","Draft reply to Omar","Reschedule my 3pm","How are sales?","Pipeline update","Any market news?"].map(function(q){return '<button data-q="'+q+'">'+q+'</button>'}).join("")+'</div><form id="ask" class="askf"><input id="askin" placeholder="Ask your assistant…" autocomplete="off" aria-label="Ask your assistant"><button class="btn btn-primary btn-xs">Ask</button></form><p class="note">Scripted answers for the demo.</p></div>';
}

function logCard(){
  return '<div class="card span2"><div class="card-h"><h3>Approved today</h3>'+sample()+'</div>'+(log.length?'<ul class="log">'+log.map(function(l){return '<li>'+ic("check")+'<span>'+esc(l)+'</span></li>'}).join("")+'</ul>':'<p class="note">Nothing approved yet. Everything waits for you: approve a reply above and it shows up here (demo, nothing is really sent).</p>')+'</div>';
}

function msgHtml(m){
  var h='<div class="msg '+m.who+'">'+esc(m.text).replace(/\n/g,"<br>");
  if(m.act){h+=done[m.act.id]?'<div class="sent">'+ic("check")+' '+done[m.act.id]+'</div>':'<div class="acts"><button class="btn btn-primary btn-xs" data-ok="'+m.act.id+'">'+m.act.label+'</button><button class="btn btn-ghost btn-xs" data-no="'+m.act.id+'">Not now</button></div>'}
  return h+'</div>';
}

function render(){
  renderConn();
  $("dash").innerHTML = brief()+agendaCard()+inboxCard()+waCard()+tasksCard()+salesCard()+pipeCard()+marketCard()+chatCard()+logCard();
  var m=$("msgs"); if(m) m.scrollTop=m.scrollHeight;
}

var ACTIONS = {
  rs:{label:"Approve & send invite", log:"Moved ‘Quarterly review with Finance’ from 15:00 to 16:30 and sent the update", run:function(){var a=agenda.filter(function(x){return x.id=="a4"})[0];a.t="16:30";a.end="17:00";a.note="Moved from 15:00 (demo). Interview pushed to 17:30.";var b=agenda.filter(function(x){return x.id=="a5"})[0];b.t="17:30";b.end="18:00"}},
  dr:{label:"Approve & send", log:"Reply to Omar Haddad (Harbourline Logistics) sent"},
  fu:{label:"Approve & send", log:"Follow-up email to Cedar Point Group sent"}
};

function answer(q){
  var t=q.toLowerCase(), r;
  if(/day|today|agenda|schedule|calendar/.test(t)&&!/reschedul|move/.test(t)){
    if(!anyCon(["gcal","outlook"])) r={text:"Connect Google Calendar or Outlook above and I’ll walk you through today."};
    else r={text:"Here’s your day:\n"+agenda.filter(function(a){return con[a.src]}).sort(function(x,y){return x.t<y.t?-1:1}).map(function(a){return a.t+"  "+a.title}).join("\n")+"\nThe one to prepare for is the Harbourline renewal. Omar’s revised terms are summarised in your inbox."};
  } else if(/reschedul|move|3 ?pm|15:00/.test(t)){
    if(!con.outlook) r={text:"Your 3pm (Quarterly review with Finance) is in Outlook. Connect Outlook / Microsoft 365 above and I can move it."};
    else if(done.rs) r={text:"Your 3pm has already been moved to 16:30."};
    else r={text:"Your 3pm is the Quarterly review with Finance. Sarah, Finance and you are all free at 16:30, so I suggest:\n• Move it to 16:30 to 17:00 (shortened to 30 minutes)\n• Push the interview to 17:30\n• Send this note: “Hi all, moving today’s quarterly review to 16:30. Same room. Thanks, Alex”", act:{id:"rs"}};
  } else if(/draft|reply|respond/.test(t)){
    if(/cedar/.test(t)) r={text:"Draft follow-up to Cedar Point Group:\n“Hi Hannah, following up on the proposal we sent last week. Happy to walk your team through it this week. Would Thursday suit? Best, Alex”", act:{id:"fu"}};
    else if(/sarah|budget/.test(t)) r={text:"There’s a reply to Sarah ready in your priority inbox. You can edit it there and approve it."};
    else r={text:"Draft reply to Omar Haddad (Harbourline Logistics):\n“Hi Omar, thanks for the revised terms. Let’s go through them on our 10:00 call. I’d like to see the service levels behind the lower rate before we commit. Best, Alex”", act:{id:"dr"}};
  } else if(/sale|target|revenue/.test(t)){
    var s=S.sales;r={text:"Sales this month (sample): "+aed(s.actual[5])+" against a "+aed(s.target)+" target, "+Math.round(s.actual[5]/s.target*100)+"% reached with about half the month left. Last month closed at "+aed(s.last)+". Closing Harbourline would cover most of the gap."};
  } else if(/pipe|deal/.test(t)){
    r={text:"Pipeline (sample): 5 open deals. The biggest is Harbourline Logistics (AED 760k, in negotiation, call at 10:00). Needs attention: the Cedar Point proposal was sent 9 days ago with no reply. Want me to draft a follow-up? Ask “draft reply to Cedar Point”."};
  } else if(/market|news|competitor|trend|tip/.test(t)){
    r={text:"Today’s market brief (sample items): buyers are asking for shorter contract terms, a competitor opened a second warehouse, and two hotel groups have supplier tenders open. That last one matches Meridian Hotels in your pipeline."};
  } else if(/whatsapp|message/.test(t)){
    r={text:con.wa?S.wa.filter(function(w){return !done[w.id]}).length+" WhatsApp messages need a reply. Layla wants you on the 10:00 call. A reply is drafted under WhatsApp.":"Connect WhatsApp Business above and I’ll show the messages that need you."};
  } else if(/task|follow/.test(t)){
    r={text:"Top of your list: approve the Q4 budget before 15:00, and follow up Cedar Point (2 days overdue)."};
  } else r={text:"In this demo I can answer: “What’s my day?”, “Draft reply to Omar”, “Draft reply to Cedar Point”, “Reschedule my 3pm”, “How are sales?”, “Pipeline update” and “Any market news?”."};
  r.who="bot"; return r;
}

function approve(id){
  var e=S.inbox.concat(S.wa).filter(function(x){return x.id==id})[0];
  if(e){var ta=$("d-"+id);var who=e.from.split(" ·")[0].split(" (")[0];done[id]="Approved. Sent (demo, nothing really left this page)";log.unshift((e.subj?"Email reply to ":"WhatsApp reply to ")+who+": “"+(ta?ta.value:e.reply).slice(0,70)+"…”")}
  else if(ACTIONS[id]){if(ACTIONS[id].run)ACTIONS[id].run();done[id]="Approved. Done (demo)";log.unshift(ACTIONS[id].log)}
  toast("Approved. Demo only: nothing was really sent");render();
}

document.addEventListener("click",function(ev){
  var b=ev.target.closest("button,[data-con]"); if(!b) return;
  if(b.dataset.con){var k=b.dataset.con;con[k]=!con[k];toast(con[k]?srcName(k)+" connected (demo). No real account was linked.":srcName(k)+" disconnected");render();}
  else if(b.id=="connect-all"){S.sources.forEach(function(s){con[s.k]=true});toast("All connected (demo). No real accounts were linked.");render();}
  else if(b.dataset.ok) approve(b.dataset.ok);
  else if(b.dataset.no){done[b.dataset.no]="Dismissed";render();}
  else if(b.dataset.task){taskDone[b.dataset.task]=!taskDone[b.dataset.task];render();}
  else if(b.dataset.q) ask(b.dataset.q);
});
document.addEventListener("submit",function(ev){if(ev.target.id=="ask"){ev.preventDefault();var v=$("askin").value.trim();if(v)ask(v)}});
function ask(q){chat.push({who:"me",text:q});var a=answer(q);if(a.act)a.act=Object.assign({id:a.act.id},ACTIONS[a.act.id]);chat.push(a);render();var i=$("askin");if(i&&window.innerWidth>760)i.focus()}
window.LRX={con:con,render:render,ask:ask};
render();
})();
