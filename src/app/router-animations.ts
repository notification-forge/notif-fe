import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fade = trigger('routeAnimations', [
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
