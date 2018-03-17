# Env Label

During development, have you operated on your production page that was open at the same time by mistake? **Env Label** will save you from such a mistake.

![env](https://user-images.githubusercontent.com/1811616/37533731-0d483946-2986-11e8-9dbb-5ea74d9dc02a.gif)

You can see **[demo of env-label on github.io](https://ohbarye.github.io/env-label/test/browser/)**.

## How does it work?

- `env-label` just checks a current URL to determine whether it should show a label or not.
- It uses a regex given at its initialization.
- If no given condition matches, it never shows a label.

## Usage

Just install and call `init` method to set up in your code.

### Step1. Installation

```shell
$ npm install --save env-label
or
$ yarn add env-label
```

### Step2. Initialize

#### Use as ES module

```javascript
import EnvLabel from 'env-label';

EnvLabel.init({
  conditions: [
    {regex: /localhost/,    labelText: 'development', labelColor: '#00aaaa'},
    {regex: /example\.com/, labelText: 'production!!!', labelColor: '#aa0000'},
  ]
});
```

#### Load through `<script>` tag

```html
<script type="text/javascript" src="path/to/dist/js/env-label.js"></script>
<script type="text/javascript">
    // initialize with conditions
    window.EnvLabel.init({
      conditions: [
        {regex: /localhost/,    labelText: 'development', labelColor: '#00aaaa'},
        {regex: /example\.com/, labelText: 'production!!!', labelColor: '#aa0000'},
      ]
    });
</script>
```

That's all!

### (Optional) Skip set up in some environment

If you don't want to run `env-label` on production, just skip the initialization on build or runtime.

```javascript
if (!process.env.DISABLE_ENV_LABEL) {
  EnvLabel.init({ ... });
}

// or

if (anyCondition) {
  EnvLabel.init({ ... });
}
```

## Configuration Options

#### `EnvLabel.init({ conditions: Array<Condition> }): void`

It initializes `EnvLabel` based on `conditions` parameter. The `conditions` should be like below.

#### `Condition`

Parameter | Required | Type | Description
--- | --- | --- | ---
regex | true | `RegExp` | A regex to test against `window.location.hostname`. If it matches, a label appears.
labelText | false | `string` | Text that you want to show on a label. Its default value will be `window.location.hostname`.
labelColor | false | `string` | Color of label. Its default value is `#000`.

![label](https://user-images.githubusercontent.com/1811616/37533819-5adad98e-2986-11e8-853c-3d7042b6f93b.png)
