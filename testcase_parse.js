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

function parseRoutemapWikitext(rawText) {
    if (!rawText || !rawText.trim()) return null;

    let text = rawText.trim();

    const mapParamMatch = text.match(/\|\s*map\s*=\s*([\s\S]*)/i);
    if (mapParamMatch) {
        text = mapParamMatch[1];
    }

    text = text.replace(/\}\}\s*$/, '');

    // Perbaiki baris terpotong: jika baris diakhiri tanda hubung '-' tanpa pemisah \ atau ~~
    // atau jika baris berikutnya adalah kelanjutan nama ikon yang terputus newline
    const rawLines = text.split(/\r?\n/);
    const mergedLines = [];
    for (let i = 0; i < rawLines.length; i++) {
        let line = rawLines[i].trim();
        if (!line) continue;
        // Jika line diakhiri '-' dan line berikutnya tidak diawali '\\' atau '|' atau '!'
        // atau jika baris saat ini terputus di tengah token nama ikon
        if (line.endsWith('-') && i + 1 < rawLines.length) {
            line = line + rawLines[i + 1].trim();
            i++;
        }
        mergedLines.push(line);
    }

    const grid = [];

    for (let rawLine of mergedLines) {
        let line = rawLine.trim();
        if (!line) continue;

        if (line.startsWith('|') && !line.includes('\\')) continue;
        if (line.startsWith('}}')) continue;

        if (line.startsWith('|') || line.startsWith('!')) {
            line = line.substring(1).trim();
        }

        let iconPart = line;
        if (iconPart.includes('~~')) {
            iconPart = iconPart.split('~~')[0];
        }

        if (iconPart.includes('!')) {
            // Regex mencari pola '! ... !' atau '! !' untuk teks kiri
            iconPart = iconPart.replace(/^.*?![\s!]+/, '');
        }

        const rawCells = iconPart.split('\\');
        const rowCells = [];

        for (let cellStr of rawCells) {
            const trimmedCell = cellStr.trim();
            if (!trimmedCell) {
                rowCells.push([]);
            } else {
                const stackedIcons = trimmedCell
                    .split('!~')
                    .map(icon => icon.trim())
                    .filter(icon => icon.length > 0);
                rowCells.push(stackedIcons);
            }
        }

        if (rowCells.length > 0) {
            grid.push(rowCells);
        }
    }

    let maxCols = 0;
    grid.forEach(row => {
        if (row.length > maxCols) maxCols = row.length;
    });

    grid.forEach(row => {
        while (row.length < maxCols) {
            row.push([]);
        }
    });

    return { grid, rows: grid.length, cols: maxCols };
}

const res = parseRoutemapWikitext(raw);
console.log("Cols:", res.cols, "Rows:", res.rows);
res.grid.forEach((row, r) => {
    console.log(r, row.map(c => c.join('!~') || '_').join('\t'));
});
