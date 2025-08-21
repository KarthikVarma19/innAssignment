import { CanDeactivateFn } from '@angular/router';

export const pendingChangesGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return (component as CanComponentDeactivate).canDeactivate
    ? (component as CanComponentDeactivate).canDeactivate()
    : true;
};

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}
