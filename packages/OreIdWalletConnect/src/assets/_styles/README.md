If you need to include the common scss mixins and variables from the AIKON Component Library,

```
// MyComponent.scss
@import 'node_modules/@aikon/component-library/_styles/scss/index.scss';
```

These contain the global styles, variables, animations and mixins used by AIKON.

### Themes

[Material UI Theme Docs](https://material-ui.com/customization/themes/)

The themes folder contains the global theme. The theme applies default styles to every
material-ui component overrided in the theme. If you need to change a button, or table row for example, don't modify that
components style directly, just update the global theme.

To see an example override, see ./theme/overrides/MuiButton.js

If you need to diverge from the global theme for a particular UI, see components/XXXX.js for an example that does this.
