async function setup() {
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await setup();
    });
} else {
    await setup();
}
