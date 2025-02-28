export default [
  {
    name: "Macro is used in expression assignment",
    input: `
        import { t } from '@lingui/macro';
        const a = t\`Expression assignment\`;
    `,
    expected: `
        import { i18n } from "@lingui/core";
        const a =
          /*i18n*/
          i18n._("Expression assignment")
    `,
  },
  {
    name: "Variables are replaced with named arguments",
    input: `
        import { t } from '@lingui/macro';
        t\`Variable \${name}\`;
    `,
    expected: `
        import { i18n } from "@lingui/core";
        /*i18n*/
        i18n._("Variable {name}", {
          name: name
        })
    `,
  },
  {
    name: "Variables should be deduplicated",
    input: `
        import { t } from '@lingui/macro';
        t\`\${duplicate} variable \${duplicate}\`;
    `,
    expected: `
        import { i18n } from "@lingui/core";
        /*i18n*/
        i18n._("{duplicate} variable {duplicate}", {
          duplicate: duplicate
        })
    `,
  },
  {
    name:
      "Anything variables except simple identifiers are used as positional arguments",
    input: `
        import { t } from '@lingui/macro';
        t\`
          Property \${props.name},\\
          function \${random()},\\
          array \${array[index]},\\
          constant \${42},\\
          object \${new Date()}\\
          anything \${props.messages[index].value()}
        \`
    `,
    expected: `
        import { i18n } from "@lingui/core";
        /*i18n*/
        i18n._(
          "Property {0}, function {1}, array {2}, constant {3}, object {4} anything {5}", {
            0: props.name,
            1: random(),
            2: array[index],
            3: 42,
            4: new Date(),
            5: props.messages[index].value()
          }
        );
    `,
  },
  {
    name: "Newlines are preserved",
    input: `
        import { t } from '@lingui/macro';
        t\`Multiline
          string\`
      `,
    expected: `
        import { i18n } from "@lingui/core";
        /*i18n*/
        i18n._("Multiline\\nstring")
      `,
  },
  {
    name: "Support template strings in t macro message",
    input: `
        import { t } from '@lingui/macro'
        const msg = t({ message: \`Hello \${name}\` })
      `,
    expected: `import { i18n } from "@lingui/core";
    const msg =
      i18n._(/*i18n*/
        {
          id: "Hello {name}",
          values: {
            name: name,
          },
        });
      `,
  },
  {
    name: "Support id and comment in t macro as callExpression",
    input: `
        import { t } from '@lingui/macro'
        const msg = t({ id: 'msgId', comment: 'description for translators', message: plural(val, { one: '...', other: '...' }) })
      `,
    expected: `import { i18n } from "@lingui/core";
    const msg =
      i18n._(/*i18n*/
        {
          id: "msgId",
          comment: "description for translators",
          message: "{val, plural, one {...} other {...}}",
          values: {
            val: val,
          },
        });
      `,
  },
  {
    name: "Newlines after continuation character are removed",
    filename: "js-t-continuation-character.js",
  },
  {
    filename: "js-t-var/js-t-var.js",
  },
]
