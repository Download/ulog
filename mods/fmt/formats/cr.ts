import type { Format } from "../types.js";

/**
 * This simplest format of all just inserts a Carriage Return (`\r\n`)
 *
 * This format is implemented as a
 * [static Kurly tag](https://www.npmjs.com/package/kurly#static-tags).
 *
 * Every ulog format is actually just a Kurly tag. There are two types
 * of tags:
 *
 * * static of the form `(ctx, rec) => () => string | string[]`, and
 * * dynamic of the form `(ctx) => (rec) => string | string[]`
 *
 * Dynamic tags get access to the arguments of the log call. Static tags don't.
 * But static tags can be compiled beforehand in such a way that they can be
 * bound to the log method statically, resulting in the call stack being
 * unaffected by them. So most formats in ulog are based on static Kurly tags.
 *
 * This format is implemented 'raw', just as the Kurly docs suggest. And
 * that is fine for this format. But while making the other formats such
 * as `name` and `lvl`, I realized that there are some common features
 * that I liked in multiple formats:
 *
 * * Configurable padding of results for aligned log messages
 * * Colorizing the results based on e.g logger name or level
 *
 * For those purposes I created a helper function called `newFormat` that adds
 * support for these features. So when you check out the other formats, keep in
 * mind that `newFormat` is not required if you don't need those features.
 *
 * @param ctx The context within the (parsed) format string
 * @param rec The record for the log call (without `rec.message`)
 * @returns The text to insert
 */
const cr: Format = (ctx, rec) => () => '\r\n'

export default cr
