export default function mapWines() {

    // Define elements
    var container = document.getElementById('mapWines');
    var wraptext = document.getElementById('wraptext');
    var innerWraptext = document.getElementById('inner_wraptext');
    var title, text, extratext;
    var defaultData = {};
    var offset = 64;

    async function getData() {
        // Get data
        const response = await fetch("/assets/json/mapWines.json");
        const items = await response.json();

        createPins(items);
    }

    function createPins(items) {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            // Create pin
            var pin = document.createElement('div');
            pin.className = 'label40 mapWines__pin';
            pin.textContent = item.title;
            pin.style.left = item.position.left + '%';
            pin.style.top = item.position.top + '%';

            container.appendChild(pin);

            // Create default content
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
            }

            // Hover effect + change content
            var defaultElement = container.querySelector('.default');

            if (pin != defaultElement) {
                pin.addEventListener('mouseenter', function () {

                    defaultElement.classList.remove("active");
                    this.classList.add('active');
                    title.textContent = item.title;
                    text.textContent = item.text;
                    extratext.innerHTML = item.extratext;
                    wraptext.classList.add(item.color);
                    innerWraptext.classList.add('transation');

                    if (extratext.textContent == "") {
                        extratext.classList.add("hide");
                    } else {
                        extratext.classList.remove("hide");
                    }

                    wraptext.style.height = innerWraptext.clientHeight + offset + 'px';
                    innerWraptext.classList.remove("transation");
                });

                pin.addEventListener('mouseleave', function () {


                    defaultElement.classList.add("active");
                    this.classList.remove('active');
                    wraptext.classList.remove(item.color);

                    title.textContent = defaultData.title;
                    text.textContent = defaultData.text;
                    extratext.innerHTML = defaultData.extratext;

                    if (extratext.textContent == "") {
                        extratext.classList.add("hide");
                    } else {
                        extratext.classList.remove("hide");
                    }

                    wraptext.style.height = innerWraptext.clientHeight + 64 + 'px';
                });
            }

        }
    }

    getData();
}
