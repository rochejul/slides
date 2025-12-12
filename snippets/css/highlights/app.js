function applyPronounsSyntax() {
    const pronounSet = new Set([
        'i',
        'me',
        'my',
        'mine',
        'myself',
        'you',
        'your',
        'yours',
        'yourself',
        'yourselves',
        'he',
        'him',
        'his',
        'himself',
        'she',
        'her',
        'hers',
        'herself',
        'it',
        'its',
        'itself',
        'we',
        'us',
        'our',
        'ours',
        'ourselves',
        'they',
        'them',
        'their',
        'theirs',
        'themselves',
        'who',
        'whom',
        'whose',
        'whoever',
        'whomever',
    ]);

    const p = document.querySelector('#text');
    const textNode = p.firstChild; // assumes a single text node
    const text = textNode.textContent;
    const seg = new Intl.Segmenter('en', { granularity: 'word' });
    const ranges = [];

    for (const { segment, index, isWordLike } of seg.segment(text)) {
        if (!isWordLike) {
            continue;
        }

        if (pronounSet.has(segment.toLowerCase())) {
            const r = new Range();
            r.setStart(textNode, index);
            r.setEnd(textNode, index + segment.length);
            ranges.push(r);
        }
    }

    const pronouns = new Highlight(...ranges);
    CSS.highlights.set('pronouns', pronouns);
}

function lexCss(codeAsText) {
    const tokens = [];
    let t = 0;
    const p = new Set(['{', '}', '(', ')', ';', ':', ',']);

    for (; t < codeAsText.length; ) {
        const o = codeAsText[t];
        if (/\s/.test(o)) {
            t++;
            continue;
        }
        if (o === '/' && codeAsText[t + 1] === '/') {
            const i = t;
            for (
                t += 2;
                t < codeAsText.length &&
                codeAsText[t] !==
                    `
`;

            )
                t++;
            tokens.push({ type: 'comment', start: i, end: t, value: codeAsText.slice(i, t) });
            continue;
        }

        if (o === '/' && codeAsText[t + 1] === '*') {
            const i = t;
            for (t += 2; t < codeAsText.length - 1 && !(codeAsText[t] === '*' && codeAsText[t + 1] === '/'); ) t++;
            (t += 2), tokens.push({ type: 'comment', start: i, end: t, value: codeAsText.slice(i, t) });
            continue;
        }

        if (o === '"' || o === "'") {
            const i = t,
                g = o;
            for (t++; t < codeAsText.length && codeAsText[t] !== g; ) codeAsText[t] === '\\' && t++, t++;
            t++, tokens.push({ type: 'string', start: i, end: t, value: codeAsText.slice(i, t) });
            continue;
        }

        if (o === '#') {
            const i = t;
            for (t++; t < codeAsText.length && /[0-9a-fA-F]/.test(codeAsText[t]); ) t++;
            tokens.push({ type: 'string', start: i, end: t, value: codeAsText.slice(i, t) });
            continue;
        }

        if (/\d/.test(o)) {
            const i = t;
            for (; t < codeAsText.length && /[\d.]/.test(codeAsText[t]); ) t++;
            tokens.push({ type: 'number', start: i, end: t, value: codeAsText.slice(i, t) });
            continue;
        }

        if (o === ':' && codeAsText[t + 1] === ':') {
            const i = t;
            for (t += 2; t < codeAsText.length && /[a-zA-Z-]/.test(codeAsText[t]); ) t++;
            tokens.push({ type: 'keyword', start: i, end: t, value: codeAsText.slice(i, t) });
            continue;
        }

        if (/[a-zA-Z-]/.test(o)) {
            const i = t;
            for (; t < codeAsText.length && /[a-zA-Z0-9-]/.test(codeAsText[t]); ) t++;
            tokens.push({ type: 'identifier', start: i, end: t, value: codeAsText.slice(i, t) });
            continue;
        }

        if (p.has(o)) {
            tokens.push({ type: 'punctuation', start: t, end: t + 1, value: o }), t++;
            continue;
        }

        t++;
    }

    return tokens;
}

function applyCssSyntax() {
    const p = document.querySelector('#css');
    const textNode = p.firstChild; // assumes a single text node
    const code = textNode.textContent;

    // Tokenize the code (using your lexer of choice)
    const tokens = lexCss(code);

    // Create ranges for each token
    const tokenRanges = tokens.map((token) => {
        const range = new Range();
        range.setStart(textNode, token.start);
        range.setEnd(textNode, token.end);
        return { type: token.type, range };
    });

    // Group ranges by token type
    const highlightsByType = Map.groupBy(tokenRanges, (item) => item.type);

    // Create highlights and register them
    const createdHighlights = new Map();

    for (const [type, items] of highlightsByType) {
        const ranges = items.map((item) => item.range);
        const highlight = new Highlight(...ranges);
        createdHighlights.set(type, highlight);

        // Register with global CSS highlights registry
        const existing = CSS.highlights.get(type);
        if (existing) {
            ranges.forEach((range) => existing.add(range));
        } else {
            CSS.highlights.set(type, highlight);
        }
    }
}

async function setup() {
    applyPronounsSyntax();
    applyCssSyntax();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await setup();
    });
} else {
    await setup();
}
