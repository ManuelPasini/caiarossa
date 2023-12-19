export default function mapWines() {
    var container = document.getElementById('mapWines');
    var wraptext = document.getElementById('wraptext');
    var innerWraptext = document.getElementById('inner_wraptext');
    var title, text, extratext;
    var defaultData = {};
    var offset = 64;
    var pin, defaultElement;

    async function getData() {
        let request;

        request = {
            method: 'GET',
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            let response = await fetch('/assets/json/mapWines.json', request);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let responseData = await response.json();
            createPins(responseData);
            return responseData;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    function createPins(items) {
        items.forEach((item, i) => {
            pin = document.createElement('div');
            pin.className = 'label40 mapWines__pin';
            pin.textContent = item.title;
            pin.style.left = item.position.left + '%';
            pin.style.top = item.position.top + '%';

            container.appendChild(pin);

            if (i == 0) {
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

                if (extratext.textContent == "") {
                    extratext.classList.add("hide");
                }

                innerWraptext.appendChild(title);
                innerWraptext.appendChild(text);
                innerWraptext.appendChild(extratext);

                wraptext.style.height = innerWraptext.clientHeight + 64 + 'px';

                defaultData.title = item.title;
                defaultData.text = item.text;
                defaultData.extratext = item.extratext;
                defaultElement = pin;
            }

            if (pin !== defaultElement) {
                pin.addEventListener('mouseenter', () => handleMouseEnter(item));
                pin.addEventListener('mouseleave', () => handleMouseLeave(item));
            }
        });
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
