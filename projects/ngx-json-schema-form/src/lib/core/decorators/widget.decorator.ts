import { WidgetDecorator } from '../interfaces/widget-decorator.data';
import { register } from '../services/widget-library.service';

/**
 * Widget Decorator
 * Registers widget with widget library
 */
export function Widget(args: WidgetDecorator): (cls: any) => any {
    return (compType: any): any => {
        register(compType, args.types);
    };
}
