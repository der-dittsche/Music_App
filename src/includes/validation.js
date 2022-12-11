import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alphaSpaces', alphaSpaces);
    defineRule('email', email);
    defineRule('minVal', minVal);
    defineRule('maxVal', maxVal);
    defineRule('confirmed', confirmed);
    defineRule('pw_missmatch', confirmed);
    defineRule('excluded', excluded);

    configure({
      generateMessage: ctx => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is is too short.`,
          max: `The field ${ctx.field} is is too long.`,
          alphaSpaces: `The field ${ctx.field} contain wrong characters.`,
          email: `The field ${ctx.field} must be a valid email.`,
          minVal: `The field ${ctx.field} is to low.`,
          maxVal: `The field ${ctx.field} is to high.`,
          pw_missmatch: `The password don't match`,
          excluded: `It's not allow to use this value for the filed ${ctx.field}`,
          tos: `You have to accept the terms of service`,
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${context.field} is invalid`;
        return message;
      },
    });
  },
};
