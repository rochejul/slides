const units = Intl.supportedValuesOf('unit');
const currencies = Intl.supportedValuesOf('currency');

async function setupListFormat() {
    const names = ['Mario', 'Peach', 'Daisy', 'Luigi'];

    const formElement = document.querySelector('#list-format-form');
    const renderElement = document.querySelector('#list-format');
    let formatter;
    let currentLanguage;

    formElement.addEventListener('input', (event) => {
        event.preventDefault();
        updateIntlFormatter();
        formatValue();
    });

    function updateIntlFormatter() {
        const formData = new FormData(formElement);
        const intlOptions = Object.fromEntries(formData.entries());

        formatter = new Intl.ListFormat(currentLanguage, intlOptions);
    }

    function formatValue() {
        renderElement.textContent = formatter.format(names);
    }

    return function formatter(language) {
        currentLanguage = language;
        updateIntlFormatter();
        formatValue();
    };
}

async function setupNumberFormat() {
    const number = 3500;

    const formElement = document.querySelector('#number-format-form');
    const renderElement = document.querySelector('#number-format');
    const unitDropDownElement = document.querySelector('#number-format-unit');
    const currencyDropDownElement = document.querySelector('#number-format-currency');
    let formatter;
    let currentLanguage;

    formElement.addEventListener('input', (event) => {
        event.preventDefault();
        updateIntlFormatter();
        formatValue();
    });

    function updateIntlFormatter() {
        const formData = new FormData(formElement);
        const intlOptions = Object.fromEntries(formData.entries());

        if (intlOptions.style === 'unit' && unitDropDownElement.value === '') {
            intlOptions.unit = units[0];
            unitDropDownElement.value = units[0];
        } else if (intlOptions.style === 'currency' && currencyDropDownElement.value === '') {
            intlOptions.currency = currencies[0];
            currencyDropDownElement.value = currencies[0];
        }

        if (intlOptions.currency === '') {
            delete intlOptions.currency;
            delete intlOptions.currencyDisplay;
        }

        if (intlOptions.unit === '') {
            delete intlOptions.unit;
            delete intlOptions.unitDisplay;
        }

        formatter = new Intl.NumberFormat(currentLanguage, intlOptions);
    }

    function formatValue() {
        renderElement.textContent = formatter.format(number);
    }

    units.forEach((value) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        unitDropDownElement.appendChild(option);
    });

    currencies.forEach((value) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        currencyDropDownElement.appendChild(option);
    });

    return function formatter(language) {
        currentLanguage = language;
        updateIntlFormatter();
        formatValue();
    };
}

async function setup() {
    const languageObserver = new Observable((subscriber) => {
        subscriber.next('en');

        document.querySelector('#language').addEventListener('input', (event) => {
            subscriber.next(event.target.value);
        });
    });

    const formatters = [await setupListFormat(), await setupNumberFormat()];

    languageObserver.subscribe({
        next: (language) => {
            formatters.forEach((formatter) => formatter(language));
        },
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await setup();
    });
} else {
    await setup();
}
