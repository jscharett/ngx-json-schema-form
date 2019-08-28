import { register } from '../../widget-library/widget-library.service';

import { WidgetDecorator } from '../interfaces/widget-decorator.data';

/**
 * Widget Decorator
 * Registers widget with widget library
 */
export function Widget(args: WidgetDecorator): (cls: any) => any {
    return (compType: any): any => {
        register(compType, args.types);
    };
}
