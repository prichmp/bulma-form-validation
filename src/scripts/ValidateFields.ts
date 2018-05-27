import FieldValidator from "./FieldValidator";

export default class ValidateFields
{

    private form: HTMLFormElement;
    private hasErrors = true;

    public constructor(form: HTMLFormElement)
    {
        this.form = form;
        this.hasErrors = this.validateFields(Array.from(this.form.querySelectorAll("input,select,textarea")), true);
        this.onLoad();
    }

    public onLoad()
    {
        const fields = this.form.querySelectorAll("input,select,textarea");
        Array.from(fields).forEach((field: Element) => {
            field.addEventListener("change", this.onChange.bind(this))
        });

        const submitButtons = this.form.querySelectorAll("button[type='submit']");
        Array.from(submitButtons).forEach((button: Element) => {
            button.addEventListener("click", this.onSubmit.bind(this))
        });

    }

    public onChange(event: Event)
    {
        if(event.currentTarget)
        {
            if(!this.validateField(event.currentTarget as Element))
            {
                this.hasErrors = this.validateFields(Array.from(this.form.querySelectorAll("input,select,textarea")), true);

                if(!this.hasErrors)
                {
                    this.onSubmitErrors();
                }
            }
        }
        
    }

    public onSubmitErrors()
    {
        const fields = Array.from(this.form.querySelectorAll("button[type='submit']"));

        fields.forEach(field => {

            const parent = this.searchForParent(field, 'field');
            const messages = parent.querySelectorAll('.validation-error-message');

            if(this.hasErrors)
            {
                field.classList.add('is-danger');
                field.classList.remove('is-success');

                Array.from(messages).forEach(message => {
                    message.classList.remove('hidden');
                    message.classList.add('visible');
                });
            }
            else
            {
                field.classList.add('is-success');
                field.classList.remove('is-danger');

                Array.from(messages).forEach(message => {
                    message.classList.remove('visible');
                    message.classList.add('hidden');
                });   
            }
        })
        
    }

    public onSubmit(event: Event)
    {
        const field = (event.currentTarget as HTMLButtonElement);
        const fields = this.form.querySelectorAll("input,select,textarea");

        const parent = this.searchForParent(field, 'field');
        const messages = parent.querySelectorAll('.validation-error-message');

        this.hasErrors = this.validateFields(Array.from(fields));

        if(this.hasErrors)
        {
            event.preventDefault();
        }

        this.onSubmitErrors();
    }


    public validateFields(fields: Element[], silently: boolean = false): boolean
    {
        let hasErrors = false;
        fields.forEach(field => {
            const thisField = this.validateField(field, silently);
            hasErrors = hasErrors || thisField;
        });

        return hasErrors;
    }

    /**
     * 
     * @param {*} field 
     * @returns isValid
     */
    public validateField(field: Element, silently: boolean = false): boolean
    {
        let hasErrors = false;
        const attr: Attr | undefined = Array.from(field.attributes).find((a: Attr) => { 
            return a.name === 'data-validation'; }
        );

        let attrValue = "";
        if(attr)
        {
            attrValue = attr.value;
        }

        const validator = this.getValidatorFunction(attrValue);

        let val = "";
        if((field as HTMLInputElement).value)
        {
            val = (field as HTMLInputElement).value;
        }

        const parent = this.searchForParent(field, 'field');
        const messages = parent.querySelectorAll('.validation-error-message');

        if(!validator(val))
        {
            // Look for a parent with a class name of field
            hasErrors = true;

            if(!silently)
            {
                field.classList.add('is-danger');
                field.classList.remove('is-success');
                
                Array.from(messages).forEach(message => {
                    message.classList.remove('hidden');
                    message.classList.add('visible');
                });
            }
            
        }
        else
        {
            hasErrors = false;

            if(!silently)
            {
                field.classList.add('is-success');
                field.classList.remove('is-danger');
                
                Array.from(messages).forEach(message => {
                    message.classList.remove('visible');
                    message.classList.add('hidden');
                });
            }
            
        }

        return hasErrors;
    }

    public searchForParent(field: Element, className: string): Element
    {
        let currentAncestor: Element = field;

        do
        {
            if(currentAncestor.parentElement !== null)
            {
                currentAncestor = currentAncestor.parentElement;
            }
            else
            {
                break;
            }
        }
        while(currentAncestor && currentAncestor.parentElement && !currentAncestor.classList.contains(className))

        return currentAncestor;
    }


    public getValidatorFunction(dataValidationAttr: string|undefined|null): (value: string) => boolean 
    {
        if(dataValidationAttr !== null && dataValidationAttr !== undefined)
        {
            const validators = dataValidationAttr.split(" ");

            let result = (value: string):boolean => true;
            let resultArr: ((value: string) => boolean)[] = [];

            validators.forEach(validator => {
                switch(validator)
                {
                    case 'not-blank': resultArr.push(FieldValidator.notBlank); break;
                    case 'email': resultArr.push(FieldValidator.email); break;
                    case 'phone': resultArr.push(FieldValidator.phone); break;
                    case 'number': resultArr.push(FieldValidator.number); break;
                }
            });

            return (value: string) => {
                return resultArr.map((fun) => fun(value))
                .reduce((previous, current) => { return previous && current}, true)
            };
        }
        else
        {
            return (value: string):boolean => true
        }
    }

}