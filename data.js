// All people, companies, messages and figures below are FICTIONAL SAMPLE DATA for the demo.
window.SAMPLE = {
  company: "Alder & Finch Trading (fictional)",
  sources: [
    {k:"gcal", n:"Google Calendar", d:"Today’s agenda", ico:"cal"},
    {k:"gmail", n:"Gmail", d:"Priority inbox", ico:"mail"},
    {k:"outlook", n:"Outlook / Microsoft 365", d:"Calendar and mail", ico:"mail"},
    {k:"wa", n:"WhatsApp Business", d:"Messages to reply to", ico:"chat"}
  ],
  agenda: [
    {id:"a1", t:"08:30", end:"09:00", title:"Leadership stand-up", where:"Boardroom", src:"gcal"},
    {id:"a2", t:"10:00", end:"10:45", title:"Contract renewal call: Harbourline Logistics", where:"Video call", src:"outlook", note:"Omar emailed revised terms last night. Summary in your inbox."},
    {id:"a3", t:"12:30", end:"13:30", title:"Lunch with Priya Raman (board adviser)", where:"Marina, table booked", src:"gcal"},
    {id:"a4", t:"15:00", end:"16:00", title:"Quarterly review with Finance", where:"Room 2", src:"outlook", note:"Sarah needs the Q4 budget approved before this."},
    {id:"a5", t:"17:00", end:"17:30", title:"Interview: Head of Operations candidate", where:"Room 1", src:"gcal"}
  ],
  inbox: [
    {id:"e1", from:"Omar Haddad · Harbourline Logistics", subj:"Revised renewal terms", pri:"High", src:"gmail",
     sum:"Offers a 2-year renewal at 4% lower rates if signed by Friday. Wants to confirm on today’s 10:00 call.",
     reply:"Hi Omar, thanks for the revised terms. Let’s go through them on our 10:00 call today. I’d like to understand the service levels behind the lower rate before we commit. Best, Alex"},
    {id:"e2", from:"Sarah Klein · Finance", subj:"Q4 budget for approval", pri:"High", src:"outlook",
     sum:"Q4 budget is ready. Two lines are above plan: marketing events and IT licences. Needs your approval before the 15:00 review.",
     reply:"Thanks Sarah. Approved in principle. Please bring a short note on the events and IT licence overspend to the 15:00 review so we can agree on them there. Alex"},
    {id:"e3", from:"Tom Reyes · Marketing", subj:"Launch date for the spring range", pri:"Medium", src:"gmail",
     sum:"Asks you to choose between two launch dates: 3 March or 17 March. Supplier stock is confirmed for both.",
     reply:"Hi Tom, let’s go with 17 March. It gives the sales team two more weeks with samples. Please confirm with the supplier. Alex"},
    {id:"e4", from:"Industry newsletter", subj:"Weekly digest", pri:"Low", src:"outlook",
     sum:"Routine newsletter. Nothing needs action. Filed to Read later.", reply:""}
  ],
  wa: [
    {id:"w1", from:"Layla (Head of Sales)", time:"07:52", msg:"Morning! Can you join the Harbourline call at 10? They want to talk price.", reply:"Morning Layla, yes, I’ll join at 10. Let’s hold on price until we’ve seen their service levels."},
    {id:"w2", from:"Daniel · Coastline Packaging (supplier)", time:"Yesterday", msg:"Shipment delayed by 3 days due to a port backlog. New ETA Monday.", reply:"Thanks for the heads-up, Daniel. Please send the updated delivery note so we can let our customers know."},
    {id:"w3", from:"Aisha (Executive assistant)", time:"08:05", msg:"Board pack draft is in the shared folder. Can you review before Thursday?", reply:"Thanks Aisha, I’ll review it tomorrow morning and send comments by midday."}
  ],
  tasks: [
    {id:"t1", t:"Approve Q4 budget", due:"Today, before 15:00", st:"due"},
    {id:"t2", t:"Follow up Cedar Point proposal", due:"2 days overdue", st:"late"},
    {id:"t3", t:"Sign off Head of Operations shortlist", due:"Tomorrow", st:""},
    {id:"t4", t:"Review board pack draft", due:"Thursday", st:""}
  ],
  // Sales in AED thousands (sample figures)
  sales: {months:["May","Jun","Jul","Aug","Sep","Oct"], actual:[1620,1710,1580,1890,1960,1840], target:2200, last:1960, mtdDay:14},
  pipeline: [
    {stage:"Lead", deals:[{n:"Meridian Hotels (fictional)", v:180, next:"Intro call booked for Thursday"}]},
    {stage:"Qualified", deals:[{n:"Bluewater Retail (fictional)", v:320, next:"Send capability deck"},{n:"Oakline Clinics (fictional)", v:95, next:"Confirm decision-maker"}]},
    {stage:"Proposal", deals:[{n:"Cedar Point Group (fictional)", v:540, next:"Follow up: proposal sent 9 days ago"}]},
    {stage:"Negotiation", deals:[{n:"Harbourline Logistics (fictional)", v:760, next:"Renewal call today 10:00"}]},
    {stage:"Won", deals:[{n:"Sandstone Interiors (fictional)", v:210, next:"Kick-off meeting next week"}]}
  ],
  market: [
    {type:"Tip", title:"Batch your approvals into two short windows a day", body:"Try blocking 15 minutes after the morning brief and again before close to clear approvals in one go.", src:"sample-source.example/leadership-habits"},
    {type:"Trend", title:"Buyers asking for shorter contract terms", body:"Sample item: procurement teams in the sector are reported to favour 12-month terms with renewal options.", src:"sample-source.example/sector-trends"},
    {type:"Competitor move", title:"A competitor opened a second warehouse", body:"Sample item: a fictional competitor, Northgate Supply, announced a new site closer to the port.", src:"sample-source.example/competitor-news"},
    {type:"Opportunity", title:"Hospitality groups refreshing suppliers", body:"Sample item: two fictional hotel groups have opened supplier tenders this quarter. Meridian Hotels is already in your pipeline.", src:"sample-source.example/tenders"}
  ]
};
