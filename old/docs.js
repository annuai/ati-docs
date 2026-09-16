
(function(){
  const input=document.querySelector('[data-doc-search]');
  if(!input)return;
  const pages=[
    ['index.html','Overview','What ATI Flow is and how to understand the system.'],
    ['ati-flow-architecture.html','Architecture','Business systems, integrations, orchestration, fleet and robot layers.'],
    ['amr-deployment-workflow.html','Deployment workflow','Site assessment, mapping, missions, fleet management, testing and go-live.'],
    ['amr-software-ia-roles.html','IA & Roles','Pages, permissions and responsibilities.'],
    ['ati-flow-glossary.html','Glossary','Shared terminology for robots, fleets, zones, missions and states.'],
    ['ati-flow-screens.html','Product tour','How to understand the main ATI Flow screens.'],
    ['ati-flow-faq.html','FAQ & Questions','Onboarding questions and ATI-specific items to validate.']
  ];
  const box=document.createElement('div');
  box.style.cssText='position:absolute;top:46px;left:0;right:0;background:#fff;border:1px solid #E4E7E6;border-radius:10px;box-shadow:0 8px 24px rgba(16,24,40,.10);padding:6px;display:none;z-index:30';
  input.parentElement.appendChild(box);
  function render(q){
    q=q.trim().toLowerCase();
    if(!q){box.style.display='none';return}
    const m=pages.filter(p=>p[1].toLowerCase().includes(q)||p[2].toLowerCase().includes(q));
    box.innerHTML=m.length?m.map(p=>`<a href="${p[0]}" style="display:block;padding:9px 10px;text-decoration:none;border-radius:7px"><strong style="font-size:12px">${p[1]}</strong><div style="font-size:10px;color:#858B89">${p[2]}</div></a>`).join(''):'<div style="padding:10px;font-size:12px;color:#858B89">No documentation page found.</div>';
    box.style.display='block';
  }
  input.addEventListener('input',()=>render(input.value));
  document.addEventListener('click',e=>{if(!input.parentElement.contains(e.target))box.style.display='none'});
})();
