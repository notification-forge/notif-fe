import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fade = trigger('routeAnimations', [
  transition('* => templates-editor', [
    query(
      ':enter',
      [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          transform: 'translateY(200%)',
          opacity: 1,
          zIndex: 1000,
        }),
      ],
      { optional: true }
    ),

    query(
      ':enter',
      [
        animate(
          '200ms ease',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ],
      {
        optional: true,
      }
    ),
  ]),

  transition('* <=> *', [
    query(
      ':enter',
      [
        style({
          position: 'absolute',
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({
          position: 'absolute',
          opacity: 1,
        }),
      ],
      { optional: true }
    ),
    query(':leave', [animate('200ms ease', style({ opacity: 0 }))], {
      optional: true,
    }),
    query(':enter', [animate('200ms ease', style({ opacity: 1 }))], {
      optional: true,
    }),
  ]),
]);
