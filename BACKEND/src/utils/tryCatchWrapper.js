export default function wrapAsync(fn) {
    return async(req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err); // forward any error (including your AppError) to errorHandler
        }
    }
}
//avoids writing try/catch in every async controller.