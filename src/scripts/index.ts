import ValidateFields from "./ValidateFields";


window.addEventListener("load", function(event) {

    const styles = document.createElement("style");
    styles.setAttribute('type','text/css');
    styles.setAttribute('rel', 'stylesheet');
    styles.innerHTML = `
    .validation-error-message.hidden
    {
        visibility: hidden;
    }

    .validation-error-message.visible
    {
        visibility: visible;
    }
    `;

    document.head.appendChild(styles);

    Array.from(document.querySelectorAll('form.validate')).forEach(form => {
        new ValidateFields(form as HTMLFormElement);
    })

});
