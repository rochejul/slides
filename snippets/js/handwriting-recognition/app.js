function startStroke(event) {
    activeStroke = {
        stroke: new HandwritingStroke(),
        startTime: Date.now(),
    };
    addPoint(event);
}

function addPoint(event) {
    const timeElapsed = Date.now() - activeStroke.startTime;
    activeStroke.stroke.addPoint({
        x: event.offsetX,
        y: event.offsetY,
        t: timeElapsed,
    });
}

async function setup() {
    if ('createHandwritingRecognizer' in navigator) {
        const recognizer = await navigator.createHandwritingRecognizer({
            languages: ['en'],
        });

        const { languages, alternatives, segmentationResults } = await navigator.queryHandwritingRecognizerSupport({
            languages: ['en'],
            alternatives: true,
            segmentationResult: true,
        });

        let drawing;
        let activeStroke;

        const canvas = document.querySelector('canvas');
        canvas.addEventListener('pointerdown', (event) => {
            if (!drawing) {
                drawing = recognizer.startDrawing({
                    recognitionType: 'text', // email, number, per-character
                    inputType: ['mouse', 'touch', 'pen'].find((type) => type === event.pointerType),
                    textContext: 'Hello, ',
                    alternatives: 2,
                    graphemeSet: ['f', 'i', 'z', 'b', 'u'], // for a fizz buzz entry form
                });
            }
            startStroke(event);
        });

        canvas.addEventListener('pointermove', (event) => {
            if (activeStroke) {
                addPoint(event);
            }
        });

        canvas.addEventListener('pointerup', async (event) => {
            drawing.addStroke(activeStroke.stroke);
            activeStroke = null;

            const [mostLikelyPrediction, ...lessLikelyAlternatives] = await drawing.getPrediction();
            if (mostLikelyPrediction) {
                console.log(mostLikelyPrediction.text);
            }
            lessLikelyAlternatives?.forEach((alternative) => console.log(alternative.text));

            drawing.clear();
            recognizer.finish();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await setup();
    });
} else {
    await setup();
}
