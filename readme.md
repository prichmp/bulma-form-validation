# Bulma Form Validation

This is a little script that allows you to validate input, select and textarea fields.

# How to use
 1. Place `<script type="text/javascript" src="bulma-form-validation.js">` at the bottom of the `<body>`
 2. Add the classname `validate` to your `<form>` tag
 3. For each field, make sure the input, textarea or select is in a `<div class="field">`
 4. Add a `<div class="validation-error-message hidden has-text-danger">your error message</div>` within `<div class="field">`
 5. Add a `data-validation` attribute to each input, select, or textarea tag
   - Valid values are:
     - `email`
     - `number`
     - `phone`
     - `not-blank`
   - Seperate each validation with a space to use multiple validations
 6. Add a `<button type="submit">` within a `<div class="field">` 
 7. Add a validation message for the button as well

Example of a field:

    <div class="field">
        <label for="email" class="label">Email</label>
        <div class="control">
            <input name="email" class="input" placeholder="Email" data-validation="email not-blank" type="email">
        </div>
        <div class="validation-error-message hidden has-text-danger">Email must be a valid email address</div>
    </div>

See `src/index.html` for an example.
