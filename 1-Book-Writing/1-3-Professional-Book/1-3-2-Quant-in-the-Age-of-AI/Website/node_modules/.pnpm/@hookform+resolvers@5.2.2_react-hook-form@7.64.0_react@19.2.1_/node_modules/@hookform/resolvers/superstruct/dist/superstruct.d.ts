import { FieldValues, Resolver } from 'react-hook-form';
import { Infer, Struct, validate } from 'superstruct';
export declare function superstructResolver<Input extends FieldValues, Context, Output>(schema: Struct<Input, any>, schemaOptions?: Parameters<typeof validate>[2], resolverOptions?: {
    raw?: false;
}): Resolver<Input, Context, Infer<typeof schema>>;
export declare function superstructResolver<Input extends FieldValues, Context, Output>(schema: Struct<Input, any>, schemaOptions: Parameters<typeof validate>[2] | undefined, resolverOptions: {
    raw: true;
}): Resolver<Input, Context, Input>;
