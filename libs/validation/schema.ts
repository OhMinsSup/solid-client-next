import * as yup from 'yup';
import { z } from 'zod';

export const commonSchema = {
  password: () =>
    yup
      .string()
      .test(
        'password',
        'Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter',
        (password) => {
          if (!password) return false;
          const regex =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{8,20}$/;
          if (password.match(regex)) {
            return true;
          }
          return false;
        },
      ),
};

export const schema = {
  signup: () =>
    yup.object().shape({
      username: yup.string().min(2).max(20).required(),
      email: yup.string().email().required(),
      password: commonSchema.password().required(),
      name: yup.string().nullable(true).optional(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required(),
    }),
  signin: () =>
    yup.object().shape({
      email: yup.string().email().required(),
      password: commonSchema.password().required(),
    }),
  write: () =>
    yup.object().shape({
      title: yup.string().max(1000).required(),
      subTitle: yup.string().max(100).optional().nullable(true),
      description: yup.string().min(140).max(150).required(),
      content: yup.string().required(),
      thumbnail: yup
        .object()
        .shape({
          idx: yup.number().optional().nullable(true),
          url: yup.string().url().required(),
        })
        .optional(),
      tags: yup.array().of(yup.string()).max(5).nullable(true).optional(),
      disabledComment: yup.boolean().optional(),
      isPublic: yup.boolean().optional(),
      hasPublishedTime: yup.boolean().optional(),
      publishingDate: yup.date().min(new Date()).optional().nullable(true),
    }),
};

export const schemaNext = {
  signin: z.object({
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    password: z
      .string()
      .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{8,20}$/, {
        message:
          'Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter',
      }),
  }),
  signup: z
    .object({
      username: z.string().min(2).max(20),
      email: z.string().email({
        message: 'Please enter a valid email address',
      }),
      password: z
        .string()
        .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{8,20}$/, {
          message:
            'Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter',
        }),
      name: z.string().optional(),
      confirmPassword: z
        .string()
        .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{8,20}$/, {
          message:
            'Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }),
  write: z.object({
    title: z.string().max(1000),
    subTitle: z.string().max(100).optional(),
    description: z.string().min(140).max(150),
    content: z.string(),
    thumbnail: z
      .object({
        idx: z.number().optional(),
        url: z.string().url(),
      })
      .optional(),
    tags: z.array(z.string()).max(5).optional(),
    disabledComment: z.boolean().optional(),
    isPublic: z.boolean().optional(),
    hasPublishedTime: z.boolean().optional(),
    publishingDate: z.date().min(new Date()).optional(),
  }),
};
