/** @import { Highlight } from '@types/web';  */

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

function isEqualCarriageReturn(character) {
    return (
        character ===
        `
`
    );
}

function lexCss(codeAsText) {
    const tokens = [];
    let index = 0;
    const punctuations = new Set(['{', '}', '(', ')', ';', ':', ',']);

    for (; index < codeAsText.length; ) {
        const character = codeAsText[index];

        if (/\s/.test(character)) {
            index++;
            continue;
        }

        if (character === '/' && codeAsText[index + 1] === '/') {
            const i = index;
            for (index += 2; index < codeAsText.length && !isEqualCarriageReturn(codeAsText[index]); ) {
                index++;
            }

            tokens.push({ type: 'comment', start: i, end: index, value: codeAsText.slice(i, index) });
            continue;
        }

        if (character === '/' && codeAsText[index + 1] === '*') {
            const i = index;
            for (index += 2; index < codeAsText.length - 1 && !(codeAsText[index] === '*' && codeAsText[index + 1] === '/'); ) index++;
            (index += 2), tokens.push({ type: 'comment', start: i, end: index, value: codeAsText.slice(i, index) });
            continue;
        }

        if (character === '"' || character === "'") {
            const i = index,
                g = character;
            for (index++; index < codeAsText.length && codeAsText[index] !== g; ) codeAsText[index] === '\\' && index++, index++;
            index++, tokens.push({ type: 'string', start: i, end: index, value: codeAsText.slice(i, index) });
            continue;
        }

        if (character === '#') {
            const i = index;
            for (index++; index < codeAsText.length && /[0-9a-fA-F]/.test(codeAsText[index]); ) index++;
            tokens.push({ type: 'string', start: i, end: index, value: codeAsText.slice(i, index) });
            continue;
        }

        if (/\d/.test(character)) {
            const i = index;
            for (; index < codeAsText.length && /[\d.]/.test(codeAsText[index]); ) index++;
            tokens.push({ type: 'number', start: i, end: index, value: codeAsText.slice(i, index) });
            continue;
        }

        if (character === ':' && codeAsText[index + 1] === ':') {
            const i = index;
            for (index += 2; index < codeAsText.length && /[a-zA-Z-]/.test(codeAsText[index]); ) index++;
            tokens.push({ type: 'keyword', start: i, end: index, value: codeAsText.slice(i, index) });
            continue;
        }

        if (/[a-zA-Z-]/.test(character)) {
            const i = index;
            for (; index < codeAsText.length && /[a-zA-Z0-9-]/.test(codeAsText[index]); ) index++;
            tokens.push({ type: 'identifier', start: i, end: index, value: codeAsText.slice(i, index) });
            continue;
        }

        if (punctuations.has(character)) {
            tokens.push({ type: 'punctuation', start: index, end: index + 1, value: character }), index++;
            continue;
        }

        index++;
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
