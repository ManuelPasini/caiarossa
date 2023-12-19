export default function mapWines() {
    const container = document.getElementById('mapWines');
    const wraptext = document.getElementById('wraptext');
    const innerWraptext = document.getElementById('inner_wraptext');
    let title, text, extratext;
    const defaultData = {};
    const offset = 64;
    let defaultElement, pin;

    async function getData() {
        const request = {
            method: 'GET',
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await fetch('/assets/json/mapWines.json', request);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            createPins(responseData);
            return responseData;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    function createPins(items) {
        items.forEach((item, i) => {
            pin = createPin(item);
            container.appendChild(pin);

            if (i === 0) {
                setDefaultStyles(pin, item);
            }

            if (pin !== defaultElement) {
                pin.addEventListener('mouseenter', () => handleMouseEnter(item));
                pin.addEventListener('mouseleave', () => handleMouseLeave(item));
            }
        });
    }

    function createPin(item) {
        const newPin = document.createElement('div');
        newPin.className = 'label40 mapWines__pin';
        newPin.textContent = item.title;
        newPin.style.left = item.position.left + '%';
        newPin.style.top = item.position.top + '%';
        return newPin;
    }

    function setDefaultStyles(pin, item) {
        pin.classList.add('default', 'active');
        wraptext.classList.add('wraptext--bg' + item.color);
        title = document.createElement('div');
        title.className = 'label30 wraptext__title';
        title.textContent = item.title;

        text = document.createElement('div');
        text.className = 'paragraph30 wraptext__text';
        text.textContent = item.text;

        extratext = document.createElement('div');
        extratext.className = 'paragraph30 wraptext__extratext';
        extratext.innerHTML = item.extratext;

        if (extratext.textContent === "") {
            extratext.classList.add("hide");
        }

        innerWraptext.appendChild(title);
        innerWraptext.appendChild(text);
        innerWraptext.appendChild(extratext);

        wraptext.style.height = `${innerWraptext.clientHeight + offset}px`;

        defaultData.title = item.title;
        defaultData.text = item.text;
        defaultData.extratext = item.extratext;
        defaultElement = pin;
    }

    function handleMouseEnter(item) {
        defaultElement.classList.remove("active");
        pin.classList.add('active');
        title.textContent = item.title;
        text.textContent = item.text;
        extratext.innerHTML = item.extratext;
        wraptext.classList.add(item.color);
        innerWraptext.classList.add('transation');

        if (!extratext.textContent) {
            extratext.classList.add("hide");
        } else {
            extratext.classList.remove("hide");
        }

        wraptext.style.height = `${innerWraptext.clientHeight + offset}px`;
        innerWraptext.classList.remove("transation");
    }

    function handleMouseLeave(item) {
        defaultElement.classList.add("active");
        pin.classList.remove('active');
        wraptext.classList.remove(item.color);

        title.textContent = defaultData.title;
        text.textContent = defaultData.text;
        extratext.innerHTML = defaultData.extratext;

        if (!extratext.textContent) {
            extratext.classList.add("hide");
        } else {
            extratext.classList.remove("hide");
        }

        wraptext.style.height = `${innerWraptext.clientHeight + offset}px`;
    }

    getData();
}
