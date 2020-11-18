import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export default (componentInstance) => <T>(source: Observable<T>) => {

  const isFunction = value => typeof value === 'function';

  let originalDestroy = componentInstance.ngOnDestroy;

  if (!isFunction(originalDestroy)) {
    throw new Error(
      `${componentInstance.constructor.name} está usando takeUntilDestroy mas não implementou o ngOnDestroy`
    );
  }

  const destroyProp = new Subject();

  originalDestroy = function() {
    if (isFunction(originalDestroy)) {
      originalDestroy.apply(this, arguments);
    }

    destroyProp.next(true);
    destroyProp.complete();
  };

  return source.pipe(takeUntil<T>(destroyProp));
};
