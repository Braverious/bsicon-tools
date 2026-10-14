const raw = `{{routemap|legend=track|inline=<includeonly>1</includeonly>|title=Stasiun Duri
|map=
\\\\CONTfa\\CONTg~~{{BSto|ke {{slk|KAI|Angke}}|arah {{slk|KAI|Kampung Bandan}}}}
\\\\RP2q\\SKRZ-G2BUE\\SKRZ-
G2BUE\\RP2q~~{{BSsplit|Jl. Jembatan|Besi Raya}}
\\\\STR+c2\\ABZg3
\\\\ABZg+1\\STR+c4
\\\\\\ABZg2\\STR2+c3\\STRc3
\\\\STRc2\\ABZg3!~STR+c1\\STR+4+c1\\STR+4
ENDEa\\ENDEa!~STRc2\\STR3+1\\STR+c4\\STR\\STR
STR\\ABZg+1\\STRc4\\STR\\STR\\STR
\\PSTR(R)\\PSTR(L)\\PLT\\PSTR(R)\\PSTR(L)\\PSTR\\PLT
\\PLT!~tSTR\\PLT!~tSTR\\PLT\\PLT!~tSTR\\PLT!~tSTR\\PLT!~tSTR\\PLT
\\PLT!~num5r!~tSTR\\PLT!~num4r!~tSTR\\PLT\\PLT!~num3r!~tSTR\\PLT!~num2r!~tSTR\\PLT!~num1r!~tSTR\\PLT!~BUILDING
\\PSTR(R)\\PSTR(L)\\PLT\\PSTR(R)\\PSTR(L)\\PSTR\\PLT
\\PSTR(R)\\PSTR(L)\\PLT\\PSTR(R)\\PSTR(L)\\PSTR\\PARKING
\\STR\\STR\\STRc2\\ABZg3\\STR\\STR\\ELC-PT~~gardu [[listrik aliran atas|LAA]]
STR\\STR+c2\\STR3+1\\STR+c24\\ABZg3\\STR
STR\\ABZg+1\\STRc4\\ABZg+1\\ENDEe!~STRc24\\STR3
\\ABZg2\\ABZg3\\\\STR\\STR+1\\STRc4\\
ABZg+1\\ABZg+4\\numN000\\STR\\STR\\
STR\\ABZg2\\STRc3\\ABZg2\\STR+c3\\
STR\\STR+c1\\STR2+4\\STR+c3!~STRc1\\ABZg+4\\
STR\\STR\\STRc1\\ABZg+4\\STR\\
Jl. Setia Kawan Ujung! !SKRZ-G1\\SKRZ-G1\\\\STR\\STR\\
ABZg2\\STR+c3\\\\ABZg2\\STR+c3\\
STR+c1\\ABZg+4\\\\STR+c1\\ABZg+4\\
{{BSto|ke {{slk|KAI|Grogol}}|arah {{slk|KAI|Tangerang}}}}! !CONTf\\CONTge\\\\CONTf\\CONTge\\~~ke {{slk|KAI|Tanah Abang}}
}}`;

let mapText = raw.match(/\|\s*map\s*=\s*([\s\S]*)/i)[1].replace(/\}\}\s*$/, '');
const lines = mapText.split(/\r?\n/).filter(l => l.trim().length > 0 && !l.trim().startsWith('|'));
lines.forEach((l, i) => {
    let cleaned = l.trim();
    if (cleaned.includes('~~')) cleaned = cleaned.split('~~')[0];
    console.log(i, JSON.stringify(cleaned));
});
